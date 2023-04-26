import { Context } from "./context";
import { prisma } from "../../prisma/db";

export const resolvers = {
  Query: {
    user: async (parent: any, args: any, context: Context) => {
      return await context.prisma.user.findUnique({ where: { id: args.id } });
    },
    users: async (parent: any, args: any, context: Context) => {
      return await context.prisma.user.findMany();
    }
  },
  User: {
    profile: async (parent: any, args: any, context: Context) => {
      return await context.prisma.profile.findUnique({
        where: { userId: parent.id }
      });
    }
  }
};
