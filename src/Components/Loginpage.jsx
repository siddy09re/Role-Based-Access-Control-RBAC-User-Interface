import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';  // To navigate to the app page after login
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../Firebase'; // Assuming the Firebase setup is correct


const Loginpage = () => {
  const [role, setRole] = useState('');  
  const [email, setEmail] = useState('');  
  const [password, setPassword] = useState(''); 
  const [error, setError] = useState('');  
  const navigate = useNavigate();  

  // Role-based predefined passwords
  const rolePasswords = {
    Admin: 'admin@123',
    Editor: 'editor@123',
    Reader: 'reader@123',
  };

  // Function to handle login
  const handleLogin = async (e) => {
    e.preventDefault();

    if (!role || !email || !password) {
      setError('Please fill all the fields.');
      return;
    }

    // Check if the password matches the predefined one for the selected role
    if (password !== rolePasswords[role]) {
      setError('Invalid password for the selected role.');
      return;
    }

    try {
      
      const userCollection = collection(db, role);
      const querySnapshot = await getDocs(userCollection);
      
      let emailFound = false;
      
      querySnapshot.forEach((doc) => {
        const userData = doc.data();
        if (userData.Email === email) {
          emailFound = true;
        }
      });

      if (!emailFound) {
        setError('Email not found for the selected role.');
        return;
      }

      
      console.log('Logged in successfully!');
      navigate('/apppage', { state: { role } }); 
    } catch (error) {
      setError('Error during login. Please try again.');
      console.error('Error logging in:', error);
    }
  };

  return (
    <div className="min-h-screen bg-cyan-700 text-white flex flex-col justify-center items-center relative">
    {/* Background Video */}
    <video
      className="absolute top-0 left-0 w-full h-full object-cover"
      autoPlay
      muted
      loop
    >
      <source src="/5192-183786490_medium.mp4" type="video/mp4" />
      Your browser does not support the video tag.
    </video>
    
    {/* Login Form */}
    <div className="relative z-10">
    <h1 className="text-2xl font-bold mb-4 text-center sm:text-3xl">Role-Based Access Control</h1>
      <h1 className="text-2xl font-bold mb-4 text-center sm:text-3xl">Login</h1>
      <form onSubmit={handleLogin} className="bg-white bg-opacity-50 text-black p-6 rounded-lg shadow-lg w-80 sm:w-96">
        {/* Role Selection */}
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2" htmlFor="role">
            Role
          </label>
          <select
            id="role"
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md"
          >
            <option value="">Select Role</option>
            <option value="Admin">Admin</option>
            <option value="Editor">Editor</option>
            <option value="Reader">Reader</option>
          </select>
        </div>
  
        {/* Email Input */}
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2" htmlFor="email">
            Email
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md"
            placeholder="Enter your email"
          />
        </div>
  
        {/* Password Input */}
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2" htmlFor="password">
            Password
          </label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md"
            placeholder="Enter your password"
          />
        </div>
  
        {/* Error Message */}
        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
  
        {/* Submit Button */}
        <div className="flex justify-center">
          <button
            type="submit"
            className="bg-green-500 text-white rounded-full px-6 py-2 mt-4"
          >
            Login
          </button>
        </div>
      </form>
    </div>
  </div>
  
  );
};

export default Loginpage;
