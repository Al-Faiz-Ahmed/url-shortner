

import { prisma } from '../../lib/config/prisma-config'


export type GraphQLContext = {
  prisma: typeof prisma
  req: Request
}

export const createContext = (req: Request): GraphQLContext => {
  
  return {
    prisma,
    req
  }
}