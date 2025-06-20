import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import App from './App.tsx'
import { PaymentPage } from './components/PaymentPage.tsx'
import { SchedulePage } from './components/SchedulePage.tsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/payme" element={<PaymentPage />} />
        <Route path="/schedule" element={<SchedulePage />} />
      </Routes>
    </Router>
  </React.StrictMode>,
)
