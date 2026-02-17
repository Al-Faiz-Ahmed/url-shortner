import { NotFoundError, ValidationError } from "../../../error/app.error";
import { UserService } from "../../../services/user.service";
import { vUserUUID } from "../../../validations/models/user-validation";
import { GraphQLContext } from "../../context/context";
// import { ICreateUser,  IDeleteUser,  IUpdateUser } from "./types";
// import UserService from "./user.services";

export const userQueriesResolver = {
  getUser: async (
    _: unknown,
    { userId }: { userId?: string },
    context: GraphQLContext,
  ) => {


    if (!userId) {
      const userByIp = await UserService.getUserByIpAddress(
        context.clientIp,
        context,
      );
      if (userByIp) {
        userId = userByIp.id;
      }else{
        return NotFoundError("User not Found regarding your id", { userId })
      }
    }

    const response = vUserUUID.safeParse({ userId });

    if (response.success === false) {
      const schemaErr =
        response.error.issues[0]?.message || "Error found in schema";
      return ValidationError(schemaErr);
    }

    const user = await UserService.getUserById(userId, context);
    if (!userId) {
      throw NotFoundError("User not Found regarding your id", { userId });
    }
    return user;
  },

  _empty: (_: unknown, _args: unknown, context: GraphQLContext) => `Faizan`,
};

export const userMutationsResolver = {
  //   createUser: async (
  //     _: unknown,
  //     payload: {input:ICreateUser},
  //     context: GraphQLContext,
  //   ) => {

  //     const res = await UserService.createUser(payload.input);
  //     return res.id;
  //   },

  //   updateUser : async (
  //     _: unknown,
  //     payload: {input:IUpdateUser},
  //     context: GraphQLContext,
  //   ) => {

  //     const res = await UserService.updateUser(payload.input);
  //     return res;
  //   },
  //   deleteUser : async (
  //     _: unknown,
  //     payload: IDeleteUser,
  //     context: GraphQLContext,
  //   ) => {
  //     const res = await UserService.deleteUser(payload);
  //     return "User Successfully Deleted";
  //   },

  _empty: (_: unknown, _args: unknown, context: GraphQLContext) => `Faizan`,
};

export const userFeildsResolver = {
  User: {
    generatedUrls: async (
      parent: { id?: string },
      _: unknown,
      ctx: GraphQLContext,
    ) => {
      if (!parent.id) return [];
      return ctx.loaders.generatedUrlsByUserId.load(parent.id);
    },
  },
};
