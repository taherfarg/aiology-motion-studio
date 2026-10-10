import { loadFont } from "@remotion/fonts";
import { staticFile } from "remotion";

// Remotion delays rendering until these local files have loaded. No network font dependency.
export const fontsReady = Promise.all(
  ["400", "600", "700"].flatMap((weight) =>
    ["arabic", "latin"].map((subset) =>
      loadFont({
        family: "Cairo",
        weight,
        url: staticFile(`fonts/cairo-${subset}-${weight}-normal.woff2`),
      }),
    ),
  ),
);
