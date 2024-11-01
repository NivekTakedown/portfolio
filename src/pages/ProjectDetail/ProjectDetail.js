import React, { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import "./ProjectDetail.css";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import IframeViewer from "../../components/IframeViewer";

function ProjectDetail() {
  const [content, setContent] = useState("");
  const [previewLink, setPreviewLink] = useState("");

  useEffect(() => {
    fetch("/projectDetail.md")
      .then((response) => response.text())
      .then((text) => {
        console.log("Fetched Content:", text); // Log the fetched content
        const { modifiedContent, previewLink } = parseContent(text);
        setContent(modifiedContent);
        setPreviewLink(previewLink);
      });
  }, []);

  const parseContent = (markdown) => {
    const previewRegex = /## Preview\s*\n\s*\[.*?\]\((.*?)\)/;
    const match = markdown.match(previewRegex);
    const previewLink = match ? match[1] : "";

    // Eliminar la sección de preview del contenido original
    const modifiedContent = markdown.replace(previewRegex, "");

    console.log("Parsed Content:", modifiedContent);
    console.log("Preview Link:", previewLink);

    return { modifiedContent, previewLink };
  };

  return (
    <div className="ProjectDetail">
      <Header />
      <main>
        <ReactMarkdown children={content} remarkPlugins={[remarkGfm]} />
        {previewLink && <IframeViewer link={previewLink} />}
      </main>
      <Footer />
    </div>
  );
}

export default ProjectDetail;
