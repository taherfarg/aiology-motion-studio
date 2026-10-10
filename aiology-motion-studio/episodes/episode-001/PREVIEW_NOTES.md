# Episode 001 — silent trial

The creator explicitly requested the first video without their voice on 2026-10-09. This preview has no voice, music, sound effects, or generated narration.

`silent-preview.json` is a separate provisional 52-second timeline, based on the supplied script and storyboard reference. Its caption cues are editorial reading cues, not measured speech or word timestamps. `episode.json` remains draft; final production still requires the creator's recording.

The five groups are hook (0–7s), AI (7–18s), learning (18–34s), chat/caution (34–46s), and outro (46–52s). The caution group has more reading time than the reference screenshot. The script is preserved verbatim, including punctuation, across caption cues.

The recommended revision is `Episode001DirectorCut` at http://localhost:3000/Episode001DirectorCut. Individual redesigned scenes are in the DirectorCutScenes folder. Run `./studio.ps1 dev` to start Studio. `./studio.ps1 render:episode-001-director` is the reproducible export command; its output already exists, so select a new filename for another export.

Current reviewed export: `output/episode-001/aiology-episode-001-director-v5.mp4`, revised on 2026-10-10. The previous silent-v2 and all director-cut review exports are preserved. Review evidence and limitations are recorded in `DIRECTOR_REVIEW.md`; `QUALITY_REVIEW.md` describes the earlier trial. Existing exports are not overwritten. With the project's runtime selected, a future revision can use `npx remotion render src/index.ts Episode001DirectorCut output/episode-001/aiology-episode-001-director-v6.mp4 --codec=h264 --crf=18 --pixel-format=yuv420p`.

`captions.preview.ar.srt` provides the same provisional caption cues for editing. Regenerate it from the plan using `./studio.ps1 captions:episode-001-preview`. These cues are burned into the trial video; changes to captions or timing require a new render. The narrated version will need to be retimed to the recording rather than merely placing audio over the fixed 52 seconds.

When the voice arrives, preserve this preview and the original recording. Probe/listen to the recording, align phrases manually or using verified transcription, retime the scene sequences and caption cues, complete the production manifest, then render a new narrated export. Timing changes must use the same frame durations in the plan and composition.
