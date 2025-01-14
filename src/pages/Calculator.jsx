// src/pages/Calculator.jsx
import React from 'react';
import { useLocation } from 'react-router-dom';
import CrowdfunderCalculator from '../components/calculator/CrowdfunderCalculator';
import CrowdfunderCalculatorWelsh from '../components/calculator/CrowdfunderCalculatorWelsh';
import Header from '../components/Header';
import Footer from '../components/Footer';

const Calculator = () => {
  const location = useLocation();
  const isWelsh = location.pathname.includes('/cy');

  return (
    <div>
      <Header />
      <div className="container mx-auto py-8 px-4">
        {isWelsh ? (
          <CrowdfunderCalculatorWelsh />
        ) : (
          <CrowdfunderCalculator />
        )}
      </div>
      <Footer/>
    </div>
  );
};

export default Calculator;