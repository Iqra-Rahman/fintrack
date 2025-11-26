import React from "react";
import Menu from "../components/Menu";

const BudgetCategories = () => {
    const summary = {
        income: { earned: 2450, budget: 5000 },
        expenses: { spent: 1862, budget: 3200 },
        goals: { saved: 150, budget: 362 },
    };

    const categories = [
        { name: "Paychecks", budget: 4500, actual: 2250 },
        { name: "Side Income", budget: 500, actual: 200 },
        { name: "Food & Dining", budget: 1800, actual: 950 },
        { name: "Transportation", budget: 800, actual: 300 },
        { name: "Shopping", budget: 1600, actual: 1200 },
    ];

    const leftToBudget =
        summary.income.budget -
        (summary.expenses.spent + summary.goals.saved);

    return (
        <div className="flex w-full text-white">
            <Menu />

            <div className="w-3/4 flex flex-col m-4 ml-0 rounded-3xl p-4">

                {/* Top Budget Header */}
                <div className="bg-gradient-to-r from-green-400 to-green-600 p-8 rounded-2xl shadow-md mb-6 text-center">
                    <h1 className="text-4xl font-bold">${leftToBudget.toLocaleString()}</h1>
                    <p className="text-white text-sm mt-1 opacity-95">
                        Left to Budget
                    </p>
                </div>

                {/* Summary Section */}
                <div className="bg-gray-950 p-5 rounded-2xl mb-6">
                    <h2 className="text-lg font-semibold mb-3">Summary</h2>

                    {/* Income */}
                    <div className="mb-5">
                        <div className="flex justify-between text-sm mb-1">
                            <span>Income</span>
                            <span className="text-gray-400">
                                ${summary.income.earned} earned of ${summary.income.budget} budget
                            </span>
                        </div>
                        <div className="w-full bg-gray-800 h-3 rounded-full">
                            <div
                                className="h-3 bg-blue-500 rounded-full"
                                style={{ width: `${(summary.income.earned / summary.income.budget) * 100}%` }}
                            ></div>
                        </div>
                    </div>

                    {/* Expenses */}
                    <div className="mb-5">
                        <div className="flex justify-between text-sm mb-1">
                            <span>Expenses</span>
                            <span className="text-gray-400">
                                ${summary.expenses.spent} spent of ${summary.expenses.budget} budget
                            </span>
                        </div>
                        <div className="w-full bg-gray-800 h-3 rounded-full">
                            <div
                                className="h-3 bg-orange-400 rounded-full"
                                style={{ width: `${(summary.expenses.spent / summary.expenses.budget) * 100}%` }}
                            ></div>
                        </div>
                    </div>

                    {/* Goals */}
                    <div className="">
                        <div className="flex justify-between text-sm mb-1">
                            <span>Goals</span>
                            <span className="text-gray-400">
                                ${summary.goals.saved} saved of ${summary.goals.budget} budget
                            </span>
                        </div>
                        <div className="w-full bg-gray-800 h-3 rounded-full">
                            <div
                                className="h-3 bg-green-400 rounded-full"
                                style={{ width: `${(summary.goals.saved / summary.goals.budget) * 100}%` }}
                            ></div>
                        </div>
                    </div>
                </div>

                {/* Income Breakdown + Categories */}
                <div className="bg-gray-950 p-5 rounded-2xl">
                    <h2 className="text-xl font-semibold mb-4">Income & Categories</h2>

                    {/* Table */}
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
                            {categories.map((item, i) => {
                                const remaining = item.budget - item.actual;
                                return (
                                    <tr key={i} className="border-b border-gray-800">
                                        <td className="py-3">{item.name}</td>
                                        <td className="py-3">${item.budget.toLocaleString()}</td>
                                        <td className="py-3 text-purple-300">${item.actual.toLocaleString()}</td>
                                        <td
                                            className={`py-3 font-semibold ${
                                                remaining >= 0 ? "text-green-400" : "text-red-400"
                                            }`}
                                        >
                                            ${remaining.toLocaleString()}
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
