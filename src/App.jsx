import NavBar from './components/NavBar'
import Scene from './components/Scene'
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
        {/* hero + About are one pinned scroll scene: see Scene.jsx */}
        <Scene />
        <Sponsors />
        <Agenda />
        <Faq />
        <Apply />
      </main>
    </>
  )
}
