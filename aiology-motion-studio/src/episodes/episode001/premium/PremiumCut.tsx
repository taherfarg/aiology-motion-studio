import { AbsoluteFill, useCurrentFrame } from "remotion";
import { TransitionSeries, linearTiming } from "@remotion/transitions";
import {
  BrandBug,
  CaptionPill,
  SoundDesign,
  Spot,
  TRANSITION_FRAMES,
  lift,
  ramp,
  sceneDurations,
  tone,
} from "../../../kit";
import { typography } from "../../../themes/brand";
import { previewCaptions } from "../timeline";
import { Closing } from "./Closing";
import { Conversation } from "./Conversation";
import { Learning } from "./Learning";
import { Opening } from "./Opening";
import { premiumScenes } from "./plan";
import { MUSIC_VOLUME, premiumCues } from "./sound-plan";
import "../../../utils/fonts";

const durations = sceneDurations(premiumScenes);
const scenes = [Opening, Learning, Conversation, Closing];

export const PremiumCut: React.FC = () => {
  const f = useCurrentFrame();
  return (
    <AbsoluteFill
      style={{ backgroundColor: tone.white, fontFamily: typography.family }}
    >
      <TransitionSeries>
        {scenes.flatMap((Scene, i) => [
          ...(i
            ? [
                <TransitionSeries.Transition
                  key={`t${i}`}
                  presentation={lift()}
                  timing={linearTiming({ durationInFrames: TRANSITION_FRAMES })}
                />,
              ]
            : []),
          <TransitionSeries.Sequence key={i} durationInFrames={durations[i]}>
            <Scene />
          </TransitionSeries.Sequence>,
        ])}
      </TransitionSeries>
      <Spot
        y={140}
        style={{ opacity: ramp(f, 2, 14) * (1 - ramp(f, 110, 16)) }}
      >
        <BrandBug />
      </Spot>
      <CaptionPill captions={previewCaptions} />
      <SoundDesign
        cues={premiumCues}
        music={{ file: "audio/music-bed.wav", volume: MUSIC_VOLUME }}
      />
    </AbsoluteFill>
  );
};
