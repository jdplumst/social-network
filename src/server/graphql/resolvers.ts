import { authResolvers } from "./resolvers/auth";
import { profileResolvers } from "./resolvers/profile";

export const resolvers = {
  Query: {
    ...profileResolvers.Query
  },
  Mutation: {
    ...authResolvers,
    ...profileResolvers.Mutation
  }
};

// User: {
//   profile: async (parent: any, args: any, context: Context) => {
//     return await context.prisma.profile.findUnique({
//       where: { userId: parent.id }
//     });
//   }
// },
