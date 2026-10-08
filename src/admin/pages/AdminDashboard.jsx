// import React from "react";
// import { motion } from "framer-motion";
// import {
//   Users,
//   Image,
//   FolderKanban,
//   ShoppingBag,
//   Gavel,
//   ReceiptText,
//   UserRound,
//   Activity,
//   ArrowUpRight,
// } from "lucide-react";

// const stats = [
//   {
//     title: "Total Users",
//     value: "1,248",
//     change: "+12.5%",
//     icon: Users,
    // accent: "from-violet-500/20 via-purple-500/5 to-transparent",
    // iconBg: "bg-violet-500/10",
//   },
//   {
//     title: "Total NFTs",
//     value: "4,892",
//     change: "+8.2%",
//     icon: Image,
//     accent: "from-blue-500/20 via-cyan-500/5 to-transparent",
//     iconBg: "bg-blue-500/10",
//   },
//   {
//     title: "Collections",
//     value: "328",
//     change: "+5.4%",
//     icon: FolderKanban,
//     accent: "from-fuchsia-500/20 via-purple-500/5 to-transparent",
//     iconBg: "bg-fuchsia-500/10",
//   },
//   {
//     title: "Creators",
//     value: "684",
//     change: "+9.1%",
//     icon: UserRound,
//     accent: "from-sky-500/20 via-blue-500/5 to-transparent",
//     iconBg: "bg-sky-500/10",
//   },
//   {
//     title: "Listings",
//     value: "1,426",
//     change: "+6.8%",
//     icon: ShoppingBag,
//     accent: "from-purple-500/20 via-violet-500/5 to-transparent",
//     iconBg: "bg-purple-500/10",
//   },
//   {
//     title: "Active Auctions",
//     value: "184",
//     change: "+4.7%",
//     icon: Gavel,
//     accent: "from-indigo-500/20 via-blue-500/5 to-transparent",
//     iconBg: "bg-indigo-500/10",
//   },
//   {
//     title: "Transactions",
//     value: "7,842",
//     change: "+14.3%",
//     icon: ReceiptText,
//     accent: "from-cyan-500/20 via-blue-500/5 to-transparent",
//     iconBg: "bg-cyan-500/10",
//   },
//   {
//     title: "Activity",
//     value: "12,486",
//     change: "+11.2%",
//     icon: Activity,
//     accent: "from-violet-500/20 via-blue-500/5 to-transparent",
//     iconBg: "bg-violet-500/10",
//   },
// ];

// const recentUsers = [
//   {
//     name: "Alex Morgan",
//     email: "alex@example.com",
//     status: "Active",
//   },
//   {
//     name: "Sarah Wilson",
//     email: "sarah@example.com",
//     status: "Active",
//   },
//   {
//     name: "James Carter",
//     email: "james@example.com",
//     status: "Pending",
//   },
//   {
//     name: "Emma Brown",
//     email: "emma@example.com",
//     status: "Active",
//   },
// ];

// const recentNFTs = [
//   {
//     name: "Magic Mushroom 0325",
//     creator: "Shroomie",
//     price: "1.63 ETH",
//     image: "/assets/nft1-CdhE1ozM.png",
//   },
//   {
//     name: "Happy Robot 032",
//     creator: "BeKind2Robots",
//     price: "1.63 ETH",
//     image: "/assets/nft2-2_hFpNgE.png",
//   },
//   {
//     name: "Designer Bear",
//     creator: "MrFox",
//     price: "1.63 ETH",
//     image: "/assets/nft4-CXFbP8dE.png",
//   },
//   {
//     name: "Colorful Dog 0356",
//     creator: "Keepitreal",
//     price: "1.63 ETH",
//     image: "/assets/nft5-CPVWmZvq.png",
//   },
// ];

// const containerVariants = {
//   hidden: {},
//   show: {
//     transition: {
//       staggerChildren: 0.06,
//     },
//   },
// };

// const cardVariants = {
//   hidden: {
//     opacity: 0,
//     y: 18,
//   },
//   show: {
//     opacity: 1,
//     y: 0,
//     transition: {
//       duration: 0.45,
//       ease: "easeOut",
//     },
//   },
// };

// const AdminDashboard = () => {
//   return (
//     <div className="space-y-8">
//       <motion.section
//         initial={{
//           opacity: 0,
//           y: 12,
//         }}
//         animate={{
//           opacity: 1,
//           y: 0,
//         }}
//         transition={{
//           duration: 0.45,
//         }}
//       >
//         <p className="text-sm font-medium text-[#85858D]">
//           Overview
//         </p>

//         <h1 className="mt-1 text-3xl font-bold tracking-tight sm:text-4xl">
//           Dashboard
//         </h1>

//         <p className="mt-2 max-w-[760px] text-sm leading-6 text-[#707078]">
//           Monitor users, NFTs, collections, marketplace activity,
//           auctions and transactions from one place.
//         </p>
//       </motion.section>

    //   <motion.section
    //     variants={containerVariants}
    //     initial="hidden"
    //     animate="show"
    //     className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4"
    //   >
    //     {stats.map((stat) => {
    //       const Icon = stat.icon;

    //       return (
    //         <motion.div
    //           key={stat.title}
    //           variants={cardVariants}
    //           whileHover={{
    //             y: -5,
    //           }}
    //           transition={{
    //             type: "spring",
    //             stiffness: 280,
    //             damping: 24,
    //           }}
    //           className="group relative overflow-hidden rounded-[24px] bg-[#111114] p-5 shadow-[0_15px_45px_rgba(0,0,0,0.16)]"
    //         >
    //           <div
    //             className={`pointer-events-none absolute inset-x-0 top-0 h-32 bg-gradient-to-br ${stat.accent} opacity-80 transition duration-500 group-hover:opacity-100`}
    //           />

    //           <div className="pointer-events-none absolute -right-10 -top-12 h-32 w-32 rounded-full bg-[#A259FF]/[0.04] blur-3xl transition duration-500 group-hover:bg-[#A259FF]/[0.09]" />

    //           <div className="relative z-10">
    //             <div className="flex items-start justify-between">
    //               <motion.div
    //                 whileHover={{
    //                   scale: 1.08,
    //                   rotate: 2,
    //                 }}
    //                 className={`flex h-12 w-12 items-center justify-center rounded-2xl ${stat.iconBg}`}
    //               >
    //                 <Icon
    //                   size={21}
    //                   strokeWidth={1.8}
    //                   className="text-[#B36DFF]"
    //                 />
    //               </motion.div>

    //               <span className="rounded-full bg-[#0ACF83]/[0.08] px-2.5 py-1 text-[11px] font-bold text-[#32D997]">
    //                 {stat.change}
    //               </span>
    //             </div>

    //             <p className="mt-7 text-sm text-[#7F7F87]">
    //               {stat.title}
    //             </p>

    //             <div className="mt-1 flex items-end justify-between">
    //               <h3 className="text-3xl font-bold tracking-tight text-white">
    //                 {stat.value}
    //               </h3>

    //               <ArrowUpRight
    //                 size={18}
    //                 strokeWidth={1.8}
    //                 className="mb-1 text-[#56565E] transition duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-[#A259FF]"
    //               />
    //             </div>

    //             <div className="mt-5 h-px w-full bg-white/[0.06]" />

    //             <div className="mt-3 flex items-center gap-2 text-[11px] text-[#55555D]">
    //               <span className="h-1.5 w-1.5 rounded-full bg-[#A259FF]/70" />
    //               Compared to last month
    //             </div>
    //           </div>
    //         </motion.div>
    //       );
    //     })}
    //   </motion.section>

//       <section className="grid grid-cols-1 gap-5 xl:grid-cols-2">
//         <motion.div
//           initial={{
//             opacity: 0,
//             y: 20,
//           }}
//           animate={{
//             opacity: 1,
//             y: 0,
//           }}
//           transition={{
//             delay: 0.2,
//             duration: 0.45,
//           }}
//           className="overflow-hidden rounded-[26px] bg-[#111114] shadow-[0_15px_50px_rgba(0,0,0,0.15)]"
//         >
//           <div className="flex items-center justify-between px-5 py-5 sm:px-6">
//             <div>
//               <h2 className="text-lg font-semibold">
//                 Recent Users
//               </h2>

//               <p className="mt-1 text-xs text-[#606068]">
//                 Latest registered users
//               </p>
//             </div>

//             <button
//               type="button"
//               className="rounded-full px-3 py-1.5 text-xs font-semibold text-[#A259FF] transition duration-300 hover:bg-[#A259FF]/[0.08] hover:text-white"
//             >
//               View All
//             </button>
//           </div>

//           <div className="border-t border-white/[0.06]">
//             {recentUsers.map((user, index) => (
//               <motion.div
//                 key={user.email}
//                 initial={{
//                   opacity: 0,
//                   x: -10,
//                 }}
//                 animate={{
//                   opacity: 1,
//                   x: 0,
//                 }}
//                 transition={{
//                   delay: 0.25 + index * 0.06,
//                   duration: 0.35,
//                 }}
//                 className="group flex items-center justify-between gap-4 border-b border-white/[0.05] px-5 py-4 last:border-b-0 sm:px-6"
//               >
//                 <div className="flex min-w-0 items-center gap-3">
//                   <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white/[0.05] text-sm font-bold text-[#B06EFF] transition duration-300 group-hover:bg-[#A259FF]/10">
//                     {user.name.charAt(0)}
//                   </div>

//                   <div className="min-w-0">
//                     <p className="truncate text-sm font-semibold text-white">
//                       {user.name}
//                     </p>

//                     <p className="truncate text-xs text-[#62626A]">
//                       {user.email}
//                     </p>
//                   </div>
//                 </div>

//                 <span
//                   className={`shrink-0 rounded-full px-2.5 py-1 text-[10px] font-bold ${
//                     user.status === "Active"
//                       ? "bg-[#0ACF83]/[0.08] text-[#32D997]"
//                       : "bg-yellow-500/[0.08] text-yellow-400"
//                   }`}
//                 >
//                   {user.status}
//                 </span>
//               </motion.div>
//             ))}
//           </div>
//         </motion.div>

//         <motion.div
//           initial={{
//             opacity: 0,
//             y: 20,
//           }}
//           animate={{
//             opacity: 1,
//             y: 0,
//           }}
//           transition={{
//             delay: 0.28,
//             duration: 0.45,
//           }}
//           className="overflow-hidden rounded-[26px] bg-[#111114] shadow-[0_15px_50px_rgba(0,0,0,0.15)]"
//         >
//           <div className="flex items-center justify-between px-5 py-5 sm:px-6">
//             <div>
//               <h2 className="text-lg font-semibold">
//                 Recent NFTs
//               </h2>

//               <p className="mt-1 text-xs text-[#606068]">
//                 Latest marketplace NFTs
//               </p>
//             </div>

//             <button
//               type="button"
//               className="rounded-full px-3 py-1.5 text-xs font-semibold text-[#A259FF] transition duration-300 hover:bg-[#A259FF]/[0.08] hover:text-white"
//             >
//               View All
//             </button>
//           </div>

//           <div className="border-t border-white/[0.06]">
//             {recentNFTs.map((nft, index) => (
//               <motion.div
//                 key={nft.name}
//                 initial={{
//                   opacity: 0,
//                   x: 10,
//                 }}
//                 animate={{
//                   opacity: 1,
//                   x: 0,
//                 }}
//                 transition={{
//                   delay: 0.3 + index * 0.06,
//                   duration: 0.35,
//                 }}
//                 className="group flex items-center justify-between gap-4 border-b border-white/[0.05] px-5 py-4 last:border-b-0 sm:px-6"
//               >
//                 <div className="flex min-w-0 items-center gap-3">
//                   <div className="h-11 w-11 shrink-0 overflow-hidden rounded-xl bg-[#1B1B1F]">
//                     <img
//                       src={nft.image}
//                       alt={nft.name}
//                       className="h-full w-full object-cover transition duration-500 group-hover:scale-110"
//                     />
//                   </div>

//                   <div className="min-w-0">
//                     <p className="truncate text-sm font-semibold text-white">
//                       {nft.name}
//                     </p>

//                     <p className="truncate text-xs text-[#62626A]">
//                       By {nft.creator}
//                     </p>
//                   </div>
//                 </div>

//                 <div className="shrink-0 text-right">
//                   <p className="text-[10px] text-[#595961]">
//                     Price
//                   </p>

//                   <p className="mt-1 text-sm font-semibold text-white">
//                     {nft.price}
//                   </p>
//                 </div>
//               </motion.div>
//             ))}
//           </div>
//         </motion.div>
//       </section>
//     </div>
//   );
// };

// export default AdminDashboard;






import React from "react";
import { motion } from "framer-motion";
import {
  Users,
  Image,
  FolderKanban,
  ShoppingBag,
  Gavel,
  ReceiptText,
  UserRound,
  Activity,
  ArrowUpRight,
} from "lucide-react";

import logo from "../../assets/logo/logo.png";
import nft1 from "../../assets/images/marketplace/nft1.png";
import nft2 from "../../assets/images/marketplace/nft2.png";
import nft4 from "../../assets/images/marketplace/nft4.png";
import nft5 from "../../assets/images/marketplace/nft5.png";

import avatar1 from "../../assets/images/avatars/avatar1.png";
import avatar2 from "../../assets/images/avatars/avatar2.png";
import avatar3 from "../../assets/images/avatars/avatar3.png";
import avatar4 from "../../assets/images/avatars/avatar4.png";

const stats = [
  {
    title: "Total Users",
    value: "1,248",
    change: "+12.5%",
    icon: Users,
    accent: "from-violet-500/20 via-purple-500/5 to-transparent",
    iconBg: "bg-violet-500/10",
  },
  {
    title: "Total NFTs",
    value: "4,892",
    change: "+8.2%",
    icon: Image,
    accent: "from-violet-500/20 via-purple-500/5 to-transparent",
    iconBg: "bg-violet-500/10",
  },
  {
    title: "Collections",
    value: "328",
    change: "+5.4%",
    icon: FolderKanban,
    accent: "from-violet-500/20 via-purple-500/5 to-transparent",
    iconBg: "bg-violet-500/10",
  },
  {
    title: "Creators",
    value: "684",
    change: "+9.1%",
    icon: UserRound,
    accent: "from-violet-500/20 via-purple-500/5 to-transparent",
    iconBg: "bg-violet-500/10",
  },
  {
    title: "Listings",
    value: "1,426",
    change: "+6.8%",
    icon: ShoppingBag,
    accent: "from-violet-500/20 via-purple-500/5 to-transparent",
    iconBg: "bg-violet-500/10",
  },
  {
    title: "Active Auctions",
    value: "184",
    change: "+4.7%",
    icon: Gavel,
    accent: "from-violet-500/20 via-purple-500/5 to-transparent",
    iconBg: "bg-violet-500/10",
  },
  {
    title: "Transactions",
    value: "7,842",
    change: "+14.3%",
    icon: ReceiptText,
    accent: "from-violet-500/20 via-purple-500/5 to-transparent",
    iconBg: "bg-violet-500/10",
  },
  {
    title: "Activity",
    value: "12,486",
    change: "+11.2%",
    icon: Activity,
    accent: "from-violet-500/20 via-purple-500/5 to-transparent",
    iconBg: "bg-violet-500/10",
  },
];

const recentUsers = [
  {
    name: "Alex Morgan",
    email: "alex@example.com",
    status: "Active",
    avatar: avatar1,
  },
  {
    name: "Sarah Wilson",
    email: "sarah@example.com",
    status: "Active",
    avatar: avatar2,
  },
  {
    name: "James Carter",
    email: "james@example.com",
    status: "Pending",
    avatar: avatar3,
  },
  {
    name: "Emma Brown",
    email: "emma@example.com",
    status: "Active",
    avatar: avatar4,
  },
];

const recentNFTs = [
  {
    name: "Magic Mushroom 0325",
    creator: "Shroomie",
    price: "1.63 ETH",
    image: nft1,
    avatar: avatar1,
  },
  {
    name: "Happy Robot 032",
    creator: "BeKind2Robots",
    price: "1.63 ETH",
    image: nft2,
    avatar: avatar2,
  },
  {
    name: "Designer Bear",
    creator: "MrFox",
    price: "1.63 ETH",
    image: nft4,
    avatar: avatar3,
  },
  {
    name: "Colorful Dog 0356",
    creator: "Keepitreal",
    price: "1.63 ETH",
    image: nft5,
    avatar: avatar4,
  },
];

const containerVariants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.06,
    },
  },
};

const cardVariants = {
  hidden: {
    opacity: 0,
    y: 18,
  },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.45,
      ease: "easeOut",
    },
  },
};

const AdminDashboard = () => {
  return (
    <div className="space-y-6 sm:space-y-8">
      <motion.section
        initial={{
          opacity: 0,
          y: 18,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        transition={{
          duration: 0.5,
          ease: "easeOut",
        }}
        whileHover={{
          y: -3,
        }}
        className="group relative overflow-hidden rounded-[26px] bg-[#111114] shadow-[0_18px_55px_rgba(0,0,0,0.2)]"
      >
        <div className="pointer-events-none absolute -left-20 -top-24 h-64 w-64 rounded-full bg-[#A259FF]/10 blur-3xl transition duration-500 group-hover:bg-[#A259FF]/16" />

        <div className="pointer-events-none absolute -bottom-24 right-0 h-64 w-64 rounded-full bg-[#4DA6FF]/8 blur-3xl transition duration-500 group-hover:bg-[#4DA6FF]/14" />

        <div className="relative z-10 flex min-h-[150px] flex-col items-start justify-center gap-4 p-4 sm:flex-row sm:items-center sm:gap-5 sm:px-6 sm:py-6 lg:px-8">
          <div className="flex h-[68px] w-[68px] shrink-0 items-center justify-center overflow-hidden rounded-[22px] bg-white/[0.035] ring-1 ring-white/[0.08] shadow-[0_0_35px_rgba(162,89,255,0.08)] sm:h-[76px] sm:w-[76px]">
            <img
              src={logo}
              alt="Nifty Verse"
              className="h-full w-full object-contain p-2"
            />
          </div>

          <div className="min-w-0 flex-1">
            <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[#66666E] sm:text-xs">
              Admin Workspace
            </p>

            <h2 className="mt-1 text-[clamp(1.7rem,3vw,2.7rem)] font-bold tracking-tight">
              Welcome to{" "}
              <span className="bg-[linear-gradient(90deg,#C47BFF,#6DB8FF)] bg-clip-text text-transparent">
                Nifty Verse
              </span>
            </h2>

            <p className="mt-2 max-w-[760px] text-sm leading-6 text-[#77777F]">
              Manage your NFT marketplace, users, collections and marketplace activity.
            </p>
          </div>

          <div className="ml-auto hidden h-12 w-12 items-center justify-center rounded-2xl border border-white/[0.08] bg-white/[0.03] text-[#66666E] transition duration-300 group-hover:border-[#A259FF]/20 group-hover:text-[#B978FF] sm:flex">
            <ArrowUpRight
              size={20}
              strokeWidth={1.7}
            />
          </div>
        </div>
      </motion.section>

      <motion.section
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4"
      >
        {stats.map((stat) => {
          const Icon = stat.icon;

          return (
            <motion.div
              key={stat.title}
              variants={cardVariants}
              whileHover={{
                y: -5,
              }}
              transition={{
                type: "spring",
                stiffness: 280,
                damping: 24,
              }}
              className="group relative h-full min-w-0 overflow-hidden rounded-[24px] bg-[#111114] p-4 shadow-[0_15px_45px_rgba(0,0,0,0.16)] sm:p-5"
            >
              <div
                className={`pointer-events-none absolute inset-x-0 top-0 h-32 bg-gradient-to-br ${stat.accent} opacity-80 transition duration-500 group-hover:opacity-100`}
              />

              <div className="pointer-events-none absolute -right-10 -top-12 h-32 w-32 rounded-full bg-[#A259FF]/[0.04] blur-3xl transition duration-500 group-hover:bg-[#A259FF]/[0.09]" />

              <div className="relative z-10">
                <div className="flex items-start justify-between gap-3">
                  <motion.div
                    whileHover={{
                      scale: 1.08,
                      rotate: 2,
                    }}
                    className={`flex h-11 w-11 items-center justify-center rounded-2xl sm:h-12 sm:w-12 ${stat.iconBg}`}
                  >
                    <Icon
                      size={20}
                      strokeWidth={1.8}
                      className="text-[#B36DFF]"
                    />
                  </motion.div>

                  <span className="rounded-full bg-[#0ACF83]/[0.08] px-2.5 py-1 text-[10px] font-bold text-[#32D997] sm:text-[11px]">
                    {stat.change}
                  </span>
                </div>

                <p className="mt-6 text-xs text-[#7F7F87] sm:text-sm">
                  {stat.title}
                </p>

                <div className="mt-1 flex items-end justify-between gap-3">
                  <h3 className="text-[clamp(1.6rem,2.8vw,2.2rem)] font-bold tracking-tight text-white">
                    {stat.value}
                  </h3>

                  <ArrowUpRight
                    size={18}
                    strokeWidth={1.8}
                    className="mb-1 shrink-0 text-[#56565E] transition duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-[#A259FF]"
                  />
                </div>

                <div className="mt-4 h-px w-full bg-white/[0.06]" />

                <div className="mt-3 flex items-center gap-2 text-[10px] text-[#55555D] sm:text-[11px]">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#A259FF]/70" />
                  Compared to last month
                </div>
              </div>
            </motion.div>
          );
        })}
      </motion.section>

      <section className="grid grid-cols-1 gap-5 xl:grid-cols-2">
        <motion.div
          initial={{
            opacity: 0,
            y: 20,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          whileHover={{
            y: -6,
            scale: 1.02,
          }}
          transition={{
            delay: 0.18,
            duration: 0.45,
          }}
          className="group relative min-w-0 cursor-pointer overflow-hidden rounded-[26px] bg-[#111114] shadow-[0_15px_50px_rgba(0,0,0,0.15)]"
        >
          <span className="pointer-events-none absolute left-0 top-0 z-20 h-full w-[2px] bg-gradient-to-b from-transparent via-[#A259FF] to-transparent opacity-0 blur-[1px] transition-opacity duration-300 group-hover:opacity-100" />
          <span className="pointer-events-none absolute right-0 top-0 z-20 h-full w-[2px] bg-gradient-to-b from-transparent via-[#A259FF] to-transparent opacity-0 blur-[1px] transition-opacity duration-300 group-hover:opacity-100" />

          <div className="flex items-center justify-between gap-3 px-4 py-4 sm:px-6">
            <div className="min-w-0">
              <h2 className="text-base font-semibold sm:text-lg">
                Recent Users
              </h2>

              <p className="mt-1 text-[11px] text-[#606068] sm:text-xs">
                Latest registered users
              </p>
            </div>

            <button
              type="button"
              className="shrink-0 rounded-full px-3 py-1.5 text-[10px] font-semibold text-[#A259FF] transition duration-300 hover:bg-[#A259FF]/[0.08] hover:text-white sm:text-xs"
            >
              View All
            </button>
          </div>

          <div className="border-t border-white/[0.06]">
            {recentUsers.map((user, index) => (
              <motion.div
                key={user.email}
                initial={{
                  opacity: 0,
                  x: -10,
                }}
                animate={{
                  opacity: 1,
                  x: 0,
                }}
                whileHover={{
                  y: -3,
                  scale: 1.01,
                }}
                transition={{
                  delay: 0.25 + index * 0.06,
                  duration: 0.35,
                }}
                className="group/row flex min-w-0 cursor-pointer items-center justify-between gap-3 rounded-[12px] border-b border-white/[0.05] px-4 py-4 transition-colors duration-300 hover:bg-white/[0.025] last:border-b-0 sm:px-6"
              >
                <div className="flex min-w-0 items-center gap-3">
                  <img
                    src={user.avatar}
                    alt={user.name}
                    className="h-10 w-10 shrink-0 rounded-full object-cover ring-1 ring-white/[0.07] transition-all duration-300 group-hover/row:ring-[#A259FF]/30 group-hover/row:scale-105"
                  />

                  <div className="min-w-0">
                    <p className="truncate text-sm font-semibold">
                      {user.name}
                    </p>

                    <p className="truncate text-[11px] text-[#62626A] sm:text-xs">
                      {user.email}
                    </p>
                  </div>
                </div>

                <span
                  className={`shrink-0 rounded-full px-2.5 py-1 text-[10px] font-bold ${
                    user.status === "Active"
                      ? "bg-[#0ACF83]/[0.08] text-[#32D997]"
                      : "bg-yellow-500/[0.08] text-yellow-400"
                  }`}
                >
                  {user.status}
                </span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{
            opacity: 0,
            y: 20,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          whileHover={{
            y: -6,
            scale: 1.02,
          }}
          transition={{
            delay: 0.18,
            duration: 0.45,
          }}
          className="group relative min-w-0 cursor-pointer overflow-hidden rounded-[26px] bg-[#111114] shadow-[0_15px_50px_rgba(0,0,0,0.15)]"
        >
          <span className="pointer-events-none absolute left-0 top-0 z-20 h-full w-[2px] bg-gradient-to-b from-transparent via-[#A259FF] to-transparent opacity-0 blur-[1px] transition-opacity duration-300 group-hover:opacity-100" />
          <span className="pointer-events-none absolute right-0 top-0 z-20 h-full w-[2px] bg-gradient-to-b from-transparent via-[#A259FF] to-transparent opacity-0 blur-[1px] transition-opacity duration-300 group-hover:opacity-100" />

          <div className="flex items-center justify-between gap-3 px-4 py-4 sm:px-6">
            <div className="min-w-0">
              <h2 className="text-base font-semibold sm:text-lg">
                Recent NFTs
              </h2>

              <p className="mt-1 text-[11px] text-[#606068] sm:text-xs">
                Latest marketplace NFTs
              </p>
            </div>

            <button
              type="button"
              className="shrink-0 rounded-full px-3 py-1.5 text-[10px] font-semibold text-[#A259FF] transition duration-300 hover:bg-[#A259FF]/[0.08] hover:text-white sm:text-xs"
            >
              View All
            </button>
          </div>

          <div className="border-t border-white/[0.06]">
            {recentNFTs.map((nft, index) => (
              <motion.div
                key={nft.name}
                initial={{
                  opacity: 0,
                  x: -10,
                }}
                animate={{
                  opacity: 1,
                  x: 0,
                }}
                whileHover={{
                  y: -3,
                  scale: 1.01,
                }}
                transition={{
                  delay: 0.25 + index * 0.06,
                  duration: 0.35,
                }}
                className="group/nft flex min-w-0 cursor-pointer items-center justify-between gap-3 rounded-[12px] border-b border-white/[0.05] px-4 py-4 transition-colors duration-300 hover:bg-white/[0.025] last:border-b-0 sm:px-6"
              >
                <div className="flex min-w-0 items-center gap-3">
                  <div className="h-12 w-12 shrink-0 overflow-hidden rounded-xl bg-[#1A1A1E]">
                    <img
                      src={nft.image}
                      alt={nft.name}
                      className="h-full w-full object-cover transition duration-500 group-hover/nft:scale-110"
                    />
                  </div>

                  <div className="flex min-w-0 items-center gap-2.5">
                    <img
                      src={nft.avatar}
                      alt={nft.creator}
                      className="h-7 w-7 shrink-0 rounded-full object-cover ring-1 ring-white/[0.07] transition-all duration-300 group-hover/nft:ring-[#A259FF]/30 group-hover/nft:scale-105"
                    />

                    <div className="min-w-0">
                      <p className="truncate text-sm font-semibold">
                        {nft.name}
                      </p>

                      <p className="truncate text-[11px] text-[#62626A] sm:text-xs">
                        By {nft.creator}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="shrink-0 text-right">
                  <p className="text-[10px] text-[#595961]">
                    Price
                  </p>

                  <p className="mt-1 text-sm font-semibold">
                    {nft.price}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>
    </div>
  );
};

export default AdminDashboard;