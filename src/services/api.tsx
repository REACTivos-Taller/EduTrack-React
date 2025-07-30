<<<<<<< Updated upstream
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
=======
import axios from 'axios'
import type { AxiosInstance, AxiosError, AxiosResponse } from 'axios'
import { useLogout } from '../shared/hooks/useLogout'

// Base URL desde .env (prefijo VITE_* expuesto por Vite)
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || ''

/**
 * Cliente Axios configurado para nuestro backend.
 */
export const apiClient: AxiosInstance = axios.create({
  baseURL: `${API_BASE_URL}/v1`,
  timeout: 5000,
})

// Interceptor de RESPONSE: manejar 401/403
apiClient.interceptors.response.use(
  (res: AxiosResponse) => res,
  (err: AxiosError) => {
    const status = err.response?.status
    if (status === 401 || status === 403) {
      useLogout()
    }
    return Promise.reject(err)
  },
)

const handleError = (e: any) => ({
  error: true as const,
  message: e.message || 'Error desconocido',
})

// Tipos de datos
export type RegistryType = 'entry' | 'exit'

export interface Registry {
  _id: string
  studentCardNumber: string
  type: RegistryType
  date: string // ISO string
  classroom: string
}

export interface GetRegistriesParams {
  studentCardNumber?: string
  from?: string // ISO date string
  to?: string // ISO date string
}

export interface GetRegistriesResponse {
  success: boolean
  registries: Registry[]
}

export interface AddRegistryResponse {
  success: boolean
  message: string
  record: Registry
}

// APIs de Registries
/**
 * Registra la salida/entrada de un alumno.
 */
export const addRegistry = async (data: {
  studentCardNumber: string
  type: RegistryType
  classroom: string
}): Promise<AddRegistryResponse | { error: boolean; message: string }> => {
  try {
    const { data: response } = await apiClient.post<AddRegistryResponse>(
      '/registries/add',
      data,
    )
    return response
  } catch (e) {
    console.error('Error al registrar movimiento', e)
    return handleError(e)
  }
}

/**
 * Obtiene todos los registros.
 * El backend responde con { records: Registry[] }.
 */
export const getRegistries = async (): Promise<
  GetRegistriesResponse | { error: boolean; message: string }
> => {
  try {
    const { data } = await apiClient.get<{ records: Registry[] }>('/registries')
    return { success: true, registries: data.records }
  } catch (e) {
    console.error('Error al obtener registros', e)
    return handleError(e)
  }
}
>>>>>>> Stashed changes
