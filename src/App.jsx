
import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

// Public Pages
import Homepage from "./pages/Homepage";
import Createaccount from "./pages/Createaccount";
import Signin from "./signin/Signin";
import Connectwallet from "./pages/Connectwallet";
import Ranking from "./pages/Rankingpage";
import Market from "./marketplace/market";
import NFTDetails from "./nftpage/NFT";
import Artist from "./artistpage/Artist";
import Collection from "./collectionpage/Collection";
import ForgotPassword from "./forgotpass/Forgotpassword";
import CollectionDetails from "./collectionpage/CollectionDetails";

// User Dashboard
import DashboardC from "./user/layout/DashboardC";
import Profile from "./user/layout/Profile";
import NFT from "./user/layout/NFT";
import Collections from "./user/layout/Collections";
import Favorites from "./user/layout/Favorites";
import Activity from "./user/layout/Activity";
import Notifications from "./user/layout/Notifications";
import Wallet from "./user/layout/Wallet";
import UserLayout from "./user/layout/UserLayout";

// Admin Pages
import AdminLayout from "./admin/layout/AdminLayout";
import AdminLogin from "./admin/pages/AdminLogin";
import AdminDashboard from "./admin/pages/AdminDashboard";
import AdminPlaceholder from "./admin/pages/AdminPlaceholder";
import AdminUsers from "./admin/pages/AdminUsers";

// Protect Admin Routes
const AdminProtectedRoute = ({ children }) => {
  const adminToken = localStorage.getItem("adminToken");

  if (!adminToken) {
    return <Navigate to="/admin/login" replace />;
  }

  return children;
};

// Protect User Routes
const UserProtectedRoute = ({ children }) => {
  const token = localStorage.getItem("token");
  const savedUser = localStorage.getItem("user");

  if (!token || !savedUser) {
    return <Navigate to="/signin" replace />;
  }

  try {
    JSON.parse(savedUser);
  } catch {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    return <Navigate to="/signin" replace />;
  }

  return children;
};

// Reusable User Page Placeholder
const UserSectionPlaceholder = ({ title, description }) => {
  return (
    <section className="overflow-hidden relative p-5 bg-[#111114] rounded-[26px] border-white/[0.06] shadow-[0_18px_55px_rgba(0,0,0,0.2)] border sm:p-7 lg:p-8">
      <div className="absolute h-52 w-52 bg-[#A259FF]/10 rounded-full blur-[80px] pointer-events-none -right-16 -top-20" />

      <div className="relative">
        <p className="text-xs font-bold tracking-[0.2em] text-[#A259FF] uppercase">
          Nifty Verse
        </p>

        <h1 className="mt-3 text-2xl font-bold text-transparent bg-gradient-to-r from-[#B872FF] to-[#55B7FF] bg-clip-text sm:text-3xl">
          {title}
        </h1>

        <p className="mt-3 max-w-2xl text-sm leading-7 text-[#85858D]">
          {description}
        </p>
      </div>
    </section>
  );
};

const App = () => {
  return (
    <Routes>
      {/* ================= PUBLIC ROUTES ================= */}

      <Route path="/" element={<Homepage />} />

      <Route path="/marketplace" element={<Market />} />

      {/* Public NFT Details */}
      <Route path="/nft/:id" element={<NFTDetails />} />

      <Route
        path="/create-account"
        element={<Createaccount />}
      />

      <Route path="/signin" element={<Signin />} />

      <Route
        path="/connect-wallet"
        element={<Connectwallet />}
      />

      <Route
        path="/Ranking-page"
        element={<Ranking />}
      />

      <Route path="/artist" element={<Artist />} />

      <Route path="/artist-page" element={<Artist />} />

      {/* Landing Page Collections — unchanged */}
      <Route path="/collections" element={<Collection />} />
      <Route path="/collection/:id" element={<CollectionDetails />} />

      <Route
        path="/forgot-password"
        element={<ForgotPassword />}
      />

      {/* ================= ADMIN LOGIN ================= */}

      <Route
        path="/admin/login"
        element={<AdminLogin />}
      />

      {/* ================= PROTECTED ADMIN ROUTES ================= */}

      <Route
        path="/admin"
        element={
          <AdminProtectedRoute>
            <AdminLayout />
          </AdminProtectedRoute>
        }
      >
        <Route
          index
          element={<Navigate to="dashboard" replace />}
        />

        <Route
          path="dashboard"
          element={<AdminDashboard />}
        />

        <Route path="users" element={<AdminUsers />} />

        <Route path="nfts" element={<AdminPlaceholder />} />

        <Route
          path="collections"
          element={<AdminPlaceholder />}
        />

        <Route
          path="creators"
          element={<AdminPlaceholder />}
        />

        <Route
          path="listings"
          element={<AdminPlaceholder />}
        />

        <Route
          path="auctions"
          element={<AdminPlaceholder />}
        />

        <Route path="bids" element={<AdminPlaceholder />} />

        <Route
          path="transactions"
          element={<AdminPlaceholder />}
        />

        <Route
          path="reports"
          element={<AdminPlaceholder />}
        />

        <Route
          path="categories"
          element={<AdminPlaceholder />}
        />

        <Route
          path="featured"
          element={<AdminPlaceholder />}
        />

        <Route
          path="settings"
          element={<AdminPlaceholder />}
        />
      </Route>

      {/* ================= PROTECTED USER DASHBOARD ================= */}

      <Route
        path="/user"
        element={
          <UserProtectedRoute>
            <UserLayout />
          </UserProtectedRoute>
        }
      >
        {/* Default Dashboard Route */}
        <Route
          index
          element={<Navigate to="dashboard" replace />}
        />

        {/* Dashboard Home */}
        <Route
          path="dashboard"
          element={<DashboardC />}
        />

        {/* User Profile */}
        <Route
          path="profile"
          element={<Profile />}
        />

        {/* My NFTs */}
        <Route
          path="nfts"
          element={<NFT />}
        />

        {/* User Dashboard Collections — separate from landing page */}
        <Route
          path="collections"
          element={<Collections />}
        />

        {/* Favorites */}
<Route
  path="favorites"
  element={<Favorites />}
/>

        {/* Activity */}
        <Route
          path="activity"
          element={<Activity />}
        />
      

        {/* Notifications */}
        <Route
          path="notifications"
          element={<Notifications />}
          
        />

        {/* Wallet */}
        <Route
          path="wallet"
          element={<Wallet />}
            
        />
      </Route>

      {/* ================= INVALID URL ================= */}

      <Route
        path="*"
        element={<Navigate to="/" replace />}
      />
    </Routes>
  );
};

export default App;
