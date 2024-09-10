// components/ProtectedRoute.tsx
import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';
import Loader from './Loader';

const ProtectedRoute: React.FC = () => {
  const { isAuthenticated, isLoading } = useAuth0();

  if (isLoading) {
    return <Loader/>;
  }

  if (!isAuthenticated) {
    return <Navigate to="/inicio" />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
