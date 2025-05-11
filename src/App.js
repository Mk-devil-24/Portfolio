import React, { useRef, useState, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';

const ParticleOrganicComplex = ({ mouse3D }) => {
  const numParticles = 5000;
  const particlesRef = useRef();

  // Generate initial positions
  const [positions] = useState(() => {
    const arr = new Float32Array(numParticles * 3);
    for (let i = 0; i < numParticles; i++) {
      const t = Math.random() * Math.PI * 2;
      const noise = Math.random() * 2 - 1;
      const x = Math.sin(t) * 2 + noise * 0.5;
      const y = Math.cos(t) * 2 + noise * 0.5;
      const z = Math.sin(t * 2) * 2 + noise * 0.5;
      arr.set([x, y, z], i * 3);
    }
    return arr;
  });

  // Copy of positions to animate
  const positionsRef = useRef(Float32Array.from(positions));

  useFrame(() => {
    if (!particlesRef.current) return;
    const array = positionsRef.current;

    for (let i = 0; i < numParticles; i++) {
      const idx = i * 3;
      const x = array[idx];
      const y = array[idx + 1];
      const z = array[idx + 2];

      const dx = x - mouse3D.current.x;
      const dy = y - mouse3D.current.y;
      const dz = z - mouse3D.current.z;
      const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);

      // Repel particles within radius
      if (dist < 1.2) {
        const force = 0.015 * (1.2 - dist);
        array[idx] += dx * force;
        array[idx + 1] += dy * force;
        array[idx + 2] += dz * force;
      }
    }

    particlesRef.current.geometry.attributes.position.needsUpdate = true;
  });

  return (
    <points ref={particlesRef}>
      <bufferGeometry attach="geometry">
        <bufferAttribute
          attach="attributes-position"
          array={positionsRef.current}
          count={numParticles}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.06}
        sizeAttenuation
        color="black"
        transparent
        opacity={0.8}
      />
    </points>
  );
};

const CameraComponent = ({ mouse3D }) => {
  const { camera, raycaster, mouse } = useThree();
  const [mouse2D, setMouse2D] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (event) => {
      setMouse2D({
        x: (event.clientX / window.innerWidth) * 2 - 1,
        y: -(event.clientY / window.innerHeight) * 2 + 1,
      });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useFrame(() => {
    raycaster.setFromCamera(mouse2D, camera);
    const point = raycaster.ray.origin.clone().add(raycaster.ray.direction.clone().multiplyScalar(2));
    mouse3D.current = point;

    camera.position.x = mouse2D.x * 0.4;
    camera.position.y = mouse2D.y * 0.4;
    camera.lookAt(0, 0, 0);
  });

  return null;
};

const App = () => {
  const mouse3D = useRef({ x: 0, y: 0, z: 0 });

  return (
    <div style={{ height: '100vh', backgroundColor: 'white' }}>
      <Canvas camera={{ position: [0, 0, 5], fov: 75 }}>
        <ambientLight />
        <ParticleOrganicComplex mouse3D={mouse3D} />
        <CameraComponent mouse3D={mouse3D} />
      </Canvas>
    </div>
  );
};

export default App;
