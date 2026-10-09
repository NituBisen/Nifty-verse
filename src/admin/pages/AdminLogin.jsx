import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
    ArrowLeft,
    CheckCircle2,
    Eye,
    EyeOff,
    KeyRound,
    LockKeyhole,
    Mail,
    ShieldCheck,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import logo from "../../assets/logo/logo.png";

const API_URL =
    import.meta.env.VITE_API_URL ||
    "https://nifty-verse-backend-production.up.railway.app";

const AdminLogin = () => {
    const navigate = useNavigate();

    const [mode, setMode] = useState("signin");
    const [adminId, setAdminId] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [otp, setOtp] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [message, setMessage] = useState("");

    useEffect(() => {
        const token = localStorage.getItem("adminToken");

        if (token) {
            navigate("/admin/dashboard", {
                replace: true,
            });
        }
    }, [navigate]);

    const clearFeedback = () => {
        setError("");
        setMessage("");
    };

    const startForgotPassword = () => {
        clearFeedback();
        setMode("sendOtp");
    };

    const backToSignin = () => {
        clearFeedback();
        setMode("signin");
        setOtp("");
        setNewPassword("");
        setConfirmPassword("");
    };

    const readResponse = async (response) => {
        let data = {};

        try {
            data = await response.json();
        } catch {
            data = {};
        }

        if (!response.ok) {
            throw new Error(
                data.message || "Request failed. Please try again."
            );
        }

        return data;
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        clearFeedback();

        if (!adminId.trim() || !password) {
            setError("Please enter your admin ID and password.");
            return;
        }

        try {
            setLoading(true);

            const response = await fetch(
                `${API_URL}/api/admin/auth/signin`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        adminId: adminId.trim(),
                        password,
                    }),
                }
            );

            const data = await readResponse(response);

            if (!data.token) {
                throw new Error("Admin token was not received.");
            }

            localStorage.setItem("adminToken", data.token);
            localStorage.setItem("admin", JSON.stringify(data.admin));

            navigate("/admin/dashboard", {
                replace: true,
            });
        } catch (submitError) {
            console.error("Admin login error:", submitError);
            setError(
                submitError.message || "Unable to sign in as admin."
            );
        } finally {
            setLoading(false);
        }
    };

    const handleSendOtp = async (event) => {
        if (event) {
            event.preventDefault();
        }

        clearFeedback();

        if (!adminId.trim() || !email.trim()) {
            setError("Please enter your admin ID and registered email.");
            return;
        }

        try {
            setLoading(true);

            const response = await fetch(
                `${API_URL}/api/admin/auth/send-otp`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        adminId: adminId.trim(),
                        email: email.trim().toLowerCase(),
                    }),
                }
            );

            const data = await readResponse(response);

            setMode("verifyOtp");
            setMessage(
                data.message ||
                    "If the admin ID and email match an account, an OTP will be sent."
            );
        } catch (sendError) {
            console.error("Admin send OTP error:", sendError);
            setError(
                sendError.message || "Unable to send OTP. Please try again."
            );
        } finally {
            setLoading(false);
        }
    };

    const handleVerifyOtp = async (event) => {
        event.preventDefault();
        clearFeedback();

        if (!/^\d{6}$/.test(otp)) {
            setError("Please enter the six-digit OTP sent to your email.");
            return;
        }

        try {
            setLoading(true);

            const response = await fetch(
                `${API_URL}/api/admin/auth/verify-otp`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        adminId: adminId.trim(),
                        email: email.trim().toLowerCase(),
                        otp,
                    }),
                }
            );

            const data = await readResponse(response);

            setMode("resetPassword");
            setMessage(data.message || "OTP verified successfully.");
        } catch (verifyError) {
            console.error("Admin OTP verification error:", verifyError);
            setError(
                verifyError.message || "OTP verification failed."
            );
        } finally {
            setLoading(false);
        }
    };

    const handleResetPassword = async (event) => {
        event.preventDefault();
        clearFeedback();

        if (newPassword.length < 6) {
            setError("Password must contain at least 6 characters.");
            return;
        }

        if (newPassword !== confirmPassword) {
            setError("Passwords do not match.");
            return;
        }

        try {
            setLoading(true);

            const response = await fetch(
                `${API_URL}/api/admin/auth/reset-password`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        adminId: adminId.trim(),
                        email: email.trim().toLowerCase(),
                        otp,
                        newPassword,
                    }),
                }
            );

            const data = await readResponse(response);

            setMode("signin");
            setPassword("");
            setOtp("");
            setNewPassword("");
            setConfirmPassword("");
            setMessage(
                data.message ||
                    "Password reset successfully. Sign in with your new password."
            );
        } catch (resetError) {
            console.error("Admin password reset error:", resetError);
            setError(
                resetError.message || "Unable to reset password."
            );
        } finally {
            setLoading(false);
        }
    };

    const title =
        mode === "signin"
            ? "Sign In"
            : mode === "sendOtp"
              ? "Forgot Password"
              : mode === "verifyOtp"
                ? "Verify OTP"
                : "Reset Password";

    const description =
        mode === "signin"
            ? "Sign in to manage the Nifty Verse marketplace."
            : mode === "sendOtp"
              ? "Verify your admin account to reset your password."
              : mode === "verifyOtp"
                ? "Enter the six-digit code sent to your email."
                : "Create a new secure password for your admin account.";

    return (
        <div className="min-h-screen bg-[#08080A] px-4 py-8 text-white sm:px-6 lg:px-8">
            <div className="pointer-events-none fixed inset-0 overflow-hidden">
                <div className="absolute -left-24 -top-24 h-72 w-72 rounded-full bg-[#A259FF]/10 blur-3xl" />
                <div className="absolute -bottom-28 -right-24 h-80 w-80 rounded-full bg-[#4DA6FF]/10 blur-3xl" />
                <div className="absolute left-1/2 top-1/2 h-96 w-96 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#A259FF]/5 blur-[120px]" />
            </div>

            <div className="relative flex min-h-[calc(100vh-4rem)] items-center justify-center">
                <motion.div
                    initial={{
                        opacity: 0,
                        y: 18,
                    }}
                    animate={{
                        opacity: 1,
                        y: 0,
                    }}
                    transition={{
                        duration: 0.45,
                        ease: "easeOut",
                    }}
                    className="w-full max-w-[450px]"
                >
                    <div className="mb-6 text-center">
                        <motion.div
                            initial={{
                                opacity: 0,
                                scale: 0.94,
                            }}
                            animate={{
                                opacity: 1,
                                scale: 1,
                            }}
                            transition={{
                                delay: 0.08,
                                duration: 0.4,
                            }}
                            className="mx-auto mb-6 flex h-20 w-20 items-center justify-center overflow-hidden rounded-[24px] border border-white/[0.08] bg-white/[0.035] p-3 shadow-[0_0_45px_rgba(162,89,255,0.12)]"
                        >
                            <img
                                src={logo}
                                alt="Nifty Verse"
                                className="h-full w-full object-contain"
                            />
                        </motion.div>

                        <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[#66666E] sm:text-xs">
                            Admin Workspace
                        </p>

                        <h1 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
                            Admin{" "}
                            <span className="bg-[linear-gradient(90deg,#C47BFF,#6DB8FF)] bg-clip-text text-transparent">
                                {title}
                            </span>
                        </h1>

                        <p className="mt-2 text-sm leading-6 text-[#77777F]">
                            {description}
                        </p>
                    </div>

                    <motion.div
                        initial={{
                            opacity: 0,
                            y: 14,
                        }}
                        animate={{
                            opacity: 1,
                            y: 0,
                        }}
                        transition={{
                            delay: 0.12,
                            duration: 0.45,
                        }}
                        whileHover={{
                            y: -2,
                        }}
                        className="group relative overflow-hidden rounded-[28px] bg-[#111114] p-5 shadow-[0_20px_70px_rgba(0,0,0,0.28)] sm:p-7"
                    >
                        <div className="pointer-events-none absolute -left-16 -top-16 h-48 w-48 rounded-full bg-[#A259FF]/8 blur-3xl transition duration-500 group-hover:bg-[#A259FF]/12" />
                        <div className="pointer-events-none absolute -bottom-20 -right-16 h-52 w-52 rounded-full bg-[#4DA6FF]/7 blur-3xl transition duration-500 group-hover:bg-[#4DA6FF]/11" />

                        <div className="relative z-10">
                            <div className="mb-6 flex items-center gap-3">
                                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border border-white/[0.08] bg-white/[0.035] text-[#B978FF]">
                                    {mode === "signin" ? (
                                        <ShieldCheck size={21} strokeWidth={1.8} />
                                    ) : mode === "sendOtp" ? (
                                        <Mail size={21} strokeWidth={1.8} />
                                    ) : mode === "verifyOtp" ? (
                                        <ShieldCheck size={21} strokeWidth={1.8} />
                                    ) : (
                                        <KeyRound size={21} strokeWidth={1.8} />
                                    )}
                                </div>

                                <div>
                                    <p className="text-sm font-semibold text-white">
                                        {mode === "signin"
                                            ? "Secure Admin Access"
                                            : mode === "sendOtp"
                                              ? "Recover Admin Account"
                                              : mode === "verifyOtp"
                                                ? "OTP Verification"
                                                : "Create New Password"}
                                    </p>
                                    <p className="mt-0.5 text-xs text-[#66666E]">
                                        {mode === "signin"
                                            ? "JWT protected authentication"
                                            : "Secure email-based verification"}
                                    </p>
                                </div>
                            </div>

                            {mode === "signin" && (
                                <form onSubmit={handleSubmit} className="space-y-5">
                                    <div>
                                        <label htmlFor="adminId" className="mb-2 block text-xs font-semibold text-[#8A8A92]">
                                            Admin ID
                                        </label>
                                        <div className="relative">
                                            <LockKeyhole size={17} className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-[#66666E]" />
                                            <input
                                                id="adminId"
                                                type="text"
                                                value={adminId}
                                                onChange={(event) => setAdminId(event.target.value)}
                                                placeholder="Enter admin ID"
                                                autoComplete="username"
                                                disabled={loading}
                                                className="h-12 w-full rounded-2xl border border-white/[0.08] bg-white/[0.03] pl-11 pr-4 text-sm text-white outline-none transition-all duration-300 placeholder:text-[#4F4F56] focus:border-[#A259FF]/40 focus:bg-white/[0.045] focus:ring-4 focus:ring-[#A259FF]/8 disabled:cursor-not-allowed disabled:opacity-60"
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <label htmlFor="password" className="mb-2 block text-xs font-semibold text-[#8A8A92]">
                                            Password
                                        </label>
                                        <div className="relative">
                                            <LockKeyhole size={17} className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-[#66666E]" />
                                            <input
                                                id="password"
                                                type={showPassword ? "text" : "password"}
                                                value={password}
                                                onChange={(event) => setPassword(event.target.value)}
                                                placeholder="Enter password"
                                                autoComplete="current-password"
                                                disabled={loading}
                                                className="h-12 w-full rounded-2xl border border-white/[0.08] bg-white/[0.03] pl-11 pr-12 text-sm text-white outline-none transition-all duration-300 placeholder:text-[#4F4F56] focus:border-[#A259FF]/40 focus:bg-white/[0.045] focus:ring-4 focus:ring-[#A259FF]/8 disabled:cursor-not-allowed disabled:opacity-60"
                                            />
                                            <button
                                                type="button"
                                                onClick={() => setShowPassword((current) => !current)}
                                                disabled={loading}
                                                className="absolute right-3 top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-xl text-[#66666E] transition-colors duration-200 hover:bg-white/[0.05] hover:text-white disabled:cursor-not-allowed disabled:opacity-50"
                                                aria-label={showPassword ? "Hide password" : "Show password"}
                                            >
                                                {showPassword ? <EyeOff size={17} /> : <Eye size={17} />}
                                            </button>
                                        </div>
                                        <div className="mt-3 flex justify-end">
                                            <button
                                                type="button"
                                                onClick={startForgotPassword}
                                                disabled={loading}
                                                className="text-xs font-semibold text-[#B978FF] transition-colors hover:text-[#7DBBFF] disabled:opacity-60"
                                            >
                                                Forgot password?
                                            </button>
                                        </div>
                                    </div>

                                    {error && <FeedbackBox type="error">{error}</FeedbackBox>}
                                    {message && <FeedbackBox type="success">{message}</FeedbackBox>}

                                    <PrimaryButton loading={loading} loadingText="Signing in...">
                                        Sign In to Admin Panel
                                    </PrimaryButton>
                                </form>
                            )}

                            {mode === "sendOtp" && (
                                <form onSubmit={handleSendOtp} className="space-y-5">
                                    <div>
                                        <label htmlFor="forgotAdminId" className="mb-2 block text-xs font-semibold text-[#8A8A92]">
                                            Admin ID
                                        </label>
                                        <div className="relative">
                                            <LockKeyhole size={17} className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-[#66666E]" />
                                            <input
                                                id="forgotAdminId"
                                                type="text"
                                                value={adminId}
                                                onChange={(event) => setAdminId(event.target.value)}
                                                placeholder="Enter admin ID"
                                                autoComplete="username"
                                                disabled={loading}
                                                className="h-12 w-full rounded-2xl border border-white/[0.08] bg-white/[0.03] pl-11 pr-4 text-sm text-white outline-none transition-all duration-300 placeholder:text-[#4F4F56] focus:border-[#A259FF]/40 focus:bg-white/[0.045] focus:ring-4 focus:ring-[#A259FF]/8 disabled:cursor-not-allowed disabled:opacity-60"
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <label htmlFor="adminEmail" className="mb-2 block text-xs font-semibold text-[#8A8A92]">
                                            Registered Admin Email
                                        </label>
                                        <div className="relative">
                                            <Mail size={17} className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-[#66666E]" />
                                            <input
                                                id="adminEmail"
                                                type="email"
                                                value={email}
                                                onChange={(event) => setEmail(event.target.value)}
                                                placeholder="Enter registered email"
                                                autoComplete="email"
                                                disabled={loading}
                                                className="h-12 w-full rounded-2xl border border-white/[0.08] bg-white/[0.03] pl-11 pr-4 text-sm text-white outline-none transition-all duration-300 placeholder:text-[#4F4F56] focus:border-[#A259FF]/40 focus:bg-white/[0.045] focus:ring-4 focus:ring-[#A259FF]/8 disabled:cursor-not-allowed disabled:opacity-60"
                                            />
                                        </div>
                                    </div>

                                    {error && <FeedbackBox type="error">{error}</FeedbackBox>}
                                    {message && <FeedbackBox type="success">{message}</FeedbackBox>}

                                    <PrimaryButton loading={loading} loadingText="Sending OTP...">
                                        Send Reset OTP
                                    </PrimaryButton>
                                    <BackButton onClick={backToSignin} disabled={loading} />
                                </form>
                            )}

                            {mode === "verifyOtp" && (
                                <form onSubmit={handleVerifyOtp} className="space-y-5">
                                    <div>
                                        <label htmlFor="adminOtp" className="mb-2 block text-xs font-semibold text-[#8A8A92]">
                                            Six-Digit OTP
                                        </label>
                                        <div className="relative">
                                            <ShieldCheck size={17} className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-[#66666E]" />
                                            <input
                                                id="adminOtp"
                                                type="text"
                                                inputMode="numeric"
                                                maxLength={6}
                                                value={otp}
                                                onChange={(event) => setOtp(event.target.value.replace(/\D/g, "").slice(0, 6))}
                                                placeholder="Enter OTP"
                                                autoComplete="one-time-code"
                                                disabled={loading}
                                                className="h-12 w-full rounded-2xl border border-white/[0.08] bg-white/[0.03] pl-11 pr-4 text-sm tracking-[0.3em] text-white outline-none transition-all duration-300 placeholder:tracking-normal placeholder:text-[#4F4F56] focus:border-[#A259FF]/40 focus:bg-white/[0.045] focus:ring-4 focus:ring-[#A259FF]/8 disabled:cursor-not-allowed disabled:opacity-60"
                                            />
                                        </div>
                                        <p className="mt-2 text-xs text-[#66666E]">
                                            For your security, use the OTP promptly. It may expire after a short period.
                                        </p>
                                    </div>

                                    {error && <FeedbackBox type="error">{error}</FeedbackBox>}
                                    {message && <FeedbackBox type="success">{message}</FeedbackBox>}

                                    <PrimaryButton loading={loading} loadingText="Verifying OTP...">
                                        Verify OTP
                                    </PrimaryButton>
                                    <button
                                        type="button"
                                        onClick={handleSendOtp}
                                        disabled={loading}
                                        className="w-full text-xs font-semibold text-[#B978FF] transition-colors hover:text-[#7DBBFF] disabled:opacity-60"
                                    >
                                        Resend OTP
                                    </button>
                                    <BackButton onClick={() => { clearFeedback(); setMode("sendOtp"); }} disabled={loading} label="Back" />
                                </form>
                            )}

                            {mode === "resetPassword" && (
                                <form onSubmit={handleResetPassword} className="space-y-5">
                                    <PasswordField
                                        id="newAdminPassword"
                                        label="New Password"
                                        value={newPassword}
                                        onChange={setNewPassword}
                                        showPassword={showNewPassword}
                                        togglePassword={() => setShowNewPassword((current) => !current)}
                                        placeholder="Create new password"
                                        disabled={loading}
                                    />
                                    <PasswordField
                                        id="confirmAdminPassword"
                                        label="Confirm New Password"
                                        value={confirmPassword}
                                        onChange={setConfirmPassword}
                                        showPassword={showConfirmPassword}
                                        togglePassword={() => setShowConfirmPassword((current) => !current)}
                                        placeholder="Confirm new password"
                                        disabled={loading}
                                    />

                                    {error && <FeedbackBox type="error">{error}</FeedbackBox>}
                                    {message && <FeedbackBox type="success">{message}</FeedbackBox>}

                                    <PrimaryButton loading={loading} loadingText="Updating password...">
                                        Reset Admin Password
                                    </PrimaryButton>
                                    <BackButton onClick={() => { clearFeedback(); setMode("verifyOtp"); }} disabled={loading} label="Back to OTP" />
                                </form>
                            )}
                        </div>
                    </motion.div>

                    <p className="mt-5 text-center text-[11px] leading-5 text-[#55555C]">
                        Authorized administrators only.
                    </p>
                </motion.div>
            </div>
        </div>
    );
};

const FeedbackBox = ({ type, children }) => {
    const isSuccess = type === "success";

    return (
        <motion.div
            initial={{
                opacity: 0,
                y: -6,
            }}
            animate={{
                opacity: 1,
                y: 0,
            }}
            className={
                isSuccess
                    ? "flex items-start gap-2 rounded-2xl border border-emerald-400/15 bg-emerald-400/5 px-4 py-3 text-sm leading-5 text-emerald-300"
                    : "rounded-2xl border border-red-400/15 bg-red-400/5 px-4 py-3 text-sm leading-5 text-red-300"
            }
        >
            {isSuccess && <CheckCircle2 size={17} className="mt-0.5 shrink-0" />}
            <span>{children}</span>
        </motion.div>
    );
};

const PrimaryButton = ({ loading, loadingText, children }) => (
    <motion.button
        type="submit"
        disabled={loading}
        whileHover={loading ? {} : { y: -2 }}
        whileTap={loading ? {} : { scale: 0.985 }}
        className="flex h-12 w-full items-center justify-center rounded-2xl bg-[linear-gradient(90deg,#A259FF,#6DAEFF)] text-sm font-bold text-white shadow-[0_12px_30px_rgba(162,89,255,0.18)] transition-all duration-300 hover:shadow-[0_16px_40px_rgba(162,89,255,0.28)] disabled:cursor-not-allowed disabled:opacity-60"
    >
        {loading ? (
            <span className="flex items-center gap-2">
                <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                {loadingText}
            </span>
        ) : (
            children
        )}
    </motion.button>
);

const BackButton = ({ onClick, disabled, label = "Back to Sign In" }) => (
    <button
        type="button"
        onClick={onClick}
        disabled={disabled}
        className="flex w-full items-center justify-center gap-2 rounded-xl py-2 text-xs font-semibold text-[#77777F] transition-colors hover:text-white disabled:opacity-60"
    >
        <ArrowLeft size={14} />
        {label}
    </button>
);

const PasswordField = ({
    id,
    label,
    value,
    onChange,
    showPassword,
    togglePassword,
    placeholder,
    disabled,
}) => (
    <div>
        <label htmlFor={id} className="mb-2 block text-xs font-semibold text-[#8A8A92]">
            {label}
        </label>
        <div className="relative">
            <LockKeyhole size={17} className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-[#66666E]" />
            <input
                id={id}
                type={showPassword ? "text" : "password"}
                value={value}
                onChange={(event) => onChange(event.target.value)}
                placeholder={placeholder}
                autoComplete="new-password"
                disabled={disabled}
                className="h-12 w-full rounded-2xl border border-white/[0.08] bg-white/[0.03] pl-11 pr-12 text-sm text-white outline-none transition-all duration-300 placeholder:text-[#4F4F56] focus:border-[#A259FF]/40 focus:bg-white/[0.045] focus:ring-4 focus:ring-[#A259FF]/8 disabled:cursor-not-allowed disabled:opacity-60"
            />
            <button
                type="button"
                onClick={togglePassword}
                disabled={disabled}
                className="absolute right-3 top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-xl text-[#66666E] transition-colors duration-200 hover:bg-white/[0.05] hover:text-white disabled:cursor-not-allowed disabled:opacity-50"
                aria-label={showPassword ? "Hide password" : "Show password"}
            >
                {showPassword ? <EyeOff size={17} /> : <Eye size={17} />}
            </button>
        </div>
    </div>
);

export default AdminLogin;
