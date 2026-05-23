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
    const totalAirports = await prisma.airport.count();
    const totalSnapshots = await prisma.trafficSnapshot.count();

    const latest = await prisma.trafficSnapshot.findMany({
      orderBy: { timestamp: 'desc' },
      take: 1,
    });

    const latestTimestamp = latest[0]?.timestamp ?? null;

    const recentSnapshots = await prisma.trafficSnapshot.findMany({
      where: {
        timestamp: {
          gte: new Date(Date.now() - 20 * 60 * 1000),
        },
      },
    });

    const totalAircraft = recentSnapshots.reduce((sum, s) => sum + s.totalAircraft, 0);
    const totalArrivals = recentSnapshots.reduce((sum, s) => sum + s.arrivals, 0);
    const totalDepartures = recentSnapshots.reduce((sum, s) => sum + s.departures, 0);

    res.json({
      totalAirports,
      totalSnapshots,
      latestTimestamp,
      activeAirports: recentSnapshots.length,
      totalAircraft,
      totalArrivals,
      totalDepartures,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch summary' });
  }
});

export default router;