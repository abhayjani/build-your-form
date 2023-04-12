import React from 'react';
import { NavLink } from 'react-router-dom';
import './Header.css';

const Header = () => {
  return (
    <header className="header">
      <div className="container">
        <div className="header-content">
          <NavLink className="logo" to="/">
            Build Your Form
          </NavLink>
          <nav className="main-nav">
            <NavLink activeClassName="active" to="/create-form">
              Create Your Form
            </NavLink>
            <NavLink activeClassName="active" to="/dashboard">
              Your Dashboard
            </NavLink>
            <NavLink activeClassName="active" to="/signup-login">
              Sign up & Login
            </NavLink>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
