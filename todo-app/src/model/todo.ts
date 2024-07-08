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

/**
 * The function `getTodoById` retrieves all todo item  from a list of todos.
 * @returns The function `getTodoById` returns all todo object from the `todos` array*/
export function getTodos() {
  return todos;
}

/**
 * The function `getTodoById` retrieves a todo item by its ID from a list of todos.
 * @param {string} id - The `id` parameter in the `getTodoById` function is a string representing the
 * unique identifier of the todo item that we want to retrieve from the `todos` array.
 * @returns The function `getTodoById` returns a todo object from the `todos` array that matches the
 * provided `id`.
 */
export function getTodoById(id: string) {
  return todos.find(({ id: todoId }) => todoId === id);
}

/**
 * The function creates a new todo item and adds it to a list of todos.
 * @param {ITodo} todo - The `createTodo` function takes in a parameter `todo` of type `ITodo`, which
 * represents a todo item.
 * @returns The function `createTodo` is returning the newly created todo item after adding it to the
 * `todos` array.
 */
export function createTodo(todo: ITodo) {
  const newTodo = { id: `${todos.length + 1}`, ...todo };
  todos.push(newTodo);
  return newTodo;
}

/**
 * The function `updateTodo` updates a specific todo item in an array based on the provided ID and todo
 * object.
 * @param {string} id - The `id` parameter in the `updateTodo` function is a string that represents the unique identifier of the todo item that needs to be updated.
 * @param {ITodo} todo - The `todo` parameter in the `updateTodo` function is an object of type `ITodo`. It contains properties such as `todo` (the task description), `dueDate` (the deadline for the task), and `isCompleted` (a boolean indicating whether the task is completed
 * @returns The `updateTodo` function is returning the updated todo item with the specified `id`.
 */
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

/**
 * The function `deleteTodo` removes a todo item from a list based on its id.
 * @param {string} id - The `id` parameter is a string that represents the unique identifier of the
 * todo item that needs to be deleted from the `todos` array.
 */
export function deleteTodo(id: string) {
  todos = todos.filter((element) => element.id !== id);
}
