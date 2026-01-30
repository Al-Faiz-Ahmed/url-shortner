import { IGenUniqueUrl } from "../../../types/models";
import { GraphQLContext } from "../../context/context";
import { GenUrlService } from "../../../services/gen-url.service";
import { UserService } from "../../../services/user.service";
import { CatchPrismaError } from "../../../error/prisma.error";

export const genUrlQueriesResolver = {
  _empty: (_: unknown, _args: unknown, context: GraphQLContext) => `Faizan`,
};

export const genUrlMutationsResolver = {
  generateUniqueURL: async (
    _: unknown,
    payload: { input: IGenUniqueUrl },
    context: GraphQLContext,
  ) => {
    // let { userId } = payload.input;

    let userId = payload.input.userId || "";
    try {
      if (!userId) {
        userId = (await UserService.createUser(context)).id;
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
