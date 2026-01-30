import { moduleResolvers } from './modules'

export const resolvers = {
  Query: {
    ...moduleResolvers.Query,
  },
  Mutation: {
    ...moduleResolvers.Mutation,
  },
  
  ...moduleResolvers.Feilds,
}
