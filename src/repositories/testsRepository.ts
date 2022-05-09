import { prisma } from "../database.js";

export default async function truncate() {
  await prisma.$executeRaw`TRUNCATE TABLE recommendations`;
}

