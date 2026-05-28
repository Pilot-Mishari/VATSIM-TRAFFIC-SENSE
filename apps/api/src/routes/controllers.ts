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
    const { icao } = req.params;

    const airport = await prisma.airport.findUnique({
      where: { icao: icao.toUpperCase() },
    });

    if (!airport) return res.status(404).json({ error: 'Airport not found' });

    // Get sessions that started recently and haven't ended
    const activeSessions = await prisma.controllerSession.findMany({
      where: {
        airportId: airport.id,
        endTime: null,
      },
      orderBy: { startTime: 'desc' },
    });

    res.json(activeSessions);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch live controllers' });
  }
});

// GET /controllers/live/:icao - get currently online controllers for an airport
router.get('/live/:icao', async (req: Request, res: Response) => {
  try {
    const { icao } = req.params;

    const airport = await prisma.airport.findUnique({
      where: { icao: icao.toUpperCase() },
    });

    if (!airport) return res.status(404).json({ error: 'Airport not found' });

    // Get sessions that started recently and haven't ended
    const activeSessions = await prisma.controllerSession.findMany({
      where: {
        airportId: airport.id,
        endTime: null,
      },
      orderBy: { startTime: 'desc' },
    });

    res.json(activeSessions);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch live controllers' });
  }
});

router.get('/live/:icao', async (req: Request, res: Response) => {
  try {
    const icao = (req.params.icao as string).toUpperCase();
    
    
    const response = await fetch('https://data.vatsim.net/v3/vatsim-data.json');
    const data = await response.json() as any;
    
    const controllers = (data.controllers ?? []).filter((c: any) => 
      c.callsign.startsWith(icao)
    );

    res.json(controllers);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch live controllers' });
  }
});
export default router;