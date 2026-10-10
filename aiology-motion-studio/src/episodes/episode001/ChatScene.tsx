import { MessageSquare, AlertTriangle } from "lucide-react";
import { useCurrentFrame } from "remotion";
import { EnglishTerm, SmoothEntrance, WordReveal } from "../../components";
import { C, motion, Panel, SceneShell, Text } from "./shared";

export const ChatScene: React.FC = () => {
  const f = useCurrentFrame(),
    warning = motion(f, 180, 24);
  return (
    <SceneShell label="04 / أدوات في حياتنا" title="زي ChatGPT">
      <div style={{ position: "relative", height: 780, marginTop: 55 }}>
        <div
          style={{
            opacity: 1 - warning,
            transform: `scale(${1 - warning * 0.05})`,
            transformOrigin: "center",
          }}
        >
          <SmoothEntrance start={8}>
            <Panel accent={C.line} style={{ padding: 36 }}>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 18,
                  marginBottom: 36,
                }}
              >
                <MessageSquare size={54} color={C.mint} />
                <Text size={54} weight={700} align="left">
                  <EnglishTerm>ChatGPT</EnglishTerm>
                </Text>
              </div>
              <SmoothEntrance start={24}>
                <Panel accent={C.coral} style={{ marginLeft: 60, padding: 26 }}>
                  <Text size={46} align="right">
                    اكتب رسالة لصاحبي أطمن عليه
                  </Text>
                </Panel>
              </SmoothEntrance>
              <SmoothEntrance start={85}>
                <Panel
                  accent={C.mint}
                  style={{ marginTop: 30, marginRight: 40, padding: 30 }}
                >
                  <WordReveal
                    text="أهلًا! حابب أطمن عليك. عامل إيه؟"
                    start={90}
                    stagger={6}
                    fontSize={48}
                    style={{
                      fontWeight: 600,
                      lineHeight: 1.65,
                      textAlign: "right",
                    }}
                  />
                </Panel>
              </SmoothEntrance>
              <Text size={40} color={C.muted} style={{ marginTop: 28 }}>
                مثال توضيحي لتوليد نص
              </Text>
            </Panel>
          </SmoothEntrance>
        </div>
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: 804,
            opacity: warning,
            transform: `translateY(${(1 - warning) * 28}px)`,
          }}
        >
          <Panel
            accent={C.yellow}
            style={{ padding: "38px 28px", textAlign: "center" }}
          >
            <AlertTriangle size={68} color={C.charcoal} fill={C.yellow} />
            <Text
              size={70}
              weight={700}
              style={{ marginTop: 8, marginBottom: 24 }}
            >
              بس خلي بالك!
            </Text>
            <Text size={60} weight={700}>
              إجابة ذكية
            </Text>
            <div
              style={{
                fontSize: 96,
                lineHeight: 1.25,
                color: C.coral,
                fontWeight: 700,
              }}
            >
              ≠
            </div>
            <Text size={60} weight={700}>
              تفكير بشري
            </Text>
            <Text size={42} style={{ marginTop: 28 }}>
              مش دليل إنه بيفكّر زينا
            </Text>
          </Panel>
        </div>
      </div>
    </SceneShell>
  );
};
