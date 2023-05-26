import { Context } from "@apollo/client";
import { QueryIsFollowingArgs } from "../server-gen/graphql";

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
  }
};
