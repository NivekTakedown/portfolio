import React from "react";
import "./Footer.css";

function Footer() {
  return (
    <footer className="Footer">
      <p>
        Contact me at:{" "}
        <a href="mailto:your.email@example.com">your.email@example.com</a>
      </p>
      <p>
        Follow me on:
        <a
          href="https://linkedin.com/in/yourprofile"
          target="_blank"
          rel="noopener noreferrer"
        >
          {" "}
          LinkedIn
        </a>{" "}
        |
        <a
          href="https://github.com/yourprofile"
          target="_blank"
          rel="noopener noreferrer"
        >
          {" "}
          GitHub
        </a>
      </p>
    </footer>
  );
}

export default Footer;
