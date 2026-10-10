# Episode 001 — premium cut review (v6)

Reviewed on 2026-10-10. Deliverable: `output/episode-001/aiology-episode-001-premium-v6.mp4` (also checked in under `examples/episode-001/`). It is still a trial authorized without the creator's recording: it has generated sound design (effects and a music bed) but no narration. Earlier exports, including the draft render `aiology-episode-001-premium-v6-draft1.mp4`, are preserved.

## What changed from v5

Composition `Episode001Premium` is built on the new studio kit (`src/kit`): clay materials with layered shadows, a slow camera with parallax layers and perspective tilt, whole-word kinetic Arabic type, overlapping `TransitionSeries` cuts, a soft caption pill, and an event-anchored sound plan. The hook and AI scene are one continuous shot so the AI cube carries across the cut. Script text, scene boundaries and caption cues are unchanged from `silent-preview.json`.

## Concrete corrections

| Review | Observation | Correction and verification |
| --- | --- | --- |
| Stills A | Hook title wrapped onto the backdrop card; hero zone sat high with the lower third empty. | Title 84 px on one line; larger hero objects; a +80 px camera offset on every scene. Re-rendered and inspected. |
| Stills A | "Machine Learning" title wrapped over its subtitle. | Title 84 px, subtitle moved; re-inspected frames 620-660. |
| Stills A | AI scene stack was cramped, and the task chip covered the "AI" letters. | Re-spaced the stack; the chip now enters at the cube's top edge and fades; checked frames 345 and 440. |
| Stills A | New-image label wrapped and was clipped by a network node. | Narrowed and moved the label; checked in MP4 frame 1010. |
| Stills A | Coral diagonal stroke cut through the ≠ sign; chat panel was half empty. | Removed the stroke (≠ is now coral); added a chat input bar; checked frames 1100-1370. |
| MP4 frame 215 | The rising AI cube collided with the "طب إزاي؟" title at the hook-to-AI handoff. | Title now clears by frame 206; checked frames 190-236. |
| MP4 frame 440 | Two-line title sat tight on the human pill. | Title raised 26 px; checked frame 440. |

## Executed checks

- `npm run check`: TypeScript, ESLint and all 16 tests pass (3 new: transition timing, sound-plan bounds, generated audio lengths).
- Remotion rendered all 1,560 frames; `export:check` passed including a full FFmpeg decode.
- FFprobe: H.264, yuv420p, 1080×1920, 30/1 FPS, 52.000 s video; AAC, 48 kHz stereo. File size 7,587,834 bytes.
- Loudness of the actual MP4 (EBU R128): -21.9 LUFS integrated, LRA 4.4 LU, true peak -5.7 dBFS. No clipping. The music bed alone is about -26 LUFS at the plan's 0.24 gain.
- Decoded frames were extracted from the final MP4 at scene boundaries, both handoffs, training and inference states, chat, caution, comparison and the closing mark. The 26-frame contact sheet is `examples/episode-001/contact-sheet-premium.png`.

## Boundaries

- The sound design was measured, not listened to. The creator must play the export with sound before relying on it, and may replace the bundled bed with licensed music.
- The MP4 was not played back in a media player in this review. Decoded frames and metadata are verified; smooth playback and audio-visual feel are not.
- Aesthetic acceptance belongs to the creator. Timings remain provisional reading cues; the narrated release must be retimed to the recording, with sound cues moved to match.
- Platform overlays are not checked; keep to the conservative safe zones in `studio/MOTION_RULES.md`.
