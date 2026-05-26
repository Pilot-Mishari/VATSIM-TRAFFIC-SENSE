import './db';
import { fetchVatsimData } from './vatsim';

const INTERVAL_MS = 10 * 60 * 1000; // 10 minutes

async function run() {
  console.log('SectorSense Collector started');
  
  // Run immediately on startup
  await fetchVatsimData();
  
  // Then run every 10 minutes
  setInterval(async () => {
    console.log('Fetching VATSIM data...');
    await fetchVatsimData();
  }, INTERVAL_MS);
}

run();