import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { previewPlan } from "../src/episodes/episode001/timeline";

test("silent preview is explicitly provisional and has no invented recording", () => {
  assert.equal(previewPlan.mode, "silent-preview");
  assert.equal(previewPlan.timingBasis, "provisional-editorial");
  assert.equal(previewPlan.voiceover, null);
  assert.equal(previewPlan.fps, 30);
});
test("scene and caption ranges cover the entire preview without gaps", () => {
  for (const ranges of [previewPlan.scenes, previewPlan.captions]) {
    let end = 0;
    for (const range of ranges) {
      assert.equal(range.startMs, end);
      assert.ok(range.endMs > range.startMs);
      assert.equal(
        (range.startMs * 30) / 1000,
        Math.round((range.startMs * 30) / 1000),
      );
      end = range.endMs;
    }
    assert.equal(end, previewPlan.durationMs);
  }
});
test("provisional captions preserve every word of the supplied script", () => {
  const normalize = (text: string) => text.replace(/\s+/gu, " ").trim();
  const script = readFileSync(
    "episodes/episode-001/script.ar.md",
    "utf8",
  ).replace(/^#.*$/gm, "");
  assert.equal(
    normalize(previewPlan.captions.map((c) => c.text).join(" ")),
    normalize(script),
  );
});
