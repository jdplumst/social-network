import { MutationCreatePostArgs } from "../server-gen/graphql";
import { Context } from "@apollo/client";

export const postResolvers = {
  Query: {
    posts: async (_parent: any, args: any, context: Context) => {
      if (!context.user) {
        throw Error("Not authorized to make this request.");
      }
      const posts = await context.prisma.post.findMany({
        orderBy: { createDate: "desc" }
      });
      return posts;
    }
  },

  Mutation: {
    createPost: async (
      _parent: any,
      args: MutationCreatePostArgs,
      context: Context
    ) => {
      if (!context.user || !args.profileId) {
        throw Error("Not authorized to make this request.");
      }
      const profile = await context.prisma.profile.findUnique({
        where: { id: args.profileId }
      });
      if (!profile || profile.userId !== context.user.id) {
        throw Error("Not authorized to make this request.");
      }
      if (!args.description) {
        throw Error("Post cannot be empty");
      }
      const post = await context.prisma.post.create({
        data: {
          profileId: args.profileId,
          description: args.description,
          createDate: new Date(),
          modifyDate: new Date()
        }
      });
      return post;
    }
  }
};
