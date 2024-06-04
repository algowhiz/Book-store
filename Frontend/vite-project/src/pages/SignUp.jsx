import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Notification from '../components/Utils/Notification';

const SignUp = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    username: '',
    password: '',
    address: ''
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

    if (formData.username === '' || formData.address === '' || formData.password === '' || formData.email === '') {
      setNotification({
        message: 'All fields are required',
        type: 'error',
        visible: true
      });
      return;
    }

    try {
      const response = await axios.post('http://localhost:4000/api/bookstore/sign-up', formData);
      setNotification({
        message: 'Sign up successful!',
        type: 'success',
        visible: true
      });

      setTimeout(() => {
        navigate('/login');
      }, 2000); // Navigate to login after 2 seconds
    } catch (error) {
      setNotification({
        message: 'Sign up failed. Please try again.',
        type: 'error',
        visible: true
      });
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-zinc-800 text-white p-6 z-50">
      <Notification
        message={notification.message}
        type={notification.type}
        visible={notification.visible}
        onClose={() => setNotification({ ...notification, visible: false })}
      />
      <div className="relative w-full max-w-md bg-gradient-to-r from-gray-600 to-black bg-opacity-70 shadow-md rounded-lg px-8 py-6 mb-4 z-0 ">
        <h2 className="text-3xl mb-6 text-center font-semibold">Sign Up</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="email" className="text-sm font-bold">Email</label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-800 leading-tight focus:outline-none focus:shadow-outline"
              id="email"
              type="email"
              placeholder="Enter your email"
              name="email"
              value={formData.email}
              onChange={handleChange}
            />
          </div>
          <div>
            <label htmlFor="username" className="text-sm font-bold">Username</label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-800 leading-tight focus:outline-none focus:shadow-outline"
              id="username"
              type="text"
              placeholder="Choose a username"
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
          <div>
            <label htmlFor="address" className="text-sm font-bold">Address</label>
            <textarea
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-800 leading-tight focus:outline-none focus:shadow-outline"
              id="address"
              placeholder="Enter your address"
              name="address"
              value={formData.address}
              onChange={handleChange}
            />
          </div>
          <div className="text-center">
            <button
              className="bg-gray-700 hover:bg-gray-800 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition duration-300"
              type="submit"
            >
              Sign Up
            </button>
          </div>
        </form>
        <p className="text-center text-sm mt-4">
          Already have an account? <a href="/login" className="text-blue-400">Move to Login</a>
        </p>
      </div>
    </div>
  );
};

export default SignUp;
