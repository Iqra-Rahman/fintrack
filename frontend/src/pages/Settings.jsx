import React, { useState, useEffect, useContext } from "react";
import Menu from "../components/Menu";
import { AppContent } from "../context/AppContext.jsx";

const Settings = () => {
  const { userData, setUserData } = useContext(AppContent);

  const [form, setForm] = useState({
    monthlyIncome: "",
    monthlyExpenseLimit: "",
    savingGoal: "",
  });

  useEffect(() => {
    if (userData) {
      setForm({
        monthlyIncome: userData.monthlyIncome || "",
        monthlyExpenseLimit: userData.monthlyExpenseLimit || "",
        savingGoal: userData.savingGoal || "",
      });
    }
  }, [userData]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const saveSettings = async () => {
    const res = await fetch("http://localhost:5000/api/user/update-finance", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(form),
      credentials: "include",
    });

    const data = await res.json();
    setUserData(data.user); // update global context

    alert("Updated Successfully!");
  };

  return (
    <div className="flex w-full text-white mt-0">
      <Menu />

      <div className="w-3/4 flex flex-col m-3 ml-0 rounded-3xl p-2">
        <div className="bg-gray-950 p-5 rounded-2xl">
          <h1 className="text-2xl font-bold text-violet-400">Financial Settings</h1>
          <p className="text-gray-400 text-sm mb-5">Set your monthly targets</p>

          <div className="space-y-5">
            {/* Monthly Income */}
            <div>
              <label className="text-gray-400 text-sm">Monthly Income (₹)</label>
              <input 
                className="w-full mt-2 p-3 bg-gray-900 rounded-lg border border-gray-700"
                type="number"
                name="monthlyIncome"
                value={form.monthlyIncome}
                onChange={handleChange}
                placeholder="e.g. 50000"
              />
            </div>

            {/* Expense Limit */}
            <div>
              <label className="text-gray-400 text-sm">Monthly Expense Limit (₹)</label>
              <input 
                className="w-full mt-2 p-3 bg-gray-900 rounded-lg border border-gray-700"
                type="number"
                name="monthlyExpenseLimit"
                value={form.monthlyExpenseLimit}
                onChange={handleChange}
                placeholder="e.g. 30000"
              />
            </div>

            {/* Saving Goal */}
            <div>
              <label className="text-gray-400 text-sm">Savings Goal (₹)</label>
              <input 
                className="w-full mt-2 p-3 bg-gray-900 rounded-lg border border-gray-700"
                type="number"
                name="savingGoal"
                value={form.savingGoal}
                onChange={handleChange}
                placeholder="e.g. 15000"
              />
            </div>

            <button 
              onClick={saveSettings}
              className="bg-purple-700 px-6 py-2 rounded-full hover:bg-purple-600 mt-4"
            >
              Save Settings
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
