import { IGenUniqueUrl } from "../types/models";
import { vGenUniqueUrl } from "../validations/models/gen-url-validation";
import type { GraphQLContext } from "../graphql/context/context";
import { ValidationError } from "../error/app.error";
import { CatchPrismaError } from "../error/prisma.error";
import { envConfig } from "../lib/config/env-config";
import { prisma } from "../lib/config/prisma-config";

export class GenUrlService {
  /** Resolve short code to original URL; returns null if not found or blocked. */
  public static async resolveShortCode(uniqueHash: string): Promise<string | null> {
    const record = await prisma.generatedURL.findUnique({
      where: { uniqueHash },
      select: { givenURL: true, isBlock: true },
    });
    if (!record || record.isBlock) return null;

    await prisma.generatedURL.update({
      where: { uniqueHash },
      data: { totalVisitors: { increment: 1 } },
    });
    return record.givenURL;
  }
  public static async generateUniqueURL(
    payload: IGenUniqueUrl & { userId: string },
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
      const newGeneratedUrl = `${envConfig.PUBLIC_SITE_URL}/${payload.uniqueHash}`;
      const created = await prisma.generatedURL.create({
        data: {
          givenURL: payload.givenURL,
          uniqueHash: payload.uniqueHash,
          generatedURL: newGeneratedUrl,
          userId: payload.userId,
        },
      });

      return created;
    } catch (err) {
      console.log("Error from Generate Unique URL", err);
      CatchPrismaError(err);
    }
  }

  public static async getAllUrlById(
     userId: string,
    context: GraphQLContext,
  ) {
    const { prisma } = context;
    if (!userId) {
      throw ValidationError("user Id is required to find Generated URL Data");
    }

    return prisma.generatedURL.findMany({
      where: { userId },
    });
  }
}
