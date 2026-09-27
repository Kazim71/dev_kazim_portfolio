import { useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { Vector3 } from "three";
import { CAMERA } from "@/lib/cardConfig";

type CameraRigProps = {
  pointer: { x: number; y: number };
};

export default function CameraRig({ pointer }: CameraRigProps) {
  const { camera, size } = useThree();
  const target = useRef(new Vector3(0, 0, 0));

  useFrame(() => {
    const aspect = size.width / size.height;
    const portraitScale = aspect < 1 ? Math.min(1 / aspect, 1.6) : 1;

    const parallaxX = pointer.x * 0.35;
    const parallaxY = -pointer.y * 0.2;

    const targetX = parallaxX;
    const targetY = CAMERA.position[1] + parallaxY;
    const targetZ = CAMERA.position[2] * portraitScale;

    camera.position.x += (targetX - camera.position.x) * 0.06;
    camera.position.y += (targetY - camera.position.y) * 0.06;
    camera.position.z += (targetZ - camera.position.z) * 0.08;

    camera.lookAt(target.current);
  });

  return null;
}
