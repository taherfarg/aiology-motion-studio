# Episode 001 — direction revision, 2026-10-10

The creator rejected the first trial as amateur editing and authorized a substantial improvement with repeated reviews. Preserve the script, white brand, original exports, silent status, and provisional 52-second timeline.

The previous version repeats outlined cards, chapter headings, and entrance fades. It gives most ideas the same visual weight and hardly changes the diagram after entering. The revision uses a clear focal object, larger typography, sequential transformations, deliberate changes of tempo, and continuity of the lavender model through the episode.

## Direction

- Hook: full-stage letter writing, speech translation, then two illustrated image classes. Each example takes the focus, instead of accumulating cards. The question clears the stage.
- AI: large typographic reveal, then a model receiving language/image inputs and producing visible results. Signals follow paths; secondary content waits until the main concept is readable.
- Learning: distinguish hand-written rules, labeled training examples, changes inside an illustrative network, and a separate new image after training. Six examples actually travel through the diagram; the new image differs from training artwork. No invented confidence or implication that all ML is a neural network.
- Chat/caution: original message bubbles with an RTL response reveal. The reply gives way to a large drawn inequality symbol and stable caution, with no generic enclosing card.
- Outro: ML nests inside AI; those shapes reduce into the brand's mark and a held closing wordmark.

## Layout and motion

Safe essential x=96..900. Header y=166, main stage y=330..1300; captions y=1380 with 50px type, balanced lines, isolated terms, and no more than two lines. Main titles 78–104px. White remains dominant; two main accents per shot. Soft object shadows are structural depth, not background gradients.

Use consistent optical alignment, geometric SVGs, path reveals, focused pauses, restrained scale changes, and eased 18–24-frame moves. No persistent floating loops, unmotivated camera shake, or all-screen fade to white at every cut. All graphics and text remain deterministic and locally rendered. The trial stays silent.

## Implementation plan

> **For agentic workers:** Execute inline with the existing Remotion workflow; the creator has already authorized the revision and review. No delegation or approval checkpoint is needed.

**Goal:** Replace the weak trial direction with coherent explanatory motion and reviewable evidence.

**Architecture:** Add a separate `redesign/` scene set and `Episode001DirectorCut` registration. Shared drawing primitives and motion math stay in that directory. Reuse the existing authoritative timeline and full-script cues; preserve the earlier compositions.

**Tech stack:** Existing React, TypeScript, Remotion 4.0.534, self-hosted Cairo and SVG. No new dependencies or audio generation.

- [x] Create shared stage/type/drawing primitives in `src/episodes/episode001/redesign/art.tsx`. Extend frame helpers for entrances, segment windows and curved signal paths.
- [x] Implement `Hook.tsx`, `Intelligence.tsx`, `Learning.tsx`, `Conversation.tsx`, `Closing.tsx`. Register each scene and the assembled cut in `src/Root.tsx`.
- [x] Assemble five explicit Series sequences in `DirectorCut.tsx`, derive their lengths from the scene plan, and add balanced full-script captions. Add a render command with a new output filename.
- [x] Run `./studio.ps1 check`, `verify`, and draft asset validation. Start Studio and inspect the new cut at actual scene timings.
- [x] Render review A. Decode it and inspect actual frame groups covering every visual state, transitions, dense training diagram, long captions and ending. Play the actual export.
- [x] Record concrete issues with frame/time and repair them. Render review B after those repairs; inspect changed states and play it fully. Preferences are recorded separately; no invented quality score.
- [x] Export the reviewed silent MP4, run `export:check --silent-preview`, check duration and complete decoding, save review evidence and hand over the file.

Acceptance requires more than working code: clearly visible example-to-result actions, readable Arabic, no overlaps, a stable end, and real playback review. Speech synchronization waits for the creator's recording.

Completed across five director-cut exports. See `DIRECTOR_REVIEW.md` for the actual corrections and final export evidence.
