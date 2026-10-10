import data from "../../../episodes/episode-001/silent-preview.json";
import type { Caption } from "@remotion/captions";
export const previewPlan = data;
export const previewCaptions: Caption[] = data.captions.map((c) => ({
  ...c,
  timestampMs: null,
  confidence: null,
}));
export const previewFrames = (data.durationMs * data.fps) / 1000;
