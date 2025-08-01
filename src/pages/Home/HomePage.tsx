import React from 'react'
import { Link, Navigate } from 'react-router-dom'
import { useIsAuthenticated } from '@azure/msal-react'
import {
  Clock,
  ArrowRight,
  Wifi,
  Tablet,
  ShieldCheck,
  Quote,
  Compass,
  Mail,
  CreditCard,
} from 'lucide-react'

export const HomePage: React.FC = () => {
  const isAuthenticated = useIsAuthenticated()

  // Si el usuario está autenticado, redirige a /dashboard
  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />
  }

  return (
    <div className="min-h-screen bg-white text-gray-900 transition-colors duration-300">
      {/* Resto del contenido de HomePage */}
      {/* Sección Principal */}
      <header className="relative overflow-hidden bg-blue-50 py-20 transition-colors duration-300">
        <div className="absolute inset-0 z-0 opacity-20">
          <svg className="h-full w-full" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern
                id="pattern-circles"
                x="0"
                y="0"
                width="40"
                height="40"
                patternUnits="userSpaceOnUse"
                patternContentUnits="userSpaceOnUse"
              >
                <circle cx="2" cy="2" r="1.6257413380501518" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#pattern-circles)" />
          </svg>
        </div>
        <div className="relative z-10 container mx-auto flex flex-col items-center px-6 md:flex-row">
          <div className="text-center md:w-1/2 md:pr-10 md:text-left">
            <h1 className="animate-fade-in-up mb-4 text-5xl leading-tight font-extrabold text-gray-900">
              Más control con EduTrack
            </h1>
            <p className="animate-fade-in-up mb-8 text-xl text-gray-800 delay-100">
              Lleva la gestión de entradas y salidas a un nuevo nivel, con la seguridad y
              modernidad que tu institución necesita.
            </p>
            <div className="flex flex-col justify-center gap-4 sm:flex-row md:justify-start">
              <Link
                to="/register"
                className="flex transform items-center justify-center gap-2 rounded-xl bg-[#0067b8] px-7 py-3 text-base font-semibold text-white shadow-lg transition hover:-translate-y-1 hover:scale-105 hover:bg-[#005a9e]"
              >
                Registrar Movimiento <ArrowRight size={18} />
              </Link>
              <Link
                to="/dashboard"
                className="flex transform items-center justify-center gap-2 rounded-xl border border-[#0067b8] bg-white px-7 py-3 text-base font-semibold text-[#0067b8] shadow-lg transition hover:-translate-y-1 hover:scale-105 hover:bg-[#e5f1fb]"
              >
                Ver Registros <ArrowRight size={18} />
              </Link>
            </div>
          </div>
          <div className="mt-10 flex justify-center md:mt-0 md:w-1/2">
            <img
              src="https://cdn-dynmedia-1.microsoft.com/is/image/microsoftcorp/designer_tbmnl_en-us?resMode=sharp2&op_usm=1.5,0.65,15,0&wid=832&qlt=95&fit=constrain"
              alt="Dashboard de EduTrack"
              className="transform rounded-3xl shadow-2xl transition hover:scale-105 hover:rotate-2"
            />
          </div>
        </div>
      </header>

      {/* Sección de Características */}
      <section className="container mx-auto px-6 py-20">
        <h2 className="animate-fade-in-up mb-16 text-center text-3xl font-extrabold text-gray-900">
          ¿Por qué elegir EduTrack?
        </h2>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          {[
            {
              icon: <Clock size={36} />,
              title: 'Registro Instantáneo',
              desc: 'Cada entrada y salida queda registrada con fecha y hora en tiempo real.',
            },
            {
              icon: <Wifi size={36} />,
              title: 'Servicio Activo',
              desc: 'Siempre disponible gracias a monitoreo y pings automáticos.',
            },
            {
              icon: <Tablet size={36} />,
              title: 'Interfaz Moderna',
              desc: 'Diseño responsivo y accesible en cualquier dispositivo.',
            },
            {
              icon: <ShieldCheck size={36} />,
              title: 'Seguridad de Datos',
              desc: 'Tus datos están protegidos con protocolos de seguridad avanzados.',
            },
          ].map(({ icon, title, desc }, idx) => (
            <div
              key={idx}
              className="flex transform flex-col items-center rounded-3xl bg-white p-8 text-center shadow-xl transition-all duration-300 hover:scale-105 hover:shadow-2xl"
            >
              <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-[#e0f2fe] text-[#005a9e]">
                {icon}
              </div>
              <h3 className="mb-2 text-xl font-semibold text-gray-900">{title}</h3>
              <p className="text-sm text-gray-600">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Testimonios */}
      <section className="bg-blue-50 py-16 transition-colors duration-300">
        <div className="container mx-auto px-6">
          <h2 className="animate-fade-in-up mb-12 text-center text-3xl font-extrabold text-gray-900">
            Lo que dicen nuestros usuarios
          </h2>
          <div className="flex flex-col items-center justify-center gap-8 rounded-3xl bg-white p-8 shadow-xl md:flex-row">
            <div className="flex justify-center md:w-1/3">
              <img
                src="https://media.licdn.com/dms/image/v2/D4D03AQHXd7kxV27enw/profile-displayphoto-shrink_200_200/profile-displayphoto-shrink_200_200/0/1701969688672?e=2147483647&v=beta&t=WaFHs5pLLW2zjayK1KRqRIX3NhbvpiPjuMWMqNv6eI0"
                alt="Testimonio de usuario"
                className="rounded-full shadow-lg"
              />
            </div>
            <div className="text-center md:w-2/3 md:text-left">
              <Quote size={40} className="mx-auto mb-4 text-[#0067b8] md:mx-0" />
              <p className="mb-4 text-lg text-gray-700 italic">
                "EduTrack ha transformado la forma en que gestionamos la asistencia. Es fácil
                de usar y nos da un control sin precedentes. ¡Altamente recomendado!"
              </p>
              <p className="font-semibold text-gray-900">- Profesor Braulio</p>
            </div>
          </div>
        </div>
      </section>

      {/* Misión */}
      <section className="bg-white py-20 transition-colors duration-300">
        <div className="container mx-auto flex flex-col items-center justify-between gap-12 px-6 md:flex-row">
          <div className="text-center md:w-1/2 md:text-left">
            <h2 className="mb-4 text-3xl font-extrabold text-gray-900">Nuestra Misión</h2>
            <p className="mb-6 text-lg text-gray-700">
              En EduTrack, nuestra misión es empoderar a las instituciones educativas con
              herramientas de gestión de asistencia intuitivas y seguras...
            </p>
            <a
              href="https://github.com/REACTivos-Taller"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 text-sm font-semibold text-[#0067b8] transition-colors hover:underline"
            >
              Conoce más sobre nosotros <Compass size={18} />
            </a>
          </div>
          <div className="flex justify-center md:w-1/2">
            <img
              src="https://d3t4nwcgmfrp9x.cloudfront.net/upload/consejos-elaborar-declaracion-mision.jpg"
              alt="Misión"
              className="transform rounded-3xl shadow-2xl transition hover:scale-105 hover:rotate-3"
            />
          </div>
        </div>
      </section>

      {/* Sección de Planes y Precios */}
      <section className="bg-blue-50 py-20 transition-colors duration-300">
        <div className="container mx-auto px-6">
          <h2 className="animate-fade-in-up mb-16 text-center text-3xl font-extrabold text-gray-900">
            Planes y Precios
          </h2>
          <div className="grid grid-cols-1 items-center gap-8 md:grid-cols-2 lg:grid-cols-4">
            {/* Plan Básico */}
            <div className="transform rounded-3xl bg-white p-8 text-center shadow-xl transition-all duration-300 hover:scale-105 hover:shadow-2xl">
              <CreditCard size={48} className="mx-auto mb-4 text-[#005a9e]" />
              <h3 className="mb-2 text-2xl font-semibold text-gray-900">Básico</h3>
              <p className="mb-4 text-sm text-gray-600">Ideal para instituciones pequeñas.</p>
              <p className="mb-6 text-4xl font-bold text-gray-900">
                Q25<span className="text-lg font-normal text-gray-500">/mes</span>
              </p>
              <ul className="mb-8 space-y-2 text-left text-gray-600">
                <li>
                  <span className="font-semibold">✓</span> Hasta 500 registros
                </li>
                <li>
                  <span className="font-semibold">✓</span> 1 usuario administrador
                </li>
                <li>
                  <span className="font-semibold">✓</span> Soporte por correo electrónico
                </li>
              </ul>
              <a
                href="https://wa.me/50253131195?text=Hola%2C%20me%20interesa%20el%20Plan%20B%C3%A1sico%20de%20Q25%2Fmes%20para%20instituciones%20peque%C3%B1as.%20%C2%BFPodr%C3%ADan%20brindarme%20m%C3%A1s%20informaci%C3%B3n%3F"
                target="_blank"
                rel="noopener noreferrer"
                className="block rounded-xl bg-[#0067b8] py-3 font-semibold text-white shadow-lg transition-colors hover:bg-[#005a9e]"
              >
                Solicitar Plan Básico
              </a>
            </div>

            {/* Plan Estándar */}
            <div className="relative z-10 scale-105 transform rounded-3xl bg-[#0067b8] p-8 text-center text-white shadow-2xl transition-all duration-300 hover:scale-110">
              <span className="absolute top-0 right-0 -mt-4 -mr-4 rounded-full bg-yellow-400 px-3 py-1 text-xs font-bold text-yellow-900 uppercase">
                Popular
              </span>
              <CreditCard size={48} className="mx-auto mb-4 text-white" />
              <h3 className="mb-2 text-2xl font-semibold">Estándar</h3>
              <p className="mb-4 text-sm text-blue-200">Para instituciones en crecimiento.</p>
              <p className="mb-6 text-4xl font-bold">
                Q100<span className="text-lg font-normal text-blue-200">/mes</span>
              </p>
              <ul className="mb-8 space-y-2 text-left text-white">
                <li>
                  <span className="font-semibold">✓</span> Registros ilimitados
                </li>
                <li>
                  <span className="font-semibold">✓</span> Soporte prioritario
                </li>
                <li>
                  <span className="font-semibold">✓</span> Analíticas avanzadas
                </li>
              </ul>
              <a
                href="https://wa.me/50253131195?text=Hola%2C%20estoy%20interesado%20en%20el%20Plan%20Est%C3%A1ndar%20de%20Q100%2Fmes%20para%20instituciones%20en%20crecimiento.%20%C2%BFPodr%C3%ADan%20darme%20m%C3%A1s%20detalles%3F"
                target="_blank"
                rel="noopener noreferrer"
                className="block rounded-xl bg-white py-3 font-semibold text-[#0067b8] shadow-lg transition-colors hover:bg-gray-100"
              >
                Solicitar Plan Estándar
              </a>
            </div>

            {/* Plan Premium */}
            <div className="transform rounded-3xl bg-white p-8 text-center shadow-xl transition-all duration-300 hover:scale-105 hover:shadow-2xl">
              <CreditCard size={48} className="mx-auto mb-4 text-[#005a9e]" />
              <h3 className="mb-2 text-2xl font-semibold text-gray-900">Premium</h3>
              <p className="mb-4 text-sm text-gray-600">
                Solución completa para grandes organizaciones.
              </p>
              <p className="mb-6 text-4xl font-bold text-gray-900">
                Q250<span className="text-lg font-normal text-gray-500">/mes</span>
              </p>
              <ul className="mb-8 space-y-2 text-left text-gray-600">
                <li>
                  <span className="font-semibold">✓</span> Registros ilimitados
                </li>
                <li>
                  <span className="font-semibold">✓</span> Soporte 24/7
                </li>
                <li>
                  <span className="font-semibold">✓</span> Analíticas avanzadas
                </li>
                <li>
                  <span className="font-semibold">✓</span> Características personalizadas
                </li>
              </ul>
              <a
                href="https://wa.me/50253131195?text=Hola%2C%20me%20interesa%20el%20Plan%20Premium%20de%20Q250%2Fmes%20para%20mi%20organización.%20%C2%BFPodr%C3%ADan%20darme%20m%C3%A1s%20informaci%C3%B3n%3F"
                target="_blank"
                rel="noopener noreferrer"
                className="block rounded-xl bg-[#0067b8] py-3 font-semibold text-white shadow-lg transition-colors hover:bg-[#005a9e]"
              >
                Solicitar Plan Premium
              </a>
            </div>

            {/* Plan Gratuito Especial Kinal */}
            <div className="relative z-10 scale-105 transform rounded-3xl bg-[#0067b8] p-8 text-center text-white shadow-2xl transition-all duration-300 hover:scale-110">
              <span className="absolute top-0 right-0 -mt-4 -mr-4 rounded-full bg-yellow-400 px-3 py-1 text-xs font-bold text-yellow-900 uppercase">
                Especial
              </span>
              <CreditCard size={48} className="mx-auto mb-4 text-white" />
              <h3 className="mb-2 text-2xl font-semibold">Premium</h3>
              <p className="mb-4 text-sm text-blue-200">
                Especial si trabajas para Fundación Kinal.
              </p>
              <p className="mb-6 text-4xl font-bold">
                Q0<span className="text-lg font-normal text-blue-200">/mes</span>
              </p>
              <ul className="mb-8 space-y-2 text-left text-white">
                <li>
                  <span className="font-semibold">✓</span> Registros ilimitados
                </li>
                <li>
                  <span className="font-semibold">✓</span> Soporte prioritario
                </li>
                <li>
                  <span className="font-semibold">✓</span> Analíticas avanzadas
                </li>
                <li>
                  <span className="font-semibold">✓</span> Características personalizadas
                </li>
              </ul>
              <a
                href="https://wa.me/50253131195?text=Hola%2C%20estoy%20interesado%20en%20el%20plan%20gratuito%20Premium%20para%20Fundaci%C3%B3n%20Kinal"
                target="_blank"
                rel="noopener noreferrer"
                className="block rounded-xl bg-white py-3 font-semibold text-[#0067b8] shadow-lg transition-colors hover:bg-gray-100"
              >
                Solicitar Plan Gratuito
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Contacto */}
      <section className="bg-white py-16 transition-colors duration-300">
        <div className="container mx-auto px-6 text-center">
          <h2 className="mb-4 text-3xl font-bold text-gray-900">¿Tienes preguntas?</h2>
          <p className="mb-8 text-lg text-gray-700">
            Nuestro equipo está listo para ayudarte.
          </p>
          <Link
            to="https://github.com/REACTivos-Taller"
            className="inline-flex transform items-center justify-center gap-2 rounded-xl bg-[#0067b8] px-7 py-3 text-base font-semibold text-white shadow-lg transition hover:-translate-y-1 hover:scale-105 hover:bg-[#005a9e]"
          >
            Contáctanos <Mail size={18} />
          </Link>
        </div>
      </section>

      {/* CTA final */}
      <section className="bg-blue-50 py-16 transition-colors duration-300">
        <div className="container mx-auto flex flex-col items-center justify-between px-6 md:flex-row">
          <div className="mb-8 text-center md:mb-0 md:text-left">
            <h2 className="mb-2 text-3xl font-bold text-gray-900">¿Listo para comenzar?</h2>
            <p className="text-lg text-gray-700">
              Registra movimientos o consulta el historial en segundos.
            </p>
          </div>
          <div className="flex flex-col gap-4 sm:flex-row">
            <Link
              to="/register"
              className="flex transform items-center justify-center gap-2 rounded-xl bg-[#0067b8] px-7 py-3 text-base font-semibold text-white shadow-lg transition hover:-translate-y-1 hover:scale-105 hover:bg-[#005a9e]"
            >
              Registrar Ahora <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
