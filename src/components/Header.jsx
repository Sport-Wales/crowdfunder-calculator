// src/components/Header.jsx
import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const isWelsh = location.pathname.includes('/cy');

  const toggleLanguage = () => {
    if (isWelsh) {
      navigate('/en');
    } else {
      navigate('/cy');
    }
  };

  return (
    <nav className="bg-white border-b border-gray-200">
      <div className="mx-auto px-4 sm:px-6 lg:px-1">
        <div className="flex px-10 justify-between h-16">
          <div className="flex items-stretch space-x-8">
            <div className="flex-shrink-0 flex items-center space-x-3">
              <div className="flex flex-col">
                <span className="text-2xl font-semibold text-[--color-sw-blue]">
                  Sport Wales
                </span>
              </div>
            </div>

            <div className="hidden md:flex items-center space-x-8">
              <span className="text-lg font-medium text-[--color-sw-blue] px-1">
                Crowdfunder Calculator  
              </span>
            </div>
          </div>

          <div className="flex items-center">
            <button
              onClick={toggleLanguage}
              className="px-4 py-2 bg-[--color-sw-blue] text-white rounded-lg hover:opacity-90 transition-opacity text-sm font-semibold"
            >
              {isWelsh ? 'English' : 'Cymraeg'}
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Header;