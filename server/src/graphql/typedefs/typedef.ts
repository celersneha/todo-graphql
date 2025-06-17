import { todoTypeDefs } from "./todo.type";
import { userTypeDefs } from "./user.type";
import { mergeTypeDefs } from "@graphql-tools/merge";

export const typeDefs = mergeTypeDefs([userTypeDefs, todoTypeDefs]);
