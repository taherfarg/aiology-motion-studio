import type { SoundCue } from "../../../kit";

// Global frames at 30 FPS. Cues follow what happens on screen, not the (still missing) voiceover.
const o = { learning: 540, chat: 1020, outro: 1380 };
const cue = (at: number, sfx: SoundCue["sfx"], volume?: number): SoundCue => ({
  at,
  sfx,
  volume,
});

export const premiumCues: SoundCue[] = [
  // Hook: letter, translation, cat vs dog, the question
  cue(8, "write", 0.35),
  cue(62, "pop", 0.4),
  cue(74, "pop", 0.4),
  cue(102, "pop", 0.4),
  cue(110, "pop", 0.4),
  cue(130, "tick", 0.35),
  cue(148, "riser", 0.3),
  cue(198, "thud", 0.45),
  // AI scene
  cue(236, "chime", 0.35),
  cue(232, "pop", 0.3),
  cue(242, "pop", 0.3),
  cue(252, "pop", 0.3),
  cue(306, "pop", 0.35),
  cue(322, "tick", 0.35),
  cue(336, "pop", 0.35),
  cue(352, "tick", 0.35),
  cue(394, "pop", 0.35),
  cue(406, "tick", 0.35),
  cue(442, "tick", 0.35),
  cue(475, "pop", 0.35),
  cue(487, "pop", 0.35),
  // Learning
  cue(o.learning - 2, "whoosh", 0.3),
  cue(o.learning + 8, "pop", 0.35),
  cue(o.learning + 16, "pop", 0.35),
  cue(o.learning + 28, "pop", 0.35),
  ...[0, 1, 2, 3, 4, 5].map((i) => cue(o.learning + 66 + i * 5, "tick", 0.3)),
  cue(o.learning + 140, "pop", 0.35),
  ...[0, 1, 2].map((i) => cue(o.learning + 176 + i * 24, "write", 0.3)),
  cue(o.learning + 262, "pop", 0.35),
  ...[0, 1, 2, 3, 4, 5].map((i) => cue(o.learning + 284 + i * 9, "tick", 0.3)),
  cue(o.learning + 372, "whoosh", 0.25),
  ...[0, 1, 2].map((i) => cue(o.learning + 398 + i * 14, "tick", 0.3)),
  cue(o.learning + 440, "chime", 0.4),
  // Chat and caution
  cue(o.chat - 2, "whoosh", 0.3),
  cue(o.chat + 14, "pop", 0.35),
  cue(o.chat + 92, "pop", 0.35),
  cue(o.chat + 184, "thud", 0.5),
  cue(o.chat + 232, "pop", 0.35),
  cue(o.chat + 262, "pop", 0.35),
  cue(o.chat + 318, "thud", 0.5),
  // Outro
  cue(o.outro - 2, "whoosh", 0.3),
  cue(o.outro + 14, "pop", 0.35),
  cue(o.outro + 44, "pop", 0.35),
  cue(o.outro + 108, "chime", 0.45),
  ...[0, 1, 2, 3].map((i) => cue(o.outro + 122 + i * 8, "tick", 0.3)),
];
export const MUSIC_VOLUME = 0.24;
