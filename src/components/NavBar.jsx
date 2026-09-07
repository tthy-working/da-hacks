import { useEffect, useRef, useState } from 'react'

import { APPLY_URL } from '../config'

const LINKS = [
  { id: 'about', label: 'About' },
  { id: 'sponsors', label: 'Sponsors' },
  { id: 'agenda', label: 'Agenda' },
  { id: 'faq', label: 'FAQ' },
]

export default function NavBar() {
  const [open, setOpen] = useState(false)
  const navRef = useRef(null)

  // Close on Escape, and on any click outside the bar.
  useEffect(() => {
    if (!open) return

    const onKey = (e) => {
      if (e.key === 'Escape') setOpen(false)
    }
    const onClick = (e) => {
      if (navRef.current && !navRef.current.contains(e.target)) setOpen(false)
    }

    document.addEventListener('keydown', onKey)
    document.addEventListener('pointerdown', onClick)
    return () => {
      document.removeEventListener('keydown', onKey)
      document.removeEventListener('pointerdown', onClick)
    }
  }, [open])

  // If the viewport grows back to desktop while the menu is open, the panel
  // styles no longer apply -- drop the state so it can't get stuck.
  useEffect(() => {
    const mq = window.matchMedia('(min-width: 861px)')
    const onChange = (e) => e.matches && setOpen(false)
    mq.addEventListener('change', onChange)
    return () => mq.removeEventListener('change', onChange)
  }, [])

  return (
    <nav ref={navRef} className={`nav${open ? ' is-open' : ''}`} aria-label="Main">
      <a className="nav__brand" href="#top">
        DA Hacks
      </a>

      <button
        type="button"
        className="nav__burger"
        aria-expanded={open}
        aria-controls="nav-links"
        aria-label={open ? 'Close menu' : 'Open menu'}
        onClick={() => setOpen((v) => !v)}
      >
        <span />
        <span />
        <span />
      </button>

      <ul className="nav__links" id="nav-links">
        {LINKS.map((link, i) => (
          <li key={link.id}>
            <a
              className={`nav__link nav__link--${link.id}`}
              href={`#${link.id}`}
              style={{ '--i-delay': `${i * 55}ms` }}
              onClick={() => setOpen(false)}
            >
              {link.label}
            </a>
          </li>
        ))}
      </ul>

      <a
        className="nav__apply"
        href={APPLY_URL}
        target="_blank"
        rel="noopener noreferrer"
        onClick={() => setOpen(false)}
      >
        Apply now!
      </a>
    </nav>
  )
}
