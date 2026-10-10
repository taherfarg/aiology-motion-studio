import React from "react";
import { useCurrentFrame } from "remotion";
import { useMotionProgress, type Timing } from "../animations/motion";
import { palette, typography } from "../themes/brand";

export type Point = { x: number; y: number };
export const AnimatedNode: React.FC<
  Timing &
    Point & {
      radius?: number;
      color?: string;
      label?: string;
      fontSize?: number;
    }
> = ({
  x,
  y,
  radius = 32,
  color = palette.coral,
  label,
  fontSize = 30,
  ...timing
}) => {
  const p = useMotionProgress(timing);
  return (
    <g opacity={p}>
      <circle cx={x} cy={y} r={radius * (0.85 + 0.15 * p)} fill={color} />
      {label && (
        <text
          x={x}
          y={y + radius + 45}
          textAnchor="middle"
          direction="rtl"
          fill={palette.charcoal}
          fontFamily={typography.family}
          fontSize={fontSize}
        >
          {label}
        </text>
      )}
    </g>
  );
};
export const ConnectionLine: React.FC<
  Timing & {
    from: Point;
    to: Point;
    color?: string;
    strokeWidth?: number;
    dashed?: boolean;
  }
> = ({
  from,
  to,
  color = palette.line,
  strokeWidth = 4,
  dashed = false,
  ...timing
}) => {
  const p = useMotionProgress(timing);
  return (
    <line
      x1={from.x}
      y1={from.y}
      x2={to.x}
      y2={to.y}
      stroke={color}
      strokeWidth={strokeWidth}
      pathLength={1}
      strokeDasharray={dashed ? "0.025 0.025" : 1}
      strokeDashoffset={dashed ? 0 : 1 - p}
      opacity={dashed ? p : 1}
    />
  );
};
export const NeuralNetwork: React.FC<
  Timing & {
    layers?: number[];
    width?: number;
    height?: number;
    colors?: string[];
    nodeRadius?: number;
    stagger?: number;
  }
> = ({
  layers = [3, 4, 2],
  width = 720,
  height = 360,
  colors = [palette.coral, palette.lavender, palette.mint],
  nodeRadius = 24,
  stagger = 8,
  start = 0,
  duration = 24,
  easing,
}) => {
  if (layers.some((n) => !Number.isInteger(n) || n < 1) || layers.length < 2)
    throw new Error("NeuralNetwork needs at least two non-empty layers");
  const points = layers.map((count, layer) =>
    Array.from({ length: count }, (_, i) => ({
      x: 60 + (layer * (width - 120)) / (layers.length - 1),
      y: 40 + ((i + 1) * (height - 80)) / (count + 1),
    })),
  );
  return (
    <svg
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      aria-label="Neural network diagram"
    >
      {points
        .slice(0, -1)
        .flatMap((group, layer) =>
          group.flatMap((from, i) =>
            points[layer + 1].map((to, j) => (
              <ConnectionLine
                key={`${layer}-${i}-${j}`}
                from={from}
                to={to}
                start={start + layer * stagger}
                duration={duration}
                easing={easing}
              />
            )),
          ),
        )}
      {points.flatMap((group, layer) =>
        group.map((point, i) => (
          <AnimatedNode
            key={`${layer}-${i}`}
            {...point}
            radius={nodeRadius}
            color={colors[layer % colors.length]}
            start={start + layer * stagger}
            duration={duration}
            easing={easing}
          />
        )),
      )}
    </svg>
  );
};
export const DataFlow: React.FC<
  Timing & {
    points?: Point[];
    width?: number;
    height?: number;
    color?: string;
    cycleFrames?: number;
    particleRadius?: number;
  }
> = ({
  points = [
    { x: 70, y: 90 },
    { x: 360, y: 90 },
    { x: 650, y: 90 },
  ],
  width = 720,
  height = 180,
  color = palette.mint,
  cycleFrames = 60,
  particleRadius = 9,
  ...timing
}) => {
  const frame = useCurrentFrame();
  const p = useMotionProgress(timing);
  if (points.length < 2 || cycleFrames <= 0)
    throw new Error("DataFlow needs two points and a positive cycle");
  const travel =
    ((Math.max(0, frame - (timing.start ?? 0)) % cycleFrames) / cycleFrames) *
    (points.length - 1);
  const index = Math.min(points.length - 2, Math.floor(travel));
  const fraction = travel - index;
  const from = points[index],
    to = points[index + 1];
  return (
    <svg width={width} height={height} aria-label="Information flow">
      {points.slice(1).map((point, i) => (
        <ConnectionLine
          key={i}
          from={points[i]}
          to={point}
          color={palette.line}
          {...timing}
        />
      ))}
      {points.map((point, i) => (
        <AnimatedNode
          key={i}
          {...point}
          radius={22}
          color={color}
          {...timing}
        />
      ))}
      <circle
        cx={from.x + (to.x - from.x) * fraction}
        cy={from.y + (to.y - from.y) * fraction}
        r={particleRadius}
        fill={palette.charcoal}
        opacity={p}
      />
    </svg>
  );
};
