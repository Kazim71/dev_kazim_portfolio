import { CARDS } from "@/lib/cardConfig";
import Card from "./Card";

type CardWheelProps = {
  progress: number;
};

export default function CardWheel({ progress }: CardWheelProps) {
  const total = CARDS.length;
  const wheelRotation = -progress * Math.PI * 2;

  return (
    <group rotation={[0, wheelRotation, 0]}>
      {CARDS.map((card, index) => {
        const baseAngle = (index / total) * Math.PI * 2;
        // Angular distance from this card's current position to "front"
        // (angle 0 in world space, i.e. baseAngle + wheelRotation ≈ 0).
        const worldAngle = baseAngle + wheelRotation;
        const wrapped = Math.atan2(Math.sin(worldAngle), Math.cos(worldAngle));
        const focus = Math.max(0, 1 - Math.abs(wrapped) / (Math.PI / total));
        const active = focus > 0.5;
        return <Card key={card.id} card={card} angle={baseAngle} active={active} focus={focus} />;
      })}
    </group>
  );
}
