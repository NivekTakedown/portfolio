import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import ProjectDetail from "./pages/ProjectDetail";

function App() {
  return (
    <Router basename="/portfolio">
      <div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/projects/:projectName" element={<ProjectDetail />} />
          <Route path="*" element={<Home />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
