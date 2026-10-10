import React from "react";
import { AbsoluteFill, Sequence, staticFile, useCurrentFrame } from "remotion";
import { Audio } from "@remotion/media";
import { Database } from "lucide-react";
import {
  AnimatedTitle,
  ArabicText,
  EnglishTerm,
  WordReveal,
  KineticText,
  HighlightedKeyword,
  ArabicCaption,
  AnimatedArrow,
  FloatingCard,
  ConceptCard,
  AnimatedIcon,
  GeometricShape,
  ProgressIndicator,
  NeuralNetwork,
  DataFlow,
  ProcessDiagram,
  ComparisonDiagram,
  AnimatedNode,
  ConnectionLine,
  StaggeredReveal,
  ShapeTransformation,
  SceneTransition,
  CameraMove,
} from "../components";
import { palette } from "../themes/brand";

// Technical fixture only. No educational episode or synthetic narration.
export const TechnicalCheck: React.FC = () => {
  const frame = useCurrentFrame();
  return (
    <AbsoluteFill
      style={{ backgroundColor: palette.white, color: palette.charcoal }}
    >
      <div style={{ position: "absolute", top: 180, left: 96, width: 804 }}>
        <ArabicText fontSize={32} direction="ltr" align="left">
          AIOLOGY / TECHNICAL CHECK
        </ArabicText>
        <AnimatedTitle
          text="اختبار استوديو الحركة"
          fontSize={72}
          align="right"
        />
        <ArabicText fontSize={40}>
          العربي مع <EnglishTerm>AI / LLM</EnglishTerm> بشكل واضح
        </ArabicText>
      </div>
      <Sequence durationInFrames={60} premountFor={30}>
        <div style={{ position: "absolute", left: 96, top: 560, width: 804 }}>
          <WordReveal text="كلمات عربية مترابطة وواضحة" fontSize={48} />
          <KineticText text="حركة هادئة" fontSize={48} start={5} />
          <HighlightedKeyword text="وضوح الفكرة" fontSize={48} />
          <StaggeredReveal
            direction="row"
            gap={45}
            start={10}
            style={{ justifyContent: "center", marginTop: 60 }}
          >
            <AnimatedIcon icon={Database} color={palette.charcoal} />
            <GeometricShape shape="hexagon" color={palette.mint} size={96} />
            <AnimatedArrow width={140} color={palette.coral} />
          </StaggeredReveal>
          <FloatingCard width={804} style={{ marginTop: 50 }}>
            <ArabicText text="تجربة تقنية — مش حلقة تعليمية" fontSize={40} />
          </FloatingCard>
        </div>
      </Sequence>
      <Sequence from={60} durationInFrames={60} premountFor={30}>
        <div style={{ position: "absolute", left: 96, top: 520 }}>
          <NeuralNetwork width={804} height={400} />
          <DataFlow width={804} height={180} />
          <ComparisonDiagram
            width={804}
            left={{ title: "أ", description: "فئة أولى" }}
            right={{ title: "ب", description: "فئة ثانية" }}
          />
        </div>
      </Sequence>
      <Sequence from={120} durationInFrames={60} premountFor={30}>
        <div style={{ position: "absolute", left: 96, top: 500, width: 804 }}>
          <SceneTransition duration={12}>
            <CameraMove duration={60} to={{ x: 0, y: 0, scale: 1.01 }}>
              <ProcessDiagram steps={["البداية", "النهاية"]} width={804} />
            </CameraMove>
          </SceneTransition>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-around",
              marginTop: 50,
            }}
          >
            <ShapeTransformation color={palette.lavender} size={110} />
            <svg width={300} height={160}>
              <ConnectionLine
                from={{ x: 50, y: 60 }}
                to={{ x: 250, y: 60 }}
                color={palette.charcoal}
              />
              <AnimatedNode x={50} y={60} label="أ" />
              <AnimatedNode x={250} y={60} label="ب" color={palette.mint} />
            </svg>
          </div>
          <ConceptCard title="المكوّنات جاهزة للاختبار" width={804} start={8} />
        </div>
      </Sequence>
      <div style={{ position: "absolute", left: 96, top: 1410 }}>
        <ProgressIndicator width={804} value={frame / 179} />
      </div>
      <ArabicCaption
        captions={[
          {
            text: "نص عربي واضح — اختبار التصدير فقط",
            startMs: 300,
            endMs: 6000,
            timestampMs: null,
            confidence: null,
          },
        ]}
      />
      <Audio src={staticFile("audio/technical-silence.wav")} premountFor={30} />
    </AbsoluteFill>
  );
};
