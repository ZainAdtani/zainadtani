import { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Text } from '@react-three/drei';
import { Link } from 'react-router-dom';
import * as THREE from 'three';

function AnimatedLogo() {
  const textRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (textRef.current) {
      // Subtle floating animation
      textRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.1;
      // Subtle rotation on hover
      textRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.3) * 0.05;
    }
  });

  return (
    <Text
      ref={textRef}
      font="/fonts/Inter-Bold.woff"
      fontSize={1.5}
      color="hsl(200, 100%, 65%)"
      anchorX="center"
      anchorY="middle"
    >
      ZA
    </Text>
  );
}

export default function Logo3D() {
  return (
    <Link to="/" className="block w-24 h-12 cursor-pointer">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 50 }}
        style={{ background: 'transparent' }}
      >
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1} />
        <AnimatedLogo />
      </Canvas>
    </Link>
  );
}
