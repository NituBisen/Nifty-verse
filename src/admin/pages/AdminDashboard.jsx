// import React, { useEffect, useState } from "react";

// import { motion } from "framer-motion";

// import {
//     Users,
//     Image,
//     FolderKanban,
//     ShoppingBag,
//     Gavel,
//     ReceiptText,
//     UserRound,
//     Activity,
//     ArrowUpRight,
// } from "lucide-react";

// import { useNavigate } from "react-router-dom";

// import logo from "../../assets/logo/logo.png";

// import nft1 from "../../assets/images/marketplace/nft1.png";
// import nft2 from "../../assets/images/marketplace/nft2.png";
// import nft4 from "../../assets/images/marketplace/nft4.png";
// import nft5 from "../../assets/images/marketplace/nft5.png";

// // import avatar1 from "../../assets/images/avatars/avatar1.png";
// // import avatar2 from "../../assets/images/avatars/avatar2.png";
// // import avatar3 from "../../assets/images/avatars/avatar3.png";
// // import avatar4 from "../../assets/images/avatars/avatar4.png";

// const API_URL =
//     import.meta.env.VITE_API_URL ||
//     "https://nifty-verse-backend-production.up.railway.app";

// // const avatarList = [
// //     avatar1,
// //     avatar2,
// //     avatar3,
// //     avatar4,
// // ];

// const staticStats = [
//     {
//         title: "Total NFTs",
//         value: "4,892",
//         change: "+8.2%",
//         icon: Image,
//         accent: "from-violet-500/20 via-purple-500/5 to-transparent",
//         iconBg: "bg-violet-500/10",
//     },
//     {
//         title: "Collections",
//         value: "328",
//         change: "+5.4%",
//         icon: FolderKanban,
//         accent: "from-violet-500/20 via-purple-500/5 to-transparent",
//         iconBg: "bg-violet-500/10",
//     },
//     {
//         title: "Creators",
//         value: "684",
//         change: "+9.1%",
//         icon: UserRound,
//         accent: "from-violet-500/20 via-purple-500/5 to-transparent",
//         iconBg: "bg-violet-500/10",
//     },
//     {
//         title: "Listings",
//         value: "1,426",
//         change: "+6.8%",
//         icon: ShoppingBag,
//         accent: "from-violet-500/20 via-purple-500/5 to-transparent",
//         iconBg: "bg-violet-500/10",
//     },
//     {
//         title: "Active Auctions",
//         value: "184",
//         change: "+4.7%",
//         icon: Gavel,
//         accent: "from-violet-500/20 via-purple-500/5 to-transparent",
//         iconBg: "bg-violet-500/10",
//     },
//     {
//         title: "Transactions",
//         value: "7,842",
//         change: "+14.3%",
//         icon: ReceiptText,
//         accent: "from-violet-500/20 via-purple-500/5 to-transparent",
//         iconBg: "bg-violet-500/10",
//     },
//     {
//         title: "Activity",
//         value: "12,486",
//         change: "+11.2%",
//         icon: Activity,
//         accent: "from-violet-500/20 via-purple-500/5 to-transparent",
//         iconBg: "bg-violet-500/10",
//     },
// ];

// const recentNFTs = [
//     {
//         name: "Magic Mushroom 0325",
//         creator: "Shroomie",
//         price: "1.63 ETH",
//         image: nft1,
//         // avatar: avatar1,
//     },
//     {
//         name: "Happy Robot 032",
//         creator: "BeKind2Robots",
//         price: "1.63 ETH",
//         image: nft2,
//         // avatar: avatar2,
//     },
//     {
//         name: "Designer Bear",
//         creator: "MrFox",
//         price: "1.63 ETH",
//         image: nft4,
//         // avatar: avatar3,
//     },
//     {
//         name: "Colorful Dog 0356",
//         creator: "Keepitreal",
//         price: "1.63 ETH",
//         image: nft5,
//         // avatar: avatar4,
//     },
// ];

// const containerVariants = {
//     hidden: {},
//     show: {
//         transition: {
//             staggerChildren: 0.06,
//         },
//     },
// };

// const cardVariants = {
//     hidden: {
//         opacity: 0,
//         y: 18,
//     },
//     show: {
//         opacity: 1,
//         y: 0,
//         transition: {
//             duration: 0.45,
//             ease: "easeOut",
//         },
//     },
// };

// const AdminDashboard = () => {
//     const navigate = useNavigate();

//     const [users, setUsers] = useState([]);

//     const [loadingUsers, setLoadingUsers] =
//         useState(true);

//     const [usersError, setUsersError] =
//         useState("");

//     const fetchDashboardUsers = async () => {
//         try {
//             setLoadingUsers(true);

//             setUsersError("");

//             const adminToken =
//                 localStorage.getItem(
//                     "adminToken"
//                 );

//             if (!adminToken) {
//                 navigate(
//                     "/admin/login",
//                     {
//                         replace: true,
//                     }
//                 );

//                 return;
//             }

//             const response = await fetch(
//                 `${API_URL}/api/admin/users`,
//                 {
//                     method: "GET",
//                     headers: {
//                         Authorization: `Bearer ${adminToken}`,
//                     },
//                 }
//             );

//             const data =
//                 await response.json();

//             if (response.status === 401) {
//                 localStorage.removeItem(
//                     "adminToken"
//                 );

//                 localStorage.removeItem(
//                     "admin"
//                 );

//                 navigate(
//                     "/admin/login",
//                     {
//                         replace: true,
//                     }
//                 );

//                 return;
//             }

//             if (response.status === 403) {
//                 throw new Error(
//                     data.message ||
//                     "Admin access denied"
//                 );
//             }

//             if (!response.ok) {
//                 throw new Error(
//                     data.message ||
//                     "Failed to fetch dashboard users"
//                 );
//             }

//             setUsers(
//                 data.users || []
//             );
//         } catch (error) {
//             console.error(
//                 "Dashboard users error:",
//                 error
//             );

//             setUsersError(
//                 error.message ||
//                 "Failed to load users"
//             );
//         } finally {
//             setLoadingUsers(false);
//         }
//     };

//     useEffect(() => {
//         fetchDashboardUsers();
//     }, []);

//     const recentUsers = users
//     .slice(0, 4)
//     .map((user) => ({
//         name:
//             user.username ||
//             "Unnamed User",
//         email:
//             user.email ||
//             "No email",
//         status: "Active",
//     }));

//     const dashboardStats = [
//         {
//             title: "Total Users",
//             value:
//                 loadingUsers
//                     ? "..."
//                     : users.length.toLocaleString(),
//             change: "+12.5%",
//             icon: Users,
//             accent:
//                 "from-violet-500/20 via-purple-500/5 to-transparent",
//             iconBg:
//                 "bg-violet-500/10",
//         },
//         ...staticStats,
//     ];

//     return (
//         <div className="space-y-6 sm:space-y-8">
//             {/* =========================
//                 WELCOME CARD
//             ========================== */}

//             <motion.section
//                 initial={{
//                     opacity: 0,
//                     y: 18,
//                 }}
//                 animate={{
//                     opacity: 1,
//                     y: 0,
//                 }}
//                 transition={{
//                     duration: 0.5,
//                     ease: "easeOut",
//                 }}
//                 whileHover={{
//                     y: -3,
//                 }}
//                 className="group relative overflow-hidden rounded-[26px] bg-[#111114] shadow-[0_18px_55px_rgba(0,0,0,0.2)]"
//             >
//                 <div className="pointer-events-none absolute -left-20 -top-24 h-64 w-64 rounded-full bg-[#A259FF]/10 blur-3xl transition duration-500 group-hover:bg-[#A259FF]/16" />

//                 <div className="pointer-events-none absolute -bottom-24 right-0 h-64 w-64 rounded-full bg-[#4DA6FF]/8 blur-3xl transition duration-500 group-hover:bg-[#4DA6FF]/14" />

//                 <div className="relative z-10 flex min-h-[150px] flex-col items-start justify-center gap-4 p-4 sm:flex-row sm:items-center sm:gap-5 sm:px-6 sm:py-6 lg:px-8">
//                     <div className="flex h-[68px] w-[68px] shrink-0 items-center justify-center overflow-hidden rounded-[22px] bg-white/[0.035] ring-1 ring-white/[0.08] shadow-[0_0_35px_rgba(162,89,255,0.08)] sm:h-[76px] sm:w-[76px]">
//                         <img
//                             src={logo}
//                             alt="Nifty Verse"
//                             className="h-full w-full object-contain p-2"
//                         />
//                     </div>

//                     <div className="min-w-0 flex-1">
//                         <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[#66666E] sm:text-xs">
//                             Admin Workspace
//                         </p>

//                         <h2 className="mt-1 text-[clamp(1.7rem,3vw,2.7rem)] font-bold tracking-tight">
//                             Welcome to{" "}
//                             <span className="bg-[linear-gradient(90deg,#C47BFF,#6DB8FF)] bg-clip-text text-transparent">
//                                 Nifty Verse
//                             </span>
//                         </h2>

//                         <p className="mt-2 max-w-[760px] text-sm leading-6 text-[#77777F]">
//                             Manage your NFT marketplace, users, collections and marketplace activity.
//                         </p>
//                     </div>

//                     <div className="ml-auto hidden h-12 w-12 items-center justify-center rounded-2xl border border-white/[0.08] bg-white/[0.03] text-[#66666E] transition duration-300 group-hover:border-[#A259FF]/20 group-hover:text-[#B978FF] sm:flex">
//                         <ArrowUpRight
//                             size={20}
//                             strokeWidth={1.7}
//                         />
//                     </div>
//                 </div>
//             </motion.section>

//             {/* =========================
//                 STATS
//             ========================== */}

//             <motion.section
//                 variants={containerVariants}
//                 initial="hidden"
//                 animate="show"
//                 className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4"
//             >
//                 {dashboardStats.map(
//                     (stat) => {
//                         const Icon =
//                             stat.icon;

//                         return (
//                             <motion.div
//                                 key={
//                                     stat.title
//                                 }
//                                 variants={
//                                     cardVariants
//                                 }
//                                 whileHover={{
//                                     y: -5,
//                                 }}
//                                 transition={{
//                                     type: "spring",
//                                     stiffness: 280,
//                                     damping: 24,
//                                 }}
//                                 className="group relative h-full min-w-0 overflow-hidden rounded-[24px] bg-[#111114] p-4 shadow-[0_15px_45px_rgba(0,0,0,0.16)] sm:p-5"
//                             >
//                                 <div
//                                     className={`pointer-events-none absolute inset-x-0 top-0 h-32 bg-gradient-to-br ${stat.accent} opacity-80 transition duration-500 group-hover:opacity-100`}
//                                 />

//                                 <div className="pointer-events-none absolute -right-10 -top-12 h-32 w-32 rounded-full bg-[#A259FF]/[0.04] blur-3xl transition duration-500 group-hover:bg-[#A259FF]/[0.09]" />

//                                 <div className="relative z-10">
//                                     <div className="flex items-start justify-between gap-3">
//                                         <motion.div
//                                             whileHover={{
//                                                 scale: 1.08,
//                                                 rotate: 2,
//                                             }}
//                                             className={`flex h-11 w-11 items-center justify-center rounded-2xl sm:h-12 sm:w-12 ${stat.iconBg}`}
//                                         >
//                                             <Icon
//                                                 size={
//                                                     20
//                                                 }
//                                                 strokeWidth={
//                                                     1.8
//                                                 }
//                                                 className="text-[#B36DFF]"
//                                             />
//                                         </motion.div>

//                                         <span className="rounded-full bg-[#0ACF83]/[0.08] px-2.5 py-1 text-[10px] font-bold text-[#32D997] sm:text-[11px]">
//                                             {
//                                                 stat.change
//                                             }
//                                         </span>
//                                     </div>

//                                     <p className="mt-6 text-xs text-[#7F7F87] sm:text-sm">
//                                         {
//                                             stat.title
//                                         }
//                                     </p>

//                                     <div className="mt-1 flex items-end justify-between gap-3">
//                                         <h3 className="text-[clamp(1.6rem,2.8vw,2.2rem)] font-bold tracking-tight text-white">
//                                             {
//                                                 stat.value
//                                             }
//                                         </h3>

//                                         <ArrowUpRight
//                                             size={
//                                                 18
//                                             }
//                                             strokeWidth={
//                                                 1.8
//                                             }
//                                             className="mb-1 shrink-0 text-[#56565E] transition duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-[#A259FF]"
//                                         />
//                                     </div>

//                                     <div className="mt-4 h-px w-full bg-white/[0.06]" />

//                                     <div className="mt-3 flex items-center gap-2 text-[10px] text-[#55555D] sm:text-[11px]">
//                                         <span className="h-1.5 w-1.5 rounded-full bg-[#A259FF]/70" />

//                                         Compared to last month
//                                     </div>
//                                 </div>
//                             </motion.div>
//                         );
//                     }
//                 )}
//             </motion.section>

//             {/* =========================
//                 RECENT USERS + NFTS
//             ========================== */}

//             <section className="grid grid-cols-1 gap-5 xl:grid-cols-2">
//                 {/* =========================
//                     Recent Users
//                 ========================== */}

//                 <motion.div
//                     initial={{
//                         opacity: 0,
//                         y: 20,
//                     }}
//                     animate={{
//                         opacity: 1,
//                         y: 0,
//                     }}
//                     whileHover={{
//                         y: -6,
//                         scale: 1.02,
//                     }}
//                     transition={{
//                         delay: 0.18,
//                         duration: 0.45,
//                     }}
//                     className="group relative min-w-0 cursor-pointer overflow-hidden rounded-[26px] bg-[#111114] shadow-[0_15px_50px_rgba(0,0,0,0.15)]"
//                 >
//                     <span className="pointer-events-none absolute left-0 top-0 z-20 h-full w-[2px] bg-gradient-to-b from-transparent via-[#A259FF] to-transparent opacity-0 blur-[1px] transition-opacity duration-300 group-hover:opacity-100" />

//                     <span className="pointer-events-none absolute right-0 top-0 z-20 h-full w-[2px] bg-gradient-to-b from-transparent via-[#A259FF] to-transparent opacity-0 blur-[1px] transition-opacity duration-300 group-hover:opacity-100" />

//                     <div className="flex items-center justify-between gap-3 px-4 py-4 sm:px-6">
//                         <div className="min-w-0">
//                             <h2 className="text-base font-semibold sm:text-lg">
//                                 Recent Users
//                             </h2>

//                             <p className="mt-1 text-[11px] text-[#606068] sm:text-xs">
//                                 Latest registered users
//                             </p>
//                         </div>

//                         <button
//                             type="button"
//                             onClick={() =>
//                                 navigate(
//                                     "/admin/users"
//                                 )
//                             }
//                             className="shrink-0 rounded-full px-3 py-1.5 text-[10px] font-semibold text-[#A259FF] transition duration-300 hover:bg-[#A259FF]/[0.08] hover:text-white sm:text-xs"
//                         >
//                             View All
//                         </button>
//                     </div>

//                     <div className="border-t border-white/[0.06]">
//                         {loadingUsers ? (
//                             <div className="flex min-h-[260px] items-center justify-center px-5">
//                                 <div className="flex items-center gap-3 text-sm text-[#77777F]">
//                                     <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/10 border-t-[#A259FF]" />

//                                     Loading users...
//                                 </div>
//                             </div>
//                         ) : usersError ? (
//                             <div className="flex min-h-[260px] flex-col items-center justify-center px-5 text-center">
//                                 <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-red-500/10 text-red-400">
//                                     <Users
//                                         size={
//                                             21
//                                         }
//                                     />
//                                 </div>

//                                 <p className="mt-4 text-sm font-semibold text-white">
//                                     Unable to load users
//                                 </p>

//                                 <p className="mt-1 max-w-sm text-xs leading-5 text-[#66666E]">
//                                     {
//                                         usersError
//                                     }
//                                 </p>
//                             </div>
//                         ) : recentUsers.length === 0 ? (
//                             <div className="flex min-h-[260px] flex-col items-center justify-center px-5 text-center">
//                                 <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/[0.04] text-[#66666E]">
//                                     <Users
//                                         size={
//                                             21
//                                         }
//                                     />
//                                 </div>

//                                 <p className="mt-4 text-sm font-semibold text-white">
//                                     No registered users
//                                 </p>

//                                 <p className="mt-1 text-xs text-[#66666E]">
//                                     New users will appear here.
//                                 </p>
//                             </div>
//                         ) : (
//                             recentUsers.map(
//                                 (
//                                     user,
//                                     index
//                                 ) => (
//                                     <motion.div
//                                         key={
//                                             user.email
//                                         }
//                                         initial={{
//                                             opacity: 0,
//                                             x: -10,
//                                         }}
//                                         animate={{
//                                             opacity: 1,
//                                             x: 0,
//                                         }}
//                                         whileHover={{
//                                             y: -3,
//                                             scale: 1.01,
//                                         }}
//                                         transition={{
//                                             delay:
//                                                 0.25 +
//                                                 index *
//                                                 0.06,
//                                             duration: 0.35,
//                                         }}
//                                         className="group/row flex min-w-0 cursor-pointer items-center justify-between gap-3 rounded-[12px] border-b border-white/[0.05] px-4 py-4 transition-colors duration-300 hover:bg-white/[0.025] last:border-b-0 sm:px-6"
//                                     >
//                                         <div className="flex min-w-0 items-center gap-3">
//                                             <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-[#A259FF]/20 to-[#4DA6FF]/20 text-sm font-bold text-white ring-1 ring-white/[0.07] transition-all duration-300 group-hover/row:ring-[#A259FF]/30 group-hover/row:scale-105">
//                                                 {
//                                                     user.name
//                                                         ?.charAt(0)
//                                                         ?.toUpperCase() ||
//                                                     "U"
//                                                 }
//                                             </div>

//                                             <div className="min-w-0">
//                                                 <p className="truncate text-sm font-semibold">
//                                                     {
//                                                         user.name
//                                                     }
//                                                 </p>

//                                                 <p className="truncate text-[11px] text-[#62626A] sm:text-xs">
//                                                     {
//                                                         user.email
//                                                     }
//                                                 </p>
//                                             </div>
//                                         </div>

//                                         <span className="shrink-0 rounded-full bg-[#0ACF83]/[0.08] px-2.5 py-1 text-[10px] font-bold text-[#32D997]">
//                                             {
//                                                 user.status
//                                             }
//                                         </span>
//                                     </motion.div>
//                                 )
//                             )
//                         )}
//                     </div>
//                 </motion.div>

//                 {/* =========================
//                     Recent NFTs
//                 ========================== */}

//                 <motion.div
//                     initial={{
//                         opacity: 0,
//                         y: 20,
//                     }}
//                     animate={{
//                         opacity: 1,
//                         y: 0,
//                     }}
//                     whileHover={{
//                         y: -6,
//                         scale: 1.02,
//                     }}
//                     transition={{
//                         delay: 0.18,
//                         duration: 0.45,
//                     }}
//                     className="group relative min-w-0 cursor-pointer overflow-hidden rounded-[26px] bg-[#111114] shadow-[0_15px_50px_rgba(0,0,0,0.15)]"
//                 >
//                     <span className="pointer-events-none absolute left-0 top-0 z-20 h-full w-[2px] bg-gradient-to-b from-transparent via-[#A259FF] to-transparent opacity-0 blur-[1px] transition-opacity duration-300 group-hover:opacity-100" />

//                     <span className="pointer-events-none absolute right-0 top-0 z-20 h-full w-[2px] bg-gradient-to-b from-transparent via-[#A259FF] to-transparent opacity-0 blur-[1px] transition-opacity duration-300 group-hover:opacity-100" />

//                     <div className="flex items-center justify-between gap-3 px-4 py-4 sm:px-6">
//                         <div className="min-w-0">
//                             <h2 className="text-base font-semibold sm:text-lg">
//                                 Recent NFTs
//                             </h2>

//                             <p className="mt-1 text-[11px] text-[#606068] sm:text-xs">
//                                 Latest marketplace NFTs
//                             </p>
//                         </div>

//                         <button
//                             type="button"
//                             onClick={() =>
//                                 navigate(
//                                     "/admin/nfts"
//                                 )
//                             }
//                             className="shrink-0 rounded-full px-3 py-1.5 text-[10px] font-semibold text-[#A259FF] transition duration-300 hover:bg-[#A259FF]/[0.08] hover:text-white sm:text-xs"
//                         >
//                             View All
//                         </button>
//                     </div>

//                     <div className="border-t border-white/[0.06]">
//                         {recentNFTs.map(
//                             (
//                                 nft,
//                                 index
//                             ) => (
//                                 <motion.div
//                                     key={
//                                         nft.name
//                                     }
//                                     initial={{
//                                         opacity: 0,
//                                         x: -10,
//                                     }}
//                                     animate={{
//                                         opacity: 1,
//                                         x: 0,
//                                     }}
//                                     whileHover={{
//                                         y: -3,
//                                         scale: 1.01,
//                                     }}
//                                     transition={{
//                                         delay:
//                                             0.25 +
//                                             index *
//                                             0.06,
//                                         duration: 0.35,
//                                     }}
//                                     className="group/nft flex min-w-0 cursor-pointer items-center justify-between gap-3 rounded-[12px] border-b border-white/[0.05] px-4 py-4 transition-colors duration-300 hover:bg-white/[0.025] last:border-b-0 sm:px-6"
//                                 >
//                                     <div className="flex min-w-0 items-center gap-3">
//                                         <div className="h-12 w-12 shrink-0 overflow-hidden rounded-xl bg-[#1A1A1E]">
//                                             <img
//                                                 src={
//                                                     nft.image
//                                                 }
//                                                 alt={
//                                                     nft.name
//                                                 }
//                                                 className="h-full w-full object-cover transition duration-500 group-hover/nft:scale-110"
//                                             />
//                                         </div>

//                                         <div className="flex min-w-0 items-center gap-2.5">
//                                             {/* <img
//                                                 src={
//                                                     nft.avatar
//                                                 }
//                                                 alt={
//                                                     nft.creator
//                                                 }
//                                                 className="h-7 w-7 shrink-0 rounded-full object-cover ring-1 ring-white/[0.07] transition-all duration-300 group-hover/nft:ring-[#A259FF]/30 group-hover/nft:scale-105"
//                                             /> */}

//                                             <div className="min-w-0">
//                                                 <p className="truncate text-sm font-semibold">
//                                                     {
//                                                         nft.name
//                                                     }
//                                                 </p>

//                                                 <p className="truncate text-[11px] text-[#62626A] sm:text-xs">
//                                                     By{" "}
//                                                     {
//                                                         nft.creator
//                                                     }
//                                                 </p>
//                                             </div>
//                                         </div>
//                                     </div>

//                                     <div className="shrink-0 text-right">
//                                         <p className="text-[10px] text-[#595961]">
//                                             Price
//                                         </p>

//                                         <p className="mt-1 text-sm font-semibold">
//                                             {
//                                                 nft.price
//                                             }
//                                         </p>
//                                     </div>
//                                 </motion.div>
//                             )
//                         )}
//                     </div>
//                 </motion.div>
//             </section>
//         </div>
//     );
// };

// export default AdminDashboard;




//new code



import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Users, Image, FolderKanban, ShoppingBag, Gavel, ReceiptText, UserRound, Activity, ArrowUpRight, RefreshCw } from "lucide-react";
import { useNavigate } from "react-router-dom";
import logo from "../../assets/logo/logo.png";

const API_URL = (import.meta.env.VITE_API_URL || "https://nifty-verse-backend-production.up.railway.app").replace(/\/+$/, "");

const formatNumber = (value) => Number(value || 0).toLocaleString("en-IN");
const formatDate = (value) => value ? new Date(value).toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" }) : "—";
const getName = (value) => typeof value === "object" && value ? value.username || value.name || value.email || "Unknown" : value || "Unknown";
const getInitial = (value) => String(value || "?").trim().charAt(0).toUpperCase() || "?";

const panelClass = "group relative min-w-0 overflow-hidden rounded-[26px] border border-white/[0.04] bg-[#111114] shadow-[0_15px_50px_rgba(0,0,0,0.15)]";
const rowClass = "flex min-w-0 items-center justify-between gap-3 border-b border-white/[0.05] px-4 py-4 transition-colors hover:bg-white/[0.025] last:border-b-0 sm:px-6";

const AdminDashboard = () => {
    const navigate = useNavigate();

    const [users, setUsers] = useState([]);
    const [recentNFTs, setRecentNFTs] = useState([]);
    const [collections, setCollections] = useState([]);
    const [creators, setCreators] = useState([]);
    const [listings, setListings] = useState([]);
    const [activities, setActivities] = useState([]);

    const [stats, setStats] = useState({
        totalNFTs: 0,
        publishedNFTs: 0,
        draftNFTs: 0,
        listedNFTs: 0,
        totalCreators: 0,
        totalCollections: 0,
        totalActivities: 0
    });

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const handleUnauthorized = () => {
        localStorage.removeItem("adminToken");
        localStorage.removeItem("admin");
        navigate("/admin/login", { replace: true });
    };

    const fetchDashboard = async () => {
        const token = localStorage.getItem("adminToken");

        if (!token) {
            handleUnauthorized();
            setLoading(false);
            return;
        }

        try {
            setLoading(true);
            setError("");

            const headers = { Authorization: `Bearer ${token}` };

            const endpoints = [
                ["users", "/api/admin/users"],
                ["stats", "/api/admin/dashboard/stats"],
                ["nfts", "/api/admin/dashboard/recent-nfts"],
                ["collections", "/api/admin/dashboard/recent-collections"],
                ["creators", "/api/admin/dashboard/recent-creators"],
                ["listings", "/api/admin/dashboard/recent-listings"],
                ["activities", "/api/admin/dashboard/recent-activities"]
            ];

            const responses = await Promise.all(
                endpoints.map(async ([key, path]) => {
                    const response = await fetch(`${API_URL}${path}`, { headers });
                    const data = await response.json();
                    return { key, response, data };
                })
            );

            if (responses.some((item) => item.response.status === 401)) {
                handleUnauthorized();
                return;
            }

            const failed = responses.find((item) => !item.response.ok);
            if (failed) {
                throw new Error(`${failed.key}: ${failed.data.message || "Unable to fetch dashboard data"}`);
            }

            const result = Object.fromEntries(responses.map(({ key, data }) => [key, data]));

            setUsers(result.users.users || []);
            setStats(result.stats.stats || {});
            setRecentNFTs(result.nfts.nfts || []);
            setCollections(result.collections.collections || []);
            setCreators(result.creators.creators || []);
            setListings(result.listings.listings || []);
            setActivities(result.activities.activities || []);
        } catch (err) {
            console.error("Admin dashboard error:", err);
            setError(err.message || "Unable to load dashboard data.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchDashboard();
    }, []);

    const dashboardStats = [
        { title: "Total Users", value: users.length, icon: Users, live: true },
        { title: "Total NFTs", value: stats.totalNFTs, icon: Image, live: true },
        { title: "Collections", value: stats.totalCollections, icon: FolderKanban, live: true },
        { title: "Creators", value: stats.totalCreators, icon: UserRound, live: true },
        { title: "Listings", value: stats.listedNFTs, icon: ShoppingBag, live: true },
        { title: "Active Auctions", value: "—", icon: Gavel, live: false },
        { title: "Transactions", value: "—", icon: ReceiptText, live: false },
        { title: "Activity", value: stats.totalActivities, icon: Activity, live: true }
    ];

    const sections = [
        { key: "collections", title: "Recent Collections", subtitle: "Latest marketplace collections", items: collections, path: "/admin/collections", icon: FolderKanban },
        { key: "creators", title: "Recent Creators", subtitle: "Users creating NFTs", items: creators, path: "/admin/creators", icon: UserRound },
        { key: "listings", title: "Recent Listings", subtitle: "Latest published NFT listings", items: listings, path: "/admin/listings", icon: ShoppingBag },
        { key: "activities", title: "Recent Activity", subtitle: "Latest marketplace events", items: activities, path: "/admin/activity", icon: Activity }
    ];

    const renderPanelRow = (type, item, index) => {
        const isCollection = type === "collections";
        const isCreator = type === "creators";
        const isListing = type === "listings";
        const isActivity = type === "activities";

        const title = isCollection ? item.name : isCreator ? item.username : isActivity ? item.title || item.type : item.name;
        const image = isCollection || isListing ? item.image : isCreator ? item.avatar || item.profileImage || item.image : item.nftId?.image;
        const secondary = isCollection ? item.category || "Art collection" : isCreator ? item.email || "No email" : isListing ? `By ${item.creatorName || item.creator || getName(item.createdBy)}` : item.message || item.type || "Marketplace activity";
        const rightText = isCollection ? `${Array.isArray(item.nfts) ? item.nfts.length : 0} NFTs` : isCreator ? `${item.totalNFTs || 0} NFTs` : isListing ? `${formatNumber(item.price)} ETH` : formatDate(item.createdAt);
        const status = isCollection || isListing ? item.status || (item.isListed ? "Listed" : "Published") : isActivity ? item.status || item.type : "";

        return (
            <motion.div key={item._id || item.id || index} initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: index * 0.04 }} className={rowClass}>
                <div className="flex min-w-0 items-center gap-3">
                    <div className={`flex h-11 w-11 shrink-0 items-center justify-center overflow-hidden ${isCreator ? "rounded-full" : "rounded-xl"} bg-gradient-to-br from-[#A259FF]/15 to-[#4DA6FF]/10 text-sm font-bold text-[#BD8BFF]`}>
                        {image ? <img src={image} alt={title || "Record"} className="h-full w-full object-cover" onError={(e) => { e.currentTarget.style.display = "none"; }} /> : isActivity ? <Activity size={18} /> : getInitial(title)}
                    </div>
                    <div className="min-w-0">
                        <p className="truncate text-sm font-semibold text-white">{title || (isActivity ? "Activity record" : "Untitled")}</p>
                        <p className="mt-1 truncate text-[11px] text-[#707079] sm:text-xs">{secondary}</p>
                        {(isCollection || isListing) && <p className="mt-1 text-[10px] text-[#A78BCB]">{status}</p>}
                        {isActivity && <p className="mt-1 truncate text-[10px] text-[#A78BCB]">{getName(item.user)}</p>}
                        {isCreator && <p className="mt-1 text-[10px] text-[#777780]">{item.totalListings || 0} listings</p>}
                    </div>
                </div>
                <div className="shrink-0 text-right">
                    <p className="text-xs font-semibold text-[#D1D1D8]">{rightText}</p>
                    {(isCollection || isListing || isCreator) && <p className="mt-1 text-[10px] text-[#66666E]">{formatDate(item.createdAt)}</p>}
                </div>
            </motion.div>
        );
    };

    const renderPanel = ({ title, subtitle, items, path, icon: Icon, key }) => (
        <motion.section key={key} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className={panelClass}>
            <div className="pointer-events-none absolute left-0 top-0 h-full w-[2px] bg-gradient-to-b from-transparent via-[#A259FF] to-transparent opacity-0 transition group-hover:opacity-100" />
            <div className="flex items-center justify-between gap-3 px-4 py-4 sm:px-6">
                <div className="flex min-w-0 items-center gap-3">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#A259FF]/10 text-[#B36DFF]"><Icon size={19} /></div>
                    <div className="min-w-0">
                        <h2 className="truncate text-base font-semibold text-white sm:text-lg">{title}</h2>
                        <p className="mt-1 truncate text-[11px] text-[#606068] sm:text-xs">{subtitle}</p>
                    </div>
                </div>
                <button type="button" onClick={() => navigate(path)} className="shrink-0 rounded-full px-3 py-1.5 text-[10px] font-semibold text-[#A259FF] transition hover:bg-[#A259FF]/10 hover:text-white sm:text-xs">View All <ArrowUpRight size={13} className="ml-1 inline" /></button>
            </div>
            <div className="border-t border-white/[0.06]">
                {loading ? <div className="flex min-h-[180px] items-center justify-center gap-3 text-sm text-[#777780]"><span className="h-4 w-4 animate-spin rounded-full border-2 border-white/10 border-t-[#A259FF]" /> Loading {title.toLowerCase()}...</div> : items.length ? items.slice(0, 4).map((item, index) => renderPanelRow(key, item, index)) : <div className="flex min-h-[180px] flex-col items-center justify-center px-5 text-center"><Icon size={25} className="text-[#55555D]" /><p className="mt-3 text-sm font-semibold text-white">No records found</p><p className="mt-1 text-xs text-[#66666E]">New records will appear here.</p></div>}
            </div>
        </motion.section>
    );

    const recentUsers = users.slice(0, 4);
    const recentPanels = [
        { key: "collections", title: "Recent Collections", subtitle: "Latest marketplace collections", items: collections, path: "/admin/collections", icon: FolderKanban },
        { key: "creators", title: "Recent Creators", subtitle: "Users creating NFTs", items: creators, path: "/admin/creators", icon: UserRound },
        { key: "listings", title: "Recent Listings", subtitle: "Latest published NFT listings", items: listings, path: "/admin/listings", icon: ShoppingBag },
        { key: "activities", title: "Recent Activity", subtitle: "Latest marketplace events", items: activities, path: "/admin/activity", icon: Activity }
    ];

    return (
        <div className="space-y-6 sm:space-y-8">
            <motion.section initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} className="group relative overflow-hidden rounded-[26px] bg-[#111114] shadow-[0_18px_55px_rgba(0,0,0,0.2)]">
                <div className="pointer-events-none absolute -left-20 -top-24 h-64 w-64 rounded-full bg-[#A259FF]/10 blur-3xl" />
                <div className="pointer-events-none absolute -bottom-24 right-0 h-64 w-64 rounded-full bg-[#4DA6FF]/[0.08] blur-3xl" />
                <div className="relative z-10 flex min-h-[150px] flex-col items-start justify-center gap-4 p-4 sm:flex-row sm:items-center sm:px-6 sm:py-6 lg:px-8">
                    <div className="flex h-[68px] w-[68px] shrink-0 items-center justify-center overflow-hidden rounded-[22px] bg-white/[0.035] ring-1 ring-white/[0.08] sm:h-[76px] sm:w-[76px]"><img src={logo} alt="Nifty Verse" className="h-full w-full object-contain p-2" /></div>
                    <div className="min-w-0 flex-1">
                        <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[#66666E] sm:text-xs">Admin Workspace</p>
                        <h2 className="mt-1 text-[clamp(1.7rem,3vw,2.7rem)] font-bold tracking-tight text-white">Welcome to <span className="bg-[linear-gradient(90deg,#C47BFF,#6DB8FF)] bg-clip-text text-transparent">Nifty Verse</span></h2>
                        <p className="mt-2 text-sm leading-6 text-[#77777F]">Manage your NFT marketplace, users, collections and marketplace activity.</p>
                    </div>
                    <button type="button" onClick={fetchDashboard} title="Refresh dashboard" className="ml-auto flex h-11 w-11 items-center justify-center rounded-xl border border-white/[0.08] bg-white/[0.03] text-[#777780] transition hover:text-[#B36DFF]"><RefreshCw size={18} /></button>
                </div>
            </motion.section>

            {error && <div className="flex flex-col gap-3 rounded-xl border border-red-500/20 bg-red-500/[0.06] px-4 py-3 text-sm text-red-300 sm:flex-row sm:items-center sm:justify-between"><span>Dashboard data error: {error}</span><button onClick={fetchDashboard} className="self-start rounded-lg bg-white/[0.06] px-3 py-1.5 text-xs text-white">Try Again</button></div>}

            <motion.section initial="hidden" animate="show" className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
                {dashboardStats.map((stat, index) => {
                    const Icon = stat.icon;
                    return <motion.div key={stat.title} initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.04 }} whileHover={{ y: -5 }} className="group relative min-w-0 overflow-hidden rounded-[24px] bg-[#111114] p-4 shadow-[0_15px_45px_rgba(0,0,0,0.16)] sm:p-5">
                        <div className="pointer-events-none absolute inset-x-0 top-0 h-32 bg-gradient-to-br from-violet-500/20 via-purple-500/5 to-transparent" />
                        <div className="relative z-10">
                            <div className="flex items-start justify-between gap-3">
                                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-violet-500/10 sm:h-12 sm:w-12"><Icon size={20} className="text-[#B36DFF]" /></div>
                                <span className="rounded-full bg-white/[0.04] px-2.5 py-1 text-[10px] font-bold text-[#8A8A93] sm:text-[11px]">{stat.live ? "Live data" : "Pending"}</span>
                            </div>
                            <p className="mt-6 text-xs text-[#7F7F87] sm:text-sm">{stat.title}</p>
                            <div className="mt-1 flex items-end justify-between gap-3"><h3 className="text-[clamp(1.6rem,2.8vw,2.2rem)] font-bold tracking-tight text-white">{loading ? "..." : typeof stat.value === "number" ? formatNumber(stat.value) : stat.value}</h3><ArrowUpRight size={18} className="mb-1 shrink-0 text-[#56565E] transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-[#A259FF]" /></div>
                            <div className="mt-4 h-px w-full bg-white/[0.06]" />
                            <div className="mt-3 flex items-center gap-2 text-[10px] text-[#55555D] sm:text-[11px]"><span className={`h-1.5 w-1.5 rounded-full ${stat.live ? "bg-[#A259FF]/70" : "bg-white/20"}`} />{stat.live ? "Fetched from database" : "Backend integration pending"}</div>
                        </div>
                    </motion.div>;
                })}
            </motion.section>

            <section className="grid grid-cols-1 gap-5 xl:grid-cols-2">
                <motion.section initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className={panelClass}>
                    <div className="flex items-center justify-between gap-3 px-4 py-4 sm:px-6"><div><h2 className="text-base font-semibold text-white sm:text-lg">Recent Users</h2><p className="mt-1 text-[11px] text-[#606068] sm:text-xs">Latest registered users</p></div><button onClick={() => navigate("/admin/users")} className="rounded-full px-3 py-1.5 text-xs font-semibold text-[#A259FF] hover:bg-[#A259FF]/10 hover:text-white">View All <ArrowUpRight size={13} className="ml-1 inline" /></button></div>
                    <div className="border-t border-white/[0.06]">
                        {loading ? <div className="flex min-h-[180px] items-center justify-center text-sm text-[#777780]">Loading users...</div> : recentUsers.length ? recentUsers.map((user, index) => <div key={user._id || user.email || index} className={rowClass}><div className="flex min-w-0 items-center gap-3"><div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-[#A259FF]/20 to-[#4DA6FF]/20 text-sm font-bold text-white">{getInitial(user.username)}</div><div className="min-w-0"><p className="truncate text-sm font-semibold text-white">{user.username || "Unnamed User"}</p><p className="truncate text-[11px] text-[#62626A] sm:text-xs">{user.email || "No email"}</p></div></div><span className="rounded-full bg-[#0ACF83]/[0.08] px-2.5 py-1 text-[10px] font-bold text-[#32D997]">Registered</span></div>) : <div className="flex min-h-[180px] items-center justify-center text-sm text-[#777780]">No registered users</div>}
                    </div>
                </motion.section>

                <motion.section initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className={panelClass}>
                    <div className="flex items-center justify-between gap-3 px-4 py-4 sm:px-6"><div><h2 className="text-base font-semibold text-white sm:text-lg">Recent NFTs</h2><p className="mt-1 text-[11px] text-[#606068] sm:text-xs">Latest marketplace NFTs</p></div><button onClick={() => navigate("/admin/nfts")} className="rounded-full px-3 py-1.5 text-xs font-semibold text-[#A259FF] hover:bg-[#A259FF]/10 hover:text-white">View All <ArrowUpRight size={13} className="ml-1 inline" /></button></div>
                    <div className="border-t border-white/[0.06]">
                        {loading ? <div className="flex min-h-[180px] items-center justify-center text-sm text-[#777780]">Loading NFTs...</div> : recentNFTs.length ? recentNFTs.slice(0, 4).map((nft, index) => <div key={nft._id || index} className={rowClass}><div className="flex min-w-0 items-center gap-3"><div className="flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-[#1A1A1E]">{nft.image ? <img src={nft.image} alt={nft.name || "NFT"} className="h-full w-full object-cover" onError={(e) => { e.currentTarget.style.display = "none"; }} /> : <Image size={18} className="text-[#66666E]" />}</div><div className="min-w-0"><p className="truncate text-sm font-semibold text-white">{nft.name || "Untitled NFT"}</p><p className="truncate text-[11px] text-[#62626A] sm:text-xs">By {nft.creator || "Unknown Creator"}</p><p className="mt-1 text-[10px] text-[#85858D]">{nft.status === "draft" ? "Draft" : nft.isListed ? "Listed" : "Published"}</p></div></div><div className="shrink-0 text-right"><p className="text-[10px] text-[#595961]">Price</p><p className="mt-1 text-sm font-semibold text-white">{formatNumber(nft.price)} ETH</p></div></div>) : <div className="flex min-h-[180px] items-center justify-center text-sm text-[#777780]">No NFTs found</div>}
                    </div>
                </motion.section>
            </section>

            <section className="grid grid-cols-1 gap-5 xl:grid-cols-2">
                {recentPanels.map(renderPanel)}
            </section>
        </div>
    );
};

export default AdminDashboard;
