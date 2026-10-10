import { Easing } from "remotion";
import { gentleEase } from "../animations/motion";
import { palette } from "../themes/brand";
import { progressAt } from "../utils/timing";

// Palette plus the pale washes used behind objects. Washes are tints of the brand colors.
export const tone = {
  ...palette,
  coralWash: "#FFF0EB",
  mintWash: "#EAF7F1",
  lavenderWash: "#F0EBF7",
  yellowWash: "#FFF7DF",
  orangeWash: "#FDF0E4",
} as const;

export const settle = Easing.bezier(0.65, 0, 0.35, 1);
export const ramp = (
  frame: number,
  start: number,
  length = 22,
  easing: (t: number) => number = gentleEase,
) => easing(progressAt(frame, start, length));
// Fades in at `from`, holds, fades out ending at `to`.
export const hold = (
  frame: number,
  from: number,
  to: number,
  enter = 18,
  exit = 16,
) => ramp(frame, from, enter) * (1 - ramp(frame, to - exit, exit));
export const mix = (a: number, b: number, t: number) => a + (b - a) * t;
export const hexA = (hex: string, alpha: number) => {
  const n = parseInt(hex.slice(1), 16);
  return `rgba(${n >> 16},${(n >> 8) & 255},${n & 255},${alpha})`;
};
