
// import React, { useEffect, useMemo, useState } from "react";
// import { Link } from "react-router-dom";
// import {
//   Bell,
//   ShoppingBag,
//   Heart,
//   Wallet,
//   Image as ImageIcon,
//   Check,
//   CheckCheck,
//   Trash2,
//   Search,
//   ArrowUpRight,
//   Clock,
//   Settings,
//   BellRing,
// } from "lucide-react";

// const NOTIFICATIONS_KEY = "niftyverse_notifications";

// const filters = ["All", "Unread", "Read"];

// const getIcon = (type) => {
//   const value = String(type || "").toLowerCase();

//   if (value.includes("purchase") || value.includes("buy")) {
//     return ShoppingBag;
//   }

//   if (value.includes("favorite") || value.includes("like")) {
//     return Heart;
//   }

//   if (value.includes("wallet") || value.includes("connect")) {
//     return Wallet;
//   }

//   if (value.includes("nft") || value.includes("listing")) {
//     return ImageIcon;
//   }

//   return BellRing;
// };

// const getIconStyle = (type) => {
//   const value = String(type || "").toLowerCase();

//   if (value.includes("purchase") || value.includes("buy")) {
//     return "bg-blue-500/10 text-blue-400 border-blue-500/20";
//   }

//   if (value.includes("favorite") || value.includes("like")) {
//     return "bg-pink-500/10 text-pink-400 border-pink-500/20";
//   }

//   if (value.includes("wallet") || value.includes("connect")) {
//     return "bg-emerald-500/10 text-emerald-400 border-emerald-500/20";
//   }

//   return "bg-[#A259FF]/10 text-[#B872FF] border-[#A259FF]/20";
// };

// const formatDate = (date) => {
//   if (!date) return "Date unavailable";

//   const parsed = new Date(date);

//   if (Number.isNaN(parsed.getTime())) {
//     return "Date unavailable";
//   }

//   return parsed.toLocaleString("en-IN", {
//     day: "numeric",
//     month: "short",
//     year: "numeric",
//     hour: "2-digit",
//     minute: "2-digit",
//   });
// };

// const Notifications = () => {
//   const [notifications, setNotifications] = useState([]);
//   const [activeFilter, setActiveFilter] = useState("All");
//   const [search, setSearch] = useState("");

//   const loadNotifications = () => {
//     try {
//       const saved = JSON.parse(
//         localStorage.getItem(NOTIFICATIONS_KEY) || "[]"
//       );

//       setNotifications(Array.isArray(saved) ? saved : []);
//     } catch {
//       setNotifications([]);
//     }
//   };

//   useEffect(() => {
//     loadNotifications();
//   }, []);

//   const saveNotifications = (items) => {
//     setNotifications(items);

//     localStorage.setItem(
//       NOTIFICATIONS_KEY,
//       JSON.stringify(items)
//     );
//   };

//   const unreadCount = notifications.filter(
//     (item) => !item.read
//   ).length;

//   const markAsRead = (id) => {
//     const updated = notifications.map((item) =>
//       String(item.id || item._id) === String(id)
//         ? { ...item, read: true }
//         : item
//     );

//     saveNotifications(updated);
//   };

//   const markAllAsRead = () => {
//     saveNotifications(
//       notifications.map((item) => ({
//         ...item,
//         read: true,
//       }))
//     );
//   };

//   const deleteNotification = (id) => {
//     saveNotifications(
//       notifications.filter(
//         (item) =>
//           String(item.id || item._id) !== String(id)
//       )
//     );
//   };

//   const clearAll = () => {
//     if (notifications.length === 0) return;

//     if (
//       window.confirm(
//         "Are you sure you want to delete all notifications?"
//       )
//     ) {
//       saveNotifications([]);
//     }
//   };

//   const filteredNotifications = useMemo(() => {
//     return notifications.filter((item) => {
//       const title = String(item.title || "");
//       const message = String(item.message || "");
//       const type = String(item.type || "");

//       const matchesSearch =
//         `${title} ${message} ${type}`
//           .toLowerCase()
//           .includes(search.toLowerCase());

//       const matchesFilter =
//         activeFilter === "All" ||
//         (activeFilter === "Unread" && !item.read) ||
//         (activeFilter === "Read" && item.read);

//       return matchesSearch && matchesFilter;
//     });
//   }, [notifications, activeFilter, search]);

//   return (
//     <main className="p-4 min-h-full w-full text-white bg-[#08080A] sm:p-6 lg:p-8">
//       {/* Header */}
//       <section className="overflow-hidden relative p-6 bg-gradient-to-r from-[#111114] via-[#111114] to-[#19131F] rounded-[28px] border-white/[0.07] border sm:p-9">
//         <div className="absolute h-52 w-52 bg-[#A259FF]/10 rounded-full blur-[80px] pointer-events-none -right-12 -top-16" />

//         <div className="z-10 relative">
//           <p className="text-xs font-bold tracking-[0.22em] text-[#A259FF] uppercase">
//             Nifty Verse
//           </p>

//           <div className="flex flex-wrap items-center gap-3 mt-3">
//             <h1 className="text-3xl font-bold text-transparent bg-gradient-to-r from-[#C084FC] to-[#55B7FF] bg-clip-text sm:text-4xl">
//               Notifications
//             </h1>

//             {unreadCount > 0 && (
//               <span className="px-3 py-1 text-xs font-semibold text-[#C084FC] bg-[#A259FF]/15 rounded-full border-[#A259FF]/30 border">
//                 {unreadCount} unread
//               </span>
//             )}
//           </div>

//           <p className="mt-3 max-w-2xl text-sm leading-6 text-[#92909D] sm:text-base">
//             Stay updated with your NFT marketplace activity,
//             purchases, favorites and account updates.
//           </p>

//           <div className="inline-flex items-center gap-2 mt-6 px-4 py-2 text-sm text-[#C084FC] bg-[#A259FF]/10 rounded-full border-[#A259FF]/20 border">
//             <Bell size={16} />
//             {notifications.length} Total Notifications
//           </div>
//         </div>
//       </section>

//       {/* Notification Controls */}
//       <section className="mt-8">
//         <div className="flex flex-col items-center justify-between gap-4 lg:flex-row">
//           <div>
//             <h2 className="text-xl font-semibold">
//               Your Notifications
//             </h2>
//             <p className="mt-1 text-sm text-[#777782]">
//               Manage your updates and unread messages.
//             </p>
//           </div>

//           <div className="flex flex-wrap gap-3">
//             <button
//               type="button"
//               onClick={markAllAsRead}
//               disabled={unreadCount === 0}
//               className="inline-flex items-center gap-2 px-4 py-3 text-sm text-[#C084FC] bg-[#A259FF]/[0.06] rounded-xl border-[#A259FF]/20 border transition hover:bg-[#A259FF]/15 disabled:cursor-not-allowed disabled:opacity-40"
//             >
//               <CheckCheck size={16} />
//               Mark all as read
//             </button>

//             {notifications.length > 0 && (
//               <button
//                 type="button"
//                 onClick={clearAll}
//                 className="inline-flex items-center gap-2 px-4 py-3 text-sm text-red-400 bg-red-500/[0.05] rounded-xl border-red-500/20 border transition hover:bg-red-500/10"
//               >
//                 <Trash2 size={16} />
//                 Clear all
//               </button>
//             )}
//           </div>
//         </div>

//         {/* Search */}
//         <div className="flex items-center gap-3 mt-6 px-4 py-3 bg-[#111114] rounded-xl border-white/[0.08] border">
//           <Search size={18} className="text-[#777782] shrink-0" />

//           <input
//             type="text"
//             value={search}
//             onChange={(e) => setSearch(e.target.value)}
//             placeholder="Search notifications..."
//             className="placeholder:text-[#666672] w-full text-sm text-white bg-transparent outline-none"
//           />
//         </div>

//         {/* Filters */}
//         <div className="overflow-x-auto flex gap-2 mt-5 pb-2">
//           {filters.map((filter) => (
//             <button
//               key={filter}
//               type="button"
//               onClick={() => setActiveFilter(filter)}
//               className={`shrink-0 rounded-xl border px-5 py-2.5 text-sm font-medium transition ${
//                 activeFilter === filter
//                   ? "border-[#A259FF]/40 bg-[#A259FF]/15 text-[#C084FC]"
//                   : "border-white/[0.07] bg-[#111114] text-[#92909D] hover:border-white/20 hover:text-white"
//               }`}
//             >
//               {filter}
//             </button>
//           ))}
//         </div>

//         {/* Notification List */}
//         {filteredNotifications.length > 0 ? (
//           <div className="mt-5 space-y-3">
//             {filteredNotifications.map((item, index) => {
//               const id = item.id || item._id || index;
//               const Icon = getIcon(item.type);
//               const iconStyle = getIconStyle(item.type);

//               return (
//                 <article
//                   key={id}
//                   className={`relative flex flex-col gap-4 rounded-2xl border p-4 transition sm:flex-row sm:items-start sm:p-5 ${
//                     item.read
//                       ? "border-white/[0.07] bg-[#111114]"
//                       : "border-[#A259FF]/25 bg-gradient-to-r from-[#17121F] to-[#111114]"
//                   }`}
//                 >
//                   {!item.read && (
//                     <span className="absolute right-4 top-4 h-2 w-2 bg-[#A259FF] rounded-full shadow-[0_0_10px_rgba(162,89,255,0.7)]" />
//                   )}

//                   <div
//                     className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border ${iconStyle}`}
//                   >
//                     <Icon size={21} />
//                   </div>

//                   <div className="flex-1 pr-4 min-w-0">
//                     <h3 className="text-sm font-semibold text-white sm:text-base">
//                       {item.title || "Notification"}
//                     </h3>

//                     <p className="mt-2 text-sm leading-6 text-[#9995A3]">
//                       {item.message || "You have a new update."}
//                     </p>

//                     <div className="flex flex-wrap items-center gap-3 mt-3 text-xs text-[#777782]">
//                       <span className="inline-flex items-center gap-1.5">
//                         <Clock size={13} />
//                         {formatDate(
//                           item.createdAt || item.timestamp || item.date
//                         )}
//                       </span>

//                       <span
//                         className={
//                           item.read
//                             ? "text-[#777782]"
//                             : "text-[#C084FC]"
//                         }
//                       >
//                         {item.read ? "Read" : "Unread"}
//                       </span>
//                     </div>

//                     {item.link && (
//                       <Link
//                         to={item.link}
//                         onClick={() => markAsRead(id)}
//                         className="inline-flex items-center gap-2 mt-4 text-sm font-medium text-[#B872FF] transition hover:text-[#D1A7FF]"
//                       >
//                         View details
//                         <ArrowUpRight size={15} />
//                       </Link>
//                     )}
//                   </div>

//                   <div className="flex items-center gap-2 shrink-0 sm:ml-auto">
//                     {!item.read && (
//                       <button
//                         type="button"
//                         onClick={() => markAsRead(id)}
//                         title="Mark as read"
//                         aria-label="Mark notification as read"
//                         className="flex items-center justify-center h-9 w-9 text-[#B872FF] rounded-lg border-white/[0.08] border transition hover:bg-[#A259FF]/10"
//                       >
//                         <Check size={17} />
//                       </button>
//                     )}

//                     <button
//                       type="button"
//                       onClick={() => deleteNotification(id)}
//                       title="Delete notification"
//                       aria-label="Delete notification"
//                       className="flex items-center justify-center h-9 w-9 text-[#92909D] rounded-lg border-white/[0.08] border transition hover:border-red-500/20 hover:bg-red-500/10 hover:text-red-400"
//                     >
//                       <Trash2 size={16} />
//                     </button>
//                   </div>
//                 </article>
//               );
//             })}
//           </div>
//         ) : (
//           /* Empty State */
//           <div className="flex flex-col items-center justify-center mt-5 px-5 py-12 min-h-[300px] text-center bg-[#101012] rounded-2xl border-dashed border-white/[0.10] border">
//             <div className="flex items-center justify-center h-16 w-16 bg-[#A259FF]/10 rounded-2xl border-[#A259FF]/20 border">
//               {search || activeFilter !== "All" ? (
//                 <Search
//                   size={29}
//                   className="text-[#B872FF]"
//                   strokeWidth={1.5}
//                 />
//               ) : (
//                 <Bell
//                   size={29}
//                   className="text-[#B872FF]"
//                   strokeWidth={1.5}
//                 />
//               )}
//             </div>

//             <h3 className="mt-5 text-xl font-semibold text-white">
//               {search || activeFilter !== "All"
//                 ? "No matching notifications"
//                 : "You're all caught up!"}
//             </h3>

//             <p className="mt-2 max-w-md text-sm leading-6 text-[#85818F]">
//               {search || activeFilter !== "All"
//                 ? "Try another search term or change the selected filter."
//                 : "When there are new updates about your account or NFT activity, they will appear here."}
//             </p>

//             {(search || activeFilter !== "All") && (
//               <button
//                 type="button"
//                 onClick={() => {
//                   setSearch("");
//                   setActiveFilter("All");
//                 }}
//                 className="mt-5 px-5 py-3 text-sm text-white rounded-xl border-white/10 border transition hover:bg-white/5"
//               >
//                 Clear Filters
//               </button>
//             )}

//             {!search && activeFilter === "All" && (
//               <Link
//                 to="/marketplace"
//                 className="inline-flex items-center gap-2 mt-6 px-5 py-3 text-sm font-semibold text-white bg-gradient-to-r from-[#A259FF] to-[#7555FF] rounded-xl transition hover:opacity-90"
//               >
//                 <ShoppingBag size={16} />
//                 Explore Marketplace
//               </Link>
//             )}
//           </div>
//         )}
//       </section>
//     </main>
//   );
// };

// export default Notifications;







import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
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
  BellRing,
  RefreshCw,
} from "lucide-react";

const API_URL =
  import.meta.env.VITE_API_URL ||
  "https://nifty-verse-backend-production.up.railway.app";

const filters = ["All", "Unread", "Read"];

const getId = (item) => String(item?.id || item?._id || "");

const getIcon = (type) => {
  const value = String(type || "").toLowerCase();

  if (value.includes("purchase") || value.includes("buy")) return ShoppingBag;
  if (value.includes("favorite") || value.includes("like")) return Heart;
  if (value.includes("wallet") || value.includes("connect")) return Wallet;

  if (
    value.includes("nft") ||
    value.includes("listing") ||
    value.includes("collection")
  ) {
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

  if (Number.isNaN(parsed.getTime())) return "Date unavailable";

  return parsed.toLocaleString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};

const Notifications = () => {
  const navigate = useNavigate();

  // Keep the latest navigate function without making the API callback change.
  const navigateRef = useRef(navigate);

  useEffect(() => {
    navigateRef.current = navigate;
  }, [navigate]);

  const [notifications, setNotifications] = useState([]);
  const [activeFilter, setActiveFilter] = useState("All");
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [busyIds, setBusyIds] = useState(() => new Set());
  const [busyAction, setBusyAction] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // ======================================================
  // LOAD NOTIFICATIONS
  // Stable callback prevents the useEffect render loop.
  // ======================================================

  const loadNotifications = useCallback(async (isRefresh = false) => {
    const token = localStorage.getItem("token");

    if (!token) {
      setLoading(false);
      navigateRef.current("/signin", { replace: true });
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
      console.log("[Notifications] Fetching notifications...");

      const response = await fetch(`${API_URL}/api/notifications/mine`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        cache: "no-store",
      });

      const data = await response.json().catch(() => ({}));

      console.log("[Notifications] API status:", response.status);
      console.log("[Notifications] API response:", data);

      if (response.status === 401) {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        navigateRef.current("/signin", { replace: true });
        return;
      }

      if (!response.ok || data.success === false) {
        throw new Error(data.message || "Unable to load notifications.");
      }

      setNotifications(
        Array.isArray(data.notifications) ? data.notifications : []
      );
    } catch (loadError) {
      console.error("[Notifications] Load error:", loadError);
      setError(loadError.message || "Unable to load notifications.");
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, []);

  // This effect executes when the component mounts.
  // loadNotifications has a stable identity, so state updates don't retrigger it.
  useEffect(() => {
    loadNotifications();
  }, [loadNotifications]);

  // ======================================================
  // MARK ONE NOTIFICATION AS READ
  // ======================================================

  const markAsRead = async (id) => {
    const notificationId = String(id || "");

    if (!notificationId || busyIds.has(notificationId)) return;

    const target = notifications.find(
      (item) => getId(item) === notificationId
    );

    if (!target || target.read) return;

    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/signin", { replace: true });
      return;
    }

    setError("");
    setSuccess("");

    setBusyIds((previous) => new Set(previous).add(notificationId));

    try {
      const response = await fetch(
        `${API_URL}/api/notifications/${encodeURIComponent(notificationId)}/read`,
        {
          method: "PATCH",
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
        throw new Error(data.message || "Unable to mark as read.");
      }

      setNotifications((previous) =>
        previous.map((item) =>
          getId(item) === notificationId ? { ...item, read: true } : item
        )
      );

      setSuccess("Notification marked as read.");
    } catch (readError) {
      console.error("[Notifications] Mark as read error:", readError);
      setError(readError.message || "Unable to update notification.");
    } finally {
      setBusyIds((previous) => {
        const next = new Set(previous);
        next.delete(notificationId);
        return next;
      });
    }
  };

  // ======================================================
  // MARK ALL NOTIFICATIONS AS READ
  // ======================================================

  const markAllAsRead = async () => {
    const unreadCount = notifications.filter((item) => !item.read).length;

    if (unreadCount === 0 || busyAction) return;

    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/signin", { replace: true });
      return;
    }

    setBusyAction("read-all");
    setError("");
    setSuccess("");

    try {
      const response = await fetch(
        `${API_URL}/api/notifications/read-all`,
        {
          method: "PATCH",
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
        throw new Error(data.message || "Unable to mark all as read.");
      }

      setNotifications((previous) =>
        previous.map((item) => ({ ...item, read: true }))
      );

      setSuccess("All notifications marked as read.");
    } catch (readError) {
      console.error("[Notifications] Mark all error:", readError);
      setError(readError.message || "Unable to update notifications.");
    } finally {
      setBusyAction("");
    }
  };

  // ======================================================
  // DELETE ONE NOTIFICATION
  // ======================================================

  const deleteNotification = async (id) => {
    const notificationId = String(id || "");

    if (!notificationId || busyIds.has(notificationId)) return;

    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/signin", { replace: true });
      return;
    }

    setBusyIds((previous) => new Set(previous).add(notificationId));
    setError("");
    setSuccess("");

    try {
      const response = await fetch(
        `${API_URL}/api/notifications/${encodeURIComponent(notificationId)}`,
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
        throw new Error(data.message || "Unable to delete notification.");
      }

      setNotifications((previous) =>
        previous.filter((item) => getId(item) !== notificationId)
      );

      setSuccess("Notification deleted successfully.");
    } catch (deleteError) {
      console.error("[Notifications] Delete error:", deleteError);
      setError(deleteError.message || "Unable to delete notification.");
    } finally {
      setBusyIds((previous) => {
        const next = new Set(previous);
        next.delete(notificationId);
        return next;
      });
    }
  };

  // ======================================================
  // CLEAR ALL NOTIFICATIONS
  // ======================================================

  const clearAll = async () => {
    if (notifications.length === 0 || busyAction) return;

    if (
      !window.confirm(
        "Are you sure you want to delete all notifications?"
      )
    ) {
      return;
    }

    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/signin", { replace: true });
      return;
    }

    setBusyAction("clear-all");
    setError("");
    setSuccess("");

    try {
      const response = await fetch(
        `${API_URL}/api/notifications/all`,
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
        throw new Error(data.message || "Unable to clear notifications.");
      }

      setNotifications([]);
      setSuccess("All notifications cleared.");
    } catch (clearError) {
      console.error("[Notifications] Clear all error:", clearError);
      setError(clearError.message || "Unable to clear notifications.");
    } finally {
      setBusyAction("");
    }
  };

  // ======================================================
  // FILTERS AND COUNTS
  // ======================================================

  const unreadCount = notifications.filter((item) => !item.read).length;

  const filteredNotifications = useMemo(() => {
    const query = search.trim().toLowerCase();

    return notifications.filter((item) => {
      const title = String(item.title || "");
      const message = String(item.message || "");
      const type = String(item.type || "");

      const matchesSearch =
        !query ||
        `${title} ${message} ${type}`.toLowerCase().includes(query);

      const matchesFilter =
        activeFilter === "All" ||
        (activeFilter === "Unread" && !item.read) ||
        (activeFilter === "Read" && item.read);

      return matchesSearch && matchesFilter;
    });
  }, [notifications, activeFilter, search]);

  // ======================================================
  // UI
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

          <div className="mt-3 flex flex-wrap items-center gap-3">
            <h1 className="bg-gradient-to-r from-[#C084FC] to-[#55B7FF] bg-clip-text text-3xl font-bold text-transparent sm:text-4xl">
              Notifications
            </h1>

            {unreadCount > 0 && (
              <span className="rounded-full border border-[#A259FF]/30 bg-[#A259FF]/15 px-3 py-1 text-xs font-semibold text-[#C084FC]">
                {unreadCount} unread
              </span>
            )}
          </div>

          <p className="mt-3 max-w-2xl text-sm leading-6 text-[#92909D] sm:text-base">
            Stay updated with your NFT marketplace activity, purchases,
            favorites and account updates.
          </p>

          <div className="mt-6 inline-flex items-center gap-2 rounded-full border border-[#A259FF]/20 bg-[#A259FF]/10 px-4 py-2 text-sm text-[#C084FC]">
            <Bell size={16} />
            {notifications.length} Total Notifications
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
            onClick={() => loadNotifications(true)}
            disabled={loading || refreshing}
            className="inline-flex shrink-0 items-center gap-2 self-start rounded-lg border border-red-300/20 px-3 py-2 hover:bg-red-400/10 disabled:opacity-50 sm:self-auto"
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
          className="mt-5 rounded-xl border border-emerald-400/20 bg-emerald-400/[0.06] px-4 py-3 text-sm text-emerald-300"
        >
          {success}
        </div>
      )}

      {/* NOTIFICATION CONTROLS */}

      <section className="mt-8">
        <div className="flex flex-col items-start justify-between gap-4 lg:flex-row lg:items-center">
          <div>
            <h2 className="text-xl font-semibold">Your Notifications</h2>
            <p className="mt-1 text-sm text-[#777782]">
              Manage your updates and unread messages.
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <button
              type="button"
              onClick={() => loadNotifications(true)}
              disabled={loading || refreshing}
              className="inline-flex items-center gap-2 rounded-xl border border-white/[0.08] bg-[#111114] px-4 py-3 text-sm text-[#C8C6D0] transition hover:border-[#A259FF]/30 hover:text-white disabled:cursor-not-allowed disabled:opacity-40"
            >
              <RefreshCw
                size={16}
                className={refreshing ? "animate-spin" : ""}
              />
              Refresh
            </button>

            <button
              type="button"
              onClick={markAllAsRead}
              disabled={unreadCount === 0 || Boolean(busyAction)}
              className="inline-flex items-center gap-2 rounded-xl border border-[#A259FF]/20 bg-[#A259FF]/[0.06] px-4 py-3 text-sm text-[#C084FC] transition hover:bg-[#A259FF]/15 disabled:cursor-not-allowed disabled:opacity-40"
            >
              {busyAction === "read-all" ? (
                <RefreshCw size={16} className="animate-spin" />
              ) : (
                <CheckCheck size={16} />
              )}
              Mark all as read
            </button>

            {notifications.length > 0 && (
              <button
                type="button"
                onClick={clearAll}
                disabled={Boolean(busyAction)}
                className="inline-flex items-center gap-2 rounded-xl border border-red-500/20 bg-red-500/[0.05] px-4 py-3 text-sm text-red-400 transition hover:bg-red-500/10 disabled:opacity-40"
              >
                {busyAction === "clear-all" ? (
                  <RefreshCw size={16} className="animate-spin" />
                ) : (
                  <Trash2 size={16} />
                )}
                Clear all
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
            placeholder="Search notifications..."
            className="w-full bg-transparent text-sm text-white outline-none placeholder:text-[#666672]"
          />
        </div>

        {/* FILTERS */}

        <div className="mt-5 flex gap-2 overflow-x-auto pb-2">
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
              {filter === "Unread" ? ` (${unreadCount})` : ""}
            </button>
          ))}
        </div>

        {/* NOTIFICATION LIST */}

        {loading ? (
          <div className="mt-5 flex min-h-[300px] items-center justify-center rounded-2xl border border-white/[0.07] bg-[#101012] text-sm text-[#85818F]">
            <span className="flex items-center gap-3">
              <RefreshCw
                size={18}
                className="animate-spin text-[#B872FF]"
              />
              Loading notifications...
            </span>
          </div>
        ) : filteredNotifications.length > 0 ? (
          <div className="mt-5 space-y-3">
            {filteredNotifications.map((item) => {
              const id = getId(item);
              const Icon = getIcon(item.type);
              const iconStyle = getIconStyle(item.type);
              const rowBusy = busyIds.has(id);

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
                    <span className="absolute right-4 top-4 h-2 w-2 rounded-full bg-[#A259FF] shadow-[0_0_10px_rgba(162,89,255,0.7)]" />
                  )}

                  <div
                    className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border ${iconStyle}`}
                  >
                    <Icon size={21} />
                  </div>

                  <div className="min-w-0 flex-1 pr-4">
                    <h3 className="text-sm font-semibold text-white sm:text-base">
                      {item.title || "Notification"}
                    </h3>

                    <p className="mt-2 whitespace-pre-wrap break-words text-sm leading-6 text-[#9995A3]">
                      {item.message || "You have a new update."}
                    </p>

                    <div className="mt-3 flex flex-wrap items-center gap-3 text-xs text-[#777782]">
                      <span className="inline-flex items-center gap-1.5">
                        <Clock size={13} />
                        {formatDate(
                          item.createdAt || item.timestamp || item.date
                        )}
                      </span>

                      <span
                        className={
                          item.read ? "text-[#777782]" : "text-[#C084FC]"
                        }
                      >
                        {item.read ? "Read" : "Unread"}
                      </span>
                    </div>

                    {item.link && (
                      <Link
                        to={item.link}
                        onClick={() => {
                          if (!item.read) void markAsRead(id);
                        }}
                        className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-[#B872FF] transition hover:text-[#D1A7FF]"
                      >
                        View details
                        <ArrowUpRight size={15} />
                      </Link>
                    )}
                  </div>

                  <div className="flex shrink-0 items-center gap-2 sm:ml-auto">
                    {!item.read && (
                      <button
                        type="button"
                        onClick={() => markAsRead(id)}
                        disabled={rowBusy}
                        title="Mark as read"
                        aria-label="Mark notification as read"
                        className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/[0.08] text-[#B872FF] transition hover:bg-[#A259FF]/10 disabled:opacity-40"
                      >
                        {rowBusy ? (
                          <RefreshCw size={16} className="animate-spin" />
                        ) : (
                          <Check size={17} />
                        )}
                      </button>
                    )}

                    <button
                      type="button"
                      onClick={() => deleteNotification(id)}
                      disabled={rowBusy}
                      title="Delete notification"
                      aria-label="Delete notification"
                      className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/[0.08] text-[#92909D] transition hover:border-red-500/20 hover:bg-red-500/10 hover:text-red-400 disabled:opacity-40"
                    >
                      {rowBusy ? (
                        <RefreshCw size={16} className="animate-spin" />
                      ) : (
                        <Trash2 size={16} />
                      )}
                    </button>
                  </div>
                </article>
              );
            })}
          </div>
        ) : (
          /* EMPTY STATE */

          <div className="mt-5 flex min-h-[300px] flex-col items-center justify-center rounded-2xl border border-dashed border-white/[0.10] bg-[#101012] px-5 py-12 text-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl border border-[#A259FF]/20 bg-[#A259FF]/10">
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
                : "When new updates about your account or NFT activity arrive, they will appear here."}
            </p>

            {(search || activeFilter !== "All") && (
              <button
                type="button"
                onClick={() => {
                  setSearch("");
                  setActiveFilter("All");
                }}
                className="mt-5 rounded-xl border border-white/10 px-5 py-3 text-sm text-white transition hover:bg-white/5"
              >
                Clear Filters
              </button>
            )}

            {!search && activeFilter === "All" && (
              <Link
                to="/marketplace"
                className="mt-6 inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-[#A259FF] to-[#7555FF] px-5 py-3 text-sm font-semibold text-white transition hover:opacity-90"
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