import { PAGES, NOTEBOOK } from "@/lib/notebookConfig";
import { remap } from "./math";
import Page from "./Page";

type BookProps = {
  progress: number;
};

export default function Book({ progress }: BookProps) {
  const total = PAGES.length;

  return (
    <group>
      {/* Spine binding */}
      <mesh position={[-NOTEBOOK.width / 2 - NOTEBOOK.spineGap, 0, 0]}>
        <cylinderGeometry args={[0.028, 0.028, NOTEBOOK.height * 1.03, 16]} />
        <meshStandardMaterial color="#2a2c2b" roughness={0.5} metalness={0.3} />
      </mesh>

      {PAGES.map((page, index) => {
        const start = index / total;
        const end = (index + 1) / total;
        const turnProgress = remap(progress, start, end);
        return <Page key={page.id} page={page} index={index} total={total} turnProgress={turnProgress} />;
      })}
    </group>
  );
}
