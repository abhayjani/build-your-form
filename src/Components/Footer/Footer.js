import React from 'react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <p>© {new Date().getFullYear()} Build Your Form. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
