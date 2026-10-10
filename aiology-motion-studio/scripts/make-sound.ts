// Generates the studio's original sound design: effects in public/sfx and a music bed in public/audio.
// Pure synthesis from a fixed seed (no samples, no third-party material, fully reproducible).
import { mkdirSync, writeFileSync } from "node:fs";

const SR = 48000;
type Stereo = [Float32Array, Float32Array];
const seconds = (n: number) => new Float32Array(Math.round(n * SR));

const rng = (seed: number) => () => {
  seed = (seed + 0x6d2b79f5) | 0;
  let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
  t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
  return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
};
const noise = (n: number, seed: number) => {
  const r = rng(seed),
    out = seconds(n);
  for (let i = 0; i < out.length; i++) out[i] = r() * 2 - 1;
  return out;
};
const bandpass = (x: Float32Array, freq: (t: number) => number, q: number) => {
  let low = 0,
    band = 0;
  const y = new Float32Array(x.length);
  for (let i = 0; i < x.length; i++) {
    const f = 2 * Math.sin((Math.PI * freq(i / SR)) / SR),
      high = x[i] - low - band / q;
    band += f * high;
    low += f * band;
    y[i] = band;
  }
  return y;
};
const lowpass = (x: Float32Array, hz: number) => {
  const a = 1 - Math.exp((-2 * Math.PI * hz) / SR);
  let s = 0;
  return x.map((v) => (s += a * (v - s)));
};
const finish = (x: Float32Array, peak: number) => {
  let max = 1e-9;
  for (const v of x) max = Math.max(max, Math.abs(v));
  const edge = Math.round(0.004 * SR);
  return x.map((v, i) => {
    const fade = Math.min(1, i / edge, (x.length - 1 - i) / edge);
    return (v / max) * peak * fade;
  });
};
const pan = (x: Float32Array, at: (t: number) => number): Stereo => {
  const l = new Float32Array(x.length),
    r = new Float32Array(x.length);
  for (let i = 0; i < x.length; i++) {
    const a = ((at(i / x.length) + 1) * Math.PI) / 4;
    l[i] = x[i] * Math.cos(a);
    r[i] = x[i] * Math.sin(a);
  }
  return [l, r];
};
const centered = (x: Float32Array): Stereo => pan(x, () => 0);
const tone = (
  len: number,
  hz: (t: number) => number,
  env: (t: number) => number,
) => {
  const out = seconds(len);
  let phase = 0;
  for (let i = 0; i < out.length; i++) {
    const t = i / SR;
    phase += (2 * Math.PI * hz(t)) / SR;
    out[i] = Math.sin(phase) * env(t);
  }
  return out;
};
const add = (a: Float32Array, b: Float32Array, gain = 1, at = 0) => {
  for (let i = 0; i < b.length && i + at < a.length; i++)
    a[i + at] += b[i] * gain;
  return a;
};

// Effects ----------------------------------------------------------------
const whoosh = (): Stereo => {
  const len = 0.65,
    x = noise(len, 11),
    y = bandpass(x, (t) => 400 * Math.exp((t / len) * Math.log(10)), 1.4);
  return pan(
    finish(
      y.map((v, i) => v * Math.sin(Math.PI * (i / y.length) ** 0.75) ** 2),
      0.8,
    ),
    (u) => -0.5 + u,
  );
};
const tick = (): Stereo => {
  const t1 = tone(
      0.15,
      () => 2600,
      (t) => Math.exp(-t / 0.012),
    ),
    n = bandpass(noise(0.15, 5), () => 5200, 2).map(
      (v, i) => v * Math.exp(-i / SR / 0.004),
    );
  return centered(finish(add(t1, n, 0.3), 0.55));
};
const pop = (): Stereo =>
  centered(
    finish(
      tone(
        0.3,
        (t) => 260 + 520 * Math.exp(-t * 9),
        (t) => Math.exp(-t / 0.07),
      ),
      0.7,
    ),
  );
const chime = (): Stereo => {
  const partials: [number, number, number][] = [
    [880, 1, 1.0],
    [1318.5, 0.55, 0.7],
    [1760, 0.35, 0.5],
    [2637, 0.15, 0.3],
  ];
  const dry = seconds(1.7);
  for (const [hz, amp, decay] of partials)
    add(
      dry,
      tone(
        1.7,
        () => hz,
        (t) => Math.min(1, t / 0.004) * Math.exp(-t / decay),
      ),
      amp,
    );
  add(dry, dry.slice(), 0.3, Math.round(0.09 * SR));
  add(dry, dry.slice(), 0.18, Math.round(0.17 * SR));
  return pan(finish(dry, 0.65), (u) => 0.3 - 0.6 * u);
};
const write = (): Stereo => {
  const len = 0.6,
    y = bandpass(noise(len, 21), () => 3000, 3);
  return centered(
    finish(
      y.map((v, i) => {
        const t = i / SR;
        return (
          v *
          (0.5 + 0.5 * Math.sin(2 * Math.PI * (14 + 6 * t) * t)) *
          Math.sin(Math.PI * (i / y.length))
        );
      }),
      0.45,
    ),
  );
};
const thud = (): Stereo => {
  const body = tone(
    0.5,
    (t) => 55 + 55 * Math.exp(-t * 14),
    (t) => Math.exp(-t / 0.12),
  );
  add(
    body,
    tone(
      0.5,
      (t) => 300 * Math.exp(-t * 20) + 120,
      (t) => Math.exp(-t / 0.03),
    ),
    0.35,
  );
  return centered(finish(body, 0.8));
};
const riser = (): Stereo => {
  const len = 1.3,
    n = bandpass(
      noise(len, 33),
      (t) => 300 * Math.exp((t / len) * Math.log(8)),
      2,
    ),
    s = tone(
      len,
      (t) => 180 * Math.exp((t / len) * Math.log(4)),
      () => 1,
    );
  const mixed = add(n, s, 0.5).map((v, i) => v * (i / (len * SR)) ** 2);
  return pan(finish(mixed, 0.6), (u) => Math.sin(u * 6) * 0.3);
};

// Music bed ----------------------------------------------------------------
const midi = (n: number) => 440 * 2 ** ((n - 69) / 12);
const pluck = (hz: number, len: number, damping: number): Float32Array => {
  const period = Math.round(SR / hz),
    line = noise(period / SR, Math.round(hz)),
    out = seconds(len);
  for (let i = 0; i < out.length; i++) {
    const j = i % period,
      next = line[(j + 1) % period];
    out[i] = line[j];
    line[j] = ((line[j] + next) / 2) * damping;
  }
  return out;
};
const reverb = (x: Float32Array, offset: number): Float32Array => {
  const out = new Float32Array(x.length);
  for (const d of [1557, 1617, 1491, 1422].map((v) => v + offset)) {
    const y = new Float32Array(x.length);
    for (let i = 0; i < x.length; i++)
      y[i] = x[i] + (i >= d ? 0.8 * y[i - d] : 0);
    for (let i = 0; i < x.length; i++) out[i] += y[i] / 4;
  }
  for (const d of [225 + offset, 556 + offset]) {
    const y = new Float32Array(x.length);
    for (let i = 0; i < x.length; i++)
      y[i] = -0.5 * out[i] + (i >= d ? out[i - d] + 0.5 * y[i - d] : 0);
    out.set(y);
  }
  return out;
};
const musicBed = (): Stereo => {
  const len = 58,
    beat = 60 / 96,
    chords = [
      [48, 52, 55, 59],
      [45, 48, 52, 55],
      [41, 45, 48, 52],
      [43, 47, 50, 52],
    ],
    chordLen = beat * 8,
    padL = seconds(len),
    padR = seconds(len),
    plucks = seconds(len);
  for (let c = 0; c * chordLen < len; c++) {
    const chord = chords[c % chords.length],
      at = Math.round(c * chordLen * SR),
      span = chordLen + 2.8,
      env = (t: number) => Math.min(1, t / 1.4) * Math.min(1, (span - t) / 1.4);
    for (const note of chord) {
      const hz = midi(note);
      for (const [buf, detune] of [
        [padL, 1.0016],
        [padR, 0.9984],
      ] as const) {
        const voice = tone(span, () => hz * detune, env);
        add(
          voice,
          tone(
            span,
            () => hz * 2 * detune,
            (t) => env(t) * 0.3,
          ),
        );
        add(
          voice,
          tone(
            span,
            () => hz * 3 * detune,
            (t) => env(t) * 0.1,
          ),
        );
        add(buf, voice, 0.06, at);
      }
    }
    // Sparse arpeggio on top; starts after the opening bars so the bed builds.
    const steps = [0, 2, 1, 3, 2, 3, 1, 2],
      mask = [1, 0, 1, 1, 0, 1, 1, 0];
    if (c >= 1)
      steps.forEach((s, i) => {
        if (!mask[i]) return;
        const t = c * chordLen + (i * beat) / 2;
        add(
          plucks,
          pluck(midi(chord[s] + 24), 1.4, 0.996),
          0.2,
          Math.round(t * SR),
        );
      });
  }
  const wetL = reverb(plucks, 0),
    wetR = reverb(plucks, 23),
    master = (x: Float32Array, wet: Float32Array) => {
      const y = add(lowpass(x, 1800), lowpass(plucks, 5000), 0.8);
      add(y, wet, 0.9);
      return y.map((v, i) => {
        const t = i / SR;
        return v * Math.min(1, t / 3) * Math.min(1, (len - t) / 3);
      });
    };
  return [master(padL, wetL), master(padR, wetR)];
};

// WAV output -----------------------------------------------------------------
const wav = ([l, r]: Stereo, peak: number): Buffer => {
  let max = 1e-9;
  for (let i = 0; i < l.length; i++)
    max = Math.max(max, Math.abs(l[i]), Math.abs(r[i]));
  const data = Buffer.alloc(l.length * 4),
    head = Buffer.alloc(44);
  for (let i = 0; i < l.length; i++) {
    data.writeInt16LE(Math.round((l[i] / max) * peak * 32767), i * 4);
    data.writeInt16LE(Math.round((r[i] / max) * peak * 32767), i * 4 + 2);
  }
  head.write("RIFF", 0);
  head.writeUInt32LE(36 + data.length, 4);
  head.write("WAVEfmt ", 8);
  head.writeUInt32LE(16, 16);
  head.writeUInt16LE(1, 20);
  head.writeUInt16LE(2, 22);
  head.writeUInt32LE(SR, 24);
  head.writeUInt32LE(SR * 4, 28);
  head.writeUInt16LE(4, 32);
  head.writeUInt16LE(16, 34);
  head.write("data", 36);
  head.writeUInt32LE(data.length, 40);
  return Buffer.concat([head, data]);
};

mkdirSync("public/sfx", { recursive: true });
mkdirSync("public/audio", { recursive: true });
const effects = { whoosh, tick, pop, chime, write, thud, riser };
for (const [name, make] of Object.entries(effects))
  writeFileSync(`public/sfx/${name}.wav`, wav(make(), 0.9));
writeFileSync("public/audio/music-bed.wav", wav(musicBed(), 0.8));
writeFileSync(
  "public/sfx/LICENSE.md",
  "Generated by scripts/make-sound.ts from fixed-seed synthesis. Original work: no samples, loops or third-party material, so there is no external license. Recreate with `npm run sound:generate`.\n",
);
console.log(
  `Generated ${Object.keys(effects).length} effects and the music bed.`,
);
