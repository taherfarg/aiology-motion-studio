import React, { type CSSProperties, type ReactNode } from "react";
import {
  AbsoluteFill,
  Easing,
  interpolate,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { ArabicText, EnglishTerm, SmoothEntrance } from "../../components";
import { palette as C, typography } from "../../themes/brand";
import "../../utils/fonts";

export { C };
export const W = 804;
export const ease = Easing.bezier(0.22, 1, 0.36, 1);
export const motion = (f: number, start = 0, length = 24) =>
  interpolate(f, [start, start + length], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: ease,
  });
export const linear = (f: number, start = 0, length = 24) =>
  interpolate(f, [start, start + length], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
export const Mixed: React.FC<{ text: string }> = ({ text }) => (
  <>
    {text
      .split(/(Machine Learning|ChatGPT|AIOLOGY|AI)/g)
      .map((piece, i) =>
        /^(Machine Learning|ChatGPT|AIOLOGY|AI)$/.test(piece) ? (
          <EnglishTerm key={i}>{piece}</EnglishTerm>
        ) : (
          <React.Fragment key={i}>{piece}</React.Fragment>
        ),
      )}
  </>
);
export const Text: React.FC<{
  children: ReactNode;
  size?: number;
  weight?: number;
  color?: string;
  align?: "right" | "center" | "left";
  style?: CSSProperties;
}> = ({
  children,
  size = 48,
  weight = 600,
  color = C.charcoal,
  align = "center",
  style,
}) => (
  <ArabicText
    fontSize={size}
    color={color}
    align={align}
    style={{ fontWeight: weight, lineHeight: 1.5, ...style }}
  >
    {children}
  </ArabicText>
);
export const SceneShell: React.FC<{
  children: ReactNode;
  label: string;
  title?: ReactNode;
  fadeOut?: boolean;
}> = ({ children, label, title, fadeOut = true }) => {
  const f = useCurrentFrame(),
    { durationInFrames } = useVideoConfig();
  return (
    <AbsoluteFill
      style={{ backgroundColor: C.white, fontFamily: typography.family }}
    >
      <div
        style={{
          position: "absolute",
          left: 96,
          top: 292,
          width: W,
          opacity:
            motion(f, 0, 16) *
            (fadeOut ? 1 - linear(f, durationInFrames - 10, 10) : 1),
        }}
      >
        <SmoothEntrance duration={18}>
          <Text
            size={36}
            color={C.coral}
            align="right"
            style={{ marginBottom: 16 }}
          >
            {label}
          </Text>
        </SmoothEntrance>
        {title && (
          <SmoothEntrance start={3} duration={22}>
            <Text size={74} weight={700} align="right">
              {title}
            </Text>
          </SmoothEntrance>
        )}
        {children}
      </div>
    </AbsoluteFill>
  );
};
export const Panel: React.FC<{
  children: ReactNode;
  accent?: string;
  style?: CSSProperties;
}> = ({ children, accent = C.line, style }) => (
  <div
    style={{
      backgroundColor: C.white,
      border: `3px solid ${accent}`,
      borderRadius: 30,
      boxSizing: "border-box",
      padding: 28,
      ...style,
    }}
  >
    {children}
  </div>
);
export const Animal: React.FC<{
  kind?: "cat" | "dog";
  size?: number;
  color?: string;
}> = ({ kind = "cat", size = 120, color = C.coral }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 140 140"
    fill="none"
    aria-label={kind === "cat" ? "قطة" : "كلب"}
  >
    {kind === "cat" ? (
      <>
        <path
          d="M27 58 L20 19 L54 36 M86 36 L120 19 L113 58"
          fill={color}
          stroke={C.charcoal}
          strokeWidth={4}
          strokeLinejoin="round"
        />
        <path
          d="M23 65 Q23 38 70 38 Q117 38 117 65 V90 Q115 121 70 123 Q25 121 23 90 Z"
          fill={C.white}
          stroke={C.charcoal}
          strokeWidth={4}
        />
        <path
          d="M35 88 L5 79 M35 97 L4 101 M105 88 L135 79 M105 97 L136 101"
          stroke={C.charcoal}
          strokeWidth={4}
          strokeLinecap="round"
        />
      </>
    ) : (
      <>
        <path
          d="M36 38 Q3 30 8 79 Q10 108 35 86 M104 38 Q137 30 132 79 Q130 108 105 86"
          fill={color}
          stroke={C.charcoal}
          strokeWidth={4}
        />
        <rect
          x={28}
          y={29}
          width={84}
          height={96}
          rx={36}
          fill={C.white}
          stroke={C.charcoal}
          strokeWidth={4}
        />
        <ellipse cx={70} cy={95} rx={28} ry={20} fill={color} opacity={0.3} />
      </>
    )}
    <circle cx={48} cy={70} r={5} fill={C.charcoal} />
    <circle cx={92} cy={70} r={5} fill={C.charcoal} />
    <path d="M62 86 L78 86 L70 94 Z" fill={C.charcoal} />
    <path
      d="M70 94 V102 M70 102 Q59 112 53 102 M70 102 Q81 112 87 102"
      stroke={C.charcoal}
      strokeWidth={3}
      strokeLinecap="round"
    />
  </svg>
);
export const ArrowPath: React.FC<{
  d: string;
  progress?: number;
  color?: string;
  width?: number;
}> = ({ d, progress = 1, color = C.charcoal, width = 4 }) => (
  <path
    d={d}
    fill="none"
    stroke={color}
    strokeWidth={width}
    strokeLinecap="round"
    strokeLinejoin="round"
    pathLength={1}
    strokeDasharray={1}
    strokeDashoffset={1 - progress}
  />
);
