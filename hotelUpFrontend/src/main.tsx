import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { BrowserRouter } from 'react-router-dom'
import { AuthProvider, AuthProviderProps } from 'react-oidc-context'
import { AppConfig } from './config.ts'

const cognitoAuthConfig: AuthProviderProps = {
  authority: AppConfig.cognitoAuthority,
  client_id: AppConfig.cognitoClient,
  redirect_uri: AppConfig.redirectUri,
  response_type: "code",
  scope: "email openid phone",
};


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider {...cognitoAuthConfig}>
        <App />
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>,
)
