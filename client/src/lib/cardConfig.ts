// Centralized tuning values for the 3D revolving card-wheel scene.

export type CardId = "hero" | "about" | "systems" | "work" | "backend" | "ai" | "experience" | "contact";

export type CardConfig = {
  id: CardId;
  label: string;
  accent: string;
};

// One card per story beat. Order matters — cards are placed evenly
// around the wheel in this order, and the wheel turns exactly one full
// revolution (2*PI) across the entire scroll, so each card gets its turn
// facing the camera in sync with its story beat.
export const CARDS: CardConfig[] = [
  { id: "hero", label: "COVER", accent: "#d7f53c" },
  { id: "about", label: "ABOUT", accent: "#79a6bb" },
  { id: "systems", label: "SYSTEMS", accent: "#d7f53c" },
  { id: "work", label: "SELECTED WORK", accent: "#79a6bb" },
  { id: "backend", label: "BACKEND", accent: "#d7f53c" },
  { id: "ai", label: "AI / AUTOMATION", accent: "#79a6bb" },
  { id: "experience", label: "EXPERIENCE", accent: "#d7f53c" },
  { id: "contact", label: "CONTACT", accent: "#79a6bb" },
];

export const WHEEL = {
  radius: 2.1,
  cardWidth: 0.52,
  cardHeight: 0.72,
  cardThickness: 0.025,
};

export const CAMERA = {
  position: [0, 0.1, 4.6] as [number, number, number],
  fov: 28,
};
