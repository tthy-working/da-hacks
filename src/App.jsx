import NavBar from './components/NavBar'
import Hero from './components/Hero'
import About from './components/About'
import Sponsors from './components/Sponsors'
import Agenda from './components/Agenda'
import Faq from './components/Faq'
import Apply from './components/Apply'

export default function App() {
  return (
    <>
      <a className="skip-link" href="#about">
        Skip to content
      </a>
      <NavBar />
      <main>
        <Hero />
        <About />
        <Sponsors />
        <Agenda />
        <Faq />
        <Apply />
      </main>
    </>
  )
}
