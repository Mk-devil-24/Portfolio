import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';  // Import useFrame from @react-three/fiber

const SmokeParticles = () => {
  const particlesRef = useRef();

  const particleCount = 600;
  const positions = useMemo(() => {
    const arr = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount * 3; i++) {
      arr[i] = (Math.random() - 0.5) * 15;
    }
    return arr;
  }, [particleCount]);

  useFrame(() => {
    if (particlesRef.current) {
      particlesRef.current.rotation.y += 0.0005;
      particlesRef.current.rotation.x += 0.0003;
    }
  });

  return (
    <points ref={particlesRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={positions.length / 3}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        color={0x333333}
        size={0.05}
        transparent
        opacity={0.35}
      />
    </points>
  );
};

export default SmokeParticles;
