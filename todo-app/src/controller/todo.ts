import { Request, Response } from "express";
import * as todoService from "../service/todo";

/**
 * The function `getTodos` retrieves todos data and sends it as a JSON response.
 * @param {Request} req - Request object containing information about the HTTP request
 * @param {Response} res - The `res` parameter in the `getTodos` function is an object representing the
 * HTTP response that the server sends back to the client. It allows you to send data, set headers, and
 * control the response status.
 */
export function getTodos(req: Request, res: Response) {
  const data = todoService.getTodos();
  res.json(data);
}

/**
 * The function `getTodoById` retrieves a todo item by its ID from a service and sends the data as a
 * JSON response.
 * @param {Request} req - Request object containing information about the HTTP request
 * @param {Response} res - The `res` parameter in the `getTodoById` function is an instance of the
 * Express Response object. It is used to send a response back to the client making the request. In
 * this case, the response is being sent as JSON data using the `res.json()` method.
 */
export function getTodoById(req: Request, res: Response) {
  const { id } = req.params;
  const data = todoService.getTodoById(id);
  res.json(data);
}

/**
 * The function `createTodo` creates a new todo item based on the request body and sends a JSON
 * response with a success message and the created data.
 * @param {Request} req - Request object containing information about the HTTP request
 * @param {Response} res - The `res` parameter in the `createTodo` function is an instance of the
 * `Response` object in Express.js. It is used to send a response back to the client making the
 * request. In this case, the response is being sent as JSON with a message indicating that a todo has
 * been
 */
export function createTodo(req: Request, res: Response) {
  const { body } = req;
  const data = todoService.createTodo(body);
  res.json({
    message: "Todo Created",
    created: data,
  });
}

/**
 * The function `updateTodo` receives a request and response, extracts the body and id from the
 * request, updates a todo item using a service, and sends the updated data as a JSON response.
 * @param {Request} req - Request object containing information about the HTTP request
 * @param {Response} res - The `res` parameter in the `updateTodo` function is an instance of the
 * Express Response object. It is used to send a response back to the client making the request. In
 * this case, the response is being sent as JSON data using the `res.json()` method.
 */
export function updateTodo(req: Request, res: Response) {
  const { body } = req;
  const { id } = req.params;
  const data = todoService.updateTodo(id, body);
  res.json(data);
}

/**
 * The function `deleteTodo` takes a request and response object, deletes a todo item based on the
 * provided ID, and returns a success message or an error message.
 * @param {Request} req - Request object containing information about the HTTP request
 * @param {Response} res - The `res` parameter in the `deleteTodo` function is an instance of the
 * @returns If there is an error during the deletion process, the error message will be returned as a
 * JSON response. Otherwise, if the deletion is successful, a JSON response with the message
 * "Successfully deleted" will be returned.
 */
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
