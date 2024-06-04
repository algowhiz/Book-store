import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { authAction } from '../store/auth';
import { useDispatch } from 'react-redux';
import Notification from '../components/Utils/Notification'

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });

  const [notification, setNotification] = useState({
    message: '',
    type: '', // 'success' or 'error'
    visible: false
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password === '' || formData.username === '') {
      setNotification({
        message: 'All fields are required',
        type: 'error',
        visible: true
      });
      return;
    }

    try {
      const response = await axios.post('https://book-store-12.onrender.com/api/bookstore/sign-in', formData);
      dispatch(authAction.login());
      dispatch(authAction.changeRole(response.data.role));
      localStorage.setItem("id", response.data.id);
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("role", response.data.role);

      setNotification({
        message: 'Login successful!',
        type: 'success',
        visible: true
      });

      setTimeout(() => {
        navigate('/profile');
      }, 2000); // Navigate to profile after 2 seconds
    } catch (error) {
      setNotification({
        message: 'Login failed. Please check your credentials.',
        type: 'error',
        visible: true
      });
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-zinc-800 text-white p-5">
      <Notification
        message={notification.message}
        type={notification.type}
        visible={notification.visible}
        onClose={() => setNotification({ ...notification, visible: false })}
      />
      <div className="relative w-full max-w-md bg-gradient-to-r from-gray-600 to-black bg-opacity-70 shadow-md rounded-lg px-8 py-6 mb-4 ">
        <h2 className="text-3xl mb-6 text-center font-semibold">Login</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="username" className="text-sm font-bold">Username</label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-800 leading-tight focus:outline-none focus:shadow-outline"
              id="username"
              type="text"
              placeholder="Enter your username"
              name="username"
              value={formData.username}
              onChange={handleChange}
            />
          </div>
          <div>
            <label htmlFor="password" className="text-sm font-bold">Password</label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-800 leading-tight focus:outline-none focus:shadow-outline"
              id="password"
              type="password"
              placeholder="Enter your password"
              name="password"
              value={formData.password}
              onChange={handleChange}
            />
          </div>
          <div className="text-center">
            <button
              className="bg-gray-700 hover:bg-gray-800 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition duration-300 mt-3"
              type="submit"
            >
              Login
            </button>
          </div>
        </form>
        <p className="text-center text-sm mt-4">
          Don't have an account? <a href="/sign-up" className="text-blue-400">Move to Sign-Up</a>
        </p>
      </div>
    </div>
  );
};

export default Login;
