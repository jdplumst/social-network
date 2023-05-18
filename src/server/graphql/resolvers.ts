import { Resolvers } from "./server-gen/graphql";
import { authResolvers } from "./resolvers/auth";
import { postResolvers } from "./resolvers/post";
import { profileResolvers } from "./resolvers/profile";

export const resolvers: Resolvers = {
  Query: {
    ...profileResolvers.Query,
    ...postResolvers.Query
  },
  Mutation: {
    ...authResolvers,
    ...profileResolvers.Mutation,
    ...postResolvers.Mutation
  }
};

// User: {
//   profile: async (parent: any, args: any, context: Context) => {
//     return await context.prisma.profile.findUnique({
//       where: { userId: parent.id }
//     });
//   }
// },
