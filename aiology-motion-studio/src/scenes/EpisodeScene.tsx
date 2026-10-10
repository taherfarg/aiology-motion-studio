import React from "react";
import { AbsoluteFill } from "remotion";
import type { EpisodeScene as SceneData } from "../utils/episode-schema";
import {
  AnimatedTitle,
  ArabicText,
  ConceptCard,
  ProcessDiagram,
  ComparisonDiagram,
  NeuralNetwork,
  DataFlow,
  SmoothEntrance,
} from "../components";
import { palette, safeZone } from "../themes/brand";

export const EpisodeScene: React.FC<{ scene: SceneData }> = ({ scene }) => (
  <AbsoluteFill
    style={{
      backgroundColor: palette.white,
      padding: `${safeZone.top}px ${safeZone.right}px ${safeZone.bottom + 220}px ${safeZone.left}px`,
      boxSizing: "border-box",
    }}
  >
    <AnimatedTitle text={scene.title} fontSize={72} align="right" />
    <div style={{ marginTop: 70 }}>
      {scene.type === "title" && (
        <SmoothEntrance start={12}>
          <ArabicText text={scene.description} fontSize={52} />
        </SmoothEntrance>
      )}
      {scene.type === "concept" && (
        <ConceptCard
          title={scene.title}
          description={scene.description}
          width={804}
          accent={scene.accent}
          start={12}
        />
      )}
      {scene.type === "process" && (
        <ProcessDiagram
          steps={scene.steps ?? []}
          width={804}
          accent={scene.accent}
          start={12}
        />
      )}
      {scene.type === "comparison" && scene.comparison && (
        <ComparisonDiagram
          {...scene.comparison}
          width={804}
          start={12}
          layout="vertical"
        />
      )}
      {scene.type === "neural" && (
        <NeuralNetwork
          layers={scene.layers}
          width={804}
          height={560}
          start={12}
        />
      )}
      {scene.type === "dataflow" && <DataFlow width={804} start={12} />}
    </div>
  </AbsoluteFill>
);
