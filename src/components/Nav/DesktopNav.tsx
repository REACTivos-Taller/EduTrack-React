import React from 'react';
import { NavLink } from 'react-router-dom';
import { useUserDetails } from '../../shared/hooks/useUserDetails';
import { useLogout } from '../../shared/hooks/useLogout';

import {
  Home,
  LayoutDashboard,
  LogIn,
  LogOut,
  UserPlus,
} from 'lucide-react';

export const DesktopNav: React.FC = () => {
  const { isAuthenticated, login, isLoading } = useUserDetails();
  const doLogout = useLogout();

  const linkClasses = ({ isActive }: { isActive: boolean }) =>
    `flex items-center gap-2 px-3 py-2 rounded-md transition-colors duration-200 text-sm font-medium
     ${isActive
        ? 'bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300'
        : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
     }`;

  return (
    <nav className="hidden md:flex items-center justify-between bg-white dark:bg-gray-900 shadow-sm px-8 py-4 border-b border-gray-200 dark:border-gray-700 transition-colors duration-300">
      {/* Left Links */}
      <div className="flex space-x-4 items-center">
        <NavLink to="/" className={linkClasses}>
          <Home size={18} />
          Home
        </NavLink>

        {isAuthenticated && (
          <>
            <NavLink to="/dashboard" className={linkClasses}>
              <LayoutDashboard size={18} />
              Dashboard
            </NavLink>
            <NavLink to="/register" className={linkClasses}>
              <UserPlus size={18} />
              Registrar
            </NavLink>
          </>
        )}
      </div>

      {/* Right Buttons */}
      <div className="flex items-center space-x-3">

        {!isLoading && (
          isAuthenticated ? (
            <button
              onClick={doLogout}
              className="flex items-center gap-2 px-4 py-2 text-sm font-medium bg-red-100 dark:bg-red-800 text-red-700 dark:text-red-200 rounded-md hover:bg-red-200 dark:hover:bg-red-700 transition"
            >
              <LogOut size={18} />
              Cerrar Sesión
            </button>
          ) : (
            <button
              onClick={login}
              className="flex items-center gap-2 px-4 py-2 text-sm font-medium bg-blue-100 dark:bg-blue-800 text-blue-700 dark:text-blue-200 rounded-md hover:bg-blue-200 dark:hover:bg-blue-700 transition"
            >
              <LogIn size={18} />
              Iniciar Sesión
            </button>
          )
        )}
      </div>
    </nav>
  );
};
