import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Register = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/auth/register', { username, password });
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
        <h2 className='page-title'>Register</h2>
        <p className='auth-description'>Enter Your Personal Information</p>
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
        <label htmlFor='inputPassword' className='label'>Password</label>
        <input
          type="password"
          id="inputPassword"
          placeholder="Password"
          className='input'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        {error && <p className='error'>* {error}</p>}
        <button type="submit" className='button'>Register</button>
      </form>
    </div>
  );
};

export default Register;
