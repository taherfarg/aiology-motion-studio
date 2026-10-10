# AIOLOGY MOTION STUDIO — SETUP REPORT

Historical report of the 2026-10-09 setup phase. Episode 001 was subsequently created as an explicitly authorized silent trial, then redesigned on 2026-10-10. See `episodes/episode-001/DIRECTOR_REVIEW.md` and the repository reuse guide for the current preview and handoff.

Setup date: **9 October 2026**, Asia/Dubai. Scope: environment, studio architecture, reusable production skill, episode pipeline, and technical verification only. **No first educational episode was created.**

Project: **C:/Users/U/Documents/ChatGPT/AIOLOGY/aiology-motion-studio**

## Environment audit

Commands were executed directly on the local Windows host, not a remote Linux sandbox. Initial workspace held only .git metadata; no existing project files were overwritten.

| Component | Installed / version | Required? | Action / final status |
| --- | --- | --- | --- |
| OS | Windows 11 Pro, 64-bit, 10.0.26300 (WSL reports build 26300.9550) | Host | Reused, verified with CIM |
| PowerShell | 7.6.5, Core | Launcher | Reused |
| WSL | 2.6.3.0; kernel 6.6.87.2-1 | Optional | Present; Ubuntu 24.04, Ubuntu, Ubuntu 22.04, Docker Desktop distributions listed; not used |
| Working directory | C:/Users/U/Documents/ChatGPT/AIOLOGY | Required | Dedicated child project created |
| Original Node.js | 22.16.0 at C:/Program Files/nodejs | Existing | Preserved; below current skill installer's >=22.20 minimum |
| Studio Node.js | 24.21.0 LTS (Krypton) | Required | Official Windows ZIP installed in user scope; SHA-256 verified |
| Original npm | 11.7.0 | Existing | Preserved |
| Studio npm | 11.19.0 | Required | Supplied by verified Node runtime |
| Git | 2.51.2.windows.1 | Required | Reused |
| FFmpeg | 8.1.1-full_build-www.gyan.dev | Required | Reused via WinGet link; executed and decoded actual output |
| FFprobe | 8.1.1-full_build-www.gyan.dev | Required | Reused and executed |
| Python | 3.13.5 / Miniconda | Optional | Reused only for built-in skill frontmatter validator |
| Codex CLI | 0.147.0 | Skill verification | Reused; fresh read-only app-server discovery tested |
| Codex execution | Desktop app, native local tools, unrestricted filesystem/network, no elevation used | Required | Authorized user-local installs and project changes only |
| Existing Remotion | No global npm Remotion or project installation in this workspace | Required | Official create-video scaffold installed 4.0.534 |
| Existing skills | User .codex/skills and .agents/skills inventories inspected; Remotion best-practices and cached official plugin skills existed | Required | Reused guidance; official user skills installed/refreshed |
| Chrome | 154.0.8037.99 | Optional system browser | Reused installation; not selected as render binary |
| Edge | 154.0.4258.62 | Optional system browser | Reused installation |
| Render browser | Chrome Headless Shell 157.0.8080.0 | Required | Downloaded by remotion browser ensure; actual render succeeded |
| Arabic system fonts | Tahoma, Arial, Arabic Typesetting and Segoe font files available | Fallback | Preserved |
| Cairo | @fontsource/cairo 5.3.0; Arabic/Latin weights 400/600/700, six WOFF2 files | Required | Licensed self-hosted files copied to public/fonts; render verified |
| Existing animation libraries | No existing project libraries in this empty workspace | Optional | Remotion frame APIs/SVG used; no extra animation runtime needed |
| CodeGraph | Global CLI 0.9.2 exists; .codegraph absent; no MCP tools exposed in this session | Optional | Initialization offered; not required by rendering stack and not performed without a reply |

The portable Node archive came from https://nodejs.org/dist/v24.21.0/ and matched its official SHASUMS256.txt:

    158f7685b44de51f6c0df1d153526cbcd3e1bc739a8dfc607721cef75de9e541

Runtime: %LOCALAPPDATA%/AIOLOGY/runtime/node-v24.21.0-win-x64. studio.ps1 prepends it to the current process PATH; no global Node replacement or machine PATH change.

## Installed project packages

All packages are pinned; package-lock.json is present.

| Package(s) | Version | Purpose |
| --- | --- | --- |
| remotion, @remotion/cli | 4.0.534 | Studio / renderer |
| @remotion/captions | 4.0.534 | Caption data |
| @remotion/google-fonts | 4.0.534 | Compatible optional font utility |
| @remotion/media-utils | 4.0.534 | Compatible media utility |
| @remotion/fonts | 4.0.534 | Awaited self-hosted font loading |
| @remotion/media | 4.0.534 | Recorded audio/media timeline |
| React / React DOM | 19.2.3 | Components |
| TypeScript | 5.9.3 | Strict type checking |
| @fontsource/cairo | 5.3.0 | Arabic/Latin font files and SIL OFL license |
| lucide-react | 1.54.0 | Semantic vector icons |
| zod | 4.5.4 | Episode schema validation |
| @remotion/eslint-config-flat | 4.0.534 | Remotion lint rules |
| ESLint | 9.39.5 | Lint |
| Prettier | 3.8.1 | Formatting |
| tsx | 4.23.15 | TypeScript CLI helpers/tests |
| @types/node / react / web | 26.6.4 / 19.2.7 / 0.0.166 | Type declarations |

Remotion packages were added with the supported remotion add command. Optional 3D (@remotion/three, Fiber, three) and Lottie were evaluated and deferred until a concept or supplied asset needs them. Lucide has immediate value for diagrams.

The scaffold's lint dependency chain produced 10 high-severity npm advisories. A project-local override pins typescript-eslint to compatible 8.71.1, removing that vulnerable dependency chain. **Final npm audit: 0 vulnerabilities.** No forced major dependency updates or unrelated removals were performed.

No Fish Audio, synthetic narration, TTS service, voice-cloning service, paid voice API, or voice credentials were installed/configured. Standard Remotion CLI transitive SDK packages remain unused; no voice service was activated.

## Skills

Canonical AIOLOGY skill:

    .agents/skills/aiology-motion-studio/SKILL.md

Persistent user discovery:

    C:/Users/U/.agents/skills/aiology-motion-studio
      -> directory junction to the canonical project skill

The global and local skill are one filesystem source, verified with matching hashes. scripts/install-skill.ps1 is repeatable and refuses to overwrite a different existing destination. The locator script was exercised so future chats in other projects can find the studio.

The official installation was rerun under Node 24 using:

    npx -y skills@latest add remotion-dev/skills -g -y -a codex

All **12 official skills (4.0.534)** are present under C:/Users/U/.agents/skills: best-practices, create, markup, captions, render, studio, docs, interactivity, maps, multimedia, saas, upgrade. Relevant creation/markup/font/composition/caption/render guidance was inspected. A preserved legacy best-practices skill also remains in .codex/skills; prefer the current .agents source.

**Discovery verified automatically:** a newly started Codex app-server returned the AIOLOGY skill and all five requested Remotion skills with enabled=true, from both this project and C:/Users/U. No discovery errors were returned. Evidence: output/skill-discovery.json. AIOLOGY frontmatter passed the built-in skill-creator validator.

The current chat's initial catalog is fixed. For the UI selector check, start a fresh chat in this project and type $aiology-motion-studio; confirm it is selectable. If the app selector remains stale, restart Codex and repeat. This manual step confirms desktop UI presentation; fresh-process backend discovery has already passed.

## Delivered architecture

Reusable modules include all requested starter components:

- Typography: AnimatedTitle, WordReveal, KineticText, HighlightedKeyword, ArabicCaption; ArabicText and EnglishTerm support native shaping and mixed-direction terms.
- Diagrams: AnimatedNode, ConnectionLine, NeuralNetwork, DataFlow, ProcessDiagram, ComparisonDiagram.
- Visual elements: AnimatedArrow, FloatingCard, ConceptCard, AnimatedIcon, GeometricShape, ProgressIndicator.
- Motion: SmoothEntrance, StaggeredReveal, ShapeTransformation, SceneTransition, CameraMove.

Components expose typed configuration for timing/easing, text, colors, size, layout, coordinates or styling as appropriate. All animation is frame-based. The starter shape morph is rounded-square/circle interpolation; CameraMove transforms a 2D group; SceneTransition is a controlled entrance. They are deliberately small primitives for more specific episode scenes.

All seven studio rules files are present, plus the empty episode template, creator-recorded audio workflow, validation/preparation/preview/render scripts, strict schema, safe paths, lockfile, README, project/root AGENTS.md, and permanent skill.

Episode creation leaves voiceover=null, scenes=[], captions=[] and status=draft. Production validation requires a real supplied recording and complete reviewed timing. No draft episode or educational content remains in episodes; only .gitkeep is present.

## Executed verification

| Check | Result / evidence |
| --- | --- |
| Native tool/OS/WSL/versions audit | PASS; commands executed on Windows |
| Required dependencies / npm ls | PASS; no missing direct dependencies |
| Remotion versions | PASS; all Remotion packages 4.0.534 |
| Official skills file metadata | PASS; 12 valid entrypoints present |
| AIOLOGY skill YAML/frontmatter | PASS; built-in quick_validate.py |
| Persistent skill junction and locator | PASS; identical source hashes and correct studio path |
| Fresh Codex skill discovery | PASS; six required names enabled in project/user scopes |
| TypeScript check | PASS; strict tsc --noEmit |
| Lint | PASS; src, scripts, tests |
| Automated tests | PASS; 10 tests, 0 failures |
| Episode template/creation behavior | PASS; temporary QA sandbox, empty draft and existing-work preservation |
| Timing and asset checks | PASS; caption boundaries, continuous frame ranges, no zero-frame scenes, path containment, actual WAV probe/decode |
| Remotion bundle | PASS |
| Development server | PASS; http://localhost:3000/TechnicalCheck loaded in Codex browser |
| Arabic fonts / RTL | PASS in fixture; loaded Cairo, mixed terms, joined glyphs, no observed clipping; DOM text overflow checks false |
| Starter animations/diagrams | PASS; rendered fixture and Studio playback exercised |
| Test video render | PASS; 180 frames |
| FFmpeg complete MP4 decode | PASS; exit 0, no decode errors |
| Export metadata | PASS; 1080×1920, 30/1 FPS, H.264 yuv420p, AAC stereo 48 kHz |
| Representative frames | PASS; frames 30, 90, 150 inspected; review notes saved |
| Repeated frame determinism | PASS; independently rendered frame 90 matched SHA-256 |
| npm dependency audit | PASS; 0 reported vulnerabilities |

Output: output/technical-check.mp4, 487401 bytes. Composition duration: 6 seconds. MP4 container reports 6.016 seconds because of AAC padding; there are 180 video frames at 30 FPS. The technical fixture contains silence solely to verify AAC muxing, not synthetic voice.

Evidence files: output/environment-verification.json, output/skill-discovery.json, output/technical-check.mp4.probe.json, output/frame-{30,90,150}.png, output/VISUAL_REVIEW.md. Generated outputs/build/public staging are ignored by Git.

Initial failures resolved: Node minimum warning → verified portable LTS; TypeScript ES2015 library rejected Array.at → ES2022; Remotion redundant from=0 lint → removed; legacy Windows PowerShell hash cmdlet → installer explicitly uses available PowerShell 7; Node script lint globals → explicit Node imports; subframe boundary regression → schema rejects zero-frame scenes and timing gaps. The first unrestricted skill installer also reported an unrelated PromptScript global-install limitation; the final Codex-only install succeeded.

**Remaining failed required checks: none.**

## Commands

Run from the project in PowerShell 7:

    ./studio.ps1 dev
    ./studio.ps1 check
    ./studio.ps1 verify
    ./studio.ps1 skills:verify
    ./studio.ps1 audio:probe path/to/recording.wav
    ./studio.ps1 episode:new topic-slug
    ./studio.ps1 episode:validate topic-slug --draft
    ./studio.ps1 episode:validate topic-slug
    ./studio.ps1 episode:preview topic-slug
    ./studio.ps1 episode:render topic-slug
    ./studio.ps1 export:check output/path/to/export.mp4
    ./studio.ps1 skill:install

For a technical render to a new path:

    npx remotion render src/index.ts TechnicalCheck output/technical-check-next.mp4

The npm render:test command uses output/technical-check.mp4 and refuses to overwrite it; choose a new output name for another test. Episode renders choose unique timestamped filenames automatically.

For a fresh checkout on another machine: compatible Node LTS >=22.20.0, Git, FFmpeg/FFprobe, then npm ci and npx remotion browser ensure. The Windows launcher uses the current local portable runtime when present and otherwise relies on a compatible PATH runtime.

## Limits and next input

- No recorded speech was supplied, so narrated alignment, full spoken caption coverage, audible mixing/loudness, and episode-specific conceptual accuracy have not been tested. These are required checks during actual episode production.
- Timestamped caption JSON and manually reviewed alignment are supported; no ASR model was downloaded or transcription service configured. Local transcription/alignment can be chosen later if useful.
- The six template scene types are an initial registry; specialized educational visuals may need new scene components.
- Safe margins are conservative house rules; inspect platform overlays for each intended upload.
- Keep the project at this location so the user-level skill junction remains valid. If moving it, inspect/repoint the junction deliberately.
- Optional CodeGraph indexing and future true 3D/Lottie are deferred. They do not block the verified 2D production stack.
- No accounts were connected and nothing was published.

**AIOLOGY MOTION STUDIO — READY**

Environment setup is complete. The Motion Studio and reusable Agent Skill are prepared. I am ready to receive the first AIOLOGY educational video script and your recorded voiceover.
