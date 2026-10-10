import { probe, decodeCheck } from "./media";
const file = process.argv[2];
if (!file)
  throw new Error("Usage: npm run audio:probe -- path/to/recording.wav");
const metadata = probe(file);
if (!metadata.streams.some((s) => s.codec_type === "audio"))
  throw new Error("No audio stream found");
decodeCheck(file);
console.log(
  JSON.stringify(
    {
      file,
      durationMs: Number(metadata.format.duration) * 1000,
      streams: metadata.streams,
    },
    null,
    2,
  ),
);
