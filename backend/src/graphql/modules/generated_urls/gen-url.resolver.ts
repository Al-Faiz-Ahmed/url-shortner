import { IGenUniqueUrl } from "../../../types/models";
import { GraphQLContext } from "../../context/context";
import { GenUrlService } from "../../../services/gen-url.service";
import { UserService } from "../../../services/user.service";
import { CatchPrismaError } from "../../../error/prisma.error";
import { vGenUniqueUrl } from "../../../validations/models/gen-url-validation";
import { NotFoundError, ValidationError } from "../../../error/app.error";
import { vUserUUID } from "../../../validations/models/user-validation";

export const genUrlQueriesResolver = {
  getAllUrl: async (
    _: unknown,
    { userId }: { userId: string },
    context: GraphQLContext,
  ) => {
    if (!userId) return null;
    try {
      const response = vUserUUID.safeParse({ userId });

      if (response.success === false) {
        const schemaErr =
          response.error.issues[0]?.message || "Error found in schema";
        return ValidationError(schemaErr);
      }

      const user = await UserService.getUserById(userId, context);
      if (!user) {
        return NotFoundError("No User Found Regarding this id", { userId });
      }

      return await GenUrlService.getAllUrlById(userId, context);
    } catch (err) {
      console.log("Error from getAllUrlQueryResolver", err);
      CatchPrismaError(err);
    }
  },

  findUniqueHashRecord: async (
    _: unknown,
    { uniqueHash }: { uniqueHash: string },
    context: GraphQLContext,
  ) => {
    return await GenUrlService.findUniqueHashRecord(uniqueHash, context);
  },
  _empty: (_: unknown, _args: unknown, context: GraphQLContext) => `Faizan`,
};

export const genUrlMutationsResolver = {
  generateUniqueURL: async (
    _: unknown,
    payload: { input: IGenUniqueUrl },
    context: GraphQLContext,
  ) => {
    let userId = payload.input.userId || "";

    const response = vGenUniqueUrl.safeParse({ ...payload.input, userId });

    if (response.success === false) {
      const schemaErr =
        response.error.issues[0]?.message || "Error found in schema";
      return ValidationError(schemaErr);
    }

    try {
      if (!userId) {
        const user = await UserService.createUser(context);
        if (user) userId = user.id;
      }

      const generatedURL = await GenUrlService.generateUniqueURL(
        { ...payload.input, userId },
        context,
      );

      await UserService.updateUserTotalShortendURL(userId, context);
      return generatedURL;
    } catch (err) {
      console.log("Error from genUrlMutationResolver", err);
      CatchPrismaError(err);
    }
  },

  _empty: (_: unknown, _args: unknown, context: GraphQLContext) => `Faizan`,
};
