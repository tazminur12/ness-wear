import React from 'react';
import { Outlet } from 'react-router-dom';

const DashboardContent = () => {
  return (
    <div className="space-y-6">
      <Outlet />
    </div>
  );
};

export default DashboardContent;
