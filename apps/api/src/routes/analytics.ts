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

    // Pull a reasonable amount of history and recent snapshots
    const allSnapshots = await prisma.trafficSnapshot.findMany({
      where: { airportId: airport.id },
      orderBy: { timestamp: 'asc' },
    });

    const recentSnapshots = allSnapshots.slice(-12); // last ~2 hours (12 * 10min)

    if (recentSnapshots.length < 2) {
      return res.json({ prediction: 'INSUFFICIENT_DATA', hours: [] });
    }

    // Helper: compute historical scores for a given future slot (dow-hour)
    function historicalForSlot(dow: number, hour: number) {
      return allSnapshots
        .filter(s => {
          const d = new Date(s.timestamp);
          return d.getUTCDay() === dow && d.getUTCHours() === hour;
        })
        .map(s => s.trafficScore);
    }

    // Trend: use linear projection from recent snapshots
    const recent = recentSnapshots.map(s => ({
      t: new Date(s.timestamp).getTime() / 1000,
      v: s.trafficScore,
    }));

    // Simple slope (v per second) via two-point first/last
    const slope = (recent[recent.length - 1].v - recent[0].v) / (recent[recent.length - 1].t - recent[0].t);
    const slopePerHour = slope * 3600; // per hour

    const now = new Date();
    const predictions: any[] = [];

    for (let h = 1; h <= 3; h++) {
      const futureTime = new Date(now.getTime() + h * 60 * 60 * 1000);
      const dow = futureTime.getUTCDay();
      const hour = futureTime.getUTCHours();

      const historicalScores = historicalForSlot(dow, hour);
      const histCount = historicalScores.length;
      const histAvg = histCount > 0 ? historicalScores.reduce((a, b) => a + b, 0) / histCount : null;

      // Determine weights based on available history
      // More historical samples => higher weight to historical average
      let histWeight = 0.6;
      if (histCount >= 48) histWeight = 0.8;
      else if (histCount >= 12) histWeight = 0.7;
      else if (histCount >= 4) histWeight = 0.55;
      else histWeight = 0.35;

      const trendWeight = 1 - histWeight;

      const currentScore = recent[recent.length - 1].v;
      const trendProjected = Math.max(0, Math.round(currentScore + slopePerHour * h));

      let predicted: number;
      if (histAvg !== null) {
        predicted = Math.round(histWeight * histAvg + trendWeight * trendProjected);
      } else {
        predicted = trendProjected;
      }

      if (predicted < 0) predicted = 0;

      const level = predicted >= 150 ? 'VERY HIGH' : predicted >= 80 ? 'HIGH' : predicted >= 30 ? 'MEDIUM' : 'LOW';
      const confidence = histCount >= 48 ? 'HIGH' : histCount >= 12 ? 'MEDIUM' : histCount >= 4 ? 'LOW' : 'LOW';

      predictions.push({
        hour: h,
        time: futureTime.toUTCString().slice(17, 22) + 'Z',
        predicted,
        level,
        historicalSamples: histCount,
        confidence,
      });
    }

    // Overall trend descriptor
    const overallDelta = recent[recent.length - 1].v - recent[0].v;
    const trend = overallDelta > 10 ? 'INCREASING' : overallDelta < -10 ? 'DECREASING' : 'STABLE';

    res.json({
      currentScore: recent[recent.length - 1].v,
      trend,
      predictions,
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to generate prediction' });
  }
});
export default router;