import React, { useEffect, useState, useRef } from "react";
import { useLocation } from "react-router-dom";
import { io } from "socket.io-client";

const socket = io("https://chat-app-v6wh.onrender.com");

const Chat = () => {
  const location = useLocation();
  const name = location.state?.name || "Guest";

  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const chatEndRef = useRef(null);

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

    return () => socket.off();
  }, [name]);

  // auto scroll to bottom
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = () => {
    if (message.trim() === "") return;

    const data = {
      user: name,
      text: message
    };

    socket.emit("send_message", data);
    setMessage("");
  };

  // Enter key send
  const handleKeyPress = (e) => {
    if (e.key === "Enter") sendMessage();
  };

  return (
    <div className="chat-container">
      <h1 className="chat-title">WELCOME TO THE CHAT {name}</h1>

      <div className="chat-box">
        {messages.map((msg, index) => {
          let className = "chat-message";

          if (msg.user === "System") className += " system";
          else if (msg.user === name) className += " me";
          else className += " other";

          return (
            <div key={index} className={className}>
              <span className="chat-user">{msg.user}</span>
              <span className="chat-text">{msg.text}</span>
            </div>
          );
        })}
        <div ref={chatEndRef}></div>
      </div>

      <div className="chat-input-box">
        <input
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={handleKeyPress}
          placeholder="Type message..."
          className="chat-input"
        />
        <button onClick={sendMessage} className="chat-btn">
          ➤
        </button>
      </div>
    </div>
  );
};

export default Chat;