import TodoService, { UpdateTodoInput } from "../../services/todo.services";
import { Context } from "../../types";
import { CreateTodoInput } from "../../services/todo.services";

const queries = {
  //get all todos
  getAllTodos: async (_: any, __: any, context: Context) => {
    if (!context || !context.user) {
      throw new Error("Unauthorized Access");
    }
    const res = await TodoService.getAllTodos(context.user.id);
    return res;
  },

  //get a todo by ID
  getTodoById: async (_: any, args: { id: string }, context: Context) => {
    if (!context || !context.user) {
      throw new Error("Unauthorized Access");
    }
    const { id } = args;
    const res = await TodoService.getTodoById(id, context.user.id);
    return res;
  },
};

const mutations = {
  //create a new todo
  createTodo: async (
    _: any,
    args: { input: CreateTodoInput },
    context: Context
  ) => {
    const { input } = args;
    if (!context || !context.user) {
      throw new Error("Unauthorized Access");
    }
    console.log("context:", context);
    const res = await TodoService.createTodo({
      ...input,
      userId: context.user.id,
    });
    return res;
  },

  //update an existing todo
  updateTodo: async (
    _: any,
    args: { input: UpdateTodoInput },
    context: Context
  ) => {
    const { input } = args;
    if (!context || !context.user) {
      throw new Error("Unauthorized Access");
    }
    const res = await TodoService.updateTodo({
      ...input,
      userId: context.user.id,
    });
    return res;
  },

  //delete a todo
  deleteTodo: async (_: any, args: { id: string }, context: Context) => {
    if (!context || !context.user) {
      throw new Error("Unauthorized Access");
    }
    const { id } = args;
    const res = await TodoService.deleteTodo({ id, userId: context.user.id });
    return res;
  },

  //toggle todo completion status
  toggleTodoCompletion: async (
    _: any,
    args: { id: string },
    context: Context
  ) => {
    if (!context || !context.user) {
      throw new Error("Unauthorized Access");
    }
    const { id } = args;
    const res = await TodoService.toggleTodoCompletionStatus({
      id,
      userId: context.user.id,
    });
    return res;
  },
};

export const todoResolvers = {
  Query: queries,
  Mutation: mutations,
};
