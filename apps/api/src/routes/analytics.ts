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

    const snapshots = await prisma.trafficSnapshot.findMany({
      where: { airportId: airport.id },
      orderBy: { timestamp: 'asc' },
    });

    if (snapshots.length === 0) {
      return res.json({ currentScore: 0, trend: 'STABLE', predictions: [] });
    }

    const latestSnapshot = snapshots[snapshots.length - 1];
    const currentScore = latestSnapshot.trafficScore;

    function getWeekKey(date: Date) {
      const tmp = new Date(Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate()));
      const dayNumber = tmp.getUTCDay() || 7;
      tmp.setUTCDate(tmp.getUTCDate() + 4 - dayNumber);
      const yearStart = new Date(Date.UTC(tmp.getUTCFullYear(), 0, 1));
      const weekNumber = Math.ceil((((tmp.getTime() - yearStart.getTime()) / 86400000) + 1) / 7);
      return `${tmp.getUTCFullYear()}-${String(weekNumber).padStart(2, '0')}`;
    }

    const slotToSamples = new Map<string, number[]>();
    const slotWeekMap = new Map<string, Map<string, number[]>>();

    for (const snap of snapshots) {
      const date = new Date(snap.timestamp);
      const dow = date.getUTCDay();
      const hour = date.getUTCHours();
      const slot = `${dow}-${hour}`;
      const weekKey = getWeekKey(date);

      if (!slotToSamples.has(slot)) slotToSamples.set(slot, []);
      slotToSamples.get(slot)!.push(snap.trafficScore);

      if (!slotWeekMap.has(slot)) slotWeekMap.set(slot, new Map());
      const weekMap = slotWeekMap.get(slot)!;
      if (!weekMap.has(weekKey)) weekMap.set(weekKey, []);
      weekMap.get(weekKey)!.push(snap.trafficScore);
    }

    const slotAverages = new Map<string, { historicalAvg: number; samples: number; weeklyGrowthRate: number }>();

    for (const [slot, scores] of slotToSamples.entries()) {
      const historicalAvg = scores.reduce((sum, score) => sum + score, 0) / scores.length;
      const weekMap = slotWeekMap.get(slot)!;
      const weekEntries = Array.from(weekMap.entries()).sort((a, b) => a[0].localeCompare(b[0]));

      const changes: { change: number; weight: number }[] = [];
      for (let i = 1; i < weekEntries.length; i += 1) {
        const prevAvg = weekEntries[i - 1][1].reduce((sum, score) => sum + score, 0) / weekEntries[i - 1][1].length;
        const currAvg = weekEntries[i][1].reduce((sum, score) => sum + score, 0) / weekEntries[i][1].length;
        if (prevAvg > 0) {
          const change = (currAvg - prevAvg) / prevAvg;
          const isRecent = i >= Math.max(1, weekEntries.length - 4);
          changes.push({ change, weight: isRecent ? 2 : 1 });
        }
      }

      let weeklyGrowthRate = 0;
      if (changes.length > 0) {
        const weightedSum = changes.reduce((sum, item) => sum + item.change * item.weight, 0);
        const totalWeight = changes.reduce((sum, item) => sum + item.weight, 0);
        weeklyGrowthRate = weightedSum / totalWeight;
      }

      slotAverages.set(slot, {
        historicalAvg,
        samples: scores.length,
        weeklyGrowthRate,
      });
    }

    const currentSlot = `${new Date(latestSnapshot.timestamp).getUTCDay()}-${new Date(latestSnapshot.timestamp).getUTCHours()}`;
    const currentSlotInfo = slotAverages.get(currentSlot);
    const currentDeviation = currentSlotInfo && currentSlotInfo.historicalAvg > 0
      ? (currentScore - currentSlotInfo.historicalAvg) / currentSlotInfo.historicalAvg
      : 0;

    const recentForTrend = snapshots.slice(-6);
    const trendDirection = recentForTrend.length >= 2
      ? recentForTrend[recentForTrend.length - 1].trafficScore - recentForTrend[0].trafficScore
      : 0;
    const trend = trendDirection > 10 ? 'INCREASING' : trendDirection < -10 ? 'DECREASING' : 'STABLE';

    function formatHour(hour: number) {
      return `${String(hour).padStart(2, '0')}:00Z`;
    }

    const predictions: any[] = [];
    const fallbackTrendDeltaPerSnapshot = recentForTrend.length > 1
      ? (recentForTrend[recentForTrend.length - 1].trafficScore - recentForTrend[0].trafficScore) / (recentForTrend.length - 1)
      : 0;

    const now = new Date();
    for (let h = 1; h <= 3; h += 1) {
      const futureTime = new Date(now.getTime() + h * 60 * 60 * 1000);
      const slot = `${futureTime.getUTCDay()}-${futureTime.getUTCHours()}`;
      const slotInfo = slotAverages.get(slot);

      let predicted: number;
      let confidence: string;
      let sampleCount = slotInfo?.samples ?? 0;

      if (slotInfo && sampleCount >= 3) {
        confidence = sampleCount >= 9 ? 'HIGH' : 'MEDIUM';
        predicted = slotInfo.historicalAvg * (1 + slotInfo.weeklyGrowthRate) * (1 + currentDeviation * 0.3);
      } else {
        confidence = 'LOW';
        predicted = currentScore + fallbackTrendDeltaPerSnapshot * 6;
      }

      predicted = Math.max(0, Math.floor(predicted));

      const level = predicted >= 150
        ? 'VERY HIGH'
        : predicted >= 80
          ? 'HIGH'
          : predicted >= 30
            ? 'MEDIUM'
            : 'LOW';

      predictions.push({
        hour: h,
        time: formatHour(futureTime.getUTCHours()),
        predicted,
        level,
        historicalSamples: sampleCount,
        confidence,
      });
    }

    res.json({
      currentScore,
      trend,
      predictions,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to generate prediction' });
  }
});
export default router;
