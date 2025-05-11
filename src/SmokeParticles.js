import React from 'react';
import { Canvas } from '@react-three/fiber';
import { PerspectiveCamera } from '@react-three/drei';
import SmokeParticles from './SmokeParticles';

const App = () => {
  return (
    <Canvas style={{ background: 'white' }}>
      <PerspectiveCamera makeDefault fov={75} position={[0, 0, 10]} />
      
      {/* Lighting for hologram effect */}
      <ambientLight intensity={0.5} />
      <pointLight position={[0, 0, 10]} intensity={1} />

      {/* Particles making up the human face */}
      <SmokeParticles />
    </Canvas>
  );
};

export default App;
