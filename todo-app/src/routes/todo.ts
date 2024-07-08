import express from "express";
import {
  createTodo,
  getTodoById,
  getTodos,
  updateTodo,
  deleteTodo,
} from "../controller/todo";

const router = express();

router.get("/", getTodos);
router.get("/:id", getTodoById);
router.post("/", createTodo);
router.put("/:id", updateTodo);
router.delete("/:id", deleteTodo);

export default router;
