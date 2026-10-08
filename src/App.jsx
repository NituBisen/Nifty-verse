import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import Homepage from "./pages/Homepage";
import Createaccount from "./pages/Createaccount";
import Signin from "./signin/Signin";
import Connectwallet from "./pages/Connectwallet";
import Ranking from "./pages/Rankingpage"
import Market from "./marketplace/market";
import NFT from "./nftpage/NFT";
import Artist from "./artistpage/Artist";
import Collection from "./collectionpage/Collection";
import ForgotPassword from "./forgotpass/Forgotpassword";
import UserProfile from "./userprofile/UserProfile";
import EditProfile from "./editprofile/EditProfile";

//admin section
import AdminLayout from "./admin/layout/AdminLayout";
import AdminDashboard from "./admin/pages/AdminDashboard";
import AdminPlaceholder from "./admin/pages/AdminPlaceholder";
import AdminUsers from "./admin/pages/AdminUsers";

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

      {/* Signin Account */}
      <Route path="/signin" element={<Signin />} />

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
<<<<<<< HEAD
      <Route path="/signin" element={<Signin />} />

<Route
  path="/forgot-password"
  element={<ForgotPassword />}
/>
<Route path="/profile" element={<UserProfile />} />
<Route path="/edit-profile" element={<EditProfile />} />
=======

      {/* Admin Section */}

      <Route path="/admin" element={<AdminLayout />}>
        <Route index element={<Navigate to="dashboard" replace />} />
        <Route path="dashboard" element={<AdminDashboard />} />
        <Route path="users" element={<AdminUsers />} />
        <Route path="nfts" element={<AdminPlaceholder />} />
        <Route path="collections" element={<AdminPlaceholder />} />
        <Route path="creators" element={<AdminPlaceholder />} />
        <Route path="listings" element={<AdminPlaceholder />} />
        <Route path="auctions" element={<AdminPlaceholder />} />
        <Route path="bids" element={<AdminPlaceholder />} />
        <Route path="transactions" element={<AdminPlaceholder />} />
        <Route path="reports" element={<AdminPlaceholder />} />
        <Route path="categories" element={<AdminPlaceholder />} />
        <Route path="featured" element={<AdminPlaceholder />} />
        <Route path="settings" element={<AdminPlaceholder />} />
      </Route>

>>>>>>> 00f48fb (admin ui section)
    </Routes>
    
  );
};

export default App;