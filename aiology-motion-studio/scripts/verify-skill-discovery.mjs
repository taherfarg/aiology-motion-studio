import { spawn } from "node:child_process";
import process from "node:process";
import console from "node:console";
import { setTimeout, clearTimeout } from "node:timers";
import { join, resolve } from "node:path";
import { homedir } from "node:os";
import { existsSync, writeFileSync, mkdirSync } from "node:fs";
import { createInterface } from "node:readline";

const codexCli = process.env.APPDATA
  ? join(process.env.APPDATA, "npm/node_modules/@openai/codex/bin/codex.js")
  : null;
if (!codexCli || !existsSync(codexCli))
  throw new Error(
    "Codex CLI not found; verify the selector in a fresh Codex chat",
  );
const child = spawn(process.execPath, [codexCli, "app-server", "--stdio"], {
  stdio: ["pipe", "pipe", "pipe"],
});
const expected = [
  "aiology-motion-studio",
  "remotion-best-practices",
  "remotion-create",
  "remotion-markup",
  "remotion-captions",
  "remotion-render",
];
const send = (value) => child.stdin.write(JSON.stringify(value) + "\n");
const timer = setTimeout(() => {
  child.kill();
  console.error(
    "Skill discovery timed out; use the documented manual selector check",
  );
  process.exitCode = 1;
}, 30000);
// Avoid exposing configuration/logs from the fresh read-only server.
child.stderr.resume();
const lines = createInterface({ input: child.stdout });
lines.on("line", (line) => {
  let response;
  try {
    response = JSON.parse(line);
  } catch {
    return;
  }
  if (response.id === 1) {
    if (response.error) {
      clearTimeout(timer);
      child.kill();
      throw new Error("Codex initialization failed");
    }
    send({ method: "initialized", params: {} });
    send({
      id: 2,
      method: "skills/list",
      params: { cwds: [resolve("."), homedir()], forceReload: true },
    });
  }
  if (response.id === 2) {
    clearTimeout(timer);
    const groups = response.result?.data ?? [];
    const summary = groups.map((group) => ({
      cwd: group.cwd,
      errors: (group.errors ?? []).map((e) => ({
        path: e.path,
        message: e.message,
      })),
      skills: group.skills
        .filter((s) => expected.includes(s.name))
        .map((s) => ({
          name: s.name,
          path: s.path,
          enabled: s.enabled,
          scope: s.scope,
        })),
    }));
    mkdirSync("output", { recursive: true });
    writeFileSync(
      "output/skill-discovery.json",
      JSON.stringify(
        { method: "fresh Codex app-server skills/list", summary },
        null,
        2,
      ),
    );
    for (const name of expected) {
      const found = summary.some((g) =>
        g.skills.some((s) => s.name === name && s.enabled !== false),
      );
      console.log(`${found ? "PASS" : "FAIL"} discovered ${name}`);
      if (!found) process.exitCode = 1;
    }
    if (response.error) {
      console.error("skills/list rejected; verify manually");
      process.exitCode = 1;
    }
    child.kill();
  }
});
send({
  id: 1,
  method: "initialize",
  params: {
    clientInfo: { name: "aiology-setup-audit", version: "1.0.0" },
    capabilities: { experimentalApi: true },
  },
});
