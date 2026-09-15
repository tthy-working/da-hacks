import Reveal from './Reveal'
import { CONTACT_EMAIL } from '../config'
import { PHONE, TABLET } from '../breakpoints'

/* The design reserves a logo band but ships no logos yet, so the band says so
   rather than standing four empty frames in it. When they are confirmed, drop
   this card and render the logos here instead. */

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
          <Reveal className="sponsors__soon" variant="pop snap" delay={300} settle={-1.1}>
            <strong>Sponsors coming soon</strong>
            <span>This year&rsquo;s partners are being confirmed.</span>
          </Reveal>
        </div>

        {/* the brush is redrawn per frame, not stretched: the strokes keep
            their weight while the stroke gets shorter */}
        <Reveal className="sponsors__divider" variant="left" delay={600} aria-hidden="true">
          <picture>
            <source media={PHONE} srcSet="/assets/sponsors-divider-phone.svg" />
            <source media={TABLET} srcSet="/assets/sponsors-divider-tablet.svg" />
            <img src="/assets/sponsors-divider.svg" alt="" />
          </picture>
        </Reveal>

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
