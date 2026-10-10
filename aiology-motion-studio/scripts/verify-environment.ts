import { spawnSync } from "node:child_process";
import {
  readFileSync,
  existsSync,
  readdirSync,
  mkdirSync,
  writeFileSync,
} from "node:fs";
import { homedir } from "node:os";
import { resolve, join } from "node:path";
import { createRequire } from "node:module";

const require = createRequire(import.meta.url);
const records: {
  component: string;
  status: string;
  version: string;
  required: boolean;
  action: string;
}[] = [];
for (const [name, args, required] of [
  ["node", ["--version"], true],
  ["npm", ["--version"], true],
  ["git", ["--version"], true],
  ["ffmpeg", ["-version"], true],
  ["ffprobe", ["-version"], true],
  ["python", ["--version"], false],
] as const) {
  const result =
    name === "npm" && process.platform === "win32"
      ? spawnSync(
          process.execPath,
          [join(dirnameNode(), "node_modules/npm/bin/npm-cli.js"), ...args],
          { encoding: "utf8" },
        )
      : spawnSync(name, [...args], { encoding: "utf8" });
  records.push({
    component: name,
    status: result.status === 0 ? "PASS" : required ? "FAIL" : "OPTIONAL",
    version: result.stdout?.split(/\r?\n/)[0] ?? "",
    required,
    action: result.status === 0 ? "reuse" : "install official distribution",
  });
}
function dirnameNode() {
  return resolve(process.execPath, "..");
}
const pkg = JSON.parse(readFileSync("package.json", "utf8"));
const remotionVersions = new Set<string>();
for (const [name, wanted] of Object.entries({
  ...pkg.dependencies,
  ...pkg.devDependencies,
})) {
  const actual = JSON.parse(
    readFileSync(require.resolve(name + "/package.json"), "utf8"),
  ).version;
  if (name === "remotion" || name.startsWith("@remotion/"))
    remotionVersions.add(actual);
  records.push({
    component: name,
    status: actual === wanted ? "PASS" : "FAIL",
    version: actual,
    required: true,
    action: actual === wanted ? "locked" : "npm ci",
  });
}
records.push({
  component: "Remotion version alignment",
  status: remotionVersions.size === 1 ? "PASS" : "FAIL",
  version: [...remotionVersions].join(","),
  required: true,
  action: "use remotion add/upgrade",
});
for (const skill of [
  "remotion-best-practices",
  "remotion-create",
  "remotion-markup",
  "remotion-captions",
  "remotion-render",
  "aiology-motion-studio",
]) {
  const file = join(homedir(), ".agents", "skills", skill, "SKILL.md");
  const valid =
    existsSync(file) &&
    new RegExp(`name: ${skill}\\s`).test(readFileSync(file, "utf8")) &&
    readFileSync(file, "utf8").startsWith("---");
  records.push({
    component: skill,
    status: valid ? "PASS" : "FAIL",
    version: file,
    required: true,
    action: valid
      ? "files verified; reload Codex to confirm selector"
      : "install skill",
  });
}
const fonts = readdirSync("public/fonts").filter((f) => f.endsWith(".woff2"));
records.push({
  component: "Local Cairo fonts",
  status: fonts.length === 6 ? "PASS" : "FAIL",
  version: fonts.join(", "),
  required: true,
  action: "copy licensed Arabic and Latin weights",
});
mkdirSync("output", { recursive: true });
writeFileSync(
  "output/environment-verification.json",
  JSON.stringify(
    {
      platform: process.platform,
      arch: process.arch,
      cwd: process.cwd(),
      node: process.version,
      records,
    },
    null,
    2,
  ),
);
records.forEach((r) => console.log(`${r.status} ${r.component}: ${r.version}`));
if (records.some((r) => r.required && r.status === "FAIL"))
  process.exitCode = 1;
