import Reveal from './Reveal'

const LAYERS = [
  { cls: 'about__l36', src: 'layer-36.png', delay: 0 },
  { cls: 'about__l39', src: 'layer-39.png', delay: 60, crop: true },
  { cls: 'about__l38', src: 'layer-38.png', delay: 120, crop: true },
  { cls: 'about__l37', src: 'layer-37.png', delay: 180, inner: true },
  { cls: 'about__l40', src: 'layer-40.png', delay: 240 },
]

export default function About() {
  return (
    <section className="section about" id="about" aria-labelledby="about-title">
      <div className="about__stage">
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

        <Reveal className="about__title" variant="left snap" delay={300}>
          <p className="wordmark wordmark--about" id="about-title">
            About
          </p>
        </Reveal>

        <Reveal as="p" className="about__copy" variant="up" delay={400}>
          <strong>DA Hacks</strong> is an annual weekend-long hackathon at De Anza College
          where students from every background come together to turn big ideas into working
          tech projects. Over two days, hackers build from scratch, learn new skills, find
          teammates, and share what they create with the community.
        </Reveal>

        <Reveal className="about__date" variant="right snap" delay={520}>
          <div>
            <p>Oct. 16-17, 2026</p>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
