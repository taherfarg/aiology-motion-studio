import { useCurrentFrame } from "remotion";
import { Image, Languages, MessageSquare, User } from "lucide-react";
import { Clay, KText, Layer, Spot, hold, ramp, tone } from "../../../kit";
import { Ink, Stroke, lin } from "../redesign/art";
import { CX, Connector, FlowDot, IconTile } from "./parts";

// Scene 2 (local = global - 210). The AI cube itself lives in Opening so it carries across the cut.
const floaters = [
  { icon: Image, color: tone.coral, x: 100, y: 520, at: 22 },
  { icon: Languages, color: tone.mint, x: 746, y: 690, at: 32 },
  { icon: MessageSquare, color: tone.yellow, x: 270, y: 1090, at: 42 },
] as const;

export const Intelligence: React.FC = () => {
  const f = useCurrentFrame(),
    a = hold(f, 0, 96, 12, 14),
    b = hold(f, 90, 188, 14, 14),
    c = hold(f, 182, 264, 14, 14),
    d = ramp(f, 255, 18),
    inputPill = hold(f, 96, 184, 14, 12),
    humanPill = hold(f, 184, 262, 14, 14),
    output = hold(f, 100, 264, 14, 16);
  return (
    <>
      <Layer depth={0.35}>
        {floaters.map((s, i) => {
          const o = hold(f, s.at, 96, 16, 14);
          return (
            <Spot
              key={i}
              x={s.x}
              y={s.y}
              w={150}
              style={{
                opacity: o,
                transform: `translateY(${(1 - ramp(f, s.at, 24)) * 60}px) rotate(${[-6, 5, -4][i]}deg)`,
              }}
            >
              <Clay color={s.color} radius={44} w={150} h={150} lift={1.1}>
                <s.icon size={78} strokeWidth={1.9} color={tone.charcoal} />
              </Clay>
            </Spot>
          );
        })}
      </Layer>
      <Layer depth={0}>
        <div style={{ opacity: a }}>
          <Spot y={196}>
            <KText
              text="الذكاء الاصطناعي"
              start={6}
              size={112}
              emphasis={["الاصطناعي"]}
            />
          </Spot>
        </div>
        <div style={{ opacity: b }}>
          <Spot y={196}>
            <KText
              text="نصمّم أنظمة"
              start={94}
              size={112}
              emphasis={["أنظمة"]}
              accent={tone.lavender}
            />
          </Spot>
        </div>
        <div style={{ opacity: c }}>
          <Spot y={170}>
            <KText
              text="مهام كانت بتحتاج ذكاء بشري"
              start={186}
              size={72}
              emphasis={["بشري"]}
            />
          </Spot>
        </div>

        <div style={{ opacity: output * (1 - d) }}>
          <Connector from={540} to={665} progress={ramp(f, 100, 14)} />
          <Connector from={995} to={1110} progress={ramp(f, 126, 16)} />
          <Spot
            cx={CX}
            y={1110}
            w={420}
            style={{
              transform: `translateY(${(1 - ramp(f, 126, 20)) * 30}px)`,
            }}
          >
            <Clay color={tone.mint} radius={60} w={420} h={100} lift={0.9}>
              <Ink size={56} weight={700}>
                نتائج
              </Ink>
            </Clay>
          </Spot>
        </div>
        <div style={{ opacity: inputPill * (1 - d) }}>
          <Spot cx={CX} y={440} w={420}>
            <Clay color={tone.coral} radius={60} w={420} h={100} lift={0.9}>
              <Ink size={56} weight={700}>
                مدخلات
              </Ink>
            </Clay>
          </Spot>
          <FlowDot x={CX} from={540} to={665} t={lin(f, 112, 14)} />
          <FlowDot
            x={CX}
            from={995}
            to={1110}
            t={lin(f, 142, 16)}
            color={tone.mint}
          />
        </div>
        <div style={{ opacity: humanPill * (1 - d) }}>
          <Spot cx={CX} y={440} w={440}>
            <Clay
              color={tone.yellow}
              radius={60}
              w={440}
              h={110}
              lift={0.9}
              style={{ gap: 20 }}
            >
              <User size={64} strokeWidth={2} color={tone.charcoal} />
              <Ink size={54} weight={700}>
                ذكاء بشري
              </Ink>
            </Clay>
          </Spot>
          <Spot
            cx={CX}
            y={560 + 80 * lin(f, 200, 30)}
            w={210}
            style={{ opacity: lin(f, 196, 6) * (1 - lin(f, 226, 8)) }}
          >
            <Clay color={tone.white} radius={40} w={210} h={72} lift={0.8}>
              <Ink size={40} weight={700}>
                مهمة
              </Ink>
            </Clay>
          </Spot>
          <Spot
            cx={CX}
            y={995 + 90 * lin(f, 232, 22)}
            w={210}
            style={{ opacity: lin(f, 232, 4) * (1 - lin(f, 250, 6)) }}
          >
            <Clay color={tone.white} radius={40} w={210} h={72} lift={0.8}>
              <Ink size={40} weight={700}>
                مهمة
              </Ink>
            </Clay>
          </Spot>
        </div>

        <div style={{ opacity: d }}>
          <svg
            width={1080}
            height={1400}
            style={{ position: "absolute", left: 0, top: 0 }}
          >
            <Stroke
              d="M450 690Q330 745 280 830"
              color={tone.charcoal}
              strokeWidth={6}
              progress={ramp(f, 262, 20)}
            />
            <Stroke
              d="M546 690Q666 745 720 830"
              color={tone.charcoal}
              strokeWidth={6}
              progress={ramp(f, 272, 20)}
            />
          </svg>
          {(
            [
              {
                icon: Image,
                color: tone.coral,
                x: 100,
                at: 264,
                label: "التعرّف على الصور",
              },
              {
                icon: MessageSquare,
                color: tone.mint,
                x: 540,
                at: 276,
                label: "التعامل مع اللغة",
              },
            ] as const
          ).map((t) => (
            <Spot
              key={t.x}
              x={t.x}
              y={830}
              w={360}
              style={{
                opacity: ramp(f, t.at, 12),
                transform: `translateY(${(1 - ramp(f, t.at, 22)) * 70}px)`,
              }}
            >
              <IconTile
                icon={t.icon}
                color={t.color}
                w={360}
                h={330}
                iconSize={120}
                label={t.label}
                labelSize={40}
                labelOpacity={ramp(f, t.at + 14, 12)}
              />
            </Spot>
          ))}
        </div>
      </Layer>
    </>
  );
};
