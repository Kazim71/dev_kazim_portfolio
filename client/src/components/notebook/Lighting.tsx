type LightingProps = {
  theme: "light" | "dark";
};

export default function Lighting({ theme }: LightingProps) {
  const isLight = theme === "light";
  return (
    <>
      <ambientLight intensity={isLight ? 0.7 : 0.4} />
      <directionalLight position={[2, 3, 3]} intensity={isLight ? 1.6 : 1.3} color={isLight ? "#ffffff" : "#fefaf1"} />
      <directionalLight position={[-2, 1, -2]} intensity={isLight ? 0.3 : 0.4} color={isLight ? "#9fb8c2" : "#7de0c0"} />
      <pointLight position={[0, 0, 2]} intensity={isLight ? 0.25 : 0.4} color="#d7f53c" distance={5} />
    </>
  );
}
