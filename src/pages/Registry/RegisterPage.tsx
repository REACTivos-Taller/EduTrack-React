import React, { useState } from 'react'
import { AddRegistryForm } from '../../components/Registry/AddRegistryForm'
import { RegistriesList } from '../../components/Registry/RegistriesList'

export const RegisterPage: React.FC = () => {
  const [showForm, setShowForm] = useState(false)

  const handleCloseForm = () => {
    setShowForm(false)
  }

  return (
    <div className="min-h-screen bg-[#f3f2f1] p-6 transition-colors duration-300">
      <div className="max-w-6xl mx-auto">
        <header className="mb-6 flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
          <h1 className="text-3xl font-semibold text-[#323130]">Registros de Salida</h1>
          <button
            onClick={() => setShowForm(true)} // Solo abre, no alterna
            className="rounded-md bg-[#106ebe] px-5 py-2 text-white font-medium hover:bg-[#005a9e] transition-colors duration-200"
          >
            Nuevo Registro
          </button>
        </header>

        {/* Solo renderiza el componente AddRegistryForm, que ya es un modal completo */}
        {showForm && (
          <AddRegistryForm onClose={handleCloseForm} />
        )}

        {/* List Section */}
        <div className="mt-6 rounded-lg bg-white p-6 shadow-md">
          <RegistriesList />
        </div>
      </div>
    </div>
  )
}