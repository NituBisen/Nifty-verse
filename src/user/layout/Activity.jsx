import React, { useCallback, useEffect, useMemo, useState } from "react";
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

const API_URL = (
  import.meta.env.VITE_API_URL ||
  "https://nifty-verse-backend-production.up.railway.app"
).replace(/\/+$/, "");

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

  if (
    value.includes("list") ||
    value.includes("sale") ||
    value.includes("nft")
  ) {
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

  if (
    value.includes("list") ||
    value.includes("sale") ||
    value.includes("nft")
  ) {
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
  const [totalCount, setTotalCount] = useState(0);
  const [activeFilter, setActiveFilter] = useState("All Activity");
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [clearing, setClearing] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // ======================================================
  // LOAD ACTIVITIES FROM DATABASE
  // ======================================================

  const loadActivities = useCallback(async (isRefresh = false) => {
    const token = localStorage.getItem("token");

    if (!token) {
      setActivities([]);
      setTotalCount(0);
      setError("Please sign in to view your activity history.");
      setLoading(false);
      setRefreshing(false);
      return;
    }

    if (isRefresh) {
      setRefreshing(true);
    } else {
      setLoading(true);
    }

    setError("");
    setSuccess("");

    try {
      const response = await fetch(`${API_URL}/api/activity/mine`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        cache: "no-store",
      });

      const data = await response.json().catch(() => ({}));

      if (response.status === 401) {
        throw new Error("Session expired. Please sign in again.");
      }

      if (!response.ok || !data.success) {
        throw new Error(data.message || "Unable to load activity history.");
      }

      const result = Array.isArray(data.activities) ? data.activities : [];

      setActivities(result);
      setTotalCount(
        Number.isFinite(Number(data.total))
          ? Number(data.total)
          : result.length
      );
    } catch (loadError) {
      console.error("[ACTIVITY] Load error:", loadError);
      setError(loadError.message || "Unable to load activity history.");
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, []);

  useEffect(() => {
    void loadActivities();
  }, [loadActivities]);

  // ======================================================
  // FILTER ACTIVITIES
  // ======================================================

  const filteredActivities = useMemo(() => {
    return activities.filter((item) => {
      const type = String(item.type || item.action || "").toLowerCase();

      const title = String(
        item.title || item.nftName || item.name || ""
      ).toLowerCase();

      const message = String(item.message || "").toLowerCase();

      const creatorValue = item.creatorName || item.creator || "";
      const creator =
        typeof creatorValue === "string"
          ? creatorValue.toLowerCase()
          : String(creatorValue?.username || "").toLowerCase();

      const query = search.trim().toLowerCase();

      const matchesSearch =
        title.includes(query) ||
        type.includes(query) ||
        message.includes(query) ||
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

  // ======================================================
  // CLEAR ACTIVITY HISTORY FROM DATABASE
  // ======================================================

  const clearActivities = async () => {
    if (activities.length === 0 || clearing) return;

    const confirmed = window.confirm(
      "Are you sure you want to clear your activity history?"
    );

    if (!confirmed) return;

    const token = localStorage.getItem("token");

    if (!token) {
      setError("Please sign in to clear your activity history.");
      return;
    }

    setClearing(true);
    setError("");
    setSuccess("");

    try {
      const response = await fetch(`${API_URL}/api/activity/all`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json().catch(() => ({}));

      if (response.status === 401) {
        throw new Error("Session expired. Please sign in again.");
      }

      if (!response.ok || !data.success) {
        throw new Error(data.message || "Unable to clear activity history.");
      }

      setActivities([]);
      setTotalCount(0);
      setSuccess("Activity history cleared successfully.");
    } catch (clearError) {
      console.error("[ACTIVITY] Clear error:", clearError);
      setError(clearError.message || "Unable to clear activity history.");
    } finally {
      setClearing(false);
    }
  };

  // ======================================================
  // PAGE UI
  // ======================================================

  return (
    <main className="min-h-full w-full bg-[#08080A] p-4 text-white sm:p-6 lg:p-8">
      {/* HEADER */}

      <section className="relative overflow-hidden rounded-[28px] border border-white/[0.07] bg-gradient-to-r from-[#111114] via-[#111114] to-[#19131F] p-6 sm:p-9">
        <div className="pointer-events-none absolute -right-12 -top-16 h-52 w-52 rounded-full bg-[#A259FF]/10 blur-[80px]" />

        <div className="relative z-10">
          <p className="text-xs font-bold uppercase tracking-[0.22em] text-[#A259FF]">
            Nifty Verse
          </p>

          <h1 className="mt-3 bg-gradient-to-r from-[#C084FC] to-[#55B7FF] bg-clip-text text-3xl font-bold text-transparent sm:text-4xl">
            Activity
          </h1>

          <p className="mt-3 max-w-2xl text-sm leading-6 text-[#92909D] sm:text-base">
            Track your NFT marketplace actions, purchases, listings,
            favorites and wallet activity in one place.
          </p>

          <div className="mt-6 inline-flex items-center gap-2 rounded-full border border-[#A259FF]/20 bg-[#A259FF]/10 px-4 py-2 text-sm text-[#C084FC]">
            <ActivityIcon size={16} />
            {totalCount} Total Activities
          </div>
        </div>
      </section>

      {/* FEEDBACK */}

      {error && (
        <div
          role="alert"
          className="mt-5 flex flex-col gap-3 rounded-xl border border-red-500/20 bg-red-500/[0.06] px-4 py-3 text-sm text-red-300 sm:flex-row sm:items-center sm:justify-between"
        >
          <span>{error}</span>

          <button
            type="button"
            onClick={() => void loadActivities(true)}
            disabled={loading || refreshing}
            className="inline-flex shrink-0 items-center gap-2 self-start rounded-lg border border-red-500/20 px-3 py-2 transition hover:bg-red-500/10 disabled:opacity-40 sm:self-auto"
          >
            <RefreshCw
              size={14}
              className={refreshing ? "animate-spin" : ""}
            />
            Try again
          </button>
        </div>
      )}

      {success && (
        <div
          role="status"
          className="mt-5 rounded-xl border border-emerald-500/20 bg-emerald-500/[0.06] px-4 py-3 text-sm text-emerald-300"
        >
          {success}
        </div>
      )}

      {/* ACTIVITY HISTORY */}

      <section className="mt-8">
        <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <h2 className="text-xl font-semibold">Activity History</h2>
            <p className="mt-1 text-sm text-[#777782]">
              A record of your recent marketplace actions.
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <button
              type="button"
              onClick={() => void loadActivities(true)}
              disabled={loading || refreshing}
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/[0.08] bg-[#111114] px-4 py-3 text-sm text-[#C8C6D0] transition hover:border-[#A259FF]/40 hover:text-white disabled:opacity-40"
            >
              <RefreshCw
                size={16}
                className={refreshing ? "animate-spin" : ""}
              />
              Refresh
            </button>

            {activities.length > 0 && (
              <button
                type="button"
                onClick={clearActivities}
                disabled={clearing}
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-red-500/20 bg-red-500/[0.06] px-4 py-3 text-sm text-red-400 transition hover:bg-red-500/10 disabled:opacity-40"
              >
                {clearing ? (
                  <RefreshCw size={16} className="animate-spin" />
                ) : (
                  <Trash2 size={16} />
                )}
                {clearing ? "Clearing..." : "Clear History"}
              </button>
            )}
          </div>
        </div>

        {/* SEARCH */}

        <div className="mt-6 flex items-center gap-3 rounded-xl border border-white/[0.08] bg-[#111114] px-4 py-3">
          <Search size={18} className="shrink-0 text-[#777782]" />

          <input
            type="text"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Search by NFT, creator or activity..."
            className="w-full bg-transparent text-sm text-white outline-none placeholder:text-[#666672]"
          />
        </div>

        {/* FILTERS */}

        <div className="mt-5 flex gap-2 overflow-x-auto pb-2">
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

        {/* ACTIVITY LIST */}

        {loading ? (
          <div className="mt-5 flex min-h-[280px] items-center justify-center rounded-2xl border border-white/[0.07] bg-[#101012] text-sm text-[#92909D]">
            <span className="flex items-center gap-3">
              <RefreshCw size={18} className="animate-spin text-[#B872FF]" />
              Loading activity...
            </span>
          </div>
        ) : filteredActivities.length > 0 ? (
          <div className="mt-5 overflow-hidden rounded-2xl border border-white/[0.07] bg-[#111114]">
            {filteredActivities.map((item, index) => {
              const type = item.type || item.action || "Activity";
              const Icon = getActivityIcon(type);
              const color = getActivityColor(type);

              const title =
                item.title || item.nftName || item.name || type;

              const id = item._id || item.id || index;

              const creatorValue = item.creatorName || item.creator || "";

              const creatorName =
                typeof creatorValue === "string"
                  ? creatorValue
                  : creatorValue?.username || "";

              return (
                <article
                  key={id}
                  className="flex flex-col justify-between gap-4 border-b border-white/[0.06] p-4 transition last:border-b-0 hover:bg-white/[0.02] sm:flex-row sm:items-center sm:p-5"
                >
                  <div className="flex min-w-0 items-start gap-4">
                    <div
                      className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border ${color}`}
                    >
                      <Icon size={21} />
                    </div>

                    <div className="min-w-0">
                      <h3 className="truncate text-sm font-semibold text-white sm:text-base">
                        {title}
                      </h3>

                      <p className="mt-1 text-sm capitalize text-[#92909D]">
                        {String(type).replace(/[_-]/g, " ")}
                        {creatorName ? ` · By ${creatorName}` : ""}
                      </p>

                      {item.message && (
                        <p className="mt-1 break-words text-xs leading-5 text-[#777782]">
                          {item.message}
                        </p>
                      )}

                      <div className="mt-2 flex flex-wrap items-center gap-2 text-xs text-[#777782]">
                        <Clock size={13} />
                        {formatDate(
                          item.createdAt || item.timestamp || item.date
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="flex shrink-0 items-center justify-between gap-4 sm:justify-end">
                    {item.price !== undefined &&
                      item.price !== null &&
                      item.price !== "" && (
                        <p className="text-sm font-semibold text-white">
                          {item.price} {item.currency || "ETH"}
                        </p>
                      )}

                    {item.status && (
                      <span className="rounded-full border border-emerald-500/20 bg-emerald-500/10 px-3 py-1 text-xs capitalize text-emerald-400">
                        {item.status}
                      </span>
                    )}

                    {item.nftId && (
                      <Link
                        to={`/nft/${item.nftId}`}
                        title="View NFT"
                        aria-label={`View ${title}`}
                        className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-white/[0.08] text-[#B872FF] transition hover:bg-[#A259FF]/10"
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
          <div className="mt-5 flex min-h-[280px] flex-col items-center justify-center rounded-2xl border border-dashed border-white/[0.10] bg-[#101012] px-5 py-12 text-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl border border-[#A259FF]/20 bg-[#A259FF]/10">
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
                : "Your recorded favorites and other marketplace actions will appear here."}
            </p>

            {(search || activeFilter !== "All Activity") && (
              <button
                type="button"
                onClick={() => {
                  setSearch("");
                  setActiveFilter("All Activity");
                }}
                className="mt-5 rounded-xl border border-white/10 px-5 py-3 text-sm text-white transition hover:bg-white/5"
              >
                Clear Filters
              </button>
            )}

            {!search && activeFilter === "All Activity" && (
              <Link
                to="/marketplace"
                className="mt-6 inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-[#A259FF] to-[#7555FF] px-5 py-3 text-sm font-semibold text-white transition hover:opacity-90"
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