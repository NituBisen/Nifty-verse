// import React from "react";
// import { Routes, Route, Navigate } from "react-router-dom";

// import Homepage from "./pages/Homepage";
// import Createaccount from "./pages/Createaccount";
// import Signin from "./signin/Signin";
// import Connectwallet from "./pages/Connectwallet";
// import Ranking from "./pages/Rankingpage"
// import Market from "./marketplace/market";
// import NFT from "./nftpage/NFT";
// import Artist from "./artistpage/Artist";
// import Collection from "./collectionpage/Collection";
// import ForgotPassword from "./forgotpass/Forgotpassword";
// import UserProfile from "./userprofile/UserProfile";
// import EditProfile from "./editprofile/EditProfile";

// //admin section
// import AdminLayout from "./admin/layout/AdminLayout";
// import AdminDashboard from "./admin/pages/AdminDashboard";
// import AdminPlaceholder from "./admin/pages/AdminPlaceholder";
// import AdminUsers from "./admin/pages/AdminUsers";

// const App = () => {
//   return (
//     <Routes>
//       {/* Home Page */}
//       <Route path="/" element={<Homepage />} />

//       {/* Marketplace */}
//       <Route path="/marketplace" element={<Market />} />

//       {/* NFT Details */}
//       <Route path="/nft/:id" element={<NFT />} />

//       {/* Create Account */}
//       <Route path="/create-account" element={<Createaccount />} />

//       {/* Signin Account */}
//       <Route path="/signin" element={<Signin />} />

//       {/* Connect Wallet */}
//       <Route path="/connect-wallet" element={<Connectwallet />} />

//       {/* Ranking */}
//       <Route path="/Ranking-page" element={<Ranking />} />
       
//       {/* Artist Page */}
//       <Route path="/artist" element={<Artist />} />

//       {/* Collection Page */}
//       <Route path="/collections" element={<Collection />} />

//       {/* Old route support */}
//       <Route path="/artist-page" element={<Artist />} />

//       {/* Any invalid URL → Home */}
//       <Route path="*" element={<Navigate to="/" replace />} />
//       <Route path="/signin" element={<Signin />} />

// <Route
//   path="/forgot-password"
//   element={<ForgotPassword />}
// />
// <Route path="/profile" element={<UserProfile />} />
// <Route path="/edit-profile" element={<EditProfile />} />

//       {/* Admin Section */}

//       <Route path="/admin" element={<AdminLayout />}>
//         <Route index element={<Navigate to="dashboard" replace />} />
//         <Route path="dashboard" element={<AdminDashboard />} />
//         <Route path="users" element={<AdminUsers />} />
//         <Route path="nfts" element={<AdminPlaceholder />} />
//         <Route path="collections" element={<AdminPlaceholder />} />
//         <Route path="creators" element={<AdminPlaceholder />} />
//         <Route path="listings" element={<AdminPlaceholder />} />
//         <Route path="auctions" element={<AdminPlaceholder />} />
//         <Route path="bids" element={<AdminPlaceholder />} />
//         <Route path="transactions" element={<AdminPlaceholder />} />
//         <Route path="reports" element={<AdminPlaceholder />} />
//         <Route path="categories" element={<AdminPlaceholder />} />
//         <Route path="featured" element={<AdminPlaceholder />} />
//         <Route path="settings" element={<AdminPlaceholder />} />
//       </Route>

//     </Routes>
    
//   );
// };

// export default App;








import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import Homepage from "./pages/Homepage";
import Createaccount from "./pages/Createaccount";
import Signin from "./signin/Signin";
import Connectwallet from "./pages/Connectwallet";
import Ranking from "./pages/Rankingpage";
import Market from "./marketplace/market";
import NFT from "./nftpage/NFT";
import Artist from "./artistpage/Artist";
import Collection from "./collectionpage/Collection";
import ForgotPassword from "./forgotpass/Forgotpassword";
import UserProfile from "./userprofile/UserProfile";
import EditProfile from "./editprofile/EditProfile";

// Admin Section
import AdminLayout from "./admin/layout/AdminLayout";
import AdminLogin from "./admin/pages/AdminLogin";
import AdminDashboard from "./admin/pages/AdminDashboard";
import AdminPlaceholder from "./admin/pages/AdminPlaceholder";
import AdminUsers from "./admin/pages/AdminUsers";

//User Section
import UserLayout from "./user/layout/UserLayout";

//admin
const AdminProtectedRoute = ({ children }) => {
    const adminToken = localStorage.getItem(
        "adminToken"
    );

    if (!adminToken) {
        return (
            <Navigate
                to="/admin/login"
                replace
            />
        );
    }

    return children;
};

//user
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

const UserSectionPlaceholder = ({ title, description }) => {
  return (
    <section className="group relative overflow-hidden rounded-[26px] bg-[#111114] p-5 shadow-[0_18px_55px_rgba(0,0,0,0.2)] sm:p-7 lg:p-8">
      <div className="pointer-events-none absolute -right-16 -top-20 h-52 w-52 rounded-full bg-[#A259FF]/10 blur-[80px]" />

      <div className="relative">
        <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#A259FF]">
          Nifty Verse
        </p>

        <h1 className="mt-3 text-2xl font-bold text-transparent bg-gradient-to-r from-[#B872FF] to-[#55B7FF] bg-clip-text sm:text-3xl">
          {title}
        </h1>

        <p className="mt-3 max-w-2xl text-sm leading-7 text-[#85858D]">
          {description}
        </p>

        <div className="mt-6 inline-flex items-center gap-2 rounded-full border border-[#A259FF]/20 bg-[#A259FF]/[0.08] px-4 py-2 text-xs font-semibold text-[#B872FF]">
          Feature setup in progress
        </div>
      </div>
    </section>
  );
};

const App = () => {
    return (
        <Routes>
            {/* =========================
                PUBLIC ROUTES
            ========================== */}

            <Route
                path="/"
                element={<Homepage />}
            />

            <Route
                path="/marketplace"
                element={<Market />}
            />

            <Route
                path="/nft/:id"
                element={<NFT />}
            />

            <Route
                path="/create-account"
                element={<Createaccount />}
            />

            <Route
                path="/signin"
                element={<Signin />}
            />

            <Route
                path="/connect-wallet"
                element={<Connectwallet />}
            />

            <Route
                path="/Ranking-page"
                element={<Ranking />}
            />

            <Route
                path="/artist"
                element={<Artist />}
            />

            <Route
                path="/collections"
                element={<Collection />}
            />

            <Route
                path="/artist-page"
                element={<Artist />}
            />

            <Route
                path="/forgot-password"
                element={<ForgotPassword />}
            />

            <Route
                path="/profile"
                element={<UserProfile />}
            />

            <Route
                path="/edit-profile"
                element={<EditProfile />}
            />

            {/* =========================
                ADMIN LOGIN
            ========================== */}

            <Route
                path="/admin/login"
                element={<AdminLogin />}
            />

            {/* =========================
                PROTECTED ADMIN SECTION
            ========================== */}

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
                    element={
                        <Navigate
                            to="dashboard"
                            replace
                        />
                    }
                />

                <Route
                    path="dashboard"
                    element={<AdminDashboard />}
                />

                <Route
                    path="users"
                    element={<AdminUsers />}
                />

                <Route
                    path="nfts"
                    element={<AdminPlaceholder />}
                />

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

                <Route
                    path="bids"
                    element={<AdminPlaceholder />}
                />

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

            {/* =========================
                INVALID URL
            ========================== */}

            <Route
                path="*"
                element={
                    <Navigate
                        to="/"
                        replace
                    />
                }
            />

            {/* =========================
                PROTECTED User SECTION
            ========================== */}

            <Route
              path="/user"
              element={
                <UserProtectedRoute>
                  <UserLayout />
                </UserProtectedRoute>
              }
            >
              <Route
                index
                element={<Navigate to="dashboard" replace />}
              />

              <Route
                path="dashboard"
                element={
                  <UserSectionPlaceholder
                    title="Dashboard"
                    description="Your NFT activity, account statistics and marketplace overview."
                  />
                }
              />

              <Route
                path="nfts"
                element={
                  <UserSectionPlaceholder
                    title="My NFTs"
                    description="Manage your created, owned and purchased NFTs."
                  />
                }
              />

              <Route
                path="collections"
                element={
                  <UserSectionPlaceholder
                    title="Collections"
                    description="Organize and manage your NFT collections."
                  />
                }
              />

              <Route
                path="favorites"
                element={
                  <UserSectionPlaceholder
                    title="Favorites"
                    description="View the NFTs you have saved as favorites."
                  />
                }
              />

              <Route
                path="activity"
                element={
                  <UserSectionPlaceholder
                    title="Activity"
                    description="Review your recent account and NFT activity."
                  />
                }
              />

              <Route
                path="notifications"
                element={
                  <UserSectionPlaceholder
                    title="Notifications"
                    description="View and manage your account notifications."
                  />
                }
              />

              <Route
                path="profile"
                element={
                  <UserSectionPlaceholder
                    title="My Profile"
                    description="View and manage your profile information."
                  />
                }
              />

              <Route
                path="wallet"
                element={
                  <UserSectionPlaceholder
                    title="Wallet"
                    description="View your wallet connection and account details."
                  />
                }
              />
            </Route>
        </Routes>
    );
};

export default App;