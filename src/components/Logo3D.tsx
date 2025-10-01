import { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Text } from '@react-three/drei';
import { Link } from 'react-router-dom';
import * as THREE from 'three';

function AnimatedLogo() {
  const zaRef = useRef<THREE.Mesh>(null);
  const nameRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (zaRef.current && nameRef.current) {
      // Subtle floating animation
      const floatY = Math.sin(state.clock.elapsedTime * 0.5) * 0.05;
      zaRef.current.position.y = floatY;
      nameRef.current.position.y = -0.8 + floatY;
      // Subtle rotation
      zaRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.3) * 0.03;
      nameRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.3) * 0.03;
    }
  });

  return (
    <>
      <Text
        ref={zaRef}
        font="/fonts/Inter-Bold.woff"
        fontSize={1.2}
        color="hsl(200, 100%, 65%)"
        anchorX="center"
        anchorY="middle"
        letterSpacing={0.05}
      >
        ZA
      </Text>
      <Text
        ref={nameRef}
        font="/fonts/Inter-Bold.woff"
        fontSize={0.25}
        color="hsl(200, 100%, 75%)"
        anchorX="center"
        anchorY="middle"
        letterSpacing={0.1}
      >
        Zain Adtani
      </Text>
    </>
  );
}

export default function Logo3D() {
  return (
    <Link to="/" className="block w-32 h-16 cursor-pointer hover-scale">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 50 }}
        style={{ background: 'transparent' }}
      >
        <ambientLight intensity={0.6} />
        <pointLight position={[10, 10, 10]} intensity={1.2} />
        <AnimatedLogo />
      </Canvas>
    </Link>
  );
}
