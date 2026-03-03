import { Route, Routes } from "react-router-dom";
import Navbar from "./components/layout/Navbar.jsx";
import "./styles/index.css";

const App = () => {
    return (
        <div className="main">
            <Navbar />
            <Routes>
                <Route path="/" element={<h1>Home</h1>} />
                <Route path="/about" element={<h1>About</h1>} />
            </Routes>
        </div>
    )
}

export default App