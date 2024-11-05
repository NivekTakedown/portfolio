import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { dark } from "react-syntax-highlighter/dist/esm/styles/prism";
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
    fetch(`/portfolio/projects/${projectName}.md`)
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
    const pdfRegex = /\[(.*?)\]\((.*?\.pdf)\)/g;
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
        <ReactMarkdown
          children={content}
          remarkPlugins={[remarkGfm]}
          components={{
            code({ node, inline, className, children, ...props }) {
              const match = /language-(\w+)/.exec(className || "");
              return !inline && match ? (
                <SyntaxHighlighter
                  children={String(children).replace(/\n$/, "")}
                  style={dark}
                  language={match[1]}
                  PreTag="div"
                  {...props}
                />
              ) : (
                <code className={className} {...props}>
                  {children}
                </code>
              );
            },
          }}
        />
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
