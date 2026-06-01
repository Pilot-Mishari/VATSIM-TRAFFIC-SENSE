import { Prisma } from '@prisma/client';
import axios from 'axios';
import prisma from './db';

const VATSIM_API_URL = 'https://data.vatsim.net/v3/vatsim-data.json';
const RETENTION_DAYS = 11;

function calculateTrafficScore(arrivals: number, departures: number): number {
  return (arrivals * 3) + (departures * 2);
}

function getRetentionCutoff(): Date {
  return new Date(Date.now() - RETENTION_DAYS * 24 * 60 * 60 * 1000);
}

async function archiveOldSnapshots(): Promise<number> {
  const cutoff = getRetentionCutoff();

  const summaries = await prisma.$queryRaw<Array<{
    airportId: number;
    day: Date;
    snapshotsCount: number;
    totalArrivals: number;
    totalDepartures: number;
    totalAircraft: number;
    sumTrafficScore: number;
    peakTrafficScore: number;
  }>>(
    Prisma.sql`
      SELECT
        airport_id AS "airportId",
        date_trunc('day', timestamp) AS day,
        count(*) AS "snapshotsCount",
        sum(arrivals) AS "totalArrivals",
        sum(departures) AS "totalDepartures",
        sum(total_aircraft) AS "totalAircraft",
        sum(traffic_score) AS "sumTrafficScore",
        max(traffic_score) AS "peakTrafficScore"
      FROM "TrafficSnapshot"
      WHERE timestamp < ${cutoff}
      GROUP BY airport_id, date_trunc('day', timestamp);
    `
  );

  for (const summary of summaries) {
    const existing = await prisma.trafficSnapshotArchive.findUnique({
      where: {
        airportId_day: {
          airportId: summary.airportId,
          day: summary.day,
        },
      },
    });

    const peakTrafficScore = existing
      ? Math.max(existing.peakTrafficScore, summary.peakTrafficScore)
      : summary.peakTrafficScore;

    await prisma.trafficSnapshotArchive.upsert({
      where: {
        airportId_day: {
          airportId: summary.airportId,
          day: summary.day,
        },
      },
      create: {
        airportId: summary.airportId,
        day: summary.day,
        snapshotsCount: summary.snapshotsCount,
        totalArrivals: summary.totalArrivals,
        totalDepartures: summary.totalDepartures,
        totalAircraft: summary.totalAircraft,
        sumTrafficScore: summary.sumTrafficScore,
        peakTrafficScore,
      },
      update: {
        snapshotsCount: { increment: summary.snapshotsCount },
        totalArrivals: { increment: summary.totalArrivals },
        totalDepartures: { increment: summary.totalDepartures },
        totalAircraft: { increment: summary.totalAircraft },
        sumTrafficScore: { increment: summary.sumTrafficScore },
        peakTrafficScore,
      },
    });
  }

  return summaries.length;
}

async function cleanupOldSnapshots(): Promise<void> {
  const archivedRows = await archiveOldSnapshots();
  const deleted = await prisma.trafficSnapshot.deleteMany({
    where: {
      timestamp: { lt: getRetentionCutoff() },
    },
  });

  console.log(`Archived ${archivedRows} day-level summaries and pruned ${deleted.count} snapshots older than ${RETENTION_DAYS} days`);
}

export async function fetchVatsimData() {
  try {
    const response = await axios.get(VATSIM_API_URL);
    const data = response.data;

    const pilots = data.pilots ?? [];
    const controllers = data.controllers ?? [];

    console.log(`Pilots online: ${pilots.length}`);
    console.log(`Controllers online: ${controllers.length}`);

    const airportTraffic: Record<string, { arrivals: number; departures: number }> = {};

    for (const pilot of pilots) {
      const dep = pilot.flight_plan?.departure;
      const arr = pilot.flight_plan?.arrival;

      if (dep) {
        if (!airportTraffic[dep]) airportTraffic[dep] = { arrivals: 0, departures: 0 };
        airportTraffic[dep].departures++;
      }

      if (arr) {
        if (!airportTraffic[arr]) airportTraffic[arr] = { arrivals: 0, departures: 0 };
        airportTraffic[arr].arrivals++;
      }
    }

    const icaoCodes = Object.keys(airportTraffic).filter(icao => icao.length === 4);

    console.log(`Processing ${icaoCodes.length} airports...`);

    // Upsert all airports in batches to avoid transaction timeout
    const BATCH_SIZE = 50;
    for (let i = 0; i < icaoCodes.length; i += BATCH_SIZE) {
      const batch = icaoCodes.slice(i, i + BATCH_SIZE);
      await prisma.$transaction(
        batch.map(icao =>
          prisma.airport.upsert({
            where: { icao },
            update: {},
            create: { icao },
          })
        ),
        { timeout: 30000 }
      );
    }

    // Fetch all airport IDs in one query
    const airports = await prisma.airport.findMany({
      where: { icao: { in: icaoCodes } },
      select: { id: true, icao: true },
    });

    const airportMap = new Map(airports.map(a => [a.icao, a.id]));

    // Batch create all snapshots
    await prisma.trafficSnapshot.createMany({
      data: icaoCodes
        .filter(icao => airportMap.has(icao))
        .map(icao => {
          const traffic = airportTraffic[icao];
          const trafficScore = calculateTrafficScore(traffic.arrivals, traffic.departures);
          return {
            airportId: airportMap.get(icao)!,
            arrivals: traffic.arrivals,
            departures: traffic.departures,
            overflights: 0,
            totalAircraft: traffic.arrivals + traffic.departures,
            trafficScore,
          };
        }),
    });

    console.log(`Snapshots stored for ${icaoCodes.length} airports`);

    await cleanupOldSnapshots();

  } catch (error) {
    console.error('Failed to fetch VATSIM data:', error);
  }
}