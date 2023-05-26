import { Context } from "@apollo/client";
import {
  MutationCreateFollowArgs,
  QueryIsFollowingArgs
} from "../server-gen/graphql";

export const followResolvers = {
  Query: {
    isFollowing: async (
      _parent: any,
      args: QueryIsFollowingArgs,
      context: Context
    ) => {
      if (!context.user) {
        throw Error("Not authorized to make this request.");
      }
      const following = await context.prisma.follow.findMany({
        where: { profileId: args.profileId, followerId: args.followerId }
      });
      return following.length !== 0;
    }
  },
  Mutation: {
    createFollow: async (
      _parent: any,
      args: MutationCreateFollowArgs,
      context: Context
    ) => {
      if (!context.user) {
        throw Error("Not authorized to make this request.");
      }
      const follower = await context.prisma.profile.findUnique({
        where: { userId: context.user.id }
      });
      if (follower.id === args.profileId) {
        throw Error("Cannot follow yourself");
      }
      const follow = await context.prisma.follow.create({
        data: { profileId: args.profileId, followerId: follower.id }
      });
      return follow;
    }
  }
};
