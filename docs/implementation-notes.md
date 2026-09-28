# Implementation notes

Engineering notes for the DA Hacks 5.0 site: how the motion and responsive layout work, where the build deliberately differs from the Figma file, and what still needs attention before launch. For setup and an overview, see the [README](../README.md).

## Motion

`Reveal` lays each element onto the page like a cut-paper piece: it starts
offset and slightly off-angle, overshoots, and settles. Knobs are CSS custom
properties (`--rv-x/y/rot/scale/settle/dur/delay`) documented at the top of
`styles/reveal.css`.

- ~380-460ms per piece, ~60-70ms stagger. Faster than real stop-motion paper
  on purpose -- the whole hero lands in about 1.2s.
- `variant="snap"` swaps the transition for a keyframed double-overshoot, used
  on the hero cut-outs and the wordmark letters.
- The observer uses `threshold: 0`, and must. Several collage layers are
  deliberately far larger than the viewport (the About tree layer is
  3923x6976 rendered), so the viewport can only ever cover a few percent of
  them -- any ratio threshold is unreachable and those layers never reveal.
- `settle` **must** be passed for any element that is rotated in the design,
  or the reveal lands it flat at 0deg and the collage loses its hand-placed
  feel.
- `sway` adds a slow idle drift, armed only after the piece has landed.
- `prefers-reduced-motion: reduce` disables all of it -- everything is simply
  present, no movement.

## Responsive

The Figma file draws every screen three times: laptop (1440 wide), iPad
(768x1024) and iPhone (393x852). Those are separate compositions, not one
layout at three widths -- the wordmark is re-set, the plates are re-cropped,
the sponsor ask moves under its button -- so the page picks a frame by the
**shape** of the screen and scales that frame to fit.

| Frame | Used when | Laid out in |
|---|---|---|
| Phone, 393x852 | up to 640px wide, any orientation | `styles/portrait.css` |
| Tablet, 768x1024 | wider than 640px, held portrait | `styles/portrait.css` |
| Laptop, 1440 wide | wider than 640px, held landscape | each section's own stylesheet |

The nav collapses to a burger at 1040px and below.

- The media queries live in `src/breakpoints.js` for the JS side (`<picture>`
  sources, the scroll scene). CSS can't import them, so `styles/portrait.css`
  repeats the same two queries -- **change both together**.
- On the laptop frame, each section is an aspect-locked stage
  (`aspect-ratio: 1440/845` or `1440/832`), so every layer can use the
  design's own percentages and the whole collage scales as one piece.
- On phone and tablet, every figure is the Figma frame's own number, scaled
  by one unit, `--u` (one design pixel, the smaller of stage width / frame
  width and stage height / frame height). The frame is fitted inside the
  screen, centred, and stood on its bottom edge; any leftover room is filled
  by the plates and the stretched paper backdrop.

## Scroll scene

On the laptop frame, screen 1 smart-animates into screen 2, and screen 2 into
screen 3, driven by scroll instead of a Figma drag (`src/components/Scene.jsx`,
`styles/morph.css`).

- Figma matches the frames' layers by name and tweens between them. The same
  plates carry different boxes on each screen, so the tween is a real camera
  move -- most of all layer 40, which grows from 560x966 to 3809x6773 and
  turns the shot into a dive into the tree.
- A pinned frame holds still while a spacer scrolls past underneath. `--p`
  carries screen 1 into screen 2, then `--q` carries screen 2 into screen 3.
  The second leg pans rather than dives: screens 2 and 3 share only plates 36
  and 39, and both travel left.
- It runs only on the laptop frame (the morph offsets are read off the laptop
  set) and only without `prefers-reduced-motion`. Elsewhere the three screens
  stand as ordinary sections.

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

**A note on `about__l40` (the tree/cliff layer):**
Its two coordinate sources disagree -- node metadata puts it entirely
off-stage (`x=1833` on a 1440 frame) while the design context puts it at
`-137%` and container-sized. The design context is the correct one: sized with
`h:100cqw / w:100cqh` and rotated 90deg, the source's left edge (tree canopy)
lands along the top, which is exactly what produces the foliage in both top
corners and the cactus at bottom-left. The box works out to 3809x6773, which
looks like a mistake but is not. Do not "simplify" it.

**Not in the design -- confirm before launch:**
- `src/data/faq.js` -- there is no FAQ screen in the design, but the nav links
  to `#faq`. The answers are reasonable defaults for a college hackathon.
- The Sponsors band shows a "Sponsors coming soon" card; the design reserves
  the band but ships no logos yet.
- `team@deanzahacks.com` is a guess (`CONTACT_EMAIL` in `src/config.js`).

`src/data/agenda.js` now holds the confirmed run of show from the organisers'
call sheet (attendee-facing rows only).

## Links

Both "Apply now!" buttons (nav + closing CTA) point at `APPLY_URL` in
`src/config.js` -- currently the Luma page
<https://luma.com/6p4w9p21> -- and open in a new tab. Change it in one place.

## FAQ accordion

Answers animate `grid-template-rows: 0fr <-> 1fr`, not a guessed
`max-height`, so long answers don't clip. The easing is deliberately
**symmetric** (`cubic-bezier(.4,0,.2,1)`): a front-loaded curve loses half the
height in the first 40ms, which reads as the answer vanishing rather than
shrinking closed.

## Known issues

- **Assets are 15 MB.** `agenda-grass.png` and `layer-40.png` are ~3.7 MB
  each. Convert to WebP/AVIF and add `loading="lazy"` on the below-fold
  layers before this goes live.
- The four nav brush strokes are ~110 KB SVGs each because they embed raster
  data. Re-exporting as PNG would likely be smaller.
- Fonts (Irish Grover, Space Mono) load from Google Fonts; self-host them if
  you want to drop the third-party request.
