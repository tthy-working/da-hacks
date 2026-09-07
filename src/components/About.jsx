import Reveal from './Reveal'

const LAYERS = [
  { cls: 'about__l36', src: 'layer-36.png', delay: 0 },
  { cls: 'about__l39', src: 'layer-39.png', delay: 60, crop: true },
  { cls: 'about__l38', src: 'layer-38.png', delay: 120, crop: true },
  { cls: 'about__l37', src: 'layer-37.png', delay: 180, inner: true },
  { cls: 'about__l40', src: 'layer-40.png', delay: 240, inner: true },
]

export default function About() {
  return (
    <section className="section about" id="about" aria-labelledby="about-title">
      <div className="about__stage">
        <div className="scenery about__scenery" aria-hidden="true">
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
        </div>

        <Reveal className="about__title" variant="left snap" delay={300}>
          <p className="wordmark wordmark--about" id="about-title">
            About
          </p>
        </Reveal>

        {/* The design breaks these six lines by hand -- that hand-set rag is
            what gives the block its taper against the bridge tower, and no
            column width reproduces it by wrapping. The breaks are carried
            explicitly and switched off under 1200px (see about.css), where the
            copy reflows into a normal column.

            The {' '} before each break is load-bearing: with the <br> hidden
            the two text nodes butt together, and without it the copy reads
            "De Anza Collegewhere". A trailing space at a line break collapses
            away on desktop, so it costs nothing there. */}
        <div className="about__copy">
          <Reveal as="p" variant="up" delay={400}>
            <strong>DA Hacks</strong> is an annual weekend-long hackathon at De Anza College{' '}
            <br />
            where students from every background come together to{' '}
            <br />
            turn big ideas into working tech projects.
          </Reveal>

          <Reveal as="p" variant="up" delay={470}>
            Over two days, hackers build from scratch, learn new{' '}
            <br />
            skills, find teammates, and share what they create{' '}
            <br />
            with the community.
          </Reveal>
        </div>

        <Reveal className="about__date" variant="right snap" delay={520}>
          <div>
            <p>Oct. 16-17, 2026</p>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
