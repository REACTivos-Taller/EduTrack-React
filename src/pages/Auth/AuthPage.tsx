import React from 'react'
import { Navigate } from 'react-router-dom'
import { useUserDetails } from '../../shared/hooks/useUserDetails'

export const AuthPage: React.FC = () => {
  const { isAuthenticated, isLoading, login } = useUserDetails()

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <span className="text-lg">Cargando...</span>
      </div>
    )
  }

  if (isAuthenticated) {
    // Ya autenticado, redirige al dashboard
    return <Navigate to="/dashboard" replace />
  }

  return (
    <div className="flex h-screen flex-col items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-sm rounded-lg bg-white p-8 shadow-md">
        <h1 className="mb-6 text-center text-2xl font-semibold">Iniciar Sesión</h1>
        <button
          onClick={login}
          disabled={isLoading}
          className="focus:ring-opacity-50 w-full rounded-lg bg-blue-600 px-4 py-2 font-medium text-white hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:outline-none"
        >
          {isLoading ? 'Cargando...' : 'Iniciar con Microsoft'}
        </button>
      </div>
    </div>
  )
}
