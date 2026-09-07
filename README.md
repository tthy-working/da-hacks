# De Anza Hacks 5.0

Marketing site for DA Hacks 5.0 (Oct. 16-17, 2026), built from the
[De-Anza-Hacks Figma file](https://www.figma.com/design/m06i6VAe8Q2vMknIxLvqUc/De-Anza-Hacks).

Vite + React 19, plain CSS. No UI framework, no Tailwind.

```bash
npm install
npm run dev      # http://localhost:5173
npm run build
npm run preview
```

## Structure

```
src/
  components/
    Reveal.jsx      scroll-reveal primitive (one shared IntersectionObserver)
    NavBar.jsx      fixed nav, collapses to a burger under 860px
    Hero.jsx        Figma "screen 1"
    About.jsx       Figma "screen 2"
    Sponsors.jsx    Figma "screen 3"
    Agenda.jsx      Figma "screen 4"
    Faq.jsx         not in Figma -- see below
    Apply.jsx       not in Figma -- see below
  config.js         APPLY_URL + CONTACT_EMAIL
  data/
    agenda.js       PLACEHOLDER schedule
    faq.js          PLACEHOLDER questions
  styles/           one file per section + base.css, reveal.css
public/assets/      15 images exported from the Figma file
```

## Motion

`Reveal` lays each element onto the page like a cut-paper piece: it starts
offset and slightly off-angle, overshoots, and settles. Knobs are CSS custom
properties (`--rv-x/y/rot/scale/settle/dur/delay`) documented at the top of
`styles/reveal.css`.

- ~380-460ms per piece, ~60-70ms stagger. Faster than real stop-motion paper
  on purpose -- the whole hero lands in about 1.2s.
- `variant="snap"` swaps the transition for a keyframed double-overshoot, used
  on the hero cut-outs and the wordmark letters.
- `settle` **must** be passed for any element that is rotated in the design,
  or the reveal lands it flat at 0deg and the collage loses its hand-placed
  feel.
- `sway` adds a slow idle drift, armed only after the piece has landed.
- `prefers-reduced-motion: reduce` disables all of it -- everything is simply
  present, no movement.

## Responsive

Each designed section is an aspect-locked stage (`aspect-ratio: 1440/845` or
`1440/832`) so every layer can use the design's own percentages and the whole
collage scales as one piece. Under 760px the stages re-proportion, the photo
layers re-crop, and the absolutely positioned content falls back to flow
layout -- a 1.7:1 band is unreadable on a phone.

## Deviations from the Figma file

Fidelity was verified by screenshotting the build in headless Chrome and
diffing against Figma renders of each node.

**Fixed typos** (present in the design, corrected here):
- "an **anual** weekend-long hackathon" -> "annual"
- "**Interesting in sponsor?**" -> "Interested in sponsoring?"

**Rebuilt rather than transcribed:**
- The About body copy is six separately positioned single-line text nodes in
  Figma (`52:10`, `52:12`, `52:14`, `52:16`, `52:18`, `9:543`). Rebuilt as one
  flowing paragraph so it wraps, reflows and can be translated.
- The Agenda title is twelve text nodes in Figma -- a white set with a
  `#759da9` set laid 7px down-right. Rebuilt as six rotated letters with a
  hard offset `text-shadow`.
- Screen 4 also contains `Group 2` and `Group 3`, two identical letter sets
  offset by 7px. Only one set is reproduced.

**Approximated:**
- `about__l40` (the tree/cliff layer). The design's two coordinate sources
  disagree: node metadata puts it entirely off-stage (`x=1833` on a 1440
  frame) while the design-context inset puts it at `-137%` and container-sized,
  which magnifies the 1920x1080 source ~3.5x and leaves an unrecognisable
  sliver. Neither reproduces what the Figma render shows, so it is clipped and
  feathered to the top band to match the rendered intent. See the comment in
  `styles/about.css`.

**Invented -- needs real content before launch:**
- `src/data/agenda.js` -- the Figma file has no schedule, only the backdrop
  and title. Times are plausible placeholders.
- `src/data/faq.js` -- there is no FAQ screen in the design, but the nav links
  to `#faq`.
- The Sponsors logo wall is four empty slots; the design reserves the band but
  ships no logos.
- `team@deanzahacks.com` is a guess (`CONTACT_EMAIL` in `src/config.js`).

## Links

Both "Apply now!" buttons (nav + closing CTA) point at `APPLY_URL` in
`src/config.js` -- currently the Luma page
<https://luma.com/6p4w9p21> -- and open in a new tab. Change it in one place.

## Known issues

- **Assets are 15 MB.** `agenda-grass.png` and `layer-40.png` are ~3.7 MB
  each. Convert to WebP/AVIF and add `loading="lazy"` on the below-fold
  layers before this goes live.
- The four nav brush strokes are ~110 KB SVGs each because they embed raster
  data. Re-exporting as PNG would likely be smaller.
- Fonts (Irish Grover, Space Mono) load from Google Fonts; self-host them if
  you want to drop the third-party request.
