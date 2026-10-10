import { test } from "node:test";
import assert from "node:assert/strict";
import { episodeSchema } from "../src/utils/episode-schema";
import { readFileSync } from "node:fs";

const draft = JSON.parse(readFileSync("templates/episode.json", "utf8"));
const ready = () => ({
  ...draft,
  status: "ready",
  objectives: ["test objective"],
  voiceover: {
    file: "assets/audio/voiceover.wav",
    durationMs: 1000,
    volume: 1,
  },
  scenes: [
    {
      id: "check",
      type: "title",
      startMs: 0,
      endMs: 1000,
      title: "اختبار",
      visualIntent: "technical fixture",
      spokenCue: "test",
    },
  ],
  captions: [
    {
      text: "اختبار",
      startMs: 0,
      endMs: 1000,
      timestampMs: null,
      confidence: null,
    },
  ],
});
test("a draft is valid but a ready episode must have recorded voiceover", () => {
  assert.equal(episodeSchema.safeParse(draft).success, true);
  assert.equal(
    episodeSchema.safeParse({ ...draft, status: "ready" }).success,
    false,
  );
  assert.equal(episodeSchema.safeParse(ready()).success, true);
});
test("reject out-of-order captions, incomplete storyboard, and traversal", () => {
  const episode = ready();
  assert.equal(
    episodeSchema.safeParse({
      ...episode,
      captions: [...episode.captions, ...episode.captions],
    }).success,
    false,
  );
  assert.equal(
    episodeSchema.safeParse({
      ...episode,
      scenes: [{ ...episode.scenes[0], endMs: 900 }],
    }).success,
    false,
  );
  assert.equal(
    episodeSchema.safeParse({
      ...episode,
      voiceover: { ...episode.voiceover, file: "../outside.wav" },
    }).success,
    false,
  );
});
test("process and comparison scenes require their visual data", () => {
  assert.equal(
    episodeSchema.safeParse({
      ...ready(),
      scenes: [{ ...ready().scenes[0], type: "process" }],
    }).success,
    false,
  );
  assert.equal(
    episodeSchema.safeParse({
      ...ready(),
      scenes: [{ ...ready().scenes[0], type: "comparison" }],
    }).success,
    false,
  );
});
test("subframe scenes and millisecond gaps cannot create invalid frame ranges", () => {
  const ep = ready(),
    scene = ep.scenes[0];
  assert.equal(
    episodeSchema.safeParse({
      ...ep,
      scenes: [
        { ...scene, id: "a", startMs: 0, endMs: 10 },
        { ...scene, id: "b", startMs: 10, endMs: 20 },
        { ...scene, id: "c", startMs: 20, endMs: 1000 },
      ],
    }).success,
    false,
  );
  assert.equal(
    episodeSchema.safeParse({
      ...ep,
      scenes: [
        { ...scene, id: "a", startMs: 0, endMs: 500 },
        { ...scene, id: "b", startMs: 500.005, endMs: 1000 },
      ],
    }).success,
    false,
  );
});
