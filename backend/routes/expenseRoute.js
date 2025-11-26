import express from "express";
import userAuth from "../middleware/userAuth.js";
import { addExpense, getExpenses } from "../controllers/expenseController.js";

const router = express.Router();

router.post("/add", userAuth, addExpense);
router.get("/all", userAuth, getExpenses);

export default router;
