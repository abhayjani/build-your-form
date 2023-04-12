import React from 'react';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import './HomePage.css';

const HomePage = () => {
  return (
    <div className="home-page">
      <Header />
      <main className="container">
        <h1>Welcome to Build Your Form</h1>
      </main>
      <Footer />
    </div>
  );
};

export default HomePage;
