import { Post, Profile, Resolvers } from "./server-gen/graphql";
import { authResolvers } from "./resolvers/auth";
import { postResolvers } from "./resolvers/post";
import { profileResolvers } from "./resolvers/profile";
import { Context } from "./context";
import { followResolvers } from "./resolvers/follow";

export const resolvers: Resolvers = {
  Query: {
    ...profileResolvers.Query,
    ...postResolvers.Query,
    ...followResolvers.Query
  },
  Mutation: {
    ...authResolvers,
    ...profileResolvers.Mutation,
    ...postResolvers.Mutation,
    ...followResolvers.Mutation
  },
  Post: {
    profile: async (parent: Post, _args: any, context: Context) => {
      const profile = await context.prisma.profile.findUnique({
        where: { id: parent.profileId! }
      });
      return profile!;
    }
  },
  Profile: {
    posts: async (parent: Profile, _args: any, context: Context) => {
      const posts = await context.prisma.post.findMany({
        where: { profileId: parent.id! },
        orderBy: { createDate: "desc" }
      });
      return posts;
    }
  }
};
