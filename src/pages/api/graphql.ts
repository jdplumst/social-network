import { ApolloServer } from "@apollo/server";
import { typeDefs } from "@/graphql/schema";
import { resolvers } from "@/graphql/resolvers";
import { startServerAndCreateNextHandler } from "@as-integrations/next";
import { Context } from "@/graphql/context";
import { prisma } from "../../../prisma/db";
import { NextRequest } from "next/server";

const server = new ApolloServer<object>({
  typeDefs,
  resolvers
});

export default startServerAndCreateNextHandler<NextRequest>(server, {
  context: async (req, res) => ({ req, res, prisma })
});
