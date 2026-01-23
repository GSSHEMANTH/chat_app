import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./index.css";

const Login = () => {
  const [name, setName] = useState("");
  const navigate = useNavigate();

  const handleJoin = () => {
    if (name.trim()) {
      navigate("/chat", { state: { name } });
    }
  };

  return (
    <div className="login-container">
      <h2>Enter Your Name to Join Chat</h2>
      <input
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Name"
      />
      <button onClick={handleJoin}>JOIN</button>
    </div>
  );
};

export default Login;
