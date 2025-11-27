import { createContext, useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

axios.defaults.withCredentials = true;

export const AppContent = createContext();

export const AppContextProvider = (props) => {
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const [isLoggedin, setIsLoggedin] = useState(false);
  const [userData, setUserData] = useState(null);
  const [transactions, setTransactions] = useState([]);
  const [summary, setSummary] = useState(null);
  const [financialData, setFinancialData] = useState(null);
  const [loading, setLoading] = useState(true);

  const getAuthState = async () => {
    try {
      const { data } = await axios.get(`${backendUrl}/api/auth/is-auth`);
      if (data.success) {
        setIsLoggedin(true);
        await getUserData();
        await getFinancialData();
      }
    } catch (error) {
      setIsLoggedin(false);
    } finally {
        setLoading(false);
    }
  };

  const getUserData = async () => {
    try {
      const { data } = await axios.get(`${backendUrl}/api/user/data`);
      if (data.success) setUserData(data.userData);
      else toast.error(data.message);
    } catch (error) {
      console.error(error);
      toast.error(error.message);
    }
  };

  // UPDATED: Uses specific user endpoint
  const getFinancialData = async () => {
    try {
      const { data } = await axios.get(`${backendUrl}/api/financial/get`);
      if (data.success) setFinancialData(data.financial);
    } catch (error) {
      console.error("Financial fetch error", error);
    }
  };

  const fetchAllTransactions = async () => {
    try {
      const incomeRes = await axios.get(`${backendUrl}/api/income/all`);
      const expenseRes = await axios.get(`${backendUrl}/api/expense/all`);
      
      const merged = [
        ...incomeRes.data.incomes.map(i => ({...i, type: 'income'})),
        ...expenseRes.data.expenses.map(e => ({...e, type: 'expense'})),
      ].sort((a, b) => new Date(b.date) - new Date(a.date));
      
      setTransactions(merged);
    } catch (err) {
      console.error("Transaction fetch failed:", err.message);
    }
  };

  const fetchSummary = async () => {
    try {
      const res = await axios.get(`${backendUrl}/api/summary`);
      if (res.data.success) setSummary(res.data.summary);
    } catch (err) {
      console.error("Summary fetch failed:", err.message);
    }
  };

  useEffect(() => {
    getAuthState();
  }, []);

  return (
    <AppContent.Provider
      value={{
        backendUrl,
        isLoggedin,
        setIsLoggedin,
        userData,
        setUserData,
        transactions,
        summary,
        financialData,
        setFinancialData,
        fetchUserFinance: getUserData,
        fetchAllTransactions,
        fetchSummary,
        loading,
      }}
    >
      {props.children}
    </AppContent.Provider>
  );
};