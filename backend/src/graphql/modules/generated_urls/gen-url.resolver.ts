import { IGenUniqueUrl } from "../../../types/models";
import { GraphQLContext } from "../../context/context";
import { GenUrlService } from "../../../services/gen-url.service";
import { UserService } from "../../../services/user.service";
import { CatchPrismaError } from "../../../error/prisma.error";
import { vGenUniqueUrl } from "../../../validations/models/gen-url-validation";
import { NotFoundError, ValidationError } from "../../../error/app.error";
import {
  vMultipleUUIDS,
  vUserUUID,
} from "../../../validations/models/user-validation";

export const genUrlQueriesResolver = {
  getAllUrl: async (
    _: unknown,
    { userId }: { userId: string },
    context: GraphQLContext,
  ) => {
    if (!userId) {
      const userByIp = await UserService.getUserByIpAddress(
        context.clientIp,
        context,
      );
      if (userByIp) {
        userId = userByIp.id;
      } else {
        return NotFoundError("URL not Found regarding your user id", {
          userId,
        });
      }
    }

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
    const response = vGenUniqueUrl.safeParse({ ...payload.input });

    if (response.success === false) {
      const schemaErr =
        response.error.issues[0]?.message || "Error found in schema";
      return ValidationError(schemaErr);
    }
    let userId = payload.input.userId || "";

    try {
      if (!userId) {
        const userByIp = await UserService.getUserByIpAddress(
          context.clientIp,
          context,
        );
        if (userByIp) {
          userId = userByIp.id;
        } else {
          const user = await UserService.createUser(context);
          if (user) userId = user.id;
        }
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

  deleteURLbyId: async (
    _: unknown,
    payload: { input: { userId: string; urlId: string } },
    context: GraphQLContext,
  ) => {
    const {urlId,userId} = payload.input
    let response = vUserUUID.safeParse({ userId });

    if (response.success === false) {
      const schemaErr =
        response.error.issues[0]?.message || "Error found in schema";
      return ValidationError(schemaErr);
    }

    response = vUserUUID.safeParse({ userId:urlId });

    if (response.success === false) {
      const schemaErr =
        response.error.issues[0]?.message || "Error found in schema";
      return ValidationError(schemaErr);
    }

    return await GenUrlService.deleteURLById(userId,urlId, context);
  },

  deleteMultipleURLbyId: async (
    _: unknown,
    payload: { input: { userId: string; urlsId: string[] } },
    context: GraphQLContext,
  ) => {
    const {
      urlsId,userId
    } = payload.input;

    const responseId = vMultipleUUIDS.safeParse({ uuids: urlsId });

    if (responseId.success === false) {
      const schemaErr =
        responseId.error.issues[0]?.message || "Error found in schema";
      return ValidationError(schemaErr);
    }

    const response = vUserUUID.safeParse({ userId });

    if (response.success === false) {
      const schemaErr =
        response.error.issues[0]?.message || "Error found in schema";
      return ValidationError(schemaErr);
    }

    return await GenUrlService.deleteMultipleURLsById(userId,urlsId, context);
  },

  _empty: (_: unknown, _args: unknown, context: GraphQLContext) => `Faizan`,
};
