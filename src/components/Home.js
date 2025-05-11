import React from 'react';
import { Canvas } from '@react-three/fiber';  // Import Canvas from @react-three/fiber
import SmokeParticles from './SmokeParticles';  // Your particle effect component
import './Home.css';  // Make sure the CSS is correct

const Home = () => {
  return (
    <div className="home-container">
      {/* Particle Background using Canvas */}
      <div className="smoke-background">
        <Canvas camera={{ position: [0, 0, 5], fov: 60 }}>
          <ambientLight intensity={0.3} />
          <SmokeParticles />
        </Canvas>
      </div>

      {/* Main content with scrollable sections */}
      <div className="content">
        <section id="home">
          <h1>Welcome to My Website</h1>
          <p>Scroll down to explore the sections.</p>
        </section>

        <section id="about">
          <h2>About</h2>
          <p>This is the about section where you can talk about yourself or your company.</p>
        </section>

        <section id="projects">
          <h2>Projects</h2>
          <p>Showcase your projects or portfolio here.</p>
        </section>

      </div>
    </div>
  );
};

export default Home;
