import { useEffect, useRef, useState } from 'react'

/**
 * One IntersectionObserver for the whole page instead of one per element --
 * there are ~60 revealed pieces across the four sections and a per-element
 * observer each is wasteful.
 */
let sharedObserver = null

/* The observer only knows about DOM nodes, so each observed element keeps a
   pointer back to the hook instance that owns it. */
const onLand = new WeakMap()

function getObserver() {
  if (sharedObserver) return sharedObserver

  sharedObserver = new IntersectionObserver(
    (entries, obs) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue
        obs.unobserve(entry.target)
        onLand.get(entry.target)?.()
      }
    },
    {
      // Fire a little before the piece is fully on screen so the stagger has
      // room to play out rather than resolving after the user has scrolled by.
      rootMargin: '0px 0px -10% 0px',
      // Must be 0, not a ratio. Several collage layers are deliberately far
      // larger than the viewport (the About tree layer is 3923x6976), so the
      // viewport can only ever cover a few percent of them -- any non-zero
      // threshold is unreachable and they never reveal at all.
      threshold: 0,
    }
  )

  return sharedObserver
}

/**
 * Attach to any element to have it reveal on scroll.
 *
 * Returns [ref, landed, swayReady]. The two flags are React state, NOT classes
 * poked onto the node: anything whose className prop can change (the FAQ items
 * gain `is-open`) would otherwise have the reveal class overwritten by the next
 * render and vanish back to opacity 0.
 */
export function useReveal(sway = false) {
  const ref = useRef(null)
  const [landed, setLanded] = useState(false)
  const [swayReady, setSwayReady] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    let done = false
    let timer

    const land = () => {
      if (done) return
      setLanded(true)

      // The idle sway animation writes to `transform`, which would fight the
      // reveal. Only arm it once the piece has actually finished landing.
      if (!sway) return
      const arm = () => !done && setSwayReady(true)
      el.addEventListener('transitionend', arm, { once: true })
      el.addEventListener('animationend', arm, { once: true })
      // Fallback: if the piece was already on screen at mount the transition
      // may never fire, so don't leave the sway permanently disabled.
      timer = setTimeout(arm, 1600)
    }

    // No IntersectionObserver (or a very old browser): show everything.
    if (typeof IntersectionObserver === 'undefined') {
      land()
      return
    }

    onLand.set(el, land)
    const obs = getObserver()
    obs.observe(el)

    return () => {
      done = true
      clearTimeout(timer)
      onLand.delete(el)
      obs.unobserve(el)
    }
  }, [sway])

  return [ref, landed, swayReady]
}

const VARIANTS = new Set(['drop', 'left', 'right', 'pop', 'sheet', 'flip', 'snap'])

/**
 * <Reveal variant="drop snap" delay={120} settle={4.86}>
 *
 * `settle` is the element's resting rotation in degrees, taken from the Figma
 * design. It must be passed for any rotated piece, otherwise the reveal lands
 * it flat at 0deg and the collage loses its hand-placed feel.
 */
export function Reveal({
  as: Tag = 'div',
  variant = '',
  delay = 0,
  settle = 0,
  duration,
  sway = false,
  className = '',
  style,
  children,
  ...rest
}) {
  const [ref, landed, swayReady] = useReveal(Boolean(sway))

  const variantClasses = variant
    .split(/\s+/)
    .filter((v) => VARIANTS.has(v))
    .map((v) => `rv--${v}`)
    .join(' ')

  const swayClass = sway === 'slow' ? 'sway sway--slow' : sway ? 'sway' : ''

  return (
    <Tag
      ref={ref}
      className={[
        'rv',
        variantClasses,
        swayClass,
        landed && 'is-in',
        swayReady && 'sway-ready',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
      style={{
        '--rv-delay': `${delay}ms`,
        '--rv-settle': `${settle}deg`,
        ...(duration ? { '--rv-dur': `${duration}ms` } : null),
        ...style,
      }}
      {...rest}
    >
      {children}
    </Tag>
  )
}

export default Reveal
