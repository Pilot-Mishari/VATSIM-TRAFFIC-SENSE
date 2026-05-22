import { Router, Request, Response } from 'express';
import prisma from '../db';

const router: Router = Router();

// GET /airport - list all airports with latest traffic snapshot
router.get('/', async (req: Request, res: Response) => {
  try {
    const airports = await prisma.airport.findMany({
      include: {
        TrafficSnapshot: {
          orderBy: { timestamp: 'desc' },
          take: 1,
        },
      },
      orderBy: { icao: 'asc' },
    });

    res.json(airports);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch airports' });
  }
});

// GET /airport/:icao - get specific airport with recent snapshots
router.get('/:icao', async (req: Request, res: Response) => {
  try {
    const { icao } = req.params;

    const airport = await prisma.airport.findUnique({
      where: { icao: icao.toUpperCase() },
      include: {
        TrafficSnapshot: {
          orderBy: { timestamp: 'desc' },
          take: 10,
        },
      },
    });

    if (!airport) {
      return res.status(404).json({ error: 'Airport not found' });
    }

    res.json(airport);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch airport' });
  }
});

export default router;