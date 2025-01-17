import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { BrowserRouter } from 'react-router-dom'
import { AuthProvider, AuthProviderProps } from 'react-oidc-context'

const cognitoAuthConfig: AuthProviderProps = {
  authority: import.meta.env.VITE_COGNITO_AUTHORITY, // Cognito domain
  client_id: import.meta.env.VITE_COGNITO_CLIENT,
  redirect_uri: import.meta.env.VITE_REDIRECT_URI,
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
