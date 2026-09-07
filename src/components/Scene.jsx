import { useEffect, useRef, useState } from 'react'

import Hero from './Hero'
import About from './About'

/* Screen 1 smart-animating into screen 2, driven by scroll instead of drag.
   ---------------------------------------------------------------------------
   Figma matches the two frames' layers by name and tweens between them; the
   same five plates carry different boxes on each screen, so the tween is a
   real camera move -- most of all on layer 40, which goes from 560x966 to
   3809x6773 and turns the whole shot into a dive into the tree.

   The pin holds screen 1 in place while the spacer scrolls past underneath;
   `--p` is that progress, 0 to 1, and morph.css maps it onto each plate.

   It only runs where the design's geometry is actually in play: at 1200px and
   under, About reflows into a stacked column that is nothing like screen 2's
   composition, so there is no second frame to animate to. Reduced motion opts
   out for the obvious reason. In both cases the markup renders exactly as it
   did before -- two ordinary sections, no pin. */

const LIVE = '(min-width: 1201px) and (prefers-reduced-motion: no-preference)'

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
      el.classList.remove('is-past')
      return
    }

    let frame = 0

    const update = () => {
      frame = 0
      const spacer = el.querySelector('.scene__spacer')
      const distance = spacer ? spacer.offsetHeight : 0
      if (!distance) return

      // How far the scene's top has travelled above the viewport.
      const travelled = Math.min(Math.max(-el.getBoundingClientRect().top, 0), distance)

      // Land the morph before the pin releases, so screen 2 gets a beat of
      // stillness to be read rather than arriving and leaving in one motion.
      const raw = Math.min(travelled / (distance * 0.72), 1)

      // Figma's ease-out, as a curve on the scroll rather than on a clock.
      const p = 1 - (1 - raw) * (1 - raw)

      el.style.setProperty('--p', p.toFixed(4))
      el.classList.toggle('is-past', p > 0.5)
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
      <div className="scene__pin">
        <Hero />
        <About />
      </div>
      <div className="scene__spacer" aria-hidden="true" />
    </div>
  )
}
