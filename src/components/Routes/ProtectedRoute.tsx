// src/components/Routes/ProtectedRoute.tsx
import type { FC, ReactElement } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useUserDetails } from '../../shared/hooks/useUserDetails';

interface ProtectedRouteProps {
  children: ReactElement;
}

export const ProtectedRoute: FC<ProtectedRouteProps> = ({ children }) => {
  const { isAuthenticated, isLoading } = useUserDetails();
  const location = useLocation();

  if (isLoading) {
    return (
      <div className="h-full flex items-center justify-center">
        <span className="text-lg">Cargando...</span>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/auth" state={{ from: location }} replace />;
  }

  return children;
};
