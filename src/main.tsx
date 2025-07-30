import React from 'react';
import { createRoot } from 'react-dom/client';
import {
  PublicClientApplication,
  EventType,
  type EventMessage,
  type AuthenticationResult,
} from '@azure/msal-browser';
import { MsalProvider } from '@azure/msal-react';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import { msalConfig } from './authConfig';
import { ThemeProvider } from './shared/contexts/ThemeContext';
import './index.css';

// Instancia de MSAL
const msalInstance = new PublicClientApplication(msalConfig);

// Si ya hay cuentas en sessionStorage, establece la activa
const accounts = msalInstance.getAllAccounts();
if (!msalInstance.getActiveAccount() && accounts.length > 0) {
  msalInstance.setActiveAccount(accounts[0]);
}

// Escucha login exitoso para actualizar la cuenta activa
msalInstance.addEventCallback((event: EventMessage) => {
  if (event.eventType === EventType.LOGIN_SUCCESS && event.payload) {
    const result = event.payload as AuthenticationResult;
    if (result.account) {
      msalInstance.setActiveAccount(result.account);
    }
  }
});

const container = document.getElementById('root')!;
const root = createRoot(container);

root.render(
  <React.StrictMode>
    {/* ThemeProvider envuelve toda la App para tema claro/oscuro */}
    <ThemeProvider>
      <BrowserRouter>
        <MsalProvider instance={msalInstance}>
          <App />
        </MsalProvider>
      </BrowserRouter>
    </ThemeProvider>
  </React.StrictMode>
);
