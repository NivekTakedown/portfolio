import React, { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import "./Header.css";

function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const handleNavigation = (event, sectionId) => {
    event.preventDefault();
    setMenuOpen(false); // Cierra el menú después de la navegación

    if (location.pathname !== "/") {
      navigate("/", { state: { sectionId } });
    } else {
      const element = document.getElementById(sectionId);
      if (element) {
        const headerHeight = 60; // Altura fija del header
        const elementPosition = element.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerHeight;

        window.scrollTo({
          top: offsetPosition,
          behavior: "smooth"
        });
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
      <div className="header-container">
        <h1>My Portfolio</h1>
        <button 
          className="menu-toggle" 
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          ☰
        </button>
        <nav className={menuOpen ? "show" : ""}>
          <ul>
            <li>
              <Link to="/" onClick={() => setMenuOpen(false)}>Home</Link>
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
      </div>
    </header>
  );
}

export default Header;
