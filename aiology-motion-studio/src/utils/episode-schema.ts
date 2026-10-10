import { z } from "zod";

const assetPath = z
  .string()
  .min(1)
  .refine(
    (p) =>
      !p.includes("..") &&
      !p.startsWith("/") &&
      !p.includes("\\") &&
      !/^[a-z]+:/i.test(p),
    "Use a relative episode asset path",
  );
export const captionSchema = z
  .object({
    text: z.string().min(1),
    startMs: z.number().nonnegative(),
    endMs: z.number().positive(),
    timestampMs: z.number().nonnegative().nullable(),
    confidence: z.number().min(0).max(1).nullable(),
    pageBreakAfter: z.boolean().optional(),
  })
  .refine((c) => c.endMs > c.startMs, {
    message: "Caption ends before it starts",
  });
export const sceneSchema = z
  .object({
    id: z.string().min(1),
    type: z.enum([
      "title",
      "concept",
      "process",
      "comparison",
      "neural",
      "dataflow",
    ]),
    startMs: z.number().nonnegative(),
    endMs: z.number().positive(),
    title: z.string().min(1),
    description: z.string().optional(),
    accent: z
      .string()
      .regex(/^#[0-9a-f]{6}$/i)
      .default("#FF6B4A"),
    steps: z.array(z.string().min(1)).min(1).max(4).optional(),
    layers: z.array(z.number().int().min(1).max(12)).min(2).max(6).optional(),
    comparison: z
      .object({
        left: z.object({
          title: z.string(),
          description: z.string().optional(),
        }),
        right: z.object({
          title: z.string(),
          description: z.string().optional(),
        }),
      })
      .optional(),
    visualIntent: z.string().min(1),
    spokenCue: z.string().min(1),
  })
  .superRefine((s, c) => {
    if (s.endMs <= s.startMs)
      c.addIssue({
        code: "custom",
        message: "Scene must have a positive duration",
      });
    if (s.type === "process" && !s.steps)
      c.addIssue({ code: "custom", message: "Process scene requires steps" });
    if (s.type === "comparison" && !s.comparison)
      c.addIssue({
        code: "custom",
        message: "Comparison scene requires both alternatives",
      });
  });
export const episodeSchema = z
  .object({
    schemaVersion: z.literal(1),
    id: z.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/),
    title: z.string().min(1),
    language: z.literal("ar-EG"),
    status: z.enum(["draft", "ready"]),
    objectives: z.array(z.string().min(1)),
    scriptFile: assetPath,
    voiceover: z
      .object({
        file: assetPath,
        durationMs: z.number().positive(),
        volume: z.number().min(0).max(2).default(1),
      })
      .nullable(),
    scenes: z.array(sceneSchema),
    captions: z.array(captionSchema),
    sfx: z.array(
      z.object({
        file: assetPath,
        startMs: z.number().nonnegative(),
        durationMs: z.number().positive(),
        volume: z.number().min(0).max(0.5).default(0.15),
      }),
    ),
    music: z
      .object({
        file: assetPath,
        license: z.string().min(1),
        volume: z.number().min(0).max(0.2).default(0.06),
      })
      .nullable(),
    references: z.array(
      z.object({
        label: z.string(),
        source: z.string(),
        license: z.string().optional(),
      }),
    ),
    render: z.object({
      width: z.literal(1080),
      height: z.literal(1920),
      fps: z.literal(30),
      codec: z.literal("h264"),
      audioCodec: z.literal("aac"),
      crf: z.number().int().min(16).max(23),
    }),
  })
  .superRefine((ep, ctx) => {
    const fail = (message: string) => ctx.addIssue({ code: "custom", message });
    const end = ep.voiceover?.durationMs ?? Infinity;
    const ids = new Set<string>();
    ep.scenes.forEach((scene, i) => {
      if (ids.has(scene.id)) fail("Scene IDs must be unique");
      ids.add(scene.id);
      const expected = i === 0 ? 0 : ep.scenes[i - 1].endMs;
      if (scene.startMs !== expected)
        fail("Scenes must be ordered and contiguous from zero");
      if (
        Math.ceil((scene.endMs * ep.render.fps) / 1000) <=
        Math.ceil((scene.startMs * ep.render.fps) / 1000)
      )
        fail("Every scene must occupy at least one rendered frame");
      if (scene.endMs > end + 0.01) fail("Scene extends beyond voiceover");
    });
    ep.captions.forEach((caption, i) => {
      if (caption.endMs > end + 0.01) fail("Caption extends beyond voiceover");
      if (i > 0 && caption.startMs < ep.captions[i - 1].endMs)
        fail("Caption intervals overlap or are unordered");
      if (
        caption.timestampMs !== null &&
        (caption.timestampMs < caption.startMs ||
          caption.timestampMs > caption.endMs)
      )
        fail("Caption timestamp lies outside interval");
    });
    ep.sfx.forEach((s) => {
      if (s.startMs + s.durationMs > end + 0.01)
        fail("Sound effect extends beyond voiceover");
    });
    if (ep.status === "ready") {
      if (!ep.voiceover) fail("Recorded voiceover is required");
      if (!ep.objectives.length) fail("Educational objectives are required");
      if (!ep.scenes.length) fail("Storyboard scenes are required");
      if (!ep.captions.length) fail("Reviewed captions are required");
      if (ep.voiceover && Math.abs((ep.scenes.at(-1)?.endMs ?? 0) - end) > 0.01)
        fail("Storyboard must cover the complete voiceover");
    }
  });
export type Episode = z.infer<typeof episodeSchema>;
export type EpisodeScene = z.infer<typeof sceneSchema>;
