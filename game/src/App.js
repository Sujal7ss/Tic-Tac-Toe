import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import OfflineGame from "./pages/offlineGame";
import AIGame from "./pages/AIGame";
import { Multiplayer } from "./pages/multiplayer.jsx";
const App = () => {
  return (
    <>
      <BrowserRouter>
        
        <Routes>
          <Route path="/" element={<OfflineGame />} />
          <Route path="/computer" element={<AIGame />} />
          <Route path="/online" element={<Multiplayer />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
