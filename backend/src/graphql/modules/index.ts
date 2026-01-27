import { userTypeDefs } from './user/user.type'
import { userQueryDefs } from './user/user.query'
import { userMutationDefs } from './user/user.mutation'
import { userResolvers } from './user/user.resolver'

export const moduleTypeDefs = [
  userTypeDefs,
  userQueryDefs,
  userMutationDefs,
]


export const moduleResolvers = {
  Query: {
    ...userResolvers.queries,
  },
  Mutation: {
    ...userResolvers.mutations,
  },
}