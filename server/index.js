import express from "express";
import { createServer } from "node:http";
import { Server } from "socket.io";

const randomRoomId = () => {
  return Math.floor(Math.random() * 10000);
};
const app = express();

const server = createServer(app);

const io = new Server(server, {
  connectionStateRecovery: {},
  cors: {
    origin: "http://localhost:3000",
  },
});

app.get("/", (req, res) => {
  res.json({ run: 200 });
});

io.on('connection', async (socket)=> {
  console.log('a user connected');

  socket.emit("newRoom", Math.floor(Math.random() * 10000), (response) => {
    if(response.success) {
      socket.join(response.room);
    }
    io.to(response.room).emit("RoomMsg", `joined room ${response.room}`) //"got it"
  });

  socket.on("joinRoom", (room) => {
    socket.join(room);
    io.to(room).emit("joinedRoom", `joined room ${room}`);
    console.log(room);
  });

  socket.on("msg", (msg) => {
    io.to(msg.room).emit("move", "moved")
   })
  
  socket.on("move", (msg) => {
    console.log(msg);
    io.to(msg.room).emit("move", msg);
  });
})

server.listen(8080, () => {
  console.log("server running at http://localhost:8080");
});
