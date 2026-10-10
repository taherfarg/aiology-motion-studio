import { writeFileSync } from "node:fs";
import { probe, decodeCheck } from "./media";

const file = process.argv[2] ?? "output/technical-check.mp4";
const silent = process.argv.includes("--silent-preview");
decodeCheck(file);
const metadata = probe(file),
  video = metadata.streams.find((s) => s.codec_type === "video"),
  audio = metadata.streams.find((s) => s.codec_type === "audio");
if (
  video?.width !== 1080 ||
  video.height !== 1920 ||
  video.codec_name !== "h264" ||
  video.avg_frame_rate !== "30/1" ||
  (silent ? audio !== undefined : audio?.codec_name !== "aac")
)
  throw new Error("Export does not match AIOLOGY settings");
writeFileSync(file + ".probe.json", JSON.stringify(metadata, null, 2));
console.log(
  `PASS decoded ${file}: 1080×1920, 30 FPS, H.264 / ${silent ? "no audio (silent preview)" : "AAC"}`,
);
