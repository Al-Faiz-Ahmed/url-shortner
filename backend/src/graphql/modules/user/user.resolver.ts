import { GraphQLContext } from "../../context/context";
// import { ICreateUser,  IDeleteUser,  IUpdateUser } from "./types";
// import UserService from "./user.services";

const queries = {
  _empty: (_: unknown, _args: unknown, context: GraphQLContext) => `Faizan`,
};

const mutations = {
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

export const userResolvers = { queries, mutations };