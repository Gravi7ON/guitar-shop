import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function fillDb() {
  console.info('Database was filled')
}

fillDb()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (err) => {
    console.error(err);
    await prisma.$disconnect()

    process.exit(1);
  })
