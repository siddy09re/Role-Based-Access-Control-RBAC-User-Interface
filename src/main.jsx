import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { BrowserRouter } from 'react-router-dom';  // Import BrowserRouter
import Startpage from './Components/Startpage.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter> {/* Wrap LoginPage in BrowserRouter */}
      <Startpage />
    </BrowserRouter>
  </StrictMode>,
)
