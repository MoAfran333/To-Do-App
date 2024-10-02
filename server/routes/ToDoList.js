import express from "express";
import { addToDo } from "../controller/ToDoList.js";

const router = express.Router();

router.put("/create", addToDo);

export default router;
