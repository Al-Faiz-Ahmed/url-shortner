import { userTypeDefs } from "./user.typeDef";
import { userQueryDefs } from "./user.query";
import { userMutationDefs } from "./user.mutation";
import { userQueriesResolver, userMutationsResolver} from "./user.resolver";

export const userAllTypeDefs = [userTypeDefs, userQueryDefs, userMutationDefs];

export const userResolvers = { queries:userQueriesResolver, mutations:userMutationsResolver };
