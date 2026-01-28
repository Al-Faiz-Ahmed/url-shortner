import { IGenUniqueUrl } from "../../../types/models";
import { GraphQLContext } from "../../context/context";
import { GenURL } from "../../../services/gen-url.service";

export const genUrlQueriesResolver = {
  _empty: (_: unknown, _args: unknown, context: GraphQLContext) => `Faizan`,
};

export const genUrlMutationsResolver = {

  generateUniqueURL : async (_: unknown, payload: {input:IGenUniqueUrl}, context: GraphQLContext) => {

    return await GenURL.generateUniqueURL(payload.input, context);
    
  },
  _empty: (_: unknown, _args: unknown, context: GraphQLContext) => `Faizan`,
};

