import { Request, Response } from "express";
import * as todoService from "../services/todo.service";

export const getTodos = async (req: Request, res: Response): Promise<void> => {
  try {
    const todos = await todoService.getTodos();
    res.json(todos);
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const getTodoById = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const todo = await todoService.getTodoById(req.params.id);
    if (!todo) {
      res.status(404).json({ message: "Todo not found" });
      return;
    }
    res.json(todo);
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const createTodo = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { title } = req.body;
    const newTodo = await todoService.createTodo(title);
    res.status(201).json(newTodo);
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const updateTodo = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { title, completed } = req.body;
    const updatedTodo = await todoService.updateTodo(
      req.params.id,
      title,
      completed
    );
    res.json(updatedTodo);
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const deleteTodo = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    await todoService.deleteTodo(req.params.id);
    res.json({ message: "Todo deleted" });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};
