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
    return <Navigate to="/dashboard" replace />
  }

  return (
    <div
      className="min-h-screen flex items-center justify-center"
      style={{
        background: 'linear-gradient(120deg, #f3f6fb 60%, #eaf1fb 100%)',
        fontFamily: "'Segoe UI', Arial, sans-serif",
      }}
    >
      <div className="relative w-full max-w-md rounded-2xl bg-white shadow-xl px-8 py-10 flex flex-col items-center">
        {/* Microsoft Logo */}
        <div className="mb-6 flex flex-col items-center">
          <svg width="40" height="40" viewBox="0 0 48 48" className="mb-2" aria-label="Microsoft logo">
            <rect x="2" y="2" width="20" height="20" fill="#f25022" rx="3" />
            <rect x="26" y="2" width="20" height="20" fill="#7fba00" rx="3" />
            <rect x="2" y="26" width="20" height="20" fill="#00a4ef" rx="3" />
            <rect x="26" y="26" width="20" height="20" fill="#ffb900" rx="3" />
          </svg>
        </div>
        <h1 className="text-2xl font-normal text-gray-900 mb-2" style={{ fontFamily: "'Segoe UI', Arial, sans-serif" }}>
          Iniciar sesión
        </h1>
        <p className="text-gray-700 mb-6 text-center text-base">Usa tu cuenta de Microsoft para continuar.</p>
        <button
          onClick={login}
          disabled={isLoading}
          className="w-full rounded bg-[#106ebe] hover:bg-[#005a9e] text-white font-semibold py-2.5 text-base transition mb-4"
          style={{ fontFamily: "'Segoe UI Semibold', 'Segoe UI', Arial, sans-serif" }}
        >
          {isLoading ? 'Cargando...' : 'Iniciar con Microsoft'}
        </button>
        <a
          href="https://www.kinal.org.gt/"
          className="text-[#106ebe] hover:underline text-sm mb-4"
          style={{ fontFamily: "'Segoe UI', Arial, sans-serif" }}
        >
          ¿No puedes acceder a tu cuenta?
        </a>

      </div>
      {/* Background shapes */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          zIndex: -1,
          background:
            'url("https://login.live.com/branding/illustration/illustration.svg") no-repeat center/cover, linear-gradient(120deg, #f3f6fb 60%, #eaf1fb 100%)',
        }}
      />
    </div>
  )
}