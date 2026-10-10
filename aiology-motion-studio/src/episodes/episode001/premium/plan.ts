import { previewPlan } from "../timeline";

const frames = (id: string) => {
  const scene = previewPlan.scenes.find((s) => s.id === id);
  if (!scene) throw new Error(`Unknown scene ${id}`);
  return Math.round(((scene.endMs - scene.startMs) * previewPlan.fps) / 1000);
};
export const HOOK_FRAMES = frames("hook");
// The hook and AI scene are one continuous shot (the AI cube carries across), so they form one sequence.
export const OPENING_FRAMES = HOOK_FRAMES + frames("ai");
export const premiumScenes = [
  OPENING_FRAMES,
  frames("learning"),
  frames("chat"),
  frames("outro"),
];
