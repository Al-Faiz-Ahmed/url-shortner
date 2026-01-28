import { GraphQLError } from "graphql";
import { IGenUniqueUrl } from "../../../types/models";
import { vGenUniqueUrl } from "../../../validations/models/gen-url-validation.schema";
import { GraphQLContext } from "../../context/context";

export class GenURL {
  public static generateUniqueURL(
    payload: IGenUniqueUrl,
    context: GraphQLContext,
  ) {
    const { givenURL, uniqueHash, userId } = payload;
    const response = vGenUniqueUrl.safeParse({ ...payload });

    if (response.success === false) {
      console.log(response.error.message);
      const schemaErr = response.error.issues[0]?.message || "Error found in schema"
      throw new GraphQLError(schemaErr, {
        extensions: {
          code: "VALIDATION_ERROR",
        },
      });
    }
  }
}
