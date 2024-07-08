import { todo } from "node:test";
import { ITodo } from "./../interface/todo";

let todos = [
  {
    id: "1",
    todo: "Eat",
  },
  {
    id: "2",
    todo: "Drink",
  },
  {
    id: "3",
    todo: "Sleep",
  },
];

export function getTodos() {
  return todos;
}

export function getTodoById(id: string) {
  return todos.find(({ id: todoId }) => todoId === id);
}

export function createTodo(todo: ITodo) {
  return todos.push({ id: `${todos.length + 1}`, ...todo });
}

export function updateTodo(id: string, todo: ITodo) {
  let updatedTodo;
  todos = todos.map((element) => {
    if (element.id !== id) {
      return element;
    }
    element.todo = todo.todo;
    updatedTodo = element;
    return element;
  });
  return updatedTodo;
}

export function deleteTodo(id: string) {
  todos = todos.filter((element) => element.id !== id);
}
