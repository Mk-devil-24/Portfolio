import React from 'react';

function Projects() {
  const projects = [
    { id: 1, title: 'E-commerce Platform', description: 'A full-stack e-commerce solution' },
    { id: 2, title: 'Social Media App', description: 'Real-time social media platform' },
    { id: 3, title: 'Portfolio Website', description: 'Personal portfolio website' }
  ];

  return (
    <section className="projects">
      <h2>My Projects</h2>
      <div className="project-grid">
        {projects.map(project => (
          <div key={project.id} className="project-card">
            <h3>{project.title}</h3>
            <p>{project.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Projects;
