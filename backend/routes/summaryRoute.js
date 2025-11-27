import express from "express";
import userAuth from "../middleware/userAuth.js";
import { getSummary } from "../controllers/summaryController.js";

const router = express.Router();
router.get("/", userAuth, getSummary);

export default router;
