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
          <div className="flex items-center mb-2">
            <span className="inline-block w-2.5 h-2.5 bg-[#f25022] mr-0.5 rounded-sm" />
            <span className="inline-block w-2.5 h-2.5 bg-[#7fba00] mr-0.5 rounded-sm" />
            <span className="inline-block w-2.5 h-2.5 bg-[#00a4ef] mr-0.5 rounded-sm" />
            <span className="inline-block w-2.5 h-2.5 bg-[#ffb900] rounded-sm" />
          </div>
          <span className="text-xl font-semibold text-gray-700" style={{ fontFamily: "'Segoe UI', Arial, sans-serif" }}>
            Microsoft
          </span>
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
          href="#"
          className="text-[#106ebe] hover:underline text-sm mb-4"
          style={{ fontFamily: "'Segoe UI', Arial, sans-serif" }}
        >
          ¿No puedes acceder a tu cuenta?
        </a>
        <div className="text-center text-sm text-gray-600 mt-2">
          ¿Nuevo en EduTrack?{' '}
          <a href="#" className="text-[#106ebe] hover:underline">
            Crear una cuenta
          </a>
        </div>
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