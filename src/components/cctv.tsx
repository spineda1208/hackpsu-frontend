"use client";

import { Canvas } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";
import { useRef, useEffect } from "react";
import * as THREE from "three";

interface CctvMeshProps {
  onMouseMove: (x: number, y: number) => void;
}

function CctvMesh({ onMouseMove }: CctvMeshProps) {
  const { scene } = useGLTF("/cctv.glb");
  const meshRef = useRef<THREE.Group>(null);

  // Convert model to wireframe mesh
  useEffect(() => {
    scene.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        child.material = new THREE.MeshBasicMaterial({
          color: 0x888888,
          wireframe: true,
        });
      }
    });
  }, [scene]);

  const handleMouseMove = (event: React.MouseEvent) => {
    if (!meshRef.current) return;

    const rect = event.currentTarget.getBoundingClientRect();
    const x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
    const y = ((event.clientY - rect.top) / rect.height) * 2 - 1;

    // Direct rotation (no smoothing)
    meshRef.current.rotation.y = Math.PI / 2 + x * 0.5;
    meshRef.current.rotation.x = y * 0.3;

    // Pass normalized coordinates to parent
    onMouseMove(x, y);
  };

  return (
    <div 
      onMouseMove={handleMouseMove}
      className="w-full h-[500px] relative pointer-events-auto"
    >
      <Canvas camera={{ position: [0, 0, 5], fov: 50 }}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 5]} intensity={1} />
        <primitive 
          ref={meshRef} 
          object={scene} 
          scale={1.0}
          rotation={[0, Math.PI / 2, 0]}
        />
      </Canvas>
    </div>
  );
}

export default CctvMesh;