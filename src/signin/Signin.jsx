import React, { useState } from "react";
import Navbar from "../common/Navbar";
import Footer from "../common/Footer";
import { Mail, LockKeyhole } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import astronautImage from "../assets/logo/create-account-astronaut.png";

const Signin = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setMessage("");
    setError("");

    try {
      setLoading(true);

      const response = await fetch("http://localhost:5000/api/auth/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Login failed");
      }

      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));

      setMessage(data.message);

      setFormData({
        email: "",
        password: "",
      });

      setTimeout(() => {
        navigate("/");
      }, 1000);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-[#000]">
    <section className="w-full">
    <Navbar />

      <div className="mx-auto max-w-[1400px] px-4 py-14 sm:px-6 md:py-20 lg:px-10">
        <div className="flex flex-col items-stretch overflow-hidden rounded-2xl lg:flex-row">

          {/* Left Image */}
          <div className="w-full shrink-0 lg:w-1/2">
            <img
              src={astronautImage}
              alt="Astronauts approaching a spacecraft"
              className="h-[520px] w-full object-cover sm:h-[360px] lg:h-full"
            />
          </div>

          {/* Right Form */}
          <div className="flex w-full items-center bg-[#1e1c1c] px-1 py-10 sm:px-4 lg:w-1/2 lg:px-12 lg:py-0">
            <div className="mx-auto w-full max-w-md lg:mx-0">

              <h2 className="bg-[linear-gradient(90deg,#F7C6E7_0%,#A259FF_5%,#4DA6FF_80%)] bg-clip-text text-3xl font-bold text-transparent sm:text-4xl">
                Sign In
              </h2>

              <p className="mt-4 text-base leading-relaxed text-gray-300 sm:text-lg">
                Welcome back! Enter your details to access your NFT account.
              </p>

              <form
                onSubmit={handleSubmit}
                className="mt-8 flex flex-col gap-4"
              >

                {/* Email */}
                <div className="relative">
                  <Mail className="absolute left-5 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />

                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Email Address"
                    required
                    className="h-[52px] w-full rounded-full bg-white pl-12 pr-5 text-base text-gray-900 outline-none placeholder-gray-500 sm:h-[55px]"
                  />
                </div>

                {/* Password */}
                <div className="relative">
                  <LockKeyhole className="absolute left-5 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />

                  <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Password"
                    required
                    className="h-[52px] w-full rounded-full bg-white pl-12 pr-5 text-base text-gray-900 outline-none placeholder-gray-500 sm:h-[55px]"
                  />
                </div>

                {/* Error */}
                {error && (
                  <p className="text-sm font-medium text-red-400">
                    {error}
                  </p>
                )}

                {/* Success */}
                {message && (
                  <p className="text-sm font-medium text-green-400">
                    {message}
                  </p>
                )}

                {/* Sign In Button */}
                <button
                  type="submit"
                  disabled={loading}
                  className="mt-2 h-[52px] w-full rounded-full bg-[#7a39d0] text-base font-bold text-white transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60 sm:h-[55px]"
                >
                  {loading ? "Signing In..." : "Sign In"}
                </button>
              </form>

              {/* Create Account Link */}
              <div className="mt-4 flex flex-col items-center gap-2 sm:flex-row sm:justify-center">
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