---
name: aiology-motion-studio
description: Produce AIOLOGY videos, Egyptian Arabic AI explainers, educational motion graphics, and recorded-voiceover Remotion videos using the AIOLOGY white visual identity and audio-first workflow.
---

# AIOLOGY Motion Studio

Use for AIOLOGY production and Arabic educational animation. Respect the creator's current scope; setup-only requests must not create an actual episode.

Find the installed studio with [scripts/locate-studio.ps1](scripts/locate-studio.ps1) when working outside its repository. Work in that studio unless the user requests another project; preserve existing work. Read its AGENTS.md and studio/BRAND.md before design. Use official Remotion skills for the specific coding/rendering task and current primary documentation for uncertain APIs.

Workflow: script → technical accuracy review → concept breakdown → director's brief → timestamped storyboard → scene design → audio synchronization → Remotion implementation → render → actual visual review → revisions → final export.

1. Identify audience, objective, takeaway, and likely misconception. Review AI claims against primary sources when uncertain or time-sensitive. Explain the limits of visual metaphors.
2. Require the creator's recorded voiceover for a final narrated episode. If the creator explicitly requests a silent prototype, produce a separate silent preview with clearly provisional editorial timings; keep the final episode manifest in draft and preserve its recorded-voice validator. Never synthesize narration or install Fish Audio, TTS, cloning services, or paid voice APIs. For narrated production, probe duration, listen, and align script phrases to real timestamps; do not present estimated timing as measured audio synchronization.
3. Create a draft via the studio's episode:new command, then complete the brief, storyboard, and episode.json. Read [references/workflow.md](references/workflow.md) for the data/command contract and the relevant studio guide.
4. Direct concept-bearing actions on pure white with the house palette. Use ArabicText/EnglishTerm and whole-word reveals; inspect Arabic shaping and mixed RTL/LTR order at actual render size. Reuse the component library, then extend it only where the lesson needs a new visual.
5. Drive all animation from frames. Keep assets/fonts local and rendering deterministic. Keep Remotion package versions aligned. Narration is the master timeline; captions, cuts, and useful sound events follow it.
6. Validate, typecheck, lint, test, preview, and render. Inspect opening, boundaries, dense frames, long captions, and ending, then play the complete export. Read studio/QUALITY_CHECKLIST.md. Log concrete defects separately from aesthetic preferences, fix defects, and re-render. Never claim quality from unsupported scores.
7. Verify final MP4 decoding, 1080×1920 / 30 FPS / H.264 / AAC and measured/listened audio quality. Supply the local export and review evidence. No automatic publishing or social-account connection.

When narration, timing, factual support, or licensed assets are missing, complete independent preparation and ask only for the missing input. Keep originals, recordings, and prior exports intact.
