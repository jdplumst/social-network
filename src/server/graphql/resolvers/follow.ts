import { Context } from "../context";
import {
  MutationCreateFollowArgs,
  MutationDeleteFollowArgs,
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
      if (!follower) {
        throw Error("Must have an existing profile to follow.");
      }
      if (follower.id === args.profileId) {
        throw Error("Cannot follow yourself");
      }
      const follow = await context.prisma.follow.create({
        data: { profileId: args.profileId, followerId: follower.id }
      });
      return follow;
    },

    deleteFollow: async (
      _parent: any,
      args: MutationDeleteFollowArgs,
      context: Context
    ) => {
      if (!context.user) {
        throw Error("Not authorized to make this request.");
      }
      const follower = await context.prisma.profile.findUnique({
        where: { userId: context.user.id }
      });
      if (!follower) {
        throw Error("Must have an existing profile to follow.");
      }
      const follow = await context.prisma.follow.delete({
        where: {
          profileId_followerId: {
            profileId: args.profileId,
            followerId: follower.id
          }
        }
      });
      if (!follow) {
        throw Error("Not following this user");
      }
      return follow;
    }
  }
};
