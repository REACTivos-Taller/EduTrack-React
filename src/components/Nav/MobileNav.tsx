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

export const MobileNav: React.FC = () => {
  const { isAuthenticated, login, isLoading } = useUserDetails();
  const doLogout = useLogout();

  const navLinkClasses = ({ isActive }: { isActive: boolean }) =>
    `flex flex-col items-center gap-1 p-2 transition-colors duration-200 text-xs font-medium
      ${isActive
        ? 'text-[#0067b8] dark:text-[#0067b8]'
        : 'text-gray-700 dark:text-gray-300'
      }`;
      
  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 w-full bg-white dark:bg-gray-800 border-t dark:border-gray-700 shadow-inner transition-colors duration-300 z-50">
      <div className="flex justify-around items-center py-2">
        <NavLink to="/" className={navLinkClasses}>
          <Home size={20} />
          <span className="mt-1">Home</span>
        </NavLink>

        {isAuthenticated && (
          <>
            <NavLink to="/dashboard" className={navLinkClasses}>
              <LayoutDashboard size={20} />
              <span className="mt-1">Dashboard</span>
            </NavLink>
            <NavLink to="/register" className={navLinkClasses}>
              <UserPlus size={20} />
              <span className="mt-1">Registrar</span>
            </NavLink>
          </>
        )}


        {!isLoading && (
          isAuthenticated ? (
            <button
              onClick={doLogout}
              className="flex flex-col items-center gap-1 p-2 text-red-600 dark:text-red-400 transition"
            >
              <LogOut size={20} />
              <span className="mt-1 text-xs font-medium">Cerrar</span>
            </button>
          ) : (
            <button
              onClick={login}
              className="flex flex-col items-center gap-1 p-2 text-[#0067b8] dark:text-[#0067b8] transition"
            >
              <LogIn size={20} />
              <span className="mt-1 text-xs font-medium">Acceder</span>
            </button>
          )
        )}
      </div>
    </nav>
  );
};
