// Centralized tuning values for the 3D notebook scene.

export type PageId = "cover" | "about" | "systems" | "backend" | "ai" | "experience" | "back-cover";

export type PageConfig = {
  id: PageId;
  label: string;
  color: string;
};

// Order matters: index 0 is the front cover, last is the back cover.
// Each page turns from resting on the right stack to the left stack as
// scroll progress moves through its slice of the timeline.
export const PAGES: PageConfig[] = [
  { id: "cover", label: "COVER", color: "#1c1f1d" },
  { id: "about", label: "ABOUT", color: "#e8e6dd" },
  { id: "systems", label: "SYSTEMS", color: "#e8e6dd" },
  { id: "backend", label: "BACKEND", color: "#e8e6dd" },
  { id: "ai", label: "AI / AUTOMATION", color: "#e8e6dd" },
  { id: "experience", label: "EXPERIENCE", color: "#e8e6dd" },
  { id: "back-cover", label: "BACK COVER", color: "#1c1f1d" },
];

// Notebook physical envelope, in Three.js world units.
export const NOTEBOOK = {
  width: 1.5,
  height: 2.1,
  pageThickness: 0.012,
  spineGap: 0.02,
};

// Camera dolly/orbit keyframes, lerped by overall progress.
export const CAMERA_PATH: { at: number; position: [number, number, number]; fov: number }[] = [
  { at: 0, position: [0, 0.05, 4.2], fov: 30 },
  { at: 0.5, position: [0.15, 0.05, 3.8], fov: 30 },
  { at: 1, position: [0, 0.05, 4.2], fov: 30 },
];
