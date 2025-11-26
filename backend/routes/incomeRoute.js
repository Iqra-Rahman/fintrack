import express from "express";
import userAuth from "../middleware/userAuth.js";
import { addIncome, getIncomes } from "../controllers/incomeController.js";

const router = express.Router();

router.post("/add", userAuth, addIncome);
router.get("/all", userAuth, getIncomes);

export default router;
