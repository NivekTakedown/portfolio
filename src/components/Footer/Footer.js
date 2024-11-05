import React from "react";
import "./Footer.css";
import { Image } from "react-bootstrap";
import githubLogo from "../../assets/github-logo.png"; // Ruta a tu logo de GitHub
import linkedinLogo from "../../assets/linkedin-logo.png"; // Ruta a tu logo de LinkedIn

function Footer() {
  return (
    <footer className="Footer">
      <p>
        Follow me on:
        <a
          href="https://www.linkedin.com/in/kevin-fabio-ramos-lopez-300401250/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image src={linkedinLogo} alt="LinkedIn Logo" className="logo" />
          LinkedIn
        </a>
        |
        <a
          href="https://github.com/yourprofile"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image src={githubLogo} alt="GitHub Logo" className="logo" />
          GitHub
        </a>
      </p>
    </footer>
  );
}

export default Footer;
