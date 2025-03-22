import React, { useState } from "react";
import { Link } from "react-router-dom";
import YoutubeViewer from "../YoutubeViewer";
import "./ProjectCard.css";

function ProjectCard({ 
  title, 
  description, 
  repoLink, 
  previewLink,
  modelLink,
  youtubeLink,
  technologies = [],
  link 
}) {
  const [showVideo, setShowVideo] = useState(false);
  
  // Improved video ID extraction
  const getYoutubeId = (url) => {
    if (!url) return null;
    // Handle youtu.be URLs
    if (url.includes('youtu.be/')) {
      return url.split('youtu.be/')[1];
    }
    // Handle youtube.com URLs
    const urlParams = new URL(url).searchParams;
    return urlParams.get('v');
  };

  const videoId = getYoutubeId(youtubeLink);

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

      {youtubeLink && videoId && showVideo && (
        <YoutubeViewer videoId={videoId} />
      )}

      <div className="links">
        {youtubeLink && videoId && (
          <button 
            onClick={() => setShowVideo(!showVideo)} 
            className="demo-link"
          >
            {showVideo ? 'Hide Demo' : 'Watch Demo'}
          </button>
        )}
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
