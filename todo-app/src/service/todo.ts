import { ITodo } from "../interface/todo";
import * as TodoModel from "../model/todo";

export function getTodos() {
  return TodoModel.getTodos();
}

export function getTodoById(id: string) {
  const data = TodoModel.getTodoById(id);

  if (!data) {
    return {
      error: "No todo with that id",
    };
  }

  return data;
}

export function createTodo(body: ITodo) {
  TodoModel.createTodo(body);
}

export function updateTodo(id: string, body: ITodo) {
  const todoToUpdate = TodoModel.getTodoById(id);

  if (!todoToUpdate) {
    return {
      error: `Todo with id : ${id} doesnt exist`,
    };
  }
  return TodoModel.updateTodo(id, body);
}

export function deleteTodo(id: string) {
  const todoToDelete = TodoModel.getTodoById(id);

  if (!todoToDelete) {
    return {
      error: `Todo with id : ${id} doesnt exist`,
    };
  }
  TodoModel.deleteTodo(id);
}
