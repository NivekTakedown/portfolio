import React from "react";
import "./IframeViewer.css";

function IframeViewer({ link }) {
  return (
    <div className="IframeViewer">
      <h2>Website Preview</h2>
      <iframe src={link} title="Website Preview"></iframe>
    </div>
  );
}

export default IframeViewer;
