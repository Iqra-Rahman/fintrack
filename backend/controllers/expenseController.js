import expenseModel from "../models/expenseModel.js";

export const addExpense = async (req, res) => {
  try {
    const { amount, category, date } = req.body;

    const expense = new expenseModel({
      amount,
      category,
      date,
      userId: req.userId
    });

    await expense.save();
    res.json({ success: true, message: "Expense added", expense });

  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};


export const getExpenses = async (req, res) => {
  try {
    const expenses = await expenseModel.find({ userId: req.userId }).sort({ date: -1 });
    res.json({ success: true, expenses });

  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
