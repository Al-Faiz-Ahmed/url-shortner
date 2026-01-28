import { genUrlTypeDefs } from "./gen-url.typeDef";
import { genUrlQueryDefs } from "./gen-url.query";
import { genUrlMutationDefs } from "./gen-url.mutation";
import {
  genUrlMutationsResolver,
  genUrlQueriesResolver,
} from "./gen-url.resolver";

export const genUrlAllTypeDefs = [
  genUrlTypeDefs,
  genUrlQueryDefs,
  genUrlMutationDefs,
];

export const genUrlResolvers = {
  queries: genUrlQueriesResolver,
  mutations: genUrlMutationsResolver,
};
