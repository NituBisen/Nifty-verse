import React, { useState } from "react";
import { ArrowLeft, Camera, Save, X } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Navbar from "../common/Navbar";
import Footer from "../common/Footer";

const EditProfile = () => {
  const navigate = useNavigate();

  const [profileImage, setProfileImage] = useState(null);

  const [formData, setFormData] = useState({
    username: "nitubisen",
    displayName: "Nitu Bisen",
    email: "nitu@example.com",
    bio: "Digital artist and NFT collector creating unique digital experiences. Exploring the future of art, blockchain and Web3.",
    instagram: "",
    twitter: "",
    website: "",
  });

  const [saved, setSaved] = useState(false);

  // =========================
  // INPUT CHANGE
  // =========================

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    setSaved(false);
  };

  // =========================
  // IMAGE CHANGE
  // =========================

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];

    if (!file) return;

    if (!file.type.startsWith("image/")) {
      alert("Please select an image file.");
      return;
    }

    const imageUrl = URL.createObjectURL(file);

    setProfileImage(imageUrl);
    setSaved(false);
  };

  // =========================
  // REMOVE IMAGE
  // =========================

  const removeImage = () => {
    setProfileImage(null);
  };

  // =========================
  // SAVE PROFILE
  // =========================

  const handleSave = (e) => {
    e.preventDefault();

    console.log("Updated Profile:", formData);

    // Later you can send this data to your backend API.

    setSaved(true);

    setTimeout(() => {
      navigate("/profile");
    }, 1000);
  };

  return (
    <div className="min-h-screen text-white bg-black">
      <Navbar />

      {/* =========================
          PAGE
      ========================= */}

      <main className="mx-auto px-5 py-10 w-full max-w-[1000px] sm:px-8 lg:px-10">

        {/* =========================
            BACK BUTTON
        ========================= */}

        <button
          type="button"
          onClick={() => navigate("/profile")}
          className="flex items-center gap-2 mb-8 text-sm font-semibold text-gray-400 transition hover:text-white"
        >
          <ArrowLeft size={18} />

          Back to Profile
        </button>

        {/* =========================
            HEADING
        ========================= */}

        <div className="mb-8">
          <h1 className="text-3xl font-bold text-transparent bg-gradient-to-r from-[#A259FF] via-[#C084FC] to-[#4DA6FF] bg-clip-text sm:text-4xl">
            Edit Profile
          </h1>

          <p className="mt-2 text-sm text-gray-500">
            Update your profile information and personalize your NFT profile.
          </p>
        </div>

        {/* =========================
            FORM CARD
        ========================= */}

        <form
          onSubmit={handleSave}
          className="p-5 bg-[#151515] rounded-2xl border-[#292929] border sm:p-8"
        >

          {/* =========================
              PROFILE IMAGE
          ========================= */}

          <div className="mb-10 pb-8 border-b border-[#292929]">

            <h2 className="mb-5 text-lg font-semibold">
              Profile Picture
            </h2>

            <div className="flex flex-col items-center gap-5 sm:flex-row">

              {/* Avatar */}

              <div className="relative">

                <div className="overflow-hidden flex items-center justify-center h-32 w-32 bg-gradient-to-br from-[#A259FF] to-[#4DA6FF] rounded-full border-4 border-[#292929]">

                  {profileImage ? (
                    <img
                      src={profileImage}
                      alt="Profile"
                      className="object-cover h-full w-full"
                    />
                  ) : (
                    <span className="text-4xl font-bold text-white">
                      NB
                    </span>
                  )}

                </div>

                {/* Camera */}

                <label
                  htmlFor="profile-image"
                  className="absolute bottom-0 right-0 flex items-center justify-center h-10 w-10 bg-[#A259FF] rounded-full border-2 border-black cursor-pointer transition hover:bg-[#8B3DFF]"
                >
                  <Camera size={18} />

                  <input
                    id="profile-image"
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="hidden"
                  />
                </label>

              </div>

              {/* Image Buttons */}

              <div className="text-center sm:text-left">

                <p className="text-sm font-semibold text-white">
                  Upload a new profile picture
                </p>

                <p className="mt-1 text-xs text-gray-500">
                  JPG, PNG or WEBP. Maximum recommended size 5MB.
                </p>

                <div className="flex justify-center gap-3 mt-4 sm:justify-start">

                  <label
                    htmlFor="profile-image"
                    className="px-4 py-2 text-sm font-semibold rounded-lg border-[#444] cursor-pointer border transition hover:border-[#A259FF] hover:bg-[#A259FF]/10"
                  >
                    Choose Image
                  </label>

                  {profileImage && (
                    <button
                      type="button"
                      onClick={removeImage}
                      className="flex items-center gap-1 px-4 py-2 text-sm font-semibold text-red-400 rounded-lg border-red-500/30 border transition hover:bg-red-500/10"
                    >
                      <X size={15} />
                      Remove
                    </button>
                  )}

                </div>

              </div>

            </div>
          </div>

          {/* =========================
              BASIC INFORMATION
          ========================= */}

          <div className="mb-10 pb-8 border-b border-[#292929]">

            <h2 className="mb-5 text-lg font-semibold">
              Basic Information
            </h2>

            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">

              {/* Display Name */}

              <div>
                <label className="block mb-2 text-sm font-medium text-gray-300">
                  Display Name
                </label>

                <input
                  type="text"
                  name="displayName"
                  value={formData.displayName}
                  onChange={handleChange}
                  placeholder="Enter your name"
                  className="px-4 py-3.5 placeholder:text-gray-600 w-full text-white bg-[#1B1B1B] rounded-xl border-[#333] outline-none border transition focus:border-[#A259FF]"
                />
              </div>

              {/* Username */}

              <div>
                <label className="block mb-2 text-sm font-medium text-gray-300">
                  Username
                </label>

                <div className="overflow-hidden flex bg-[#1B1B1B] rounded-xl border-[#333] focus-within:border-[#A259FF] border">
                  <span className="flex items-center px-4 text-gray-500">
                    @
                  </span>

                  <input
                    type="text"
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                    placeholder="username"
                    className="py-3.5 pr-4 placeholder:text-gray-600 w-full text-white bg-transparent outline-none"
                  />
                </div>
              </div>

              {/* Email */}

              <div className="sm:col-span-2">
                <label className="block mb-2 text-sm font-medium text-gray-300">
                  Email Address
                </label>

                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter your email"
                  className="px-4 py-3.5 placeholder:text-gray-600 w-full text-white bg-[#1B1B1B] rounded-xl border-[#333] outline-none border transition focus:border-[#A259FF]"
                />
              </div>

              {/* Bio */}

              <div className="sm:col-span-2">

                <div className="flex items-center justify-between mb-2">
                  <label className="text-sm font-medium text-gray-300">
                    Bio
                  </label>

                  <span className="text-xs text-gray-600">
                    {formData.bio.length}/250
                  </span>
                </div>

                <textarea
                  name="bio"
                  value={formData.bio}
                  onChange={(e) => {
                    if (e.target.value.length <= 250) {
                      handleChange(e);
                    }
                  }}
                  rows={5}
                  placeholder="Tell people about yourself..."
                  className="px-4 py-3.5 placeholder:text-gray-600 w-full text-sm leading-6 text-white bg-[#1B1B1B] rounded-xl border-[#333] outline-none resize-none border transition focus:border-[#A259FF]"
                />

              </div>

            </div>
          </div>

          {/* =========================
              SOCIAL LINKS
          ========================= */}

          <div className="mb-10 pb-8 border-b border-[#292929]">

            <h2 className="mb-5 text-lg font-semibold">
              Social Links
            </h2>

            <div className="space-y-5">

              {/* Instagram */}

              <div>
                <label className="block mb-2 text-sm font-medium text-gray-300">
                  Instagram
                </label>

                <input
                  type="text"
                  name="instagram"
                  value={formData.instagram}
                  onChange={handleChange}
                  placeholder="https://instagram.com/username"
                  className="px-4 py-3.5 placeholder:text-gray-600 w-full text-white bg-[#1B1B1B] rounded-xl border-[#333] outline-none border transition focus:border-[#A259FF]"
                />
              </div>

              {/* Twitter */}

              <div>
                <label className="block mb-2 text-sm font-medium text-gray-300">
                  Twitter / X
                </label>

                <input
                  type="text"
                  name="twitter"
                  value={formData.twitter}
                  onChange={handleChange}
                  placeholder="https://x.com/username"
                  className="px-4 py-3.5 placeholder:text-gray-600 w-full text-white bg-[#1B1B1B] rounded-xl border-[#333] outline-none border transition focus:border-[#A259FF]"
                />
              </div>

              {/* Website */}

              <div>
                <label className="block mb-2 text-sm font-medium text-gray-300">
                  Website
                </label>

                <input
                  type="url"
                  name="website"
                  value={formData.website}
                  onChange={handleChange}
                  placeholder="https://yourwebsite.com"
                  className="px-4 py-3.5 placeholder:text-gray-600 w-full text-white bg-[#1B1B1B] rounded-xl border-[#333] outline-none border transition focus:border-[#A259FF]"
                />
              </div>

            </div>
          </div>

          {/* =========================
              WALLET
          ========================= */}

          <div className="mb-8">

            <h2 className="mb-2 text-lg font-semibold">
              Wallet
            </h2>

            <p className="mb-5 text-sm text-gray-500">
              Your connected wallet address.
            </p>

            <div className="flex flex-col gap-3 p-4 bg-[#1B1B1B] rounded-xl border-[#292929] border sm:flex-row items-center justify-between">

              <div>
                <p className="text-xs text-gray-500">
                  Connected Wallet
                </p>

                <p className="mt-1 break-all text-sm font-medium text-white">
                  0x72A5F8B91C8D6E4F2A91
                </p>
              </div>

              <span className="px-3 py-1 whitespace-nowrap text-xs font-semibold text-green-400 bg-green-500/10 rounded-full">
                Connected
              </span>

            </div>

          </div>

          {/* =========================
              SAVE / CANCEL
          ========================= */}

          <div className="flex flex-col-reverse gap-3 sm:flex-row justify-end">

            <button
              type="button"
              onClick={() => navigate("/profile")}
              className="px-6 py-3.5 text-sm font-semibold text-white rounded-xl border-[#444] border transition hover:border-white"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="flex items-center justify-center gap-2 px-7 py-3.5 text-sm font-semibold text-white bg-gradient-to-r from-[#A259FF] to-[#4DA6FF] rounded-xl transition hover:-translate-y-0.5 hover:opacity-90"
            >
              <Save size={18} />

              {saved ? "Saved!" : "Save Changes"}
            </button>

          </div>

        </form>
      </main>

      <Footer />
    </div>
  );
};

export default EditProfile;