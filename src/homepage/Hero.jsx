import React from "react";
import { Rocket } from "lucide-react";

import nftArtwork from "../assets/images/nft-artwork.png";

/* ==================================================
   TRENDING COLLECTION IMAGE IMPORTS
================================================== */

// DSGN Animals
import animalMain from "../assets/images/dsgn-animals-main.png";
import animalSmall1 from "../assets/images/dsgn-animals-small-1.png";
import animalSmall2 from "../assets/images/dsgn-animals-small-2.png";
import animalAvatar from "../assets/images/mrfox-avatar.png";

// Magic Mushrooms
import mushroomMain from "../assets/images/magic-mushrooms-main.png";
import mushroomSmall1 from "../assets/images/magic-mushrooms-small-1.png";
import mushroomSmall2 from "../assets/images/magic-mushrooms-small-2.png";
import mushroomAvatar from "../assets/images/shroomie-avatar.png";

// Disco Machines
import robotMain from "../assets/images/disco-machines-main.png";
import robotSmall1 from "../assets/images/disco-machines-small-1.png";
import robotSmall2 from "../assets/images/disco-machines-small-2.png";
import robotAvatar from "../assets/images/bekind2robots-avatar.png";

/* ==================================================
   HERO STATS
================================================== */

const STATS = [
  {
    value: "240k+",
    label: "Total Sale",
  },
  {
    value: "100k+",
    label: "Auctions",
  },
  {
    value: "240k+",
    label: "Artists",
  },
];

/* ==================================================
   TRENDING COLLECTION DATA
================================================== */

const collections = [
  {
    title: "DSGN Animals",
    creator: "MrFox",
    mainImage: animalMain,
    images: [animalSmall1, animalSmall2],
    avatar: animalAvatar,
  },
  {
    title: "Magic Mushrooms",
    creator: "Shroomie",
    mainImage: mushroomMain,
    images: [mushroomSmall1, mushroomSmall2],
    avatar: mushroomAvatar,
  },
  {
    title: "Disco Machines",
    creator: "BeKind2Robots",
    mainImage: robotMain,
    images: [robotSmall1, robotSmall2],
    avatar: robotAvatar,
  },
];

/* ==================================================
   COLLECTION CARD
================================================== */

const CollectionCard = ({
  title,
  creator,
  mainImage,
  images,
  avatar,
}) => {
  return (
    <div className="w-full">

      {/* ================= MAIN IMAGE ================= */}
      <div className="overflow-hidden w-full rounded-2xl aspect-square">
        <img
          src={mainImage}
          alt={title}
          className="object-cover h-full w-full transition-transform duration-500 hover:scale-105"
        />
      </div>

      {/* ================= SMALL IMAGES ================= */}
      <div className="grid grid-cols-3 gap-3 mt-3 sm:gap-4 mt-4">

        {/* Small Image 1 */}
        <div className="overflow-hidden rounded-xl aspect-square">
          <img
            src={images[0]}
            alt={`${title} preview 1`}
            className="object-cover h-full w-full"
          />
        </div>

        {/* Small Image 2 */}
        <div className="overflow-hidden rounded-xl aspect-square">
          <img
            src={images[1]}
            alt={`${title} preview 2`}
            className="object-cover h-full w-full"
          />
        </div>

        {/* Count Box */}
        <div className="flex items-center justify-center bg-[#A259FF] rounded-xl aspect-square">
          <span className="text-sm font-bold text-white sm:text-base md:text-lg">
            1025+
          </span>
        </div>

      </div>

      {/* ================= TITLE ================= */}
      <h3 className="mt-4 text-xl font-bold text-white sm:mt-5 text-2xl">
        {title}
      </h3>

      {/* ================= CREATOR ================= */}
      <div className="flex items-center gap-2 mt-2">

        <img
          src={avatar}
          alt={creator}
          className="object-cover h-7 w-7 rounded-full shrink-0 sm:h-8 w-8"
        />

        <span className="text-sm text-gray-300 sm:text-base">
          {creator}
        </span>

      </div>
    </div>
  );
};

/* ==================================================
   HERO COMPONENT
================================================== */

const Hero = () => {
  return (
    <>
      {/* ==================================================
          HERO SECTION
      ================================================== */}

      <section className="overflow-hidden w-full bg-[#2B2B2B]">

        <div className="mx-auto px-4 py-16 max-w-7xl sm:px-6 md:py-20 lg:px-10 py-28">

          <div className="flex flex-col items-center justify-between gap-12 lg:flex-row gap-10">

            {/* ==================================================
                LEFT CONTENT
            ================================================== */}

            <div className="flex flex-col items-center w-full text-center lg:items-start w-1/2 text-left">

              {/* Heading */}
              <h1 className="max-w-xl text-4xl font-bold leading-tight text-white sm:text-5xl md:text-6xl">

                Discover
                <br />

                Digital Art &amp;
                <br />

                Collect NFTs

              </h1>

              {/* Description */}
              <p className="mt-6 max-w-md text-base leading-relaxed text-gray-300 md:text-lg">

                NFT Marketplace UI Created With Anima For Figma.
                Collect, Buy And Sell Art From More Than 20k NFT Artists.

              </p>

              {/* Get Started Button */}
              <button
                type="button"
                className="inline-flex items-center gap-2 mt-8 px-7 py-3.5 text-base font-semibold text-white bg-[#A259FF] rounded-full transition-opacity duration-200 hover:opacity-90"
              >
                <Rocket className="h-5 w-5" />

                Get Started
              </button>

              {/* ================= STATS ================= */}

              <div className="grid grid-cols-3 gap-5 mt-12 w-full max-w-md sm:gap-10">

                {STATS.map((stat) => (
                  <div
                    key={stat.label}
                    className="text-center lg:text-left"
                  >
                    <p className="text-xl font-bold text-white sm:text-2xl">
                      {stat.value}
                    </p>

                    <p className="mt-1 text-sm text-gray-300 sm:text-base">
                      {stat.label}
                    </p>
                  </div>
                ))}

              </div>

            </div>

            {/* ==================================================
                RIGHT NFT CARD
            ================================================== */}

            <div className="flex justify-center w-full hero-card-scene lg:justify-end w-1/2">

              <div className="overflow-hidden w-[280px] bg-[#3A3A3A] rounded-2xl shadow-2xl hero-float sm:w-[340px] md:w-[380px]">

                {/* NFT Image */}
                <div className="overflow-hidden w-full rounded-t-2xl aspect-square">

                  <img
                    src={nftArtwork}
                    alt="Space Walking NFT artwork"
                    className="object-cover h-full w-full"
                  />

                </div>

                {/* NFT Information */}
                <div className="flex items-center gap-3 px-5 py-4">

                  {/* Avatar */}
                  <img
                    src={nftArtwork}
                    alt="animakid avatar"
                    className="object-cover h-9 w-9 rounded-full shrink-0"
                  />

                  <div>

                    <p className="text-sm font-semibold text-white">
                      animakid
                    </p>

                    <p className="mt-0.5 text-xs text-gray-400">
                      Total Sales:{" "}
                      <span className="text-gray-300">
                        34.53 ETH
                      </span>
                    </p>

                  </div>

                </div>

              </div>

            </div>

          </div>

        </div>

      </section>

      {/* ==================================================
          TRENDING COLLECTION SECTION
      ================================================== */}

      <section className="w-full bg-[#2B2B2B]">

        <div className="mx-auto px-4 py-14 max-w-7xl sm:px-6 md:py-20 lg:px-10">

          {/* ================= HEADER ================= */}

          <div className="text-left">

            <h2 className="text-3xl font-bold text-white sm:text-4xl md:text-[40px]">
              Trending Collection
            </h2>

            <p className="mt-3 text-base font-normal text-gray-300 sm:text-lg md:text-2xl">
              Checkout Our Weekly Updated Trending Collection.
            </p>

          </div>

          {/* ================= COLLECTION GRID ================= */}

          <div className="grid grid-cols-1 gap-x-8 gap-y-14 mt-10 md:grid-cols-2 mt-14 lg:grid-cols-3 gap-x-10">

            {collections.map((collection) => (
              <CollectionCard
                key={collection.title}
                {...collection}
              />
            ))}

          </div>

        </div>

      </section>

      {/* ==================================================
          HERO CARD ANIMATION
      ================================================== */}

      <style>{`

        .hero-card-scene {
          perspective: 1200px;
        }

        .hero-float {
          transform-style: preserve-3d;
          transform-origin: center;
          animation: hero-float 8s ease-in-out infinite;
          will-change: transform;
        }

        @keyframes hero-float {

          0% {
            transform:
              rotateY(8deg)
              rotateX(1deg)
              translateY(0px);
          }

          20% {
            transform:
              rotateY(-10deg)
              rotateX(-1.5deg)
              translateY(8px);
          }

          50% {
            transform:
              rotateY(0deg)
              rotateX(0deg)
              translateY(-6px);
          }

          75% {
            transform:
              rotateY(10deg)
              rotateX(1.5deg)
              translateY(6px);
          }

          100% {
            transform:
              rotateY(8deg)
              rotateX(1deg)
              translateY(0px);
          }

        }

        @media (max-width: 767px) {

          .hero-card-scene {
            perspective: 900px;
          }

          .hero-float {
            animation-name: hero-float-mobile;
          }

          @keyframes hero-float-mobile {

            0% {
              transform:
                rotateY(4deg)
                translateY(0px);
            }

            20% {
              transform:
                rotateY(-5deg)
                translateY(4px);
            }

            50% {
              transform:
                rotateY(0deg)
                translateY(-3px);
            }

            75% {
              transform:
                rotateY(5deg)
                translateY(3px);
            }

            100% {
              transform:
                rotateY(4deg)
                translateY(0px);
            }

          }

        }

        @media (prefers-reduced-motion: reduce) {

          .hero-float {
            animation: none;
          }

        }

      `}</style>

    </>
  );
};

export default Hero;