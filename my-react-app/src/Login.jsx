import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [name, setName] = useState("");
  const navigate = useNavigate();

  const handleLogin = () => {
    if (!name.trim()) {
      alert("Please enter your name");
      return;
    }

    navigate("/chat", { state: { name } });
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2>💬 Chat App Login</h2>

        <input
          type="text"
          placeholder="Enter your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <button onClick={handleLogin}>Join Chat</button>
      </div>
    </div>
  );
};

export default Login;
