import { useCurrentFrame } from "remotion";
import {
  Camera,
  Clay,
  Floor,
  KText,
  Layer,
  Spot,
  hold,
  mix,
  ramp,
  tone,
} from "../../../kit";
import { Ink, Latin } from "../redesign/art";
import { CX } from "./parts";

// Scene 5 (local frames from 46 s): the next question, then the nested concepts become the brand mark.
export const Closing: React.FC = () => {
  const f = useCurrentFrame(),
    question = hold(f, 0, 112, 12, 14),
    collapse = ramp(f, 100, 26),
    brand = ramp(f, 112, 22),
    dots = [tone.coral, tone.yellow, tone.mint, tone.lavender];
  return (
    <Camera from={{ y: 80 }} to={{ y: 80, scale: 1.04 }} duration={120}>
      <Layer depth={0}>
        <div style={{ opacity: question }}>
          <Spot y={190} style={{ opacity: ramp(f, 4, 14) }}>
            <Ink size={54} color={tone.muted}>
              في الفيديو الجاي
            </Ink>
          </Spot>
          <Spot y={268}>
            <KText
              text="إيه الفرق؟"
              start={8}
              size={136}
              emphasis={["الفرق؟"]}
              accent={tone.coral}
            />
          </Spot>
        </div>
        <Spot
          cx={CX}
          y={560}
          w={640}
          style={{
            opacity: ramp(f, 14, 14) * (1 - collapse),
            transform: `scale(${mix(1, 0.25, collapse)}) translateY(${collapse * 180}px)`,
          }}
        >
          <Clay
            color={tone.lavenderWash}
            radius={130}
            w={640}
            h={640}
            lift={1.3}
            style={{
              alignItems: "flex-start",
              justifyContent: "flex-start",
              padding: 54,
            }}
          >
            <Latin size={104}>AI</Latin>
          </Clay>
          <Floor w={500} style={{ margin: "30px auto 0" }} />
        </Spot>
        <Spot
          cx={CX}
          y={860}
          w={470}
          style={{
            opacity: ramp(f, 44, 12) * (1 - collapse),
            transform: `translateY(${(1 - ramp(f, 44, 22)) * 60 + collapse * -60}px) scale(${mix(1, 0.3, collapse)})`,
          }}
        >
          <Clay color={tone.lavender} radius={90} w={470} h={260} lift={1.3}>
            <Latin size={54}>Machine Learning</Latin>
          </Clay>
        </Spot>

        <div style={{ opacity: brand }}>
          <Spot y={660} style={{ transform: `scale(${0.92 + 0.08 * brand})` }}>
            <Latin size={150}>AIOLOGY</Latin>
          </Spot>
          <Spot
            cx={CX}
            y={870}
            w={400}
            style={{ display: "flex", justifyContent: "center", gap: 28 }}
          >
            {dots.map((c, i) => (
              <div
                key={i}
                style={{
                  width: 34,
                  height: 34,
                  borderRadius: 17,
                  backgroundColor: c,
                  transform: `scale(${ramp(f, 122 + i * 8, 16)})`,
                }}
              />
            ))}
          </Spot>
          <Spot y={960}>
            <KText
              text="الذكاء الاصطناعي ببساطة"
              start={130}
              size={64}
              weight={600}
            />
          </Spot>
        </div>
      </Layer>
    </Camera>
  );
};
