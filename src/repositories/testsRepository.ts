import { prisma } from "../database.js";

async function truncate() {
  await prisma.$executeRaw`TRUNCATE TABLE recommendations`;
}
async function seed(body) {
  await prisma.recommendation.createMany({data:body});
}


export const testsRepository  ={
  truncate,
  seed
};