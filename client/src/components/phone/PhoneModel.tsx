import type { Object3D } from "three";
import { useGLTF } from "@react-three/drei";
import { LAYERS, PHONE_GLB_PATH, USE_GLB_MODEL } from "@/lib/phoneConfig";
import Layer from "./Layer";
import Cover from "./Cover";

type PhoneModelProps = {
  fold: number;
  explode: number;
  activeLayer: string | null;
  onActivate: (id: string | null) => void;
};

/**
 * Renders the phone as a procedural stack of layer meshes today. Flip
 * USE_GLB_MODEL in phoneConfig.ts once a real rigged .glb exists at
 * PHONE_GLB_PATH — GltfPhone below drives the same fold/explode/activate
 * API against that model's named nodes instead.
 */
export default function PhoneModel(props: PhoneModelProps) {
  if (USE_GLB_MODEL) {
    return <GltfPhone {...props} />;
  }
  return <ProceduralPhone {...props} />;
}

function ProceduralPhone({ fold, explode, activeLayer, onActivate }: PhoneModelProps) {
  return (
    <group>
      <Cover fold={fold} />
      {LAYERS.map((layer) => (
        <Layer key={layer.id} layer={layer} explode={explode} activeLayer={activeLayer} onActivate={onActivate} />
      ))}
    </group>
  );
}

function GltfPhone({ fold, explode, activeLayer, onActivate }: PhoneModelProps) {
  const { scene, nodes } = useGLTF(PHONE_GLB_PATH) as unknown as {
    scene: Object3D;
    nodes: Record<string, Object3D>;
  };

  LAYERS.forEach((layer, index) => {
    const node = nodes[layer.id];
    if (!node) return;
    node.position.z = -index * 0.012 - index * 0.34 * explode;
    node.userData.active = activeLayer === layer.id;
  });

  const hinge = nodes.hinge;
  if (hinge) hinge.rotation.x = -Math.PI * 0.92 * fold;

  return (
    <primitive
      object={scene}
      onClick={(event: { object: { name: string }; stopPropagation: () => void }) => {
        event.stopPropagation();
        onActivate(activeLayer === event.object.name ? null : event.object.name);
      }}
    />
  );
}

if (USE_GLB_MODEL) {
  useGLTF.preload(PHONE_GLB_PATH);
}
