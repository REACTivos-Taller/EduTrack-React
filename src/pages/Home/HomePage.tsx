import React from 'react'
import { Link } from 'react-router-dom'

export const HomePage: React.FC = () => (
  <div className="min-h-screen bg-gray-50">
    {/* Hero Section */}
    <header className="bg-blue-600 py-16 text-white">
      <div className="container mx-auto px-4 text-center">
        <h1 className="mb-4 text-5xl font-bold">Control de Salidas del Salón</h1>
        <p className="mx-auto max-w-2xl text-xl">
          Gestiona de manera eficiente las entradas y salidas de los alumnos, manteniendo un
          registro preciso y al instante.
        </p>
      </div>
    </header>

    {/* Overview Section */}
    <main className="container mx-auto px-4 py-12">
      <section className="mb-16 flex flex-col items-center md:flex-row">
        <div className="md:w-1/2">
          <img
            src="/images/classroom.jpg"
            alt="Salón de clases"
            className="h-auto w-full rounded-lg shadow-lg"
          />
        </div>
        <div className="mt-8 md:mt-0 md:w-1/2 md:pl-12">
          <h2 className="mb-4 text-3xl font-semibold">¿Qué hace este sistema?</h2>
          <ul className="list-inside list-disc space-y-2 text-gray-700">
            <li>Registrar cada salida y entrada de alumno con fecha y hora.</li>
            <li>Filtrar registros por carné, salón o rango de fechas.</li>
            <li>Enviar pings automáticos para mantener el servicio activo.</li>
            <li>Interfaz sencilla y responsiva para escritorio y móvil.</li>
          </ul>
        </div>
      </section>

      {/* Quick Links Section */}
      <section>
        <h2 className="mb-8 text-center text-3xl font-bold">Accesos Rápidos</h2>
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {/* Registrar Movimiento */}
          <Link
            to="/register"
            className="block rounded-lg bg-white p-6 text-center shadow transition hover:shadow-xl"
          >
            <img
              src="/images/register.png"
              alt="Registrar Movimiento"
              className="mx-auto mb-4 h-32"
            />
            <h3 className="mb-2 text-xl font-semibold">Registrar Movimiento</h3>
            <p className="text-gray-600">Entrada y salida de alumnos.</p>
          </Link>

          {/* Ver Registros */}
          <Link
            to="/dashboard/registries"
            className="block rounded-lg bg-white p-6 text-center shadow transition hover:shadow-xl"
          >
            <img src="/images/report.png" alt="Ver Registros" className="mx-auto mb-4 h-32" />
            <h3 className="mb-2 text-xl font-semibold">Ver Registros</h3>
            <p className="text-gray-600">Consulta el historial completo.</p>
          </Link>
        </div>
      </section>
    </main>
  </div>
)
