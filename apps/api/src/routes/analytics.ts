import { Router, Request, Response } from 'express';
import prisma from '../db';

const router: Router = Router();
const RETENTION_DAYS = 7;

function getWeekKey(date: Date) {
  const tmp = new Date(Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate()));
  const dayNumber = tmp.getUTCDay() || 7;
  tmp.setUTCDate(tmp.getUTCDate() + 4 - dayNumber);
  const yearStart = new Date(Date.UTC(tmp.getUTCFullYear(), 0, 1));
  const weekNumber = Math.ceil((((tmp.getTime() - yearStart.getTime()) / 86400000) + 1) / 7);
  return `${tmp.getUTCFullYear()}-${String(weekNumber).padStart(2, '0')}`;
}

async function summarizeTrafficData() {
  const cutoff = new Date(Date.now() - RETENTION_DAYS * 24 * 60 * 60 * 1000);

  const insertSql = `
    INSERT INTO "TrafficSummary"
      ("airportId","date","dayOfWeek","hour","avgTrafficScore","peakTrafficScore","avgArrivals","avgDepartures","totalAircraft","sampleCount","createdAt")
    SELECT
      "airportId",
      date_trunc('day', "timestamp" AT TIME ZONE 'UTC') AS "date",
      extract(dow FROM "timestamp" AT TIME ZONE 'UTC')::int AS "dayOfWeek",
      extract(hour FROM "timestamp" AT TIME ZONE 'UTC')::int AS "hour",
      round(avg("trafficScore"))::int AS "avgTrafficScore",
      max("trafficScore")::int AS "peakTrafficScore",
      avg("arrivals")::float AS "avgArrivals",
      avg("departures")::float AS "avgDepartures",
      round(avg("totalAircraft"))::int AS "totalAircraft",
      count(*)::int AS "sampleCount",
      now() AT TIME ZONE 'UTC' AS "createdAt"
    FROM "TrafficSnapshot"
    WHERE "timestamp" < $1
    GROUP BY 
      "airportId",
      date_trunc('day', "timestamp" AT TIME ZONE 'UTC'),
      extract(dow FROM "timestamp" AT TIME ZONE 'UTC'),
      extract(hour FROM "timestamp" AT TIME ZONE 'UTC')
    ON CONFLICT ("airportId","date","hour") DO UPDATE SET
      "avgTrafficScore" = EXCLUDED."avgTrafficScore",
      "peakTrafficScore" = EXCLUDED."peakTrafficScore",
      "avgArrivals" = EXCLUDED."avgArrivals",
      "avgDepartures" = EXCLUDED."avgDepartures",
      "totalAircraft" = EXCLUDED."totalAircraft",
      "sampleCount" = EXCLUDED."sampleCount",
      "createdAt" = EXCLUDED."createdAt";
  `;

  const [insertedRows, deletedResult] = await prisma.$transaction([
    prisma.$executeRawUnsafe(insertSql, cutoff.toISOString()),
    prisma.trafficSnapshot.deleteMany({ where: { timestamp: { lt: cutoff } } }),
  ]);

  return {
    cutoff: cutoff.toISOString(),
    insertedRows: Number(insertedRows || 0),
    deletedRows: deletedResult.count,
  };
}

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

router.get('/changelog', async (req: Request, res: Response) => {
  try {
    const githubOwner = 'Pilot-Mishari';
    const githubRepo = 'VATSIM-TRAFFIC-SENSE';
    const apiUrl = `https://api.github.com/repos/${githubOwner}/${githubRepo}/pulls?state=open&sort=updated&direction=desc&per_page=1`;
    const response = await fetch(apiUrl, {
      headers: {
        'Accept': 'application/vnd.github.v3+json',
      },
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('GitHub API error', response.status, errorText);
      return res.status(502).json({ error: 'Failed to fetch changelog from GitHub' });
    }

    const pulls = await response.json() as Array<any>;
    const latest = pulls[0];

    if (!latest) {
      return res.json({ title: 'No recent pull requests', body: 'There are no open pull requests at this time.' });
    }

    res.json({
      title: latest.title,
      body: latest.body ?? 'No description provided.',
      url: latest.html_url,
      state: latest.state,
      updatedAt: latest.updated_at,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch changelog' });
  }
});

router.post('/summarize', async (req: Request, res: Response) => {
  try {
    const result = await summarizeTrafficData();
    res.json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to summarize traffic snapshots' });
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

    const [snapshots, summaryRows] = await Promise.all([
      prisma.trafficSnapshot.findMany({
        where: { airportId: airport.id },
        orderBy: { timestamp: 'asc' },
      }),
      prisma.trafficSummary.findMany({
        where: { airportId: airport.id },
        orderBy: [{ date: 'asc' }, { hour: 'asc' }],
      }),
    ]);

    const groups: Record<string, { totalScore: number; totalCount: number; peak: number }> = {};

    function addGroup(dow: number, hour: number, score: number, count: number, peak: number) {
      const key = `${dow}-${hour}`;
      if (!groups[key]) groups[key] = { totalScore: 0, totalCount: 0, peak };
      groups[key].totalScore += score * count;
      groups[key].totalCount += count;
      groups[key].peak = Math.max(groups[key].peak, peak);
    }

    for (const snap of snapshots) {
      const date = new Date(snap.timestamp);
      addGroup(date.getUTCDay(), date.getUTCHours(), snap.trafficScore, 1, snap.trafficScore);
    }

    for (const summary of summaryRows) {
      addGroup(summary.dayOfWeek, summary.hour, summary.avgTrafficScore, summary.sampleCount, summary.peakTrafficScore);
    }

    const averages: Record<string, { avg: number; peak: number; samples: number }> = {};
    for (const [key, stats] of Object.entries(groups)) {
      averages[key] = {
        avg: Math.round(stats.totalScore / Math.max(stats.totalCount, 1)),
        peak: stats.peak,
        samples: stats.totalCount,
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

    const cutoff = new Date(Date.now() - RETENTION_DAYS * 24 * 60 * 60 * 1000);
    const [rawSnapshots, summaryRows] = await Promise.all([
      prisma.trafficSnapshot.findMany({
        where: {
          airportId: airport.id,
          timestamp: { gte: cutoff },
        },
        orderBy: { timestamp: 'asc' },
      }),
      prisma.trafficSummary.findMany({
        where: { airportId: airport.id },
        orderBy: [{ date: 'asc' }, { hour: 'asc' }],
      }),
    ]);

    if (rawSnapshots.length === 0 && summaryRows.length === 0) {
      return res.json({ currentScore: 0, trend: 'STABLE', predictions: [] });
    }

    const latestSnapshot = rawSnapshots[rawSnapshots.length - 1];
    const currentScore = latestSnapshot?.trafficScore ?? 0;

    const slotMap = new Map<string, {
      totalScore: number;
      totalCount: number;
      peakTrafficScore: number;
      weekly: Map<string, { totalScore: number; totalCount: number }>;
    }>();

    function addSlotSample(
      dow: number,
      hour: number,
      weekKey: string,
      score: number,
      count: number,
      peak: number,
    ) {
      const slot = `${dow}-${hour}`;
      if (!slotMap.has(slot)) {
        slotMap.set(slot, {
          totalScore: 0,
          totalCount: 0,
          peakTrafficScore: peak,
          weekly: new Map(),
        });
      }

      const entry = slotMap.get(slot)!;
      entry.totalScore += score * count;
      entry.totalCount += count;
      entry.peakTrafficScore = Math.max(entry.peakTrafficScore, peak);

      if (!entry.weekly.has(weekKey)) {
        entry.weekly.set(weekKey, { totalScore: 0, totalCount: 0 });
      }
      const weekEntry = entry.weekly.get(weekKey)!;
      weekEntry.totalScore += score * count;
      weekEntry.totalCount += count;
    }

    for (const snap of rawSnapshots) {
      const date = new Date(snap.timestamp);
      addSlotSample(
        date.getUTCDay(),
        date.getUTCHours(),
        getWeekKey(date),
        snap.trafficScore,
        1,
        snap.trafficScore,
      );
    }

    for (const summary of summaryRows) {
      addSlotSample(
        summary.dayOfWeek,
        summary.hour,
        getWeekKey(new Date(summary.date)),
        summary.avgTrafficScore,
        summary.sampleCount,
        summary.peakTrafficScore,
      );
    }

    const slotAverages = new Map<string, { historicalAvg: number; samples: number; weeklyGrowthRate: number }>();

    for (const [slot, entry] of slotMap.entries()) {
      const historicalAvg = entry.totalScore / Math.max(entry.totalCount, 1);
      const weekEntries = Array.from(entry.weekly.entries())
        .sort((a, b) => a[0].localeCompare(b[0]))
        .map(([weekKey, stats]) => ({
          weekKey,
          average: stats.totalScore / Math.max(stats.totalCount, 1),
        }));

      const changes: { change: number; weight: number }[] = [];
      for (let i = 1; i < weekEntries.length; i += 1) {
        const prevAvg = weekEntries[i - 1].average;
        const currAvg = weekEntries[i].average;
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
        samples: entry.totalCount,
        weeklyGrowthRate,
      });
    }

    const currentSlot = `${new Date().getUTCDay()}-${new Date().getUTCHours()}`;
    const currentSlotInfo = slotAverages.get(currentSlot);
    const currentDeviation = currentSlotInfo && currentSlotInfo.historicalAvg > 0
      ? (currentScore - currentSlotInfo.historicalAvg) / currentSlotInfo.historicalAvg
      : 0;

    const recentForTrend = rawSnapshots.slice(-6);
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
