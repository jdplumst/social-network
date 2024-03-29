import {
  MutationCreatePostArgs,
  Post,
  QueryFollowingPostsArgs
} from "../server-gen/graphql";
import { Context } from "../context";

export const postResolvers = {
  Query: {
    posts: async (_parent: any, _args: any, context: Context) => {
      if (!context.user) {
        throw Error("Not authorized to make this request.");
      }
      const posts = await context.prisma.post.findMany({
        orderBy: { createDate: "desc" }
      });
      return posts;
    },

    followingPosts: async (
      _parent: any,
      args: QueryFollowingPostsArgs,
      context: Context
    ) => {
      if (!context.user || !args.profileId) {
        throw Error("Not authorized to make this request.");
      }
      const f = await context.prisma.follow.findMany({
        where: { followerId: args.profileId },
        select: { profileId: true }
      });
      const followees = f.map((f) => f.profileId);
      const posts = await context.prisma.post.findMany({
        where: { profileId: { in: followees } },
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
      if (!args.description || !args.description.replace(/\s/g, "").length) {
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
