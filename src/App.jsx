import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import NFT from "./nftpage/NFT";
import Homepage from "./pages/Homepage";
import Market from "./marketplace/market";


function App() {
  return (
    <Routes>
      <Route path="/" element={<Homepage />} />
      <Route path="/marketplace" element={<Market />} />
      <Route path="/nft/:id" element={<NFT />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;