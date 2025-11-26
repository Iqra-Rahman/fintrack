import React from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import Navbar from "./components/Navbar.jsx";
import Home from './pages/Home'
import Login from './pages/Login'
import EmailVerify from './pages/EmailVerify'
import ResetPassword from './pages/ResetPassword'
import Dashboard from './pages/Dashboard.jsx';
import Transactions from './pages/Transactions.jsx';
import {ToastContainer} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import AddTransaction from './pages/AddTransaction.jsx';
import BudgetCategories from './pages/BudgetCategories.jsx';
import Report from './pages/Report.jsx';
import Settings from './pages/Settings.jsx';

const App = () => {
  const location = useLocation();
  
  // Hide Navbar on Login, EmailVerify, and ResetPassword pages
  const hideNavbarPaths = ['/login', '/email-verify', '/reset-password'];
  const shouldHideNavbar = hideNavbarPaths.includes(location.pathname);
  return (
    <div >
      <ToastContainer/>
      {!shouldHideNavbar && <Navbar />}
      <div className="pt-20 bg-gradient-to-r from-black via-[#1e0033] to-black min-h-screen flex items-center justify-center text-purple-400">
        <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/email-verify" element={<EmailVerify/>} />
        <Route path="/reset-password" element={<ResetPassword/>} />
        <Route path="/dashboard" element={<Dashboard/>} />
        <Route path ="/transactions" element={<Transactions/>}/> 
        <Route path ="/add-transaction" element={<AddTransaction/>}/> 
        <Route path ="/budgetandcategories" element={<BudgetCategories/>}/>
        <Route path ="/report" element={<Report/>} />
        <Route path ="/settings" element={<Settings/>} />
      </Routes>
      </div>
    </div>
  )
}

export default App
