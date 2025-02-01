import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { socket } from "../socket";
import OnlineGameBoard from "./OnlineGameBoard";


export const Multiplayer = () => {
  const navigate = useNavigate();
  const [message, setMessage] = useState("");
  const [roomId, setRoom] = useState("");
  const [currentRoomId, setCurrentRoomId] = useState(
    Math.floor(Math.random() * 10000).toString()
  );


  const [play, setPlay] = useState(false);
  const [myTurn, setMyTurn] = useState(false);

  useEffect(() => {
    socket.on("connect", (scoket) => {
      console.log("connected", socket.id);
    });

    socket.on("msg", (msg) => {
      console.log(msg);
    });

    socket.on("player-joined", (roomId) => {
      setPlay(true);
      setMyTurn(true);
      setRoom(currentRoomId);
      console.log("player joined", roomId);
    });

    socket.emit("join-room", currentRoomId);

    // return () => {
    //   socket.disconnect();
    // };
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    socket.emit("send-msg", { msg: message, room: roomId });
    setMessage("");
  };

  const handleRoomSubmit = (e) => {
    e.preventDefault();

    socket.emit("player-join", roomId);
    setRoom("");

    setPlay(true);
    setMyTurn(false);
    setRoom(roomId);
    console.log(myTurn)
  };
  return (
    <>
      
      {!play && (
        <div className="w-1/2 h-96 m-auto flex flex-col items-center justify-center bg-orange backdrop-brightness-50">
          <h1>Play with friend</h1>

          <div className="w-full h-full flex items-center justify-around ">
            <div className="w-1/3 h-full">
              <h2 className="text-xl ">{`Room id: ${currentRoomId}`}</h2>
              <h2 className="text-4xl text-gray-700 font-extrabold ">Share</h2>
            </div>

            <div className="w-1/3 h-full">
              <form
                onSubmit={handleRoomSubmit}
                className="form flex flex-col items-center justify-center gap-4"
              >
                <input
                  type="text"
                  placeholder="Enter Room Id"
                  value={roomId}
                  onChange={(e) => setRoom(e.target.value.toString())}
                  className="text-black bg-orange-100 h-10 w-40"
                />
                <button type="submit">
                  <h2 className="text-4xl text-gray-700 font-extrabold ">
                    Join Room{" "}
                  </h2>
                </button>
              </form>
            </div>
          </div>
        </div>
      )}

      {play && (
        <>
          <OnlineGameBoard myTurn={myTurn} changeTurn={setMyTurn} roomId={roomId}/>
          
        </>
      )}
    </>
  );
};
