"use client";

import { useRef, useState, useEffect, useMemo } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { OrbitControls, Text } from "@react-three/drei";
import * as THREE from "three";

export default function PlanetarySystem({ projects, onProjectSelect, onProjectHover }) {
  const groupRef = useRef();
  const [hoveredPlanet, setHoveredPlanet] = useState(null);
  const { camera } = useThree();

  // Create a stable reference for textures
  const texturesRef = useRef([]);

  // Reference for materials to update them directly
  const planetMaterialsRef = useRef([]);
  const atmosphereMaterialsRef = useRef([]);
  const ringMaterialsRef = useRef([]);
  const ring2MaterialsRef = useRef([]);
  const ringAnimationsRef = useRef({});
  useEffect(() => {
    projects.forEach((project, index) => {
      const canvas = document.createElement("canvas");
      canvas.width = 256;
      canvas.height = 256;
      const ctx = canvas.getContext("2d");
      const hue = (index * 30) % 360;
      const gradient = ctx.createRadialGradient(128, 128, 0, 128, 128, 128);
      gradient.addColorStop(0, `hsl(${hue}, 70%, 60%)`);
      gradient.addColorStop(1, `hsl(${hue}, 70%, 20%)`);
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, 256, 256);
      for (let i = 0; i < 1000; i++) {
        const x = Math.random() * 256;
        const y = Math.random() * 256;
        const size = Math.random() * 2 + 1;
        ctx.fillStyle = `rgba(255, 255, 255, ${Math.random() * 0.2})`;
        ctx.fillRect(x, y, size, size);
      }
      const swirls = 3 + (index % 5);
      for (let i = 0; i < swirls; i++) {
        const centerX = Math.random() * 256;
        const centerY = Math.random() * 256;
        const radius = 20 + Math.random() * 60;

        ctx.beginPath();
        ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
        ctx.strokeStyle = `hsla(${(hue + 30) % 360}, 80%, 70%, 0.3)`;
        ctx.lineWidth = 3 + Math.random() * 5;
        ctx.stroke();
      }

      const texture = new THREE.CanvasTexture(canvas);
      texture.needsUpdate = true;
      texturesRef.current[index] = texture;
      ringAnimationsRef.current[index] = 0;
    });

    return () => {
      texturesRef.current.forEach((texture) => {
        if (texture) texture.dispose();
      });
    };
  }, [projects]);

  const planetData = useMemo(() => {
    return projects.map((project, index) => {
      const radius = 6 + index * 3;
      const angle = (index * (2 * Math.PI)) / projects.length;
      const x = radius * Math.cos(angle);
      const z = radius * Math.sin(angle);
      const planetSize = 1 + Math.random() * 0.5;
      const hue = (index * 30) % 360;
      const planetColor = new THREE.Color(`hsl(${hue}, 70%, 60%)`);
      const glowColor = new THREE.Color(`hsl(${hue}, 70%, 70%)`);

      return {
        position: [x, 0, z],
        planetSize,
        planetColor,
        glowColor,
        hue,
      };
    });
  }, [projects]);

  const handlePlanetHover = (index, isEntering) => {
    if (isEntering) {
      setHoveredPlanet(index);
      document.body.style.cursor = "pointer";
      const { position } = planetData[index];
      onProjectHover(projects[index], { x: position[0], y: position[1], z: position[2] });
    } else {
      setHoveredPlanet(null);
      document.body.style.cursor = "auto";
      onProjectHover(null, { x: 0, y: 0, z: 0 });
    }
  };

  const handlePlanetClick = (index) => {
    onProjectSelect(projects[index], { x: 0, y: 0, z: 0 });
  };

  useFrame((_, delta) => {
    if (groupRef.current && hoveredPlanet === null) {
      groupRef.current.rotation.y += delta * 0.05;
    }

    planetData.forEach((data, index) => {
      const { glowColor } = data;
      const isHovered = hoveredPlanet === index;

      if (planetMaterialsRef.current[index]) {
        const material = planetMaterialsRef.current[index];
        material.emissive.copy(isHovered ? glowColor : new THREE.Color("#000000"));
        material.emissiveIntensity = isHovered ? 0.5 : 0;
        material.needsUpdate = true;
      }

      // Update atmosphere material
      if (atmosphereMaterialsRef.current[index]) {
        const material = atmosphereMaterialsRef.current[index];
        material.opacity = isHovered ? 0.3 : 0.2;
        material.needsUpdate = true;
      }

      // Update ring animations
      if (isHovered) {
        ringAnimationsRef.current[index] = Math.min(ringAnimationsRef.current[index] + delta * 2, 1);
      } else {
        ringAnimationsRef.current[index] = Math.max(ringAnimationsRef.current[index] - delta * 2, 0);
      }

      // Update ring materials
      if (ringMaterialsRef.current[index]) {
        const material = ringMaterialsRef.current[index];
        material.opacity = 0.5 * ringAnimationsRef.current[index];
        material.needsUpdate = true;
      }

      if (ring2MaterialsRef.current[index]) {
        const material = ring2MaterialsRef.current[index];
        material.opacity = 0.3 * ringAnimationsRef.current[index];
        material.needsUpdate = true;
      }
    });
  });

  return (
    <>
      <OrbitControls enableZoom={true} enablePan={true} enableRotate={true} />
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} intensity={1} />

      <group ref={groupRef}>
        <mesh position={[0, 0, 0]}>
          <sphereGeometry args={[2, 32, 32]} />
          <meshStandardMaterial color="#60a5fa" emissive="#3b82f6" emissiveIntensity={2} />
        </mesh>

        <mesh position={[0, 0, 0]}>
          <sphereGeometry args={[2.2, 32, 32]} />
          <meshBasicMaterial color="#3b82f6" transparent opacity={0.2} />
        </mesh>

        {planetData.map((data, index) => {
          const radius = 6 + index * 3;
          return (
            <mesh key={`orbit-${index}`} rotation={[Math.PI / 2, 0, 0]}>
              <ringGeometry args={[radius - 0.05, radius + 0.05, 64]} />
              <meshBasicMaterial color="#334155" transparent opacity={0.3} />
            </mesh>
          );
        })}

        {planetData.map((data, index) => {
          const { position, planetSize, planetColor, glowColor } = data;
          const isHovered = hoveredPlanet === index;

          return (
            <group key={`planet-${index}`} position={position}>
              <mesh
                onPointerOver={() => handlePlanetHover(index, true)}
                onPointerOut={() => handlePlanetHover(index, false)}
                onClick={() => handlePlanetClick(index)}
                scale={isHovered ? 1.2 : 1}
              >
                <sphereGeometry args={[planetSize, 32, 32]} />
                <meshStandardMaterial
                  ref={(material) => {
                    if (material) planetMaterialsRef.current[index] = material;
                  }}
                  map={texturesRef.current[index]}
                  color={planetColor}
                  metalness={0.3}
                  roughness={0.7}
                  emissive={isHovered ? glowColor : new THREE.Color("#000000")}
                  emissiveIntensity={isHovered ? 0.5 : 0}
                />
              </mesh>

              <mesh scale={isHovered ? 1.3 : 1.1}>
                <sphereGeometry args={[planetSize, 32, 32]} />
                <meshBasicMaterial
                  ref={(material) => {
                    if (material) atmosphereMaterialsRef.current[index] = material;
                  }}
                  color={planetColor}
                  transparent
                  opacity={isHovered ? 0.3 : 0.2}
                />
              </mesh>

              {/* Hover label */}
              {isHovered && (
                <Text
                  position={[0, planetSize * 2, 0]}
                  fontSize={0.5}
                  color="white"
                  anchorX="center"
                  anchorY="middle"
                  outlineWidth={0.02}
                  outlineColor="#000000"
                >
                  {projects[index].name}
                </Text>
              )}

              <mesh rotation={[Math.PI / 2, 0, 0]} position={[0, 0, 0]}>
                <ringGeometry args={[planetSize * 1.8, planetSize * 2, 64]} />
                <meshBasicMaterial
                  ref={(material) => {
                    if (material) ringMaterialsRef.current[index] = material;
                  }}
                  color={glowColor}
                  transparent
                  opacity={0}
                  side={THREE.DoubleSide}
                />
              </mesh>

              <mesh rotation={[Math.PI / 2, Math.PI / 4, 0]} position={[0, 0, 0]}>
                <ringGeometry args={[planetSize * 2.1, planetSize * 2.2, 64]} />
                <meshBasicMaterial
                  ref={(material) => {
                    if (material) ring2MaterialsRef.current[index] = material;
                  }}
                  color={glowColor}
                  transparent
                  opacity={0}
                  side={THREE.DoubleSide}
                />
              </mesh>
            </group>
          );
        })}
      </group>
    </>
  );
}
