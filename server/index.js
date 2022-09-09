import express from "express";
import { Server as ServerSocket } from "socket.io";
import { createServer } from "http";
import cors from "cors";
import { PORT } from "./config.js";
import { dirname, join } from "path";
import { fileURLToPath } from "url";

const app = express();
const __dirname = dirname(fileURLToPath(import.meta.url))
const server = createServer(app);
const socket = new ServerSocket(server, {
  cors: {
    // origin: "http://localhost:3000",
  },
});

app.use(cors());
socket.on("connection", (socket) => {

  socket.on("conectado", (message) => {
    socket.broadcast.emit("online", message)
    // console.log(message)
  })

  socket.on("disconect", (message) => {
    socket.broadcast.emit("offline", message)
    // console.log(`se deconecto  ${message} `)
  })

  socket.on("message", (message, user) => {
    socket.broadcast.emit("message", { body: message, user: user })
  })

});

app.use(express.static(join(__dirname, "../client/build")))
server.listen(PORT);

console.log("Server to Started.. 👋 ");
