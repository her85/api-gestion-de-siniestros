// src/config/database.ts
import { PrismaClient } from '@prisma/client';
import { PrismaLibSql } from '@prisma/adapter-libsql';

// Para Prisma 7 con módulos ESM, necesitamos usar el adapter de libsql para SQLite
const adapter = new PrismaLibSql({
  url: process.env.DATABASE_URL || 'file:./dev.db'
});

export const prisma = new PrismaClient({ 
  adapter,
  log: ['query', 'error', 'warn'],
});

export default prisma;
