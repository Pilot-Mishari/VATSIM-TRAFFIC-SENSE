import axios from 'axios';
import prisma from './db';

const VATSIM_API_URL = 'https://data.vatsim.net/v3/vatsim-data.json';

function calculateTrafficScore(arrivals: number, departures: number): number {
  return (arrivals * 3) + (departures * 2);
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

    // Upsert all airports in one transaction
    await prisma.$transaction(
      icaoCodes.map(icao =>
        prisma.airport.upsert({
          where: { icao },
          update: {},
          create: { icao },
        })
      )
    );

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