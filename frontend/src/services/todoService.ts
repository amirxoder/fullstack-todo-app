import axios from "axios";

const API_URL = "http://localhost:5000/api/todos";

export const fetchTodos = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

export const fetchTodoById = async (id: string) => {
  const response = await axios.get(`${API_URL}/${id}`);
  return response.data;
};

export const createTodo = async (title: string) => {
  const response = await axios.post(API_URL, { title });
  return response.data;
};

export const updateTodo = async (
  id: string,
  title: string,
  completed: boolean
) => {
  const response = await axios.put(`${API_URL}/${id}`, { title, completed });
  return response.data;
};

export const deleteTodo = async (id: string) => {
  const response = await axios.delete(`${API_URL}/${id}`);
  return response.data;
};
