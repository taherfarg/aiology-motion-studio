# AIOLOGY Motion Studio

Reusable educational animation studio for Egyptian Arabic AI explainers. Episode 001 has a reviewed silent trial; its narrated production remains draft until the creator supplies their recording.

## Episode 001 preview

Start Studio with `./studio.ps1 dev`, then open `Episode001DirectorCut`. The reviewed 52-second export is `output/episode-001/aiology-episode-001-director-v5.mp4`. It preserves the supplied script and uses provisional reading cues. See `episodes/episode-001/PREVIEW_NOTES.md` and `DIRECTOR_REVIEW.md` for playback, revisions, and later voiceover synchronization.

Use `./studio.ps1 render:episode-001-director` to reproduce the cut. Existing output is preserved; choose a new output filename for another render. `./studio.ps1 export:check output/episode-001/aiology-episode-001-director-v5.mp4 --silent-preview` checks this silent deliverable.

## Episode 001 premium cut (v6)

`Episode001Premium` is the same 52-second script and caption timing, re-directed with the premium kit and generated sound design. Export with `./studio.ps1 render:episode-001-premium` (writes `output/episode-001/aiology-episode-001-premium-v6.mp4`; choose a new filename to re-render). A reviewed copy is `examples/episode-001/aiology-episode-001-premium-v6.mp4`. Review: `episodes/episode-001/PREMIUM_REVIEW.md`. Regenerate the effects and music bed with `./studio.ps1 sound:generate`.

## Start

Open PowerShell 7 in this directory:

    ./studio.ps1 dev

Open the URL printed by Remotion (normally http://localhost:3000). The launcher selects checksum-verified Node 24.21.0 at %LOCALAPPDATA%/AIOLOGY/runtime. It changes PATH only for the process. Direct npm commands also work on a compatible Node >=22.20.0.

## Future episodes

    ./studio.ps1 episode:new topic-slug
    ./studio.ps1 episode:validate topic-slug --draft

Add the Egyptian Arabic script and original recorded voiceover in the new folder. Probe its duration, listen, fill director-brief.md/storyboard.md, and author episode.json objectives, continuous scenes, and checked phrase captions. Set status to ready only after review.

    ./studio.ps1 episode:validate topic-slug
    ./studio.ps1 episode:preview topic-slug
    ./studio.ps1 check
    ./studio.ps1 episode:render topic-slug

preview/prepare/render copy referenced audio to public/episodes and generate input props in output/props. Render outputs have unique timestamps and adjacent FFprobe metadata. Schema/asset checks cannot establish educational accuracy or spoken synchronization; inspect and listen using studio/QUALITY_CHECKLIST.md.

## Verify and reproduce

    ./studio.ps1 check
    ./studio.ps1 verify
    ./studio.ps1 skills:verify
    ./studio.ps1 export:check
    ./studio.ps1 render:test

The six-second TechnicalCheck validates Arabic, motion components, diagrams, H.264 and silent AAC. It does not contain narration or lesson content. The render refuses to overwrite an existing output; choose another path for a new test.

For a fresh checkout, use Node >=22.20.0, npm ci (preserves the lockfile), and npx remotion browser ensure. Install FFmpeg/FFprobe and Git if absent. Fonts are already local and licensed. Do not run npm update indiscriminately. @remotion package versions must match; use npx remotion add for new Remotion packages.

## Architecture

- src/kit: premium layer (clay materials, camera and parallax, kinetic type, caption pill, transitions, sound). Import from `src/kit`. See studio/BRAND.md (materials) and studio/MOTION_RULES.md (kit).
- src/components: Arabic typography, mixed terms, captions, cards, icons, arrows, geometry/progress.
- src/animations: reusable frame-based entrances, stagger, transition, transform, camera grouping.
- src/diagrams: SVG nodes/edges, networks, data flow, process and comparison layouts.
- src/scenes: configurable episode scene registry.
- src/compositions: Episode pipeline and disposable TechnicalCheck.
- src/themes and src/utils: palette/safe zones, local fonts, timing, episode schema.
- templates: empty episode metadata template. episodes: creator content and review evidence.
- studio: brand, directing, timing, audio, QA, export standards.
- scripts: episode creation/validation/preparation/preview/render, environment checks, skill installer.
- .agents/skills/aiology-motion-studio: canonical production skill and its locator/reference.

Import reusable components from src/components/index.ts. Motion timing is in frames; episode/caption timing is in milliseconds. SVG AnimatedNode/ConnectionLine require a parent svg. ArabicCaption displays whole short phrases; group token captions before using it. See studio/MOTION_RULES.md for the limits of the simple shape morph and scene entrance.

## Persistent skill

    ./studio.ps1 skill:install

User scope: C:/Users/U/.agents/skills/aiology-motion-studio is a directory junction to this project's canonical skill. No global copy can drift. Keep this folder in place. If relocating, inspect the existing junction before repointing it; the installer preserves a different existing destination.

Official Remotion skills are installed in C:/Users/U/.agents/skills. skills:verify starts a fresh, read-only Codex app-server and confirms discovery in project and user scope, saving output/skill-discovery.json. This check passed during setup. The current chat's initial skill catalog is fixed; start a new Codex chat (or restart Codex if the selector is stale), type $aiology-motion-studio, and confirm it is selectable. Also confirm remotion-create, remotion-markup, remotion-captions, and remotion-render. The skill can locate this studio from another project's chat.

No Fish Audio, narration generation, paid voice API, publishing, or social-account setup is included.

## Optional tools

Lucide icons are installed for semantic diagrams. Three.js/Fiber/@remotion/three and Lottie are deferred until a lesson needs true 3D or supplied Lottie assets. No animation library beyond Remotion is required for the starter.

Official sources: [Remotion skills](https://www.remotion.dev/docs/ai/skills), [Codex skill discovery](https://learn.chatgpt.com/docs/build-skills), [Remotion package alignment](https://www.remotion.dev/docs/cli/versions), [Node releases](https://nodejs.org/en/about/previous-releases). The project does not purchase any licenses; check Remotion's applicable license when team usage changes.
