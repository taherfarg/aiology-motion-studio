import React from "react";
import { useCurrentFrame } from "remotion";
import { FileText, Image, MessageSquare } from "lucide-react";
import {
  SceneShell,
  Text,
  Panel,
  Animal,
  ArrowPath,
  C,
  motion,
  linear,
} from "./shared";
import { SmoothEntrance, EnglishTerm } from "../../components";

export const AIScene: React.FC = () => {
  const f = useCurrentFrame(),
    diagram = motion(f, 90, 30);
  const packet = linear(f, 120, 100),
    x = 700 - packet * 600;
  return (
    <SceneShell label="02 / الاسم وراء الفكرة" title="الذكاء الاصطناعي">
      <div style={{ position: "relative", height: 720, marginTop: 100 }}>
        <div
          style={{
            position: "absolute",
            left: 240 - diagram * 7,
            top: 80 + diagram * 55,
            width: 324,
            height: 324,
            borderRadius: 54,
            backgroundColor: C.lavender,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            scale: 1 - diagram * 0.24,
          }}
        >
          <Text size={170} weight={700}>
            <EnglishTerm>AI</EnglishTerm>
          </Text>
        </div>
        <div
          style={{
            position: "absolute",
            left: 0,
            right: 0,
            top: 475,
            opacity: 1 - diagram,
          }}
        >
          <Text size={58}>أنظمة تقدر تعمل مهام ذكية</Text>
        </div>
        <div style={{ opacity: diagram }}>
          <div style={{ position: "absolute", left: 0, top: 140, width: 195 }}>
            <Text size={40} style={{ marginBottom: 20 }}>
              مخرجات
            </Text>
            <Panel
              accent={C.mint}
              style={{ height: 150, padding: 18, textAlign: "center" }}
            >
              <MessageSquare size={48} color={C.mint} />
              <Text size={40}>نص جديد</Text>
            </Panel>
            <Panel
              accent={C.mint}
              style={{ height: 150, padding: 18, marginTop: 30 }}
            >
              <Text size={40}>قطة</Text>
              <div style={{ display: "flex", justifyContent: "center" }}>
                <Animal size={64} color={C.mint} />
              </div>
            </Panel>
          </div>
          <div style={{ position: "absolute", right: 0, top: 140, width: 195 }}>
            <Text size={40} style={{ marginBottom: 20 }}>
              مدخلات
            </Text>
            <Panel
              accent={C.coral}
              style={{ height: 150, padding: 18, textAlign: "center" }}
            >
              <FileText size={48} color={C.coral} />
              <Text size={40}>لغة</Text>
            </Panel>
            <Panel
              accent={C.coral}
              style={{
                height: 150,
                padding: 18,
                marginTop: 30,
                textAlign: "center",
              }}
            >
              <Image size={48} color={C.coral} />
              <Text size={40}>صورة</Text>
            </Panel>
          </div>
          <svg
            width={804}
            height={600}
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              pointerEvents: "none",
            }}
          >
            <ArrowPath
              d="M602 282 H540 M554 269 L540 282 L554 295"
              progress={motion(f, 112, 28)}
              color={C.coral}
            />
            <ArrowPath
              d="M264 282 H208 M222 269 L208 282 L222 295"
              progress={motion(f, 148, 28)}
              color={C.mint}
            />
            <ArrowPath
              d="M602 462 H566 Q540 462 540 436 V369 M553 382 L540 369 L527 382"
              progress={motion(f, 210, 30)}
              color={C.coral}
            />
            <ArrowPath
              d="M264 369 V436 Q264 462 238 462 H208 M222 449 L208 462 L222 475"
              progress={motion(f, 240, 30)}
              color={C.mint}
            />
            {f > 120 && f < 220 && (
              <circle cx={x} cy={282} r={8} fill={C.charcoal} />
            )}
          </svg>
          <SmoothEntrance start={145}>
            <div
              style={{ position: "absolute", top: 610, left: 130, width: 544 }}
            >
              <Text size={46}>لغة وصور… ومهام كتير</Text>
            </div>
          </SmoothEntrance>
        </div>
      </div>
    </SceneShell>
  );
};
