const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");

const app = express();
app.use(cors());

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  }
});

let users = {}; // store connected users

io.on("connection", (socket) => {
  console.log("User connected:", socket.id);

  // when user joins
  socket.on("join", (name) => {
    users[socket.id] = name;

    // send updated users list
    io.emit("online_users", Object.values(users));
  });

  // receive message
  socket.on("send_message", (data) => {
    io.emit("receive_message", data);
  });

  // when user disconnects
  socket.on("disconnect", () => {
    const leftUser = users[socket.id];
    delete users[socket.id];

    io.emit("online_users", Object.values(users));
    io.emit("user_left", leftUser);
  });
});

server.listen(5001, () => {
  console.log("Server running on port 5001");
});
