import express from "express";
import todoRoutes from "./todo";

const router = express();

router.use("/todo", todoRoutes);

export default router;
