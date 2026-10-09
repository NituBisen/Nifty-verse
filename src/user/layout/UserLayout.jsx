// import React, { useEffect, useState } from "react";
// import { AnimatePresence, motion } from "framer-motion";
// import { NavLink, Outlet, useLocation, useNavigate } from "react-router-dom";
// import {
//   Activity,
//   Bell,
//   ChevronRight,
//   Heart,
//   Image,
//   Layers,
//   LayoutDashboard,
//   LogOut,
//   Menu,
//   MoreHorizontal,
//   UserRound,
//   WalletCards,
//   X,
// } from "lucide-react";
// import logo from "../../assets/logo/logo.png";
// import "../../admin/admin.css";

// const API_URL =
//   import.meta.env.VITE_API_URL ||
//   "https://nifty-verse-backend-production.up.railway.app";

// const userMenuItems = [
//   {
//     label: "Dashboard",
//     path: "/user/dashboard",
//     icon: LayoutDashboard,
//   },
//   {
//     label: "NFTs",
//     path: "/user/nfts",
//     icon: Image,
//   },
//   {
//     label: "Collections",
//     path: "/user/collections",
//     icon: Layers,
//   },
//   {
//     label: "Favorites",
//     path: "/user/favorites",
//     icon: Heart,
//   },
//   {
//     label: "Activity",
//     path: "/user/activity",
//     icon: Activity,
//   },
//   {
//     label: "Notifications",
//     path: "/user/notifications",
//     icon: Bell,
//   },
//   {
//     label: "Profile",
//     path: "/user/profile",
//     icon: UserRound,
//   },
//   {
//     label: "Wallet",
//     path: "/user/wallet",
//     icon: WalletCards,
//   },
// ];

// const mobileNavItems = [
//   {
//     label: "Dashboard",
//     path: "/user/dashboard",
//     icon: LayoutDashboard,
//   },
//   {
//     label: "NFTs",
//     path: "/user/nfts",
//     icon: Image,
//   },
//   {
//     label: "Collections",
//     path: "/user/collections",
//     icon: Layers,
//   },
//   {
//     label: "Favorites",
//     path: "/user/favorites",
//     icon: Heart,
//   },
// ];

// const pageVariants = {
//   initial: {
//     opacity: 0,
//     y: 10,
//   },
//   animate: {
//     opacity: 1,
//     y: 0,
//     transition: {
//       duration: 0.35,
//       ease: "easeOut",
//     },
//   },
//   exit: {
//     opacity: 0,
//     y: -6,
//     transition: {
//       duration: 0.2,
//       ease: "easeIn",
//     },
//   },
// };

// const mobileSidebarVariants = {
//   hidden: {
//     x: "-100%",
//   },
//   visible: {
//     x: 0,
//     transition: {
//       duration: 0.35,
//       ease: [0.22, 1, 0.36, 1],
//     },
//   },
//   exit: {
//     x: "-100%",
//     transition: {
//       duration: 0.25,
//       ease: [0.4, 0, 1, 1],
//     },
//   },
// };

// const UserLayout = () => {
//   const navigate = useNavigate();
//   const location = useLocation();

// const [authLoading, setAuthLoading] = useState(true);
// const [authError, setAuthError] = useState("");

//   const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
//   const [mobileOpen, setMobileOpen] = useState(false);
//   const [userProfile, setUserProfile] = useState({
//     initials: "U",
//     image: "",
//   });

//   useEffect(() => {
//     setMobileOpen(false);
//   }, [location.pathname]);

//   useEffect(() => {
//     const handleEscape = (event) => {
//       if (event.key === "Escape") {
//         setMobileOpen(false);
//       }
//     };

//     window.addEventListener("keydown", handleEscape);

//     return () => {
//       window.removeEventListener("keydown", handleEscape);
//     };
//   }, []);

//   useEffect(() => {
//     try {
//       const savedUser = localStorage.getItem("user");
//       const user = savedUser ? JSON.parse(savedUser) : null;

//       const name =
//         user?.name ||
//         user?.fullName ||
//         user?.username ||
//         user?.email?.split("@")[0] ||
//         "User";

//       const initials = String(name)
//         .trim()
//         .split(/\s+/)
//         .filter(Boolean)
//         .slice(0, 2)
//         .map((part) => part.charAt(0).toUpperCase())
//         .join("");

//       setUserProfile({
//         initials: initials || "U",
//         image: user?.profileImage || user?.avatar || user?.image || "",
//       });
//     } catch (error) {
//       console.error("Unable to load user profile:", error);

//       setUserProfile({
//         initials: "U",
//         image: "",
//       });
//     }
//   }, [location.pathname]);

//   useEffect(() => {
//   let isMounted = true;

//   const verifySession = async () => {
//     const token = localStorage.getItem("token");

//     if (!token) {
//       navigate("/signin", {
//         replace: true,
//       });

//       if (isMounted) {
//         setAuthLoading(false);
//       }

//       return;
//     }

//     try {
//       const response = await fetch(
//         `${API_URL}/api/auth/me`,
//         {
//           method: "GET",
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );

//       const data = await response.json().catch(() => ({}));

//       if (response.status === 401) {
//         localStorage.removeItem("token");
//         localStorage.removeItem("user");

//         navigate("/signin", {
//           replace: true,
//         });

//         return;
//       }

//       if (!response.ok || !data.success || !data.user) {
//         if (isMounted) {
//           setAuthError(
//             data.message || "Unable to verify your session."
//           );
//         }

//         return;
//       }

//       localStorage.setItem(
//         "user",
//         JSON.stringify(data.user)
//       );

//       setAuthError("");
//     } catch (error) {
//       console.error(
//         "Session verification error:",
//         error
//       );

//       if (isMounted) {
//         setAuthError(
//           "Unable to connect to the server. Please check your backend."
//         );
//       }
//     } finally {
//       if (isMounted) {
//         setAuthLoading(false);
//       }
//     }
//   };

//   verifySession();

//   return () => {
//     isMounted = false;
//   };
// }, [navigate]);
//   const handleLogout = () => {
//     localStorage.removeItem("token");
//     localStorage.removeItem("user");

//     setMobileOpen(false);

//     navigate("/signin", {
//       replace: true,
//     });
//   };

//   const toggleSidebar = () => {
//     setSidebarCollapsed((previous) => !previous);
//   };

//   const toggleMobileMenu = () => {
//     setMobileOpen((previous) => !previous);
//   };

//   const closeMobileMenu = () => {
//     setMobileOpen(false);
//   };

//   const openNotifications = () => {
//     navigate("/user/notifications");
//   };

//   const openProfile = () => {
//     navigate("/user/profile");
//   };

//   if (authLoading) {
//   return (
//     <div className="flex min-h-screen items-center justify-center bg-[#08080A] text-white">
//       <div className="flex items-center gap-3 text-sm text-[#A7A7AF]">
//         <span className="h-5 w-5 animate-spin rounded-full border-2 border-[#A259FF]/30 border-t-[#A259FF]" />
//         Verifying your session...
//       </div>
//     </div>
//   );
// }

// if (authError) {
//   return (
//     <div className="flex min-h-screen items-center justify-center bg-[#08080A] px-5 text-white">
//       <section className="w-full max-w-md rounded-[26px] border border-white/[0.08] bg-[#111114] p-6 text-center sm:p-8">
//         <h2 className="text-xl font-bold text-white">
//           Session Verification Failed
//         </h2>

//         <p className="mt-3 text-sm leading-6 text-[#85858D]">
//           {authError}
//         </p>

//         <button
//           type="button"
//           onClick={() => window.location.reload()}
//           className="mt-6 w-full rounded-xl bg-[#A259FF] px-5 py-3 text-sm font-bold text-white transition hover:bg-[#8E45E8]"
//         >
//           Retry Verification
//         </button>
//       </section>
//     </div>
//   );
// }

//   return (
//     <div className="admin-shell h-screen overflow-hidden bg-[#08080A] text-white">
//       {/* =========================
//           HEADER
//       ========================== */}

//       <header className="fixed left-0 right-0 top-0 z-[100] h-[78px] border-b border-white/[0.09] bg-[#0C0C0F]/95 shadow-[0_8px_35px_rgba(0,0,0,0.18)] backdrop-blur-xl">
//         <div className="flex h-full w-full items-center justify-between">
//           {/* LOGO AREA */}

//           <div className="admin-header-brand flex h-full min-w-0 flex-1 items-center gap-2.5 px-3 sm:gap-3 sm:px-4 lg:w-[270px] lg:flex-none lg:px-5">
//             <motion.button
//               type="button"
//               onClick={toggleSidebar}
//               whileHover={{
//                 scale: 1.04,
//               }}
//               whileTap={{
//                 scale: 0.96,
//               }}
//               className="hidden h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-[#A259FF]/30 bg-[#A259FF]/[0.06] text-[#A7A7AF] transition-all duration-300 hover:border-[#A259FF]/60 hover:bg-[#A259FF]/[0.13] hover:text-white lg:flex"
//               aria-label="Toggle sidebar"
//             >
//               <Menu size={18} strokeWidth={1.9} />
//             </motion.button>

//             <NavLink
//               to="/user/dashboard"
//               className="admin-logo-link group flex min-w-0 items-center"
//               aria-label="User dashboard"
//             >
//               <div className="admin-logo-wrap relative flex h-[46px] w-[clamp(92px,26vw,205px)] max-w-[205px] items-center overflow-hidden sm:h-[52px] lg:h-[56px] lg:w-[205px]">
//                 <img
//                   src={logo}
//                   alt="Nifty Verse"
//                   className="admin-logo-image h-full w-full object-contain object-left transition-transform duration-300 group-hover:scale-[1.02]"
//                 />
//               </div>
//             </NavLink>
//           </div>

//           {/* HEADER ACTIONS */}

//           <div className="admin-header-actions flex shrink-0 items-center gap-2 px-3 sm:gap-3 sm:px-4 lg:gap-4 lg:px-8">
//             <motion.button
//               type="button"
//               onClick={openNotifications}
//               whileHover={{
//                 scale: 1.04,
//               }}
//               whileTap={{
//                 scale: 0.96,
//               }}
//               className="admin-header-action-button relative flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-white/[0.08] bg-white/[0.025] text-[#85858D] transition-all duration-300 hover:border-[#A259FF]/25 hover:bg-[#A259FF]/10 hover:text-white sm:h-11 sm:w-11 sm:rounded-2xl"
//               aria-label="Open notifications"
//               title="Notifications"
//             >
//               <Bell size={18} strokeWidth={1.8} />

//               <span className="absolute right-[7px] top-[7px] h-1.5 w-1.5 rounded-full bg-[#A259FF] shadow-[0_0_9px_rgba(162,89,255,0.95)]" />
//             </motion.button>

//             <motion.button
//               type="button"
//               onClick={openProfile}
//               whileHover={{
//                 scale: 1.04,
//               }}
//               whileTap={{
//                 scale: 0.97,
//               }}
//               className="admin-header-action-button flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-[linear-gradient(135deg,#A259FF,#5EA8FF)] text-sm font-bold text-white shadow-[0_8px_25px_rgba(112,82,255,0.2)] sm:h-11 sm:w-11 sm:rounded-2xl"
//               aria-label="Open user profile"
//               title="My Profile"
//             >
//               {userProfile.image ? (
//                 <img
//                   src={userProfile.image}
//                   alt="User profile"
//                   className="h-full w-full object-cover"
//                 />
//               ) : (
//                 userProfile.initials
//               )}
//             </motion.button>
//           </div>
//         </div>
//       </header>

//       {/* =========================
//           DESKTOP SIDEBAR
//       ========================== */}

//       <AnimatePresence initial={false}>
//         {!sidebarCollapsed && (
//           <motion.aside
//             initial={{
//               x: -20,
//               opacity: 0,
//             }}
//             animate={{
//               x: 0,
//               opacity: 1,
//             }}
//             exit={{
//               x: -20,
//               opacity: 0,
//             }}
//             transition={{
//               duration: 0.28,
//               ease: "easeOut",
//             }}
//             className="admin-sidebar fixed bottom-0 left-0 top-[78px] z-40 hidden border-r border-white/[0.09] bg-[#0C0C0F] lg:block"
//           >
//             <div className="flex h-full w-full flex-col">
//               <nav className="admin-scrollbar flex-1 overflow-y-auto px-3 py-6">
//                 <div className="space-y-1.5">
//                   {userMenuItems.map((item) => {
//                     const Icon = item.icon;

//                     return (
//                       <NavLink
//                         key={item.path}
//                         to={item.path}
//                         className={({ isActive }) =>
//                           `group relative flex items-center gap-3 rounded-2xl px-3 py-2.5 text-[14px] font-bold transition-all duration-300 ${
//                             isActive
//                               ? "bg-[#A259FF]/[0.12] text-white shadow-[inset_0_0_0_1px_rgba(162,89,255,0.13)]"
//                               : "text-[#898991] hover:bg-white/[0.035] hover:text-white"
//                           }`
//                         }
//                       >
//                         {({ isActive }) => (
//                           <>
//                             {isActive && (
//                               <motion.div
//                                 layoutId="user-active-line"
//                                 className="absolute bottom-2 left-0 top-2 w-[3px] rounded-r-full bg-[linear-gradient(180deg,#A259FF,#55B7FF)] shadow-[0_0_12px_rgba(162,89,255,0.65)]"
//                                 transition={{
//                                   type: "spring",
//                                   stiffness: 450,
//                                   damping: 35,
//                                 }}
//                               />
//                             )}

//                             <motion.span
//                               whileHover={{
//                                 scale: 1.06,
//                               }}
//                               className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl transition-all duration-300 ${
//                                 isActive
//                                   ? "bg-[#A259FF]/[0.11] text-[#B872FF]"
//                                   : "text-[#67676F] group-hover:bg-white/[0.045] group-hover:text-white"
//                               }`}
//                             >
//                               <Icon size={18} strokeWidth={1.8} />
//                             </motion.span>

//                             <span className="truncate">
//                               {item.label}
//                             </span>

//                             {isActive && (
//                               <ChevronRight
//                                 size={15}
//                                 strokeWidth={1.8}
//                                 className="ml-auto text-[#A96AFF]"
//                               />
//                             )}
//                           </>
//                         )}
//                       </NavLink>
//                     );
//                   })}
//                 </div>
//               </nav>

//               {/* LOGOUT */}

//               <div className="border-t border-white/[0.09] p-3">
//                 <button
//                   type="button"
//                   onClick={handleLogout}
//                   className="group flex w-full items-center gap-3 rounded-2xl border border-transparent px-3 py-2.5 text-[14px] font-bold text-[#8A8A92] transition-all duration-300 hover:border-red-400/10 hover:bg-red-500/[0.07] hover:text-red-300"
//                 >
//                   <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-red-500/[0.06] text-red-400 transition-all duration-300 group-hover:bg-red-500/[0.13]">
//                     <LogOut size={18} strokeWidth={1.8} />
//                   </span>

//                   <span>
//                     Logout
//                   </span>

//                   <ChevronRight
//                     size={15}
//                     className="ml-auto opacity-0 transition duration-300 group-hover:translate-x-0.5 group-hover:opacity-70"
//                   />
//                 </button>
//               </div>
//             </div>
//           </motion.aside>
//         )}
//       </AnimatePresence>

//       {/* =========================
//           MOBILE OVERLAY
//       ========================== */}

//       <AnimatePresence>
//         {mobileOpen && (
//           <motion.div
//             initial={{
//               opacity: 0,
//             }}
//             animate={{
//               opacity: 1,
//             }}
//             exit={{
//               opacity: 0,
//             }}
//             onClick={closeMobileMenu}
//             className="fixed bottom-0 left-0 right-0 top-[78px] z-[70] bg-black/70 backdrop-blur-[2px] lg:hidden"
//           />
//         )}
//       </AnimatePresence>

//       {/* =========================
//           MOBILE SIDEBAR
//       ========================== */}

//       <AnimatePresence>
//         {mobileOpen && (
//           <motion.aside
//             variants={mobileSidebarVariants}
//             initial="hidden"
//             animate="visible"
//             exit="exit"
//             className="admin-mobile-sidebar fixed top-[78px] z-[80] border-r border-white/[0.09] bg-[#0D0D10] lg:hidden"
//           >
//             <div className="flex h-full w-full flex-col">
//               <div className="flex items-center justify-between border-b border-white/[0.08] px-4 py-4">
//                 <div>
//                   <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#64646D]">
//                     Nifty Verse
//                   </p>

//                   <h2 className="mt-1 text-sm font-bold text-white">
//                     User Workspace
//                   </h2>
//                 </div>

//                 <button
//                   type="button"
//                   onClick={closeMobileMenu}
//                   className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/[0.04] text-[#85858D] transition hover:bg-white/[0.08] hover:text-white"
//                   aria-label="Close menu"
//                 >
//                   <X size={18} />
//                 </button>
//               </div>

//               <nav className="admin-scrollbar flex-1 overflow-y-auto px-3 py-5">
//                 <div className="space-y-1.5">
//                   {userMenuItems.map((item) => {
//                     const Icon = item.icon;

//                     return (
//                       <NavLink
//                         key={item.path}
//                         to={item.path}
//                         onClick={closeMobileMenu}
//                         className={({ isActive }) =>
//                           `group relative flex items-center gap-3 rounded-2xl px-3 py-2.5 text-[14px] font-bold transition-all duration-300 ${
//                             isActive
//                               ? "bg-[#A259FF]/[0.12] text-white"
//                               : "text-[#85858D] hover:bg-white/[0.035] hover:text-white"
//                           }`
//                         }
//                       >
//                         {({ isActive }) => (
//                           <>
//                             {isActive && (
//                               <div className="absolute bottom-2 left-0 top-2 w-[3px] rounded-r-full bg-[linear-gradient(180deg,#A259FF,#55B7FF)] shadow-[0_0_10px_rgba(162,89,255,0.6)]" />
//                             )}

//                             <span
//                               className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl transition-all duration-300 ${
//                                 isActive
//                                   ? "bg-[#A259FF]/[0.11] text-[#B872FF]"
//                                   : "text-[#67676F] group-hover:bg-white/[0.045] group-hover:text-white"
//                               }`}
//                             >
//                               <Icon size={18} strokeWidth={1.8} />
//                             </span>

//                             <span className="min-w-0 truncate">
//                               {item.label}
//                             </span>

//                             {isActive && (
//                               <ChevronRight
//                                 size={15}
//                                 className="ml-auto shrink-0 text-[#A96AFF]"
//                               />
//                             )}
//                           </>
//                         )}
//                       </NavLink>
//                     );
//                   })}
//                 </div>
//               </nav>

//               {/* MOBILE LOGOUT */}

//               <div className="border-t border-white/[0.09] p-3">
//                 <button
//                   type="button"
//                   onClick={handleLogout}
//                   className="group flex w-full items-center gap-3 rounded-2xl px-3 py-2.5 text-[14px] font-bold text-[#8A8A92] transition-all duration-300 hover:bg-red-500/[0.07] hover:text-red-300"
//                 >
//                   <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-red-500/[0.06] text-red-400 transition-all duration-300 group-hover:bg-red-500/[0.13]">
//                     <LogOut size={18} strokeWidth={1.8} />
//                   </span>

//                   Logout
//                 </button>
//               </div>
//             </div>
//           </motion.aside>
//         )}
//       </AnimatePresence>

//       {/* =========================
//           MAIN CONTENT
//       ========================== */}

//       <div
//         className={`flex h-screen w-full flex-col pt-[78px] transition-[padding] duration-300 ease-out ${
//           sidebarCollapsed ? "lg:pl-0" : "lg:pl-[270px]"
//         }`}
//       >
//         <div className="admin-content-scroll flex-1 overflow-y-auto">
//           <main className="admin-page-shell mx-auto min-h-full w-full pb-[108px] pt-4 sm:pb-[112px] sm:pt-6 lg:pb-8 lg:pt-8">
//             <AnimatePresence mode="wait">
//               <motion.div
//                 key={location.pathname}
//                 variants={pageVariants}
//                 initial="initial"
//                 animate="animate"
//                 exit="exit"
//                 className="min-h-full min-w-0"
//               >
//                 <Outlet />
//               </motion.div>
//             </AnimatePresence>
//           </main>
//         </div>
//       </div>

//       {/* =========================
//           MOBILE BOTTOM NAVIGATION
//       ========================== */}

//       <AnimatePresence>
//         {!mobileOpen && (
//           <motion.nav
//             initial={{
//               y: 90,
//               opacity: 0,
//             }}
//             animate={{
//               y: 0,
//               opacity: 1,
//             }}
//             exit={{
//               y: 90,
//               opacity: 0,
//             }}
//             transition={{
//               duration: 0.3,
//               ease: [0.22, 1, 0.36, 1],
//             }}
//             className="admin-bottom-nav fixed bottom-3 z-[60] rounded-[24px] border border-white/[0.1] bg-[#0B0B0E]/95 p-1.5 shadow-[0_14px_45px_rgba(0,0,0,0.45)] backdrop-blur-2xl lg:hidden"
//           >
//             <div className="flex min-h-[66px] items-center justify-between gap-0.5">
//               {mobileNavItems.map((item) => {
//                 const Icon = item.icon;

//                 return (
//                   <NavLink
//                     key={item.path}
//                     to={item.path}
//                     className="group flex min-w-0 flex-1 items-center justify-center"
//                   >
//                     {({ isActive }) => (
//                       <div
//                         className={`flex min-h-[58px] w-full flex-col items-center justify-center gap-1 rounded-[19px] px-1 transition-all duration-300 ${
//                           isActive
//                             ? "bg-[#A259FF]/[0.14] text-[#B872FF]"
//                             : "text-[#66666E] hover:bg-white/[0.035] hover:text-white"
//                         }`}
//                       >
//                         <motion.span
//                           animate={{
//                             scale: isActive ? 1.03 : 1,
//                           }}
//                           className="flex h-8 w-10 items-center justify-center"
//                         >
//                           <Icon
//                             size={20}
//                             strokeWidth={isActive ? 2 : 1.8}
//                           />
//                         </motion.span>

//                         <span
//                           className={`max-w-full truncate text-[9px] font-bold sm:text-[10px] ${
//                             isActive
//                               ? "text-[#B872FF]"
//                               : "text-[#66666E] group-hover:text-white"
//                           }`}
//                         >
//                           {item.label}
//                         </span>
//                       </div>
//                     )}
//                   </NavLink>
//                 );
//               })}

//               <button
//                 type="button"
//                 onClick={toggleMobileMenu}
//                 className="group flex min-w-0 flex-1 items-center justify-center text-[#66666E] transition-colors duration-300 hover:text-white"
//                 aria-label="Open navigation"
//               >
//                 <div className="flex min-h-[58px] w-full flex-col items-center justify-center gap-1 rounded-[19px] px-1 transition-all duration-300 hover:bg-white/[0.035]">
//                   <span className="flex h-8 w-10 items-center justify-center">
//                     <MoreHorizontal size={21} strokeWidth={1.8} />
//                   </span>

//                   <span className="text-[9px] font-bold sm:text-[10px]">
//                     More
//                   </span>
//                 </div>
//               </button>
//             </div>
//           </motion.nav>
//         )}
//       </AnimatePresence>
//     </div>
//   );
// };

// export default UserLayout;





import React, { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { NavLink, Outlet, useLocation, useNavigate } from "react-router-dom";
import {
  Activity,
  Bell,
  ChevronRight,
  Heart,
  Image,
  Layers,
  LayoutDashboard,
  LogOut,
  Menu,
  MoreHorizontal,
  UserRound,
  WalletCards,
  X,
} from "lucide-react";
import logo from "../../assets/logo/logo.png";
import "../../admin/admin.css";
const API_URL =
  import.meta.env.VITE_API_URL ||
  "https://nifty-verse-backend-production.up.railway.app";
const userMenuItems = [
  {
    label: "Dashboard",
    path: "/user/dashboard",
    icon: LayoutDashboard,
  },
  {
    label: "NFTs",
    path: "/user/nfts",
    icon: Image,
  },
  {
    label: "Collections",
    path: "/user/collections",
    icon: Layers,
  },
  {
    label: "Favorites",
    path: "/user/favorites",
    icon: Heart,
  },
  {
    label: "Activity",
    path: "/user/activity",
    icon: Activity,
  },
  {
    label: "Notifications",
    path: "/user/notifications",
    icon: Bell,
  },
  {
    label: "Profile",
    path: "/user/profile",
    icon: UserRound,
  },
  {
    label: "Wallet",
    path: "/user/wallet",
    icon: WalletCards,
  },
];
const mobileNavItems = [
  {
    label: "Dashboard",
    path: "/user/dashboard",
    icon: LayoutDashboard,
  },
  {
    label: "NFTs",
    path: "/user/nfts",
    icon: Image,
  },
  {
    label: "Collections",
    path: "/user/collections",
    icon: Layers,
  },
  {
    label: "Favorites",
    path: "/user/favorites",
    icon: Heart,
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
const UserLayout = () => {
  const navigate = useNavigate();
  const location = useLocation();
const [authLoading, setAuthLoading] = useState(true);
const [authError, setAuthError] = useState("");
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [userProfile, setUserProfile] = useState({
    initials: "U",
    image: "",
  });
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
  useEffect(() => {
    try {
      const savedUser = localStorage.getItem("user");
      const user = savedUser ? JSON.parse(savedUser) : null;
      const name =
        user?.name ||
        user?.fullName ||
        user?.username ||
        user?.email?.split("@")[0] ||
        "User";
      const initials = String(name)
        .trim()
        .split(/\s+/)
        .filter(Boolean)
        .slice(0, 2)
        .map((part) => part.charAt(0).toUpperCase())
        .join("");
      setUserProfile({
        initials: initials || "U",
        image: user?.profileImage || user?.avatar || user?.image || "",
      });
    } catch (error) {
      console.error("Unable to load user profile:", error);
      setUserProfile({
        initials: "U",
        image: "",
      });
    }
  }, [location.pathname]);
  useEffect(() => {
    let isMounted = true;

    const verifySession = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        localStorage.removeItem("user");
        navigate("/signin", { replace: true });
        setAuthLoading(false);
        return;
      }

      try {
        const response = await fetch(`${API_URL}/api/auth/me`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await response.json().catch(() => ({}));

        if (response.status === 401) {
          localStorage.removeItem("token");
          localStorage.removeItem("user");
          navigate("/signin", { replace: true });
          return;
        }

        if (!response.ok || !data.success || !data.user) {
          if (isMounted) {
            setAuthError(data.message || "Unable to verify your session.");
          }
          return;
        }

        let previousUser = {};
        try {
          previousUser = JSON.parse(localStorage.getItem("user") || "{}");
        } catch {
          previousUser = {};
        }

        // Keep local-only profile fields while refreshing trusted account fields from the API.
        const verifiedUser = {
          ...previousUser,
          ...data.user,
        };

        localStorage.setItem("user", JSON.stringify(verifiedUser));

        const displayName =
          verifiedUser.name ||
          verifiedUser.fullName ||
          verifiedUser.username ||
          verifiedUser.email?.split("@")[0] ||
          "User";

        const initials = String(displayName)
          .trim()
          .split(/\s+/)
          .filter(Boolean)
          .slice(0, 2)
          .map((part) => part.charAt(0).toUpperCase())
          .join("");

        if (isMounted) {
          setUserProfile({
            initials: initials || "U",
            image:
              verifiedUser.profileImage ||
              verifiedUser.avatar ||
              verifiedUser.image ||
              "",
          });
          setAuthError("");
        }
      } catch (error) {
        console.error("Session verification error:", error);

        if (isMounted) {
          setAuthError(
            "Unable to connect to the server. Please check your backend or internet connection."
          );
        }
      } finally {
        if (isMounted) {
          setAuthLoading(false);
        }
      }
    };

    verifySession();

    return () => {
      isMounted = false;
    };
  }, [navigate]);
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setMobileOpen(false);
    navigate("/signin", {
      replace: true,
    });
  };
  const toggleSidebar = () => {
    setSidebarCollapsed((previous) => !previous);
  };
  const toggleMobileMenu = () => {
    setMobileOpen((previous) => !previous);
  };
  const closeMobileMenu = () => {
    setMobileOpen(false);
  };
  const openNotifications = () => {
    navigate("/user/notifications");
  };
  const openProfile = () => {
    navigate("/user/profile");
  };
  if (authLoading) {
  return (
    <div className="flex min-h-screen items-center justify-center bg-[#08080A] text-white">
      <div className="flex items-center gap-3 text-sm text-[#A7A7AF]">
        <span className="h-5 w-5 animate-spin rounded-full border-2 border-[#A259FF]/30 border-t-[#A259FF]" />
        Verifying your session...
      </div>
    </div>
  );
}
if (authError) {
  return (
    <div className="flex min-h-screen items-center justify-center bg-[#08080A] px-5 text-white">
      <section className="w-full max-w-md rounded-[26px] border border-white/[0.08] bg-[#111114] p-6 text-center sm:p-8">
        <h2 className="text-xl font-bold text-white">
          Session Verification Failed
        </h2>
        <p className="mt-3 text-sm leading-6 text-[#85858D]">
          {authError}
        </p>
        <button
          type="button"
          onClick={() => window.location.reload()}
          className="mt-6 w-full rounded-xl bg-[#A259FF] px-5 py-3 text-sm font-bold text-white transition hover:bg-[#8E45E8]"
        >
          Retry Verification
        </button>
      </section>
    </div>
  );
}
  return (
    <div className="admin-shell h-screen overflow-hidden bg-[#08080A] text-white">
      {/* =========================
          HEADER
      ========================== */}
      <header className="fixed left-0 right-0 top-0 z-[100] h-[78px] border-b border-white/[0.09] bg-[#0C0C0F]/95 shadow-[0_8px_35px_rgba(0,0,0,0.18)] backdrop-blur-xl">
        <div className="flex h-full w-full items-center justify-between">
          {/* LOGO AREA */}
          <div className="admin-header-brand flex h-full min-w-0 flex-1 items-center gap-2.5 px-3 sm:gap-3 sm:px-4 lg:w-[270px] lg:flex-none lg:px-5">
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
              <Menu size={18} strokeWidth={1.9} />
            </motion.button>
            <NavLink
              to="/user/dashboard"
              className="admin-logo-link group flex min-w-0 items-center"
              aria-label="User dashboard"
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
            <motion.button
              type="button"
              onClick={openNotifications}
              whileHover={{
                scale: 1.04,
              }}
              whileTap={{
                scale: 0.96,
              }}
              className="admin-header-action-button relative flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-white/[0.08] bg-white/[0.025] text-[#85858D] transition-all duration-300 hover:border-[#A259FF]/25 hover:bg-[#A259FF]/10 hover:text-white sm:h-11 sm:w-11 sm:rounded-2xl"
              aria-label="Open notifications"
              title="Notifications"
            >
              <Bell size={18} strokeWidth={1.8} />
              <span className="absolute right-[7px] top-[7px] h-1.5 w-1.5 rounded-full bg-[#A259FF] shadow-[0_0_9px_rgba(162,89,255,0.95)]" />
            </motion.button>
            <motion.button
              type="button"
              onClick={openProfile}
              whileHover={{
                scale: 1.04,
              }}
              whileTap={{
                scale: 0.97,
              }}
              className="admin-header-action-button flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-[linear-gradient(135deg,#A259FF,#5EA8FF)] text-sm font-bold text-white shadow-[0_8px_25px_rgba(112,82,255,0.2)] sm:h-11 sm:w-11 sm:rounded-2xl"
              aria-label="Open user profile"
              title="My Profile"
            >
              {userProfile.image ? (
                <img
                  src={userProfile.image}
                  alt="User profile"
                  className="h-full w-full object-cover"
                />
              ) : (
                userProfile.initials
              )}
            </motion.button>
          </div>
        </div>
      </header>
      {/* =========================
          DESKTOP SIDEBAR
      ========================== */}
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
                <div className="space-y-1.5">
                  {userMenuItems.map((item) => {
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
                                layoutId="user-active-line"
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
                              <Icon size={18} strokeWidth={1.8} />
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
                    <LogOut size={18} strokeWidth={1.8} />
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
      {/* =========================
          MOBILE OVERLAY
      ========================== */}
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
      {/* =========================
          MOBILE SIDEBAR
      ========================== */}
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
              <div className="flex items-center justify-between border-b border-white/[0.08] px-4 py-4">
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#64646D]">
                    Nifty Verse
                  </p>
                  <h2 className="mt-1 text-sm font-bold text-white">
                    User Workspace
                  </h2>
                </div>
                <button
                  type="button"
                  onClick={closeMobileMenu}
                  className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/[0.04] text-[#85858D] transition hover:bg-white/[0.08] hover:text-white"
                  aria-label="Close menu"
                >
                  <X size={18} />
                </button>
              </div>
              <nav className="admin-scrollbar flex-1 overflow-y-auto px-3 py-5">
                <div className="space-y-1.5">
                  {userMenuItems.map((item) => {
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
                              <Icon size={18} strokeWidth={1.8} />
                            </span>
                            <span className="min-w-0 truncate">
                              {item.label}
                            </span>
                            {isActive && (
                              <ChevronRight
                                size={15}
                                className="ml-auto shrink-0 text-[#A96AFF]"
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
                  className="group flex w-full items-center gap-3 rounded-2xl px-3 py-2.5 text-[14px] font-bold text-[#8A8A92] transition-all duration-300 hover:bg-red-500/[0.07] hover:text-red-300"
                >
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-red-500/[0.06] text-red-400 transition-all duration-300 group-hover:bg-red-500/[0.13]">
                    <LogOut size={18} strokeWidth={1.8} />
                  </span>
                  Logout
                </button>
              </div>
            </div>
          </motion.aside>
        )}
      </AnimatePresence>
      {/* =========================
          MAIN CONTENT
      ========================== */}
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
      {/* =========================
          MOBILE BOTTOM NAVIGATION
      ========================== */}
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
            className="admin-bottom-nav fixed bottom-3 z-[60] rounded-[24px] border border-white/[0.1] bg-[#0B0B0E]/95 p-1.5 shadow-[0_14px_45px_rgba(0,0,0,0.45)] backdrop-blur-2xl lg:hidden"
          >
            <div className="flex min-h-[66px] items-center justify-between gap-0.5">
              {mobileNavItems.map((item) => {
                const Icon = item.icon;
                return (
                  <NavLink
                    key={item.path}
                    to={item.path}
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
                    <MoreHorizontal size={21} strokeWidth={1.8} />
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
export default UserLayout;
