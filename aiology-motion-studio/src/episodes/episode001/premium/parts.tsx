import React, { type ReactNode } from "react";
import type { LucideIcon } from "lucide-react";
import { Clay, hexA, tone } from "../../../kit";
import { Ink } from "../redesign/art";

export const CX = 498; // horizontal center of the safe area (x 96..900)

// Chat bubble: clay body with a small tail on the speaking side.
export const Bubble: React.FC<{
  color: string;
  side?: "left" | "right";
  w?: number;
  children: ReactNode;
}> = ({ color, side = "right", w = 500, children }) => (
  <div style={{ position: "relative", width: w }}>
    <Clay
      color={color}
      radius={46}
      lift={0.8}
      style={{ padding: "26px 36px", justifyContent: "center" }}
    >
      {children}
    </Clay>
    <svg
      width={44}
      height={34}
      viewBox="0 0 40 32"
      style={{
        position: "absolute",
        bottom: -26,
        [side]: 52,
        transform: side === "left" ? "scaleX(-1)" : undefined,
      }}
    >
      <path d="M0 0H40L35 29Q34 33 29 29Z" fill={color} />
    </svg>
  </div>
);

// Icon on a clay tile with an optional label inside it.
export const IconTile: React.FC<{
  icon: LucideIcon;
  color: string;
  w?: number;
  h?: number;
  label?: string;
  labelSize?: number;
  iconSize?: number;
  labelOpacity?: number;
}> = ({
  icon: Icon,
  color,
  w = 380,
  h = 330,
  label,
  labelSize = 54,
  iconSize = 150,
  labelOpacity = 1,
}) => (
  <Clay
    color={color}
    radius={64}
    w={w}
    h={h}
    lift={1.1}
    style={{ flexDirection: "column", gap: 18 }}
  >
    <Icon size={iconSize} strokeWidth={1.8} color={tone.charcoal} />
    {label && (
      <div style={{ opacity: labelOpacity }}>
        <Ink size={labelSize} weight={700}>
          {label}
        </Ink>
      </div>
    )}
  </Clay>
);

// A small signal dot travelling straight down between two y positions.
export const FlowDot: React.FC<{
  x: number;
  from: number;
  to: number;
  t: number;
  color?: string;
}> = ({ x, from, to, t, color = tone.coral }) => (
  <div
    style={{
      position: "absolute",
      left: x - 14,
      top: from + (to - from) * t - 14,
      width: 28,
      height: 28,
      borderRadius: 14,
      backgroundColor: color,
      opacity: t > 0 && t < 1 ? 1 : 0,
      boxShadow: `0 6px 14px ${hexA(color, 0.45)}`,
    }}
  />
);

// Vertical connector with an arrow head.
export const Connector: React.FC<{
  x?: number;
  from: number;
  to: number;
  progress: number;
}> = ({ x = CX, from, to, progress }) => (
  <svg
    width={1080}
    height={1920}
    style={{ position: "absolute", left: 0, top: 0 }}
  >
    <path
      d={`M${x} ${from}V${from + (to - from) * progress}`}
      stroke={tone.charcoal}
      strokeOpacity={0.55}
      strokeWidth={6}
      strokeLinecap="round"
      fill="none"
    />
    {progress > 0.95 && (
      <path
        d={`M${x - 16} ${to - 22}L${x} ${to}L${x + 16} ${to - 22}`}
        stroke={tone.charcoal}
        strokeOpacity={0.55}
        strokeWidth={6}
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
    )}
  </svg>
);
