import { ApolloServer } from "@apollo/server";
import { typeDefs } from "@/graphql/schema";
import { resolvers } from "@/graphql/resolvers";
import { startServerAndCreateNextHandler } from "@as-integrations/next";
import { Context } from "@/graphql/context";

const server = new ApolloServer<Context>({
  typeDefs,
  resolvers
});

export default startServerAndCreateNextHandler(server);
