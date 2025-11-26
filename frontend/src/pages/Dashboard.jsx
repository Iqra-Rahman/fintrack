import React, { useContext } from "react";
import { AppContent } from "../context/AppContext.jsx";
import Menu from "../components/Menu.jsx";
import { useNavigate, useLocation } from "react-router-dom";
import {
    PieChart,
    Pie,
    Cell,
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
} from "recharts";
import {
    PlusCircle,
    ListOrdered,
    Wallet,
    LayoutGrid,
    BarChart3,
    Settings,
    LayoutDashboard,
    TrendingDownIcon,
    TrendingUpIcon,
} from "lucide-react";

const Dashboard = () => {
    const { userData } = useContext(AppContent);
    const navigate = useNavigate();
    const location = useLocation();

    const expenseCategories = [
        { name: "Food & Dining", value: 450 },
        { name: "Transportation", value: 280 },
        { name: "Entertainment", value: 120 },
        { name: "Shopping", value: 320 },
    ];

    const monthlyTrend = [
        { month: "Jan", income: 800, expense: 600 },
        { month: "Feb", income: 1000, expense: 700 },
        { month: "Mar", income: 900, expense: 850 },
        { month: "Apr", income: 1200, expense: 950 },
    ];

    const recentTransactions = [
        { date: "2025-11-09", description: "Salary", amount: 1500, type: "credit" },
        { date: "2025-11-08", description: "Groceries", amount: -200, type: "debit" },
        { date: "2025-11-07", description: "Netflix", amount: -15, type: "debit" },
        { date: "2025-11-06", description: "Freelance", amount: 250, type: "credit" },
    ];

    const budgetData = [
        { category: "Food & Dining", spent: 4500, total: 6000 },
        { category: "Transportation", spent: 2500, total: 4000 },
        { category: "Entertainment", spent: 1500, total: 2000 },
        { category: "Shopping", spent: 3800, total: 5000 },
    ];

    const COLORS = ["#9333ea", "#06b6d4", "#4c1d95", "#2563eb"];

    const menuItems = [
        { name: "Dashbord", path: "/dashboard", icon: <TrendingUpIcon size={20} /> },
        { name: "Add Transaction", path: "/add-transaction", icon: <PlusCircle size={20} /> },
        { name: "Transactions", path: "/transactions", icon: <ListOrdered size={20} /> },
        { name: "Budget", path: "/budget", icon: <Wallet size={20} /> },
        { name: "Categories", path: "/categories", icon: <LayoutGrid size={20} /> },
        { name: "Report", path: "/report", icon: <BarChart3 size={20} /> },
        { name: "Settings", path: "/settings", icon: <Settings size={20} /> },
    ];

    return (
        <div className="flex w-full text-white">
            {/* Menu Sidebar */}
            <Menu/>

            <div className="w-3/4 flex flex-col m-3 ml-0 rounded-3xl p-2">
                {/* Header */}
                <div className="bg-gray-950 mb-4 p-4 rounded-2xl">
                    <h1 className="text-2xl font-bold mb-1">
                        Welcome back,{" "}
                        {userData?.name
                            ? userData.name.split(" ")[0].charAt(0).toUpperCase() +
                            userData.name.split(" ")[0].slice(1).toLowerCase()
                            : "User"}
                    </h1>
                    <p className="text-gray-400 text-sm">
                        You’re now on your personal finance dashboard. Track your income, expenses,
                        and savings with ease.
                    </p>
                </div>

                {/* Charts Row */}
                <div className="flex gap-4 mb-4">
                    {/* Expense Categories */}
                    <div className="bg-gray-950 p-4 rounded-2xl w-1/2">
                        <h2 className="text-lg mb-2 font-semibold text-purple-400">
                            Expense Categories
                        </h2>
                        <ResponsiveContainer width="100%" height={250}>
                            <PieChart>
                                <Pie
                                    data={expenseCategories}
                                    dataKey="value"
                                    nameKey="name"
                                    outerRadius={90}
                                    label
                                >
                                    {expenseCategories.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                    ))}
                                </Pie>
                                <Tooltip />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>

                    {/* Monthly Trend */}
                    <div className="bg-gray-950 p-4 rounded-2xl w-1/2">
                        <h2 className="text-lg mb-2 font-semibold text-purple-400">
                            Monthly Trend
                        </h2>
                        <ResponsiveContainer width="100%" height={250}>
                            <LineChart data={monthlyTrend}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="month" stroke="#ccc" />
                                <YAxis stroke="#ccc" />
                                <Tooltip />
                                <Line type="monotone" dataKey="income" stroke="#06b6d4" strokeWidth={2} />
                                <Line type="monotone" dataKey="expense" stroke="#9333ea" strokeWidth={2} />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Budget Overview Section */}
                <div className="bg-gray-950 p-5 rounded-2xl mb-4">
                    <div className="flex justify-between items-center mb-3">
                        <h2 className="text-lg font-semibold text-purple-400">Budget Overview</h2>
                        <button
                            onClick={() => navigate("/budgetandcategories")}
                            className="px-4 py-2 bg-purple-700 hover:bg-purple-600 rounded-full transition-all text-sm"
                        >
                            + Add Budget
                        </button>
                    </div>

                    {/* Grid container for 2 columns */}
                    <div className="grid grid-cols-2 gap-4">
                        {budgetData.map((b, i) => {
                            const percent = (b.spent / b.total) * 100;
                            return (
                                <div key={i} className="mb-3">
                                    <div className="flex justify-between text-sm mb-1">
                                        <span className="text-gray-300">{b.category}</span>
                                        <span className="text-gray-400">
                                            ₹{b.spent} used of ₹{b.total}
                                        </span>
                                    </div>
                                    <div className="w-full bg-gray-800 rounded-full h-3">
                                        <div
                                            className={`h-3 rounded-full ${percent < 70
                                                ? "bg-green-500"
                                                : percent < 90
                                                    ? "bg-yellow-500"
                                                    : "bg-red-500"
                                                }`}
                                            style={{ width: `${percent}%` }}
                                        ></div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>


                {/* Recent Transactions Section */}
                <div className="bg-gray-950 p-4 rounded-2xl">
                    <h2 className="text-lg font-semibold text-purple-400 mb-3">
                        Recent Transactions
                    </h2>
                    <table className="w-full text-sm">
                        <thead className="border-b border-gray-700 text-gray-400">
                            <tr>
                                <th className="text-left py-2">Date</th>
                                <th className="text-left py-2">Description</th>
                                <th className="text-left py-2">Amount</th>
                                <th className="text-left py-2">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {recentTransactions.map((tx, i) => (
                                <tr key={i} className="border-b border-gray-800">
                                    <td className="py-2">{tx.date}</td>
                                    <td className="py-2">{tx.description}</td>
                                    <td
                                        className={`py-2 font-semibold ${tx.type === "credit" ? "text-green-500" : "text-red-500"
                                            }`}
                                    >
                                        {tx.type === "credit" ? "+" : "-"}₹{Math.abs(tx.amount)}
                                    </td>
                                    <td className="py-2">
                                        <button className="text-violet-400 hover:text-violet-300 transition-all">
                                            View
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
