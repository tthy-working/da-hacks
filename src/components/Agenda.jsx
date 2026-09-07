import Reveal from './Reveal'
import { AGENDA } from '../data/agenda'

/* Rotations come from the Figma letter nodes -- the word arcs down to the
   right, so each letter keeps its own angle. */
const TITLE = [
  { cls: 'a1', ch: 'A', rot: -3.11 },
  { cls: 'a2', ch: 'g', rot: 5.76 },
  { cls: 'a3', ch: 'e', rot: 12.78 },
  { cls: 'a4', ch: 'n', rot: 22.9 },
  { cls: 'a5', ch: 'd', rot: 30.81 },
  { cls: 'a6', ch: 'a', rot: 27.04 },
]

export default function Agenda() {
  return (
    <section className="section agenda" id="agenda" aria-labelledby="agenda-title">
      <div className="agenda__stage">
        <div className="scenery agenda__scenery" aria-hidden="true">
          <Reveal
            className="layer agenda__grass"
            variant="sheet"
            delay={0}
            aria-hidden="true"
          >
            <img src="/assets/agenda-grass.png" alt="" />
          </Reveal>
        </div>

        <h2 className="sr-title" id="agenda-title">
          Agenda
        </h2>

        <div className="agenda__title">
          {TITLE.map((l, i) => (
            <Reveal
              key={l.cls}
              as="span"
              className={l.cls}
              variant="pop snap"
              delay={140 + i * 60}
              settle={l.rot}
              aria-hidden="true"
            >
              {l.ch}
            </Reveal>
          ))}
        </div>

        <div className="agenda__days">
          {AGENDA.map((day, di) => (
            <Reveal
              key={day.day}
              className="agenda__day"
              variant="drop snap"
              delay={320 + di * 130}
              settle={di === 0 ? -1.2 : 1}
            >
              <h3>{day.day}</h3>
              <ul className="agenda__list">
                {day.events.map((e) => (
                  <li
                    key={e.time + e.what}
                    className={`agenda__row${e.key ? ' agenda__row--key' : ''}`}
                  >
                    <span className="agenda__time">{e.time}</span>
                    <span className="agenda__what">{e.what}</span>
                  </li>
                ))}
              </ul>
            </Reveal>
          ))}
        </div>

        <Reveal as="p" className="agenda__note" variant="up" delay={600} settle={-1.4}>
          Times are a draft and will shift a little before the weekend. Follow{' '}
          <strong>@deanzahacks</strong> for the final call sheet.
        </Reveal>
      </div>
    </section>
  )
}
