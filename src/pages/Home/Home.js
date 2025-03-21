import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import "./Home.css";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import ProjectsList from "../../components/ProjectsList";
import {
  parseProjects,
  generateClassName,
  getTextFromChildren,
} from "../../utils";

function Home() {
  const location = useLocation();
  const [content, setContent] = useState("");
  const [projects, setProjects] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch markdown content
        const mdResponse = await fetch("/portfolio/home.md");
        const mdText = await mdResponse.text();
        const { modifiedContent, parsedProjects } = parseProjects(mdText);
        setContent(modifiedContent);
        setProjects(parsedProjects);

        // Fetch projects data
        const projectsResponse = await fetch("/portfolio/projects.json");
        const projectsData = await projectsResponse.json();
        setProjects(projectsData);

        setIsLoading(false);

        // Handle scroll after content is loaded
        if (location.state?.sectionId) {
          setTimeout(() => {
            const element = document.getElementById(location.state.sectionId);
            if (element) {
              element.scrollIntoView({ behavior: "smooth" });
              window.history.replaceState({}, document.title);
            }
          }, 100);
        }
      } catch (error) {
        console.error("Error loading content:", error);
        setIsLoading(false);
      }
    };

    fetchData();
  }, [location.state]);

  if (isLoading) {
    return (
      <div className="Home">
        <Header />
        <main>
          <div className="loading">Loading...</div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="Home">
      <Header />
      <main>
        <ReactMarkdown
          children={content}
          remarkPlugins={[remarkGfm]}
          components={{
            h2: ({ node, children, ...props }) => {
              const headingText = getTextFromChildren(children);
              const className = generateClassName(headingText);
              const id = className;

              if (headingText.toLowerCase().includes("projects")) {
                return (
                  <section id={id} className={className}>
                    <h2 {...props}>{children}</h2>
                    <ProjectsList projects={projects} />
                  </section>
                );
              }

              return (
                <section id={id} className={className}>
                  <h2 {...props}>{children}</h2>
                </section>
              );
            },
          }}
        />
      </main>
      <Footer />
    </div>
  );
}

export default Home;
