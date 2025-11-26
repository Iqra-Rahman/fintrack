import React from 'react'
import { assets } from '../assets/assets'
import { useContext } from 'react'
import { AppContent } from '../context/AppContext.jsx'
import { useNavigate } from 'react-router-dom'
import { Wallet, BarChart3, Target, PieChart, Brain, Flag } from "lucide-react";


const Header = () => {

  const { isLoggedin, userData } = useContext(AppContent)

  const navigate = useNavigate()

  const handleGetStarted = () => {
    if (isLoggedin) {
      navigate('/dashboard');
    } else {
      navigate('/login');
    }
  };

  return (
    <div>
      <div className='flex'>
        <div className='flex flex-col items-start mt-13 mr-10 pr-5 ml-10 text-left'>
          {/* <img src={assets.journal_book} alt="" className='w-40 h-40 bg-cover rounded-full mb-6' /> */}
          {/* <h1 className='flex items-center gap-2 text-xl sm:text-3xl font-mediu, mb-2'>Hey {userData ? userData.name : "Storytellers"}!<img className='w-8 aspect-square' src={assets.hand_wave} alt="" /></h1> */}
          <h2 className='text-3xl sm:text-5xl font-semibold mb-4'>From Today, Take</h2>
          <h2 className='text-3xl sm:text-5xl font-semibold mb-4'>Control of Your Cash,</h2>
          <h2 className='text-3xl sm:text-5xl font-semibold mb-4 text-left text-indigo-600'>Effortlesly!</h2>
          <p className='mb-8 max-w-md text-gray-700 mt-5'>It's time to experience true financial freedom. Our intuitive finance tracker empowers you to take control of your cash, effortlessly. Visualize your spending, track your income, and set smart budgets with ease.</p>
          <button onClick={handleGetStarted} className='bg-indigo-600 text-white rounded-full px-8 py-2.5 hover:bg-indigo-500 transition-all'>Get Started</button>
        </div>
        <div className='flex flex-col items-center text-center w-130 h-100 pt-15 mr-10  mt-17 px-4'>
          <img src={assets.data} alt="" className='bg-cover rounded-2xl' />
        </div>
      </div>
      <div className='mt-25 w-full bg-gray-950  pb-7 rounded-2xl border-0.5 border-purple-600 shadow-[0_0_60px_7px_rgba(168,85,247,0.5)]'>
        <h2 className='text-2xl sm:text-3xl font-semibold mb-4 text-center pt-10'>Why Choose Our Finance Tracker?</h2>
        <p className='mb-8 max-w-2xl text-gray-700 mt-5 text-center mx-auto pb-10'>Our finance tracker is designed with you in mind. Discover how our intelligent tools empower you to manage your money, optimize your spending, and achieve your financial goals with ease</p>
        <div className=''>
          <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-10 justify-items-center '>
            <div className='bg-gray-900 p-6 w-72 rounded-xl flex flex-col items-start 
  hover-animate-gradientFlow 
  hover:transition-all duration-500 cursor-pointer'>
              <Wallet className="w-8 h-8 bg-gradient-to-br from-purple-700 to-pink-700 p-1 rounded-md text-white mb-2" />
              <h3 className='text-xl font-semibold mb-2'>Transaction Management</h3>
              <p className='text-white'>Add, edit, and categorize all your income and expenses in seconds. Our streamlined interface gives you a clear picture of where your money goes.</p>
            </div>
            <div className='bg-gray-900 p-6 w-72 rounded-xl flex flex-col items-start  
  hover-animate-gradientFlow 
  hover:transition-all duration-500 cursor-pointer'>
              <BarChart3 className="w-8 h-8 bg-gradient-to-br from-purple-700 to-pink-600 p-1 rounded-md text-white mb-2" />
              <h3 className='text-xl font-semibold mb-2'>Financial Dashboard</h3>
              <p className='text-white'>Get an instant overview of your financial health. Your personalized dashboard clearly displays total income, total expenses, and your current balance.</p>
            </div>
            <div className='bg-gray-900 p-6 w-72 rounded-xl flex flex-col items-start  
  hover-animate-gradientFlow 
  hover:transition-all duration-500 cursor-pointer'>
              <PieChart className="w-8 h-8 bg-gradient-to-br from-purple-700 to-pink-600 p-1 rounded-md text-white mb-2" />
              <h3 className='text-xl font-semibold mb-2'>Smart Budget Tracking</h3>
              <p className='text-white'>Take control of your spending with flexible budget management. Set realistic limits for different categories, track your progress in real-time.</p>
            </div>
            <div className='bg-gray-900 p-6 w-72 rounded-xl flex flex-col items-start 
  hover-animate-gradientFlow 
  hover:transition-all duration-500 cursor-pointer'>
              <Target className="w-8 h-8 bg-gradient-to-br from-purple-700 to-pink-600 p-1 rounded-md text-white mb-2" />
              <h3 className='text-xl font-semibold mb-2'>Visual Spending Insights</h3>
              <p className='text-white'>Understand your financial habits at a glance. Our interactive charts and graphs break down your category-wise expenses, helping you cut unnecessary costs, and make smarter decisions.</p>
            </div>
            <div className='bg-gray-900 p-6 w-72 rounded-xl flex flex-col items-start 
  hover-animate-gradientFlow 
  hover:transition-all duration-500 cursor-pointer'>
              <Brain className="w-8 h-8 bg-gradient-to-br from-purple-700 to-pink-600 p-1 rounded-md text-white mb-2" />
              <h3 className='text-xl font-semibold mb-2'>AI Saving Advisor</h3>
              <p className='text-white'>Reach your financial goals faster with intelligent guidance. Our AI analyzes your spending patterns to provide personalized saving suggestions, helping you build your wealth effortlessly.</p>
            </div>
            <div className='bg-gray-900 p-6 w-72 rounded-xl flex flex-col items-start 
  hover-animate-gradientFlow 
  hover:transition-all duration-500 cursor-pointer'>
              <Flag className="w-8 h-8 bg-gradient-to-br from-purple-700 to-pink-600 p-1 rounded-md text-white mb-2" />
              <h3 className='text-xl font-semibold mb-2'>Goal-Oriented Planning</h3>
              <p className='text-white'>
                Set and achieve your financial aspirations, from a dream vacation to a down payment.
                Track your progress towards multiple savings goals with clear milestones and motivational nudges.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Header;
