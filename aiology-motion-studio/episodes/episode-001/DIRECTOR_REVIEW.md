# Episode 001 — director-cut review

Reviewed on the creator's local Windows machine on 2026-10-10. Recommended deliverable: `output/episode-001/aiology-episode-001-director-v5.mp4`. Previous exports and compositions are preserved. This remains a silent trial, authorized without the creator's recording.

## Result and direction

The revision replaces repeated card entrances with sequential letter writing, translation, image classification, visible information paths through an AI model, labeled examples moving into a training diagram, a separate new image after training, an RTL chat response, a drawn caution symbol, and a closing transformation from nested concepts into the brand mark. Motion uses local frame math, SVG, and Cairo fonts; no new dependencies or generated narration were added.

Five director-cut exports were rendered and inspected. Evidence folders beneath `output/episode-001/` are `director-review-a`, `director-review-b`, `director-review-c`, `director-review-final`, and `director-review-delivery`. These contain real decoded frames and contact sheets, not design mockups.

## Concrete corrections

| Review | Observation | Correction and verification |
| --- | --- | --- |
| A / v1 | Paper drawing obscured by its background layer; signal arcs bypassed the core; training diagram was weighted to the right. | Corrected stacking and curve geometry; centered the training group. Inspected affected decoded frames in B. |
| A / v1 | Hook-to-AI cut discarded its focal object; closing shapes did not relate to the brand. | Added an AI carrier across the cut and a nested-shape contraction into the wordmark. Checked frames 198–240 and the end. |
| B / v2 | New-image label collided with the query card; AI handoff looked washed out around frame 239; training detail was too small. | Raised the label from y760 to y710, ending at y838 before the card at y854; made the underlying core opaque before overlay removal; enlarged the training group. Verified C frames and Studio geometry. |
| C / v3 | Phase badge needed centering; sixth example arrived too late for a complete-grid hold; inference activations preceded signal arrival. | Centered the badge; advanced example entries; moved inference activation after signal arrival and before the result. Inspected v4 timings and actual playback. |
| Final / v4 | Rotated example cards had insufficient vertical clearance around frame 640. | Increased row spacing from 255 to 285px. Inspected full-resolution v5 frame 640 and the final contact sheet. |

The v5 delivery set has 26 decoded frames at 40, 128, 209, 215, 238, 239, 240, 539, 540, 640, 665, 755, 840, 918, 938, 960, 1005, 1019, 1020, 1155, 1310, 1379, 1380, 1430, 1496, and 1559. They cover scene boundaries, the carrier transition, training and inference states, chat, caution, nested concepts, and the stable final mark. Full-resolution example spacing was checked separately from the contact sheet.

## Executed checks

- Final `./studio.ps1 check`: TypeScript, ESLint, and all 13 tests passed. Tests include exact script preservation, contiguous caption and scene intervals, recorded-voice guards, and explicit provisional metadata.
- `verify` passed local runtime/tool checks, Remotion 4.0.534 package alignment, official and custom skill paths, and local Cairo font availability.
- Draft episode validation passed with `--draft`. Narrated production validation correctly rejects missing voiceover; this guard was not weakened. The production manifest remains draft, with the silent trial defined separately.
- All 20 caption cues were sought in Studio and measured: 804px available width, 50px font, 78px single-line or 155px two-line height. No horizontal overflow was observed. Longest caption ends at y1564, within the essential layout limit of y1580. Rendered Arabic shaping and mixed English terms were inspected.
- Remotion rendered all 1,560 final frames. `export:check ... --silent-preview` passed, including complete FFmpeg decoding.
- FFprobe confirms H.264, yuv420p, 1080×1920, 30/1 FPS, 52.000 seconds, and no audio stream. Final file size: 1,989,120 bytes. Adjacent probe JSON records the export metadata.
- Actual MP4 playback was checked for review versions and the final v5. Final playback reached currentTime 52, duration 52, ended true, error null. Its ending visibly retained the AIOLOGY wordmark and white layout.

## Boundaries and aesthetic decisions

The illustration explains training conceptually; the network is labeled as a simplified model and does not imply that all machine learning uses neural networks. The chat reply is authored illustrative content. No measured confidence, performance claim, or quality score is shown.

The large white margins, restrained object shadows, pace, and color allocation are directing choices. Overlaps, incorrect signal order, obscured objects, and unreadable text were treated as concrete defects and corrected. Aesthetic acceptance belongs to the creator.

The 52-second timings and captions are editorial reading cues, not measured narration alignment. The narrated release must be retimed to the actual recording, reviewed with sound, and checked against the intended platform overlays. No voice, music, or sound effects are present in this trial.
