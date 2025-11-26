import incomeModel from "../models/incomeModel.js";

export const addIncome = async (req, res) => {
  try {
    const { amount, source } = req.body;

    const income = new incomeModel({
      amount,
      source,
      userId: req.userId
    });

    await income.save();
    res.json({ success: true, message: "Income added", income });

  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

export const getIncomes = async (req, res) => {
  try {
    const incomes = await incomeModel.find({ userId: req.userId });
    res.json({ success: true, incomes });

  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};
