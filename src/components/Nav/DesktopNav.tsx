// src/components/Nav/DesktopNav.tsx
import React from 'react';
import { NavLink } from 'react-router-dom';
import { useUserDetails } from '../../shared/hooks/useUserDetails';
import { useLogout } from '../../shared/hooks/useLogout';
import { useTheme } from '../../shared/contexts/ThemeContext';

export const DesktopNav: React.FC = () => {
  const { isAuthenticated, login, isLoading } = useUserDetails();
  const doLogout = useLogout();
  const { theme, toggleTheme } = useTheme();

  return (
    <nav className="hidden md:flex items-center justify-between bg-white dark:bg-gray-800 shadow-md px-8 py-4 transition-colors duration-300">
      <div className="flex space-x-6">
        <NavLink
          to="/"
          className={({ isActive }) =>
            `${
              isActive
                ? 'text-blue-700 dark:text-blue-300 font-semibold'
                : 'text-gray-800 dark:text-gray-200 hover:text-gray-600 dark:hover:text-gray-400'
            } text-xl transition`
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
                    : 'text-gray-800 dark:text-gray-200 hover:text-gray-600 dark:hover:text-gray-400'
                } text-xl transition`
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
                    : 'text-gray-800 dark:text-gray-200 hover:text-gray-600 dark:hover:text-gray-400'
                } text-xl transition`
              }
            >
              Registrar
            </NavLink>
          </>
        )}
      </div>

      <div className="flex items-center space-x-4">
        <button
          onClick={toggleTheme}
          aria-label="Toggle dark/light mode"
          className="p-2 text-2xl rounded-full bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 transition"
        >
          {theme === 'light' ? '🌙' : '☀️'}
        </button>

        {isLoading ? null : isAuthenticated ? (
          <button
            onClick={doLogout}
            className="px-6 py-2 text-xl bg-red-100 dark:bg-red-700 text-red-800 dark:text-red-100 rounded-lg transition hover:bg-red-200 dark:hover:bg-red-600"
          >
            Cerrar Sesión
          </button>
        ) : (
          <button
            onClick={login}
            className="px-6 py-2 text-xl bg-blue-100 dark:bg-blue-700 text-blue-800 dark:text-blue-100 rounded-lg transition hover:bg-blue-200 dark:hover:bg-blue-600"
          >
            Iniciar Sesión
          </button>
        )}
      </div>
    </nav>
);
};
