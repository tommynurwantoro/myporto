import { GoogleOAuthProvider } from '@react-oauth/google';
import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import App from './App.tsx'
import { PaymentPage } from './components/PaymentPage.tsx'
import { SchedulePage } from './components/SchedulePage.tsx'
import { SignLoginPage } from './components/sign/SignLoginPage.tsx'
import { SignCreatePage } from './components/sign/SignCreatePage.tsx'
import { SignListPage } from './components/sign/SignListPage.tsx'
import { VerifyPage } from './components/sign/VerifyPage.tsx'
import { AuthGuard } from './components/sign/AuthGuard.tsx'
import { AuthProvider } from './context/AuthContext.tsx'
import './index.css'

const googleClientId = import.meta.env.VITE_GOOGLE_CLIENT_ID ?? ''

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <GoogleOAuthProvider clientId={googleClientId}>
      <AuthProvider>
        <Router>
          <Routes>
            <Route path="/" element={<App />} />
            <Route path="/payme" element={<PaymentPage />} />
            <Route path="/schedule" element={<SchedulePage />} />
            <Route path="/sign/login" element={<SignLoginPage />} />
            <Route
              path="/sign/create"
              element={
                <AuthGuard>
                  <SignCreatePage />
                </AuthGuard>
              }
            />
            <Route
              path="/sign/documents"
              element={
                <AuthGuard>
                  <SignListPage />
                </AuthGuard>
              }
            />
            <Route path="/verify/:id" element={<VerifyPage />} />
          </Routes>
        </Router>
      </AuthProvider>
    </GoogleOAuthProvider>
  </React.StrictMode>,
)
