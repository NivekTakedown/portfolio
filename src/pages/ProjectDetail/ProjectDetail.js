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
import YoutubeViewer from "../../components/YoutubeViewer";

function ProjectDetail() {
  const { projectName } = useParams();
  const [content, setContent] = useState("");
  const [previewLink, setPreviewLink] = useState("");
  const [repoLink, setRepoLink] = useState("");
  const [manuals, setManuals] = useState([]);
  const [project, setProject] = useState(null);
  const [videoId, setVideoId] = useState("");

  useEffect(() => {
    const fetchProjectData = async () => {
      try {
        const response = await fetch("/portfolio/projects.json");
        const projects = await response.json();
        const project = projects.find(p => p.name === projectName);
        if (project) {
          setProject(project);
          fetchProjectMarkdown(project);
        }
      } catch (error) {
        console.error("Error loading project data:", error);
      }
    };

    const fetchProjectMarkdown = async (project) => {
      try {
        const response = await fetch(`/portfolio/projects/${projectName}.md`);
        const text = await response.text();
        const { modifiedContent, previewLink, repoLink, manuals, videoId } = parseContent(text);
        setContent(modifiedContent);
        setPreviewLink(previewLink || project["preview-link"]);
        setRepoLink(repoLink || project["repo-link"]);
        setManuals(manuals || []);
        setVideoId(videoId);
      } catch (error) {
        console.error("Error loading project markdown:", error);
      }
    };

    fetchProjectData();
  }, [projectName]);

  const parseContent = (markdown) => {
    const previewRegex = /## Preview\s*\n\s*\[.*?\]\((.*?)\)/;
    const repoRegex = /## Repository\s*\n\s*\[.*?\]\((.*?)\)/;
    const pdfRegex = /\[(.*?)\]\((.*?\.pdf)\)/g;
    const videoRegex = /video:https:\/\/youtu\.be\/(.*?)(?:\s|$)/;
    const previewMatch = markdown.match(previewRegex);
    const repoMatch = markdown.match(repoRegex);
    const pdfMatches = [...markdown.matchAll(pdfRegex)];
    const videoMatch = markdown.match(videoRegex);
    const previewLink = previewMatch ? previewMatch[1] : "";
    const repoLink = repoMatch ? repoMatch[1] : "";
    const manuals = pdfMatches.map((match) => ({
      title: match[1],
      fileName: match[2],
    }));
    const videoId = videoMatch ? videoMatch[1] : "";

    const modifiedContent = markdown
      .replace(previewRegex, "")
      .replace(repoRegex, "")
      .replace(pdfRegex, "")
      .replace(videoRegex, "");

    return { modifiedContent, previewLink, repoLink, manuals, videoId };
  };

  if (!project) {
    return (
      <div className="ProjectDetail">
        <Header />
        <main>
          <div className="loading">Loading...</div>
        </main>
        <Footer />
      </div>
    );
  }

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
        {videoId && <YoutubeViewer videoId={videoId} />}
      </main>
      <Footer />
    </div>
  );
}

export default ProjectDetail;
