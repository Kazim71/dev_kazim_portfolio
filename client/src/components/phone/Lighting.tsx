type LightingProps = {
  theme: "light" | "dark";
};

export default function Lighting({ theme }: LightingProps) {
  const isLight = theme === "light";
  return (
    <>
      <ambientLight intensity={isLight ? 0.65 : 0.35} color={isLight ? "#ffffff" : "#ffffff"} />
      <directionalLight position={[2.4, 3.2, 3.6]} intensity={isLight ? 1.7 : 1.4} color={isLight ? "#ffffff" : "#fefaf1"} />
      <directionalLight position={[-2.6, -1.2, -2.4]} intensity={isLight ? 0.25 : 0.35} color={isLight ? "#9fb8c2" : "#7de0c0"} />
      <directionalLight position={[0, 2.2, -3]} intensity={isLight ? 0.5 : 0.9} color={isLight ? "#c9d6da" : "#ebe9e2"} />
      <pointLight position={[0, 0, 2.4]} intensity={isLight ? 0.3 : 0.5} color="#d7f53c" distance={6} />
    </>
  );
}
