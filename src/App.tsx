import { routes } from './routes'
import { useRoutes } from 'react-router-dom'
import './index.css'

// Toma las rutas del archivo de rutas.
function App() {
  const elements = useRoutes(routes)

  return <>{elements}</>
}

export default App
