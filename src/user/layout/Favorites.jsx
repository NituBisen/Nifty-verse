
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  Heart,
  Search,
  ShoppingBag,
  ArrowUpRight,
  Image as ImageIcon,
  Trash2,
} from "lucide-react";

const FAVORITES_KEY = "niftyverse_favorites";

const Favorites = () => {
  const [favorites, setFavorites] = useState([]);
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("recent");

  // Load saved favorites from localStorage
  useEffect(() => {
    try {
      const saved = JSON.parse(
        localStorage.getItem(FAVORITES_KEY) || "[]"
      );

      setFavorites(Array.isArray(saved) ? saved : []);
    } catch {
      setFavorites([]);
    }
  }, []);

  // Save changes
  const saveFavorites = (items) => {
    setFavorites(items);
    localStorage.setItem(FAVORITES_KEY, JSON.stringify(items));
  };

  // Remove NFT from favorites
  const removeFavorite = (id) => {
    const updated = favorites.filter(
      (item) => String(item._id || item.id) !== String(id)
    );

    saveFavorites(updated);
  };

  // Search favorites
  const filteredFavorites = favorites
    .filter((nft) => {
      const title = nft.name || nft.title || "";
      const creator =
        nft.creator?.username ||
        nft.creatorName ||
        nft.creator ||
        "";

      return `${title} ${creator}`
        .toLowerCase()
        .includes(search.toLowerCase());
    })
    .sort((a, b) => {
      if (sortBy === "price-low") {
        return Number(a.price || 0) - Number(b.price || 0);
      }

      if (sortBy === "price-high") {
        return Number(b.price || 0) - Number(a.price || 0);
      }

      return 0;
    });

  const getImage = (nft) =>
    nft.image ||
    nft.imageUrl ||
    nft.imageURL ||
    nft.coverImage ||
    nft.nftImage ||
    "";

  const getTitle = (nft) =>
    nft.name || nft.title || "Untitled NFT";

  const getCreator = (nft) =>
    nft.creator?.username ||
    nft.creatorName ||
    (typeof nft.creator === "string" ? nft.creator : "") ||
    "Unknown creator";

  return (
    <main className="p-4 min-h-full w-full text-white bg-[#08080A] sm:p-6 lg:p-8">
      {/* Header */}
      <section className="overflow-hidden relative p-6 bg-gradient-to-r from-[#111114] via-[#111114] to-[#19131F] rounded-[28px] border-white/[0.07] border sm:p-9">
        <div className="absolute h-52 w-52 bg-[#A259FF]/10 rounded-full blur-[80px] pointer-events-none -right-10 -top-16" />

        <div className="z-10 relative">
          <p className="text-xs font-bold tracking-[0.22em] text-[#A259FF] uppercase">
            Nifty Verse
          </p>

          <h1 className="mt-3 text-3xl font-bold text-transparent bg-gradient-to-r from-[#C084FC] to-[#55B7FF] bg-clip-text sm:text-4xl">
            My Favorites
          </h1>

          <p className="mt-3 max-w-xl text-sm leading-6 text-[#92909D] sm:text-base">
            Keep all your favorite digital collectibles in one place.
            Discover, manage, and revisit the NFTs you love.
          </p>

          <div className="inline-flex items-center gap-2 mt-6 px-4 py-2 text-sm text-[#C084FC] bg-[#A259FF]/10 rounded-full border-[#A259FF]/20 border">
            <Heart size={16} />
            {favorites.length} Saved{" "}
            {favorites.length === 1 ? "NFT" : "NFTs"}
          </div>
        </div>
      </section>

      {/* Toolbar */}
      <section className="mt-8">
        <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
          <div>
            <h2 className="text-xl font-semibold text-white">
              Your Collection
            </h2>
            <p className="mt-1 text-sm text-[#777782]">
              NFTs you have saved for later.
            </p>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row">
            <div className="flex items-center gap-2 px-3 py-3 bg-[#111114] rounded-xl border-white/[0.08] border sm:w-64">
              <Search size={18} className="text-[#777782] shrink-0" />

              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search favorites..."
                className="placeholder:text-[#666672] w-full text-sm text-white bg-transparent outline-none"
              />
            </div>

            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-4 py-3 text-sm text-[#C8C6D0] bg-[#111114] rounded-xl border-white/[0.08] outline-none border"
            >
              <option value="recent">Recently added</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
            </select>
          </div>
        </div>

        {/* NFT Cards */}
        {filteredFavorites.length > 0 ? (
          <div className="grid grid-cols-1 gap-5 mt-6 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
            {filteredFavorites.map((nft, index) => {
              const id = nft._id || nft.id || index;
              const image = getImage(nft);
              const title = getTitle(nft);
              const creator = getCreator(nft);
              const price = nft.price;

              return (
                <article
                  key={id}
                  className="overflow-hidden bg-[#111114] rounded-2xl border-white/[0.07] duration-300 group border transition hover:-translate-y-1 hover:border-[#A259FF]/40 hover:shadow-[0_12px_35px_rgba(162,89,255,0.08)]"
                >
                  {/* Image */}
                  <div className="overflow-hidden relative bg-[#1B1920] aspect-[4/3]">
                    {image ? (
                      <img
                        src={image}
                        alt={title}
                        loading="lazy"
                        className="object-cover h-full w-full duration-500 transition group-hover:scale-105"
                        onError={(e) => {
                          e.currentTarget.style.display = "none";
                        }}
                      />
                    ) : (
                      <div className="flex flex-col items-center justify-center gap-3 h-full text-[#777782]">
                        <ImageIcon size={38} strokeWidth={1.2} />
                        <span className="text-xs">NFT preview unavailable</span>
                      </div>
                    )}

                    <button
                      type="button"
                      onClick={() =>
                        removeFavorite(nft._id || nft.id || index)
                      }
                      aria-label={`Remove ${title} from favorites`}
                      title="Remove from favorites"
                      className="absolute right-3 top-3 flex items-center justify-center h-10 w-10 text-[#C084FC] bg-black/60 rounded-full border-white/10 border backdrop-blur-md transition hover:bg-red-500 hover:text-white"
                    >
                      <Heart size={19} fill="currentColor" />
                    </button>

                    {nft.category && (
                      <span className="absolute bottom-3 left-3 px-3 py-1 text-xs text-white bg-black/60 rounded-full border-white/10 border backdrop-blur-md">
                        {nft.category}
                      </span>
                    )}
                  </div>

                  {/* Card Content */}
                  <div className="p-4">
                    <div className="flex items-start justify-between gap-3">
                      <div className="min-w-0">
                        <h3 className="text-base font-semibold text-white truncate">
                          {title}
                        </h3>

                        <p className="mt-2 text-sm text-[#888691] truncate">
                          Created by{" "}
                          <span className="text-[#C084FC]">
                            {creator}
                          </span>
                        </p>
                      </div>

                      <Link
                        to={`/nft/${nft._id || nft.id}`}
                        aria-label={`View ${title}`}
                        className="flex items-center justify-center h-9 w-9 text-[#B872FF] rounded-lg border-white/[0.08] shrink-0 border transition hover:bg-[#A259FF]/10"
                      >
                        <ArrowUpRight size={18} />
                      </Link>
                    </div>

                    <div className="flex items-end justify-between mt-5 pt-4 border-t border-white/[0.07]">
                      <div>
                        <p className="text-xs text-[#777782]">
                          Current price
                        </p>

                        <p className="mt-1 text-base font-bold text-white">
                          {price !== undefined &&
                          price !== null &&
                          price !== ""
                            ? `${price} ${nft.currency || "ETH"}`
                            : "Price unavailable"}
                        </p>
                      </div>

                      <Link
                        to={`/nft/${nft._id || nft.id}`}
                        className="inline-flex items-center gap-2 px-3 py-2 text-xs font-semibold text-white bg-gradient-to-r from-[#A259FF] to-[#7555FF] rounded-lg transition hover:opacity-90"
                      >
                        <ShoppingBag size={14} />
                        View NFT
                      </Link>
                    </div>

                    <button
                      type="button"
                      onClick={() =>
                        removeFavorite(nft._id || nft.id || index)
                      }
                      className="flex items-center justify-center gap-2 mt-4 py-2.5 w-full text-xs font-medium text-[#9995A3] rounded-lg border-white/[0.08] border transition hover:border-red-500/30 hover:bg-red-500/10 hover:text-red-400"
                    >
                      <Trash2 size={14} />
                      Remove from Favorites
                    </button>
                  </div>
                </article>
              );
            })}
          </div>
        ) : (
          /* Empty State */
          <div className="flex flex-col items-center justify-center mt-6 px-5 py-12 min-h-[300px] text-center bg-[#101012] rounded-2xl border-dashed border-white/[0.10] border">
            <div className="flex items-center justify-center h-16 w-16 bg-[#A259FF]/10 rounded-2xl border-[#A259FF]/20 border">
              <Heart
                size={30}
                className="text-[#B872FF]"
                strokeWidth={1.5}
              />
            </div>

            <h3 className="mt-5 text-xl font-semibold text-white">
              {search
                ? "No matching favorites"
                : "No favorites yet"}
            </h3>

            <p className="mt-2 max-w-md text-sm leading-6 text-[#85818F]">
              {search
                ? "Try another search term to find a saved NFT."
                : "Explore the marketplace and save the NFTs you love. They will appear here once added to your favorites."}
            </p>

            {search ? (
              <button
                type="button"
                onClick={() => setSearch("")}
                className="mt-6 px-5 py-3 text-sm text-white rounded-xl border-white/10 border transition hover:bg-white/5"
              >
                Clear Search
              </button>
            ) : (
              <Link
                to="/marketplace"
                className="inline-flex items-center gap-2 mt-6 px-5 py-3 text-sm font-semibold text-white bg-gradient-to-r from-[#A259FF] to-[#7555FF] rounded-xl transition hover:opacity-90"
              >
                <ShoppingBag size={17} />
                Explore Marketplace
                <ArrowUpRight size={16} />
              </Link>
            )}
          </div>
        )}
      </section>
    </main>
  );
};

export default Favorites;
