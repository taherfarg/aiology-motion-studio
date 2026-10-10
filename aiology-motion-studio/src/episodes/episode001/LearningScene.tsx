import { useCurrentFrame } from "remotion";
import { EnglishTerm, SmoothEntrance } from "../../components";
import {
  Animal,
  ArrowPath,
  C,
  linear,
  motion,
  Panel,
  SceneShell,
  Text,
} from "./shared";

export const LearningScene: React.FC = () => {
  const f = useCurrentFrame();
  const diagram = motion(f, 135, 30);
  const inference = motion(f, 360, 24);
  const packet = linear(f, 260, 80);
  const testPacket = linear(f, 365, 45);
  return (
    <SceneShell label="03 / التعلّم من أمثلة" title="الكمبيوتر بيتعلّم إزاي؟">
      <div style={{ position: "relative", height: 760, marginTop: 60 }}>
        <div style={{ opacity: 1 - diagram, position: "absolute", inset: 0 }}>
          <SmoothEntrance start={60}>
            <Panel
              accent={C.mint}
              style={{ marginTop: 90, padding: "48px 20px" }}
            >
              <Text size={67} weight={700}>
                <EnglishTerm>Machine Learning</EnglishTerm>
              </Text>
              <Text size={52} style={{ marginTop: 20 }}>
                التعلّم من أمثلة
              </Text>
            </Panel>
          </SmoothEntrance>
        </div>
        <div style={{ opacity: diagram, position: "absolute", inset: 0 }}>
          <Text size={58} weight={700}>
            <EnglishTerm>Machine Learning</EnglishTerm>
          </Text>
          <div style={{ position: "relative", height: 550, marginTop: 50 }}>
            <div
              style={{ position: "absolute", right: 0, top: 10, width: 200 }}
            >
              <Text size={42} style={{ marginBottom: 20 }}>
                {f < 360 ? "أمثلة كتير" : "مثال جديد"}
              </Text>
              <Panel
                accent={C.orange}
                style={{
                  height: 280,
                  padding: 12,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 16,
                }}
              >
                <Animal size={100} />
                <div style={{ opacity: 1 - inference }}>
                  <Animal kind="dog" size={100} color={C.orange} />
                </div>
              </Panel>
              <div style={{ opacity: motion(f, 255), marginTop: 18 }}>
                <Text size={40} color={C.charcoal}>
                  {f < 360 ? "قطة · كلب" : "صورة ما شافهاش"}
                </Text>
              </div>
            </div>
            <Panel
              accent={C.lavender}
              style={{
                position: "absolute",
                left: 235,
                top: 90,
                width: 300,
                height: 320,
                padding: 26,
              }}
            >
              <Text size={48} weight={700}>
                النموذج
              </Text>
              <svg
                width={242}
                height={110}
                viewBox="0 0 242 110"
                style={{ display: "block", margin: "8px auto" }}
              >
                {[0, 1, 2].map((i) => (
                  <g key={i}>
                    <path
                      d={`M${42 + i * 70} 35 V75`}
                      stroke={C.line}
                      strokeWidth={4}
                    />
                    <circle
                      cx={42 + i * 70}
                      cy={35}
                      r={14}
                      fill={[C.coral, C.yellow, C.mint][i]}
                      opacity={0.3 + 0.7 * motion(f, 260 + i * 22)}
                    />
                    <circle
                      cx={42 + i * 70}
                      cy={75}
                      r={14}
                      fill={[C.coral, C.yellow, C.mint][i]}
                      opacity={0.3 + 0.7 * motion(f, 290 + i * 22)}
                    />
                  </g>
                ))}
                <path
                  d="M56 35H98 M126 75H168"
                  stroke={C.charcoal}
                  strokeWidth={3}
                  strokeDasharray="5 7"
                  opacity={motion(f, 305)}
                />
              </svg>
              <Text size={40}>يتعلّم الأنماط</Text>
            </Panel>
            <svg
              width={804}
              height={550}
              style={{ position: "absolute", inset: 0, pointerEvents: "none" }}
            >
              <ArrowPath
                d="M595 225H550 M559 215L549 225L559 235"
                progress={motion(f, 240)}
                color={C.orange}
              />
              <ArrowPath
                d="M222 225H196 M205 215L195 225L205 235"
                progress={motion(f, 408)}
                color={C.mint}
              />
              {f >= 260 && f < 340 && (
                <circle cx={595 - packet * 58} cy={225} r={9} fill={C.coral} />
              )}
              {f >= 365 && f < 410 && (
                <circle
                  cx={595 - testPacket * 58}
                  cy={225}
                  r={9}
                  fill={C.coral}
                />
              )}
            </svg>
            <div
              style={{
                position: "absolute",
                left: 0,
                top: 90,
                width: 180,
                opacity: motion(f, 410),
              }}
            >
              <Panel
                accent={C.mint}
                style={{
                  height: 270,
                  padding: 22,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 16,
                }}
              >
                <Animal size={90} color={C.mint} />
                <Text size={46} weight={700}>
                  قطة
                </Text>
              </Panel>
            </div>
            <div
              style={{ position: "absolute", left: 0, top: 415, width: 804 }}
            >
              <Text size={48} color={C.charcoal}>
                {f < 255
                  ? "بدل كتابة كل قاعدة…"
                  : f < 360
                    ? "بندرّبه على الأمثلة"
                    : "وبعد التدريب… نجرّبه"}
              </Text>
              <Text size={40} style={{ marginTop: 12 }} color={C.muted}>
                رسم توضيحي للتعلّم
              </Text>
            </div>
          </div>
        </div>
      </div>
    </SceneShell>
  );
};
