
import React, { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import {
  Bell,
  ShoppingBag,
  Heart,
  Wallet,
  Image as ImageIcon,
  Check,
  CheckCheck,
  Trash2,
  Search,
  ArrowUpRight,
  Clock,
  Settings,
  BellRing,
} from "lucide-react";

const NOTIFICATIONS_KEY = "niftyverse_notifications";

const filters = ["All", "Unread", "Read"];

const getIcon = (type) => {
  const value = String(type || "").toLowerCase();

  if (value.includes("purchase") || value.includes("buy")) {
    return ShoppingBag;
  }

  if (value.includes("favorite") || value.includes("like")) {
    return Heart;
  }

  if (value.includes("wallet") || value.includes("connect")) {
    return Wallet;
  }

  if (value.includes("nft") || value.includes("listing")) {
    return ImageIcon;
  }

  return BellRing;
};

const getIconStyle = (type) => {
  const value = String(type || "").toLowerCase();

  if (value.includes("purchase") || value.includes("buy")) {
    return "bg-blue-500/10 text-blue-400 border-blue-500/20";
  }

  if (value.includes("favorite") || value.includes("like")) {
    return "bg-pink-500/10 text-pink-400 border-pink-500/20";
  }

  if (value.includes("wallet") || value.includes("connect")) {
    return "bg-emerald-500/10 text-emerald-400 border-emerald-500/20";
  }

  return "bg-[#A259FF]/10 text-[#B872FF] border-[#A259FF]/20";
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

const Notifications = () => {
  const [notifications, setNotifications] = useState([]);
  const [activeFilter, setActiveFilter] = useState("All");
  const [search, setSearch] = useState("");

  const loadNotifications = () => {
    try {
      const saved = JSON.parse(
        localStorage.getItem(NOTIFICATIONS_KEY) || "[]"
      );

      setNotifications(Array.isArray(saved) ? saved : []);
    } catch {
      setNotifications([]);
    }
  };

  useEffect(() => {
    loadNotifications();
  }, []);

  const saveNotifications = (items) => {
    setNotifications(items);

    localStorage.setItem(
      NOTIFICATIONS_KEY,
      JSON.stringify(items)
    );
  };

  const unreadCount = notifications.filter(
    (item) => !item.read
  ).length;

  const markAsRead = (id) => {
    const updated = notifications.map((item) =>
      String(item.id || item._id) === String(id)
        ? { ...item, read: true }
        : item
    );

    saveNotifications(updated);
  };

  const markAllAsRead = () => {
    saveNotifications(
      notifications.map((item) => ({
        ...item,
        read: true,
      }))
    );
  };

  const deleteNotification = (id) => {
    saveNotifications(
      notifications.filter(
        (item) =>
          String(item.id || item._id) !== String(id)
      )
    );
  };

  const clearAll = () => {
    if (notifications.length === 0) return;

    if (
      window.confirm(
        "Are you sure you want to delete all notifications?"
      )
    ) {
      saveNotifications([]);
    }
  };

  const filteredNotifications = useMemo(() => {
    return notifications.filter((item) => {
      const title = String(item.title || "");
      const message = String(item.message || "");
      const type = String(item.type || "");

      const matchesSearch =
        `${title} ${message} ${type}`
          .toLowerCase()
          .includes(search.toLowerCase());

      const matchesFilter =
        activeFilter === "All" ||
        (activeFilter === "Unread" && !item.read) ||
        (activeFilter === "Read" && item.read);

      return matchesSearch && matchesFilter;
    });
  }, [notifications, activeFilter, search]);

  return (
    <main className="p-4 min-h-full w-full text-white bg-[#08080A] sm:p-6 lg:p-8">
      {/* Header */}
      <section className="overflow-hidden relative p-6 bg-gradient-to-r from-[#111114] via-[#111114] to-[#19131F] rounded-[28px] border-white/[0.07] border sm:p-9">
        <div className="absolute h-52 w-52 bg-[#A259FF]/10 rounded-full blur-[80px] pointer-events-none -right-12 -top-16" />

        <div className="z-10 relative">
          <p className="text-xs font-bold tracking-[0.22em] text-[#A259FF] uppercase">
            Nifty Verse
          </p>

          <div className="flex flex-wrap items-center gap-3 mt-3">
            <h1 className="text-3xl font-bold text-transparent bg-gradient-to-r from-[#C084FC] to-[#55B7FF] bg-clip-text sm:text-4xl">
              Notifications
            </h1>

            {unreadCount > 0 && (
              <span className="px-3 py-1 text-xs font-semibold text-[#C084FC] bg-[#A259FF]/15 rounded-full border-[#A259FF]/30 border">
                {unreadCount} unread
              </span>
            )}
          </div>

          <p className="mt-3 max-w-2xl text-sm leading-6 text-[#92909D] sm:text-base">
            Stay updated with your NFT marketplace activity,
            purchases, favorites and account updates.
          </p>

          <div className="inline-flex items-center gap-2 mt-6 px-4 py-2 text-sm text-[#C084FC] bg-[#A259FF]/10 rounded-full border-[#A259FF]/20 border">
            <Bell size={16} />
            {notifications.length} Total Notifications
          </div>
        </div>
      </section>

      {/* Notification Controls */}
      <section className="mt-8">
        <div className="flex flex-col items-center justify-between gap-4 lg:flex-row">
          <div>
            <h2 className="text-xl font-semibold">
              Your Notifications
            </h2>
            <p className="mt-1 text-sm text-[#777782]">
              Manage your updates and unread messages.
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <button
              type="button"
              onClick={markAllAsRead}
              disabled={unreadCount === 0}
              className="inline-flex items-center gap-2 px-4 py-3 text-sm text-[#C084FC] bg-[#A259FF]/[0.06] rounded-xl border-[#A259FF]/20 border transition hover:bg-[#A259FF]/15 disabled:cursor-not-allowed disabled:opacity-40"
            >
              <CheckCheck size={16} />
              Mark all as read
            </button>

            {notifications.length > 0 && (
              <button
                type="button"
                onClick={clearAll}
                className="inline-flex items-center gap-2 px-4 py-3 text-sm text-red-400 bg-red-500/[0.05] rounded-xl border-red-500/20 border transition hover:bg-red-500/10"
              >
                <Trash2 size={16} />
                Clear all
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
            placeholder="Search notifications..."
            className="placeholder:text-[#666672] w-full text-sm text-white bg-transparent outline-none"
          />
        </div>

        {/* Filters */}
        <div className="overflow-x-auto flex gap-2 mt-5 pb-2">
          {filters.map((filter) => (
            <button
              key={filter}
              type="button"
              onClick={() => setActiveFilter(filter)}
              className={`shrink-0 rounded-xl border px-5 py-2.5 text-sm font-medium transition ${
                activeFilter === filter
                  ? "border-[#A259FF]/40 bg-[#A259FF]/15 text-[#C084FC]"
                  : "border-white/[0.07] bg-[#111114] text-[#92909D] hover:border-white/20 hover:text-white"
              }`}
            >
              {filter}
            </button>
          ))}
        </div>

        {/* Notification List */}
        {filteredNotifications.length > 0 ? (
          <div className="mt-5 space-y-3">
            {filteredNotifications.map((item, index) => {
              const id = item.id || item._id || index;
              const Icon = getIcon(item.type);
              const iconStyle = getIconStyle(item.type);

              return (
                <article
                  key={id}
                  className={`relative flex flex-col gap-4 rounded-2xl border p-4 transition sm:flex-row sm:items-start sm:p-5 ${
                    item.read
                      ? "border-white/[0.07] bg-[#111114]"
                      : "border-[#A259FF]/25 bg-gradient-to-r from-[#17121F] to-[#111114]"
                  }`}
                >
                  {!item.read && (
                    <span className="absolute right-4 top-4 h-2 w-2 bg-[#A259FF] rounded-full shadow-[0_0_10px_rgba(162,89,255,0.7)]" />
                  )}

                  <div
                    className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border ${iconStyle}`}
                  >
                    <Icon size={21} />
                  </div>

                  <div className="flex-1 pr-4 min-w-0">
                    <h3 className="text-sm font-semibold text-white sm:text-base">
                      {item.title || "Notification"}
                    </h3>

                    <p className="mt-2 text-sm leading-6 text-[#9995A3]">
                      {item.message || "You have a new update."}
                    </p>

                    <div className="flex flex-wrap items-center gap-3 mt-3 text-xs text-[#777782]">
                      <span className="inline-flex items-center gap-1.5">
                        <Clock size={13} />
                        {formatDate(
                          item.createdAt || item.timestamp || item.date
                        )}
                      </span>

                      <span
                        className={
                          item.read
                            ? "text-[#777782]"
                            : "text-[#C084FC]"
                        }
                      >
                        {item.read ? "Read" : "Unread"}
                      </span>
                    </div>

                    {item.link && (
                      <Link
                        to={item.link}
                        onClick={() => markAsRead(id)}
                        className="inline-flex items-center gap-2 mt-4 text-sm font-medium text-[#B872FF] transition hover:text-[#D1A7FF]"
                      >
                        View details
                        <ArrowUpRight size={15} />
                      </Link>
                    )}
                  </div>

                  <div className="flex items-center gap-2 shrink-0 sm:ml-auto">
                    {!item.read && (
                      <button
                        type="button"
                        onClick={() => markAsRead(id)}
                        title="Mark as read"
                        aria-label="Mark notification as read"
                        className="flex items-center justify-center h-9 w-9 text-[#B872FF] rounded-lg border-white/[0.08] border transition hover:bg-[#A259FF]/10"
                      >
                        <Check size={17} />
                      </button>
                    )}

                    <button
                      type="button"
                      onClick={() => deleteNotification(id)}
                      title="Delete notification"
                      aria-label="Delete notification"
                      className="flex items-center justify-center h-9 w-9 text-[#92909D] rounded-lg border-white/[0.08] border transition hover:border-red-500/20 hover:bg-red-500/10 hover:text-red-400"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </article>
              );
            })}
          </div>
        ) : (
          /* Empty State */
          <div className="flex flex-col items-center justify-center mt-5 px-5 py-12 min-h-[300px] text-center bg-[#101012] rounded-2xl border-dashed border-white/[0.10] border">
            <div className="flex items-center justify-center h-16 w-16 bg-[#A259FF]/10 rounded-2xl border-[#A259FF]/20 border">
              {search || activeFilter !== "All" ? (
                <Search
                  size={29}
                  className="text-[#B872FF]"
                  strokeWidth={1.5}
                />
              ) : (
                <Bell
                  size={29}
                  className="text-[#B872FF]"
                  strokeWidth={1.5}
                />
              )}
            </div>

            <h3 className="mt-5 text-xl font-semibold text-white">
              {search || activeFilter !== "All"
                ? "No matching notifications"
                : "You're all caught up!"}
            </h3>

            <p className="mt-2 max-w-md text-sm leading-6 text-[#85818F]">
              {search || activeFilter !== "All"
                ? "Try another search term or change the selected filter."
                : "When there are new updates about your account or NFT activity, they will appear here."}
            </p>

            {(search || activeFilter !== "All") && (
              <button
                type="button"
                onClick={() => {
                  setSearch("");
                  setActiveFilter("All");
                }}
                className="mt-5 px-5 py-3 text-sm text-white rounded-xl border-white/10 border transition hover:bg-white/5"
              >
                Clear Filters
              </button>
            )}

            {!search && activeFilter === "All" && (
              <Link
                to="/marketplace"
                className="inline-flex items-center gap-2 mt-6 px-5 py-3 text-sm font-semibold text-white bg-gradient-to-r from-[#A259FF] to-[#7555FF] rounded-xl transition hover:opacity-90"
              >
                <ShoppingBag size={16} />
                Explore Marketplace
              </Link>
            )}
          </div>
        )}
      </section>
    </main>
  );
};

export default Notifications;
