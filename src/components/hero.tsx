"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";
import { useRef, useEffect, useState } from "react";
import * as THREE from "three";
import { motion, AnimatePresence } from "motion/react";

function CctvModel({ 
  meshRef, 
  isMobile,
  onRotationUpdate
}: { 
  meshRef: React.RefObject<THREE.Group | null>;
  isMobile: boolean;
  onRotationUpdate?: (normalizedX: number) => void;
}) {
  const { scene } = useGLTF("/cctv.glb");
  const timeRef = useRef(0);

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

  useFrame(() => {
    if (!meshRef.current) return;
    
    timeRef.current += 0.016;
    
    if (isMobile) {
      const time = timeRef.current * 0.8;
      meshRef.current.rotation.y = Math.PI / 2 + Math.sin(time) * 0.3;
      meshRef.current.rotation.x = Math.cos(time * 0.7) * 0.2;
    } else {
      const time = timeRef.current * 0.35;
      const swing = Math.sin(time);
      
      meshRef.current.rotation.y = Math.PI / 2 + swing * 0.5;
      meshRef.current.rotation.x = 0.1;
      
      onRotationUpdate?.(swing);
    }
  });

  return (
    <primitive 
      ref={meshRef} 
      object={scene} 
      scale={1.25}
      position={[0, 0.5, 0]}
      rotation={[0, Math.PI / 2, 0]}
    />
  );
}

export default function Hero() {
  const [spotlight, setSpotlight] = useState({ x: 0, y: 0, visible: false });
  const [isMobile, setIsMobile] = useState(false);
  const [showScrollIndicator, setShowScrollIndicator] = useState(true);
  const textRef = useRef<HTMLDivElement>(null);
  const meshRef = useRef<THREE.Group>(null);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 768);
    const handleScroll = () => setShowScrollIndicator(window.scrollY <= 100);
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    window.addEventListener('scroll', handleScroll);
    
    return () => {
      window.removeEventListener('resize', checkMobile);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleRotationUpdate = (normalizedX: number) => {
    if (!isMobile && textRef.current) {
      const rect = textRef.current.getBoundingClientRect();
      setSpotlight({
        x: rect.width / 2 + normalizedX * (rect.width / 2),
        y: rect.height * 0.3,
        visible: true,
      });
    }
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isMobile || !textRef.current) return;
    
    const rect = textRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const isInBounds = x >= 0 && x <= rect.width && y >= 0 && y <= rect.height;
    
    setSpotlight({ x, y, visible: isInBounds });
  };

  const handleMouseLeave = () => {
    if (isMobile) setSpotlight(prev => ({ ...prev, visible: false }));
  };

  const handleScrollClick = () => {
    setShowScrollIndicator(false);
    document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section 
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="w-full min-h-screen flex flex-col items-center justify-start px-8 pt-40 md:pt-20"
    >
      <div className="max-w-4xl w-full relative">
        {/* CCTV Model */}
        <div className="w-full h-[350px] relative">
          <Canvas camera={{ position: [0, 0, 5], fov: 50 }}>
            <ambientLight intensity={0.5} />
            <directionalLight position={[10, 10, 5]} intensity={1} />
            <CctvModel 
              meshRef={meshRef} 
              isMobile={isMobile} 
              onRotationUpdate={handleRotationUpdate}
            />
          </Canvas>
        </div>

        <div 
          ref={textRef}
          className="relative mt-4 md:-mt-8 text-center pb-12 select-none cursor-default"
        >
          {spotlight.visible && (
            <div
              className="absolute z-10 pointer-events-none w-[200px] h-[200px] blur-[15px]"
              style={{
                left: spotlight.x,
                top: spotlight.y,
                transform: 'translate(-50%, -50%)',
                background: 'radial-gradient(circle, rgba(255,255,255,0.8) 0%, rgba(255,255,255,0.4) 30%, transparent 60%)',
                mixBlendMode: 'lighten',
              }}
            />
          )}
          
          <h1 className="relative text-5xl md:text-7xl font-bold tracking-tight text-black dark:text-zinc-50 flex items-center justify-center gap-2">
            Watchout
            <span className="text-2xl md:text-3xl" style={{ color: '#F75C69' }}>®</span>
          </h1>
          <p className="relative mt-4 text-lg md:text-xl text-zinc-600 dark:text-zinc-400">
            Underserved communities beware
          </p>
        </div>
      </div>

      <AnimatePresence>
        {showScrollIndicator && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -30 }}
            whileHover={{ scale: 1.1 }}
            transition={{ duration: 0.5 }}
            onClick={handleScrollClick}
            className="absolute bottom-8 left-1/2 -translate-x-1/2 cursor-pointer flex flex-col items-center gap-1"
          >
            <span className="text-sm text-zinc-500 dark:text-zinc-400">scroll to</span>
            <span className="text-lg font-medium" style={{ color: '#F75C69' }}>Learn More</span>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}