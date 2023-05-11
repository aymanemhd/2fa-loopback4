import "./App.css";
import { Routes, Route } from "react-router-dom";
import Register from "./components/Register/Register";
import Home from "./components/Home/Home";
import Activate from "./components/Activate/Activate";
import Validate from "./components/Validate/Validate";
import { useState } from "react";

function App() {
  const [registeredEmail, setRegisteredEmail] = useState("");

  const handleRegister = (email: string) => {
    setRegisteredEmail(email);
  };
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Register" element={<Register onRegister={handleRegister} />} />
        <Route path="/activate" element={<Activate  email={registeredEmail}/>} />
        <Route path="/validate" element={<Validate />} />
      </Routes>
    </div>
  );
}

export default App;
