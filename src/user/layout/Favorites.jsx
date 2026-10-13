import React, { useCallback, useEffect, useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Heart,
  Search,
  ShoppingBag,
  ArrowUpRight,
  Image as ImageIcon,
  Trash2,
  RefreshCw,
} from "lucide-react";

const API_URL =
  import.meta.env.VITE_API_URL ||
  "https://nifty-verse-backend-production.up.railway.app";

const getId = (nft) => String(nft?._id || nft?.id || "");

const getTitle = (nft) => nft?.name || nft?.title || "Untitled NFT";

const getCreator = (nft) =>
  nft?.creator?.username ||
  nft?.creatorName ||
  (typeof nft?.creator === "string" ? nft.creator : "") ||
  nft?.createdBy?.username ||
  "Creator";

const getImage = (nft) =>
  nft?.image ||
  nft?.imageUrl ||
  nft?.imageURL ||
  nft?.coverImage ||
  nft?.nftImage ||
  "";

const getCreatorAvatar = (nft) =>
  nft?.creatorAvatar ||
  nft?.createdBy?.profileImage ||
  nft?.createdBy?.avatar ||
  "";

const getInitials = (name = "Creator") =>
  String(name)
    .trim()
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part.charAt(0).toUpperCase())
    .join("") || "C";

const getPriceLabel = (value, currency = "ETH") => {
  if (value === undefined || value === null || value === "") {
    return "Price unavailable";
  }

  return `${value} ${currency}`;
};

const getBidLabel = (value, currency = "ETH") => {
  if (value === undefined || value === null || value === "") {
    return "Not available";
  }

  return `${value} ${currency}`;
};

const formatDate = (date) => {
  if (!date) return "";

  const parsedDate = new Date(date);

  if (Number.isNaN(parsedDate.getTime())) return "";

  return parsedDate.toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
};

function CreatorAvatar({ src, name }) {
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    setFailed(false);
  }, [src]);

  return (
    <div className="flex h-7 w-7 shrink-0 items-center justify-center overflow-hidden rounded-full border border-[#A259FF]/20 bg-[#A259FF]/10 text-[10px] font-bold text-[#C49AFF]">
      {src && !failed ? (
        <img
          src={src}
          alt={name}
          onError={() => setFailed(true)}
          className="h-full w-full object-cover"
        />
      ) : (
        getInitials(name)
      )}
    </div>
  );
}

const Favorites = () => {
  const navigate = useNavigate();

  const [favorites, setFavorites] = useState([]);
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("recent");

  const [loading, setLoading] = useState(true);
  const [removingIds, setRemovingIds] = useState(() => new Set());

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // ======================================================
  // LOAD FAVORITES FROM THE DATABASE
  // ======================================================

  const loadFavorites = useCallback(async () => {
    const token = localStorage.getItem("token");

    if (!token) {
      setLoading(false);
      navigate("/signin", { replace: true });
      return;
    }

    setLoading(true);
    setError("");
    setSuccess("");

    try {
      const response = await fetch(`${API_URL}/api/favorites/mine`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        cache: "no-store",
      });

      const data = await response.json().catch(() => ({}));

      if (response.status === 401) {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        navigate("/signin", { replace: true });
        return;
      }

      if (!response.ok || data.success === false) {
        throw new Error(data.message || "Unable to load your favorites.");
      }

      setFavorites(
        Array.isArray(data.favorites) ? data.favorites : []
      );
    } catch (loadError) {
      console.error("Load favorites error:", loadError);
      setError(loadError.message || "Unable to load your favorites.");
    } finally {
      setLoading(false);
    }
  }, [navigate]);

  useEffect(() => {
    loadFavorites();
  }, [loadFavorites]);

  // ======================================================
  // REMOVE FAVORITE
  // ======================================================

  const removeFavorite = async (nft) => {
    const nftId = getId(nft);

    if (!nftId || removingIds.has(nftId)) return;

    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/signin", { replace: true });
      return;
    }

    setError("");
    setSuccess("");

    setRemovingIds((previous) => {
      const next = new Set(previous);
      next.add(nftId);
      return next;
    });

    try {
      const response = await fetch(
        `${API_URL}/api/favorites/${encodeURIComponent(nftId)}`,
        {
          method: "DELETE",
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
          data.message || "Unable to remove NFT from favorites."
        );
      }

      setFavorites((previous) =>
        previous.filter((item) => getId(item) !== nftId)
      );

      setSuccess("NFT removed from favorites.");
    } catch (removeError) {
      console.error("Remove favorite error:", removeError);
      setError(removeError.message || "Unable to remove favorite.");
    } finally {
      setRemovingIds((previous) => {
        const next = new Set(previous);
        next.delete(nftId);
        return next;
      });
    }
  };

  // ======================================================
  // SEARCH AND SORT
  // ======================================================

  const filteredFavorites = useMemo(() => {
    const query = search.trim().toLowerCase();

    return favorites
      .filter((nft) => {
        const title = getTitle(nft);
        const creator = getCreator(nft);
        const category = nft.category || "";

        return (
          !query ||
          `${title} ${creator} ${category}`
            .toLowerCase()
            .includes(query)
        );
      })
      .sort((a, b) => {
        if (sortBy === "price-low") {
          return Number(a.price || 0) - Number(b.price || 0);
        }

        if (sortBy === "price-high") {
          return Number(b.price || 0) - Number(a.price || 0);
        }

        const dateA = new Date(
          a.favoritedAt || a.createdAt || 0
        ).getTime();

        const dateB = new Date(
          b.favoritedAt || b.createdAt || 0
        ).getTime();

        return dateB - dateA;
      });
  }, [favorites, search, sortBy]);

  // ======================================================
  // PAGE
  // ======================================================

  return (
    <main className="min-h-full w-full bg-[#08080A] p-4 text-white sm:p-6 lg:p-8">
      <div className="mx-auto max-w-[1600px]">
        {/* HEADER */}

        <section className="relative overflow-hidden rounded-[28px] border border-white/[0.07] bg-gradient-to-r from-[#111114] via-[#111114] to-[#19131F] p-6 sm:p-9">
          <div className="pointer-events-none absolute -right-10 -top-16 h-52 w-52 rounded-full bg-[#A259FF]/10 blur-[80px]" />

          <div className="relative z-10">
            <p className="text-xs font-bold uppercase tracking-[0.22em] text-[#A259FF]">
              Nifty Verse
            </p>

            <h1 className="mt-3 bg-gradient-to-r from-[#C084FC] to-[#55B7FF] bg-clip-text text-3xl font-bold text-transparent sm:text-4xl">
              My Favorites
            </h1>

            <p className="mt-3 max-w-xl text-sm leading-6 text-[#92909D] sm:text-base">
              Keep all your favorite digital collectibles in one place.
              Discover, manage, and revisit the NFTs you love.
            </p>

            <div className="mt-6 inline-flex items-center gap-2 rounded-full border border-[#A259FF]/20 bg-[#A259FF]/10 px-4 py-2 text-sm text-[#C084FC]">
              <Heart size={16} />
              {favorites.length} Saved{" "}
              {favorites.length === 1 ? "NFT" : "NFTs"}
            </div>
          </div>
        </section>

        {/* FEEDBACK */}

        {error && (
          <div
            role="alert"
            className="mt-5 flex flex-col justify-between gap-3 rounded-xl border border-red-400/20 bg-red-400/[0.06] px-4 py-3 text-sm text-red-300 sm:flex-row sm:items-center"
          >
            <span>{error}</span>

            <button
              type="button"
              onClick={loadFavorites}
              className="inline-flex shrink-0 items-center gap-2 self-start rounded-lg border border-red-300/20 px-3 py-2 hover:bg-red-400/10 sm:self-auto"
            >
              <RefreshCw size={14} />
              Try again
            </button>
          </div>
        )}

        {success && (
          <div
            role="status"
            className="mt-5 rounded-xl border border-emerald-400/20 bg-emerald-400/[0.06] px-4 py-3 text-sm text-emerald-300"
          >
            {success}
          </div>
        )}

        {/* TOOLBAR */}

        <section className="mt-8">
          <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
            <div>
              <h2 className="text-xl font-semibold text-white">
                Your Collection
              </h2>

              <p className="mt-1 text-sm text-[#777782]">
                NFTs you have saved for later.
              </p>
            </div>

            <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
              <div className="flex items-center gap-2 rounded-xl border border-white/[0.08] bg-[#111114] px-3 py-3 sm:w-64">
                <Search size={18} className="shrink-0 text-[#777782]" />

                <input
                  type="text"
                  value={search}
                  onChange={(event) => setSearch(event.target.value)}
                  placeholder="Search favorites..."
                  className="w-full bg-transparent text-sm text-white outline-none placeholder:text-[#666672]"
                />
              </div>

              <select
                value={sortBy}
                onChange={(event) => setSortBy(event.target.value)}
                className="rounded-xl border border-white/[0.08] bg-[#111114] px-4 py-3 text-sm text-[#C8C6D0] outline-none"
              >
                <option value="recent">Recently added</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
              </select>
            </div>
          </div>

          {/* LOADING */}

          {loading ? (
            <div className="mt-6 flex min-h-[300px] items-center justify-center rounded-2xl border border-white/[0.07] bg-[#101012] text-sm text-[#85818F]">
              <span className="flex items-center gap-3">
                <RefreshCw
                  size={18}
                  className="animate-spin text-[#B872FF]"
                />
                Loading your favorites...
              </span>
            </div>
          ) : filteredFavorites.length > 0 ? (
            /* FAVORITE NFT CARDS */

            <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
              {filteredFavorites.map((nft) => {
                const id = getId(nft);
                const image = getImage(nft);
                const title = getTitle(nft);
                const creator = getCreator(nft);
                const avatar = getCreatorAvatar(nft);
                const price = getPriceLabel(nft.price, nft.currency || "ETH");
                const bid = getBidLabel(
                  nft.highestBid,
                  nft.currency || "ETH"
                );

                return (
                  <article
                    key={id}
                    className="group overflow-hidden rounded-2xl border border-white/[0.07] bg-[#111114] transition duration-300 hover:-translate-y-1 hover:border-[#A259FF]/40 hover:shadow-[0_12px_35px_rgba(162,89,255,0.08)]"
                  >
                    {/* IMAGE */}

                    <div className="relative aspect-[4/3] overflow-hidden bg-[#1B1920]">
                      {image ? (
                        <img
                          src={image}
                          alt={title}
                          loading="lazy"
                          onError={(event) => {
                            event.currentTarget.style.display = "none";
                          }}
                          className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                        />
                      ) : (
                        <div className="flex h-full w-full flex-col items-center justify-center gap-3 text-[#777782]">
                          <ImageIcon size={38} strokeWidth={1.2} />
                          <span className="text-xs">
                            NFT preview unavailable
                          </span>
                        </div>
                      )}

                      <button
                        type="button"
                        onClick={() => removeFavorite(nft)}
                        disabled={removingIds.has(id)}
                        aria-label={`Remove ${title} from favorites`}
                        title="Remove from favorites"
                        className="absolute right-3 top-3 flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-black/60 text-[#C084FC] backdrop-blur-md transition hover:bg-red-500 hover:text-white disabled:opacity-60"
                      >
                        {removingIds.has(id) ? (
                          <RefreshCw
                            size={17}
                            className="animate-spin"
                          />
                        ) : (
                          <Heart size={19} fill="currentColor" />
                        )}
                      </button>

                      {nft.category && (
                        <span className="absolute bottom-3 left-3 rounded-full border border-white/10 bg-black/60 px-3 py-1 text-xs text-white backdrop-blur-md">
                          {nft.category}
                        </span>
                      )}
                    </div>

                    {/* CARD DETAILS */}

                    <div className="p-4">
                      <div className="flex min-w-0 items-start justify-between gap-3">
                        <div className="min-w-0">
                          <h3 className="truncate text-base font-semibold text-white">
                            {title}
                          </h3>

                          <div className="mt-2 flex min-w-0 items-center gap-2">
                            <CreatorAvatar src={avatar} name={creator} />

                            <p className="truncate text-sm text-[#888691]">
                              Created by{" "}
                              <span className="text-[#C084FC]">
                                {creator}
                              </span>
                            </p>
                          </div>
                        </div>

                        <Link
                          to={`/nft/${id}`}
                          aria-label={`View ${title}`}
                          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-white/[0.08] text-[#B872FF] transition hover:bg-[#A259FF]/10"
                        >
                          <ArrowUpRight size={18} />
                        </Link>
                      </div>

                      <div className="mt-5 grid grid-cols-2 gap-3 border-t border-white/[0.07] pt-4">
                        <div className="min-w-0">
                          <p className="text-xs text-[#777782]">
                            Current price
                          </p>

                          <p className="mt-1 break-words text-sm font-bold text-white">
                            {price}
                          </p>
                        </div>

                        <div className="min-w-0 text-right">
                          <p className="text-xs text-[#777782]">
                            Highest Bid
                          </p>

                          <p className="mt-1 break-words text-sm font-bold text-white">
                            {bid}
                          </p>
                        </div>
                      </div>

                      {formatDate(nft.createdAt) && (
                        <p className="mt-3 text-xs text-[#777782]">
                          Created {formatDate(nft.createdAt)}
                        </p>
                      )}

                      <Link
                        to={`/nft/${id}`}
                        className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-[#A259FF] to-[#7555FF] px-3 py-2.5 text-xs font-semibold text-white transition hover:opacity-90"
                      >
                        <ShoppingBag size={14} />
                        View NFT
                      </Link>

                      <button
                        type="button"
                        onClick={() => removeFavorite(nft)}
                        disabled={removingIds.has(id)}
                        className="mt-3 flex w-full items-center justify-center gap-2 rounded-lg border border-white/[0.08] py-2.5 text-xs font-medium text-[#9995A3] transition hover:border-red-500/30 hover:bg-red-500/10 hover:text-red-400 disabled:opacity-60"
                      >
                        {removingIds.has(id) ? (
                          <RefreshCw size={14} className="animate-spin" />
                        ) : (
                          <Trash2 size={14} />
                        )}
                        Remove from Favorites
                      </button>
                    </div>
                  </article>
                );
              })}
            </div>
          ) : (
            /* EMPTY STATE */

            <div className="mt-6 flex min-h-[300px] flex-col items-center justify-center rounded-2xl border border-dashed border-white/[0.10] bg-[#101012] px-5 py-12 text-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl border border-[#A259FF]/20 bg-[#A259FF]/10">
                <Heart
                  size={30}
                  className="text-[#B872FF]"
                  strokeWidth={1.5}
                />
              </div>

              <h3 className="mt-5 text-xl font-semibold text-white">
                {search ? "No matching favorites" : "No favorites yet"}
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
                  className="mt-6 rounded-xl border border-white/10 px-5 py-3 text-sm text-white transition hover:bg-white/5"
                >
                  Clear Search
                </button>
              ) : (
                <Link
                  to="/marketplace"
                  className="mt-6 inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-[#A259FF] to-[#7555FF] px-5 py-3 text-sm font-semibold text-white transition hover:opacity-90"
                >
                  <ShoppingBag size={17} />
                  Explore Marketplace
                  <ArrowUpRight size={16} />
                </Link>
              )}
            </div>
          )}
        </section>
      </div>
    </main>
  );
};

export default Favorites;