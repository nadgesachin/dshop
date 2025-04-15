import React from 'react';
import { Navigate, useLocation  } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { isAuthenticated, authInitialized } = useAuth();
  const location = useLocation();

  if (!authInitialized) {
    return <div className="p-8 text-center">Checking authentication...</div>; // Or a loader
  }

  if (!isAuthenticated) {
    return <Navigate to="/" state={{ from: location }} replace />;
  }

  return <>{children}</>;
};
