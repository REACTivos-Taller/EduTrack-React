import { useState } from 'react'
import toast from 'react-hot-toast'
import type { AddRegistryResponse, RegistryType } from '../../services/api'
import { addRegistry } from '../../services/api'
import { useMsal } from '@azure/msal-react'

type AddRegistryPayload = {
  studentCardNumber: string
  type: RegistryType
  classroom: string
}

export const useAddRegistry = () => {
  const { instance: msalInstance } = useMsal()
  const [isLoading, setIsLoading] = useState(false)

  const addRegistryFn = async (
    studentCardNumber: string,
    type: RegistryType,
    classroom: string,
  ): Promise<AddRegistryResponse['record'] | null> => {
    setIsLoading(true)
    try {
      const payload: AddRegistryPayload = { studentCardNumber, type, classroom }
      const response = await addRegistry(msalInstance, payload)

      if ('error' in response && response.error) {
        toast.error(response.message)
        return null
      }
      toast.success(response.message)
      if ('record' in response) {
        return response.record
      }
      return null
    } catch (err) {
      console.error('Error inesperado en addRegistry:', err)
      toast.error('Error inesperado: ' + ((err as Error).message || err))
      return null
    } finally {
      setIsLoading(false)
    }
  }

  return { addRegistry: addRegistryFn, isLoading }
}
