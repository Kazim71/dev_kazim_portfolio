import { useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { Vector3 } from "three";
import { CAMERA_PATH, TIMELINE } from "@/lib/phoneConfig";
import { lerpVec3, remap } from "./math";

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
  const { camera, size } = useThree();
  const target = useRef(new Vector3(0, 0, 0));

  useFrame(() => {
    const sample = sampleCameraPath(progress);
    const parallaxX = pointer.x * 0.22;
    const parallaxY = -pointer.y * 0.14;

    // Portrait/mobile viewports are much narrower than the desktop framing
    // this path was tuned for; back the camera off proportionally so the
    // device keeps comfortable margin instead of filling/cropping the frame.
    const aspect = size.width / size.height;
    const portraitScale = aspect < 1 ? Math.min(1 / aspect, 1.85) : 1;

    // During the explosion beats, tilt into a 3/4 view (like an exploded
    // engineering diagram) instead of a flat head-on stack.
    const explode = Math.max(0, remap(progress, TIMELINE.explodeIn.start, TIMELINE.explodeIn.end) - remap(progress, TIMELINE.reassembly.start, TIMELINE.reassembly.end));
    const tiltX = sample.position[0] * portraitScale + parallaxX + explode * 0.55;
    const tiltY = sample.position[1] * portraitScale + parallaxY + explode * 0.32;
    const tiltZ = sample.position[2] * portraitScale;

    camera.position.x += (tiltX - camera.position.x) * 0.06;
    camera.position.y += (tiltY - camera.position.y) * 0.06;
    camera.position.z += (tiltZ - camera.position.z) * 0.08;

    if ("fov" in camera) {
      const cam = camera as unknown as { fov: number; updateProjectionMatrix: () => void };
      cam.fov += (sample.fov - cam.fov) * 0.06;
      cam.updateProjectionMatrix();
    }

    camera.lookAt(target.current);
  });

  return null;
}
