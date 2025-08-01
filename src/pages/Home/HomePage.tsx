import React, { createContext, useContext, useState } from 'react';
import { Link } from 'react-router-dom'; // Se asume que react-router-dom está instalado
import { 
  Clock, ArrowRight, Wifi, Tablet, ShieldCheck, 
  Quote, Compass, Mail, CreditCard 
} from 'lucide-react';

// Mock de ThemeContext para que el código sea autocontenido y funcional.
// En tu proyecto real, usarías el contexto original de '../../shared/contexts/ThemeContext'.
const ThemeContext = createContext({
  theme: 'light',
  toggleTheme: () => {},
});

const useTheme = () => useContext(ThemeContext);

const App = () => {
  const [theme, setTheme] = useState('light');
  const toggleTheme = () => setTheme(prevTheme => (prevTheme === 'light' ? 'dark' : 'light'));

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <HomePage />
    </ThemeContext.Provider>
  );
};

export const HomePage: React.FC = () => {
  const { theme } = useTheme();

  return (
    <div className={`min-h-screen ${theme === 'dark' ? 'bg-gray-900 text-gray-100' : 'bg-white text-gray-900'} transition-colors duration-300`}>
      {/* Sección Principal (Hero) */}
      <header className={`relative py-20 ${theme === 'dark' ? 'bg-gray-800' : 'bg-blue-50'} transition-colors duration-300 overflow-hidden`}>
        {/* Gráfico de fondo */}
        <div className="absolute inset-0 z-0 opacity-20">
          <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="pattern-circles" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse" patternContentUnits="userSpaceOnUse">
                <circle id="pattern-circle" cx="2" cy="2" r="1.6257413380501518"></circle>
              </pattern>
            </defs>
            <rect id="rect" x="0" y="0" width="100%" height="100%" fill="url(#pattern-circles)"></rect>
          </svg>
        </div>
        <div className="container mx-auto flex flex-col md:flex-row items-center px-6 relative z-10">
          <div className="md:w-1/2 md:pr-10 text-center md:text-left">
            <h1 className="text-5xl font-extrabold text-gray-900 dark:text-white mb-4 leading-tight animate-fade-in-up">
              Más control con EduTrack
            </h1>
            <p className="text-xl text-gray-800 dark:text-gray-200 mb-8 animate-fade-in-up delay-100">
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
                className="bg-white dark:bg-gray-700 border border-[#0067b8] text-[#0067b8] dark:text-blue-300 hover:bg-[#e5f1fb] dark:hover:bg-gray-600 font-semibold px-7 py-3 rounded-xl shadow-lg transition transform hover:-translate-y-1 hover:scale-105 flex items-center justify-center gap-2 text-base"
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

      {/* Sección de Características Principales */}
      <section className="container mx-auto px-6 py-20">
        <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white mb-16 text-center animate-fade-in-up">
          ¿Por qué elegir EduTrack?
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-xl p-8 flex flex-col items-center text-center transition-all duration-300 transform hover:scale-105 hover:shadow-2xl">
            <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-[#e0f2fe] dark:bg-gray-700">
              <Clock size={36} className="text-[#005a9e]" />
            </div>
            <h3 className="font-semibold text-xl mb-2 text-gray-900 dark:text-white">Registro Instantáneo</h3>
            <p className="text-gray-600 dark:text-gray-400 text-sm">Cada entrada y salida queda registrada con fecha y hora en tiempo real.</p>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-xl p-8 flex flex-col items-center text-center transition-all duration-300 transform hover:scale-105 hover:shadow-2xl">
            <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-[#e0f2fe] dark:bg-gray-700">
              <Wifi size={36} className="text-[#005a9e]" />
            </div>
            <h3 className="font-semibold text-xl mb-2 text-gray-900 dark:text-white">Servicio Activo</h3>
            <p className="text-gray-600 dark:text-gray-400 text-sm">Siempre disponible gracias a monitoreo y pings automáticos.</p>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-xl p-8 flex flex-col items-center text-center transition-all duration-300 transform hover:scale-105 hover:shadow-2xl">
            <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-[#e0f2fe] dark:bg-gray-700">
              <Tablet size={36} className="text-[#005a9e]" />
            </div>
            <h3 className="font-semibold text-xl mb-2 text-gray-900 dark:text-white">Interfaz Moderna</h3>
            <p className="text-gray-600 dark:text-gray-400 text-sm">Diseño responsivo y accesible en cualquier dispositivo.</p>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-xl p-8 flex flex-col items-center text-center transition-all duration-300 transform hover:scale-105 hover:shadow-2xl">
            <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-[#e0f2fe] dark:bg-gray-700">
              <ShieldCheck size={36} className="text-[#005a9e]" />
            </div>
            <h3 className="font-semibold text-xl mb-2 text-gray-900 dark:text-white">Seguridad de Datos</h3>
            <p className="text-gray-600 dark:text-gray-400 text-sm">Tus datos están protegidos con protocolos de seguridad avanzados.</p>
          </div>
        </div>
      </section>

      {/* Sección de Testimonios */}
      <section className={`py-16 ${theme === 'dark' ? 'bg-gray-800' : 'bg-blue-50'} transition-colors duration-300`}>
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white mb-12 text-center animate-fade-in-up">
            Lo que dicen nuestros usuarios
          </h2>
          <div className="flex flex-col md:flex-row items-center justify-center gap-8 bg-white dark:bg-gray-900 p-8 rounded-3xl shadow-xl">
            <div className="md:w-1/3 flex justify-center">
              <img
                src="https://media.licdn.com/dms/image/v2/D4D03AQHXd7kxV27enw/profile-displayphoto-shrink_200_200/profile-displayphoto-shrink_200_200/0/1701969688672?e=2147483647&v=beta&t=WaFHs5pLLW2zjayK1KRqRIX3NhbvpiPjuMWMqNv6eI0"
                alt="Testimonio de usuario"
                className="rounded-full shadow-lg"
              />
            </div>
            <div className="md:w-2/3 text-center md:text-left">
              <Quote size={40} className="text-[#0067b8] mb-4 mx-auto md:mx-0" />
              <p className="text-lg text-gray-700 dark:text-gray-300 italic mb-4">
                "EduTrack ha transformado la forma en que gestionamos la asistencia. Es fácil de usar y nos da un control sin precedentes. ¡Altamente recomendado!"
              </p>
              <p className="font-semibold text-gray-900 dark:text-white">- Profesor Braulio</p>
            </div>
          </div>
        </div>
      </section>

      {/* Sección "Nuestra Misión" */}
      <section className={`py-20 ${theme === 'dark' ? 'bg-gray-900' : 'bg-white'} transition-colors duration-300`}>
        <div className="container mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-12">
          <div className="md:w-1/2 text-center md:text-left">
            <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white mb-4">
              Nuestra Misión
            </h2>
            <p className="text-gray-700 dark:text-gray-300 text-lg mb-6">
              En EduTrack, nuestra misión es empoderar a las instituciones educativas con herramientas de gestión de asistencia intuitivas y seguras. Creemos que la tecnología debe simplificar los procesos diarios, permitiendo que los educadores y administradores se concentren en lo que realmente importa: la educación.
            </p>
            <a
              href="https://github.com/REACTivos-Taller"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 text-sm font-semibold text-[#0067b8] dark:text-blue-300 hover:underline transition-colors"
            >
              Conoce más sobre nosotros <Compass size={18} />
            </a>
          </div>
          <div className="md:w-1/2 flex justify-center">
            <img
              src="https://d3t4nwcgmfrp9x.cloudfront.net/upload/consejos-elaborar-declaracion-mision.jpg"
              alt="Misión de la empresa"
              className="rounded-3xl shadow-2xl transition transform hover:rotate-3 hover:scale-105"
            />
          </div>
        </div>
      </section>

      {/* Sección de Planes y Precios */}
      <section className={`py-20 ${theme === 'dark' ? 'bg-gray-800' : 'bg-blue-50'} transition-colors duration-300`}>
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white mb-16 text-center animate-fade-in-up">
            Planes y Precios
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 items-center">
            {/* Plan Básico */}
            <div className="bg-white dark:bg-gray-900 rounded-3xl shadow-xl p-8 text-center transition-all duration-300 transform hover:scale-105 hover:shadow-2xl">
              <CreditCard size={48} className="text-[#005a9e] mx-auto mb-4" />
              <h3 className="font-semibold text-2xl mb-2 text-gray-900 dark:text-white">Básico</h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">Ideal para instituciones pequeñas.</p>
              <p className="text-4xl font-bold text-gray-900 dark:text-white mb-6">Q25<span className="text-lg font-normal text-gray-500">/mes</span></p>
              <ul className="text-left text-gray-600 dark:text-gray-400 mb-8 space-y-2">
                <li><span className="font-semibold">✓</span> Hasta 500 registros</li>
                <li><span className="font-semibold">✓</span> 1 usuario administrador</li>
                <li><span className="font-semibold">✓</span> Soporte por correo electrónico</li>
              </ul>
              <a
                href="https://wa.me/50253131195"
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
                href="https://wa.me/50253131195"
                target="_blank"
                rel="noopener noreferrer"
                className="block bg-white hover:bg-gray-100 text-[#0067b8] font-semibold py-3 rounded-xl shadow-lg transition-colors"
              >
                Solicitar Plan Estándar
              </a>
            </div>

            {/* Plan Premium */}
            <div className="bg-white dark:bg-gray-900 rounded-3xl shadow-xl p-8 text-center transition-all duration-300 transform hover:scale-105 hover:shadow-2xl">
              <CreditCard size={48} className="text-[#005a9e] mx-auto mb-4" />
              <h3 className="font-semibold text-2xl mb-2 text-gray-900 dark:text-white">Premium</h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">Solución completa para grandes organizaciones.</p>
              <p className="text-4xl font-bold text-gray-900 dark:text-white mb-6">Q250<span className="text-lg font-normal text-gray-500">/mes</span></p>
              <ul className="text-left text-gray-600 dark:text-gray-400 mb-8 space-y-2">
                <li><span className="font-semibold">✓</span> Registros ilimitados</li>
                <li><span className="font-semibold">✓</span> Soporte 24/7</li>
                <li><span className="font-semibold">✓</span> Analíticas avanzadas</li>
                <li><span className="font-semibold">✓</span> Características personalizadas</li>
              </ul>
              <a
                href="https://wa.me/50253131195"
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
              <h3 className="font-semibold text-2xl mb-2">Premiun</h3>
              <p className="text-blue-200 text-sm mb-4">Especial si trabajas para Fundacion Kinal.</p>
              <p className="text-4xl font-bold mb-6">Q0<span className="text-lg font-normal text-blue-200">/mes</span></p>
              <ul className="text-left text-white mb-8 space-y-2">
                <li><span className="font-semibold">✓</span> Registros ilimitados</li>
                <li><span className="font-semibold">✓</span> Soporte prioritario</li>
                <li><span className="font-semibold">✓</span> Analíticas avanzadas</li>
                <li><span className="font-semibold">✓</span> Características personalizadas</li>
              </ul>
              <a
                href="https://wa.me/50253131195"
                target="_blank"
                rel="noopener noreferrer"
                className="block bg-white hover:bg-gray-100 text-[#0067b8] font-semibold py-3 rounded-xl shadow-lg transition-colors"
              >
                Solicitar Plan Estándar
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Sección de Contáctanos */}
      <section className={`py-16 ${theme === 'dark' ? 'bg-gray-900' : 'bg-white'} transition-colors duration-300`}>
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">¿Tienes preguntas?</h2>
          <p className="text-gray-700 dark:text-gray-300 text-lg mb-8">
            Nuestro equipo está listo para ayudarte. Contáctanos para más información o una demostración.
          </p>
          <Link
            to="https://github.com/REACTivos-Taller"
            className="inline-flex items-center justify-center gap-2 text-base bg-[#0067b8] hover:bg-[#005a9e] text-white font-semibold px-7 py-3 rounded-xl shadow-lg transition transform hover:-translate-y-1 hover:scale-105"
          >
            Contáctanos <Mail size={18} />
          </Link>
        </div>
      </section>

      {/* Sección de Llamada a la Acción (CTA) Final */}
      <section className={`py-16 ${theme === 'dark' ? 'bg-gray-800' : 'bg-blue-50'} transition-colors duration-300`}>
        <div className="container mx-auto px-6 flex flex-col md:flex-row items-center justify-between">
          <div className="mb-8 md:mb-0 text-center md:text-left">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">¿Listo para comenzar?</h2>
            <p className="text-gray-700 dark:text-gray-300 text-lg">
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
