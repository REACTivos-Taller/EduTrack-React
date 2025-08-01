import axios from 'axios'
import type { AxiosInstance, AxiosError, AxiosResponse } from 'axios'
import { type IPublicClientApplication } from '@azure/msal-browser' // Cambiado a IPublicClientApplication
import { loginRequest } from '../authConfig'

// Base URL desde .env
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || ''

// Cliente Axios configurado
export const createApiClient = (msalInstance: IPublicClientApplication): AxiosInstance => {
  // Cambiado a IPublicClientApplication
  const apiClient: AxiosInstance = axios.create({
    baseURL: `${API_BASE_URL}/v1`,
    timeout: 5000,
  })

  // Interceptor de REQUEST: agregar token de acceso
  apiClient.interceptors.request.use(
    async (config) => {
      const account = msalInstance.getActiveAccount()
      if (account) {
        try {
          const response = await msalInstance.acquireTokenSilent({
            ...loginRequest,
            account,
          })
          const accessToken = response.accessToken
          config.headers.Authorization = `Bearer ${accessToken}`
        } catch (error) {
          console.error('Error acquiring token silently:', error)
          // Opcional: forzar login si acquireTokenSilent falla
          await msalInstance.acquireTokenRedirect(loginRequest)
        }
      }
      return config
    },
    (error) => Promise.reject(error),
  )

  // Interceptor de RESPONSE: manejar 401/403
  apiClient.interceptors.response.use(
    (res: AxiosResponse) => res,
    async (err: AxiosError) => {
      const status = err.response?.status
      if (status === 401 || status === 403) {
        await msalInstance.logoutRedirect({
          postLogoutRedirectUri: '/',
        })
      }
      return Promise.reject(err)
    },
  )

  return apiClient
}

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
  date: string
  classroom: string
}

export interface GetRegistriesParams {
  studentCardNumber?: string
  from?: string
  to?: string
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
export const addRegistry = async (
  msalInstance: IPublicClientApplication, // Cambiado a IPublicClientApplication
  data: {
    studentCardNumber: string
    type: RegistryType
    classroom: string
  },
): Promise<AddRegistryResponse | { error: boolean; message: string }> => {
  try {
    const apiClient = createApiClient(msalInstance)
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

export const getRegistries = async (
  msalInstance: IPublicClientApplication, // Cambiado a IPublicClientApplication
): Promise<GetRegistriesResponse | { error: boolean; message: string }> => {
  try {
    const apiClient = createApiClient(msalInstance)
    const { data } = await apiClient.get<{ records: Registry[] }>('/registries')
    return { success: true, registries: data.records }
  } catch (e) {
    console.error('Error al obtener registros', e)
    return handleError(e as Error)
  }
}
