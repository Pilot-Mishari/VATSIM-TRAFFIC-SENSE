import 'dotenv/config';
import { PrismaClient } from '../generated/prisma';
import { PrismaPg } from '@prisma/adapter-pg';

const url = process.env.DATABASE_URL!;
console.log('Connecting to:', url);

const adapter = new PrismaPg({ connectionString: url });
const prisma = new PrismaClient({ adapter });

export default prisma;