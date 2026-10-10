# Silent preview — review evidence

Historical review of the 2026-10-09 trial. The recommended 2026-10-10 revision and its evidence are in `DIRECTOR_REVIEW.md`.

Reviewed locally on 2026-10-09. Current deliverable: `output/episode-001/aiology-episode-001-silent-v2.mp4`.

## Executed checks

- TypeScript and ESLint passed. All 13 tests passed, including exact preservation of the supplied script, contiguous scene/caption intervals, and explicit silent/provisional metadata.
- Rendered all 1,560 frames with Remotion 4.0.534. FFprobe confirms 52.000 seconds, 1080×1920, 30/1 FPS, H.264, yuv420p, and no audio stream.
- FFmpeg fully decoded the export without errors; `export:check ... --silent-preview` passed. Default narrated exports still require AAC.
- Inspected real decoded frames across all five groups in v1. Extracted 17 v2 frames including transitions and the last frame; inspected the affected hook, question, chat, and final frames. Evidence is in `output/episode-001/review-v1` and `review-v2`.
- Verified Cairo Arabic shaping and isolated English terms in rendered frames. Measured animated Arabic word positions in Studio: their x-coordinates decrease in script order within a line, then wrap to the next RTL line.
- Opened the actual v2 MP4 in the local browser. Playback advanced through the file and reached 52 seconds with `ended: true`, `error: null`; last image retains the AIOLOGY mark. No audio was supplied, synthesized, or mixed.

## Defects fixed between v1 and v2

1. The classification card overlapped the translation card. Moved it lower and left; verified separation in the decoded hook frame.
2. Whole-word reveals inherited plaintext bidi inference, reversing atomic Arabic word boxes. Respect explicit paragraph direction with bidi isolation; verified the chat answer and hook question in actual frames and browser geometry.
3. The closing mark faded before the last frame. Disabled scene exit fade for the outro; verified the last decoded frame.

## Limits and preferences

Caption/scene timings are provisional reading cues, not audio alignment. The drawing represents learning conceptually, not a measured model or confidence score. The chat response is an authored illustration. Platform overlay zones should be checked again in the intended publishing app.

The sparse white layout, card arrangement, and color choices are aesthetic decisions; there is no fabricated quality score. Retiming to the creator's recording remains future production work.
