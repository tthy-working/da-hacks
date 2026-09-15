import { useEffect, useRef, useState } from 'react'

import Hero from './Hero'
import About from './About'
import Sponsors from './Sponsors'
import { LAPTOP } from '../breakpoints'

/* Screen 1 smart-animating into screen 2, driven by scroll instead of drag.
   ---------------------------------------------------------------------------
   Figma matches the two frames' layers by name and tweens between them; the
   same five plates carry different boxes on each screen, so the tween is a
   real camera move -- most of all on layer 40, which goes from 560x966 to
   3809x6773 and turns the whole shot into a dive into the tree.

   The pin holds a frame in place while a spacer scrolls past underneath, and
   there are two of those in a row: `--p` carries screen 1 into screen 2, then
   `--q` carries screen 2 into screen 3. morph.css maps each onto its plates.

   The second leg is a different move from the first. Screens 2 and 3 share
   only plates 36 and 39, and both travel LEFT -- the world sliding left is the
   camera panning right -- so where the first leg dives in, this one turns.

   It runs wherever the laptop frames are the ones on screen. The iPad and
   iPhone frames are separate compositions (see src/breakpoints.js), and the
   offsets in morph.css are read off the laptop set, so on those the three
   screens stand as ordinary sections. Reduced motion opts out for the obvious
   reason. */

const LIVE = `${LAPTOP} and (prefers-reduced-motion: no-preference)`

export default function Scene() {
  const ref = useRef(null)
  const [live, setLive] = useState(false)

  useEffect(() => {
    const mq = window.matchMedia(LIVE)
    const apply = () => setLive(mq.matches)
    apply()
    mq.addEventListener('change', apply)
    return () => mq.removeEventListener('change', apply)
  }, [])

  useEffect(() => {
    const el = ref.current
    if (!el) return

    if (!live) {
      el.style.removeProperty('--p')
      el.style.removeProperty('--q')
      el.classList.remove('is-past', 'is-past-two')
      return
    }

    let frame = 0

    // Figma's ease-out, as a curve on the scroll rather than on a clock. Each
    // leg lands at 72% of its spacer, so the frame it arrives at gets a beat
    // of stillness to be read instead of arriving and leaving in one motion.
    const leg = (travelled, from, distance) =>
      1 - (1 - Math.min(Math.max((travelled - from) / (distance * 0.72), 0), 1)) ** 2

    const update = () => {
      frame = 0
      const spacers = el.querySelectorAll('.scene__spacer')
      if (spacers.length < 2) return
      const d1 = spacers[0].offsetHeight
      const d2 = spacers[1].offsetHeight
      if (!d1 || !d2) return

      // How far the scene's top has travelled above the viewport.
      const travelled = Math.min(Math.max(-el.getBoundingClientRect().top, 0), d1 + d2)

      const p = leg(travelled, 0, d1)
      const q = leg(travelled, d1, d2)

      el.style.setProperty('--p', p.toFixed(4))
      el.style.setProperty('--q', q.toFixed(4))
      el.classList.toggle('is-past', p > 0.5)
      el.classList.toggle('is-past-two', q > 0.5)
    }

    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update)
    }

    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      cancelAnimationFrame(frame)
    }
  }, [live])

  return (
    <div className={`scene${live ? ' is-live' : ''}`} ref={ref}>
      {/* Anchors live out here, not on the sections. Inside the pin a section
          is sticky-positioned, so its document offset moves as you scroll and
          anything computed off it -- a negative scroll-margin, say -- lands
          somewhere different every time. The scene is in normal flow, so an
          offset measured from IT is stable: each marker sits at the end of
          its own leg, where that frame has finished arriving. */}
      {live && (
        <>
          <span className="scene__anchor" id="about" style={{ top: 'var(--scene-distance)' }} />
          <span
            className="scene__anchor"
            id="sponsors"
            style={{ top: 'calc(2 * var(--scene-distance))' }}
          />
        </>
      )}

      <div className="scene__pin">
        <Hero />
        {/* null, not undefined: a default parameter fills in for undefined,
            which would put the id back and leave two of each in the page */}
        <About anchorId={live ? null : 'about'} />
        <Sponsors anchorId={live ? null : 'sponsors'} />
      </div>
      <div className="scene__spacer" aria-hidden="true" />
      <div className="scene__spacer" aria-hidden="true" />
    </div>
  )
}
