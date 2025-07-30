import React from 'react'
import { useRoutes } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import { DesktopNav } from './components/Nav/DesktopNav'
import { MobileNav } from './components/Nav/MobileNav'
import { routes } from './routes'

export const App: React.FC = () => {
  const element = useRoutes(routes)

  return (
    <div className="flex h-screen flex-col">
      <DesktopNav />
      <div className="flex-1 overflow-auto pt-16 pb-16 md:pt-0 md:pb-0">{element}</div>
      <MobileNav />
      <Toaster position="top-center" reverseOrder={false} />
    </div>
  )
}

export default App
