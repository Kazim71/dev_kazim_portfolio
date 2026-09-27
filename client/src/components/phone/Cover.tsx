import { DEVICE } from "@/lib/phoneConfig";

type CoverProps = {
  fold: number;
};

/** The closed outer shell: hinges open like a foldable-phone lid to reveal the layer stack beneath. */
export default function Cover({ fold }: CoverProps) {
  if (fold >= 0.999) return null;
  const angle = -Math.PI * 0.92 * fold;
  const opacity = 1 - Math.max(0, (fold - 0.85) / 0.15);

  return (
    <group position={[0, -DEVICE.height / 2, 0.01]} rotation={[angle, 0, 0]}>
      <mesh position={[0, DEVICE.height / 2, 0]}>
        <boxGeometry args={[DEVICE.width, DEVICE.height, 0.05]} />
        <meshStandardMaterial color="#3a3d3c" roughness={0.28} metalness={0.6} transparent opacity={opacity} />
      </mesh>
      <mesh position={[-DEVICE.width * 0.28, DEVICE.height * 0.82, 0.03]}>
        <circleGeometry args={[0.08, 32]} />
        <meshStandardMaterial color="#8f9a97" roughness={0.15} metalness={0.85} transparent opacity={opacity} />
      </mesh>
      <mesh position={[0, DEVICE.height * 0.06, 0.032]}>
        <planeGeometry args={[0.5, 0.14]} />
        <meshStandardMaterial color="#d7f53c" transparent opacity={opacity * 0.9} />
      </mesh>
    </group>
  );
}
