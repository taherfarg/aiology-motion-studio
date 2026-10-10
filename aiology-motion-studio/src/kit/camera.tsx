import React, { createContext, useContext, type ReactNode } from "react";
import { AbsoluteFill, useCurrentFrame, useVideoConfig } from "remotion";
import { progressAt } from "../utils/timing";
import { mix, settle } from "./tokens";

export type Pose = {
  x: number;
  y: number;
  scale: number;
  rx: number;
  ry: number;
};
const rest: Pose = { x: 0, y: 0, scale: 1, rx: 0, ry: 0 };
const PoseContext = createContext<Pose>(rest);

// A slow virtual camera: translate, push-in and a slight perspective tilt of the whole shot.
export const Camera: React.FC<{
  from?: Partial<Pose>;
  to?: Partial<Pose>;
  start?: number;
  duration?: number;
  children: ReactNode;
}> = ({ from, to, start = 0, duration, children }) => {
  const frame = useCurrentFrame(),
    { durationInFrames } = useVideoConfig(),
    t = settle(progressAt(frame, start, duration ?? durationInFrames - start)),
    a = { ...rest, ...from },
    b = { ...rest, ...to },
    pose: Pose = {
      x: mix(a.x, b.x, t),
      y: mix(a.y, b.y, t),
      scale: mix(a.scale, b.scale, t),
      rx: mix(a.rx, b.rx, t),
      ry: mix(a.ry, b.ry, t),
    };
  return (
    <AbsoluteFill style={{ perspective: 1800 }}>
      <AbsoluteFill
        style={{
          transform: `translate(${pose.x}px, ${pose.y}px) scale(${pose.scale}) rotateX(${pose.rx}deg) rotateY(${pose.ry}deg)`,
        }}
      >
        <PoseContext.Provider value={pose}>{children}</PoseContext.Provider>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

// depth < 0 lags behind the camera (far), depth > 0 leads it (near). Parallax comes from this alone.
export const Layer: React.FC<{
  depth?: number;
  children: ReactNode;
  style?: React.CSSProperties;
}> = ({ depth = 0, children, style }) => {
  const pose = useContext(PoseContext);
  return (
    <AbsoluteFill
      style={{
        translate: `${pose.x * depth}px ${pose.y * depth}px`,
        scale: 1 + (pose.scale - 1) * depth,
        ...style,
      }}
    >
      {children}
    </AbsoluteFill>
  );
};

// Hero objects: perspective tilt with a very small frame-driven drift so they never freeze.
export const Tilt: React.FC<{
  rx?: number;
  ry?: number;
  rz?: number;
  drift?: number;
  phase?: number;
  children: ReactNode;
  style?: React.CSSProperties;
}> = ({ rx = 0, ry = 0, rz = 0, drift = 2, phase = 0, children, style }) => {
  const frame = useCurrentFrame() + phase;
  return (
    <div
      style={{
        transform: `perspective(1500px) rotateX(${rx + Math.sin(frame / 52) * drift * 0.6}deg) rotateY(${ry + Math.sin(frame / 41) * drift}deg) rotateZ(${rz}deg) translateY(${Math.sin(frame / 37) * drift * 1.8}px)`,
        ...style,
      }}
    >
      {children}
    </div>
  );
};
