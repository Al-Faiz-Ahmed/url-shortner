import { IGenUniqueUrl } from "../types/models";
import { vGenUniqueUrl } from "../validations/models/gen-url-validation";
import type { GraphQLContext } from "../graphql/context/context";
import { ValidationError } from "../error/app.error";
import { CatchPrismaError } from "../error/prisma.error";
import { User } from "./user.service";
import { envConfig } from "../lib/config/env-config";


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
      
      const newGeneratedUrl = `${envConfig.PUBLIC_SITE_URL}/${payload.uniqueHash}`
      const created = await prisma.generatedURL.create({
        data: {
          givenURL: payload.givenURL,
          uniqueHash: payload.uniqueHash,
          generatedURL: newGeneratedUrl,
          userId: user.id,
        },
      });

      return created;
    } catch (err) {
      console.log("Error from Generate Unique URL", err)
      CatchPrismaError(err);
    }
  }

  
}

