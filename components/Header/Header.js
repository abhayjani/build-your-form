import React from 'react';

const Header = () => {
  return (
    <header className="header">
      <div className="header-container">
        <h1 className="header-title">Build Your Form</h1>
        <nav className="header-nav">
          <ul className="nav-list">
            <li className="nav-item">
              <a href="/create-form" className="nav-link">Create Your Form</a>
            </li>
            <li className="nav-item">
              <a href="/dashboard" className="nav-link">Your Dashboard</a>
            </li>
            <li className="nav-item">
              <a href="/auth" className="nav-link">Sign up & Login via Google</a>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;

