import mongoose from "mongoose";
import { Todo } from "../models/todo.model";

export interface CreateTodoInput {
  title: string;
  description?: string;
  userId: string;
}

export interface UpdateTodoInput {
  id: string;
  title?: string;
  description?: string;
  completed?: boolean;
  userId: string;
}

export interface DeleteTodoPayload {
  id: string;
  userId: string;
}

export interface ToggleTodoCompletionPayload {
  id: string;
  userId: string;
}

class TodoService {
  // Method to create todos for a user
  public static async createTodo(payload: CreateTodoInput) {
    const { title, description, userId } = payload;

    try {
      if (!title || !userId) {
        return {
          success: false,
          message: "Title and User ID are required",
        };
      }
      const todo = await Todo.create({
        title,
        description,
        completed: false,
        userId: new mongoose.Types.ObjectId(userId),
      });
      return {
        success: true,
        message: "Todo created successfully",
        todo,
      };
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Unknown error";
      console.error("Error creating todo:", errorMessage);
      return {
        success: false,
        message: "Error creating todo",
      };
    }
  }

  // Method to update a todo
  public static async updateTodo(payload: UpdateTodoInput) {
    const { id, userId, ...updateTodoData } = payload;

    const updatedTodo = await Todo.findByIdAndUpdate(
      id,
      { ...updateTodoData },
      { new: true, runValidators: true }
    );

    if (!updatedTodo) {
      return {
        success: false,
        message: "Todo not found or update failed",
      };
    }

    return updatedTodo;
  }

  //Method to delete a todo
  public static async deleteTodo(payload: DeleteTodoPayload) {
    const { id, userId } = payload;
    try {
      const deletedTodo = await Todo.findOneAndDelete({
        _id: id,
        userId,
      });
      if (!deletedTodo) {
        return {
          success: false,
          message: "Todo not found or already deleted",
        };
      }
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Unknown error";
      console.error("Error deleting todo:", errorMessage);
      return {
        success: false,
        message: "Error deleting todo",
      };
    }
  }

  //Method to toggle the completion status of a todo
  public static async toggleTodoCompletionStatus(
    payload: ToggleTodoCompletionPayload
  ) {
    const { id, userId } = payload;

    try {
      const todo = await Todo.findOne({ _id: id, userId });
      if (!todo) {
        return {
          success: false,
          message: "Todo not found",
        };
      }

      const updatedTodo = await Todo.findOneAndUpdate(
        { id, userId, completed: !todo.completed },
        { new: true, runValidators: true }
      );

      if (!updatedTodo) {
        return {
          success: false,
          message: "Failed to toggle todo completion status",
        };
      }
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Unknown error";
      console.error("Error toggling todo completion status:", errorMessage);
      return {
        success: false,
        message: "Error toggling todo completion status",
      };
    }
  }

  //Method to get all todos of a user
  public static async getAllTodos(userId: string) {
    try {
      const todos = await Todo.find({ userId }).sort({ createdAt: -1 });
      if (!todos || todos.length === 0) {
        return {
          success: false,
          message: "No todos found for this user",
          todos: [],
        };
      }
      return {
        success: true,
        message: "Todos retrieved successfully",
        todos,
      };
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Unknown error";
      console.error("Error retrieving todos:", errorMessage);
      return {
        success: false,
        message: "Error retrieving todos",
        todos: [],
      };
    }
  }

  // Method to get a todo by ID
  public static async getTodoById(todoId: string, userId: string) {
    try {
      const todo = await Todo.findOne({ id: todoId, userId });
      if (!todo) {
        return {
          success: false,
          message: "Todo not found",
          todo: null,
        };
      }
      return {
        success: true,
        message: "Todo retrieved successfully",
        todo,
      };
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Unknown error";
      console.error("Error retrieving todo:", errorMessage);
      return {
        success: false,
        message: "Error retrieving todo",
        todo: null,
      };
    }
  }
}
export default TodoService;
