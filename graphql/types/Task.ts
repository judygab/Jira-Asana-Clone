import { objectType, extendType } from 'nexus'
import { User } from './User'

export const Task = objectType({
  name: 'Task',
  definition(t) {
    t.string('id')
    t.string('createdAt')
    t.string('title')
    t.string('url')
    t.string('description')
    t.string('category')
    t.list.field('users', {
      type: User,
      async resolve(parent, _args, ctx) {
        return await ctx.prisma.task
          .findUnique({
            where: {
              id: parent.id,
            },
          })
          .users()
      },
    })
  },
})
