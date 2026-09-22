import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import Homepage from "./pages/Homepage";
import Createaccount from "./pages/Createaccount";
import Connectwallet from "./pages/Connectwallet";
import Ranking from "./pages/Rankingpage"

import Market from "./marketplace/market";
import NFT from "./nftpage/NFT";
import Artist from "./artistpage/Artist";
import Collection from "./collectionpage/Collection";

const App = () => {
  return (
    <Routes>
      {/* Home Page */}
      <Route path="/" element={<Homepage />} />

      {/* Marketplace */}
      <Route path="/marketplace" element={<Market />} />

      {/* NFT Details */}
      <Route path="/nft/:id" element={<NFT />} />

      {/* Create Account */}
      <Route path="/create-account" element={<Createaccount />} />

      {/* Connect Wallet */}
      <Route path="/connect-wallet" element={<Connectwallet />} />

      {/* Ranking */}
      <Route path="/Ranking-page" element={<Ranking />} />
       
       

      {/* Artist Page */}
      <Route path="/artist" element={<Artist />} />

      {/* Collection Page */}
      <Route path="/collections" element={<Collection />} />

      {/* Old route support */}
      <Route path="/artist-page" element={<Artist />} />

      {/* Any invalid URL → Home */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default App;