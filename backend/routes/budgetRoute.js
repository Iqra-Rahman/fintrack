import express from "express";
import userAuth from "../middleware/userAuth.js";
import { addBudget, getBudgets } from "../controllers/budgetController.js";

const router = express.Router();

router.post("/add", userAuth, addBudget);
router.get("/all", userAuth, getBudgets);

export default router;
