import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Globe, Image as ImageIcon } from "lucide-react";

import Navbar from "../common/Navbar";
import Footer from "../common/Footer";

import orbitianavatar from "../assets/images/orbitian-avatar-img/orbitianavatar.png";
import astronautfloating from "../assets/images/Orbitian/astronautfloating.png";

const API_URL =
  import.meta.env.VITE_API_URL ||
  "https://nifty-verse-backend-production.up.railway.app";

const getId = (item) => String(item?._id || item?.id || "");

const getCreatorName = (item) =>
  item?.artist ||
  item?.creator ||
  item?.createdBy?.username ||
  item?.createdBy?.name ||
  "Creator";

const getCreatorAvatar = (item) =>
  item?.artistAvatar ||
  item?.creatorAvatar ||
  item?.createdBy?.profileImage ||
  item?.createdBy?.avatar ||
  "";

const getNFTCollectionId = (item) =>
  String(
    item?.collectionId ||
      item?.collectionRef?._id ||
      item?.collectionRef?.id ||
      item?.collection?._id ||
      item?.collection?.id ||
      ""
  );

const getInitials = (name = "Creator") =>
  String(name)
    .trim()
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() || "")
    .join("") || "C";

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

function CreatorAvatar({ src, name, className = "" }) {
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
      className={`flex shrink-0 items-center justify-center rounded-full bg-[#A259FF] font-bold text-white ${className}`}
      aria-label={name || "Creator"}
    >
      {getInitials(name)}
    </div>
  );
}

function CollectionDetails() {
  const { id } = useParams();

  const [collection, setCollection] = useState(null);
  const [collectionNFTs, setCollectionNFTs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
  const controller = new AbortController();

  const loadCollectionDetails = async () => {
    setLoading(true);
    setError("");
    setCollection(null);
    setCollectionNFTs([]);

    try {
      const response = await fetch(
        `${API_URL}/api/collections/${encodeURIComponent(id)}`,
        {
          cache: "no-store",
          signal: controller.signal,
        }
      );

      const data = await response.json().catch(() => ({}));

      if (response.status === 404) {
        throw new Error("Collection not found or not published.");
      }

      if (!response.ok || !data.success || !data.collection) {
        throw new Error(
          data.message || "Unable to load collection details."
        );
      }

      const currentCollection = data.collection;

      setCollection(currentCollection);

      setCollectionNFTs(
        Array.isArray(currentCollection.nfts)
          ? currentCollection.nfts
          : []
      );
    } catch (loadError) {
      if (loadError.name !== "AbortError") {
        console.error("Collection details error:", loadError);
        setError(
          loadError.message || "Unable to load collection details."
        );
      }
    } finally {
      if (!controller.signal.aborted) {
        setLoading(false);
      }
    }
  };

  loadCollectionDetails();

  return () => controller.abort();
}, [id]);

  const creatorName = getCreatorName(collection);
  const creatorAvatar = getCreatorAvatar(collection);

  const description =
    collection?.description?.trim() ||
    "No description has been provided for this collection yet.";

  const createdDate = formatCreatedDate(collection?.createdAt);
  const category = collection?.category || "Other";

  const coverImage =
    collection?.primaryImage ||
    collection?.image ||
    collection?.coverImage ||
    "";

  return (
    <div className="min-h-screen bg-[#000000] text-white">
      <Navbar />

      {loading ? (
        <main className="flex min-h-[60vh] items-center justify-center bg-[#000000] px-5">
          <p className="font-['Work_Sans'] text-base text-[#858584]">
            Loading collection...
          </p>
        </main>
      ) : error || !collection ? (
        <main className="flex min-h-[60vh] flex-col items-center justify-center bg-[#000000] px-5 text-center">
          <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-[#212020] text-[#A259FF]">
            <ImageIcon size={32} />
          </div>

          <h1 className="mt-5 font-['Work_Sans'] text-3xl font-semibold">
            Collection unavailable
          </h1>

          <p className="mt-3 max-w-xl font-['Work_Sans'] text-base text-[#858584]">
            {error || "We could not find this collection."}
          </p>

          <Link
            to="/marketplace"
            className="mt-6 inline-flex h-[50px] items-center justify-center rounded-[15px] bg-[#A259FF] px-6 font-['Work_Sans'] text-base font-semibold text-white transition hover:bg-[#8B3FF0]"
          >
            Back to Marketplace
          </Link>
        </main>
      ) : (
        <>
          {/* COLLECTION COVER — same style as the NFT detail hero */}
          <section id="original" className="w-full bg-[#000000]">
            {coverImage ? (
              <img
                src={coverImage}
                alt={collection.name || "Collection cover"}
                onError={(event) => {
                  event.currentTarget.onerror = null;
                  event.currentTarget.src = astronautfloating;
                }}
                className="h-[350px] w-full object-cover sm:h-[450px] md:h-[550px]"
              />
            ) : (
              <div className="flex h-[350px] w-full items-center justify-center bg-[#212020] sm:h-[450px] md:h-[550px]">
                <ImageIcon size={64} className="text-[#858584]" />
              </div>
            )}
          </section>

          {/* COLLECTION INFORMATION — NFT detail page layout */}
          <section className="w-full min-w-0 overflow-x-hidden bg-[#000000]">
            <div className="mx-auto grid w-full min-w-0 max-w-[1200px] grid-cols-1 gap-12 px-5 py-12 md:grid-cols-[minmax(0,1fr)_350px] lg:px-0">
              {/* LEFT CONTENT */}
              <div className="w-full min-w-0">
                <h1 className="break-words font-['Work_Sans'] text-4xl font-semibold leading-tight sm:text-5xl">
                  {collection.name || "Untitled Collection"}
                </h1>

                <p className="mt-3 font-['Work_Sans'] text-base text-[#858584] sm:text-[20px]">
                  {createdDate
                    ? `Created On ${createdDate}`
                    : "NFT Collection"}
                </p>

                {/* CREATED BY */}
                <div className="mt-8">
                  <p className="font-['Space_Mono'] text-lg font-bold text-[#858584] sm:text-[20px]">
                    Created By
                  </p>

                  <div className="mt-3 flex min-w-0 items-center gap-3">
                    <CreatorAvatar
                      src={creatorAvatar}
                      name={creatorName}
                      className="h-8 w-8 text-[10px]"
                    />

                    <p className="break-words font-['Work_Sans'] text-lg font-semibold sm:text-[22px]">
                      {creatorName}
                    </p>
                  </div>
                </div>

                {/* DESCRIPTION */}
                <div className="mt-8">
                  <h2 className="font-['Space_Mono'] text-lg font-bold text-[#858584] sm:text-[22px]">
                    Description
                  </h2>

                  <p className="mt-4 max-w-[620px] whitespace-pre-wrap break-words font-['Work_Sans'] text-base leading-7 sm:text-[20px]">
                    {description}
                  </p>
                </div>

                {/* DETAILS */}
                <div className="mt-8">
                  <h2 className="font-['Space_Mono'] text-lg font-bold text-[#858584] sm:text-[22px]">
                    Details
                  </h2>

                  <div className="mt-4 space-y-4">
                    <div className="flex items-center gap-4 font-['Work_Sans'] text-white">
                      <Globe
                        size={26}
                        strokeWidth={1.7}
                        className="shrink-0 text-[#858584]"
                      />
                      <span className="break-words text-lg sm:text-[22px]">
                        Category: {category}
                      </span>
                    </div>

                    <div className="flex items-center gap-4 font-['Work_Sans'] text-white">
                      <ImageIcon
                        size={26}
                        strokeWidth={1.7}
                        className="shrink-0 text-[#858584]"
                      />
                      <span className="break-words text-lg sm:text-[22px]">
                        {collectionNFTs.length}{" "}
                        {collectionNFTs.length === 1 ? "NFT" : "NFTs"}
                      </span>
                    </div>
                  </div>
                </div>

                {/* TAGS */}
                <div className="mt-8">
                  <h2 className="font-['Work_Sans'] text-lg font-bold text-[#858584] sm:text-[22px]">
                    Tags
                  </h2>

                  <div className="mt-4 flex flex-wrap gap-3">
                    {[category].map((tag) => (
                      <span
                        key={tag}
                        className="inline-flex min-h-[46px] items-center justify-center rounded-[20px] bg-[#212020] px-[30px] py-3 text-center font-['Work_Sans'] text-sm font-semibold text-white sm:text-[16px]"
                      >
                        {tag.toUpperCase()}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* RIGHT CARD — collection stats instead of NFT bidding */}
              <aside className="h-fit w-full min-w-0 max-w-[350px] justify-self-start rounded-[20px] bg-[#212020] p-6 sm:p-[30px] md:sticky md:top-6 md:justify-self-end lg:justify-self-auto">
                <p className="font-['Space_Mono'] text-sm text-white">
                  Collection Overview
                </p>

                <h2 className="mt-4 break-words font-['Work_Sans'] text-2xl font-semibold">
                  {collection.name || "Untitled Collection"}
                </h2>

                <div className="mt-6 flex items-center justify-between gap-4 border-b border-white/10 pb-4">
                  <span className="font-['Space_Mono'] text-sm text-[#858584]">
                    Category
                  </span>
                  <span className="break-words text-right font-['Work_Sans'] text-base text-white">
                    {category}
                  </span>
                </div>

                <div className="mt-4 flex items-center justify-between gap-4 border-b border-white/10 pb-4">
                  <span className="font-['Space_Mono'] text-sm text-[#858584]">
                    Items
                  </span>
                  <span className="font-['Space_Mono'] text-base font-bold text-white">
                    {collectionNFTs.length}
                  </span>
                </div>

                <div className="mt-4 flex items-center justify-between gap-4">
                  <span className="font-['Space_Mono'] text-sm text-[#858584]">
                    Creator
                  </span>
                  <span className="max-w-[60%] break-words text-right font-['Work_Sans'] text-base font-semibold text-white">
                    {creatorName}
                  </span>
                </div>

                <Link
                  to="/marketplace"
                  className="mt-7 flex h-[60px] w-full items-center justify-center rounded-[20px] bg-[#7629DB] px-5 font-['Work_Sans'] text-base font-semibold text-white transition hover:bg-[#8B3FF0]"
                >
                  Explore Marketplace
                </Link>
              </aside>
            </div>
          </section>

          {/* NFTS IN THIS COLLECTION */}
          <section className="w-full bg-[#000000] pb-20 pt-8">
            <div className="mx-auto max-w-[1200px] px-5 lg:px-0">
              <div className="mb-10 flex flex-col items-start justify-between gap-5 sm:flex-row sm:items-center">
                <div>
                  <h2 className="font-['Work_Sans'] text-3xl font-semibold sm:text-4xl">
                    NFTs in This Collection
                  </h2>
                  <p className="mt-3 font-['Work_Sans'] text-sm text-[#858584] sm:text-base">
                    Explore the artworks belonging to this collection.
                  </p>
                </div>
              </div>

              {collectionNFTs.length > 0 ? (
                <div className="grid grid-cols-1 gap-7 sm:grid-cols-2 lg:grid-cols-3">
                  {collectionNFTs.map((item) => {
                    const itemId = getId(item);
                    const itemCreator = getCreatorName(item);
                    const itemAvatar =
                      getCreatorAvatar(item) || orbitianavatar;

                    return (
                      <Link
                        to={`/nft/${itemId}`}
                        key={itemId}
                        className="block min-w-0 overflow-hidden rounded-2xl bg-[#212020] transition duration-300 hover:-translate-y-1"
                      >
                        <div className="h-[280px] w-full overflow-hidden bg-[#151515] sm:h-[340px]">
                          <img
                            src={item.image || astronautfloating}
                            alt={item.name || "NFT artwork"}
                            loading="lazy"
                            onError={(event) => {
                              event.currentTarget.onerror = null;
                              event.currentTarget.src = astronautfloating;
                            }}
                            className="h-full w-full object-cover transition duration-500 hover:scale-105"
                          />
                        </div>

                        <div className="p-5">
                          <h3 className="truncate font-['Work_Sans'] text-2xl font-semibold">
                            {item.name || "Untitled NFT"}
                          </h3>

                          <div className="mt-3 flex min-w-0 items-center gap-2">
                            <CreatorAvatar
                              src={itemAvatar}
                              name={itemCreator}
                              className="h-6 w-6 text-[9px]"
                            />
                            <p className="truncate font-['Space_Mono'] text-base sm:text-lg">
                              {itemCreator}
                            </p>
                          </div>

                          <div className="mt-6 flex justify-between gap-4">
                            <div className="min-w-0">
                              <p className="font-['Space_Mono'] text-xs text-[#858584]">
                                Price
                              </p>
                              <p className="mt-2 break-words font-['Space_Mono'] text-sm sm:text-base">
                                {item.price ?? 0} ETH
                              </p>
                            </div>

                            <div className="min-w-0 text-right">
                              <p className="font-['Space_Mono'] text-xs text-[#858584]">
                                Highest Bid
                              </p>
                              <p className="mt-2 break-words font-['Space_Mono'] text-sm sm:text-base">
                                {item.highestBid ?? 0} ETH
                              </p>
                            </div>
                          </div>
                        </div>
                      </Link>
                    );
                  })}
                </div>
              ) : (
                <div className="rounded-2xl border border-dashed border-white/10 px-5 py-10 text-center">
                  <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-[#212020] text-[#A259FF]">
                    <ImageIcon size={28} />
                  </div>

                  <h3 className="mt-4 font-['Work_Sans'] text-xl font-semibold">
                    No NFTs in this collection yet
                  </h3>

                  <p className="mt-2 font-['Work_Sans'] text-sm text-[#858584]">
                    The collection page is ready. NFTs will appear here when they are added to this collection.
                  </p>
                </div>
              )}
            </div>
          </section>
        </>
      )}

      <Footer />
    </div>
  );
}

export default CollectionDetails;