import { useMemo } from "react";
import { RoundedBox } from "@react-three/drei";
import { NOTEBOOK } from "@/lib/notebookConfig";
import type { PageConfig } from "@/lib/notebookConfig";
import { lerp } from "./math";

type PageProps = {
  page: PageConfig;
  index: number;
  total: number;
  turnProgress: number; // 0 = resting on the right (unread), 1 = flipped to the left (read)
};

export default function Page({ page, index, total, turnProgress }: PageProps) {
  const { width, height, pageThickness } = NOTEBOOK;

  const rotationY = -Math.PI * turnProgress;
  const arch = Math.sin(turnProgress * Math.PI) * 0.22;

  const rightZ = index * pageThickness;
  const leftZ = (total - 1 - index) * pageThickness;
  const z = lerp(rightZ, leftZ, turnProgress);

  const isCover = page.id === "cover" || page.id === "back-cover";

  const material = useMemo(
    () => ({
      color: page.color,
      roughness: isCover ? 0.35 : 0.75,
      metalness: isCover ? 0.4 : 0.05,
    }),
    [page.color, isCover],
  );

  return (
    <group position={[-width / 2 - NOTEBOOK.spineGap, 0, z]} rotation={[0, rotationY, 0]}>
      <group position={[width / 2, 0, arch]}>
        <RoundedBox args={[width, height, pageThickness]} radius={isCover ? 0.04 : 0.012} smoothness={3}>
          <meshStandardMaterial {...material} />
        </RoundedBox>
      </group>
    </group>
  );
}
