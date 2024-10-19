import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import OfflineGame from "./pages/offlineGame";
import AIGame from "./pages/AIGame";
import ToggleButton from "./components/ToggleButton.jsx";
const App = () => {
  return (
    <>
      <BrowserRouter>
        <ToggleButton />
        <Routes>
        <Route path="/" element={<OfflineGame />} />
        <Route path="/computer" element={<AIGame />} />
        </Routes>
      </BrowserRouter>
      {/* <OfflineGame />
      <AIGame /> */}
    </>
  );
};

export default App;
