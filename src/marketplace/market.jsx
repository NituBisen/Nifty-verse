import React, { useState } from "react";
import { Search } from "lucide-react";
import { useNavigate } from "react-router-dom";

import Navbar from "../common/Navbar";
import Footer from "../common/Footer";

/* ==================================================
   NFT IMAGE IMPORTS
================================================== */

import nft1 from "../assets/images/marketplace/nft1.png";
import nft2 from "../assets/images/marketplace/nft2.png";
import nft3 from "../assets/images/marketplace/nft3.png";
import nft4 from "../assets/images/marketplace/nft4.png";
import nft5 from "../assets/images/marketplace/nft5.png";
import nft6 from "../assets/images/marketplace/nft6.png";
import nft7 from "../assets/images/marketplace/nft7.png";
import nft8 from "../assets/images/marketplace/nft8.png";
import nft9 from "../assets/images/marketplace/nft9.png";
import nft10 from "../assets/images/marketplace/nft10.png";
import nft11 from "../assets/images/marketplace/nft11.png";
import nft12 from "../assets/images/marketplace/nft12.png";

/* ==================================================
   AVATAR IMAGE IMPORTS
================================================== */

import avatar1 from "../assets/images/avatars/avatar1.png";
import avatar2 from "../assets/images/avatars/avatar2.png";
import avatar3 from "../assets/images/avatars/avatar3.png";
import avatar4 from "../assets/images/avatars/avatar4.png";
import avatar5 from "../assets/images/avatars/avatar5.png";
import avatar6 from "../assets/images/avatars/avatar6.png";
import avatar7 from "../assets/images/avatars/avatar7.png";
import avatar8 from "../assets/images/avatars/avatar8.png";
import avatar9 from "../assets/images/avatars/avatar9.png";
import avatar10 from "../assets/images/avatars/avatar10.png";
import avatar11 from "../assets/images/avatars/avatar11.png";

/* ==================================================
   NFT DATA
================================================== */

const NFT_ITEMS = [
  {
    id: 1,
    image: nft1,
    avatar: avatar1,
    name: "Magic Mushroom 0325",
    creator: "Shroomie",
    price: "1.63 ETH",
    bid: "0.33 wETH",
  },
  {
    id: 2,
    image: nft2,
    avatar: avatar2,
    name: "Happy Robot 032",
    creator: "BeKind2Robots",
    price: "1.63 ETH",
    bid: "0.33 wETH",
  },
  {
    id: 3,
    image: nft3,
    avatar: avatar2,
    name: "Happy Robot 024",
    creator: "BeKind2Robots",
    price: "1.63 ETH",
    bid: "0.33 wETH",
  },
  {
    id: 4,
    image: nft4,
    avatar: avatar3,
    name: "Designer Bear",
    creator: "MrFox",
    price: "1.63 ETH",
    bid: "0.33 wETH",
  },
  {
    id: 5,
    image: nft5,
    avatar: avatar4,
    name: "Colorful Dog 0356",
    creator: "Keepitreal",
    price: "1.63 ETH",
    bid: "0.33 wETH",
  },
  {
    id: 6,
    image: nft6,
    avatar: avatar5,
    name: "Dancing Robot 0312",
    creator: "Robotica",
    price: "1.63 ETH",
    bid: "0.33 wETH",
  },
  {
    id: 7,
    image: nft7,
    avatar: avatar6,
    name: "Cherry Blossom Girl 035",
    creator: "MoonDancer",
    price: "1.63 ETH",
    bid: "0.33 wETH",
  },
  {
    id: 8,
    image: nft8,
    avatar: avatar7,
    name: "Space Travel",
    creator: "NebulaKid",
    price: "1.63 ETH",
    bid: "0.33 wETH",
  },
  {
    id: 9,
    image: nft9,
    avatar: avatar8,
    name: "Sunset Dimension",
    creator: "Animakid",
    price: "1.63 ETH",
    bid: "0.33 wETH",
  },
  {
    id: 10,
    image: nft10,
    avatar: avatar9,
    name: "Desert Walk",
    creator: "Catch 22",
    price: "1.63 ETH",
    bid: "0.33 wETH",
  },
  {
    id: 11,
    image: nft11,
    avatar: avatar10,
    name: "IceCream Ape 0324",
    creator: "Ice Ape Club",
    price: "1.63 ETH",
    bid: "0.33 wETH",
  },
  {
    id: 12,
    image: nft12,
    avatar: avatar11,
    name: "Colorful Dog 0344",
    creator: "PuppyPower",
    price: "1.63 ETH",
    bid: "0.33 wETH",
  },
];

/* ==================================================
   NFT CARD COMPONENT
================================================== */

function NFTCard({ item, onClick }) {
  return (
    <article
      onClick={onClick}
      role="button"
      tabIndex={0}
      onKeyDown={(event) => {
        if (event.key === "Enter" || event.key === " ") {
          onClick();
        }
      }}
      className="
        group
        h-[469px]
        w-full
        min-w-0
        cursor-pointer
        overflow-hidden
        rounded-[20px]
        bg-[#2B2B2B]
        transition-transform
        duration-200
        hover:-translate-y-1
        focus:outline-none
        focus:ring-2
        focus:ring-[#A259FF]
      "
    >
      {/* NFT IMAGE */}
      <div className="h-[295px] w-full overflow-hidden rounded-t-[20px]">
        <img
          src={item.image}
          alt={item.name}
          className="
            h-full
            w-full
            object-cover
            transition-transform
            duration-300
            group-hover:scale-105
          "
        />
      </div>

      {/* NFT INFO */}
      <div
        className="
          flex
          h-[173px]
          flex-col
          gap-[25px]
          px-[30px]
          pb-[25px]
          pt-[20px]
        "
      >
        {/* ARTIST INFO */}
        <div className="flex h-[60px] flex-col gap-[5px]">
          {/* NFT NAME */}
          <h3
            className="
              truncate
              font-['Work Sans']
              text-[22px]
              font-semibold
              capitalize
              leading-[140%]
              text-white
            "
          >
            {item.name}
          </h3>

          {/* AVATAR + ARTIST NAME */}
          <div className="flex h-[24px] w-full items-center gap-[12px]">
            <img
              src={item.avatar}
              alt={item.creator}
              className="h-[24px] w-[24px] shrink-0 rounded-full object-cover"
            />

            <p
              className="
                truncate
                font-['Space Mono']
                text-[16px]
                font-normal
                leading-[140%]
                text-white
              "
            >
              {item.creator}
            </p>
          </div>
        </div>

        {/* ADDITIONAL INFO */}
        <div className="flex h-[43px] w-full justify-between">
          {/* PRICE */}
          <div className="flex w-1/2 flex-col gap-[8px]">
            <span
              className="
                font-['Space Mono']
                text-[12px]
                font-normal
                leading-[110%]
                text-[#858584]
              "
            >
              Price
            </span>

            <span
              className="
                font-['Space Mono']
                text-[16px]
                font-normal
                leading-[140%]
                text-white
              "
            >
              {item.price}
            </span>
          </div>

          {/* HIGHEST BID */}
          <div className="flex w-1/2 flex-col items-end gap-[8px]">
            <span
              className="
                font-['Space Mono']
                text-[12px]
                font-normal
                leading-[110%]
                text-[#858584]
              "
            >
              Highest Bid
            </span>

            <span
              className="
                font-['Space Mono']
                text-[16px]
                font-normal
                leading-[140%]
                text-white
              "
            >
              {item.bid}
            </span>
          </div>
        </div>
      </div>
    </article>
  );
}

/* ==================================================
   MARKET COMPONENT
================================================== */

const Market = () => {
  const [searchTerm, setSearchTerm] = useState("");

  // NFT detail page par navigate karne ke liye
  const navigate = useNavigate();

  /* ==================================================
     SEARCH FILTER
  ================================================== */

  const filteredNFTs = NFT_ITEMS.filter((item) => {
    const searchValue = searchTerm.toLowerCase();

    return (
      item.name.toLowerCase().includes(searchValue) ||
      item.creator.toLowerCase().includes(searchValue)
    );
  });

  return (
    <>
      {/* NAVBAR */}
      <Navbar />

      {/* MARKETPLACE HERO SECTION */}
      <section className="w-full bg-[#2B2B2B]">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 md:py-20 lg:px-10">
          <div className="flex flex-col gap-8">
            {/* HEADING */}
            <div className="text-left">
              <h1 className="text-4xl font-bold leading-tight text-white sm:text-5xl md:text-6xl">
                Browse Marketplace
              </h1>

              <p className="mt-4 max-w-2xl text-xl leading-relaxed text-gray-300 sm:text-lg md:text-xl">
                Browse through more than 50k NFTs on the NFT Marketplace.
              </p>
            </div>

            {/* SEARCH BAR */}
            <div className="relative w-full">
              <input
                type="text"
                value={searchTerm}
                onChange={(event) => setSearchTerm(event.target.value)}
                placeholder="Search your favourite NFTs"
                className="
                  w-full
                  rounded-2xl
                  border
                  border-[#3A3A3A]
                  bg-transparent
                  px-5
                  py-4
                  pr-14
                  text-sm
                  text-white
                  outline-none
                  transition-colors
                  duration-200
                  placeholder:text-gray-500
                  focus:border-[#A259FF]
                  sm:text-base
                "
              />

              <Search className="absolute right-5 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-300" />
            </div>
          </div>
        </div>
      </section>

      {/* FULL WIDTH DIVIDER */}
      <div className="h-px w-full bg-[#3B3B3B]" />

      {/* MARKETPLACE TABS SECTION */}
      <section className="w-full bg-[#2B2B2B]">
        <div className="h-px w-full border-t border-[#3B3B3B]" />

        <div className="flex h-[70px] w-full items-center justify-center gap-[10px] bg-[#2B2B2B]">
          <div className="flex h-[60px] w-full max-w-[1050px]">
            <button
              type="button"
              className="
                flex
                h-[60px]
                w-1/2
                items-center
                justify-center
                gap-4
                border-b-2
                border-[#858584]
                px-[30px]
              "
            >
              <span
                className="
                  font-['Work Sans']
                  text-[22px]
                  font-semibold
                  leading-[140%]
                  capitalize
                  text-white
                "
              >
                NFTs
              </span>

              <span
                className="
                  flex
                  h-8
                  min-w-[50px]
                  items-center
                  justify-center
                  rounded-[20px]
                  bg-[#858584]
                  px-[10px]
                  py-[5px]
                  font-['Space Mono']
                  text-base
                  font-normal
                  leading-[140%]
                  text-white
                "
              >
                302
              </span>
            </button>

            <button
              type="button"
              className="
                flex
                h-[60px]
                w-1/2
                items-center
                justify-center
                gap-4
                border-b-2
                border-transparent
                px-[30px]
              "
            >
              <span
                className="
                  font-['Work Sans']
                  text-[22px]
                  font-semibold
                  leading-[140%]
                  capitalize
                  text-[#858584]
                "
              >
                Collections
              </span>

              <span
                className="
                  flex
                  h-8
                  min-w-[40px]
                  items-center
                  justify-center
                  rounded-[20px]
                  bg-[#3B3B3B]
                  px-[10px]
                  py-[5px]
                  font-['Space_Mono']
                  text-base
                  font-normal
                  leading-[140%]
                  text-white
                "
              >
                67
              </span>
            </button>
          </div>
        </div>
      </section>

      {/* NFT CARDS SECTION */}
      <section className="w-full bg-[#3B3B3B] pb-[80px] pt-[60px]">
        <div
          className="
            mx-auto
            grid
            w-full
            max-w-[1050px]
            grid-cols-1
            gap-[30px]
            px-5
            sm:grid-cols-2
            lg:grid-cols-3
            lg:px-0
          "
        >
          {filteredNFTs.map((item) => (
            <NFTCard
              key={item.id}
              item={item}
              onClick={() => navigate(`/nft/${item.id}`)}
            />
          ))}
        </div>
      </section>

      {/* FOOTER */}
      <Footer />
    </>
  );
};

export default Market;