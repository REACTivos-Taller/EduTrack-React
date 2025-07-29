import { createRoot } from 'react-dom/client'
import {
  PublicClientApplication,
  EventType,
  type EventMessage,
  type AuthenticationResult,
} from '@azure/msal-browser'
import { MsalProvider } from '@azure/msal-react'
import { msalConfig } from './authConfig'
import App from './App'
import './index.css'
import { BrowserRouter } from 'react-router-dom'

// Instancia de MSAL
const msalInstance = new PublicClientApplication(msalConfig)

// Establecer cuenta activa al cargar la página
if (!msalInstance.getActiveAccount() && msalInstance.getAllAccounts().length > 0) {
  msalInstance.setActiveAccount(msalInstance.getAllAccounts()[0])
}

// Escuchar evento de login exitoso
msalInstance.addEventCallback((event: EventMessage) => {
  if (event.eventType === EventType.LOGIN_SUCCESS && event.payload) {
    const payload = event.payload as AuthenticationResult
    if (payload.account) {
      msalInstance.setActiveAccount(payload.account)
    }
  }
})

createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <MsalProvider instance={msalInstance}>
      <App />
    </MsalProvider>
  </BrowserRouter>,
)
