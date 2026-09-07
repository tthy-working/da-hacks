import Reveal from './Reveal'
import { APPLY_URL, CONTACT_EMAIL } from '../config'

export default function Apply() {
  return (
    <>
      <section className="apply" id="apply" aria-labelledby="apply-title">
        <Reveal as="h2" variant="drop snap" delay={0} id="apply-title">
          Come build with us
        </Reveal>

        <Reveal as="p" variant="up" delay={90}>
          De Anza Hacks 5.0 runs Oct. 16-17, 2026 on campus in Cupertino. Applications are
          free, and every experience level is welcome.
        </Reveal>

        <Reveal variant="pop snap" delay={170} settle={0}>
          <a
            className="apply__btn"
            href={APPLY_URL}
            target="_blank"
            rel="noopener noreferrer"
          >
            Apply now!
          </a>
        </Reveal>
      </section>

      <footer className="footer">
        <p>
          De Anza Hacks 5.0 &middot; De Anza College, Cupertino CA &middot;{' '}
          <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>
        </p>
      </footer>
    </>
  )
}
