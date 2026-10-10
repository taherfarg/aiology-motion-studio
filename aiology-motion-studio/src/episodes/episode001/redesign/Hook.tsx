import { useCurrentFrame } from "remotion";
import { EnglishTerm } from "../../../components";
import {
  At,
  C,
  Ink,
  Latin,
  lin,
  p,
  Paper,
  Pet,
  Reveal,
  Speech,
  Stage,
  Stroke,
  window,
} from "./art";

export const Hook: React.FC = () => {
  const f = useCurrentFrame(),
    letter = 1 - p(f, 47, 12),
    translation = window(f, 54, 96, 12, 10),
    classes = window(f, 96, 165, 12, 12),
    question = p(f, 165, 18);
  return (
    <Stage name="hook">
      <At y={337} style={{ opacity: letter }}>
        <Ink size={90} weight={700}>
          تخيّل…
        </Ink>
        <Ink size={70} style={{ marginTop: 4 }}>
          يكتبلك رسالة
        </Ink>
      </At>
      <At
        x={240}
        y={650}
        w={510}
        style={{
          opacity: letter,
          translate: `${(1 - p(f, 0, 22)) * -28}px ${(1 - p(f, 0, 22)) * 20}px`,
          rotate: `${-5 + 5 * p(f, 0, 30)}deg`,
        }}
      >
        <div
          style={{
            position: "absolute",
            width: 430,
            height: 430,
            borderRadius: 70,
            backgroundColor: C.coralWash,
            left: 42,
            top: 10,
            rotate: "-6deg",
          }}
        />
        <Paper size={510} progress={lin(f, 6, 38)} />
      </At>
      <div style={{ opacity: translation }}>
        <At y={372}>
          <Ink size={88} weight={700}>
            ويترجم كلامك
          </Ink>
        </At>
        <At
          x={130}
          y={740}
          w={340}
          style={{ translate: `${(1 - p(f, 54, 18)) * -30}px 0` }}
        >
          <Speech fill={C.lavenderWash}>
            <Ink size={82} weight={700}>
              أهلًا
            </Ink>
          </Speech>
        </At>
        <At
          x={580}
          y={880}
          w={320}
          style={{
            translate: `${(1 - p(f, 66, 18)) * 30}px 0`,
            opacity: p(f, 66, 16),
          }}
        >
          <Speech fill={C.mintWash}>
            <Latin size={76}>Hello</Latin>
          </Speech>
        </At>
        <svg
          width={804}
          height={500}
          style={{ position: "absolute", left: 96, top: 660 }}
        >
          <Stroke
            d="M365 160Q445 145 445 227Q445 290 470 297 M455 281L470 297L449 301"
            color={C.lavender}
            progress={p(f, 62, 20)}
          />
        </svg>
      </div>
      <div style={{ opacity: classes }}>
        <At y={372}>
          <Ink size={84} weight={700}>
            ويفرّق بين الصور
          </Ink>
        </At>
        <At
          x={110}
          y={680}
          w={340}
          style={{ translate: `${(1 - p(f, 96, 18)) * -28}px 0` }}
        >
          <div
            style={{
              backgroundColor: C.coralWash,
              borderRadius: 50,
              padding: "28px 16px",
              textAlign: "center",
              boxShadow: "0 14px 28px rgba(37,37,37,.04)",
            }}
          >
            <Pet size={270} />
          </div>
          <Reveal at={113} length={12}>
            <Ink size={68} weight={700} style={{ marginTop: 22 }}>
              قطة
            </Ink>
          </Reveal>
        </At>
        <At
          x={560}
          y={740}
          w={340}
          style={{
            translate: `${(1 - p(f, 104, 18)) * 28}px 0`,
            opacity: p(f, 104, 18),
          }}
        >
          <div
            style={{
              backgroundColor: C.mintWash,
              borderRadius: 50,
              padding: "28px 16px",
              textAlign: "center",
              boxShadow: "0 14px 28px rgba(37,37,37,.04)",
            }}
          >
            <Pet kind="dog" size={270} color={C.mint} />
          </div>
          <Reveal at={121} length={12}>
            <Ink size={68} weight={700} style={{ marginTop: 22 }}>
              كلب
            </Ink>
          </Reveal>
        </At>
        <At x={445} y={830} w={100}>
          <Ink size={66} color={C.muted}>
            ≠
          </Ink>
        </At>
      </div>
      <At y={705} style={{ opacity: question, scale: 0.96 + 0.04 * question }}>
        <Ink size={128} weight={700}>
          طب إزاي؟
        </Ink>
        <svg
          width={550}
          height={44}
          style={{ display: "block", margin: "16px auto 0" }}
        >
          <Stroke
            d="M25 18Q270 44 525 18"
            color={C.coral}
            strokeWidth={12}
            progress={p(f, 174, 22)}
          />
        </svg>
        <div style={{ marginTop: 54, opacity: p(f, 181) }}>
          <Ink size={48}>السرّ هنا…</Ink>
        </div>
      </At>
      <At y={1220} style={{ opacity: 1 - p(f, 150, 12) }}>
        <Ink size={40} color={C.muted}>
          رسائل · ترجمة · تمييز صور
        </Ink>
      </At>
      <At
        y={1190}
        style={{
          opacity: p(f, 196, 14),
          display: "flex",
          justifyContent: "center",
        }}
      >
        <div
          style={{
            width: 88,
            height: 88,
            borderRadius: 20,
            backgroundColor: C.lavender,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Latin size={44}>
            <EnglishTerm>AI</EnglishTerm>
          </Latin>
        </div>
      </At>
    </Stage>
  );
};
