import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Redirect to overview by default
    navigate('/dashboard/overview', { replace: true });
  }, [navigate]);

  return null;
};

export default Dashboard;
