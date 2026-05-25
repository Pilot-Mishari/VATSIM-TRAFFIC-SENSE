import { config } from 'dotenv';
import { resolve } from 'path';

config({ path: resolve(__dirname, '../.env') });

import { PrismaClient } from '../generated/prisma';
import { PrismaPg } from '@prisma/adapter-pg';

let url = process.env.DATABASE_URL!;
if (url.startsWith('DATABASE_URL=')) {
  url = url.replace('DATABASE_URL=', '');
}

// Set NODE_PATH to help resolve prisma runtime utils
process.env.NODE_PATH = resolve(__dirname, '../../../node_modules');
require('module').Module._initPaths();

const adapter = new PrismaPg({ connectionString: url });
const prisma = new PrismaClient({ adapter });

export default prisma;