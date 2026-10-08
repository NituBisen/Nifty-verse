import React, { useState } from "react";
import Navbar from "../common/Navbar";
import Footer from "../common/Footer";
import { Mail, LockKeyhole, ShieldCheck } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import astronautImage from "../assets/logo/create-account-astronaut.png";

const ForgotPassword = () => {
  const navigate = useNavigate();

  const API_URL =
    import.meta.env.VITE_API_URL ||
    "https://nifty-verse-backend-production.up.railway.app";

  const [step, setStep] = useState(1);

  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  // ================= SEND OTP =================
  const handleSendOTP = async (e) => {
    e.preventDefault();

    setError("");
    setMessage("");

    if (!email.trim()) {
      setError("Please enter your email address.");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(`${API_URL}/api/auth/send-otp`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to send OTP.");
      }

      setMessage(data.message || "OTP sent successfully to your email.");
      setStep(2);
    } catch (err) {
      setError(err.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  // ================= VERIFY OTP =================
  const handleVerifyOTP = async (e) => {
    e.preventDefault();

    setError("");
    setMessage("");

    if (!otp.trim()) {
      setError("Please enter the OTP.");
      return;
    }

    if (otp.length !== 6) {
      setError("OTP must be 6 digits.");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(`${API_URL}/api/auth/verify-otp`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          otp,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Invalid OTP.");
      }

      setMessage(data.message || "OTP verified successfully.");
      setStep(3);
    } catch (err) {
      setError(err.message || "Invalid OTP.");
    } finally {
      setLoading(false);
    }
  };

  // ================= RESET PASSWORD =================
  const handleResetPassword = async (e) => {
    e.preventDefault();

    setError("");
    setMessage("");

    if (!newPassword || !confirmPassword) {
      setError("Please enter both password fields.");
      return;
    }

    if (newPassword.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }

    if (newPassword !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(`${API_URL}/api/auth/reset-password`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          otp,
          newPassword,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to reset password.");
      }

      setMessage(
        data.message || "Password reset successfully. You can now sign in."
      );

      setTimeout(() => {
        navigate("/signin");
      }, 1500);
    } catch (err) {
      setError(err.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  // ================= BACK =================
  const handleBack = () => {
    setError("");
    setMessage("");

    if (step === 2) {
      setStep(1);
    } else if (step === 3) {
      setStep(2);
    }
  };

  return (
    <div className="min-h-screen text-white bg-black">
      <Navbar />

      <main className="flex items-center mx-auto px-6 py-12 min-h-[calc(100vh-80px)] w-full max-w-[1400px] lg:px-10">
        <div className="grid items-center gap-12 w-full lg:grid-cols-2 gap-20">

          {/* ================= LEFT IMAGE ================= */}
          <div className="hidden items-center justify-center lg:flex">
            <img
              src={astronautImage}
              alt="Astronaut"
              className="object-contain w-full max-w-[560px]"
            />
          </div>

          {/* ================= RIGHT FORM ================= */}
          <div className="mx-auto w-full max-w-[520px]">

            {/* Heading */}
            <div className="mb-8 text-center lg:text-left">
              <h1 className="text-4xl font-bold text-transparent bg-gradient-to-r from-[#A259FF] via-[#C084FC] to-[#A259FF] bg-clip-text sm:text-5xl">
                Forgot Password?
              </h1>

              <p className="mt-3 text-sm leading-6 text-gray-400 sm:text-base">
                {step === 1 &&
                  "Enter your registered email address and we will send you an OTP."}

                {step === 2 &&
                  "Enter the 6-digit OTP sent to your email address."}

                {step === 3 &&
                  "Create a new password for your account."}
              </p>
            </div>

            {/* ================= FORM CARD ================= */}
            <div className="p-6 bg-[#111111] rounded-2xl border-[#292929] shadow-2xl border sm:p-8">

              {/* ================= STEP 1 ================= */}
              {step === 1 && (
                <form onSubmit={handleSendOTP} className="space-y-6">

                  <div>
                    <label className="block mb-2 text-sm font-semibold text-white">
                      Email Address
                    </label>

                    <div className="relative">
                      <Mail
                        size={20}
                        className="absolute left-4 top-1/2 text-gray-500 -translate-y-1/2"
                      />

                      <input
                        type="email"
                        placeholder="Enter your email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="py-4 pl-12 pr-4 placeholder-gray-500 w-full text-white bg-[#1A1A1A] rounded-xl border-[#333] outline-none border transition focus:border-[#A259FF]"
                      />
                    </div>
                  </div>

                  {/* Error */}
                  {error && (
                    <div className="px-4 py-3 text-sm text-red-400 bg-red-500/10 rounded-lg border-red-500/30 border">
                      {error}
                    </div>
                  )}

                  {/* Success */}
                  {message && (
                    <div className="px-4 py-3 text-sm text-green-400 bg-green-500/10 rounded-lg border-green-500/30 border">
                      {message}
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={loading}
                    className="py-4 w-full font-semibold text-white bg-gradient-to-r from-[#A259FF] to-[#7B2FFF] rounded-xl transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    {loading ? "Sending OTP..." : "Send OTP"}
                  </button>

                  <div className="text-center">
                    <Link
                      to="/signin"
                      className="text-sm font-semibold text-[#A259FF] transition hover:text-[#C084FC]"
                    >
                      ← Back to Sign In
                    </Link>
                  </div>
                </form>
              )}

              {/* ================= STEP 2 ================= */}
              {step === 2 && (
                <form onSubmit={handleVerifyOTP} className="space-y-6">

                  <div>
                    <label className="block mb-2 text-sm font-semibold text-white">
                      Enter OTP
                    </label>

                    <div className="relative">
                      <ShieldCheck
                        size={20}
                        className="absolute left-4 top-1/2 text-gray-500 -translate-y-1/2"
                      />

                      <input
                        type="text"
                        inputMode="numeric"
                        maxLength={6}
                        placeholder="Enter 6-digit OTP"
                        value={otp}
                        onChange={(e) =>
                          setOtp(e.target.value.replace(/\D/g, ""))
                        }
                        className="py-4 pl-12 pr-4 placeholder:text-left placeholder:tracking-normal placeholder:text-gray-500 w-full text-center tracking-[8px] text-white bg-[#1A1A1A] rounded-xl border-[#333] outline-none border transition focus:border-[#A259FF]"
                      />
                    </div>
                  </div>

                  <p className="text-center text-sm text-gray-400">
                    OTP sent to{" "}
                    <span className="font-semibold text-white">
                      {email}
                    </span>
                  </p>

                  {/* Error */}
                  {error && (
                    <div className="px-4 py-3 text-sm text-red-400 bg-red-500/10 rounded-lg border-red-500/30 border">
                      {error}
                    </div>
                  )}

                  {/* Success */}
                  {message && (
                    <div className="px-4 py-3 text-sm text-green-400 bg-green-500/10 rounded-lg border-green-500/30 border">
                      {message}
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={loading}
                    className="py-4 w-full font-semibold text-white bg-gradient-to-r from-[#A259FF] to-[#7B2FFF] rounded-xl transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    {loading ? "Verifying..." : "Verify OTP"}
                  </button>

                  <div className="flex items-center justify-between text-sm">
                    <button
                      type="button"
                      onClick={handleBack}
                      className="font-semibold text-gray-400 transition hover:text-white"
                    >
                      ← Change Email
                    </button>

                    <button
                      type="button"
                      onClick={handleSendOTP}
                      disabled={loading}
                      className="font-semibold text-[#A259FF] transition hover:text-[#C084FC]"
                    >
                      Resend OTP
                    </button>
                  </div>
                </form>
              )}

              {/* ================= STEP 3 ================= */}
              {step === 3 && (
                <form onSubmit={handleResetPassword} className="space-y-5">

                  {/* New Password */}
                  <div>
                    <label className="block mb-2 text-sm font-semibold text-white">
                      New Password
                    </label>

                    <div className="relative">
                      <LockKeyhole
                        size={20}
                        className="absolute left-4 top-1/2 text-gray-500 -translate-y-1/2"
                      />

                      <input
                        type="password"
                        placeholder="Enter new password"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        className="py-4 pl-12 pr-4 placeholder-gray-500 w-full text-white bg-[#1A1A1A] rounded-xl border-[#333] outline-none border transition focus:border-[#A259FF]"
                      />
                    </div>
                  </div>

                  {/* Confirm Password */}
                  <div>
                    <label className="block mb-2 text-sm font-semibold text-white">
                      Confirm Password
                    </label>

                    <div className="relative">
                      <LockKeyhole
                        size={20}
                        className="absolute left-4 top-1/2 text-gray-500 -translate-y-1/2"
                      />

                      <input
                        type="password"
                        placeholder="Confirm new password"
                        value={confirmPassword}
                        onChange={(e) =>
                          setConfirmPassword(e.target.value)
                        }
                        className="py-4 pl-12 pr-4 placeholder-gray-500 w-full text-white bg-[#1A1A1A] rounded-xl border-[#333] outline-none border transition focus:border-[#A259FF]"
                      />
                    </div>
                  </div>

                  {/* Error */}
                  {error && (
                    <div className="px-4 py-3 text-sm text-red-400 bg-red-500/10 rounded-lg border-red-500/30 border">
                      {error}
                    </div>
                  )}

                  {/* Success */}
                  {message && (
                    <div className="px-4 py-3 text-sm text-green-400 bg-green-500/10 rounded-lg border-green-500/30 border">
                      {message}
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={loading}
                    className="py-4 w-full font-semibold text-white bg-gradient-to-r from-[#A259FF] to-[#7B2FFF] rounded-xl transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    {loading ? "Resetting Password..." : "Reset Password"}
                  </button>

                  <div className="text-center">
                    <button
                      type="button"
                      onClick={handleBack}
                      className="text-sm font-semibold text-gray-400 transition hover:text-white"
                    >
                      ← Back to OTP
                    </button>
                  </div>
                </form>
              )}
            </div>

            {/* Bottom Sign In */}
            <div className="mt-6 text-center">
              <span className="text-sm text-gray-400">
                Remember your password?{" "}
              </span>

              <Link
                to="/signin"
                className="text-sm font-semibold text-[#A259FF] hover:text-[#C084FC]"
              >
                Sign In
              </Link>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ForgotPassword;