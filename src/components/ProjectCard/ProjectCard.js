import React from "react";
import { Link } from "react-router-dom";
import "./ProjectCard.css";

function ProjectCard({ 
  title, 
  description, 
  repoLink, 
  previewLink,
  modelLink, 
  technologies = [],
  link 
}) {
  return (
    <article className="ProjectCard">
      <h2>{title}</h2>
      <p>{description}</p>
      
      {technologies.length > 0 && (
        <div className="technologies">
          <h3>Technologies</h3>
          <ul>
            {technologies.map((tech, index) => (
              <li key={index}>{tech}</li>
            ))}
          </ul>
        </div>
      )}

      <div className="links">
        {repoLink && (
          <a href={repoLink} target="_blank" rel="noopener noreferrer">
            Repository
          </a>
        )}
        {previewLink && (
          <a href={previewLink} target="_blank" rel="noopener noreferrer">
            Live Preview
          </a>
        )}
        {modelLink && (
          <a href={modelLink} target="_blank" rel="noopener noreferrer">
            Model
          </a>
        )}
        <Link to={link}>
          Details
        </Link>
      </div>
    </article>
  );
}

export default ProjectCard;
