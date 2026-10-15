
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { UserRound, ShieldCheck, Mail, LockKeyhole, Eye, EyeOff, Save, RefreshCw, CheckCircle2, AlertCircle, Clock3 } from "lucide-react";

const API_URL = "https://nifty-verse-backend-production.up.railway.app/api/admin/settings";

const AdminSettings = () => {
    const [admin, setAdmin] = useState(null);
    const [email, setEmail] = useState("");
    const [profileLoading, setProfileLoading] = useState(true);
    const [profileSaving, setProfileSaving] = useState(false);
    const [passwordSaving, setPasswordSaving] = useState(false);
    const [message, setMessage] = useState({ type: "", text: "" });
    const [passwords, setPasswords] = useState({ currentPassword: "", newPassword: "", confirmPassword: "" });
    const [showPasswords, setShowPasswords] = useState({ currentPassword: false, newPassword: false, confirmPassword: false });

    const token = localStorage.getItem("adminToken");

    const request = async (url, options = {}) => {
        const response = await fetch(url, {
            ...options,
            headers: {
                Authorization: `Bearer ${token}`,
                ...(options.body ? { "Content-Type": "application/json" } : {}),
                ...options.headers
            }
        });

        const data = await response.json().catch(() => ({}));

        if (!response.ok) {
            throw new Error(data.message || "Something went wrong.");
        }

        return data;
    };

    const showMessage = (type, text) => {
        setMessage({ type, text });
    };

    const loadSettings = async () => {
        setProfileLoading(true);
        try {
            const data = await request(API_URL);
            setAdmin(data.admin);
            setEmail(data.admin.email || "");
        } catch (error) {
            showMessage("error", error.message);
        } finally {
            setProfileLoading(false);
        }
    };

    useEffect(() => {
        loadSettings();
    }, []);

    const handleProfileSave = async (event) => {
        event.preventDefault();
        setMessage({ type: "", text: "" });

        if (!email.trim()) {
            showMessage("error", "Email address is required.");
            return;
        }

        setProfileSaving(true);
        try {
            const data = await request(API_URL, {
                method: "PATCH",
                body: JSON.stringify({ email: email.trim() })
            });

            setAdmin((previous) => ({ ...previous, ...data.admin }));
            setEmail(data.admin.email);
            showMessage("success", data.message || "Profile updated successfully.");
        } catch (error) {
            showMessage("error", error.message);
        } finally {
            setProfileSaving(false);
        }
    };

    const handlePasswordSave = async (event) => {
        event.preventDefault();
        setMessage({ type: "", text: "" });

        if (passwords.newPassword.length < 8) {
            showMessage("error", "New password must contain at least 8 characters.");
            return;
        }

        if (passwords.newPassword !== passwords.confirmPassword) {
            showMessage("error", "New password and confirmation do not match.");
            return;
        }

        setPasswordSaving(true);
        try {
            const data = await request(`${API_URL}/password`, {
                method: "PATCH",
                body: JSON.stringify(passwords)
            });

            setPasswords({ currentPassword: "", newPassword: "", confirmPassword: "" });
            showMessage("success", data.message || "Password changed successfully.");
        } catch (error) {
            showMessage("error", error.message);
        } finally {
            setPasswordSaving(false);
        }
    };

    const togglePassword = (field) => {
        setShowPasswords((previous) => ({ ...previous, [field]: !previous[field] }));
    };

    const inputClass = "mt-2 w-full rounded-xl border border-white/[0.09] bg-[#0B0B0E] px-4 py-3 text-sm text-white outline-none transition placeholder:text-[#55555F] focus:border-[#A259FF]/60 focus:ring-2 focus:ring-[#A259FF]/10";
    const cardClass = "relative overflow-hidden rounded-[24px] border border-white/[0.08] bg-[#111114] p-5 shadow-[0_18px_55px_rgba(0,0,0,0.16)] sm:p-7";

    const PasswordInput = ({ field, label, placeholder }) => (
        <div>
            <label htmlFor={field} className="text-sm font-medium text-[#B6B6BF]">{label}</label>
            <div className="relative">
                <input id={field} type={showPasswords[field] ? "text" : "password"} autoComplete="new-password" value={passwords[field]} onChange={(event) => setPasswords((previous) => ({ ...previous, [field]: event.target.value }))} placeholder={placeholder} className={`${inputClass} pr-12`} required minLength={field === "currentPassword" ? undefined : 8} maxLength={128} />
                <button type="button" onClick={() => togglePassword(field)} aria-label={showPasswords[field] ? "Hide password" : "Show password"} className="absolute right-3 top-1/2 mt-1 -translate-y-1/2 rounded-lg p-1.5 text-[#777783] transition hover:bg-white/[0.06] hover:text-white">
                    {showPasswords[field] ? <EyeOff size={17} /> : <Eye size={17} />}
                </button>
            </div>
        </div>
    );

    return (
        <div className="mx-auto w-full max-w-[1400px] space-y-7 text-white">
            <motion.section initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }} className="relative overflow-hidden rounded-[26px] border border-white/[0.08] bg-[#111114] p-6 sm:p-8 lg:p-9">
                <div className="pointer-events-none absolute -right-20 -top-28 h-72 w-72 rounded-full bg-[#A259FF]/15 blur-[100px]" />
                <div className="pointer-events-none absolute -bottom-36 left-1/3 h-60 w-60 rounded-full bg-[#55B7FF]/10 blur-[90px]" />
                <div className="relative flex flex-col justify-between gap-5 sm:flex-row sm:items-center">
                    <div>
                        <p className="text-[11px] font-bold uppercase tracking-[0.24em] text-[#B872FF]">Nifty Verse / Control Center</p>
                        <h1 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">Settings</h1>
                        <p className="mt-3 max-w-2xl text-sm leading-6 text-[#92929D]">Manage your administrator profile and keep your account secure.</p>
                    </div>
                    <div className="flex w-fit items-center gap-2 rounded-xl border border-emerald-400/15 bg-emerald-400/[0.06] px-3 py-2 text-xs font-medium text-emerald-300">
                        <ShieldCheck size={16} /> Secure admin area
                    </div>
                </div>
            </motion.section>

            {message.text && (
                <motion.div initial={{ opacity: 0, y: -6 }} animate={{ opacity: 1, y: 0 }} role="status" className={`flex items-start gap-3 rounded-2xl border px-4 py-3 text-sm ${message.type === "success" ? "border-emerald-400/20 bg-emerald-400/[0.06] text-emerald-300" : "border-red-400/20 bg-red-400/[0.06] text-red-300"}`}>
                    {message.type === "success" ? <CheckCircle2 size={18} className="mt-0.5 shrink-0" /> : <AlertCircle size={18} className="mt-0.5 shrink-0" />}
                    <span>{message.text}</span>
                    <button type="button" onClick={() => setMessage({ type: "", text: "" })} className="ml-auto text-lg leading-none opacity-70 hover:opacity-100" aria-label="Dismiss message">×</button>
                </motion.div>
            )}

            <div className="grid grid-cols-1 items-start gap-6 xl:grid-cols-[0.85fr_1.15fr]">
                <motion.section initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.08 }} className={cardClass}>
                    <div className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full bg-[#A259FF]/10 blur-[65px]" />
                    <div className="relative">
                        <div className="flex items-center gap-3">
                            <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-[#A259FF]/20 bg-[#A259FF]/10 text-[#B872FF]"><UserRound size={22} /></div>
                            <div>
                                <h2 className="text-lg font-bold">Admin Profile</h2>
                                <p className="mt-1 text-xs text-[#777783]">Your account information</p>
                            </div>
                        </div>

                        {profileLoading ? (
                            <div className="flex min-h-64 flex-col items-center justify-center gap-3 text-sm text-[#888893]"><RefreshCw size={22} className="animate-spin text-[#B872FF]" /> Loading profile...</div>
                        ) : (
                            <>
                                <div className="my-7 flex items-center gap-4 rounded-2xl border border-white/[0.07] bg-white/[0.02] p-4">
                                    <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-[#A259FF] to-[#55B7FF] text-xl font-bold shadow-lg shadow-purple-900/20">{(admin?.adminId || "A").charAt(0).toUpperCase()}</div>
                                    <div className="min-w-0">
                                        <p className="truncate font-semibold">{admin?.adminId || "Admin"}</p>
                                        <p className="mt-1 text-xs text-[#777783]">Administrator account</p>
                                        <span className="mt-2 inline-flex items-center gap-1.5 rounded-full border border-emerald-400/15 bg-emerald-400/[0.06] px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-emerald-300"><span className="h-1.5 w-1.5 rounded-full bg-emerald-400" /> Active</span>
                                    </div>
                                </div>

                                <form onSubmit={handleProfileSave} className="space-y-5">
                                    <div>
                                        <label htmlFor="adminId" className="text-sm font-medium text-[#B6B6BF]">Admin ID</label>
                                        <input id="adminId" value={admin?.adminId || ""} readOnly className={`${inputClass} cursor-not-allowed opacity-65`} />
                                        <p className="mt-2 text-xs text-[#666671]">Admin ID cannot be changed here.</p>
                                    </div>
                                    <div>
                                        <label htmlFor="adminEmail" className="flex items-center gap-2 text-sm font-medium text-[#B6B6BF]"><Mail size={15} /> Email address</label>
                                        <input id="adminEmail" type="email" autoComplete="email" value={email} onChange={(event) => setEmail(event.target.value)} placeholder="admin@example.com" className={inputClass} required maxLength={254} />
                                    </div>
                                    <button type="submit" disabled={profileSaving || !admin} className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#A259FF] to-[#647BFF] px-5 py-3 text-sm font-bold text-white shadow-lg shadow-purple-900/20 transition hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-50">
                                        {profileSaving ? <RefreshCw size={17} className="animate-spin" /> : <Save size={17} />} {profileSaving ? "Saving changes..." : "Save profile"}
                                    </button>
                                </form>

                                <div className="mt-6 flex items-start gap-3 rounded-xl border border-white/[0.06] bg-white/[0.02] p-3.5 text-xs leading-5 text-[#888893]">
                                    <Clock3 size={16} className="mt-0.5 shrink-0 text-[#A259FF]" />
                                    <span>Account created: {admin?.createdAt ? new Date(admin.createdAt).toLocaleDateString() : "Not available"}</span>
                                </div>
                            </>
                        )}
                    </div>
                </motion.section>

                <motion.section initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.16 }} className={cardClass}>
                    <div className="pointer-events-none absolute -bottom-20 -right-16 h-48 w-48 rounded-full bg-[#55B7FF]/10 blur-[75px]" />
                    <div className="relative">
                        <div className="flex items-center gap-3">
                            <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-[#55B7FF]/20 bg-[#55B7FF]/10 text-[#72C5FF]"><LockKeyhole size={22} /></div>
                            <div>
                                <h2 className="text-lg font-bold">Security & Password</h2>
                                <p className="mt-1 text-xs text-[#777783]">Keep your administrator account protected</p>
                            </div>
                        </div>

                        <div className="mt-7 rounded-2xl border border-[#55B7FF]/10 bg-[#55B7FF]/[0.035] p-4">
                            <div className="flex items-start gap-3">
                                <ShieldCheck size={19} className="mt-0.5 shrink-0 text-[#72C5FF]" />
                                <div>
                                    <p className="text-sm font-semibold text-[#D9EFFF]">Password protection</p>
                                    <p className="mt-1 text-xs leading-5 text-[#858590]">Use at least 8 characters. Your new password is securely hashed before it is stored.</p>
                                </div>
                            </div>
                        </div>

                        <form onSubmit={handlePasswordSave} className="mt-6 space-y-5">
                            <PasswordInput field="currentPassword" label="Current password" placeholder="Enter current password" />
                            <div className="h-px bg-white/[0.07]" />
                            <PasswordInput field="newPassword" label="New password" placeholder="Enter new password (min. 8 characters)" />
                            <PasswordInput field="confirmPassword" label="Confirm new password" placeholder="Re-enter new password" />
                            <button type="submit" disabled={passwordSaving} className="flex w-full items-center justify-center gap-2 rounded-xl border border-white/[0.1] bg-white/[0.045] px-5 py-3 text-sm font-bold text-white transition hover:border-[#55B7FF]/30 hover:bg-[#55B7FF]/[0.08] disabled:cursor-not-allowed disabled:opacity-50">
                                {passwordSaving ? <RefreshCw size={17} className="animate-spin" /> : <ShieldCheck size={17} />} {passwordSaving ? "Updating password..." : "Update password"}
                            </button>
                        </form>
                    </div>
                </motion.section>
            </div>

            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.25 }} className="flex items-center justify-center gap-2 pb-2 text-center text-xs text-[#666671]">
                <ShieldCheck size={14} className="text-[#A259FF]" /> Your account settings are protected by administrator authentication.
            </motion.div>
        </div>
    );
};

export default AdminSettings;
