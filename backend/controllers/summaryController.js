import Expense from "../models/expenseModel.js";
import Income from "../models/incomeModel.js";
import Financial from "../models/financialModel.js";
import mongoose from "mongoose";

export const getSummary = async (req, res) => {
  try {
    const userId = req.userId; // userAuth middleware provides this
    const userObjectId = new mongoose.Types.ObjectId(userId);

    // 1. Fetch Basic Financial Settings
    const financial = await Financial.findOne({ userId });

    // 2. Calculate Total Expenses & Income via Aggregation
    const totalStats = await Expense.aggregate([
      { $match: { userId: userObjectId } },
      { $group: { _id: null, total: { $sum: "$amount" } } }
    ]);
    const totalIncomeStats = await Income.aggregate([
      { $match: { userId: userObjectId } },
      { $group: { _id: null, total: { $sum: "$amount" } } }
    ]);

    const totalExpenses = totalStats.length > 0 ? totalStats[0].total : 0;
    const totalIncomeReal = totalIncomeStats.length > 0 ? totalIncomeStats[0].total : 0;

    // 3. Category Breakdown (For Pie Chart)
    const categoryBreakdown = await Expense.aggregate([
      { $match: { userId: userObjectId } },
      { $group: { _id: "$category", value: { $sum: "$amount" } } },
      { $project: { name: "$_id", value: 1, _id: 0 } }
    ]);

    // 4. Monthly Trend (For Line Chart - Last 6 months)
    // We combine Income and Expenses by Month
    const monthlyTrendRaw = await Expense.aggregate([
      { $match: { userId: userObjectId } },
      {
        $group: {
          _id: { $dateToString: { format: "%Y-%m", date: "$date" } },
          expense: { $sum: "$amount" }
        }
      },
      { $sort: { _id: 1 } },
      { $limit: 6 }
    ]);

    const monthlyIncomeRaw = await Income.aggregate([
        { $match: { userId: userObjectId } },
        {
          $group: {
            _id: { $dateToString: { format: "%Y-%m", date: "$date" } },
            income: { $sum: "$amount" }
          }
        },
        { $sort: { _id: 1 } },
        { $limit: 6 }
      ]);

    // Merge Income and Expense trends
    const trendMap = new Map();
    
    monthlyTrendRaw.forEach(item => {
        trendMap.set(item._id, { month: item._id, expense: item.expense, income: 0 });
    });

    monthlyIncomeRaw.forEach(item => {
        if(trendMap.has(item._id)) {
            const data = trendMap.get(item._id);
            data.income = item.income;
        } else {
            trendMap.set(item._id, { month: item._id, expense: 0, income: item.income });
        }
    });

    const monthlyTrend = Array.from(trendMap.values()).sort((a,b) => a.month.localeCompare(b.month));

    const summary = {
      totalExpenses,
      totalIncome: financial?.monthlyIncome || totalIncomeReal, // Prefer set goal, fallback to real
      totalBudgetLimit: financial?.monthlyExpenseLimit ?? 0,
      totalSavingGoal: financial?.monthlySavingGoal ?? 0,
      categoryBreakdown, // [{ name: 'Food', value: 500 }]
      monthlyTrend       // [{ month: '2023-10', income: 2000, expense: 500 }]
    };

    res.json({ success: true, summary });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Error fetching summary" });
  }
};