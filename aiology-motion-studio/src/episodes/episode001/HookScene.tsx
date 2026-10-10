import React from "react";
import { useCurrentFrame } from "remotion";
import { Mail, Languages } from "lucide-react";
import { SceneShell, Text, Panel, Animal, C, motion, linear } from "./shared";
import { SmoothEntrance, WordReveal } from "../../components";

export const HookScene: React.FC = () => {
  const f = useCurrentFrame(),
    question = motion(f, 165, 20);
  const active = f < 54 ? 0 : f < 96 ? 1 : 2;
  return (
    <SceneShell label="01 / الفكرة في حياتك" title="تخيّل كده…">
      <div style={{ height: 780, position: "relative", marginTop: 70 }}>
        <div
          style={{
            opacity: 1 - question * 0.85,
            scale: 1 - question * 0.08,
            translate: `0 ${-question * 20}px`,
          }}
        >
          <SmoothEntrance start={8}>
            <Panel
              accent={active === 0 ? C.coral : C.line}
              style={{
                position: "absolute",
                left: 0,
                top: 0,
                width: 360,
                height: 280,
              }}
            >
              <Mail size={66} color={C.coral} strokeWidth={1.6} />
              <Text size={43} align="right" style={{ marginTop: 16 }}>
                يكتبلك رسالة
              </Text>
              <div
                style={{
                  marginTop: 22,
                  width: `${linear(f, 8, 40) * 240}px`,
                  height: 8,
                  borderRadius: 4,
                  backgroundColor: C.coral,
                }}
              />
              <div
                style={{
                  marginTop: 13,
                  width: `${linear(f, 18, 30) * 170}px`,
                  height: 8,
                  borderRadius: 4,
                  backgroundColor: C.line,
                }}
              />
            </Panel>
          </SmoothEntrance>
          <SmoothEntrance start={54}>
            <Panel
              accent={active === 1 ? C.lavender : C.line}
              style={{
                position: "absolute",
                right: 0,
                top: 160,
                width: 370,
                height: 285,
              }}
            >
              <Languages size={66} color={C.lavender} strokeWidth={1.6} />
              <Text size={43} align="right" style={{ marginTop: 16 }}>
                يترجم كلامك
              </Text>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginTop: 16,
                }}
              >
                <Text size={40}>مرحبًا</Text>
                <span style={{ color: C.lavender, fontSize: 38 }}>→</span>
                <Text size={40}>Hello</Text>
              </div>
            </Panel>
          </SmoothEntrance>
          <SmoothEntrance start={96}>
            <Panel
              accent={active === 2 ? C.coral : C.line}
              style={{
                position: "absolute",
                left: 0,
                top: 480,
                width: 430,
                height: 290,
              }}
            >
              <div style={{ display: "flex", justifyContent: "space-evenly" }}>
                <Animal size={104} />
                <Animal kind="dog" size={104} color={C.lavender} />
              </div>
              <Text size={43} style={{ marginTop: 18 }}>
                يميّز قطة من كلب
              </Text>
            </Panel>
          </SmoothEntrance>
        </div>
        <div
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            opacity: question,
            scale: 0.92 + question * 0.08,
          }}
        >
          <Panel accent={C.coral} style={{ padding: "40px 52px" }}>
            <WordReveal
              text="طب إزاي؟"
              start={165}
              fontSize={96}
              style={{ fontWeight: 700 }}
            />
          </Panel>
        </div>
      </div>
    </SceneShell>
  );
};
