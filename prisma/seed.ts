import {prisma } from '../src/database.js';

async function main() {

	await prisma.recommendation.upsert({
    where: { name: "Quero voce do jeito que quiser" },
    update: {},
    create: {
      name: "Quero voce do jeito que quiser",
      youtubeLink: 'https://www.youtube.com/watch?v=JiuYnJYKLus',
    }
  });
}

main()
  .catch((e) => {
    console.log(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });