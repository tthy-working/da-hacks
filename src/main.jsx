import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import './styles/base.css'
import './styles/reveal.css'
import './styles/nav.css'
import './styles/hero.css'
import './styles/morph.css'
import './styles/about.css'
import './styles/sponsors.css'
import './styles/agenda.css'
// last: the iPad and iPhone frames override the laptop geometry above
import './styles/portrait.css'
import './styles/faq.css'

import App from './App'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>
)
