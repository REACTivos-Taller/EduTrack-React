import { useCallback } from 'react'
import { useMsal } from '@azure/msal-react'

/**
 * Hook para cerrar sesión usando MSAL.
 */
export const useLogout = (): (() => Promise<void>) => {
  const { instance } = useMsal()
  return useCallback(async () => {
    try {
      await instance.logoutRedirect({
        postLogoutRedirectUri: '/',
      })
    } catch (e) {
      console.error('Error during logoutRedirect:', e)
    }
  }, [instance])
}
