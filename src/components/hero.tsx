"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";
import { useRef, useEffect, useState } from "react";
import * as THREE from "three";
import { motion, AnimatePresence } from "motion/react";

function CctvModel({ 
  meshRef, 
  isMobile 
}: { 
  meshRef: React.RefObject<THREE.Group | null>;
  isMobile: boolean;
}) {
  const { scene } = useGLTF("/cctv.glb");
  const mobileTimeRef = useRef(0);

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

  // Mobile auto-rotation animation
  useFrame(() => {
    if (isMobile && meshRef.current) {
      mobileTimeRef.current += 0.016;
      const time = mobileTimeRef.current * 0.8;
      
      meshRef.current.rotation.y = Math.PI / 2 + Math.sin(time) * 0.3;
      meshRef.current.rotation.x = Math.cos(time * 0.7) * 0.2;
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
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const meshRef = useRef<THREE.Group>(null);

  // Detect mobile on mount
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Hide scroll indicator on scroll
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) {
        setShowScrollIndicator(false);
      } else {
        setShowScrollIndicator(true);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    // Update CCTV rotation (only on desktop)
    if (!isMobile && meshRef.current && containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const y = ((e.clientY - rect.top) / rect.height) * 2 - 1;

      meshRef.current.rotation.y = Math.PI / 2 + x * 0.5;
      meshRef.current.rotation.x = y * 0.3;
    }

    // Update spotlight for text
    if (textRef.current) {
      const rect = textRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      // Only show spotlight if mouse is over text area
      if (x >= 0 && x <= rect.width && y >= 0 && y <= rect.height) {
        setSpotlight({
          x,
          y,
          visible: true,
        });
      } else {
        setSpotlight(prev => ({ ...prev, visible: false }));
      }
    }
  };

  const handleMouseLeave = () => {
    setSpotlight(prev => ({ ...prev, visible: false }));
  };

  const handleScrollClick = () => {
    setShowScrollIndicator(false);
    const aboutSection = document.getElementById('about');
    if (aboutSection) {
      aboutSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section 
      ref={containerRef}
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
            <CctvModel meshRef={meshRef} isMobile={isMobile} />
          </Canvas>
        </div>

        {/* Text with spotlight */}
        <div 
          ref={textRef}
          className="relative mt-4 md:-mt-8 text-center pb-12 select-none cursor-default"
        >
          {/* Radial spotlight effect */}
          {spotlight.visible && (
            <div
              className="absolute z-10 pointer-events-none"
              style={{
                left: spotlight.x,
                top: spotlight.y,
                width: '200px',
                height: '200px',
                transform: 'translate(-50%, -50%)',
                background: 'radial-gradient(circle, rgba(255,255,255,0.8) 0%, rgba(255,255,255,0.4) 30%, transparent 60%)',
                filter: 'blur(15px)',
                mixBlendMode: 'lighten',
              }}
            />
          )}
          
          <h1 className="relative z-0 text-5xl md:text-7xl font-bold tracking-tight text-black dark:text-zinc-50 flex items-center justify-center gap-2">
            Watchout
            <span className="text-2xl md:text-3xl" style={{ color: '#F75C69' }}>®</span>
          </h1>
          <p className="relative z-0 mt-4 text-lg md:text-xl text-zinc-600 dark:text-zinc-400">
            Underserved communities beware
          </p>
        </div>
      </div>

      {/* Scroll Indicator */}
      <AnimatePresence>
        {showScrollIndicator && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -30 }}
            transition={{ duration: 0.5 }}
            whileHover={{ scale: 1.1 }}
            className="absolute bottom-8 left-1/2 -translate-x-1/2 cursor-pointer flex flex-col items-center gap-1"
            onClick={handleScrollClick}
          >
            <div className="text-sm text-zinc-500 dark:text-zinc-400">
              scroll to
            </div>
            <div
              className="text-lg font-medium"
              style={{ color: '#F75C69' }}
            >
              Learn More
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}