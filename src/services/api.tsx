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

const handleError = (e: Error) => ({
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
    return handleError(e as Error)
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
    return handleError(e as Error)
  }
}
