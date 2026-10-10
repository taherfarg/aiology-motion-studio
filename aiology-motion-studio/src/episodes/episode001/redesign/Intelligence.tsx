import { useCurrentFrame } from "remotion";
import {
  At,
  C,
  Ink,
  Latin,
  Model,
  p,
  Pet,
  quadratic,
  Reveal,
  Speech,
  Stage,
  Stroke,
  lin,
} from "./art";

export const Intelligence: React.FC = () => {
  const f = useCurrentFrame(),
    build = p(f, 90, 30);
  const language = f < 255;
  const signal = lin(f, language ? 138 : 258, language ? 88 : 55);
  const pos = quadratic(
    signal,
    [778, language ? 796 : 1100],
    [498, language ? 796 : 850],
    [218, language ? 796 : 1100],
  );
  return (
    <Stage name="intelligence">
      <At y={345}>
        <Reveal at={0}>
          <Ink size={87} weight={700}>
            الذكاء الاصطناعي
          </Ink>
        </Reveal>
      </At>
      <div style={{ opacity: f >= 28 ? 1 : 0 }}>
        <Model x={326} y={690 + build * 75} size={344} progress={p(f, 8, 28)} />
      </div>
      <At y={1140} style={{ opacity: 1 - build }}>
        <Reveal at={30}>
          <Ink size={56}>أنظمة تنجز مهام ذكية</Ink>
        </Reveal>
      </At>
      <div style={{ opacity: build }}>
        <At x={707} y={603} w={190}>
          <Ink size={44} weight={700}>
            مدخلات
          </Ink>
        </At>
        <At x={98} y={603} w={190}>
          <Ink size={44} weight={700}>
            نتائج
          </Ink>
        </At>
        <At x={710} y={744} w={186}>
          <Speech fill={C.coralWash} style={{ padding: "27px 12px" }}>
            <Ink size={61} weight={700}>
              أهلًا
            </Ink>
          </Speech>
        </At>
        <At x={98} y={744} w={190} style={{ opacity: p(f, 184, 20) }}>
          <Speech fill={C.mintWash} style={{ padding: "27px 12px" }}>
            <Latin size={49}>Hello</Latin>
          </Speech>
        </At>
        <At x={710} y={1010} w={190} style={{ opacity: p(f, 212, 22) }}>
          <div
            style={{
              backgroundColor: C.coralWash,
              borderRadius: 34,
              padding: 18,
              textAlign: "center",
            }}
          >
            <Pet size={148} variant={1} />
          </div>
        </At>
        <At x={100} y={1040} w={188} style={{ opacity: p(f, 297, 18) }}>
          <div
            style={{
              borderRadius: 80,
              backgroundColor: C.mintWash,
              padding: "18px 20px",
            }}
          >
            <Ink size={59} weight={700}>
              قطة
            </Ink>
          </div>
        </At>
        <svg
          width={804}
          height={620}
          style={{ position: "absolute", left: 96, top: 620 }}
        >
          <Stroke
            d="M603 174H588 M600 164L586 174L600 184"
            color={C.coral}
            progress={p(f, 117, 18)}
          />
          <Stroke
            d="M216 174H198 M210 164L196 174L210 184"
            color={C.mint}
            progress={p(f, 178, 18)}
          />
          <Stroke
            d="M603 470Q585 470 585 442V359 M598 372L585 358L572 372"
            color={C.coral}
            progress={p(f, 235, 20)}
          />
          <Stroke
            d="M215 359V443Q215 470 196 470 M210 456L196 470L210 484"
            color={C.mint}
            progress={p(f, 290, 20)}
          />
        </svg>
        {((f >= 138 && f < 226) || (f >= 258 && f < 313)) && (
          <div
            style={{
              position: "absolute",
              left: pos.x - 9,
              top: pos.y - 9,
              width: 18,
              height: 18,
              borderRadius: "50%",
              backgroundColor: signal < 0.5 ? C.coral : C.mint,
            }}
          />
        )}
        <At y={1245}>
          <Ink size={43} color={C.muted}>
            لغة وصور… ونتيجة مفيدة
          </Ink>
        </At>
      </div>
      <At y={505} style={{ opacity: p(f, 170, 22) }}>
        <Ink size={45} color={C.muted}>
          مهام محتاجة ذكاء
        </Ink>
      </At>
    </Stage>
  );
};
