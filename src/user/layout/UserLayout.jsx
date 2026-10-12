
import React, { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "framer-motion";
import {
  NavLink,
  Outlet,
  useLocation,
  useNavigate,
} from "react-router-dom";
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

const menuItems = [
  { label: "Dashboard", path: "/user/dashboard", icon: LayoutDashboard },
  { label: "NFTs", path: "/user/nfts", icon: Image },
  { label: "Collections", path: "/user/collections", icon: Layers },
  { label: "Favorites", path: "/user/favorites", icon: Heart },
  { label: "Activity", path: "/user/activity", icon: Activity },
  { label: "Notifications", path: "/user/notifications", icon: Bell },
  { label: "Profile", path: "/user/profile", icon: UserRound },
  { label: "Wallet", path: "/user/wallet", icon: WalletCards },
];

const getUserDetails = (user = {}) => {
  const name =
    user.name ||
    user.fullName ||
    user.username ||
    user.email?.split("@")[0] ||
    "User";

  const initials =
    String(name)
      .trim()
      .split(/\s+/)
      .filter(Boolean)
      .slice(0, 2)
      .map((part) => part[0].toUpperCase())
      .join("") || "U";

  return {
    name,
    email: user.email || "",
    initials,
    image: user.profileImage || user.avatar || user.image || "",
  };
};

const UserLayout = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const profileButtonRef = useRef(null);
  const dropdownRef = useRef(null);

  const [authLoading, setAuthLoading] = useState(true);
  const [authError, setAuthError] = useState("");
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);
  const [menuPosition, setMenuPosition] = useState({
    top: 70,
    right: 12,
  });

  const [userProfile, setUserProfile] = useState({
    name: "User",
    email: "",
    initials: "U",
    image: "",
  });

  const updateMenuPosition = () => {
    const button = profileButtonRef.current;
    if (!button) return;

    const rect = button.getBoundingClientRect();

    setMenuPosition({
      top: rect.bottom + 10,
      right: Math.max(12, window.innerWidth - rect.right),
    });
  };

  const toggleProfileMenu = () => {
    if (!profileMenuOpen) {
      updateMenuPosition();
    }

    setProfileMenuOpen((previous) => !previous);
  };

  useEffect(() => {
    try {
      const savedUser = JSON.parse(
        localStorage.getItem("user") || "{}"
      );

      setUserProfile(getUserDetails(savedUser));
    } catch {
      setUserProfile(getUserDetails());
    }
  }, [location.pathname]);

  useEffect(() => {
    setMobileOpen(false);
    setProfileMenuOpen(false);
  }, [location.pathname]);

  // Keep the portal dropdown positioned below the profile button.
  useEffect(() => {
    if (!profileMenuOpen) return;

    updateMenuPosition();

    const handleResize = () => updateMenuPosition();
    const handleScroll = () => updateMenuPosition();

    window.addEventListener("resize", handleResize);
    window.addEventListener("scroll", handleScroll, true);

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("scroll", handleScroll, true);
    };
  }, [profileMenuOpen]);

  // Close dropdown on outside click or Escape.
  useEffect(() => {
    if (!profileMenuOpen) return;

    const handleOutsideClick = (event) => {
      if (
        profileButtonRef.current?.contains(event.target) ||
        dropdownRef.current?.contains(event.target)
      ) {
        return;
      }

      setProfileMenuOpen(false);
    };

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        setProfileMenuOpen(false);
        setMobileOpen(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);
    document.addEventListener("touchstart", handleOutsideClick);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
      document.removeEventListener("touchstart", handleOutsideClick);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [profileMenuOpen]);

  // Verify the user's session.
  useEffect(() => {
    let mounted = true;

    const verifySession = async () => {
      const token = localStorage.getItem("token");
      const savedUser = localStorage.getItem("user");

      if (!token || !savedUser) {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        navigate("/signin", { replace: true });
        if (mounted) setAuthLoading(false);
        return;
      }

      let parsedUser;

      try {
        parsedUser = JSON.parse(savedUser);
      } catch {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        navigate("/signin", { replace: true });
        if (mounted) setAuthLoading(false);
        return;
      }

      if (mounted) setUserProfile(getUserDetails(parsedUser));

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
          if (mounted) {
            setAuthError(
              data.message || "Unable to verify your session."
            );
          }
          return;
        }

        const updatedUser = { ...parsedUser, ...data.user };
        localStorage.setItem("user", JSON.stringify(updatedUser));

        if (mounted) {
          setUserProfile(getUserDetails(updatedUser));
          setAuthError("");
        }
      } catch (error) {
        console.error("Session verification error:", error);

        if (mounted) {
          setAuthError(
            "Unable to connect to the server. Please check your backend connection."
          );
        }
      } finally {
        if (mounted) setAuthLoading(false);
      }
    };

    verifySession();

    return () => {
      mounted = false;
    };
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setProfileMenuOpen(false);
    setMobileOpen(false);
    navigate("/signin", { replace: true });
  };

  const openProfile = () => {
    setProfileMenuOpen(false);
    navigate("/user/profile");
  };

  const openNotifications = () => {
    navigate("/user/notifications");
  };

  if (authLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen text-white bg-[#08080A]">
        <span className="flex items-center gap-3 text-sm text-[#A7A7AF]">
          <span className="h-5 w-5 rounded-full border-2 border-[#A259FF]/30 border-t-[#A259FF] animate-spin" />
          Verifying your session...
        </span>
      </div>
    );
  }

  if (authError) {
    return (
      <div className="flex items-center justify-center px-5 min-h-screen text-white bg-[#08080A]">
        <div className="p-7 w-full max-w-md text-center bg-[#111114] rounded-2xl border-white/[0.08] border">
          <h2 className="text-xl font-bold">
            Session Verification Failed
          </h2>
          <p className="mt-3 text-sm leading-6 text-[#92909D]">
            {authError}
          </p>
          <button
            type="button"
            onClick={() => window.location.reload()}
            className="mt-6 px-5 py-3 w-full text-sm font-semibold text-white bg-[#A259FF] rounded-xl hover:bg-[#8E45E8]"
          >
            Retry
          </button>
          <button
            type="button"
            onClick={handleLogout}
            className="mt-3 px-5 py-3 w-full text-sm text-[#C8C6D0] rounded-xl border-white/10 border hover:bg-white/5"
          >
            Logout
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="overflow-hidden relative h-screen text-white bg-[#08080A] admin-shell">
      {/* HEADER */}
      <header className="z-[100] fixed inset-x-0 top-0 h-[78px] bg-[#0C0C0F]/95 border-b border-white/[0.09] shadow-[0_8px_35px_rgba(0,0,0,0.18)] backdrop-blur-xl">
        <div className="flex items-center justify-between h-full">
          {/* LOGO */}
          <div className="flex flex-1 items-center gap-3 px-3 h-full min-w-0 w-[270px] sm:px-5 lg:flex-none">
            <button
              type="button"
              onClick={() => setSidebarCollapsed((prev) => !prev)}
              aria-label="Toggle sidebar"
              className="hidden items-center justify-center h-10 w-10 text-[#A7A7AF] bg-[#A259FF]/[0.06] rounded-xl border-[#A259FF]/30 shrink-0 border transition hover:bg-[#A259FF]/15 hover:text-white lg:flex"
            >
              <Menu size={19} />
            </button>

            <NavLink to="/user/dashboard" className="flex items-center min-w-0">
              <img
                src={logo}
                alt="Nifty Verse"
                className="object-contain object-left h-[48px] w-[clamp(100px,26vw,205px)] max-w-full sm:h-[54px] lg:w-[205px]"
              />
            </NavLink>
          </div>

          {/* HEADER ACTIONS */}
          <div className="flex items-center gap-2 px-3 px-5 px-8 shrink-0 sm:gap-3 lg:gap-4">
            <button
              type="button"
              onClick={openNotifications}
              aria-label="Notifications"
              title="Notifications"
              className="relative flex items-center justify-center h-10 w-10 w-11 text-[#85858D] bg-white/[0.025] rounded-xl border-white/[0.08] rounded-2xl shrink-0 border transition hover:border-[#A259FF]/30 hover:bg-[#A259FF]/10 hover:text-white sm:h-11"
            >
              <Bell size={19} />
              <span className="absolute right-[7px] top-[7px] h-1.5 w-1.5 bg-[#A259FF] rounded-full" />
            </button>

            {/* PROFILE BUTTON */}
            <button
              ref={profileButtonRef}
              type="button"
              onClick={toggleProfileMenu}
              aria-label="Open profile menu"
              aria-haspopup="menu"
              aria-expanded={profileMenuOpen}
              title="Account menu"
              className="z-[101] overflow-hidden relative flex items-center justify-center h-10 w-10 w-11 text-sm font-bold text-white bg-gradient-to-br from-[#A259FF] to-[#5EA8FF] rounded-xl rounded-2xl shadow-[0_8px_25px_rgba(112,82,255,0.2)] shrink-0 transition hover:brightness-110 sm:h-11"
            >
              {userProfile.image ? (
                <img
                  src={userProfile.image}
                  alt="Profile"
                  className="object-cover h-full w-full"
                />
              ) : (
                userProfile.initials
              )}
            </button>
          </div>
        </div>
      </header>

      {/* PORTAL DROPDOWN: rendered under document.body, outside clipped ancestors */}
      {profileMenuOpen &&
        createPortal(
          <AnimatePresence>
            <motion.div
              ref={dropdownRef}
              role="menu"
              initial={{ opacity: 0, y: -6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.16 }}
              style={{
                position: "fixed",
                top: menuPosition.top,
                right: menuPosition.right,
                width: "260px",
                maxWidth: "calc(100vw - 24px)",
                zIndex: 999999,
              }}
              className="overflow-hidden p-2 text-left text-white bg-[#111114] rounded-2xl border-white/[0.09] shadow-[0_18px_55px_rgba(0,0,0,0.65)] box-border border"
            >
              {/* ACCOUNT DETAILS */}
              <div className="flex items-center gap-3 px-3 py-3 min-w-0 border-b border-white/[0.08]">
                <div className="overflow-hidden flex items-center justify-center h-11 w-11 text-sm font-bold text-white bg-gradient-to-br from-[#A259FF] to-[#5EA8FF] rounded-xl shrink-0">
                  {userProfile.image ? (
                    <img
                      src={userProfile.image}
                      alt=""
                      className="object-cover h-full w-full"
                    />
                  ) : (
                    userProfile.initials
                  )}
                </div>

                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold truncate">
                    {userProfile.name}
                  </p>
                  <p className="mt-1 text-xs text-[#85858D] truncate">
                    {userProfile.email || "NiftyVerse account"}
                  </p>
                </div>
              </div>

              {/* MY PROFILE */}
              <button
                type="button"
                role="menuitem"
                onClick={openProfile}
                className="flex flex-row flex-nowrap items-center gap-3 mt-2 px-3 py-3 w-full text-sm font-medium text-[#C8C6D0] rounded-xl transition hover:bg-[#A259FF]/10 hover:text-white"
              >
                <span className="flex items-center justify-center h-9 w-9 text-[#B872FF] bg-[#A259FF]/10 rounded-lg shrink-0">
                  <UserRound size={18} />
                </span>
                <span className="flex-1 whitespace-nowrap text-left">
                  My Profile
                </span>
                <ChevronRight size={16} className="text-[#777782] shrink-0" />
              </button>

              {/* LOGOUT */}
              <button
                type="button"
                role="menuitem"
                onClick={handleLogout}
                className="flex flex-row flex-nowrap items-center gap-3 mt-1 px-3 py-3 w-full text-sm font-medium text-red-400 rounded-xl transition hover:bg-red-500/10 hover:text-red-300"
              >
                <span className="flex items-center justify-center h-9 w-9 bg-red-500/[0.08] rounded-lg shrink-0">
                  <LogOut size={18} />
                </span>
                <span className="flex-1 whitespace-nowrap text-left">
                  Logout
                </span>
                <ChevronRight size={16} className="text-red-400/60 shrink-0" />
              </button>
            </motion.div>
          </AnimatePresence>,
          document.body
        )}

      {/* DESKTOP SIDEBAR */}
      <AnimatePresence initial={false}>
        {!sidebarCollapsed && (
          <motion.aside
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -20, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="z-40 fixed bottom-0 left-0 top-[78px] hidden w-[270px] bg-[#0C0C0F] border-r border-white/[0.09] lg:block"
          >
            <div className="flex flex-col h-full">
              <nav className="overflow-y-auto flex-1 px-3 py-6 admin-scrollbar">
                <div className="space-y-1.5">
                  {menuItems.map((item) => {
                    const Icon = item.icon;

                    return (
                      <NavLink
                        key={item.path}
                        to={item.path}
                        className={({ isActive }) =>
                          `group relative flex min-w-0 items-center gap-3 rounded-2xl px-3 py-2.5 text-sm font-bold transition ${
                            isActive
                              ? "bg-[#A259FF]/[0.12] text-white"
                              : "text-[#898991] hover:bg-white/[0.035] hover:text-white"
                          }`
                        }
                      >
                        {({ isActive }) => (
                          <>
                            {isActive && (
                              <span className="absolute bottom-2 left-0 top-2 w-[3px] bg-gradient-to-b from-[#A259FF] to-[#55B7FF] rounded-r-full" />
                            )}
                            <span
                              className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl ${
                                isActive
                                  ? "bg-[#A259FF]/10 text-[#B872FF]"
                                  : "text-[#67676F] group-hover:text-white"
                              }`}
                            >
                              <Icon size={18} strokeWidth={1.8} />
                            </span>
                            <span className="flex-1 min-w-0 truncate">
                              {item.label}
                            </span>
                            {isActive && (
                              <ChevronRight size={15} className="text-[#A96AFF] shrink-0" />
                            )}
                          </>
                        )}
                      </NavLink>
                    );
                  })}
                </div>
              </nav>

              <div className="p-3 border-t border-white/[0.09]">
                <button
                  type="button"
                  onClick={handleLogout}
                  className="flex items-center gap-3 px-3 py-2.5 w-full text-sm font-bold text-[#8A8A92] rounded-2xl group transition hover:bg-red-500/[0.07] hover:text-red-300"
                >
                  <span className="flex items-center justify-center h-9 w-9 text-red-400 bg-red-500/[0.06] rounded-xl shrink-0">
                    <LogOut size={18} />
                  </span>
                  <span className="flex-1 text-left">Logout</span>
                  <ChevronRight size={15} className="opacity-60 shrink-0" />
                </button>
              </div>
            </div>
          </motion.aside>
        )}
      </AnimatePresence>

      {/* MOBILE SIDEBAR OVERLAY */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setMobileOpen(false)}
            className="z-[70] fixed inset-x-0 bottom-0 top-[78px] bg-black/70 backdrop-blur-[2px] lg:hidden"
          />
        )}
      </AnimatePresence>

      {/* MOBILE SIDEBAR */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.aside
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ duration: 0.25 }}
            className="z-[80] fixed bottom-0 left-0 top-[78px] flex flex-col w-[min(290px,85vw)] bg-[#0D0D10] border-r border-white/[0.09] lg:hidden"
          >
            <div className="flex items-center justify-between px-4 py-4 border-b border-white/[0.08]">
              <div>
                <p className="text-[10px] font-bold tracking-[0.2em] text-[#64646D] uppercase">
                  Nifty Verse
                </p>
                <h2 className="mt-1 text-sm font-bold text-white">
                  User Workspace
                </h2>
              </div>
              <button
                type="button"
                onClick={() => setMobileOpen(false)}
                className="flex items-center justify-center h-9 w-9 text-[#85858D] bg-white/[0.04] rounded-xl hover:text-white"
                aria-label="Close menu"
              >
                <X size={18} />
              </button>
            </div>

            <nav className="overflow-y-auto flex-1 px-3 py-5 admin-scrollbar">
              <div className="space-y-1.5">
                {menuItems.map((item) => {
                  const Icon = item.icon;

                  return (
                    <NavLink
                      key={item.path}
                      to={item.path}
                      onClick={() => setMobileOpen(false)}
                      className={({ isActive }) =>
                        `group relative flex min-w-0 items-center gap-3 rounded-2xl px-3 py-2.5 text-sm font-bold transition ${
                          isActive
                            ? "bg-[#A259FF]/[0.12] text-white"
                            : "text-[#85858D] hover:bg-white/[0.035] hover:text-white"
                        }`
                      }
                    >
                      {({ isActive }) => (
                        <>
                          {isActive && (
                            <span className="absolute bottom-2 left-0 top-2 w-[3px] bg-gradient-to-b from-[#A259FF] to-[#55B7FF] rounded-r-full" />
                          )}
                          <span
                            className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl ${
                              isActive
                                ? "bg-[#A259FF]/10 text-[#B872FF]"
                                : "text-[#67676F] group-hover:text-white"
                            }`}
                          >
                            <Icon size={18} />
                          </span>
                          <span className="flex-1 min-w-0 truncate">
                            {item.label}
                          </span>
                          {isActive && (
                            <ChevronRight size={15} className="text-[#A96AFF] shrink-0" />
                          )}
                        </>
                      )}
                    </NavLink>
                  );
                })}
              </div>
            </nav>

            <div className="p-3 border-t border-white/[0.09]">
              <button
                type="button"
                onClick={handleLogout}
                className="flex items-center gap-3 px-3 py-3 w-full text-sm font-bold text-red-400 rounded-2xl transition hover:bg-red-500/10"
              >
                <span className="flex items-center justify-center h-9 w-9 bg-red-500/[0.06] rounded-xl shrink-0">
                  <LogOut size={18} />
                </span>
                <span>Logout</span>
              </button>
            </div>
          </motion.aside>
        )}
      </AnimatePresence>

      {/* MAIN CONTENT */}
      <div
        className={`flex h-screen w-full flex-col pt-[78px] transition-[padding] duration-300 ${
          sidebarCollapsed ? "lg:pl-0" : "lg:pl-[270px]"
        }`}
      >
        <div className="overflow-y-auto flex-1 admin-content-scroll">
          <main className="mx-auto pb-[108px] pt-4 pt-6 pt-8 min-h-full w-full admin-page-shell sm:pb-[112px] lg:pb-8">
            <AnimatePresence mode="wait">
              <motion.div
                key={location.pathname}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -4 }}
                transition={{ duration: 0.2 }}
                className="min-h-full min-w-0"
              >
                <Outlet />
              </motion.div>
            </AnimatePresence>
          </main>
        </div>
      </div>

      {/* MOBILE BOTTOM NAVIGATION */}
      <AnimatePresence>
        {!mobileOpen && (
          <motion.nav
            initial={{ y: 80, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 80, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="z-[60] fixed bottom-3 p-1.5 bg-[#0B0B0E]/95 rounded-[24px] border-white/[0.1] shadow-[0_14px_45px_rgba(0,0,0,0.45)] admin-bottom-nav border backdrop-blur-2xl lg:hidden"
          >
            <div className="flex items-center justify-between gap-0.5 min-h-[66px]">
              {menuItems.slice(0, 4).map((item) => {
                const Icon = item.icon;

                return (
                  <NavLink
                    key={item.path}
                    to={item.path}
                    className="flex flex-1 items-center justify-center min-w-0 group"
                  >
                    {({ isActive }) => (
                      <div
                        className={`flex min-h-[58px] w-full flex-col items-center justify-center gap-1 rounded-[19px] px-1 transition ${
                          isActive
                            ? "bg-[#A259FF]/[0.14] text-[#B872FF]"
                            : "text-[#66666E] hover:bg-white/[0.035] hover:text-white"
                        }`}
                      >
                        <span className="flex items-center justify-center h-8 w-10">
                          <Icon size={20} strokeWidth={isActive ? 2 : 1.8} />
                        </span>
                        <span className="max-w-full text-[9px] font-bold truncate sm:text-[10px]">
                          {item.label}
                        </span>
                      </div>
                    )}
                  </NavLink>
                );
              })}

              <button
                type="button"
                onClick={() => setMobileOpen(true)}
                aria-label="Open navigation"
                className="flex flex-1 items-center justify-center min-w-0 text-[#66666E] group transition hover:text-white"
              >
                <div className="flex flex-col items-center justify-center gap-1 px-1 min-h-[58px] w-full rounded-[19px] hover:bg-white/[0.035]">
                  <span className="flex items-center justify-center h-8 w-10">
                    <MoreHorizontal size={21} />
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
