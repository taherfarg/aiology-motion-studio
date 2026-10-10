import { useCurrentFrame } from "remotion";
import { WordReveal } from "../../../components";
import { At, C, Ink, Latin, p, Reveal, Speech, Stage, Stroke } from "./art";

export const Conversation: React.FC = () => {
  const f = useCurrentFrame(),
    warn = p(f, 180, 22);
  return (
    <Stage name="conversation">
      <At y={375} style={{ opacity: 1 - warn }}>
        <Reveal>
          <Latin size={108}>ChatGPT</Latin>
          <Ink size={47} color={C.muted} style={{ marginTop: 10 }}>
            تسأل… وهو يولّد إجابة
          </Ink>
        </Reveal>
      </At>
      <div style={{ opacity: 1 - warn, translate: `0 ${warn * -25}px` }}>
        <At x={185} y={693} w={715}>
          <Reveal at={24}>
            <Speech fill={C.coralWash}>
              <Ink size={54} align="right" weight={600}>
                اكتب رسالة لصاحبي أطمن عليه
              </Ink>
            </Speech>
          </Reveal>
        </At>
        <At x={96} y={947} w={710}>
          <Reveal at={86}>
            <Speech fill={C.mintWash} style={{ padding: "35px 38px" }}>
              <WordReveal
                text="أهلًا! حابب أطمن عليك. عامل إيه؟"
                start={92}
                stagger={6}
                duration={12}
                fontSize={58}
                align="right"
                style={{ fontWeight: 600, lineHeight: 1.5 }}
              />
            </Speech>
          </Reveal>
        </At>
        <At y={1275} style={{ opacity: p(f, 127, 20) }}>
          <Ink size={40} color={C.muted}>
            مثال توضيحي لتوليد الكلام
          </Ink>
        </At>
      </div>
      <div style={{ opacity: warn }}>
        <At y={377}>
          <Ink size={82} weight={700}>
            بس خلي بالك!
          </Ink>
        </At>
        <At y={644} style={{ translate: `0 ${(1 - p(f, 187, 22)) * 24}px` }}>
          <Ink size={96} weight={700}>
            إجابة ذكية
          </Ink>
        </At>
        <At x={379} y={851} w={240}>
          <svg width={240} height={205} viewBox="0 0 240 205">
            <rect
              x={19}
              y={56}
              width={200}
              height={18}
              rx={9}
              fill={C.charcoal}
            />
            <rect
              x={19}
              y={128}
              width={200}
              height={18}
              rx={9}
              fill={C.charcoal}
            />
            <Stroke
              d="M170 22L70 184"
              color={C.coral}
              strokeWidth={21}
              progress={p(f, 205, 24)}
            />
          </svg>
        </At>
        <At y={1070}>
          <Reveal at={223}>
            <Ink size={94} weight={700}>
              تفكير بشري
            </Ink>
          </Reveal>
        </At>
        <At y={1268}>
          <Reveal at={252}>
            <Ink size={44} color={C.muted}>
              مش دليل إنه بيفكّر زينا
            </Ink>
          </Reveal>
        </At>
        <div
          style={{
            position: "absolute",
            left: 132,
            top: 493,
            width: 734,
            height: 8,
            borderRadius: 4,
            backgroundColor: C.yellow,
            scale: `${p(f, 185, 24)} 1`,
          }}
        />
      </div>
    </Stage>
  );
};
