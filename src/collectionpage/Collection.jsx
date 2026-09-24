import React from "react";
import { Link } from "react-router-dom";

import Navbar from "../common/Navbar";
import Footer from "../common/Footer";

import orbitian1 from "../assets/images/orbitian/orbitian1.png";
import orbitian2 from "../assets/images/orbitian/orbitian2.png";
import orbitian3 from "../assets/images/orbitian/orbitian3.png";
import orbitian4 from "../assets/images/orbitian/orbitian4.png";
import orbitian5 from "../assets/images/orbitian/orbitian5.png";
import orbitian6 from "../assets/images/orbitian/orbitian6.png";
import orbitian7 from "../assets/images/orbitian/orbitian7.png";
import orbitian8 from "../assets/images/orbitian/orbitian8.png";
import orbitian9 from "../assets/images/orbitian/orbitian9.png";

import orbitianavatar from "../assets/images/orbitian-avatar-img/orbitianavatar.png";

/* =========================================================
   COLLECTION DATA
========================================================= */

const COLLECTIONS = [
  {
    id: 1,
    name: "DSGN Animals",
    artist: "MrFox",
    additionalNFTs: "1025+",
    primaryImage: orbitian1,
    secondaryImages: [orbitian2, orbitian3],
    nftId: 1,
  },

  {
    id: 2,
    name: "Happy Robots",
    artist: "BeKind2Robots",
    additionalNFTs: "1025+",
    primaryImage: orbitian2,
    secondaryImages: [orbitian3, orbitian4],
    nftId: 2,
  },

  {
    id: 3,
    name: "Digital Bears",
    artist: "MrFox",
    additionalNFTs: "1025+",
    primaryImage: orbitian3,
    secondaryImages: [orbitian4, orbitian5],
    nftId: 3,
  },

  {
    id: 4,
    name: "Colorful Dogs",
    artist: "Keepitreal",
    additionalNFTs: "1025+",
    primaryImage: orbitian4,
    secondaryImages: [orbitian5, orbitian6],
    nftId: 4,
  },

  {
    id: 5,
    name: "Dancing Robots",
    artist: "Robotica",
    additionalNFTs: "1025+",
    primaryImage: orbitian5,
    secondaryImages: [orbitian6, orbitian7],
    nftId: 5,
  },

  {
    id: 6,
    name: "Cherry Blossom",
    artist: "MoonDancer",
    additionalNFTs: "1025+",
    primaryImage: orbitian6,
    secondaryImages: [orbitian7, orbitian8],
    nftId: 6,
  },

  {
    id: 7,
    name: "Space Travel",
    artist: "NebulaKid",
    additionalNFTs: "1025+",
    primaryImage: orbitian7,
    secondaryImages: [orbitian8, orbitian9],
    nftId: 7,
  },

  {
    id: 8,
    name: "Sunset Dimension",
    artist: "Animakid",
    additionalNFTs: "1025+",
    primaryImage: orbitian8,
    secondaryImages: [orbitian9, orbitian1],
    nftId: 8,
  },

  {
    id: 9,
    name: "Future Worlds",
    artist: "Animakid",
    additionalNFTs: "1025+",
    primaryImage: orbitian9,
    secondaryImages: [orbitian1, orbitian2],
    nftId: 9,
  },

  {
    id: 10,
    name: "Orbitian Collection",
    artist: "Orbitian",
    additionalNFTs: "1025+",
    primaryImage: orbitian1,
    secondaryImages: [orbitian4, orbitian7],
    nftId: 1,
  },

  {
    id: 11,
    name: "Robot Universe",
    artist: "Robotica",
    additionalNFTs: "1025+",
    primaryImage: orbitian4,
    secondaryImages: [orbitian6, orbitian8],
    nftId: 4,
  },

  {
    id: 12,
    name: "Digital Dimension",
    artist: "MoonDancer",
    additionalNFTs: "1025+",
    primaryImage: orbitian7,
    secondaryImages: [orbitian2, orbitian9],
    nftId: 7,
  },
];

/* =========================================================
   COLLECTION CARD
========================================================= */

function CollectionCard({ collection }) {
  return (
    <article
      className="
        mx-auto
        flex
        h-[525px]
        w-[380px]
        flex-col
        gap-[15px]
        overflow-hidden
        rounded-[20px]
        bg-[#2B2B2B]
      "
    >
      {/* =================================================
          PHOTOS
      ================================================= */}

      <div className="h-[445px] w-[380px] shrink-0">
        {/* PRIMARY PHOTO */}

        <Link
          to={`/nft/${collection.nftId}`}
          className="
            group
            block
            h-[330px]
            w-[380px]
            overflow-hidden
            rounded-[20px]
          "
        >
          <img
            src={collection.primaryImage}
            alt={collection.name}
            className="
              h-[330px]
              w-[380px]
              object-cover
              transition-transform
              duration-300
              ease-out
              group-hover:scale-105
            "
          />
        </Link>

        {/* SECONDARY PHOTOS + COUNT */}

        <div className="mt-[15px] flex h-[100px] w-[380px] gap-[15px]">
          {/* SECONDARY IMAGE 1 */}

          <Link
            to={`/nft/${collection.nftId}`}
            className="
              group
              block
              h-[100px]
              w-[116px]
              shrink-0
              overflow-hidden
              rounded-[20px]
            "
          >
            <img
              src={collection.secondaryImages[0]}
              alt={`${collection.name} artwork 1`}
              className="
                h-full
                w-full
                object-cover
                transition-transform
                duration-300
                group-hover:scale-105
              "
            />
          </Link>

          {/* SECONDARY IMAGE 2 */}

          <Link
            to={`/nft/${collection.nftId}`}
            className="
              group
              block
              h-[100px]
              w-[116px]
              shrink-0
              overflow-hidden
              rounded-[20px]
            "
          >
            <img
              src={collection.secondaryImages[1]}
              alt={`${collection.name} artwork 2`}
              className="
                h-full
                w-full
                object-cover
                transition-transform
                duration-300
                group-hover:scale-105
              "
            />
          </Link>

          {/* ADDITIONAL NFT NUMBER */}

          <Link
            to={`/nft/${collection.nftId}`}
            className="
              flex
              h-[100px]
              w-[116px]
              shrink-0
              items-center
              justify-center
              rounded-[20px]
              bg-[#A259FF]
              transition-colors
              duration-200
              hover:bg-[#913FE8]
            "
          >
            <span
              className="
                font-['Work Sans']
                text-[16px]
                font-bold
                leading-[140%]
                text-white
              "
            >
              {collection.additionalNFTs}
            </span>
          </Link>
        </div>
      </div>

      {/* =================================================
          COLLECTION INFO
      ================================================= */}

      <div className="mt-[5px] h-[65px] w-[380px] shrink-0">
        {/* COLLECTION NAME */}

        <h2
          className="
            h-[31px]
            w-[380px]
            truncate
            font-['Work Sans']
            text-[22px]
            font-semibold
            leading-[140%]
            capitalize
            text-white
          "
        >
          {collection.name}
        </h2>

        {/* ARTIST */}

        <div className="mt-[10px] flex h-[24px] w-[380px] items-center gap-[12px]">
          <img
            src={collection.artistAvatar}
            alt={collection.artist}
            className="
              h-[24px]
              w-[24px]
              shrink-0
              rounded-full
              object-cover
            "
          />

          <span
            className="
              h-[22px]
              w-[306px]
              truncate
              font-['Work Sans']
              text-[16px]
              font-normal
              leading-[140%]
              text-white
            "
          >
            {collection.artist}
          </span>
        </div>
      </div>
    </article>
  );
}

/* =========================================================
   COLLECTION PAGE
========================================================= */

function Collection() {
  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white">
      
      <Navbar />

      <main>
        <section className="mx-auto w-full max-w-[1150px] px-5 py-16 md:px-0 lg:py-20">
          
          {/* PAGE HEADER */}

          <div className="mb-12">
            <h1 className="font-['Work_Sans'] text-4xl font-bold md:text-5xl">
              Collections
            </h1>

            <p className="mt-4 max-w-[600px] font-['Work_Sans'] text-base leading-6 text-[#858584]">
              Explore curated NFT collections and discover
              unique digital artworks.
            </p>
          </div>

          {/* =================================================
              4 ROWS × 3 CARDS
          ================================================= */}

          <div className="grid grid-cols-1 justify-items-center gap-x-[10px] gap-y-[40px] sm:grid-cols-2 lg:grid-cols-3">
            {COLLECTIONS.map((collection) => (
              <CollectionCard
                key={collection.id}
                collection={collection}
              />
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

export default Collection;