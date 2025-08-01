import { useState, useCallback } from 'react'
import toast from 'react-hot-toast'
import { getRegistries, type Registry } from '../../services/api'
import { useMsal } from '@azure/msal-react'

export const useGetRegistries = () => {
  const { instance: msalInstance } = useMsal()
  const [registries, setRegistries] = useState<Registry[]>([])
  const [isLoading, setIsLoading] = useState(false)

  const fetchRegistries = useCallback(async () => {
    setIsLoading(true)
    try {
      const res = await getRegistries(msalInstance)
      if ('error' in res) {
        // Maneja el caso de error
        toast.error(res.message || 'Error al obtener registros')
        setRegistries([])
      } else {
        // res es de tipo GetRegistriesResponse
        if (res.success) {
          setRegistries(res.registries)
        } else {
          toast.error('No se encontraron registros')
          setRegistries([])
        }
      }
    } catch (err) {
      console.error('Error inesperado en fetchRegistries:', err)
      toast.error(
        'Error inesperado: ' + ((err as Error).message || 'Failed to fetch registries'),
      )
      setRegistries([])
    } finally {
      setIsLoading(false)
    }
  }, [msalInstance])

  return { fetchRegistries, registries, isLoading }
}
