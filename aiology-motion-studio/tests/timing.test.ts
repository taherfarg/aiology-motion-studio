import { test } from "node:test";
import assert from "node:assert/strict";
import {
  framesForDuration,
  progressAt,
  sceneFrameRange,
  activeCaption,
} from "../src/utils/timing";

test("audio duration rounds up so the final sample is retained", () => {
  assert.equal(framesForDuration(1001, 30), 31);
  assert.throws(() => framesForDuration(0, 30));
});
test("animation holds its boundary states and supports a one-frame entrance", () => {
  assert.equal(progressAt(9, 10, 20), 0);
  assert.equal(progressAt(30, 10, 20), 1);
  assert.equal(progressAt(10, 10, 1), 0);
  assert.equal(progressAt(11, 10, 1), 1);
});
test("adjacent millisecond boundaries map to adjacent frame ranges", () => {
  assert.deepEqual(sceneFrameRange(0, 1001, 30), {
    from: 0,
    durationInFrames: 31,
  });
  assert.deepEqual(sceneFrameRange(1001, 2000, 30), {
    from: 31,
    durationInFrames: 29,
  });
});
test("caption intervals are half-open and do not leak across boundaries", () => {
  const captions = [
    {
      text: "اختبار",
      startMs: 100,
      endMs: 200,
      timestampMs: null,
      confidence: null,
    },
  ];
  assert.equal(activeCaption(captions, 99), undefined);
  assert.equal(activeCaption(captions, 100)?.text, "اختبار");
  assert.equal(activeCaption(captions, 200), undefined);
});
