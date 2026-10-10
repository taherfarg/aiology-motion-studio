import {
  mkdirSync,
  existsSync,
  readFileSync,
  writeFileSync,
  copyFileSync,
} from "node:fs";
import { join } from "node:path";

export const createDraftEpisode = (studioRoot: string, id: string) => {
  if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(id))
    throw new Error("Invalid episode slug");
  const folder = join(studioRoot, "episodes", id);
  if (existsSync(folder))
    throw new Error("Episode already exists; existing work was preserved");
  mkdirSync(folder, { recursive: true });
  for (const dir of [
    "assets/audio",
    "assets/images",
    "assets/sfx",
    "assets/music",
    "review",
  ])
    mkdirSync(join(folder, dir), { recursive: true });
  const template = JSON.parse(
    readFileSync(join(studioRoot, "templates/episode.json"), "utf8"),
  );
  writeFileSync(
    join(folder, "episode.json"),
    JSON.stringify({ ...template, id, title: id }, null, 2) + "\n",
  );
  writeFileSync(join(folder, "script.ar.md"), "# السكريبت\n\n");
  copyFileSync(
    join(studioRoot, "studio/DIRECTOR_BRIEF.md"),
    join(folder, "director-brief.md"),
  );
  writeFileSync(
    join(folder, "storyboard.md"),
    "# Storyboard\n\nUse studio/STORYBOARD_GUIDE.md; author scenes in episode.json after listening to the recording.\n",
  );
  return folder;
};
