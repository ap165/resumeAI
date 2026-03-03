import { Route, Routes } from "react-router-dom";
import Navbar from "./components/layout/Navbar.jsx";
import Home from "./features/resume/Home.jsx";
import "./styles/index.css";

const App = () => {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <Navbar />
      <main className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/resume-builder" element={<h1 className="text-3xl font-bold">Resume Builder</h1>} />
          <Route path="/ats-score-checker" element={<h1 className="text-3xl font-bold">ATS Score Checker</h1>} />
          <Route path="/about" element={<h1 className="text-3xl font-bold">About</h1>} />
        </Routes>
      </main>
    </div>
  );
};

export default App;
