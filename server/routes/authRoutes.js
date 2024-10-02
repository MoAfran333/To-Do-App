import express from "express";
import { login, logOut, signup } from "../controller/auth.js";

const router = express.Router();

router.post("/login", login);
router.post("/signup", signup);
router.get("/logout", logOut);

export default router;
