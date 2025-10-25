import React from 'react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import { Outlet } from 'react-router-dom';

const MainLayout = ({ children }) => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <Header />
      
    <Outlet>

    </Outlet>
      
      {/* Footer */}
      <Footer />
    </div>
  );
};

export default MainLayout;
