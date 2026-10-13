
// import React from "react";
// import {
//   Image,
//   Layers,
//   Heart,
//   Wallet,
//   Plus,
//   ArrowUpRight,
//   ArrowDownLeft,
//   ShoppingBag,
//   Compass,
//   Clock,
//   ArrowRight,
//   Sparkles,
//   ExternalLink,
// } from "lucide-react";
// import { useNavigate } from "react-router-dom";

// const StatCard = ({
//   title,
//   value,
//   subtitle,
//   icon: Icon,
//   iconColor = "text-[#A259FF]",
// }) => (
//   <div className="p-5 bg-[#111114] rounded-2xl border-white/[0.07] duration-300 group border transition hover:border-[#A259FF]/40 hover:bg-[#15131A] sm:p-6">
//     <div className="flex items-center justify-between gap-3">
//       <p className="text-sm font-medium text-gray-400">{title}</p>
//       <div className={`rounded-xl bg-white/[0.04] p-3 ${iconColor}`}>
//         <Icon size={21} />
//       </div>
//     </div>

//     <h3 className="mt-5 text-3xl font-bold tracking-tight text-white">
//       {value}
//     </h3>

//     <p className="mt-2 text-xs text-gray-500">{subtitle}</p>
//   </div>
// );

// const EmptyState = ({ icon: Icon, title, description, action }) => (
//   <div className="flex flex-col items-center justify-center px-5 py-8 min-h-[210px] text-center">
//     <div className="mb-4 p-4 text-[#B57AFF] bg-[#A259FF]/10 rounded-2xl border-[#A259FF]/20 border">
//       <Icon size={27} />
//     </div>

//     <h3 className="text-base font-semibold text-white">{title}</h3>

//     <p className="mt-2 max-w-sm text-sm leading-6 text-gray-500">
//       {description}
//     </p>

//     {action}
//   </div>
// );

// export default function Dashboard({
//   ownedNFTs = [],
//   createdNFTs = [],
//   collections = [],
//   favorites = [],
//   activities = [],
//   walletBalance = null,
//   currency = "ETH",
// }) {
//   const navigate = useNavigate();

//   // Use actual application data; do not add dummy records.
//   const owned = Array.isArray(ownedNFTs) ? ownedNFTs : [];
//   const created = Array.isArray(createdNFTs) ? createdNFTs : [];
//   const collectionList = Array.isArray(collections) ? collections : [];
//   const favoriteList = Array.isArray(favorites) ? favorites : [];
//   const recentActivities = Array.isArray(activities) ? activities : [];

//   const stats = [
//     {
//       title: "Owned NFTs",
//       value: owned.length.toLocaleString(),
//       subtitle: "NFTs in your portfolio",
//       icon: Image,
//       iconColor: "text-[#A259FF]",
//     },
//     {
//       title: "Created NFTs",
//       value: created.length.toLocaleString(),
//       subtitle: "NFTs created by you",
//       icon: Sparkles,
//       iconColor: "text-blue-400",
//     },
//     {
//       title: "Collections",
//       value: collectionList.length.toLocaleString(),
//       subtitle: "Your NFT collections",
//       icon: Layers,
//       iconColor: "text-pink-400",
//     },
//     {
//       title: "Favorites",
//       value: favoriteList.length.toLocaleString(),
//       subtitle: "NFTs saved by you",
//       icon: Heart,
//       iconColor: "text-rose-400",
//     },
//   ];

//   const formatPrice = (price) => {
//     if (price === undefined || price === null || price === "") {
//       return "Price not set";
//     }

//     const number = Number(price);

//     return Number.isFinite(number)
//       ? `${number.toLocaleString(undefined, {
//           maximumFractionDigits: 4,
//         })} ${currency}`
//       : String(price);
//   };

//   const getActivityIcon = (type = "") => {
//     const action = String(type).toLowerCase();

//     if (action.includes("purchas") || action.includes("buy")) {
//       return ShoppingBag;
//     }

//     if (action.includes("creat")) {
//       return Sparkles;
//     }

//     if (action.includes("list")) {
//       return ArrowUpRight;
//     }

//     if (action.includes("sell")) {
//       return ArrowDownLeft;
//     }

//     return Clock;
//   };

//   const getNFTImage = (nft) =>
//     nft?.image || nft?.imageUrl || nft?.imageURL || "";

//   const getNFTName = (nft) => nft?.name || "Untitled NFT";

//   return (
//     <main className="overflow-x-hidden px-4 py-8 min-h-full text-white bg-[#08080A] sm:px-6 xl:px-8">
//       <div className="mx-auto max-w-[1600px] space-y-8">

//         {/* Welcome banner */}
//         <section className="overflow-hidden relative p-6 bg-gradient-to-br from-[#17121F] via-[#111114] to-[#0D0D10] rounded-[26px] border-white/[0.06] border sm:p-9 lg:p-10">
//           <div className="absolute h-72 w-72 bg-[#A259FF]/10 rounded-full blur-[90px] pointer-events-none -right-16 -top-28" />

//           <div className="z-10 relative max-w-3xl">
//             <div className="inline-flex items-center gap-2 mb-4 text-xs font-bold tracking-[0.25em] text-[#B57AFF] uppercase">
//               <Sparkles size={15} />
//               Nifty Verse
//             </div>

//             <h1 className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-[42px]">
//               Dashboard
//             </h1>

//             <p className="mt-4 max-w-2xl text-sm leading-7 text-gray-400 sm:text-base">
//               Your NFT activity, account statistics and marketplace overview.
//               Manage your digital assets from one place.
//             </p>

//             <div className="flex flex-wrap gap-3 mt-7">
//               <button
//                 type="button"
//                 onClick={() => navigate("/user/nfts")}
//                 className="inline-flex items-center gap-2 px-5 py-3 text-sm font-semibold text-white bg-[#A259FF] rounded-xl transition hover:bg-[#9147E8]"
//               >
//                 <Plus size={18} />
//                 Create NFT
//               </button>

//               <button
//                 type="button"
//                 onClick={() => navigate("/user/collections")}
//                 className="inline-flex items-center gap-2 px-5 py-3 text-sm font-semibold text-gray-200 bg-white/[0.04] rounded-xl border-white/10 border transition hover:border-[#A259FF]/50 hover:bg-white/[0.07]"
//               >
//                 <Layers size={17} />
//                 My Collections
//               </button>

//               <button
//                 type="button"
//                 onClick={() => navigate("/marketplace")}
//                 className="inline-flex items-center gap-2 px-5 py-3 text-sm font-semibold text-gray-300 rounded-xl border-white/10 border transition hover:border-[#A259FF]/50 hover:text-white"
//               >
//                 Explore Marketplace
//                 <ArrowUpRight size={17} />
//               </button>
//             </div>
//           </div>
//         </section>

//         {/* Statistics */}
//         <section>
//           <div className="mb-5">
//             <h2 className="text-xl font-bold text-white">
//               Portfolio Overview
//             </h2>
//             <p className="mt-1 text-sm text-gray-500">
//               A quick look at your NFT portfolio.
//             </p>
//           </div>

//           <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
//             {stats.map((stat) => (
//               <StatCard key={stat.title} {...stat} />
//             ))}
//           </div>
//         </section>

//         {/* Wallet and quick actions */}
//         <section className="grid grid-cols-1 gap-5 xl:grid-cols-3">
//           <div className="p-6 bg-[#111114] rounded-2xl border-white/[0.07] border sm:p-7 xl:col-span-2">
//             <div className="flex items-start justify-between gap-4">
//               <div>
//                 <p className="text-sm text-gray-400">Wallet Balance</p>

//                 <h2 className="mt-3 text-3xl font-bold">
//                   {walletBalance === null || walletBalance === undefined
//                     ? "Not connected"
//                     : formatPrice(walletBalance)}
//                 </h2>

//                 <p className="mt-2 text-xs text-gray-500">
//                   {walletBalance === null || walletBalance === undefined
//                     ? "Connect your wallet to view your balance."
//                     : "Balance provided by your connected wallet."}
//                 </p>
//               </div>

//               <div className="p-3 text-[#B57AFF] bg-[#A259FF]/10 rounded-xl">
//                 <Wallet size={24} />
//               </div>
//             </div>

//             <button
//               type="button"
//               onClick={() => navigate("/connect-wallet")}
//               className="inline-flex items-center gap-2 mt-6 px-4 py-3 text-sm font-semibold text-[#C49AFF] rounded-xl border-[#A259FF]/30 border transition hover:bg-[#A259FF]/10"
//             >
//               {walletBalance === null || walletBalance === undefined
//                 ? "Connect Wallet"
//                 : "Manage Wallet"}
//               <ArrowUpRight size={16} />
//             </button>
//           </div>

//           <div className="p-6 bg-[#111114] rounded-2xl border-white/[0.07] border">
//             <h3 className="text-lg font-bold">Quick Actions</h3>

//             <p className="mt-1 text-sm text-gray-500">
//               What would you like to do?
//             </p>

//             <div className="mt-5 space-y-3">
//               {[
//                 {
//                   label: "Create a new NFT",
//                   icon: Plus,
//                   action: () => navigate("/user/nfts"),
//                 },
//                 {
//                   label: "Create a collection",
//                   icon: Layers,
//                   action: () => navigate("/user/collections"),
//                 },
//                 {
//                   label: "Explore marketplace",
//                   icon: Compass,
//                   action: () => navigate("/marketplace"),
//                 },
//               ].map((item) => {
//                 const ActionIcon = item.icon;

//                 return (
//                   <button
//                     type="button"
//                     key={item.label}
//                     onClick={item.action}
//                     className="flex items-center gap-3 p-3 w-full text-left bg-white/[0.02] rounded-xl border-white/[0.06] border transition hover:border-[#A259FF]/30 hover:bg-[#A259FF]/[0.06]"
//                   >
//                     <span className="p-2 text-[#B57AFF] bg-[#A259FF]/10 rounded-lg">
//                       <ActionIcon size={18} />
//                     </span>

//                     <span className="flex-1 text-sm font-medium text-gray-300">
//                       {item.label}
//                     </span>

//                     <ArrowRight size={16} className="text-gray-500" />
//                   </button>
//                 );
//               })}
//             </div>
//           </div>
//         </section>

//         {/* Owned NFTs */}
//         <section className="overflow-hidden bg-[#111114] rounded-2xl border-white/[0.07] border">
//           <div className="flex flex-wrap items-center justify-between gap-3 p-5 border-b border-white/[0.06] sm:p-6">
//             <div>
//               <h2 className="text-lg font-bold">Your NFT Portfolio</h2>
//               <p className="mt-1 text-sm text-gray-500">
//                 NFTs you currently own.
//               </p>
//             </div>

//             <button
//               type="button"
//               onClick={() => navigate("/user/nfts")}
//               className="inline-flex items-center gap-2 text-sm font-semibold text-[#B57AFF] hover:text-white"
//             >
//               View Portfolio
//               <ArrowRight size={16} />
//             </button>
//           </div>

//           {owned.length === 0 ? (
//             <EmptyState
//               icon={Image}
//               title="Your portfolio is empty"
//               description="NFTs you own will appear here when they are added to your account."
//               action={
//                 <button
//                   type="button"
//                   onClick={() => navigate("/marketplace")}
//                   className="inline-flex items-center gap-2 mt-4 px-4 py-3 text-sm font-semibold bg-[#A259FF] rounded-xl hover:bg-[#9147E8]"
//                 >
//                   Explore NFTs
//                   <ArrowUpRight size={16} />
//                 </button>
//               }
//             />
//           ) : (
//             <div className="grid grid-cols-1 gap-4 p-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
//               {owned.slice(0, 4).map((nft, index) => {
//                 const image = getNFTImage(nft);

//                 return (
//                   <article
//                     key={nft.id || nft._id || index}
//                     className="overflow-hidden bg-[#17171B] rounded-2xl border-white/[0.07] border transition hover:-translate-y-1 hover:border-[#A259FF]/30"
//                   >
//                     <div className="overflow-hidden bg-[#202024] aspect-square">
//                       {image ? (
//                         <img
//                           src={image}
//                           alt={getNFTName(nft)}
//                           className="object-cover h-full w-full duration-500 transition hover:scale-105"
//                         />
//                       ) : (
//                         <div className="flex items-center justify-center h-full text-gray-600">
//                           <Image size={42} />
//                         </div>
//                       )}
//                     </div>

//                     <div className="p-4">
//                       <h3 className="font-semibold truncate">
//                         {getNFTName(nft)}
//                       </h3>

//                       <p className="mt-2 text-xs text-gray-500">
//                         {nft.creator || "Creator not specified"}
//                       </p>

//                       <div className="flex items-center justify-between gap-2 mt-4">
//                         <span className="text-xs text-gray-500">Price</span>
//                         <span className="text-sm font-semibold text-[#C49AFF]">
//                           {formatPrice(nft.price)}
//                         </span>
//                       </div>
//                     </div>
//                   </article>
//                 );
//               })}
//             </div>
//           )}
//         </section>

//         {/* Collections and activity */}
//         <section className="grid grid-cols-1 gap-5 xl:grid-cols-2">
//           <div className="overflow-hidden bg-[#111114] rounded-2xl border-white/[0.07] border">
//             <div className="flex items-center justify-between p-5 border-b border-white/[0.06]">
//               <div>
//                 <h2 className="font-bold">My Collections</h2>
//                 <p className="mt-1 text-xs text-gray-500">
//                   Your created NFT collections.
//                 </p>
//               </div>

//               <button
//                 type="button"
//                 onClick={() => navigate("/user/collections")}
//                 aria-label="View collections"
//                 className="p-2 text-gray-400 rounded-lg transition hover:bg-white/[0.05] hover:text-white"
//               >
//                 <ExternalLink size={17} />
//               </button>
//             </div>

//             {collectionList.length === 0 ? (
//               <EmptyState
//                 icon={Layers}
//                 title="No collections yet"
//                 description="Create your first collection to organize your NFTs."
//                 action={
//                   <button
//                     type="button"
//                     onClick={() => navigate("/user/collections")}
//                     className="mt-3 text-sm font-semibold text-[#B57AFF] hover:text-white"
//                   >
//                     Create Collection →
//                   </button>
//                 }
//               />
//             ) : (
//               <div className="p-5 space-y-3">
//                 {collectionList.slice(0, 4).map((collection, index) => (
//                   <button
//                     type="button"
//                     key={collection.id || collection._id || index}
//                     onClick={() => navigate("/user/collections")}
//                     className="flex items-center gap-3 p-3 w-full text-left rounded-xl border-white/[0.06] border transition hover:border-[#A259FF]/30"
//                   >
//                     <div className="overflow-hidden flex items-center justify-center h-12 w-12 text-[#B57AFF] bg-[#A259FF]/10 rounded-xl shrink-0">
//                       {collection.image || collection.banner ? (
//                         <img
//                           src={collection.image || collection.banner}
//                           alt={collection.name || "Collection"}
//                           className="object-cover h-full w-full"
//                         />
//                       ) : (
//                         <Layers size={21} />
//                       )}
//                     </div>

//                     <div className="flex-1 min-w-0">
//                       <p className="text-sm font-semibold truncate">
//                         {collection.name || "Untitled Collection"}
//                       </p>
//                       <p className="mt-1 text-xs text-gray-500">
//                         {Array.isArray(collection.nfts)
//                           ? collection.nfts.length
//                           : collection.nftCount ?? 0}{" "}
//                         NFTs
//                       </p>
//                     </div>

//                     <ArrowRight size={16} className="text-gray-500" />
//                   </button>
//                 ))}
//               </div>
//             )}
//           </div>

//           <div className="overflow-hidden bg-[#111114] rounded-2xl border-white/[0.07] border">
//             <div className="p-5 border-b border-white/[0.06]">
//               <h2 className="font-bold">Recent Activity</h2>
//               <p className="mt-1 text-xs text-gray-500">
//                 Your latest marketplace actions.
//               </p>
//             </div>

//             {recentActivities.length === 0 ? (
//               <EmptyState
//                 icon={Clock}
//                 title="No recent activity"
//                 description="Your NFT creation, purchases and listings will appear here."
//               />
//             ) : (
//               <div className="px-5 divide-y divide-white/[0.05]">
//                 {recentActivities.slice(0, 5).map((activity, index) => {
//                   const ActivityIcon = getActivityIcon(
//                     activity.type || activity.action
//                   );

//                   return (
//                     <div
//                       key={activity.id || activity._id || index}
//                       className="flex items-center gap-3 py-4"
//                     >
//                       <div className="p-3 text-[#B57AFF] bg-[#A259FF]/10 rounded-xl">
//                         <ActivityIcon size={18} />
//                       </div>

//                       <div className="flex-1 min-w-0">
//                         <p className="text-sm font-semibold text-gray-200 truncate">
//                           {activity.title ||
//                             activity.name ||
//                             activity.type ||
//                             "Activity"}
//                         </p>

//                         <p className="mt-1 text-xs text-gray-500">
//                           {activity.createdAt
//                             ? new Date(activity.createdAt).toLocaleString()
//                             : activity.date
//                               ? String(activity.date)
//                               : "Date unavailable"}
//                         </p>
//                       </div>

//                       {activity.price !== undefined &&
//                         activity.price !== null &&
//                         activity.price !== "" && (
//                           <span className="text-xs font-semibold text-[#C49AFF] shrink-0">
//                             {formatPrice(activity.price)}
//                           </span>
//                         )}
//                     </div>
//                   );
//                 })}
//               </div>
//             )}
//           </div>
//         </section>

//         {/* Footer note */}
//         <div className="flex flex-wrap items-center justify-center gap-2 py-5 text-xs text-gray-600 border-t border-white/[0.06]">
//           <Sparkles size={14} className="text-[#A259FF]" />
//           <span>NiftyVerse · Your digital assets, in one place.</span>
//         </div>
//       </div>
//     </main>
//   );
// }






import React, { useCallback, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import {
  Activity,
  ArrowRight,
  ArrowUpRight,
  Compass,
  Image as ImageIcon,
  Layers,
  Plus,
  RefreshCw,
  Sparkles,
  Clock3,
  CheckCircle2,
  FileEdit,
} from "lucide-react";

const API_URL =
  import.meta.env.VITE_API_URL ||
  "https://nifty-verse-backend-production.up.railway.app";

const cardMotion = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.38, ease: "easeOut" },
  },
};

const formatDate = (date) => {
  if (!date) return "Date unavailable";

  const parsed = new Date(date);

  if (Number.isNaN(parsed.getTime())) return "Date unavailable";

  return parsed.toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
};

const displayName = (user) =>
  user?.name ||
  user?.fullName ||
  user?.username ||
  user?.email?.split("@")[0] ||
  "Creator";

const StatCard = ({ title, value, description, icon: Icon, index }) => (
  <motion.article
    variants={cardMotion}
    initial="hidden"
    animate="visible"
    transition={{ delay: index * 0.06 }}
    whileHover={{ y: -4 }}
    className="group relative overflow-hidden rounded-[22px] border border-white/[0.07] bg-[#111114] p-5 transition-colors duration-300 hover:border-[#A259FF]/30 sm:p-6"
  >
    <div className="pointer-events-none absolute -right-9 -top-10 h-28 w-28 rounded-full bg-[#A259FF]/[0.07] blur-3xl transition group-hover:bg-[#A259FF]/15" />

    <div className="relative flex items-start justify-between gap-3">
      <div>
        <p className="text-sm font-medium text-[#85858D]">{title}</p>
        <h2 className="mt-5 text-3xl font-bold tracking-tight text-white">
          {value}
        </h2>
        <p className="mt-2 text-xs leading-5 text-[#676770]">
          {description}
        </p>
      </div>

      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border border-[#A259FF]/15 bg-[#A259FF]/10 text-[#B978FF]">
        <Icon size={21} strokeWidth={1.8} />
      </div>
    </div>
  </motion.article>
);

const SectionHeading = ({ title, description, action }) => (
  <div className="mb-5 flex flex-wrap items-end justify-between gap-3">
    <div>
      <h2 className="text-lg font-semibold text-white sm:text-xl">{title}</h2>
      <p className="mt-1 text-sm text-[#77777F]">{description}</p>
    </div>
    {action}
  </div>
);

const EmptyState = ({ icon: Icon, title, description, action }) => (
  <div className="flex min-h-[220px] flex-col items-center justify-center px-5 py-8 text-center">
    <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl border border-[#A259FF]/20 bg-[#A259FF]/10 text-[#B978FF]">
      <Icon size={25} />
    </div>
    <h3 className="text-base font-semibold text-white">{title}</h3>
    <p className="mt-2 max-w-sm text-sm leading-6 text-[#77777F]">
      {description}
    </p>
    {action}
  </div>
);

const DashboardC = () => {
  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [nfts, setNfts] = useState([]);
  const [collections, setCollections] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState("");

  const fetchJSON = useCallback(
    async (path, token, signal) => {
      const response = await fetch(`${API_URL}${path}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        signal,
      });

      const data = await response.json().catch(() => ({}));

      if (response.status === 401) {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        navigate("/signin", { replace: true });
        throw new Error("Your session expired. Please sign in again.");
      }

      if (!response.ok || data.success === false) {
        throw new Error(data.message || `Unable to load ${path}.`);
      }

      return data;
    },
    [navigate]
  );

  const loadDashboard = useCallback(
    async (signal, isRefresh = false) => {
      const token = localStorage.getItem("token");

      if (!token) {
        localStorage.removeItem("user");
        navigate("/signin", { replace: true });
        return;
      }

      if (isRefresh) {
        setRefreshing(true);
      } else {
        setLoading(true);
      }

      setError("");

      try {
        const [profileData, nftData, collectionData] = await Promise.all([
          fetchJSON("/api/auth/me", token, signal),
          fetchJSON("/api/nfts/mine", token, signal),
          fetchJSON("/api/collections/mine", token, signal),
        ]);

        if (signal?.aborted) return;

        if (!profileData.user) {
          throw new Error("Unable to load your account profile.");
        }

        const verifiedUser = profileData.user;

        setUser(verifiedUser);
        setNfts(Array.isArray(nftData.nfts) ? nftData.nfts : []);
        setCollections(
          Array.isArray(collectionData.collections)
            ? collectionData.collections
            : []
        );

        localStorage.setItem("user", JSON.stringify(verifiedUser));
      } catch (fetchError) {
        if (fetchError.name !== "AbortError" && !signal?.aborted) {
          console.error("User dashboard fetch error:", fetchError);
          setError(fetchError.message || "Unable to load dashboard data.");
        }
      } finally {
        if (!signal?.aborted) {
          setLoading(false);
          setRefreshing(false);
        }
      }
    },
    [fetchJSON, navigate]
  );

  useEffect(() => {
    const controller = new AbortController();

    loadDashboard(controller.signal);

    return () => controller.abort();
  }, [loadDashboard]);

  const publishedNFTs = nfts.filter(
    (nft) => nft.status === "published" && nft.isListed !== false
  );

  const draftNFTs = nfts.filter((nft) => nft.status === "draft");

  const stats = [
    {
      title: "My NFTs",
      value: nfts.length,
      description: "NFTs created or owned by you",
      icon: ImageIcon,
    },
    {
      title: "Published NFTs",
      value: publishedNFTs.length,
      description: "NFTs currently published",
      icon: CheckCircle2,
    },
    {
      title: "My Collections",
      value: collections.length,
      description: "Collections created by you",
      icon: Layers,
    },
    {
      title: "Drafts",
      value: draftNFTs.length,
      description: "NFTs not yet published",
      icon: FileEdit,
    },
  ];

  const recentItems = [
    ...nfts.map((nft) => ({
      id: `nft-${nft._id || nft.id}`,
      title: nft.name || "Untitled NFT",
      type: "NFT",
      date: nft.createdAt,
      image: nft.image,
      status: nft.status || "published",
    })),
    ...collections.map((collection) => ({
      id: `collection-${collection._id || collection.id}`,
      title: collection.name || "Untitled Collection",
      type: "Collection",
      date: collection.createdAt,
      image: collection.image || collection.primaryImage,
      status: collection.status || "published",
    })),
  ]
    .sort((a, b) => {
      const dateA = new Date(a.date || 0).getTime();
      const dateB = new Date(b.date || 0).getTime();
      return dateB - dateA;
    })
    .slice(0, 5);

  const buttonClass =
    "inline-flex items-center justify-center gap-2 rounded-xl px-4 py-3 text-sm font-semibold transition duration-200";

  if (loading) {
    return (
      <main className="flex min-h-[50vh] items-center justify-center bg-[#08080A] text-[#A7A7AF]">
        <div className="flex items-center gap-3 text-sm">
          <span className="h-5 w-5 animate-spin rounded-full border-2 border-[#A259FF]/30 border-t-[#A259FF]" />
          Loading your dashboard...
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-full overflow-x-hidden bg-[#08080A] px-4 py-6 text-white sm:px-6 sm:py-8 xl:px-8">
      <div className="mx-auto max-w-[1600px] space-y-8">
        {/* Welcome banner */}
        <motion.section
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45 }}
          className="group relative overflow-hidden rounded-[26px] border border-white/[0.06] bg-[#111114] shadow-[0_18px_55px_rgba(0,0,0,0.2)]"
        >
          <div className="pointer-events-none absolute -left-16 -top-24 h-64 w-64 rounded-full bg-[#A259FF]/10 blur-3xl transition group-hover:bg-[#A259FF]/15" />
          <div className="pointer-events-none absolute -bottom-28 right-0 h-64 w-64 rounded-full bg-[#4DA6FF]/10 blur-3xl" />

          <div className="relative flex flex-col justify-between gap-6 p-5 sm:p-7 lg:flex-row lg:items-center lg:p-8">
            <div className="min-w-0">
              <p className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-[#B978FF]">
                <Sparkles size={15} />
                Nifty Verse · Creator workspace
              </p>

              <h1 className="mt-4 break-words text-3xl font-bold tracking-tight sm:text-4xl">
                Welcome back,{" "}
                <span className="bg-gradient-to-r from-[#C47BFF] to-[#6DB8FF] bg-clip-text text-transparent">
                  {displayName(user)}
                </span>
              </h1>

              <p className="mt-3 max-w-2xl text-sm leading-7 text-[#85858D] sm:text-base">
                Manage your NFTs and collections, and keep track of the
                content you have created on Nifty Verse.
              </p>

              {user?.email && (
                <p className="mt-3 break-all text-sm text-[#696972]">
                  {user.email}
                </p>
              )}

              {user?.createdAt && (
                <p className="mt-2 text-xs text-[#696972]">
                  Member since {formatDate(user.createdAt)}
                </p>
              )}
            </div>

            <div className="flex flex-wrap gap-3 lg:max-w-[330px] lg:justify-end">
              <button
                type="button"
                onClick={() => navigate("/user/nfts")}
                className={`${buttonClass} bg-[#A259FF] text-white hover:bg-[#9147E8]`}
              >
                <Plus size={17} />
                Create NFT
              </button>

              <button
                type="button"
                onClick={() => navigate("/user/collections")}
                className={`${buttonClass} border border-white/10 bg-white/[0.035] text-white hover:border-[#A259FF]/40 hover:bg-white/[0.06]`}
              >
                <Layers size={17} />
                New Collection
              </button>
            </div>
          </div>
        </motion.section>

        {/* Error state */}
        {error && (
          <section
            role="alert"
            className="flex flex-col gap-3 rounded-2xl border border-red-400/20 bg-red-400/[0.06] p-4 sm:flex-row sm:items-center sm:justify-between"
          >
            <div>
              <p className="text-sm font-semibold text-red-300">
                Dashboard data could not be loaded
              </p>
              <p className="mt-1 break-words text-sm leading-6 text-[#A7A7AF]">
                {error}
              </p>
            </div>

            <button
              type="button"
              onClick={() => loadDashboard(undefined, true)}
              disabled={refreshing}
              className={`${buttonClass} shrink-0 border border-white/10 text-white hover:bg-white/[0.05] disabled:opacity-50`}
            >
              <RefreshCw
                size={16}
                className={refreshing ? "animate-spin" : ""}
              />
              Retry
            </button>
          </section>
        )}

        {/* Actual database statistics */}
        <section>
          <SectionHeading
            title="Portfolio Overview"
            description="Statistics calculated from your saved account records."
          />

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {stats.map((stat, index) => (
              <StatCard key={stat.title} {...stat} index={index} />
            ))}
          </div>
        </section>

        {/* Main content */}
        <section className="grid grid-cols-1 gap-5 xl:grid-cols-2">
          {/* My NFTs */}
          <motion.div
            variants={cardMotion}
            initial="hidden"
            animate="visible"
            className="overflow-hidden rounded-[24px] border border-white/[0.07] bg-[#111114]"
          >
            <div className="flex items-center justify-between gap-3 border-b border-white/[0.06] px-5 py-5 sm:px-6">
              <div>
                <h2 className="text-base font-semibold sm:text-lg">My NFTs</h2>
                <p className="mt-1 text-xs text-[#77777F]">
                  Your latest NFT records
                </p>
              </div>

              <button
                type="button"
                onClick={() => navigate("/user/nfts")}
                className="inline-flex shrink-0 items-center gap-1.5 rounded-lg px-3 py-2 text-xs font-semibold text-[#B978FF] transition hover:bg-[#A259FF]/10 hover:text-white"
              >
                View all <ArrowRight size={15} />
              </button>
            </div>

            {nfts.length === 0 ? (
              <EmptyState
                icon={ImageIcon}
                title="Your NFT portfolio is empty"
                description="NFTs you create will appear here after they are saved."
                action={
                  <button
                    type="button"
                    onClick={() => navigate("/user/nfts")}
                    className={`${buttonClass} mt-3 bg-[#A259FF] text-white hover:bg-[#9147E8]`}
                  >
                    <Plus size={16} />
                    Create your first NFT
                  </button>
                }
              />
            ) : (
              <div className="divide-y divide-white/[0.05]">
                {nfts.slice(0, 4).map((nft) => (
                  <div
                    key={nft._id || nft.id}
                    className="flex items-center gap-3 px-5 py-4 transition hover:bg-white/[0.02] sm:px-6"
                  >
                    <div className="h-12 w-12 shrink-0 overflow-hidden rounded-xl border border-white/[0.06] bg-[#1A1A1E]">
                      {nft.image ? (
                        <img
                          src={nft.image}
                          alt={nft.name || "NFT"}
                          className="h-full w-full object-cover"
                        />
                      ) : (
                        <div className="flex h-full items-center justify-center text-[#77777F]">
                          <ImageIcon size={20} />
                        </div>
                      )}
                    </div>

                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-semibold text-white">
                        {nft.name || "Untitled NFT"}
                      </p>
                      <p className="mt-1 text-xs text-[#77777F]">
                        {formatDate(nft.createdAt)}
                      </p>
                    </div>

                    <span
                      className={`shrink-0 rounded-full px-2.5 py-1 text-[10px] font-semibold ${
                        nft.status === "draft"
                          ? "bg-amber-400/10 text-amber-300"
                          : "bg-emerald-400/10 text-emerald-300"
                      }`}
                    >
                      {nft.status === "draft" ? "Draft" : "Published"}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </motion.div>

          {/* My Collections */}
          <motion.div
            variants={cardMotion}
            initial="hidden"
            animate="visible"
            className="overflow-hidden rounded-[24px] border border-white/[0.07] bg-[#111114]"
          >
            <div className="flex items-center justify-between gap-3 border-b border-white/[0.06] px-5 py-5 sm:px-6">
              <div>
                <h2 className="text-base font-semibold sm:text-lg">
                  My Collections
                </h2>
                <p className="mt-1 text-xs text-[#77777F]">
                  Collections created by you
                </p>
              </div>

              <button
                type="button"
                onClick={() => navigate("/user/collections")}
                className="inline-flex shrink-0 items-center gap-1.5 rounded-lg px-3 py-2 text-xs font-semibold text-[#B978FF] transition hover:bg-[#A259FF]/10 hover:text-white"
              >
                View all <ArrowRight size={15} />
              </button>
            </div>

            {collections.length === 0 ? (
              <EmptyState
                icon={Layers}
                title="No collections yet"
                description="Create a collection to organize your NFTs."
                action={
                  <button
                    type="button"
                    onClick={() => navigate("/user/collections")}
                    className={`${buttonClass} mt-3 bg-[#A259FF] text-white hover:bg-[#9147E8]`}
                  >
                    <Plus size={16} />
                    Create collection
                  </button>
                }
              />
            ) : (
              <div className="divide-y divide-white/[0.05]">
                {collections.slice(0, 4).map((collection) => (
                  <div
                    key={collection._id || collection.id}
                    className="flex items-center gap-3 px-5 py-4 transition hover:bg-white/[0.02] sm:px-6"
                  >
                    <div className="h-12 w-12 shrink-0 overflow-hidden rounded-xl border border-white/[0.06] bg-[#1A1A1E]">
                      {collection.image || collection.primaryImage ? (
                        <img
                          src={collection.image || collection.primaryImage}
                          alt={collection.name || "Collection"}
                          className="h-full w-full object-cover"
                        />
                      ) : (
                        <div className="flex h-full items-center justify-center text-[#77777F]">
                          <Layers size={20} />
                        </div>
                      )}
                    </div>

                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-semibold text-white">
                        {collection.name || "Untitled Collection"}
                      </p>
                      <p className="mt-1 text-xs text-[#77777F]">
                        {Array.isArray(collection.nfts)
                          ? collection.nfts.length
                          : collection.nftCount ?? 0}{" "}
                        NFTs · {formatDate(collection.createdAt)}
                      </p>
                    </div>

                    <ArrowUpRight size={17} className="shrink-0 text-[#696972]" />
                  </div>
                ))}
              </div>
            )}
          </motion.div>
        </section>

        {/* Recent activity derived from real records */}
        <section>
          <SectionHeading
            title="Recent Activity"
            description="A timeline of your saved NFTs and collections."
            action={
              <button
                type="button"
                onClick={() => loadDashboard(undefined, true)}
                disabled={refreshing}
                className={`${buttonClass} border border-white/10 text-[#B6B6BE] hover:border-[#A259FF]/30 hover:text-white disabled:opacity-50`}
              >
                <RefreshCw
                  size={15}
                  className={refreshing ? "animate-spin" : ""}
                />
                Refresh
              </button>
            }
          />

          <div className="overflow-hidden rounded-[24px] border border-white/[0.07] bg-[#111114]">
            {recentItems.length === 0 ? (
              <EmptyState
                icon={Activity}
                title="No activity yet"
                description="Your new NFT and collection records will appear here."
              />
            ) : (
              <div className="divide-y divide-white/[0.05]">
                {recentItems.map((item) => {
                  const ItemIcon =
                    item.type === "NFT" ? ImageIcon : Layers;

                  return (
                    <div
                      key={item.id}
                      className="flex items-center gap-3 px-5 py-4 sm:px-6"
                    >
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#A259FF]/10 text-[#B978FF]">
                        <ItemIcon size={18} />
                      </div>

                      <div className="min-w-0 flex-1">
                        <p className="truncate text-sm font-semibold text-white">
                          {item.type} · {item.title}
                        </p>
                        <p className="mt-1 text-xs text-[#77777F]">
                          {formatDate(item.date)}
                        </p>
                      </div>

                      <span className="shrink-0 text-xs capitalize text-[#85858D]">
                        {item.status}
                      </span>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </section>

        {/* Quick links */}
        <section className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <button
            type="button"
            onClick={() => navigate("/marketplace")}
            className="group flex items-center gap-4 rounded-2xl border border-white/[0.07] bg-[#111114] p-5 text-left transition hover:border-[#A259FF]/30 hover:bg-[#15131A]"
          >
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#A259FF]/10 text-[#B978FF]">
              <Compass size={22} />
            </div>
            <span className="min-w-0 flex-1">
              <span className="block text-sm font-semibold text-white">
                Explore Marketplace
              </span>
              <span className="mt-1 block text-xs text-[#77777F]">
                Discover published digital artwork
              </span>
            </span>
            <ArrowRight
              size={18}
              className="shrink-0 text-[#696972] transition group-hover:translate-x-1 group-hover:text-[#B978FF]"
            />
          </button>

          <button
            type="button"
            onClick={() => navigate("/user/collections")}
            className="group flex items-center gap-4 rounded-2xl border border-white/[0.07] bg-[#111114] p-5 text-left transition hover:border-[#A259FF]/30 hover:bg-[#15131A]"
          >
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#4DA6FF]/10 text-[#6DB8FF]">
              <Clock3 size={22} />
            </div>
            <span className="min-w-0 flex-1">
              <span className="block text-sm font-semibold text-white">
                Organize your artwork
              </span>
              <span className="mt-1 block text-xs text-[#77777F]">
                Create and manage your collections
              </span>
            </span>
            <ArrowRight
              size={18}
              className="shrink-0 text-[#696972] transition group-hover:translate-x-1 group-hover:text-[#6DB8FF]"
            />
          </button>
        </section>

        <div className="flex items-center justify-center gap-2 border-t border-white/[0.06] py-5 text-xs text-[#55555D]">
          <Sparkles size={14} className="text-[#A259FF]" />
          Nifty Verse · Your digital assets, in one place.
        </div>
      </div>
    </main>
  );
};

export default DashboardC;