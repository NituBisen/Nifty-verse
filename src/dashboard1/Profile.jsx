
import React, { useEffect, useState } from "react";
import {
  Copy,
  Edit3,
  Mail,
  Share2,
  WalletCards,
  LogOut,
  Save,
  X,
  Camera,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import profileBg from "../assets/images/profile-bg.png";

const getCurrentUser = () => {
  try {
    const savedUser = localStorage.getItem("user");
    return savedUser ? JSON.parse(savedUser) : null;
  } catch (error) {
    console.error("Unable to read user:", error);
    return null;
  }
};

const getInitials = (name = "User") =>
  String(name)
    .trim()
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part.charAt(0).toUpperCase())
    .join("") || "U";

const shortenWallet = (wallet = "") => {
  if (!wallet) return "Wallet not connected";
  if (wallet.length <= 18) return wallet;
  return `${wallet.slice(0, 8)}...${wallet.slice(-6)}`;
};

export default function Profile() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [editing, setEditing] = useState(false);
  const [message, setMessage] = useState("");

  const [form, setForm] = useState({
    name: "",
    username: "",
    email: "",
    bio: "",
    walletAddress: "",
    profileImage: "",
  });

  useEffect(() => {
    const currentUser = getCurrentUser();

    if (!localStorage.getItem("token") || !currentUser) {
      navigate("/signin", { replace: true });
      return;
    }

    setUser(currentUser);

    setForm({
      name: currentUser.name || currentUser.fullName || "",
      username: String(currentUser.username || "").replace(/^@/, ""),
      email: currentUser.email || "",
      bio: currentUser.bio || "",
      walletAddress:
        currentUser.walletAddress || currentUser.wallet || "",
      profileImage:
        currentUser.profileImage ||
        currentUser.avatar ||
        currentUser.image ||
        "",
    });
  }, [navigate]);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setForm((previous) => ({
      ...previous,
      [name]: value,
    }));

    setMessage("");
  };

  // Upload and preview a new profile picture.
  const handleImageChange = (event) => {
    const file = event.target.files?.[0];

    if (!file) return;

    if (!file.type.startsWith("image/")) {
      setMessage("Please select a valid image.");
      event.target.value = "";
      return;
    }

    // Avoid oversized images filling localStorage.
    if (file.size > 2 * 1024 * 1024) {
      setMessage("Please select an image smaller than 2 MB.");
      event.target.value = "";
      return;
    }

    const reader = new FileReader();

    reader.onload = () => {
      setForm((previous) => ({
        ...previous,
        profileImage: String(reader.result || ""),
      }));

      setMessage("");
    };

    reader.onerror = () => {
      setMessage("Unable to read this image. Please try another.");
    };

    reader.readAsDataURL(file);
  };

  // Save profile details and the selected image.
  const handleSave = (event) => {
    event.preventDefault();

    const updatedUser = {
      ...user,
      name: form.name.trim(),
      username: form.username.trim().replace(/^@/, ""),
      email: form.email.trim(),
      bio: form.bio.trim(),
      walletAddress: form.walletAddress.trim(),
      profileImage: form.profileImage,
    };

    try {
      localStorage.setItem("user", JSON.stringify(updatedUser));

      setUser(updatedUser);
      setForm({
        name: updatedUser.name,
        username: updatedUser.username,
        email: updatedUser.email,
        bio: updatedUser.bio,
        walletAddress: updatedUser.walletAddress,
        profileImage: updatedUser.profileImage,
      });

      setEditing(false);
      setMessage("Profile updated successfully.");
    } catch (error) {
      console.error("Unable to save profile:", error);
      setMessage(
        "Unable to save profile. Please use a smaller image."
      );
    }
  };

  const handleCancel = () => {
    const currentUser = getCurrentUser() || user || {};

    setForm({
      name: currentUser.name || currentUser.fullName || "",
      username: String(currentUser.username || "").replace(/^@/, ""),
      email: currentUser.email || "",
      bio: currentUser.bio || "",
      walletAddress:
        currentUser.walletAddress || currentUser.wallet || "",
      profileImage:
        currentUser.profileImage ||
        currentUser.avatar ||
        currentUser.image ||
        "",
    });

    setEditing(false);
    setMessage("");
  };

  const copyWallet = async () => {
    const wallet = form.walletAddress.trim();

    if (!wallet) {
      setMessage("No wallet address has been added yet.");
      return;
    }

    try {
      await navigator.clipboard.writeText(wallet);
      setMessage("Wallet address copied.");
    } catch {
      setMessage("Unable to copy wallet address in this browser.");
    }
  };

  const shareProfile = async () => {
    try {
      if (navigator.share) {
        await navigator.share({
          title: `${form.name || form.username || "My"} - NFT Profile`,
          text: "Check out my Nifty Verse profile.",
          url: window.location.href,
        });
      } else {
        await navigator.clipboard.writeText(window.location.href);
        setMessage("Profile link copied.");
      }
    } catch {
      // The user may cancel the sharing dialog.
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/signin", { replace: true });
  };

  if (!user) {
    return (
      <div className="flex items-center justify-center min-h-[50vh] text-gray-400 bg-black">
        Loading profile...
      </div>
    );
  }

  const displayName = form.name || form.username || "User";

  const displayUsername = form.username
    ? `@${form.username.replace(/^@/, "")}`
    : "";

  const initials = getInitials(displayName);

  const inputClass =
    "w-full rounded-xl border border-white/10 bg-[#08080A] px-4 py-3 text-sm text-white outline-none transition placeholder:text-gray-600 focus:border-[#A259FF] disabled:cursor-default disabled:opacity-80";

  return (
    <div className="overflow-x-hidden min-h-full w-full min-w-0 text-white bg-black">
      {/* Profile cover */}
      <section className="overflow-hidden relative h-[220px] w-full rounded-xl border-white/10 border sm:h-[280px] lg:h-[320px]">
        <img
          src={profileBg}
          alt="Profile background"
          className="object-cover object-center absolute inset-0 h-full w-full"
        />

        <div className="absolute inset-0 bg-black/40" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-transparent to-[#A259FF]/20" />
      </section>

      <main className="mx-auto px-3 w-full min-w-0 max-w-[1400px] sm:px-5 lg:px-8">
        {/* Profile header */}
        <section className="relative pb-8 -mt-14 sm:-mt-16">
          <div className="flex flex-col gap-6 min-w-0 xl:flex-row items-end justify-between">
            <div className="flex flex-col items-center gap-4 min-w-0 sm:flex-row items-end">
              {/* Avatar and change picture control */}
              <div className="overflow-hidden relative flex items-center justify-center h-28 w-28 text-3xl font-bold text-white bg-[#A259FF] rounded-full border-4 border-black shrink-0 sm:h-36 w-36">
                {form.profileImage ? (
                  <img
                    src={form.profileImage}
                    alt={displayName}
                    className="object-cover h-full w-full"
                  />
                ) : (
                  initials
                )}

                {editing && (
                  <label
                    className="absolute inset-0 flex items-center justify-center bg-black/60 cursor-pointer transition hover:bg-black/70"
                    title="Change profile picture"
                  >
                    <div className="flex flex-col items-center gap-1">
                      <Camera size={25} />
                      <span className="text-xs">Change photo</span>
                    </div>

                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageChange}
                      className="hidden"
                    />
                  </label>
                )}
              </div>

              <div className="pb-2 min-w-0 text-center sm:text-left">
                <h1 className="break-words text-2xl font-bold sm:text-3xl lg:text-4xl">
                  {displayName}
                </h1>

                {displayUsername && (
                  <p className="mt-1 text-sm text-gray-400">
                    {displayUsername}
                  </p>
                )}

                {form.email && (
                  <p className="mt-1 break-all text-sm text-gray-500">
                    {form.email}
                  </p>
                )}
              </div>
            </div>

            {/* Action buttons */}
            <div className="flex flex-wrap justify-center gap-2 sm:gap-3 xl:justify-end">
              {!editing ? (
                <button
                  type="button"
                  onClick={() => {
                    setMessage("");
                    setEditing(true);
                  }}
                  className="inline-flex items-center gap-2 px-5 py-3 text-sm font-bold text-white bg-[#A259FF] rounded-xl transition hover:bg-[#8f45e8]"
                >
                  <Edit3 size={17} />
                  Edit Profile
                </button>
              ) : (
                <>
                  <button
                    type="button"
                    onClick={handleCancel}
                    className="inline-flex items-center gap-2 px-4 py-3 text-sm font-semibold text-gray-300 bg-[#151515] rounded-xl border-white/10 border hover:border-white/20"
                  >
                    <X size={17} />
                    Cancel
                  </button>

                  <button
                    type="submit"
                    form="profile-form"
                    className="inline-flex items-center gap-2 px-5 py-3 text-sm font-bold text-white bg-[#A259FF] rounded-xl transition hover:bg-[#8f45e8]"
                  >
                    <Save size={17} />
                    Save Changes
                  </button>
                </>
              )}

              <button
                type="button"
                onClick={shareProfile}
                className="inline-flex items-center gap-2 px-4 py-3 text-sm font-semibold bg-[#151515] rounded-xl border-white/10 border transition hover:border-[#A259FF]"
              >
                <Share2 size={17} />
                Share
              </button>

              <button
                type="button"
                onClick={handleLogout}
                className="inline-flex items-center gap-2 px-4 py-3 text-sm font-semibold text-red-300 bg-red-500/10 rounded-xl border-red-500/20 border transition hover:bg-red-500/20"
              >
                <LogOut size={17} />
                Logout
              </button>
            </div>
          </div>

          {message && (
            <p className="mt-5 px-4 py-3 text-sm text-[#D8B8FF] bg-[#A259FF]/10 rounded-xl border-[#A259FF]/20 border">
              {message}
            </p>
          )}

          {form.bio && !editing && (
            <p className="mt-5 max-w-2xl break-words text-sm leading-7 text-gray-400">
              {form.bio}
            </p>
          )}

          {/* Wallet */}
          <div className="flex flex-wrap gap-3 mt-5">
            <button
              type="button"
              onClick={copyWallet}
              className="inline-flex items-center gap-2 px-4 py-3 max-w-full text-sm text-gray-300 bg-[#151515] rounded-xl border-white/10 border transition hover:border-[#A259FF]"
            >
              <WalletCards size={17} className="text-[#A259FF] shrink-0" />
              <span className="truncate">
                {shortenWallet(form.walletAddress)}
              </span>
              {form.walletAddress && <Copy size={15} />}
            </button>
          </div>
        </section>

        {/* Profile information and edit form */}
        <section className="mb-8 p-4 bg-[#111114] rounded-2xl border-white/10 border sm:mb-12 p-8">
          <div className="mb-6">
            <p className="text-xs font-bold tracking-[0.2em] text-[#A259FF] uppercase">
              Account Settings
            </p>

            <h2 className="mt-2 text-2xl font-bold">
              Profile Information
            </h2>

            <p className="mt-2 text-sm text-gray-500">
              {editing
                ? "Update your profile details below."
                : "View your profile information. Click Edit Profile to make changes."}
            </p>
          </div>

          <form
            id="profile-form"
            onSubmit={handleSave}
            className="grid grid-cols-1 gap-5 md:grid-cols-2"
          >
            <div className="min-w-0">
              <label className="block mb-2 text-sm font-medium text-gray-300">
                Full Name
              </label>
              <input
                name="name"
                value={form.name}
                onChange={handleChange}
                disabled={!editing}
                required
                placeholder="Enter your full name"
                className={inputClass}
              />
            </div>

            <div className="min-w-0">
              <label className="block mb-2 text-sm font-medium text-gray-300">
                Username
              </label>
              <input
                name="username"
                value={form.username}
                onChange={handleChange}
                disabled={!editing}
                placeholder="Enter your username"
                className={inputClass}
              />
            </div>

            <div className="min-w-0">
              <label className="flex items-center gap-2 mb-2 text-sm font-medium text-gray-300">
                <Mail size={15} />
                Email Address
              </label>
              <input
                name="email"
                type="email"
                value={form.email}
                onChange={handleChange}
                disabled={!editing}
                required
                placeholder="Enter your email"
                className={inputClass}
              />
            </div>

            <div className="min-w-0">
              <label className="flex items-center gap-2 mb-2 text-sm font-medium text-gray-300">
                <WalletCards size={15} />
                Wallet Address
              </label>
              <input
                name="walletAddress"
                value={form.walletAddress}
                onChange={handleChange}
                disabled={!editing}
                placeholder="Enter wallet address"
                className={inputClass}
              />
            </div>

            <div className="min-w-0 md:col-span-2">
              <label className="block mb-2 text-sm font-medium text-gray-300">
                Bio
              </label>
              <textarea
                name="bio"
                value={form.bio}
                onChange={handleChange}
                disabled={!editing}
                rows={4}
                placeholder="Write a short bio about yourself..."
                className={`${inputClass} resize-y leading-6`}
              />
            </div>

            {editing && (
              <p className="text-xs leading-5 text-gray-500 md:col-span-2">
                Your changes are saved in this browser. They are not sent
                to the backend database.
              </p>
            )}
          </form>
        </section>
      </main>
    </div>
  );
}
