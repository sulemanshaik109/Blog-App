import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ImBlogger } from "react-icons/im";
import "../styles/Header.css";

const Header = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <nav className='nav-header'>
      <Link to="/" className='logo'>
        <ImBlogger size={30}/>
      </Link>
      {token ? (
        <div className='links-container'>
          <Link to="/" className='nav-link'>Home</Link>
          <Link to="/create" className='nav-link'>Create Post</Link>
          <button type='button' className='button' onClick={handleLogout}>Logout</button>
        </div>
      ) : (
        <div className='links-container'>
          <Link to="/login" className='nav-link'>Login</Link>
          <Link to="/register" className='nav-link'>Register</Link>
        </div>
      )}
    </nav>
  );
};

export default Header;
