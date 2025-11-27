import React, { useContext, useEffect, useState } from "react";
import { AppContent } from "../context/AppContext";
import Menu from "../components/Menu";
import { Plus, Download, Filter, Info } from "lucide-react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const Transactions = () => {
  const { backendUrl } = useContext(AppContent);
  const navigate = useNavigate();

  const [incomes, setIncomes] = useState([]);
  const [expenses, setExpenses] = useState([]);
  const [financial, setFinancial] = useState({ monthlyIncome: 0, monthlyExpenseLimit: 0 });
  const [loading, setLoading] = useState(true);

  const [showIncomeBreakdown, setShowIncomeBreakdown] = useState(false);
  const [showBalanceBreakdown, setShowBalanceBreakdown] = useState(false);

  axios.defaults.withCredentials = true;

  const getData = async () => {
    try {
      const [incomeRes, expenseRes, financialRes] = await Promise.all([
        axios.get(`${backendUrl}/api/income/all`),
        axios.get(`${backendUrl}/api/expense/all`),
        axios.get(`${backendUrl}/api/financial/get`)
      ]);

      if (incomeRes.data.success) setIncomes(incomeRes.data.incomes);
      if (expenseRes.data.success) setExpenses(expenseRes.data.expenses);
      if (financialRes.data.success) setFinancial(financialRes.data.financial);

      setLoading(false);
    } catch (error) {
      toast.error("Failed to load data");
      setLoading(false);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  if (loading) {
    return (
      <div className="flex w-full text-white justify-center items-center h-screen">
        <p>Loading transactions...</p>
      </div>
    );
  }

  const extraIncome = incomes.reduce((sum, i) => sum + i.amount, 0);
  const totalExpenses = expenses.reduce((sum, e) => sum + e.amount, 0);
  const baseMonthlyIncome = financial?.monthlyIncome || 0;
  const totalIncome = baseMonthlyIncome + extraIncome;
  const budgetLimit = financial?.monthlyExpenseLimit || 0;
  const netBalance = budgetLimit - totalExpenses;

  const transactions = [
    ...incomes.map((i) => ({
      ...i,
      title: i.source,
      type: "income",
      amount: i.amount,
      category: i.source,
    })),
    ...expenses.map((e) => ({
      ...e,
      title: e.category,
      type: "expense",
      amount: -Math.abs(e.amount),
      category: e.category,
    })),
  ].sort((a, b) => new Date(b.date) - new Date(a.date));

  return (
    <div className="flex w-full text-white">
      <Menu />

      <div className="w-3/4 flex flex-col m-3 ml-0 rounded-3xl p-2">

        {/* Header */}
        <div className="bg-gray-950 mb-4 p-5 rounded-2xl flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-violet-400">Transactions</h1>
            <p className="text-gray-400 text-sm">Track all your income & expenses</p>
          </div>
          <input
            type="text"
            placeholder="Search transactions..."
            className="p-2 px-4 bg-gray-900 rounded-full border border-gray-700 focus:border-violet-500 transition text-sm"
          />
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-4 gap-4 mb-6">

          {/* Card 1: Total Income */}
          <div className="bg-gray-950 p-5 rounded-2xl">
            <h3 className="text-gray-400 text-sm">Extra Income</h3>
            <p className="text-2xl font-semibold text-yellow-400 mt-1">
              ₹{extraIncome}
            </p>
          </div>

          {/* Card 2: Total Expenses */}
          <div className="bg-gray-950 p-5 rounded-2xl">
            <h3 className="text-gray-400 text-sm">Total Expenses</h3>
            <p className="text-2xl font-semibold text-red-400 mt-1">₹{totalExpenses}</p>
          </div>

          {/* Card 3: Net Balance */}
          <div className="bg-gray-950 p-5 rounded-2xl relative">
            <div className="flex items-center justify-between">
              <h3 className="text-gray-400 text-sm">Budget Balance</h3>
              <button
                onClick={() => setShowBalanceBreakdown(!showBalanceBreakdown)}
                className="text-gray-400 hover:text-blue-400"
              >
                <Info size={16} />
              </button>
            </div>
            <p className={`text-2xl font-semibold mt-1 ${netBalance >= 0 ? "text-blue-400" : "text-red-500"}`}>
              ₹{netBalance}
            </p>
            

            {showBalanceBreakdown && (
              <div className="absolute top-full left-0 mt-2 bg-gray-900 p-3 rounded-lg shadow-lg w-full text-sm text-gray-300">
                <p>Budget Limit: ₹{budgetLimit}</p>
                <p>Total Expenses: ₹{totalExpenses}</p>
                <p className="text-xs text-gray-500">(Limit - Expenses)</p>
              </div>
            )}
          </div>

          {/* Card 4: Extra Income Only */}
          <div className="bg-gray-950 p-5 rounded-2xl relative">
            <div className="flex items-center justify-between">
              <h3 className="text-gray-400 text-sm">Total Income</h3>
              <button
                onClick={() => setShowIncomeBreakdown(!showIncomeBreakdown)}
                className="text-gray-400 hover:text-green-400"
              >
                <Info size={16} />
              </button>
            </div>
            <p className="text-2xl font-semibold text-green-400 mt-1">₹{totalIncome}</p>
            {/* <p className="text-xs text-gray-500 mt-1">(Base + Extra)</p> */}

            {showIncomeBreakdown && (
              <div className="absolute top-full left-0 mt-2 bg-gray-900 p-3 rounded-lg shadow-lg w-full text-sm text-gray-300">
                <p>Base Income: ₹{baseMonthlyIncome}</p>
                <p>Extra Income: ₹{extraIncome}</p>
                <p className="text-gray-500 text-xs font-light">(Base + Extra)</p>
              </div>
            )}
          </div>

        </div>

        {/* Filters & Add Button */}
        <div className="flex justify-between items-center mb-5">
          <div className="flex gap-3">
            <button className="bg-gray-900 px-4 py-2 rounded-full border border-gray-700 text-sm hover:border-violet-500 transition">
              All
            </button>
            <button className="bg-gray-900 px-4 py-2 rounded-full border border-gray-700 text-sm hover:border-violet-500 transition">
              Income
            </button>
            <button className="bg-gray-900 px-4 py-2 rounded-full border border-gray-700 text-sm hover:border-violet-500 transition">
              Expenses
            </button>
            <button className="bg-gray-900 px-4 py-2 rounded-full border border-gray-700 text-sm hover:border-violet-500 transition flex items-center gap-2">
              <Download size={16} /> Export
            </button>
          </div>

          <button
            onClick={() => navigate("/add-transaction")}
            className="flex items-center gap-2 bg-violet-600 hover:bg-violet-500 transition px-4 py-2 rounded-full text-sm font-semibold"
          >
            <Plus size={16} /> Add Transaction
          </button>
        </div>

        {/* List */}
        <div className="bg-gray-950 rounded-2xl p-5">
          {transactions.length === 0 ? (
            <p className="text-gray-400 text-center">No transactions found</p>
          ) : (
            transactions.map((t) => (
              <div
                key={t._id}
                className="flex justify-between items-center p-4 border-b border-gray-800 last:border-0 hover:bg-gray-900/60 rounded-lg transition"
              >
                <div>
                  <h4 className="font-medium">{t.title}</h4>
                  <p className="text-gray-500 text-sm">
                    {t.category} • {new Date(t.date).toLocaleDateString()}
                  </p>
                </div>
                <div
                  className={`font-semibold ${t.type === "income" ? "text-green-400" : "text-red-400"
                    }`}
                >
                  {t.type === "income" ? "+" : "-"}₹{Math.abs(t.amount)}
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Filters Sidebar */}
      <div className="w-1/4 bg-gray-950 m-3 ml-0 p-5 rounded-2xl">
        <div className="flex justify-between items-center mb-4">
          <h3 className="font-semibold text-lg text-violet-400">Filters</h3>
          <button className="text-gray-400 text-sm hover:text-violet-400 transition">
            Clear All
          </button>
        </div>

        <div className="space-y-4">
          {/* Date Filter UI */}
          <div>
            <label className="block text-sm text-gray-400 mb-2">Date</label>
            <select className="w-full p-3 bg-gray-900 rounded-lg border border-gray-700 focus:border-violet-500 outline-none">
              <option>All Time</option>
              <option>This Month</option>
              <option>Last Month</option>
              <option>Last 7 Days</option>
            </select>
          </div>

          {/* Type Filter */}
          <div>
            <label className="block text-sm text-gray-400 mb-2">
              Transaction Type
            </label>
            <div className="flex flex-col gap-2 text-sm">
              <label><input type="radio" defaultChecked name="type" className="mr-2" />All</label>
              <label><input type="radio" name="type" className="mr-2" />Income Only</label>
              <label><input type="radio" name="type" className="mr-2" />Expenses Only</label>
            </div>
          </div>

          <button className="w-full bg-violet-600 hover:bg-violet-500 transition py-2 mt-4 rounded-full font-semibold flex items-center justify-center gap-2">
            <Filter size={16} /> Apply Filters
          </button>
        </div>
      </div>

    </div>
  );
};

export default Transactions;