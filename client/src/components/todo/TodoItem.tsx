import type { Todo, TodoResponse } from "@/types/types";
import React, { useState } from "react";
import { ChevronDown, ChevronUp, Pencil, Trash } from "lucide-react";
import { Checkbox } from "../ui/checkbox";
import { useMutation } from "@apollo/client";
import {
  DELETE_TODO,
  TOGGLE_TODO_COMPLETION,
  UPDATE_TODO,
} from "@/graphql/mutation";
import { GET_ALL_TODOS } from "@/graphql/queries";
import { Input } from "../ui/input";
import { toast } from "sonner";

function TodoItem({ todo }: { todo: Todo }) {
  const [isEditing, setIsEditing] = useState(false);
  const [updateData, setUpdateData] = useState<{
    title: string;
    description?: string;
  }>({
    title: todo.title || "",
    description: todo.description || "",
  });
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [showDescription, setShowDescription] = useState(false);

  const [updateTodoMutation, { loading: updating }] = useMutation<{
    updateTodo: TodoResponse;
  }>(UPDATE_TODO, {
    refetchQueries: [GET_ALL_TODOS],
  });

  const [deleteTodoMutation, { loading: deleting }] = useMutation<{
    deleteTodo: TodoResponse;
  }>(DELETE_TODO, {
    refetchQueries: [GET_ALL_TODOS],
  });

  const [toggleTodoMutation] = useMutation<{
    toggleTodo: TodoResponse;
  }>(TOGGLE_TODO_COMPLETION, { refetchQueries: [GET_ALL_TODOS] });

  //toggle completion logic
  const handleToggleCompleted = async () => {
    try {
      const res = await toggleTodoMutation({
        variables: { id: todo._id },
      });
    } catch (error) {
      console.error("Error toggling todo completion:", error);
    }
  };

  const handleUpdateTodo = async () => {
    if (!updateData.title.trim()) {
      toast.error("Title is required.");
      return;
    }
    const updateInput = {
      id: todo._id,
      title: updateData.title.trim(),
      description: updateData.description?.trim() || null,
    };

    try {
      const { data } = await updateTodoMutation({
        variables: { input: updateInput },
      });
      if (data?.updateTodo?.success) {
        setIsEditing(false);
      } else {
        console.error("Failed to update todo:", data?.updateTodo?.message);
      }
    } catch (error) {
      console.error("Error updating todo:", error);
    }
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setUpdateData({
      title: todo.title || "",
      description: todo.description || "",
    });
  };

  if (isEditing) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-black/20 backdrop-blur-sm">
        <div className="bg-white rounded-xl p-6 shadow-lg w-[480px] space-y-4">
          <h2 className="text-xl font-semibold text-[#6949ff] mb-4">
            Edit Todo
          </h2>
          <div className="space-y-4">
            <div>
              <label
                htmlFor="title"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Title
              </label>
              <Input
                value={updateData.title}
                onChange={(e) =>
                  setUpdateData({ ...updateData, title: e.target.value })
                }
                className="bg-white/80 border-[#6949ff]/20 focus:border-[#6949ff] focus:ring-[#6949ff]/20"
              />
            </div>
            <div>
              <label
                htmlFor="description"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Description
              </label>
              <Input
                value={updateData.description}
                onChange={(e) =>
                  setUpdateData({ ...updateData, description: e.target.value })
                }
                placeholder="Description (optional)"
                className="bg-white/80 border-[#6949ff]/20 focus:border-[#6949ff] focus:ring-[#6949ff]/20"
              />
            </div>
          </div>

          <div className="flex justify-end gap-3 mt-6">
            <button
              type="button"
              onClick={handleCancelEdit}
              className="px-4 py-2 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              onClick={handleUpdateTodo}
              disabled={updating}
              className="px-4 py-2 bg-gradient-to-r from-[#6949ff] to-[#c961ff] hover:from-[#5f41e8] hover:to-[#b154e8] text-white rounded-lg transition-all disabled:opacity-50"
            >
              {updating ? "Updating..." : "Update Todo"}
            </button>
          </div>
        </div>
      </div>
    );
  }

  const handleEditingOpen = () => {
    setIsEditing(true);
  };

  //delete todo logic
  const handleDeleteTodo = async () => {
    try {
      const res = await deleteTodoMutation({
        variables: { id: todo._id },
      });
      setIsDeleteDialogOpen(false);
      if (res?.data?.deleteTodo?.success)
        toast.success(
          res?.data?.deleteTodo?.message || "Todo deleted successfully!"
        );
    } catch (error) {
      console.error(error);
      toast.error("Failed to delete todo.");
    }
  };

  if (isDeleteDialogOpen) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-black/20 backdrop-blur-sm z-100">
        <div className="bg-white rounded-xl p-6 shadow-lg w-[400px] text-center">
          <h2 className="text-xl font-semibold text-[#6949ff] mb-4">
            Confirm Deletion
          </h2>
          <p className="text-gray-600 mb-6">
            Are you sure you want to delete this item?
          </p>
          <div className="flex justify-center gap-3">
            <button
              className="px-4 py-2 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
              onClick={() => setIsDeleteDialogOpen(false)}
            >
              Cancel
            </button>
            <button
              className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-colors"
              onClick={handleDeleteTodo}
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      {" "}
      <div>
        <div className="p-4 bg-white/80 backdrop-blur rounded-xl shadow-sm hover:shadow-md transition-all">
          <div className="flex justify-between items-center">
            <h3
              className={
                todo.completed
                  ? "text-lg font-semibold text-gray-400 line-through"
                  : "text-lg font-semibold text-gray-800"
              }
            >
              {todo.title}
            </h3>
            <div className="flex items-center gap-3">
              <Checkbox
                checked={todo.completed}
                onCheckedChange={handleToggleCompleted}
                className="border-[#6949ff]/30 data-[state=checked]:bg-[#6949ff] data-[state=checked]:border-[#6949ff]"
              />
              {showDescription ? (
                <ChevronUp
                  onClick={() => setShowDescription(false)}
                  className="w-5 h-5 text-[#6949ff] cursor-pointer hover:text-[#5f41e8] transition-colors"
                />
              ) : (
                <ChevronDown
                  onClick={() => setShowDescription(true)}
                  className="w-5 h-5 text-[#6949ff] cursor-pointer hover:text-[#5f41e8] transition-colors"
                />
              )}

              <Pencil
                onClick={handleEditingOpen}
                className="w-5 h-5 text-[#6949ff] cursor-pointer hover:text-[#5f41e8] transition-colors"
              />
              <Trash
                onClick={() => setIsDeleteDialogOpen(true)}
                className="w-5 h-5 text-red-500 cursor-pointer hover:text-red-600 transition-colors"
              />
            </div>
          </div>
          <div>
            {showDescription && (
              <p className="mt-3 text-gray-600 bg-gray-50/50 p-3 rounded-lg">
                {todo.description || "No description provided."}
              </p>
            )}
          </div>
          <span className="text-sm text-[#6949ff]/70 mt-2 block">
            {(() => {
              try {
                // Try parsing as number first (timestamp)
                const date = new Date(Number(todo.createdAt));

                // Check if date is valid
                if (!isNaN(date.getTime())) {
                  return date.toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  });
                }
                return "Date unavailable";
              } catch (error) {
                return "Date unavailable";
              }
            })()}
          </span>
        </div>
      </div>
    </>
  );
}

export default TodoItem;
