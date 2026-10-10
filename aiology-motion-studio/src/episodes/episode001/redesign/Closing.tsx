import { useCurrentFrame } from "remotion";
import { At, C, Ink, Latin, p, Stage } from "./art";

export const Closing: React.FC = () => {
  const f = useCurrentFrame(),
    brand = p(f, 105, 24),
    nest = p(f, 12, 28);
  return (
    <Stage name="closing">
      <div style={{ opacity: 1 - brand, translate: `0 ${brand * -24}px` }}>
        <At y={383} style={{ opacity: 1 - p(f, 105, 12) }}>
          <Ink size={46} color={C.muted}>
            في الفيديو الجاي
          </Ink>
          <Ink size={90} weight={700} style={{ marginTop: 16 }}>
            إيه الفرق؟
          </Ink>
        </At>
        <At
          x={213}
          y={708}
          w={570}
          style={{ scale: 1 - brand * 0.9, transformOrigin: "center center" }}
        >
          <div
            style={{
              height: 520,
              borderRadius: 72,
              border: `5px solid ${C.lavender}`,
              backgroundColor: C.white,
              position: "relative",
            }}
          >
            <Latin size={104} style={{ marginTop: 34 }}>
              AI
            </Latin>
            <div
              style={{
                position: "absolute",
                left: 35,
                right: 35,
                bottom: 35,
                height: 242,
                borderRadius: 48,
                backgroundColor: C.mintWash,
                opacity: nest,
                translate: `0 ${(1 - nest) * 24}px`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Latin size={51}>Machine Learning</Latin>
            </div>
          </div>
        </At>
      </div>
      <div style={{ opacity: brand }}>
        <At
          y={713}
          style={{
            scale: 0.97 + 0.03 * brand,
            translate: `0 ${(1 - brand) * 24}px`,
          }}
        >
          <Latin size={146}>AIOLOGY</Latin>
        </At>
        <At y={924}>
          <div style={{ display: "flex", justifyContent: "center", gap: 24 }}>
            {[C.lavender, C.mint, C.yellow, C.coral].map((color, i) => (
              <div
                key={color}
                style={{
                  width: 36,
                  height: 36,
                  borderRadius: 12,
                  backgroundColor: color,
                  opacity: p(f, 110 + i * 4, 18),
                  translate: `0 ${(1 - p(f, 110 + i * 4, 18)) * -32}px`,
                  rotate: `${(1 - p(f, 110 + i * 4, 18)) * 45}deg`,
                }}
              />
            ))}
          </div>
        </At>
        <At y={1030}>
          <Ink size={61} weight={600}>
            الذكاء الاصطناعي ببساطة
          </Ink>
        </At>
      </div>
    </Stage>
  );
};
