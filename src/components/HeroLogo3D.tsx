import { useRef, useMemo, useState, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { useTexture, Points, PointMaterial } from '@react-three/drei';
import * as THREE from 'three';
import zaLogo from '@/assets/za_logo.png';
import { useIsMobile } from '@/hooks/use-mobile';

function LogoMesh({ isMobile }: { isMobile: boolean }) {
  const meshRef = useRef<THREE.Mesh>(null);
  const glowRef = useRef<THREE.Mesh>(null);
  const texture = useTexture(zaLogo);
  const mouse = useRef({ x: 0, y: 0 });
  const smoothMouse = useRef({ x: 0, y: 0 });
  const { size } = useThree();

  useEffect(() => {
    if (isMobile) return;
    const handleMouseMove = (e: MouseEvent) => {
      mouse.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouse.current.y = -(e.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [isMobile]);

  useFrame((state) => {
    if (!meshRef.current) return;
    const t = state.clock.elapsedTime;

    // Bobbing
    meshRef.current.position.y = Math.sin(t * 0.8) * 0.15;

    // Slow Y rotation
    meshRef.current.rotation.y += 0.003;

    // Mouse-follow tilt (desktop only)
    if (!isMobile) {
      smoothMouse.current.x += (mouse.current.x - smoothMouse.current.x) * 0.05;
      smoothMouse.current.y += (mouse.current.y - smoothMouse.current.y) * 0.05;
      meshRef.current.rotation.x = smoothMouse.current.y * 0.25; // ~15deg max
      meshRef.current.rotation.y += smoothMouse.current.x * 0.01;
    }

    // Glow follows mesh
    if (glowRef.current) {
      glowRef.current.position.copy(meshRef.current.position);
      glowRef.current.rotation.copy(meshRef.current.rotation);
      glowRef.current.position.z = -0.05;
    }
  });

  return (
    <>
      {/* Rim glow plane */}
      <mesh ref={glowRef}>
        <planeGeometry args={[2.4, 2.4]} />
        <meshBasicMaterial
          color="#0ea5e9"
          transparent
          opacity={0.08}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* Logo mesh */}
      <mesh ref={meshRef}>
        <planeGeometry args={[2, 2]} />
        <meshStandardMaterial
          map={texture}
          transparent
          metalness={0.6}
          roughness={0.3}
          side={THREE.DoubleSide}
        />
      </mesh>
    </>
  );
}

function TealParticles() {
  const pointsRef = useRef<THREE.Points>(null);
  const count = 35;

  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      const r = 1.2 + Math.random() * 0.8;
      pos[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      pos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      pos[i * 3 + 2] = r * Math.cos(phi);
    }
    return pos;
  }, []);

  useFrame((state) => {
    if (!pointsRef.current) return;
    const geo = pointsRef.current.geometry;
    const pos = geo.attributes.position;
    for (let i = 0; i < count; i++) {
      const ix = i * 3;
      // Drift outward slowly
      const x = pos.array[ix] as number;
      const y = pos.array[ix + 1] as number;
      const z = pos.array[ix + 2] as number;
      const len = Math.sqrt(x * x + y * y + z * z);
      const speed = 0.002;
      (pos.array as Float32Array)[ix] += (x / len) * speed;
      (pos.array as Float32Array)[ix + 1] += (y / len) * speed;
      (pos.array as Float32Array)[ix + 2] += (z / len) * speed;
      // Reset if too far
      if (len > 3) {
        const theta = Math.random() * Math.PI * 2;
        const phi = Math.acos(2 * Math.random() - 1);
        const r = 1.2;
        (pos.array as Float32Array)[ix] = r * Math.sin(phi) * Math.cos(theta);
        (pos.array as Float32Array)[ix + 1] = r * Math.sin(phi) * Math.sin(theta);
        (pos.array as Float32Array)[ix + 2] = r * Math.cos(phi);
      }
    }
    pos.needsUpdate = true;
    // Slow rotation
    pointsRef.current.rotation.y += 0.001;
  });

  return (
    <Points ref={pointsRef} positions={positions} stride={3}>
      <PointMaterial
        transparent
        color="#0ea5e9"
        size={0.04}
        sizeAttenuation
        depthWrite={false}
        opacity={0.6}
      />
    </Points>
  );
}

function Scene({ isMobile }: { isMobile: boolean }) {
  return (
    <>
      <ambientLight intensity={0.4} />
      <directionalLight position={[3, 2, 5]} intensity={1.5} color="#0ea5e9" />
      <LogoMesh isMobile={isMobile} />
      <TealParticles />
    </>
  );
}

export default function HeroLogo3D() {
  const isMobile = useIsMobile();
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReducedMotion(mq.matches);
    const handler = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  if (reducedMotion) {
    return (
      <img
        src={zaLogo}
        alt="ZA Logo"
        className="w-10 h-10 md:w-16 md:h-16"
        style={{ filter: 'drop-shadow(0 0 8px hsl(var(--primary) / 0.5))' }}
      />
    );
  }

  return (
    <div className={isMobile ? 'w-16 h-16' : 'w-[180px] h-[180px]'}>
      <Canvas
        camera={{ position: [0, 0, 4], fov: 50 }}
        style={{ background: 'transparent' }}
        gl={{ alpha: true, antialias: true }}
        dpr={[1, 1.5]}
      >
        <Scene isMobile={isMobile} />
      </Canvas>
    </div>
  );
}
