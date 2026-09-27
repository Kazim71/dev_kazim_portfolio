import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import CardWheel from "./cards/CardWheel";
import CameraRig from "./cards/CameraRig";
import Lighting from "./cards/Lighting";
import { CAMERA } from "@/lib/cardConfig";
import { useTheme } from "@/contexts/ThemeContext";

type CardSceneProps = {
  progress: number;
  pointer: { x: number; y: number };
};

export default function CardScene({ progress, pointer }: CardSceneProps) {
  const { theme } = useTheme();

  return (
    <div className="scene-3d" data-theme={theme} aria-label="Scroll-controlled 3D card wheel that revolves through each section" role="img">
      <div className="scene-3d-grid" />
      <div className="scene-3d-light" />
      <div className="scene-3d-shadow" />

      <Canvas
        className="scene-3d-canvas"
        dpr={[1, Math.min(2, typeof window !== "undefined" ? window.devicePixelRatio : 1.5)]}
        gl={{ antialias: true, alpha: true }}
        camera={{ position: CAMERA.position, fov: CAMERA.fov }}
      >
        <Suspense fallback={null}>
          <Lighting theme={theme} />
          <CameraRig pointer={pointer} />
          <CardWheel progress={progress} />
        </Suspense>
      </Canvas>

      <div className="scene-3d-annotation annotation-left"><span>SCROLL / REVOLVE</span><i /></div>
      <div className="scene-3d-annotation annotation-right"><span>8 CARDS / ONE STORY</span><i /></div>
      <div className="scene-3d-progress-line"><span style={{ transform: `scaleX(${progress})` }} /></div>
    </div>
  );
}
