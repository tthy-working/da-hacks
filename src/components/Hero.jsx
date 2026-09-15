import Reveal from './Reveal'
import { PHONE, TABLET } from '../breakpoints'

/* Background collage layers, back to front -- this is the design's own paint
   order (36, 39, 38, 41, 37, 40), and layer 40 belongs at the FRONT: its
   tree, cliff and cactus overlay the bridge and the grass rather than sitting
   behind them. Geometry lives in hero.css; this array only controls the order
   and the stagger. */
const LAYERS = [
  { cls: 'hero__l36', src: 'layer-36.png', delay: 0 },
  { cls: 'hero__l39', src: 'layer-39.png', delay: 70, crop: true },
  { cls: 'hero__l38', src: 'layer-38.png', delay: 140, crop: true },
  { cls: 'hero__l41', src: 'layer-41.png', delay: 200, crop: true },
  { cls: 'hero__l37', src: 'layer-37.png', delay: 260, inner: true },
  { cls: 'hero__l40', src: 'layer-40.png', delay: 320, inner: true },
]

/* The wordmark, letter by letter, so each scrap of paper lands on its own
   beat the way it would under a stop-motion camera. */
const MARK = [
  { cls: 'm-hacks', text: 'Hacks', delay: 520 },
  { cls: 'm-d', text: 'D', delay: 570 },
  { cls: 'm-e', text: 'e', delay: 610 },
  { cls: 'm-a', text: 'A', delay: 650 },
  { cls: 'm-nza', text: 'nza', delay: 690 },
]

export default function Hero() {
  return (
    <section className="section hero" id="top">
      <div className="hero__stage">
        {LAYERS.map((l) => (
          <Reveal
            key={l.cls}
            className={`layer ${l.cls}${l.crop ? ' layer--crop' : ''}`}
            variant="sheet"
            delay={l.delay}
            aria-hidden="true"
          >
            {l.inner ? (
              <div>
                <img src={`/assets/${l.src}`} alt="" />
              </div>
            ) : (
              <img src={`/assets/${l.src}`} alt="" />
            )}
          </Reveal>
        ))}

        {/* white paper cards + wordmark */}
        <div className="hero__mark">
          {/* Each frame cuts its own set of cards -- the iPad and iPhone
              lockups are re-set, so the paper under them is a different
              shape, not the laptop's scaled down. */}
          <Reveal className="hero__cards" variant="drop snap" delay={430} aria-hidden="true">
            <picture>
              <source media={PHONE} srcSet="/assets/hero-union-phone.svg" />
              <source media={TABLET} srcSet="/assets/hero-union-tablet.svg" />
              <img src="/assets/hero-union.svg" alt="" />
            </picture>
          </Reveal>

          <h1 className="sr-title">De Anza Hacks</h1>

          {MARK.map((m) => (
            <Reveal
              key={m.cls}
              as="span"
              className={m.cls}
              variant="pop snap"
              delay={m.delay}
              aria-hidden="true"
            >
              {m.text}
            </Reveal>
          ))}
        </div>

        {/* 5.0 starburst */}
        <Reveal className="hero__burst" variant="pop snap" delay={760} sway="slow" settle={0}>
          <div>
            <img src="/assets/hero-card.png" alt="" />
          </div>
        </Reveal>

        <Reveal className="hero__ver" variant="pop snap" delay={830} aria-hidden="true">
          <p>
            5<span className="dot">.</span>0
          </p>
        </Reveal>
      </div>
    </section>
  )
}
