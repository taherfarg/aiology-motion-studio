import { Sequence, interpolate, useCurrentFrame } from "remotion";
import { gentleEase } from "../../../animations/motion";
import { Camera, Clay, Floor, Layer, Spot, Tilt, tone } from "../../../kit";
import { Latin } from "../redesign/art";
import { Hook } from "./Hook";
import { Intelligence } from "./Intelligence";
import { CX } from "./parts";
import { HOOK_FRAMES, OPENING_FRAMES } from "./plan";

const keys = [172, 200, 236, 300, 325, 465, 495, 540];
const at = (f: number, values: number[]) =>
  interpolate(f, keys, values, {
    easing: gentleEase,
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

// The AI cube is one persistent object across the hook and the AI scene, so the cut carries it.
const AiCube: React.FC = () => {
  const f = useCurrentFrame(),
    size = at(f, [0, 300, 420, 420, 330, 330, 250, 250]),
    cy = at(f, [1010, 1010, 800, 800, 830, 830, 560, 560]);
  if (size < 4) return null;
  return (
    <Spot cx={CX} y={cy - size / 2} w={size}>
      <Tilt rx={6} ry={-9} drift={2.2}>
        <Clay
          color={tone.lavender}
          radius={size * 0.22}
          w={size}
          h={size}
          lift={1.3}
        >
          <Latin size={size * 0.52}>AI</Latin>
        </Clay>
      </Tilt>
      <Floor
        w={size * 0.9}
        h={50}
        style={{ margin: `${size * 0.1 + 18}px auto 0` }}
        strength={0.18}
      />
    </Spot>
  );
};

export const Opening: React.FC = () => (
  <Camera
    from={{ scale: 1, rx: 1.5, ry: -2.5, y: 80 }}
    to={{ scale: 1.07, rx: -1, ry: 2.5, y: 60 }}
    duration={OPENING_FRAMES}
  >
    <Sequence name="Hook" durationInFrames={HOOK_FRAMES + 20} layout="none">
      <Hook />
    </Sequence>
    <Layer depth={0.05}>
      <AiCube />
    </Layer>
    <Sequence
      name="AI"
      from={HOOK_FRAMES}
      durationInFrames={OPENING_FRAMES - HOOK_FRAMES + 20}
      layout="none"
    >
      <Intelligence />
    </Sequence>
  </Camera>
);
