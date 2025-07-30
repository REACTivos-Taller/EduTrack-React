// src/components/Nav/MobileNav.tsx
import React from 'react';
import { NavLink } from 'react-router-dom';
import { useUserDetails } from '../../shared/hooks/useUserDetails';
import { useLogout } from '../../shared/hooks/useLogout';
import { useTheme } from '../../shared/contexts/ThemeContext';

export const MobileNav: React.FC = () => {
  const { isAuthenticated, login, isLoading } = useUserDetails();
  const doLogout = useLogout();
  const { theme, toggleTheme } = useTheme();

  return (
    <nav className="md:hidden fixed bottom-0 left-0 w-full bg-white dark:bg-gray-800 border-t dark:border-gray-700 shadow-inner transition-colors duration-300">
      <div className="flex justify-around items-center py-4">
        <button
          onClick={toggleTheme}
          aria-label="Toggle dark/light mode"
          className="text-3xl p-1 bg-gray-200 dark:bg-gray-700 rounded-full text-gray-800 dark:text-gray-200 transition"
        >
          {theme === 'light' ? '🌙' : '☀️'}
        </button>

        <NavLink
          to="/"
          className={({ isActive }) =>
            `${
              isActive
                ? 'text-blue-700 dark:text-blue-300 font-semibold'
                : 'text-gray-800 dark:text-gray-200'
            } text-xl`
          }
        >
          Home
        </NavLink>

        {isAuthenticated && (
          <>
            <NavLink
              to="/dashboard"
              className={({ isActive }) =>
                `${
                  isActive
                    ? 'text-blue-700 dark:text-blue-300 font-semibold'
                    : 'text-gray-800 dark:text-gray-200'
                } text-xl`
              }
            >
              Dashboard
            </NavLink>
            <NavLink
              to="/register"
              className={({ isActive }) =>
                `${
                  isActive
                    ? 'text-blue-700 dark:text-blue-300 font-semibold'
                    : 'text-gray-800 dark:text-gray-200'
                } text-xl`
              }
            >
              Registrar
            </NavLink>
          </>
        )}

        {!isAuthenticated ? (
          <button
            onClick={login}
            disabled={isLoading}
            className="px-4 py-2 text-xl bg-blue-100 dark:bg-blue-700 text-blue-800 dark:text-blue-100 rounded-lg transition hover:bg-blue-200 dark:hover:bg-blue-600"
          >
            Login
          </button>
        ) : (
          <button
            onClick={doLogout}
            className="px-4 py-2 text-xl bg-red-100 dark:bg-red-700 text-red-800 dark:text-red-100 rounded-lg transition hover:bg-red-200 dark:hover:bg-red-600"
          >
            Logout
          </button>
        )}
      </div>
    </nav>
);
};
