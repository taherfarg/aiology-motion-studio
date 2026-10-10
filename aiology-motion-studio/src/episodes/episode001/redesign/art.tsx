import React, { type CSSProperties, type ReactNode } from "react";
import { AbsoluteFill, Easing, interpolate, useCurrentFrame } from "remotion";
import { ArabicText, EnglishTerm } from "../../../components";
import { palette as P, typography } from "../../../themes/brand";
import "../../../utils/fonts";

export const C = {
  ...P,
  coralWash: "#FFF0EB",
  mintWash: "#EAF7F1",
  lavenderWash: "#F0EBF7",
  yellowWash: "#FFF7DF",
};
export const ease = Easing.bezier(0.22, 1, 0.36, 1);
export const p = (f: number, start: number, length = 22) =>
  interpolate(f, [start, start + length], [0, 1], {
    easing: ease,
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
export const lin = (f: number, start: number, length: number) =>
  interpolate(f, [start, start + length], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
export const window = (
  f: number,
  start: number,
  end: number,
  enter = 18,
  exit = 16,
) => p(f, start, enter) * (1 - p(f, end - exit, exit));
export const Ink: React.FC<{
  children: ReactNode;
  size?: number;
  weight?: number;
  color?: string;
  align?: "center" | "right" | "left";
  style?: CSSProperties;
}> = ({
  children,
  size = 54,
  weight = 600,
  color = C.charcoal,
  align = "center",
  style,
}) => (
  <ArabicText
    fontSize={size}
    color={color}
    align={align}
    style={{ fontWeight: weight, lineHeight: 1.45, ...style }}
  >
    {children}
  </ArabicText>
);
export const Latin: React.FC<{
  children: ReactNode;
  size?: number;
  color?: string;
  style?: CSSProperties;
}> = ({ children, size = 80, color = C.charcoal, style }) => (
  <Ink
    size={size}
    weight={700}
    color={color}
    style={{ lineHeight: 1.25, ...style }}
  >
    <EnglishTerm>{children}</EnglishTerm>
  </Ink>
);
export const At: React.FC<{
  x?: number;
  y: number;
  w?: number;
  children: ReactNode;
  style?: CSSProperties;
}> = ({ x = 96, y, w = 804, children, style }) => (
  <div style={{ position: "absolute", left: x, top: y, width: w, ...style }}>
    {children}
  </div>
);
export const Reveal: React.FC<{
  at?: number;
  length?: number;
  children: ReactNode;
  style?: CSSProperties;
}> = ({ at = 0, length = 22, children, style }) => {
  const f = useCurrentFrame(),
    v = p(f, at, length);
  return (
    <div style={{ opacity: v, translate: `0 ${(1 - v) * 28}px`, ...style }}>
      {children}
    </div>
  );
};
export const Stage: React.FC<{ name: string; children: ReactNode }> = ({
  name,
  children,
}) => (
  <AbsoluteFill
    data-shot={name}
    style={{ backgroundColor: C.white, fontFamily: typography.family }}
  >
    {children}
  </AbsoluteFill>
);
export const Tag: React.FC<{
  children: ReactNode;
  color?: string;
  wash?: string;
  style?: CSSProperties;
}> = ({ children, color = C.charcoal, wash = C.lavenderWash, style }) => (
  <div
    style={{
      borderRadius: 80,
      backgroundColor: wash,
      padding: "12px 28px",
      color,
      display: "inline-block",
      ...style,
    }}
  >
    <Ink size={44} weight={700} color={color}>
      {children}
    </Ink>
  </div>
);
export const Stroke: React.FC<{
  d: string;
  progress?: number;
  color?: string;
  strokeWidth?: number;
}> = ({ d, progress = 1, color = C.charcoal, strokeWidth = 5 }) => (
  <path
    d={d}
    stroke={color}
    strokeWidth={strokeWidth}
    fill="none"
    strokeLinecap="round"
    strokeLinejoin="round"
    pathLength={1}
    strokeDasharray={1}
    strokeDashoffset={1 - progress}
  />
);
export const quadratic = (
  t: number,
  a: [number, number],
  b: [number, number],
  c: [number, number],
) => ({
  x: (1 - t) ** 2 * a[0] + 2 * (1 - t) * t * b[0] + t * t * c[0],
  y: (1 - t) ** 2 * a[1] + 2 * (1 - t) * t * b[1] + t * t * c[1],
});
export const Pet: React.FC<{
  kind?: "cat" | "dog";
  size?: number;
  variant?: number;
  color?: string;
}> = ({ kind = "cat", size = 180, variant = 0, color = C.coral }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 240 240"
    fill="none"
    aria-label={kind === "cat" ? "قطة" : "كلب"}
  >
    <ellipse
      cx={120}
      cy={218}
      rx={65}
      ry={8}
      fill={C.charcoal}
      opacity={0.07}
    />
    {kind === "cat" ? (
      <>
        <path
          d="M57 93L45 30Q44 21 52 24L94 63 M146 63L188 24Q196 21 195 30L183 93"
          fill={color}
          stroke={C.charcoal}
          strokeWidth={5}
          strokeLinejoin="round"
        />
        <path
          d="M49 103Q49 62 120 62Q191 62 191 103V145Q191 199 120 204Q49 199 49 145Z"
          fill={C.white}
          stroke={C.charcoal}
          strokeWidth={5}
        />
        <path
          d="M82 122Q91 110 99 122 M141 122Q150 110 159 122"
          stroke={C.charcoal}
          strokeWidth={6}
          strokeLinecap="round"
        />
        <path
          d="M66 154L19 143 M66 164L16 172 M174 154L221 143 M174 164L224 172"
          stroke={C.charcoal}
          strokeWidth={4.5}
          strokeLinecap="round"
        />
        {variant % 2 === 1 && (
          <path
            d="M104 64L110 85 M120 64V88 M136 64L130 85"
            stroke={color}
            strokeWidth={7}
            strokeLinecap="round"
          />
        )}
      </>
    ) : (
      <>
        <path
          d="M73 66Q18 36 22 112Q25 164 65 142 M167 66Q222 36 218 112Q215 164 175 142"
          fill={color}
          stroke={C.charcoal}
          strokeWidth={5}
        />
        <path
          d="M61 95Q61 54 120 54Q179 54 179 95V155Q176 203 120 207Q64 203 61 155Z"
          fill={C.white}
          stroke={C.charcoal}
          strokeWidth={5}
        />
        <ellipse
          cx={120}
          cy={160}
          rx={37}
          ry={27}
          fill={color}
          opacity={0.28}
        />
        {variant % 2 === 1 && (
          <ellipse
            cx={91}
            cy={112}
            rx={23}
            ry={29}
            fill={color}
            opacity={0.35}
          />
        )}
        <circle cx={91} cy={119} r={6} fill={C.charcoal} />
        <circle cx={149} cy={119} r={6} fill={C.charcoal} />
      </>
    )}
    <circle cx={76} cy={146} r={10} fill={color} opacity={0.24} />
    <circle cx={164} cy={146} r={10} fill={color} opacity={0.24} />
    <path d="M109 148Q120 144 131 148L120 160Z" fill={C.charcoal} />
    <path
      d="M120 160V173 M120 173Q108 184 100 173 M120 173Q132 184 140 173"
      stroke={C.charcoal}
      strokeWidth={4}
      strokeLinecap="round"
    />
  </svg>
);
export const Paper: React.FC<{ progress: number; size?: number }> = ({
  progress,
  size = 360,
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 360 360"
    fill="none"
    style={{ position: "relative", zIndex: 1 }}
  >
    <path
      d="M55 43H235L301 108V304Q301 325 280 325H55Q34 325 34 304V64Q34 43 55 43Z"
      fill={C.white}
      stroke={C.charcoal}
      strokeWidth={4.5}
    />
    <path
      d="M235 43V86Q235 108 257 108H301"
      fill={C.coralWash}
      stroke={C.charcoal}
      strokeWidth={4.5}
    />
    <rect x={66} y={83} width={70} height={22} rx={11} fill={C.coral} />
    {[0, 1, 2, 3].map((i) => (
      <Stroke
        key={i}
        d={`M${[265, 265, 265, 220][i]} ${151 + i * 34}H76`}
        color={i === 0 ? C.coral : C.charcoal}
        strokeWidth={i === 0 ? 10 : 7}
        progress={lin(progress * 120, i * 20, 24)}
      />
    ))}
    <path
      d="M242 285L267 260L298 291L274 317Z"
      fill={C.coral}
      stroke={C.charcoal}
      strokeWidth={4}
      strokeLinejoin="round"
    />
  </svg>
);
export const Speech: React.FC<{
  children: ReactNode;
  fill?: string;
  style?: CSSProperties;
}> = ({ children, fill = C.lavenderWash, style }) => (
  <div
    style={{
      position: "relative",
      borderRadius: 42,
      backgroundColor: fill,
      padding: "32px 36px",
      boxShadow: "0 12px 32px rgba(37,37,37,0.045)",
      ...style,
    }}
  >
    {children}
    <svg
      width={40}
      height={32}
      style={{ position: "absolute", bottom: -23, right: 45 }}
      viewBox="0 0 40 32"
    >
      <path d="M0 0H40L35 29Q34 33 29 29Z" fill={fill} />
    </svg>
  </div>
);
export const Model: React.FC<{
  x: number;
  y: number;
  size?: number;
  progress?: number;
  label?: boolean;
}> = ({ x, y, size = 300, progress = 1, label = true }) => (
  <div
    style={{
      position: "absolute",
      left: x,
      top: y,
      width: size,
      height: size,
      borderRadius: size * 0.22,
      backgroundColor: C.lavender,
      boxShadow: "0 18px 42px rgba(78,51,113,.10)",
      scale: 0.94 + 0.06 * progress,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    }}
  >
    {label && <Latin size={size * 0.5}>AI</Latin>}
  </div>
);
