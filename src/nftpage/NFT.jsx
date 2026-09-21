import React from "react";
import { Link, useParams } from "react-router-dom";

import Navbar from "../common/Navbar";
import Footer from "../common/Footer";

/* ==================================================
   NFT IMAGE IMPORTS
================================================== */

import orbitian1 from "../assets/images/orbitian/orbitian1.png";
import orbitian2 from "../assets/images/orbitian/orbitian2.png";
import orbitian3 from "../assets/images/orbitian/orbitian3.png";
import orbitian4 from "../assets/images/orbitian/orbitian4.png";
import orbitian5 from "../assets/images/orbitian/orbitian5.png";
import orbitian6 from "../assets/images/orbitian/orbitian6.png";
import orbitian7 from "../assets/images/orbitian/orbitian7.png";
import orbitian8 from "../assets/images/orbitian/orbitian8.png";
import orbitian9 from "../assets/images/orbitian/orbitian9.png";
import astronautfloating from "../assets/images/orbitian/astronautfloating.png";


/* ==================================================
   AVATAR IMAGE IMPORTS
================================================== */

import orbitianavatar from "../assets/images/orbitian-avatar-img/orbitianavatar.png";



/* ==================================================
   NFT DATA
================================================== */

const NFT_ITEMS = [
  {
    id: 1,
    image: orbitian1,
    avatar: orbitianavatar,
    name: "The Orbitian",
    creator: "Orbitian",
    price: "1.63 ETH",
    bid: "0.33 wETH",
    date: "Sep 30, 2022",
    description: [
      "The Orbitian is a collection of 10,000 unique NFTs on the Ethereum blockchain.",
      "There are all sorts of beings in the NFT Universe. The most advanced and friendly of them are the Orbitians.",
      "They live in a metal space machines, high up in the sky and only have one foot on Earth.",
      "These Orbitian are a peaceful race, but they have been at war with a group of invaders for many generations.",
      "The invaders are called Upside-Downs, because of their inverted bodies that live on the ground, yet do not know any other way to be.",
      "Upside-Downs believe that they will be able to win this war if they could only get an eye into Orbitian territory, so they've taken to make human beings their target.",
    ],
  },
  {
    id: 2,
    image: orbitian2,
    avatar: orbitianavatar,
    name: "Happy Robot 032",
    creator: "BeKind2Robots",
    price: "1.63 ETH",
    bid: "0.33 wETH",
    date: "Sep 30, 2022",
    description: [
      "Happy Robot 032 is a unique digital collectible created for the NFT Universe.",
      "This artwork represents a futuristic robot with a colorful personality.",
      "Explore the world of digital art and discover more details about this collection.",
    ],
  },
  {
    id: 3,
    image: orbitian3,
    avatar: orbitianavatar,
    name: "Happy Robot 024",
    creator: "BeKind2Robots",
    price: "1.63 ETH",
    bid: "0.33 wETH",
    date: "Sep 30, 2022",
    description: [
      "Happy Robot 024 is a futuristic digital artwork from the NFT collection.",
      "This collectible combines creative design with a modern digital art style.",
      "Own a unique piece of the NFT Universe.",
    ],
  },
  {
    id: 4,
    image: orbitian4,
    avatar: orbitianavatar,
    name: "Designer Bear",
    creator: "MrFox",
    price: "1.63 ETH",
    bid: "0.33 wETH",
    date: "Sep 30, 2022",
    description: [
      "Designer Bear is a unique digital artwork from the NFT Marketplace.",
      "This collectible is designed with a creative and colorful visual identity.",
      "Explore the artwork and discover more about the creator.",
    ],
  },
  {
    id: 5,
    image: orbitian5,
    avatar: orbitianavatar,
    name: "Colorful Dog 0356",
    creator: "Keepitreal",
    price: "1.63 ETH",
    bid: "0.33 wETH",
    date: "Sep 30, 2022",
    description: [
      "Colorful Dog 0356 is a unique digital collectible.",
      "This artwork features a colorful character created for the NFT Universe.",
      "Discover more digital artworks from this creator.",
    ],
  },
  {
    id: 6,
    image: orbitian6,
    avatar: orbitianavatar,
    name: "Dancing Robot 0312",
    creator: "Robotica",
    price: "1.63 ETH",
    bid: "0.33 wETH",
    date: "Sep 30, 2022",
    description: [
      "Dancing Robot 0312 is a futuristic digital collectible.",
      "The artwork showcases a creative robot character in a colorful universe.",
      "Explore more unique NFT artworks from this collection.",
    ],
  },
  {
    id: 7,
    image: orbitian7,
    avatar: orbitianavatar,
    name: "Cherry Blossom Girl 035",
    creator: "MoonDancer",
    price: "1.63 ETH",
    bid: "0.33 wETH",
    date: "Sep 30, 2022",
    description: [
      "Cherry Blossom Girl 035 is a unique digital artwork.",
      "This collectible combines beautiful colors and modern illustration.",
      "Discover the story behind this digital character.",
    ],
  },
  {
    id: 8,
    image: orbitian8,
    avatar: orbitianavatar,
    name: "Space Travel",
    creator: "NebulaKid",
    price: "1.63 ETH",
    bid: "0.33 wETH",
    date: "Sep 30, 2022",
    description: [
      "Space Travel is a digital artwork inspired by futuristic space adventures.",
      "Explore the NFT Universe through this unique collectible.",
      "This artwork is part of a creative digital collection.",
    ],
  },
  {
    id: 9,
    image: orbitian9,
    avatar: orbitianavatar,
    name: "Sunset Dimension",
    creator: "Animakid",
    price: "1.63 ETH",
    bid: "0.33 wETH",
    date: "Sep 30, 2022",
    description: [
      "Sunset Dimension is a colorful digital collectible.",
      "This artwork represents a beautiful futuristic dimension.",
      "Discover more artwork from this creator.",
    ],
  },
];

/* ==================================================
   NFT DETAIL PAGE
================================================== */

function NFTPage() {
  const { id } = useParams();

  const currentNFT =
    NFT_ITEMS.find((item) => item.id === Number(id)) || NFT_ITEMS[0];

  const relatedNFTs = NFT_ITEMS.filter(
    (item) => item.creator === currentNFT.creator && item.id !== currentNFT.id
  );

  const finalRelatedNFTs =
    relatedNFTs.length > 0
      ? relatedNFTs
      : NFT_ITEMS.filter((item) => item.id !== currentNFT.id).slice(0, 9);

  return (
    <div className="min-h-screen bg-[#2B2B2B] text-white">
      {/* NAVBAR */}
      <Navbar />

      {/* HERO NFT IMAGE */}
      <section className="w-full bg-[#2B2B2B]">
        <div className="mx-auto w-full max-w-[1280px]">
          <img
            src={astronautFloating}
            alt="The Orbitian"
            className="
              h-[320px]
              w-full
              object-cover
              sm:h-[450px]
              md:h-[550px]
              lg:h-[650px]
            "
          />
        </div>
      </section>

      {/* NFT DETAILS */}
      <section className="w-full bg-[#2B2B2B]">
        <div
          className="
            mx-auto
            grid
            max-w-[1050px]
            gap-10
            px-5
            py-10
            sm:px-8
            md:grid-cols-[1fr_350px]
            md:gap-12
            md:py-12
            lg:px-0
          "
        >
          {/* LEFT CONTENT */}
          <div className="min-w-0">
            {/* NFT TITLE */}
            <h1
              className="
                font-['Work_Sans']
                text-3xl
                font-semibold
                leading-tight
                sm:text-4xl
                md:text-5xl
              "
            >
              {currentNFT.name}
            </h1>

            <p className="mt-3 text-sm text-[#858584] sm:text-base">
              Minted On Sep 30, 2022
            </p>

            {/* CREATED BY */}
            <div className="mt-8">
              <p
                className="
                  font-['Space_Mono']
                  text-sm
                  font-bold
                  text-[#858584]
                "
              >
                Created By
              </p>

              <div className="mt-3 flex items-center gap-3">
                <img
                  src={currentNFT.avatar}
                  alt={currentNFT.creator}
                  className="h-8 w-8 rounded-full object-cover"
                />

                <p className="font-['Work Sans'] text-base font-semibold">
                  {currentNFT.creator}
                </p>
              </div>
            </div>

            {/* DESCRIPTION */}
            <div className="mt-8">
              <h2
                className="
                  font-['Space Mono']
                  text-sm
                  font-bold
                  text-[#858584]
                "
              >
                Description
              </h2>

              <div className="mt-4 max-w-[620px] space-y-5">
                {currentNFT.description.map((paragraph, index) => (
                  <p
                    key={index}
                    className="
                      font-['Work Sans']
                      text-base
                      leading-7
                      text-white
                    "
                  >
                    {paragraph}
                  </p>
                ))}
              </div>
            </div>

            {/* DETAILS */}
            <div className="mt-8">
              <h2
                className="
                  font-['Space Mono']
                  text-sm
                  font-bold
                  text-[#858584]
                "
              >
                Details
              </h2>

              <div className="mt-4 space-y-4">
                <a
                  href="https://etherscan.io/"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-3 text-base text-white transition hover:text-[#A259FF]"
                >
                  <span className="text-xl text-[#858584]">◎</span>
                  View on Etherscan
                </a>

                <a
                  href="#original"
                  className="flex items-center gap-3 text-base text-white transition hover:text-[#A259FF]"
                >
                  <span className="text-xl text-[#858584]">◎</span>
                  View Original
                </a>
              </div>
            </div>

            {/* TAGS */}
            <div className="mt-8">
              <h2
                className="
                  font-['Space Mono']
                  text-sm
                  font-bold
                  text-[#858584]
                "
              >
                Tags
              </h2>

              <div className="mt-4 flex flex-wrap gap-3">
                {["ANIMATION", "ILLUSTRATION", "MOON", "MOON"].map(
                  (tag, index) => (
                    <span
                      key={`${tag}-${index}`}
                      className="
                        rounded-full
                        bg-[#3B3B3B]
                        px-5
                        py-3
                        font-['Work Sans']
                        text-[10px]
                        font-bold
                        text-white
                      "
                    >
                      {tag}
                    </span>
                  )
                )}
              </div>
            </div>
          </div>

          {/* RIGHT BID CARD */}
          <aside className="h-fit rounded-2xl bg-[#3B3B3B] p-5 md:sticky md:top-6">
            <p
              className="
                font-['Space Mono']
                text-xs
                text-white
              "
            >
              Auction ends in:
            </p>

            <div className="mt-3 grid grid-cols-3 gap-2">
              <div>
                <p className="font-['Space Mono'] text-3xl font-bold">
                  59
                </p>

                <p className="font-['Space Mono'] text-[10px] text-white">
                  Hours
                </p>
              </div>

              <div>
                <p className="font-['Space Mono'] text-3xl font-bold">
                  59
                </p>

                <p className="font-['Space Mono'] text-[10px] text-white">
                  Minutes
                </p>
              </div>

              <div>
                <p className="font-['Space Mono'] text-3xl font-bold">
                  59
                </p>

                <p className="font-['Space Mono'] text-[10px] text-white">
                  Seconds
                </p>
              </div>
            </div>

            <button
              type="button"
              className="
                mt-6
                w-full
                rounded-xl
                bg-[#A259FF]
                px-5
                py-4
                font-['Work Sans']
                text-sm
                font-semibold
                text-white
                transition
                hover:bg-[#8B3FF0]
              "
            >
              Place Bid
            </button>
          </aside>
        </div>
      </section>

      {/* ==================================================
    MORE FROM THIS ARTIST
================================================== */}

<section className="w-full bg-[#2B2B2B] pb-20 pt-8">
  <div className="mx-auto max-w-[1050px] px-5 sm:px-8 lg:px-0">

    {/* SECTION HEADER */}
    <div className="mb-10 flex flex-col justify-between gap-5 sm:flex-row sm:items-center">

      <h2
        className="
          font-['Work_Sans']
          text-2xl
          font-semibold
          text-white
          sm:text-3xl
        "
      >
        More From This Artist
      </h2>

      <button
        type="button"
        className="
          inline-flex
          items-center
          justify-center
          rounded-xl
          border
          border-[#A259FF]
          px-6
          py-3
          font-['Work_Sans']
          text-xs
          font-semibold
          text-white
          transition
          hover:bg-[#A259FF]
        "
      >
        → Go To Artist Page
      </button>

    </div>

    {/* NFT CARDS */}
    <div
      className="
        grid
        grid-cols-1
        gap-7
        sm:grid-cols-2
        lg:grid-cols-3
      "
    >
      {finalRelatedNFTs.map((item) => (
        <div
          key={item.id}
          className="
            group
            overflow-hidden
            rounded-2xl
            bg-[#3B3B3B]
            transition
            duration-300
            hover:-translate-y-1
          "
        >

          {/* IMAGE */}
          <div className="h-[250px] w-full overflow-hidden">
            <img
              src={item.image}
              alt={item.name}
              className="
                h-full
                w-full
                object-cover
                transition
                duration-500
                group-hover:scale-105
              "
            />
          </div>

          {/* CARD INFO */}
          <div className="p-5">

            {/* NAME */}
            <h3
              className="
                truncate
                font-['Work_Sans']
                text-lg
                font-semibold
                text-white
              "
            >
              {item.name}
            </h3>

            {/* CREATOR */}
            <div className="mt-3 flex items-center gap-2">

              <img
                src={item.avatar}
                alt={item.creator}
                className="h-6 w-6 rounded-full object-cover"
              />

              <p
                className="
                  truncate
                  font-['Space_Mono']
                  text-xs
                  text-white
                "
              >
                {item.creator}
              </p>

            </div>

            {/* PRICE + BID */}
            <div className="mt-6 flex justify-between gap-3">

              <div>
                <p
                  className="
                    font-['Space_Mono']
                    text-xs
                    text-[#858584]
                  "
                >
                  Price
                </p>

                <p
                  className="
                    mt-2
                    font-['Space_Mono']
                    text-xs
                    text-white
                  "
                >
                  {item.price}
                </p>
              </div>

              <div className="text-right">

                <p
                  className="
                    font-['Space_Mono']
                    text-xs
                    text-[#858584]
                  "
                >
                  Highest Bid
                </p>

                <p
                  className="
                    mt-2
                    font-['Space_Mono']
                    text-xs
                    text-white
                  "
                >
                  {item.bid}
                </p>

              </div>

            </div>

          </div>

        </div>
      ))}
    </div>

  </div>
</section>

      {/* FOOTER */}
      <Footer />
    </div>
  );
}

export default NFTPage;