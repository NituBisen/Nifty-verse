// import React, {
//   useCallback,
//   useEffect,
//   useRef,
//   useState,
// } from "react";

// import {
//   Plus,
//   Upload,
//   X,
//   Layers,
//   ImagePlus,
//   ArrowLeft,
//   RefreshCw,
// } from "lucide-react";

// import { useNavigate } from "react-router-dom";

// const API_URL =
//   import.meta.env.VITE_API_URL ||
//   "https://nifty-verse-backend-production.up.railway.app";

// // =========================================================
// // HELPERS
// // =========================================================

// const getCurrentUser = () => {
//   try {
//     return JSON.parse(localStorage.getItem("user") || "{}");
//   } catch {
//     return {};
//   }
// };

// const getInitials = (name = "Creator") =>
//   String(name)
//     .trim()
//     .split(/\s+/)
//     .filter(Boolean)
//     .slice(0, 2)
//     .map((part) => part[0]?.toUpperCase() || "")
//     .join("") || "C";

// const getCollectionId = (collection) =>
//   String(collection?._id || collection?.id || "");

// const normalizeCollection = (collection) => ({
//   ...collection,
//   id: getCollectionId(collection),
//   name: collection.name || "Untitled Collection",
//   description: collection.description || "",
//   category: collection.category || "Art",
//   image: collection.image || collection.primaryImage || "",
//   creator:
//     collection.creator ||
//     collection.artist ||
//     collection.createdBy?.username ||
//     "Creator",
//   creatorImage:
//     collection.creatorImage ||
//     collection.artistAvatar ||
//     collection.createdBy?.profileImage ||
//     "",
//   nftCount: Number(
//     collection.nftCount ?? collection.nfts?.length ?? 0
//   ),
// });

// const getErrorMessage = (data, fallback) =>
//   data?.message || fallback;

// // =========================================================
// // COLLECTIONS PAGE
// // =========================================================

// export default function Collections() {
//   const navigate = useNavigate();
//   const fileRef = useRef(null);

//   const [collections, setCollections] = useState([]);
//   const [showForm, setShowForm] = useState(false);

//   const [name, setName] = useState("");
//   const [description, setDescription] = useState("");
//   const [category, setCategory] = useState("Art");
//   const [image, setImage] = useState("");

//   const [error, setError] = useState("");
//   const [message, setMessage] = useState("");

//   const [loading, setLoading] = useState(true);
//   const [saving, setSaving] = useState(false);
//   const [deletingId, setDeletingId] = useState("");
//   const [refreshing, setRefreshing] = useState(false);

//   const [creator, setCreator] = useState(() => getCurrentUser());

//   const creatorName =
//     creator.name ||
//     creator.fullName ||
//     creator.username ||
//     creator.email?.split("@")[0] ||
//     "Creator Name";

//   const creatorImage =
//     creator.profileImage ||
//     creator.avatar ||
//     creator.image ||
//     "";

//   // =========================================================
//   // FETCH REAL COLLECTIONS FROM THE BACKEND
//   // GET /api/collections/mine
//   // =========================================================

//   const loadCollections = useCallback(
//     async (isRefresh = false) => {
//       const token = localStorage.getItem("token");

//       if (!token) {
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
//         const response = await fetch(
//           `${API_URL}/api/collections/mine`,
//           {
//             method: "GET",
//             headers: {
//               Authorization: `Bearer ${token}`,
//             },
//             cache: "no-store",
//           }
//         );

//         const data = await response.json().catch(() => ({}));

//         if (response.status === 401) {
//           navigate("/signin", { replace: true });
//           return;
//         }

//         if (
//           !response.ok ||
//           data.success === false ||
//           !Array.isArray(data.collections)
//         ) {
//           throw new Error(
//             getErrorMessage(
//               data,
//               "Unable to load your collections."
//             )
//           );
//         }

//         setCollections(data.collections.map(normalizeCollection));
//       } catch (fetchError) {
//         console.error("Load collections error:", fetchError);

//         setError(
//           fetchError.message || "Unable to load your collections."
//         );
//       } finally {
//         setLoading(false);
//         setRefreshing(false);
//       }
//     },
//     [navigate]
//   );

//   // Load collections and the saved profile avatar.
//   useEffect(() => {
//     const token = localStorage.getItem("token");

//     loadCollections();

//     if (!token) return undefined;

//     const controller = new AbortController();

//     const loadProfile = async () => {
//       try {
//         const response = await fetch(
//           `${API_URL}/api/profile/me`,
//           {
//             headers: {
//               Authorization: `Bearer ${token}`,
//             },
//             cache: "no-store",
//             signal: controller.signal,
//           }
//         );

//         if (!response.ok) return;

//         const data = await response.json().catch(() => ({}));

//         if (data.success && data.user && !controller.signal.aborted) {
//           setCreator((previous) => ({
//             ...previous,
//             ...data.user,
//             profileImage:
//               data.user.profileImage ||
//               previous.profileImage ||
//               "",
//           }));
//         }
//       } catch (profileError) {
//         if (profileError.name !== "AbortError") {
//           console.warn(
//             "Unable to load creator avatar:",
//             profileError
//           );
//         }
//       }
//     };

//     loadProfile();

//     return () => controller.abort();
//   }, [loadCollections]);

//   // =========================================================
//   // RESET FORM
//   // =========================================================

//   const resetForm = () => {
//     setName("");
//     setDescription("");
//     setCategory("Art");
//     setImage("");
//     setError("");

//     if (fileRef.current) {
//       fileRef.current.value = "";
//     }
//   };

//   // =========================================================
//   // IMAGE UPLOAD
//   // =========================================================

//   const handleImage = (event) => {
//     const file = event.target.files?.[0];

//     if (!file) return;

//     if (!file.type.startsWith("image/")) {
//       setError("Please select a valid image.");
//       event.target.value = "";
//       return;
//     }

//     if (file.size > 3 * 1024 * 1024) {
//       setError("Please select an image smaller than 3 MB.");
//       event.target.value = "";
//       return;
//     }

//     const reader = new FileReader();

//     reader.onload = () => {
//       setImage(String(reader.result || ""));
//       setError("");
//       setMessage("");
//     };

//     reader.onerror = () => {
//       setError("Unable to read this image. Please try another.");
//     };

//     reader.readAsDataURL(file);
//   };

//   // =========================================================
//   // CREATE COLLECTION
//   // POST /api/collections
//   // =========================================================

//   const handleCreate = async (event) => {
//     event.preventDefault();

//     setError("");
//     setMessage("");

//     if (!name.trim()) {
//       setError("Please enter a collection name.");
//       return;
//     }

//     if (!image) {
//       setError("Please upload a collection cover image.");
//       return;
//     }

//     const duplicate = collections.some(
//       (item) =>
//         String(item.name || "").trim().toLowerCase() ===
//         name.trim().toLowerCase()
//     );

//     if (duplicate) {
//       setError("A collection with this name already exists.");
//       return;
//     }

//     const token = localStorage.getItem("token");

//     if (!token) {
//       navigate("/signin", { replace: true });
//       return;
//     }

//     try {
//       setSaving(true);

//       const response = await fetch(`${API_URL}/api/collections`, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${token}`,
//         },
//         body: JSON.stringify({
//           name: name.trim(),
//           description: description.trim(),
//           category,
//           image,
//           status: "published",
//         }),
//       });

//       const data = await response.json().catch(() => ({}));

//       if (response.status === 401) {
//         navigate("/signin", { replace: true });
//         return;
//       }

//       if (
//         !response.ok ||
//         data.success === false
//       ) {
//         throw new Error(
//           getErrorMessage(data, "Unable to create collection.")
//         );
//       }

//       // Prefer the saved database record returned by the backend.
//       if (data.collection) {
//         const savedCollection = normalizeCollection(data.collection);

//         setCollections((previous) => [
//           savedCollection,
//           ...previous.filter(
//             (item) =>
//               getCollectionId(item) !==
//               getCollectionId(savedCollection)
//           ),
//         ]);
//       } else {
//         // Re-fetch if the API only returns a success message.
//         await loadCollections(true);
//       }

//       resetForm();
//       setShowForm(false);
//       setMessage(
//         data.message || "Collection created successfully."
//       );
//     } catch (createError) {
//       console.error("Create collection error:", createError);

//       setError(
//         createError.message || "Unable to create collection."
//       );
//     } finally {
//       setSaving(false);
//     }
//   };

//   // =========================================================
//   // DELETE COLLECTION
//   // DELETE /api/collections/:id
//   // =========================================================

//   const handleDelete = async (collection) => {
//     const collectionId = getCollectionId(collection);

//     if (!collectionId || collectionId === "undefined") {
//       setError("This collection has no valid database ID.");
//       return;
//     }

//     const confirmed = window.confirm(
//       `Delete "${collection.name}"?`
//     );

//     if (!confirmed) return;

//     const token = localStorage.getItem("token");

//     if (!token) {
//       navigate("/signin", { replace: true });
//       return;
//     }

//     setError("");
//     setMessage("");
//     setDeletingId(collectionId);

//     try {
//       const response = await fetch(
//         `${API_URL}/api/collections/${encodeURIComponent(
//           collectionId
//         )}`,
//         {
//           method: "DELETE",
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );

//       const data = await response.json().catch(() => ({}));

//       if (response.status === 401) {
//         navigate("/signin", { replace: true });
//         return;
//       }

//       if (!response.ok || data.success === false) {
//         throw new Error(
//           getErrorMessage(data, "Unable to delete collection.")
//         );
//       }

//       setCollections((previous) =>
//         previous.filter(
//           (item) => getCollectionId(item) !== collectionId
//         )
//       );

//       setMessage(data.message || "Collection deleted successfully.");
//     } catch (deleteError) {
//       console.error("Delete collection error:", deleteError);

//       setError(
//         deleteError.message || "Unable to delete collection."
//       );
//     } finally {
//       setDeletingId("");
//     }
//   };

//   // =========================================================
//   // FORM OPEN
//   // =========================================================

//   const openForm = () => {
//     resetForm();
//     setMessage("");
//     setShowForm(true);
//   };

//   const inputClass =
//     "w-full rounded-xl border border-white/10 bg-[#0B0B10] px-4 py-3 text-sm text-white outline-none placeholder:text-gray-600 focus:border-purple-500";

//   // =========================================================
//   // COLLECTION LIST + FORM
//   // =========================================================

//   return (
//     <div className="min-h-full w-full overflow-x-hidden bg-[#08080B] p-5 text-white md:p-8">
//       {!showForm ? (
//         <>
//           {/* ==================================================
//               COLLECTIONS HEADER
//           ================================================== */}

//           <section className="mb-8 rounded-[26px] border border-white/[0.07] bg-gradient-to-r from-[#121216] to-[#19131F] p-6 md:p-9">
//             <p className="mb-3 text-xs font-bold tracking-[0.25em] text-purple-400">
//               NIFTY VERSE
//             </p>

//             <div className="flex flex-col items-center justify-between gap-5 sm:flex-row">
//               <div>
//                 <h1 className="text-3xl font-bold md:text-4xl">
//                   Collections
//                 </h1>

//                 <p className="mt-3 text-sm text-[#858584] md:text-base">
//                   Create and manage your own NFT collections.
//                 </p>
//               </div>

//               <button
//                 type="button"
//                 onClick={openForm}
//                 className="inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-purple-600 to-blue-500 px-5 py-3 text-sm font-semibold hover:opacity-90"
//               >
//                 <Plus size={18} />
//                 Create Collection
//               </button>
//             </div>
//           </section>

//           {/* STATUS MESSAGES */}

//           {error && (
//             <div
//               role="alert"
//               className="mb-5 rounded-xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-400"
//             >
//               {error}
//             </div>
//           )}

//           {message && (
//             <div
//               role="status"
//               className="mb-5 rounded-xl border border-emerald-500/20 bg-emerald-500/10 px-4 py-3 text-sm text-emerald-300"
//             >
//               {message}
//             </div>
//           )}

//           {/* COLLECTIONS HEADING */}

//           <div className="mb-6 flex items-center justify-between gap-4">
//             <div>
//               <h2 className="text-xl font-semibold">
//                 My Collections
//               </h2>

//               <p className="mt-1 text-sm text-gray-500">
//                 {collections.length}{" "}
//                 {collections.length === 1
//                   ? "collection"
//                   : "collections"}
//               </p>
//             </div>

//             <button
//               type="button"
//               onClick={() => loadCollections(true)}
//               disabled={refreshing || loading}
//               title="Refresh collections"
//               className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 text-gray-400 transition hover:border-purple-500 hover:text-white disabled:opacity-50"
//             >
//               <RefreshCw
//                 size={17}
//                 className={
//                   refreshing || loading ? "animate-spin" : ""
//                 }
//               />
//             </button>
//           </div>

//           {/* LOADING */}

//           {loading ? (
//             <div className="flex min-h-[300px] flex-col items-center justify-center rounded-2xl border border-white/10 bg-[#101014] px-5 text-center">
//               <RefreshCw
//                 size={28}
//                 className="animate-spin text-purple-400"
//               />

//               <p className="mt-4 text-sm text-gray-400">
//                 Loading your collections...
//               </p>
//             </div>
//           ) : collections.length === 0 ? (
//             /* EMPTY STATE */

//             <div className="flex min-h-[300px] flex-col items-center justify-center rounded-2xl border border-dashed border-white/10 bg-[#101014] px-5 text-center">
//               <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-purple-500/10 text-purple-400">
//                 <Layers size={30} />
//               </div>

//               <h3 className="text-lg font-semibold">
//                 No collections yet
//               </h3>

//               <p className="mt-2 max-w-sm text-sm text-gray-500">
//                 Create your first collection to organize your NFTs.
//               </p>

//               <button
//                 type="button"
//                 onClick={openForm}
//                 className="mt-6 inline-flex items-center gap-2 rounded-xl bg-purple-600 px-5 py-3 text-sm font-semibold hover:bg-purple-500"
//               >
//                 <Plus size={18} />
//                 Create your first collection
//               </button>
//             </div>
//           ) : (
//             /* ==================================================
//                REAL DATABASE COLLECTIONS
//             ================================================== */

//             <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
//               {collections.map((collection) => {
//                 const collectionId = getCollectionId(collection);
//                 const artistName =
//                   collection.creator || creatorName;

//                 return (
//                   <article
//                     key={collectionId}
//                     className="overflow-hidden rounded-2xl border border-white/[0.08] bg-[#111115] transition hover:border-purple-500/40"
//                   >
//                     {/* COVER IMAGE */}

//                     <div className="h-52 overflow-hidden bg-[#19191F]">
//                       {collection.image ? (
//                         <img
//                           src={collection.image}
//                           alt={collection.name}
//                           loading="lazy"
//                           className="h-full w-full object-cover"
//                         />
//                       ) : (
//                         <div className="flex h-full items-center justify-center text-gray-600">
//                           <ImagePlus size={32} />
//                         </div>
//                       )}
//                     </div>

//                     {/* COLLECTION DETAILS */}

//                     <div className="p-5">
//                       <div className="flex items-start justify-between gap-3">
//                         <h3 className="break-words text-lg font-semibold">
//                           {collection.name}
//                         </h3>

//                         <button
//                           type="button"
//                           onClick={() =>
//                             handleDelete(collection)
//                           }
//                           disabled={deletingId === collectionId}
//                           className="shrink-0 rounded-lg px-2 py-1 text-sm text-gray-400 hover:bg-red-500/10 hover:text-red-400 disabled:opacity-50"
//                           aria-label={`Delete ${collection.name}`}
//                         >
//                           {deletingId === collectionId
//                             ? "Deleting..."
//                             : "Delete"}
//                         </button>
//                       </div>

//                       {/* REAL CREATOR AVATAR */}

//                       <div className="mt-3 flex min-w-0 items-center gap-2">
//                         <div className="flex h-8 w-8 shrink-0 items-center justify-center overflow-hidden rounded-full border border-white/10 bg-purple-600 text-[10px] font-bold text-white">
//                           {collection.creatorImage ? (
//                             <img
//                               src={collection.creatorImage}
//                               alt={artistName}
//                               className="h-full w-full object-cover"
//                             />
//                           ) : (
//                             getInitials(artistName)
//                           )}
//                         </div>

//                         <div className="min-w-0">
//                           <p className="text-[11px] text-gray-500">
//                             Created by
//                           </p>

//                           <p className="truncate text-sm text-gray-300">
//                             {artistName}
//                           </p>
//                         </div>
//                       </div>

//                       <p className="mt-3 min-h-10 break-words text-sm text-gray-400">
//                         {collection.description ||
//                           "No description provided."}
//                       </p>

//                       <div className="mt-5 flex justify-between gap-3 border-t border-white/10 pt-4 text-sm">
//                         <span className="text-gray-500">
//                           {collection.category}
//                         </span>

//                         <span className="text-purple-300">
//                           {collection.nftCount} NFTs
//                         </span>
//                       </div>
//                     </div>
//                   </article>
//                 );
//               })}
//             </div>
//           )}
//         </>
//       ) : (
//         /* ==================================================
//            CREATE COLLECTION FORM
//         ================================================== */

//         <div className="mx-auto w-full max-w-[1400px]">
//           <button
//             type="button"
//             onClick={() => {
//               resetForm();
//               setShowForm(false);
//             }}
//             className="mb-6 inline-flex items-center gap-2 text-sm text-gray-400 hover:text-white"
//           >
//             <ArrowLeft size={18} />
//             Back to Collections
//           </button>

//           <div className="mb-8">
//             <p className="text-xs font-bold tracking-[0.25em] text-purple-400">
//               NIFTY VERSE
//             </p>

//             <h1 className="mt-3 text-3xl font-bold md:text-4xl">
//               Create <span className="text-purple-400">Collection</span>
//             </h1>

//             <p className="mt-2 text-sm text-gray-400">
//               Add a cover image and details for your collection.
//             </p>
//           </div>

//           {/* LEFT FORM + RIGHT LIVE PREVIEW */}

//           <div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-2">
//             {/* COLLECTION FORM */}

//             <section className="min-w-0 rounded-3xl border border-white/10 bg-[#111115] p-5 md:p-8">
//               <h2 className="text-xl font-semibold">
//                 Collection Details
//               </h2>

//               <form
//                 onSubmit={handleCreate}
//                 className="mt-6 space-y-6"
//               >
//                 {/* COVER IMAGE */}

//                 <div>
//                   <label className="mb-3 block text-sm font-medium">
//                     Collection Cover *
//                   </label>

//                   <input
//                     ref={fileRef}
//                     type="file"
//                     accept="image/png,image/jpeg,image/webp,image/gif"
//                     onChange={handleImage}
//                     className="hidden"
//                   />

//                   {image ? (
//                     <div className="relative overflow-hidden rounded-2xl border border-purple-500/30">
//                       <img
//                         src={image}
//                         alt="Collection preview"
//                         className="h-64 w-full object-cover"
//                       />

//                       <button
//                         type="button"
//                         onClick={() => {
//                           setImage("");

//                           if (fileRef.current) {
//                             fileRef.current.value = "";
//                           }
//                         }}
//                         className="absolute right-3 top-3 rounded-lg bg-black/70 p-2 hover:text-red-400"
//                         aria-label="Remove image"
//                       >
//                         <X size={18} />
//                       </button>

//                       <button
//                         type="button"
//                         onClick={() => fileRef.current?.click()}
//                         className="absolute bottom-3 right-3 inline-flex items-center gap-2 rounded-lg bg-black/70 px-4 py-2 text-sm"
//                       >
//                         <Upload size={16} />
//                         Change image
//                       </button>
//                     </div>
//                   ) : (
//                     <button
//                       type="button"
//                       onClick={() => fileRef.current?.click()}
//                       className="flex min-h-48 w-full flex-col items-center justify-center rounded-2xl border border-dashed border-purple-500/40 bg-purple-500/5 p-6 hover:bg-purple-500/10"
//                     >
//                       <ImagePlus
//                         size={30}
//                         className="mb-3 text-purple-400"
//                       />

//                       <span className="text-sm font-medium">
//                         Upload collection cover
//                       </span>

//                       <span className="mt-2 text-xs text-gray-500">
//                         PNG, JPG or WEBP · Max 3 MB
//                       </span>
//                     </button>
//                   )}
//                 </div>

//                 {/* NAME */}

//                 <div>
//                   <label className="mb-2 block text-sm font-medium">
//                     Collection Name *
//                   </label>

//                   <input
//                     value={name}
//                     onChange={(event) => {
//                       setName(event.target.value);
//                       setError("");
//                     }}
//                     required
//                     maxLength={60}
//                     placeholder="Enter collection name"
//                     className={inputClass}
//                   />
//                 </div>

//                 {/* DESCRIPTION */}

//                 <div>
//                   <label className="mb-2 block text-sm font-medium">
//                     Description
//                   </label>

//                   <textarea
//                     value={description}
//                     onChange={(event) =>
//                       setDescription(event.target.value)
//                     }
//                     rows={4}
//                     maxLength={500}
//                     placeholder="Describe your collection..."
//                     className={`${inputClass} resize-y`}
//                   />
//                 </div>

//                 {/* CATEGORY */}

//                 <div>
//                   <label className="mb-2 block text-sm font-medium">
//                     Category
//                   </label>

//                   <select
//                     value={category}
//                     onChange={(event) =>
//                       setCategory(event.target.value)
//                     }
//                     className={inputClass}
//                   >
//                     <option>Art</option>
//                     <option>Photography</option>
//                     <option>Gaming</option>
//                     <option>Music</option>
//                     <option>Collectibles</option>
//                     <option>Sports</option>
//                     <option>Other</option>
//                   </select>
//                 </div>

//                 {/* ERRORS */}

//                 {error && (
//                   <p role="alert" className="text-sm text-red-400">
//                     {error}
//                   </p>
//                 )}

//                 {/* ACTION BUTTONS */}

//                 <div className="flex flex-col-reverse justify-end gap-3 border-t border-white/10 pt-6 sm:flex-row">
//                   <button
//                     type="button"
//                     onClick={() => {
//                       resetForm();
//                       setShowForm(false);
//                     }}
//                     disabled={saving}
//                     className="rounded-xl border border-white/10 px-5 py-3 text-sm hover:bg-white/5 disabled:opacity-50"
//                   >
//                     Cancel
//                   </button>

//                   <button
//                     type="submit"
//                     disabled={saving}
//                     className="inline-flex items-center justify-center rounded-xl bg-gradient-to-r from-purple-600 to-blue-500 px-6 py-3 text-sm font-semibold hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
//                   >
//                     {saving ? (
//                       <>
//                         <RefreshCw
//                           size={16}
//                           className="mr-2 animate-spin"
//                         />
//                         Saving Collection...
//                       </>
//                     ) : (
//                       <>
//                         <Plus size={16} className="mr-2" />
//                         Create Collection
//                       </>
//                     )}
//                   </button>
//                 </div>
//               </form>
//             </section>

//             {/* LIVE PREVIEW — SAME DESIGN */}

//             <aside className="sticky top-6 h-fit min-w-0 rounded-3xl border border-white/10 bg-[#111115] p-5 md:p-6">
//               <p className="text-sm font-semibold text-gray-400">
//                 Collection Preview
//               </p>

//               <div className="mt-4 overflow-hidden rounded-2xl border border-white/10 bg-[#0B0B10]">
//                 {image ? (
//                   <img
//                     src={image}
//                     alt="Live collection cover preview"
//                     className="aspect-[4/3] w-full object-cover"
//                   />
//                 ) : (
//                   <div className="flex aspect-[4/3] flex-col items-center justify-center bg-[#15151B] text-gray-600">
//                     <ImagePlus size={42} className="text-gray-700" />

//                     <p className="mt-3 text-sm">
//                       Your cover image will appear here
//                     </p>
//                   </div>
//                 )}

//                 <div className="p-5">
//                   <span className="inline-flex rounded-full bg-purple-500/10 px-3 py-1 text-xs font-medium text-purple-300">
//                     {category}
//                   </span>

//                   <h3 className="mt-4 break-words text-2xl font-bold">
//                     {name.trim() || "Collection Name"}
//                   </h3>

//                   <div className="mt-4 flex min-w-0 items-center gap-3">
//                     <div className="flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-full border border-white/10 bg-purple-600 text-xs font-bold text-white">
//                       {creatorImage ? (
//                         <img
//                           src={creatorImage}
//                           alt={creatorName}
//                           className="h-full w-full object-cover"
//                         />
//                       ) : (
//                         getInitials(creatorName)
//                       )}
//                     </div>

//                     <div className="min-w-0">
//                       <p className="text-xs text-gray-500">
//                         Created by
//                       </p>

//                       <p className="truncate text-sm font-semibold text-white">
//                         {creatorName}
//                       </p>
//                     </div>
//                   </div>

//                   <p className="mt-3 min-h-12 break-words text-sm leading-6 text-gray-400">
//                     {description.trim() ||
//                       "Your collection description will appear here."}
//                   </p>

//                   <div className="mt-5 flex items-center justify-between border-t border-white/10 pt-4 text-sm">
//                     <span className="text-gray-500">Items</span>

//                     <span className="font-semibold text-purple-300">
//                       0 NFTs
//                     </span>
//                   </div>
//                 </div>
//               </div>

//               <p className="mt-4 text-xs leading-5 text-gray-500">
//                 This preview updates as you enter details and upload
//                 your collection cover.
//               </p>
//             </aside>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }





//new code

import React, {

  useCallback,

  useEffect,

  useRef,

  useState,

} from "react";



import {

  Plus,

  Upload,

  X,

  Layers,

  ImagePlus,

  ArrowLeft,

  RefreshCw,

} from "lucide-react";



import { useNavigate } from "react-router-dom";



const API_URL =

  import.meta.env.VITE_API_URL ||

  "https\://nifty-verse-backend-production.up.railway.app";



// =========================================================

// HELPERS

// =========================================================



const getCurrentUser = () => {

  try {

    return JSON.parse(localStorage.getItem("user") || "{}");

  } catch {

    return {};

  }

};



const getInitials = (name = "Creator") =>

  String(name)

    .trim()

    .split(/\s+/)

    .filter(Boolean)

    .slice(0, 2)

    .map((part) => part[0]?.toUpperCase() || "")

    .join("") || "C";



const getCollectionId = (collection) =>

  String(collection?._id || collection?.id || "");



const normalizeCollection = (collection) => ({

  ...collection,

  id: getCollectionId(collection),

  name: collection.name || "Untitled Collection",

  description: collection.description || "",

  category: collection.category || "Art",

  image: collection.image || collection.primaryImage || "",

  creator:

    collection.creator ||

    collection.artist ||

    collection.createdBy?.username ||

    "Creator",

  creatorImage:

    collection.creatorImage ||

    collection.artistAvatar ||

    collection.createdBy?.profileImage ||

    "",

  nftCount: Number(

    collection.nftCount ?? collection.nfts?.length ?? 0

  ),

});



const getErrorMessage = (data, fallback) =>

  data?.message || fallback;



// =========================================================

// COLLECTIONS PAGE

// =========================================================



export default function Collections() {

  const navigate = useNavigate();

  const fileRef = useRef(null);



  const [collections, setCollections] = useState([]);

  const [showForm, setShowForm] = useState(false);



  const [name, setName] = useState("");

  const [description, setDescription] = useState("");

  const [category, setCategory] = useState("");
  const [categories, setCategories] = useState([]);
  const [categoriesLoading, setCategoriesLoading] = useState(true);

  const [image, setImage] = useState("");



  const [error, setError] = useState("");

  const [message, setMessage] = useState("");



  const [loading, setLoading] = useState(true);

  const [saving, setSaving] = useState(false);

  const [deletingId, setDeletingId] = useState("");

  const [refreshing, setRefreshing] = useState(false);



  const [creator, setCreator] = useState(() => getCurrentUser());



  const creatorName =

    creator.name ||

    creator.fullName ||

    creator.username ||

    creator.email?.split("@")[0] ||

    "Creator Name";



  const creatorImage =

    creator.profileImage ||

    creator.avatar ||

    creator.image ||

    "";



  // =========================================================

  // FETCH REAL COLLECTIONS FROM THE BACKEND

  // GET /api/collections/mine

  // =========================================================



  const loadCollections = useCallback(

    async (isRefresh = false) => {

      const token = localStorage.getItem("token");



      if (!token) {

        navigate("/signin", { replace: true });

        return;

      }



      if (isRefresh) {

        setRefreshing(true);

      } else {

        setLoading(true);

      }



      setError("");



      try {

        const response = await fetch(

          `${API_URL}/api/collections/mine`,

          {

            method: "GET",

            headers: {

              Authorization: `Bearer ${token}`,

            },

            cache: "no-store",

          }

        );



        const data = await response.json().catch(() => ({}));



        if (response.status === 401) {

          navigate("/signin", { replace: true });

          return;

        }



        if (

          !response.ok ||

          data.success === false ||

          !Array.isArray(data.collections)

        ) {

          throw new Error(

            getErrorMessage(

              data,

              "Unable to load your collections."

            )

          );

        }



        setCollections(data.collections.map(normalizeCollection));

      } catch (fetchError) {

        console.error("Load collections error:", fetchError);



        setError(

          fetchError.message || "Unable to load your collections."

        );

      } finally {

        setLoading(false);

        setRefreshing(false);

      }

    },

    [navigate]

  );



  // Load collections and the saved profile avatar.

  useEffect(() => {

    const token = localStorage.getItem("token");



    loadCollections();



    if (!token) return undefined;



    const controller = new AbortController();



    const loadProfile = async () => {

      try {

        const response = await fetch(

          `${API_URL}/api/profile/me`,

          {

            headers: {

              Authorization: `Bearer ${token}`,

            },

            cache: "no-store",

            signal: controller.signal,

          }

        );



        if (!response.ok) return;



        const data = await response.json().catch(() => ({}));



        if (data.success && data.user && !controller.signal.aborted) {

          setCreator((previous) => ({

            ...previous,

            ...data.user,

            profileImage:

              data.user.profileImage ||

              previous.profileImage ||

              "",

          }));

        }

      } catch (profileError) {

        if (profileError.name !== "AbortError") {

          console.warn(

            "Unable to load creator avatar:",

            profileError

          );

        }

      }

    };



    loadProfile();



    return () => controller.abort();

  }, [loadCollections]);



  // Load active categories created from the Admin Panel.
  useEffect(() => {
    let cancelled = false;

    const loadCategories = async () => {
      try {
        setCategoriesLoading(true);
        const response = await fetch(`${API_URL}/api/categories/active`, { cache: "no-store" });
        const data = await response.json().catch(() => ({}));
        if (!response.ok) throw new Error(data.message || "Unable to load categories.");
        const list = Array.isArray(data.categories) ? data.categories : Array.isArray(data) ? data : [];
        if (!cancelled) setCategories(list.filter((item) => !item.status || item.status === "active"));
      } catch (categoryError) {
        console.error("Load collection categories error:", categoryError);
        if (!cancelled) setCategories([]);
      } finally {
        if (!cancelled) setCategoriesLoading(false);
      }
    };

    loadCategories();
    return () => { cancelled = true; };
  }, []);

  // =========================================================

  // RESET FORM

  // =========================================================



  const resetForm = () => {

    setName("");

    setDescription("");

    setCategory("");

    setImage("");

    setError("");



    if (fileRef.current) {

      fileRef.current.value = "";

    }

  };



  // =========================================================

  // IMAGE UPLOAD

  // =========================================================



  const handleImage = (event) => {

    const file = event.target.files?.[0];



    if (!file) return;



    if (!file.type.startsWith("image/")) {

      setError("Please select a valid image.");

      event.target.value = "";

      return;

    }



    if (file.size > 3 * 1024 * 1024) {

      setError("Please select an image smaller than 3 MB.");

      event.target.value = "";

      return;

    }



    const reader = new FileReader();



    reader.onload = () => {

      setImage(String(reader.result || ""));

      setError("");

      setMessage("");

    };



    reader.onerror = () => {

      setError("Unable to read this image. Please try another.");

    };



    reader.readAsDataURL(file);

  };



  // =========================================================

  // CREATE COLLECTION

  // POST /api/collections

  // =========================================================



  const handleCreate = async (event) => {

    event.preventDefault();



    setError("");

    setMessage("");



    if (!name.trim()) {

      setError("Please enter a collection name.");

      return;

    }



    if (!image) {

      setError("Please upload a collection cover image.");

      return;

    }



    const duplicate = collections.some(

      (item) =>

        String(item.name || "").trim().toLowerCase() ===

        name.trim().toLowerCase()

    );



    if (duplicate) {

      setError("A collection with this name already exists.");

      return;

    }



    const token = localStorage.getItem("token");



    if (!token) {

      navigate("/signin", { replace: true });

      return;

    }



    try {

      setSaving(true);



      const response = await fetch(`${API_URL}/api/collections`, {

        method: "POST",

        headers: {

          "Content-Type": "application/json",

          Authorization: `Bearer ${token}`,

        },

        body: JSON.stringify({

          name: name.trim(),

          description: description.trim(),

          category,

          image,

          status: "published",

        }),

      });



      const data = await response.json().catch(() => ({}));



      if (response.status === 401) {

        navigate("/signin", { replace: true });

        return;

      }



      if (

        !response.ok ||

        data.success === false

      ) {

        throw new Error(

          getErrorMessage(data, "Unable to create collection.")

        );

      }



      window.dispatchEvent(new Event("marketplace-data-changed"));

      // Prefer the saved database record returned by the backend.

      if (data.collection) {

        const savedCollection = normalizeCollection(data.collection);



        setCollections((previous) => [

          savedCollection,

          ...previous.filter(

            (item) =>

              getCollectionId(item) !==

              getCollectionId(savedCollection)

          ),

        ]);

      } else {

        // Re-fetch if the API only returns a success message.

        await loadCollections(true);

      }



      resetForm();

      setShowForm(false);

      setMessage(

        data.message || "Collection created successfully."

      );

    } catch (createError) {

      console.error("Create collection error:", createError);



      setError(

        createError.message || "Unable to create collection."

      );

    } finally {

      setSaving(false);

    }

  };



  // =========================================================

  // DELETE COLLECTION

  // DELETE /api/collections/:id

  // =========================================================



  const handleDelete = async (collection) => {

    const collectionId = getCollectionId(collection);



    if (!collectionId || collectionId === "undefined") {

      setError("This collection has no valid database ID.");

      return;

    }



    const confirmed = window.confirm(

      `Delete "${collection.name}"?`

    );



    if (!confirmed) return;



    const token = localStorage.getItem("token");



    if (!token) {

      navigate("/signin", { replace: true });

      return;

    }



    setError("");

    setMessage("");

    setDeletingId(collectionId);



    try {

      const response = await fetch(

        `${API_URL}/api/collections/${encodeURIComponent(

          collectionId

        )}`,

        {

          method: "DELETE",

          headers: {

            Authorization: `Bearer ${token}`,

          },

        }

      );



      const data = await response.json().catch(() => ({}));



      if (response.status === 401) {

        navigate("/signin", { replace: true });

        return;

      }



      if (!response.ok || data.success === false) {

        throw new Error(

          getErrorMessage(data, "Unable to delete collection.")

        );

      }



      setCollections((previous) =>

        previous.filter(

          (item) => getCollectionId(item) !== collectionId

        )

      );



      window.dispatchEvent(new Event("marketplace-data-changed"));

      setMessage(data.message || "Collection deleted successfully.");

    } catch (deleteError) {

      console.error("Delete collection error:", deleteError);



      setError(

        deleteError.message || "Unable to delete collection."

      );

    } finally {

      setDeletingId("");

    }

  };



  // =========================================================

  // FORM OPEN

  // =========================================================



  const openForm = () => {

    resetForm();

    setMessage("");

    setShowForm(true);

  };



  const inputClass =

    "w-full rounded-xl border border-white/10 bg-[#0B0B10] px-4 py-3 text-sm text-white outline-none placeholder:text-gray-600 focus:border-purple-500";



  // =========================================================

  // COLLECTION LIST + FORM

  // =========================================================



  return (

    <div className="min-h-full w-full overflow-x-hidden bg-[#08080B] p-5 text-white md:p-8">

      {!showForm ? (

        <>

          {/* ==================================================

              COLLECTIONS HEADER

          ================================================== */}



          <section className="mb-8 rounded-[26px] border border-white/[0.07] bg-gradient-to-r from-[#121216] to-[#19131F] p-6 md:p-9">

            <p className="mb-3 text-xs font-bold tracking-[0.25em] text-purple-400">

              NIFTY VERSE

            </p>



            <div className="flex flex-col items-center justify-between gap-5 sm:flex-row">

              <div>

                <h1 className="text-3xl font-bold md:text-4xl">

                  Collections

                </h1>



                <p className="mt-3 text-sm text-[#858584] md:text-base">

                  Create and manage your own NFT collections.

                </p>

              </div>



              <button

                type="button"

                onClick={openForm}

                className="inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-purple-600 to-blue-500 px-5 py-3 text-sm font-semibold hover:opacity-90"

              >

                <Plus size={18} />

                Create Collection

              </button>

            </div>

          </section>



          {/* STATUS MESSAGES */}



          {error && (

            <div

              role="alert"

              className="mb-5 rounded-xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-400"

            >

              {error}

            </div>

          )}



          {message && (

            <div

              role="status"

              className="mb-5 rounded-xl border border-emerald-500/20 bg-emerald-500/10 px-4 py-3 text-sm text-emerald-300"

            >

              {message}

            </div>

          )}



          {/* COLLECTIONS HEADING */}



          <div className="mb-6 flex items-center justify-between gap-4">

            <div>

              <h2 className="text-xl font-semibold">

                My Collections

              </h2>



              <p className="mt-1 text-sm text-gray-500">

                {collections.length}{" "}

                {collections.length === 1

                  ? "collection"

                  : "collections"}

              </p>

            </div>



            <button

              type="button"

              onClick={() => loadCollections(true)}

              disabled={refreshing || loading}

              title="Refresh collections"

              className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 text-gray-400 transition hover:border-purple-500 hover:text-white disabled:opacity-50"

            >

              <RefreshCw

                size={17}

                className={

                  refreshing || loading ? "animate-spin" : ""

                }

              />

            </button>

          </div>



          {/* LOADING */}



          {loading ? (

            <div className="flex min-h-[300px] flex-col items-center justify-center rounded-2xl border border-white/10 bg-[#101014] px-5 text-center">

              <RefreshCw

                size={28}

                className="animate-spin text-purple-400"

              />



              <p className="mt-4 text-sm text-gray-400">

                Loading your collections...

              </p>

            </div>

          ) : collections.length === 0 ? (

            /* EMPTY STATE */



            <div className="flex min-h-[300px] flex-col items-center justify-center rounded-2xl border border-dashed border-white/10 bg-[#101014] px-5 text-center">

              <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-purple-500/10 text-purple-400">

                <Layers size={30} />

              </div>



              <h3 className="text-lg font-semibold">

                No collections yet

              </h3>



              <p className="mt-2 max-w-sm text-sm text-gray-500">

                Create your first collection to organize your NFTs.

              </p>



              <button

                type="button"

                onClick={openForm}

                className="mt-6 inline-flex items-center gap-2 rounded-xl bg-purple-600 px-5 py-3 text-sm font-semibold hover:bg-purple-500"

              >

                <Plus size={18} />

                Create your first collection

              </button>

            </div>

          ) : (

            /* ==================================================

               REAL DATABASE COLLECTIONS

            ================================================== */



            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">

              {collections.map((collection) => {

                const collectionId = getCollectionId(collection);

                const artistName =

                  collection.creator || creatorName;



                return (

                  <article

                    key={collectionId}

                    className="overflow-hidden rounded-2xl border border-white/[0.08] bg-[#111115] transition hover:border-purple-500/40"

                  >

                    {/* COVER IMAGE */}



                    <div className="h-52 overflow-hidden bg-[#19191F]">

                      {collection.image ? (

                        <img

                          src={collection.image}

                          alt={collection.name}

                          loading="lazy"

                          className="h-full w-full object-cover"

                        />

                      ) : (

                        <div className="flex h-full items-center justify-center text-gray-600">

                          <ImagePlus size={32} />

                        </div>

                      )}

                    </div>



                    {/* COLLECTION DETAILS */}



                    <div className="p-5">

                      <div className="flex items-start justify-between gap-3">

                        <h3 className="break-words text-lg font-semibold">

                          {collection.name}

                        </h3>



                        <button

                          type="button"

                          onClick={() =>

                            handleDelete(collection)

                          }

                          disabled={deletingId === collectionId}

                          className="shrink-0 rounded-lg px-2 py-1 text-sm text-gray-400 hover:bg-red-500/10 hover:text-red-400 disabled:opacity-50"

                          aria-label={`Delete ${collection.name}`}

                        >

                          {deletingId === collectionId

                            ? "Deleting..."

                            : "Delete"}

                        </button>

                      </div>



                      {/* REAL CREATOR AVATAR */}



                      <div className="mt-3 flex min-w-0 items-center gap-2">

                        <div className="flex h-8 w-8 shrink-0 items-center justify-center overflow-hidden rounded-full border border-white/10 bg-purple-600 text-[10px] font-bold text-white">

                          {collection.creatorImage ? (

                            <img

                              src={collection.creatorImage}

                              alt={artistName}

                              className="h-full w-full object-cover"

                            />

                          ) : (

                            getInitials(artistName)

                          )}

                        </div>



                        <div className="min-w-0">

                          <p className="text-[11px] text-gray-500">

                            Created by

                          </p>



                          <p className="truncate text-sm text-gray-300">

                            {artistName}

                          </p>

                        </div>

                      </div>



                      <p className="mt-3 min-h-10 break-words text-sm text-gray-400">

                        {collection.description ||

                          "No description provided."}

                      </p>



                      <div className="mt-5 flex justify-between gap-3 border-t border-white/10 pt-4 text-sm">

                        <span className="text-gray-500">

                          {collection.category}

                        </span>



                        <span className="text-purple-300">

                          {collection.nftCount} NFTs

                        </span>

                      </div>

                    </div>

                  </article>

                );

              })}

            </div>

          )}

        </>

      ) : (

        /* ==================================================

           CREATE COLLECTION FORM

        ================================================== */



        <div className="mx-auto w-full max-w-[1400px]">

          <button

            type="button"

            onClick={() => {

              resetForm();

              setShowForm(false);

            }}

            className="mb-6 inline-flex items-center gap-2 text-sm text-gray-400 hover:text-white"

          >

            <ArrowLeft size={18} />

            Back to Collections

          </button>



          <div className="mb-8">

            <p className="text-xs font-bold tracking-[0.25em] text-purple-400">

              NIFTY VERSE

            </p>



            <h1 className="mt-3 text-3xl font-bold md:text-4xl">

              Create <span className="text-purple-400">Collection</span>

            </h1>



            <p className="mt-2 text-sm text-gray-400">

              Add a cover image and details for your collection.

            </p>

          </div>



          {/* LEFT FORM + RIGHT LIVE PREVIEW */}



          <div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-2">

            {/* COLLECTION FORM */}



            <section className="min-w-0 rounded-3xl border border-white/10 bg-[#111115] p-5 md:p-8">

              <h2 className="text-xl font-semibold">

                Collection Details

              </h2>



              <form

                onSubmit={handleCreate}

                className="mt-6 space-y-6"

              >

                {/* COVER IMAGE */}



                <div>

                  <label className="mb-3 block text-sm font-medium">

                    Collection Cover *

                  </label>



                  <input

                    ref={fileRef}

                    type="file"

                    accept="image/png,image/jpeg,image/webp,image/gif"

                    onChange={handleImage}

                    className="hidden"

                  />



                  {image ? (

                    <div className="relative overflow-hidden rounded-2xl border border-purple-500/30">

                      <img

                        src={image}

                        alt="Collection preview"

                        className="h-64 w-full object-cover"

                      />



                      <button

                        type="button"

                        onClick={() => {

                          setImage("");



                          if (fileRef.current) {

                            fileRef.current.value = "";

                          }

                        }}

                        className="absolute right-3 top-3 rounded-lg bg-black/70 p-2 hover:text-red-400"

                        aria-label="Remove image"

                      >

                        <X size={18} />

                      </button>



                      <button

                        type="button"

                        onClick={() => fileRef.current?.click()}

                        className="absolute bottom-3 right-3 inline-flex items-center gap-2 rounded-lg bg-black/70 px-4 py-2 text-sm"

                      >

                        <Upload size={16} />

                        Change image

                      </button>

                    </div>

                  ) : (

                    <button

                      type="button"

                      onClick={() => fileRef.current?.click()}

                      className="flex min-h-48 w-full flex-col items-center justify-center rounded-2xl border border-dashed border-purple-500/40 bg-purple-500/5 p-6 hover:bg-purple-500/10"

                    >

                      <ImagePlus

                        size={30}

                        className="mb-3 text-purple-400"

                      />



                      <span className="text-sm font-medium">

                        Upload collection cover

                      </span>



                      <span className="mt-2 text-xs text-gray-500">

                        PNG, JPG or WEBP · Max 3 MB

                      </span>

                    </button>

                  )}

                </div>



                {/* NAME */}



                <div>

                  <label className="mb-2 block text-sm font-medium">

                    Collection Name *

                  </label>



                  <input

                    value={name}

                    onChange={(event) => {

                      setName(event.target.value);

                      setError("");

                    }}

                    required

                    maxLength={60}

                    placeholder="Enter collection name"

                    className={inputClass}

                  />

                </div>



                {/* DESCRIPTION */}



                <div>

                  <label className="mb-2 block text-sm font-medium">

                    Description

                  </label>



                  <textarea

                    value={description}

                    onChange={(event) =>

                      setDescription(event.target.value)

                    }

                    rows={4}

                    maxLength={500}

                    placeholder="Describe your collection..."

                    className={`${inputClass} resize-y`}

                  />

                </div>



                {/* CATEGORY */}



                <div>

                  <label className="mb-2 block text-sm font-medium">

                    Category

                  </label>



                  <select

                    value={category}

                    onChange={(event) =>

                      setCategory(event.target.value)

                    }

                    className={inputClass}

                  >

                    <option value="">{categoriesLoading ? "Loading categories..." : "Select a category"}</option>
            {categories.map((item) => (
              <option key={item._id || item.name} value={item.name}>
                {item.name}
              </option>
            ))}
          </select>

                </div>



                {/* ERRORS */}



                {error && (

                  <p role="alert" className="text-sm text-red-400">

                    {error}

                  </p>

                )}



                {/* ACTION BUTTONS */}



                <div className="flex flex-col-reverse justify-end gap-3 border-t border-white/10 pt-6 sm:flex-row">

                  <button

                    type="button"

                    onClick={() => {

                      resetForm();

                      setShowForm(false);

                    }}

                    disabled={saving}

                    className="rounded-xl border border-white/10 px-5 py-3 text-sm hover:bg-white/5 disabled:opacity-50"

                  >

                    Cancel

                  </button>



                  <button

                    type="submit"

                    disabled={saving}

                    className="inline-flex items-center justify-center rounded-xl bg-gradient-to-r from-purple-600 to-blue-500 px-6 py-3 text-sm font-semibold hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"

                  >

                    {saving ? (

                      <>

                        <RefreshCw

                          size={16}

                          className="mr-2 animate-spin"

                        />

                        Saving Collection...

                      </>

                    ) : (

                      <>

                        <Plus size={16} className="mr-2" />

                        Create Collection

                      </>

                    )}

                  </button>

                </div>

              </form>

            </section>



            {/* LIVE PREVIEW — SAME DESIGN */}



            <aside className="sticky top-6 h-fit min-w-0 rounded-3xl border border-white/10 bg-[#111115] p-5 md:p-6">

              <p className="text-sm font-semibold text-gray-400">

                Collection Preview

              </p>



              <div className="mt-4 overflow-hidden rounded-2xl border border-white/10 bg-[#0B0B10]">

                {image ? (

                  <img

                    src={image}

                    alt="Live collection cover preview"

                    className="aspect-[4/3] w-full object-cover"

                  />

                ) : (

                  <div className="flex aspect-[4/3] flex-col items-center justify-center bg-[#15151B] text-gray-600">

                    <ImagePlus size={42} className="text-gray-700" />



                    <p className="mt-3 text-sm">

                      Your cover image will appear here

                    </p>

                  </div>

                )}



                <div className="p-5">

                  <span className="inline-flex rounded-full bg-purple-500/10 px-3 py-1 text-xs font-medium text-purple-300">

                    {category}

                  </span>



                  <h3 className="mt-4 break-words text-2xl font-bold">

                    {name.trim() || "Collection Name"}

                  </h3>



                  <div className="mt-4 flex min-w-0 items-center gap-3">

                    <div className="flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-full border border-white/10 bg-purple-600 text-xs font-bold text-white">

                      {creatorImage ? (

                        <img

                          src={creatorImage}

                          alt={creatorName}

                          className="h-full w-full object-cover"

                        />

                      ) : (

                        getInitials(creatorName)

                      )}

                    </div>



                    <div className="min-w-0">

                      <p className="text-xs text-gray-500">

                        Created by

                      </p>



                      <p className="truncate text-sm font-semibold text-white">

                        {creatorName}

                      </p>

                    </div>

                  </div>



                  <p className="mt-3 min-h-12 break-words text-sm leading-6 text-gray-400">

                    {description.trim() ||

                      "Your collection description will appear here."}

                  </p>



                  <div className="mt-5 flex items-center justify-between border-t border-white/10 pt-4 text-sm">

                    <span className="text-gray-500">Items</span>



                    <span className="font-semibold text-purple-300">

                      0 NFTs

                    </span>

                  </div>

                </div>

              </div>



              <p className="mt-4 text-xs leading-5 text-gray-500">

                This preview updates as you enter details and upload

                your collection cover.

              </p>

            </aside>

          </div>

        </div>

      )}

    </div>

  );

}