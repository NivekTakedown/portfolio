import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import "./ProjectDetail.css";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import IframeViewer from "../../components/IframeViewer";
import PdfViewer from "../../components/PdfViewer";

function ProjectDetail() {
  const { projectName } = useParams();
  const [content, setContent] = useState("");
  const [previewLink, setPreviewLink] = useState("");
  const [repoLink, setRepoLink] = useState("");
  const [manuals, setManuals] = useState([]);

  useEffect(() => {
    fetch(`/projects/${projectName}.md`)
      .then((response) => response.text())
      .then((text) => {
        const { modifiedContent, previewLink, repoLink, manuals } =
          parseContent(text);
        setContent(modifiedContent);
        setPreviewLink(previewLink);
        setRepoLink(repoLink);
        setManuals(manuals || []); // Asegurarse de que manuals sea un array
      });
  }, [projectName]);

  const parseContent = (markdown) => {
    const previewRegex = /## Preview\s*\n\s*\[.*?\]\((.*?)\)/;
    const repoRegex = /## Repository\s*\n\s*\[.*?\]\((.*?)\)/;
    const pdfRegex = /## PDF Manual\s*\n\s*\[(.*?)\]\((.*?)\)/g;
    const previewMatch = markdown.match(previewRegex);
    const repoMatch = markdown.match(repoRegex);
    const pdfMatches = [...markdown.matchAll(pdfRegex)];
    const previewLink = previewMatch ? previewMatch[1] : "";
    const repoLink = repoMatch ? repoMatch[1] : "";
    const manuals = pdfMatches.map((match) => ({
      title: match[1],
      fileName: match[2],
    }));

    // Eliminar las secciones de preview, repo y pdf del contenido original
    const modifiedContent = markdown
      .replace(previewRegex, "")
      .replace(repoRegex, "")
      .replace(pdfRegex, "");

    return { modifiedContent, previewLink, repoLink, manuals };
  };

  return (
    <div className="ProjectDetail">
      <Header />
      <main>
        <ReactMarkdown children={content} remarkPlugins={[remarkGfm]} />
        {repoLink && (
          <a href={repoLink} target="_blank" rel="noopener noreferrer">
            View Repository
          </a>
        )}
        {previewLink && <IframeViewer link={previewLink} />}
        {manuals.length > 0 && <PdfViewer manuals={manuals} />}
      </main>
      <Footer />
    </div>
  );
}

export default ProjectDetail;
