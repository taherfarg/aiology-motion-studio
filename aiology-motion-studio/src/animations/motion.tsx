import React, { type CSSProperties, type ReactNode } from "react";
import { Easing, useCurrentFrame } from "remotion";
import { progressAt } from "../utils/timing";

export type Timing = {
  start?: number;
  duration?: number;
  easing?: (value: number) => number;
};
export const gentleEase = Easing.bezier(0.22, 1, 0.36, 1);
export const useMotionProgress = ({
  start = 0,
  duration = 24,
  easing = gentleEase,
}: Timing = {}) => easing(progressAt(useCurrentFrame(), start, duration));
type WrapperProps = Timing & { children: ReactNode; style?: CSSProperties };
export const SmoothEntrance: React.FC<
  WrapperProps & {
    direction?: "up" | "down" | "left" | "right" | "none";
    distance?: number;
  }
> = ({ children, direction = "up", distance = 32, style, ...timing }) => {
  const p = useMotionProgress(timing);
  const x =
    direction === "left" ? -distance : direction === "right" ? distance : 0;
  const y =
    direction === "up" ? distance : direction === "down" ? -distance : 0;
  return (
    <div
      style={{
        opacity: p,
        translate: `${x * (1 - p)}px ${y * (1 - p)}px`,
        ...style,
      }}
    >
      {children}
    </div>
  );
};
export const StaggeredReveal: React.FC<
  WrapperProps & {
    stagger?: number;
    gap?: number;
    direction?: "row" | "column";
  }
> = ({
  children,
  stagger = 6,
  start = 0,
  duration = 24,
  easing,
  gap = 20,
  direction = "column",
  style,
}) => (
  <div style={{ display: "flex", flexDirection: direction, gap, ...style }}>
    {React.Children.toArray(children).map((child, i) => (
      <SmoothEntrance
        key={i}
        start={start + i * stagger}
        duration={duration}
        easing={easing}
      >
        {child}
      </SmoothEntrance>
    ))}
  </div>
);
export const SceneTransition: React.FC<
  WrapperProps & { mode?: "fade" | "wipe" }
> = ({ children, mode = "fade", style, ...timing }) => {
  const p = useMotionProgress(timing);
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        opacity: mode === "fade" ? p : 1,
        clipPath:
          mode === "wipe" ? `inset(0 ${(1 - p) * 100}% 0 0)` : undefined,
        ...style,
      }}
    >
      {children}
    </div>
  );
};
export const CameraMove: React.FC<
  WrapperProps & {
    from?: { x: number; y: number; scale: number };
    to?: { x: number; y: number; scale: number };
  }
> = ({
  children,
  from = { x: 0, y: 0, scale: 1 },
  to = { x: 0, y: 0, scale: 1.04 },
  style,
  ...timing
}) => {
  const p = useMotionProgress(timing);
  return (
    <div
      style={{
        translate: `${from.x + (to.x - from.x) * p}px ${from.y + (to.y - from.y) * p}px`,
        scale: from.scale + (to.scale - from.scale) * p,
        transformOrigin: "center",
        ...style,
      }}
    >
      {children}
    </div>
  );
};
export const ShapeTransformation: React.FC<
  Timing & {
    size?: number;
    color?: string;
    fromRadius?: number;
    toRadius?: number;
    rotation?: number;
    style?: CSSProperties;
  }
> = ({
  size = 120,
  color = "#FF6B4A",
  fromRadius = 0,
  toRadius = 60,
  rotation = 90,
  style,
  ...timing
}) => {
  const p = useMotionProgress(timing);
  return (
    <div
      style={{
        width: size,
        height: size,
        backgroundColor: color,
        borderRadius: fromRadius + (toRadius - fromRadius) * p,
        rotate: `${p * rotation}deg`,
        ...style,
      }}
    />
  );
};
