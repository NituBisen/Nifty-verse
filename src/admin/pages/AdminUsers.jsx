import React, { useEffect, useState } from "react";

import {
    Search,
    RefreshCw,
    UserRound,
    Mail,
    CalendarDays,
    Clock3,
    UsersRound,
} from "lucide-react";

import { motion } from "framer-motion";

const API_URL =
    import.meta.env.VITE_API_URL ||
    "https://nifty-verse-backend-production.up.railway.app";

const AdminUsers = () => {
    const [users, setUsers] = useState([]);
    const [filteredUsers, setFilteredUsers] = useState([]);
    const [search, setSearch] = useState("");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const fetchUsers = async () => {
        try {
            setLoading(true);
            setError("");

            const response = await fetch(
                `${API_URL}/api/admin/users`
            );

            const data = await response.json();

            if (!response.ok) {
                throw new Error(
                    data.message ||
                    "Failed to fetch users"
                );
            }

            setUsers(data.users || []);
            setFilteredUsers(data.users || []);
        } catch (error) {
            console.error(
                "Fetch users error:",
                error
            );

            setError(
                error.message ||
                "Failed to load users"
            );
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    useEffect(() => {
        const query =
            search
                .toLowerCase()
                .trim();

        if (!query) {
            setFilteredUsers(users);
            return;
        }

        const filtered = users.filter(
            (user) =>
                user.username
                    ?.toLowerCase()
                    .includes(query) ||
                user.email
                    ?.toLowerCase()
                    .includes(query)
        );

        setFilteredUsers(filtered);
    }, [search, users]);

    const formatDate = (date) => {
        if (!date) {
            return "—";
        }

        return new Date(
            date
        ).toLocaleDateString(
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

        return new Date(
            date
        ).toLocaleString(
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

    return (
        <div className="w-full max-w-full min-w-0">
            <motion.div
                initial={{
                    opacity: 0,
                    y: 12,
                }}
                animate={{
                    opacity: 1,
                    y: 0,
                }}
                transition={{
                    duration: 0.35,
                }}
                className="w-full min-w-0"
            >
                <div className="mb-6 flex min-w-0 flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div className="min-w-0">
                        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#66666E]">
                            User Management
                        </p>

                        <h1 className="mt-1 break-words text-2xl font-bold tracking-tight text-white sm:text-3xl">
                            Users
                        </h1>

                        <p className="mt-2 max-w-2xl text-sm leading-6 text-[#77777F]">
                            View and manage registered users of the Nifty Verse marketplace.
                        </p>
                    </div>

                    <button
                        type="button"
                        onClick={fetchUsers}
                        disabled={loading}
                        className="inline-flex shrink-0 items-center justify-center gap-2 rounded-xl border border-white/[0.08] bg-white/[0.03] px-4 py-2.5 text-sm font-semibold text-white transition hover:border-[#A259FF]/40 hover:bg-[#A259FF]/10 disabled:cursor-not-allowed disabled:opacity-50"
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
                    </button>
                </div>

                <div className="mb-5 grid min-w-0 grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    <div className="min-w-0 rounded-2xl border border-white/[0.07] bg-[#111114] p-4 sm:p-5">
                        <div className="flex items-center justify-between gap-3">
                            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#A259FF]/10 text-[#B978FF]">
                                <UsersRound
                                    size={21}
                                />
                            </div>

                            <span className="truncate text-xs font-medium text-[#66666E]">
                                Total Users
                            </span>
                        </div>

                        <p className="mt-4 break-all text-2xl font-bold text-white sm:text-3xl">
                            {users.length}
                        </p>
                    </div>

                    <div className="min-w-0 rounded-2xl border border-white/[0.07] bg-[#111114] p-4 sm:p-5">
                        <div className="flex items-center justify-between gap-3">
                            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#4DA6FF]/10 text-[#72B9FF]">
                                <UserRound
                                    size={21}
                                />
                            </div>

                            <span className="truncate text-xs font-medium text-[#66666E]">
                                Showing
                            </span>
                        </div>

                        <p className="mt-4 break-all text-2xl font-bold text-white sm:text-3xl">
                            {filteredUsers.length}
                        </p>
                    </div>

                    <div className="min-w-0 rounded-2xl border border-white/[0.07] bg-[#111114] p-4 sm:p-5 sm:col-span-2 lg:col-span-1">
                        <div className="flex items-center justify-between gap-3">
                            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-400">
                                <Clock3
                                    size={21}
                                />
                            </div>

                            <span className="truncate text-xs font-medium text-[#66666E]">
                                Latest User
                            </span>
                        </div>

                        <p className="mt-4 min-w-0 truncate text-lg font-bold text-white sm:text-xl">
                            {users[0]?.username ||
                                "—"}
                        </p>
                    </div>
                </div>

                <div className="mb-5 flex min-w-0 flex-col gap-3 sm:flex-row">
                    <div className="relative min-w-0 flex-1">
                        <Search
                            size={18}
                            className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-[#66666E]"
                        />

                        <input
                            type="text"
                            value={search}
                            onChange={(event) =>
                                setSearch(
                                    event.target.value
                                )
                            }
                            placeholder="Search username or email..."
                            className="h-12 w-full min-w-0 rounded-xl border border-white/[0.08] bg-[#111114] pl-11 pr-4 text-sm text-white outline-none placeholder:text-[#55555D] transition focus:border-[#A259FF]/50"
                        />
                    </div>
                </div>

                {error && (
                    <div className="mb-5 rounded-xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-300">
                        {error}
                    </div>
                )}

                <div className="min-w-0 overflow-hidden rounded-2xl border border-white/[0.07] bg-[#111114]">
                    <div className="border-b border-white/[0.07] px-4 py-4 sm:px-5">
                        <h2 className="text-base font-bold text-white sm:text-lg">
                            Registered Users
                        </h2>

                        <p className="mt-1 text-xs text-[#66666E] sm:text-sm">
                            Real users loaded from MongoDB.
                        </p>
                    </div>

                    {loading ? (
                        <div className="flex min-h-[260px] items-center justify-center px-5">
                            <div className="flex items-center gap-3 text-sm text-[#77777F]">
                                <RefreshCw
                                    size={18}
                                    className="animate-spin"
                                />

                                Loading users...
                            </div>
                        </div>
                    ) : filteredUsers.length === 0 ? (
                        <div className="flex min-h-[260px] flex-col items-center justify-center px-5 text-center">
                            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/[0.04] text-[#66666E]">
                                <UsersRound
                                    size={24}
                                />
                            </div>

                            <h3 className="mt-4 text-base font-bold text-white">
                                No users found
                            </h3>

                            <p className="mt-1 max-w-sm text-sm text-[#66666E]">
                                No registered users match your current search.
                            </p>
                        </div>
                    ) : (
                        <div className="w-full min-w-0 overflow-x-auto">
                            <table className="w-full min-w-[760px] border-collapse">
                                <thead>
                                    <tr className="border-b border-white/[0.07] text-left">
                                        <th className="px-5 py-4 text-xs font-semibold uppercase tracking-wider text-[#66666E]">
                                            User
                                        </th>

                                        <th className="px-5 py-4 text-xs font-semibold uppercase tracking-wider text-[#66666E]">
                                            Email
                                        </th>

                                        <th className="px-5 py-4 text-xs font-semibold uppercase tracking-wider text-[#66666E]">
                                            Joined
                                        </th>

                                        <th className="px-5 py-4 text-xs font-semibold uppercase tracking-wider text-[#66666E]">
                                            Last Login
                                        </th>

                                        <th className="px-5 py-4 text-xs font-semibold uppercase tracking-wider text-[#66666E]">
                                            Status
                                        </th>
                                    </tr>
                                </thead>

                                <tbody>
                                    {filteredUsers.map(
                                        (
                                            user,
                                            index
                                        ) => (
                                            <motion.tr
                                                key={
                                                    user._id
                                                }
                                                initial={{
                                                    opacity: 0,
                                                }}
                                                animate={{
                                                    opacity: 1,
                                                }}
                                                transition={{
                                                    delay:
                                                        index *
                                                        0.03,
                                                }}
                                                className="border-b border-white/[0.05] transition hover:bg-white/[0.02]"
                                            >
                                                <td className="px-5 py-4">
                                                    <div className="flex min-w-0 items-center gap-3">
                                                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-[#A259FF]/20 to-[#4DA6FF]/20 text-sm font-bold text-white">
                                                            {user.username
                                                                ?.charAt(
                                                                    0
                                                                )
                                                                ?.toUpperCase() ||
                                                                "U"}
                                                        </div>

                                                        <div className="min-w-0">
                                                            <p className="truncate text-sm font-semibold text-white">
                                                                {user.username ||
                                                                    "Unnamed User"}
                                                            </p>

                                                            <p className="truncate text-xs text-[#66666E]">
                                                                ID:{" "}
                                                                {user._id}
                                                            </p>
                                                        </div>
                                                    </div>
                                                </td>

                                                <td className="px-5 py-4">
                                                    <div className="flex min-w-0 items-center gap-2">
                                                        <Mail
                                                            size={
                                                                15
                                                            }
                                                            className="shrink-0 text-[#66666E]"
                                                        />

                                                        <span className="truncate text-sm text-[#B4B4BC]">
                                                            {
                                                                user.email
                                                            }
                                                        </span>
                                                    </div>
                                                </td>

                                                <td className="px-5 py-4">
                                                    <div className="flex items-center gap-2 whitespace-nowrap text-sm text-[#B4B4BC]">
                                                        <CalendarDays
                                                            size={
                                                                15
                                                            }
                                                            className="shrink-0 text-[#66666E]"
                                                        />

                                                        {
                                                            formatDate(
                                                                user.createdAt
                                                            )
                                                        }
                                                    </div>
                                                </td>

                                                <td className="px-5 py-4">
                                                    <div className="flex items-center gap-2 whitespace-nowrap text-sm text-[#B4B4BC]">
                                                        <Clock3
                                                            size={
                                                                15
                                                            }
                                                            className="shrink-0 text-[#66666E]"
                                                        />

                                                        {
                                                            formatDateTime(
                                                                user.lastLoginAt
                                                            )
                                                        }
                                                    </div>
                                                </td>

                                                <td className="px-5 py-4">
                                                    <span className="inline-flex items-center gap-2 rounded-full bg-emerald-500/10 px-3 py-1.5 text-xs font-semibold text-emerald-400">
                                                        <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
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
                </div>
            </motion.div>
        </div>
    );
};

export default AdminUsers;