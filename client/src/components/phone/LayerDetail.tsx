import type { LayerId } from "@/lib/phoneConfig";

type LayerDetailProps = {
  id: LayerId;
  width: number;
  height: number;
};

const CHIP_LAYOUT: [number, number, number, number][] = [
  [-0.28, 0.18, 0.13, 0.1],
  [0.05, 0.22, 0.16, 0.16],
  [0.26, 0.12, 0.09, 0.09],
  [-0.1, -0.15, 0.1, 0.07],
  [0.22, -0.2, 0.12, 0.08],
  [-0.3, -0.22, 0.08, 0.08],
];

/** Decorative geometry layered on top of a layer's base slab so the exploded
 * view reads as real hardware instead of uniform flat panels. */
export default function LayerDetail({ id, width, height }: LayerDetailProps) {
  switch (id) {
    case "hinge":
      return (
        <group>
          {[-0.32, -0.11, 0.11, 0.32].map((x) => (
            <mesh key={x} position={[x, 0, 0.02]} rotation={[0, 0, Math.PI / 2]}>
              <cylinderGeometry args={[0.055, 0.055, 0.18, 20]} />
              <meshStandardMaterial color="#c9c2a8" metalness={0.9} roughness={0.25} />
            </mesh>
          ))}
          <mesh position={[0, 0, 0.01]} rotation={[0, 0, Math.PI / 2]}>
            <cylinderGeometry args={[0.03, 0.03, width * 0.96, 16]} />
            <meshStandardMaterial color="#8a8570" metalness={0.85} roughness={0.35} />
          </mesh>
        </group>
      );

    case "main-pcb":
    case "secondary-pcb":
      return (
        <group>
          {CHIP_LAYOUT.map(([x, y, w, h], i) => (
            <mesh key={i} position={[x * width, y * height, 0.014]}>
              <boxGeometry args={[w * width, h * height, 0.012]} />
              <meshStandardMaterial color="#111213" metalness={0.4} roughness={0.5} />
            </mesh>
          ))}
        </group>
      );

    case "processor":
      return (
        <mesh position={[0, 0, 0.012]}>
          <boxGeometry args={[width * 0.68, height * 0.68, 0.014]} />
          <meshStandardMaterial color="#0d0f10" metalness={0.6} roughness={0.3} emissive="#d7f53c" emissiveIntensity={0.08} />
        </mesh>
      );

    case "camera-module":
      return (
        <group>
          <mesh position={[-width * 0.18, height * 0.1, 0.02]}>
            <cylinderGeometry args={[width * 0.26, width * 0.26, 0.03, 32]} />
            <meshStandardMaterial color="#0a0b0c" metalness={0.9} roughness={0.15} />
          </mesh>
          <mesh position={[width * 0.22, -height * 0.12, 0.02]}>
            <cylinderGeometry args={[width * 0.18, width * 0.18, 0.03, 32]} />
            <meshStandardMaterial color="#0a0b0c" metalness={0.9} roughness={0.15} />
          </mesh>
          <mesh position={[width * 0.05, height * 0.28, 0.018]}>
            <cylinderGeometry args={[width * 0.09, width * 0.09, 0.02, 24]} />
            <meshStandardMaterial color="#d7f53c" emissive="#d7f53c" emissiveIntensity={0.4} metalness={0.3} roughness={0.4} />
          </mesh>
        </group>
      );

    case "battery-left":
    case "battery-right":
      return (
        <group>
          {[-0.28, -0.09, 0.09, 0.28].map((y) => (
            <mesh key={y} position={[0, y * height, 0.011]}>
              <boxGeometry args={[width * 0.88, height * 0.14, 0.008]} />
              <meshStandardMaterial color="#0f1211" roughness={0.6} metalness={0.2} />
            </mesh>
          ))}
        </group>
      );

    case "flex-cables":
      return (
        <group>
          {[-0.55, -0.18, 0.18, 0.55].map((y) => (
            <mesh key={y} position={[0, y * height, 0.006]}>
              <boxGeometry args={[width * 1.6, 0.03, 0.004]} />
              <meshStandardMaterial color="#d9a441" metalness={0.55} roughness={0.4} />
            </mesh>
          ))}
        </group>
      );

    case "speaker":
      return (
        <group>
          {[-0.3, -0.1, 0.1, 0.3].map((x) => (
            <mesh key={x} position={[x * width, 0, 0.006]}>
              <cylinderGeometry args={[width * 0.05, width * 0.05, 0.01, 12]} />
              <meshStandardMaterial color="#0c0d0e" metalness={0.5} roughness={0.6} />
            </mesh>
          ))}
        </group>
      );

    case "vibration":
      return (
        <mesh position={[0, 0, 0.012]}>
          <cylinderGeometry args={[width * 0.32, width * 0.32, 0.03, 24]} />
          <meshStandardMaterial color="#2a2c2b" metalness={0.6} roughness={0.35} />
        </mesh>
      );

    default:
      return null;
  }
}
