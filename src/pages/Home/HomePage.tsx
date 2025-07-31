import React from 'react'
import { Link } from 'react-router-dom'
import { FaRegClock, FaFilter, FaWifi, FaTabletAlt, FaArrowRight } from 'react-icons/fa'

export const HomePage: React.FC = () => (
  <div className="min-h-screen bg-gradient-to-b from-white to-blue-50" style={{ fontFamily: "'Segoe UI', Arial, sans-serif" }}>
    {/* Hero Section */}
    <header className="relative bg-white shadow-md">
      <div className="container mx-auto flex flex-col md:flex-row items-center px-6 py-16">
        <div className="md:w-1/2">
          <h1 className="text-5xl font-bold text-gray-900 mb-4">Más control con EduTrack</h1>
          <p className="text-xl text-gray-800 mb-8">
            Lleva la gestión de entradas y salidas a un nuevo nivel, con la seguridad y modernidad que tu institución necesita.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              to="/register"
              className="bg-[#0067b8] hover:bg-[#005a9e] text-white font-semibold px-7 py-3 rounded-md shadow transition flex items-center justify-center gap-2 text-base"
              style={{ fontFamily: "'Segoe UI Semibold', 'Segoe UI', Arial, sans-serif" }}
            >
              Registrar Movimiento <FaArrowRight />
            </Link>
            <Link
              to="/dashboard/registries"
              className="bg-white border border-[#0067b8] text-[#0067b8] hover:bg-[#e5f1fb] font-semibold px-7 py-3 rounded-md shadow transition flex items-center justify-center gap-2 text-base"
              style={{ fontFamily: "'Segoe UI Semibold', 'Segoe UI', Arial, sans-serif" }}
            >
              Ver Registros <FaArrowRight />
            </Link>
          </div>
        </div>
      </div>
    </header>

    {/* Features Section */}
    <section className="container mx-auto px-6 py-12">
      <h2 className="text-3xl font-bold text-gray-900 mb-10 text-center">¿Por qué elegir EduTrack?</h2>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        <div className="bg-white rounded-xl shadow-lg p-8 flex flex-col items-center text-center hover:shadow-2xl transition-shadow duration-200">
          <FaRegClock className="text-[#0067b8] text-5xl mb-4" />
          <h3 className="font-semibold text-lg mb-2">Registro Instantáneo</h3>
          <p className="text-gray-600 text-sm">Cada entrada y salida queda registrada con fecha y hora en tiempo real.</p>
        </div>
        <div className="bg-white rounded-xl shadow-lg p-8 flex flex-col items-center text-center hover:shadow-2xl transition-shadow duration-200">
          <FaFilter className="text-[#0067b8] text-5xl mb-4" />
          <h3 className="font-semibold text-lg mb-2">Filtros Avanzados</h3>
          <p className="text-gray-600 text-sm">Filtra por carné, salón o rango de fechas de forma intuitiva.</p>
        </div>
        <div className="bg-white rounded-xl shadow-lg p-8 flex flex-col items-center text-center hover:shadow-2xl transition-shadow duration-200">
          <FaWifi className="text-[#0067b8] text-5xl mb-4" />
          <h3 className="font-semibold text-lg mb-2">Servicio Activo</h3>
          <p className="text-gray-600 text-sm">Siempre disponible gracias a monitoreo y pings automáticos.</p>
        </div>
        <div className="bg-white rounded-xl shadow-lg p-8 flex flex-col items-center text-center hover:shadow-2xl transition-shadow duration-200">
          <FaTabletAlt className="text-[#0067b8] text-5xl mb-4" />
          <h3 className="font-semibold text-lg mb-2">Interfaz Moderna</h3>
          <p className="text-gray-600 text-sm">Diseño responsivo y accesible en cualquier dispositivo.</p>
        </div>
      </div>
    </section>

    {/* Call to Action */}
    <section className="bg-white py-14 shadow-inner">
      <div className="container mx-auto px-6 flex flex-col md:flex-row items-center justify-between">
        <div className="mb-8 md:mb-0">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">¿Listo para comenzar?</h2>
          <p className="text-gray-700 text-lg">Registra movimientos o consulta el historial en segundos.</p>
        </div>
        <div className="flex gap-4">
          <Link
            to="/register"
            className="bg-[#0067b8] hover:bg-[#005a9e] text-white font-semibold px-7 py-3 rounded-md shadow transition flex items-center gap-2"
            style={{ fontFamily: "'Segoe UI Semibold', 'Segoe UI', Arial, sans-serif" }}
          >
            Registrar Ahora <FaArrowRight />
          </Link>
          <Link
            to="/dashboard/registries"
            className="bg-white border border-[#0067b8] text-[#0067b8] hover:bg-[#e5f1fb] font-semibold px-7 py-3 rounded-md shadow transition flex items-center gap-2"
            style={{ fontFamily: "'Segoe UI Semibold', 'Segoe UI', Arial, sans-serif" }}
          >
            Ver Historial <FaArrowRight />
          </Link>
        </div>
      </div>
    </section>
  </div>
)