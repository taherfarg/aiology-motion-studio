import React, { type CSSProperties, type ReactNode } from "react";
import type { LucideIcon } from "lucide-react";
import { useCurrentFrame } from "remotion";
import {
  SmoothEntrance,
  useMotionProgress,
  type Timing,
} from "../animations/motion";
import { palette } from "../themes/brand";
import { ArabicText } from "./typography";

export const AnimatedArrow: React.FC<
  Timing & {
    width?: number;
    height?: number;
    color?: string;
    direction?: "left" | "right" | "up" | "down";
    strokeWidth?: number;
  }
> = ({
  width = 180,
  height = 64,
  color = palette.charcoal,
  direction = "right",
  strokeWidth = 5,
  ...timing
}) => {
  const p = useMotionProgress(timing);
  const rotate = { right: 0, down: 90, left: 180, up: 270 }[direction];
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 180 64"
      style={{ rotate: `${rotate}deg`, overflow: "visible" }}
      aria-label={`Arrow ${direction}`}
    >
      <path
        d="M8 32 H165 M145 12 L165 32 L145 52"
        stroke={color}
        strokeWidth={strokeWidth}
        fill="none"
        pathLength={1}
        strokeDasharray={1}
        strokeDashoffset={1 - p}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};
export const FloatingCard: React.FC<
  Timing & {
    children: ReactNode;
    width?: number;
    color?: string;
    drift?: number;
    style?: CSSProperties;
  }
> = ({
  children,
  width = 360,
  color = palette.white,
  drift = 0,
  style,
  ...timing
}) => {
  const frame = useCurrentFrame();
  return (
    <SmoothEntrance
      {...timing}
      style={{
        width,
        padding: 28,
        boxSizing: "border-box",
        border: `2px solid ${palette.line}`,
        borderRadius: 24,
        backgroundColor: color,
        translate: `0 ${Math.sin(frame / 30) * drift}px`,
        ...style,
      }}
    >
      {children}
    </SmoothEntrance>
  );
};
export const ConceptCard: React.FC<
  Timing & {
    title: string;
    description?: string;
    accent?: string;
    width?: number;
    style?: CSSProperties;
  }
> = ({
  title,
  description,
  accent = palette.coral,
  width = 360,
  style,
  ...timing
}) => (
  <FloatingCard
    width={width}
    style={{ borderTop: `6px solid ${accent}`, ...style }}
    {...timing}
  >
    <ArabicText text={title} fontSize={44} style={{ fontWeight: 700 }} />
    {description && <ArabicText text={description} fontSize={36} />}
  </FloatingCard>
);
export const AnimatedIcon: React.FC<
  Timing & {
    icon: LucideIcon;
    color?: string;
    size?: number;
    strokeWidth?: number;
  }
> = ({
  icon: Icon,
  color = palette.charcoal,
  size = 96,
  strokeWidth = 1.8,
  ...timing
}) => (
  <SmoothEntrance {...timing}>
    <Icon size={size} strokeWidth={strokeWidth} color={color} />
  </SmoothEntrance>
);
export const GeometricShape: React.FC<
  Timing & {
    shape?: "circle" | "square" | "triangle" | "hexagon";
    size?: number;
    color?: string;
    style?: CSSProperties;
  }
> = ({
  shape = "circle",
  size = 120,
  color = palette.mint,
  style,
  ...timing
}) => {
  const p = useMotionProgress(timing);
  const clipPath =
    shape === "triangle"
      ? "polygon(50% 0,100% 100%,0 100%)"
      : shape === "hexagon"
        ? "polygon(25% 0,75% 0,100% 50%,75% 100%,25% 100%,0 50%)"
        : undefined;
  return (
    <div
      style={{
        width: size,
        height: size,
        backgroundColor: color,
        borderRadius: shape === "circle" ? "50%" : 12,
        clipPath,
        opacity: p,
        scale: 0.92 + 0.08 * p,
        ...style,
      }}
    />
  );
};
export const ProgressIndicator: React.FC<
  Timing & {
    value?: number;
    width?: number;
    height?: number;
    color?: string;
    label?: string;
  }
> = ({
  value,
  width = 720,
  height = 8,
  color = palette.mint,
  label,
  ...timing
}) => {
  const p = useMotionProgress(timing);
  const amount = Math.max(0, Math.min(1, value ?? p));
  return (
    <div style={{ width }}>
      {label && <ArabicText text={label} fontSize={32} />}
      <div
        role="progressbar"
        aria-valuenow={amount * 100}
        style={{ height, backgroundColor: palette.line, borderRadius: height }}
      >
        <div
          style={{
            width: `${amount * 100}%`,
            height,
            backgroundColor: color,
            borderRadius: height,
          }}
        />
      </div>
    </div>
  );
};
