
import React, { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import {
  Activity as ActivityIcon,
  Search,
  ShoppingBag,
  Heart,
  Image as ImageIcon,
  Wallet,
  ArrowUpRight,
  Clock,
  RefreshCw,
  Trash2,
} from "lucide-react";

const ACTIVITY_KEY = "niftyverse_activity";

const activityTypes = [
  "All Activity",
  "Purchases",
  "Listings",
  "Favorites",
  "Wallet",
];

const getActivityIcon = (type) => {
  const value = String(type || "").toLowerCase();

  if (value.includes("purchase") || value.includes("buy")) {
    return ShoppingBag;
  }

  if (value.includes("list") || value.includes("sale")) {
    return ImageIcon;
  }

  if (value.includes("favorite") || value.includes("like")) {
    return Heart;
  }

  if (value.includes("wallet") || value.includes("connect")) {
    return Wallet;
  }

  return ActivityIcon;
};

const getActivityColor = (type) => {
  const value = String(type || "").toLowerCase();

  if (value.includes("purchase") || value.includes("buy")) {
    return "text-[#55B7FF] bg-[#55B7FF]/10 border-[#55B7FF]/20";
  }

  if (value.includes("list") || value.includes("sale")) {
    return "text-[#B872FF] bg-[#A259FF]/10 border-[#A259FF]/20";
  }

  if (value.includes("favorite") || value.includes("like")) {
    return "text-pink-400 bg-pink-500/10 border-pink-500/20";
  }

  if (value.includes("wallet") || value.includes("connect")) {
    return "text-emerald-400 bg-emerald-500/10 border-emerald-500/20";
  }

  return "text-[#B872FF] bg-[#A259FF]/10 border-[#A259FF]/20";
};

const formatDate = (date) => {
  if (!date) return "Date unavailable";

  const parsed = new Date(date);

  if (Number.isNaN(parsed.getTime())) {
    return "Date unavailable";
  }

  return parsed.toLocaleString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};

const Activity = () => {
  const [activities, setActivities] = useState([]);
  const [activeFilter, setActiveFilter] = useState("All Activity");
  const [search, setSearch] = useState("");

  const loadActivities = () => {
    try {
      const saved = JSON.parse(
        localStorage.getItem(ACTIVITY_KEY) || "[]"
      );

      setActivities(Array.isArray(saved) ? saved : []);
    } catch {
      setActivities([]);
    }
  };

  useEffect(() => {
    loadActivities();
  }, []);

  const filteredActivities = useMemo(() => {
    return activities.filter((item) => {
      const type = String(item.type || item.action || "").toLowerCase();
      const title = String(
        item.title || item.nftName || item.name || ""
      ).toLowerCase();

      const creator = String(
        item.creatorName || item.creator || ""
      ).toLowerCase();

      const query = search.toLowerCase();

      const matchesSearch =
        title.includes(query) ||
        type.includes(query) ||
        creator.includes(query);

      let matchesFilter = true;

      if (activeFilter === "Purchases") {
        matchesFilter =
          type.includes("purchase") || type.includes("buy");
      } else if (activeFilter === "Listings") {
        matchesFilter =
          type.includes("list") || type.includes("sale");
      } else if (activeFilter === "Favorites") {
        matchesFilter =
          type.includes("favorite") || type.includes("like");
      } else if (activeFilter === "Wallet") {
        matchesFilter =
          type.includes("wallet") || type.includes("connect");
      }

      return matchesSearch && matchesFilter;
    });
  }, [activities, activeFilter, search]);

  const clearActivities = () => {
    const confirmed = window.confirm(
      "Are you sure you want to clear your activity history?"
    );

    if (!confirmed) return;

    localStorage.removeItem(ACTIVITY_KEY);
    setActivities([]);
  };

  return (
    <main className="p-4 min-h-full w-full text-white bg-[#08080A] sm:p-6 lg:p-8">
      {/* Header */}
      <section className="overflow-hidden relative p-6 bg-gradient-to-r from-[#111114] via-[#111114] to-[#19131F] rounded-[28px] border-white/[0.07] border sm:p-9">
        <div className="absolute h-52 w-52 bg-[#A259FF]/10 rounded-full blur-[80px] pointer-events-none -right-12 -top-16" />

        <div className="z-10 relative">
          <p className="text-xs font-bold tracking-[0.22em] text-[#A259FF] uppercase">
            Nifty Verse
          </p>

          <h1 className="mt-3 text-3xl font-bold text-transparent bg-gradient-to-r from-[#C084FC] to-[#55B7FF] bg-clip-text sm:text-4xl">
            Activity
          </h1>

          <p className="mt-3 max-w-2xl text-sm leading-6 text-[#92909D] sm:text-base">
            Track your NFT marketplace actions, purchases,
            listings, favorites and wallet activity in one place.
          </p>

          <div className="inline-flex items-center gap-2 mt-6 px-4 py-2 text-sm text-[#C084FC] bg-[#A259FF]/10 rounded-full border-[#A259FF]/20 border">
            <ActivityIcon size={16} />
            {activities.length} Total Activities
          </div>
        </div>
      </section>

      {/* Activity history */}
      <section className="mt-8">
        <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
          <div>
            <h2 className="text-xl font-semibold">Activity History</h2>
            <p className="mt-1 text-sm text-[#777782]">
              A record of your recent marketplace actions.
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <button
              type="button"
              onClick={loadActivities}
              className="inline-flex items-center justify-center gap-2 px-4 py-3 text-sm text-[#C8C6D0] bg-[#111114] rounded-xl border-white/[0.08] border transition hover:border-[#A259FF]/40 hover:text-white"
            >
              <RefreshCw size={16} />
              Refresh
            </button>

            {activities.length > 0 && (
              <button
                type="button"
                onClick={clearActivities}
                className="inline-flex items-center justify-center gap-2 px-4 py-3 text-sm text-red-400 bg-red-500/[0.06] rounded-xl border-red-500/20 border transition hover:bg-red-500/10"
              >
                <Trash2 size={16} />
                Clear History
              </button>
            )}
          </div>
        </div>

        {/* Search */}
        <div className="flex items-center gap-3 mt-6 px-4 py-3 bg-[#111114] rounded-xl border-white/[0.08] border">
          <Search size={18} className="text-[#777782] shrink-0" />

          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by NFT, creator or activity..."
            className="placeholder:text-[#666672] w-full text-sm text-white bg-transparent outline-none"
          />
        </div>

        {/* Filters */}
        <div className="overflow-x-auto flex gap-2 mt-5 pb-2">
          {activityTypes.map((type) => (
            <button
              key={type}
              type="button"
              onClick={() => setActiveFilter(type)}
              className={`shrink-0 rounded-xl border px-4 py-2.5 text-sm font-medium transition ${
                activeFilter === type
                  ? "border-[#A259FF]/40 bg-[#A259FF]/15 text-[#C084FC]"
                  : "border-white/[0.07] bg-[#111114] text-[#92909D] hover:border-white/20 hover:text-white"
              }`}
            >
              {type}
            </button>
          ))}
        </div>

        {/* Activity list */}
        {filteredActivities.length > 0 ? (
          <div className="overflow-hidden mt-5 bg-[#111114] rounded-2xl border-white/[0.07] border">
            {filteredActivities.map((item, index) => {
              const type = item.type || item.action || "Activity";
              const Icon = getActivityIcon(type);
              const color = getActivityColor(type);
              const title =
                item.title ||
                item.nftName ||
                item.name ||
                type;

              const id = item._id || item.id || index;

              return (
                <article
                  key={id}
                  className="flex flex-col items-center justify-between gap-4 p-4 p-5 border-b border-white/[0.06] transition last:border-b-0 hover:bg-white/[0.02] sm:flex-row"
                >
                  <div className="flex items-start gap-4 min-w-0">
                    <div
                      className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border ${color}`}
                    >
                      <Icon size={21} />
                    </div>

                    <div className="min-w-0">
                      <h3 className="text-sm font-semibold text-white truncate sm:text-base">
                        {title}
                      </h3>

                      <p className="mt-1 text-sm text-[#92909D] capitalize">
                        {String(type).replace(/[_-]/g, " ")}
                        {item.creatorName || item.creator
                          ? ` · By ${
                              typeof item.creator === "string"
                                ? item.creator
                                : item.creatorName ||
                                  item.creator?.username ||
                                  ""
                            }`
                          : ""}
                      </p>

                      <div className="flex flex-wrap items-center gap-2 mt-2 text-xs text-[#777782]">
                        <Clock size={13} />
                        {formatDate(
                          item.createdAt ||
                            item.timestamp ||
                            item.date
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between gap-4 sm:justify-end">
                    {item.price !== undefined &&
                      item.price !== null &&
                      item.price !== "" && (
                        <p className="text-sm font-semibold text-white">
                          {item.price} {item.currency || "ETH"}
                        </p>
                      )}

                    {item.status && (
                      <span className="px-3 py-1 text-xs text-emerald-400 bg-emerald-500/10 rounded-full border-emerald-500/20 border capitalize">
                        {item.status}
                      </span>
                    )}

                    {(item.nftId || item._id || item.id) && (
                      <Link
                        to={`/nft/${
                          item.nftId || item._id || item.id
                        }`}
                        title="View NFT"
                        className="flex items-center justify-center h-9 w-9 text-[#B872FF] rounded-lg border-white/[0.08] shrink-0 border transition hover:bg-[#A259FF]/10"
                      >
                        <ArrowUpRight size={17} />
                      </Link>
                    )}
                  </div>
                </article>
              );
            })}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center mt-5 px-5 py-12 min-h-[280px] text-center bg-[#101012] rounded-2xl border-dashed border-white/[0.10] border">
            <div className="flex items-center justify-center h-16 w-16 bg-[#A259FF]/10 rounded-2xl border-[#A259FF]/20 border">
              <ActivityIcon
                size={30}
                className="text-[#B872FF]"
                strokeWidth={1.5}
              />
            </div>

            <h3 className="mt-5 text-xl font-semibold text-white">
              {search || activeFilter !== "All Activity"
                ? "No matching activities"
                : "No activity yet"}
            </h3>

            <p className="mt-2 max-w-md text-sm leading-6 text-[#85818F]">
              {search || activeFilter !== "All Activity"
                ? "Try changing your search or selecting another activity filter."
                : "Your purchases, listings, favorites and other recorded actions will appear here."}
            </p>

            {(search || activeFilter !== "All Activity") && (
              <button
                type="button"
                onClick={() => {
                  setSearch("");
                  setActiveFilter("All Activity");
                }}
                className="mt-5 px-5 py-3 text-sm text-white rounded-xl border-white/10 border transition hover:bg-white/5"
              >
                Clear Filters
              </button>
            )}

            {!search && activeFilter === "All Activity" && (
              <Link
                to="/marketplace"
                className="inline-flex items-center gap-2 mt-6 px-5 py-3 text-sm font-semibold text-white bg-gradient-to-r from-[#A259FF] to-[#7555FF] rounded-xl transition hover:opacity-90"
              >
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

export default Activity;