import React, { useContext } from "react";
import { AppContent } from "../context/AppContext.jsx";
import Menu from "../components/Menu.jsx";
import { Plus, Download, Filter } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Transactions = () => {
  const { userData } = useContext(AppContent);
  const navigate = useNavigate();

  // Dummy Data (replace with backend or DB data)
  const transactions = [
    {
      id: 1,
      title: "Freelance Project Payment",
      category: "Income",
      amount: 1250,
      date: "Dec 18, 2023",
      time: "10:30 AM",
      client: "Client ABC Inc.",
      type: "income",
    },
    {
      id: 2,
      title: "Amazon Purchase",
      category: "Shopping",
      amount: -89.99,
      date: "Dec 18, 2023",
      time: "01:30 PM",
      type: "expense",
    },
    {
      id: 3,
      title: "Restaurant - The Grill House",
      category: "Dining",
      amount: -125.5,
      date: "Dec 17, 2023",
      time: "07:45 PM",
      type: "expense",
    },
    {
      id: 4,
      title: "Salary Deposit",
      category: "Salary",
      amount: 850,
      date: "Dec 16, 2023",
      time: "09:00 AM",
      type: "income",
    },
  ];

  return (
    <div className="flex w-full text-white">
      {/* Sidebar */}
      <Menu />

      {/* Main Section */}
      <div className="w-3/4 flex flex-col m-3 ml-0 rounded-3xl p-2">
        {/* Header */}
        <div className="bg-gray-950 mb-4 p-5 rounded-2xl flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-violet-400">
              Transactions
            </h1>
            <p className="text-gray-400 text-sm">
              Overview of your income and expenses
            </p>
          </div>
          <input
            type="text"
            placeholder="Search transactions..."
            className="p-2 px-4 bg-gray-900 rounded-full outline-none border border-gray-700 focus:border-violet-500 transition text-sm"
          />
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-4 gap-4 mb-6">
          <div className="bg-gray-950 p-5 rounded-2xl">
            <h3 className="text-gray-400 text-sm">Total Income</h3>
            <p className="text-2xl font-semibold text-green-400 mt-1">₹12,580</p>
          </div>
          <div className="bg-gray-950 p-5 rounded-2xl">
            <h3 className="text-gray-400 text-sm">Total Expenses</h3>
            <p className="text-2xl font-semibold text-red-400 mt-1">₹8,240</p>
          </div>
          <div className="bg-gray-950 p-5 rounded-2xl">
            <h3 className="text-gray-400 text-sm">Net Balance</h3>
            <p className="text-2xl font-semibold text-blue-400 mt-1">₹4,340</p>
          </div>
          <div className="bg-gray-950 p-5 rounded-2xl">
            <h3 className="text-gray-400 text-sm">Transactions</h3>
            <p className="text-2xl font-semibold text-yellow-400 mt-1">142</p>
          </div>
        </div>

        {/* Filters & Buttons */}
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

        {/* Transaction List */}
        <div className="bg-gray-950 rounded-2xl p-5">
          {transactions.map((t) => (
            <div
              key={t.id}
              className="flex justify-between items-center p-4 border-b border-gray-800 last:border-0 hover:bg-gray-900/60 rounded-lg transition"
            >
              <div>
                <h4 className="font-medium">{t.title}</h4>
                <p className="text-gray-500 text-sm">
                  {t.category} • {t.date} • {t.time}
                </p>
              </div>
              <div
                className={`font-semibold ${
                  t.amount > 0 ? "text-green-400" : "text-red-400"
                }`}
              >
                {t.amount > 0 ? "+" : "-"}₹{Math.abs(t.amount)}
              </div>
            </div>
          ))}
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
          {/* Date Range */}
          <div>
            <label className="block text-sm text-gray-400 mb-2">
              Date Range
            </label>
            <select className="w-full p-3 bg-gray-900 rounded-lg border border-gray-700 focus:border-violet-500 outline-none">
              <option>Last 7 Days</option>
              <option>Last 30 Days</option>
              <option>This Month</option>
              <option>Last Month</option>
            </select>
          </div>

          {/* Transaction Type */}
          <div>
            <label className="block text-sm text-gray-400 mb-2">
              Transaction Type
            </label>
            <div className="flex flex-col gap-2 text-sm">
              <label><input type="radio" name="type" className="mr-2" />All</label>
              <label><input type="radio" name="type" className="mr-2" />Income Only</label>
              <label><input type="radio" name="type" className="mr-2" />Expenses Only</label>
            </div>
          </div>

          {/* Amount Range */}
          <div>
            <label className="block text-sm text-gray-400 mb-2">
              Amount Range
            </label>
            <div className="flex gap-2">
              <input
                type="number"
                placeholder="Min"
                className="w-1/2 p-2 bg-gray-900 rounded-lg border border-gray-700 focus:border-violet-500 outline-none"
              />
              <input
                type="number"
                placeholder="Max"
                className="w-1/2 p-2 bg-gray-900 rounded-lg border border-gray-700 focus:border-violet-500 outline-none"
              />
            </div>
          </div>

          <button className="w-full bg-violet-600 hover:bg-violet-500 transition py-2 rounded-full font-semibold mt-4 flex items-center justify-center gap-2">
            <Filter size={16} /> Apply Filters
          </button>
        </div>
      </div>
    </div>
  );
};

export default Transactions;
