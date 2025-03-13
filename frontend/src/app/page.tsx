"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  fetchTodos,
  createTodo,
  updateTodo,
  deleteTodo,
} from "@/services/todoService";
import { useState } from "react";

export default function Home() {
  const queryClient = useQueryClient();
  const [newTodo, setNewTodo] = useState("");

  // Fetch Todos
  const {
    data: todos,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["todos"],
    queryFn: fetchTodos,
  });

  // Create Todo
  const createMutation = useMutation({
    mutationFn: createTodo,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["todos"] }),
  });

  // Update Todo
  const updateMutation = useMutation({
    mutationFn: ({
      id,
      title,
      completed,
    }: {
      id: string;
      title: string;
      completed: boolean;
    }) => updateTodo(id, title, completed),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["todos"] }),
  });

  // Delete Todo
  const deleteMutation = useMutation({
    mutationFn: deleteTodo,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["todos"] }),
  });

  const handleAddTodo = () => {
    if (newTodo.trim()) {
      createMutation.mutate(newTodo);
      setNewTodo("");
    }
  };

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error loading todos</p>;

  return (
    <div>
      <h1>Todo List</h1>
      <input
        value={newTodo}
        onChange={(e) => setNewTodo(e.target.value)}
        placeholder="New Todo"
      />
      <button onClick={handleAddTodo}>Add</button>

      <ul>
        {todos?.map(
          (todo: { id: string; title: string; completed: boolean }) => (
            <li key={todo.id}>
              <span
                style={{
                  textDecoration: todo.completed ? "line-through" : "none",
                  cursor: "pointer",
                }}
                onClick={() =>
                  updateMutation.mutate({
                    id: todo.id,
                    title: todo.title,
                    completed: !todo.completed,
                  })
                }
              >
                {todo.title}
              </span>
              <button onClick={() => deleteMutation.mutate(todo.id)}>❌</button>
            </li>
          )
        )}
      </ul>
    </div>
  );
}
