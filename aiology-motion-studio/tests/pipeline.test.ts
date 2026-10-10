import { test } from "node:test";
import assert from "node:assert/strict";
import {
  mkdtempSync,
  mkdirSync,
  copyFileSync,
  readFileSync,
  writeFileSync,
  rmSync,
  existsSync,
} from "node:fs";
import { join, resolve, dirname, basename } from "node:path";
import { tmpdir } from "node:os";
import { createDraftEpisode } from "../scripts/create-episode";
import { containedPath, probe, decodeCheck } from "../scripts/media";

test("new episode creates an empty draft, preserves existing work, and contains paths", () => {
  const sandbox = mkdtempSync(join(tmpdir(), "aiology-qa-"));
  try {
    mkdirSync(join(sandbox, "templates"));
    mkdirSync(join(sandbox, "studio"));
    copyFileSync(
      "templates/episode.json",
      join(sandbox, "templates/episode.json"),
    );
    copyFileSync(
      "studio/DIRECTOR_BRIEF.md",
      join(sandbox, "studio/DIRECTOR_BRIEF.md"),
    );
    const folder = createDraftEpisode(sandbox, "technical-fixture");
    const manifest = JSON.parse(
      readFileSync(join(folder, "episode.json"), "utf8"),
    );
    assert.equal(manifest.voiceover, null);
    assert.deepEqual(manifest.scenes, []);
    assert.deepEqual(manifest.captions, []);
    assert.ok(existsSync(join(folder, "assets/images")));
    writeFileSync(join(folder, "script.ar.md"), "Preserve creator edits");
    assert.throws(
      () => createDraftEpisode(sandbox, "technical-fixture"),
      /already exists/,
    );
    assert.equal(
      readFileSync(join(folder, "script.ar.md"), "utf8"),
      "Preserve creator edits",
    );
    assert.throws(() => containedPath(folder, "../other.wav"), /escapes/);
  } finally {
    // Delete only the explicitly allocated temporary QA directory.
    const target = resolve(sandbox);
    assert.equal(
      dirname(target),
      resolve(tmpdir()),
      "Unsafe QA cleanup directory",
    );
    assert.ok(
      basename(target).startsWith("aiology-qa-"),
      "Unsafe QA cleanup target",
    );
    rmSync(target, { recursive: true });
  }
});
test("actual local WAV is probed and fully decodes", () => {
  const audio = "public/audio/technical-silence.wav";
  const metadata = probe(audio);
  assert.equal(Number(metadata.format.duration), 6);
  assert.ok(metadata.streams.some((s) => s.codec_type === "audio"));
  decodeCheck(audio);
});
