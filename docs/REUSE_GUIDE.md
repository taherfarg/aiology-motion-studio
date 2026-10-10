# Reusing AIOLOGY on a new machine

The repository root contains documentation and CI. The runnable Remotion project is the child directory `aiology-motion-studio/`. Run npm commands from that directory, and open that directory as the Codex project.

## Install and preview

1. Install a compatible official Node.js LTS runtime (tested: 24.21.0, minimum 22.20.0), Git, and FFmpeg with FFprobe on PATH. PowerShell 7 is needed for the Windows skill installer. Do not copy another machine's `node_modules` or render browser.
2. Clone `https://github.com/taherfarg/aiology-motion-studio.git`, enter its child project, and run `npm ci` using the committed lockfile.
3. Run `npx remotion browser ensure` to provision the supported rendering browser.
4. Run `npm run check` and `npm run dev`. Select `Episode001DirectorCut` in Studio.

Direct npm commands work without the original portable Windows runtime. On the original Windows installation, `./studio.ps1 dev` selects its verified user-local Node runtime. On another Windows machine it falls back to the compatible runtime on PATH. macOS/Linux users should use npm directly rather than this Windows launcher.

## Reviewed example and exports

`examples/episode-001/` contains the reviewed director-v5 MP4, its FFprobe record, a contact sheet of actual decoded frames, and checksums. They are checked into Git so a clone includes a usable reference without rendering.

```sh
npm run export:check -- examples/episode-001/aiology-episode-001-director-v5.mp4 --silent-preview
npm run render:episode-001-director
```

The render script writes a new copy into ignored `output/episode-001/`. It deliberately refuses to overwrite existing output. For a subsequent revision use a new filename:

```sh
npx remotion render src/index.ts Episode001DirectorCut output/episode-001/aiology-episode-001-director-v6.mp4 --codec=h264 --crf=18 --pixel-format=yuv420p
```

The example is silent, including no music or sound effects. Its 20 Arabic caption cues preserve the supplied script, but their timestamps are provisional reading cues. The `episode.json` production manifest remains draft; do not simply lay a recording over the fixed 52-second edit. Align phrases to the actual recording and retime scenes/captions before the narrated release.

The first GitHub release also carries the MP4 and an archive of the five director-cut review exports, decoded frames, contact sheets, and review notes. Source ZIP/tar archives are provided by GitHub. Generated dependencies, bundles, local audit outputs, and browser binaries are regenerated on the destination machine.

## Persistent Codex skill

The canonical source is `.agents/skills/aiology-motion-studio/`. Project AGENTS.md points to it. On Windows, run `npm run skill:install` to link it into the supported user directory at `%USERPROFILE%/.agents/skills/aiology-motion-studio`. The installer verifies matching hashes and refuses to overwrite a different skill. Keep the clone in place after installation.

If an existing junction points to the original checkout, both checkouts are preserved. Use the project-local skill in the new checkout, or deliberately inspect and repoint the existing user junction; do not erase it or create drifting copies. The checked-in locator works without the original `C:/Users/U` path.

Install the official Remotion skills using:

```sh
npx -y skills@latest add remotion-dev/skills -g -y -a codex
```

Start a fresh Codex chat in the child project and verify `$aiology-motion-studio` is selectable. `npm run skills:verify` is an optional Windows-specific fresh-process check using the npm-installed Codex CLI. If that CLI is not installed at its supported path, use the selector check instead. The current project-local skill can be read directly regardless of that optional command.

`npm run verify` checks local tools, pinned dependencies, skill files, and fonts; a new machine can report missing user skills until they are installed. CI checks code/tests/bundling without assuming a configured Codex account.

## New narrated episode

```sh
npm run episode:new -- episode-002-topic
npm run episode:validate -- episode-002-topic --draft
```

Fill the generated script, educational objectives, director's brief, storyboard, scenes, captions, and original voiceover references. See the skill's `references/workflow.md` for the complete schema and staging contract. Scene visuals use the reusable registry or episode-specific components when needed. Then run:

```sh
npm run audio:probe -- path/to/recording.wav
npm run episode:validate -- episode-002-topic
npm run episode:preview -- episode-002-topic
npm run check
npm run episode:render -- episode-002-topic
npm run export:check -- output/path/to/export.mp4
```

Final narrated exports require AAC and recorded voiceover. Inspect actual frames and listen to the complete output, using `studio/QUALITY_CHECKLIST.md`. Preserve originals and earlier renders.

## Repository maintenance

Commit source, episode plans, licensed reusable assets, and the lockfile. Large future recordings and review exports can use release attachments or a separate backed-up asset store; their paths in the episode manifest must still be available before rendering. `output/`, `build/`, `node_modules/`, and staged `public/episodes/` are generated and ignored.

All Remotion package versions must stay aligned; this snapshot uses 4.0.534. Use the supported `remotion add`/`remotion upgrade` flow, review the lockfile, and run checks plus render review after a deliberate upgrade. No accounts, API credentials, paid voice configuration, or social publishing integrations are needed.
