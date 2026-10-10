# Motion rules

All motion derives from useCurrentFrame(), interpolate(), or Remotion spring(). No CSS animation, timers, uncontrolled randomness, Date.now(), or browser-time motion in compositions. Deterministic procedural variation uses a fixed seed.

At 30 FPS, start with 18–24 frames for entrances, 8–12 frames between staggered items, 10–15 frames for a restrained scene entrance. Use cubic-bezier(0.22,1,0.36,1); use linear motion for signals representing constant-speed flow. Defaults are starting points; adjust them to the recorded spoken cue.

Keep entrances within 24–40 px and scale changes subtle. Avoid repeated bouncing, loops without meaning, camera wobble, and simultaneous unrelated motion. Build diagrams progressively in the order the narration explains them. Hold the complete result long enough to read it. Do not imply literal biological or mathematical behavior through decorative pulses.

Scene boundaries follow voiceover meaning and breathing pauses, usually a few seconds each. Let complex diagrams remain longer; never cut merely to meet an arbitrary beat. Crossfades must account for timeline overlap; the legacy SceneTransition is an entrance wrapper and does not subtract scene durations. For overlapping cuts use `TransitionSeries` with `sceneDurations()` and the kit `lift()` presentation (`src/kit/transitions.tsx`): each scene is authored in local frames starting on its cut point, runs `TRANSITION_FRAMES` into the next scene, and the overlap is subtracted again, so cuts still land on the narration cue. Scenes inside a `TransitionSeries` must not paint their own white background.

Direct each cue around one dominant explanatory action. Give titles, graphics and captions distinct hierarchy. Examples should visibly become inputs, travel through the diagram, and produce a legible result. Establish the complete result before moving on. Use a recurring object or silhouette to connect related shots, with continuous position/scale/color at the handoff. Favor a meaningful transformation over repeatedly entering an identical outlined card. Review spacing after rotation and scale, and inspect adjacent frames at match cuts; flat frame arithmetic cannot establish visual continuity. The Episode 001 director revision in src/episodes/episode001/redesign is a worked example, not a mandatory template for every lesson.

Layout at 1080×1920: use x=96..900, top=180, essential content above y=1400, captions above the bottom 340 px. Reserve the rightmost 180 px for platform controls. These are conservative house zones, not guaranteed platform specifications; inspect current overlays before publishing. Keep diagram labels out of the caption area.

CameraMove transforms a group; it is not a 3D camera. ShapeTransformation interpolates rounded-square/circle geometry. True SVG path morphs need compatible topology and specific QA.

## Premium kit (`src/kit`)

`Camera` is a slow translate / push-in / tilt of a whole shot (use `from`/`to` poses, a few percent scale and under about 3 degrees of tilt). `Layer depth` gives parallax: negative depth lags the camera, positive leads it. `Tilt` gives hero objects perspective with a tiny frame-driven drift. `KText` reveals whole Arabic words with a rise-and-focus and an optional emphasis underline; it never splits words into letters. `CaptionPill` shows one checked phrase at a time inside the safe zone. All of it is frame-driven and deterministic. Keep one dominant explanatory action per cue; the kit supplies finish, not content.
