import { config } from 'dotenv';
import { resolve } from 'path';

config({ path: resolve(__dirname, '../.env') });

import { PrismaClient } from '../generated/prisma';
import { PrismaPg } from '@prisma/adapter-pg';

const url = process.env.DATABASE_URL!;

const adapter = new PrismaPg({ connectionString: url });
const prisma = new PrismaClient({ adapter });

export default prisma;