import React, { type CSSProperties, type ReactNode } from "react";
import type { Caption } from "@remotion/captions";
import { useCurrentFrame, useVideoConfig } from "remotion";
import {
  SmoothEntrance,
  useMotionProgress,
  type Timing,
} from "../animations/motion";
import { palette, typography, safeZone } from "../themes/brand";
import { activeCaption } from "../utils/timing";

export type TextProps = Timing & {
  text?: string;
  children?: ReactNode;
  color?: string;
  fontSize?: number;
  width?: number;
  align?: "left" | "right" | "center";
  direction?: "rtl" | "ltr";
  style?: CSSProperties;
};
export const ArabicText: React.FC<TextProps> = ({
  text,
  children,
  color = palette.charcoal,
  fontSize = typography.body,
  width,
  align = "center",
  direction = "rtl",
  style,
}) => (
  <div
    data-aiology-text
    dir={direction}
    lang={direction === "rtl" ? "ar" : "en"}
    style={{
      fontFamily: typography.family,
      fontSize,
      color,
      width,
      lineHeight: 1.6,
      textAlign: align,
      unicodeBidi: "plaintext",
      overflowWrap: "break-word",
      ...style,
    }}
  >
    {children ?? text}
  </div>
);
export const EnglishTerm: React.FC<{ children: ReactNode }> = ({
  children,
}) => (
  <bdi dir="ltr" lang="en" style={{ unicodeBidi: "isolate" }}>
    {children}
  </bdi>
);
export const AnimatedTitle: React.FC<TextProps> = ({
  start,
  duration,
  easing,
  ...props
}) => (
  <SmoothEntrance start={start} duration={duration} easing={easing}>
    <ArabicText
      {...props}
      fontSize={props.fontSize ?? typography.title}
      style={{ fontWeight: 700, ...props.style }}
    />
  </SmoothEntrance>
);
// Reveal whole words to preserve Arabic joins; never split Arabic into letters.
export const WordReveal: React.FC<TextProps & { stagger?: number }> = ({
  text = "",
  stagger = 5,
  start = 0,
  duration = 18,
  easing,
  ...props
}) => (
  // Atomic word boxes are neutral to bidi resolution. Respect explicit direction
  // instead of plaintext's first-strong inference, which can reverse Arabic words.
  <ArabicText {...props} style={{ ...props.style, unicodeBidi: "isolate" }}>
    <span style={{ display: "inline" }}>
      {text.split(/\s+/u).map((word, i) => (
        <Word
          key={i}
          word={word}
          start={start + i * stagger}
          duration={duration}
          easing={easing}
        />
      ))}
    </span>
  </ArabicText>
);
const Word: React.FC<Timing & { word: string }> = ({ word, ...timing }) => (
  <span
    style={{
      opacity: useMotionProgress(timing),
      display: "inline-block",
      marginInlineEnd: "0.25em",
    }}
  >
    {word}
  </span>
);
export const KineticText: React.FC<TextProps & { scaleFrom?: number }> = ({
  scaleFrom = 0.96,
  ...props
}) => {
  const p = useMotionProgress(props);
  return (
    <ArabicText
      {...props}
      style={{
        opacity: p,
        scale: scaleFrom + (1 - scaleFrom) * p,
        ...props.style,
      }}
    />
  );
};
export const HighlightedKeyword: React.FC<
  TextProps & { highlightColor?: string }
> = ({ highlightColor = palette.yellow, ...props }) => (
  <ArabicText {...props}>
    <span
      style={{
        backgroundColor: highlightColor,
        borderRadius: 10,
        padding: "0.03em 0.22em",
        boxDecorationBreak: "clone",
      }}
    >
      {props.children ?? props.text}
    </span>
  </ArabicText>
);
export const ArabicCaption: React.FC<{
  captions: Caption[];
  fontSize?: number;
  color?: string;
  accent?: string;
  bottom?: number;
  width?: number;
  style?: CSSProperties;
}> = ({
  captions,
  fontSize = typography.caption,
  color = palette.charcoal,
  accent = palette.yellow,
  bottom = safeZone.captionBottom,
  width = 804,
  style,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const caption = activeCaption(captions, (frame * 1000) / fps);
  if (!caption) return null;
  return (
    <div
      data-caption
      style={{
        position: "absolute",
        left: safeZone.left,
        bottom,
        width,
        padding: "14px 22px",
        boxSizing: "border-box",
        borderRadius: 18,
        backgroundColor: palette.white,
        border: `2px solid ${accent}`,
        ...style,
      }}
    >
      <ArabicText
        text={caption.text}
        color={color}
        fontSize={fontSize}
        style={{ fontWeight: 600 }}
      />
    </div>
  );
};
