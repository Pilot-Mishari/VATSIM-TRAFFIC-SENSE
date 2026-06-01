import axios from 'axios';
import prisma from './db';

const VATSIM_API_URL = 'https://data.vatsim.net/v3/vatsim-data.json';

const SUMMARY_AGE_DAYS = 14;
const MIN_SNAPSHOTS_TO_COMPRESS = 6;

function calculateTrafficScore(arrivals: number, departures: number): number {
  return (arrivals * 3) + (departures * 2);
}

export async function compressOldSnapshots() {
  try {
    const groups = await prisma.$queryRawUnsafe<Array<{
      airportId: number;
      day: string;
      snapshotCount: number;
      totalArrivals: number;
      totalDepartures: number;
      totalOverflights: number;
      totalTotalAircraft: number;
      avgTrafficScore: number;
    }>>(
      `SELECT "airportId" AS "airportId",
              to_char(date_trunc('day', "timestamp"), 'YYYY-MM-DD') AS "day",
              count(*) AS "snapshotCount",
              sum("arrivals") AS "totalArrivals",
              sum("departures") AS "totalDepartures",
              sum("overflights") AS "totalOverflights",
              sum("totalAircraft") AS "totalTotalAircraft",
              avg("trafficScore") AS "avgTrafficScore"
       FROM "TrafficSnapshot"
       WHERE "timestamp" < NOW() - interval '${SUMMARY_AGE_DAYS} days'
       GROUP BY "airportId", date_trunc('day', "timestamp")
       HAVING count(*) > ${MIN_SNAPSHOTS_TO_COMPRESS}`
    );

    if (groups.length === 0) {
      console.log(`No old snapshots found to compress older than ${SUMMARY_AGE_DAYS} days`);
      return;
    }

    console.log(`Compressing ${groups.length} old airport/day groups older than ${SUMMARY_AGE_DAYS} days`);

    const summaryRows = groups.map(group => ({
      airportId: group.airportId,
      timestamp: new Date(`${group.day}T12:00:00Z`),
      arrivals: Number(group.totalArrivals),
      departures: Number(group.totalDepartures),
      overflights: Number(group.totalOverflights),
      totalAircraft: Number(group.totalTotalAircraft),
      trafficScore: Math.round(Number(group.avgTrafficScore)),
    }));

    const deleteSql = `DELETE FROM "TrafficSnapshot"
      WHERE "timestamp" < NOW() - interval '${SUMMARY_AGE_DAYS} days'
        AND ("airportId", date_trunc('day', "timestamp")) IN (
          SELECT "airportId", date_trunc('day', "timestamp")
          FROM "TrafficSnapshot"
          WHERE "timestamp" < NOW() - interval '${SUMMARY_AGE_DAYS} days'
          GROUP BY "airportId", date_trunc('day', "timestamp")
          HAVING count(*) > ${MIN_SNAPSHOTS_TO_COMPRESS}
        )`;

    await prisma.$transaction([
      prisma.$executeRawUnsafe(deleteSql),
      prisma.trafficSnapshot.createMany({ data: summaryRows }),
    ]);

    console.log(`Inserted ${summaryRows.length} daily summary snapshot rows`);
  } catch (error) {
    console.error('Failed to compress old snapshots:', error);
  }
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

  } catch (error) {
    console.error('Failed to fetch VATSIM data:', error);
  }
}
