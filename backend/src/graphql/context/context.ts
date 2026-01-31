import { prisma } from "../../lib/config/prisma-config";
import { createLoaders, type Loaders } from "./loaders";

export type GraphQLContext = {
  prisma: typeof prisma;
  req: Request;
  loaders: Loaders;
};

export const createContext = (req: Request): GraphQLContext => {
  return {
    prisma,
    req,
    loaders: createLoaders(prisma),
  };
}