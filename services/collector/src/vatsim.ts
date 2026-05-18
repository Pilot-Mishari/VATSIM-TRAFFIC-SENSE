import axios from 'axios';
import prisma from './db';

const VATSIM_API_URL = 'https://data.vatsim.net/v3/vatsim-data.json';

function getPositionType(callsign: string): string {
  if (callsign.endsWith('_DEL')) return 'DEL';
  if (callsign.endsWith('_GND')) return 'GND';
  if (callsign.endsWith('_TWR')) return 'TWR';
  if (callsign.endsWith('_APP')) return 'APP';
  if (callsign.endsWith('_CTR')) return 'CTR';
  return 'UNKNOWN';
}

function getAirportIcao(callsign: string): string {
  return callsign.split('_')[0];
}

function calculateTrafficScore(arrivals: number, departures: number, overflights: number): number {
  return (arrivals * 3) + (departures * 2) + (overflights * 1);
}

export async function fetchVatsimData() {
  try {
    const response = await axios.get(VATSIM_API_URL);
    const data = response.data;

    const pilots = data.pilots ?? [];
    const controllers = data.controllers ?? [];

    console.log(`Pilots online: ${pilots.length}`);
    console.log(`Controllers online: ${controllers.length}`);

    // Group pilots by departure/arrival airport
    const airportTraffic: Record<string, { arrivals: number; departures: number; overflights: number }> = {};

    for (const pilot of pilots) {
      const dep = pilot.flight_plan?.departure;
      const arr = pilot.flight_plan?.arrival;

      if (dep) {
        if (!airportTraffic[dep]) airportTraffic[dep] = { arrivals: 0, departures: 0, overflights: 0 };
        airportTraffic[dep].departures++;
      }

      if (arr) {
        if (!airportTraffic[arr]) airportTraffic[arr] = { arrivals: 0, departures: 0, overflights: 0 };
        airportTraffic[arr].arrivals++;
      }
    }

    console.log(`Processing ${Object.keys(airportTraffic).length} airports...`);

    // Store snapshots for each airport
    for (const [icao, traffic] of Object.entries(airportTraffic)) {
      if (icao.length !== 4) continue;
      console.log(`Storing snapshot for ${icao}...`);

      const airport = await prisma.airport.upsert({
        where: { icao },
        update: {},
        create: { icao },
      });

      const trafficScore = calculateTrafficScore(traffic.arrivals, traffic.departures, traffic.overflights);

      await prisma.trafficSnapshot.create({
        data: {
          airportId: airport.id,
          arrivals: traffic.arrivals,
          departures: traffic.departures,
          overflights: traffic.overflights,
          totalAircraft: traffic.arrivals + traffic.departures + traffic.overflights,
          trafficScore,
        },
      });
    }

    console.log(`Snapshots stored for ${Object.keys(airportTraffic).length} airports`);

  } catch (error) {
    console.error('Failed to fetch VATSIM data:', error);
  }
}