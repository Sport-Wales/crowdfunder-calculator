// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Calculator from './pages/Calculator';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <main>
          <Routes>
            {/* Redirect root to English version */}
            <Route path="/" element={<Navigate to="/en" replace />} />
            
            {/* English route */}
            <Route path="/en" element={<Calculator />} />
            
            {/* Welsh route */}
            <Route path="/cy" element={<Calculator />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;