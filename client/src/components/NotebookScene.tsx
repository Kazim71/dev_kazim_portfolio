import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import Book from "./notebook/Book";
import CameraRig from "./notebook/CameraRig";
import Lighting from "./notebook/Lighting";
import { useTheme } from "@/contexts/ThemeContext";

type NotebookSceneProps = {
  progress: number;
  pointer: { x: number; y: number };
};

export default function NotebookScene({ progress, pointer }: NotebookSceneProps) {
  const { theme } = useTheme();

  return (
    <div className="notebook-scene" data-theme={theme} aria-label="Scroll-controlled 3D notebook that turns pages as you scroll" role="img">
      <div className="notebook-studio-grid" />
      <div className="notebook-light" />
      <div className="notebook-shadow" />

      <Canvas
        className="notebook-canvas"
        dpr={[1, Math.min(2, typeof window !== "undefined" ? window.devicePixelRatio : 1.5)]}
        gl={{ antialias: true, alpha: true }}
        camera={{ position: [0, 0.05, 4.2], fov: 30 }}
      >
        <Suspense fallback={null}>
          <Lighting theme={theme} />
          <CameraRig progress={progress} pointer={pointer} />
          <Book progress={progress} />
        </Suspense>
      </Canvas>

      <div className="notebook-annotation annotation-left"><span>SCROLL / TURN PAGES</span><i /></div>
      <div className="notebook-annotation annotation-right"><span>7 PAGES / ONE STORY</span><i /></div>
      <div className="notebook-progress-line"><span style={{ transform: `scaleX(${progress})` }} /></div>
    </div>
  );
}
