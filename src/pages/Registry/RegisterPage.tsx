import React, { useState } from 'react'
import { AddRegistryForm } from '../../components/Registry/AddRegistryForm'
import { RegistriesList } from '../../components/Registry/RegistriesList'

export const RegisterPage: React.FC = () => {
  // Form hidden by default
  const [showForm, setShowForm] = useState(false)

  return (
    <div className="min-h-screen bg-gray-50 p-4 transition-colors duration-300 dark:bg-gray-900">
      <div className="container mx-auto">
        <header className="mb-6 flex items-center justify-between">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
            Registros de Salida
          </h1>
          <button
            onClick={() => setShowForm((prev) => !prev)}
            className="rounded-md bg-blue-600 px-6 py-3 text-lg text-white shadow transition-all duration-300 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600"
          >
            {showForm ? 'Ocultar Formulario' : 'Nuevo Registro'}
          </button>
        </header>

        {/* Floating overlay form */}
        {showForm && (
          <div className="bg-opacity-50 fixed inset-0 z-50 flex items-center justify-center bg-black">
            <div className="animate-slide-in w-11/12 scale-100 transform rounded-lg bg-white p-6 shadow-lg transition-transform duration-300 ease-out md:w-1/2 dark:bg-gray-800">
              <AddRegistryForm />
              <button
                onClick={() => setShowForm(false)}
                className="mt-4 w-full rounded-md bg-red-600 px-6 py-3 text-lg text-white shadow transition-all duration-300 hover:bg-red-700 dark:bg-red-500 dark:hover:bg-red-600"
              >
                Cerrar
              </button>
            </div>
          </div>
        )}

        {/* List Section */}
        <div className="mt-4 rounded-lg bg-white p-6 shadow-md dark:bg-gray-800">
          <RegistriesList />
        </div>
      </div>
    </div>
  )
}

