import React, {
    useCallback,
    useEffect,
    useMemo,
    useState,
} from "react";

import {
    motion,
} from "framer-motion";

import {
    Search,
    RefreshCw,
    UserRound,
    Mail,
    CalendarDays,
    Clock3,
    UsersRound,
    ArrowUpRight,
    ShieldCheck,
} from "lucide-react";

import {
    useNavigate,
} from "react-router-dom";

import logo from "../../assets/logo/logo.png";

const API_URL =
    import.meta.env.VITE_API_URL ||
    "https://nifty-verse-backend-production.up.railway.app";

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

const AdminUsers = () => {
    const navigate = useNavigate();

    const [users, setUsers] = useState([]);

    const [search, setSearch] = useState("");

    const [loading, setLoading] = useState(true);

    const [error, setError] = useState("");

    const fetchUsers = useCallback(async () => {
        try {
            setLoading(true);

            setError("");

            const adminToken =
                localStorage.getItem(
                    "adminToken"
                );

            if (!adminToken) {
                navigate(
                    "/admin/login",
                    {
                        replace: true,
                    }
                );

                return;
            }

            const response = await fetch(
                `${API_URL}/api/admin/users`,
                {
                    method: "GET",
                    headers: {
                        Authorization: `Bearer ${adminToken}`,
                    },
                }
            );

            const data = await response.json();

            if (response.status === 401) {
                localStorage.removeItem(
                    "adminToken"
                );

                localStorage.removeItem(
                    "admin"
                );

                navigate(
                    "/admin/login",
                    {
                        replace: true,
                    }
                );

                return;
            }

            if (response.status === 403) {
                throw new Error(
                    data.message ||
                    "Admin access denied"
                );
            }

            if (!response.ok) {
                throw new Error(
                    data.message ||
                    "Failed to fetch users"
                );
            }

            setUsers(
                Array.isArray(data.users)
                    ? data.users
                    : []
            );
        } catch (error) {
            console.error(
                "Fetch users error:",
                error
            );

            setError(
                error.message ||
                "Failed to load registered users"
            );
        } finally {
            setLoading(false);
        }
    }, [navigate]);

    useEffect(() => {
        fetchUsers();
    }, [fetchUsers]);

    const filteredUsers = useMemo(() => {
        const query = search
            .toLowerCase()
            .trim();

        if (!query) {
            return users;
        }

        return users.filter((user) => {
            return (
                user.username
                    ?.toLowerCase()
                    .includes(query) ||
                user.email
                    ?.toLowerCase()
                    .includes(query)
            );
        });
    }, [search, users]);

    const formatDate = (date) => {
        if (!date) {
            return "—";
        }

        const parsedDate = new Date(date);

        if (
            Number.isNaN(
                parsedDate.getTime()
            )
        ) {
            return "—";
        }

        return parsedDate.toLocaleDateString(
            "en-IN",
            {
                day: "2-digit",
                month: "short",
                year: "numeric",
            }
        );
    };

    const formatDateTime = (date) => {
        if (!date) {
            return "Never";
        }

        const parsedDate = new Date(date);

        if (
            Number.isNaN(
                parsedDate.getTime()
            )
        ) {
            return "—";
        }

        return parsedDate.toLocaleString(
            "en-IN",
            {
                day: "2-digit",
                month: "short",
                year: "numeric",
                hour: "2-digit",
                minute: "2-digit",
            }
        );
    };

    const latestUser =
        users.length > 0
            ? users[0]
            : null;

    const stats = [
        {
            title: "Total Users",
            value: loading
                ? "..."
                : users.length.toLocaleString(),
            description: "Registered accounts",
            badge: "LIVE DATA",
            icon: UsersRound,
            accent:
                "from-violet-500/20 via-purple-500/5 to-transparent",
            iconBg: "bg-violet-500/10",
            iconColor: "text-[#B36DFF]",
        },
        {
            title: "Search Results",
            value: loading
                ? "..."
                : filteredUsers.length.toLocaleString(),
            description: search.trim()
                ? "Matching your search"
                : "All registered users",
            badge: search.trim()
                ? "FILTERED"
                : "ALL USERS",
            icon: UserRound,
            accent:
                "from-blue-500/20 via-cyan-500/5 to-transparent",
            iconBg: "bg-blue-500/10",
            iconColor: "text-[#72B9FF]",
        },
        {
            title: "Latest Registration",
            value: loading
                ? "Loading..."
                : latestUser?.username || "—",
            description: latestUser
                ? formatDate(
                      latestUser.createdAt
                  )
                : "No registrations yet",
            badge: "LATEST",
            icon: Clock3,
            accent:
                "from-fuchsia-500/20 via-purple-500/5 to-transparent",
            iconBg: "bg-fuchsia-500/10",
            iconColor: "text-[#C47BFF]",
        },
    ];

    return (
        <div className="space-y-6 sm:space-y-8">

            {/* =========================
                PAGE INTRO
            ========================== */}

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

                        <h1 className="mt-1 text-[clamp(1.7rem,3vw,2.7rem)] font-bold tracking-tight text-white">
                            User{" "}
                            <span className="bg-[linear-gradient(90deg,#C47BFF,#6DB8FF)] bg-clip-text text-transparent">
                                Management
                            </span>
                        </h1>

                        <p className="mt-2 max-w-[760px] text-sm leading-6 text-[#77777F]">
                            View and manage registered
                            users of the Nifty Verse
                            marketplace.
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

            {/* =========================
                USER STATS
            ========================== */}

            <motion.section
                variants={containerVariants}
                initial="hidden"
                animate="show"
                className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3"
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
                                            className={stat.iconColor}
                                        />
                                    </motion.div>

                                    <span className="rounded-full bg-[#0ACF83]/[0.08] px-2.5 py-1 text-[10px] font-bold text-[#32D997] sm:text-[11px]">
                                        {stat.badge}
                                    </span>

                                </div>

                                <p className="mt-6 text-xs text-[#7F7F87] sm:text-sm">
                                    {stat.title}
                                </p>

                                <div className="mt-1 flex min-w-0 items-end justify-between gap-3">

                                    <h2 className="min-w-0 truncate text-[clamp(1.4rem,2.8vw,2.2rem)] font-bold tracking-tight text-white">
                                        {stat.value}
                                    </h2>

                                    <ArrowUpRight
                                        size={18}
                                        strokeWidth={1.8}
                                        className="mb-1 shrink-0 text-[#56565E] transition duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-[#A259FF]"
                                    />

                                </div>

                                <div className="mt-4 h-px w-full bg-white/[0.06]" />

                                <div className="mt-3 flex items-center gap-2 text-[10px] text-[#55555D] sm:text-[11px]">
                                    <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-[#A259FF]/70" />

                                    <span className="truncate">
                                        {stat.description}
                                    </span>
                                </div>

                            </div>
                        </motion.div>
                    );
                })}
            </motion.section>

            {/* =========================
                SEARCH + REFRESH
            ========================== */}

            <motion.section
                initial={{
                    opacity: 0,
                    y: 14,
                }}
                animate={{
                    opacity: 1,
                    y: 0,
                }}
                transition={{
                    delay: 0.1,
                    duration: 0.4,
                }}
                className="group relative overflow-hidden rounded-[26px] bg-[#111114] p-4 shadow-[0_15px_50px_rgba(0,0,0,0.15)] sm:p-5 lg:p-6"
            >
                <div className="pointer-events-none absolute -right-16 -top-20 h-48 w-48 rounded-full bg-[#A259FF]/[0.05] blur-3xl transition duration-500 group-hover:bg-[#A259FF]/[0.09]" />

                <div className="relative z-10 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">

                    <div className="min-w-0">
                        <h2 className="text-base font-semibold text-white sm:text-lg">
                            Find Users
                        </h2>

                        <p className="mt-1 text-xs leading-5 text-[#606068] sm:text-sm">
                            Search registered accounts by
                            username or email address.
                        </p>
                    </div>

                    <div className="flex w-full min-w-0 flex-col gap-3 sm:flex-row lg:max-w-[650px]">

                        <div className="relative min-w-0 flex-1">

                            <Search
                                size={18}
                                className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-[#66666E]"
                            />

                            <input
                                type="text"
                                value={search}
                                onChange={(event) => {
                                    setSearch(
                                        event.target.value
                                    );
                                }}
                                placeholder="Search username or email..."
                                aria-label="Search users"
                                className="h-12 w-full min-w-0 rounded-2xl border border-white/[0.08] bg-white/[0.025] pl-11 pr-4 text-sm text-white outline-none transition-all duration-300 placeholder:text-[#55555D] hover:border-white/[0.12] focus:border-[#A259FF]/40 focus:bg-white/[0.04] focus:ring-4 focus:ring-[#A259FF]/[0.06]"
                            />

                        </div>

                        <motion.button
                            type="button"
                            onClick={fetchUsers}
                            disabled={loading}
                            whileHover={
                                loading
                                    ? {}
                                    : {
                                          y: -2,
                                      }
                            }
                            whileTap={
                                loading
                                    ? {}
                                    : {
                                          scale: 0.98,
                                      }
                            }
                            className="inline-flex h-12 shrink-0 items-center justify-center gap-2 rounded-2xl border border-white/[0.08] bg-white/[0.035] px-5 text-sm font-semibold text-white transition-all duration-300 hover:border-[#A259FF]/30 hover:bg-[#A259FF]/[0.08] disabled:cursor-not-allowed disabled:opacity-50"
                        >
                            <RefreshCw
                                size={16}
                                className={
                                    loading
                                        ? "animate-spin"
                                        : ""
                                }
                            />

                            Refresh
                        </motion.button>

                    </div>

                </div>
            </motion.section>

            {/* =========================
                REGISTERED USERS TABLE
            ========================== */}

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
                    delay: 0.15,
                    duration: 0.45,
                }}
                className="group relative min-w-0 overflow-hidden rounded-[26px] bg-[#111114] shadow-[0_15px_50px_rgba(0,0,0,0.15)]"
            >
                {/* EDGE GLOW */}

                <span className="pointer-events-none absolute left-0 top-0 z-20 h-full w-[2px] bg-gradient-to-b from-transparent via-[#A259FF] to-transparent opacity-0 blur-[1px] transition-opacity duration-300 group-hover:opacity-100" />

                <span className="pointer-events-none absolute right-0 top-0 z-20 h-full w-[2px] bg-gradient-to-b from-transparent via-[#A259FF] to-transparent opacity-0 blur-[1px] transition-opacity duration-300 group-hover:opacity-100" />

                {/* TABLE HEADER */}

                <div className="flex flex-col gap-3 border-b border-white/[0.06] px-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-6 sm:py-5">

                    <div className="min-w-0">

                        <h2 className="text-base font-semibold text-white sm:text-lg">
                            Registered Users
                        </h2>

                        <p className="mt-1 text-[11px] text-[#606068] sm:text-xs">
                            User records loaded securely
                            from MongoDB.
                        </p>

                    </div>

                    <div className="flex w-fit shrink-0 items-center gap-2 rounded-full bg-[#A259FF]/[0.08] px-3 py-1.5 text-[11px] font-semibold text-[#B978FF] sm:text-xs">
                        <ShieldCheck
                            size={14}
                        />

                        {loading
                            ? "Loading"
                            : `${filteredUsers.length} users`}
                    </div>

                </div>

                {/* ERROR STATE */}

                {error && (
                    <motion.div
                        initial={{
                            opacity: 0,
                            y: -6,
                        }}
                        animate={{
                            opacity: 1,
                            y: 0,
                        }}
                        className="mx-4 mt-4 rounded-2xl border border-red-400/15 bg-red-400/[0.05] px-4 py-3 text-sm leading-6 text-red-300 sm:mx-6"
                    >
                        {error}
                    </motion.div>
                )}

                {/* LOADING STATE */}

                {loading ? (
                    <div className="flex min-h-[280px] flex-col items-center justify-center px-5">

                        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#A259FF]/[0.08] text-[#B978FF]">
                            <RefreshCw
                                size={23}
                                className="animate-spin"
                            />
                        </div>

                        <p className="mt-4 text-sm font-semibold text-white">
                            Loading registered users
                        </p>

                        <p className="mt-1 text-xs text-[#66666E]">
                            Fetching latest data from MongoDB...
                        </p>

                    </div>
                ) : filteredUsers.length === 0 ? (
                    /* EMPTY STATE */

                    <div className="flex min-h-[280px] flex-col items-center justify-center px-5 text-center">

                        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/[0.04] text-[#66666E] ring-1 ring-white/[0.06]">
                            <UsersRound
                                size={25}
                            />
                        </div>

                        <h3 className="mt-4 text-base font-semibold text-white">
                            {search.trim()
                                ? "No users found"
                                : "No registered users"}
                        </h3>

                        <p className="mt-1 max-w-sm text-sm leading-6 text-[#66666E]">
                            {search.trim()
                                ? "Try another username or email address."
                                : "Newly registered users will appear here."}
                        </p>

                        {search.trim() && (
                            <button
                                type="button"
                                onClick={() => {
                                    setSearch("");
                                }}
                                className="mt-4 rounded-xl px-4 py-2 text-xs font-semibold text-[#B978FF] transition hover:bg-[#A259FF]/[0.08] hover:text-white"
                            >
                                Clear Search
                            </button>
                        )}

                    </div>
                ) : (
                    /* USERS TABLE */

                    <div className="admin-content-scroll w-full min-w-0 overflow-x-auto">

                        <table className="w-full min-w-[760px] border-collapse">

                            <thead>
                                <tr className="border-b border-white/[0.06] text-left">

                                    <th className="px-5 py-4 text-[10px] font-semibold uppercase tracking-[0.16em] text-[#66666E] sm:px-6">
                                        User
                                    </th>

                                    <th className="px-5 py-4 text-[10px] font-semibold uppercase tracking-[0.16em] text-[#66666E]">
                                        Email
                                    </th>

                                    <th className="px-5 py-4 text-[10px] font-semibold uppercase tracking-[0.16em] text-[#66666E]">
                                        Joined
                                    </th>

                                    <th className="px-5 py-4 text-[10px] font-semibold uppercase tracking-[0.16em] text-[#66666E]">
                                        Last Login
                                    </th>

                                    <th className="px-5 py-4 text-[10px] font-semibold uppercase tracking-[0.16em] text-[#66666E]">
                                        Status
                                    </th>

                                </tr>
                            </thead>

                            <tbody>
                                {filteredUsers.map(
                                    (user, index) => (
                                        <motion.tr
                                            key={user._id}
                                            initial={{
                                                opacity: 0,
                                                y: 8,
                                            }}
                                            animate={{
                                                opacity: 1,
                                                y: 0,
                                            }}
                                            transition={{
                                                delay:
                                                    index *
                                                    0.035,
                                                duration: 0.3,
                                            }}
                                            className="group/row border-b border-white/[0.05] transition-colors duration-300 hover:bg-white/[0.025] last:border-b-0"
                                        >

                                            {/* USER */}

                                            <td className="px-5 py-4 sm:px-6">

                                                <div className="flex min-w-0 items-center gap-3">

                                                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-[#A259FF]/20 to-[#4DA6FF]/20 text-sm font-bold text-white ring-1 ring-white/[0.06] transition-all duration-300 group-hover/row:scale-105 group-hover/row:ring-[#A259FF]/30">
                                                        {user.username
                                                            ?.charAt(0)
                                                            ?.toUpperCase() ||
                                                            "U"}
                                                    </div>

                                                    <div className="min-w-0">

                                                        <p className="max-w-[180px] truncate text-sm font-semibold text-white">
                                                            {user.username ||
                                                                "Unnamed User"}
                                                        </p>

                                                        <p className="mt-1 max-w-[180px] truncate text-[10px] text-[#62626A] sm:text-[11px]">
                                                            ID:{" "}
                                                            {user._id}
                                                        </p>

                                                    </div>

                                                </div>

                                            </td>

                                            {/* EMAIL */}

                                            <td className="px-5 py-4">

                                                <div className="flex min-w-0 items-center gap-2">

                                                    <Mail
                                                        size={15}
                                                        className="shrink-0 text-[#66666E]"
                                                    />

                                                    <span className="max-w-[220px] truncate text-sm text-[#B4B4BC]">
                                                        {user.email}
                                                    </span>

                                                </div>

                                            </td>

                                            {/* JOINED */}

                                            <td className="px-5 py-4">

                                                <div className="flex items-center gap-2 whitespace-nowrap text-xs text-[#B4B4BC] sm:text-sm">

                                                    <CalendarDays
                                                        size={15}
                                                        className="shrink-0 text-[#66666E]"
                                                    />

                                                    {formatDate(
                                                        user.createdAt
                                                    )}

                                                </div>

                                            </td>

                                            {/* LAST LOGIN */}

                                            <td className="px-5 py-4">

                                                <div className="flex items-center gap-2 whitespace-nowrap text-xs text-[#B4B4BC] sm:text-sm">

                                                    <Clock3
                                                        size={15}
                                                        className="shrink-0 text-[#66666E]"
                                                    />

                                                    {formatDateTime(
                                                        user.lastLoginAt
                                                    )}

                                                </div>

                                            </td>

                                            {/* STATUS */}

                                            <td className="px-5 py-4">

                                                <span className="inline-flex items-center gap-2 rounded-full bg-[#0ACF83]/[0.08] px-3 py-1.5 text-[10px] font-bold text-[#32D997] sm:text-[11px]">

                                                    <span className="h-1.5 w-1.5 rounded-full bg-[#32D997]" />

                                                    Active

                                                </span>

                                            </td>

                                        </motion.tr>
                                    )
                                )}
                            </tbody>

                        </table>

                    </div>
                )}

                {/* TABLE FOOTER */}

                {!loading && filteredUsers.length > 0 && (
                    <div className="flex flex-col gap-2 border-t border-white/[0.06] px-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-6">

                        <p className="text-[11px] text-[#606068] sm:text-xs">
                            Showing{" "}
                            <span className="font-semibold text-[#B4B4BC]">
                                {filteredUsers.length}
                            </span>{" "}
                            of{" "}
                            <span className="font-semibold text-[#B4B4BC]">
                                {users.length}
                            </span>{" "}
                            registered users
                        </p>

                        <p className="flex items-center gap-2 text-[10px] text-[#55555D] sm:text-[11px]">
                            <span className="h-1.5 w-1.5 rounded-full bg-[#0ACF83]" />

                            Secure admin access
                        </p>

                    </div>
                )}

            </motion.section>
        </div>
    );
};

export default AdminUsers;