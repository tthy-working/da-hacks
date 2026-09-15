/**
 * Which of the three Figma frames the page is laying out.
 *
 * The file draws every screen three times -- laptop 1440 wide, iPad 768x1024,
 * iPhone 393x852 -- and those are compositions, not one layout at three
 * widths: the wordmark is re-set, the plates are re-cropped, the sponsor ask
 * moves under its button. So the page picks a frame by the SHAPE of the
 * screen and scales that frame to fit, rather than bending one frame across
 * every width.
 *
 *   phone    up to 640px wide, any orientation
 *   tablet   wider than that, held portrait
 *   laptop   wider than that, held landscape  (the unqueried CSS)
 *
 * These strings are the single source for the JS side (<picture> sources,
 * the scroll scene). CSS cannot import them: src/styles/portrait.css repeats
 * the same two queries, so change both together.
 */
export const PHONE = '(max-width: 640px)'
export const TABLET = '(min-width: 641px) and (orientation: portrait)'
export const LAPTOP = '(min-width: 641px) and (orientation: landscape)'
