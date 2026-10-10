import React from "react";
import { AbsoluteFill } from "remotion";
import type {
  TransitionPresentation,
  TransitionPresentationComponentProps,
} from "@remotion/transitions";
import { gentleEase } from "../animations/motion";

export const TRANSITION_FRAMES = 14;

// Scenes are authored in local frames that start on their cut point. Each scene except the last
// runs `overlap` frames into the next one, and TransitionSeries subtracts that overlap again,
// so the sum of scene frames is exactly the composition length and every cut lands on its cue.
export const sceneDurations = (frames: number[], overlap = TRANSITION_FRAMES) =>
  frames.map((n, i) => (i < frames.length - 1 ? n + overlap : n));

const clamp01 = (n: number) => Math.min(1, Math.max(0, n));
type Props = Record<string, never>;
const Lift: React.FC<TransitionPresentationComponentProps<Props>> = ({
  children,
  presentationProgress: p,
  presentationDirection,
}) => {
  const leaving = presentationDirection === "exiting",
    out = gentleEase(clamp01(p / 0.6)),
    inn = gentleEase(clamp01((p - 0.2) / 0.8));
  return (
    <AbsoluteFill
      style={
        leaving
          ? {
              opacity: 1 - out,
              transform: `translateY(${-out * 54}px) scale(${1 - 0.025 * out})`,
            }
          : {
              opacity: inn,
              transform: `translateY(${(1 - inn) * 72}px) scale(${1.035 - 0.035 * inn})`,
            }
      }
    >
      {children}
    </AbsoluteFill>
  );
};
// Exit clears slightly before the entrance lands, so scenes never ghost over each other.
export const lift = (): TransitionPresentation<Props> => ({
  component: Lift,
  props: {},
});
