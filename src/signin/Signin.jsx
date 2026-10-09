import React, { useEffect, useState } from "react";
import Navbar from "../common/Navbar";
import Footer from "../common/Footer";
import { Mail, LockKeyhole } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import astronautImage from "../assets/logo/create-account-astronaut.png";

const API_URL =
    import.meta.env.VITE_API_URL ||
    "https://nifty-verse-backend-production.up.railway.app";

const Signin = () => {
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    const [message, setMessage] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const [checkingSession, setCheckingSession] = useState(
        () => Boolean(localStorage.getItem("token"))
    );

    const navigate = useNavigate();

    // VERIFY EXISTING SESSION
    useEffect(() => {
        const token = localStorage.getItem("token");

        if (!token) {
            setCheckingSession(false);
            return undefined;
        }

        let cancelled = false;

        const verifyExistingSession = async () => {
            try {
                const response = await fetch(
                    `${API_URL}/api/auth/me`,
                    {
                        method: "GET",
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );

                const data = await response.json().catch(() => ({}));

                if (cancelled) {
                    return;
                }

                if (response.status === 401) {
                    localStorage.removeItem("token");
                    localStorage.removeItem("user");
                    return;
                }

                if (
                    response.ok &&
                    data.success &&
                    data.user
                ) {
                    localStorage.setItem(
                        "user",
                        JSON.stringify(data.user)
                    );

                    navigate("/user/dashboard", {
                        replace: true,
                    });

                    return;
                }

                if (!response.ok) {
                    setError(
                        data.message ||
                        "We could not verify your saved session. Please sign in again."
                    );
                }
            } catch (sessionError) {
                console.error(
                    "Session verification error:",
                    sessionError
                );

                if (!cancelled) {
                    setError(
                        "Unable to verify your saved session. Check your connection and try again."
                    );
                }
            } finally {
                if (!cancelled) {
                    setCheckingSession(false);
                }
            }
        };

        verifyExistingSession();

        return () => {
            cancelled = true;
        };
    }, [navigate]);

    // HANDLE INPUT
    const handleChange = (event) => {
        const { name, value } = event.target;

        setFormData((previous) => ({
            ...previous,
            [name]: value,
        }));
    };

    // HANDLE SIGN IN
    const handleSubmit = async (event) => {
        event.preventDefault();

        setMessage("");
        setError("");

        if (
            !formData.email.trim() ||
            !formData.password
        ) {
            setError("Please enter your email and password.");
            return;
        }

        try {
            setLoading(true);

            const response = await fetch(
                `${API_URL}/api/auth/signin`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        email: formData.email.trim(),
                        password: formData.password,
                    }),
                }
            );

            const contentType =
                response.headers.get("content-type");

            let data;

            if (
                contentType &&
                contentType.includes("application/json")
            ) {
                data = await response.json();
            } else {
                const responseText = await response.text();

                data = {
                    message: responseText || "Login failed.",
                };
            }

            if (!response.ok) {
                throw new Error(
                    data.message || "Login failed."
                );
            }

            if (!data.token || !data.user) {
                throw new Error(
                    "The server did not return a valid login session."
                );
            }

            // SAVE TOKEN
            localStorage.setItem(
                "token",
                data.token
            );

            // SAVE USER
            localStorage.setItem(
                "user",
                JSON.stringify(data.user)
            );

            setMessage(
                data.message || "Login successful!"
            );

            setFormData({
                email: "",
                password: "",
            });

            // OPEN USER DASHBOARD
            navigate("/user/dashboard", {
                replace: true,
            });
        } catch (submitError) {
            console.error(
                "Sign in error:",
                submitError
            );

            setError(
                submitError.message ||
                "Something went wrong. Please try again."
            );
        } finally {
            setLoading(false);
        }
    };

    // SESSION LOADING
    if (checkingSession) {
        return (
            <div className="flex min-h-screen items-center justify-center bg-[#08080A] text-white">
                <div className="flex items-center gap-3 text-sm text-[#A7A7AF]">
                    <span className="h-5 w-5 animate-spin rounded-full border-2 border-[#A259FF]/30 border-t-[#A259FF]" />
                    Checking your session...
                </div>
            </div>
        );
    }

    // SIGN IN UI
    return (
        <div className="bg-[#000]">
            <section className="w-full">
                <Navbar />

                <div className="mx-auto max-w-[1400px] px-4 py-14 sm:px-6 md:py-20 lg:px-10">
                    <div className="flex flex-col items-stretch overflow-hidden rounded-2xl lg:flex-row">
                        {/* LEFT IMAGE */}
                        <div className="w-full shrink-0 lg:w-1/2">
                            <img
                                src={astronautImage}
                                alt="Astronauts approaching a spacecraft"
                                className="h-[520px] w-full object-cover sm:h-[360px] lg:h-full"
                            />
                        </div>

                        {/* RIGHT FORM */}
                        <div className="flex w-full items-center bg-[#1e1c1c] px-1 py-10 sm:px-4 lg:w-1/2 lg:px-12">
                            <div className="mx-auto w-full max-w-md lg:mx-0">
                                {/* HEADING */}
                                <h2 className="bg-[linear-gradient(90deg,#F7C6E7_0%,#A259FF_5%,#4DA6FF_80%)] bg-clip-text text-3xl font-bold text-transparent sm:text-4xl">
                                    Sign In
                                </h2>

                                <p className="mt-4 text-base leading-relaxed text-gray-300 sm:text-lg">
                                    Welcome back! Enter your details to access your NFT account.
                                </p>

                                {/* FORM */}
                                <form
                                    onSubmit={handleSubmit}
                                    className="mt-8 flex flex-col gap-4"
                                >
                                    {/* EMAIL */}
                                    <div className="relative">
                                        <Mail className="absolute left-5 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />

                                        <input
                                            type="email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleChange}
                                            placeholder="Email Address"
                                            required
                                            autoComplete="email"
                                            className="h-[52px] w-full rounded-full bg-white pl-12 pr-5 text-base text-gray-900 outline-none placeholder:text-gray-500 sm:h-[55px]"
                                        />
                                    </div>

                                    {/* PASSWORD */}
                                    <div className="relative">
                                        <LockKeyhole className="absolute left-5 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />

                                        <input
                                            type="password"
                                            name="password"
                                            value={formData.password}
                                            onChange={handleChange}
                                            placeholder="Password"
                                            required
                                            autoComplete="current-password"
                                            className="h-[52px] w-full rounded-full bg-white pl-12 pr-5 text-base text-gray-900 outline-none placeholder:text-gray-500 sm:h-[55px]"
                                        />
                                    </div>

                                    {/* FORGOT PASSWORD */}
                                    <div className="-mt-2 flex justify-end">
                                        <Link
                                            to="/forgot-password"
                                            className="text-sm font-semibold text-[#A259FF] transition hover:text-[#C084FC]"
                                        >
                                            Forgot Password?
                                        </Link>
                                    </div>

                                    {/* ERROR */}
                                    {error && (
                                        <p
                                            role="alert"
                                            className="text-sm font-medium text-red-400"
                                        >
                                            {error}
                                        </p>
                                    )}

                                    {/* SUCCESS */}
                                    {message && (
                                        <p
                                            role="status"
                                            className="text-sm font-medium text-green-400"
                                        >
                                            {message}
                                        </p>
                                    )}

                                    {/* SIGN IN BUTTON */}
                                    <button
                                        type="submit"
                                        disabled={loading}
                                        className="mt-2 h-[52px] w-full rounded-full bg-[#7a39d0] text-base font-bold text-white transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60 sm:h-[55px]"
                                    >
                                        {loading
                                            ? "Signing In..."
                                            : "Sign In"}
                                    </button>
                                </form>

                                {/* CREATE ACCOUNT */}
                                <div className="mt-4 flex flex-col items-center justify-center gap-2 sm:flex-row">
                                    <span className="text-sm text-gray-400">
                                        Don't have an account?
                                    </span>

                                    <Link
                                        to="/create-account"
                                        className="text-sm font-semibold text-[#A259FF] transition hover:text-[#C084FC]"
                                    >
                                        Create Account
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    );
};

export default Signin;