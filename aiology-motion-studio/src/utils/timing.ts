import type { Caption } from "@remotion/captions";

export const framesForDuration = (ms: number, fps: number): number => {
  if (!Number.isFinite(ms) || ms <= 0 || !Number.isFinite(fps) || fps <= 0)
    throw new Error("Duration and fps must be positive");
  return Math.ceil((ms * fps) / 1000);
};
export const progressAt = (frame: number, start = 0, duration = 24): number => {
  if (duration <= 0) throw new Error("Animation duration must be positive");
  return Math.min(1, Math.max(0, (frame - start) / duration));
};
export const sceneFrameRange = (
  startMs: number,
  endMs: number,
  fps: number,
) => {
  const from = Math.ceil((startMs * fps) / 1000);
  return { from, durationInFrames: Math.ceil((endMs * fps) / 1000) - from };
};
export const activeCaption = (captions: Caption[], timeMs: number) =>
  captions.find((c) => timeMs >= c.startMs && timeMs < c.endMs);
