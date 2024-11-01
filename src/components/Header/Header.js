import React from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import "./Header.css";

function Header() {
  const navigate = useNavigate();
  const location = useLocation();

  const handleNavigation = (event, sectionId) => {
    event.preventDefault();

    if (location.pathname !== "/") {
      navigate("/", { state: { sectionId } });
    } else {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  const sections = [
    { id: "skills", label: "Skills" },
    { id: "education", label: "Education" },
    { id: "experience", label: "Experience" },
    { id: "projects", label: "Projects" },
    { id: "contact", label: "Contact" },
  ];

  return (
    <header className="Header">
      <h1>My Portfolio</h1>
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          {sections.map(({ id, label }) => (
            <li key={id}>
              <a href={`#${id}`} onClick={(e) => handleNavigation(e, id)}>
                {label}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}

export default Header;
