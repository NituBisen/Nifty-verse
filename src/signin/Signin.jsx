import React, { useState } from "react";
import Navbar from "../common/Navbar";
import Footer from "../common/Footer";

import {
  Mail,
  LockKeyhole,
} from "lucide-react";

import {
  Link,
  useNavigate,
} from "react-router-dom";

import astronautImage from "../assets/logo/create-account-astronaut.png";

// =========================================================
// SIGN IN
// =========================================================

const Signin = () => {
  // =======================================================
  // FORM DATA
  // =======================================================

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  // =======================================================
  // STATES
  // =======================================================

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  // =======================================================
  // API URL
  // =======================================================

  const API_URL =
    import.meta.env.VITE_API_URL ||
    "https://nifty-verse-backend-production.up.railway.app";

  // =======================================================
  // HANDLE INPUT
  // =======================================================

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // =======================================================
  // HANDLE SIGN IN
  // =======================================================

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Clear previous messages
    setMessage("");
    setError("");

    // Basic validation
    if (!formData.email || !formData.password) {
      setError("Please enter your email and password.");
      return;
    }

    try {
      setLoading(true);

      // ===================================================
      // API REQUEST
      // ===================================================

      const response = await fetch(
        `${API_URL}/api/auth/signin`,
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify(formData),
        }
      );

      // ===================================================
      // RESPONSE
      // ===================================================

      const contentType =
        response.headers.get("content-type");

      let data;

      if (
        contentType &&
        contentType.includes("application/json")
      ) {
        data = await response.json();
      } else {
        const text = await response.text();

        data = {
          message: text || "Login failed",
        };
      }

      // ===================================================
      // CHECK RESPONSE
      // ===================================================

      if (!response.ok) {
        throw new Error(
          data.message || "Login failed"
        );
      }

      // ===================================================
      // SAVE TOKEN
      // ===================================================

      if (data.token) {
        localStorage.setItem(
          "token",
          data.token
        );
      }

      // ===================================================
      // SAVE USER
      // ===================================================

      if (data.user) {
        localStorage.setItem(
          "user",
          JSON.stringify(data.user)
        );
      }

      // ===================================================
      // SUCCESS MESSAGE
      // ===================================================

      setMessage(
        data.message || "Login successful!"
      );

      // ===================================================
      // CLEAR FORM
      // ===================================================

      setFormData({
        email: "",
        password: "",
      });

      // ===================================================
      // GO TO USER PROFILE
      // ===================================================

      setTimeout(() => {
        navigate("/profile");
      }, 1000);

    } catch (error) {
      console.error("Sign in error:", error);

      setError(
        error.message ||
          "Something went wrong. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  // =======================================================
  // UI
  // =======================================================

  return (
    <div className="bg-[#000]">

      {/* =================================================
          NAVBAR
      ================================================= */}

      <section className="w-full">
        <Navbar />

        {/* ===============================================
            SIGN IN CONTAINER
        =============================================== */}

        <div className="mx-auto px-4 py-14 max-w-[1400px] sm:px-6 md:py-20 lg:px-10">

          <div className="overflow-hidden flex flex-col items-stretch rounded-2xl lg:flex-row">

            {/* ===========================================
                LEFT IMAGE
            =========================================== */}

            <div className="w-full shrink-0 lg:w-1/2">

              <img
                src={astronautImage}
                alt="Astronauts approaching a spacecraft"
                className="object-cover h-[520px] w-full sm:h-[360px] lg:h-full"
              />

            </div>

            {/* ===========================================
                RIGHT FORM
            =========================================== */}

            <div className="flex items-center px-1 py-10 w-full bg-[#1e1c1c] sm:px-4 lg:px-12 w-1/2">

              <div className="mx-auto w-full max-w-md lg:mx-0">

                {/* =======================================
                    HEADING
                ======================================= */}

                <h2 className="text-3xl font-bold text-transparent bg-[linear-gradient(90deg,#F7C6E7_0%,#A259FF_5%,#4DA6FF_80%)] bg-clip-text sm:text-4xl">
                  Sign In
                </h2>

                {/* =======================================
                    DESCRIPTION
                ======================================= */}

                <p className="mt-4 text-base leading-relaxed text-gray-300 sm:text-lg">
                  Welcome back! Enter your details to
                  access your NFT account.
                </p>

                {/* =======================================
                    FORM
                ======================================= */}

                <form
                  onSubmit={handleSubmit}
                  className="flex flex-col gap-4 mt-8"
                >

                  {/* =====================================
                      EMAIL
                  ===================================== */}

                  <div className="relative">

                    <Mail className="absolute left-5 top-1/2 h-5 w-5 text-gray-400 -translate-y-1/2" />

                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="Email Address"
                      required
                      autoComplete="email"
                      className="pl-12 pr-5 placeholder:text-gray-500 h-[52px] w-full text-base text-gray-900 bg-white rounded-full outline-none sm:h-[55px]"
                    />

                  </div>

                  {/* =====================================
                      PASSWORD
                  ===================================== */}

                  <div className="relative">

                    <LockKeyhole className="absolute left-5 top-1/2 h-5 w-5 text-gray-400 -translate-y-1/2" />

                    <input
                      type="password"
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      placeholder="Password"
                      required
                      autoComplete="current-password"
                      className="pl-12 pr-5 placeholder:text-gray-500 h-[52px] w-full text-base text-gray-900 bg-white rounded-full outline-none sm:h-[55px]"
                    />

                  </div>

                  {/* =====================================
                      FORGOT PASSWORD
                  ===================================== */}

                  <div className="flex justify-end -mt-2">

                    <Link
                      to="/forgot-password"
                      className="text-sm font-semibold text-[#A259FF] transition hover:text-[#C084FC]"
                    >
                      Forgot Password?
                    </Link>

                  </div>

                  {/* =====================================
                      ERROR
                  ===================================== */}

                  {error && (
                    <p className="text-sm font-medium text-red-400">
                      {error}
                    </p>
                  )}

                  {/* =====================================
                      SUCCESS
                  ===================================== */}

                  {message && (
                    <p className="text-sm font-medium text-green-400">
                      {message}
                    </p>
                  )}

                  {/* =====================================
                      SIGN IN BUTTON
                  ===================================== */}

                  <button
                    type="submit"
                    disabled={loading}
                    className="mt-2 h-[52px] w-full text-base font-bold text-white bg-[#7a39d0] rounded-full transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60 sm:h-[55px]"
                  >
                    {loading
                      ? "Signing In..."
                      : "Sign In"}
                  </button>

                </form>

                {/* =======================================
                    CREATE ACCOUNT
                ======================================= */}

                <div className="flex flex-col items-center justify-center gap-2 mt-4 sm:flex-row">

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

      {/* =================================================
          FOOTER
      ================================================= */}

      <Footer />

    </div>
  );
};

export default Signin;