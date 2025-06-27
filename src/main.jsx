import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'

import './index.css' // Your custom styles
import 'bootstrap/dist/css/bootstrap.min.css' // ✅ Bootstrap CSS
import 'bootstrap/dist/js/bootstrap.bundle.min.js' // ✅ Bootstrap JS (for modals, dropdowns, etc.)

import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>
)
