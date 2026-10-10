# Export and performance standards

Default social export: portrait 9:16, 1080×1920, 30 FPS, MP4, H.264, AAC, yuv420p, CRF 18 (adjust 16–23 when needed; the premium cut uses CRF 16). Use local media and fonts; retain source license records. Render duration is ceil(voiceover duration × fps); at most one frame of audio-tail padding.

Use npm run episode:render -- <slug>; it validates the manifest, probes and decodes audio, prepares local public assets, renders to a unique timestamped output, decodes the MP4, and checks codecs/dimensions/fps. Existing exports are not overwritten. FFprobe JSON is saved beside the export.

The test command npm run render:test produces a six-second technical fixture with Arabic text, reusable shapes/diagrams, and silent AAC audio. It is not an episode, and does not verify narrated mixing.

Inspect representative frames plus full playback. For named rendered frames use:

    npx remotion still src/index.ts TechnicalCheck output/frame-90.png --frame=90
    ffprobe -v error -show_format -show_streams -of json output/technical-check.mp4
    ffmpeg -v error -i output/technical-check.mp4 -f null -

Default rendering concurrency is Remotion's recommendation. If memory pressure occurs, lower concurrency before compromising resolution. Prefer SVG/CSS geometry, avoid many full-frame filters, cache immutable geometry, load only required font weights, and do not add 3D/Lottie dependencies for decoration. Keep all @remotion packages on exactly the same version; add them with npx remotion add and update intentionally with the lockfile.

Deliver export plus script, storyboard, caption JSON, sources, and review notes. Do not publish or connect social accounts. The creator controls publishing.
