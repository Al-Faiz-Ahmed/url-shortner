

import { prisma } from '../../lib/config/prisma-config'


export type GraphQLContext = {
  prisma: typeof prisma
  req: unknown
}

export const createContext = (req: unknown): GraphQLContext => {
  return {
    prisma,
    req
  }
}