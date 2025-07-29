import { LoginPage } from '../pages/LoginPage'
import { HomePage } from '../pages/HomePage'

export const routes = [
  {
    path: '/',
    element: <HomePage />,
  },
  {
    path: '/login',
    element: <LoginPage />,
  },
]
