import financialModel from "../models/financialModel.js";

export const getFinancial = async (req, res) => {
  try {
    const financial = await financialModel.findOne({ userId: req.userId });

    res.json({
      success: true,
      financial: financial || {
        monthlyIncome: 0,
        monthlyExpenseLimit: 0,
        monthlySavingGoal: 0,
      },
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

export const updateFinancial = async (req, res) => {
  try {
    const { monthlyIncome, monthlyExpenseLimit, monthlySavingGoal } = req.body;

    const financial = await financialModel.findOneAndUpdate(
      { userId: req.userId },
      { monthlyIncome, monthlyExpenseLimit, monthlySavingGoal },
      { new: true, upsert: true } // Upsert creates it if it doesn't exist
    );

    res.json({ success: true, financial });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};