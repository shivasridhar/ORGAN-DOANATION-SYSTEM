import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import Home from './pages/Home';
import Mission from './pages/Mission';
import About from './pages/About';
import Contact from './pages/Contact';

const App = () => {
  return (
    <AuthProvider>
      <BrowserRouter>
        <div className="min-h-screen">
          <style>{`
            @keyframes blood-flow-enhanced {
              0% {
                transform: translateY(-20px) translateX(0) rotate(0deg) scale(var(--scale-factor, 1));
                opacity: 0;
              }
              5% {
                opacity: var(--cell-opacity, 0.7);
              }
              95% {
                opacity: var(--cell-opacity, 0.7);
              }
              100% {
                transform: translateY(100vh) translateX(var(--drift-x, 20px)) rotate(720deg) scale(calc(var(--scale-factor, 1) * 0.95));
                opacity: 0;
              }
            }
            
            .animate-blood-flow-enhanced {
              animation: blood-flow-enhanced cubic-bezier(0.45, 0.05, 0.55, 0.95) infinite;
              will-change: transform, opacity;
            }
            
            @media (prefers-reduced-motion: reduce) {
              .animate-blood-flow-enhanced {
                animation-duration: 20s;
              }
            }
          `}</style>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/mission" element={<Mission />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </div>
      </BrowserRouter>
    </AuthProvider>
  );
};

export default App;
