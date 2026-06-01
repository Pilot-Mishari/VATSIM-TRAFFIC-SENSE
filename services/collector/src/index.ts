import './db';
import { fetchVatsimData, compressOldSnapshots } from './vatsim';

const INTERVAL_MS = 10 * 60 * 1000; // 10 minutes
const DAILY_COMPRESSION_MS = 24 * 60 * 60 * 1000; // 24 hours

async function run() {
  console.log('SectorSense Collector started');
  
  // Run immediately on startup
  await fetchVatsimData();
  await compressOldSnapshots();
  
  // Then run every 10 minutes
  setInterval(async () => {
    console.log('Fetching VATSIM data...');
    await fetchVatsimData();
  }, INTERVAL_MS);

  // Compress old history once per day
  setInterval(async () => {
    console.log('Compressing old VATSIM history...');
    await compressOldSnapshots();
  }, DAILY_COMPRESSION_MS);
}

run();