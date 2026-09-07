import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import './styles/base.css'
import './styles/reveal.css'
import './styles/nav.css'
import './styles/hero.css'
import './styles/about.css'
import './styles/sponsors.css'
import './styles/agenda.css'
import './styles/faq.css'

import App from './App'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>
)
