import React from "react";
import { AbsoluteFill, Sequence, staticFile, useVideoConfig } from "remotion";
import { Audio } from "@remotion/media";
import { ArabicCaption, ArabicText } from "../components";
import { EpisodeScene } from "../scenes/EpisodeScene";
import { episodeSchema, type Episode } from "../utils/episode-schema";
import { sceneFrameRange } from "../utils/timing";
import { palette } from "../themes/brand";

export type EpisodeProps = { episode: Episode | null; assetRoot: string };
export const EpisodeComposition: React.FC<EpisodeProps> = ({
  episode: raw,
  assetRoot,
}) => {
  const { fps, durationInFrames } = useVideoConfig();
  if (!raw)
    return (
      <AbsoluteFill
        style={{
          backgroundColor: palette.white,
          justifyContent: "center",
          padding: 100,
          boxSizing: "border-box",
        }}
      >
        <ArabicText
          text="أضف السكريبت والتسجيل الصوتي لبدء الحلقة"
          fontSize={56}
        />
      </AbsoluteFill>
    );
  const episode = episodeSchema.parse(raw);
  if (episode.status !== "ready" || !episode.voiceover)
    throw new Error("Only a validated, ready episode can render");
  const source = (file: string) => staticFile(`${assetRoot}/${file}`);
  return (
    <AbsoluteFill style={{ backgroundColor: palette.white }}>
      {episode.scenes.map((scene) => (
        <Sequence
          key={scene.id}
          name={scene.id}
          {...sceneFrameRange(scene.startMs, scene.endMs, fps)}
          premountFor={fps}
        >
          <EpisodeScene scene={scene} />
        </Sequence>
      ))}
      <Audio
        src={source(episode.voiceover.file)}
        volume={episode.voiceover.volume}
        premountFor={fps}
      />
      {episode.music && (
        <Audio
          src={source(episode.music.file)}
          loop
          volume={(frame) =>
            episode.music!.volume *
            Math.min(1, frame / 15, (durationInFrames - 1 - frame) / 30)
          }
          premountFor={fps}
        />
      )}
      {episode.sfx.map((sfx, i) => (
        <Sequence
          key={i}
          name={`SFX-${i}`}
          from={Math.ceil((sfx.startMs * fps) / 1000)}
          durationInFrames={Math.ceil((sfx.durationMs * fps) / 1000)}
          premountFor={fps}
        >
          <Audio src={source(sfx.file)} volume={sfx.volume} premountFor={fps} />
        </Sequence>
      ))}
      <ArabicCaption captions={episode.captions} />
    </AbsoluteFill>
  );
};
