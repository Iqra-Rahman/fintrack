import React, { useContext, useState } from "react";
import { AppContent } from "../context/AppContext";
import Menu from "../components/Menu";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const AddTransaction = () => {
  const { backendUrl } = useContext(AppContent);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    amount: "",
    type: "expense",
    category: "",
    source: "",
    other: "",
    date: "",
  });

  axios.defaults.withCredentials = true;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const isIncome = formData.type === "income";

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      let response; 

      if (formData.type === "income") {
        const payload = {
          amount: Number(formData.amount),
          source: formData.source === "Other" ? formData.other : formData.source,
          date: formData.date || new Date().toISOString(),
        };

        response = await axios.post(`${backendUrl}/api/income/add`, payload);
      } else {
        const payload = {
          amount: Number(formData.amount),
          category: formData.category === "Other" ? formData.other : formData.category,
          date: formData.date || new Date().toISOString(),
        };

        response = await axios.post(`${backendUrl}/api/expense/add`, payload);
      }

      const { data } = response;

      if (data.success) {
        toast.success(`${formData.type === "income" ? "Income" : "Expense"} added!`);
        
        if (formData.type === "income") {
          navigate("/dashboard"); 
        } else {
          navigate("/budgetandcategories"); 
        }
      } else {
        toast.error(data.message);
      }

    } catch (error) {
      console.error(error); 
      toast.error("Something went wrong!");
    }
  };

  return (
    <div className="flex w-full text-white">
      <Menu />

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

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="bg-gray-950 p-6 rounded-2xl shadow-md space-y-5"
        >
          <div className="grid grid-cols-2 gap-6">
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
                required
                className="w-full p-3 bg-gray-900 rounded-lg border border-gray-700 focus:border-violet-500 transition"
              />
            </div>

            {/* Type */}
            <div>
              <label className="block mb-2 text-sm text-gray-400">
                Transaction Type
              </label>
              <select
                name="type"
                value={formData.type}
                onChange={handleChange}
                className="w-full p-3 bg-gray-900 rounded-lg border border-gray-700 focus:border-violet-500 transition"
              >
                <option value="income">Income</option>
                <option value="expense">Expense</option>
              </select>
            </div>

            {/* Source OR Category */}
            {isIncome ? (
              <div>
                <label className="block mb-2 text-sm text-gray-400">
                  Source
                </label>
                <select
                  name="source"
                  value={formData.source}
                  onChange={handleChange}
                  required
                  className="w-full p-3 bg-gray-900 rounded-lg border border-gray-700 focus:border-violet-500 transition"
                >
                  <option value="">Select Source</option>
                  <option value="Salary">Salary</option>
                  <option value="Freelancing">Freelancing</option>
                  <option value="Investments">Investments</option>
                  <option value="Gifts">Gifts</option>
                  <option value="Other">Other</option>
                </select>

                {formData.source === "Other" && (
                  <input
                    type="text"
                    name="other"
                    value={formData.other}
                    onChange={handleChange}
                    placeholder="Specify source"
                    required
                    className="w-full mt-3 p-3 bg-gray-900 rounded-lg border border-gray-700 focus:border-violet-500 transition"
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
                  required
                  className="w-full p-3 bg-gray-900 rounded-lg border border-gray-700 focus:border-violet-500 transition"
                >
                  <option value="">Select Category</option>
                  <option value="Food & Dining">Food & Dining</option>
                  <option value="Transportation">Transportation</option>
                  <option value="Shopping">Shopping</option>
                  <option value="Entertainment">Entertainment</option>
                  <option value="Bills">Bills</option>
                  <option value="Other">Other</option>
                </select>

                {formData.category === "Other" && (
                  <input
                    type="text"
                    name="other"
                    value={formData.other}
                    onChange={handleChange}
                    placeholder="Specify category"
                    required
                    className="w-full mt-3 p-3 bg-gray-900 rounded-lg border border-gray-700 focus:border-violet-500 transition"
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
                required
                className="w-full p-3 bg-gray-900 rounded-lg border border-gray-700 focus:border-violet-500 transition"
              />
            </div>
          </div>

          {/* Button */}
          <div className="flex justify-end mt-6">
            <button
              type="submit"
              className="bg-purple-700 hover:bg-purple-600 transition px-6 py-2 rounded-full"
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
