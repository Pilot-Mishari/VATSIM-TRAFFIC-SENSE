import './db';
import { fetchVatsimData } from './vatsim';

console.log('SectorSense Collector started');

fetchVatsimData().then(() => {
  console.log('Collection complete');
  process.exit(0);
}).catch((error) => {
  console.error('Collection failed:', error);
  process.exit(1);
});