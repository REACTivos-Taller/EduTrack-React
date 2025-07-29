import { useMsal, useIsAuthenticated } from '@azure/msal-react'
import { Navigate } from 'react-router-dom'

export const HomePage = () => {
  const { accounts } = useMsal()
  const isAuthenticated = useIsAuthenticated()

  if (!isAuthenticated) {
    return <Navigate to="/login" />
  }

  const user = accounts[0]
  return (
    <div className="p-4">
      <h1>Bienvenido, {user.name}</h1>
      <p>Email: {user.username}</p>
    </div>
  )
}
