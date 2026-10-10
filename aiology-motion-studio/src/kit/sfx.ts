// Original, generated sound design (scripts/make-sound.ts). Names map to public/sfx/<name>.wav.
export type SfxName =
  | "whoosh"
  | "tick"
  | "pop"
  | "chime"
  | "write"
  | "thud"
  | "riser";
export type SoundCue = { at: number; sfx: SfxName; volume?: number };

export const SFX_LENGTH_FRAMES: Record<SfxName, number> = {
  whoosh: 20,
  tick: 5,
  pop: 9,
  chime: 52,
  write: 18,
  thud: 15,
  riser: 40,
};
