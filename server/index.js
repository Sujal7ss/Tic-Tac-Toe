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
  res.json({ message: "Welcome To Tic-Tac-Toe"});
});

io.on('connection', async (socket)=> {


  socket.on('send-msg', (data) => {
    socket.to(data.room).emit('msg', data.msg);
  });

  socket.on('join-room', (roomId) => {
    socket.join(roomId);
  });

  socket.on('player-join', (roomId) => {
    
    socket.join(roomId);

    socket.to(roomId).emit('player-joined', roomId);
  });

  socket.on('turn', (data) => {
    socket.to(data.roomId).emit('turn', data);
  });

  socket.on('restart', (data) => {
    socket.to(data.roomId).emit('restart', data);
  });

})

server.listen(8080, () => {
  console.log("server running at http://localhost:8080");
});
