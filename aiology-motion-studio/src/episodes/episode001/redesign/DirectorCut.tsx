import {
  AbsoluteFill,
  Series,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { Mixed } from "../shared";
import { previewCaptions, previewPlan } from "../timeline";
import { At, C, Ink, Latin, p } from "./art";
import { Hook } from "./Hook";
import { Intelligence } from "./Intelligence";
import { Learning } from "./Learning";
import { Conversation } from "./Conversation";
import { Closing } from "./Closing";

export const sceneFrames = (id: string, fps: number) => {
  const scene = previewPlan.scenes.find((s) => s.id === id);
  if (!scene) throw new Error(`Unknown preview scene: ${id}`);
  return Math.round(((scene.endMs - scene.startMs) * fps) / 1000);
};
export const DirectorCut: React.FC = () => {
  const f = useCurrentFrame(),
    { fps } = useVideoConfig(),
    ms = (f * 1000) / fps;
  const caption = previewCaptions.find((c) => ms >= c.startMs && ms < c.endMs);
  const start = caption ? Math.round((caption.startMs * fps) / 1000) : 0;
  const bridge = p(f, 210, 28),
    bridgeSize = 88 + 256 * bridge,
    bridgeCenterY = 1234 - 372 * bridge;
  return (
    <AbsoluteFill style={{ backgroundColor: C.white }}>
      <Series>
        <Series.Sequence
          durationInFrames={sceneFrames("hook", fps)}
          premountFor={fps}
        >
          <Hook />
        </Series.Sequence>
        <Series.Sequence
          durationInFrames={sceneFrames("ai", fps)}
          premountFor={fps}
        >
          <Intelligence />
        </Series.Sequence>
        <Series.Sequence
          durationInFrames={sceneFrames("learning", fps)}
          premountFor={fps}
        >
          <Learning />
        </Series.Sequence>
        <Series.Sequence
          durationInFrames={sceneFrames("chat", fps)}
          premountFor={fps}
        >
          <Conversation />
        </Series.Sequence>
        <Series.Sequence
          durationInFrames={sceneFrames("outro", fps)}
          premountFor={fps}
        >
          <Closing />
        </Series.Sequence>
      </Series>
      {f >= 198 && f <= 242 && (
        <div
          style={{
            position: "absolute",
            left: 498 - bridgeSize / 2,
            top: bridgeCenterY - bridgeSize / 2,
            width: bridgeSize,
            height: bridgeSize,
            borderRadius: bridgeSize * 0.22,
            backgroundColor: C.lavender,
            opacity: p(f, 198, 10) * (1 - p(f, 238, 4)),
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: "0 18px 42px rgba(78,51,113,.10)",
          }}
        >
          <Latin size={44 + 128 * bridge}>AI</Latin>
        </div>
      )}
      <At
        y={162}
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <div
            style={{
              width: 12,
              height: 12,
              borderRadius: 4,
              backgroundColor: C.coral,
            }}
          />
          <Latin size={32}>AIOLOGY</Latin>
        </div>
        <Ink size={30} color={C.muted}>
          الذكاء الاصطناعي ببساطة / 01
        </Ink>
      </At>
      {caption && (
        <At y={1380} style={{ opacity: 0.45 + 0.55 * p(f, start, 6) }}>
          <div
            style={{
              width: 46,
              height: 5,
              borderRadius: 3,
              backgroundColor: C.coral,
              margin: "0 auto 24px",
            }}
          />
          <div data-director-caption>
            <Ink
              size={50}
              weight={600}
              style={{ lineHeight: 1.55, textWrap: "balance" }}
            >
              <Mixed text={caption.text} />
            </Ink>
          </div>
        </At>
      )}
    </AbsoluteFill>
  );
};
