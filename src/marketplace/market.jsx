// import React, { useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import { Search } from "lucide-react";

// import Navbar from "../common/Navbar";
// import Footer from "../common/Footer";

// /* ==================================================
//    NFT IMAGE IMPORTS
// ================================================== */

// import nft1 from "../assets/images/marketplace/nft1.png";
// import nft2 from "../assets/images/marketplace/nft2.png";
// import nft3 from "../assets/images/marketplace/nft3.png";
// import nft4 from "../assets/images/marketplace/nft4.png";
// import nft5 from "../assets/images/marketplace/nft5.png";
// import nft6 from "../assets/images/marketplace/nft6.png";
// import nft7 from "../assets/images/marketplace/nft7.png";
// import nft8 from "../assets/images/marketplace/nft8.png";
// import nft9 from "../assets/images/marketplace/nft9.png";
// import nft10 from "../assets/images/marketplace/nft10.png";
// import nft11 from "../assets/images/marketplace/nft11.png";
// import nft12 from "../assets/images/marketplace/nft12.png";

// /* ==================================================
//    AVATAR IMAGE IMPORTS
// ================================================== */

// import avatar1 from "../assets/images/avatars/avatar1.png";
// import avatar2 from "../assets/images/avatars/avatar2.png";
// import avatar3 from "../assets/images/avatars/avatar3.png";
// import avatar4 from "../assets/images/avatars/avatar4.png";
// import avatar5 from "../assets/images/avatars/avatar5.png";
// import avatar6 from "../assets/images/avatars/avatar6.png";
// import avatar7 from "../assets/images/avatars/avatar7.png";
// import avatar8 from "../assets/images/avatars/avatar8.png";
// import avatar9 from "../assets/images/avatars/avatar9.png";
// import avatar10 from "../assets/images/avatars/avatar10.png";
// import avatar11 from "../assets/images/avatars/avatar11.png";

// /* ==================================================
//    NFT DATA
// ================================================== */

// const NFT_ITEMS = [
//   {
//     id: 1,
//     image: nft1,
//     avatar: avatar1,
//     name: "Magic Mushroom 0325",
//     creator: "Shroomie",
//     price: "1.63 ETH",
//     bid: "0.33 wETH",
//   },
//   {
//     id: 2,
//     image: nft2,
//     avatar: avatar2,
//     name: "Happy Robot 032",
//     creator: "BeKind2Robots",
//     price: "1.63 ETH",
//     bid: "0.33 wETH",
//   },
//   {
//     id: 3,
//     image: nft3,
//     avatar: avatar2,
//     name: "Happy Robot 024",
//     creator: "BeKind2Robots",
//     price: "1.63 ETH",
//     bid: "0.33 wETH",
//   },
//   {
//     id: 4,
//     image: nft4,
//     avatar: avatar3,
//     name: "Designer Bear",
//     creator: "MrFox",
//     price: "1.63 ETH",
//     bid: "0.33 wETH",
//   },
//   {
//     id: 5,
//     image: nft5,
//     avatar: avatar4,
//     name: "Colorful Dog 0356",
//     creator: "Keepitreal",
//     price: "1.63 ETH",
//     bid: "0.33 wETH",
//   },
//   {
//     id: 6,
//     image: nft6,
//     avatar: avatar5,
//     name: "Dancing Robot 0312",
//     creator: "Robotica",
//     price: "1.63 ETH",
//     bid: "0.33 wETH",
//   },
//   {
//     id: 7,
//     image: nft7,
//     avatar: avatar6,
//     name: "Cherry Blossom Girl 035",
//     creator: "MoonDancer",
//     price: "1.63 ETH",
//     bid: "0.33 wETH",
//   },
//   {
//     id: 8,
//     image: nft8,
//     avatar: avatar7,
//     name: "Space Travel",
//     creator: "NebulaKid",
//     price: "1.63 ETH",
//     bid: "0.33 wETH",
//   },
//   {
//     id: 9,
//     image: nft9,
//     avatar: avatar8,
//     name: "Sunset Dimension",
//     creator: "Animakid",
//     price: "1.63 ETH",
//     bid: "0.33 wETH",
//   },
//   {
//     id: 10,
//     image: nft10,
//     avatar: avatar9,
//     name: "Desert Walk",
//     creator: "Catch 22",
//     price: "1.63 ETH",
//     bid: "0.33 wETH",
//   },
//   {
//     id: 11,
//     image: nft11,
//     avatar: avatar10,
//     name: "IceCream Ape 0324",
//     creator: "Ice Ape Club",
//     price: "1.63 ETH",
//     bid: "0.33 wETH",
//   },
//   {
//     id: 12,
//     image: nft12,
//     avatar: avatar11,
//     name: "Colorful Dog 0344",
//     creator: "PuppyPower",
//     price: "1.63 ETH",
//     bid: "0.33 wETH",
//   },
// ];

// /* ==================================================
//    COLLECTION DATA
// ================================================== */

// const COLLECTION_ITEMS = [
//   {
//     id: 1,
//     name: "DSGN Animals",
//     artist: "MrFox",
//     artistAvatar: avatar3,
//     additionalNFTs: "1025+",
//     primaryImage: nft4,
//     secondaryImages: [nft5, nft6],
//     nftId: 4,
//   },

//   {
//     id: 2,
//     name: "Magic Mushroom",
//     artist: "Shroomie",
//     artistAvatar: avatar1,
//     additionalNFTs: "1025+",
//     primaryImage: nft1,
//     secondaryImages: [nft2, nft3],
//     nftId: 1,
//   },

//   {
//     id: 3,
//     name: "Happy Robots",
//     artist: "BeKind2Robots",
//     artistAvatar: avatar2,
//     additionalNFTs: "1025+",
//     primaryImage: nft2,
//     secondaryImages: [nft3, nft6],
//     nftId: 2,
//   },

//   {
//     id: 4,
//     name: "Colorful Dogs",
//     artist: "Keepitreal",
//     artistAvatar: avatar4,
//     additionalNFTs: "1025+",
//     primaryImage: nft5,
//     secondaryImages: [nft12, nft4],
//     nftId: 5,
//   },

//   {
//     id: 5,
//     name: "Dancing Robots",
//     artist: "Robotica",
//     artistAvatar: avatar5,
//     additionalNFTs: "1025+",
//     primaryImage: nft6,
//     secondaryImages: [nft2, nft8],
//     nftId: 6,
//   },

//   {
//     id: 6,
//     name: "Cherry Blossom",
//     artist: "MoonDancer",
//     artistAvatar: avatar6,
//     additionalNFTs: "1025+",
//     primaryImage: nft7,
//     secondaryImages: [nft1, nft9],
//     nftId: 7,
//   },

//   {
//     id: 7,
//     name: "Space Travel",
//     artist: "NebulaKid",
//     artistAvatar: avatar7,
//     additionalNFTs: "1025+",
//     primaryImage: nft8,
//     secondaryImages: [nft9, nft3],
//     nftId: 8,
//   },

//   {
//     id: 8,
//     name: "Sunset Dimension",
//     artist: "Animakid",
//     artistAvatar: avatar8,
//     additionalNFTs: "1025+",
//     primaryImage: nft9,
//     secondaryImages: [nft7, nft1],
//     nftId: 9,
//   },

//   {
//     id: 9,
//     name: "Desert Collection",
//     artist: "Catch 22",
//     artistAvatar: avatar9,
//     additionalNFTs: "1025+",
//     primaryImage: nft10,
//     secondaryImages: [nft11, nft12],
//     nftId: 10,
//   },

//   {
//     id: 10,
//     name: "IceCream Ape",
//     artist: "Ice Ape Club",
//     artistAvatar: avatar10,
//     additionalNFTs: "1025+",
//     primaryImage: nft11,
//     secondaryImages: [nft12, nft5],
//     nftId: 11,
//   },

//   {
//     id: 11,
//     name: "Colorful World",
//     artist: "PuppyPower",
//     artistAvatar: avatar11,
//     additionalNFTs: "1025+",
//     primaryImage: nft12,
//     secondaryImages: [nft10, nft5],
//     nftId: 12,
//   },

//   {
//     id: 12,
//     name: "Future Creatures",
//     artist: "MrFox",
//     artistAvatar: avatar3,
//     additionalNFTs: "1025+",
//     primaryImage: nft4,
//     secondaryImages: [nft7, nft10],
//     nftId: 4,
//   },
// ];

// /* ==================================================
//    NFT CARD
// ================================================== */

// function NFTCard({ item, onClick }) {
//   return (
//     <article
//       onClick={onClick}
//       role="button"
//       tabIndex={0}
//       onKeyDown={(event) => {
//         if (event.key === "Enter" || event.key === " ") {
//           onClick();
//         }
//       }}
//       className="
//         group
//         h-[469px]
//         w-full
//         min-w-0
//         cursor-pointer
//         overflow-hidden
//         rounded-[20px]
//         bg-[#212020]
//         transition-transform
//         duration-200
//         hover:-translate-y-1
//         focus:outline-none
//         focus:ring-2
//         focus:ring-[#A259FF]
//       "
//     >
//       {/* NFT IMAGE */}

//       <div className="h-[295px] w-full overflow-hidden rounded-t-[20px]">
//         <img
//           src={item.image}
//           alt={item.name}
//           className="
//             h-full
//             w-full
//             object-cover
//             transition-transform
//             duration-300
//             group-hover:scale-105
//           "
//         />
//       </div>

//       {/* NFT INFO */}

//       <div
//         className="
//           flex
//           h-[173px]
//           flex-col
//           gap-[25px]
//           px-[30px]
//           pb-[25px]
//           pt-[20px]
//         "
//       >
//         {/* ARTIST INFO */}

//         <div className="flex h-[60px] flex-col gap-[5px]">
//           {/* NFT NAME */}

//           <h3
//             className="
//               truncate
//               font-['Work_Sans']
//               text-[22px]
//               font-semibold
//               capitalize
//               leading-[140%]
//               text-white
//             "
//           >
//             {item.name}
//           </h3>

//           {/* AVATAR + ARTIST NAME */}

//           <div className="flex h-[24px] w-full items-center gap-[12px]">
//             <img
//               src={item.avatar}
//               alt={item.creator}
//               className="h-[24px] w-[24px] shrink-0 rounded-full object-cover"
//             />

//             <p
//               className="
//                 truncate
//                 font-['Space_Mono']
//                 text-[16px]
//                 font-normal
//                 leading-[140%]
//                 text-white
//               "
//             >
//               {item.creator}
//             </p>
//           </div>
//         </div>

//         {/* ADDITIONAL INFO */}

//         <div className="flex h-[43px] w-full justify-between">
//           {/* PRICE */}

//           <div className="flex w-1/2 flex-col gap-[8px]">
//             <span
//               className="
//                 font-['Space_Mono']
//                 text-[12px]
//                 font-normal
//                 leading-[110%]
//                 text-[#858584]
//               "
//             >
//               Price
//             </span>

//             <span
//               className="
//                 font-['Space_Mono']
//                 text-[16px]
//                 font-normal
//                 leading-[140%]
//                 text-white
//               "
//             >
//               {item.price}
//             </span>
//           </div>

//           {/* HIGHEST BID */}

//           <div className="flex w-1/2 flex-col items-end gap-[8px]">
//             <span
//               className="
//                 font-['Space_Mono']
//                 text-[12px]
//                 font-normal
//                 leading-[110%]
//                 text-[#858584]
//               "
//             >
//               Highest Bid
//             </span>

//             <span
//               className="
//                 font-['Space_Mono']
//                 text-[16px]
//                 font-normal
//                 leading-[140%]
//                 text-white
//               "
//             >
//               {item.bid}
//             </span>
//           </div>
//         </div>
//       </div>
//     </article>
//   );
// }

// /* ==================================================
//    COLLECTION CARD
// ================================================== */

// function CollectionCard({ collection }) {
//   return (
//     <article
//       className="
//         group
//         relative
//         mx-auto
//         flex
//         w-full
//         max-w-[380px]
//         flex-col
//         overflow-hidden
//         rounded-[20px]
//         bg-[#000000]
//         px-4
//         pb-6
//         pt-5

//         sm:max-w-[380px]
//         sm:px-5
//         sm:pb-6
//         sm:pt-5

//         md:px-6

//         lg:h-[525px]
//         lg:w-[380px]
//         lg:max-w-[380px]
//         lg:px-0
//         lg:pb-0
//         lg:pt-0
//       "
//     >
//       {/* Main Image */}
//       <Link
//         to={`/nft/${collection.nftId}`}
//         className="
//           block
//           w-full
//           overflow-hidden
//           rounded-[20px]

//           sm:w-full

//           lg:h-[330px]
//           lg:w-[380px]
//           lg:rounded-[20px]
//         "
//       >
//         <img
//           src={collection.primaryImage}
//           alt={collection.name}
//           className="
//             aspect-square
//             h-auto
//             w-full
//             object-cover
//             transition-transform
//             duration-500
//             group-hover:scale-105

//             sm:aspect-square

//             lg:h-[330px]
//             lg:w-[380px]
//             lg:aspect-auto
//           "
//         />
//       </Link>

//       {/* Small Images */}
//       <div
//         className="
//           mt-[15px]
//           grid
//           w-full
//           grid-cols-3
//           gap-[10px]

//           sm:gap-[15px]

//           lg:flex
//           lg:h-[100px]
//           lg:w-[380px]
//           lg:gap-[15px]
//         "
//       >
//         {collection.secondaryImages.map((image, index) => (
//           <Link
//             key={index}
//             to={`/nft/${collection.nftId}`}
//             className="
//               block
//               h-[100px]
//               w-full
//               overflow-hidden
//               rounded-[15px]

//               lg:h-[100px]
//               lg:w-[116px]
//             "
//           >
//             <img
//               src={image}
//               alt={`${collection.name}-${index}`}
//               className="
//                 h-full
//                 w-full
//                 object-cover
//                 transition-transform
//                 duration-500
//                 group-hover:scale-105
//               "
//             />
//           </Link>
//         ))}

//         {/* Additional NFTs */}
//         <Link
//           to={`/nft/${collection.nftId}`}
//           className="
//             flex
//             h-[100px]
//             w-full
//             items-center
//             justify-center
//             rounded-[15px]
//             bg-[#A259FF]
//             font-['Space_Mono']
//             text-[18px]
//             font-bold
//             text-white
//             transition-transform
//             duration-300
//             hover:scale-[1.02]

//             lg:h-[100px]
//             lg:w-[116px]
//           "
//         >
//           {collection.additionalNFTs}
//         </Link>
//       </div>

//       {/* Collection Info */}
//       <div
//         className="
//           mt-[10px]
//           w-full
//           lg:h-[65px]
//           lg:w-[380px]
//         "
//       >
//         {/* Collection Name */}
//         <h2
//           className="
//             w-full
//             truncate
//             font-['Work_Sans']
//             text-[22px]
//             font-semibold
//             leading-[31px]
//             text-white
//           "
//         >
//           {collection.name}
//         </h2>

//         {/* Artist */}
//         <div
//           className="
//             mt-[5px]
//             flex
//             h-[24px]
//             w-full
//             items-center
//             gap-[10px]
//           "
//         >
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
//               truncate
//               font-['Space_Mono']
//               text-[16px]
//               leading-[22px]
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




// // function CollectionCard({ collection }) {
// //   return (
// //     <article
// //       className="
// //         mx-auto
// //         flex
// //         w-full
// //         max-w-[380px]
// //         flex-col
// //         gap-[15px]
// //         overflow-hidden
// //         rounded-[20px]
// //         bg-[#2B2B2B]
// //         sm:h-[525px]
// //         sm:w-[330px]
// //         sm:max-w-[330px]
// //       "
// //     >
// //       {/* =================================================
// //           PHOTOS
// //       ================================================= */}

// //       <div className="w-full shrink-0 sm:h-[445px] sm:w-[330px]">
// //         {/* PRIMARY PHOTO */}

// //         <Link
// //           to={`/nft/${collection.nftId}`}
// //           className="
// //             group
// //             block
// //             aspect-square
// //             w-full
// //             overflow-hidden
// //             rounded-[20px]
// //             sm:h-[330px]
// //             sm:w-[330px]
// //           "
// //         >
// //           <img
// //             src={collection.primaryImage}
// //             alt={collection.name}
// //             className="
// //               h-full
// //               w-full
// //               object-cover
// //               transition-transform
// //               duration-300
// //               ease-out
// //               group-hover:scale-105
// //             "
// //           />
// //         </Link>

// //         {/* SECONDARY PHOTOS + COUNT */}

// //         <div className="mt-[15px] grid w-full grid-cols-3 gap-[15px] sm:h-[100px] sm:w-[330px]">
          
// //           {/* SECONDARY IMAGE 1 */}

// //           <Link
// //             to={`/nft/${collection.nftId}`}
// //             className="
// //               group
// //               block
// //               aspect-square
// //               w-full
// //               overflow-hidden
// //               rounded-[20px]
// //               sm:h-[100px]
// //               sm:w-[100px]
// //             "
// //           >
// //             <img
// //               src={collection.secondaryImages[0]}
// //               alt={`${collection.name} artwork 1`}
// //               className="
// //                 h-full
// //                 w-full
// //                 object-cover
// //                 transition-transform
// //                 duration-300
// //                 group-hover:scale-105
// //               "
// //             />
// //           </Link>

// //           {/* SECONDARY IMAGE 2 */}

// //           <Link
// //             to={`/nft/${collection.nftId}`}
// //             className="
// //               group
// //               block
// //               aspect-square
// //               w-full
// //               overflow-hidden
// //               rounded-[20px]
// //               sm:h-[100px]
// //               sm:w-[100px]
// //             "
// //           >
// //             <img
// //               src={collection.secondaryImages[1]}
// //               alt={`${collection.name} artwork 2`}
// //               className="
// //                 h-full
// //                 w-full
// //                 object-cover
// //                 transition-transform
// //                 duration-300
// //                 group-hover:scale-105
// //               "
// //             />
// //           </Link>

// //           {/* ADDITIONAL NFT NUMBER */}

// //           <Link
// //             to={`/nft/${collection.nftId}`}
// //             className="
// //               flex
// //               aspect-square
// //               w-full
// //               items-center
// //               justify-center
// //               rounded-[20px]
// //               bg-[#A259FF]
// //               transition-colors
// //               duration-200
// //               hover:bg-[#913FE8]
// //               sm:h-[100px]
// //               sm:w-[100px]
// //             "
// //           >
// //             <span
// //               className="
// //                 font-['Space Mono']
// //                 text-[14px]
// //                 font-bold
// //                 text-white
// //                 sm:text-[16px]
// //               "
// //             >
// //               {collection.additionalNFTs}
// //             </span>
// //           </Link>
// //         </div>
// //       </div>

// //       {/* =================================================
// //           COLLECTION INFO
// //       ================================================= */}

// //       <div className="w-full shrink-0 sm:h-[65px] sm:w-[330px]">
// //         {/* COLLECTION NAME */}

// //         <h2
// //           className="
// //             h-[31px]
// //             w-full
// //             truncate
// //             font-['Work Sans']
// //             text-[22px]
// //             font-semibold
// //             leading-[140%]
// //             capitalize
// //             text-white
// //           "
// //         >
// //           {collection.name}
// //         </h2>

// //         {/* ARTIST */}

// //         <div className="mt-[10px] flex h-[24px] w-full items-center gap-[10px]">
// //           <img
// //             src={collection.artistAvatar}
// //             alt={collection.artist}
// //             className="
// //               h-[24px]
// //               w-[24px]
// //               shrink-0
// //               rounded-full
// //               object-cover
// //             "
// //           />

// //           <span
// //             className="
// //               min-w-0
// //               flex-1
// //               truncate
// //               font-['Work Sans']
// //               text-[16px]
// //               font-normal
// //               leading-[140%]
// //               text-white
// //             "
// //           >
// //             {collection.artist}
// //           </span>
// //         </div>
// //       </div>
// //     </article>
// //   );
// // }

// /* ==================================================
//    MARKET COMPONENT
// ================================================== */

// const Market = () => {
//   const [searchTerm, setSearchTerm] = useState("");

//   const [activeTab, setActiveTab] = useState("nfts");

//   const navigate = useNavigate();

//   /* ==================================================
//      SEARCH FILTER
//   ================================================== */

//   const filteredNFTs = NFT_ITEMS.filter((item) => {
//     const searchValue = searchTerm.toLowerCase().trim();

//     return (
//       item.name.toLowerCase().includes(searchValue) ||
//       item.creator.toLowerCase().includes(searchValue)
//     );
//   });

//   return (
//     <>
//       {/* =================================================
//           NAVBAR
//       ================================================= */}

//       <Navbar />

//       {/* =================================================
//           MARKETPLACE HERO
//       ================================================= */}

//       <section className="w-full bg-[#000000]">
//         <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 md:py-20 lg:px-10">
//           <div className="flex flex-col gap-8">
//             {/* HEADING */}

//             <div className="text-left">
//               <h1 className="text-4xl font-bold leading-tight text-white sm:text-5xl md:text-6xl">
//                 Browse Marketplace
//               </h1>

//               <p className="mt-4 max-w-2xl text-xl leading-relaxed text-gray-300 sm:text-lg md:text-xl">
//                 Browse through more than 50k NFTs on the NFT Marketplace.
//               </p>
//             </div>

//             {/* SEARCH */}

//             <div className="relative w-full">
//               <input
//                 type="text"
//                 value={searchTerm}
//                 onChange={(event) => setSearchTerm(event.target.value)}
//                 placeholder="Search your favourite NFTs"
//                 className="
//                   w-full
//                   rounded-2xl
//                   border
//                   border-[#3A3A3A]
//                   bg-transparent
//                   px-5
//                   py-4
//                   pr-14
//                   text-sm
//                   text-white
//                   outline-none
//                   transition-colors
//                   duration-200
//                   placeholder:text-gray-500
//                   focus:border-[#7C3AED]
//                   sm:text-base
//                 "
//               />

//               <Search
//                 className="
//                   absolute
//                   right-5
//                   top-1/2
//                   h-5
//                   w-5
//                   -translate-y-1/2
//                   text-gray-300
//                 "
//               />
//             </div>
//           </div>
//         </div>
//       </section>

//        {/* FULL WIDTH DIVIDER */}
//       <div className="h-px w-full bg-[#3B3B3B]" />
      
//       {/* =================================================
//           MARKETPLACE TABS
//       ================================================= */}

//       <section className="w-full bg-[#000000]">
//         <div className="mx-auto flex h-[70px] w-full max-w-[1200px] items-end px-5 sm:px-6 lg:px-0">
//           <div className="flex h-[60px] w-full ">

//             {/* ================= NFT TAB ================= */}

//             <button
//               type="button"
//               onClick={() => setActiveTab("nfts")}
//               className={`
//                 flex
//                 h-[60px]
//                 w-1/2
//                 items-center
//                 justify-center
//                 gap-1
//                 px-1
//                 sm:gap-4
//                 sm:px-[30px]
//                 border-b-2
//                 transition-colors
//                 duration-200
//                 ${
//                   activeTab === "nfts"
//                     ? "border-[#858584]"
//                     : "border-transparent"
//                 }
//               `}
//             >
//               <span
//                 className={`
//                   font-['Work_Sans']
//                   text-[14px]
//                   sm:text-[22px]
//                   font-semibold
//                   leading-[140%]
//                   capitalize
//                   whitespace-nowrap
//                   ${
//                     activeTab === "nfts"
//                       ? "text-white"
//                       : "text-[#858584]"
//                   }
//                 `}
//               >
//                 NFTs
//               </span>

//               <span
//                 className={`
//                   flex
//                   h-7
//                   min-w-[34px]
//                   sm:h-8
//                   sm:min-w-[50px]
//                   items-center
//                   justify-center
//                   rounded-[20px]
//                   px-2
//                   sm:px-[10px]
//                   py-[4px]
//                   sm:py-[5px]
//                   font-['Space_Mono']
//                   text-xs
//                   sm:text-base
//                   font-normal
//                   leading-[140%]
//                   text-white
//                   ${
//                     activeTab === "nfts"
//                       ? "bg-[#858584]"
//                       : "bg-[#3B3B3B]"
//                   }
//                 `}
//               >
//                 302
//               </span>
//             </button>

//             {/* ================= COLLECTION TAB ================= */}

//             <button
//               type="button"
//               onClick={() => setActiveTab("collections")}
//               className={`
//                 flex
//                 h-[60px]
//                 w-1/2
//                 items-center
//                 justify-center
//                 gap-1
//                 px-1
//                 sm:gap-4
//                 sm:px-[30px]
//                 border-b-2
//                 transition-colors
//                 duration-200
//                 ${
//                   activeTab === "collections"
//                     ? "border-[#858584]"
//                     : "border-transparent"
//                 }
//               `}
//             >
//               <span
//                 className={`
//                   font-['Work_Sans']
//                   text-[14px]
//                   sm:text-[22px]
//                   font-semibold
//                   leading-[140%]
//                   capitalize
//                   whitespace-nowrap
//                   ${
//                     activeTab === "collections"
//                       ? "text-white"
//                       : "text-[#858584]"
//                   }
//                 `}
//               >
//                 Collections
//               </span>

//               <span
//                 className={`
//                   flex
//                   h-7
//                   min-w-[34px]
//                   sm:h-8
//                   sm:min-w-[40px]
//                   items-center
//                   justify-center
//                   rounded-[20px]
//                   px-2
//                   sm:px-[10px]
//                   py-[4px]
//                   sm:py-[5px]
//                   font-['Space_Mono']
//                   text-xs
//                   sm:text-base
//                   font-normal
//                   leading-[140%]
//                   text-white
//                   ${
//                     activeTab === "collections"
//                       ? "bg-[#858584]"
//                       : "bg-[#3B3B3B]"
//                   }
//                 `}
//               >
//                 67
//               </span>
//             </button>

//           </div>
//         </div>
//       </section>

//       {/* =================================================
//           NFT CONTENT
//       ================================================= */}

//       {activeTab === "nfts" && (
//         <section className="w-full bg-[#000000] pb-[80px] pt-[60px]">
//           <div
//             className="
//               mx-auto
//               grid
//               w-full
//               max-w-[1200px]
//               grid-cols-1
//               gap-[30px]
//               px-5
//               sm:grid-cols-2
//               lg:grid-cols-3
//               lg:px-0
//             "
//           >
//             {filteredNFTs.length > 0 ? (
//               filteredNFTs.map((item) => (
//                 <NFTCard
//                   key={item.id}
//                   item={item}
//                   onClick={() =>
//                     navigate(`/nft/${item.id}`)
//                   }
//                 />
//               ))
//             ) : (
//               <div className="col-span-full flex min-h-[250px] items-center justify-center">
//                 <p className="font-['Work_Sans'] text-lg text-[#858584]">
//                   No NFTs found.
//                 </p>
//               </div>
//             )}
//           </div>
//         </section>
//       )}

//       {/* =================================================
//           COLLECTION CONTENT
//       ================================================= */}

//       {activeTab === "collections" && (
//         <section className="w-full bg-[#000000] pb-[80px] pt-[60px]">
//           <div
//             className="
//               mx-auto
//               grid
//               w-full
//               max-w-[1220px]
//               grid-cols-1
//               gap-x-[10px]
//               gap-y-[40px]
//               px-5
//               sm:grid-cols-2
//               lg:grid-cols-3
//               lg:px-0
//             "
//           >
//             {COLLECTION_ITEMS.map((collection) => (
//               <CollectionCard
//                 key={collection.id}
//                 collection={collection}
//               />
//             ))}
//           </div>
//         </section>
//       )}

//       {/* =================================================
//           FOOTER
//       ================================================= */}

//       <Footer />
//     </>
//   );
// };

// export default Market;






// import React, { useEffect, useMemo, useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import { Search, Image as ImageIcon, RefreshCw } from "lucide-react";

// import Navbar from "../common/Navbar";
// import Footer from "../common/Footer";

// const API_URL =
//   import.meta.env.VITE_API_URL ||
//   "https://nifty-verse-backend-production.up.railway.app";

// const getId = (item) => String(item?._id || item?.id || "");

// const getInitials = (name = "Creator") =>
//   String(name)
//     .trim()
//     .split(/\s+/)
//     .filter(Boolean)
//     .slice(0, 2)
//     .map((part) => part.charAt(0).toUpperCase())
//     .join("") || "C";

// const formatETH = (value) => {
//   const amount = Number(value ?? 0);
//   return `${Number.isFinite(amount) ? amount : 0} ETH`;
// };

// const parseNFT = (nft) => ({
//   ...nft,
//   id: getId(nft),
//   image: nft.image || "",
//   avatar:
//     nft.creatorAvatar ||
//     nft.createdBy?.profileImage ||
//     nft.createdBy?.avatar ||
//     "",
//   name: nft.name || "Untitled NFT",
//   creator:
//     nft.creator ||
//     nft.createdBy?.username ||
//     nft.createdBy?.name ||
//     "Creator",
//   price: formatETH(nft.price),
//   bid: formatETH(nft.highestBid),
// });

// const parseCollection = (collection) => {
//   const images = Array.isArray(collection.secondaryImages)
//     ? collection.secondaryImages
//         .map((entry) =>
//           typeof entry === "string" ? entry : entry?.image || ""
//         )
//         .filter(Boolean)
//     : [];

//   return {
//     ...collection,
//     id: getId(collection),
//     name: collection.name || "Untitled Collection",
//     artist:
//       collection.artist ||
//       collection.createdBy?.username ||
//       collection.creator ||
//       "Creator",
//     artistAvatar:
//       collection.artistAvatar ||
//       collection.createdBy?.profileImage ||
//       collection.createdBy?.avatar ||
//       "",
//     primaryImage: collection.primaryImage || collection.image || images[0] || "",
//     secondaryImages: images.slice(0, 2),
//     additionalNFTs:
//       collection.additionalNFTs ??
//       `${collection.nftCount ?? collection.nfts?.length ?? 0} NFTs`,
//     nftId:
//       collection.nftId ||
//       collection.nfts?.[0]?._id ||
//       collection.nfts?.[0]?.id ||
//       "",
//   };
// };

// function Avatar({ src, name, className = "" }) {
//   const [failed, setFailed] = useState(false);

//   useEffect(() => {
//     setFailed(false);
//   }, [src]);

//   if (src && !failed) {
//     return (
//       <img
//         src={src}
//         alt={name || "Creator"}
//         onError={() => setFailed(true)}
//         className={`shrink-0 rounded-full object-cover ${className}`}
//       />
//     );
//   }

//   return (
//     <div
//       aria-label={name || "Creator"}
//       className={`flex shrink-0 items-center justify-center rounded-full bg-[#A259FF] font-bold text-white ${className}`}
//     >
//       {getInitials(name)}
//     </div>
//   );
// }

// /* ==================================================
//    RESPONSIVE NFT CARD
// ================================================== */

// function NFTCard({ item, onClick }) {
//   return (
//     <article
//       onClick={onClick}
//       role="button"
//       tabIndex={0}
//       onKeyDown={(event) => {
//         if (event.key === "Enter" || event.key === " ") {
//           event.preventDefault();
//           onClick();
//         }
//       }}
//       className="group flex h-full min-w-0 cursor-pointer flex-col overflow-hidden rounded-2xl bg-[#212020] transition-transform duration-200 hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-[#A259FF] sm:rounded-[20px]"
//     >
//       {/* Image scales with the card width */}
//       <div className="aspect-[1.29/1] w-full shrink-0 overflow-hidden bg-[#191919]">
//         {item.image ? (
//           <img
//             src={item.image}
//             alt={item.name}
//             loading="lazy"
//             onError={(event) => {
//               event.currentTarget.style.display = "none";
//             }}
//             className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
//           />
//         ) : (
//           <div className="flex h-full w-full items-center justify-center text-[#858584]">
//             <ImageIcon size={36} />
//           </div>
//         )}
//       </div>

//       {/* Details have flexible height and mobile-friendly padding */}
//       <div className="flex min-w-0 flex-1 flex-col gap-4 p-4 sm:gap-5 sm:p-5 lg:gap-[25px] lg:px-[30px] lg:pb-[25px] lg:pt-5">
//         <div className="flex min-w-0 flex-col gap-2">
//           <h3 className="truncate font-['Work_Sans'] text-lg font-semibold capitalize leading-[1.4] text-white sm:text-xl lg:text-[22px]">
//             {item.name}
//           </h3>

//           <div className="flex min-w-0 items-center gap-2 sm:gap-3">
//             <Avatar
//               src={item.avatar}
//               name={item.creator}
//               className="h-6 w-6 text-[9px]"
//             />
//             <p className="min-w-0 truncate font-['Space_Mono'] text-xs font-normal leading-[1.4] text-white sm:text-sm lg:text-base">
//               {item.creator}
//             </p>
//           </div>
//         </div>

//         <div className="grid min-w-0 grid-cols-2 gap-3 border-t border-white/[0.06] pt-3 sm:gap-4 sm:pt-4 lg:border-0 lg:pt-0">
//           <div className="flex min-w-0 flex-col gap-1.5">
//             <span className="font-['Space_Mono'] text-[11px] font-normal leading-tight text-[#858584] sm:text-xs">
//               Price
//             </span>
//             <span className="truncate font-['Space_Mono'] text-xs font-normal leading-[1.4] text-white sm:text-sm lg:text-base">
//               {item.price}
//             </span>
//           </div>

//           <div className="flex min-w-0 flex-col items-end gap-1.5 text-right">
//             <span className="font-['Space_Mono'] text-[11px] font-normal leading-tight text-[#858584] sm:text-xs">
//               Highest Bid
//             </span>
//             <span className="max-w-full truncate font-['Space_Mono'] text-xs font-normal leading-[1.4] text-white sm:text-sm lg:text-base">
//               {item.bid}
//             </span>
//           </div>
//         </div>
//       </div>
//     </article>
//   );
// }

// /* ==================================================
//    RESPONSIVE COLLECTION CARD
// ================================================== */

// function CollectionCard({ collection }) {
//   const collectionLink = collection.id
//     ? `/collection/${collection.id}`
//     : "/collections";

//   return (
//     <article className="group mx-auto flex w-full min-w-0 max-w-[380px] flex-col overflow-hidden rounded-2xl bg-[#000000] sm:rounded-[20px]">
//       {/* Main image */}
//       <Link
//         to={collectionLink}
//         className="block aspect-square w-full overflow-hidden rounded-2xl bg-[#212020] sm:rounded-[20px]"
//       >
//         {collection.primaryImage ? (
//           <img
//             src={collection.primaryImage}
//             alt={collection.name}
//             loading="lazy"
//             className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
//           />
//         ) : (
//           <div className="flex h-full w-full items-center justify-center text-[#858584]">
//             <ImageIcon size={36} />
//           </div>
//         )}
//       </Link>

//       {/* Secondary artwork and count tile */}
//       <div className="mt-3 grid w-full grid-cols-3 gap-2 sm:mt-[15px] sm:gap-3">
//         {[0, 1].map((index) => {
//           const image =
//             collection.secondaryImages[index] || collection.primaryImage;

//           return (
//             <Link
//               key={`${collection.id}-secondary-${index}`}
//               to={collectionLink}
//               className="aspect-square min-w-0 overflow-hidden rounded-xl bg-[#212020] sm:rounded-[15px]"
//             >
//               {image ? (
//                 <img
//                   src={image}
//                   alt={`${collection.name} artwork ${index + 1}`}
//                   loading="lazy"
//                   className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
//                 />
//               ) : (
//                 <div className="flex h-full items-center justify-center text-[#858584]">
//                   <ImageIcon size={22} />
//                 </div>
//               )}
//             </Link>
//           );
//         })}

//         <Link
//           to={collectionLink}
//           className="flex aspect-square min-w-0 items-center justify-center break-words rounded-xl bg-[#A259FF] px-1 text-center font-['Space_Mono'] text-xs font-bold leading-tight text-white transition-transform duration-300 hover:scale-[1.02] sm:rounded-[15px] sm:text-base lg:text-lg"
//         >
//           {collection.additionalNFTs}
//         </Link>
//       </div>

//       {/* Collection information */}
//       <div className="mt-3 min-w-0 pb-1 sm:mt-[10px]">
//         <Link
//           to={collectionLink}
//           className="block"
//         >
//           <h2 className="w-full truncate font-['Work_Sans'] text-lg font-semibold leading-[1.4] text-white sm:text-xl lg:text-[22px]">
//             {collection.name}
//           </h2>
//         </Link>

//         <div className="mt-2 flex min-w-0 items-center gap-2 sm:gap-[10px]">
//           <Avatar
//             src={collection.artistAvatar}
//             name={collection.artist}
//             className="h-6 w-6 text-[9px]"
//           />
//           <span className="min-w-0 truncate font-['Space_Mono'] text-xs leading-[1.4] text-white sm:text-sm lg:text-base">
//             {collection.artist}
//           </span>
//         </div>
//       </div>
//     </article>
//   );
// }

// /* ==================================================
//    MARKETPLACE
// ================================================== */

// const Market = () => {
//   const [searchTerm, setSearchTerm] = useState("");
//   const [activeTab, setActiveTab] = useState("nfts");
//   const [nfts, setNfts] = useState([]);
//   const [collections, setCollections] = useState([]);
//   const [loadingNFTs, setLoadingNFTs] = useState(true);
//   const [loadingCollections, setLoadingCollections] = useState(true);
//   const [nftError, setNftError] = useState("");
//   const [collectionError, setCollectionError] = useState("");
//   const [refreshing, setRefreshing] = useState(false);
//   const navigate = useNavigate();

//   const loadMarketplace = async () => {
//     setLoadingNFTs(true);
//     setLoadingCollections(true);
//     setNftError("");
//     setCollectionError("");

//     const nftRequest = fetch(`${API_URL}/api/nfts`, {
//       cache: "no-store",
//     })
//       .then(async (response) => {
//         const data = await response.json().catch(() => ({}));
//         if (!response.ok || data.success === false) {
//           throw new Error(data.message || "Unable to load marketplace NFTs.");
//         }
//         setNfts((Array.isArray(data.nfts) ? data.nfts : []).map(parseNFT));
//       })
//       .catch((error) => {
//         console.error("Marketplace NFT loading error:", error);
//         setNftError(error.message || "Unable to load marketplace NFTs.");
//       })
//       .finally(() => setLoadingNFTs(false));

//     const collectionRequest = fetch(`${API_URL}/api/collections`, {
//       cache: "no-store",
//     })
//       .then(async (response) => {
//         const data = await response.json().catch(() => ({}));
//         if (!response.ok || data.success === false) {
//           throw new Error(data.message || "Unable to load collections.");
//         }
//         setCollections(
//           (Array.isArray(data.collections) ? data.collections : []).map(
//             parseCollection
//           )
//         );
//       })
//       .catch((error) => {
//         console.error("Marketplace collection loading error:", error);
//         setCollectionError(error.message || "Unable to load collections.");
//       })
//       .finally(() => setLoadingCollections(false));

//     await Promise.all([nftRequest, collectionRequest]);
//   };

//   useEffect(() => {
//     loadMarketplace();
//     // Fetch when the marketplace page mounts.
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, []);

//   const filteredNFTs = useMemo(() => {
//     const query = searchTerm.toLowerCase().trim();
//     if (!query) return nfts;

//     return nfts.filter((item) =>
//       [item.name, item.creator, item.description, item.category]
//         .filter(Boolean)
//         .some((value) => String(value).toLowerCase().includes(query))
//     );
//   }, [nfts, searchTerm]);

//   const filteredCollections = useMemo(() => {
//     const query = searchTerm.toLowerCase().trim();
//     if (!query) return collections;

//     return collections.filter((collection) =>
//       [collection.name, collection.artist, collection.description]
//         .filter(Boolean)
//         .some((value) => String(value).toLowerCase().includes(query))
//     );
//   }, [collections, searchTerm]);

//   const handleRefresh = async () => {
//     setRefreshing(true);
//     try {
//       await loadMarketplace();
//     } finally {
//       setRefreshing(false);
//     }
//   };

//   return (
//     <div className="min-h-screen w-full min-w-0 overflow-x-clip bg-black text-white">
//       <Navbar />

//       {/* HERO */}
//       <section className="w-full min-w-0 bg-black">
//         <div className="mx-auto w-full max-w-7xl px-4 py-10 sm:px-6 sm:py-14 md:py-20 lg:px-10">
//           <div className="flex min-w-0 flex-col gap-6 sm:gap-8">
//             <div className="min-w-0 text-left">
//               <h1 className="break-words font-['Work_Sans'] text-3xl font-bold leading-tight text-white min-[380px]:text-4xl sm:text-5xl md:text-6xl">
//                 Browse Marketplace
//               </h1>
//               <p className="mt-3 max-w-2xl break-words text-base leading-relaxed text-gray-300 sm:mt-4 sm:text-lg md:text-xl">
//                 Browse through more than 50k NFTs on the NFT Marketplace.
//               </p>
//             </div>

//             <div className="relative w-full min-w-0">
//               <input
//                 type="search"
//                 value={searchTerm}
//                 onChange={(event) => setSearchTerm(event.target.value)}
//                 placeholder="Search your favourite NFTs"
//                 aria-label="Search NFTs or collections"
//                 className="block w-full min-w-0 rounded-xl border border-[#3A3A3A] bg-transparent px-4 py-3 pr-12 text-sm text-white outline-none transition-colors duration-200 placeholder:text-gray-500 focus:border-[#7C3AED] sm:rounded-2xl sm:px-5 sm:py-4 sm:text-base"
//               />
//               <Search className="pointer-events-none absolute right-4 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-300 sm:right-5" />
//             </div>

//             {/* <div className="flex justify-end">
//               <button
//                 type="button"
//                 onClick={handleRefresh}
//                 disabled={refreshing}
//                 className="inline-flex min-h-10 items-center justify-center gap-2 rounded-xl border border-[#3A3A3A] px-3 py-2 text-xs text-[#C7C7C7] transition hover:border-[#A259FF] hover:text-white disabled:opacity-60 sm:px-4 sm:text-sm"
//               >
//                 <RefreshCw
//                   size={15}
//                   className={refreshing ? "animate-spin" : ""}
//                 />
//                 Refresh
//               </button>
//             </div> */}
//           </div>
//         </div>
//       </section>

//       <div className="h-px w-full bg-[#3B3B3B]" />

//       {/* TABS */}
//       <section className="w-full min-w-0 bg-black">
//         <div className="mx-auto flex h-[64px] w-full max-w-[1200px] items-end px-3 sm:h-[70px] sm:px-6 lg:px-0">
//           <div className="flex h-[56px] w-full min-w-0 sm:h-[60px]">
//             <button
//               type="button"
//               onClick={() => setActiveTab("nfts")}
//               className={`flex h-full min-w-0 w-1/2 items-center justify-center gap-1 border-b-2 px-1 transition-colors duration-200 sm:gap-3 sm:px-4 lg:gap-4 lg:px-[30px] ${activeTab === "nfts" ? "border-[#858584]" : "border-transparent"}`}
//             >
//               <span className={`truncate font-['Work_Sans'] text-sm font-semibold capitalize leading-[140%] min-[380px]:text-base sm:text-xl lg:text-[22px] ${activeTab === "nfts" ? "text-white" : "text-[#858584]"}`}>
//                 NFTs
//               </span>
//               <span className={`flex h-6 min-w-7 shrink-0 items-center justify-center rounded-full px-2 font-['Space_Mono'] text-[11px] font-normal leading-[140%] text-white sm:h-8 sm:min-w-[42px] sm:text-sm lg:min-w-[50px] lg:text-base ${activeTab === "nfts" ? "bg-[#858584]" : "bg-[#3B3B3B]"}`}>
//                 {loadingNFTs ? "…" : nfts.length}
//               </span>
//             </button>

//             <button
//               type="button"
//               onClick={() => setActiveTab("collections")}
//               className={`flex h-full min-w-0 w-1/2 items-center justify-center gap-1 border-b-2 px-1 transition-colors duration-200 sm:gap-3 sm:px-4 lg:gap-4 lg:px-[30px] ${activeTab === "collections" ? "border-[#858584]" : "border-transparent"}`}
//             >
//               <span className={`truncate font-['Work_Sans'] text-sm font-semibold capitalize leading-[140%] min-[380px]:text-base sm:text-xl lg:text-[22px] ${activeTab === "collections" ? "text-white" : "text-[#858584]"}`}>
//                 Collections
//               </span>
//               <span className={`flex h-6 min-w-7 shrink-0 items-center justify-center rounded-full px-2 font-['Space_Mono'] text-[11px] font-normal leading-[140%] text-white sm:h-8 sm:min-w-[42px] sm:text-sm lg:min-w-[50px] lg:text-base ${activeTab === "collections" ? "bg-[#858584]" : "bg-[#3B3B3B]"}`}>
//                 {loadingCollections ? "…" : collections.length}
//               </span>
//             </button>
//           </div>
//         </div>
//       </section>

//       {/* NFT GRID */}
//       {activeTab === "nfts" && (
//         <section className="w-full min-w-0 bg-black pb-12 pt-8 sm:pb-16 sm:pt-12 lg:pb-20 lg:pt-[60px]">
//           <div className="mx-auto grid w-full min-w-0 max-w-[1200px] grid-cols-1 gap-5 px-4 sm:grid-cols-2 sm:gap-6 sm:px-6 lg:grid-cols-3 lg:gap-[30px] lg:px-0">
//             {loadingNFTs ? (
//               <div className="col-span-full flex min-h-48 items-center justify-center text-center text-sm text-[#858584] sm:text-base">
//                 Loading marketplace NFTs...
//               </div>
//             ) : nftError ? (
//               <div className="col-span-full flex min-h-48 flex-col items-center justify-center gap-4 text-center">
//                 <p className="max-w-xl break-words text-sm text-red-400 sm:text-base">
//                   {nftError}
//                 </p>
//                 <button
//                   type="button"
//                   onClick={handleRefresh}
//                   className="rounded-xl bg-[#A259FF] px-4 py-2 text-sm font-semibold text-white hover:bg-[#9147E8]"
//                 >
//                   Try again
//                 </button>
//               </div>
//             ) : filteredNFTs.length > 0 ? (
//               filteredNFTs.map((item) => (
//                 <NFTCard
//                   key={item.id}
//                   item={item}
//                   onClick={() => {
//                     if (item.id) navigate(`/nft/${item.id}`);
//                   }}
//                 />
//               ))
//             ) : (
//               <div className="col-span-full flex min-h-48 items-center justify-center px-2 text-center">
//                 <p className="break-words font-['Work_Sans'] text-base text-[#858584] sm:text-lg">
//                   {searchTerm
//                     ? "No NFTs match your search."
//                     : "No published NFTs found yet. Create and publish an NFT to see it here."}
//                 </p>
//               </div>
//             )}
//           </div>
//         </section>
//       )}

//       {/* COLLECTION GRID */}
//       {activeTab === "collections" && (
//         <section className="w-full min-w-0 bg-black pb-12 pt-8 sm:pb-16 sm:pt-12 lg:pb-20 lg:pt-[60px]">
//           <div className="mx-auto grid w-full min-w-0 max-w-[1220px] grid-cols-1 gap-x-5 gap-y-8 px-4 sm:grid-cols-2 sm:gap-x-6 sm:gap-y-10 sm:px-6 lg:grid-cols-3 lg:gap-x-[20px] lg:gap-y-[40px] lg:px-0">
//             {loadingCollections ? (
//               <div className="col-span-full py-10 text-center text-sm text-[#858584] sm:text-base">
//                 Loading collections...
//               </div>
//             ) : collectionError ? (
//               <div className="col-span-full flex min-h-48 flex-col items-center justify-center gap-4 text-center">
//                 <p className="max-w-xl break-words text-sm text-red-400 sm:text-base">
//                   {collectionError}
//                 </p>
//                 <button
//                   type="button"
//                   onClick={handleRefresh}
//                   className="rounded-xl bg-[#A259FF] px-4 py-2 text-sm font-semibold text-white hover:bg-[#9147E8]"
//                 >
//                   Try again
//                 </button>
//               </div>
//             ) : filteredCollections.length > 0 ? (
//               filteredCollections.map((collection) => (
//                 <CollectionCard
//                   key={collection.id}
//                   collection={collection}
//                 />
//               ))
//             ) : (
//               <div className="col-span-full py-10 text-center text-sm text-[#858584] sm:text-base">
//                 {searchTerm
//                   ? "No collections match your search."
//                   : "No published collections found yet."}
//               </div>
//             )}
//           </div>
//         </section>
//       )}

//       <Footer />
//     </div>
//   );
// };

// export default Market;





import React, { useEffect, useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Search, Image as ImageIcon, RefreshCw, Heart } from "lucide-react";

import Navbar from "../common/Navbar";
import Footer from "../common/Footer";

const API_URL =
  import.meta.env.VITE_API_URL ||
  "https://nifty-verse-backend-production.up.railway.app";

const getId = (item) => String(item?._id || item?.id || "");

const getInitials = (name = "Creator") =>
  String(name)
    .trim()
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part.charAt(0).toUpperCase())
    .join("") || "C";

const formatETH = (value) => {
  const amount = Number(value ?? 0);
  return `${Number.isFinite(amount) ? amount : 0} ETH`;
};

const parseNFT = (nft) => ({
  ...nft,
  id: getId(nft),
  image: nft.image || "",
  avatar:
    nft.creatorAvatar ||
    nft.createdBy?.profileImage ||
    nft.createdBy?.avatar ||
    "",
  name: nft.name || "Untitled NFT",
  creator:
    nft.creator ||
    nft.createdBy?.username ||
    nft.createdBy?.name ||
    "Creator",
  price: formatETH(nft.price),
  bid: formatETH(nft.highestBid),
});

const parseCollection = (collection) => {
  const images = Array.isArray(collection.secondaryImages)
    ? collection.secondaryImages
        .map((entry) =>
          typeof entry === "string" ? entry : entry?.image || ""
        )
        .filter(Boolean)
    : [];

  return {
    ...collection,
    id: getId(collection),
    name: collection.name || "Untitled Collection",
    artist:
      collection.artist ||
      collection.createdBy?.username ||
      collection.creator ||
      "Creator",
    artistAvatar:
      collection.artistAvatar ||
      collection.createdBy?.profileImage ||
      collection.createdBy?.avatar ||
      "",
    primaryImage:
      collection.primaryImage || collection.image || images[0] || "",
    secondaryImages: images.slice(0, 2),
    additionalNFTs:
      collection.additionalNFTs ??
      `${collection.nftCount ?? collection.nfts?.length ?? 0} NFTs`,
    nftId:
      collection.nftId ||
      collection.nfts?.[0]?._id ||
      collection.nfts?.[0]?.id ||
      "",
  };
};

function Avatar({ src, name, className = "" }) {
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    setFailed(false);
  }, [src]);

  if (src && !failed) {
    return (
      <img
        src={src}
        alt={name || "Creator"}
        onError={() => setFailed(true)}
        className={`shrink-0 rounded-full object-cover ${className}`}
      />
    );
  }

  return (
    <div
      aria-label={name || "Creator"}
      className={`flex shrink-0 items-center justify-center rounded-full bg-[#A259FF] font-bold text-white ${className}`}
    >
      {getInitials(name)}
    </div>
  );
}

/* ==================================================
   RESPONSIVE NFT CARD
================================================== */

function NFTCard({
  item,
  onClick,
  isFavorite,
  isFavoriteBusy,
  onToggleFavorite,
}) {
  return (
    <article
      onClick={onClick}
      role="button"
      tabIndex={0}
      onKeyDown={(event) => {
        if (event.target !== event.currentTarget) return;

        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          onClick();
        }
      }}
      className="group flex h-full min-w-0 cursor-pointer flex-col overflow-hidden rounded-2xl bg-[#212020] transition-transform duration-200 hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-[#A259FF] sm:rounded-[20px]"
    >
      {/* NFT Image + Favorite Heart */}
      <div className="relative aspect-[1.29/1] w-full shrink-0 overflow-hidden bg-[#191919]">
        {item.image ? (
          <img
            src={item.image}
            alt={item.name}
            loading="lazy"
            onError={(event) => {
              event.currentTarget.style.display = "none";
            }}
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-[#858584]">
            <ImageIcon size={36} />
          </div>
        )}

        <button
          type="button"
          onClick={(event) => {
            event.stopPropagation();
            onToggleFavorite(item);
          }}
          disabled={isFavoriteBusy}
          aria-label={
            isFavorite
              ? `Remove ${item.name} from favorites`
              : `Add ${item.name} to favorites`
          }
          aria-pressed={isFavorite}
          title={isFavorite ? "Remove from Favorites" : "Add to Favorites"}
          className={`absolute right-3 top-3 z-10 flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-black/65 text-white shadow-lg backdrop-blur-md transition hover:scale-105 disabled:cursor-wait disabled:opacity-60 ${
            isFavorite
              ? "text-[#FF5B8D]"
              : "text-white hover:text-[#FF5B8D]"
          }`}
        >
          {isFavoriteBusy ? (
            <RefreshCw size={18} className="animate-spin" />
          ) : (
            <Heart
              size={19}
              fill={isFavorite ? "currentColor" : "none"}
              strokeWidth={2}
            />
          )}
        </button>
      </div>

      {/* NFT Details */}
      <div className="flex min-w-0 flex-1 flex-col gap-4 p-4 sm:gap-5 sm:p-5 lg:gap-[25px] lg:px-[30px] lg:pb-[25px] lg:pt-5">
        <div className="flex min-w-0 flex-col gap-2">
          <h3 className="truncate font-['Work_Sans'] text-lg font-semibold capitalize leading-[1.4] text-white sm:text-xl lg:text-[22px]">
            {item.name}
          </h3>

          <div className="flex min-w-0 items-center gap-2 sm:gap-3">
            <Avatar
              src={item.avatar}
              name={item.creator}
              className="h-6 w-6 text-[9px]"
            />

            <p className="min-w-0 truncate font-['Space_Mono'] text-xs font-normal leading-[1.4] text-white sm:text-sm lg:text-base">
              {item.creator}
            </p>
          </div>
        </div>

        <div className="grid min-w-0 grid-cols-2 gap-3 border-t border-white/[0.06] pt-3 sm:gap-4 sm:pt-4 lg:border-0 lg:pt-0">
          <div className="flex min-w-0 flex-col gap-1.5">
            <span className="font-['Space_Mono'] text-[11px] font-normal leading-tight text-[#858584] sm:text-xs">
              Price
            </span>

            <span className="truncate font-['Space_Mono'] text-xs font-normal leading-[1.4] text-white sm:text-sm lg:text-base">
              {item.price}
            </span>
          </div>

          <div className="flex min-w-0 flex-col items-end gap-1.5 text-right">
            <span className="font-['Space_Mono'] text-[11px] font-normal leading-tight text-[#858584] sm:text-xs">
              Highest Bid
            </span>

            <span className="max-w-full truncate font-['Space_Mono'] text-xs font-normal leading-[1.4] text-white sm:text-sm lg:text-base">
              {item.bid}
            </span>
          </div>
        </div>
      </div>
    </article>
  );
}

/* ==================================================
   RESPONSIVE COLLECTION CARD
================================================== */

function CollectionCard({ collection }) {
  const collectionLink = collection.id
    ? `/collection/${collection.id}`
    : "/collections";

  return (
    <article className="group mx-auto flex w-full min-w-0 max-w-[380px] flex-col overflow-hidden rounded-2xl bg-[#000000] sm:rounded-[20px]">
      {/* Main image */}
      <Link
        to={collectionLink}
        className="block aspect-square w-full overflow-hidden rounded-2xl bg-[#212020] sm:rounded-[20px]"
      >
        {collection.primaryImage ? (
          <img
            src={collection.primaryImage}
            alt={collection.name}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-[#858584]">
            <ImageIcon size={36} />
          </div>
        )}
      </Link>

      {/* Secondary artwork and count tile */}
      <div className="mt-3 grid w-full grid-cols-3 gap-2 sm:mt-[15px] sm:gap-3">
        {[0, 1].map((index) => {
          const image =
            collection.secondaryImages[index] || collection.primaryImage;

          return (
            <Link
              key={`${collection.id}-secondary-${index}`}
              to={collectionLink}
              className="aspect-square min-w-0 overflow-hidden rounded-xl bg-[#212020] sm:rounded-[15px]"
            >
              {image ? (
                <img
                  src={image}
                  alt={`${collection.name} artwork ${index + 1}`}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              ) : (
                <div className="flex h-full items-center justify-center text-[#858584]">
                  <ImageIcon size={22} />
                </div>
              )}
            </Link>
          );
        })}

        <Link
          to={collectionLink}
          className="flex aspect-square min-w-0 items-center justify-center break-words rounded-xl bg-[#A259FF] px-1 text-center font-['Space_Mono'] text-xs font-bold leading-tight text-white transition-transform duration-300 hover:scale-[1.02] sm:rounded-[15px] sm:text-base lg:text-lg"
        >
          {collection.additionalNFTs}
        </Link>
      </div>

      {/* Collection information */}
      <div className="mt-3 min-w-0 pb-1 sm:mt-[10px]">
        <Link to={collectionLink} className="block">
          <h2 className="w-full truncate font-['Work_Sans'] text-lg font-semibold leading-[1.4] text-white sm:text-xl lg:text-[22px]">
            {collection.name}
          </h2>
        </Link>

        <div className="mt-2 flex min-w-0 items-center gap-2 sm:gap-[10px]">
          <Avatar
            src={collection.artistAvatar}
            name={collection.artist}
            className="h-6 w-6 text-[9px]"
          />

          <span className="min-w-0 truncate font-['Space_Mono'] text-xs leading-[1.4] text-white sm:text-sm lg:text-base">
            {collection.artist}
          </span>
        </div>
      </div>
    </article>
  );
}

/* ==================================================
   MARKETPLACE
================================================== */

const Market = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("nfts");

  const [nfts, setNfts] = useState([]);
  const [collections, setCollections] = useState([]);

  const [loadingNFTs, setLoadingNFTs] = useState(true);
  const [loadingCollections, setLoadingCollections] = useState(true);

  const [nftError, setNftError] = useState("");
  const [collectionError, setCollectionError] = useState("");

  const [refreshing, setRefreshing] = useState(false);

  const [favoriteIds, setFavoriteIds] = useState(() => new Set());
  const [favoriteBusyIds, setFavoriteBusyIds] = useState(() => new Set());
  const [favoriteError, setFavoriteError] = useState("");

  const navigate = useNavigate();

  // ==================================================
  // LOAD MARKETPLACE DATA
  // ==================================================

  const loadMarketplace = async () => {
    setLoadingNFTs(true);
    setLoadingCollections(true);
    setNftError("");
    setCollectionError("");

    const nftRequest = fetch(`${API_URL}/api/nfts`, {
      cache: "no-store",
    })
      .then(async (response) => {
        const data = await response.json().catch(() => ({}));

        if (!response.ok || data.success === false) {
          throw new Error(
            data.message || "Unable to load marketplace NFTs."
          );
        }

        setNfts((Array.isArray(data.nfts) ? data.nfts : []).map(parseNFT));
      })
      .catch((error) => {
        console.error("Marketplace NFT loading error:", error);
        setNftError(error.message || "Unable to load marketplace NFTs.");
      })
      .finally(() => setLoadingNFTs(false));

    const collectionRequest = fetch(`${API_URL}/api/collections`, {
      cache: "no-store",
    })
      .then(async (response) => {
        const data = await response.json().catch(() => ({}));

        if (!response.ok || data.success === false) {
          throw new Error(data.message || "Unable to load collections.");
        }

        setCollections(
          (Array.isArray(data.collections) ? data.collections : []).map(
            parseCollection
          )
        );
      })
      .catch((error) => {
        console.error("Marketplace collection loading error:", error);
        setCollectionError(error.message || "Unable to load collections.");
      })
      .finally(() => setLoadingCollections(false));

    await Promise.all([nftRequest, collectionRequest]);
  };

  // ==================================================
  // LOAD FAVORITES FOR THE LOGGED-IN USER
  // ==================================================

  const loadFavoriteIds = async () => {
    const token = localStorage.getItem("token");

    if (!token) {
      setFavoriteIds(new Set());
      return;
    }

    try {
      const response = await fetch(`${API_URL}/api/favorites/mine`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        cache: "no-store",
      });

      const data = await response.json().catch(() => ({}));

      if (response.status === 401) {
        setFavoriteIds(new Set());
        return;
      }

      if (!response.ok || data.success === false) {
        throw new Error(data.message || "Unable to load favorites.");
      }

      const favorites = Array.isArray(data.favorites)
        ? data.favorites
        : [];

      setFavoriteIds(
        new Set(favorites.map((item) => getId(item)).filter(Boolean))
      );

      setFavoriteError("");
    } catch (error) {
      console.error("Marketplace favorites loading error:", error);
      setFavoriteError(error.message || "Unable to load favorites.");
    }
  };

  // ==================================================
  // ADD OR REMOVE FAVORITE
  // ==================================================

  const handleToggleFavorite = async (item) => {
    const nftId = getId(item);
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/signin");
      return;
    }

    if (!nftId || favoriteBusyIds.has(nftId)) return;

    const wasFavorite = favoriteIds.has(nftId);

    setFavoriteError("");

    setFavoriteBusyIds((previous) => {
      const next = new Set(previous);
      next.add(nftId);
      return next;
    });

    // Optimistic UI update; roll back if the API call fails.
    setFavoriteIds((previous) => {
      const next = new Set(previous);

      if (wasFavorite) {
        next.delete(nftId);
      } else {
        next.add(nftId);
      }

      return next;
    });

    try {
      const response = await fetch(
        `${API_URL}/api/favorites/${encodeURIComponent(nftId)}`,
        {
          method: wasFavorite ? "DELETE" : "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json().catch(() => ({}));

      if (response.status === 401) {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        navigate("/signin", { replace: true });
        return;
      }

      if (!response.ok || !data.success) {
        throw new Error(
          data.message ||
            (wasFavorite
              ? "Unable to remove favorite."
              : "Unable to add favorite.")
        );
      }
    } catch (error) {
      console.error("Toggle favorite error:", error);

      // Revert heart state on an API error.
      setFavoriteIds((previous) => {
        const next = new Set(previous);

        if (wasFavorite) {
          next.add(nftId);
        } else {
          next.delete(nftId);
        }

        return next;
      });

      setFavoriteError(error.message || "Unable to update favorite.");
    } finally {
      setFavoriteBusyIds((previous) => {
        const next = new Set(previous);
        next.delete(nftId);
        return next;
      });
    }
  };

  useEffect(() => {
    loadMarketplace();
    loadFavoriteIds();

    // Fetch marketplace data and saved favorites on mount.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // ==================================================
  // SEARCH
  // ==================================================

  const filteredNFTs = useMemo(() => {
    const query = searchTerm.toLowerCase().trim();

    if (!query) return nfts;

    return nfts.filter((item) =>
      [item.name, item.creator, item.description, item.category]
        .filter(Boolean)
        .some((value) => String(value).toLowerCase().includes(query))
    );
  }, [nfts, searchTerm]);

  const filteredCollections = useMemo(() => {
    const query = searchTerm.toLowerCase().trim();

    if (!query) return collections;

    return collections.filter((collection) =>
      [collection.name, collection.artist, collection.description]
        .filter(Boolean)
        .some((value) => String(value).toLowerCase().includes(query))
    );
  }, [collections, searchTerm]);

  // ==================================================
  // REFRESH
  // ==================================================

  const handleRefresh = async () => {
    setRefreshing(true);

    try {
      await Promise.all([loadMarketplace(), loadFavoriteIds()]);
    } finally {
      setRefreshing(false);
    }
  };

  return (
    <div className="min-h-screen w-full min-w-0 overflow-x-clip bg-black text-white">
      <Navbar />

      {/* HERO */}
      <section className="w-full min-w-0 bg-black">
        <div className="mx-auto w-full max-w-7xl px-4 py-10 sm:px-6 sm:py-14 md:py-20 lg:px-10">
          <div className="flex min-w-0 flex-col gap-6 sm:gap-8">
            <div className="min-w-0 text-left">
              <h1 className="break-words font-['Work_Sans'] text-3xl font-bold leading-tight text-white min-[380px]:text-4xl sm:text-5xl md:text-6xl">
                Browse Marketplace
              </h1>

              <p className="mt-3 max-w-2xl break-words text-base leading-relaxed text-gray-300 sm:mt-4 sm:text-lg md:text-xl">
                Browse through more than 50k NFTs on the NFT Marketplace.
              </p>
            </div>

            <div className="relative w-full min-w-0">
              <input
                type="search"
                value={searchTerm}
                onChange={(event) => setSearchTerm(event.target.value)}
                placeholder="Search your favourite NFTs"
                aria-label="Search NFTs or collections"
                className="block w-full min-w-0 rounded-xl border border-[#3A3A3A] bg-transparent px-4 py-3 pr-12 text-sm text-white outline-none transition-colors duration-200 placeholder:text-gray-500 focus:border-[#7C3AED] sm:rounded-2xl sm:px-5 sm:py-4 sm:text-base"
              />

              <Search className="pointer-events-none absolute right-4 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-300 sm:right-5" />
            </div>

            {/* Optional refresh button */}
            {/*
            <div className="flex justify-end">
              <button
                type="button"
                onClick={handleRefresh}
                disabled={refreshing}
                className="inline-flex min-h-10 items-center justify-center gap-2 rounded-xl border border-[#3A3A3A] px-3 py-2 text-xs text-[#C7C7C7] transition hover:border-[#A259FF] hover:text-white disabled:opacity-60 sm:px-4 sm:text-sm"
              >
                <RefreshCw
                  size={15}
                  className={refreshing ? "animate-spin" : ""}
                />
                Refresh
              </button>
            </div>
            */}
          </div>
        </div>
      </section>

      <div className="h-px w-full bg-[#3B3B3B]" />

      {/* TABS */}
      <section className="w-full min-w-0 bg-black">
        <div className="mx-auto flex h-[64px] w-full max-w-[1200px] items-end px-3 sm:h-[70px] sm:px-6 lg:px-0">
          <div className="flex h-[56px] w-full min-w-0 sm:h-[60px]">
            <button
              type="button"
              onClick={() => setActiveTab("nfts")}
              className={`flex h-full min-w-0 w-1/2 items-center justify-center gap-1 border-b-2 px-1 transition-colors duration-200 sm:gap-3 sm:px-4 lg:gap-4 lg:px-[30px] ${
                activeTab === "nfts"
                  ? "border-[#858584]"
                  : "border-transparent"
              }`}
            >
              <span
                className={`truncate font-['Work_Sans'] text-sm font-semibold capitalize leading-[140%] min-[380px]:text-base sm:text-xl lg:text-[22px] ${
                  activeTab === "nfts" ? "text-white" : "text-[#858584]"
                }`}
              >
                NFTs
              </span>

              <span
                className={`flex h-6 min-w-7 shrink-0 items-center justify-center rounded-full px-2 font-['Space_Mono'] text-[11px] font-normal leading-[140%] text-white sm:h-8 sm:min-w-[42px] sm:text-sm lg:min-w-[50px] lg:text-base ${
                  activeTab === "nfts" ? "bg-[#858584]" : "bg-[#3B3B3B]"
                }`}
              >
                {loadingNFTs ? "…" : nfts.length}
              </span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab("collections")}
              className={`flex h-full min-w-0 w-1/2 items-center justify-center gap-1 border-b-2 px-1 transition-colors duration-200 sm:gap-3 sm:px-4 lg:gap-4 lg:px-[30px] ${
                activeTab === "collections"
                  ? "border-[#858584]"
                  : "border-transparent"
              }`}
            >
              <span
                className={`truncate font-['Work_Sans'] text-sm font-semibold capitalize leading-[140%] min-[380px]:text-base sm:text-xl lg:text-[22px] ${
                  activeTab === "collections" ? "text-white" : "text-[#858584]"
                }`}
              >
                Collections
              </span>

              <span
                className={`flex h-6 min-w-7 shrink-0 items-center justify-center rounded-full px-2 font-['Space_Mono'] text-[11px] font-normal leading-[140%] text-white sm:h-8 sm:min-w-[42px] sm:text-sm lg:min-w-[50px] lg:text-base ${
                  activeTab === "collections"
                    ? "bg-[#858584]"
                    : "bg-[#3B3B3B]"
                }`}
              >
                {loadingCollections ? "…" : collections.length}
              </span>
            </button>
          </div>
        </div>
      </section>

      {/* NFT GRID */}
      {activeTab === "nfts" && (
        <section className="w-full min-w-0 bg-black pb-12 pt-8 sm:pb-16 sm:pt-12 lg:pb-20 lg:pt-[60px]">
          {favoriteError && (
            <div className="mx-auto mb-5 max-w-[1200px] rounded-xl border border-red-400/20 bg-red-400/[0.06] px-4 py-3 text-sm text-red-300">
              {favoriteError}
            </div>
          )}

          <div className="mx-auto grid w-full min-w-0 max-w-[1200px] grid-cols-1 gap-5 px-4 sm:grid-cols-2 sm:gap-6 sm:px-6 lg:grid-cols-3 lg:gap-[30px] lg:px-0">
            {loadingNFTs ? (
              <div className="col-span-full flex min-h-48 items-center justify-center text-center text-sm text-[#858584] sm:text-base">
                Loading marketplace NFTs...
              </div>
            ) : nftError ? (
              <div className="col-span-full flex min-h-48 flex-col items-center justify-center gap-4 text-center">
                <p className="max-w-xl break-words text-sm text-red-400 sm:text-base">
                  {nftError}
                </p>

                <button
                  type="button"
                  onClick={handleRefresh}
                  disabled={refreshing}
                  className="rounded-xl bg-[#A259FF] px-4 py-2 text-sm font-semibold text-white hover:bg-[#9147E8] disabled:opacity-60"
                >
                  {refreshing ? "Refreshing..." : "Try again"}
                </button>
              </div>
            ) : filteredNFTs.length > 0 ? (
              filteredNFTs.map((item) => (
                <NFTCard
                  key={item.id}
                  item={item}
                  isFavorite={favoriteIds.has(item.id)}
                  isFavoriteBusy={favoriteBusyIds.has(item.id)}
                  onToggleFavorite={handleToggleFavorite}
                  onClick={() => {
                    if (item.id) navigate(`/nft/${item.id}`);
                  }}
                />
              ))
            ) : (
              <div className="col-span-full flex min-h-48 items-center justify-center px-2 text-center">
                <p className="break-words font-['Work_Sans'] text-base text-[#858584] sm:text-lg">
                  {searchTerm
                    ? "No NFTs match your search."
                    : "No published NFTs found yet. Create and publish an NFT to see it here."}
                </p>
              </div>
            )}
          </div>
        </section>
      )}

      {/* COLLECTION GRID */}
      {activeTab === "collections" && (
        <section className="w-full min-w-0 bg-black pb-12 pt-8 sm:pb-16 sm:pt-12 lg:pb-20 lg:pt-[60px]">
          <div className="mx-auto grid w-full min-w-0 max-w-[1220px] grid-cols-1 gap-x-5 gap-y-8 px-4 sm:grid-cols-2 sm:gap-x-6 sm:gap-y-10 sm:px-6 lg:grid-cols-3 lg:gap-x-[20px] lg:gap-y-[40px] lg:px-0">
            {loadingCollections ? (
              <div className="col-span-full py-10 text-center text-sm text-[#858584] sm:text-base">
                Loading collections...
              </div>
            ) : collectionError ? (
              <div className="col-span-full flex min-h-48 flex-col items-center justify-center gap-4 text-center">
                <p className="max-w-xl break-words text-sm text-red-400 sm:text-base">
                  {collectionError}
                </p>

                <button
                  type="button"
                  onClick={handleRefresh}
                  disabled={refreshing}
                  className="rounded-xl bg-[#A259FF] px-4 py-2 text-sm font-semibold text-white hover:bg-[#9147E8] disabled:opacity-60"
                >
                  {refreshing ? "Refreshing..." : "Try again"}
                </button>
              </div>
            ) : filteredCollections.length > 0 ? (
              filteredCollections.map((collection) => (
                <CollectionCard
                  key={collection.id}
                  collection={collection}
                />
              ))
            ) : (
              <div className="col-span-full py-10 text-center text-sm text-[#858584] sm:text-base">
                {searchTerm
                  ? "No collections match your search."
                  : "No published collections found yet."}
              </div>
            )}
          </div>
        </section>
      )}

      <Footer />
    </div>
  );
};

export default Market;