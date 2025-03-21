import React from "react";
import "./YoutubeViewer.css";

function YoutubeViewer({ videoId }) {
  return (
    <div className="YoutubeViewer">
      <h2>Video Demo</h2>
      <div className="video-container">
        <iframe
          width="100%"
          height="480"
          src={`https://www.youtube.com/embed/${videoId}`}
          title="YouTube video player"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      </div>
    </div>
  );
}

export default YoutubeViewer;