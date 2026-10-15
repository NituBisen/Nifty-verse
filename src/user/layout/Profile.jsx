
// import React, { useEffect, useState } from "react";
// import {
//   Copy,
//   Edit3,
//   Mail,
//   Share2,
//   WalletCards,
//   Save,
//   X,
//   Camera,
// } from "lucide-react";
// import { useNavigate } from "react-router-dom";
// import profileBg from "../../assets/images/profile-bg.png";

// const getCurrentUser = () => {
//   try {
//     const savedUser = localStorage.getItem("user");
//     return savedUser ? JSON.parse(savedUser) : null;
//   } catch (error) {
//     console.error("Unable to read user:", error);
//     return null;
//   }
// };

// const getInitials = (name = "User") =>
//   String(name)
//     .trim()
//     .split(/\s+/)
//     .filter(Boolean)
//     .slice(0, 2)
//     .map((part) => part.charAt(0).toUpperCase())
//     .join("") || "U";

// const shortenWallet = (wallet = "") => {
//   if (!wallet) return "Wallet not connected";
//   if (wallet.length <= 18) return wallet;
//   return `${wallet.slice(0, 8)}...${wallet.slice(-6)}`;
// };

// export default function Profile() {
//   const navigate = useNavigate();
//   const [user, setUser] = useState(null);
//   const [editing, setEditing] = useState(false);
//   const [message, setMessage] = useState("");

//   const [form, setForm] = useState({
//     name: "",
//     username: "",
//     email: "",
//     bio: "",
//     walletAddress: "",
//     profileImage: "",
//   });

//   useEffect(() => {
//     const currentUser = getCurrentUser();

//     if (!localStorage.getItem("token") || !currentUser) {
//       navigate("/signin", { replace: true });
//       return;
//     }

//     setUser(currentUser);

//     setForm({
//       name: currentUser.name || currentUser.fullName || "",
//       username: String(currentUser.username || "").replace(/^@/, ""),
//       email: currentUser.email || "",
//       bio: currentUser.bio || "",
//       walletAddress:
//         currentUser.walletAddress || currentUser.wallet || "",
//       profileImage:
//         currentUser.profileImage ||
//         currentUser.avatar ||
//         currentUser.image ||
//         "",
//     });
//   }, [navigate]);

//   const handleChange = (event) => {
//     const { name, value } = event.target;

//     setForm((previous) => ({
//       ...previous,
//       [name]: value,
//     }));

//     setMessage("");
//   };

//   // Upload and preview a new profile picture.
//   const handleImageChange = (event) => {
//     const file = event.target.files?.[0];

//     if (!file) return;

//     if (!file.type.startsWith("image/")) {
//       setMessage("Please select a valid image.");
//       event.target.value = "";
//       return;
//     }

//     // Avoid oversized images filling localStorage.
//     if (file.size > 2 * 1024 * 1024) {
//       setMessage("Please select an image smaller than 2 MB.");
//       event.target.value = "";
//       return;
//     }

//     const reader = new FileReader();

//     reader.onload = () => {
//       setForm((previous) => ({
//         ...previous,
//         profileImage: String(reader.result || ""),
//       }));

//       setMessage("");
//     };

//     reader.onerror = () => {
//       setMessage("Unable to read this image. Please try another.");
//     };

//     reader.readAsDataURL(file);
//   };

//   // Save profile details and the selected image.
//   const handleSave = (event) => {
//     event.preventDefault();

//     const updatedUser = {
//       ...user,
//       name: form.name.trim(),
//       username: form.username.trim().replace(/^@/, ""),
//       email: form.email.trim(),
//       bio: form.bio.trim(),
//       walletAddress: form.walletAddress.trim(),
//       profileImage: form.profileImage,
//     };

//     try {
//       localStorage.setItem("user", JSON.stringify(updatedUser));

//       setUser(updatedUser);
//       setForm({
//         name: updatedUser.name,
//         username: updatedUser.username,
//         email: updatedUser.email,
//         bio: updatedUser.bio,
//         walletAddress: updatedUser.walletAddress,
//         profileImage: updatedUser.profileImage,
//       });

//       setEditing(false);
//       setMessage("Profile updated successfully.");
//     } catch (error) {
//       console.error("Unable to save profile:", error);
//       setMessage(
//         "Unable to save profile. Please use a smaller image."
//       );
//     }
//   };

//   const handleCancel = () => {
//     const currentUser = getCurrentUser() || user || {};

//     setForm({
//       name: currentUser.name || currentUser.fullName || "",
//       username: String(currentUser.username || "").replace(/^@/, ""),
//       email: currentUser.email || "",
//       bio: currentUser.bio || "",
//       walletAddress:
//         currentUser.walletAddress || currentUser.wallet || "",
//       profileImage:
//         currentUser.profileImage ||
//         currentUser.avatar ||
//         currentUser.image ||
//         "",
//     });

//     setEditing(false);
//     setMessage("");
//   };

//   const copyWallet = async () => {
//     const wallet = form.walletAddress.trim();

//     if (!wallet) {
//       setMessage("No wallet address has been added yet.");
//       return;
//     }

//     try {
//       await navigator.clipboard.writeText(wallet);
//       setMessage("Wallet address copied.");
//     } catch {
//       setMessage("Unable to copy wallet address in this browser.");
//     }
//   };

//   const shareProfile = async () => {
//     try {
//       if (navigator.share) {
//         await navigator.share({
//           title: `${form.name || form.username || "My"} - NFT Profile`,
//           text: "Check out my Nifty Verse profile.",
//           url: window.location.href,
//         });
//       } else {
//         await navigator.clipboard.writeText(window.location.href);
//         setMessage("Profile link copied.");
//       }
//     } catch {
//       // The user may cancel the sharing dialog.
//     }
//   };

  

//   if (!user) {
//     return (
//       <div className="flex items-center justify-center min-h-[50vh] text-gray-400 bg-black">
//         Loading profile...
//       </div>
//     );
//   }

//   const displayName = form.name || form.username || "User";

//   const displayUsername = form.username
//     ? `@${form.username.replace(/^@/, "")}`
//     : "";

//   const initials = getInitials(displayName);

//   const inputClass =
//     "w-full rounded-xl border border-white/10 bg-[#08080A] px-4 py-3 text-sm text-white outline-none transition placeholder:text-gray-600 focus:border-[#A259FF] disabled:cursor-default disabled:opacity-80";

//   return (
//     <div className="overflow-x-hidden min-h-full w-full min-w-0 text-white bg-black">
//       {/* Profile cover */}
//       <section className="overflow-hidden relative h-[220px] w-full rounded-xl border-white/10 border sm:h-[280px] lg:h-[320px]">
//         <img
//           src={profileBg}
//           alt="Profile background"
//           className="object-cover object-center absolute inset-0 h-full w-full"
//         />

//         <div className="absolute inset-0 bg-black/40" />
//         <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-transparent to-[#A259FF]/20" />
//       </section>

//       <main className="mx-auto px-3 w-full min-w-0 max-w-[1400px] sm:px-5 lg:px-8">
//         {/* Profile header */}
//         <section className="relative pb-8 -mt-14 sm:-mt-16">
//           <div className="flex flex-col items-end justify-between gap-6 min-w-0 xl:flex-row">
//             <div className="flex flex-col items-center items-end gap-4 min-w-0 sm:flex-row">
//               {/* Avatar and change picture control */}
//               <div className="overflow-hidden relative flex items-center justify-center h-28 w-28 w-36 text-3xl font-bold text-white bg-[#A259FF] rounded-full border-4 border-black shrink-0 sm:h-36">
//                 {form.profileImage ? (
//                   <img
//                     src={form.profileImage}
//                     alt={displayName}
//                     className="object-cover h-full w-full"
//                   />
//                 ) : (
//                   initials
//                 )}

//                 {editing && (
//                   <label
//                     className="absolute inset-0 flex items-center justify-center bg-black/60 cursor-pointer transition hover:bg-black/70"
//                     title="Change profile picture"
//                   >
//                     <div className="flex flex-col items-center gap-1">
//                       <Camera size={25} />
//                       <span className="text-xs">Change photo</span>
//                     </div>

//                     <input
//                       type="file"
//                       accept="image/*"
//                       onChange={handleImageChange}
//                       className="hidden"
//                     />
//                   </label>
//                 )}
//               </div>

//               <div className="pb-2 min-w-0 text-center sm:text-left">
//                 <h1 className="break-words text-2xl font-bold sm:text-3xl lg:text-4xl">
//                   {displayName}
//                 </h1>

//                 {displayUsername && (
//                   <p className="mt-1 text-sm text-gray-400">
//                     {displayUsername}
//                   </p>
//                 )}

//                 {form.email && (
//                   <p className="mt-1 break-all text-sm text-gray-500">
//                     {form.email}
//                   </p>
//                 )}
//               </div>
//             </div>

//             {/* Action buttons */}
//             <div className="flex flex-wrap justify-center gap-2 sm:gap-3 xl:justify-end">
//               {!editing ? (
//                 <button
//                   type="button"
//                   onClick={() => {
//                     setMessage("");
//                     setEditing(true);
//                   }}
//                   className="inline-flex items-center gap-2 px-5 py-3 text-sm font-bold text-white bg-[#A259FF] rounded-xl transition hover:bg-[#8f45e8]"
//                 >
//                   <Edit3 size={17} />
//                   Edit Profile
//                 </button>
//               ) : (
//                 <>
//                   <button
//                     type="button"
//                     onClick={handleCancel}
//                     className="inline-flex items-center gap-2 px-4 py-3 text-sm font-semibold text-gray-300 bg-[#151515] rounded-xl border-white/10 border hover:border-white/20"
//                   >
//                     <X size={17} />
//                     Cancel
//                   </button>

//                   <button
//                     type="submit"
//                     form="profile-form"
//                     className="inline-flex items-center gap-2 px-5 py-3 text-sm font-bold text-white bg-[#A259FF] rounded-xl transition hover:bg-[#8f45e8]"
//                   >
//                     <Save size={17} />
//                     Save Changes
//                   </button>
//                 </>
//               )}

//               <button
//                 type="button"
//                 onClick={shareProfile}
//                 className="inline-flex items-center gap-2 px-4 py-3 text-sm font-semibold bg-[#151515] rounded-xl border-white/10 border transition hover:border-[#A259FF]"
//               >
//                 <Share2 size={17} />
//                 Share
//               </button>

             
//             </div>
//           </div>

//           {message && (
//             <p className="mt-5 px-4 py-3 text-sm text-[#D8B8FF] bg-[#A259FF]/10 rounded-xl border-[#A259FF]/20 border">
//               {message}
//             </p>
//           )}

//           {form.bio && !editing && (
//             <p className="mt-5 max-w-2xl break-words text-sm leading-7 text-gray-400">
//               {form.bio}
//             </p>
//           )}

//           {/* Wallet */}
//           <div className="flex flex-wrap gap-3 mt-5">
//             <button
//               type="button"
//               onClick={copyWallet}
//               className="inline-flex items-center gap-2 px-4 py-3 max-w-full text-sm text-gray-300 bg-[#151515] rounded-xl border-white/10 border transition hover:border-[#A259FF]"
//             >
//               <WalletCards size={17} className="text-[#A259FF] shrink-0" />
//               <span className="truncate">
//                 {shortenWallet(form.walletAddress)}
//               </span>
//               {form.walletAddress && <Copy size={15} />}
//             </button>
//           </div>
//         </section>

//         {/* Profile information and edit form */}
//         <section className="mb-8 p-4 p-8 bg-[#111114] rounded-2xl border-white/10 border sm:mb-12">
//           <div className="mb-6">
//             <p className="text-xs font-bold tracking-[0.2em] text-[#A259FF] uppercase">
//               Account Settings
//             </p>

//             <h2 className="mt-2 text-2xl font-bold">
//               Profile Information
//             </h2>

//             <p className="mt-2 text-sm text-gray-500">
//               {editing
//                 ? "Update your profile details below."
//                 : "View your profile information. Click Edit Profile to make changes."}
//             </p>
//           </div>

//           <form
//             id="profile-form"
//             onSubmit={handleSave}
//             className="grid grid-cols-1 gap-5 md:grid-cols-2"
//           >
//             <div className="min-w-0">
//               <label className="block mb-2 text-sm font-medium text-gray-300">
//                 Full Name
//               </label>
//               <input
//                 name="name"
//                 value={form.name}
//                 onChange={handleChange}
//                 disabled={!editing}
//                 required
//                 placeholder="Enter your full name"
//                 className={inputClass}
//               />
//             </div>

//             <div className="min-w-0">
//               <label className="block mb-2 text-sm font-medium text-gray-300">
//                 Username
//               </label>
//               <input
//                 name="username"
//                 value={form.username}
//                 onChange={handleChange}
//                 disabled={!editing}
//                 placeholder="Enter your username"
//                 className={inputClass}
//               />
//             </div>

//             <div className="min-w-0">
//               <label className="flex items-center gap-2 mb-2 text-sm font-medium text-gray-300">
//                 <Mail size={15} />
//                 Email Address
//               </label>
//               <input
//                 name="email"
//                 type="email"
//                 value={form.email}
//                 onChange={handleChange}
//                 disabled={!editing}
//                 required
//                 placeholder="Enter your email"
//                 className={inputClass}
//               />
//             </div>

//             <div className="min-w-0">
//               <label className="flex items-center gap-2 mb-2 text-sm font-medium text-gray-300">
//                 <WalletCards size={15} />
//                 Wallet Address
//               </label>
//               <input
//                 name="walletAddress"
//                 value={form.walletAddress}
//                 onChange={handleChange}
//                 disabled={!editing}
//                 placeholder="Enter wallet address"
//                 className={inputClass}
//               />
//             </div>

//             <div className="min-w-0 md:col-span-2">
//               <label className="block mb-2 text-sm font-medium text-gray-300">
//                 Bio
//               </label>
//               <textarea
//                 name="bio"
//                 value={form.bio}
//                 onChange={handleChange}
//                 disabled={!editing}
//                 rows={4}
//                 placeholder="Write a short bio about yourself..."
//                 className={`${inputClass} resize-y leading-6`}
//               />
//             </div>

//             {editing && (
//               <p className="text-xs leading-5 text-gray-500 md:col-span-2">
//                 Your changes are saved in this browser. They are not sent
//                 to the backend database.
//               </p>
//             )}
//           </form>
//         </section>
//       </main>
//     </div>
//   );
// }






import React, { useEffect, useState } from "react";
import {
  Copy,
  Edit3,
  Mail,
  Share2,
  WalletCards,
  Save,
  X,
  Camera,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import profileBg from "../../assets/images/profile-bg.png";

const API_URL =
  import.meta.env.VITE_API_URL ||
  "https://nifty-verse-backend-production.up.railway.app";

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

const createFormFromUser = (currentUser = {}) => ({
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

export default function Profile() {
  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [editing, setEditing] = useState(false);
  const [message, setMessage] = useState("");
  const [saving, setSaving] = useState(false);

  const [form, setForm] = useState({
    name: "",
    username: "",
    email: "",
    bio: "",
    walletAddress: "",
    profileImage: "",
  });

  // =========================================================
  // LOAD LOCAL USER + REAL PROFILE IMAGE FROM BACKEND
  // =========================================================

  useEffect(() => {
    const token = localStorage.getItem("token");
    const currentUser = getCurrentUser();

    if (!token || !currentUser) {
      navigate("/signin", { replace: true });
      return undefined;
    }

    setUser(currentUser);
    setForm(createFormFromUser(currentUser));

    const controller = new AbortController();

    const loadProfile = async () => {
      try {
        const response = await fetch(`${API_URL}/api/profile/me`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          cache: "no-store",
          signal: controller.signal,
        });

        const data = await response.json().catch(() => ({}));

        if (response.status === 401) {
          localStorage.removeItem("token");
          localStorage.removeItem("user");
          navigate("/signin", { replace: true });
          return;
        }

        if (!response.ok || !data.success || !data.user) {
          throw new Error(
            data.message || "Unable to load your saved profile image."
          );
        }

        if (controller.signal.aborted) return;

        // Backend profile image is preferred.
        // Keep other existing local user details unchanged.
        const updatedUser = {
          ...currentUser,
          ...data.user,
          profileImage:
            data.user.profileImage ||
            currentUser.profileImage ||
            currentUser.avatar ||
            currentUser.image ||
            "",
        };

        localStorage.setItem("user", JSON.stringify(updatedUser));

        setUser(updatedUser);
        setForm(createFormFromUser(updatedUser));
      } catch (error) {
        if (error.name !== "AbortError") {
          console.error("Load profile error:", error);

          // Keep the existing local profile visible if the API fails.
          setMessage(
            "Could not refresh the saved profile image. Your existing profile is still available."
          );
        }
      }
    };

    loadProfile();

    return () => controller.abort();
  }, [navigate]);

  // =========================================================
  // FORM CHANGE
  // =========================================================

  const handleChange = (event) => {
    const { name, value } = event.target;

    setForm((previous) => ({
      ...previous,
      [name]: value,
    }));

    setMessage("");
  };

  // =========================================================
  // UPLOAD + PREVIEW PROFILE IMAGE
  // =========================================================

  const handleImageChange = (event) => {
    const file = event.target.files?.[0];

    if (!file) return;

    if (!file.type.startsWith("image/")) {
      setMessage("Please select a valid image.");
      event.target.value = "";
      return;
    }

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

  // =========================================================
  // SAVE PROFILE IMAGE TO DATABASE
  // Other profile fields remain in localStorage, as before.
  // =========================================================

  const handleSave = async (event) => {
    event.preventDefault();

    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/signin", { replace: true });
      return;
    }

    setSaving(true);
    setMessage("");

    try {
      const response = await fetch(`${API_URL}/api/profile/me`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          profileImage: form.profileImage || "",
        }),
      });

      const data = await response.json().catch(() => ({}));

      if (response.status === 401) {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        navigate("/signin", { replace: true });
        return;
      }

      if (!response.ok || !data.success) {
        throw new Error(
          data.message || "Unable to save your profile image."
        );
      }

      window.dispatchEvent(new Event("marketplace-data-changed"));

      const updatedUser = {
        ...user,
        name: form.name.trim(),
        username: form.username.trim().replace(/^@/, ""),
        email: form.email.trim(),
        bio: form.bio.trim(),
        walletAddress: form.walletAddress.trim(),
        profileImage:
          data.user?.profileImage ?? form.profileImage,
      };

      // Store other profile details locally, matching the existing behavior.
      localStorage.setItem("user", JSON.stringify(updatedUser));

      setUser(updatedUser);
      setForm(createFormFromUser(updatedUser));
      setEditing(false);

      setMessage(
        "Profile image saved to your account. Other profile details are saved in this browser."
      );
    } catch (error) {
      console.error("Unable to save profile:", error);

      setMessage(
        error.message ||
          "Unable to save profile. Please try again."
      );
    } finally {
      setSaving(false);
    }
  };

  // =========================================================
  // CANCEL EDITING
  // =========================================================

  const handleCancel = () => {
    const currentUser = getCurrentUser() || user || {};

    setForm(createFormFromUser(currentUser));
    setEditing(false);
    setMessage("");
  };

  // =========================================================
  // COPY WALLET ADDRESS
  // =========================================================

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

  // =========================================================
  // SHARE PROFILE
  // =========================================================

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

  // =========================================================
  // LOADING STATE
  // =========================================================

  if (!user) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center bg-black text-gray-400">
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

  // =========================================================
  // PROFILE UI — ORIGINAL DESIGN RETAINED
  // =========================================================

  return (
    <div className="min-h-full w-full min-w-0 overflow-x-hidden bg-black text-white">
      {/* Profile cover */}
      <section className="relative h-[220px] w-full overflow-hidden rounded-xl border border-white/10 sm:h-[280px] lg:h-[320px]">
        <img
          src={profileBg}
          alt="Profile background"
          className="absolute inset-0 h-full w-full object-cover object-center"
        />

        <div className="absolute inset-0 bg-black/40" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-transparent to-[#A259FF]/20" />
      </section>

      <main className="mx-auto w-full min-w-0 max-w-[1400px] px-3 sm:px-5 lg:px-8">
        {/* Profile header */}
        <section className="relative -mt-14 pb-8 sm:-mt-16">
          <div className="flex min-w-0 flex-col items-end justify-between gap-6 xl:flex-row">
            <div className="flex min-w-0 flex-col items-center gap-4 sm:flex-row sm:items-end">
              {/* Avatar + change picture */}
              <div className="relative flex h-28 w-28 shrink-0 items-center justify-center overflow-hidden rounded-full border-4 border-black bg-[#A259FF] text-3xl font-bold text-white sm:h-36 sm:w-36">
                {form.profileImage ? (
                  <img
                    src={form.profileImage}
                    alt={displayName}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  initials
                )}

                {editing && (
                  <label
                    className="absolute inset-0 flex cursor-pointer items-center justify-center bg-black/60 transition hover:bg-black/70"
                    title="Change profile picture"
                  >
                    <div className="flex flex-col items-center gap-1">
                      <Camera size={25} />
                      <span className="text-xs">Change photo</span>
                    </div>

                    <input
                      type="file"
                      accept="image/png,image/jpeg,image/webp,image/gif"
                      onChange={handleImageChange}
                      className="hidden"
                    />
                  </label>
                )}
              </div>

              <div className="min-w-0 pb-2 text-center sm:text-left">
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
                  className="inline-flex items-center gap-2 rounded-xl bg-[#A259FF] px-5 py-3 text-sm font-bold text-white transition hover:bg-[#8f45e8]"
                >
                  <Edit3 size={17} />
                  Edit Profile
                </button>
              ) : (
                <>
                  <button
                    type="button"
                    onClick={handleCancel}
                    disabled={saving}
                    className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-[#151515] px-4 py-3 text-sm font-semibold text-gray-300 hover:border-white/20 disabled:opacity-50"
                  >
                    <X size={17} />
                    Cancel
                  </button>

                  <button
                    type="submit"
                    form="profile-form"
                    disabled={saving}
                    className="inline-flex items-center gap-2 rounded-xl bg-[#A259FF] px-5 py-3 text-sm font-bold text-white transition hover:bg-[#8f45e8] disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    <Save size={17} />
                    {saving ? "Saving..." : "Save Changes"}
                  </button>
                </>
              )}

              <button
                type="button"
                onClick={shareProfile}
                className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-[#151515] px-4 py-3 text-sm font-semibold transition hover:border-[#A259FF]"
              >
                <Share2 size={17} />
                Share
              </button>
            </div>
          </div>

          {message && (
            <p
              role="status"
              className="mt-5 rounded-xl border border-[#A259FF]/20 bg-[#A259FF]/10 px-4 py-3 text-sm text-[#D8B8FF]"
            >
              {message}
            </p>
          )}

          {form.bio && !editing && (
            <p className="mt-5 max-w-2xl break-words text-sm leading-7 text-gray-400">
              {form.bio}
            </p>
          )}

          {/* Wallet */}
          <div className="mt-5 flex flex-wrap gap-3">
            <button
              type="button"
              onClick={copyWallet}
              className="inline-flex max-w-full items-center gap-2 rounded-xl border border-white/10 bg-[#151515] px-4 py-3 text-sm text-gray-300 transition hover:border-[#A259FF]"
            >
              <WalletCards
                size={17}
                className="shrink-0 text-[#A259FF]"
              />

              <span className="truncate">
                {shortenWallet(form.walletAddress)}
              </span>

              {form.walletAddress && <Copy size={15} />}
            </button>
          </div>
        </section>

        {/* Profile information and edit form */}
        <section className="mb-8 rounded-2xl border border-white/10 bg-[#111114] p-4 sm:mb-12 sm:p-8">
          <div className="mb-6">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#A259FF]">
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
              <label className="mb-2 block text-sm font-medium text-gray-300">
                Full Name
              </label>

              <input
                name="name"
                value={form.name}
                onChange={handleChange}
                disabled={!editing || saving}
                required
                placeholder="Enter your full name"
                className={inputClass}
              />
            </div>

            <div className="min-w-0">
              <label className="mb-2 block text-sm font-medium text-gray-300">
                Username
              </label>

              <input
                name="username"
                value={form.username}
                onChange={handleChange}
                disabled={!editing || saving}
                placeholder="Enter your username"
                className={inputClass}
              />
            </div>

            <div className="min-w-0">
              <label className="mb-2 flex items-center gap-2 text-sm font-medium text-gray-300">
                <Mail size={15} />
                Email Address
              </label>

              <input
                name="email"
                type="email"
                value={form.email}
                onChange={handleChange}
                disabled={!editing || saving}
                required
                placeholder="Enter your email"
                className={inputClass}
              />
            </div>

            <div className="min-w-0">
              <label className="mb-2 flex items-center gap-2 text-sm font-medium text-gray-300">
                <WalletCards size={15} />
                Wallet Address
              </label>

              <input
                name="walletAddress"
                value={form.walletAddress}
                onChange={handleChange}
                disabled={!editing || saving}
                placeholder="Enter wallet address"
                className={inputClass}
              />
            </div>

            <div className="min-w-0 md:col-span-2">
              <label className="mb-2 block text-sm font-medium text-gray-300">
                Bio
              </label>

              <textarea
                name="bio"
                value={form.bio}
                onChange={handleChange}
                disabled={!editing || saving}
                rows={4}
                placeholder="Write a short bio about yourself..."
                className={`${inputClass} resize-y leading-6`}
              />
            </div>

            {editing && (
              <p className="text-xs leading-5 text-gray-500 md:col-span-2">
                Your profile image is saved to your account. Name,
                username, email, bio, and wallet address continue to be
                saved in this browser with the current backend setup.
              </p>
            )}
          </form>
        </section>
      </main>
    </div>
  );
}