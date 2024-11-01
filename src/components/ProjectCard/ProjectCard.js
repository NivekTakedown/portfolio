import React from "react";
import { Link } from "react-router-dom";
import "./ProjectCard.css";

function ProjectCard({ title, description, repoLink, previewLink, link }) {
  return (
    <div className="ProjectCard">
      <h2>{title}</h2>
      <p>{description}</p>
      <a href={repoLink} target="_blank" rel="noopener noreferrer">
        View Repository
      </a>
      <br />
      <a href={previewLink} target="_blank" rel="noopener noreferrer">
        View Preview
      </a>
      <br />
      <Link to={link}>View Project Details</Link>
    </div>
  );
}

export default ProjectCard;
