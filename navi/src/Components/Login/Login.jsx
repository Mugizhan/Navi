import React, { useState } from 'react';
import Bg from '../image/top.jpg';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

axios.defaults.withCredentials = true;

const Login = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState('');
  const [password, setPassword] = useState('');
  const [shopCode, setShopCode] = useState('');
  const [message, setMessage] = useState('');

  const handleLogout = () => {
    navigate('/');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${import.meta.env.VITE_REACT_APP_URI}/login`, {
        shopcode: shopCode,
        username: user,
        password: password
      });
      alert(`Welcome ${response.data.user.username}`);
      if (response.data.usertype === "Admin") {
        navigate('/admin');
      } else if (response.data.usertype === "Chief") {
        navigate('/chief');
      }
    } catch (error) {
      setMessage(error.response?.data?.message || "An error occurred");
    }
  };

  return (
    <div className='bg-black h-screen'>
      <div className='bg-black w-screen h-screen'>
        <img src={Bg} className='h-60' alt="Background" />
        <div className='fixed inset-0 mt-5 ml-2'>
          {/* Logout button */}
        </div>
        <div className='relative bottom-10 bg-gradient-to-b from-white to-gray-600 w-screen h-screen backdrop-blur-sm rounded-3xl my-1'>
          <div className='flex justify-center mt-20'>
            <div className='flex flex-col gap-5 mt-10'>
              <div className='mt-10 mb-6 text-2xl font-bold'>
                <h1>Admin Login</h1>
              </div>
            </div>
          </div>
          <br />
          <div className='flex justify-center'>
            <form className='w-80 flex flex-col gap-10' onSubmit={handleSubmit}>
              <input type='text' placeholder='ShopCode' className='w-full h-12 p-3 text-black rounded-xl bg-orange-50 shadow-xl outline-transparent' onChange={e => setShopCode(e.target.value)} />
              <input type='text' placeholder='Username' className='w-full h-12 p-3 text-black rounded-xl bg-orange-50 shadow-xl outline-transparent' onChange={e => setUser(e.target.value)} />
              <input type='password' placeholder='Password' className='w-full h-12 p-3 text-gray-500 rounded-xl bg-orange-50 shadow-xl outline-transparent' onChange={e => setPassword(e.target.value)} />
              <input type="submit" className='bg-red-500 w-full h-12 rounded-full text-white text-lg shadow-xl outline-red-500' value='Login' />
            </form>
          </div>
          <h1 className='flex flex justify-center mt-20 text-red-600'>
            {message && <span className='flex flex justify-center font-bold bg-gray-400 w-80 p-2 rounded-full'>{message}</span>}
          </h1>
        </div>
      </div>
    </div>
  );
};

export default Login;
