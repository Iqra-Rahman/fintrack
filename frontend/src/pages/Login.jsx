import React, { useContext, useState } from 'react';
import { assets } from '../assets/assets';
import { useNavigate } from 'react-router-dom';
import { AppContent } from '../context/AppContext.jsx';
import axios from 'axios';
import { toast } from 'react-toastify';

axios.defaults.withCredentials = true;

const Login = () => {
  const navigate = useNavigate();

  const { backendUrl, setIsLoggedin, fetchUserFinance } = useContext(AppContent);

  const [state, setState] = useState('Sign Up');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    try {
      let response;

      if (state === 'Sign Up') {
        response = await axios.post(`${backendUrl}/api/auth/register`, {
          name,
          email,
          password,
        });
      } else {
        response = await axios.post(`${backendUrl}/api/auth/login`, {
          email,
          password,
        });
      }

      const { data } = response;

      if (!data.success) {
        toast.error(data.message);
        return;
      }

      // login succeeded
      setIsLoggedin(true);

      // cookie is available
      await fetchUserFinance();

      navigate('/dashboard');
    } catch (error) {
      toast.error(
        error?.response?.data?.message || 'Something went wrong'
      );
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen px-6 sm:px-0 bg-gradient-to-br">
      <h2
        onClick={() => navigate('/')}
        className="text-3xl font-bold absolute left-5 sm:left-20 top-5 w-28 sm:w-32 cursor-pointer text-purple-200"
      >
        FinTrack
      </h2>

      <div className="bg-slate-900 p-10 rounded-lg shadow-lg w-full sm:w-96 text-yellow-300 text-sm">
        <h2 className="text-3xl font-semibold text-white text-center mb-3">
          {state === 'Sign Up' ? 'Create account' : 'Login'}
        </h2>

        <p className="text-center text-sm mb-6">
          {state === 'Sign Up'
            ? 'Create your account'
            : 'Login to your account!'}
        </p>

        <form onSubmit={onSubmitHandler}>
          {state === 'Sign Up' && (
            <div className="mb-4 flex items-center gap-3 border w-full rounded-full px-5 py-2.5 bg-[#333A5C]">
              <img src={assets.person_icon} />
              <input
                type="text"
                placeholder="Full Name"
                required
                className="bg-transparent outline-none"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
          )}

          <div className="mb-4 flex items-center gap-3 border w-full rounded-full px-5 py-2.5 bg-[#333A5C]">
            <img src={assets.mail_icon} />
            <input
              type="email"  
              placeholder="Email id"
              required
              className="bg-transparent outline-none"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="mb-4 flex items-center gap-3 border w-full rounded-full px-5 py-2.5 bg-[#333A5C]">
            <img src={assets.lock_icon} />
            <input
              type="password"
              placeholder="Password"
              required
              className="bg-transparent outline-none"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <p
            onClick={() => navigate('/reset-password')}
            className="mb-4 text-yellow-500 cursor-pointer"
          >
            Forgot Password?
          </p>

          <button className="w-full py-2.5 rounded-full bg-gradient-to-r from-pink-500 to-pink-900 text-white font-medium">
            {state}
          </button>
        </form>

        {state === 'Sign Up' ? (
          <p className="text-gray-400 text-center text-xs mt-4">
            Already have an account?{' '}
            <span
              onClick={() => setState('Login')}
              className="text-blue-400 cursor-pointer underline"
            >
              Login here
            </span>
          </p>
        ) : (
          <p className="text-gray-400 text-center text-xs mt-4">
            Don't have an account?{' '}
            <span
              onClick={() => setState('Sign Up')}
              className="text-blue-400 cursor-pointer underline"
            >
              Sign Up
            </span>
          </p>
        )}
      </div>
    </div>
  );
};

export default Login;
