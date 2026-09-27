import { Suspense, useMemo, useState } from "react";
import { Canvas } from "@react-three/fiber";
import PhoneModel from "./phone/PhoneModel";
import CameraRig from "./phone/CameraRig";
import Lighting from "./phone/Lighting";
import { TIMELINE } from "@/lib/phoneConfig";
import { remap } from "./phone/math";
import { useTheme } from "@/contexts/ThemeContext";

type PhoneSceneProps = {
  progress: number;
  pointer: { x: number; y: number };
};

const projectScreens = [
  { title: "AIRPORT LIMO LINK", stat: "−73% JS", image: "/manus-storage/airport-limo_b150e8c3.jpg" },
  { title: "DPMI INDIA", stat: "422 POSTS", image: "/manus-storage/dpmi-cms_2a6ec238.jpg" },
  { title: "AARAV ELECTRONICS", stat: "500+ PRODUCTS", image: "/manus-storage/aarav-electronics_3c34ffd1.jpg" },
  { title: "SPACES BY U", stat: "SEO / ACF / WC", image: "/manus-storage/spaces-byu_1d156a46.jpg" },
  { title: "RADIANT LAUNDRY", stat: "13 SERVICES", image: "/manus-storage/radiant-laundry_be2061bb.jpg" },
  { title: "BLOSSOM AGE & DISABILITY", stat: "UX SUPPORT", image: "/manus-storage/blossom-care_7ff7c437.jpg" },
];

export default function PhoneScene({ progress, pointer }: PhoneSceneProps) {
  const [activeLayer, setActiveLayer] = useState<string | null>(null);
  const { theme } = useTheme();

  const fold = remap(progress, TIMELINE.fold.start, TIMELINE.fold.end);
  const explodeIn = remap(progress, TIMELINE.explodeIn.start, TIMELINE.explodeIn.end);
  const reassembly = remap(progress, TIMELINE.reassembly.start, TIMELINE.reassembly.end);
  const explode = Math.max(0, explodeIn - reassembly);

  const displayIndex = Math.min(
    projectScreens.length - 1,
    Math.floor(remap(progress, TIMELINE.displayFocus.start, TIMELINE.displayFocus.end) * projectScreens.length),
  );
  const screen = useMemo(() => projectScreens[displayIndex], [displayIndex]);
  const showScreen = progress >= TIMELINE.displayFocus.start && progress <= TIMELINE.displayFocus.end + 0.06;

  return (
    <div className="phone-scene" data-theme={theme} aria-label="Scroll-controlled 3D foldable phone and exploded hardware visualization" role="img">
      <div className="phone-studio-grid" />
      <div className="phone-light" />
      <div className="phone-shadow" />

      <Canvas
        className="phone-canvas"
        dpr={[1, Math.min(2, typeof window !== "undefined" ? window.devicePixelRatio : 1.5)]}
        gl={{ antialias: true, alpha: true }}
        camera={{ position: [0, 0, 5.6], fov: 32 }}
      >
        <Suspense fallback={null}>
          <Lighting theme={theme} />
          <CameraRig progress={progress} pointer={pointer} />
          <group rotation={[0, progress * 0.4 + pointer.x * 0.08, 0]}>
            <PhoneModel fold={fold} explode={explode} activeLayer={activeLayer} onActivate={setActiveLayer} />
          </group>
        </Suspense>
      </Canvas>

      {showScreen && (
        <div className="phone-screen-overlay" style={{ opacity: Math.min(1, (progress - TIMELINE.displayFocus.start) / 0.06) }}>
          <img src={screen.image} alt={`${screen.title} project preview`} />
          <div className="screen-overlay"><span>{screen.title}</span><strong>{screen.stat}</strong></div>
        </div>
      )}

      <div className="phone-annotation annotation-left"><span>SCROLL / DISASSEMBLE</span><i /></div>
      <div className="phone-annotation annotation-right"><span>18 PARTS / ONE SYSTEM</span><i /></div>
      <div className="phone-progress-line"><span style={{ transform: `scaleX(${progress})` }} /></div>
    </div>
  );
}
