import React, { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import "./Home.css";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import ProjectCard from "../../components/ProjectCard";

function Home() {
  const [content, setContent] = useState("");
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    // Fetch the content of home.md
    fetch("/home.md")
      .then((response) => response.text())
      .then((text) => {
        const { modifiedContent, parsedProjects } = parseProjects(text);
        setContent(modifiedContent);
        setProjects(parsedProjects);
      });

    // Fetch the list of projects from projects.json
    fetch("/projects.json")
      .then((response) => response.json())
      .then((data) => {
        setProjects(data);
      });
  }, []);

  const parseProjects = (markdown) => {
    const projectRegex = /### \[(.*?)\]\((.*?)\)\n(.*?)(?=\n### |\n## |\n$)/gs;
    const matches = [...markdown.matchAll(projectRegex)];
    const parsedProjects = matches.map((match) => ({
      title: match[1],
      link: match[2],
      description: match[3].trim(),
    }));

    // Eliminar los proyectos del contenido original
    const modifiedContent = markdown.replace(projectRegex, "");

    return { modifiedContent, parsedProjects };
  };

  return (
    <div className="Home">
      <Header />
      <main>
        <ReactMarkdown
          children={content}
          remarkPlugins={[remarkGfm]}
          components={{
            h2: ({ node, ...props }) => {
              if (props.children === "Personal Projects") {
                return (
                  <section id="projects">
                    <h2 {...props} />
                    {projects.map((project, index) => (
                      <ProjectCard
                        key={index}
                        title={project.title}
                        description={project.description}
                        repoLink={project["repo-link"]}
                        previewLink={project["preview-link"]}
                        link={`/projects/${project.name}`}
                      />
                    ))}
                  </section>
                );
              }
              return <h2 {...props} />;
            },
          }}
        />
      </main>
      <Footer />
    </div>
  );
}

export default Home;
