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

router.get('/top-airports', async (req: Request, res: Response) => {
  try {
    const results = await prisma.$queryRaw<any[]>`
      SELECT 
        a.id, 
        a.icao, 
        t."avgTrafficScore" AS "avgTrafficScore", 
        t."date" AS "date"
      FROM "Airport" a
      INNER JOIN "TrafficSummary" t ON a.id = t."airportId"
      WHERE t."date" = (SELECT MAX("date") FROM "TrafficSummary")
      ORDER BY t."avgTrafficScore" DESC
      LIMIT 10;
    `;
    return res.json(results);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.post('/summarize', async (req: Request, res: Response) => {
  try {
    const targetDate = new Date();
    targetDate.setUTCDate(targetDate.getUTCDate() - 1);
    const dateStr = targetDate.toISOString().split('T')[0];

    const rawSnapshots = await prisma.trafficSnapshot.findMany({
      where: {
        timestamp: {
          gte: new Date(`${dateStr}T00:00:00Z`),
          lt: new Date(`${dateStr}T23:59:59Z`),
        },
      },
    });

    if (rawSnapshots.length === 0) {
      return res.json({ message: 'No snapshots found to summarize for yesterday' });
    }

    const groups: Record<string, typeof rawSnapshots> = {};
    for (const snap of rawSnapshots) {
      const snapDate = new Date(snap.timestamp);
      const hour = snapDate.getUTCHours();
      const key = `${snap.airportId}_${hour}`;
      if (!groups[key]) groups[key] = [];
      groups[key].push(snap);
    }

    for (const [key, snaps] of Object.entries(groups)) {
      const [airportIdStr, hourStr] = key.split('_');
      const airportId = parseInt(airportIdStr, 10);
      const hour = parseInt(hourStr, 10);

      const count = snaps.length;
      const sumArrivals = snaps.reduce((acc, s) => acc + s.arrivals, 0);
      const sumDepartures = snaps.reduce((acc, s) => acc + s.departures, 0);
      const sumTotalAircraft = snaps.reduce((acc, s) => acc + s.totalAircraft, 0);
      const sumTrafficScore = snaps.reduce((acc, s) => acc + s.trafficScore, 0);
      const maxTrafficScore = snaps.reduce((acc, s) => Math.max(acc, s.trafficScore), 0);

      const snapDate = new Date(snaps[0].timestamp);
      const dayOfWeek = snapDate.getUTCDay() || 7;
      const summaryDate = new Date(Date.UTC(snapDate.getUTCFullYear(), snapDate.getUTCMonth(), snapDate.getUTCDate()));

      await prisma.trafficSummary.upsert({
        where: {
          airportId_date_hour: {
            airportId,
            date: summaryDate,
            hour,
          },
        },
        update: {
          avgTrafficScore: Math.round(sumTrafficScore / count),
          peakTrafficScore: maxTrafficScore,
          avgArrivals: sumArrivals / count,
          avgDepartures: sumDepartures / count,
          totalAircraft: sumTotalAircraft,
          sampleCount: count,
        },
        create: {
          airportId,
          date: summaryDate,
          dayOfWeek,
          hour,
          avgTrafficScore: Math.round(sumTrafficScore / count),
          peakTrafficScore: maxTrafficScore,
          avgArrivals: sumArrivals / count,
          avgDepartures: sumDepartures / count,
          totalAircraft: sumTotalAircraft,
          sampleCount: count,
        },
      });
    }

    const cutOffDate = new Date();
    cutOffDate.setUTCDate(cutOffDate.getUTCDate() - RETENTION_DAYS);
    await prisma.trafficSnapshot.deleteMany({
      where: {
        timestamp: {
          lt: cutOffDate,
        },
      },
    });

    return res.json({ message: 'Summary completed successfully and retention purged' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.get('/airport/:icao', async (req: Request, res: Response) => {
  const { icao } = req.params;
  try {
    const airport = await prisma.airport.findUnique({
      where: { icao: icao.toUpperCase() },
    });

    if (!airport) {
      return res.status(404).json({ error: 'Airport not found' });
    }

    const latestSummary = await prisma.trafficSummary.findFirst({
      where: { airportId: airport.id },
      orderBy: [
        { date: 'desc' },
        { hour: 'desc' },
      ],
    });

    const historicalSummaries = await prisma.trafficSummary.findMany({
      where: { airportId: airport.id },
      orderBy: [
        { date: 'asc' },
        { hour: 'asc' },
      ],
    });

    const currentScore = latestSummary ? latestSummary.avgTrafficScore : 0;
    const currentLevel = currentScore >= 150
      ? 'VERY HIGH'
      : currentScore >= 80
        ? 'HIGH'
        : currentScore >= 30
          ? 'MEDIUM'
          : 'LOW';

    const recentForTrend = historicalSummaries.slice(-5);
    const currentTrend = recentForTrend.length >= 2
      ? recentForTrend[recentForTrend.length - 1].avgTrafficScore > recentForTrend[0].avgTrafficScore ? 'INCREASING' : 'DECREASING'
      : 'STABLE';

    const hourDataMap = new Map<number, { scoreSum: number; count: number; maxScore: number }>();
    const dayDataMap = new Map<number, { scoreSum: number; count: number }>();
    const weeklyDataMap = new Map<string, { scoreSum: number; count: number }>();
    const slotAverages = new Map<string, { historicalAvg: number; samples: number; weeklyGrowthRate: number }>();

    for (const entry of historicalSummaries) {
      const h = entry.hour;
      if (!hourDataMap.has(h)) hourDataMap.set(h, { scoreSum: 0, count: 0, maxScore: 0 });
      const hObj = hourDataMap.get(h)!;
      hObj.scoreSum += entry.avgTrafficScore;
      hObj.count += 1;
      hObj.maxScore = Math.max(hObj.maxScore, entry.peakTrafficScore);

      const d = entry.dayOfWeek;
      if (!dayDataMap.has(d)) dayDataMap.set(d, { scoreSum: 0, count: 0 });
      const dObj = dayDataMap.get(d)!;
      dObj.scoreSum += entry.avgTrafficScore;
      dObj.count += 1;

      const wKey = getWeekKey(new Date(entry.date));
      if (!weeklyDataMap.has(wKey)) weeklyDataMap.set(wKey, { scoreSum: 0, count: 0 });
      const wObj = weeklyDataMap.get(wKey)!;
      wObj.scoreSum += entry.avgTrafficScore;
      wObj.count += 1;

      const slotKey = `${d}-${h}`;
      if (!slotAverages.has(slotKey)) slotAverages.set(slotKey, { historicalAvg: 0, samples: 0, weeklyGrowthRate: 0 });
      const sObj = slotAverages.get(slotKey)!;
      sObj.historicalAvg += entry.avgTrafficScore;
      sObj.samples += 1;
    }

    for (const [key, val] of slotAverages.entries()) {
      val.historicalAvg = val.samples > 0 ? val.historicalAvg / val.samples : 0;
    }

    const hourlyAverages = Array.from({ length: 24 }, (_, i) => {
      const data = hourDataMap.get(i);
      return {
        hour: i,
        time: `${String(i).padStart(2, '0')}:00z`,
        avgScore: data && data.count > 0 ? Math.round(data.scoreSum / data.count) : 0,
        peakScore: data ? data.maxScore : 0,
      };
    });

    const dailyAverages = Array.from({ length: 7 }, (_, i) => {
      const dayNum = i + 1;
      const data = dayDataMap.get(dayNum);
      const label = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'][i];
      return {
        dayOfWeek: dayNum,
        day: label,
        avgScore: data && data.count > 0 ? Math.round(data.scoreSum / data.count) : 0,
      };
    });

    const formatHour = (h: number) => `${String(h).padStart(2, '0')}:00z`;

    const sortedWeeks = Array.from(weeklyDataMap.entries()).sort((a, b) => a[0].localeCompare(b[0]));
    for (const [slotKey, slotInfo] of slotAverages.entries()) {
      const [dStr, hStr] = slotKey.split('-');
      const d = parseInt(dStr, 10);
      const h = parseInt(hStr, 10);

      const slotWeekScores: number[] = [];
      for (const [wKey] of sortedWeeks) {
        const match = historicalSummaries.find(entry => entry.dayOfWeek === d && entry.hour === h && getWeekKey(new Date(entry.date)) === wKey);
        if (match) {
          slotWeekScores.push(match.avgTrafficScore);
        }
      }

      if (slotWeekScores.length >= 2) {
        let totalGrowth = 0;
        let intervals = 0;
        for (let i = 1; i < slotWeekScores.length; i += 1) {
          const prev = slotWeekScores[i - 1];
          const curr = slotWeekScores[i];
          if (prev > 0) {
            totalGrowth += (curr - prev) / prev;
            intervals += 1;
          }
        }
        slotInfo.weeklyGrowthRate = intervals > 0 ? totalGrowth / intervals : 0;
      }
    }

    const currentDeviation = latestSummary && slotAverages.has(`${latestSummary.dayOfWeek}-${latestSummary.hour}`)
      ? slotAverages.get(`${latestSummary.dayOfWeek}-${latestSummary.hour}`)!.historicalAvg > 0
        ? (latestSummary.avgTrafficScore - slotAverages.get(`${latestSummary.dayOfWeek}-${latestSummary.hour}`)!.historicalAvg) / slotAverages.get(`${latestSummary.dayOfWeek}-${latestSummary.hour}`)!.historicalAvg
        : 0
      : 0;

    const predictions = [];
    const fallbackTrendDeltaPerSnapshot = recentForTrend.length >= 2
      ? (recentForTrend[recentForTrend.length - 1].avgTrafficScore - recentForTrend[0].avgTrafficScore) / (recentForTrend.length - 1)
      : 0;

    const now = new Date();
    for (let h = 1; h <= 3; h += 1) {
      const futureTime = new Date(now.getTime() + h * 60 * 60 * 1000);
      const slot = `${futureTime.getUTCDay() || 7}-${futureTime.getUTCHours()}`;
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

    let recommendedStaffing = 'TOWER';
    if (currentScore >= 120) {
      recommendedStaffing = 'DELIVERY + GROUND + TOWER + APPROACH';
    } else if (currentScore >= 60) {
      recommendedStaffing = 'GROUND + TOWER + APPROACH';
    } else if (currentScore >= 20) {
      recommendedStaffing = 'TOWER + APPROACH';
    }

    return res.json({
      icao: icao.toUpperCase(),
      name: airport.name,
      currentMetrics: {
        trafficScore: currentScore,
        activityLevel: currentLevel,
        trend: currentTrend,
        recommendedStaffing,
      },
      hourlyAverages,
      dailyAverages,
      predictions,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
});

export default router;