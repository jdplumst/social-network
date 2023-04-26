import { ApolloServer } from "@apollo/server";
import { typeDefs } from "@/graphql/schema";
import { resolvers } from "@/graphql/resolvers";
import { startServerAndCreateNextHandler } from "@as-integrations/next";
import { Context } from "@/graphql/context";
import { prisma } from "../../../prisma/db";

const server = new ApolloServer<Context>({
  typeDefs,
  resolvers
});

export default startServerAndCreateNextHandler(server, {
  context: async (req, res) => ({ req, res, prisma })
});
