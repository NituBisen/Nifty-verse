import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Search } from "lucide-react";

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
   COLLECTION DATA
================================================== */

const COLLECTION_ITEMS = [
  {
    id: 1,
    name: "DSGN Animals",
    artist: "MrFox",
    artistAvatar: avatar3,
    additionalNFTs: "1025+",
    primaryImage: nft4,
    secondaryImages: [nft5, nft6],
    nftId: 4,
  },

  {
    id: 2,
    name: "Magic Mushroom",
    artist: "Shroomie",
    artistAvatar: avatar1,
    additionalNFTs: "1025+",
    primaryImage: nft1,
    secondaryImages: [nft2, nft3],
    nftId: 1,
  },

  {
    id: 3,
    name: "Happy Robots",
    artist: "BeKind2Robots",
    artistAvatar: avatar2,
    additionalNFTs: "1025+",
    primaryImage: nft2,
    secondaryImages: [nft3, nft6],
    nftId: 2,
  },

  {
    id: 4,
    name: "Colorful Dogs",
    artist: "Keepitreal",
    artistAvatar: avatar4,
    additionalNFTs: "1025+",
    primaryImage: nft5,
    secondaryImages: [nft12, nft4],
    nftId: 5,
  },

  {
    id: 5,
    name: "Dancing Robots",
    artist: "Robotica",
    artistAvatar: avatar5,
    additionalNFTs: "1025+",
    primaryImage: nft6,
    secondaryImages: [nft2, nft8],
    nftId: 6,
  },

  {
    id: 6,
    name: "Cherry Blossom",
    artist: "MoonDancer",
    artistAvatar: avatar6,
    additionalNFTs: "1025+",
    primaryImage: nft7,
    secondaryImages: [nft1, nft9],
    nftId: 7,
  },

  {
    id: 7,
    name: "Space Travel",
    artist: "NebulaKid",
    artistAvatar: avatar7,
    additionalNFTs: "1025+",
    primaryImage: nft8,
    secondaryImages: [nft9, nft3],
    nftId: 8,
  },

  {
    id: 8,
    name: "Sunset Dimension",
    artist: "Animakid",
    artistAvatar: avatar8,
    additionalNFTs: "1025+",
    primaryImage: nft9,
    secondaryImages: [nft7, nft1],
    nftId: 9,
  },

  {
    id: 9,
    name: "Desert Collection",
    artist: "Catch 22",
    artistAvatar: avatar9,
    additionalNFTs: "1025+",
    primaryImage: nft10,
    secondaryImages: [nft11, nft12],
    nftId: 10,
  },

  {
    id: 10,
    name: "IceCream Ape",
    artist: "Ice Ape Club",
    artistAvatar: avatar10,
    additionalNFTs: "1025+",
    primaryImage: nft11,
    secondaryImages: [nft12, nft5],
    nftId: 11,
  },

  {
    id: 11,
    name: "Colorful World",
    artist: "PuppyPower",
    artistAvatar: avatar11,
    additionalNFTs: "1025+",
    primaryImage: nft12,
    secondaryImages: [nft10, nft5],
    nftId: 12,
  },

  {
    id: 12,
    name: "Future Creatures",
    artist: "MrFox",
    artistAvatar: avatar3,
    additionalNFTs: "1025+",
    primaryImage: nft4,
    secondaryImages: [nft7, nft10],
    nftId: 4,
  },
];

/* ==================================================
   NFT CARD
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
        bg-[#212020]
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
              font-['Work_Sans']
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
                font-['Space_Mono']
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
                font-['Space_Mono']
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
                font-['Space_Mono']
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
                font-['Space_Mono']
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
                font-['Space_Mono']
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
   COLLECTION CARD
================================================== */

function CollectionCard({ collection }) {
  return (
    <article
      className="
        group
        relative
        mx-auto
        flex
        w-full
        max-w-[380px]
        flex-col
        overflow-hidden
        rounded-[20px]
        bg-[#000000]
        px-4
        pb-6
        pt-5

        sm:max-w-[380px]
        sm:px-5
        sm:pb-6
        sm:pt-5

        md:px-6

        lg:h-[525px]
        lg:w-[380px]
        lg:max-w-[380px]
        lg:px-0
        lg:pb-0
        lg:pt-0
      "
    >
      {/* Main Image */}
      <Link
        to={`/nft/${collection.nftId}`}
        className="
          block
          w-full
          overflow-hidden
          rounded-[20px]

          sm:w-full

          lg:h-[330px]
          lg:w-[380px]
          lg:rounded-[20px]
        "
      >
        <img
          src={collection.primaryImage}
          alt={collection.name}
          className="
            aspect-square
            h-auto
            w-full
            object-cover
            transition-transform
            duration-500
            group-hover:scale-105

            sm:aspect-square

            lg:h-[330px]
            lg:w-[380px]
            lg:aspect-auto
          "
        />
      </Link>

      {/* Small Images */}
      <div
        className="
          mt-[15px]
          grid
          w-full
          grid-cols-3
          gap-[10px]

          sm:gap-[15px]

          lg:flex
          lg:h-[100px]
          lg:w-[380px]
          lg:gap-[15px]
        "
      >
        {collection.secondaryImages.map((image, index) => (
          <Link
            key={index}
            to={`/nft/${collection.nftId}`}
            className="
              block
              h-[100px]
              w-full
              overflow-hidden
              rounded-[15px]

              lg:h-[100px]
              lg:w-[116px]
            "
          >
            <img
              src={image}
              alt={`${collection.name}-${index}`}
              className="
                h-full
                w-full
                object-cover
                transition-transform
                duration-500
                group-hover:scale-105
              "
            />
          </Link>
        ))}

        {/* Additional NFTs */}
        <Link
          to={`/nft/${collection.nftId}`}
          className="
            flex
            h-[100px]
            w-full
            items-center
            justify-center
            rounded-[15px]
            bg-[#A259FF]
            font-['Space_Mono']
            text-[18px]
            font-bold
            text-white
            transition-transform
            duration-300
            hover:scale-[1.02]

            lg:h-[100px]
            lg:w-[116px]
          "
        >
          {collection.additionalNFTs}
        </Link>
      </div>

      {/* Collection Info */}
      <div
        className="
          mt-[10px]
          w-full
          lg:h-[65px]
          lg:w-[380px]
        "
      >
        {/* Collection Name */}
        <h2
          className="
            w-full
            truncate
            font-['Work_Sans']
            text-[22px]
            font-semibold
            leading-[31px]
            text-white
          "
        >
          {collection.name}
        </h2>

        {/* Artist */}
        <div
          className="
            mt-[5px]
            flex
            h-[24px]
            w-full
            items-center
            gap-[10px]
          "
        >
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
              truncate
              font-['Space_Mono']
              text-[16px]
              leading-[22px]
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




// function CollectionCard({ collection }) {
//   return (
//     <article
//       className="
//         mx-auto
//         flex
//         w-full
//         max-w-[380px]
//         flex-col
//         gap-[15px]
//         overflow-hidden
//         rounded-[20px]
//         bg-[#2B2B2B]
//         sm:h-[525px]
//         sm:w-[330px]
//         sm:max-w-[330px]
//       "
//     >
//       {/* =================================================
//           PHOTOS
//       ================================================= */}

//       <div className="w-full shrink-0 sm:h-[445px] sm:w-[330px]">
//         {/* PRIMARY PHOTO */}

//         <Link
//           to={`/nft/${collection.nftId}`}
//           className="
//             group
//             block
//             aspect-square
//             w-full
//             overflow-hidden
//             rounded-[20px]
//             sm:h-[330px]
//             sm:w-[330px]
//           "
//         >
//           <img
//             src={collection.primaryImage}
//             alt={collection.name}
//             className="
//               h-full
//               w-full
//               object-cover
//               transition-transform
//               duration-300
//               ease-out
//               group-hover:scale-105
//             "
//           />
//         </Link>

//         {/* SECONDARY PHOTOS + COUNT */}

//         <div className="mt-[15px] grid w-full grid-cols-3 gap-[15px] sm:h-[100px] sm:w-[330px]">
          
//           {/* SECONDARY IMAGE 1 */}

//           <Link
//             to={`/nft/${collection.nftId}`}
//             className="
//               group
//               block
//               aspect-square
//               w-full
//               overflow-hidden
//               rounded-[20px]
//               sm:h-[100px]
//               sm:w-[100px]
//             "
//           >
//             <img
//               src={collection.secondaryImages[0]}
//               alt={`${collection.name} artwork 1`}
//               className="
//                 h-full
//                 w-full
//                 object-cover
//                 transition-transform
//                 duration-300
//                 group-hover:scale-105
//               "
//             />
//           </Link>

//           {/* SECONDARY IMAGE 2 */}

//           <Link
//             to={`/nft/${collection.nftId}`}
//             className="
//               group
//               block
//               aspect-square
//               w-full
//               overflow-hidden
//               rounded-[20px]
//               sm:h-[100px]
//               sm:w-[100px]
//             "
//           >
//             <img
//               src={collection.secondaryImages[1]}
//               alt={`${collection.name} artwork 2`}
//               className="
//                 h-full
//                 w-full
//                 object-cover
//                 transition-transform
//                 duration-300
//                 group-hover:scale-105
//               "
//             />
//           </Link>

//           {/* ADDITIONAL NFT NUMBER */}

//           <Link
//             to={`/nft/${collection.nftId}`}
//             className="
//               flex
//               aspect-square
//               w-full
//               items-center
//               justify-center
//               rounded-[20px]
//               bg-[#A259FF]
//               transition-colors
//               duration-200
//               hover:bg-[#913FE8]
//               sm:h-[100px]
//               sm:w-[100px]
//             "
//           >
//             <span
//               className="
//                 font-['Space Mono']
//                 text-[14px]
//                 font-bold
//                 text-white
//                 sm:text-[16px]
//               "
//             >
//               {collection.additionalNFTs}
//             </span>
//           </Link>
//         </div>
//       </div>

//       {/* =================================================
//           COLLECTION INFO
//       ================================================= */}

//       <div className="w-full shrink-0 sm:h-[65px] sm:w-[330px]">
//         {/* COLLECTION NAME */}

//         <h2
//           className="
//             h-[31px]
//             w-full
//             truncate
//             font-['Work Sans']
//             text-[22px]
//             font-semibold
//             leading-[140%]
//             capitalize
//             text-white
//           "
//         >
//           {collection.name}
//         </h2>

//         {/* ARTIST */}

//         <div className="mt-[10px] flex h-[24px] w-full items-center gap-[10px]">
//           <img
//             src={collection.artistAvatar}
//             alt={collection.artist}
//             className="
//               h-[24px]
//               w-[24px]
//               shrink-0
//               rounded-full
//               object-cover
//             "
//           />

//           <span
//             className="
//               min-w-0
//               flex-1
//               truncate
//               font-['Work Sans']
//               text-[16px]
//               font-normal
//               leading-[140%]
//               text-white
//             "
//           >
//             {collection.artist}
//           </span>
//         </div>
//       </div>
//     </article>
//   );
// }

/* ==================================================
   MARKET COMPONENT
================================================== */

const Market = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const [activeTab, setActiveTab] = useState("nfts");

  const navigate = useNavigate();

  /* ==================================================
     SEARCH FILTER
  ================================================== */

  const filteredNFTs = NFT_ITEMS.filter((item) => {
    const searchValue = searchTerm.toLowerCase().trim();

    return (
      item.name.toLowerCase().includes(searchValue) ||
      item.creator.toLowerCase().includes(searchValue)
    );
  });

  return (
    <>
      {/* =================================================
          NAVBAR
      ================================================= */}

      <Navbar />

      {/* =================================================
          MARKETPLACE HERO
      ================================================= */}

      <section className="w-full bg-[#000000]">
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

            {/* SEARCH */}

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
                  focus:border-[#7C3AED]
                  sm:text-base
                "
              />

              <Search
                className="
                  absolute
                  right-5
                  top-1/2
                  h-5
                  w-5
                  -translate-y-1/2
                  text-gray-300
                "
              />
            </div>
          </div>
        </div>
      </section>

       {/* FULL WIDTH DIVIDER */}
      <div className="h-px w-full bg-[#3B3B3B]" />
      
      {/* =================================================
          MARKETPLACE TABS
      ================================================= */}

      <section className="w-full bg-[#000000]">
        <div className="mx-auto flex h-[70px] w-full max-w-[1200px] items-end px-5 sm:px-6 lg:px-0">
          <div className="flex h-[60px] w-full ">

            {/* ================= NFT TAB ================= */}

            <button
              type="button"
              onClick={() => setActiveTab("nfts")}
              className={`
                flex
                h-[60px]
                w-1/2
                items-center
                justify-center
                gap-1
                px-1
                sm:gap-4
                sm:px-[30px]
                border-b-2
                transition-colors
                duration-200
                ${
                  activeTab === "nfts"
                    ? "border-[#858584]"
                    : "border-transparent"
                }
              `}
            >
              <span
                className={`
                  font-['Work_Sans']
                  text-[14px]
                  sm:text-[22px]
                  font-semibold
                  leading-[140%]
                  capitalize
                  whitespace-nowrap
                  ${
                    activeTab === "nfts"
                      ? "text-white"
                      : "text-[#858584]"
                  }
                `}
              >
                NFTs
              </span>

              <span
                className={`
                  flex
                  h-7
                  min-w-[34px]
                  sm:h-8
                  sm:min-w-[50px]
                  items-center
                  justify-center
                  rounded-[20px]
                  px-2
                  sm:px-[10px]
                  py-[4px]
                  sm:py-[5px]
                  font-['Space_Mono']
                  text-xs
                  sm:text-base
                  font-normal
                  leading-[140%]
                  text-white
                  ${
                    activeTab === "nfts"
                      ? "bg-[#858584]"
                      : "bg-[#3B3B3B]"
                  }
                `}
              >
                302
              </span>
            </button>

            {/* ================= COLLECTION TAB ================= */}

            <button
              type="button"
              onClick={() => setActiveTab("collections")}
              className={`
                flex
                h-[60px]
                w-1/2
                items-center
                justify-center
                gap-1
                px-1
                sm:gap-4
                sm:px-[30px]
                border-b-2
                transition-colors
                duration-200
                ${
                  activeTab === "collections"
                    ? "border-[#858584]"
                    : "border-transparent"
                }
              `}
            >
              <span
                className={`
                  font-['Work_Sans']
                  text-[14px]
                  sm:text-[22px]
                  font-semibold
                  leading-[140%]
                  capitalize
                  whitespace-nowrap
                  ${
                    activeTab === "collections"
                      ? "text-white"
                      : "text-[#858584]"
                  }
                `}
              >
                Collections
              </span>

              <span
                className={`
                  flex
                  h-7
                  min-w-[34px]
                  sm:h-8
                  sm:min-w-[40px]
                  items-center
                  justify-center
                  rounded-[20px]
                  px-2
                  sm:px-[10px]
                  py-[4px]
                  sm:py-[5px]
                  font-['Space_Mono']
                  text-xs
                  sm:text-base
                  font-normal
                  leading-[140%]
                  text-white
                  ${
                    activeTab === "collections"
                      ? "bg-[#858584]"
                      : "bg-[#3B3B3B]"
                  }
                `}
              >
                67
              </span>
            </button>

          </div>
        </div>
      </section>

      {/* =================================================
          NFT CONTENT
      ================================================= */}

      {activeTab === "nfts" && (
        <section className="w-full bg-[#000000] pb-[80px] pt-[60px]">
          <div
            className="
              mx-auto
              grid
              w-full
              max-w-[1200px]
              grid-cols-1
              gap-[30px]
              px-5
              sm:grid-cols-2
              lg:grid-cols-3
              lg:px-0
            "
          >
            {filteredNFTs.length > 0 ? (
              filteredNFTs.map((item) => (
                <NFTCard
                  key={item.id}
                  item={item}
                  onClick={() =>
                    navigate(`/nft/${item.id}`)
                  }
                />
              ))
            ) : (
              <div className="col-span-full flex min-h-[250px] items-center justify-center">
                <p className="font-['Work_Sans'] text-lg text-[#858584]">
                  No NFTs found.
                </p>
              </div>
            )}
          </div>
        </section>
      )}

      {/* =================================================
          COLLECTION CONTENT
      ================================================= */}

      {activeTab === "collections" && (
        <section className="w-full bg-[#000000] pb-[80px] pt-[60px]">
          <div
            className="
              mx-auto
              grid
              w-full
              max-w-[1220px]
              grid-cols-1
              gap-x-[10px]
              gap-y-[40px]
              px-5
              sm:grid-cols-2
              lg:grid-cols-3
              lg:px-0
            "
          >
            {COLLECTION_ITEMS.map((collection) => (
              <CollectionCard
                key={collection.id}
                collection={collection}
              />
            ))}
          </div>
        </section>
      )}

      {/* =================================================
          FOOTER
      ================================================= */}

      <Footer />
    </>
  );
};

export default Market;