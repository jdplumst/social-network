import { Context } from "./context";

export const resolvers = {
  Query: {
    hello: () => "world"
    // posts: async (parent: any, args: any, context: Context) => {
    //   context.prisma.post.findMany();
    // }
  }
};
