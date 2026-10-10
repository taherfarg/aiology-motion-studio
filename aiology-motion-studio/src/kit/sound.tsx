import React from "react";
import { Sequence, staticFile, useVideoConfig } from "remotion";
import { Audio } from "@remotion/media";
import { SFX_LENGTH_FRAMES, type SoundCue } from "./sfx";

export const SoundDesign: React.FC<{
  cues: SoundCue[];
  music?: { file: string; volume: number };
}> = ({ cues, music }) => {
  const { fps, durationInFrames } = useVideoConfig();
  return (
    <>
      {music && (
        <Audio
          src={staticFile(music.file)}
          premountFor={fps}
          volume={(frame) =>
            music.volume *
            Math.min(1, frame / 45, (durationInFrames - 1 - frame) / 45)
          }
        />
      )}
      {cues.map((cue, i) => (
        <Sequence
          key={i}
          name={`SFX ${cue.sfx}`}
          from={cue.at}
          durationInFrames={SFX_LENGTH_FRAMES[cue.sfx]}
          premountFor={fps}
        >
          <Audio
            src={staticFile(`sfx/${cue.sfx}.wav`)}
            volume={cue.volume ?? 0.5}
          />
        </Sequence>
      ))}
    </>
  );
};
