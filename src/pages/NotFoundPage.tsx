import React from 'react'
import { Link } from 'react-router-dom'

export const NotFoundPage: React.FC = () => (
  <div className="flex h-full flex-col items-center justify-center bg-gray-50 p-6">
    <h1 className="mb-4 text-5xl font-bold">404</h1>
    <p className="mb-6 text-xl">Página no encontrada</p>
    <Link to="/" className="rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700">
      Volver al inicio
    </Link>
  </div>
)

export default NotFoundPage
