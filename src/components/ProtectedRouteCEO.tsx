// src/components/ProtectedRoute.tsx
import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { Navigate } from 'react-router-dom';
import Loader from './Loader'; // Asegúrate de tener un componente Loader

interface ProtectedRouteProps {
  children: React.ReactElement;
}

const ProtectedRouteCEO: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { isAuthenticated, user, isLoading } = useAuth0();
  
  const allowedId = "google-oauth2|105220865461134966016";

  if (isLoading) {
    return <Loader />;
  }

  if (!isAuthenticated || user?.sub !== allowedId) {
    return <Navigate to="/" />;
  }

  return children;
};

export default ProtectedRouteCEO;
