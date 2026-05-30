import { Router, Request, Response } from 'express';
import prisma from '../db';

const router: Router = Router();

router.get('/', async (req: Request, res: Response) => {
  try {
    const sessions = await prisma.controllerSession.findMany({
      include: { Airport: true },
      orderBy: { startTime: 'desc' },
      take: 50,
    });
    res.json(sessions);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch controller sessions' });
  }
});

router.get('/:icao', async (req: Request, res: Response) => {
  try {
    const { icao } = req.params;
    const sessions = await prisma.controllerSession.findMany({
      where: { Airport: { icao: icao.toUpperCase() } },
      orderBy: { startTime: 'desc' },
      take: 20,
    });
    res.json(sessions);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch controller sessions' });
  }
});

// get currently online controllers for an airport
router.get('/live/:icao', async (req: Request, res: Response) => {
  try {
    const icao = (req.params.icao as string).toUpperCase();

    const airport = await prisma.airport.findUnique({
      where: { icao },
    });

    if (!airport) return res.status(404).json({ error: 'Airport not found' });

    const vatsimResponse = await fetch('https://data.vatsim.net/v3/vatsim-data.json');
    const vatsimData = await vatsimResponse.json() as any;
    const allControllers = Array.isArray(vatsimData.controllers) ? vatsimData.controllers : [];

    const positions = ['DEL', 'GND', 'TWR', 'APP', 'CTR'];
    const normalizeCallsign = (value: any) => String(value ?? '').toUpperCase();

    const matchingControllers = allControllers.filter((c: any) => {
      const callsign = normalizeCallsign(c.callsign);
      return callsign === icao || callsign.startsWith(`${icao}_`) || callsign.startsWith(`${icao}`);
    });

    function findPosition(callsign: string) {
      return callsign
        .split(/[_\s-]+/)
        .filter(Boolean)
        .reverse()
        .find(part => positions.includes(part)) ?? null;
    }

    const activeControllers = [...matchingControllers];
    const activePositions = new Set<string>();

    matchingControllers.forEach((controller: any) => {
      const callsign = normalizeCallsign(controller.callsign);
      const position = findPosition(callsign);
      if (position) activePositions.add(position);
    });

    const eventResponse = await fetch('https://my.vatsim.net/api/v2/events/latest');
    const eventData = await eventResponse.json() as { data: any[] };
    const now = new Date();
    const isAirportInEvent = (eventData.data ?? []).some((event: any) => {
      const starts = new Date(event.start_time);
      const ends = new Date(event.end_time);
      return starts <= now && now <= ends && Array.isArray(event.airports) && event.airports.some((a: any) => String(a.icao).toUpperCase() === icao);
    });

    if (isAirportInEvent) {
      positions.forEach(position => {
        if (!activePositions.has(position)) {
          activeControllers.push({
            callsign: `${icao}_${position}`,
            frequency: 'EVENT',
            position,
          });
        }
      });
    }

    res.json(activeControllers);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch live controllers' });
  }
});

export default router;