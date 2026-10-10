import { useCurrentFrame } from "remotion";
import {
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
import { Ink, Paper, Pet, Stroke, lin } from "../redesign/art";
import { Bubble, CX } from "./parts";

// Scene 1 (local = global frames 0-210): letter, translation, cat vs dog, then the open question.
export const Hook: React.FC = () => {
  const f = useCurrentFrame(),
    letter = hold(f, 0, 64, 10, 14),
    translate = hold(f, 54, 104, 14, 14),
    classes = hold(f, 96, 170, 14, 16),
    question = hold(f, 160, 206, 18, 16);
  return (
    <>
      <Layer depth={-0.3}>
        <Spot cx={CX} y={430} w={760} style={{ opacity: letter * 0.9 }}>
          <Clay
            color={tone.coralWash}
            radius={110}
            w={700}
            h={700}
            lift={0.4}
            style={{ rotate: "-7deg", margin: "0 auto" }}
          />
        </Spot>
      </Layer>
      <Layer depth={0}>
        <div style={{ opacity: letter }}>
          <Spot y={196}>
            <KText
              text="تخيّل… يكتبلك رسالة"
              start={4}
              size={84}
              emphasis={["رسالة"]}
            />
          </Spot>
        </div>
        <Spot
          cx={CX}
          y={580}
          w={640}
          style={{
            opacity: letter,
            transform: `translateX(${-ramp(f, 46, 16) * 150}px)`,
          }}
        >
          <Tilt rx={8} ry={-12} rz={-3} drift={1.5}>
            <Clay
              color={tone.white}
              radius={70}
              w={640}
              h={640}
              lift={1.3}
              style={{ opacity: ramp(f, 0, 14) }}
            >
              <Paper size={560} progress={lin(f, 8, 34)} />
            </Clay>
          </Tilt>
          <Floor w={480} style={{ margin: "34px auto 0" }} />
        </Spot>

        <div style={{ opacity: translate }}>
          <Spot y={196}>
            <KText
              text="ويترجم كلامك"
              start={58}
              size={100}
              emphasis={["ويترجم"]}
              accent={tone.lavender}
            />
          </Spot>
          <Spot
            x={110}
            y={600}
            w={440}
            style={{
              transform: `translateX(${(1 - ramp(f, 56, 18)) * -90}px)`,
            }}
          >
            <Tilt rx={5} ry={9} drift={1.5}>
              <Bubble color={tone.lavenderWash} side="right" w={440}>
                <Ink size={132} weight={700}>
                  أهلًا
                </Ink>
              </Bubble>
            </Tilt>
          </Spot>
          <Spot
            x={450}
            y={990}
            w={440}
            style={{
              opacity: ramp(f, 68, 12),
              transform: `translateX(${(1 - ramp(f, 68, 18)) * 90}px)`,
            }}
          >
            <Tilt rx={5} ry={-9} phase={20} drift={1.5}>
              <Bubble color={tone.mintWash} side="left" w={440}>
                <Ink size={132} weight={700}>
                  Hello
                </Ink>
              </Bubble>
            </Tilt>
          </Spot>
          <svg
            width={1080}
            height={1400}
            style={{ position: "absolute", left: 0, top: 0 }}
          >
            <Stroke
              d="M300 850Q300 1090 432 1092 M414 1070L438 1092L412 1114"
              color={tone.lavender}
              strokeWidth={9}
              progress={ramp(f, 66, 20)}
            />
          </svg>
        </div>

        <div style={{ opacity: classes }}>
          <Spot y={196}>
            <KText
              text="ويفرّق بين الصور"
              start={100}
              size={96}
              emphasis={["الصور"]}
              accent={tone.mint}
            />
          </Spot>
          {(
            [
              {
                x: 118,
                wash: tone.coralWash,
                color: tone.coral,
                kind: "cat",
                label: "قطة",
                at: 102,
                ry: 12,
              },
              {
                x: 520,
                wash: tone.mintWash,
                color: tone.mint,
                kind: "dog",
                label: "كلب",
                at: 110,
                ry: -12,
              },
            ] as const
          ).map((t) => (
            <Spot
              key={t.kind}
              x={t.x}
              y={560}
              w={362}
              style={{
                opacity: ramp(f, t.at, 12),
                transform: `translateY(${(1 - ramp(f, t.at, 20)) * 70}px)`,
              }}
            >
              <Tilt ry={t.ry} rx={4} drift={1.5} phase={t.ry}>
                <Clay
                  color={t.wash}
                  radius={70}
                  w={362}
                  h={590}
                  lift={1.2}
                  style={{ flexDirection: "column", gap: 10 }}
                >
                  <Pet kind={t.kind} size={330} color={t.color} />
                  <div style={{ opacity: ramp(f, t.at + 18, 12) }}>
                    <Ink size={76} weight={700}>
                      {t.label}
                    </Ink>
                  </div>
                </Clay>
              </Tilt>
              <Floor w={300} style={{ margin: "26px auto 0" }} />
            </Spot>
          ))}
          <Spot
            cx={CX}
            y={800}
            w={96}
            style={{
              opacity: ramp(f, 130, 12),
              scale: 0.8 + 0.2 * ramp(f, 130, 16),
            }}
          >
            <Clay color={tone.white} radius={48} w={96} h={96} lift={0.7}>
              <Ink size={70} weight={700}>
                ≠
              </Ink>
            </Clay>
          </Spot>
        </div>

        <div style={{ opacity: question }}>
          <Spot y={400}>
            <KText
              text="طب إزاي؟"
              start={164}
              size={168}
              emphasis={["إزاي؟"]}
              accent={tone.coral}
            />
          </Spot>
          <Spot y={640} style={{ opacity: ramp(f, 186, 14) }}>
            <Ink size={54} color={tone.muted}>
              السرّ هنا…
            </Ink>
          </Spot>
        </div>
      </Layer>
    </>
  );
};
