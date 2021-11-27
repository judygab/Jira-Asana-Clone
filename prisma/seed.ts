// prisma/seed.ts

import { PrismaClient } from '@prisma/client'
import { tasks } from '../data/tasks'
const prisma = new PrismaClient()

async function main() {
  await prisma.user.create({
    data: {
      email: `testemail@gmail.com`,
      name: 'John Doe',
    },
  })

  await prisma.task.createMany({
    data: tasks,
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
