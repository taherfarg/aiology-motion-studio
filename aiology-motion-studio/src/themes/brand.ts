export const palette = {
  coral: "#FF6B4A",
  yellow: "#F5BB42",
  mint: "#47B78A",
  lavender: "#A78BCE",
  orange: "#F4A261",
  charcoal: "#252525",
  white: "#FFFFFF",
  line: "#E8E5E1",
  muted: "#646464",
} as const;
export const typography = {
  family: "Cairo, Tahoma, sans-serif",
  title: 80,
  body: 48,
  caption: 52,
};
// Conservative editorial zones; platform overlays must still be checked per export.
export const safeZone = {
  left: 96,
  right: 180,
  top: 180,
  bottom: 340,
  captionBottom: 350,
};
export const videoDefaults = { width: 1080, height: 1920, fps: 30 };
