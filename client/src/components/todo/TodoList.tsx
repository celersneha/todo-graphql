import { useQuery } from "@apollo/client";
import React, { useState } from "react";
import type { TodosResponse } from "@/types/types";
import { GET_ALL_TODOS } from "@/graphql/queries";
import Loading from "../layout/Loading";
import TodoItem from "./TodoItem";

function TodoList() {
  const [filter, setFilter] = useState<"all" | "completed" | "pending">("all");

  const { data, error, loading } = useQuery<{ getAllTodos: TodosResponse }>(
    GET_ALL_TODOS
  );

  if (loading) return <Loading />;

  if (data?.getAllTodos.todos?.length === 0) {
    return <div className="text-center text-gray-500">No todos found.</div>;
  }

  const filteredTodos = data?.getAllTodos?.todos?.filter((todo) => {
    if (filter === "completed") return todo.completed;
    if (filter === "pending") return !todo.completed;
    return true;
  });

  return (
    <div className="max-w-4xl mx-auto mt-8">
      <div className="mb-6 flex items-center justify-between bg-white/80 backdrop-blur rounded-lg p-4 shadow-sm">
        <div className="flex items-center gap-4">
          <label className="text-[#6949ff] font-medium">Filter:</label>
          <select
            value={filter}
            onChange={(e) =>
              setFilter(e.target.value as "all" | "completed" | "pending")
            }
            className="border border-[#6949ff]/20 rounded-lg px-4 py-2 bg-white/80 text-gray-800 shadow-sm focus:ring-2 focus:ring-[#6949ff]/20 focus:border-[#6949ff] outline-none transition-all"
          >
            <option value="all">All Tasks</option>
            <option value="completed">Completed Tasks</option>
            <option value="pending">Pending Tasks</option>
          </select>
        </div>
        <div className="text-sm bg-[#6949ff]/10 text-[#6949ff] px-4 py-1.5 rounded-full font-medium">
          {filteredTodos?.length || 0} {filter !== "all" ? filter : ""} tasks
        </div>
      </div>
      {error && (
        <div className="text-red-500 text-center bg-red-50 p-4 rounded-lg mb-4">
          Error fetching todos: {error.message}
        </div>
      )}
      {filteredTodos?.length === 0 && (
        <div className="text-center text-gray-500 bg-white/80 backdrop-blur p-8 rounded-lg">
          No todos match the selected filter.
        </div>
      )}
      <div className="space-y-4">
        {filteredTodos?.map((todo) => {
          return <TodoItem key={todo._id} todo={todo} />;
        })}
      </div>
    </div>
  );
}

export default TodoList;
