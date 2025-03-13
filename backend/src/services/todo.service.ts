import prisma from "../config/prisma";

export const getTodos = async () => {
  return await prisma.todo.findMany();
};

export const getTodoById = async (id: string) => {
  return await prisma.todo.findUnique({
    where: {
      id,
    },
  });
};

export const createTodo = async (title: string) => {
  return await prisma.todo.create({
    data: {
      title,
    },
  });
};

export const updateTodo = async (
  id: string,
  title: string,
  completed: boolean
) => {
  return await prisma.todo.update({
    where: {
      id,
    },
    data: {
      title,
      completed,
    },
  });
};

export const deleteTodo = async (id: string) => {
  return await prisma.todo.delete({
    where: {
      id,
    },
  });
};
