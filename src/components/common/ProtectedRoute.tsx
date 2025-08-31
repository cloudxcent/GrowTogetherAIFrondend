import React from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';

interface ProtectedRouteProps {
  children: React.ReactNode;
  roles?: ('parent' | 'student' | 'admin')[];
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ 
  children, 
  roles = [] 
}) => {
  const { isAuthenticated, user } = useSelector((state: RootState) => state.auth);
  // const location = useLocation();

  console.log(isAuthenticated, user);
  if (!isAuthenticated && user !== null) {
    // Redirect to login page with return url
    return <Navigate to="/login" />;
  }

  if (roles.length > 0 && user ) {
    // User doesn't have required role
    return <Navigate to="/dashboard"  />;
  }

  return <>{children}</>;
};