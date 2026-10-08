// import React, { useState } from "react";
// import { AnimatePresence, motion } from "framer-motion";
// import { NavLink, Outlet, useLocation, useNavigate } from "react-router-dom";
// import {
//   LayoutDashboard,
//   Users,
//   Image,
//   FolderKanban,
//   UserRound,
//   ShoppingBag,
//   Gavel,
//   HandCoins,
//   ReceiptText,
//   Flag,
//   Tags,
//   Star,
//   Settings,
//   LogOut,
//   Menu,
//   Search,
//   X,
//   Bell,
//   ChevronRight,
// } from "lucide-react";
// import logo from "../../assets/logo/logo.png";
// import "../admin.css";

// const menuItems = [
//   {
//     label: "Dashboard",
//     path: "/admin/dashboard",
//     icon: LayoutDashboard,
//   },
//   {
//     label: "Users",
//     path: "/admin/users",
//     icon: Users,
//   },
//   {
//     label: "NFTs",
//     path: "/admin/nfts",
//     icon: Image,
//   },
//   {
//     label: "Collections",
//     path: "/admin/collections",
//     icon: FolderKanban,
//   },
//   {
//     label: "Creators",
//     path: "/admin/creators",
//     icon: UserRound,
//   },
//   {
//     label: "Listings",
//     path: "/admin/listings",
//     icon: ShoppingBag,
//   },
//   {
//     label: "Auctions",
//     path: "/admin/auctions",
//     icon: Gavel,
//   },
//   {
//     label: "Bids",
//     path: "/admin/bids",
//     icon: HandCoins,
//   },
//   {
//     label: "Transactions",
//     path: "/admin/transactions",
//     icon: ReceiptText,
//   },
//   {
//     label: "Reports",
//     path: "/admin/reports",
//     icon: Flag,
//   },
//   {
//     label: "Categories",
//     path: "/admin/categories",
//     icon: Tags,
//   },
//   {
//     label: "Featured",
//     path: "/admin/featured",
//     icon: Star,
//   },
//   {
//     label: "Settings",
//     path: "/admin/settings",
//     icon: Settings,
//   },
// ];

// const pageVariants = {
//   initial: {
//     opacity: 0,
//     y: 12,
//   },
//   animate: {
//     opacity: 1,
//     y: 0,
//     transition: {
//       duration: 0.4,
//       ease: "easeOut",
//     },
//   },
//   exit: {
//     opacity: 0,
//     y: -8,
//     transition: {
//       duration: 0.2,
//       ease: "easeIn",
//     },
//   },
// };

// const mobileSidebarVariants = {
//   hidden: {
//     x: -290,
//   },
//   visible: {
//     x: 0,
//     transition: {
//       duration: 0.35,
//       ease: [0.22, 1, 0.36, 1],
//     },
//   },
//   exit: {
//     x: -290,
//     transition: {
//       duration: 0.25,
//       ease: [0.4, 0, 1, 1],
//     },
//   },
// };

// const AdminLayout = () => {
//   const navigate = useNavigate();
//   const location = useLocation();
//   const [mobileOpen, setMobileOpen] = useState(false);

//   const handleLogout = () => {
//     localStorage.removeItem("adminToken");
//     localStorage.removeItem("admin");
//     navigate("/admin/login");
//   };

//   const closeMobileMenu = () => {
//     setMobileOpen(false);
//   };

//   return (
//     <div className="admin-shell h-screen overflow-hidden bg-[#08080A] text-white">
//       {/* =========================
//           TOP HEADER
//       ========================== */}
//       <header className="fixed left-0 right-0 top-0 z-50 h-[84px] border-b border-white/[0.08] bg-[#0D0D10]/95 shadow-[0_10px_40px_rgba(0,0,0,0.18)] backdrop-blur-xl">
//         <div className="flex h-full w-full">
//           {/* BRAND AREA */}
//           <div className="flex w-[270px] shrink-0 items-center border-r border-white/[0.08] px-5">
//             <button
//               type="button"
//               onClick={() => setMobileOpen(true)}
//               className="mr-3 flex h-10 w-10 items-center justify-center rounded-xl border border-white/[0.08] bg-white/[0.03] text-[#8A8A92] transition-all duration-300 hover:border-[#A259FF]/30 hover:bg-[#A259FF]/10 hover:text-white lg:hidden"
//             >
//               <Menu size={20} />
//             </button>

//             <NavLink
//               to="/admin/dashboard"
//               className="group flex min-w-0 items-center"
//             >
//               <div className="relative flex h-[62px] w-[205px] items-center overflow-hidden">
//                 <img
//                   src={logo}
//                   alt="Nifty Verse"
//                   className="h-full w-full object-contain object-left"
//                 />
//               </div>
//             </NavLink>
//           </div>

//           {/* HEADER RIGHT */}
//           <div className="flex min-w-0 flex-1 items-center gap-4 px-5 sm:px-7 lg:px-9">
//             {/* SEARCH */}
//             <div className="flex min-w-0 flex-1 justify-center">
//               <div className="flex h-[46px] w-full max-w-[700px] items-center gap-3 rounded-2xl border border-white/[0.08] bg-white/[0.035] px-4 transition-all duration-300 focus-within:border-[#A259FF]/30 focus-within:bg-white/[0.05] focus-within:shadow-[0_0_30px_rgba(162,89,255,0.08)]">
//                 <Search
//                   size={19}
//                   strokeWidth={1.8}
//                   className="shrink-0 text-[#66666E]"
//                 />

//                 <input
//                   type="text"
//                   placeholder="Search users, NFTs, collections..."
//                   className="w-full bg-transparent text-sm text-white outline-none placeholder:text-[#5D5D65]"
//                 />

//                 <span className="hidden shrink-0 rounded-lg border border-white/[0.08] px-2 py-1 text-[10px] text-[#5D5D65] xl:block">
//                   Ctrl K
//                 </span>
//               </div>
//             </div>

//             {/* NOTIFICATION */}
//             <button
//               type="button"
//               className="relative flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border border-white/[0.08] bg-white/[0.035] text-[#888890] transition-all duration-300 hover:border-[#A259FF]/20 hover:bg-[#A259FF]/10 hover:text-white"
//             >
//               <Bell
//                 size={18}
//                 strokeWidth={1.8}
//               />

//               <span className="absolute right-[9px] top-[8px] h-1.5 w-1.5 rounded-full bg-[#A259FF] shadow-[0_0_10px_rgba(162,89,255,0.95)]" />
//             </button>

//             {/* PROFILE */}
//             <motion.button
//               type="button"
//               whileHover={{
//                 scale: 1.04,
//               }}
//               whileTap={{
//                 scale: 0.97,
//               }}
//               className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-[linear-gradient(135deg,#A259FF,#4DA6FF)] text-sm font-bold text-white shadow-[0_8px_30px_rgba(112,82,255,0.22)]"
//             >
//               A
//             </motion.button>
//           </div>
//         </div>
//       </header>

//       {/* =========================
//           DESKTOP SIDEBAR
//       ========================== */}
//       <aside className="admin-sidebar fixed bottom-0 left-0 top-[84px] z-40 hidden w-[270px] border-r border-white/[0.08] bg-[#0C0C0F] lg:block">
//         <div className="flex h-full flex-col">
//           <nav className="admin-scrollbar flex-1 overflow-y-auto px-3 py-6">
//             <p className="mb-3 px-3 text-[10px] font-bold uppercase tracking-[0.2em] text-[#56565E]">
//               Management
//             </p>

//             <div className="space-y-1.5">
//               {menuItems.map((item) => {
//                 const Icon = item.icon;

//                 return (
//                   <NavLink
//                     key={item.path}
//                     to={item.path}
//                     className={({ isActive }) =>
//                       `group relative flex items-center gap-3 rounded-2xl px-3 py-2.5 text-[14px] font-medium transition-all duration-300 ${
//                         isActive
//                           ? "bg-[#A259FF]/[0.12] text-white shadow-[inset_0_0_0_1px_rgba(162,89,255,0.12)]"
//                           : "text-[#85858D] hover:bg-white/[0.035] hover:text-white"
//                       }`
//                     }
//                   >
//                     {({ isActive }) => (
//                       <>
//                         {isActive && (
//                           <motion.div
//                             layoutId="admin-active-line"
//                             className="absolute bottom-2 left-0 top-2 w-[3px] rounded-r-full bg-[linear-gradient(180deg,#A259FF,#55B7FF)] shadow-[0_0_12px_rgba(162,89,255,0.65)]"
//                             transition={{
//                               type: "spring",
//                               stiffness: 450,
//                               damping: 35,
//                             }}
//                           />
//                         )}

//                         <motion.span
//                           whileHover={{
//                             scale: 1.06,
//                           }}
//                           className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl transition-all duration-300 ${
//                             isActive
//                               ? "bg-[#A259FF]/[0.11] text-[#B872FF]"
//                               : "text-[#67676F] group-hover:bg-white/[0.045] group-hover:text-white"
//                           }`}
//                         >
//                           <Icon
//                             size={18}
//                             strokeWidth={1.8}
//                           />
//                         </motion.span>

//                         <span className="truncate">
//                           {item.label}
//                         </span>

//                         {isActive && (
//                           <ChevronRight
//                             size={15}
//                             strokeWidth={1.8}
//                             className="ml-auto text-[#9D62E9]"
//                           />
//                         )}
//                       </>
//                     )}
//                   </NavLink>
//                 );
//               })}
//             </div>
//           </nav>

//           {/* LOGOUT */}
//           <div className="border-t border-white/[0.08] p-3">
//             <button
//               type="button"
//               onClick={handleLogout}
//               className="group flex w-full items-center gap-3 rounded-2xl border border-transparent px-3 py-2.5 text-[14px] font-medium text-[#8A8A92] transition-all duration-300 hover:border-red-400/10 hover:bg-red-500/[0.07] hover:text-red-300"
//             >
//               <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-red-500/[0.06] text-red-400 transition-all duration-300 group-hover:bg-red-500/[0.13]">
//                 <LogOut
//                   size={18}
//                   strokeWidth={1.8}
//                 />
//               </span>

//               <span>
//                 Logout
//               </span>

//               <ChevronRight
//                 size={15}
//                 className="ml-auto opacity-0 transition duration-300 group-hover:translate-x-0.5 group-hover:opacity-70"
//               />
//             </button>
//           </div>
//         </div>
//       </aside>

//       {/* =========================
//           MOBILE SIDEBAR
//       ========================== */}
//       <AnimatePresence>
//         {mobileOpen && (
//           <>
//             <motion.div
//               initial={{
//                 opacity: 0,
//               }}
//               animate={{
//                 opacity: 1,
//               }}
//               exit={{
//                 opacity: 0,
//               }}
//               onClick={closeMobileMenu}
//               className="fixed inset-0 z-[60] bg-black/70 backdrop-blur-sm lg:hidden"
//             />

//             <motion.aside
//               variants={mobileSidebarVariants}
//               initial="hidden"
//               animate="visible"
//               exit="exit"
//               className="fixed bottom-0 left-0 top-[84px] z-[70] w-[285px] border-r border-white/[0.08] bg-[#0D0D10] lg:hidden"
//             >
//               <div className="flex h-full flex-col">
//                 <div className="flex items-center justify-between border-b border-white/[0.08] px-4 py-4">
//                   <p className="text-sm font-semibold">
//                     Menu
//                   </p>

//                   <button
//                     type="button"
//                     onClick={closeMobileMenu}
//                     className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/[0.04] text-[#85858D] transition hover:bg-white/[0.08] hover:text-white"
//                   >
//                     <X size={18} />
//                   </button>
//                 </div>

//                 <nav className="admin-scrollbar flex-1 overflow-y-auto px-3 py-5">
//                   <div className="space-y-1.5">
//                     {menuItems.map((item) => {
//                       const Icon = item.icon;

//                       return (
//                         <NavLink
//                           key={item.path}
//                           to={item.path}
//                           onClick={closeMobileMenu}
//                           className={({ isActive }) =>
//                             `flex items-center gap-3 rounded-2xl px-3 py-2.5 text-sm transition-all duration-300 ${
//                               isActive
//                                 ? "bg-[#A259FF]/[0.12] text-white"
//                                 : "text-[#85858D] hover:bg-white/[0.035] hover:text-white"
//                             }`
//                           }
//                         >
//                           {({ isActive }) => (
//                             <>
//                               <span
//                                 className={`flex h-9 w-9 items-center justify-center rounded-xl ${
//                                   isActive
//                                     ? "bg-[#A259FF]/[0.11] text-[#B872FF]"
//                                     : "text-[#67676F]"
//                                 }`}
//                               >
//                                 <Icon
//                                   size={18}
//                                   strokeWidth={1.8}
//                                 />
//                               </span>

//                               <span>
//                                 {item.label}
//                               </span>
//                             </>
//                           )}
//                         </NavLink>
//                       );
//                     })}
//                   </div>
//                 </nav>

//                 <div className="border-t border-white/[0.08] p-3">
//                   <button
//                     type="button"
//                     onClick={handleLogout}
//                     className="flex w-full items-center gap-3 rounded-2xl px-3 py-2.5 text-sm text-[#8A8A92] transition hover:bg-red-500/[0.07] hover:text-red-300"
//                   >
//                     <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-red-500/[0.06] text-red-400">
//                       <LogOut
//                         size={18}
//                         strokeWidth={1.8}
//                       />
//                     </span>

//                     Logout
//                   </button>
//                 </div>
//               </div>
//             </motion.aside>
//           </>
//         )}
//       </AnimatePresence>

//       {/* =========================
//           MAIN CONTENT
//       ========================== */}
//       <div className="flex h-screen w-full flex-col pt-[84px] lg:pl-[270px]">
//         <div className="admin-content-scroll flex-1 overflow-y-auto">
//           <main className="min-h-full p-5 sm:p-7 lg:p-8">
//             <AnimatePresence mode="wait">
//               <motion.div
//                 key={location.pathname}
//                 variants={pageVariants}
//                 initial="initial"
//                 animate="animate"
//                 exit="exit"
//                 className="min-h-full"
//               >
//                 <Outlet />
//               </motion.div>
//             </AnimatePresence>
//           </main>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AdminLayout;






import React, { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { NavLink, Outlet, useLocation, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  Users,
  Image,
  FolderKanban,
  UserRound,
  ShoppingBag,
  Gavel,
  HandCoins,
  ReceiptText,
  Flag,
  Tags,
  Star,
  Settings,
  LogOut,
  Menu,
  Bell,
  ChevronRight,
  MoreHorizontal,
} from "lucide-react";
import logo from "../../assets/logo/logo.png";
import "../admin.css";

const menuItems = [
  {
    label: "Dashboard",
    path: "/admin/dashboard",
    icon: LayoutDashboard,
  },
  {
    label: "Users",
    path: "/admin/users",
    icon: Users,
  },
  {
    label: "NFTs",
    path: "/admin/nfts",
    icon: Image,
  },
  {
    label: "Collections",
    path: "/admin/collections",
    icon: FolderKanban,
  },
  {
    label: "Creators",
    path: "/admin/creators",
    icon: UserRound,
  },
  {
    label: "Listings",
    path: "/admin/listings",
    icon: ShoppingBag,
  },
  {
    label: "Auctions",
    path: "/admin/auctions",
    icon: Gavel,
  },
  {
    label: "Bids",
    path: "/admin/bids",
    icon: HandCoins,
  },
  {
    label: "Transactions",
    path: "/admin/transactions",
    icon: ReceiptText,
  },
  {
    label: "Reports",
    path: "/admin/reports",
    icon: Flag,
  },
  {
    label: "Categories",
    path: "/admin/categories",
    icon: Tags,
  },
  {
    label: "Featured",
    path: "/admin/featured",
    icon: Star,
  },
  {
    label: "Settings",
    path: "/admin/settings",
    icon: Settings,
  },
];

const mobileNavItems = [
  {
    label: "Dashboard",
    path: "/admin/dashboard",
    icon: LayoutDashboard,
  },
  {
    label: "Users",
    path: "/admin/users",
    icon: Users,
  },
  {
    label: "NFTs",
    path: "/admin/nfts",
    icon: Image,
  },
  {
    label: "Collections",
    path: "/admin/collections",
    icon: FolderKanban,
  },
];

const pageVariants = {
  initial: {
    opacity: 0,
    y: 10,
  },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.35,
      ease: "easeOut",
    },
  },
  exit: {
    opacity: 0,
    y: -6,
    transition: {
      duration: 0.2,
      ease: "easeIn",
    },
  },
};

const mobileSidebarVariants = {
  hidden: {
    x: "-100%",
  },
  visible: {
    x: 0,
    transition: {
      duration: 0.35,
      ease: [0.22, 1, 0.36, 1],
    },
  },
  exit: {
    x: "-100%",
    transition: {
      duration: 0.25,
      ease: [0.4, 0, 1, 1],
    },
  },
};

const AdminLayout = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    const handleEscape = (event) => {
      if (event.key === "Escape") {
        setMobileOpen(false);
      }
    };

    window.addEventListener("keydown", handleEscape);

    return () => {
      window.removeEventListener("keydown", handleEscape);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    localStorage.removeItem("admin");
    navigate("/admin/login");
  };

  const toggleSidebar = () => {
    setSidebarCollapsed((prev) => !prev);
  };

  const toggleMobileMenu = () => {
    setMobileOpen((prev) => !prev);
  };

  const closeMobileMenu = () => {
    setMobileOpen(false);
  };

  return (
    <div className="admin-shell h-screen overflow-hidden bg-[#08080A] text-white">
      {/* ==================================================
          HEADER
      ================================================== */}
      <header className="fixed left-0 right-0 top-0 z-[100] h-[78px] border-b border-white/[0.09] bg-[#0C0C0F]/95 shadow-[0_8px_35px_rgba(0,0,0,0.18)] backdrop-blur-xl">
        <div className="flex h-full w-full items-center justify-between">
          {/* LOGO AREA */}
          <div className="admin-header-brand flex h-full min-w-0 flex-1 items-center gap-2.5 px-3 sm:gap-3 sm:px-4 lg:w-[270px] lg:flex-none lg:px-5">
            {/* DESKTOP HAMBURGER */}
            <motion.button
              type="button"
              onClick={toggleSidebar}
              whileHover={{
                scale: 1.04,
              }}
              whileTap={{
                scale: 0.96,
              }}
              className="hidden h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-[#A259FF]/30 bg-[#A259FF]/[0.06] text-[#A7A7AF] transition-all duration-300 hover:border-[#A259FF]/60 hover:bg-[#A259FF]/[0.13] hover:text-white lg:flex"
              aria-label="Toggle sidebar"
            >
              <Menu
                size={18}
                strokeWidth={1.9}
              />
            </motion.button>

            <NavLink
              to="/admin/dashboard"
              className="admin-logo-link group flex min-w-0 items-center"
            >
              <div className="admin-logo-wrap relative flex h-[46px] w-[clamp(92px,26vw,205px)] max-w-[205px] items-center overflow-hidden sm:h-[52px] lg:h-[56px] lg:w-[205px]">
                <img
                  src={logo}
                  alt="Nifty Verse"
                  className="admin-logo-image h-full w-full object-contain object-left transition-transform duration-300 group-hover:scale-[1.02]"
                />
              </div>
            </NavLink>
          </div>

          {/* HEADER ACTIONS */}
          <div className="admin-header-actions flex shrink-0 items-center gap-2 px-3 sm:gap-3 sm:px-4 lg:gap-4 lg:px-8">
            {/* NOTIFICATION */}
            <motion.button
              type="button"
              whileHover={{
                scale: 1.04,
              }}
              whileTap={{
                scale: 0.96,
              }}
              className="admin-header-action-button relative flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-white/[0.08] bg-white/[0.025] text-[#85858D] transition-all duration-300 hover:border-[#A259FF]/25 hover:bg-[#A259FF]/10 hover:text-white sm:h-11 sm:w-11 sm:rounded-2xl"
              aria-label="Notifications"
            >
              <Bell
                size={18}
                strokeWidth={1.8}
              />

              <span className="absolute right-[7px] top-[7px] h-1.5 w-1.5 rounded-full bg-[#A259FF] shadow-[0_0_9px_rgba(162,89,255,0.95)]" />
            </motion.button>

            {/* PROFILE */}
            <motion.button
              type="button"
              whileHover={{
                scale: 1.04,
              }}
              whileTap={{
                scale: 0.97,
              }}
              className="admin-header-action-button flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[linear-gradient(135deg,#A259FF,#5EA8FF)] text-sm font-bold text-white shadow-[0_8px_25px_rgba(112,82,255,0.2)] sm:h-11 sm:w-11 sm:rounded-2xl"
              aria-label="Admin profile"
            >
              A
            </motion.button>
          </div>
        </div>
      </header>

      {/* ==================================================
          DESKTOP SIDEBAR
      ================================================== */}
      <AnimatePresence initial={false}>
        {!sidebarCollapsed && (
          <motion.aside
            initial={{
              x: -20,
              opacity: 0,
            }}
            animate={{
              x: 0,
              opacity: 1,
            }}
            exit={{
              x: -20,
              opacity: 0,
            }}
            transition={{
              duration: 0.28,
              ease: "easeOut",
            }}
            className="admin-sidebar fixed bottom-0 left-0 top-[78px] z-40 hidden border-r border-white/[0.09] bg-[#0C0C0F] lg:block"
          >
            <div className="flex h-full w-full flex-col">
              <nav className="admin-scrollbar flex-1 overflow-y-auto px-3 py-6">
                {/* <p className="mb-3 px-3 text-[10px] font-bold uppercase tracking-[0.2em] text-[#56565E]">
                  Management
                </p> */}

                <div className="space-y-1.5">
                  {menuItems.map((item) => {
                    const Icon = item.icon;

                    return (
                      <NavLink
                        key={item.path}
                        to={item.path}
                        className={({ isActive }) =>
                          `group relative flex items-center gap-3 rounded-2xl px-3 py-2.5 text-[14px] font-bold transition-all duration-300 ${
                            isActive
                              ? "bg-[#A259FF]/[0.12] text-white shadow-[inset_0_0_0_1px_rgba(162,89,255,0.13)]"
                              : "text-[#898991] hover:bg-white/[0.035] hover:text-white"
                          }`
                        }
                      >
                        {({ isActive }) => (
                          <>
                            {isActive && (
                              <motion.div
                                layoutId="admin-active-line"
                                className="absolute bottom-2 left-0 top-2 w-[3px] rounded-r-full bg-[linear-gradient(180deg,#A259FF,#55B7FF)] shadow-[0_0_12px_rgba(162,89,255,0.65)]"
                                transition={{
                                  type: "spring",
                                  stiffness: 450,
                                  damping: 35,
                                }}
                              />
                            )}

                            <motion.span
                              whileHover={{
                                scale: 1.06,
                              }}
                              className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl transition-all duration-300 ${
                                isActive
                                  ? "bg-[#A259FF]/[0.11] text-[#B872FF]"
                                  : "text-[#67676F] group-hover:bg-white/[0.045] group-hover:text-white"
                              }`}
                            >
                              <Icon
                                size={18}
                                strokeWidth={1.8}
                              />
                            </motion.span>

                            <span className="truncate">
                              {item.label}
                            </span>

                            {isActive && (
                              <ChevronRight
                                size={15}
                                strokeWidth={1.8}
                                className="ml-auto text-[#A96AFF]"
                              />
                            )}
                          </>
                        )}
                      </NavLink>
                    );
                  })}
                </div>
              </nav>

              {/* LOGOUT */}
              <div className="border-t border-white/[0.09] p-3">
                <button
                  type="button"
                  onClick={handleLogout}
                  className="group flex w-full items-center gap-3 rounded-2xl border border-transparent px-3 py-2.5 text-[14px] font-bold text-[#8A8A92] transition-all duration-300 hover:border-red-400/10 hover:bg-red-500/[0.07] hover:text-red-300"
                >
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-red-500/[0.06] text-red-400 transition-all duration-300 group-hover:bg-red-500/[0.13]">
                    <LogOut
                      size={18}
                      strokeWidth={1.8}
                    />
                  </span>

                  <span>
                    Logout
                  </span>

                  <ChevronRight
                    size={15}
                    className="ml-auto opacity-0 transition duration-300 group-hover:translate-x-0.5 group-hover:opacity-70"
                  />
                </button>
              </div>
            </div>
          </motion.aside>
        )}
      </AnimatePresence>

      {/* ==================================================
          MOBILE / TABLET OVERLAY
      ================================================== */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{
              opacity: 0,
            }}
            animate={{
              opacity: 1,
            }}
            exit={{
              opacity: 0,
            }}
            onClick={closeMobileMenu}
            className="fixed bottom-0 left-0 right-0 top-[78px] z-[70] bg-black/70 backdrop-blur-[2px] lg:hidden"
          />
        )}
      </AnimatePresence>

      {/* ==================================================
          MOBILE / TABLET SIDEBAR
      ================================================== */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.aside
            variants={mobileSidebarVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="admin-mobile-sidebar fixed top-[78px] z-[80] border-r border-white/[0.09] bg-[#0D0D10] lg:hidden"
          >
            <div className="flex h-full w-full flex-col">
              {/* <div className="border-b border-white/[0.08] px-5 py-5">
                <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#5E5E67]">
                  Management
                </p>

                <h3 className="mt-1 text-xl font-bold">
                  Navigation
                </h3>
              </div> */}

              <nav className="admin-scrollbar flex-1 overflow-y-auto px-3 py-5">
                <div className="space-y-1.5">
                  {menuItems.map((item) => {
                    const Icon = item.icon;

                    return (
                      <NavLink
                        key={item.path}
                        to={item.path}
                        onClick={closeMobileMenu}
                        className={({ isActive }) =>
                          `group relative flex items-center gap-3 rounded-2xl px-3 py-2.5 text-[14px] font-bold transition-all duration-300 ${
                            isActive
                              ? "bg-[#A259FF]/[0.12] text-white"
                              : "text-[#85858D] hover:bg-white/[0.035] hover:text-white"
                          }`
                        }
                      >
                        {({ isActive }) => (
                          <>
                            {isActive && (
                              <div className="absolute bottom-2 left-0 top-2 w-[3px] rounded-r-full bg-[linear-gradient(180deg,#A259FF,#55B7FF)] shadow-[0_0_10px_rgba(162,89,255,0.6)]" />
                            )}

                            <span
                              className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl transition-all duration-300 ${
                                isActive
                                  ? "bg-[#A259FF]/[0.11] text-[#B872FF]"
                                  : "text-[#67676F] group-hover:bg-white/[0.045] group-hover:text-white"
                              }`}
                            >
                              <Icon
                                size={18}
                                strokeWidth={1.8}
                              />
                            </span>

                            <span className="truncate">
                              {item.label}
                            </span>

                            {isActive && (
                              <ChevronRight
                                size={15}
                                className="ml-auto text-[#A96AFF]"
                              />
                            )}
                          </>
                        )}
                      </NavLink>
                    );
                  })}
                </div>
              </nav>

              {/* MOBILE LOGOUT */}
              <div className="border-t border-white/[0.09] p-3">
                <button
                  type="button"
                  onClick={handleLogout}
                  className="group flex w-full min-w-0 items-center gap-3 rounded-2xl px-2.5 py-2.5 text-[14px] font-bold text-[#8A8A92] transition-all duration-300 hover:bg-red-500/[0.07] hover:text-red-300 sm:px-3"
                >
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-red-500/[0.06] text-red-400 transition-all duration-300 group-hover:bg-red-500/[0.13]">
                    <LogOut
                      size={18}
                      strokeWidth={1.8}
                    />
                  </span>

                  <span className="min-w-0 truncate">
                    Logout
                  </span>
                </button>
              </div>
            </div>
          </motion.aside>
        )}
      </AnimatePresence>

      {/* ==================================================
          MAIN CONTENT
      ================================================== */}
      <div
        className={`flex h-screen w-full flex-col pt-[78px] transition-[padding] duration-300 ease-out ${
          sidebarCollapsed ? "lg:pl-0" : "lg:pl-[270px]"
        }`}
      >
        <div className="admin-content-scroll flex-1 overflow-y-auto">
          <main className="admin-page-shell mx-auto min-h-full w-full pb-[108px] pt-4 sm:pb-[112px] sm:pt-6 lg:pb-8 lg:pt-8">
            <AnimatePresence mode="wait">
              <motion.div
                key={location.pathname}
                variants={pageVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                className="min-h-full min-w-0"
              >
                <Outlet />
              </motion.div>
            </AnimatePresence>
          </main>
        </div>
      </div>

      {/* ==================================================
          MOBILE / TABLET BOTTOM NAVIGATION
      ================================================== */}
      <AnimatePresence>
        {!mobileOpen && (
          <motion.nav
            initial={{
              y: 90,
              opacity: 0,
            }}
            animate={{
              y: 0,
              opacity: 1,
            }}
            exit={{
              y: 90,
              opacity: 0,
            }}
            transition={{
              duration: 0.3,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="admin-bottom-nav fixed bottom-3 z-[110] rounded-[24px] border border-white/[0.1] bg-[#0B0B0E]/95 p-1.5 shadow-[0_14px_45px_rgba(0,0,0,0.45)] backdrop-blur-2xl lg:hidden"
          >
            <div className="flex min-h-[66px] items-center justify-between gap-0.5">
              {mobileNavItems.map((item) => {
                const Icon = item.icon;

                return (
                  <NavLink
                    key={item.path}
                    to={item.path}
                    onClick={closeMobileMenu}
                    className="group flex min-w-0 flex-1 items-center justify-center"
                  >
                    {({ isActive }) => (
                      <div
                        className={`flex min-h-[58px] w-full flex-col items-center justify-center gap-1 rounded-[19px] px-1 transition-all duration-300 ${
                          isActive
                            ? "bg-[#A259FF]/[0.14] text-[#B872FF]"
                            : "text-[#66666E] hover:bg-white/[0.035] hover:text-white"
                        }`}
                      >
                        <motion.span
                          animate={{
                            scale: isActive ? 1.03 : 1,
                          }}
                          className="flex h-8 w-10 items-center justify-center"
                        >
                          <Icon
                            size={20}
                            strokeWidth={isActive ? 2 : 1.8}
                          />
                        </motion.span>

                        <span
                          className={`max-w-full truncate text-[9px] font-bold sm:text-[10px] ${
                            isActive
                              ? "text-[#B872FF]"
                              : "text-[#66666E] group-hover:text-white"
                          }`}
                        >
                          {item.label}
                        </span>
                      </div>
                    )}
                  </NavLink>
                );
              })}

              <button
                type="button"
                onClick={toggleMobileMenu}
                className="group flex min-w-0 flex-1 items-center justify-center text-[#66666E] transition-colors duration-300 hover:text-white"
                aria-label="Open navigation"
              >
                <div className="flex min-h-[58px] w-full flex-col items-center justify-center gap-1 rounded-[19px] px-1 transition-all duration-300 hover:bg-white/[0.035]">
                  <span className="flex h-8 w-10 items-center justify-center">
                    <MoreHorizontal
                      size={21}
                      strokeWidth={1.8}
                    />
                  </span>

                  <span className="text-[9px] font-bold sm:text-[10px]">
                    More
                  </span>
                </div>
              </button>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AdminLayout;