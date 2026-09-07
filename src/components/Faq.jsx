import { useState } from 'react'
import Reveal from './Reveal'
import { FAQ } from '../data/faq'

export default function Faq() {
  // Accordion: one open at a time, all closed to start.
  const [open, setOpen] = useState(null)

  return (
    <section className="section faq" id="faq" aria-labelledby="faq-title">
      <div className="faq__inner">
        <Reveal as="h2" className="faq__title wordmark" variant="drop snap" delay={0} id="faq-title">
          FAQ
        </Reveal>

        <div className="faq__list">
          {FAQ.map((item, i) => {
            const isOpen = open === i
            return (
              <Reveal
                key={item.q}
                className={`faq__item${isOpen ? ' is-open' : ''}`}
                variant="up"
                delay={80 + i * 55}
                settle={i % 2 === 0 ? -0.35 : 0.3}
              >
                <button
                  type="button"
                  className="faq__q"
                  id={`faq-q-${i}`}
                  aria-expanded={isOpen}
                  aria-controls={`faq-a-${i}`}
                  onClick={() => setOpen(isOpen ? null : i)}
                >
                  {item.q}
                </button>
                <div
                  className="faq__a"
                  id={`faq-a-${i}`}
                  role="region"
                  aria-labelledby={`faq-q-${i}`}
                >
                  <div>
                    <p>{item.a}</p>
                  </div>
                </div>
              </Reveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}
