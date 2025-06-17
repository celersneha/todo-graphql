import UserService, { LoginUserPayload } from "../../services/user.services";
import { Context } from "../../types";
import { CreateUserPayload } from "../../services/user.services";

const queries = {
  getUser: async (_: any, parameters: any, context: Context) => {
    try {
      if (!context || !context.user) {
        throw new Error("Unauthorized Access");
      }

      const user = await UserService.getUserById(context.user.id);

      if (!user) {
        throw new Error("User not found");
      }

      return user;
    } catch (error) {
      const errorMessage =
        error instanceof Error
          ? error.message
          : "An error occurred while fetching the user";
      throw new Error(errorMessage);
    }
  },
};

const mutations = {
  // Create a new user
  createUser: async (_: any, payload: CreateUserPayload) => {
    const res = await UserService.createUser(payload);
    return res;
  },

  // Login an existing user
  loginUser: async (_: any, payload: LoginUserPayload) => {
    const res = await UserService.loginUser(payload);
    return res;
  },
};

export const userResolvers = {
  Query: queries,
  Mutation: mutations,
};
