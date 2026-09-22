import React, { useState } from "react";
import {
  Copy,
  Plus,
  Globe,
  MessageCircle,
} from "lucide-react";

/* ==================================================
   ARTIST PROFILE IMAGES
================================================== */
import coverImage from "../assets/icons/animakid-cover.png";
import profileImage from "../assets/icons/animakid-avatar.png";

/* ==================================================
   NFT IMAGES
================================================== */
import distantGalaxy from "../assets/browse/distant-galaxy.png";
import lifeOnEdena from "../assets/browse/life-on-edena.png";
import astroFiction from "../assets/browse/astrofiction.png";
import cryptoCity from "../assets/browse/crypto-city.png";
import colorfulDog from "../assets/browse/colorful-dog-0524.png";
import spaceTales from "../assets/browse/space-tales.png";
import cherryBlossomGirl from "../assets/browse/cherry-blossom-girl-037.png";
import dancingRobots from "../assets/browse/dancing-robots-0987.png";
import iceCreamApe from "../assets/browse/icecream-ape.png";

/* ==================================================
   CREATOR AVATAR
================================================== */
import animakidAvatar from "../assets/icons/animakid-avatar.png";

/* ==================================================
   ARTIST STATS
================================================== */
const stats = [
  {
    value: "250k+",
    label: "Volume",
  },
  {
    value: "50+",
    label: "NFTs Sold",
  },
  {
    value: "3000+",
    label: "Followers",
  },
];

/* ==================================================
   SOCIAL LINKS
================================================== */
const links = [
  {
    icon: Globe,
    label: "Website",
  },
  {
    icon: MessageCircle,
    label: "Discord",
  },
];

/* ==================================================
   TABS
================================================== */
const tabs = [
  {
    name: "Created",
    count: 302,
  },
  {
    name: "Owned",
    count: 67,
  },
  {
    name: "Collection",
    count: 4,
  },
];

/* ==================================================
   NFT DATA
================================================== */
const nfts = [
  {
    name: "Distant Galaxy",
    creator: "Animakid",
    price: "1.63 ETH",
    highestBid: "0.33 wETH",
    image: distantGalaxy,
    avatar: animakidAvatar,
  },
  {
    name: "Life On Edena",
    creator: "Animakid",
    price: "1.63 ETH",
    highestBid: "0.33 wETH",
    image: lifeOnEdena,
    avatar: animakidAvatar,
  },
  {
    name: "AstroFiction",
    creator: "Animakid",
    price: "1.63 ETH",
    highestBid: "0.33 wETH",
    image: astroFiction,
    avatar: animakidAvatar,
  },
  {
    name: "CryptoCity",
    creator: "Animakid",
    price: "1.63 ETH",
    highestBid: "0.33 wETH",
    image: cryptoCity,
    avatar: animakidAvatar,
  },
  {
    name: "ColorfulDog 0524",
    creator: "Animakid",
    price: "1.63 ETH",
    highestBid: "0.33 wETH",
    image: colorfulDog,
    avatar: animakidAvatar,
  },
  {
    name: "Space Tales",
    creator: "Animakid",
    price: "1.63 ETH",
    highestBid: "0.33 wETH",
    image: spaceTales,
    avatar: animakidAvatar,
  },
  {
    name: "Cherry Blossom Girl 037",
    creator: "Animakid",
    price: "1.63 ETH",
    highestBid: "0.33 wETH",
    image: cherryBlossomGirl,
    avatar: animakidAvatar,
  },
  {
    name: "Dancing Robots 0987",
    creator: "Animakid",
    price: "1.63 ETH",
    highestBid: "0.33 wETH",
    image: dancingRobots,
    avatar: animakidAvatar,
  },
  {
    name: "IceCream Ape",
    creator: "Animakid",
    price: "1.63 ETH",
    highestBid: "0.33 wETH",
    image: iceCreamApe,
    avatar: animakidAvatar,
  },
];

/* ==================================================
   NFT CARD
================================================== */
const NFTCard = ({ nft }) => {
  return (
    <article
      className="overflow-hidden mx-auto w-full max-w-[330px] bg-[#2B2B2B] rounded-[16px] transition-colors duration-200 hover:bg-[#333333]"
    >
      {/* ==================================================
          NFT IMAGE
      ================================================== */}
      <div className="overflow-hidden h-[295px] w-full">
        <img
          src={nft.image}
          alt={nft.name}
          className="object-cover block h-[295px] w-full"
        />
      </div>

      {/* ==================================================
          NFT CONTENT
      ================================================== */}
      <div className="px-4 py-4">

        {/* NFT NAME */}
        <h3
          className="text-base font-semibold leading-tight text-white truncate"
          title={nft.name}
        >
          {nft.name}
        </h3>

        {/* ==================================================
            CREATOR
        ================================================== */}
        <div className="flex items-center gap-2 mt-2 min-w-0">
          <img
            src={nft.avatar}
            alt={nft.creator}
            className="object-cover h-5 w-5 rounded-full shrink-0"
          />

          <span
            className="text-xs text-gray-300 truncate sm:text-sm"
          >
            {nft.creator}
          </span>
        </div>

        {/* ==================================================
            PRICE / HIGHEST BID
        ================================================== */}
        <div
          className="flex items-end justify-between gap-3 mt-4"
        >
          {/* PRICE */}
          <div className="min-w-0">
            <p
              className="text-[10px] leading-tight text-gray-500 sm:text-xs"
            >
              Price
            </p>

            <p
              className="mt-1 whitespace-nowrap text-xs text-white sm:text-sm"
            >
              {nft.price}
            </p>
          </div>

          {/* HIGHEST BID */}
          <div className="min-w-0 text-right">
            <p
              className="whitespace-nowrap text-[10px] leading-tight text-gray-500 sm:text-xs"
            >
              Highest Bid
            </p>

            <p
              className="mt-1 whitespace-nowrap text-xs text-white sm:text-sm"
            >
              {nft.highestBid}
            </p>
          </div>
        </div>
      </div>
    </article>
  );
};

/* ==================================================
   ARTIST PAGE
================================================== */
const Artist = () => {
  const [activeTab, setActiveTab] = useState("Created");

  /* ==================================================
     COPY WALLET ADDRESS
  ================================================== */
  const handleCopyAddress = async () => {
    try {
      await navigator.clipboard.writeText("0xc0E3...B79C");
    } catch (error) {
      console.error("Unable to copy wallet address:", error);
    }
  };

  return (
    <main className="overflow-x-hidden min-h-screen w-full bg-[#000000]">

      {/* ==================================================
          MAIN CONTAINER
      ================================================== */}
      <div className="mx-auto w-full max-w-[1200px]">

        {/* ==================================================
            COVER BANNER
        ================================================== */}
        <section className="relative w-full">

          <div
            className="overflow-hidden relative h-[160px] w-full sm:h-[220px] md:h-[260px] lg:h-[300px]"
          >
            {/* ORIGINAL IMAGE */}
            <img
              src={coverImage}
              alt="Animakid cover"
              className="object-cover object-center absolute inset-0 h-full w-full"
            />

            {/* PURPLE GRADIENT OVERLAY */}
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                background:
                  "linear-gradient(180deg, rgba(151, 71, 255, 0) 21.88%, #9747FF 95.31%)",
              }}
            />
          </div>

          {/* ==================================================
              PROFILE AVATAR
          ================================================== */}
          <div
            className="absolute bottom-[-42px] left-1/2 left-[105px] translate-x-0 -translate-x-1/2 sm:bottom-[-58px]"
          >
            <img
              src={profileImage}
              alt="Animakid"
              className="object-cover h-[85px] w-[85px] w-[100px] w-[115px] rounded-[18px] border-4 border-[#2B2B2B] sm:h-[100px] lg:h-[115px]"
            />
          </div>
        </section>

        {/* ==================================================
            PROFILE INFORMATION
        ================================================== */}
        <section
          className="px-4 pb-10 pt-16 pb-12 pt-20 sm:px-6 lg:px-8"
        >
          <div className="flex flex-col gap-8 sm:gap-10">

            {/* ==================================================
                NAME + BUTTONS
            ================================================== */}
            <div
              className="flex flex-col items-center justify-between gap-5 sm:flex-row"
            >
              <h1
                className="text-center text-3xl font-bold leading-tight text-white text-4xl sm:text-left lg:text-[46px]"
              >
                Animakid
              </h1>

              {/* BUTTONS */}
              <div
                className="flex items-center justify-center gap-3 w-full w-auto sm:justify-end"
              >
                {/* WALLET BUTTON */}
                <button
                  type="button"
                  onClick={handleCopyAddress}
                  className="inline-flex items-center justify-center gap-2 px-3 h-[56px] w-[175px] text-sm font-semibold text-white bg-[#6f2fc4] rounded-[18px] transition-opacity duration-200 shrink-0 hover:opacity-90 sm:text-base"
                >
                  <Copy className="h-4 w-4 shrink-0" />

                  <span>0xc0E3...B79C</span>
                </button>

                {/* FOLLOW BUTTON */}
                <button
                  type="button"
                  className="inline-flex items-center justify-center gap-2 px-3 h-[56px] w-[135px] text-sm font-semibold text-white bg-transparent rounded-[18px] border-2 border-[#A259FF] transition-colors duration-200 shrink-0 hover:bg-[#A259FF]/10 sm:text-base"
                >
                  <Plus className="h-4 w-4 shrink-0" />

                  <span>Follow</span>
                </button>
              </div>
            </div>

            {/* ==================================================
                STATS
            ================================================== */}
            <div
              className="grid grid-cols-3 items-center gap-3 gap-10 sm:flex"
            >
              {stats.map((stat) => (
                <div
                  key={stat.label}
                  className="min-w-0 text-center sm:text-left"
                >
                  <p
  className="text-[30px] font-bold text-transparent bg-[linear-gradient(90deg,#00D9FF_10%,#087CFF_20%,#8B2CFF_70%,#F000FF_100%)] bg-clip-text sm:text-[35px]"
>
  {stat.value}
</p>

                  <p
                    className="mt-1 whitespace-nowrap text-xs text-[#d5bc57] sm:text-base lg:text-xl"
                  >
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>

            {/* ==================================================
                BIO
            ================================================== */}
            <div className="text-center sm:text-left">
              <h2
                className="text-sm font-bold tracking-wide text-gray-400 sm:text-base"
              >
                Bio
              </h2>

              <p
                className="mt-2 text-sm leading-relaxed text-gray-200 sm:text-lg"
              >
                The Internet's Friendliest Designer Kid.
              </p>
            </div>

            {/* ==================================================
                LINKS
            ================================================== */}
            <div className="text-center sm:text-left">
              <h2
                className="text-sm font-bold tracking-wide text-gray-400 sm:text-base"
              >
                Links
              </h2>

              <div
                className="flex items-center justify-center gap-5 mt-3 sm:justify-start"
              >
                {links.map(({ icon: Icon, label }) => (
                  <a
                    key={label}
                    href="#"
                    aria-label={label}
                    className="text-gray-400 transition-colors duration-200 hover:text-[#A259FF]"
                  >
                    <Icon className="h-6 w-6" />
                  </a>
                ))}

                {/* YOUTUBE */}
                <a
                  href="#"
                  aria-label="YouTube"
                  className="text-xl font-bold text-gray-400 transition-colors hover:text-[#A259FF]"
                >
                  ▶
                </a>

                {/* TWITTER / X */}
                <a
                  href="#"
                  aria-label="Twitter"
                  className="text-xl font-bold text-gray-400 transition-colors hover:text-[#A259FF]"
                >
                  𝕏
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* ==================================================
            TABS
        ================================================== */}
        <section className="border-t border-white/10">
          <div className="flex w-full">

            {tabs.map((tab) => {
              const isActive = tab.name === activeTab;

              return (
                <button
                  key={tab.name}
                  type="button"
                  onClick={() => setActiveTab(tab.name)}
                  className={`
                    flex
                    min-w-0
                    flex-1
                    items-center
                    justify-center
                    gap-1
                    border-b-2
                    px-1
                    py-4
                    text-xs
                    font-bold
                    transition-colors
                    duration-200

                    sm:gap-2
                    sm:py-5
                    sm:text-base

                    ${
                      isActive
                        ? "border-white text-white"
                        : "border-transparent text-gray-400 hover:text-gray-200"
                    }
                  `}
                >
                  <span className="truncate">
                    {tab.name}
                  </span>

                  <span
                    className={`
                      shrink-0
                      rounded-full
                      px-2
                      py-0.5
                      text-[10px]
                      font-semibold

                      sm:text-sm

                      ${
                        isActive
                          ? "bg-gray-400/40 text-white"
                          : "bg-gray-700/60 text-gray-300"
                      }
                    `}
                  >
                    {tab.count}
                  </span>
                </button>
              );
            })}
          </div>
        </section>

        {/* ==================================================
            CREATED NFTS
        ================================================== */}
        {activeTab === "Created" && (
          <section
            className="px-4 py-10 py-12 py-14 w-full bg-[#000000] sm:px-6 lg:px-8"
          >
            <div
              className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3"
            >
              {nfts.map((nft) => (
                <NFTCard
                  key={nft.name}
                  nft={nft}
                />
              ))}
            </div>
          </section>
        )}

        {/* ==================================================
            OWNED
        ================================================== */}
        {activeTab === "Owned" && (
          <section
            className="flex items-center justify-center px-4 py-16 min-h-[300px] bg-[#3B3B3B]"
          >
            <p className="text-center text-lg text-gray-400">
              Owned NFTs
            </p>
          </section>
        )}

        {/* ==================================================
            COLLECTION
        ================================================== */}
        {activeTab === "Collection" && (
          <section
            className="flex items-center justify-center px-4 py-16 min-h-[300px] bg-[#3B3B3B]"
          >
            <p className="text-center text-lg text-gray-400">
              Collections
            </p>
          </section>
        )}

      </div>
    </main>
  );
};

export default Artist;