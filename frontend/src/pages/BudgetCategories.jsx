import React, { useContext, useEffect, useState } from "react";
import Menu from "../components/Menu";
import { AppContent } from "../context/AppContext";
import axios from "axios";
import { toast } from "react-toastify";

const BudgetCategories = () => {
  const { backendUrl } = useContext(AppContent);

  const [summary, setSummary] = useState(null);
  const [budgets, setBudgets] = useState([]);
  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(true);

  axios.defaults.withCredentials = true;

  const getData = async () => {
    try {
      const [summaryRes, budgetRes, expenseRes] = await Promise.all([
        axios.get(`${backendUrl}/api/summary`),
        axios.get(`${backendUrl}/api/budget/all`),
        axios.get(`${backendUrl}/api/expense/all`)
      ]);

      if (summaryRes.data.success) setSummary(summaryRes.data.summary);
      if (budgetRes.data.success) setBudgets(budgetRes.data.budgets);
      if (expenseRes.data.success) setExpenses(expenseRes.data.expenses);

      setLoading(false);
    } catch (error) {
      toast.error("Failed to load budget data");
      setLoading(false);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  if (loading || !summary) {
    return (
      <div className="flex w-full text-white justify-center items-center h-screen">
        <p>Loading your budget...</p>
      </div>
    );
  }

  const leftToBudget = summary.totalBudgetLimit - summary.totalExpenses;

  const getActualSpend = (category) => {
    return expenses
      .filter((e) => e.category === category)
      .reduce((sum, e) => sum + e.amount, 0);
  };

  return (
    <div className="flex w-full text-white">
      <Menu />

      <div className="w-3/4 flex flex-col m-4 ml-0 rounded-3xl p-4">

        {/* Top Header showing Income */}
        <div className="bg-gradient-to-r from-green-400 to-green-600 p-8 rounded-2xl shadow-md mb-6 text-center">
          <h1 className="text-4xl font-bold">
            ₹{summary.totalIncome.toLocaleString()}
          </h1>
          <p className="text-white text-sm mt-1 opacity-95">
            Income
          </p>
        </div>

        {/* Summary Section */}
        <div className="bg-gray-950 p-5 rounded-2xl mb-6">
          <h2 className="text-lg font-semibold mb-3">Summary</h2>

          {/* Left to Budget */}
          <div className="mb-5">
            <div className="flex justify-between text-sm mb-1">
              <span>Left to Budget</span>
              <span className="text-gray-400">
                ₹{leftToBudget.toLocaleString()}
              </span>
            </div>
            <div className="w-full bg-gray-800 h-3 rounded-full">
              <div
                className="h-3 bg-orange-400 rounded-full"
                style={{
                  width: summary.totalBudgetLimit
                    ? `${(leftToBudget / summary.totalBudgetLimit) * 100}%`
                    : "0%",
                }}
              ></div>
            </div>
          </div>

          {/* Expenses */}
          <div className="mb-5">
            <div className="flex justify-between text-sm mb-1">
              <span>Expenses</span>
              <span className="text-gray-400">
                ₹{summary.totalExpenses.toLocaleString()}
              </span>
            </div>
            <div className="w-full bg-gray-800 h-3 rounded-full">
              <div
                className="h-3 bg-orange-400 rounded-full"
                style={{
                  width: summary.totalIncome
                    ? `${(summary.totalExpenses / summary.totalIncome) * 100}%`
                    : "0%",
                }}
              ></div>
            </div>
          </div>
        </div>

        {/* Budget Categories */}
        <div className="bg-gray-950 p-5 rounded-2xl">
          <h2 className="text-xl font-semibold mb-4">Budget Categories</h2>

          <table className="w-full text-sm">
            <thead className="border-b border-gray-700 text-gray-400">
              <tr>
                <th className="text-left py-2">Category</th>
                <th className="text-left py-2">Budget</th>
                <th className="text-left py-2">Actual</th>
                <th className="text-left py-2">Remaining</th>
              </tr>
            </thead>
            <tbody>
              {budgets.map((b, i) => {
                const actual = getActualSpend(b.category);
                const remaining = b.limit - actual;

                return (
                  <tr key={i} className="border-b border-gray-800">
                    <td className="py-3">{b.category}</td>
                    <td className="py-3">₹{b.limit.toLocaleString()}</td>
                    <td className="py-3 text-purple-300">
                      ₹{actual.toLocaleString()}
                    </td>
                    <td
                      className={`py-3 font-semibold ${
                        remaining >= 0 ? "text-green-400" : "text-red-400"
                      }`}
                    >
                      ₹{remaining.toLocaleString()}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

      </div>
    </div>
  );
};

export default BudgetCategories;
