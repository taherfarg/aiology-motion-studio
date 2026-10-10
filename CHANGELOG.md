# Changes

## v1.1.0-studio-premium — 2026-10-10

- Premium 2.5D studio kit (`src/kit`): clay materials with layered shadows, camera and parallax layers, perspective tilt, whole-word kinetic Arabic type, a caption pill, overlapping `TransitionSeries` cuts, and a sound layer.
- Original generated sound design (`npm run sound:generate`): seven effects and a music bed from fixed-seed synthesis, no third-party material.
- Episode 001 v6 (`Episode001Premium`, `npm run render:episode-001-premium`): the same script and caption timing, re-directed with the kit and sound design. Reviewed MP4, probe, contact sheet and checksums are in `examples/episode-001/`; review notes in `episodes/episode-001/PREMIUM_REVIEW.md`.
- Added `@remotion/transitions` 4.0.534 (aligned with the other Remotion packages), three tests, and a CI check of the v6 example.
- Narration is still pending; production stays draft. The v5 director cut and all earlier exports are unchanged.

## v1.0.1-studio-preview — 2026-10-10

- Refresh the example checksum manifest after FFprobe regenerated its metadata for the bundled example path.
- Verify all bundled example checksums in CI before the MP4 decode check; the video itself is unchanged.

## v1.0.0-studio-preview — 2026-10-10

- Reusable Egyptian Arabic educational motion studio, pinned Remotion/React/TypeScript dependencies, local Cairo fonts, frame-based animation components, episode templates, validation and export helpers.
- Canonical AIOLOGY Codex skill with a guarded Windows user-level installer, directing/audio/RTL/QA references, and studio rules.
- Episode 001 script, storyboard and 52-second silent director cut, improved through five reviewed exports. Recorded narration remains pending; production stays draft.
- Reviewed MP4, decoded-frame contact sheet, metadata and checksums included as a reusable example.
- Repository-level quick start, new-machine reuse guide, and GitHub Actions verification workflow.

Historical setup and visual review reports remain available; generated dependencies and local build/render caches are excluded.
