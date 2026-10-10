# AIOLOGY visual identity

Teach one clear concept at a time in Egyptian Arabic, with English technical terms isolated in mixed text. Main background is always pure white (#FFFFFF).

| Role | Color |
| --- | --- |
| Emphasis / input | Coral #FF6B4A |
| Attention / highlighted word | Warm Yellow #F5BB42 |
| Output / success | Mint Green #47B78A |
| Intermediate / model | Lavender #A78BCE |
| Alternate category | Orange #F4A261 |
| Text / structure | Charcoal #252525 |
| Background | White #FFFFFF |

Choose one primary and one secondary accent per scene. Preserve category colors across the whole episode; use labels or shapes as well as color. Colored fills carry charcoal text because pastel/white combinations can have insufficient contrast. Do not encode failure only with red/green.

Use clean vector geometry, deliberate information flow, accurate diagrams, quiet kinetic typography, and data with units. Occasional 3D must clarify spatial structure and retain the white studio identity. Defer its dependencies until needed.

Avoid dark canvases, neon, cyberpunk, glowing brains, generic robots, HUD overlays, excessive gradients, and presentation-slide decoration.

Typography: self-hosted Cairo (SIL OFL, public/fonts/OFL-Cairo.txt), 400/600/700. Default title 72–80 px, body 44–52 px, captions 52 px at 1080 width. Essential text stays at least 40 px. Never shrink captions to force long sentences into the frame; split phrases. Use line height 1.5–1.6, whole-word animation, native Arabic shaping, dir=rtl, lang=ar. Isolate English terms with EnglishTerm/bdi; never reverse strings. Avoid tracking, letter splitting, and all-caps treatment of Arabic.

Use src/themes/brand.ts and shared components as the implementation source. Actual rendered frames decide readability; Cairo loading alone does not prove correct shaping or mixed ordering.
