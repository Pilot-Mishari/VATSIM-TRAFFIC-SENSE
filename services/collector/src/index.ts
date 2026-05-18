import './db';
import cron from 'node-cron';
import { fetchVatsimData } from './vatsim';

console.log('SectorSense Collector started');

fetchVatsimData();

cron.schedule('*/15 * * * *', () => {
  console.log('Fetching VATSIM data...');
  fetchVatsimData();
});