import React from 'react';
import Header from '../components/header/Header';
import CategoryForm from '../components/category-form/CategoryForm';
import './addItem.css';
import Footer from '../components/footer/Footer';

const AddItem = () => {
  return (
    <div className='add-item'>
      <Header />
      <CategoryForm />
      <Footer />
    </div>
  );
};

export default AddItem;
