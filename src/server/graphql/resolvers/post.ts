import { prisma } from "@/server/db";
import { Context } from "@apollo/client";

export const postResolvers = {
  Mutation: {
    createPost: async (_parent: any, args: any, context: Context) => {
      if (!context.user || !args.profileId) {
        throw Error("Not authorized to make this request.");
      }
      const profile = await prisma.profile.findUnique({
        where: { id: args.profileId }
      });
      if (!profile || profile.userId !== context.user.id) {
        throw Error("Not authorized to make this request.");
      }
      if (!args.description) {
        throw Error("Post cannot be empty");
      }
      const post = await prisma.post.create({
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
