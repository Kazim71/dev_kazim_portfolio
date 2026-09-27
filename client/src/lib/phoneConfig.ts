// Centralized tuning values for the 3D phone scene.
// Change exploded distances, rotation, camera position and section
// progress ranges here without touching component code.

export type LayerId =
  | "front-glass"
  | "digitizer"
  | "oled"
  | "inner-frame"
  | "hinge"
  | "main-pcb"
  | "secondary-pcb"
  | "processor"
  | "memory"
  | "battery-left"
  | "battery-right"
  | "camera-module"
  | "speaker"
  | "flex-cables"
  | "vibration"
  | "shields"
  | "rear-frame"
  | "rear-glass";

export type LayerConfig = {
  id: LayerId;
  label: string;
  description: string;
  /** stacking order along the phone's depth (Z) axis, 0 = frontmost */
  depth: number;
  /** relative footprint of the layer versus the full device (0-1) */
  size: [width: number, height: number];
  /** local offset from device center, in device units */
  offset: [x: number, y: number];
  color: string;
  emissive: string;
};

// Physical device envelope, in Three.js world units.
export const DEVICE = {
  width: 1.05,
  height: 2.15,
  thickness: 0.16,
};

// Distance each stacked layer separates when fully exploded.
export const EXPLODE_GAP = 0.34;

export const LAYERS: LayerConfig[] = [
  { id: "front-glass", label: "FRONT GLASS", description: "Protective front surface and first point of contact.", depth: 0, size: [1, 1], offset: [0, 0], color: "#dfe6e2", emissive: "#0a0a0a" },
  { id: "digitizer", label: "TOUCH / DIGITIZER", description: "Translates touch into precise interface input.", depth: 1, size: [0.97, 0.97], offset: [0, 0], color: "#9aa39c", emissive: "#0a0a0a" },
  { id: "oled", label: "OLED DISPLAY", description: "The visual layer where product stories become visible.", depth: 2, size: [0.93, 0.93], offset: [0, 0], color: "#141514", emissive: "#0d3a2c" },
  { id: "inner-frame", label: "INNER FRAME", description: "Structural geometry that keeps every layer aligned.", depth: 3, size: [1, 1], offset: [0, 0], color: "#4a4d4a", emissive: "#0a0a0a" },
  { id: "hinge", label: "HINGE ASSEMBLY", description: "The interaction point that lets two surfaces become one.", depth: 4, size: [1, 0.12], offset: [0, 0], color: "#8a8d87", emissive: "#0a0a0a" },
  { id: "main-pcb", label: "MAIN BOARD", description: "Core routing for data, integrations and backend logic.", depth: 5, size: [0.82, 0.55], offset: [0, 0.28], color: "#1c3a2b", emissive: "#123322" },
  { id: "secondary-pcb", label: "SECONDARY PCB", description: "Supporting pathways that keep the system modular.", depth: 6, size: [0.7, 0.32], offset: [0, -0.5], color: "#1c3a2b", emissive: "#0f2a1c" },
  { id: "processor", label: "PROCESSOR / SOC", description: "The decision layer: automation, agents and useful intelligence.", depth: 7, size: [0.26, 0.26], offset: [-0.14, 0.32], color: "#2a2a2c", emissive: "#3a2f0d" },
  { id: "memory", label: "MEMORY / STORAGE", description: "Context and persistence for reliable workflows.", depth: 8, size: [0.2, 0.14], offset: [0.22, 0.32], color: "#2a2a2c", emissive: "#0a0a0a" },
  { id: "battery-left", label: "BATTERY L", description: "Capacity for infrastructure that keeps running.", depth: 9, size: [0.4, 0.86], offset: [-0.24, -0.55], color: "#c8cdc4", emissive: "#0a0a0a" },
  { id: "battery-right", label: "BATTERY R", description: "Redundancy for dependable delivery and deployment.", depth: 10, size: [0.4, 0.86], offset: [0.24, -0.55], color: "#c8cdc4", emissive: "#0a0a0a" },
  { id: "camera-module", label: "CAMERA MODULE", description: "A lens into real work, projects and customer outcomes.", depth: 11, size: [0.34, 0.34], offset: [-0.5, 1.35], color: "#111213", emissive: "#0a0a0a" },
  { id: "speaker", label: "SPEAKER / SENSORS", description: "Signals that communicate clearly at the right moment.", depth: 12, size: [0.5, 0.1], offset: [0, 1.5], color: "#3a3c3a", emissive: "#0a0a0a" },
  { id: "flex-cables", label: "FLEX CABLES", description: "Flexible connections across tools, services and APIs.", depth: 13, size: [0.06, 1.6], offset: [0.55, 0], color: "#b8862f", emissive: "#3a230a" },
  { id: "vibration", label: "VIBRATION MOTOR", description: "Small feedback loops that make systems feel responsive.", depth: 14, size: [0.18, 0.18], offset: [0.55, -1.35], color: "#5a5c5a", emissive: "#0a0a0a" },
  { id: "shields", label: "INTERNAL SHIELDS", description: "Boundaries that protect performance, data and trust.", depth: 15, size: [0.95, 0.95], offset: [0, 0], color: "#7d827b", emissive: "#0a0a0a" },
  { id: "rear-frame", label: "REAR FRAME", description: "A stable base for the work users never have to see.", depth: 16, size: [1, 1], offset: [0, 0], color: "#3a3c3a", emissive: "#0a0a0a" },
  { id: "rear-glass", label: "REAR GLASS", description: "The finished surface: calm outside, considered inside.", depth: 17, size: [1, 1], offset: [0, 0], color: "#16302a", emissive: "#0a1a15" },
];

// Progress (0-1, driven by scroll) ranges for each cinematic beat.
export const TIMELINE = {
  fold: { start: 0.16, end: 0.36 },
  explodeIn: { start: 0.35, end: 0.62 },
  explodeHold: { start: 0.62, end: 0.8 },
  reassembly: { start: 0.78, end: 0.97 },
  displayFocus: { start: 0.44, end: 0.64 },
  pcbFocus: { start: 0.64, end: 0.76 },
  processorFocus: { start: 0.7, end: 0.8 },
  cameraFocus: { start: 0.82, end: 0.94 },
};

// Camera dolly/orbit keyframes, lerped by overall progress.
export const CAMERA_PATH: { at: number; position: [number, number, number]; fov: number }[] = [
  { at: 0, position: [0, 0, 5.6], fov: 32 },
  { at: 0.16, position: [1.1, 0.2, 5.2], fov: 32 },
  { at: 0.36, position: [0, 0.1, 5.4], fov: 32 },
  { at: 0.5, position: [0.3, 0.15, 6.6], fov: 34 },
  { at: 0.64, position: [-0.9, 0.1, 5.6], fov: 32 },
  { at: 0.74, position: [-0.4, 0.05, 4.6], fov: 30 },
  { at: 0.84, position: [0.8, -0.1, 5.2], fov: 32 },
  { at: 0.97, position: [0, 0, 5.6], fov: 32 },
  { at: 1, position: [0, 0, 5.6], fov: 32 },
];

// Toggle to true and place a rigged .glb at PHONE_GLB_PATH to swap the
// procedural placeholder rig for a real modeled/textured phone. Node names
// on the model should match the LayerId values above so PhoneModel can
// still drive them individually (fold / explode / highlight).
export const USE_GLB_MODEL = false;
export const PHONE_GLB_PATH = "/models/phone.glb";
