import {
  mkdirSync,
  readFileSync,
  writeFileSync,
  existsSync,
  copyFileSync,
} from "node:fs";
import { resolve, join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { spawnSync } from "node:child_process";
import { createRequire } from "node:module";
import { episodeSchema, type Episode } from "../src/utils/episode-schema";
import { containedPath, probe, decodeCheck } from "./media";
import { createDraftEpisode } from "./create-episode";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const require = createRequire(import.meta.url);
const remotionPackagePath = require.resolve("@remotion/cli/package.json");
const remotionPackage = JSON.parse(readFileSync(remotionPackagePath, "utf8"));
const cli = resolve(dirname(remotionPackagePath), remotionPackage.bin.remotion);
const run = (args: string[]) => {
  const result = spawnSync(process.execPath, [cli, ...args], {
    cwd: root,
    stdio: "inherit",
  });
  if (result.error || result.status !== 0)
    throw new Error("Remotion command failed");
};
const [command, id, ...flags] = process.argv.slice(2);
if (!id || !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(id))
  throw new Error(
    "Provide a lowercase episode slug: npm run episode:new -- my-topic",
  );
const folder = join(root, "episodes", id),
  manifest = join(folder, "episode.json");

if (command === "new") {
  createDraftEpisode(root, id);
  console.log(
    `Created draft: ${folder}. Supply script and recorded voiceover before production.`,
  );
} else {
  const episode: Episode = episodeSchema.parse(
    JSON.parse(readFileSync(manifest, "utf8")),
  );
  if (episode.id !== id) throw new Error("Folder slug and manifest ID differ");
  const script = readFileSync(
    containedPath(folder, episode.scriptFile),
    "utf8",
  );
  if (
    !flags.includes("--draft") &&
    (episode.status !== "ready" || !episode.voiceover)
  )
    throw new Error(
      "Supply voiceover and complete the storyboard/captions; status must be ready",
    );
  const assets = [
    ...(episode.voiceover ? [episode.voiceover.file] : []),
    ...episode.sfx.map((s) => s.file),
    ...(episode.music ? [episode.music.file] : []),
  ];
  for (const file of assets) {
    const asset = containedPath(folder, file);
    if (!existsSync(asset)) throw new Error(`Missing asset: ${file}`);
    const metadata = probe(asset);
    if (!metadata.streams.some((s) => s.codec_type === "audio"))
      throw new Error(`No audio stream: ${file}`);
  }
  if (episode.voiceover) {
    const audio = containedPath(folder, episode.voiceover.file);
    const duration = Number(probe(audio).format.duration) * 1000;
    if (
      !Number.isFinite(duration) ||
      Math.abs(duration - episode.voiceover.durationMs) >
        1000 / episode.render.fps
    )
      throw new Error(
        `Voiceover duration mismatch: measured ${duration}ms; update manifest before timing scenes`,
      );
    decodeCheck(audio);
    if (script.replace(/^#.*$/gm, "").trim().length < 10)
      throw new Error("Arabic script is empty");
  }
  console.log(
    `Validated ${id}: ${episode.scenes.length} scenes, ${episode.captions.length} caption cues`,
  );
  if (command === "validate") process.exit(0);
  if (!["prepare", "preview", "render"].includes(command))
    throw new Error("Commands: new, validate, prepare, preview, render");
  if (episode.status !== "ready" || !episode.voiceover)
    throw new Error("Production requires a ready episode");
  const assetRoot = `episodes/${id}`;
  for (const file of assets) {
    const target = containedPath(join(root, "public"), `${assetRoot}/${file}`);
    mkdirSync(dirname(target), { recursive: true });
    copyFileSync(containedPath(folder, file), target);
  }
  const propsPath = join(root, "output", "props", `${id}.json`);
  mkdirSync(dirname(propsPath), { recursive: true });
  writeFileSync(propsPath, JSON.stringify({ episode, assetRoot }, null, 2));
  console.log(`Prepared render props: ${propsPath}`);
  if (command === "preview")
    run(["studio", "src/index.ts", `--props=${propsPath}`, "--no-open"]);
  if (command === "render") {
    const stamp = new Date().toISOString().replace(/[:.]/g, "-");
    const output = join(root, "output", id, `${id}-${stamp}.mp4`);
    mkdirSync(dirname(output), { recursive: true });
    run([
      "render",
      "src/index.ts",
      "Episode",
      output,
      `--props=${propsPath}`,
      "--codec=h264",
      "--audio-codec=aac",
      "--pixel-format=yuv420p",
      `--crf=${episode.render.crf}`,
    ]);
    decodeCheck(output);
    const metadata = probe(output),
      video = metadata.streams.find((s) => s.codec_type === "video"),
      audio = metadata.streams.find((s) => s.codec_type === "audio");
    if (
      video?.width !== 1080 ||
      video.height !== 1920 ||
      video.avg_frame_rate !== "30/1" ||
      video.codec_name !== "h264" ||
      audio?.codec_name !== "aac"
    )
      throw new Error("Export format check failed");
    writeFileSync(output + ".probe.json", JSON.stringify(metadata, null, 2));
    console.log(`Verified export: ${output}`);
  }
}
