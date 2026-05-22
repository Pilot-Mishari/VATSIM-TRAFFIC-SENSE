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

export default router;