import express from "express";
import userAuth from "../middleware/userAuth.js";
import { updateFinancial, getFinancial } from "../controllers/financialController.js";

const router = express.Router();

router.get("/get", userAuth, getFinancial);
router.put("/update", userAuth, updateFinancial);

export default router;