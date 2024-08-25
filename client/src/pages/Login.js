import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from "axios";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import "../styles/Auth.css";

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('https://blog-app-5fnw.onrender.com/auth/login', { username, password });
      localStorage.setItem('token', response.data.token);
      navigate('/');
    } catch (error) {
      if (error.response && error.response.data && error.response.data.message) {
        setError(error.response.data.message);
      } else {
        setError('An unexpected error occurred. Please try again.');
      }
    }
  };

  return (
    <div className='auth-container'>
      <form onSubmit={handleSubmit} className='auth-form-container'>
        <h2 className='page-title'>Login</h2>
        <p className='auth-description'>Login to continue using the app</p>
        <label htmlFor='username' className='label'>Username</label>
        <input
          type="text"
          id="username"
          placeholder="Username"
          className='input'
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <label htmlFor='password' className='label'>Password</label>
        <div className='input'>
          <input
            type={showPassword ? "text": "password"}
            id="password"
            placeholder="Password"
            className='password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button className='btn' type="button" onClick={() => setShowPassword((prev) => !prev)}>
            {showPassword ? <FaEyeSlash size={16}/> : <FaEye size={16}/>}
          </button>
        </div>
        {error && <p className='error'>* {error}</p>}
        <button type="submit" className='button'>Login</button>
      </form>
      <p className='text'>Don't have an account? <Link to="/register" className='register-link'>Register</Link></p>
    </div>
  );
};

export default Login;
