import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  await prisma.role.createMany({
    data: [
      { name: 'Admin' },
      { name: 'User' },
    ],
    skipDuplicates: true,
  });

  console.log('Role seed executed successfully!');
}

main()
  .catch((e) => {
    console.error('Error while running seed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
