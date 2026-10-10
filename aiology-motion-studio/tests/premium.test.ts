import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync, statSync } from "node:fs";
import { previewFrames } from "../src/episodes/episode001/timeline";
import { premiumScenes } from "../src/episodes/episode001/premium/plan";
import {
  premiumCues,
  MUSIC_VOLUME,
} from "../src/episodes/episode001/premium/sound-plan";
import { sceneDurations, TRANSITION_FRAMES } from "../src/kit/transitions";
import { SFX_LENGTH_FRAMES } from "../src/kit/sfx";

const wavFrames = (file: string) => {
  const head = readFileSync(file).subarray(0, 44);
  assert.equal(head.toString("ascii", 0, 4), "RIFF");
  return ((statSync(file).size - 44) / head.readUInt32LE(28)) * 30;
};

test("transition overlaps cancel out so every cut lands on its scene boundary", () => {
  const d = sceneDurations(premiumScenes);
  const overlap = TRANSITION_FRAMES * (d.length - 1);
  assert.equal(
    d.reduce((a, b) => a + b, 0) - overlap,
    previewFrames,
    "premium cut length must equal the silent-preview length",
  );
  let start = 0;
  d.forEach((n, i) => {
    // Scene i starts at (sum of previous durations) - (previous overlaps) = its cut point.
    assert.equal(
      start - i * TRANSITION_FRAMES,
      premiumScenes.slice(0, i).reduce((a, b) => a + b, 0),
    );
    start += n;
  });
});

test("every sound cue fits inside the composition and uses a generated effect", () => {
  for (const cue of premiumCues) {
    assert.ok(
      cue.at >= 0 && cue.at + SFX_LENGTH_FRAMES[cue.sfx] <= previewFrames,
      `${cue.sfx}@${cue.at}`,
    );
    assert.ok(
      (cue.volume ?? 0.5) <= 0.6,
      "effects stay quiet under a future voiceover",
    );
  }
  assert.ok(MUSIC_VOLUME <= 0.3);
});

test("generated audio exists and matches the declared effect lengths", () => {
  for (const [name, frames] of Object.entries(SFX_LENGTH_FRAMES))
    assert.ok(
      Math.abs(wavFrames(`public/sfx/${name}.wav`) - frames) <= 1.5,
      name,
    );
  assert.ok(
    wavFrames("public/audio/music-bed.wav") >= (previewFrames / 30) * 30,
  );
});
