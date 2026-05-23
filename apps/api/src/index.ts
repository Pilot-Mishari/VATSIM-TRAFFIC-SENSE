import express from 'express';
import cors from 'cors';
import { config } from 'dotenv';
import { resolve } from 'path';
import airportRouter from './routes/airport';
import controllersRouter from './routes/controllers';
import analyticsRouter from './routes/analytics';

config({ path: resolve(__dirname, '../.env') });

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.get('/health', (req, res) => {
  res.json({ status: 'ok', service: 'SectorSense API' });
});

app.use('/airport', airportRouter);
app.use('/controllers', controllersRouter);
app.use('/analytics', analyticsRouter);

app.listen(PORT, () => {
  console.log(`SectorSense API running on port ${PORT}`);
});