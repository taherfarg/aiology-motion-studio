import { spawnSync } from "node:child_process";
import { resolve, sep } from "node:path";
import { existsSync, realpathSync } from "node:fs";

export const probe = (file: string) => {
  const result = spawnSync(
    "ffprobe",
    ["-v", "error", "-show_format", "-show_streams", "-of", "json", file],
    { encoding: "utf8" },
  );
  if (result.error || result.status !== 0)
    throw new Error(
      `FFprobe failed: ${result.error?.message ?? result.stderr}`,
    );
  return JSON.parse(result.stdout) as {
    format: { duration: string };
    streams: {
      codec_type: string;
      codec_name: string;
      width?: number;
      height?: number;
      avg_frame_rate?: string;
      sample_rate?: string;
      channels?: number;
    }[];
  };
};
export const containedPath = (root: string, relative: string) => {
  const base = resolve(root),
    file = resolve(base, relative);
  if (file === base || !file.startsWith(base + sep))
    throw new Error("Asset escapes episode directory");
  if (
    existsSync(file) &&
    !realpathSync(file).startsWith(realpathSync(base) + sep)
  )
    throw new Error("Linked asset escapes episode directory");
  return file;
};
export const decodeCheck = (file: string) => {
  const result = spawnSync(
    "ffmpeg",
    ["-v", "error", "-i", file, "-f", "null", "-"],
    { encoding: "utf8" },
  );
  if (result.error || result.status !== 0)
    throw new Error(`Decode failed: ${result.error?.message ?? result.stderr}`);
};
