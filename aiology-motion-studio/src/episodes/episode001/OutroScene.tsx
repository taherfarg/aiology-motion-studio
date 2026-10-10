import { useCurrentFrame } from "remotion";
import { EnglishTerm } from "../../components";
import { C, motion, SceneShell, Text } from "./shared";

export const OutroScene: React.FC = () => {
  const f = useCurrentFrame(),
    logo = motion(f, 105, 24);
  return (
    <SceneShell label="05 / الذكاء الاصطناعي ببساطة" fadeOut={false}>
      <div style={{ position: "relative", height: 840, marginTop: 65 }}>
        <div style={{ opacity: 1 - logo }}>
          <Text size={48} color={C.muted}>
            في الفيديو الجاي
          </Text>
          <Text size={78} weight={700} style={{ marginTop: 16 }}>
            إيه الفرق؟
          </Text>
          <div
            style={{
              width: 530,
              height: 460,
              margin: "48px auto 0",
              border: `4px solid ${C.lavender}`,
              borderRadius: 56,
              position: "relative",
              boxSizing: "border-box",
            }}
          >
            <Text size={82} weight={700} style={{ marginTop: 22 }}>
              <EnglishTerm>AI</EnglishTerm>
            </Text>
            <div
              style={{
                position: "absolute",
                left: 35,
                right: 35,
                bottom: 35,
                height: 210,
                borderRadius: 40,
                backgroundColor: "#F0F9F5",
                border: `3px solid ${C.mint}`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Text size={50} weight={700}>
                <EnglishTerm>Machine Learning</EnglishTerm>
              </Text>
            </div>
          </div>
        </div>
        <div
          style={{
            position: "absolute",
            top: 210,
            width: 804,
            opacity: logo,
            transform: `translateY(${(1 - logo) * 32}px)`,
          }}
        >
          <Text size={128} weight={700}>
            <EnglishTerm>AIOLOGY</EnglishTerm>
          </Text>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              gap: 20,
              marginTop: 30,
              marginBottom: 42,
            }}
          >
            {[C.lavender, C.mint, C.yellow, C.coral].map((color, i) => (
              <div
                key={color}
                style={{
                  width: 34,
                  height: 34,
                  borderRadius: "50%",
                  backgroundColor: color,
                  transform: `translateY(${(1 - motion(f, 109 + i * 5)) * 20}px)`,
                  opacity: motion(f, 109 + i * 5),
                }}
              />
            ))}
          </div>
          <Text size={58}>الذكاء الاصطناعي ببساطة</Text>
        </div>
      </div>
    </SceneShell>
  );
};
