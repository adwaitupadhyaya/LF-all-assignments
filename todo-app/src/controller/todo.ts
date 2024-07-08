import { Request, Response } from "express";
import * as todoService from "../service/todo";
import { todo } from "node:test";

export function getTodos(req: Request, res: Response) {
  const data = todoService.getTodos();
  res.json(data);
}

export function getTodoById(req: Request, res: Response) {
  const { id } = req.params;
  const data = todoService.getTodoById(id);
  res.json(data);
}

export function createTodo(req: Request, res: Response) {
  const { body } = req;
  const data = todoService.createTodo(body);
  res.json({
    message: "Todo Created",
    created: data,
  });
}

export function updateTodo(req: Request, res: Response) {
  const { body } = req;
  const { id } = req.params;
  const data = todoService.updateTodo(id, body);
  res.json(data);
}

export function deleteTodo(req: Request, res: Response) {
  const { id } = req.params;
  const error = todoService.deleteTodo(id);

  if (error) {
    return res.json(error);
  }
  res.json({
    message: "Succesfully deleted",
  });
}
