import { writeFileSync } from "node:fs";
import { previewPlan } from "../src/episodes/episode001/timeline";

const stamp = (ms: number) => {
  const h = Math.floor(ms / 3600000),
    m = Math.floor(ms / 60000) % 60,
    s = Math.floor(ms / 1000) % 60;
  return `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")},${String(ms % 1000).padStart(3, "0")}`;
};
const output = "episodes/episode-001/captions.preview.ar.srt";
writeFileSync(
  output,
  previewPlan.captions
    .map(
      (cue, i) =>
        `${i + 1}\n${stamp(cue.startMs)} --> ${stamp(cue.endMs)}\n${cue.text}\n`,
    )
    .join("\n"),
  "utf8",
);
console.log(
  `Saved ${previewPlan.captions.length} provisional caption cues: ${output}`,
);
