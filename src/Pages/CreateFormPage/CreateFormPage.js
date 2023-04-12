import React from 'react';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import FormBuilder from '../../components/FormBuilder/FormBuilder';
import './CreateFormPage.css';

const CreateFormPage = () => {
  return (
    <div className="create-form-page">
      <Header />
      <main className="container">
        <h1>Create Your Form</h1>
        <FormBuilder />
      </main>
      <Footer />
    </div>
  );
};

export default CreateFormPage;
