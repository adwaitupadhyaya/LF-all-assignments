import { todo } from "node:test";
import { ITodo } from "./../interface/todo";

let todos = [
  {
    id: "1",
    todo: "Eat",
    isCompleted: true,
    dueDate: "2024-12-20",
  },
  {
    id: "2",
    todo: "Drink",
    isCompleted: false,
    dueDate: "2024-12-20",
  },
  {
    id: "3",
    todo: "Sleep",
    isCompleted: false,
    dueDate: "2024-12-20",
  },
];

export function getTodos() {
  return todos;
}

export function getTodoById(id: string) {
  return todos.find(({ id: todoId }) => todoId === id);
}

export function createTodo(todo: ITodo) {
  const newTodo = { id: `${todos.length + 1}`, ...todo };
  todos.push(newTodo);
  return newTodo;
}

export function updateTodo(id: string, todo: ITodo) {
  let updatedTodo;
  console.log(todo.isCompleted);
  todos = todos.map((element) => {
    if (element.id !== id) {
      return element;
    }
    element.todo = todo.todo;
    element.dueDate = todo.dueDate;
    element.isCompleted = todo.isCompleted;
    updatedTodo = element;
    return updatedTodo;
  });
  return updatedTodo;
}

export function deleteTodo(id: string) {
  todos = todos.filter((element) => element.id !== id);
}
