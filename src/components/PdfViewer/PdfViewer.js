import React from "react";
import "./PdfViewer.css";

function PdfViewer({ manuals = [] }) {
  return (
    <div className="PdfViewer">
      <h2>PDF Reader</h2>
      {manuals.length === 0 ? (
        <p>No manuals available.</p>
      ) : (
        manuals.map((manual, index) => (
          <div key={index} className="PdfViewer-manual">
            <h3>{manual.title}</h3>
            <iframe
              src={`/manuals/${manual.fileName}`}
              title={manual.title}
              width="100%"
              height="600px"
            ></iframe>
          </div>
        ))
      )}
    </div>
  );
}

export default PdfViewer;
