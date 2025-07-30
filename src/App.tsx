import React, { useEffect } from 'react'
import { useRoutes } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import { DesktopNav } from './components/Nav/DesktopNav'
import { MobileNav } from './components/Nav/MobileNav'
import { routes } from './routes'
import { useTriggerPing } from './shared/hooks/useTriggerPing'

export const App: React.FC = () => {
  const element = useRoutes(routes)
  const { triggerPing } = useTriggerPing()

  useEffect(() => {
    // Un ping inmediato
    triggerPing()

    // Cada 15 min
    const interval = setInterval(
      () => {
        triggerPing()
      },
      15 * 60 * 1000,
    )

    return () => clearInterval(interval)
  }, [triggerPing])

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
