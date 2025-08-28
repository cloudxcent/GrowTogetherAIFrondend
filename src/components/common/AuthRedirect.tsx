import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import { Navigate, useLocation } from 'react-router-dom';

export const AuthRedirect: React.FC = () => {
  const { isAuthenticated } = useSelector((state: RootState) => state.auth);
  const location = useLocation();
  if (isAuthenticated) {
    // If already on /dashboard or /welcome, don't redirect
    if (location.pathname === '/dashboard' || location.pathname === '/welcome') {
      return <></>;
    }
    return <Navigate to="/welcome" replace />;
  }
  // Not authenticated: show HomePage
  return <Navigate to="/" replace />;
};