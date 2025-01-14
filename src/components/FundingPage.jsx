// src/components/FundingPage.jsx
import React from 'react';
import Header from './Header';
import CrowdfunderCalculator from './calculator/CrowdfunderCalculator';
import CrowdfunderCalculatorWelsh from './calculator/CrowdfunderCalculatorWelsh';
import { useLocation } from 'react-router-dom';

const FundingPage = () => {
  const location = useLocation();
  const isWelsh = location.pathname.includes('/cy');

  return (
    <div className="min-h-screen bg-[--color-light-grey]">
      <Header />
      <div className="py-8">
        <div className="space-y-12">
          {isWelsh ? (
            <CrowdfunderCalculatorWelsh />
          ) : (
            <CrowdfunderCalculator />
          )}
        </div>
      </div>
    </div>
  );
};

export default FundingPage;