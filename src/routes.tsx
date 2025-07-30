import type { RouteObject } from 'react-router-dom'
import { AuthPage } from './pages/Auth/AuthPage'
import { RegisterPage } from './pages/Registry/RegisterPage'
import { NotFoundPage } from './pages/NotFoundPage'
import { ProtectedRoute } from './components/Routes/ProtectedRoute'
import { HomePage } from './pages/Home/HomePage'
import { DashboardPage } from './pages/Dashboard/DashboardPage'

export const routes: RouteObject[] = [
  {
    path: '/',
    element: <HomePage />,
  },
  {
    path: '/auth',
    element: <AuthPage />,
  },
  {
    path: '/dashboard',
    element: (
      <ProtectedRoute>
        <DashboardPage />
      </ProtectedRoute>
    ),
  },
  {
    path: '/register',
    element: (
      <ProtectedRoute>
        <RegisterPage />
      </ProtectedRoute>
    ),
  },
  {
    path: '*',
    element: <NotFoundPage />,
  },
]
