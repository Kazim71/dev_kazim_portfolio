import { useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { Vector3 } from "three";
import { CAMERA_PATH } from "@/lib/phoneConfig";
import { lerpVec3 } from "./math";

type CameraRigProps = {
  progress: number;
  pointer: { x: number; y: number };
};

function sampleCameraPath(progress: number) {
  const points = CAMERA_PATH;
  for (let i = 0; i < points.length - 1; i++) {
    const a = points[i];
    const b = points[i + 1];
    if (progress >= a.at && progress <= b.at) {
      const t = (progress - a.at) / (b.at - a.at || 1);
      return {
        position: lerpVec3(a.position, b.position, t),
        fov: a.fov + (b.fov - a.fov) * t,
      };
    }
  }
  const last = points[points.length - 1];
  return { position: last.position, fov: last.fov };
}

export default function CameraRig({ progress, pointer }: CameraRigProps) {
  const { camera } = useThree();
  const target = useRef(new Vector3(0, 0, 0));

  useFrame(() => {
    const sample = sampleCameraPath(progress);
    const parallaxX = pointer.x * 0.22;
    const parallaxY = -pointer.y * 0.14;

    camera.position.x += (sample.position[0] + parallaxX - camera.position.x) * 0.06;
    camera.position.y += (sample.position[1] + parallaxY - camera.position.y) * 0.06;
    camera.position.z += (sample.position[2] - camera.position.z) * 0.08;

    if ("fov" in camera) {
      const cam = camera as unknown as { fov: number; updateProjectionMatrix: () => void };
      cam.fov += (sample.fov - cam.fov) * 0.06;
      cam.updateProjectionMatrix();
    }

    camera.lookAt(target.current);
  });

  return null;
}
