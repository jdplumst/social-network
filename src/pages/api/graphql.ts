import { ApolloServer } from "@apollo/server";
import { typeDefs } from "@/graphql/schema";
import { resolvers } from "@/graphql/resolvers";
import { startServerAndCreateNextHandler } from "@as-integrations/next";
import { prisma } from "../../../prisma/db";
import { PrismaClient } from "@prisma/client";
import jsonwebtoken from "jsonwebtoken";
import { NextApiRequest } from "next";

const server = new ApolloServer<object>({
  typeDefs,
  resolvers
});

async function auth(prisma: PrismaClient, req: NextApiRequest) {
  const { token } = req.cookies;
  if (!token) {
    return null;
  }
  try {
    const verification = jsonwebtoken.verify(
      token,
      process.env.TOKEN_SECRET as string
    );
    const user = await prisma.user.findUnique({
      where: { id: (verification as jsonwebtoken.JwtPayload).id.toString() }
    });
    if (!user) {
      return null;
    }
    return user;
  } catch (error) {
    return null;
  }
}

export default startServerAndCreateNextHandler<NextApiRequest>(server, {
  context: async (req, res) => ({
    req,
    res,
    prisma,
    user: await auth(prisma, req)
  })
});