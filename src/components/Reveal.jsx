import { useEffect, useRef } from 'react'

/**
 * One IntersectionObserver for the whole page instead of one per element --
 * there are ~60 revealed pieces across the four sections and a per-element
 * observer each is wasteful.
 */
let sharedObserver = null

function land(el) {
  el.classList.add('is-in')

  // The idle sway animation writes to `transform`, which would fight the
  // reveal. Only arm it once the piece has actually finished landing.
  if (el.classList.contains('sway')) {
    const arm = () => el.classList.add('sway-ready')
    el.addEventListener('transitionend', arm, { once: true })
    el.addEventListener('animationend', arm, { once: true })
    // Fallback: if the piece was already on screen at mount the transition
    // may never fire, so don't leave the sway permanently disabled.
    setTimeout(arm, 1600)
  }
}

function getObserver() {
  if (sharedObserver) return sharedObserver

  sharedObserver = new IntersectionObserver(
    (entries, obs) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue
        land(entry.target)
        obs.unobserve(entry.target)
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
 * Returns a ref -- use when you need the raw element (e.g. an <img>).
 */
export function useReveal() {
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    // No IntersectionObserver (or a very old browser): show everything.
    if (typeof IntersectionObserver === 'undefined') {
      land(el)
      return
    }

    const obs = getObserver()
    obs.observe(el)
    return () => obs.unobserve(el)
  }, [])

  return ref
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
  const ref = useReveal()

  const variantClasses = variant
    .split(/\s+/)
    .filter((v) => VARIANTS.has(v))
    .map((v) => `rv--${v}`)
    .join(' ')

  const swayClass = sway === 'slow' ? 'sway sway--slow' : sway ? 'sway' : ''

  return (
    <Tag
      ref={ref}
      className={['rv', variantClasses, swayClass, className].filter(Boolean).join(' ')}
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
