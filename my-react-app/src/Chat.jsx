import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { io } from "socket.io-client";

const socket = io("http://https://chat-app-v6wh.onrender.com");

const Chat = () => {
  const location = useLocation();
  const name = location.state?.name;

  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    socket.emit("join", name);

    socket.on("receive_message", (data) => {
      setMessages((prev) => [...prev, data]);
    });

    socket.on("user_left", (user) => {
      setMessages((prev) => [
        ...prev,
        { user: "System", text: `${user} left the chat` }
      ]);
    });

    return () => {
      socket.off();
    };
  }, [name]);

  const sendMessage = () => {
    if (message.trim() === "") return;

    const data = {
      user: name,
      text: message
    };

    socket.emit("send_message", data);
    setMessage("");
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>WELCOME {name}</h2>

      <div
        style={{
          border: "1px solid #ccc",
          height: "300px",
          overflowY: "auto",
          padding: "10px",
          marginBottom: "10px"
        }}
      >
        {messages.map((msg, index) => (
          <p key={index}>
            <strong>{msg.user}:</strong> {msg.text}
          </p>
        ))}
      </div>

      <input
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Type message"
      />
      <button onClick={sendMessage}>Send</button>
    </div>
  );
};

export default Chat;
