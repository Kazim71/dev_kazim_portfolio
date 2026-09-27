import { useRef, useState } from "react";
import type { Mesh } from "three";
import { Html } from "@react-three/drei";
import type { LayerConfig } from "@/lib/phoneConfig";
import { DEVICE, EXPLODE_GAP } from "@/lib/phoneConfig";
import LayerDetail from "./LayerDetail";

type LayerProps = {
  layer: LayerConfig;
  explode: number;
  activeLayer: string | null;
  onActivate: (id: string | null) => void;
};

export default function Layer({ layer, explode, activeLayer, onActivate }: LayerProps) {
  const mesh = useRef<Mesh>(null);
  const [hovered, setHovered] = useState(false);
  const isActive = hovered || activeLayer === layer.id;

  const baseZ = -layer.depth * 0.012;
  const explodedZ = baseZ - layer.depth * EXPLODE_GAP * explode;
  const width = DEVICE.width * layer.size[0];
  const height = DEVICE.height * layer.size[1];
  const depthPx = layer.id === "hinge" ? 0.05 : 0.02;

  return (
    <group position={[layer.offset[0] * DEVICE.width * 0.3, layer.offset[1] * DEVICE.height * 0.16, explodedZ]}>
      <mesh
        ref={mesh}
        onPointerOver={(event) => {
          event.stopPropagation();
          setHovered(true);
        }}
        onPointerOut={() => setHovered(false)}
        onClick={(event) => {
          event.stopPropagation();
          onActivate(activeLayer === layer.id ? null : layer.id);
        }}
        scale={isActive ? 1.03 : 1}
      >
        <boxGeometry args={[width, height, depthPx]} />
        <meshStandardMaterial
          color={layer.color}
          emissive={isActive ? "#d7f53c" : layer.emissive}
          emissiveIntensity={isActive ? 0.55 : 0.4}
          roughness={0.45}
          metalness={0.35}
          transparent
          opacity={explode > 0.02 ? Math.min(1, 0.35 + explode * 0.75) : 1}
        />
      </mesh>

      {explode > 0.1 && <LayerDetail id={layer.id} width={width} height={height} />}

      {isActive && explode > 0.08 && (
        <Html distanceFactor={7} position={[width / 2 + 0.18, 0, 0]} occlude={false} zIndexRange={[20, 0]}>
          <div className="layer-tooltip layer-tooltip-3d">
            <strong>{layer.label}</strong>
            <small>{layer.description}</small>
          </div>
        </Html>
      )}
    </group>
  );
}
