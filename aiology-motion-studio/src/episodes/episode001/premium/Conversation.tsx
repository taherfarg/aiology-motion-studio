import { useCurrentFrame } from "remotion";
import { Send, Sparkles, TriangleAlert, User } from "lucide-react";
import {
  Camera,
  Clay,
  Floor,
  KText,
  Layer,
  Spot,
  Tilt,
  hold,
  ramp,
  tone,
} from "../../../kit";
import { Ink, Latin } from "../redesign/art";
import { Bubble, CX } from "./parts";

// Scene 4 (local frames from 34 s): chat, caution, and "smart answer is not human thinking".
export const Conversation: React.FC = () => {
  const f = useCurrentFrame(),
    chat = hold(f, 0, 190, 12, 16),
    caution = hold(f, 178, 238, 12, 14),
    compare = ramp(f, 226, 16),
    typing = ramp(f, 96, 8) * (1 - ramp(f, 126, 8));
  return (
    <Camera from={{ y: 80 }} to={{ y: 80, scale: 1.035 }}>
      <Layer depth={0}>
        <div style={{ opacity: chat }}>
          <Spot y={176}>
            <Latin size={112}>ChatGPT</Latin>
          </Spot>
          <Spot
            x={96}
            y={380}
            w={804}
            style={{ transform: `translateY(${(1 - ramp(f, 4, 22)) * 50}px)` }}
          >
            <Tilt rx={4} ry={-4} drift={0.8}>
              <Clay color={tone.white} radius={72} w={804} h={820} lift={1.3} />
            </Tilt>
          </Spot>
          <Spot x={150} y={1060} w={696} style={{ opacity: ramp(f, 12, 14) }}>
            <Clay
              color={tone.lavenderWash}
              radius={48}
              w={696}
              h={96}
              lift={0.3}
              style={{
                justifyContent: "space-between",
                padding: "0 20px 0 36px",
              }}
            >
              <div
                style={{
                  width: 56,
                  height: 56,
                  borderRadius: 28,
                  backgroundColor: tone.coral,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Send size={28} strokeWidth={2.2} color={tone.charcoal} />
              </div>
              <div
                style={{
                  width: 360,
                  height: 14,
                  borderRadius: 7,
                  backgroundColor: "rgba(37,37,37,0.12)",
                }}
              />
            </Clay>
          </Spot>
          <Spot
            x={236}
            y={480}
            w={620}
            style={{
              opacity: ramp(f, 14, 10),
              transform: `translateY(${(1 - ramp(f, 14, 20)) * 40}px)`,
            }}
          >
            <Bubble color={tone.coralWash} side="right" w={620}>
              <KText
                text="اكتب رسالة لصاحبي أطمن عليه"
                start={20}
                size={54}
                weight={600}
                stagger={5}
                align="right"
              />
            </Bubble>
          </Spot>
          <Spot
            x={140}
            y={780}
            w={620}
            style={{
              opacity: ramp(f, 92, 10),
              transform: `translateY(${(1 - ramp(f, 92, 20)) * 40}px)`,
            }}
          >
            <Bubble color={tone.mintWash} side="left" w={620}>
              <div
                style={{
                  position: "relative",
                  width: "100%",
                  minHeight: 150,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <div
                  style={{
                    position: "absolute",
                    display: "flex",
                    gap: 18,
                    opacity: typing,
                  }}
                >
                  {[0, 1, 2].map((i) => (
                    <div
                      key={i}
                      style={{
                        width: 26,
                        height: 26,
                        borderRadius: 13,
                        backgroundColor: tone.mint,
                        transform: `translateY(${-10 * Math.max(0, Math.sin((f - i * 4) / 4))}px)`,
                      }}
                    />
                  ))}
                </div>
                <KText
                  text="أهلًا! حابب أطمن عليك. عامل إيه؟"
                  start={128}
                  size={54}
                  weight={600}
                  stagger={6}
                  align="right"
                />
              </div>
            </Bubble>
          </Spot>
        </div>

        <div style={{ opacity: caution }}>
          <Spot y={190}>
            <KText
              text="بس خلي بالك!"
              start={182}
              size={132}
              emphasis={["بالك!"]}
              accent={tone.yellow}
            />
          </Spot>
          <Spot
            cx={CX}
            y={580}
            w={560}
            style={{ transform: `scale(${0.7 + 0.3 * ramp(f, 184, 22)})` }}
          >
            <Tilt rx={6} ry={-8} drift={1.5}>
              <Clay
                color={tone.yellow}
                radius={150}
                w={500}
                h={500}
                lift={1.4}
                style={{ margin: "0 auto" }}
              >
                <TriangleAlert
                  size={290}
                  strokeWidth={1.7}
                  color={tone.charcoal}
                />
              </Clay>
            </Tilt>
            <Floor w={360} style={{ margin: "36px auto 0" }} />
          </Spot>
        </div>

        <div style={{ opacity: compare }}>
          {(
            [
              {
                y: 360,
                color: tone.lavender,
                icon: Sparkles,
                text: "إجابة ذكية",
                at: 232,
              },
              {
                y: 860,
                color: tone.yellow,
                icon: User,
                text: "تفكير بشري",
                at: 262,
              },
            ] as const
          ).map((t) => (
            <Spot
              key={t.at}
              x={158}
              y={t.y}
              w={684}
              style={{
                opacity: ramp(f, t.at, 12),
                transform: `translateY(${(1 - ramp(f, t.at, 22)) * 60}px)`,
              }}
            >
              <Tilt rx={4} ry={t.at === 232 ? 5 : -5} drift={1.2} phase={t.at}>
                <Clay
                  color={t.color}
                  radius={70}
                  w={684}
                  h={260}
                  lift={1.2}
                  style={{ gap: 34 }}
                >
                  <t.icon size={110} strokeWidth={1.8} color={tone.charcoal} />
                  <Ink size={84} weight={700}>
                    {t.text}
                  </Ink>
                </Clay>
              </Tilt>
            </Spot>
          ))}
          <Spot
            cx={CX}
            y={676}
            w={140}
            style={{
              opacity: ramp(f, 318, 10),
              transform: `scale(${0.6 + 0.4 * ramp(f, 318, 18)})`,
            }}
          >
            <Clay color={tone.white} radius={70} w={140} h={140} lift={1.1}>
              <Ink size={104} weight={700} color={tone.coral}>
                ≠
              </Ink>
            </Clay>
          </Spot>
        </div>
      </Layer>
    </Camera>
  );
};
