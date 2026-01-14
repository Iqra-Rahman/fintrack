import React, { useContext, useEffect } from "react";
import Menu from "../components/Menu.jsx";
import { AppContent } from "../context/AppContext.jsx";
import { useNavigate } from "react-router-dom";
import {
  PieChart, Pie, Cell, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend
} from "recharts";
import { PlusCircle } from "lucide-react";

const Dashboard = () => {
  const {
    userData,
    transactions,
    summary,
    fetchUserFinance,
    fetchAllTransactions,
    fetchSummary,
    loading,
  } = useContext(AppContent);

  const navigate = useNavigate();

  useEffect(() => {
    fetchUserFinance();
    fetchAllTransactions();
    fetchSummary();
  }, []);

  const COLORS = ["#9333ea", "#06b6d4", "#4c1d95", "#2563eb", "#ec4899", "#8b5cf6"];
  
  const expenseCategories = summary?.categoryBreakdown || [];
  const monthlyTrend = summary?.monthlyTrend || [];
  const recentTransactions = (transactions || []).slice(0, 5);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen text-white">
        Loading Dashboard...
      </div>
    );
  }

  return (
    <div className="flex w-full text-white">
      <Menu />
      <div className="w-3/4 flex flex-col m-3 ml-0 rounded-3xl p-2">
        {/* Header */}
        <div className="bg-gray-950 mb-4 p-4 rounded-2xl">
          <h1 className="text-2xl font-bold mb-1">
            Hello, {userData?.name || "User"}
          </h1>
          <p className="text-gray-400 text-sm">Your latest finance summary</p>
        </div>

        {/* Charts Row */}
        <div className="flex gap-4 mb-4">
          {/* Expense Categories */}
          <div className="bg-gray-950 p-4 rounded-2xl w-1/2">
            <h2 className="text-lg mb-2 font-semibold text-purple-400">
              Expense Categories
            </h2>
            {expenseCategories.length === 0 ? (
              <p className="text-gray-500 text-sm">No category data available</p>
            ) : (
              <ResponsiveContainer width="100%" height={250}>
                <PieChart>
                  <Pie
                    data={expenseCategories}
                    dataKey="value"
                    nameKey="name" 
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    label
                  >
                    {expenseCategories.map((_, i) => (
                      <Cell key={i} fill={COLORS[i % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            )}
          </div>

          {/* Monthly Trend */}
          <div className="bg-gray-950 p-4 rounded-2xl w-1/2">
            <h2 className="text-lg mb-2 font-semibold text-purple-400">
              Monthly Trend
            </h2>
            {monthlyTrend.length === 0 ? (
              <p className="text-gray-500 text-sm">No trend data yet</p>
            ) : (
              <ResponsiveContainer width="100%" height={250}>
                <LineChart data={monthlyTrend}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                  <XAxis dataKey="month" stroke="#9ca3af" />
                  <YAxis stroke="#9ca3af" />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#1f2937', borderColor: '#374151' }}
                  />
                  <Line type="monotone" dataKey="income" stroke="#06b6d4" strokeWidth={2} name="Income" />
                  <Line type="monotone" dataKey="expense" stroke="#9333ea" strokeWidth={2} name="Expense" />
                </LineChart>
              </ResponsiveContainer>
            )}
          </div>
        </div>

        {/* Recent Transactions Section */}
        <div className="bg-gray-950 p-4 rounded-2xl">
          <div className="flex justify-between items-center mb-3">
            <h2 className="text-lg font-semibold text-purple-400">
              Recent Transactions
            </h2>
            <button
              onClick={() => navigate("/add-transaction")}
              className="flex gap-2 items-center bg-purple-700 px-4 py-2 rounded-full hover:bg-purple-600 transition"
            >
              <PlusCircle size={18} /> Add Transaction
            </button>
          </div>
          {recentTransactions.length === 0 ? (
            <p className="text-gray-500 text-sm">No transactions yet</p>
          ) : (
            <table className="w-full text-sm">
              <thead className="border-b border-gray-700 text-gray-400">
                <tr>
                  <th className="text-left py-2">Date</th>
                  <th className="text-left py-2">Description</th>
                  <th className="text-left py-2">Amount</th>
                </tr>
              </thead>
              <tbody>
                {recentTransactions.map((tx, i) => (
                  <tr key={i} className="border-b border-gray-800 last:border-0">
                    <td className="py-2">
                      {new Date(tx.date).toLocaleDateString()}
                    </td>
                    <td className="py-2">{tx.source || tx.category}</td>
                    <td
                      className={`py-2 font-semibold ${
                        tx.type === "income" ? "text-green-500" : "text-red-500"
                      }`}
                    >
                      {tx.type === "income" ? "+" : "-"}₹{Math.abs(tx.amount)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
