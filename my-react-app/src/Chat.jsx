import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { io } from "socket.io-client";

const socket = io("https://chat-app-v6wh.onrender.com");

const Chat = () => {
  const location = useLocation();
  const name = location.state?.name;

  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    if (!name) return;

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
    if (!message.trim()) return;

    socket.emit("send_message", {
      user: name,
      text: message
    });

    setMessage("");
  };

return (
  <div className="chat-page">
    <div className="chat-box">
      <h3>WELCOME {name}</h3>

      <div className="messages">
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
  </div>
);
};

export default Chat;
