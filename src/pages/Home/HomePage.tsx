import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Clock, ArrowRight, Wifi, Tablet, ShieldCheck, 
  Quote, Compass, Mail, CreditCard 
} from 'lucide-react';

const App = () => {
  return <HomePage />;
};

export const HomePage: React.FC = () => {
  return (
    <div className="min-h-screen bg-white text-gray-900 transition-colors duration-300">
      {/* Sección Principal */}
      <header className="relative py-20 bg-blue-50 transition-colors duration-300 overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-20">
          <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="pattern-circles" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse" patternContentUnits="userSpaceOnUse">
                <circle cx="2" cy="2" r="1.6257413380501518" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#pattern-circles)" />
          </svg>
        </div>
        <div className="container mx-auto flex flex-col md:flex-row items-center px-6 relative z-10">
          <div className="md:w-1/2 md:pr-10 text-center md:text-left">
            <h1 className="text-5xl font-extrabold text-gray-900 mb-4 leading-tight animate-fade-in-up">
              Más control con EduTrack
            </h1>
            <p className="text-xl text-gray-800 mb-8 animate-fade-in-up delay-100">
              Lleva la gestión de entradas y salidas a un nuevo nivel, con la seguridad y modernidad que tu institución necesita.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
              <Link
                to="/register"
                className="bg-[#0067b8] hover:bg-[#005a9e] text-white font-semibold px-7 py-3 rounded-xl shadow-lg transition transform hover:-translate-y-1 hover:scale-105 flex items-center justify-center gap-2 text-base"
              >
                Registrar Movimiento <ArrowRight size={18} />
              </Link>
              <Link
                to="/dashboard/registries"
                className="bg-white border border-[#0067b8] text-[#0067b8] hover:bg-[#e5f1fb] font-semibold px-7 py-3 rounded-xl shadow-lg transition transform hover:-translate-y-1 hover:scale-105 flex items-center justify-center gap-2 text-base"
              >
                Ver Registros <ArrowRight size={18} />
              </Link>
            </div>
          </div>
          <div className="md:w-1/2 mt-10 md:mt-0 flex justify-center">
            <img
              src="https://cdn-dynmedia-1.microsoft.com/is/image/microsoftcorp/designer_tbmnl_en-us?resMode=sharp2&op_usm=1.5,0.65,15,0&wid=832&qlt=95&fit=constrain"
              alt="Dashboard de EduTrack"
              className="rounded-3xl shadow-2xl transition transform hover:rotate-2 hover:scale-105"
            />
          </div>
        </div>
      </header>

      {/* Sección de Características */}
      <section className="container mx-auto px-6 py-20">
        <h2 className="text-3xl font-extrabold text-gray-900 mb-16 text-center animate-fade-in-up">
          ¿Por qué elegir EduTrack?
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            { icon: <Clock size={36} />, title: 'Registro Instantáneo', desc: 'Cada entrada y salida queda registrada con fecha y hora en tiempo real.' },
            { icon: <Wifi size={36} />, title: 'Servicio Activo', desc: 'Siempre disponible gracias a monitoreo y pings automáticos.' },
            { icon: <Tablet size={36} />, title: 'Interfaz Moderna', desc: 'Diseño responsivo y accesible en cualquier dispositivo.' },
            { icon: <ShieldCheck size={36} />, title: 'Seguridad de Datos', desc: 'Tus datos están protegidos con protocolos de seguridad avanzados.' },
          ].map(({ icon, title, desc }, idx) => (
            <div key={idx} className="bg-white rounded-3xl shadow-xl p-8 flex flex-col items-center text-center transition-all duration-300 transform hover:scale-105 hover:shadow-2xl">
              <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-[#e0f2fe] text-[#005a9e]">
                {icon}
              </div>
              <h3 className="font-semibold text-xl mb-2 text-gray-900">{title}</h3>
              <p className="text-gray-600 text-sm">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Testimonios */}
      <section className="py-16 bg-blue-50 transition-colors duration-300">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-extrabold text-gray-900 mb-12 text-center animate-fade-in-up">
            Lo que dicen nuestros usuarios
          </h2>
          <div className="flex flex-col md:flex-row items-center justify-center gap-8 bg-white p-8 rounded-3xl shadow-xl">
            <div className="md:w-1/3 flex justify-center">
              <img
                src="https://media.licdn.com/dms/image/v2/D4D03AQHXd7kxV27enw/profile-displayphoto-shrink_200_200/profile-displayphoto-shrink_200_200/0/1701969688672?e=2147483647&v=beta&t=WaFHs5pLLW2zjayK1KRqRIX3NhbvpiPjuMWMqNv6eI0"
                alt="Testimonio de usuario"
                className="rounded-full shadow-lg"
              />
            </div>
            <div className="md:w-2/3 text-center md:text-left">
              <Quote size={40} className="text-[#0067b8] mb-4 mx-auto md:mx-0" />
              <p className="text-lg text-gray-700 italic mb-4">
                "EduTrack ha transformado la forma en que gestionamos la asistencia. Es fácil de usar y nos da un control sin precedentes. ¡Altamente recomendado!"
              </p>
              <p className="font-semibold text-gray-900">- Profesor Braulio</p>
            </div>
          </div>
        </div>
      </section>

      {/* Misión */}
      <section className="py-20 bg-white transition-colors duration-300">
        <div className="container mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-12">
          <div className="md:w-1/2 text-center md:text-left">
            <h2 className="text-3xl font-extrabold text-gray-900 mb-4">Nuestra Misión</h2>
            <p className="text-gray-700 text-lg mb-6">
              En EduTrack, nuestra misión es empoderar a las instituciones educativas con herramientas de gestión de asistencia intuitivas y seguras...
            </p>
            <a
              href="https://github.com/REACTivos-Taller"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 text-sm font-semibold text-[#0067b8] hover:underline transition-colors"
            >
              Conoce más sobre nosotros <Compass size={18} />
            </a>
          </div>
          <div className="md:w-1/2 flex justify-center">
            <img
              src="https://d3t4nwcgmfrp9x.cloudfront.net/upload/consejos-elaborar-declaracion-mision.jpg"
              alt="Misión"
              className="rounded-3xl shadow-2xl transition transform hover:rotate-3 hover:scale-105"
            />
          </div>
        </div>
      </section>

{/* Sección de Planes y Precios */}
<section className="py-20 bg-blue-50 transition-colors duration-300">
  <div className="container mx-auto px-6">
    <h2 className="text-3xl font-extrabold text-gray-900 mb-16 text-center animate-fade-in-up">
      Planes y Precios
    </h2>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 items-center">
      
      {/* Plan Básico */}
      <div className="bg-white rounded-3xl shadow-xl p-8 text-center transition-all duration-300 transform hover:scale-105 hover:shadow-2xl">
        <CreditCard size={48} className="text-[#005a9e] mx-auto mb-4" />
        <h3 className="font-semibold text-2xl mb-2 text-gray-900">Básico</h3>
        <p className="text-gray-600 text-sm mb-4">Ideal para instituciones pequeñas.</p>
        <p className="text-4xl font-bold text-gray-900 mb-6">Q25<span className="text-lg font-normal text-gray-500">/mes</span></p>
        <ul className="text-left text-gray-600 mb-8 space-y-2">
          <li><span className="font-semibold">✓</span> Hasta 500 registros</li>
          <li><span className="font-semibold">✓</span> 1 usuario administrador</li>
          <li><span className="font-semibold">✓</span> Soporte por correo electrónico</li>
        </ul>
        <a
          href="https://wa.me/50253131195?text=Hola%2C%20me%20interesa%20el%20Plan%20B%C3%A1sico%20de%20Q25%2Fmes%20para%20instituciones%20peque%C3%B1as.%20%C2%BFPodr%C3%ADan%20brindarme%20m%C3%A1s%20informaci%C3%B3n%3F"
          target="_blank"
          rel="noopener noreferrer"
          className="block bg-[#0067b8] hover:bg-[#005a9e] text-white font-semibold py-3 rounded-xl shadow-lg transition-colors"
        >
          Solicitar Plan Básico
        </a>
      </div>

      {/* Plan Estándar */}
      <div className="bg-[#0067b8] text-white rounded-3xl shadow-2xl p-8 text-center transition-all duration-300 transform scale-105 hover:scale-110 relative z-10">
        <span className="absolute top-0 right-0 -mt-4 -mr-4 bg-yellow-400 text-yellow-900 text-xs font-bold uppercase rounded-full px-3 py-1">Popular</span>
        <CreditCard size={48} className="text-white mx-auto mb-4" />
        <h3 className="font-semibold text-2xl mb-2">Estándar</h3>
        <p className="text-blue-200 text-sm mb-4">Para instituciones en crecimiento.</p>
        <p className="text-4xl font-bold mb-6">Q100<span className="text-lg font-normal text-blue-200">/mes</span></p>
        <ul className="text-left text-white mb-8 space-y-2">
          <li><span className="font-semibold">✓</span> Registros ilimitados</li>
          <li><span className="font-semibold">✓</span> Soporte prioritario</li>
          <li><span className="font-semibold">✓</span> Analíticas avanzadas</li>
        </ul>
        <a
          href="https://wa.me/50253131195?text=Hola%2C%20estoy%20interesado%20en%20el%20Plan%20Est%C3%A1ndar%20de%20Q100%2Fmes%20para%20instituciones%20en%20crecimiento.%20%C2%BFPodr%C3%ADan%20darme%20m%C3%A1s%20detalles%3F"
          target="_blank"
          rel="noopener noreferrer"
          className="block bg-white hover:bg-gray-100 text-[#0067b8] font-semibold py-3 rounded-xl shadow-lg transition-colors"
        >
          Solicitar Plan Estándar
        </a>
      </div>

      {/* Plan Premium */}
      <div className="bg-white rounded-3xl shadow-xl p-8 text-center transition-all duration-300 transform hover:scale-105 hover:shadow-2xl">
        <CreditCard size={48} className="text-[#005a9e] mx-auto mb-4" />
        <h3 className="font-semibold text-2xl mb-2 text-gray-900">Premium</h3>
        <p className="text-gray-600 text-sm mb-4">Solución completa para grandes organizaciones.</p>
        <p className="text-4xl font-bold text-gray-900 mb-6">Q250<span className="text-lg font-normal text-gray-500">/mes</span></p>
        <ul className="text-left text-gray-600 mb-8 space-y-2">
          <li><span className="font-semibold">✓</span> Registros ilimitados</li>
          <li><span className="font-semibold">✓</span> Soporte 24/7</li>
          <li><span className="font-semibold">✓</span> Analíticas avanzadas</li>
          <li><span className="font-semibold">✓</span> Características personalizadas</li>
        </ul>
        <a
          href="https://wa.me/50253131195?text=Hola%2C%20me%20interesa%20el%20Plan%20Premium%20de%20Q250%2Fmes%20para%20mi%20organización.%20%C2%BFPodr%C3%ADan%20darme%20m%C3%A1s%20informaci%C3%B3n%3F"
          target="_blank"
          rel="noopener noreferrer"
          className="block bg-[#0067b8] hover:bg-[#005a9e] text-white font-semibold py-3 rounded-xl shadow-lg transition-colors"
        >
          Solicitar Plan Premium
        </a>
      </div>
      
      {/* Plan Gratuito Especial Kinal */}
      <div className="bg-[#0067b8] text-white rounded-3xl shadow-2xl p-8 text-center transition-all duration-300 transform scale-105 hover:scale-110 relative z-10">
        <span className="absolute top-0 right-0 -mt-4 -mr-4 bg-yellow-400 text-yellow-900 text-xs font-bold uppercase rounded-full px-3 py-1">Especial</span>
        <CreditCard size={48} className="text-white mx-auto mb-4" />
        <h3 className="font-semibold text-2xl mb-2">Premium</h3>
        <p className="text-blue-200 text-sm mb-4">Especial si trabajas para Fundación Kinal.</p>
        <p className="text-4xl font-bold mb-6">Q0<span className="text-lg font-normal text-blue-200">/mes</span></p>
        <ul className="text-left text-white mb-8 space-y-2">
          <li><span className="font-semibold">✓</span> Registros ilimitados</li>
          <li><span className="font-semibold">✓</span> Soporte prioritario</li>
          <li><span className="font-semibold">✓</span> Analíticas avanzadas</li>
          <li><span className="font-semibold">✓</span> Características personalizadas</li>
        </ul>
            <a
              href="https://wa.me/50253131195?text=Hola%2C%20estoy%20interesado%20en%20el%20plan%20gratuito%20Premium%20para%20Fundaci%C3%B3n%20Kinal"
              target="_blank"
              rel="noopener noreferrer"
              className="block bg-white hover:bg-gray-100 text-[#0067b8] font-semibold py-3 rounded-xl shadow-lg transition-colors"
            >
              Solicitar Plan Gratuito
            </a>
      </div>
    </div>
  </div>
</section>


      {/* Contacto */}
      <section className="py-16 bg-white transition-colors duration-300">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">¿Tienes preguntas?</h2>
          <p className="text-gray-700 text-lg mb-8">
            Nuestro equipo está listo para ayudarte.
          </p>
          <Link
            to="https://github.com/REACTivos-Taller"
            className="inline-flex items-center justify-center gap-2 text-base bg-[#0067b8] hover:bg-[#005a9e] text-white font-semibold px-7 py-3 rounded-xl shadow-lg transition transform hover:-translate-y-1 hover:scale-105"
          >
            Contáctanos <Mail size={18} />
          </Link>
        </div>
      </section>

      {/* CTA final */}
      <section className="py-16 bg-blue-50 transition-colors duration-300">
        <div className="container mx-auto px-6 flex flex-col md:flex-row items-center justify-between">
          <div className="mb-8 md:mb-0 text-center md:text-left">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">¿Listo para comenzar?</h2>
            <p className="text-gray-700 text-lg">
              Registra movimientos o consulta el historial en segundos.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              to="/register"
              className="bg-[#0067b8] hover:bg-[#005a9e] text-white font-semibold px-7 py-3 rounded-xl shadow-lg transition transform hover:-translate-y-1 hover:scale-105 flex items-center justify-center gap-2 text-base"
            >
              Registrar Ahora <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default App;
