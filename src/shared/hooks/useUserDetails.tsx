// src/shared/hooks/useUserDetails.tsx
import { useEffect, useState, useCallback } from 'react'
import { useMsal, useIsAuthenticated } from '@azure/msal-react'
import { InteractionStatus } from '@azure/msal-browser'
import { loginRequest } from '../../authConfig'

export interface UserDetails {
  isAuthenticated: boolean
  isLoading: boolean
  id: string
  name: string
  roles: string[]
  login: () => void
}

export const useUserDetails = (): UserDetails => {
  const { instance, accounts, inProgress } = useMsal()
  const isAuthenticated = useIsAuthenticated()

  const [id, setId] = useState('')
  const [name, setName] = useState('')
  const [roles, setRoles] = useState<string[]>([])

  // Al cambiar cuentas o instancia, actualiza los datos del usuario
  useEffect(() => {
    const account = instance.getActiveAccount() || accounts[0] || null
    if (account) {
      setId(account.homeAccountId)
      setName(account.name || '')
      const claims = account.idTokenClaims as Record<string, unknown>
      setRoles(Array.isArray(claims.roles) ? (claims.roles as string[]) : [])
    } else {
      setId('')
      setName('')
      setRoles([])
    }
  }, [instance, accounts])

  // Login por redirect
  const login = useCallback(() => {
    instance.loginRedirect(loginRequest).catch(console.error)
  }, [instance])

  return {
    isAuthenticated,
    isLoading: inProgress !== InteractionStatus.None,
    id,
    name,
    roles,
    login,
  }
}
