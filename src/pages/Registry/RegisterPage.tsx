import React, { useState } from 'react'
import { AddRegistryForm } from '../../components/Registry/AddRegistryForm'
import { RegistriesList } from '../../components/Registry/RegistriesList'

export const RegisterPage: React.FC = () => {
  const [showForm, setShowForm] = useState(false)

  return (
    <div className="min-h-screen bg-[#f3f2f1] p-6 transition-colors duration-300">
      <div className="max-w-6xl mx-auto">
        <header className="mb-6 flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
          <h1 className="text-3xl font-semibold text-[#323130]">Registros de Salida</h1>
          <button
            onClick={() => setShowForm((prev) => !prev)}
            className="rounded-md bg-[#106ebe] px-5 py-2 text-white font-medium hover:bg-[#005a9e] transition-colors duration-200"
          >
            {showForm ? 'Ocultar Formulario' : 'Nuevo Registro'}
          </button>
        </header>

        {/* Floating overlay form */}
        {showForm && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
            <div className="w-11/12 md:w-1/2 bg-white p-6 rounded-lg shadow-xl animate-fade-in transform transition-transform duration-300">
              <AddRegistryForm />
              <button
                onClick={() => setShowForm(false)}
                className="mt-6 w-full rounded-md bg-[#a4262c] px-4 py-2 text-white font-medium hover:bg-[#761115] transition-colors duration-200"
              >
                Cerrar
              </button>
            </div>
          </div>
        )}

        {/* List Section */}
        <div className="mt-6 rounded-lg bg-white p-6 shadow-md">
          <RegistriesList />
        </div>
      </div>
    </div>
  )
}
