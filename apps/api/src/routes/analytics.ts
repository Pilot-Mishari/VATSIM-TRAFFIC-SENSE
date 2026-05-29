import { Router, Request, Response } from 'express';
import prisma from '../db';

const router: Router = Router();

// Top airports by traffic score
router.get('/top-airports', async (req: Request, res: Response) => {
  try {
    const airports = await prisma.airport.findMany({
      include: {
        TrafficSnapshot: {
          orderBy: { timestamp: 'desc' },
          take: 1,
        },
      },
    });

    const sorted = airports
      .filter(a => a.TrafficSnapshot.length > 0)
      .sort((a, b) => b.TrafficSnapshot[0].trafficScore - a.TrafficSnapshot[0].trafficScore)
      .slice(0, 20);

    res.json(sorted);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch top airports' });
  }
});

// Historical snapshots for a specific airport
router.get('/history/:icao', async (req: Request, res: Response) => {
  try {
    const { icao } = req.params;
    const { limit = '48' } = req.query;

    const airport = await prisma.airport.findUnique({
      where: { icao: icao.toUpperCase() },
      include: {
        TrafficSnapshot: {
          orderBy: { timestamp: 'desc' },
          take: parseInt(limit as string),
        },
      },
    });

    if (!airport) return res.status(404).json({ error: 'Airport not found' });

    res.json(airport);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch history' });
  }
});

// Global traffic summary
router.get('/summary', async (req: Request, res: Response) => {
  try {
    const totalSnapshots = await prisma.trafficSnapshot.count();

    const latest = await prisma.trafficSnapshot.findMany({
      orderBy: { timestamp: 'desc' },
      take: 1,
    });

    const latestTimestamp = latest[0]?.timestamp ?? null;

    res.json({
      totalSnapshots,
      latestTimestamp,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch summary' });
  }
});

// Busiest hours today for an airport
router.get('/today/:icao', async (req: Request, res: Response) => {
  try {
    const { icao } = req.params;

    const startOfDay = new Date();
    startOfDay.setUTCHours(0, 0, 0, 0);

    const airport = await prisma.airport.findUnique({
      where: { icao: icao.toUpperCase() },
    });

    if (!airport) return res.status(404).json({ error: 'Airport not found' });

    const snapshots = await prisma.trafficSnapshot.findMany({
      where: {
        airportId: airport.id,
        timestamp: { gte: startOfDay },
      },
      orderBy: { timestamp: 'asc' },
    });

    res.json(snapshots);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch today data' });
  }
});

// Live VATSIM events
router.get('/events', async (req: Request, res: Response) => {
  try {
    const response = await fetch('https://my.vatsim.net/api/v2/events/latest');
    const data = await response.json() as { data: any[] };
    res.json(data.data ?? []);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch events' });
  }
});

// Traffic prediction - average of last 12 snapshots grouped by hour
router.get('/trend/:icao', async (req: Request, res: Response) => {
  try {
    const { icao } = req.params;

    const airport = await prisma.airport.findUnique({
      where: { icao: icao.toUpperCase() },
    });

    if (!airport) return res.status(404).json({ error: 'Airport not found' });

    // Last 48 snapshots for trend
    const snapshots = await prisma.trafficSnapshot.findMany({
      where: { airportId: airport.id },
      orderBy: { timestamp: 'desc' },
      take: 48,
    });

    res.json(snapshots.reverse());
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch trend' });
  }
});


// Historical hourly averages for an airport
router.get('/hourly-average/:icao', async (req: Request, res: Response) => {
  try {
    const { icao } = req.params;

    const airport = await prisma.airport.findUnique({
      where: { icao: icao.toUpperCase() },
    });

    if (!airport) return res.status(404).json({ error: 'Airport not found' });

    const snapshots = await prisma.trafficSnapshot.findMany({
      where: { airportId: airport.id },
      orderBy: { timestamp: 'asc' },
    });

    // Group by day of week + hour
    const groups: Record<string, number[]> = {};

    for (const snap of snapshots) {
      const date = new Date(snap.timestamp);
      const dow = date.getUTCDay(); // 0=Sun, 6=Sat
      const hour = date.getUTCHours();
      const key = `${dow}-${hour}`;
      if (!groups[key]) groups[key] = [];
      groups[key].push(snap.trafficScore);
    }

    // Calculate averages and peak per slot
    const averages: Record<string, { avg: number; peak: number; samples: number }> = {};
    for (const [key, scores] of Object.entries(groups)) {
      averages[key] = {
        avg: Math.round(scores.reduce((a, b) => a + b, 0) / scores.length),
        peak: Math.max(...scores),
        samples: scores.length,
      };
    }

    res.json(averages);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch hourly averages' });
  }
});

// Full prediction for next 3 hours
router.get('/predict/:icao', async (req: Request, res: Response) => {
  try {
    const { icao } = req.params;

    const airport = await prisma.airport.findUnique({
      where: { icao: icao.toUpperCase() },
    });

    if (!airport) return res.status(404).json({ error: 'Airport not found' });

    // Get last 8 snapshots for trend
    const recentSnapshots = await prisma.trafficSnapshot.findMany({
      where: { airportId: airport.id },
      orderBy: { timestamp: 'desc' },
      take: 8,
    });

    if (recentSnapshots.length < 2) {
      return res.json({ prediction: 'INSUFFICIENT_DATA', hours: [] });
    }

    const reversed = recentSnapshots.reverse();

    // Get historical averages for next 3 hours
    const allSnapshots = await prisma.trafficSnapshot.findMany({
      where: { airportId: airport.id },
      orderBy: { timestamp: 'asc' },
    });

    const now = new Date();
    const predictions = [];

    for (let h = 1; h <= 3; h++) {
      const futureTime = new Date(now.getTime() + h * 60 * 60 * 1000);
      const dow = futureTime.getUTCDay();
      const hour = futureTime.getUTCHours();

      // Historical average for this slot
      const historicalScores = allSnapshots
        .filter(s => {
          const d = new Date(s.timestamp);
          return d.getUTCDay() === dow && d.getUTCHours() === hour;
        })
        .map(s => s.trafficScore);

      const historicalAvg = historicalScores.length > 0
        ? Math.round(historicalScores.reduce((a, b) => a + b, 0) / historicalScores.length)
        : null;

      // Current trend
      const recent = reversed.slice(-4);
      const trendDelta = recent[recent.length - 1].trafficScore - recent[0].trafficScore;
      const trendPerHour = trendDelta / (recent.length * 0.25); // snapshots are 10min each

      // Current score
      const currentScore = reversed[reversed.length - 1].trafficScore;

      // Blend historical + trend
      let predicted: number;
      if (historicalAvg !== null && historicalScores.length >= 3) {
        // Weight: 60% historical, 40% trend projection
        const trendProjected = Math.max(0, currentScore + trendPerHour * h);
        predicted = Math.round(0.6 * historicalAvg + 0.4 * trendProjected);
      } else {
        // Not enough history, use trend only
        predicted = Math.max(0, Math.round(currentScore + trendPerHour * h));
      }

      const level =
        predicted >= 150 ? 'VERY HIGH' :
        predicted >= 80 ? 'HIGH' :
        predicted >= 30 ? 'MEDIUM' : 'LOW';

      predictions.push({
        hour: h,
        time: futureTime.toUTCString().slice(17, 22) + 'Z',
        predicted,
        level,
        historicalSamples: historicalScores.length,
        confidence: historicalScores.length >= 5 ? 'HIGH' : historicalScores.length >= 2 ? 'MEDIUM' : 'LOW',
      });
    }

    // Overall trend
    const trendDelta = reversed[reversed.length - 1].trafficScore - reversed[0].trafficScore;
    const trend = trendDelta > 10 ? 'INCREASING' : trendDelta < -10 ? 'DECREASING' : 'STABLE';

    res.json({
      currentScore: reversed[reversed.length - 1].trafficScore,
      trend,
      predictions,
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to generate prediction' });
  }
});
export default router;