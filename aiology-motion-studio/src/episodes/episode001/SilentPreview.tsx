import { AbsoluteFill, Series, useCurrentFrame } from "remotion";
import { EnglishTerm } from "../../components";
import { C, Mixed, Text } from "./shared";
import { previewCaptions, previewFrames, previewPlan } from "./timeline";
import { HookScene } from "./HookScene";
import { AIScene } from "./AIScene";
import { LearningScene } from "./LearningScene";
import { ChatScene } from "./ChatScene";
import { OutroScene } from "./OutroScene";

/** Deliberately silent prototype: no recorded or generated narration. */
export const SilentPreview: React.FC = () => {
  const frame = useCurrentFrame(),
    ms = (frame * 1000) / previewPlan.fps;
  const caption = previewCaptions.find((c) => ms >= c.startMs && ms < c.endMs);
  return (
    <AbsoluteFill style={{ backgroundColor: C.white }}>
      <Series>
        <Series.Sequence durationInFrames={210} premountFor={30}>
          <HookScene />
        </Series.Sequence>
        <Series.Sequence durationInFrames={330} premountFor={30}>
          <AIScene />
        </Series.Sequence>
        <Series.Sequence durationInFrames={480} premountFor={30}>
          <LearningScene />
        </Series.Sequence>
        <Series.Sequence durationInFrames={360} premountFor={30}>
          <ChatScene />
        </Series.Sequence>
        <Series.Sequence durationInFrames={180} premountFor={30}>
          <OutroScene />
        </Series.Sequence>
      </Series>
      <div
        style={{
          position: "absolute",
          left: 96,
          top: 174,
          width: 804,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Text size={34} weight={700}>
          <EnglishTerm>AIOLOGY</EnglishTerm>
        </Text>
        <Text size={30} color={C.muted}>
          01 / يعني إيه AI؟
        </Text>
      </div>
      <div
        style={{
          position: "absolute",
          left: 96,
          top: 252,
          width: 804,
          height: 3,
          backgroundColor: C.line,
        }}
      >
        <div
          style={{
            width: `${(frame / (previewFrames - 1)) * 100}%`,
            height: 3,
            backgroundColor: C.coral,
          }}
        />
      </div>
      {caption && (
        <div
          data-preview-caption
          style={{
            position: "absolute",
            left: 96,
            top: 1360,
            width: 804,
            borderTop: `2px solid ${C.line}`,
            paddingTop: 24,
          }}
        >
          <Text size={48} weight={600} style={{ lineHeight: 1.6 }}>
            <Mixed text={caption.text} />
          </Text>
        </div>
      )}
    </AbsoluteFill>
  );
};
