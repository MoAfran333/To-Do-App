import express from "express";
import { profile } from "../controller/profile.js";

const router = express.Router();

router.get("/check-session", profile);

export default router;
