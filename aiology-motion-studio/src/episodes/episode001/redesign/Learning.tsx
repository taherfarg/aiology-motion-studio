import { useCurrentFrame } from "remotion";
import {
  At,
  C,
  Ink,
  Latin,
  lin,
  p,
  Pet,
  quadratic,
  Stage,
  Stroke,
  Tag,
  window,
} from "./art";

const catalog = [
  { kind: "cat", x: 708, y: 780 },
  { kind: "dog", x: 808, y: 780 },
  { kind: "dog", x: 708, y: 905 },
  { kind: "cat", x: 808, y: 905 },
  { kind: "cat", x: 708, y: 1030 },
  { kind: "dog", x: 808, y: 1030 },
] as const;
const layers = [
  [
    { x: 534, y: 50 },
    { x: 534, y: 150 },
    { x: 534, y: 250 },
  ],
  [
    { x: 402, y: 30 },
    { x: 402, y: 100 },
    { x: 402, y: 170 },
    { x: 402, y: 240 },
  ],
  [
    { x: 269, y: 100 },
    { x: 269, y: 210 },
  ],
];

export const Learning: React.FC = () => {
  const f = useCurrentFrame(),
    examples = window(f, 60, 135, 18, 16),
    rules = window(f, 135, 255, 18, 18),
    diagram = p(f, 255, 24),
    test = p(f, 360, 24);
  const progress = lin(f, 395, 37);
  const testPos = quadratic(
    lin(f, 373, 24),
    [785, 930],
    [703, 856],
    [630, 930],
  );
  return (
    <Stage name="learning">
      <div style={{ opacity: 1 - p(f, 56, 14) }}>
        <At y={430}>
          <Ink size={82} weight={700}>
            الكمبيوتر بيتعلّم إزاي؟
          </Ink>
        </At>
        <At x={180} y={840} w={230} style={{ rotate: "-5deg" }}>
          <div
            style={{
              backgroundColor: C.coralWash,
              borderRadius: 48,
              padding: 24,
            }}
          >
            <Pet size={182} />
          </div>
        </At>
        <At x={590} y={900} w={230} style={{ rotate: "5deg" }}>
          <div
            style={{
              backgroundColor: C.mintWash,
              borderRadius: 48,
              padding: 24,
            }}
          >
            <Pet kind="dog" size={182} color={C.mint} />
          </div>
        </At>
        <At y={755}>
          <svg width={804} height={430}>
            <Stroke
              d="M300 190Q400 20 502 252"
              progress={p(f, 18, 30)}
              color={C.lavender}
            />
            <circle cx={407} cy={125} r={36} fill={C.lavender} />
            <text
              x={407}
              y={142}
              textAnchor="middle"
              fill={C.charcoal}
              fontSize={49}
              fontWeight={700}
            >
              ?
            </text>
          </svg>
        </At>
      </div>
      <div style={{ opacity: examples }}>
        <At y={400}>
          <Latin size={78}>Machine Learning</Latin>
          <Ink size={58} style={{ marginTop: 20 }}>
            التعلّم من أمثلة
          </Ink>
        </At>
        {catalog.map((item, i) => {
          const col = i % 3,
            row = Math.floor(i / 3),
            enter = p(f, 60 + i * 4, 14);
          return (
            <At
              key={i}
              x={114 + col * 270}
              y={740 + row * 285}
              w={220}
              style={{
                opacity: enter,
                translate: `0 ${(1 - enter) * 24}px`,
                rotate: `${[-3, 2, -2, 2, -2, 3][i]}deg`,
              }}
            >
              <div
                style={{
                  borderRadius: 38,
                  backgroundColor:
                    item.kind === "cat" ? C.coralWash : C.mintWash,
                  padding: "20px 20px 8px",
                  textAlign: "center",
                }}
              >
                <Pet
                  kind={item.kind}
                  size={166}
                  color={item.kind === "cat" ? C.coral : C.mint}
                />
                <Ink size={40} weight={700}>
                  {item.kind === "cat" ? "قطة" : "كلب"}
                </Ink>
              </div>
            </At>
          );
        })}
      </div>
      <div style={{ opacity: rules }}>
        <At y={400}>
          <Ink size={84} weight={700}>
            نكتب كل قاعدة؟
          </Ink>
        </At>
        {[0, 1, 2].map((i) => (
          <At
            key={i}
            x={175}
            y={700 + i * 156}
            w={646}
            style={{
              opacity: p(f, 143 + i * 10, 18),
              translate: `${(1 - p(f, 143 + i * 10, 18)) * 24}px 0`,
            }}
          >
            <div
              style={{
                borderBottom: `2px solid ${C.line}`,
                padding: "18px 20px",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <Latin size={42} color={C.muted}>
                0{i + 1}
              </Latin>
              <Ink size={59} weight={600}>
                لو… يبقى…
              </Ink>
            </div>
            <svg
              width={646}
              height={115}
              style={{ position: "absolute", inset: 0 }}
            >
              <Stroke
                d="M24 87L620 18"
                color={C.coral}
                strokeWidth={7}
                progress={p(f, 191 + i * 13, 22)}
              />
            </svg>
          </At>
        ))}
        <At y={1230} style={{ opacity: p(f, 220, 20) }}>
          <Ink size={50}>بدل كده… ندرّب نموذج</Ink>
        </At>
      </div>
      <div style={{ opacity: diagram }}>
        <At y={382}>
          <Latin size={76}>Machine Learning</Latin>
        </At>
        <At y={518} style={{ textAlign: "center" }}>
          <Tag wash={f < 360 ? C.lavenderWash : C.mintWash}>
            {f < 360 ? "مرحلة التدريب" : "بعد التدريب"}
          </Tag>
        </At>
        <div
          style={{
            position: "absolute",
            inset: 0,
            translate: `${-110 * (1 - test)}px 0`,
            scale: 1.22 - 0.22 * test,
            transformOrigin: "498px 945px",
          }}
        >
          <div
            style={{
              position: "absolute",
              left: 320,
              top: 720,
              width: 356,
              height: 430,
              backgroundColor: C.lavenderWash,
              borderRadius: 58,
              boxShadow: "0 14px 30px rgba(78,51,113,.05)",
            }}
          />
          <At x={320} y={743} w={356}>
            <Ink size={51} weight={700}>
              النموذج
            </Ink>
          </At>
          <svg
            width={804}
            height={430}
            style={{ position: "absolute", left: 96, top: 805 }}
          >
            {layers.slice(0, -1).flatMap((layer, l) =>
              layer.flatMap((a, i) =>
                layers[l + 1].map((b, j) => {
                  const learned = p(f, 275 + (i + j + l) * 6, 32),
                    draw = p(f, 257 + (i + j) * 3, 22);
                  const emphasized = (i + j) % 3 === 0;
                  return (
                    <Stroke
                      key={`${l}-${i}-${j}`}
                      d={`M${a.x} ${a.y}L${b.x} ${b.y}`}
                      progress={draw}
                      color={
                        emphasized && learned > 0.5 ? C.lavender : "#CDC4DD"
                      }
                      strokeWidth={emphasized ? 2 + learned * 3 : 2}
                    />
                  );
                }),
              ),
            )}
            {layers.map((layer, l) =>
              layer.map((node, i) => {
                const training = p(f, 281 + l * 16 + i * 7, 25),
                  hot =
                    f >= 395 &&
                    progress > l / 3 &&
                    progress < (l + 1) / 3 + 0.15;
                return (
                  <g key={`${l}-${i}`}>
                    <circle
                      cx={node.x}
                      cy={node.y}
                      r={19}
                      fill={training > 0.8 ? C.lavender : C.white}
                      stroke={C.lavender}
                      strokeWidth={3}
                    />
                    {hot && (
                      <circle
                        cx={node.x}
                        cy={node.y}
                        r={25}
                        fill="none"
                        stroke={C.mint}
                        strokeWidth={4}
                      />
                    )}
                  </g>
                );
              }),
            )}
            <Stroke
              d="M603 125H578 M589 115L576 125L589 135"
              color={C.coral}
              progress={p(f, 263, 20)}
            />
            <Stroke
              d="M212 125H196 M208 115L194 125L208 135"
              color={C.mint}
              progress={p(f, 434, 18)}
            />
          </svg>
          <At x={707} y={646} w={190} style={{ opacity: 1 - test }}>
            <Ink size={42} weight={700}>
              أمثلة مصنّفة
            </Ink>
          </At>
          {catalog.map((item, i) => {
            const start = 262 + i * 11,
              fly = lin(f, start, 38),
              pos = quadratic(
                fly,
                [item.x + 45, item.y + 55],
                [item.x - 90, item.y + 30],
                [630, 930],
              );
            return (
              <div key={i} style={{ opacity: 1 - test }}>
                <div
                  style={{
                    position: "absolute",
                    left: item.x,
                    top: item.y,
                    width: 90,
                    height: 110,
                    borderRadius: 24,
                    backgroundColor:
                      item.kind === "cat" ? C.coralWash : C.mintWash,
                    opacity: 1 - p(f, start, 14),
                    textAlign: "center",
                    paddingTop: 10,
                  }}
                >
                  <Pet
                    kind={item.kind}
                    size={88}
                    color={item.kind === "cat" ? C.coral : C.mint}
                  />
                </div>
                {f >= start && f < start + 38 && (
                  <div
                    style={{
                      position: "absolute",
                      left: pos.x - 38,
                      top: pos.y - 38,
                      scale: 1 - fly * 0.5,
                    }}
                  >
                    <Pet
                      kind={item.kind}
                      size={76}
                      color={item.kind === "cat" ? C.coral : C.mint}
                    />
                  </div>
                )}
              </div>
            );
          })}
          <At x={708} y={710} w={190} style={{ opacity: test }}>
            <Ink size={44} weight={700}>
              صورة جديدة
            </Ink>
          </At>
          <At x={708} y={854} w={190} style={{ opacity: test }}>
            <div
              style={{
                backgroundColor: C.coralWash,
                borderRadius: 34,
                padding: "20px 0",
                textAlign: "center",
              }}
            >
              <Pet variant={1} size={185} color={C.lavender} />
            </div>
          </At>
          {f >= 373 && f < 397 && (
            <div
              style={{
                position: "absolute",
                left: testPos.x - 38,
                top: testPos.y - 38,
                scale: 0.85,
              }}
            >
              <Pet variant={1} size={76} color={C.lavender} />
            </div>
          )}
          <At
            x={103}
            y={852}
            w={186}
            style={{
              opacity: p(f, 434, 18),
              translate: `${(1 - p(f, 434, 18)) * -20}px 0`,
            }}
          >
            <div
              style={{
                borderRadius: 34,
                backgroundColor: C.mintWash,
                padding: "27px 18px",
                textAlign: "center",
              }}
            >
              <svg width={70} height={70} viewBox="0 0 70 70">
                <circle cx={35} cy={35} r={32} fill={C.mint} />
                <Stroke
                  d="M18 35L30 47L51 24"
                  color={C.white}
                  strokeWidth={5}
                  progress={p(f, 440, 16)}
                />
              </svg>
              <Ink size={64} weight={700} style={{ marginTop: 16 }}>
                قطة
              </Ink>
            </div>
          </At>
        </div>
        <At y={1255}>
          <Ink size={40} color={C.muted}>
            تصوّر مبسّط للنموذج
          </Ink>
        </At>
      </div>
    </Stage>
  );
};
