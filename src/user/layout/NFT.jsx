// import React, { useCallback, useEffect, useRef, useState } from "react";
// import { motion } from "framer-motion";
// import { useNavigate } from "react-router-dom";
// import {
//   ImagePlus,
//   Plus,
//   Upload,
//   X,
//   ArrowLeft,
//   Trash2,
//   Layers,
//   RefreshCw,
//   Sparkles,
//   Image as ImageIcon,
//   Eye,
//   CalendarDays,
// } from "lucide-react";

// const API_URL =
//   import.meta.env.VITE_API_URL ||
//   "https://nifty-verse-backend-production.up.railway.app";

// const INITIAL_FORM = {
//   name: "",
//   description: "",
//   price: "",
//   highestBid: "",
//   category: "Art",
//   collectionId: "",
// };

// const inputClass =
//   "mt-2 w-full rounded-xl border border-white/10 bg-[#0B0B10] px-4 py-3 text-sm text-white outline-none placeholder:text-gray-600 transition focus:border-[#A259FF]";

// const formatDate = (date) => {
//   if (!date) return "Date unavailable";

//   const parsedDate = new Date(date);

//   if (Number.isNaN(parsedDate.getTime())) return "Date unavailable";

//   return parsedDate.toLocaleDateString("en-IN", {
//     day: "2-digit",
//     month: "short",
//     year: "numeric",
//   });
// };

// const getErrorMessage = (data, fallback) =>
//   data?.message || fallback;

// export default function NFT() {
//   const navigate = useNavigate();
//   const fileInputRef = useRef(null);

//   const [user, setUser] = useState(null);
//   const [nfts, setNfts] = useState([]);
//   const [collections, setCollections] = useState([]);

//   const [activeTab, setActiveTab] = useState("all");
//   const [showCreateForm, setShowCreateForm] = useState(false);
//   const [selectedNFT, setSelectedNFT] = useState(null);

//   const [image, setImage] = useState("");
//   const [form, setForm] = useState(INITIAL_FORM);

//   const [loading, setLoading] = useState(true);
//   const [saving, setSaving] = useState(false);
//   const [refreshing, setRefreshing] = useState(false);
//   const [deletingId, setDeletingId] = useState("");

//   const [error, setError] = useState("");
//   const [success, setSuccess] = useState("");

//   const loadData = useCallback(
//     async (isRefresh = false) => {
//       const token = localStorage.getItem("token");

//       if (!token) {
//         localStorage.removeItem("user");
//         navigate("/signin", { replace: true });
//         return;
//       }

//       if (isRefresh) {
//         setRefreshing(true);
//       } else {
//         setLoading(true);
//       }

//       setError("");

//       try {
//         const headers = {
//           Authorization: `Bearer ${token}`,
//         };

//         const [profileResponse, nftResponse, collectionResponse] =
//           await Promise.all([
//             fetch(`${API_URL}/api/auth/me`, { headers }),
//             fetch(`${API_URL}/api/nfts/mine`, { headers }),
//             fetch(`${API_URL}/api/collections/mine`, { headers }),
//           ]);

//         const [profileData, nftData, collectionData] = await Promise.all([
//           profileResponse.json().catch(() => ({})),
//           nftResponse.json().catch(() => ({})),
//           collectionResponse.json().catch(() => ({})),
//         ]);

//         if (
//           profileResponse.status === 401 ||
//           nftResponse.status === 401 ||
//           collectionResponse.status === 401
//         ) {
//           localStorage.removeItem("token");
//           localStorage.removeItem("user");
//           navigate("/signin", { replace: true });
//           return;
//         }

//         if (!profileResponse.ok || !profileData.user) {
//           throw new Error(
//             getErrorMessage(profileData, "Unable to load your profile.")
//           );
//         }

//         if (!nftResponse.ok || nftData.success === false) {
//           throw new Error(
//             getErrorMessage(nftData, "Unable to load your NFTs.")
//           );
//         }

//         if (
//           !collectionResponse.ok ||
//           collectionData.success === false
//         ) {
//           throw new Error(
//             getErrorMessage(
//               collectionData,
//               "Unable to load your collections."
//             )
//           );
//         }

//         setUser(profileData.user);
//         setNfts(Array.isArray(nftData.nfts) ? nftData.nfts : []);
//         setCollections(
//           Array.isArray(collectionData.collections)
//             ? collectionData.collections
//             : []
//         );

//         localStorage.setItem("user", JSON.stringify(profileData.user));
//       } catch (fetchError) {
//         console.error("NFT page data error:", fetchError);
//         setError(fetchError.message || "Unable to load NFT data.");
//       } finally {
//         setLoading(false);
//         setRefreshing(false);
//       }
//     },
//     [navigate]
//   );

//   useEffect(() => {
//     loadData();
//   }, [loadData]);

//   const handleChange = (event) => {
//     const { name, value } = event.target;

//     setForm((previous) => ({
//       ...previous,
//       [name]: value,
//     }));

//     setError("");
//     setSuccess("");
//   };

//   const handleImageChange = (event) => {
//     const file = event.target.files?.[0];

//     if (!file) return;

//     if (!file.type.startsWith("image/")) {
//       setError("Please select a valid image.");
//       event.target.value = "";
//       return;
//     }

//     // Images are sent as base64 JSON, so keep their size small.
//     if (file.size > 2 * 1024 * 1024) {
//       setError("Please select an image smaller than 2 MB.");
//       event.target.value = "";
//       return;
//     }

//     const reader = new FileReader();

//     reader.onload = () => {
//       setImage(String(reader.result || ""));
//       setError("");
//       setSuccess("");
//     };

//     reader.onerror = () => {
//       setError("Unable to read the image. Please try another file.");
//     };

//     reader.readAsDataURL(file);
//   };

//   const removeImage = () => {
//     setImage("");

//     if (fileInputRef.current) {
//       fileInputRef.current.value = "";
//     }
//   };

//   const openCreateForm = () => {
//     setForm(INITIAL_FORM);
//     setImage("");
//     setError("");
//     setSuccess("");
//     setSelectedNFT(null);
//     setShowCreateForm(true);
//   };

//   const closeCreateForm = () => {
//     setShowCreateForm(false);
//     setForm(INITIAL_FORM);
//     setImage("");
//     setError("");

//     if (fileInputRef.current) {
//       fileInputRef.current.value = "";
//     }
//   };

//   const handleSubmit = async (event) => {
//     event.preventDefault();
//     setError("");
//     setSuccess("");

//     if (!image) {
//       setError("Please upload an NFT image.");
//       return;
//     }

//     if (!form.name.trim()) {
//       setError("Please enter an NFT name.");
//       return;
//     }

//     if (!form.description.trim()) {
//       setError("Please enter an NFT description.");
//       return;
//     }

//     if (form.price === "" || !Number.isFinite(Number(form.price))) {
//       setError("Please enter a valid price.");
//       return;
//     }

//     if (Number(form.price) < 0) {
//       setError("Price cannot be negative.");
//       return;
//     }

//     const highestBid =
//       form.highestBid === "" ? 0 : Number(form.highestBid);

//     if (!Number.isFinite(highestBid) || highestBid < 0) {
//       setError("Please enter a valid highest bid.");
//       return;
//     }

//     const token = localStorage.getItem("token");

//     if (!token) {
//       navigate("/signin", { replace: true });
//       return;
//     }

//     try {
//       setSaving(true);

//       const response = await fetch(`${API_URL}/api/nfts`, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${token}`,
//         },
//         body: JSON.stringify({
//           name: form.name.trim(),
//           description: form.description.trim(),
//           image,
//           price: Number(form.price),
//           highestBid,
//           category: form.category,
//           collectionId: form.collectionId || null,
//           status: "published",
//         }),
//       });

//       const data = await response.json().catch(() => ({}));

//       if (response.status === 401) {
//         localStorage.removeItem("token");
//         localStorage.removeItem("user");
//         navigate("/signin", { replace: true });
//         return;
//       }

//       if (!response.ok || !data.success || !data.nft) {
//         throw new Error(
//           getErrorMessage(data, "Unable to create NFT.")
//         );
//       }

//       setNfts((previous) => [
//         data.nft,
//         ...previous.filter(
//           (item) =>
//             String(item._id || item.id) !==
//             String(data.nft._id || data.nft.id)
//         ),
//       ]);

//       setSuccess(data.message || "NFT created successfully.");
//       setActiveTab("all");
//       setShowCreateForm(false);
//       setSelectedNFT(null);
//       setForm(INITIAL_FORM);
//       setImage("");

//       if (fileInputRef.current) {
//         fileInputRef.current.value = "";
//       }
//     } catch (submitError) {
//       console.error("Create NFT error:", submitError);
//       setError(submitError.message || "Unable to create NFT.");
//     } finally {
//       setSaving(false);
//     }
//   };

//   const handleDelete = async (nft) => {
//     const nftId = nft._id || nft.id;

//     if (!nftId) {
//       setError("This NFT has no valid database ID.");
//       return;
//     }

//     if (!window.confirm(`Delete "${nft.name || "this NFT"}"?`)) {
//       return;
//     }

//     const token = localStorage.getItem("token");

//     if (!token) {
//       navigate("/signin", { replace: true });
//       return;
//     }

//     setDeletingId(String(nftId));
//     setError("");
//     setSuccess("");

//     try {
//       const response = await fetch(
//         `${API_URL}/api/nfts/${encodeURIComponent(nftId)}`,
//         {
//           method: "DELETE",
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );

//       const data = await response.json().catch(() => ({}));

//       if (response.status === 401) {
//         localStorage.removeItem("token");
//         localStorage.removeItem("user");
//         navigate("/signin", { replace: true });
//         return;
//       }

//       if (!response.ok || !data.success) {
//         throw new Error(
//           getErrorMessage(data, "Unable to delete this NFT.")
//         );
//       }

//       setNfts((previous) =>
//         previous.filter(
//           (item) => String(item._id || item.id) !== String(nftId)
//         )
//       );

//       setSelectedNFT(null);
//       setSuccess(data.message || "NFT deleted successfully.");
//     } catch (deleteError) {
//       console.error("Delete NFT error:", deleteError);
//       setError(deleteError.message || "Unable to delete this NFT.");
//     } finally {
//       setDeletingId("");
//     }
//   };

//   const filteredNFTs = nfts.filter((nft) => {
//     if (activeTab === "published") {
//       return nft.status === "published";
//     }

//     if (activeTab === "draft") {
//       return nft.status === "draft";
//     }

//     return true;
//   });

//   const displayName =
//     user?.username || user?.email?.split("@")[0] || "Creator";

//   const publishedCount = nfts.filter(
//     (nft) => nft.status === "published"
//   ).length;

//   if (loading) {
//     return (
//       <div className="flex min-h-[45vh] items-center justify-center bg-[#08080A] text-sm text-[#A7A7AF]">
//         <div className="flex items-center gap-3">
//           <span className="h-5 w-5 animate-spin rounded-full border-2 border-[#A259FF]/30 border-t-[#A259FF]" />
//           Loading your NFTs...
//         </div>
//       </div>
//     );
//   }

//   return (
//     <main className="min-h-full overflow-x-hidden bg-[#08080A] px-4 py-6 text-white sm:px-6 sm:py-8 xl:px-8">
//       <div className="mx-auto max-w-[1600px] space-y-7">
//         {!showCreateForm ? (
//           <>
//             {/* Page header */}
//             <motion.section
//               initial={{ opacity: 0, y: 14 }}
//               animate={{ opacity: 1, y: 0 }}
//               className="group relative overflow-hidden rounded-[26px] border border-white/[0.07] bg-[#111114] p-5 sm:p-7 lg:p-8"
//             >
//               <div className="pointer-events-none absolute -right-12 -top-16 h-60 w-60 rounded-full bg-[#A259FF]/10 blur-3xl transition group-hover:bg-[#A259FF]/15" />

//               <div className="relative flex flex-col justify-between gap-6 sm:flex-row sm:items-center">
//                 <div className="min-w-0">
//                   <p className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-[#B978FF]">
//                     <Sparkles size={15} />
//                     Nifty Verse · Creator workspace
//                   </p>

//                   <h1 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
//                     My <span className="text-[#B978FF]">NFTs</span>
//                   </h1>

//                   <p className="mt-3 max-w-2xl text-sm leading-6 text-[#85858D]">
//                     Create and manage your digital artwork, and organize
//                     your NFTs into your own collections.
//                   </p>

//                   <p className="mt-3 text-xs text-[#686872]">
//                     Signed in as {displayName}
//                   </p>
//                 </div>

//                 <div className="flex shrink-0 flex-wrap gap-3">
//                   <button
//                     type="button"
//                     onClick={() => loadData(true)}
//                     disabled={refreshing}
//                     className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm font-semibold text-gray-200 transition hover:border-[#A259FF]/40 disabled:opacity-60"
//                   >
//                     <RefreshCw
//                       size={16}
//                       className={refreshing ? "animate-spin" : ""}
//                     />
//                     Refresh
//                   </button>

//                   <button
//                     type="button"
//                     onClick={openCreateForm}
//                     className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#A259FF] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#9147E8]"
//                   >
//                     <Plus size={18} />
//                     Create NFT
//                   </button>
//                 </div>
//               </div>
//             </motion.section>

//             {/* Feedback */}
//             {error && (
//               <div
//                 role="alert"
//                 className="rounded-xl border border-red-400/20 bg-red-400/[0.06] px-4 py-3 text-sm leading-6 text-red-300"
//               >
//                 {error}
//               </div>
//             )}

//             {success && (
//               <div
//                 role="status"
//                 className="rounded-xl border border-emerald-400/20 bg-emerald-400/[0.06] px-4 py-3 text-sm text-emerald-300"
//               >
//                 {success}
//               </div>
//             )}

//             {/* Real database stats */}
//             <section className="grid grid-cols-1 gap-4 sm:grid-cols-3">
//               {[
//                 {
//                   title: "Total NFTs",
//                   value: nfts.length,
//                   icon: ImageIcon,
//                   note: "Created or owned by you",
//                 },
//                 {
//                   title: "Published",
//                   value: publishedCount,
//                   icon: Eye,
//                   note: "Published NFT records",
//                 },
//                 {
//                   title: "Collections",
//                   value: collections.length,
//                   icon: Layers,
//                   note: "Your saved collections",
//                 },
//               ].map((stat, index) => {
//                 const Icon = stat.icon;

//                 return (
//                   <motion.article
//                     key={stat.title}
//                     initial={{ opacity: 0, y: 12 }}
//                     animate={{ opacity: 1, y: 0 }}
//                     transition={{ delay: index * 0.06 }}
//                     whileHover={{ y: -3 }}
//                     className="rounded-[22px] border border-white/[0.07] bg-[#111114] p-5 transition hover:border-[#A259FF]/30 sm:p-6"
//                   >
//                     <div className="flex items-center justify-between gap-3">
//                       <p className="text-sm text-[#85858D]">
//                         {stat.title}
//                       </p>
//                       <div className="rounded-xl bg-[#A259FF]/10 p-3 text-[#B978FF]">
//                         <Icon size={20} />
//                       </div>
//                     </div>

//                     <h2 className="mt-5 text-3xl font-bold">
//                       {stat.value.toLocaleString()}
//                     </h2>

//                     <p className="mt-2 text-xs text-[#686872]">
//                       {stat.note}
//                     </p>
//                   </motion.article>
//                 );
//               })}
//             </section>

//             {/* Tabs */}
//             <section>
//               <div className="mb-5 flex flex-wrap items-center justify-between gap-4">
//                 <div>
//                   <h2 className="text-xl font-semibold">Your NFT Portfolio</h2>
//                   <p className="mt-1 text-sm text-[#77777F]">
//                     Data fetched from your account.
//                   </p>
//                 </div>

//                 <div className="flex flex-wrap gap-2">
//                   {[
//                     { label: "All", value: "all" },
//                     { label: "Published", value: "published" },
//                     { label: "Drafts", value: "draft" },
//                   ].map((tab) => (
//                     <button
//                       key={tab.value}
//                       type="button"
//                       onClick={() => setActiveTab(tab.value)}
//                       className={`rounded-xl px-4 py-2.5 text-xs font-semibold transition sm:text-sm ${
//                         activeTab === tab.value
//                           ? "bg-[#A259FF] text-white"
//                           : "border border-white/[0.07] bg-[#111114] text-[#85858D] hover:border-[#A259FF]/30 hover:text-white"
//                       }`}
//                     >
//                       {tab.label}
//                     </button>
//                   ))}
//                 </div>
//               </div>

//               {filteredNFTs.length === 0 ? (
//                 <div className="flex min-h-[300px] flex-col items-center justify-center rounded-[24px] border border-dashed border-white/10 bg-[#101014] px-5 py-10 text-center">
//                   <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl border border-[#A259FF]/20 bg-[#A259FF]/10 text-[#B978FF]">
//                     <ImagePlus size={30} />
//                   </div>

//                   <h3 className="text-lg font-semibold">
//                     {activeTab === "draft"
//                       ? "No drafts yet"
//                       : activeTab === "published"
//                         ? "No published NFTs yet"
//                         : "Your NFT portfolio is empty"}
//                   </h3>

//                   <p className="mt-2 max-w-md text-sm leading-6 text-[#77777F]">
//                     {activeTab === "all"
//                       ? "Create your first NFT. Your saved artwork will appear here and can be displayed in the public marketplace."
//                       : "NFTs that match this filter will appear here."}
//                   </p>

//                   {activeTab === "all" && (
//                     <button
//                       type="button"
//                       onClick={openCreateForm}
//                       className="mt-5 inline-flex items-center gap-2 rounded-xl bg-[#A259FF] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#9147E8]"
//                     >
//                       <Plus size={17} />
//                       Create your first NFT
//                     </button>
//                   )}
//                 </div>
//               ) : (
//                 <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4">
//                   {filteredNFTs.map((nft, index) => {
//                     const nftId = String(nft._id || nft.id);
//                     const isDraft = nft.status === "draft";

//                     return (
//                       <motion.article
//                         key={nftId}
//                         initial={{ opacity: 0, y: 14 }}
//                         animate={{ opacity: 1, y: 0 }}
//                         transition={{ delay: Math.min(index * 0.04, 0.2) }}
//                         whileHover={{ y: -4 }}
//                         className="group overflow-hidden rounded-[22px] border border-white/[0.07] bg-[#111114] transition hover:border-[#A259FF]/35"
//                       >
//                         <button
//                           type="button"
//                           onClick={() => setSelectedNFT(nft)}
//                           className="block w-full overflow-hidden bg-[#1A1A1E] text-left"
//                           aria-label={`View ${nft.name || "NFT"} details`}
//                         >
//                           {nft.image ? (
//                             <img
//                               src={nft.image}
//                               alt={nft.name || "NFT artwork"}
//                               className="aspect-square w-full object-cover transition duration-500 group-hover:scale-[1.03]"
//                             />
//                           ) : (
//                             <div className="flex aspect-square items-center justify-center text-[#66666E]">
//                               <ImageIcon size={42} />
//                             </div>
//                           )}
//                         </button>

//                         <div className="p-4 sm:p-5">
//                           <div className="flex items-start justify-between gap-3">
//                             <h3 className="min-w-0 truncate text-base font-semibold">
//                               {nft.name || "Untitled NFT"}
//                             </h3>

//                             <span
//                               className={`shrink-0 rounded-full px-2 py-1 text-[10px] font-semibold ${
//                                 isDraft
//                                   ? "bg-amber-400/10 text-amber-300"
//                                   : "bg-emerald-400/10 text-emerald-300"
//                               }`}
//                             >
//                               {isDraft ? "Draft" : "Published"}
//                             </span>
//                           </div>

//                           <p className="mt-2 line-clamp-2 min-h-10 text-xs leading-5 text-[#77777F]">
//                             {nft.description || "No description added."}
//                           </p>

//                           <div className="mt-4 flex items-center justify-between gap-3 border-t border-white/[0.06] pt-4">
//                             <div className="min-w-0">
//                               <p className="text-[11px] text-[#686872]">
//                                 Price
//                               </p>
//                               <p className="mt-1 truncate text-sm font-semibold text-[#C49AFF]">
//                                 {nft.price ?? 0} ETH
//                               </p>
//                             </div>

//                             <p className="shrink-0 text-[11px] text-[#686872]">
//                               {formatDate(nft.createdAt)}
//                             </p>
//                           </div>

//                           <div className="mt-4 flex gap-2">
//                             <button
//                               type="button"
//                               onClick={() => setSelectedNFT(nft)}
//                               className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl border border-white/10 px-3 py-2.5 text-xs font-semibold text-gray-300 transition hover:border-[#A259FF]/40 hover:text-white"
//                             >
//                               <Eye size={15} />
//                               Details
//                             </button>

//                             <button
//                               type="button"
//                               onClick={() => handleDelete(nft)}
//                               disabled={deletingId === nftId}
//                               aria-label={`Delete ${nft.name || "NFT"}`}
//                               className="inline-flex items-center justify-center rounded-xl border border-red-400/15 bg-red-400/[0.04] px-3 py-2.5 text-red-300 transition hover:bg-red-400/10 disabled:opacity-50"
//                             >
//                               {deletingId === nftId ? (
//                                 <RefreshCw size={15} className="animate-spin" />
//                               ) : (
//                                 <Trash2 size={15} />
//                               )}
//                             </button>
//                           </div>
//                         </div>
//                       </motion.article>
//                     );
//                   })}
//                 </div>
//               )}
//             </section>
//           </>
//         ) : (
//           /* Create NFT form */
//           <section>
//             <button
//               type="button"
//               onClick={closeCreateForm}
//               className="mb-6 inline-flex items-center gap-2 text-sm font-semibold text-[#85858D] transition hover:text-white"
//             >
//               <ArrowLeft size={17} />
//               Back to My NFTs
//             </button>

//             <div className="mb-7">
//               <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#B978FF]">
//                 Nifty Verse · Creator workspace
//               </p>

//               <h1 className="mt-3 text-3xl font-bold sm:text-4xl">
//                 Create <span className="text-[#B978FF]">NFT</span>
//               </h1>

//               <p className="mt-3 max-w-2xl text-sm leading-6 text-[#85858D]">
//                 Add your artwork details and save your NFT to your account.
//               </p>
//             </div>

//             {error && (
//               <div
//                 role="alert"
//                 className="mb-5 rounded-xl border border-red-400/20 bg-red-400/[0.06] px-4 py-3 text-sm leading-6 text-red-300"
//               >
//                 {error}
//               </div>
//             )}

//             <form
//               onSubmit={handleSubmit}
//               className="grid grid-cols-1 items-start gap-6 xl:grid-cols-[minmax(0,1fr)_360px]"
//             >
//               <div className="min-w-0 rounded-[24px] border border-white/[0.07] bg-[#111114] p-5 sm:p-7">
//                 <label className="text-sm font-semibold text-white">
//                   NFT Image *
//                 </label>

//                 <input
//                   ref={fileInputRef}
//                   type="file"
//                   accept="image/png,image/jpeg,image/webp,image/gif"
//                   onChange={handleImageChange}
//                   className="hidden"
//                 />

//                 {!image ? (
//                   <button
//                     type="button"
//                     onClick={() => fileInputRef.current?.click()}
//                     className="mt-3 flex min-h-[280px] w-full flex-col items-center justify-center rounded-2xl border-2 border-dashed border-[#A259FF]/40 bg-gradient-to-br from-[#17121F] to-[#101014] p-6 transition hover:border-[#A259FF] hover:bg-[#15111B] sm:min-h-[340px]"
//                   >
//                     <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-[#A259FF]/10 text-[#B978FF]">
//                       <Upload size={28} />
//                     </div>

//                     <span className="mt-5 text-sm font-semibold">
//                       Upload NFT artwork
//                     </span>

//                     <span className="mt-2 text-xs text-[#77777F]">
//                       PNG, JPG, WEBP or GIF · Maximum 2 MB
//                     </span>
//                   </button>
//                 ) : (
//                   <div className="relative mt-3 overflow-hidden rounded-2xl border border-[#A259FF]/30 bg-[#0B0B10] p-3">
//                     <img
//                       src={image}
//                       alt="NFT preview"
//                       className="max-h-[560px] w-full rounded-xl object-contain"
//                     />

//                     <button
//                       type="button"
//                       onClick={removeImage}
//                       className="absolute right-5 top-5 flex h-10 w-10 items-center justify-center rounded-full bg-black/80 text-white transition hover:bg-red-500"
//                       aria-label="Remove image"
//                     >
//                       <X size={18} />
//                     </button>

//                     <button
//                       type="button"
//                       onClick={() => fileInputRef.current?.click()}
//                       className="absolute bottom-5 left-5 inline-flex items-center gap-2 rounded-lg bg-black/80 px-3 py-2 text-xs font-semibold text-white transition hover:bg-[#A259FF]"
//                     >
//                       <Upload size={14} />
//                       Change image
//                     </button>
//                   </div>
//                 )}

//                 <div className="mt-6">
//                   <label htmlFor="nft-name" className="text-sm font-semibold">
//                     NFT Name *
//                   </label>

//                   <input
//                     id="nft-name"
//                     name="name"
//                     value={form.name}
//                     onChange={handleChange}
//                     required
//                     maxLength={120}
//                     placeholder="Enter NFT name"
//                     className={inputClass}
//                   />
//                 </div>

//                 <div className="mt-6">
//                   <label
//                     htmlFor="nft-description"
//                     className="text-sm font-semibold"
//                   >
//                     Description *
//                   </label>

//                   <textarea
//                     id="nft-description"
//                     name="description"
//                     value={form.description}
//                     onChange={handleChange}
//                     required
//                     rows={5}
//                     maxLength={5000}
//                     placeholder="Describe your artwork..."
//                     className={`${inputClass} resize-y leading-6`}
//                   />
//                 </div>

//                 <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2">
//                   <div>
//                     <label
//                       htmlFor="nft-price"
//                       className="text-sm font-semibold"
//                     >
//                       Price (ETH) *
//                     </label>

//                     <input
//                       id="nft-price"
//                       name="price"
//                       type="number"
//                       value={form.price}
//                       onChange={handleChange}
//                       min="0"
//                       step="any"
//                       required
//                       placeholder="0.00"
//                       className={inputClass}
//                     />
//                   </div>

//                   <div>
//                     <label
//                       htmlFor="nft-bid"
//                       className="text-sm font-semibold"
//                     >
//                       Highest Bid (ETH)
//                     </label>

//                     <input
//                       id="nft-bid"
//                       name="highestBid"
//                       type="number"
//                       value={form.highestBid}
//                       onChange={handleChange}
//                       min="0"
//                       step="any"
//                       placeholder="0.00"
//                       className={inputClass}
//                     />
//                   </div>
//                 </div>

//                 <div className="mt-6">
//                   <label
//                     htmlFor="nft-category"
//                     className="text-sm font-semibold"
//                   >
//                     Category
//                   </label>

//                   <select
//                     id="nft-category"
//                     name="category"
//                     value={form.category}
//                     onChange={handleChange}
//                     className={inputClass}
//                   >
//                     <option value="Art">Art</option>
//                     <option value="Photography">Photography</option>
//                     <option value="Music">Music</option>
//                     <option value="Gaming">Gaming</option>
//                     <option value="Collectibles">Collectibles</option>
//                     <option value="Other">Other</option>
//                   </select>
//                 </div>

//                 <div className="mt-6">
//                   <label
//                     htmlFor="nft-collection"
//                     className="text-sm font-semibold"
//                   >
//                     Collection
//                   </label>

//                   <select
//                     id="nft-collection"
//                     name="collectionId"
//                     value={form.collectionId}
//                     onChange={handleChange}
//                     className={inputClass}
//                   >
//                     <option value="">No collection</option>

//                     {collections
//                       .filter(
//                         (collection) => collection.status !== "draft"
//                       )
//                       .map((collection) => (
//                         <option
//                           key={collection._id || collection.id}
//                           value={collection._id || collection.id}
//                         >
//                           {collection.name}
//                         </option>
//                       ))}
//                   </select>

//                   {collections.length === 0 && (
//                     <p className="mt-2 text-xs leading-5 text-[#77777F]">
//                       You haven't created a collection yet. You can create
//                       one from the Collections page.
//                     </p>
//                   )}
//                 </div>

//                 <div className="mt-8 flex flex-wrap justify-end gap-3 border-t border-white/[0.06] pt-6">
//                   <button
//                     type="button"
//                     onClick={closeCreateForm}
//                     disabled={saving}
//                     className="rounded-xl border border-white/10 px-5 py-3 text-sm font-semibold text-[#B6B6BE] transition hover:bg-white/[0.04] disabled:opacity-50"
//                   >
//                     Cancel
//                   </button>

//                   <button
//                     type="submit"
//                     disabled={saving}
//                     className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#A259FF] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#9147E8] disabled:cursor-not-allowed disabled:opacity-60"
//                   >
//                     {saving ? (
//                       <>
//                         <RefreshCw size={17} className="animate-spin" />
//                         Saving NFT...
//                       </>
//                     ) : (
//                       <>
//                         <Plus size={17} />
//                         Create NFT
//                       </>
//                     )}
//                   </button>
//                 </div>
//               </div>

//               {/* Live preview */}
//               <aside className="overflow-hidden rounded-[24px] border border-white/[0.07] bg-[#111114] xl:sticky xl:top-6">
//                 <div className="border-b border-white/[0.06] p-5">
//                   <p className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.18em] text-[#B978FF]">
//                     <Eye size={15} />
//                     Preview
//                   </p>
//                   <h2 className="mt-2 text-lg font-semibold">NFT Card</h2>
//                 </div>

//                 <div className="p-4">
//                   <div className="overflow-hidden rounded-2xl border border-white/[0.06] bg-[#17171B]">
//                     {image ? (
//                       <img
//                         src={image}
//                         alt="Preview of your NFT"
//                         className="aspect-square w-full object-cover"
//                       />
//                     ) : (
//                       <div className="flex aspect-square flex-col items-center justify-center text-[#686872]">
//                         <ImagePlus size={40} />
//                         <p className="mt-3 text-xs">Artwork preview</p>
//                       </div>
//                     )}

//                     <div className="p-4">
//                       <h3 className="truncate text-lg font-semibold">
//                         {form.name || "Your NFT name"}
//                       </h3>

//                       <p className="mt-2 line-clamp-3 min-h-12 text-xs leading-5 text-[#85858D]">
//                         {form.description || "Your description will appear here."}
//                       </p>

//                       <div className="mt-4 flex items-center justify-between gap-3 border-t border-white/[0.06] pt-4">
//                         <div>
//                           <p className="text-[11px] text-[#77777F]">Price</p>
//                           <p className="mt-1 text-sm font-semibold text-[#C49AFF]">
//                             {form.price || "0"} ETH
//                           </p>
//                         </div>

//                         <span className="rounded-full bg-[#A259FF]/10 px-3 py-1.5 text-xs font-semibold text-[#C49AFF]">
//                           {form.category}
//                         </span>
//                       </div>
//                     </div>
//                   </div>

//                   <p className="mt-4 text-xs leading-5 text-[#686872]">
//                     Creator identity is taken from your authenticated account,
//                     not from a name supplied by the form.
//                   </p>
//                 </div>
//               </aside>
//             </form>
//           </section>
//         )}
//       </div>

//       {/* NFT details dialog */}
//       {selectedNFT && !showCreateForm && (
//         <div
//           className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-black/80 p-4 backdrop-blur-sm"
//           onMouseDown={(event) => {
//             if (event.target === event.currentTarget) {
//               setSelectedNFT(null);
//             }
//           }}
//         >
//           <motion.section
//             initial={{ opacity: 0, y: 12, scale: 0.98 }}
//             animate={{ opacity: 1, y: 0, scale: 1 }}
//             className="my-auto w-full max-w-3xl overflow-hidden rounded-[24px] border border-white/10 bg-[#111114] shadow-2xl"
//             role="dialog"
//             aria-modal="true"
//             aria-labelledby="nft-details-title"
//           >
//             <div className="flex items-center justify-between gap-3 border-b border-white/[0.06] px-5 py-4 sm:px-6">
//               <h2 id="nft-details-title" className="text-lg font-semibold">
//                 NFT Details
//               </h2>

//               <button
//                 type="button"
//                 onClick={() => setSelectedNFT(null)}
//                 className="flex h-9 w-9 items-center justify-center rounded-xl border border-white/10 text-[#A7A7AF] transition hover:bg-white/[0.05] hover:text-white"
//                 aria-label="Close details"
//               >
//                 <X size={18} />
//               </button>
//             </div>

//             <div className="grid grid-cols-1 gap-5 p-5 sm:p-6 md:grid-cols-2">
//               <div className="overflow-hidden rounded-2xl bg-[#19191D]">
//                 {selectedNFT.image ? (
//                   <img
//                     src={selectedNFT.image}
//                     alt={selectedNFT.name || "NFT artwork"}
//                     className="aspect-square w-full object-cover"
//                   />
//                 ) : (
//                   <div className="flex aspect-square items-center justify-center text-[#686872]">
//                     <ImageIcon size={40} />
//                   </div>
//                 )}
//               </div>

//               <div className="min-w-0">
//                 <span className="inline-flex rounded-full bg-[#A259FF]/10 px-3 py-1 text-xs font-semibold capitalize text-[#C49AFF]">
//                   {selectedNFT.status || "published"}
//                 </span>

//                 <h3 className="mt-4 break-words text-2xl font-bold">
//                   {selectedNFT.name || "Untitled NFT"}
//                 </h3>

//                 <p className="mt-3 whitespace-pre-wrap break-words text-sm leading-6 text-[#85858D]">
//                   {selectedNFT.description || "No description added."}
//                 </p>

//                 <div className="mt-5 space-y-4 border-t border-white/[0.06] pt-5">
//                   <div>
//                     <p className="text-xs text-[#686872]">Creator</p>
//                     <p className="mt-1 break-words text-sm font-semibold">
//                       {selectedNFT.creator || user?.username || "Creator"}
//                     </p>
//                   </div>

//                   <div>
//                     <p className="text-xs text-[#686872]">Price</p>
//                     <p className="mt-1 text-lg font-semibold text-[#C49AFF]">
//                       {selectedNFT.price ?? 0} ETH
//                     </p>
//                   </div>

//                   <div>
//                     <p className="flex items-center gap-2 text-xs text-[#686872]">
//                       <CalendarDays size={14} />
//                       Created
//                     </p>
//                     <p className="mt-1 text-sm">
//                       {formatDate(selectedNFT.createdAt)}
//                     </p>
//                   </div>

//                   {selectedNFT.collectionRef?.name && (
//                     <div>
//                       <p className="text-xs text-[#686872]">Collection</p>
//                       <p className="mt-1 text-sm font-semibold">
//                         {selectedNFT.collectionRef.name}
//                       </p>
//                     </div>
//                   )}
//                 </div>

//                 <button
//                   type="button"
//                   onClick={() => handleDelete(selectedNFT)}
//                   disabled={
//                     deletingId === String(selectedNFT._id || selectedNFT.id)
//                   }
//                   className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-xl border border-red-400/20 bg-red-400/[0.05] px-4 py-3 text-sm font-semibold text-red-300 transition hover:bg-red-400/10 disabled:opacity-50"
//                 >
//                   <Trash2 size={16} />
//                   Delete NFT
//                 </button>
//               </div>
//             </div>
//           </motion.section>
//         </div>
//       )}
//     </main>
//   );
// }






// import React, { useCallback, useEffect, useRef, useState } from "react";
// import { motion } from "framer-motion";
// import { useNavigate } from "react-router-dom";
// import {
//   ImagePlus,
//   Plus,
//   Upload,
//   X,
//   ArrowLeft,
//   Trash2,
//   Layers,
//   RefreshCw,
//   Sparkles,
//   Image as ImageIcon,
//   Eye,
//   CalendarDays,
//   Search,
// } from "lucide-react";

// const API_URL =
//   import.meta.env.VITE_API_URL ||
//   "https://nifty-verse-backend-production.up.railway.app";

// const INITIAL_FORM = {
//   name: "",
//   description: "",
//   price: "",
//   highestBid: "",
//   category: "Art",
//   collectionId: "",
// };

// const inputClass =
//   "mt-2 w-full rounded-xl border border-white/10 bg-[#0B0B10] px-4 py-3 text-sm text-white outline-none placeholder:text-gray-600 transition focus:border-[#A259FF]";

// const formatDate = (date) => {
//   if (!date) return "Date unavailable";

//   const parsedDate = new Date(date);

//   if (Number.isNaN(parsedDate.getTime())) {
//     return "Date unavailable";
//   }

//   return parsedDate.toLocaleDateString("en-IN", {
//     day: "2-digit",
//     month: "short",
//     year: "numeric",
//   });
// };

// const getDisplayName = (user) =>
//   user?.username ||
//   user?.name ||
//   user?.fullName ||
//   user?.email?.split("@")[0] ||
//   "Creator";

// const getInitials = (name = "Creator") =>
//   String(name)
//     .trim()
//     .split(/\s+/)
//     .filter(Boolean)
//     .slice(0, 2)
//     .map((part) => part.charAt(0).toUpperCase())
//     .join("") || "C";

// const getErrorMessage = (data, fallback) =>
//   data?.message || fallback;

// const getNFTId = (nft) => String(nft?._id || nft?.id || "");

// const NFT = () => {
//   const navigate = useNavigate();
//   const fileInputRef = useRef(null);

//   const [user, setUser] = useState(null);
//   const [nfts, setNfts] = useState([]);
//   const [collections, setCollections] = useState([]);

//   const [activeTab, setActiveTab] = useState("all");
//   const [searchTerm, setSearchTerm] = useState("");

//   const [showCreateForm, setShowCreateForm] = useState(false);
//   const [selectedNFT, setSelectedNFT] = useState(null);

//   const [image, setImage] = useState("");
//   const [form, setForm] = useState(INITIAL_FORM);

//   const [loading, setLoading] = useState(true);
//   const [saving, setSaving] = useState(false);
//   const [refreshing, setRefreshing] = useState(false);
//   const [deletingId, setDeletingId] = useState("");

//   const [error, setError] = useState("");
//   const [success, setSuccess] = useState("");

//   const creatorName = getDisplayName(user);
//   const creatorInitials = getInitials(creatorName);
//   const creatorAvatar = user?.profileImage || user?.avatar || user?.image || "";

//   // =========================================================
//   // FETCH REAL USER, NFT AND COLLECTION DATA
//   // =========================================================

//   const loadData = useCallback(
//     async (isRefresh = false) => {
//       const token = localStorage.getItem("token");

//       if (!token) {
//         localStorage.removeItem("user");
//         navigate("/signin", { replace: true });
//         return;
//       }

//       if (isRefresh) {
//         setRefreshing(true);
//       } else {
//         setLoading(true);
//       }

//       setError("");
//       setSuccess("");

//       try {
//         const headers = {
//           Authorization: `Bearer ${token}`,
//         };

//         const [profileResponse, nftResponse, collectionResponse] =
//           await Promise.all([
//             fetch(`${API_URL}/api/auth/me`, { headers }),
//             fetch(`${API_URL}/api/nfts/mine`, { headers }),
//             fetch(`${API_URL}/api/collections/mine`, { headers }),
//           ]);

//         const [profileData, nftData, collectionData] = await Promise.all([
//           profileResponse.json().catch(() => ({})),
//           nftResponse.json().catch(() => ({})),
//           collectionResponse.json().catch(() => ({})),
//         ]);

//         if (
//           profileResponse.status === 401 ||
//           nftResponse.status === 401 ||
//           collectionResponse.status === 401
//         ) {
//           localStorage.removeItem("token");
//           localStorage.removeItem("user");
//           navigate("/signin", { replace: true });
//           return;
//         }

//         if (!profileResponse.ok || !profileData.user) {
//           throw new Error(
//             getErrorMessage(profileData, "Unable to load your profile.")
//           );
//         }

//         if (!nftResponse.ok || nftData.success === false) {
//           throw new Error(
//             getErrorMessage(nftData, "Unable to load your NFTs.")
//           );
//         }

//         if (!collectionResponse.ok || collectionData.success === false) {
//           throw new Error(
//             getErrorMessage(
//               collectionData,
//               "Unable to load your collections."
//             )
//           );
//         }

//         const verifiedUser = profileData.user;

//         setUser(verifiedUser);
//         setNfts(Array.isArray(nftData.nfts) ? nftData.nfts : []);
//         setCollections(
//           Array.isArray(collectionData.collections)
//             ? collectionData.collections
//             : []
//         );

//         localStorage.setItem("user", JSON.stringify(verifiedUser));
//       } catch (fetchError) {
//         console.error("Load NFT data error:", fetchError);
//         setError(fetchError.message || "Unable to load NFT data.");
//       } finally {
//         setLoading(false);
//         setRefreshing(false);
//       }
//     },
//     [navigate]
//   );

//   useEffect(() => {
//     loadData();
//   }, [loadData]);

//   // =========================================================
//   // FORM HANDLERS
//   // =========================================================

//   const handleChange = (event) => {
//     const { name, value } = event.target;

//     setForm((previous) => ({
//       ...previous,
//       [name]: value,
//     }));

//     setError("");
//     setSuccess("");
//   };

//   const handleImageChange = (event) => {
//     const file = event.target.files?.[0];

//     if (!file) return;

//     if (!file.type.startsWith("image/")) {
//       setError("Please select a valid image.");
//       event.target.value = "";
//       return;
//     }

//     if (file.size > 2 * 1024 * 1024) {
//       setError("Please select an image smaller than 2 MB.");
//       event.target.value = "";
//       return;
//     }

//     const reader = new FileReader();

//     reader.onload = () => {
//       setImage(String(reader.result || ""));
//       setError("");
//       setSuccess("");
//     };

//     reader.onerror = () => {
//       setError("Unable to read the image. Please try another file.");
//     };

//     reader.readAsDataURL(file);
//   };

//   const removeImage = () => {
//     setImage("");

//     if (fileInputRef.current) {
//       fileInputRef.current.value = "";
//     }
//   };

//   const openCreateForm = () => {
//     setForm(INITIAL_FORM);
//     setImage("");
//     setError("");
//     setSuccess("");
//     setSelectedNFT(null);
//     setShowCreateForm(true);

//     if (fileInputRef.current) {
//       fileInputRef.current.value = "";
//     }
//   };

//   const closeCreateForm = () => {
//     setShowCreateForm(false);
//     setForm(INITIAL_FORM);
//     setImage("");
//     setError("");

//     if (fileInputRef.current) {
//       fileInputRef.current.value = "";
//     }
//   };

//   // =========================================================
//   // CREATE NFT - SAVE TO BACKEND DATABASE
//   // =========================================================

//   const handleSubmit = async (event) => {
//     event.preventDefault();

//     setError("");
//     setSuccess("");

//     if (!image) {
//       setError("Please upload an NFT image.");
//       return;
//     }

//     if (!form.name.trim()) {
//       setError("Please enter an NFT name.");
//       return;
//     }

//     if (!form.description.trim()) {
//       setError("Please enter an NFT description.");
//       return;
//     }

//     if (
//       form.price === "" ||
//       !Number.isFinite(Number(form.price)) ||
//       Number(form.price) <= 0
//     ) {
//       setError("Please enter a valid price greater than zero.");
//       return;
//     }

//     if (
//       form.highestBid === "" ||
//       !Number.isFinite(Number(form.highestBid)) ||
//       Number(form.highestBid) < 0
//     ) {
//       setError("Please enter a valid highest bid.");
//       return;
//     }

//     if (
//       form.collectionId &&
//       !collections.some(
//         (collection) =>
//           String(collection._id || collection.id) ===
//             String(form.collectionId) &&
//           collection.status !== "draft"
//       )
//     ) {
//       setError("Please select one of your published collections.");
//       return;
//     }

//     const token = localStorage.getItem("token");

//     if (!token) {
//       navigate("/signin", { replace: true });
//       return;
//     }

//     try {
//       setSaving(true);

//       const response = await fetch(`${API_URL}/api/nfts`, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${token}`,
//         },
//         body: JSON.stringify({
//           name: form.name.trim(),
//           description: form.description.trim(),
//           image,
//           price: Number(form.price),
//           highestBid: Number(form.highestBid),
//           category: form.category,
//           collectionId: form.collectionId || null,
//           status: "published",
//         }),
//       });

//       const data = await response.json().catch(() => ({}));

//       if (response.status === 401) {
//         localStorage.removeItem("token");
//         localStorage.removeItem("user");
//         navigate("/signin", { replace: true });
//         return;
//       }

//       if (!response.ok || !data.success || !data.nft) {
//         throw new Error(
//           getErrorMessage(data, "Unable to create NFT.")
//         );
//       }

//       setNfts((previous) => [
//         data.nft,
//         ...previous.filter(
//           (item) => getNFTId(item) !== getNFTId(data.nft)
//         ),
//       ]);

//       setSuccess(data.message || "NFT created successfully.");
//       setActiveTab("all");
//       setSearchTerm("");
//       setShowCreateForm(false);
//       setSelectedNFT(null);
//       setForm(INITIAL_FORM);
//       setImage("");

//       if (fileInputRef.current) {
//         fileInputRef.current.value = "";
//       }
//     } catch (submitError) {
//       console.error("Create NFT error:", submitError);
//       setError(submitError.message || "Unable to create NFT.");
//     } finally {
//       setSaving(false);
//     }
//   };

//   // =========================================================
//   // DELETE NFT - DELETE FROM BACKEND DATABASE
//   // =========================================================

//   const handleDelete = async (nft) => {
//     const nftId = getNFTId(nft);

//     if (!nftId || nftId === "undefined") {
//       setError("This NFT has no valid database ID.");
//       return;
//     }

//     if (!window.confirm(`Delete "${nft.name || "this NFT"}"?`)) {
//       return;
//     }

//     const token = localStorage.getItem("token");

//     if (!token) {
//       navigate("/signin", { replace: true });
//       return;
//     }

//     setDeletingId(nftId);
//     setError("");
//     setSuccess("");

//     try {
//       const response = await fetch(
//         `${API_URL}/api/nfts/${encodeURIComponent(nftId)}`,
//         {
//           method: "DELETE",
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );

//       const data = await response.json().catch(() => ({}));

//       if (response.status === 401) {
//         localStorage.removeItem("token");
//         localStorage.removeItem("user");
//         navigate("/signin", { replace: true });
//         return;
//       }

//       if (!response.ok || !data.success) {
//         throw new Error(
//           getErrorMessage(data, "Unable to delete this NFT.")
//         );
//       }

//       setNfts((previous) =>
//         previous.filter((item) => getNFTId(item) !== nftId)
//       );

//       setSelectedNFT(null);
//       setSuccess(data.message || "NFT deleted successfully.");
//     } catch (deleteError) {
//       console.error("Delete NFT error:", deleteError);
//       setError(deleteError.message || "Unable to delete this NFT.");
//     } finally {
//       setDeletingId("");
//     }
//   };

//   // =========================================================
//   // FILTER AND STATS
//   // =========================================================

//   const filteredNFTs = nfts.filter((nft) => {
//     const query = searchTerm.toLowerCase().trim();

//     const matchesSearch =
//       !query ||
//       String(nft.name || "").toLowerCase().includes(query) ||
//       String(nft.description || "").toLowerCase().includes(query) ||
//       String(nft.creator || creatorName).toLowerCase().includes(query);

//     if (activeTab === "published") {
//       return nft.status === "published" && matchesSearch;
//     }

//     if (activeTab === "draft") {
//       return nft.status === "draft" && matchesSearch;
//     }

//     return matchesSearch;
//   });

//   const publishedCount = nfts.filter(
//     (nft) => nft.status === "published"
//   ).length;

//   const draftCount = nfts.filter(
//     (nft) => nft.status === "draft"
//   ).length;

//   const publishedCollections = collections.filter(
//     (collection) => collection.status !== "draft"
//   );

//   // =========================================================
//   // LOADING STATE
//   // =========================================================

//   if (loading) {
//     return (
//       <div className="flex min-h-[45vh] items-center justify-center bg-[#08080A] text-sm text-[#A7A7AF]">
//         <div className="flex items-center gap-3">
//           <span className="h-5 w-5 animate-spin rounded-full border-2 border-[#A259FF]/30 border-t-[#A259FF]" />
//           Loading your NFTs...
//         </div>
//       </div>
//     );
//   }

//   // =========================================================
//   // PAGE
//   // =========================================================

//   return (
//     <main className="min-h-full overflow-x-hidden bg-[#08080A] px-4 py-6 text-white sm:px-6 sm:py-8 xl:px-8">
//       <div className="mx-auto max-w-[1600px] space-y-7">

//         {!showCreateForm ? (
//           <>
//             {/* PAGE HEADER */}

//             <motion.section
//               initial={{ opacity: 0, y: 14 }}
//               animate={{ opacity: 1, y: 0 }}
//               className="group relative overflow-hidden rounded-[26px] border border-white/[0.07] bg-[#111114] p-5 sm:p-7 lg:p-8"
//             >
//               <div className="pointer-events-none absolute -right-12 -top-16 h-60 w-60 rounded-full bg-[#A259FF]/10 blur-3xl transition group-hover:bg-[#A259FF]/15" />

//               <div className="relative flex flex-col justify-between gap-6 sm:flex-row sm:items-center">
//                 <div className="min-w-0">
//                   <p className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-[#B978FF]">
//                     <Sparkles size={15} />
//                     Nifty Verse · Creator workspace
//                   </p>

//                   <h1 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
//                     My <span className="text-[#B978FF]">NFTs</span>
//                   </h1>

//                   <p className="mt-3 max-w-2xl text-sm leading-6 text-[#85858D]">
//                     Create and manage your digital artwork, update your
//                     portfolio, and organize NFTs into your own collections.
//                   </p>

//                   <p className="mt-3 text-xs text-[#686872]">
//                     Signed in as{" "}
//                     <span className="font-semibold text-[#C49AFF]">
//                       {creatorName}
//                     </span>
//                   </p>
//                 </div>

//                 <div className="flex shrink-0 flex-wrap gap-3">
//                   <button
//                     type="button"
//                     onClick={() => loadData(true)}
//                     disabled={refreshing}
//                     className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm font-semibold text-gray-200 transition hover:border-[#A259FF]/40 disabled:opacity-60"
//                   >
//                     <RefreshCw
//                       size={16}
//                       className={refreshing ? "animate-spin" : ""}
//                     />
//                     Refresh
//                   </button>

//                   <button
//                     type="button"
//                     onClick={openCreateForm}
//                     className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#A259FF] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#9147E8]"
//                   >
//                     <Plus size={18} />
//                     Create NFT
//                   </button>
//                 </div>
//               </div>
//             </motion.section>

//             {/* FEEDBACK */}

//             {error && (
//               <div
//                 role="alert"
//                 className="rounded-xl border border-red-400/20 bg-red-400/[0.06] px-4 py-3 text-sm leading-6 text-red-300"
//               >
//                 {error}
//               </div>
//             )}

//             {success && (
//               <div
//                 role="status"
//                 className="rounded-xl border border-emerald-400/20 bg-emerald-400/[0.06] px-4 py-3 text-sm text-emerald-300"
//               >
//                 {success}
//               </div>
//             )}

//             {/* REAL DATABASE STATS */}

//             <section className="grid grid-cols-1 gap-4 sm:grid-cols-3">
//               {[
//                 {
//                   title: "Total NFTs",
//                   value: nfts.length,
//                   icon: ImageIcon,
//                   note: "Created or owned by you",
//                 },
//                 {
//                   title: "Published",
//                   value: publishedCount,
//                   icon: Eye,
//                   note: "Published NFT records",
//                 },
//                 {
//                   title: "Drafts",
//                   value: draftCount,
//                   icon: Layers,
//                   note: "Unpublished NFT records",
//                 },
//               ].map((stat, index) => {
//                 const Icon = stat.icon;

//                 return (
//                   <motion.article
//                     key={stat.title}
//                     initial={{ opacity: 0, y: 12 }}
//                     animate={{ opacity: 1, y: 0 }}
//                     transition={{ delay: index * 0.06 }}
//                     whileHover={{ y: -3 }}
//                     className="rounded-[22px] border border-white/[0.07] bg-[#111114] p-5 transition hover:border-[#A259FF]/30 sm:p-6"
//                   >
//                     <div className="flex items-center justify-between gap-3">
//                       <p className="text-sm text-[#85858D]">{stat.title}</p>

//                       <div className="rounded-xl bg-[#A259FF]/10 p-3 text-[#B978FF]">
//                         <Icon size={20} />
//                       </div>
//                     </div>

//                     <h2 className="mt-5 text-3xl font-bold">
//                       {stat.value.toLocaleString()}
//                     </h2>

//                     <p className="mt-2 text-xs text-[#686872]">
//                       {stat.note}
//                     </p>
//                   </motion.article>
//                 );
//               })}
//             </section>

//             {/* NFT PORTFOLIO */}

//             <section>
//               <div className="mb-5 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
//                 <div>
//                   <h2 className="text-xl font-semibold">
//                     Your NFT Portfolio
//                   </h2>

//                   <p className="mt-1 text-sm text-[#77777F]">
//                     These records are fetched from your account.
//                   </p>
//                 </div>

//                 {/* SEARCH */}

//                 <div className="relative w-full lg:max-w-sm">
//                   <Search
//                     size={17}
//                     className="absolute left-4 top-1/2 -translate-y-1/2 text-[#77777F]"
//                   />

//                   <input
//                     type="search"
//                     value={searchTerm}
//                     onChange={(event) => setSearchTerm(event.target.value)}
//                     placeholder="Search your NFTs..."
//                     className="w-full rounded-xl border border-white/10 bg-[#111114] py-3 pl-11 pr-4 text-sm text-white outline-none transition placeholder:text-gray-600 focus:border-[#A259FF]"
//                   />
//                 </div>
//               </div>

//               {/* FILTER TABS */}

//               <div className="mb-6 flex flex-wrap gap-2">
//                 {[
//                   { label: `All (${nfts.length})`, value: "all" },
//                   {
//                     label: `Published (${publishedCount})`,
//                     value: "published",
//                   },
//                   { label: `Drafts (${draftCount})`, value: "draft" },
//                 ].map((tab) => (
//                   <button
//                     key={tab.value}
//                     type="button"
//                     onClick={() => setActiveTab(tab.value)}
//                     className={`rounded-xl px-4 py-2.5 text-xs font-semibold transition sm:text-sm ${
//                       activeTab === tab.value
//                         ? "bg-[#A259FF] text-white"
//                         : "border border-white/[0.07] bg-[#111114] text-[#85858D] hover:border-[#A259FF]/30 hover:text-white"
//                     }`}
//                   >
//                     {tab.label}
//                   </button>
//                 ))}
//               </div>

//               {/* EMPTY STATE */}

//               {filteredNFTs.length === 0 ? (
//                 <div className="flex min-h-[300px] flex-col items-center justify-center rounded-[24px] border border-dashed border-white/10 bg-[#101014] px-5 py-10 text-center">
//                   <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl border border-[#A259FF]/20 bg-[#A259FF]/10 text-[#B978FF]">
//                     <ImagePlus size={30} />
//                   </div>

//                   <h3 className="text-lg font-semibold">
//                     {searchTerm
//                       ? "No matching NFTs"
//                       : activeTab === "draft"
//                         ? "No drafts yet"
//                         : activeTab === "published"
//                           ? "No published NFTs yet"
//                           : "Your NFT portfolio is empty"}
//                   </h3>

//                   <p className="mt-2 max-w-md text-sm leading-6 text-[#77777F]">
//                     {searchTerm
//                       ? "Try searching with a different name."
//                       : "Create your first NFT. After it is saved, it will appear here and can be shown in the public marketplace."}
//                   </p>

//                   {!searchTerm && activeTab === "all" && (
//                     <button
//                       type="button"
//                       onClick={openCreateForm}
//                       className="mt-5 inline-flex items-center gap-2 rounded-xl bg-[#A259FF] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#9147E8]"
//                     >
//                       <Plus size={17} />
//                       Create your first NFT
//                     </button>
//                   )}
//                 </div>
//               ) : (
//                 <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4">
//                   {filteredNFTs.map((nft, index) => {
//                     const nftId = getNFTId(nft);
//                     const isDraft = nft.status === "draft";

//                     return (
//                       <motion.article
//                         key={nftId}
//                         initial={{ opacity: 0, y: 14 }}
//                         animate={{ opacity: 1, y: 0 }}
//                         transition={{
//                           delay: Math.min(index * 0.04, 0.2),
//                         }}
//                         whileHover={{ y: -4 }}
//                         className="group overflow-hidden rounded-[22px] border border-white/[0.07] bg-[#111114] transition hover:border-[#A259FF]/35"
//                       >
//                         {/* IMAGE */}

//                         <button
//                           type="button"
//                           onClick={() => setSelectedNFT(nft)}
//                           className="block w-full overflow-hidden bg-[#1A1A1E] text-left"
//                           aria-label={`View ${nft.name || "NFT"} details`}
//                         >
//                           {nft.image ? (
//                             <img
//                               src={nft.image}
//                               alt={nft.name || "NFT artwork"}
//                               className="aspect-square w-full object-cover transition duration-500 group-hover:scale-[1.03]"
//                             />
//                           ) : (
//                             <div className="flex aspect-square items-center justify-center text-[#66666E]">
//                               <ImageIcon size={42} />
//                             </div>
//                           )}
//                         </button>

//                         {/* CARD DETAILS */}

//                         <div className="p-4 sm:p-5">
//                           <div className="flex items-start justify-between gap-3">
//                             <h3 className="min-w-0 truncate text-base font-semibold">
//                               {nft.name || "Untitled NFT"}
//                             </h3>

//                             <span
//                               className={`shrink-0 rounded-full px-2 py-1 text-[10px] font-semibold ${
//                                 isDraft
//                                   ? "bg-amber-400/10 text-amber-300"
//                                   : "bg-emerald-400/10 text-emerald-300"
//                               }`}
//                             >
//                               {isDraft ? "Draft" : "Published"}
//                             </span>
//                           </div>

//                           {/* CREATOR */}

//                           <div className="mt-3 flex min-w-0 items-center gap-2">
//                             <div className="flex h-7 w-7 shrink-0 items-center justify-center overflow-hidden rounded-full border border-[#A259FF]/20 bg-[#A259FF]/10 text-[10px] font-bold text-[#C49AFF]">
//                               {nft.creatorAvatar || creatorAvatar ? (
//                                 <img
//                                   src={nft.creatorAvatar || creatorAvatar}
//                                   alt={nft.creator || creatorName}
//                                   className="h-full w-full object-cover"
//                                 />
//                               ) : (
//                                 getInitials(nft.creator || creatorName)
//                               )}
//                             </div>

//                             <p className="truncate text-xs text-[#B7B7C0]">
//                               {nft.creator || creatorName}
//                             </p>
//                           </div>

//                           <p className="mt-3 line-clamp-2 min-h-10 text-xs leading-5 text-[#77777F]">
//                             {nft.description || "No description added."}
//                           </p>

//                           {/* PRICE + HIGHEST BID */}

//                           <div className="mt-4 grid grid-cols-2 gap-3 border-t border-white/[0.06] pt-4">
//                             <div className="min-w-0">
//                               <p className="text-[11px] text-[#686872]">
//                                 Price
//                               </p>

//                               <p className="mt-1 truncate text-sm font-semibold text-[#C49AFF]">
//                                 {nft.price ?? 0} ETH
//                               </p>
//                             </div>

//                             <div className="min-w-0 text-right">
//                               <p className="text-[11px] text-[#686872]">
//                                 Highest Bid
//                               </p>

//                               <p className="mt-1 truncate text-sm font-semibold text-white">
//                                 {nft.highestBid ?? 0} ETH
//                               </p>
//                             </div>
//                           </div>

//                           <div className="mt-4 flex items-center justify-between gap-3">
//                             <p className="truncate text-[11px] text-[#686872]">
//                               {formatDate(nft.createdAt)}
//                             </p>

//                             <span className="shrink-0 rounded-full bg-white/[0.04] px-2.5 py-1 text-[10px] text-[#85858D]">
//                               {nft.category || "Art"}
//                             </span>
//                           </div>

//                           {/* ACTIONS */}

//                           <div className="mt-4 flex gap-2">
//                             <button
//                               type="button"
//                               onClick={() => setSelectedNFT(nft)}
//                               className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl border border-white/10 px-3 py-2.5 text-xs font-semibold text-gray-300 transition hover:border-[#A259FF]/40 hover:text-white"
//                             >
//                               <Eye size={15} />
//                               Details
//                             </button>

//                             <button
//                               type="button"
//                               onClick={() => handleDelete(nft)}
//                               disabled={deletingId === nftId}
//                               aria-label={`Delete ${nft.name || "NFT"}`}
//                               className="inline-flex items-center justify-center rounded-xl border border-red-400/15 bg-red-400/[0.04] px-3 py-2.5 text-red-300 transition hover:bg-red-400/10 disabled:opacity-50"
//                             >
//                               {deletingId === nftId ? (
//                                 <RefreshCw
//                                   size={15}
//                                   className="animate-spin"
//                                 />
//                               ) : (
//                                 <Trash2 size={15} />
//                               )}
//                             </button>
//                           </div>
//                         </div>
//                       </motion.article>
//                     );
//                   })}
//                 </div>
//               )}
//             </section>
//           </>
//         ) : (
//           /* =====================================================
//              CREATE NFT FORM
//           ===================================================== */

//           <section>
//             <button
//               type="button"
//               onClick={closeCreateForm}
//               className="mb-6 inline-flex items-center gap-2 text-sm font-semibold text-[#85858D] transition hover:text-white"
//             >
//               <ArrowLeft size={17} />
//               Back to My NFTs
//             </button>

//             <div className="mb-7">
//               <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#B978FF]">
//                 Nifty Verse · Creator workspace
//               </p>

//               <h1 className="mt-3 text-3xl font-bold sm:text-4xl">
//                 Create <span className="text-[#B978FF]">NFT</span>
//               </h1>

//               <p className="mt-3 max-w-2xl text-sm leading-6 text-[#85858D]">
//                 Fill in the details below. These details will be saved with
//                 your NFT and used to display its card in the marketplace.
//               </p>
//             </div>

//             {error && (
//               <div
//                 role="alert"
//                 className="mb-5 rounded-xl border border-red-400/20 bg-red-400/[0.06] px-4 py-3 text-sm leading-6 text-red-300"
//               >
//                 {error}
//               </div>
//             )}

//             <form
//               onSubmit={handleSubmit}
//               className="grid grid-cols-1 items-start gap-6 xl:grid-cols-[minmax(0,1fr)_360px]"
//             >
//               {/* LEFT FORM */}

//               <div className="min-w-0 rounded-[24px] border border-white/[0.07] bg-[#111114] p-5 sm:p-7">
//                 {/* IMAGE UPLOAD */}

//                 <label className="text-sm font-semibold text-white">
//                   NFT Image *
//                 </label>

//                 <p className="mt-1 text-xs leading-5 text-[#77777F]">
//                   This image will appear on your marketplace NFT card.
//                 </p>

//                 <input
//                   ref={fileInputRef}
//                   type="file"
//                   accept="image/png,image/jpeg,image/webp,image/gif"
//                   onChange={handleImageChange}
//                   className="hidden"
//                 />

//                 {!image ? (
//                   <button
//                     type="button"
//                     onClick={() => fileInputRef.current?.click()}
//                     className="mt-3 flex min-h-[280px] w-full flex-col items-center justify-center rounded-2xl border-2 border-dashed border-[#A259FF]/40 bg-gradient-to-br from-[#17121F] to-[#101014] p-6 transition hover:border-[#A259FF] hover:bg-[#15111B] sm:min-h-[340px]"
//                   >
//                     <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-[#A259FF]/10 text-[#B978FF]">
//                       <Upload size={28} />
//                     </div>

//                     <span className="mt-5 text-sm font-semibold">
//                       Upload NFT artwork
//                     </span>

//                     <span className="mt-2 text-xs text-[#77777F]">
//                       PNG, JPG, WEBP or GIF · Maximum 2 MB
//                     </span>
//                   </button>
//                 ) : (
//                   <div className="relative mt-3 overflow-hidden rounded-2xl border border-[#A259FF]/30 bg-[#0B0B10] p-3">
//                     <img
//                       src={image}
//                       alt="NFT preview"
//                       className="max-h-[560px] w-full rounded-xl object-contain"
//                     />

//                     <button
//                       type="button"
//                       onClick={removeImage}
//                       className="absolute right-5 top-5 flex h-10 w-10 items-center justify-center rounded-full bg-black/80 text-white transition hover:bg-red-500"
//                       aria-label="Remove image"
//                     >
//                       <X size={18} />
//                     </button>

//                     <button
//                       type="button"
//                       onClick={() => fileInputRef.current?.click()}
//                       className="absolute bottom-5 left-5 inline-flex items-center gap-2 rounded-lg bg-black/80 px-3 py-2 text-xs font-semibold text-white transition hover:bg-[#A259FF]"
//                     >
//                       <Upload size={14} />
//                       Change image
//                     </button>
//                   </div>
//                 )}

//                 {/* NFT NAME */}

//                 <div className="mt-6">
//                   <label
//                     htmlFor="nft-name"
//                     className="text-sm font-semibold text-white"
//                   >
//                     NFT Name *
//                   </label>

//                   <input
//                     id="nft-name"
//                     name="name"
//                     value={form.name}
//                     onChange={handleChange}
//                     required
//                     maxLength={120}
//                     placeholder="Example: Magic Mushroom 0325"
//                     className={inputClass}
//                   />

//                   <p className="mt-1 text-right text-[11px] text-[#686872]">
//                     {form.name.length}/120
//                   </p>
//                 </div>

//                 {/* CREATOR - AUTO FROM ACCOUNT */}

//                 <div className="mt-6">
//                   <label
//                     htmlFor="nft-creator"
//                     className="text-sm font-semibold text-white"
//                   >
//                     Creator
//                   </label>

//                   <div className="mt-2 flex items-center gap-3 rounded-xl border border-white/10 bg-[#0B0B10] px-4 py-3">
//                     <div className="flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-full border border-[#A259FF]/30 bg-[#A259FF]/15 text-sm font-bold text-[#C49AFF]">
//                       {creatorAvatar ? (
//                         <img
//                           src={creatorAvatar}
//                           alt={creatorName}
//                           className="h-full w-full object-cover"
//                         />
//                       ) : (
//                         creatorInitials
//                       )}
//                     </div>

//                     <div className="min-w-0 flex-1">
//                       <input
//                         id="nft-creator"
//                         value={creatorName}
//                         readOnly
//                         className="w-full cursor-not-allowed bg-transparent text-sm font-semibold text-white outline-none"
//                       />

//                       <p className="mt-1 text-xs text-[#77777F]">
//                         Linked to your logged-in account
//                       </p>
//                     </div>
//                   </div>

//                   <p className="mt-2 text-xs leading-5 text-[#686872]">
//                     Creator identity is assigned by the backend from your
//                     authenticated account, so it cannot be changed here.
//                   </p>
//                 </div>

//                 {/* DESCRIPTION */}

//                 <div className="mt-6">
//                   <label
//                     htmlFor="nft-description"
//                     className="text-sm font-semibold text-white"
//                   >
//                     Description *
//                   </label>

//                   <textarea
//                     id="nft-description"
//                     name="description"
//                     value={form.description}
//                     onChange={handleChange}
//                     required
//                     rows={5}
//                     maxLength={5000}
//                     placeholder="Describe your NFT artwork..."
//                     className={`${inputClass} resize-y leading-6`}
//                   />

//                   <p className="mt-1 text-right text-[11px] text-[#686872]">
//                     {form.description.length}/5000
//                   </p>
//                 </div>

//                 {/* PRICE + HIGHEST BID */}

//                 <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2">
//                   <div>
//                     <label
//                       htmlFor="nft-price"
//                       className="text-sm font-semibold text-white"
//                     >
//                       Price (ETH) *
//                     </label>

//                     <input
//                       id="nft-price"
//                       name="price"
//                       type="number"
//                       value={form.price}
//                       onChange={handleChange}
//                       min="0.000001"
//                       step="any"
//                       required
//                       placeholder="Example: 1.63"
//                       className={inputClass}
//                     />

//                     <p className="mt-1 text-xs text-[#686872]">
//                       Asking price shown on your NFT card.
//                     </p>
//                   </div>

//                   <div>
//                     <label
//                       htmlFor="nft-bid"
//                       className="text-sm font-semibold text-white"
//                     >
//                       Highest Bid (ETH) *
//                     </label>

//                     <input
//                       id="nft-bid"
//                       name="highestBid"
//                       type="number"
//                       value={form.highestBid}
//                       onChange={handleChange}
//                       min="0"
//                       step="any"
//                       required
//                       placeholder="Example: 0.33"
//                       className={inputClass}
//                     />

//                     <p className="mt-1 text-xs text-[#686872]">
//                       Highest bid value shown on your NFT card.
//                     </p>
//                   </div>
//                 </div>

//                 {/* CATEGORY */}

//                 <div className="mt-6">
//                   <label
//                     htmlFor="nft-category"
//                     className="text-sm font-semibold text-white"
//                   >
//                     Category *
//                   </label>

//                   <select
//                     id="nft-category"
//                     name="category"
//                     value={form.category}
//                     onChange={handleChange}
//                     required
//                     className={inputClass}
//                   >
//                     <option value="Art">Art</option>
//                     <option value="Photography">Photography</option>
//                     <option value="Music">Music</option>
//                     <option value="Gaming">Gaming</option>
//                     <option value="Collectibles">Collectibles</option>
//                     <option value="Other">Other</option>
//                   </select>
//                 </div>

//                 {/* COLLECTION */}

//                 <div className="mt-6">
//                   <label
//                     htmlFor="nft-collection"
//                     className="text-sm font-semibold text-white"
//                   >
//                     Collection
//                   </label>

//                   <select
//                     id="nft-collection"
//                     name="collectionId"
//                     value={form.collectionId}
//                     onChange={handleChange}
//                     className={inputClass}
//                   >
//                     <option value="">No collection</option>

//                     {publishedCollections.map((collection) => (
//                       <option
//                         key={collection._id || collection.id}
//                         value={collection._id || collection.id}
//                       >
//                         {collection.name}
//                       </option>
//                     ))}
//                   </select>

//                   {publishedCollections.length === 0 && (
//                     <p className="mt-2 text-xs leading-5 text-[#77777F]">
//                       You have no published collections yet. Create a
//                       collection first if you want to link this NFT to one.
//                     </p>
//                   )}
//                 </div>

//                 {/* FORM ACTIONS */}

//                 <div className="mt-8 flex flex-wrap justify-end gap-3 border-t border-white/[0.06] pt-6">
//                   <button
//                     type="button"
//                     onClick={closeCreateForm}
//                     disabled={saving}
//                     className="rounded-xl border border-white/10 px-5 py-3 text-sm font-semibold text-[#B6B6BE] transition hover:bg-white/[0.04] disabled:opacity-50"
//                   >
//                     Cancel
//                   </button>

//                   <button
//                     type="submit"
//                     disabled={saving}
//                     className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#A259FF] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#9147E8] disabled:cursor-not-allowed disabled:opacity-60"
//                   >
//                     {saving ? (
//                       <>
//                         <RefreshCw size={17} className="animate-spin" />
//                         Saving NFT...
//                       </>
//                     ) : (
//                       <>
//                         <Plus size={17} />
//                         Create NFT
//                       </>
//                     )}
//                   </button>
//                 </div>
//               </div>

//               {/* =================================================
//                   LIVE MARKETPLACE CARD PREVIEW
//               ================================================= */}

//               <aside className="overflow-hidden rounded-[24px] border border-white/[0.07] bg-[#111114] xl:sticky xl:top-6">
//                 <div className="border-b border-white/[0.06] p-5">
//                   <p className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.18em] text-[#B978FF]">
//                     <Eye size={15} />
//                     Live Preview
//                   </p>

//                   <h2 className="mt-2 text-lg font-semibold">
//                     Marketplace NFT Card
//                   </h2>

//                   <p className="mt-1 text-xs leading-5 text-[#77777F]">
//                     Preview updates as you fill in the form.
//                   </p>
//                 </div>

//                 <div className="p-4">
//                   <div className="overflow-hidden rounded-[20px] border border-white/[0.06] bg-[#212020]">
//                     {/* PREVIEW IMAGE */}

//                     {image ? (
//                       <img
//                         src={image}
//                         alt={form.name || "NFT preview"}
//                         className="aspect-square w-full object-cover"
//                       />
//                     ) : (
//                       <div className="flex aspect-square flex-col items-center justify-center bg-[#19191D] text-[#686872]">
//                         <ImagePlus size={40} />
//                         <p className="mt-3 text-xs">Artwork preview</p>
//                       </div>
//                     )}

//                     {/* PREVIEW DETAILS */}

//                     <div className="p-5">
//                       <h3 className="truncate text-lg font-semibold text-white">
//                         {form.name || "Your NFT Name"}
//                       </h3>

//                       {/* CREATOR PREVIEW */}

//                       <div className="mt-3 flex items-center gap-2">
//                         <div className="flex h-7 w-7 shrink-0 items-center justify-center overflow-hidden rounded-full bg-[#A259FF]/15 text-[10px] font-bold text-[#C49AFF]">
//                           {creatorAvatar ? (
//                             <img
//                               src={creatorAvatar}
//                               alt={creatorName}
//                               className="h-full w-full object-cover"
//                             />
//                           ) : (
//                             creatorInitials
//                           )}
//                         </div>

//                         <p className="truncate text-xs text-white">
//                           {creatorName}
//                         </p>
//                       </div>

//                       <p className="mt-4 line-clamp-4 min-h-[64px] text-xs leading-5 text-[#858584]">
//                         {form.description ||
//                           "Your NFT description will appear here."}
//                       </p>

//                       <div className="mt-5 grid grid-cols-2 gap-3 border-t border-[#3B3B3B] pt-4">
//                         <div>
//                           <p className="text-[11px] text-[#858584]">
//                             Price
//                           </p>

//                           <p className="mt-1 break-words text-sm font-semibold text-white">
//                             {form.price || "0"} ETH
//                           </p>
//                         </div>

//                         <div className="text-right">
//                           <p className="text-[11px] text-[#858584]">
//                             Highest Bid
//                           </p>

//                           <p className="mt-1 break-words text-sm font-semibold text-white">
//                             {form.highestBid || "0"} ETH
//                           </p>
//                         </div>
//                       </div>

//                       <div className="mt-4 flex flex-wrap items-center justify-between gap-2">
//                         <span className="rounded-full bg-[#A259FF]/10 px-3 py-1.5 text-xs font-semibold text-[#C49AFF]">
//                           {form.category}
//                         </span>

//                         <span className="text-[11px] text-[#858584]">
//                           {form.collectionId
//                             ? collections.find(
//                                 (item) =>
//                                   String(item._id || item.id) ===
//                                   String(form.collectionId)
//                               )?.name || "Selected collection"
//                             : "No collection"}
//                         </span>
//                       </div>
//                     </div>
//                   </div>

//                   <div className="mt-4 flex items-start gap-2 rounded-xl border border-[#A259FF]/15 bg-[#A259FF]/[0.05] p-3">
//                     <Sparkles
//                       size={16}
//                       className="mt-0.5 shrink-0 text-[#B978FF]"
//                     />

//                     <p className="text-xs leading-5 text-[#85858D]">
//                       Your NFT card uses the image, creator, name, price and
//                       highest bid supplied by your form.
//                     </p>
//                   </div>
//                 </div>
//               </aside>
//             </form>
//           </section>
//         )}
//       </div>

//       {/* =====================================================
//           NFT DETAILS DIALOG
//       ===================================================== */}

//       {selectedNFT && !showCreateForm && (
//         <div
//           className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-black/80 p-4 backdrop-blur-sm"
//           onMouseDown={(event) => {
//             if (event.target === event.currentTarget) {
//               setSelectedNFT(null);
//             }
//           }}
//         >
//           <motion.section
//             initial={{ opacity: 0, y: 12, scale: 0.98 }}
//             animate={{ opacity: 1, y: 0, scale: 1 }}
//             className="my-auto w-full max-w-3xl overflow-hidden rounded-[24px] border border-white/10 bg-[#111114] shadow-2xl"
//             role="dialog"
//             aria-modal="true"
//             aria-labelledby="nft-details-title"
//           >
//             <div className="flex items-center justify-between gap-3 border-b border-white/[0.06] px-5 py-4 sm:px-6">
//               <h2
//                 id="nft-details-title"
//                 className="text-lg font-semibold"
//               >
//                 NFT Details
//               </h2>

//               <button
//                 type="button"
//                 onClick={() => setSelectedNFT(null)}
//                 className="flex h-9 w-9 items-center justify-center rounded-xl border border-white/10 text-[#A7A7AF] transition hover:bg-white/[0.05] hover:text-white"
//                 aria-label="Close details"
//               >
//                 <X size={18} />
//               </button>
//             </div>

//             <div className="grid grid-cols-1 gap-5 p-5 sm:p-6 md:grid-cols-2">
//               <div className="overflow-hidden rounded-2xl bg-[#19191D]">
//                 {selectedNFT.image ? (
//                   <img
//                     src={selectedNFT.image}
//                     alt={selectedNFT.name || "NFT artwork"}
//                     className="aspect-square w-full object-cover"
//                   />
//                 ) : (
//                   <div className="flex aspect-square items-center justify-center text-[#686872]">
//                     <ImageIcon size={40} />
//                   </div>
//                 )}
//               </div>

//               <div className="min-w-0">
//                 <span className="inline-flex rounded-full bg-[#A259FF]/10 px-3 py-1 text-xs font-semibold capitalize text-[#C49AFF]">
//                   {selectedNFT.status || "published"}
//                 </span>

//                 <h3 className="mt-4 break-words text-2xl font-bold">
//                   {selectedNFT.name || "Untitled NFT"}
//                 </h3>

//                 <div className="mt-3 flex items-center gap-2">
//                   <div className="flex h-8 w-8 shrink-0 items-center justify-center overflow-hidden rounded-full bg-[#A259FF]/15 text-xs font-bold text-[#C49AFF]">
//                     {selectedNFT.creatorAvatar || creatorAvatar ? (
//                       <img
//                         src={selectedNFT.creatorAvatar || creatorAvatar}
//                         alt={selectedNFT.creator || creatorName}
//                         className="h-full w-full object-cover"
//                       />
//                     ) : (
//                       getInitials(selectedNFT.creator || creatorName)
//                     )}
//                   </div>

//                   <div className="min-w-0">
//                     <p className="text-[11px] text-[#686872]">Created by</p>
//                     <p className="truncate text-sm font-semibold">
//                       {selectedNFT.creator || creatorName}
//                     </p>
//                   </div>
//                 </div>

//                 <p className="mt-4 whitespace-pre-wrap break-words text-sm leading-6 text-[#85858D]">
//                   {selectedNFT.description || "No description added."}
//                 </p>

//                 <div className="mt-5 grid grid-cols-2 gap-3 border-t border-white/[0.06] pt-5">
//                   <div>
//                     <p className="text-xs text-[#686872]">Price</p>
//                     <p className="mt-1 break-words text-lg font-semibold text-[#C49AFF]">
//                       {selectedNFT.price ?? 0} ETH
//                     </p>
//                   </div>

//                   <div>
//                     <p className="text-xs text-[#686872]">Highest Bid</p>
//                     <p className="mt-1 break-words text-lg font-semibold">
//                       {selectedNFT.highestBid ?? 0} ETH
//                     </p>
//                   </div>
//                 </div>

//                 <div className="mt-5 space-y-4 border-t border-white/[0.06] pt-5">
//                   <div>
//                     <p className="text-xs text-[#686872]">Category</p>
//                     <p className="mt-1 text-sm">
//                       {selectedNFT.category || "Art"}
//                     </p>
//                   </div>

//                   <div>
//                     <p className="text-xs text-[#686872]">Collection</p>
//                     <p className="mt-1 break-words text-sm">
//                       {selectedNFT.collectionRef?.name ||
//                         collections.find(
//                           (collection) =>
//                             String(collection._id || collection.id) ===
//                             String(
//                               selectedNFT.collectionRef?._id ||
//                                 selectedNFT.collectionRef ||
//                                 ""
//                             )
//                         )?.name ||
//                         "No collection"}
//                     </p>
//                   </div>

//                   <div>
//                     <p className="flex items-center gap-2 text-xs text-[#686872]">
//                       <CalendarDays size={14} />
//                       Created
//                     </p>

//                     <p className="mt-1 text-sm">
//                       {formatDate(selectedNFT.createdAt)}
//                     </p>
//                   </div>
//                 </div>

//                 <button
//                   type="button"
//                   onClick={() => handleDelete(selectedNFT)}
//                   disabled={
//                     deletingId === getNFTId(selectedNFT)
//                   }
//                   className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-xl border border-red-400/20 bg-red-400/[0.05] px-4 py-3 text-sm font-semibold text-red-300 transition hover:bg-red-400/10 disabled:opacity-50"
//                 >
//                   {deletingId === getNFTId(selectedNFT) ? (
//                     <RefreshCw size={16} className="animate-spin" />
//                   ) : (
//                     <Trash2 size={16} />
//                   )}

//                   Delete NFT
//                 </button>
//               </div>
//             </div>
//           </motion.section>
//         </div>
//       )}
//     </main>
//   );
// };

// export default NFT;








import React, { useCallback, useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import {
  ImagePlus,
  Plus,
  Upload,
  X,
  ArrowLeft,
  Trash2,
  Pencil,
  Layers,
  RefreshCw,
  Sparkles,
  Image as ImageIcon,
  Eye,
  CalendarDays,
  Search,
} from "lucide-react";

const API_URL =
  import.meta.env.VITE_API_URL ||
  "https://nifty-verse-backend-production.up.railway.app";

const INITIAL_FORM = {
  name: "",
  description: "",
  price: "",
  highestBid: "",
  category: "Art",
  collectionId: "",
};

const inputClass =
  "mt-2 w-full rounded-xl border border-white/10 bg-[#0B0B10] px-4 py-3 text-sm text-white outline-none placeholder:text-gray-600 transition focus:border-[#A259FF]";

const formatDate = (date) => {
  if (!date) return "Date unavailable";

  const parsedDate = new Date(date);

  if (Number.isNaN(parsedDate.getTime())) {
    return "Date unavailable";
  }

  return parsedDate.toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
};

const getDisplayName = (user) =>
  user?.username ||
  user?.name ||
  user?.fullName ||
  user?.email?.split("@")[0] ||
  "Creator";

const getInitials = (name = "Creator") =>
  String(name)
    .trim()
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part.charAt(0).toUpperCase())
    .join("") || "C";

const getErrorMessage = (data, fallback) =>
  data?.message || fallback;

const getNFTId = (nft) => String(nft?._id || nft?.id || "");

const getCollectionIdFromNFT = (nft) => {
  const collectionRef = nft?.collectionRef;

  if (collectionRef && typeof collectionRef === "object") {
    return String(
      collectionRef._id || collectionRef.id || nft?.collectionId || ""
    );
  }

  return String(collectionRef || nft?.collectionId || "");
};

const NFT = () => {
  const navigate = useNavigate();
  const fileInputRef = useRef(null);

  const [user, setUser] = useState(null);
  const [nfts, setNfts] = useState([]);
  const [collections, setCollections] = useState([]);

  const [activeTab, setActiveTab] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");

  const [showCreateForm, setShowCreateForm] = useState(false);
  const [selectedNFT, setSelectedNFT] = useState(null);
  const [editingNFT, setEditingNFT] = useState(null);

  const [image, setImage] = useState("");
  const [form, setForm] = useState(INITIAL_FORM);

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [deletingId, setDeletingId] = useState("");

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const creatorName = getDisplayName(user);
  const creatorInitials = getInitials(creatorName);
  const creatorAvatar =
    user?.profileImage || user?.avatar || user?.image || "";

  // =========================================================
  // FETCH REAL USER, NFT AND COLLECTION DATA
  // =========================================================

  const loadData = useCallback(
    async (isRefresh = false) => {
      const token = localStorage.getItem("token");

      if (!token) {
        localStorage.removeItem("user");
        navigate("/signin", { replace: true });
        return;
      }

      if (isRefresh) {
        setRefreshing(true);
      } else {
        setLoading(true);
      }

      setError("");
      setSuccess("");

      try {
        const headers = {
          Authorization: `Bearer ${token}`,
        };

        const [profileResponse, nftResponse, collectionResponse] =
          await Promise.all([
            fetch(`${API_URL}/api/auth/me`, { headers }),
            fetch(`${API_URL}/api/nfts/mine`, { headers }),
            fetch(`${API_URL}/api/collections/mine`, { headers }),
          ]);

        const [profileData, nftData, collectionData] = await Promise.all([
          profileResponse.json().catch(() => ({})),
          nftResponse.json().catch(() => ({})),
          collectionResponse.json().catch(() => ({})),
        ]);

        if (
          profileResponse.status === 401 ||
          nftResponse.status === 401 ||
          collectionResponse.status === 401
        ) {
          localStorage.removeItem("token");
          localStorage.removeItem("user");
          navigate("/signin", { replace: true });
          return;
        }

        if (!profileResponse.ok || !profileData.user) {
          throw new Error(
            getErrorMessage(profileData, "Unable to load your profile.")
          );
        }

        if (!nftResponse.ok || nftData.success === false) {
          throw new Error(
            getErrorMessage(nftData, "Unable to load your NFTs.")
          );
        }

        if (!collectionResponse.ok || collectionData.success === false) {
          throw new Error(
            getErrorMessage(
              collectionData,
              "Unable to load your collections."
            )
          );
        }

        const verifiedUser = profileData.user;

        setUser(verifiedUser);
        setNfts(Array.isArray(nftData.nfts) ? nftData.nfts : []);
        setCollections(
          Array.isArray(collectionData.collections)
            ? collectionData.collections
            : []
        );

        localStorage.setItem("user", JSON.stringify(verifiedUser));
      } catch (fetchError) {
        console.error("Load NFT data error:", fetchError);
        setError(fetchError.message || "Unable to load NFT data.");
      } finally {
        setLoading(false);
        setRefreshing(false);
      }
    },
    [navigate]
  );

  useEffect(() => {
    loadData();
  }, [loadData]);

  // =========================================================
  // FORM HANDLERS
  // =========================================================

  const handleChange = (event) => {
    const { name, value } = event.target;

    setForm((previous) => ({
      ...previous,
      [name]: value,
    }));

    setError("");
    setSuccess("");
  };

  const handleImageChange = (event) => {
    const file = event.target.files?.[0];

    if (!file) return;

    if (!file.type.startsWith("image/")) {
      setError("Please select a valid image.");
      event.target.value = "";
      return;
    }

    if (file.size > 2 * 1024 * 1024) {
      setError("Please select an image smaller than 2 MB.");
      event.target.value = "";
      return;
    }

    const reader = new FileReader();

    reader.onload = () => {
      setImage(String(reader.result || ""));
      setError("");
      setSuccess("");
    };

    reader.onerror = () => {
      setError("Unable to read the image. Please try another file.");
    };

    reader.readAsDataURL(file);
  };

  const removeImage = () => {
    setImage("");

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  // =========================================================
  // OPEN CREATE FORM
  // =========================================================

  const openCreateForm = () => {
    setForm(INITIAL_FORM);
    setImage("");
    setEditingNFT(null);
    setError("");
    setSuccess("");
    setSelectedNFT(null);
    setShowCreateForm(true);

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  // =========================================================
  // OPEN EDIT FORM — LOAD EXISTING NFT DATA
  // =========================================================

  const openEditForm = (nft) => {
    const collectionId = getCollectionIdFromNFT(nft);

    setForm({
      name: nft.name || "",
      description: nft.description || "",
      price: String(nft.price ?? ""),
      highestBid: String(nft.highestBid ?? ""),
      category: nft.category || "Art",
      collectionId,
    });

    // Keep the existing image until the user replaces it.
    setImage(nft.image || "");
    setEditingNFT(nft);
    setSelectedNFT(null);
    setError("");
    setSuccess("");
    setShowCreateForm(true);

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  // =========================================================
  // CLOSE CREATE / EDIT FORM
  // =========================================================

  const closeCreateForm = () => {
    setShowCreateForm(false);
    setForm(INITIAL_FORM);
    setImage("");
    setEditingNFT(null);
    setError("");

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  // =========================================================
  // CREATE OR UPDATE NFT — BACKEND API
  // POST  /api/nfts
  // PATCH /api/nfts/:id
  // =========================================================

  const handleSubmit = async (event) => {
    event.preventDefault();

    setError("");
    setSuccess("");

    if (!image) {
      setError("Please upload an NFT image.");
      return;
    }

    if (!form.name.trim()) {
      setError("Please enter an NFT name.");
      return;
    }

    if (!form.description.trim()) {
      setError("Please enter an NFT description.");
      return;
    }

    if (
      form.price === "" ||
      !Number.isFinite(Number(form.price)) ||
      Number(form.price) <= 0
    ) {
      setError("Please enter a valid price greater than zero.");
      return;
    }

    if (
      form.highestBid === "" ||
      !Number.isFinite(Number(form.highestBid)) ||
      Number(form.highestBid) < 0
    ) {
      setError("Please enter a valid highest bid.");
      return;
    }

    // Validate the selected collection.
    if (
      form.collectionId &&
      !collections.some(
        (collection) =>
          String(collection._id || collection.id) ===
            String(form.collectionId) &&
          collection.status !== "draft"
      )
    ) {
      setError("Please select one of your published collections.");
      return;
    }

    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/signin", { replace: true });
      return;
    }

    const isEditing = Boolean(editingNFT);
    const editingId = isEditing ? getNFTId(editingNFT) : "";

    if (isEditing && !editingId) {
      setError("This NFT has no valid database ID.");
      return;
    }

    try {
      setSaving(true);

      const endpoint = isEditing
        ? `${API_URL}/api/nfts/${encodeURIComponent(editingId)}`
        : `${API_URL}/api/nfts`;

      const response = await fetch(endpoint, {
        method: isEditing ? "PATCH" : "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          name: form.name.trim(),
          description: form.description.trim(),
          image,
          price: Number(form.price),
          highestBid: Number(form.highestBid),
          category: form.category,
          collectionId: form.collectionId || null,

          // An edit keeps its current status instead of publishing a draft.
          status: isEditing
            ? editingNFT.status || "published"
            : "published",
        }),
      });

      const data = await response.json().catch(() => ({}));

      if (response.status === 401) {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        navigate("/signin", { replace: true });
        return;
      }

      if (!response.ok || !data.success || !data.nft) {
        throw new Error(
          getErrorMessage(
            data,
            isEditing ? "Unable to update NFT." : "Unable to create NFT."
          )
        );
      }

      // Update the card immediately without requiring a page reload.
      setNfts((previous) => {
        const existingIndex = previous.findIndex(
          (item) => getNFTId(item) === getNFTId(data.nft)
        );

        if (isEditing && existingIndex !== -1) {
          const updated = [...previous];
          updated[existingIndex] = data.nft;
          return updated;
        }

        return [
          data.nft,
          ...previous.filter(
            (item) => getNFTId(item) !== getNFTId(data.nft)
          ),
        ];
      });

      setSuccess(
        data.message ||
          (isEditing
            ? "NFT updated successfully."
            : "NFT created successfully.")
      );

      setActiveTab("all");
      setSearchTerm("");
      setShowCreateForm(false);
      setSelectedNFT(null);
      setEditingNFT(null);
      setForm(INITIAL_FORM);
      setImage("");

      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    } catch (submitError) {
      console.error(
        editingNFT ? "Update NFT error:" : "Create NFT error:",
        submitError
      );

      setError(
        submitError.message ||
          (editingNFT
            ? "Unable to update NFT."
            : "Unable to create NFT.")
      );
    } finally {
      setSaving(false);
    }
  };

  // =========================================================
  // DELETE NFT — DELETE FROM BACKEND DATABASE
  // =========================================================

  const handleDelete = async (nft) => {
    const nftId = getNFTId(nft);

    if (!nftId || nftId === "undefined") {
      setError("This NFT has no valid database ID.");
      return;
    }

    if (!window.confirm(`Delete "${nft.name || "this NFT"}"?`)) {
      return;
    }

    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/signin", { replace: true });
      return;
    }

    setDeletingId(nftId);
    setError("");
    setSuccess("");

    try {
      const response = await fetch(
        `${API_URL}/api/nfts/${encodeURIComponent(nftId)}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json().catch(() => ({}));

      if (response.status === 401) {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        navigate("/signin", { replace: true });
        return;
      }

      if (!response.ok || !data.success) {
        throw new Error(
          getErrorMessage(data, "Unable to delete this NFT.")
        );
      }

      setNfts((previous) =>
        previous.filter((item) => getNFTId(item) !== nftId)
      );

      setSelectedNFT(null);
      setSuccess(data.message || "NFT deleted successfully.");
    } catch (deleteError) {
      console.error("Delete NFT error:", deleteError);
      setError(deleteError.message || "Unable to delete this NFT.");
    } finally {
      setDeletingId("");
    }
  };

  // =========================================================
  // FILTER AND STATS
  // =========================================================

  const filteredNFTs = nfts.filter((nft) => {
    const query = searchTerm.toLowerCase().trim();

    const matchesSearch =
      !query ||
      String(nft.name || "").toLowerCase().includes(query) ||
      String(nft.description || "").toLowerCase().includes(query) ||
      String(nft.creator || creatorName).toLowerCase().includes(query);

    if (activeTab === "published") {
      return nft.status === "published" && matchesSearch;
    }

    if (activeTab === "draft") {
      return nft.status === "draft" && matchesSearch;
    }

    return matchesSearch;
  });

  const publishedCount = nfts.filter(
    (nft) => nft.status === "published"
  ).length;

  const draftCount = nfts.filter(
    (nft) => nft.status === "draft"
  ).length;

  const publishedCollections = collections.filter(
    (collection) => collection.status !== "draft"
  );

  // =========================================================
  // LOADING STATE
  // =========================================================

  if (loading) {
    return (
      <div className="flex min-h-[45vh] items-center justify-center bg-[#08080A] text-sm text-[#A7A7AF]">
        <div className="flex items-center gap-3">
          <span className="h-5 w-5 animate-spin rounded-full border-2 border-[#A259FF]/30 border-t-[#A259FF]" />
          Loading your NFTs...
        </div>
      </div>
    );
  }

  // =========================================================
  // PAGE
  // =========================================================

  return (
    <main className="min-h-full overflow-x-hidden bg-[#08080A] px-4 py-6 text-white sm:px-6 sm:py-8 xl:px-8">
      <div className="mx-auto max-w-[1600px] space-y-7">
        {!showCreateForm ? (
          <>
            {/* PAGE HEADER */}

            <motion.section
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              className="group relative overflow-hidden rounded-[26px] border border-white/[0.07] bg-[#111114] p-5 sm:p-7 lg:p-8"
            >
              <div className="pointer-events-none absolute -right-12 -top-16 h-60 w-60 rounded-full bg-[#A259FF]/10 blur-3xl transition group-hover:bg-[#A259FF]/15" />

              <div className="relative flex flex-col justify-between gap-6 sm:flex-row sm:items-center">
                <div className="min-w-0">
                  <p className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-[#B978FF]">
                    <Sparkles size={15} />
                    Nifty Verse · Creator workspace
                  </p>

                  <h1 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
                    My <span className="text-[#B978FF]">NFTs</span>
                  </h1>

                  <p className="mt-3 max-w-2xl text-sm leading-6 text-[#85858D]">
                    Create and manage your digital artwork, update your
                    portfolio, and organize NFTs into your own collections.
                  </p>

                  <p className="mt-3 text-xs text-[#686872]">
                    Signed in as{" "}
                    <span className="font-semibold text-[#C49AFF]">
                      {creatorName}
                    </span>
                  </p>
                </div>

                <div className="flex shrink-0 flex-wrap gap-3">
                  <button
                    type="button"
                    onClick={() => loadData(true)}
                    disabled={refreshing}
                    className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm font-semibold text-gray-200 transition hover:border-[#A259FF]/40 disabled:opacity-60"
                  >
                    <RefreshCw
                      size={16}
                      className={refreshing ? "animate-spin" : ""}
                    />
                    Refresh
                  </button>

                  <button
                    type="button"
                    onClick={openCreateForm}
                    className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#A259FF] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#9147E8]"
                  >
                    <Plus size={18} />
                    Create NFT
                  </button>
                </div>
              </div>
            </motion.section>

            {/* FEEDBACK */}

            {error && (
              <div
                role="alert"
                className="rounded-xl border border-red-400/20 bg-red-400/[0.06] px-4 py-3 text-sm leading-6 text-red-300"
              >
                {error}
              </div>
            )}

            {success && (
              <div
                role="status"
                className="rounded-xl border border-emerald-400/20 bg-emerald-400/[0.06] px-4 py-3 text-sm text-emerald-300"
              >
                {success}
              </div>
            )}

            {/* REAL DATABASE STATS */}

            <section className="grid grid-cols-1 gap-4 sm:grid-cols-3">
              {[
                {
                  title: "Total NFTs",
                  value: nfts.length,
                  icon: ImageIcon,
                  note: "Created or owned by you",
                },
                {
                  title: "Published",
                  value: publishedCount,
                  icon: Eye,
                  note: "Published NFT records",
                },
                {
                  title: "Drafts",
                  value: draftCount,
                  icon: Layers,
                  note: "Unpublished NFT records",
                },
              ].map((stat, index) => {
                const Icon = stat.icon;

                return (
                  <motion.article
                    key={stat.title}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.06 }}
                    whileHover={{ y: -3 }}
                    className="rounded-[22px] border border-white/[0.07] bg-[#111114] p-5 transition hover:border-[#A259FF]/30 sm:p-6"
                  >
                    <div className="flex items-center justify-between gap-3">
                      <p className="text-sm text-[#85858D]">{stat.title}</p>

                      <div className="rounded-xl bg-[#A259FF]/10 p-3 text-[#B978FF]">
                        <Icon size={20} />
                      </div>
                    </div>

                    <h2 className="mt-5 text-3xl font-bold">
                      {stat.value.toLocaleString()}
                    </h2>

                    <p className="mt-2 text-xs text-[#686872]">{stat.note}</p>
                  </motion.article>
                );
              })}
            </section>

            {/* NFT PORTFOLIO */}

            <section>
              <div className="mb-5 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
                <div>
                  <h2 className="text-xl font-semibold">
                    Your NFT Portfolio
                  </h2>

                  <p className="mt-1 text-sm text-[#77777F]">
                    These records are fetched from your account.
                  </p>
                </div>

                {/* SEARCH */}

                <div className="relative w-full lg:max-w-sm">
                  <Search
                    size={17}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-[#77777F]"
                  />

                  <input
                    type="search"
                    value={searchTerm}
                    onChange={(event) => setSearchTerm(event.target.value)}
                    placeholder="Search your NFTs..."
                    className="w-full rounded-xl border border-white/10 bg-[#111114] py-3 pl-11 pr-4 text-sm text-white outline-none transition placeholder:text-gray-600 focus:border-[#A259FF]"
                  />
                </div>
              </div>

              {/* FILTER TABS */}

              <div className="mb-6 flex flex-wrap gap-2">
                {[
                  { label: `All (${nfts.length})`, value: "all" },
                  {
                    label: `Published (${publishedCount})`,
                    value: "published",
                  },
                  { label: `Drafts (${draftCount})`, value: "draft" },
                ].map((tab) => (
                  <button
                    key={tab.value}
                    type="button"
                    onClick={() => setActiveTab(tab.value)}
                    className={`rounded-xl px-4 py-2.5 text-xs font-semibold transition sm:text-sm ${
                      activeTab === tab.value
                        ? "bg-[#A259FF] text-white"
                        : "border border-white/[0.07] bg-[#111114] text-[#85858D] hover:border-[#A259FF]/30 hover:text-white"
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>

              {/* EMPTY STATE */}

              {filteredNFTs.length === 0 ? (
                <div className="flex min-h-[300px] flex-col items-center justify-center rounded-[24px] border border-dashed border-white/10 bg-[#101014] px-5 py-10 text-center">
                  <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl border border-[#A259FF]/20 bg-[#A259FF]/10 text-[#B978FF]">
                    <ImagePlus size={30} />
                  </div>

                  <h3 className="text-lg font-semibold">
                    {searchTerm
                      ? "No matching NFTs"
                      : activeTab === "draft"
                        ? "No drafts yet"
                        : activeTab === "published"
                          ? "No published NFTs yet"
                          : "Your NFT portfolio is empty"}
                  </h3>

                  <p className="mt-2 max-w-md text-sm leading-6 text-[#77777F]">
                    {searchTerm
                      ? "Try searching with a different name."
                      : "Create your first NFT. After it is saved, it will appear here and can be shown in the public marketplace."}
                  </p>

                  {!searchTerm && activeTab === "all" && (
                    <button
                      type="button"
                      onClick={openCreateForm}
                      className="mt-5 inline-flex items-center gap-2 rounded-xl bg-[#A259FF] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#9147E8]"
                    >
                      <Plus size={17} />
                      Create your first NFT
                    </button>
                  )}
                </div>
              ) : (
                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4">
                  {filteredNFTs.map((nft, index) => {
                    const nftId = getNFTId(nft);
                    const isDraft = nft.status === "draft";

                    return (
                      <motion.article
                        key={nftId}
                        initial={{ opacity: 0, y: 14 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{
                          delay: Math.min(index * 0.04, 0.2),
                        }}
                        whileHover={{ y: -4 }}
                        className="group overflow-hidden rounded-[22px] border border-white/[0.07] bg-[#111114] transition hover:border-[#A259FF]/35"
                      >
                        {/* IMAGE */}

                        <button
                          type="button"
                          onClick={() => setSelectedNFT(nft)}
                          className="block w-full overflow-hidden bg-[#1A1A1E] text-left"
                          aria-label={`View ${nft.name || "NFT"} details`}
                        >
                          {nft.image ? (
                            <img
                              src={nft.image}
                              alt={nft.name || "NFT artwork"}
                              className="aspect-square w-full object-cover transition duration-500 group-hover:scale-[1.03]"
                            />
                          ) : (
                            <div className="flex aspect-square items-center justify-center text-[#66666E]">
                              <ImageIcon size={42} />
                            </div>
                          )}
                        </button>

                        {/* CARD DETAILS */}

                        <div className="p-4 sm:p-5">
                          <div className="flex items-start justify-between gap-3">
                            <h3 className="min-w-0 truncate text-base font-semibold">
                              {nft.name || "Untitled NFT"}
                            </h3>

                            <span
                              className={`shrink-0 rounded-full px-2 py-1 text-[10px] font-semibold ${
                                isDraft
                                  ? "bg-amber-400/10 text-amber-300"
                                  : "bg-emerald-400/10 text-emerald-300"
                              }`}
                            >
                              {isDraft ? "Draft" : "Published"}
                            </span>
                          </div>

                          {/* CREATOR */}

                          <div className="mt-3 flex min-w-0 items-center gap-2">
                            <div className="flex h-7 w-7 shrink-0 items-center justify-center overflow-hidden rounded-full border border-[#A259FF]/20 bg-[#A259FF]/10 text-[10px] font-bold text-[#C49AFF]">
                              {nft.creatorAvatar || creatorAvatar ? (
                                <img
                                  src={nft.creatorAvatar || creatorAvatar}
                                  alt={nft.creator || creatorName}
                                  className="h-full w-full object-cover"
                                />
                              ) : (
                                getInitials(nft.creator || creatorName)
                              )}
                            </div>

                            <p className="truncate text-xs text-[#B7B7C0]">
                              {nft.creator || creatorName}
                            </p>
                          </div>

                          <p className="mt-3 line-clamp-2 min-h-10 text-xs leading-5 text-[#77777F]">
                            {nft.description || "No description added."}
                          </p>

                          {/* PRICE + HIGHEST BID */}

                          <div className="mt-4 grid grid-cols-2 gap-3 border-t border-white/[0.06] pt-4">
                            <div className="min-w-0">
                              <p className="text-[11px] text-[#686872]">
                                Price
                              </p>

                              <p className="mt-1 truncate text-sm font-semibold text-[#C49AFF]">
                                {nft.price ?? 0} ETH
                              </p>
                            </div>

                            <div className="min-w-0 text-right">
                              <p className="text-[11px] text-[#686872]">
                                Highest Bid
                              </p>

                              <p className="mt-1 truncate text-sm font-semibold text-white">
                                {nft.highestBid ?? 0} ETH
                              </p>
                            </div>
                          </div>

                          <div className="mt-4 flex items-center justify-between gap-3">
                            <p className="truncate text-[11px] text-[#686872]">
                              {formatDate(nft.createdAt)}
                            </p>

                            <span className="shrink-0 rounded-full bg-white/[0.04] px-2.5 py-1 text-[10px] text-[#85858D]">
                              {nft.category || "Art"}
                            </span>
                          </div>

                          {/* ACTIONS */}

                          <div className="mt-4 flex gap-2">
                            <button
                              type="button"
                              onClick={() => setSelectedNFT(nft)}
                              className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl border border-white/10 px-3 py-2.5 text-xs font-semibold text-gray-300 transition hover:border-[#A259FF]/40 hover:text-white"
                            >
                              <Eye size={15} />
                              Details
                            </button>

                            <button
                              type="button"
                              onClick={() => openEditForm(nft)}
                              aria-label={`Edit ${nft.name || "NFT"}`}
                              title="Edit NFT"
                              className="inline-flex items-center justify-center rounded-xl border border-[#A259FF]/20 bg-[#A259FF]/[0.05] px-3 py-2.5 text-[#C49AFF] transition hover:bg-[#A259FF]/15"
                            >
                              <Pencil size={15} />
                            </button>

                            <button
                              type="button"
                              onClick={() => handleDelete(nft)}
                              disabled={deletingId === nftId}
                              aria-label={`Delete ${nft.name || "NFT"}`}
                              className="inline-flex items-center justify-center rounded-xl border border-red-400/15 bg-red-400/[0.04] px-3 py-2.5 text-red-300 transition hover:bg-red-400/10 disabled:opacity-50"
                            >
                              {deletingId === nftId ? (
                                <RefreshCw
                                  size={15}
                                  className="animate-spin"
                                />
                              ) : (
                                <Trash2 size={15} />
                              )}
                            </button>
                          </div>
                        </div>
                      </motion.article>
                    );
                  })}
                </div>
              )}
            </section>
          </>
        ) : (
          /* =====================================================
             CREATE / EDIT NFT FORM
          ===================================================== */

          <section>
            <button
              type="button"
              onClick={closeCreateForm}
              className="mb-6 inline-flex items-center gap-2 text-sm font-semibold text-[#85858D] transition hover:text-white"
            >
              <ArrowLeft size={17} />
              Back to My NFTs
            </button>

            <div className="mb-7">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#B978FF]">
                Nifty Verse · Creator workspace
              </p>

              <h1 className="mt-3 text-3xl font-bold sm:text-4xl">
                {editingNFT ? "Edit " : "Create "}
                <span className="text-[#B978FF]">NFT</span>
              </h1>

              <p className="mt-3 max-w-2xl text-sm leading-6 text-[#85858D]">
                {editingNFT
                  ? "Update your NFT details below. Your changes will be saved and reflected in your portfolio and marketplace."
                  : "Fill in the details below. These details will be saved with your NFT and used to display its card in the marketplace."}
              </p>
            </div>

            {error && (
              <div
                role="alert"
                className="mb-5 rounded-xl border border-red-400/20 bg-red-400/[0.06] px-4 py-3 text-sm leading-6 text-red-300"
              >
                {error}
              </div>
            )}

            <form
              onSubmit={handleSubmit}
              className="grid grid-cols-1 items-start gap-6 xl:grid-cols-[minmax(0,1fr)_360px]"
            >
              {/* LEFT FORM */}

              <div className="min-w-0 rounded-[24px] border border-white/[0.07] bg-[#111114] p-5 sm:p-7">
                {/* IMAGE UPLOAD */}

                <label className="text-sm font-semibold text-white">
                  NFT Image *
                </label>

                <p className="mt-1 text-xs leading-5 text-[#77777F]">
                  This image will appear on your marketplace NFT card.
                </p>

                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/png,image/jpeg,image/webp,image/gif"
                  onChange={handleImageChange}
                  className="hidden"
                />

                {!image ? (
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="mt-3 flex min-h-[280px] w-full flex-col items-center justify-center rounded-2xl border-2 border-dashed border-[#A259FF]/40 bg-gradient-to-br from-[#17121F] to-[#101014] p-6 transition hover:border-[#A259FF] hover:bg-[#15111B] sm:min-h-[340px]"
                  >
                    <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-[#A259FF]/10 text-[#B978FF]">
                      <Upload size={28} />
                    </div>

                    <span className="mt-5 text-sm font-semibold">
                      Upload NFT artwork
                    </span>

                    <span className="mt-2 text-xs text-[#77777F]">
                      PNG, JPG, WEBP or GIF · Maximum 2 MB
                    </span>
                  </button>
                ) : (
                  <div className="relative mt-3 overflow-hidden rounded-2xl border border-[#A259FF]/30 bg-[#0B0B10] p-3">
                    <img
                      src={image}
                      alt="NFT preview"
                      className="max-h-[560px] w-full rounded-xl object-contain"
                    />

                    <button
                      type="button"
                      onClick={removeImage}
                      className="absolute right-5 top-5 flex h-10 w-10 items-center justify-center rounded-full bg-black/80 text-white transition hover:bg-red-500"
                      aria-label="Remove image"
                    >
                      <X size={18} />
                    </button>

                    <button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      className="absolute bottom-5 left-5 inline-flex items-center gap-2 rounded-lg bg-black/80 px-3 py-2 text-xs font-semibold text-white transition hover:bg-[#A259FF]"
                    >
                      <Upload size={14} />
                      Change image
                    </button>
                  </div>
                )}

                {/* NFT NAME */}

                <div className="mt-6">
                  <label
                    htmlFor="nft-name"
                    className="text-sm font-semibold text-white"
                  >
                    NFT Name *
                  </label>

                  <input
                    id="nft-name"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    required
                    maxLength={120}
                    placeholder="Example: Magic Mushroom 0325"
                    className={inputClass}
                  />

                  <p className="mt-1 text-right text-[11px] text-[#686872]">
                    {form.name.length}/120
                  </p>
                </div>

                {/* CREATOR — AUTO FROM ACCOUNT */}

                <div className="mt-6">
                  <label
                    htmlFor="nft-creator"
                    className="text-sm font-semibold text-white"
                  >
                    Creator
                  </label>

                  <div className="mt-2 flex items-center gap-3 rounded-xl border border-white/10 bg-[#0B0B10] px-4 py-3">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-full border border-[#A259FF]/30 bg-[#A259FF]/15 text-sm font-bold text-[#C49AFF]">
                      {creatorAvatar ? (
                        <img
                          src={creatorAvatar}
                          alt={creatorName}
                          className="h-full w-full object-cover"
                        />
                      ) : (
                        creatorInitials
                      )}
                    </div>

                    <div className="min-w-0 flex-1">
                      <input
                        id="nft-creator"
                        value={creatorName}
                        readOnly
                        className="w-full cursor-not-allowed bg-transparent text-sm font-semibold text-white outline-none"
                      />

                      <p className="mt-1 text-xs text-[#77777F]">
                        Linked to your logged-in account
                      </p>
                    </div>
                  </div>

                  <p className="mt-2 text-xs leading-5 text-[#686872]">
                    Creator identity is assigned by the backend from your
                    authenticated account, so it cannot be changed here.
                  </p>
                </div>

                {/* DESCRIPTION */}

                <div className="mt-6">
                  <label
                    htmlFor="nft-description"
                    className="text-sm font-semibold text-white"
                  >
                    Description *
                  </label>

                  <textarea
                    id="nft-description"
                    name="description"
                    value={form.description}
                    onChange={handleChange}
                    required
                    rows={5}
                    maxLength={5000}
                    placeholder="Describe your NFT artwork..."
                    className={`${inputClass} resize-y leading-6`}
                  />

                  <p className="mt-1 text-right text-[11px] text-[#686872]">
                    {form.description.length}/5000
                  </p>
                </div>

                {/* PRICE + HIGHEST BID */}

                <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2">
                  <div>
                    <label
                      htmlFor="nft-price"
                      className="text-sm font-semibold text-white"
                    >
                      Price (ETH) *
                    </label>

                    <input
                      id="nft-price"
                      name="price"
                      type="number"
                      value={form.price}
                      onChange={handleChange}
                      min="0.000001"
                      step="any"
                      required
                      placeholder="Example: 1.63"
                      className={inputClass}
                    />

                    <p className="mt-1 text-xs text-[#686872]">
                      Asking price shown on your NFT card.
                    </p>
                  </div>

                  <div>
                    <label
                      htmlFor="nft-bid"
                      className="text-sm font-semibold text-white"
                    >
                      Highest Bid (ETH) *
                    </label>

                    <input
                      id="nft-bid"
                      name="highestBid"
                      type="number"
                      value={form.highestBid}
                      onChange={handleChange}
                      min="0"
                      step="any"
                      required
                      placeholder="Example: 0.33"
                      className={inputClass}
                    />

                    <p className="mt-1 text-xs text-[#686872]">
                      Highest bid value shown on your NFT card.
                    </p>
                  </div>
                </div>

                {/* CATEGORY */}

                <div className="mt-6">
                  <label
                    htmlFor="nft-category"
                    className="text-sm font-semibold text-white"
                  >
                    Category *
                  </label>

                  <select
                    id="nft-category"
                    name="category"
                    value={form.category}
                    onChange={handleChange}
                    required
                    className={inputClass}
                  >
                    <option value="Art">Art</option>
                    <option value="Photography">Photography</option>
                    <option value="Music">Music</option>
                    <option value="Gaming">Gaming</option>
                    <option value="Collectibles">Collectibles</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                {/* COLLECTION */}

                <div className="mt-6">
                  <label
                    htmlFor="nft-collection"
                    className="text-sm font-semibold text-white"
                  >
                    Collection
                  </label>

                  <select
                    id="nft-collection"
                    name="collectionId"
                    value={form.collectionId}
                    onChange={handleChange}
                    className={inputClass}
                  >
                    <option value="">No collection</option>

                    {publishedCollections.map((collection) => (
                      <option
                        key={collection._id || collection.id}
                        value={collection._id || collection.id}
                      >
                        {collection.name}
                      </option>
                    ))}
                  </select>

                  {publishedCollections.length === 0 && (
                    <p className="mt-2 text-xs leading-5 text-[#77777F]">
                      You have no published collections yet. Create a
                      collection first if you want to link this NFT to one.
                    </p>
                  )}
                </div>

                {/* FORM ACTIONS */}

                <div className="mt-8 flex flex-wrap justify-end gap-3 border-t border-white/[0.06] pt-6">
                  <button
                    type="button"
                    onClick={closeCreateForm}
                    disabled={saving}
                    className="rounded-xl border border-white/10 px-5 py-3 text-sm font-semibold text-[#B6B6BE] transition hover:bg-white/[0.04] disabled:opacity-50"
                  >
                    Cancel
                  </button>

                  <button
                    type="submit"
                    disabled={saving}
                    className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#A259FF] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#9147E8] disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    {saving ? (
                      <>
                        <RefreshCw size={17} className="animate-spin" />
                        {editingNFT ? "Updating NFT..." : "Saving NFT..."}
                      </>
                    ) : (
                      <>
                        {editingNFT ? (
                          <Pencil size={17} />
                        ) : (
                          <Plus size={17} />
                        )}

                        {editingNFT ? "Save Changes" : "Create NFT"}
                      </>
                    )}
                  </button>
                </div>
              </div>

              {/* =================================================
                  LIVE MARKETPLACE CARD PREVIEW
              ================================================= */}

              <aside className="overflow-hidden rounded-[24px] border border-white/[0.07] bg-[#111114] xl:sticky xl:top-6">
                <div className="border-b border-white/[0.06] p-5">
                  <p className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.18em] text-[#B978FF]">
                    <Eye size={15} />
                    Live Preview
                  </p>

                  <h2 className="mt-2 text-lg font-semibold">
                    Marketplace NFT Card
                  </h2>

                  <p className="mt-1 text-xs leading-5 text-[#77777F]">
                    Preview updates as you fill in the form.
                  </p>
                </div>

                <div className="p-4">
                  <div className="overflow-hidden rounded-[20px] border border-white/[0.06] bg-[#212020]">
                    {/* PREVIEW IMAGE */}

                    {image ? (
                      <img
                        src={image}
                        alt={form.name || "NFT preview"}
                        className="aspect-square w-full object-cover"
                      />
                    ) : (
                      <div className="flex aspect-square flex-col items-center justify-center bg-[#19191D] text-[#686872]">
                        <ImagePlus size={40} />
                        <p className="mt-3 text-xs">Artwork preview</p>
                      </div>
                    )}

                    {/* PREVIEW DETAILS */}

                    <div className="p-5">
                      <h3 className="truncate text-lg font-semibold text-white">
                        {form.name || "Your NFT Name"}
                      </h3>

                      {/* CREATOR PREVIEW */}

                      <div className="mt-3 flex items-center gap-2">
                        <div className="flex h-7 w-7 shrink-0 items-center justify-center overflow-hidden rounded-full bg-[#A259FF]/15 text-[10px] font-bold text-[#C49AFF]">
                          {creatorAvatar ? (
                            <img
                              src={creatorAvatar}
                              alt={creatorName}
                              className="h-full w-full object-cover"
                            />
                          ) : (
                            creatorInitials
                          )}
                        </div>

                        <p className="truncate text-xs text-white">
                          {creatorName}
                        </p>
                      </div>

                      <p className="mt-4 line-clamp-4 min-h-[64px] text-xs leading-5 text-[#858584]">
                        {form.description ||
                          "Your NFT description will appear here."}
                      </p>

                      <div className="mt-5 grid grid-cols-2 gap-3 border-t border-[#3B3B3B] pt-4">
                        <div>
                          <p className="text-[11px] text-[#858584]">Price</p>
                          <p className="mt-1 break-words text-sm font-semibold text-white">
                            {form.price || "0"} ETH
                          </p>
                        </div>

                        <div className="text-right">
                          <p className="text-[11px] text-[#858584]">
                            Highest Bid
                          </p>
                          <p className="mt-1 break-words text-sm font-semibold text-white">
                            {form.highestBid || "0"} ETH
                          </p>
                        </div>
                      </div>

                      <div className="mt-4 flex flex-wrap items-center justify-between gap-2">
                        <span className="rounded-full bg-[#A259FF]/10 px-3 py-1.5 text-xs font-semibold text-[#C49AFF]">
                          {form.category}
                        </span>

                        <span className="text-[11px] text-[#858584]">
                          {form.collectionId
                            ? collections.find(
                                (item) =>
                                  String(item._id || item.id) ===
                                  String(form.collectionId)
                              )?.name || "Selected collection"
                            : "No collection"}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="mt-4 flex items-start gap-2 rounded-xl border border-[#A259FF]/15 bg-[#A259FF]/[0.05] p-3">
                    <Sparkles
                      size={16}
                      className="mt-0.5 shrink-0 text-[#B978FF]"
                    />

                    <p className="text-xs leading-5 text-[#85858D]">
                      Your NFT card uses the image, creator, name, price and
                      highest bid supplied by your form.
                    </p>
                  </div>
                </div>
              </aside>
            </form>
          </section>
        )}
      </div>

      {/* =====================================================
          NFT DETAILS DIALOG
      ===================================================== */}

      {selectedNFT && !showCreateForm && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-black/80 p-4 backdrop-blur-sm"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) {
              setSelectedNFT(null);
            }
          }}
        >
          <motion.section
            initial={{ opacity: 0, y: 12, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            className="my-auto w-full max-w-3xl overflow-hidden rounded-[24px] border border-white/10 bg-[#111114] shadow-2xl"
            role="dialog"
            aria-modal="true"
            aria-labelledby="nft-details-title"
          >
            <div className="flex items-center justify-between gap-3 border-b border-white/[0.06] px-5 py-4 sm:px-6">
              <h2
                id="nft-details-title"
                className="text-lg font-semibold"
              >
                NFT Details
              </h2>

              <button
                type="button"
                onClick={() => setSelectedNFT(null)}
                className="flex h-9 w-9 items-center justify-center rounded-xl border border-white/10 text-[#A7A7AF] transition hover:bg-white/[0.05] hover:text-white"
                aria-label="Close details"
              >
                <X size={18} />
              </button>
            </div>

            <div className="grid grid-cols-1 gap-5 p-5 sm:p-6 md:grid-cols-2">
              <div className="overflow-hidden rounded-2xl bg-[#19191D]">
                {selectedNFT.image ? (
                  <img
                    src={selectedNFT.image}
                    alt={selectedNFT.name || "NFT artwork"}
                    className="aspect-square w-full object-cover"
                  />
                ) : (
                  <div className="flex aspect-square items-center justify-center text-[#686872]">
                    <ImageIcon size={40} />
                  </div>
                )}
              </div>

              <div className="min-w-0">
                <span className="inline-flex rounded-full bg-[#A259FF]/10 px-3 py-1 text-xs font-semibold capitalize text-[#C49AFF]">
                  {selectedNFT.status || "published"}
                </span>

                <h3 className="mt-4 break-words text-2xl font-bold">
                  {selectedNFT.name || "Untitled NFT"}
                </h3>

                <div className="mt-3 flex items-center gap-2">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center overflow-hidden rounded-full bg-[#A259FF]/15 text-xs font-bold text-[#C49AFF]">
                    {selectedNFT.creatorAvatar || creatorAvatar ? (
                      <img
                        src={selectedNFT.creatorAvatar || creatorAvatar}
                        alt={selectedNFT.creator || creatorName}
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      getInitials(selectedNFT.creator || creatorName)
                    )}
                  </div>

                  <div className="min-w-0">
                    <p className="text-[11px] text-[#686872]">Created by</p>
                    <p className="truncate text-sm font-semibold">
                      {selectedNFT.creator || creatorName}
                    </p>
                  </div>
                </div>

                <p className="mt-4 whitespace-pre-wrap break-words text-sm leading-6 text-[#85858D]">
                  {selectedNFT.description || "No description added."}
                </p>

                <div className="mt-5 grid grid-cols-2 gap-3 border-t border-white/[0.06] pt-5">
                  <div>
                    <p className="text-xs text-[#686872]">Price</p>
                    <p className="mt-1 break-words text-lg font-semibold text-[#C49AFF]">
                      {selectedNFT.price ?? 0} ETH
                    </p>
                  </div>

                  <div>
                    <p className="text-xs text-[#686872]">Highest Bid</p>
                    <p className="mt-1 break-words text-lg font-semibold">
                      {selectedNFT.highestBid ?? 0} ETH
                    </p>
                  </div>
                </div>

                <div className="mt-5 space-y-4 border-t border-white/[0.06] pt-5">
                  <div>
                    <p className="text-xs text-[#686872]">Category</p>
                    <p className="mt-1 text-sm">
                      {selectedNFT.category || "Art"}
                    </p>
                  </div>

                  <div>
                    <p className="text-xs text-[#686872]">Collection</p>
                    <p className="mt-1 break-words text-sm">
                      {selectedNFT.collectionRef?.name ||
                        collections.find(
                          (collection) =>
                            String(collection._id || collection.id) ===
                            getCollectionIdFromNFT(selectedNFT)
                        )?.name ||
                        "No collection"}
                    </p>
                  </div>

                  <div>
                    <p className="flex items-center gap-2 text-xs text-[#686872]">
                      <CalendarDays size={14} />
                      Created
                    </p>

                    <p className="mt-1 text-sm">
                      {formatDate(selectedNFT.createdAt)}
                    </p>
                  </div>
                </div>

                {/* EDIT + DELETE ACTIONS */}

                <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2">
                  <button
                    type="button"
                    onClick={() => openEditForm(selectedNFT)}
                    className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[#A259FF] px-4 py-3 text-sm font-semibold text-white transition hover:bg-[#9147E8]"
                  >
                    <Pencil size={16} />
                    Edit NFT
                  </button>

                  <button
                    type="button"
                    onClick={() => handleDelete(selectedNFT)}
                    disabled={deletingId === getNFTId(selectedNFT)}
                    className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-red-400/20 bg-red-400/[0.05] px-4 py-3 text-sm font-semibold text-red-300 transition hover:bg-red-400/10 disabled:opacity-50"
                  >
                    {deletingId === getNFTId(selectedNFT) ? (
                      <RefreshCw size={16} className="animate-spin" />
                    ) : (
                      <Trash2 size={16} />
                    )}
                    Delete NFT
                  </button>
                </div>
              </div>
            </div>
          </motion.section>
        </div>
      )}
    </main>
  );
};

export default NFT;