import { RoundedBox } from "@react-three/drei";
import { WHEEL } from "@/lib/cardConfig";
import type { CardConfig } from "@/lib/cardConfig";

type CardProps = {
  card: CardConfig;
  angle: number;
  active: boolean;
  focus: number; // 0..1, how close this card is to dead-center front
};

export default function Card({ card, angle, active, focus }: CardProps) {
  const { radius, cardWidth, cardHeight, cardThickness } = WHEEL;
  const x = radius * Math.sin(angle);
  const z = radius * Math.cos(angle);
  const lift = focus * 0.12;

  return (
    <group position={[x, lift, z]} rotation={[0, angle, 0]}>
      <RoundedBox args={[cardWidth, cardHeight, cardThickness]} radius={0.05} smoothness={4} scale={1 + focus * 0.08}>
        <meshStandardMaterial
          color={active ? "#15171a" : "#0d0e10"}
          emissive={card.accent}
          emissiveIntensity={0.08 + focus * 0.35}
          roughness={0.35}
          metalness={0.55}
        />
      </RoundedBox>

      <mesh position={[0, -cardHeight * 0.34, cardThickness / 2 + 0.002]}>
        <planeGeometry args={[cardWidth * 0.42, 0.03]} />
        <meshStandardMaterial color={card.accent} emissive={card.accent} emissiveIntensity={0.3 + focus * 0.6} transparent opacity={0.25 + focus * 0.6} />
      </mesh>
    </group>
  );
}
