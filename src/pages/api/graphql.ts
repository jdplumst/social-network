import { ApolloServer } from "@apollo/server";
import { resolvers } from "@/server/graphql/resolvers";
import { startServerAndCreateNextHandler } from "@as-integrations/next";
import { prisma } from "../../server/db";
import { PrismaClient } from "@prisma/client";
import jsonwebtoken from "jsonwebtoken";
import { NextApiRequest } from "next";
import { readFileSync } from "fs";
import path from "path";

const schema = path.join(process.cwd(), "src/server/graphql/schema.graphql");

const typeDefs = readFileSync(schema, "utf8");

const server = new ApolloServer<object>({
  typeDefs,
  resolvers
});

async function auth(prisma: PrismaClient, req: NextApiRequest) {
  const { sn_session } = req.cookies;
  if (!sn_session) {
    return null;
  }
  try {
    const verification = jsonwebtoken.verify(
      sn_session,
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
