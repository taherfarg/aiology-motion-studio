import React, { type CSSProperties, type ReactNode } from "react";
import { hexA, tone } from "./tokens";

// Matte "clay": top light, edge highlight and three shadow layers. `lift` 0..1.5 sets elevation.
export const clayShadow = (color: string, lift = 1) =>
  [
    `0 1px 2px ${hexA(tone.charcoal, 0.1)}`,
    `0 ${14 * lift}px ${26 * lift}px -${8 * lift}px ${hexA(tone.charcoal, 0.14)}`,
    `0 ${46 * lift}px ${72 * lift}px -${30 * lift}px ${hexA(color, 0.42)}`,
    `inset 0 2px 0 ${hexA("#FFFFFF", 0.8)}`,
    `inset 0 -8px 16px -8px ${hexA(tone.charcoal, 0.09)}`,
  ].join(", ");

export const Clay: React.FC<{
  color?: string;
  radius?: number;
  w?: number | string;
  h?: number | string;
  lift?: number;
  children?: ReactNode;
  style?: CSSProperties;
}> = ({
  color = tone.lavender,
  radius = 56,
  w,
  h,
  lift = 1,
  children,
  style,
}) => (
  <div
    style={{
      width: w,
      height: h,
      borderRadius: radius,
      backgroundColor: color,
      backgroundImage: `linear-gradient(180deg, ${hexA("#FFFFFF", 0.3)}, ${hexA("#FFFFFF", 0)} 55%)`,
      boxShadow: clayShadow(color, lift),
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      boxSizing: "border-box",
      ...style,
    }}
  >
    {children}
  </div>
);

// Soft ground shadow under a floating hero object.
export const Floor: React.FC<{
  w: number;
  h?: number;
  strength?: number;
  style?: CSSProperties;
}> = ({ w, h = 54, strength = 0.2, style }) => (
  <div
    style={{
      width: w,
      height: h,
      borderRadius: "50%",
      backgroundImage: `radial-gradient(closest-side, ${hexA(tone.charcoal, strength)}, ${hexA(tone.charcoal, 0)})`,
      ...style,
    }}
  />
);

// Absolute positioning on the 1080x1920 canvas; x is the left edge, centered when `cx` is used.
export const Spot: React.FC<{
  x?: number;
  cx?: number;
  y: number;
  w?: number;
  children: ReactNode;
  style?: CSSProperties;
}> = ({ x, cx, y, w = 804, children, style }) => (
  <div
    style={{
      position: "absolute",
      left: cx === undefined ? (x ?? 96) : cx - w / 2,
      top: y,
      width: w,
      ...style,
    }}
  >
    {children}
  </div>
);
