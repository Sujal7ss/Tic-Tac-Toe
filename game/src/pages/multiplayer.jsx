import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { socket } from "../socket";

export const Multiplayer = () => {
  const navigate = useNavigate();
  const [roomId, updateRoomId] = useState(1232);
  const [joinRoomId, updateJoinRoomId] = useState(null);

  socket.on("hello", (arg, callback) => {
    console.log(arg); // "world"
    callback("got it");
  });

  useEffect(() => {
    socket.on("connect", () => {
      console.log(socket.id);
    });
    return () => {};
  }, []);

  socket.on("RoomMsg", (msg) => {console.log(msg)});

  socket.on("newRoom", (arg, callback) => {
    updateRoomId(arg);
    callback({ room: arg, success: true });
  });

  

  socket.on("joinedRoom", (msg) => {
    navigate("/");
    console.log(msg);
  });

  function joinRoom(room) {}
  function handleSubmit(e, input) {
    e.preventDefault();
  }

  return (
    <>
      <div className="w-full h-96 flex flex-row justify-center items-center">
        <div className="w-1/2 h-full  items-center">
          <h1>Multiplayer</h1>
          <div>
            <h1>Room id : {roomId}</h1>
            <h1>Join Room</h1>
            <input
              type="text"
              name="room"
              value={joinRoomId}
              onChange={(e) => {
                updateJoinRoomId(e.target.value);
              }}
            ></input>
            <button onClick={() => socket.emit("joinRoom", joinRoomId)}>
              Join Room
            </button>

            <button onClick={() => socket.emit("msg", { room: roomId })}>
              Play
            </button>
          </div>
        </div>
      </div>
      {/* <h1>`Room id : {roomId}`</h1>
      <button onClick={handlePlay}>Play</button> */}
      {/* <form onSubmit={(e) => handleSubmit(e, input)}>
        <input
          type="text"
          name="turn"
          value={input}
          onChange={(e) => {
            setInput(e.target.value);
          }}
        ></input>
        <button  type="submit">
          Play
        </button>
      </form> */}
    </>
  );
};
