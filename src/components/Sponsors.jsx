import Reveal from './Reveal'
import { CONTACT_EMAIL } from '../config'

/* The design reserves a logo band but ships no logos yet. Replace each entry
   with { name, logo, href } and render an <img> once they're confirmed. */
const SLOTS = ['Sponsor logo', 'Sponsor logo', 'Sponsor logo', 'Sponsor logo']

export default function Sponsors({ anchorId = 'sponsors' }) {
  return (
    <section className="section sponsors" id={anchorId} aria-labelledby="sponsors-title">
      <div className="sponsors__stage">
        <Reveal
          className="layer sponsors__l36"
          variant="sheet"
          delay={0}
          aria-hidden="true"
        >
          <img src="/assets/layer-36.png" alt="" />
        </Reveal>

        <Reveal
          className="layer sponsors__panel layer--crop"
          variant="sheet"
          delay={90}
          aria-hidden="true"
        >
          <img src="/assets/layer-39.png" alt="" />
        </Reveal>

        <Reveal as="h2" className="sponsors__title wordmark wordmark--sponsors" variant="left snap" delay={180} id="sponsors-title">
          Our Sponsors
        </Reveal>

        <div className="sponsors__wall">
          {SLOTS.map((label, i) => (
            <Reveal
              key={i}
              className="sponsors__slot"
              variant="pop snap"
              delay={300 + i * 70}
              settle={i % 2 === 0 ? -1.1 : 0.9}
            >
              {label}
            </Reveal>
          ))}
        </div>

        <Reveal
          as="img"
          className="sponsors__divider"
          src="/assets/sponsors-divider.svg"
          alt=""
          variant="left"
          delay={600}
          aria-hidden="true"
        />

        <Reveal as="p" className="sponsors__ask" variant="up" delay={660}>
          Interested in sponsoring?
        </Reveal>

        <Reveal className="sponsors__cta" variant="pop snap" delay={720}>
          <a href={`mailto:${CONTACT_EMAIL}?subject=DA%20Hacks%205.0%20sponsorship`}>
            <span>Contact us!</span>
          </a>
        </Reveal>
      </div>
    </section>
  )
}
