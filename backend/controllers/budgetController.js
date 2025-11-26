import budgetModel from "../models/budgetModel.js";

export const addBudget = async (req, res) => {
  try {
    const { category, limit } = req.body;

    const budget = new budgetModel({
      category,
      limit,
      userId: req.userId
    });

    await budget.save();
    res.json({ success: true, message: "Budget added", budget });

  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

export const getBudgets = async (req, res) => {
  try {
    const budgets = await budgetModel.find({ userId: req.userId });
    res.json({ success: true, budgets });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};
