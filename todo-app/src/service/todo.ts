import { ITodo } from "../interface/todo";
import * as TodoModel from "../model/todo";

/**
 * Retrieves all todos.
 * @returns {Array} Array of todo items.
 */
export function getTodos() {
  return TodoModel.getTodos();
}

/**
 * Retrieves a todo by its ID.
 * @param {string} id - The ID of the todo.
 * @returns {Object} The todo item or an error object if not found.
 */
export function getTodoById(id: string) {
  const data = TodoModel.getTodoById(id);

  if (!data) {
    return {
      error: "No todo with that id",
    };
  }

  return data;
}

/**
 * Creates a new todo.
 * @param {ITodo} body - The todo item to create.
 * @returns {Object} The created todo item.
 */
export function createTodo(body: ITodo) {
  return TodoModel.createTodo(body);
}

/**
 * Updates an existing todo.
 * @param {string} id - The ID of the todo to update.
 * @param {ITodo} body - The updated todo data.
 * @returns {Object} The updated todo item or an error object if validation fails.
 */
export function updateTodo(id: string, body: ITodo) {
  const todoToUpdate = TodoModel.getTodoById(id);

  if (!todoToUpdate) {
    return {
      error: `Todo with id : ${id} doesnt exist`,
    };
  }

  if (body.todo && body.dueDate && body.isCompleted) {
    return TodoModel.updateTodo(id, body);
  } else {
    return {
      error: `Body Needs all 3 attributes to update(todo,duedate,iscompleted)`,
    };
  }
}

/**
 * Deletes a todo by its ID.
 * @param {string} id - The ID of the todo to delete.
 * @returns {void|Object} Void or an error object if not found.
 */
export function deleteTodo(id: string) {
  const todoToDelete = TodoModel.getTodoById(id);

  if (!todoToDelete) {
    return {
      error: `Todo with id : ${id} doesnt exist`,
    };
  }
  TodoModel.deleteTodo(id);
}
