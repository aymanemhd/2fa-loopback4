import "./App.css";
import { Routes, Route } from "react-router-dom";
import Register from "./components/Register/Register";
import Home from "./components/Home/Home";
import Activate from "./components/Activate/Activate";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Register" element={<Register />} />
        <Route path="/activate" element={<Activate />} />
      </Routes>
    </div>
  );
}

export default App;
