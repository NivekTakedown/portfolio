import React from "react";
import ProjectCard from "../ProjectCard";
import "./ProjectsList.css";

function ProjectsList({ projects }) {
  return (
    <div className="projects-grid">
      {projects.map((project, index) => (
        <ProjectCard
          key={index}
          title={project.title}
          description={project.description}
          repoLink={project["repo-link"]}
          previewLink={project["preview-link"]}
          modelLink={project["model-link"]}
          technologies={project.technologies}
          link={`/projects/${project.name}`}
        />
      ))}
    </div>
  );
}

export default ProjectsList;