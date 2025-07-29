import { useMsal } from '@azure/msal-react'
import { loginRequest } from '../authConfig'

export const LoginButton = () => {
  const { instance } = useMsal()

  // Iniciar sesión con popup
  const handleLogin = async () => {
    try {
      await instance.loginPopup(loginRequest)
    } catch (error) {
      console.error('Error al iniciar sesión:', error)
    }
  }

  return (
    <button
      onClick={handleLogin}
      className="rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
    >
      Iniciar sesión con Microsoft
    </button>
  )
}
