# Episode 001 — reviewed silent example

`aiology-episode-001-director-v5.mp4` is the 2026-10-10 reviewed cut: 52 seconds, 1080×1920, 30 FPS, H.264/yuv420p, no audio stream. It was rendered from `Episode001DirectorCut` and reviewed through five iterations.

`contact-sheet.png` shows actual decoded frames across the five scene groups. `aiology-episode-001-director-v5.mp4.probe.json` records the final FFprobe metadata. `SHA256SUMS.txt` verifies the bundled example files.

These are fixed handoff references. Render new revisions to `output/` with new filenames. Caption and scene timestamps remain provisional until the creator's recorded voiceover is supplied. Source plans and detailed review are in `../../episodes/episode-001/`.

## Premium v6 (with sound design)

`aiology-episode-001-premium-v6.mp4` is the premium 2.5D re-direction of the same script: 52 seconds, 1080×1920, 30 FPS, H.264/yuv420p, AAC 48 kHz stereo. It carries generated sound design (effects and a music bed, -21.9 LUFS integrated, -5.7 dBFS true peak) but no narration. `contact-sheet-premium.png` shows 26 decoded frames and `aiology-episode-001-premium-v6.mp4.probe.json` the FFprobe record. Review and limits: `../../episodes/episode-001/PREMIUM_REVIEW.md`. Verify with `npm run export:check -- examples/episode-001/aiology-episode-001-premium-v6.mp4` (normal audio mode, not `--silent-preview`).
