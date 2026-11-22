import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { CurrentUserProvider } from "./hooks/useCurrentUser";
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <CurrentUserProvider>
      <App />
    </CurrentUserProvider>
  </StrictMode>
)
