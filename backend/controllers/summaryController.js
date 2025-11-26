import incomeModel from "../models/incomeModel.js";
import expenseModel from "../models/expenseModel.js";
import budgetModel from "../models/budgetModel.js";

export const getSummary = async (req, res) => {
  try {
    const incomes = await incomeModel.find({ userId: req.userId });
    const expenses = await expenseModel.find({ userId: req.userId });
    const budgets = await budgetModel.find({ userId: req.userId });

    const totalIncome = incomes.reduce((sum, i) => sum + i.amount, 0);
    const totalExpenses = expenses.reduce((sum, e) => sum + e.amount, 0);
    const totalBudget = budgets.reduce((sum, b) => sum + b.limit, 0);

    res.json({
      success: true,
      summary: {
        totalIncome,
        totalExpenses,
        totalBudget,
        remainingBudget: totalIncome - totalExpenses
      }
    });

  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};
