import { IGenUniqueUrl } from "../types/models";
import { vGenUniqueUrl } from "../validations/models/gen-url-validation";
import type { GraphQLContext } from "../graphql/context/context";
import { ValidationError } from "../error/app.error";
import { CatchPrismaError } from "../error/prisma.error";
import { User } from "./user.service";

export class GenURL {
  public static async generateUniqueURL(
    payload: IGenUniqueUrl,
    context: GraphQLContext,
  ) {
    const { prisma } = context;
    const response = vGenUniqueUrl.safeParse({ ...payload });

    if (response.success === false) {
      const schemaErr =
        response.error.issues[0]?.message || "Error found in schema";

      throw ValidationError(schemaErr);
    }

    try {

      let user = await User.createUser(context)
      // if (!payload.userId) {
      //   throw ValidationError("userId is required");
      // }

      const created = await prisma.generatedURL.create({
        data: {
          givenURL: payload.givenURL,
          uniqueHash: payload.uniqueHash,
          // No base domain config yet; keep it simple for now.
          generatedURL: payload.uniqueHash,
          userId: user.id,
        },
        // select: { generatedURL: true },
      });

      return created;
    } catch (err) {
      console.log("Error from Generate Unique URL", err)
      CatchPrismaError(err);
    }
  }
}

