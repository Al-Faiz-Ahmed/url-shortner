import {
  genUrlAllTypeDefs,
  genUrlResolvers,
} from "./generated_urls/gen-url.exportType";
import { userAllTypeDefs, userResolvers } from "./user/user.exportType";

export const moduleTypeDefs = [...userAllTypeDefs, ...genUrlAllTypeDefs];

export const moduleResolvers = {
  Query: {
    ...userResolvers.queries,
    ...genUrlResolvers.queries,
  },
  Mutation: {
    ...userResolvers.mutations,
    ...genUrlResolvers.mutations,
  },
};
