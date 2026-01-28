import { ValidationError } from "../error/app.error";
import { CatchPrismaError } from "../error/prisma.error";
import type { GraphQLContext } from "../graphql/context/context";
import { prisma } from "../lib/config/prisma-config";
import { getClientIp } from "../lib/utils/get-IpAddress";
// import { ICreateUser } from "../types/models";
// import { vCreateUser } from "../validations/models/user-validation";

export class User {
  public static async createUser(
    context: GraphQLContext,
  ) {
    const {  req } = context;
    // const response = vCreateUser.safeParse({ ...payload });

    // if (response.success === false) {
    //   const schemaErr =
    //     response.error.issues[0]?.message || "Error found in schema";

    //   throw ValidationError(schemaErr);
    // }

    const clientIpAddress = getClientIp(req) || ""

    try {
      return prisma.user.create({
        data: {
          ipAddress:clientIpAddress,
        },
      });
    } catch (err) {
        console.log("Error from Creating User", err)
      CatchPrismaError(err);
    }
  }
}
