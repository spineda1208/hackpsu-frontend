"use client";

import { Canvas } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";
import { useEffect } from "react";
import * as THREE from "three";

function LaptopMesh() {
  const { scene } = useGLTF("/laptop.glb");

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

  return (
    <primitive 
      object={scene} 
      scale={1.2}
      rotation={[0.2, -0.3, 0]}
      position={[0, -0.8, 0]}
    />
  );
}

export default function LaptopModel() {
  return (
    <div className="w-full h-full relative">
      <Canvas camera={{ position: [0, 0, 5], fov: 50 }}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 5]} intensity={1} />
        <LaptopMesh />
      </Canvas>
    </div>
  );
}

