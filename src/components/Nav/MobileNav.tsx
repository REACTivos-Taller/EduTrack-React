import React from 'react'
import { NavLink } from 'react-router-dom'
import { useUserDetails } from '../../shared/hooks/useUserDetails'
import { useLogout } from '../../shared/hooks/useLogout'

import { Home, LayoutDashboard, LogIn, LogOut, UserPlus } from 'lucide-react'

export const MobileNav: React.FC = () => {
  const { isAuthenticated, login, isLoading } = useUserDetails()
  const doLogout = useLogout()

  const navLinkClasses = ({ isActive }: { isActive: boolean }) =>
    `flex flex-col items-center gap-1 p-2 transition-colors duration-200 text-xs font-medium
      ${isActive ? 'text-[#0067b8] dark:text-[#0067b8]' : 'text-gray-700 dark:text-gray-300'}`

  return (
    <nav className="fixed right-0 bottom-0 left-0 z-50 w-full border-t bg-white shadow-inner transition-colors duration-300 md:hidden dark:border-gray-700 dark:bg-gray-800">
      <div className="flex items-center justify-around py-2">
        {!isAuthenticated && (
          <NavLink to="/" className={navLinkClasses}>
            <Home size={20} />
            <span className="mt-1">Home</span>
          </NavLink>
        )}

        {isAuthenticated && (
          <>
            <NavLink to="/dashboard" className={navLinkClasses}>
              <LayoutDashboard size={20} />
              <span className="mt-1">Ver Registros</span>
            </NavLink>
            <NavLink to="/register" className={navLinkClasses}>
              <UserPlus size={20} />
              <span className="mt-1">Registrar</span>
            </NavLink>
          </>
        )}

        {!isLoading &&
          (isAuthenticated ?
            <button
              onClick={doLogout}
              className="flex flex-col items-center gap-1 p-2 text-red-600 transition dark:text-red-400"
            >
              <LogOut size={20} />
              <span className="mt-1 text-xs font-medium">Cerrar</span>
            </button>
          : <button
              onClick={login}
              className="flex flex-col items-center gap-1 p-2 text-[#0067b8] transition dark:text-[#0067b8]"
            >
              <LogIn size={20} />
              <span className="mt-1 text-xs font-medium">Acceder</span>
            </button>)}
      </div>
    </nav>
  )
}
