import axios, { type AxiosError, type AxiosResponse } from 'axios'

/**
 * Crea una instancia de Axios configurada para comunicarse con la API de PanRural.
 * - `baseURL` se obtiene de la variable de entorno VITE_PANRURAL_API y debe incluir el segmento `/v1`.
 * - `timeout` define el tiempo máximo de espera para cada petición (5 segundos).
 */
const api = axios.create({
  baseURL: import.meta.env.VITE_EDUTRACK_API,
  timeout: 5000,
})

// Interceptor de petición: se ejecuta antes de cada llamada HTTP
// CÁMBIALO PARA QUE USE EL DE MICROSOFT
api.interceptors.request.use(
  (config: any) => {
    // Intentamos obtener el token JWT guardado en localStorage
    const token = sessionStorage.getItem('token')
    if (token) {
      // Aseguramos que existan los headers en la configuración
      config.headers = config.headers || {}
      // Inyectamos el encabezado Authorization con Bearer <token>
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error: AxiosError) => Promise.reject(error),
)

// Interceptor de respuesta: se ejecuta tras recibir una respuesta o error
api.interceptors.response.use(
  (response: AxiosResponse) => response, // Si es éxito (2xx), dejamos pasar la respuesta
  (error: AxiosError & { config?: any; response?: any }) => {
    const status = error.response?.status // Código de estado HTTP (p.ej. 401)
    const url = error.config?.url as string | undefined // Ruta llamada

    // Si recibimos 401 en la ruta /auth/login, forzamos cierre de sesión
    if (status === 401 && url?.endsWith('/auth/login')) {
      // Limpiamos token
      localStorage.removeItem('token')
      // Redirigimos al usuario al formulario de autenticación
      window.location.href = '/auth'
      return
    }
    // Para otros errores 401 o de diferente tipo, dejamos que el llamante los maneje
    return Promise.reject(error)
  },
)

export default api
