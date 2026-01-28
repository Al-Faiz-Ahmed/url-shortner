import { IGenUniqueUrl } from "../types/models";
import { vGenUniqueUrl } from "../validations/models/gen-url-validation.schema";
import type { GraphQLContext } from "../graphql/context/context";
import { ValidationError } from "../error/app.error";

export class GenURL {
  public static generateUniqueURL(
    payload: IGenUniqueUrl,
    context: GraphQLContext,
  ) {
    const response = vGenUniqueUrl.safeParse({ ...payload });

    if (response.success === false) {
      const schemaErr =
        response.error.issues[0]?.message || "Error found in schema";

      throw ValidationError(schemaErr);
    }

    // TODO: implement actual GeneratedURL creation using `context.prisma`
    // and return the generated short URL/string as defined in your schema.
  }
}

