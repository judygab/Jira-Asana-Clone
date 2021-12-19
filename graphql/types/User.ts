import { enumType, objectType, nonNull, extendType, stringArg } from 'nexus'
import { Task } from './Task'

export const User = objectType({
  name: 'User',
  definition(t) {
    t.string('id')
    t.string('name')
    t.string('email')
    t.string('image')
    t.field('role', { type: Role })
    t.list.field('tasks', {
      type: Task,
      async resolve(parent, _args, ctx) {
        return await ctx.prisma.user
          .findUnique({
            where: {
              id: parent.id,
            },
          })
          .tasks()
      },
    })
  },
})

export const UsersQuery = extendType({
  type: 'Query',
  definition(t) {
    // get all users
    t.nonNull.list.field('users', {
      type: 'User',
      resolve(_parent, _args, ctx) {
        return ctx.prisma.user.findMany()
      },
    });
    // get user by email
    t.field('user', {
      type: 'User',
      args: {
        email: nonNull(stringArg())
      },
      resolve(_parent, args, ctx) {
        return ctx.prisma.user.findUnique({
          where: { email: args.email },
        });
      },
    });
  },
})

const Role = enumType({
  name: 'Role',
  members: ['FREE', 'SUBSCRIBED'],
})
