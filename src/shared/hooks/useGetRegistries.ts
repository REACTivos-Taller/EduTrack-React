import { useState, useCallback } from 'react'
import { getRegistries, type Registry } from '../../services/api'

export const useGetRegistries = () => {
  const [registries, setRegistries] = useState<Registry[]>([])
  const [isLoading, setIsLoading] = useState(false)

  const fetchRegistries = useCallback(async () => {
    setIsLoading(true)
    const res = await getRegistries()
    if (!('error' in res) && res.success) {
      setRegistries(res.registries)
    }
    setIsLoading(false)
  }, [])

  return { fetchRegistries, registries, isLoading }
}

