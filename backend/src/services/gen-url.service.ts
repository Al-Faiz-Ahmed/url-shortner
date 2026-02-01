import { IGenUniqueUrl } from "../types/models";
import {
  vGenUniqueUrl,
  vUniqueHash,
} from "../validations/models/gen-url-validation";
import type { GraphQLContext } from "../graphql/context/context";
import { ValidationError } from "../error/app.error";
import { CatchPrismaError } from "../error/prisma.error";
import { envConfig } from "../lib/config/env-config";
import { prisma } from "../lib/config/prisma-config";

export class GenUrlService {
  /** Resolve short code to original URL; returns null if not found or blocked. */
  public static async resolveShortCode(
    uniqueHash: string,
  ): Promise<string | null> {
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

  public static async getAllUrlById(userId: string, context: GraphQLContext) {
    const { prisma } = context;
    if (!userId) {
      return ValidationError("user Id is required to find Generated URL Data");
    }

    
    return prisma.generatedURL.findMany({
      where: { userId },
    });
  }

  public static async findUniqueHashRecord(
    uniqueHash: string,
    context: GraphQLContext,
  ) {
    const { prisma } = context;

    if (!uniqueHash) {
      return ValidationError("Unique Hash is required");
    }

    const response = vUniqueHash.safeParse({ uniqueHash });
    if (response.success === false) {
      const schemaErr =
        response.error.issues[0]?.message || "Error found in schema";
      return ValidationError(schemaErr);
    }

    try{

      const uniqueHashRecord =await prisma.generatedURL.findUnique({
        where: { uniqueHash },
        select: { uniqueHash: true },
      });
  
  
      if(uniqueHashRecord){ 
        return {
          uniqueHash,
          available: false,
          message:"This Unique Hash is already taken",
        }
      }
      return {
        uniqueHash,
        available: true,
        message:"This Unique Hash is available",
      }
  
    }catch(err){
      console.log("Error from findUniqueHashRecord", err);
      CatchPrismaError(err);
    }

    
  }
}
