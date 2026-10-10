import React, { type CSSProperties } from "react";
import { ConceptCard, AnimatedArrow } from "../components/visuals";
import { palette } from "../themes/brand";
import type { Timing } from "../animations/motion";

export const ProcessDiagram: React.FC<
  Timing & {
    steps: string[];
    layout?: "vertical" | "horizontal";
    width?: number;
    accent?: string;
    stagger?: number;
    style?: CSSProperties;
  }
> = ({
  steps,
  layout = "vertical",
  width = 720,
  accent = palette.coral,
  stagger = 10,
  start = 0,
  duration = 24,
  easing,
  style,
}) => (
  <div
    dir="rtl"
    style={{
      display: "flex",
      alignItems: "center",
      flexDirection: layout === "vertical" ? "column" : "row",
      gap: 14,
      width,
      ...style,
    }}
  >
    {steps.map((step, i) => (
      <React.Fragment key={i}>
        <ConceptCard
          title={step}
          width={
            layout === "vertical"
              ? width
              : Math.max(160, (width - (steps.length - 1) * 64) / steps.length)
          }
          accent={accent}
          start={start + i * stagger}
          duration={duration}
          easing={easing}
        />
        {i < steps.length - 1 && (
          <AnimatedArrow
            width={48}
            height={48}
            direction={layout === "vertical" ? "down" : "left"}
            color={accent}
            start={start + i * stagger + 8}
            duration={duration}
          />
        )}
      </React.Fragment>
    ))}
  </div>
);
export const ComparisonDiagram: React.FC<
  Timing & {
    left: { title: string; description?: string };
    right: { title: string; description?: string };
    width?: number;
    colors?: [string, string];
    layout?: "horizontal" | "vertical";
    style?: CSSProperties;
  }
> = ({
  left,
  right,
  width = 780,
  colors = [palette.coral, palette.mint],
  layout = "horizontal",
  style,
  ...timing
}) => (
  <div
    dir="rtl"
    style={{
      width,
      display: "flex",
      gap: 24,
      flexDirection: layout === "horizontal" ? "row" : "column",
      ...style,
    }}
  >
    <ConceptCard
      {...left}
      width={layout === "horizontal" ? (width - 24) / 2 : width}
      accent={colors[0]}
      {...timing}
    />
    <ConceptCard
      {...right}
      width={layout === "horizontal" ? (width - 24) / 2 : width}
      accent={colors[1]}
      {...timing}
      start={(timing.start ?? 0) + 6}
    />
  </div>
);
