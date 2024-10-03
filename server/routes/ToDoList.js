import express from "express";
import { addToDo, deleteToDo } from "../controller/ToDoList.js";

const router = express.Router();

router.put("/create", addToDo);
router.delete("/delete/:taskId", deleteToDo);

export default router;
