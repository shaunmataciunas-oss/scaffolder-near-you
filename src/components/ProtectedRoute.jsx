import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useSupabaseAuth } from '@/contexts/SupabaseAuthContext';

const ProtectedRoute = ({ children }) => {
  const { user, loading } = useSupabaseAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-brand-black">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-brand-yellow"></div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/contact" state={{ from: location }} replace />;
  }

  // In a real app, you would check for admin role here specifically
  // For this scope, we assume authenticated users are admins or have access
  
  return children;
};

export default ProtectedRoute;