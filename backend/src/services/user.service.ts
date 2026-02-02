import { ValidationError } from "../error/app.error";
import { CatchPrismaError } from "../error/prisma.error";
import type { GraphQLContext } from "../graphql/context/context";
// import { ICreateUser } from "../types/models";
// import { vCreateUser } from "../validations/models/user-validation";

export class UserService {
  public static async getUserById(userId: string, context: GraphQLContext) {
    const { prisma } = context;
    try {
      return prisma.user.findUnique({
        where: {
          id: userId,
        },
      });
    } catch (err) {
      console.log("Error from Creating User", err);
      CatchPrismaError(err);
      
    }
  }

  public static async getUserByIpAddress(
    ipAddress: string,
    context: GraphQLContext,
  ) {
    const { prisma } = context;
    if (!ipAddress) return null;
    try {
      return prisma.user.findFirst({
        where: {
          ipAddress,
        },
      });
    } catch (err) {
      console.log("Error from getUserByIpAddress", err);
      CatchPrismaError(err);
    }
  }

  public static async createUser(context: GraphQLContext) {
    const { prisma, clientIp } = context;

    try {
      return prisma.user.create({
        data: {
          ipAddress: clientIp,
        },
      });
    } catch (err) {
      console.log("Error from Creating User", err);
      CatchPrismaError(err);
      
    }
  }

  public static async updateUserTotalShortendURL(
    userId: string,
    context: GraphQLContext,
  ) {
    const { prisma } = context;
    try {
      return prisma.user.update({
        where: {
          id: userId,
        },
        data: {
          totalShortenedURL: { increment: 1 },
        },
      });
    } catch (err) {
      console.log("Error from Creating User", err);
      CatchPrismaError(err);
    }
  }
}
