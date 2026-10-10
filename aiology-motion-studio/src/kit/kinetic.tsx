import React, { type CSSProperties, type ReactNode } from "react";
import { useCurrentFrame, useVideoConfig } from "remotion";
import type { Caption } from "@remotion/captions";
import { ArabicText, EnglishTerm } from "../components";
import { typography } from "../themes/brand";
import { activeCaption } from "../utils/timing";
import { hexA, ramp, tone } from "./tokens";
import "../utils/fonts";

const TERMS = /(Machine Learning|ChatGPT|AIOLOGY|AI)/;
const PUNCT = /^[،؟!…:;.]+$/u;
// Terms stay isolated LTR runs; trailing punctuation sticks to the previous word.
export const tokenize = (text: string) => {
  const out: { w: string; latin: boolean; tail: string }[] = [];
  text.split(TERMS).forEach((piece, i) =>
    i % 2
      ? out.push({ w: piece, latin: true, tail: "" })
      : piece
          .split(/\s+/u)
          .filter(Boolean)
          .forEach((w) =>
            PUNCT.test(w) && out.length
              ? (out[out.length - 1].tail += w)
              : out.push({ w, latin: false, tail: "" }),
          ),
  );
  return out;
};

export const Terms: React.FC<{ text: string }> = ({ text }) => (
  <>
    {text
      .split(TERMS)
      .map((piece, i) =>
        i % 2 ? (
          <EnglishTerm key={i}>{piece}</EnglishTerm>
        ) : (
          <React.Fragment key={i}>{piece}</React.Fragment>
        ),
      )}
  </>
);

// Whole-word rise-and-focus reveal. Words are never split into letters, so Arabic joins survive.
export const KText: React.FC<{
  text: string;
  start?: number;
  size?: number;
  weight?: number;
  color?: string;
  accent?: string;
  emphasis?: string[];
  stagger?: number;
  align?: "right" | "center" | "left";
  style?: CSSProperties;
}> = ({
  text,
  start = 0,
  size = 84,
  weight = 700,
  color = tone.charcoal,
  accent = tone.yellow,
  emphasis = [],
  stagger = 4,
  align = "center",
  style,
}) => {
  const frame = useCurrentFrame();
  return (
    <ArabicText
      fontSize={size}
      color={color}
      align={align}
      style={{
        fontWeight: weight,
        lineHeight: 1.42,
        unicodeBidi: "isolate",
        ...style,
      }}
    >
      {tokenize(text).map((t, i) => {
        const p = ramp(frame, start + i * stagger, 20),
          underline = ramp(frame, start + i * stagger + 12, 16);
        return (
          <span
            key={i}
            style={{
              display: "inline-block",
              position: "relative",
              marginInlineEnd: "0.26em",
              opacity: p,
              transform: `translateY(${(1 - p) * 0.38}em)`,
              filter: p < 1 ? `blur(${(1 - p) * 7}px)` : undefined,
            }}
          >
            {t.latin ? <EnglishTerm>{t.w}</EnglishTerm> : t.w}
            {t.tail}
            {emphasis.includes(t.w) && (
              <span
                style={{
                  position: "absolute",
                  insetInline: "-0.04em",
                  bottom: "0.04em",
                  height: "0.13em",
                  borderRadius: 99,
                  backgroundColor: accent,
                  opacity: 0.9,
                  zIndex: -1,
                  transformOrigin: "right center",
                  transform: `scaleX(${underline})`,
                }}
              />
            )}
          </span>
        );
      })}
    </ArabicText>
  );
};

// Full-width soft pill. One caption phrase at a time, kept above the platform-controls zone.
export const CaptionPill: React.FC<{ captions: Caption[]; y?: number }> = ({
  captions,
  y = 1388,
}) => {
  const frame = useCurrentFrame(),
    { fps } = useVideoConfig(),
    caption = activeCaption(captions, (frame * 1000) / fps);
  if (!caption) return null;
  const start = Math.round((caption.startMs * fps) / 1000),
    p = ramp(frame, start, 9);
  return (
    <div
      data-caption
      style={{
        position: "absolute",
        top: y,
        left: 96,
        width: 804,
        display: "flex",
        justifyContent: "center",
        opacity: p,
        transform: `translateY(${(1 - p) * 16}px)`,
      }}
    >
      <div
        style={{
          borderRadius: 52,
          padding: "10px 40px",
          backgroundColor: hexA("#FFFFFF", 0.96),
          boxShadow: `0 1px 2px ${hexA(tone.charcoal, 0.08)}, 0 16px 36px -12px ${hexA(tone.charcoal, 0.18)}`,
          maxWidth: 804,
          boxSizing: "border-box",
        }}
      >
        <ArabicText
          fontSize={typography.caption - 2}
          style={{
            fontWeight: 600,
            lineHeight: 1.55,
            textWrap: "balance",
            unicodeBidi: "isolate",
          }}
        >
          <Terms text={caption.text} />
        </ArabicText>
      </div>
    </div>
  );
};

export const BrandBug: React.FC<{ children?: ReactNode }> = () => (
  <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
    <div
      style={{
        width: 14,
        height: 14,
        borderRadius: 5,
        backgroundColor: tone.coral,
      }}
    />
    <ArabicText
      direction="ltr"
      fontSize={32}
      style={{ fontWeight: 700, lineHeight: 1 }}
    >
      AIOLOGY
    </ArabicText>
  </div>
);
