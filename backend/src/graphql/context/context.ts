import { prisma } from "../../lib/config/prisma-config";
import { createLoaders, type Loaders } from "./loaders";
import { getClientIp } from "../../lib/utils/get-IpAddress";

export type GraphQLContext = {
  prisma: typeof prisma;
  req: Request;
  loaders: Loaders;
  /** Client public IP (from headers set by Express middleware or proxy). */
  clientIp: string;
};

export const createContext = (req: Request): GraphQLContext => {
  return {
    prisma,
    req,
    loaders: createLoaders(prisma),
    clientIp: getClientIp(req) ?? "",
  };
};