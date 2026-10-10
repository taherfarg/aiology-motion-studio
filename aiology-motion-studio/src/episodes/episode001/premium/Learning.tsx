import { useCurrentFrame } from "remotion";
import { Check } from "lucide-react";
import {
  Camera,
  Clay,
  Floor,
  KText,
  Layer,
  Spot,
  Tilt,
  hold,
  hexA,
  mix,
  ramp,
  tone,
} from "../../../kit";
import { Ink, Latin, Pet, Stroke, lin, quadratic } from "../redesign/art";
import { CX } from "./parts";

const grid = [
  { kind: "cat", label: "قطة" },
  { kind: "dog", label: "كلب" },
  { kind: "dog", label: "كلب" },
  { kind: "cat", label: "قطة" },
  { kind: "cat", label: "قطة" },
  { kind: "dog", label: "كلب" },
] as const;
const wash = { cat: tone.coralWash, dog: tone.mintWash } as const;
const hue = { cat: tone.coral, dog: tone.mint } as const;

// Simplified 3-layer model drawn inside the panel (illustrative, not a claim that all ML is a neural net).
const layers = [
  { x: 310, ys: [670, 800, 930] },
  { x: 500, ys: [635, 745, 855, 965] },
  { x: 690, ys: [690, 910] },
];
const PANEL = { x: 96, y: 480, w: 804, h: 640 };

const Tile: React.FC<{
  kind: "cat" | "dog";
  w: number;
  label?: string;
  labelOpacity?: number;
}> = ({ kind, w, label, labelOpacity = 1 }) => (
  <Clay
    color={wash[kind]}
    radius={w * 0.24}
    w={w}
    h={label ? w * 1.25 : w}
    lift={0.9}
    style={{ flexDirection: "column", gap: 4 }}
  >
    <Pet kind={kind} size={w * 0.78} color={hue[kind]} />
    {label && (
      <div style={{ opacity: labelOpacity }}>
        <Ink size={w * 0.22} weight={700}>
          {label}
        </Ink>
      </div>
    )}
  </Clay>
);

const Network: React.FC<{
  edge: number;
  color: string;
  nodes: [number, number, number];
  nodeColor: string;
}> = ({ edge, color, nodes, nodeColor }) => (
  <svg
    width={1080}
    height={1400}
    style={{ position: "absolute", left: 0, top: 0 }}
  >
    {layers
      .slice(0, -1)
      .flatMap((l, li) =>
        l.ys.flatMap((y1, i) =>
          layers[li + 1].ys.map((y2, j) => (
            <line
              key={`${li}-${i}-${j}`}
              x1={l.x}
              y1={y1}
              x2={layers[li + 1].x}
              y2={y2}
              stroke={edge > 0.02 ? color : hexA(tone.charcoal, 0.25)}
              strokeOpacity={0.25 + 0.6 * edge}
              strokeWidth={3 + 4 * edge}
              strokeLinecap="round"
            />
          )),
        ),
      )}
    {layers.map((l, li) =>
      l.ys.map((y, i) => (
        <circle
          key={`${li}-${i}`}
          cx={l.x}
          cy={y}
          r={34}
          fill={nodes[li] > 0.5 ? nodeColor : tone.white}
          stroke={tone.charcoal}
          strokeWidth={5}
        />
      )),
    )}
  </svg>
);

// Scene 3 (local frames from 18 s).
export const Learning: React.FC = () => {
  const f = useCurrentFrame(),
    asking = hold(f, 0, 64, 12, 14),
    examples = hold(f, 58, 140, 12, 16),
    rules = hold(f, 134, 262, 14, 16),
    model = ramp(f, 256, 16),
    training = hold(f, 256, 364, 14, 12),
    inference = ramp(f, 358, 14),
    train = ramp(f, 285, 70),
    infer = [lin(f, 398, 12), lin(f, 412, 12), lin(f, 426, 12)] as [
      number,
      number,
      number,
    ],
    landing = (i: number) => lin(f, 264 + i * 9, 22),
    pathAt = (t: number, from: [number, number], to: [number, number]) =>
      quadratic(t, from, [mix(from[0], to[0], 0.4), from[1] - 190], to);
  return (
    <Camera from={{ y: 80 }} to={{ y: 80, scale: 1.035 }}>
      <Layer depth={0}>
        <div style={{ opacity: asking }}>
          <Spot y={190}>
            <KText
              text="الكمبيوتر بيتعلّم إزاي؟"
              start={4}
              size={92}
              emphasis={["بيتعلّم"]}
            />
          </Spot>
          <Spot
            x={118}
            y={690}
            w={330}
            style={{
              transform: `translateY(${(1 - ramp(f, 8, 22)) * 60}px) rotate(-4deg)`,
            }}
          >
            <Tilt ry={14} rx={3} drift={1.5}>
              <Tile kind="cat" w={330} />
            </Tilt>
            <Floor w={250} style={{ margin: "20px auto 0" }} />
          </Spot>
          <Spot
            x={552}
            y={730}
            w={330}
            style={{
              transform: `translateY(${(1 - ramp(f, 16, 22)) * 60}px) rotate(4deg)`,
            }}
          >
            <Tilt ry={-14} rx={3} drift={1.5} phase={25}>
              <Tile kind="dog" w={330} />
            </Tilt>
            <Floor w={250} style={{ margin: "20px auto 0" }} />
          </Spot>
          <Spot
            cx={CX}
            y={520}
            w={150}
            style={{
              opacity: ramp(f, 26, 12),
              scale: 0.6 + 0.4 * ramp(f, 26, 22),
            }}
          >
            <Clay color={tone.lavender} radius={75} w={150} h={150} lift={1.1}>
              <Ink size={104} weight={700}>
                ?
              </Ink>
            </Clay>
          </Spot>
        </div>

        <div style={{ opacity: examples }}>
          <Spot y={200}>
            <Latin size={84}>Machine Learning</Latin>
          </Spot>
          <Spot y={330} style={{ opacity: ramp(f, 76, 14) }}>
            <Ink size={64} weight={600} color={tone.muted}>
              التعلّم من أمثلة
            </Ink>
          </Spot>
          {grid.map((g, i) => {
            const col = i % 3,
              row = Math.floor(i / 3),
              e = ramp(f, 64 + i * 5, 18);
            return (
              <Spot
                key={i}
                x={98 + col * 275}
                y={520 + row * 380}
                w={250}
                style={{
                  opacity: e,
                  transform: `translateY(${(1 - e) * 60}px) rotate(${[-3, 2, -2, 2, -2, 3][i]}deg)`,
                }}
              >
                <Tilt ry={(col - 1) * -7} rx={3} drift={1} phase={i * 9}>
                  <Tile
                    kind={g.kind}
                    w={250}
                    label={g.label}
                    labelOpacity={ramp(f, 76 + i * 5, 12)}
                  />
                </Tilt>
              </Spot>
            );
          })}
        </div>

        <div style={{ opacity: rules }}>
          <Spot y={190}>
            <KText
              text="بدل ما نكتب كل قاعدة"
              start={138}
              size={88}
              emphasis={["قاعدة"]}
              accent={tone.coral}
            />
          </Spot>
          <Spot
            x={96}
            y={520}
            w={804}
            style={{
              transform: `translateY(${(1 - ramp(f, 140, 22)) * 50}px)`,
            }}
          >
            <Tilt rx={5} ry={-6} drift={1}>
              <Clay
                color={tone.white}
                radius={70}
                w={804}
                h={660}
                lift={1.2}
                style={{ flexDirection: "column", gap: 56 }}
              >
                {[0, 1, 2].map((i) => (
                  <div
                    key={i}
                    style={{
                      position: "relative",
                      width: 640,
                      opacity: ramp(f, 148 + i * 8, 14),
                    }}
                  >
                    <Ink size={88} weight={600}>
                      لو… يبقى…
                    </Ink>
                    <svg
                      width={640}
                      height={30}
                      style={{ position: "absolute", left: 0, top: 52 }}
                    >
                      <Stroke
                        d="M610 15L30 15"
                        color={tone.coral}
                        strokeWidth={12}
                        progress={ramp(f, 176 + i * 24, 16)}
                      />
                    </svg>
                  </div>
                ))}
              </Clay>
            </Tilt>
          </Spot>
        </div>

        <div style={{ opacity: model }}>
          <div style={{ opacity: training }}>
            <Spot y={190}>
              <KText
                text="بندرّب نموذج"
                start={260}
                size={104}
                emphasis={["نموذج"]}
                accent={tone.lavender}
              />
            </Spot>
          </div>
          <div style={{ opacity: inference }}>
            <Spot y={190}>
              <KText
                text="بيكتشف أنماط"
                start={362}
                size={104}
                emphasis={["أنماط"]}
                accent={tone.yellow}
              />
            </Spot>
          </div>
          <Spot cx={CX} y={400} w={360} style={{ opacity: 1 }}>
            <Clay
              color={f < 358 ? tone.yellow : tone.mint}
              radius={50}
              w={360}
              h={76}
              lift={0.6}
            >
              <Ink size={44} weight={700}>
                {f < 358 ? "مرحلة التدريب" : "بعد التدريب"}
              </Ink>
            </Clay>
          </Spot>
          <Spot
            x={PANEL.x}
            y={PANEL.y}
            w={PANEL.w}
            style={{
              transform: `translateY(${(1 - ramp(f, 262, 22)) * 50}px)`,
            }}
          >
            <Tilt rx={4} ry={-3} drift={0.8}>
              <Clay
                color={tone.lavenderWash}
                radius={72}
                w={PANEL.w}
                h={PANEL.h}
                lift={1.2}
              />
            </Tilt>
          </Spot>
          <Spot cx={CX + 40} y={PANEL.y + 22} w={300}>
            <Ink size={46} weight={700} color={tone.muted}>
              النموذج
            </Ink>
          </Spot>
          <Network
            edge={f < 358 ? train : Math.max(train, (infer[0] + infer[1]) / 2)}
            color={f < 358 ? tone.coral : tone.mint}
            nodes={f < 358 ? [train, train, train] : infer}
            nodeColor={f < 358 ? tone.lavender : tone.mint}
          />
          {grid.map((g, i) => {
            const t = landing(i),
              pos = pathAt(t, [940, 1210], [195, 800]),
              size = mix(150, 62, t);
            return (
              <div
                key={i}
                style={{
                  position: "absolute",
                  left: pos.x - size / 2,
                  top: pos.y - size / 2,
                  opacity:
                    (t > 0 ? 1 : 0) *
                    (1 - ramp(f, 264 + i * 9 + 18, 6)) *
                    (f < 358 ? 1 : 0),
                }}
              >
                <Tile kind={g.kind} w={size} />
              </div>
            );
          })}
          <div style={{ opacity: inference }}>
            {(() => {
              const t = lin(f, 372, 26),
                pos = pathAt(t, [940, 1210], [195, 800]),
                size = mix(190, 150, t);
              return (
                <>
                  <div
                    style={{
                      position: "absolute",
                      left: pos.x - size / 2,
                      top: pos.y - size / 2,
                      opacity: t > 0 ? 1 : 0,
                    }}
                  >
                    <Tile kind="cat" w={size} />
                  </div>
                  <Spot
                    x={112}
                    y={890}
                    w={160}
                    style={{ opacity: ramp(f, 396, 14) }}
                  >
                    <Ink size={40} weight={700} color={tone.muted}>
                      صورة جديدة
                    </Ink>
                  </Spot>
                  <Spot
                    cx={815}
                    y={725}
                    w={160}
                    style={{
                      opacity: ramp(f, 440, 12),
                      scale: 0.7 + 0.3 * ramp(f, 440, 20),
                    }}
                  >
                    <Clay
                      color={tone.mint}
                      radius={56}
                      w={150}
                      h={150}
                      lift={1.2}
                      style={{ flexDirection: "column", gap: 4 }}
                    >
                      <Check
                        size={54}
                        strokeWidth={2.6}
                        color={tone.charcoal}
                      />
                      <Ink size={44} weight={700}>
                        قطة
                      </Ink>
                    </Clay>
                  </Spot>
                </>
              );
            })()}
          </div>
        </div>
      </Layer>
    </Camera>
  );
};
