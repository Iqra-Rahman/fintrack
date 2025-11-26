import React, { useContext, useState } from "react";
import { AppContent } from "../context/AppContext.jsx";
import Menu from "../components/Menu.jsx";
import { useNavigate } from "react-router-dom";

const AddTransaction = () => {
  const { userData } = useContext(AppContent);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    amount: "",
    type: "expense",
    category: "",
    source: "",
    other: "",
    date: "",
    description: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Transaction Added:", formData);
    // Add your submit logic here (API call or DB)
  };

  const isIncome = formData.type === "income";

  return (
    <div className="flex w-full text-white">
      {/* Menu Sidebar */}
      <Menu />

      {/* Main Content */}
      <div className="w-3/4 flex flex-col m-3 ml-0 rounded-3xl p-2">
        {/* Header */}
        <div className="bg-gray-950 mb-4 p-4 rounded-2xl">
          <h1 className="text-2xl font-bold mb-1 text-violet-400">
            Add New Transaction
          </h1>
          <p className="text-gray-400 text-sm">
            Quickly add your income or expense
          </p>
        </div>

        {/* Form Section */}
        <form
          onSubmit={handleSubmit}
          className="bg-gray-950 p-6 rounded-2xl shadow-md space-y-5"
        >
          <div className="grid grid-cols-2 gap-6">
            {/* Title */}
            <div>
              <label className="block mb-2 text-sm text-gray-400">Title</label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="e.g. Grocery Shopping"
                className="w-full p-3 bg-gray-900 rounded-lg outline-none border border-gray-700 focus:border-violet-500 transition"
              />
            </div>

            {/* Amount */}
            <div>
              <label className="block mb-2 text-sm text-gray-400">
                Amount (₹)
              </label>
              <input
                type="number"
                name="amount"
                value={formData.amount}
                onChange={handleChange}
                placeholder="e.g. 1500"
                className="w-full p-3 bg-gray-900 rounded-lg outline-none border border-gray-700 focus:border-violet-500 transition"
              />
            </div>

            {/* Transaction Type */}
            <div>
              <label className="block mb-2 text-sm text-gray-400">
                Transaction Type
              </label>
              <select
                name="type"
                value={formData.type}
                onChange={handleChange}
                className="w-full p-3 bg-gray-900 rounded-lg outline-none border border-gray-700 focus:border-violet-500 transition"
              >
                <option value="income">Income</option>
                <option value="expense">Expense</option>
              </select>
            </div>

            {/* Dynamic Field (Category or Source) */}
            {isIncome ? (
              <div>
                <label className="block mb-2 text-sm text-gray-400">
                  Source
                </label>
                <select
                  name="source"
                  value={formData.source}
                  onChange={handleChange}
                  className="w-full p-3 bg-gray-900 rounded-lg outline-none border border-gray-700 focus:border-violet-500 transition"
                >
                  <option value="">Select Source</option>
                  <option value="Salary">Salary</option>
                  <option value="Freelancing">Freelancing</option>
                  <option value="Investments">Investments</option>
                  <option value="Gifts">Gifts</option>
                  <option value="Other">Other</option>
                </select>

                {/* Show "Other" input if selected */}
                {formData.source === "Other" && (
                  <input
                    type="text"
                    name="other"
                    value={formData.other}
                    onChange={handleChange}
                    placeholder="Please specify source"
                    className="w-full mt-3 p-3 bg-gray-900 rounded-lg outline-none border border-gray-700 focus:border-violet-500 transition"
                  />
                )}
              </div>
            ) : (
              <div>
                <label className="block mb-2 text-sm text-gray-400">
                  Category
                </label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  className="w-full p-3 bg-gray-900 rounded-lg outline-none border border-gray-700 focus:border-violet-500 transition"
                >
                  <option value="">Select Category</option>
                  <option value="Food">Food & Dining</option>
                  <option value="Transport">Transportation</option>
                  <option value="Shopping">Shopping</option>
                  <option value="Entertainment">Entertainment</option>
                  <option value="Other">Other</option>
                </select>

                {/* Show "Other" input if selected */}
                {formData.category === "Other" && (
                  <input
                    type="text"
                    name="other"
                    value={formData.other}
                    onChange={handleChange}
                    placeholder="Please specify category"
                    className="w-full mt-3 p-3 bg-gray-900 rounded-lg outline-none border border-gray-700 focus:border-violet-500 transition"
                  />
                )}
              </div>
            )}

            {/* Date */}
            <div>
              <label className="block mb-2 text-sm text-gray-400">Date</label>
              <input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                className="w-full p-3 bg-gray-900 rounded-lg outline-none border border-gray-700 focus:border-violet-500 transition"
              />
            </div>

            {/* Description */}
            <div>
              <label className="block mb-2 text-sm text-gray-400">
                Description
              </label>
              <input
                type="text"
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Optional notes"
                className="w-full p-3 bg-gray-900 rounded-lg outline-none border border-gray-700 focus:border-violet-500 transition"
              />
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex justify-end mt-6">
            <button
              type="submit"
              className="bg-purple-700 hover:bg-purple-600 transition px-6 py-2 rounded-full text-white "
            >
              Add Transaction
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddTransaction;
