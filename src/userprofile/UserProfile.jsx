import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import Navbar from "../common/Navbar";
import Footer from "../common/Footer";

import {
  Copy,
  Edit3,
  Share2,
  Heart,
  MoreHorizontal,
  ShoppingCart,
  Tag,
  Gavel,
  ArrowUpRight,
  CheckCircle2,
} from "lucide-react";

// =========================================================
// NFT DATA
// =========================================================

const OWNED_NFTS = [
  {
    id: 1,
    name: "Astronaut #001",
    image:
      "https://images.unsplash.com/photo-1614728263952-84ea256f9679?w=800",
    price: "2.40",
    creator: "Orbitian",
  },
  {
    id: 2,
    name: "Cosmic Dream",
    image:
      "https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?w=800",
    price: "1.80",
    creator: "Nebula",
  },
  {
    id: 3,
    name: "Space Explorer",
    image:
      "https://images.unsplash.com/photo-1614728894747-a83421e2b9c9?w=800",
    price: "3.10",
    creator: "Galaxy Art",
  },
  {
    id: 4,
    name: "Digital Soul",
    image:
      "https://images.unsplash.com/photo-1634986666676-ec8fd927c23d?w=800",
    price: "1.25",
    creator: "Pixel Artist",
  },
  {
    id: 5,
    name: "Future World",
    image:
      "https://images.unsplash.com/photo-1635322966219-b75ed372eb01?w=800",
    price: "4.20",
    creator: "Future Lab",
  },
  {
    id: 6,
    name: "Meta Universe",
    image:
      "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800",
    price: "2.75",
    creator: "Meta Studio",
  },
];

const CREATED_NFTS = [
  {
    id: 7,
    name: "Cyber Punk",
    image:
      "https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?w=800",
    price: "5.20",
    creator: "You",
  },
  {
    id: 8,
    name: "Neon City",
    image:
      "https://images.unsplash.com/photo-1519608487953-e999c86e7455?w=800",
    price: "3.40",
    creator: "You",
  },
  {
    id: 9,
    name: "Digital Future",
    image:
      "https://images.unsplash.com/photo-1535378917042-10a22c95931a?w=800",
    price: "2.10",
    creator: "You",
  },
];

const FAVORITE_NFTS = [
  {
    id: 10,
    name: "Magic Mushroom",
    image:
      "https://images.unsplash.com/photo-1618005198919-d3d4b5a92ead?w=800",
    price: "2.90",
    creator: "Magic Artist",
  },
  {
    id: 11,
    name: "Abstract #24",
    image:
      "https://images.unsplash.com/photo-1549490349-8643362247b5?w=800",
    price: "1.60",
    creator: "Abstract Lab",
  },
  {
    id: 12,
    name: "Purple Galaxy",
    image:
      "https://images.unsplash.com/photo-1502134249126-9f3755a50d78?w=800",
    price: "4.80",
    creator: "Space Artist",
  },
];

// =========================================================
// ACTIVITY DATA
// =========================================================

const ACTIVITIES = [
  {
    id: 1,
    type: "Purchased",
    title: "Astronaut #001",
    price: "2.40 ETH",
    time: "2 hours ago",
    icon: ShoppingCart,
  },
  {
    id: 2,
    type: "Listed",
    title: "Cyber Punk",
    price: "5.20 ETH",
    time: "5 hours ago",
    icon: Tag,
  },
  {
    id: 3,
    type: "Bid placed",
    title: "Purple Galaxy",
    price: "4.10 ETH",
    time: "1 day ago",
    icon: Gavel,
  },
  {
    id: 4,
    type: "Transferred",
    title: "Digital Soul",
    price: "1.25 ETH",
    time: "2 days ago",
    icon: ArrowUpRight,
  },
];

// =========================================================
// NFT CARD
// =========================================================

const NFTCard = ({ nft }) => {
  const [liked, setLiked] = useState(false);

  return (
    <div className="overflow-hidden bg-[#181818] rounded-2xl border-[#2C2C2C] duration-300 group border transition hover:-translate-y-1 hover:border-[#A259FF]">
      {/* IMAGE */}
      <div className="overflow-hidden relative aspect-square">
        <img
          src={nft.image}
          alt={nft.name}
          className="object-cover h-full w-full duration-500 transition group-hover:scale-105"
        />

        {/* LIKE BUTTON */}
        <button
          type="button"
          onClick={() => setLiked((prev) => !prev)}
          aria-label={liked ? "Remove from favorites" : "Add to favorites"}
          className="absolute right-3 top-3 flex items-center justify-center h-10 w-10 bg-black/60 rounded-full backdrop-blur-sm transition hover:bg-black/80"
        >
          <Heart
            size={19}
            className={
              liked
                ? "fill-red-500 text-red-500"
                : "text-white"
            }
          />
        </button>
      </div>

      {/* DETAILS */}
      <div className="p-4">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <h3 className="text-base font-semibold text-white truncate">
              {nft.name}
            </h3>

            <p className="mt-1 text-sm text-gray-500">
              By {nft.creator}
            </p>
          </div>

          <div className="text-right shrink-0">
            <p className="text-xs text-gray-500">
              Price
            </p>

            <p className="mt-1 whitespace-nowrap text-sm font-semibold text-white">
              {nft.price} ETH
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

// =========================================================
// USER PROFILE
// =========================================================

const UserProfile = () => {
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState("Owned");

  const tabs = [
    "Owned",
    "Created",
    "Favorites",
    "Activity",
  ];

  // =========================================================
  // COPY WALLET
  // =========================================================

  const copyWallet = async () => {
    try {
      await navigator.clipboard.writeText(
        "0x72A5F8B91C8D6E4F2A91"
      );

      alert("Wallet address copied!");
    } catch (error) {
      console.log(error);
    }
  };

  // =========================================================
  // SHARE PROFILE
  // =========================================================

  const shareProfile = async () => {
    try {
      if (navigator.share) {
        await navigator.share({
          title: "NFT Marketplace Profile",
          text: "Check out this NFT profile!",
          url: window.location.href,
        });
      } else {
        await navigator.clipboard.writeText(
          window.location.href
        );

        alert("Profile link copied!");
      }
    } catch (error) {
      console.log("Share cancelled");
    }
  };

  // =========================================================
  // EDIT PROFILE
  // =========================================================

  const handleEditProfile = () => {
    navigate("/edit-profile");
  };

  return (
    <div className="min-h-screen text-white bg-black">

      {/* =====================================================
          NAVBAR
      ===================================================== */}

      <Navbar />

      {/* =====================================================
          COVER
      ===================================================== */}

      <section className="overflow-hidden relative h-[220px] w-full sm:h-[280px] lg:h-[350px]">

        {/* Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#25113F] via-[#171717] to-[#000000]" />

        {/* Purple Glow */}
        <div className="absolute inset-0 opacity-30">
          <div className="absolute left-[10%] top-[20%] h-40 w-40 bg-[#A259FF] rounded-full blur-[100px]" />

          <div className="absolute right-[15%] top-[10%] h-52 w-52 bg-purple-700 rounded-full blur-[120px]" />
        </div>

        {/* Grid */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:60px_60px]" />

      </section>

      {/* =====================================================
          PROFILE CONTENT
      ===================================================== */}

      <main className="mx-auto px-5 w-full max-w-[1200px] sm:px-8 lg:px-10">

        {/* ===================================================
            PROFILE HEADER
        =================================================== */}

        <section className="relative -mt-16 sm:-mt-20 lg:-mt-24">

          <div className="flex flex-col items-center justify-between lg:flex-row items-end">

            {/* =================================================
                AVATAR + USER INFORMATION
            ================================================= */}

            <div className="flex flex-col items-center gap-6 lg:flex-row items-end">

              {/* AVATAR */}
              <div className="relative">

                <div className="overflow-hidden flex items-center justify-center h-32 w-32 bg-gradient-to-br from-[#A259FF] to-[#5D2BA8] rounded-full border-4 border-black sm:h-40 w-40">

                  <div className="flex items-center justify-center h-full w-full text-5xl font-bold text-[#A259FF] bg-[#222]">
                    NB
                  </div>

                </div>

                {/* VERIFIED */}
                <div className="absolute bottom-2 right-2 flex items-center justify-center h-7 w-7 bg-green-500 rounded-full border-2 border-black">
                  <CheckCircle2
                    size={15}
                    className="text-white"
                  />
                </div>

              </div>

              {/* USER DETAILS */}
              <div className="mt-4 text-center lg:mb-2 mt-0 text-left">

                <div className="flex items-center justify-center gap-2 lg:justify-start">

                  <h1 className="text-2xl font-bold sm:text-3xl">
                    Nitu Bisen
                  </h1>

                  <CheckCircle2
                    size={20}
                    className="text-[#A259FF]"
                  />

                </div>

                <p className="mt-1 text-sm text-gray-400">
                  @nitubisen
                </p>

                {/* WALLET */}
                <button
                  type="button"
                  onClick={copyWallet}
                  className="flex items-center justify-center gap-2 mt-3 text-sm text-gray-400 transition hover:text-white lg:justify-start"
                >
                  0x72A5...2A91

                  <Copy size={15} />
                </button>

              </div>

            </div>

            {/* =================================================
                ACTION BUTTONS
            ================================================= */}

            <div className="flex gap-3 mt-6 lg:mb-2 mt-0">

              {/* EDIT PROFILE */}
              <button
                type="button"
                onClick={handleEditProfile}
                className="flex items-center gap-2 px-5 py-3 text-sm font-semibold rounded-xl border-[#444] border transition hover:border-[#A259FF] hover:bg-[#A259FF]/10"
              >
                <Edit3 size={17} />

                Edit Profile
              </button>

              {/* SHARE */}
              <button
                type="button"
                onClick={shareProfile}
                aria-label="Share profile"
                className="flex items-center justify-center h-12 w-12 rounded-xl border-[#444] border transition hover:border-[#A259FF] hover:bg-[#A259FF]/10"
              >
                <Share2 size={18} />
              </button>

            </div>

          </div>

        </section>

        {/* =====================================================
            BIO
        ===================================================== */}

        <section className="mt-8">

          <p className="max-w-2xl text-center text-sm leading-6 text-gray-400 lg:text-left">
            Digital artist and NFT collector creating unique
            digital experiences. Exploring the future of art,
            blockchain and Web3.
          </p>

        </section>

        {/* =====================================================
            STATS
        ===================================================== */}

        <section className="grid grid-cols-2 gap-3 mt-8 sm:grid-cols-4 gap-5">

          {/* OWNED */}
          <div className="p-5 text-center bg-[#151515] rounded-2xl border-[#292929] border">
            <p className="text-2xl font-bold text-white">
              12
            </p>

            <p className="mt-1 text-sm text-gray-500">
              Owned NFTs
            </p>
          </div>

          {/* CREATED */}
          <div className="p-5 text-center bg-[#151515] rounded-2xl border-[#292929] border">
            <p className="text-2xl font-bold text-white">
              8
            </p>

            <p className="mt-1 text-sm text-gray-500">
              Created
            </p>
          </div>

          {/* FAVORITES */}
          <div className="p-5 text-center bg-[#151515] rounded-2xl border-[#292929] border">
            <p className="text-2xl font-bold text-white">
              24
            </p>

            <p className="mt-1 text-sm text-gray-500">
              Favorites
            </p>
          </div>

          {/* FOLLOWERS */}
          <div className="p-5 text-center bg-[#151515] rounded-2xl border-[#292929] border">
            <p className="text-2xl font-bold text-white">
              156
            </p>

            <p className="mt-1 text-sm text-gray-500">
              Followers
            </p>
          </div>

        </section>

        {/* =====================================================
            TABS
        ===================================================== */}

        <section className="mt-12 border-b border-[#292929]">

          <div className="overflow-x-auto flex">

            {tabs.map((tab) => (
              <button
                key={tab}
                type="button"
                onClick={() => setActiveTab(tab)}
                className={`relative min-w-[100px] shrink-0 px-5 pb-5 text-sm font-semibold transition sm:min-w-[130px] ${
                  activeTab === tab
                    ? "text-white"
                    : "text-gray-500 hover:text-white"
                }`}
              >
                {tab}

                {activeTab === tab && (
                  <span className="absolute bottom-0 left-0 h-[2px] w-full bg-[#A259FF]" />
                )}
              </button>
            ))}

          </div>

        </section>

        {/* =====================================================
            TAB CONTENT
        ===================================================== */}

        <section className="py-10">

          {/* ===================================================
              OWNED NFTS
          =================================================== */}

          {activeTab === "Owned" && (
            <>
              <div className="flex items-center justify-between mb-6">

                <h2 className="text-2xl font-bold">
                  Owned NFTs
                </h2>

                <span className="text-sm text-gray-500">
                  12 Items
                </span>

              </div>

              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">

                {OWNED_NFTS.map((nft) => (
                  <NFTCard
                    key={nft.id}
                    nft={nft}
                  />
                ))}

              </div>
            </>
          )}

          {/* ===================================================
              CREATED NFTS
          =================================================== */}

          {activeTab === "Created" && (
            <>
              <div className="mb-6">
                <h2 className="text-2xl font-bold">
                  Created NFTs
                </h2>
              </div>

              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">

                {CREATED_NFTS.map((nft) => (
                  <NFTCard
                    key={nft.id}
                    nft={nft}
                  />
                ))}

              </div>
            </>
          )}

          {/* ===================================================
              FAVORITES
          =================================================== */}

          {activeTab === "Favorites" && (
            <>
              <div className="mb-6">
                <h2 className="text-2xl font-bold">
                  Favorite NFTs
                </h2>
              </div>

              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">

                {FAVORITE_NFTS.map((nft) => (
                  <NFTCard
                    key={nft.id}
                    nft={nft}
                  />
                ))}

              </div>
            </>
          )}

          {/* ===================================================
              ACTIVITY
          =================================================== */}

          {activeTab === "Activity" && (
            <>
              <div className="flex items-center justify-between mb-6">

                <h2 className="text-2xl font-bold">
                  Activity
                </h2>

                <button
                  type="button"
                  className="text-sm text-[#A259FF] transition hover:text-[#C084FC]"
                >
                  View All
                </button>

              </div>

              <div className="overflow-hidden bg-[#151515] rounded-2xl border-[#292929] border">

                {ACTIVITIES.map((activity, index) => {
                  const Icon = activity.icon;

                  return (
                    <div
                      key={activity.id}
                      className={`flex items-center gap-4 p-5 ${
                        index !== ACTIVITIES.length - 1
                          ? "border-b border-[#292929]"
                          : ""
                      }`}
                    >

                      {/* ICON */}
                      <div className="flex items-center justify-center h-12 w-12 bg-[#A259FF]/10 rounded-full shrink-0">
                        <Icon
                          size={20}
                          className="text-[#A259FF]"
                        />
                      </div>

                      {/* ACTIVITY INFO */}
                      <div className="flex-1 min-w-0">

                        <p className="text-sm text-gray-400">
                          {activity.type}
                        </p>

                        <p className="mt-1 font-semibold text-white truncate">
                          {activity.title}
                        </p>

                      </div>

                      {/* PRICE */}
                      <div className="text-right">

                        <p className="text-sm font-semibold text-white">
                          {activity.price}
                        </p>

                        <p className="mt-1 text-xs text-gray-500">
                          {activity.time}
                        </p>

                      </div>

                      {/* MORE */}
                      <button
                        type="button"
                        aria-label="More activity options"
                        className="hidden text-gray-500 transition hover:text-white sm:block"
                      >
                        <MoreHorizontal size={20} />
                      </button>

                    </div>
                  );
                })}

              </div>
            </>
          )}

        </section>

      </main>

      {/* =====================================================
          FOOTER
      ===================================================== */}

      <Footer />

    </div>
  );
};

export default UserProfile;