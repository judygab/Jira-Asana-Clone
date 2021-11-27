// prisma/seed.ts

import { PrismaClient } from '@prisma/client'
import { data } from '../data/tasks'
const prisma = new PrismaClient()

async function main() {
  await prisma.user.create({
    data: {
      email: `testemail@gmail.com`,
    },
  })

  await prisma.task.createMany({
    data: data,
  })
}

main()
  .catch(e => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
