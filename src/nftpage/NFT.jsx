// import React, { useEffect, useMemo, useState } from "react";
// import { Link, useParams } from "react-router-dom";
// import { Search, Rocket } from "lucide-react";
// import { Globe } from "lucide-react";

// import Navbar from "../common/Navbar";
// import Footer from "../common/Footer";

// // import astronautfloating from "../assets/images/Orbitian/astronautfloating.png";
// import orbitianavatar from "../assets/images/orbitian-avatar-img/orbitianavatar.png";

// import astronautfloating from "../assets/images/Orbitian/astronautfloating.png";

// import orbitian1 from "../assets/images/Orbitian/Orbitian1.png";
// import orbitian2 from "../assets/images/Orbitian/Orbitian2.png";
// import orbitian3 from "../assets/images/Orbitian/Orbitian3.png";
// import orbitian4 from "../assets/images/Orbitian/Orbitian4.png";
// import orbitian5 from "../assets/images/Orbitian/Orbitian5.png";
// import orbitian6 from "../assets/images/Orbitian/Orbitian6.png";
// import orbitian7 from "../assets/images/Orbitian/Orbitian7.png";
// import orbitian8 from "../assets/images/Orbitian/Orbitian8.png";
// import orbitian9 from "../assets/images/Orbitian/Orbitian9.png";

// const RELATED_NFTS = [
//   {
//     image: orbitian1,
//     name: "Foxy Life",
//   },
//   {
//     image: orbitian2,
//     name: "Cat From Future",
//   },
//   {
//     image: orbitian3,
//     name: "Psycho Dog",
//   },
//   {
//     image: orbitian4,
//     name: "Designer Bear",
//   },
//   {
//     image: orbitian5,
//     name: "Dancing Robot 0375",
//   },
//   {
//     image: orbitian6,
//     name: "Dancing Robot 0356",
//   },
//   {
//     image: orbitian7,
//     name: "Dancing Robot 0321",
//   },
//   {
//     image: orbitian8,
//     name: "Dancing Robot 0512",
//   },
//   {
//     image: orbitian9,
//     name: "Dancing Robot 0024",
//   },
// ];

// function NFT() {
//   return (
//     <div className="min-h-screen text-white bg-[#000]">
//       <Navbar />

//       {/* ==================================================
//           HERO IMAGE
//       ================================================== */}

//       <section className="w-full">
//         <img
//           src={astronautfloating}
//           alt="The Orbitian"
//           className="object-cover h-[350px] w-full sm:h-[450px] md:h-[550px]"
//         />
//       </section>

//       {/* ==================================================
//           NFT DETAILS
//       ================================================== */}

//       <section className="overflow-x-hidden w-full min-w-0 bg-[#000000]">
//           <div className="grid gap-10 gap-12 mx-auto px-5 py-10 py-12 w-full min-w-0 max-w-[1200px] md:grid-cols-[minmax(0,1fr)_350px] lg:px-0">

//             {/* LEFT */}
//             <div className="w-full min-w-0">

//               <h1 className="font-['Work_Sans'] text-5xl font-semibold leading-tight">
//                 The Orbitian
//               </h1>

//               <p className="mt-3 font-['Work_Sans'] text-[20px] text-[#858584]">
//                 Minted On Sep 30, 2022
//               </p>

//               {/* CREATED BY */}
//               <div className="mt-8">
//                 <p className="font-['Space_Mono'] text-[20px] font-bold text-[#858584]">
//                   Created By
//                 </p>

//                 <div className="flex items-center gap-3 mt-3">
//                   <img
//                     src={orbitianavatar}
//                     alt="Orbitian"
//                     className="object-cover h-8 w-8 rounded-full"
//                   />

//                   <p className="font-['Work_Sans'] text-[22px] font-semibold">
//                     Orbitian
//                   </p>
//                 </div>
//               </div>

//               {/* DESCRIPTION */}
//               <div className="mt-8">
//                 <h2 className="font-['Space_Mono'] text-[22px] font-bold text-[#858584]">
//                   Description
//                 </h2>

//                 <div className="mt-4 max-w-[620px] space-y-5">
//                   <p className="font-['Work_Sans'] text-[20px] leading-7">
//                     The Orbitian is a collection of 10,000 unique NFTs on the Ethereum blockchain.
//                   </p>

//                   <p className="font-['Work_Sans'] text-[20px] leading-7">
//                     There are all sorts of beings in the NFT Universe. The most advanced and friendly of them are the Orbitians.
//                   </p>
//                 </div>
//               </div>

//               {/* DETAILS */}
//               <div className="mt-8">
//                 <h2 className="font-['Space_Mono'] text-[22px] font-bold text-[#858584]">
//                   Details
//                 </h2>

//                 <div className="mt-4 space-y-4">
//                   <a
//                     href="https://etherscan.io/"
//                     target="_blank"
//                     rel="noreferrer"
//                     className="flex items-center gap-4 font-['Work_Sans'] text-sm text-white hover:text-[#A259FF]"
//                   >
//                     <Globe
//                       size={30}
//                       strokeWidth={1.7}
//                       className="text-[#858584] shrink-0"
//                     />

//                     <span className="text-[22px]">
//                       View on Etherscan
//                     </span>
//                   </a>

//                   <a
//                     href="#original"
//                     className="flex items-center gap-4 font-['Work_Sans'] text-sm text-white hover:text-[#A259FF]"
//                   >
//                     <Globe
//                       size={30}
//                       strokeWidth={1.7}
//                       className="text-[#858584] shrink-0"
//                     />

//                     <span className="text-[22px]">
//                       View Original
//                     </span>
//                   </a>
//                 </div>
//               </div>

//               {/* TAGS */}
//               <div className="mt-8">
//                 <h2 className="font-['Work_Sans'] text-[22px] font-bold text-[#858584]">
//                   Tags
//                 </h2>

//                 <div className="flex flex-wrap gap-3 mt-4">
//                   {["ANIMATION", "ILLUSTRATION", "MOON", "MOON"].map((tag, index) => (
//                     <button
//                       key={index}
//                       type="button"
//                       disabled
//                       className="inline-flex items-center justify-center gap-[12px] px-[30px] h-[46px] font-[ bg-[#212020] rounded-[20px]'Work_Sans'] text-[16px] font-semibold leading-[22px] text-white text-center"
//                     >
//                       <span>{tag}</span>
//                     </button>
//                   ))}
//                 </div>
//               </div>

//             </div>

//             {/* RIGHT BID CARD */}
//             <aside className="justify-self-start p-[30px] h-fit w-full max-w-[295px] min-w-0 bg-[#212020] rounded-[20px] md:justify-self-end lg:justify-self-auto">

//               {/* Auction Timer */}
//               <div className="flex flex-col gap-[10px] h-[87px] w-full max-w-[235px] rounded-[20px] backdrop-blur-[10px]">
//                 <p className="h-[13px] w-full max-w-[235px] font-['Space_Mono'] text-[12px] font-normal leading-[13.2px] text-white">
//                   Auction ends in:
//                 </p>

//                 <div className="flex items-start justify-between h-[64px] w-full max-w-[235px]">

//                   {/* Hours */}
//                   <div className="flex flex-col">
//                     <p className="font-['Space_Mono'] text-[32px] font-bold leading-[35.2px] text-white">
//                       59
//                     </p>

//                     <p className="mt-[4px] font-['Space_Mono'] text-[10px] font-normal leading-[11px] text-white">
//                       Hours
//                     </p>
//                   </div>

//                   {/* Colon */}
//                   <span className="relative font-[ -top-[3px]'Space_Mono'] text-[32px] font-bold leading-[35.2px] text-white">
//                     :
//                   </span>

//                   {/* Minutes */}
//                   <div className="flex flex-col">
//                     <p className="font-['Space_Mono'] text-[32px] font-bold leading-[35.2px] text-white">
//                       59
//                     </p>

//                     <p className="mt-[4px] font-['Space_Mono'] text-[10px] font-normal leading-[11px] text-white">
//                       Minutes
//                     </p>
//                   </div>

//                   {/* Colon */}
//                   <span className="relative font-[ -top-[3px]'Space_Mono'] text-[32px] font-bold leading-[35.2px] text-white">
//                     :
//                   </span>

//                   {/* Seconds */}
//                   <div className="flex flex-col">
//                     <p className="font-['Space_Mono'] text-[32px] font-bold leading-[35.2px] text-white">
//                       59
//                     </p>

//                     <p className="mt-[4px] font-['Space_Mono'] text-[10px] font-normal leading-[11px] text-white">
//                       Seconds
//                     </p>
//                   </div>

//                 </div>
//               </div>

//               {/* Place Bid Button */}
//               <button
//                 type="button"
//                 className="flex items-center justify-center gap-[12px] mt-[30px] px-[30px] h-[60px] w-full max-w-[235px] font-[ bg-[#7629DB] rounded-[20px]'Work_Sans'] text-[16px] font-semibold transition hover:bg-[#8B3FF0] md:px-[50px]"
//               >
//                 <span className="h-[22px] w-[74px] text-center font-['Work_Sans'] text-[16px] font-semibold leading-[22px] text-white">
//                   Place Bid
//                 </span>
//               </button>

//             </aside>

//           </div>
//         </section>

//       {/* ==================================================
//           MORE FROM THIS ARTIST
//       ================================================== */}

//       <section className="pb-20 pt-8 w-full bg-[#000000]">
//   <div className="mx-auto px-5 max-w-[1200px] lg:px-0">
//     <div className="flex flex-col justify-between items-center gap-5 mb-15 sm:flex-row">
//       <h4 className="font-['Work_Sans'] text-4xl font-semibold">
//         More From This Artist
//       </h4>

//       <Link
//         to="/artist"
//         className="inline-flex items-center justify-center gap-[9px] px-[20px] h-[60px] w-full max-w-[267px] w-[267px] rounded-[20px] border-[2px] border-[#7629DB] transition hover:bg-[#A259FF] sm:px-[50px]"
//       >
//         {/* Arrow */}
//         <svg
//           width="20"
//           height="20"
//           viewBox="0 0 20 20"
//           fill="none"
//           xmlns="http://www.w3.org/2000/svg"
//           className="shrink-0"
//         >
//           <path
//             d="M10.625 3.75L17.5 10L10.625 16.25"
//             stroke="#A259FF"
//             strokeWidth="1.25"
//             strokeLinecap="round"
//             strokeLinejoin="round"
//           />
//           <path
//             d="M2.5 9.375H17.5"
//             stroke="#A259FF"
//             strokeWidth="1.25"
//             strokeLinecap="round"
//           />
//         </svg>

//         {/* Text */}
//         <span className="h-[22px] w-[135px] text-center font-['Work_Sans'] text-[16px] font-semibold leading-[22px] text-white">
//           Go To Artist Page
//         </span>
//       </Link>
//     </div>

//           {/* CARDS */}

//           <div className="grid grid-cols-1 gap-7 sm:grid-cols-2 lg:grid-cols-3">
//             {RELATED_NFTS.map((item, index) => (
//               <div
//                 key={index}
//                 className="overflow-hidden bg-[#212020] rounded-2xl duration-300 transition hover:-translate-y-1"
//               >
//                 <div className="overflow-hidden h-[340px] w-full">
//                   <img
//                     src={item.image}
//                     alt={item.name}
//                     className="object-cover h-full w-full duration-500 transition hover:scale-105"
//                   />
//                 </div>

//                 <div className="p-5">
//                   <h3 className="font-['Work_Sans'] text-2xl font-semibold">
//                     {item.name}
//                   </h3>

//                   <div className="flex items-center gap-2 mt-3">
//                     <img
//                       src={orbitianavatar}
//                       alt="Orbitian"
//                       className="object-cover h-6 w-6 rounded-full"
//                     />

//                     <p className="font-['Space_Mono'] text-lg">
//                       Orbitian
//                     </p>
//                   </div>

//                   <div className="flex justify-between mt-6">
//                     <div>
//                       <p className="font-['Space_Mono'] text-[12px] text-[#858584]">
//                         Price
//                       </p>

//                       <p className="mt-2 font-['Space_Mono'] text-[16px]">
//                         1.63 ETH
//                       </p>
//                     </div>

//                     <div className="text-right">
//                       <p className="font-['Space_Mono'] text-[12px] text-[#858584]">
//                         Highest Bid
//                       </p>

//                       <p className="mt-2 font-['Space_Mono'] text-[16px]">
//                         0.33 wETH
//                       </p>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </section>

//       <Footer />
//     </div>
//   );
// }

// export default NFT;






import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Globe } from "lucide-react";

import Navbar from "../common/Navbar";
import Footer from "../common/Footer";

import orbitianavatar from "../assets/images/orbitian-avatar-img/orbitianavatar.png";
import astronautfloating from "../assets/images/Orbitian/astronautfloating.png";

const API_URL =
  import.meta.env.VITE_API_URL ||
  "https://nifty-verse-backend-production.up.railway.app";

const FALLBACK_DESCRIPTION = [
  "The Orbitian is a collection of 10,000 unique NFTs on the Ethereum blockchain.",
  "There are all sorts of beings in the NFT Universe. The most advanced and friendly of them are the Orbitians.",
];

const getNFTId = (item) => String(item?._id || item?.id || "");

const getCreatorName = (item) =>
  item?.creator ||
  item?.createdBy?.username ||
  item?.createdBy?.name ||
  "Creator";

const getCreatorId = (item) =>
  String(item?.createdBy?._id || item?.createdBy?.id || "");

const formatCreatedDate = (value) => {
  if (!value) return "";

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) return "";

  return date.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    timeZone: "Asia/Kolkata",
  });
};

const formatETH = (value) => {
  const amount = Number(value ?? 0);
  return `${Number.isFinite(amount) ? amount : 0} ETH`;
};

const getAvatar = (item) =>
  item?.creatorAvatar ||
  item?.createdBy?.profileImage ||
  item?.createdBy?.avatar ||
  "";

function CreatorAvatar({ src, name, sizeClass = "h-8 w-8" }) {
  const [imageFailed, setImageFailed] = useState(false);

  useEffect(() => {
    setImageFailed(false);
  }, [src]);

  if (src && !imageFailed) {
    return (
      <img
        src={src}
        alt={name || "Creator"}
        onError={() => setImageFailed(true)}
        className={`${sizeClass} shrink-0 rounded-full object-cover`}
      />
    );
  }

  return (
    <img
      src={orbitianavatar}
      alt={name || "Creator"}
      className={`${sizeClass} shrink-0 rounded-full object-cover`}
    />
  );
}

/* ==================================================
   MORE FROM THIS ARTIST CARD
   Actual published NFT data from the backend
================================================== */

function RelatedNFTCard({ item }) {
  const creatorName = getCreatorName(item);
  const avatar = getAvatar(item);
  const nftId = getNFTId(item);

  return (
    <Link
      to={`/nft/${nftId}`}
      className="group block min-w-0 overflow-hidden rounded-2xl bg-[#212020] transition duration-300 hover:-translate-y-1"
    >
      {/* NFT IMAGE — same card style */}
      <div className="h-[340px] w-full overflow-hidden bg-[#151515]">
        {item.image ? (
          <img
            src={item.image}
            alt={item.name || "NFT"}
            loading="lazy"
            className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-[#858584]">
            NFT
          </div>
        )}
      </div>

      {/* CARD INFO */}
      <div className="p-5">
        <h3 className="truncate font-['Work_Sans'] text-2xl font-semibold text-white">
          {item.name || "Untitled NFT"}
        </h3>

        {/* REAL CREATOR AVATAR */}
        <div className="mt-3 flex min-w-0 items-center gap-2">
          <CreatorAvatar
            src={avatar}
            name={creatorName}
            sizeClass="h-6 w-6"
          />

          <p className="truncate font-['Space_Mono'] text-lg text-white">
            {creatorName}
          </p>
        </div>

        {/* REAL PRICE + HIGHEST BID */}
        <div className="mt-6 flex justify-between gap-3">
          <div className="min-w-0">
            <p className="font-['Space_Mono'] text-[12px] text-[#858584]">
              Price
            </p>

            <p className="mt-2 break-words font-['Space_Mono'] text-[16px] text-white">
              {formatETH(item.price)}
            </p>
          </div>

          <div className="min-w-0 text-right">
            <p className="font-['Space_Mono'] text-[12px] text-[#858584]">
              Highest Bid
            </p>

            <p className="mt-2 break-words font-['Space_Mono'] text-[16px] text-white">
              {formatETH(item.highestBid)}
            </p>
          </div>
        </div>
      </div>
    </Link>
  );
}

/* ==================================================
   NFT DETAILS PAGE
================================================== */

function NFT() {
  const { id } = useParams();

  const [nft, setNft] = useState(null);
  const [relatedNFTs, setRelatedNFTs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  /* ==================================================
     FETCH SELECTED NFT + OTHER NFTS BY SAME CREATOR
  ================================================== */

  useEffect(() => {
    const controller = new AbortController();

    const fetchNFTData = async () => {
      setLoading(true);
      setError("");
      setNft(null);
      setRelatedNFTs([]);

      try {
        if (!id) {
          throw new Error("NFT ID is missing.");
        }

        const response = await fetch(
          `${API_URL}/api/nfts/${encodeURIComponent(id)}`,
          {
            cache: "no-store",
            signal: controller.signal,
          }
        );

        const data = await response.json().catch(() => ({}));

        if (!response.ok || !data.success || !data.nft) {
          throw new Error(
            data.message || "Unable to find this NFT."
          );
        }

        const currentNFT = data.nft;

        setNft(currentNFT);

        /*
         * Fetch the real public NFT list.
         * Only NFTs with the same creator are displayed below.
         */
        try {
          const listResponse = await fetch(`${API_URL}/api/nfts`, {
            cache: "no-store",
            signal: controller.signal,
          });

          const listData = await listResponse
            .json()
            .catch(() => ({}));

          if (listResponse.ok && listData.success) {
            const publicNFTs = Array.isArray(listData.nfts)
              ? listData.nfts
              : [];

            const currentNFTId = getNFTId(currentNFT);
            const currentCreatorId = getCreatorId(currentNFT);
            const currentCreatorName = getCreatorName(
              currentNFT
            ).trim().toLowerCase();

            const sameCreatorNFTs = publicNFTs.filter((item) => {
              const itemId = getNFTId(item);

              // Never include the currently opened NFT.
              if (!itemId || itemId === currentNFTId) {
                return false;
              }

              const itemCreatorId = getCreatorId(item);

              // Prefer database user ID when both IDs are available.
              if (currentCreatorId && itemCreatorId) {
                return currentCreatorId === itemCreatorId;
              }

              // Fallback for older records without populated creator IDs.
              return (
                getCreatorName(item).trim().toLowerCase() ===
                currentCreatorName
              );
            });

            setRelatedNFTs(sameCreatorNFTs.slice(0, 9));
          }
        } catch (relatedError) {
          if (relatedError.name !== "AbortError") {
            console.error(
              "Unable to fetch other creator NFTs:",
              relatedError
            );
          }
        }
      } catch (fetchError) {
        if (fetchError.name !== "AbortError") {
          console.error("NFT details error:", fetchError);

          setError(
            fetchError.message || "Unable to load NFT details."
          );
        }
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    };

    fetchNFTData();

    return () => controller.abort();
  }, [id]);

  const creatorName = getCreatorName(nft);
  const creatorAvatar = getAvatar(nft);

  const descriptionParagraphs =
    typeof nft?.description === "string" &&
    nft.description.trim()
      ? nft.description
          .split(/\n\s*\n/)
          .map((paragraph) => paragraph.trim())
          .filter(Boolean)
      : FALLBACK_DESCRIPTION;

  const createdDate = formatCreatedDate(nft?.createdAt);

  const originalURL =
    nft?.originalUrl ||
    (/^https?:\/\//i.test(String(nft?.image || ""))
      ? nft.image
      : "#original");

  const etherscanURL =
    nft?.etherscanUrl ||
    nft?.explorerUrl ||
    (nft?.transactionHash
      ? `https://etherscan.io/tx/${nft.transactionHash}`
      : nft?.contractAddress && nft?.tokenId
        ? `https://etherscan.io/token/${nft.contractAddress}?a=${nft.tokenId}`
        : "https://etherscan.io/");

  return (
    <div className="min-h-screen bg-[#000] text-white">
      <Navbar />

      {/* ==================================================
          HERO IMAGE
          Original dimensions and styling maintained
      ================================================== */}

      <section className="w-full">
        <img
          src={nft?.image || astronautfloating}
          alt={nft?.name || "The Orbitian"}
          onError={(event) => {
            event.currentTarget.onerror = null;
            event.currentTarget.src = astronautfloating;
          }}
          className="h-[350px] w-full object-cover sm:h-[450px] md:h-[550px]"
        />
      </section>

      {/* ==================================================
          NFT DETAILS
      ================================================== */}

      <section className="w-full min-w-0 overflow-x-hidden bg-[#000000]">
        <div className="mx-auto grid w-full min-w-0 max-w-[1200px] grid-cols-1 gap-12 px-5 py-12 md:grid-cols-[minmax(0,1fr)_350px] lg:px-0">
          {/* LEFT */}
          <div className="w-full min-w-0">
            <h1 className="break-words font-['Work_Sans'] text-5xl font-semibold leading-tight">
              {loading ? "The Orbitian" : nft?.name || "Untitled NFT"}
            </h1>

            <p className="mt-3 font-['Work_Sans'] text-[20px] text-[#858584]">
              {createdDate
                ? `Created On ${createdDate}`
                : "Minted On Sep 30, 2022"}
            </p>

            {/* CREATED BY */}
            <div className="mt-8">
              <p className="font-['Space_Mono'] text-[20px] font-bold text-[#858584]">
                Created By
              </p>

              <div className="mt-3 flex items-center gap-3">
                <CreatorAvatar
                  src={creatorAvatar}
                  name={creatorName}
                  sizeClass="h-8 w-8"
                />

                <p className="break-words font-['Work_Sans'] text-[22px] font-semibold">
                  {creatorName}
                </p>
              </div>
            </div>

            {/* DESCRIPTION */}
            <div className="mt-8">
              <h2 className="font-['Space_Mono'] text-[22px] font-bold text-[#858584]">
                Description
              </h2>

              <div className="mt-4 max-w-[620px] space-y-5">
                {descriptionParagraphs.map((paragraph, index) => (
                  <p
                    key={`${index}-${paragraph.slice(0, 20)}`}
                    className="whitespace-pre-wrap break-words font-['Work_Sans'] text-[20px] leading-7"
                  >
                    {paragraph}
                  </p>
                ))}
              </div>
            </div>

            {/* DETAILS */}
            <div className="mt-8">
              <h2 className="font-['Space_Mono'] text-[22px] font-bold text-[#858584]">
                Details
              </h2>

              <div className="mt-4 space-y-4">
                <a
                  href={etherscanURL}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-4 font-['Work_Sans'] text-sm text-white hover:text-[#A259FF]"
                >
                  <Globe
                    size={30}
                    strokeWidth={1.7}
                    className="shrink-0 text-[#858584]"
                  />

                  <span className="break-words text-[22px]">
                    View on Etherscan
                  </span>
                </a>

                <a
                  href={originalURL}
                  target={
                    originalURL.startsWith("http") ? "_blank" : undefined
                  }
                  rel={
                    originalURL.startsWith("http")
                      ? "noreferrer"
                      : undefined
                  }
                  className="flex items-center gap-4 font-['Work_Sans'] text-sm text-white hover:text-[#A259FF]"
                >
                  <Globe
                    size={30}
                    strokeWidth={1.7}
                    className="shrink-0 text-[#858584]"
                  />

                  <span className="break-words text-[22px]">
                    View Original
                  </span>
                </a>
              </div>
            </div>

            {/* TAGS — original tags preserved */}
            <div className="mt-8">
              <h2 className="font-['Work_Sans'] text-[22px] font-bold text-[#858584]">
                Tags
              </h2>

              <div className="mt-4 flex flex-wrap gap-3">
                {[
                  "ANIMATION",
                  "ILLUSTRATION",
                  "MOON",
                  "MOON",
                ].map((tag, index) => (
                  <button
                    key={`${tag}-${index}`}
                    type="button"
                    disabled
                    className="inline-flex h-[46px] items-center justify-center gap-[12px] rounded-[20px] bg-[#212020] px-[30px] text-center font-['Work_Sans'] text-[16px] font-semibold leading-[22px] text-white"
                  >
                    <span>{tag}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* RIGHT BID CARD — original design preserved */}
          <aside className="h-fit w-full min-w-0 max-w-[295px] justify-self-start rounded-[20px] bg-[#212020] p-[30px] md:justify-self-end lg:justify-self-auto">
            {/* Auction Timer */}
            <div className="flex h-[87px] w-full max-w-[235px] flex-col gap-[10px] rounded-[20px] backdrop-blur-[10px]">
              <p className="h-[13px] w-full max-w-[235px] font-['Space_Mono'] text-[12px] font-normal leading-[13.2px] text-white">
                Auction ends in:
              </p>

              <div className="flex h-[64px] w-full max-w-[235px] items-start justify-between">
                <div className="flex flex-col">
                  <p className="font-['Space_Mono'] text-[32px] font-bold leading-[35.2px] text-white">
                    59
                  </p>

                  <p className="mt-[4px] font-['Space_Mono'] text-[10px] font-normal leading-[11px] text-white">
                    Hours
                  </p>
                </div>

                <span className="relative -top-[3px] font-['Space_Mono'] text-[32px] font-bold leading-[35.2px] text-white">
                  :
                </span>

                <div className="flex flex-col">
                  <p className="font-['Space_Mono'] text-[32px] font-bold leading-[35.2px] text-white">
                    59
                  </p>

                  <p className="mt-[4px] font-['Space_Mono'] text-[10px] font-normal leading-[11px] text-white">
                    Minutes
                  </p>
                </div>

                <span className="relative -top-[3px] font-['Space_Mono'] text-[32px] font-bold leading-[35.2px] text-white">
                  :
                </span>

                <div className="flex flex-col">
                  <p className="font-['Space_Mono'] text-[32px] font-bold leading-[35.2px] text-white">
                    59
                  </p>

                  <p className="mt-[4px] font-['Space_Mono'] text-[10px] font-normal leading-[11px] text-white">
                    Seconds
                  </p>
                </div>
              </div>
            </div>

            {/* PLACE BID — Coming Soon */}
            <button
              type="button"
              disabled
              title="Coming Soon"
              className="mt-[30px] flex h-[60px] w-full max-w-[235px] cursor-not-allowed items-center justify-center gap-[12px] rounded-[20px] bg-[#7629DB] px-[30px] font-['Work_Sans'] text-[16px] font-semibold text-white transition hover:bg-[#8B3FF0] md:px-[50px]"
            >
              <span className="h-[22px] w-[74px] text-center font-['Work_Sans'] text-[16px] font-semibold leading-[22px] text-white">
                Place Bid
              </span>
            </button>

            <p className="mt-2 w-full max-w-[235px] text-center font-['Work_Sans'] text-xs text-[#B8B8B8]">
              Coming Soon
            </p>
          </aside>
        </div>
      </section>

      {/* ==================================================
          MORE FROM THIS ARTIST
          The original heading, button and card design remain.
          Only card data now comes from the same creator.
      ================================================== */}

      <section className="w-full bg-[#000000] pb-20 pt-8">
        <div className="mx-auto max-w-[1200px] px-5 lg:px-0">
          <div className="mb-15 flex flex-col items-center justify-between gap-5 sm:flex-row">
            <h4 className="font-['Work_Sans'] text-4xl font-semibold">
              More From This Artist
            </h4>

            <Link
              to="/artist"
              className="inline-flex h-[60px] w-full max-w-[267px] items-center justify-center gap-[9px] rounded-[20px] border-[2px] border-[#7629DB] px-[20px] transition hover:bg-[#A259FF] sm:px-[50px]"
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="shrink-0"
              >
                <path
                  d="M10.625 3.75L17.5 10L10.625 16.25"
                  stroke="#A259FF"
                  strokeWidth="1.25"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />

                <path
                  d="M2.5 9.375H17.5"
                  stroke="#A259FF"
                  strokeWidth="1.25"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>

              <span className="h-[22px] w-[135px] text-center font-['Work_Sans'] text-[16px] font-semibold leading-[22px] text-white">
                Go To Artist Page
              </span>
            </Link>
          </div>

          {/* REAL NFT CARDS */}
          {relatedNFTs.length > 0 ? (
            <div className="grid grid-cols-1 gap-7 sm:grid-cols-2 lg:grid-cols-3">
              {relatedNFTs.map((item) => (
                <RelatedNFTCard
                  key={getNFTId(item)}
                  item={item}
                />
              ))}
            </div>
          ) : (
            !loading &&
            !error && (
              <p className="py-8 font-['Work_Sans'] text-base text-[#858584]">
                This creator has not published any other NFTs yet.
              </p>
            )
          )}

          {loading && (
            <p className="py-8 font-['Work_Sans'] text-base text-[#858584]">
              Loading creator's NFTs...
            </p>
          )}

          {error && (
            <p className="py-8 font-['Work_Sans'] text-base text-[#858584]">
              {error}
            </p>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
}

export default NFT;