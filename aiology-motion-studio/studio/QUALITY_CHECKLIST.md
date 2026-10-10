# Quality review

Render → inspect actual frames and playback → identify concrete issues → fix → re-render affected frames and final export.

Record review evidence under episodes/<slug>/review: frame/time, observed problem, expected behavior, fix, and verification. Do not use fabricated numeric quality scores.

- Educational accuracy: every claim sourced when needed; diagrams distinguish analogy from mechanism; data labels/units correct.
- Arabic: joined glyphs, correct RTL punctuation/order, isolated English terms, no clipped descenders or overlapping words.
- Readability: phone-size check; essential text >=40 px at 1080 width, captions normally 52 px, line breaks and display time comfortable.
- Layout: consistent hierarchy, white background, house palette, safe margins, no diagram/caption collisions.
- Premium finish: one clear hero per shot, depth and shadow consistent with BRAND.md materials, transitions that overlap without ghosting, sound cues landing on the visual event.
- Motion: deterministic, controlled, each action explains something, sufficient holds, no accidental jumps at cuts.
- Timing: speech onset and important actions aligned; no missing first/final words; captions cover spoken content.
- Accessibility: meaning communicated through labels/shapes as well as color; strong text contrast; avoid flashing and unnecessary camera motion.
- Audio: voice intelligible, music/SFX subordinate, licenses recorded, measured loudness/peak and listening check.
- Technical: npm check passes, matching Remotion versions, all assets local/available, MP4 decodes, H.264/AAC, 1080×1920 at 30 FPS.

Inspect opening, midpoint, end, each scene boundary, longest Arabic cue, densest diagram, and every changed element. Scrub transitions, then play the whole video. Still frames cannot establish audio synchronization or motion quality.

Classify findings: defect (accuracy, clipping, collision, missing asset, sync, decode) requires correction; preference (which acceptable accent or restrained motion feels better) is optional unless the creator specifies it. Escalate unresolved factual uncertainty or missing narration with a concrete question.
