import React, { useMemo, useRef } from 'react';
import * as THREE from 'three';
import { useFrame, extend } from '@react-three/fiber';

const PARTICLE_COUNT = 150;
const CONNECT_DISTANCE = 2.5;

const ParticleNetwork = () => {
  const positions = useMemo(() => {
    const arr = new Float32Array(PARTICLE_COUNT * 3);
    for (let i = 0; i < PARTICLE_COUNT * 3; i++) {
      arr[i] = (Math.random() - 0.5) * 10;
    }
    return arr;
  }, []);

  const velocities = useMemo(() => {
    const arr = [];
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      arr.push(new THREE.Vector3(
        (Math.random() - 0.5) * 0.01,
        (Math.random() - 0.5) * 0.01,
        (Math.random() - 0.5) * 0.01
      ));
    }
    return arr;
  }, []);

  const particleMesh = useRef();
  const linesMesh = useRef();

  useFrame(() => {
    const positionsArray = particleMesh.current.geometry.attributes.position.array;

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      let idx = i * 3;
      positionsArray[idx] += velocities[i].x;
      positionsArray[idx + 1] += velocities[i].y;
      positionsArray[idx + 2] += velocities[i].z;

      // Bounce
      for (let j = 0; j < 3; j++) {
        if (positionsArray[idx + j] > 5 || positionsArray[idx + j] < -5) {
          velocities[i].setComponent(j, -velocities[i].getComponent(j));
        }
      }
    }

    particleMesh.current.geometry.attributes.position.needsUpdate = true;

    // Update lines
    const linePositions = [];
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      for (let j = i + 1; j < PARTICLE_COUNT; j++) {
        const idxA = i * 3;
        const idxB = j * 3;

        const dx = positionsArray[idxA] - positionsArray[idxB];
        const dy = positionsArray[idxA + 1] - positionsArray[idxB + 1];
        const dz = positionsArray[idxA + 2] - positionsArray[idxB + 2];
        const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);

        if (dist < CONNECT_DISTANCE) {
          linePositions.push(
            positionsArray[idxA], positionsArray[idxA + 1], positionsArray[idxA + 2],
            positionsArray[idxB], positionsArray[idxB + 1], positionsArray[idxB + 2]
          );
        }
      }
    }

    const lineGeometry = new THREE.BufferGeometry();
    lineGeometry.setAttribute('position', new THREE.Float32BufferAttribute(linePositions, 3));
    linesMesh.current.geometry.dispose(); // clear old
    linesMesh.current.geometry = lineGeometry;
  });

  return (
    <>
      <points ref={particleMesh}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={positions.length / 3}
            array={positions}
            itemSize={3}
          />
        </bufferGeometry>
        <pointsMaterial color={0xffffff} size={0.05} />
      </points>

      <lineSegments ref={linesMesh}>
        <bufferGeometry />
        <lineBasicMaterial color="#444" transparent opacity={0.5} />
      </lineSegments>
    </>
  );
};

export default ParticleNetwork;
