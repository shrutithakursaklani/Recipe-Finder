import React from 'react';
import ReactDOM from 'react-dom/client';
import './App.css'; 
import Recipe from './components/Recipe'; // Corrected the path

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <>
    <Recipe />
  </>
);
