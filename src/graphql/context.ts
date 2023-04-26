import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";

export type Context = {
  req: NextApiRequest;
  res: NextApiResponse;
  prisma: PrismaClient;
};
