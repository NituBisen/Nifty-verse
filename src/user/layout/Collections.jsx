import React, { useEffect, useRef, useState } from "react";
import { Plus, Upload, X, Layers, ImagePlus, ArrowLeft } from "lucide-react";

const getCurrentUser = () => {
  try {
    return JSON.parse(localStorage.getItem("user") || "{}");
  } catch {
    return {};
  }
};

const getStorageKey = () => {
  const user = getCurrentUser();
  return `niftyverse_collections_${user._id || user.id || user.email || "default"}`;
};

const getInitials = (name = "Creator") =>
  name
    .trim()
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() || "")
    .join("") || "C";

export default function Collections() {
  const [collections, setCollections] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("Art");
  const [image, setImage] = useState("");
  const [error, setError] = useState("");
  const fileRef = useRef(null);

  const currentUser = getCurrentUser();
  const creatorName =
    currentUser.name ||
    currentUser.fullName ||
    currentUser.username ||
    currentUser.email?.split("@")[0] ||
    "Creator Name";
  const creatorImage =
    currentUser.profileImage || currentUser.avatar || currentUser.image || "";

  useEffect(() => {
    try {
      const saved = JSON.parse(localStorage.getItem(getStorageKey()) || "[]");
      setCollections(Array.isArray(saved) ? saved : []);
    } catch {
      setCollections([]);
    }
  }, []);

  const resetForm = () => {
    setName("");
    setDescription("");
    setCategory("Art");
    setImage("");
    setError("");
    if (fileRef.current) fileRef.current.value = "";
  };

  const handleImage = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      setError("Please select a valid image.");
      return;
    }
    if (file.size > 3 * 1024 * 1024) {
      setError("Please select an image smaller than 3 MB.");
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      setImage(reader.result);
      setError("");
    };
    reader.readAsDataURL(file);
  };

  const handleCreate = (e) => {
    e.preventDefault();
    setError("");

    if (!name.trim()) {
      setError("Please enter a collection name.");
      return;
    }
    if (!image) {
      setError("Please upload a collection cover image.");
      return;
    }
    if (collections.some((item) => item.name.toLowerCase() === name.trim().toLowerCase())) {
      setError("A collection with this name already exists.");
      return;
    }

    const newCollection = {
      id: Date.now().toString(),
      name: name.trim(),
      description: description.trim(),
      category,
      image,
      creator: creatorName,
      creatorImage,
      nftCount: 0,
      createdAt: new Date().toISOString(),
    };
    const updated = [newCollection, ...collections];

    try {
      localStorage.setItem(getStorageKey(), JSON.stringify(updated));
      setCollections(updated);
      resetForm();
      setShowForm(false);
    } catch {
      setError("Unable to save. Please try a smaller image.");
    }
  };

  const handleDelete = (id) => {
    const updated = collections.filter((item) => item.id !== id);
    try {
      localStorage.setItem(getStorageKey(), JSON.stringify(updated));
      setCollections(updated);
    } catch {
      setError("Unable to update collections.");
    }
  };

  const openForm = () => {
    setError("");
    setShowForm(true);
  };

  const inputClass =
    "w-full rounded-xl border border-white/10 bg-[#0B0B10] px-4 py-3 text-sm text-white outline-none placeholder:text-gray-600 focus:border-purple-500";

  return (
    <div className="overflow-x-hidden p-5 min-h-full w-full text-white bg-[#08080B] md:p-8">
      {!showForm ? (
        <>
          <section className="mb-8 p-6 bg-gradient-to-r from-[#121216] to-[#19131F] rounded-[26px] border-white/[0.07] border md:p-9">
            <p className="mb-3 text-xs font-bold tracking-[0.25em] text-purple-400">NIFTY VERSE</p>
            <div className="flex flex-col items-center justify-between gap-5 sm:flex-row">
              <div>
                <h1 className="text-3xl font-bold md:text-4xl">Collections</h1>
                <p className="mt-3 text-sm text-[#858584] md:text-base">Create and manage your own NFT collections.</p>
              </div>
              <button type="button" onClick={openForm} className="inline-flex items-center justify-center gap-2 px-5 py-3 text-sm font-semibold bg-gradient-to-r from-purple-600 to-blue-500 rounded-xl hover:opacity-90">
                <Plus size={18} /> Create Collection
              </button>
            </div>
          </section>

          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-xl font-semibold">My Collections</h2>
              <p className="mt-1 text-sm text-gray-500">{collections.length} {collections.length === 1 ? "collection" : "collections"}</p>
            </div>
          </div>

          {collections.length === 0 ? (
            <div className="flex flex-col items-center justify-center px-5 min-h-[300px] text-center bg-[#101014] rounded-2xl border-dashed border-white/10 border">
              <div className="flex items-center justify-center mb-4 h-16 w-16 text-purple-400 bg-purple-500/10 rounded-2xl"><Layers size={30} /></div>
              <h3 className="text-lg font-semibold">No collections yet</h3>
              <p className="mt-2 max-w-sm text-sm text-gray-500">Create your first collection to organize your NFTs.</p>
              <button type="button" onClick={openForm} className="inline-flex items-center gap-2 mt-6 px-5 py-3 text-sm font-semibold bg-purple-600 rounded-xl hover:bg-purple-500"><Plus size={18} /> Create your first collection</button>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
              {collections.map((collection) => (
                <article key={collection.id} className="overflow-hidden bg-[#111115] rounded-2xl border-white/[0.08] border transition hover:border-purple-500/40">
                  <div className="overflow-hidden h-52 bg-[#19191F]"><img src={collection.image} alt={collection.name} className="object-cover h-full w-full" /></div>
                  <div className="p-5">
                    <div className="flex items-start justify-between gap-3">
                      <h3 className="break-words text-lg font-semibold">{collection.name}</h3>
                      <button type="button" onClick={() => handleDelete(collection.id)} className="px-2 py-1 text-sm text-gray-400 rounded-lg shrink-0 hover:bg-red-500/10 hover:text-red-400" aria-label={`Delete ${collection.name}`}>Delete</button>
                    </div>
                    <div className="flex items-center gap-2 mt-3 min-w-0">
                      <div className="overflow-hidden flex items-center justify-center h-8 w-8 text-[10px] font-bold text-white bg-purple-600 rounded-full border-white/10 shrink-0 border">
                        {collection.creatorImage ? (
                          <img src={collection.creatorImage} alt={collection.creator || "Creator"} className="object-cover h-full w-full" />
                        ) : (
                          getInitials(collection.creator || "Creator")
                        )}
                      </div>
                      <div className="min-w-0">
                        <p className="text-[11px] text-gray-500">Created by</p>
                        <p className="text-sm text-gray-300 truncate">{collection.creator || "Creator Name"}</p>
                      </div>
                    </div>
                    <p className="mt-3 min-h-10 text-sm text-gray-400">{collection.description || "No description provided."}</p>
                    <div className="flex justify-between mt-5 pt-4 text-sm border-t border-white/10">
                      <span className="text-gray-500">{collection.category}</span>
                      <span className="text-purple-300">{collection.nftCount} NFTs</span>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}
        </>
      ) : (
        <div className="mx-auto w-full max-w-[1400px]">
          <button type="button" onClick={() => { setShowForm(false); setError(""); }} className="inline-flex items-center gap-2 mb-6 text-sm text-gray-400 hover:text-white">
            <ArrowLeft size={18} /> Back to Collections
          </button>

          <div className="mb-8">
            <p className="text-xs font-bold tracking-[0.25em] text-purple-400">NIFTY VERSE</p>
            <h1 className="mt-3 text-3xl font-bold md:text-4xl">Create <span className="text-purple-400">Collection</span></h1>
            <p className="mt-2 text-sm text-gray-400">Add a cover image and details for your collection.</p>
          </div>

          {/* Left: collection form | Right: live preview */}
          <div className="grid grid-cols-1 items-start gap-6 lg:grid-cols-2 gap-8">
            <section className="p-5 min-w-0 bg-[#111115] rounded-3xl border-white/10 border md:p-8">
              <h2 className="text-xl font-semibold">Collection Details</h2>
              <form onSubmit={handleCreate} className="mt-6 space-y-6">
                <div>
                  <label className="block mb-3 text-sm font-medium">Collection Cover *</label>
                  <input ref={fileRef} type="file" accept="image/*" onChange={handleImage} className="hidden" />
                  {image ? (
                    <div className="overflow-hidden relative rounded-2xl border-purple-500/30 border">
                      <img src={image} alt="Collection preview" className="object-cover h-64 w-full" />
                      <button type="button" onClick={() => { setImage(""); if (fileRef.current) fileRef.current.value = ""; }} className="absolute right-3 top-3 p-2 bg-black/70 rounded-lg hover:text-red-400" aria-label="Remove image"><X size={18} /></button>
                      <button type="button" onClick={() => fileRef.current?.click()} className="absolute bottom-3 right-3 inline-flex items-center gap-2 px-4 py-2 text-sm bg-black/70 rounded-lg"><Upload size={16} /> Change image</button>
                    </div>
                  ) : (
                    <button type="button" onClick={() => fileRef.current?.click()} className="flex flex-col items-center justify-center p-6 min-h-48 w-full bg-purple-500/5 rounded-2xl border-dashed border-purple-500/40 border hover:bg-purple-500/10">
                      <ImagePlus size={30} className="mb-3 text-purple-400" />
                      <span className="text-sm font-medium">Upload collection cover</span>
                      <span className="mt-2 text-xs text-gray-500">PNG, JPG or WEBP · Max 3 MB</span>
                    </button>
                  )}
                </div>

                <div>
                  <label className="block mb-2 text-sm font-medium">Collection Name *</label>
                  <input value={name} onChange={(e) => setName(e.target.value)} required maxLength={60} placeholder="Enter collection name" className={inputClass} />
                </div>

                <div>
                  <label className="block mb-2 text-sm font-medium">Description</label>
                  <textarea value={description} onChange={(e) => setDescription(e.target.value)} rows={4} maxLength={500} placeholder="Describe your collection..." className={`${inputClass} resize-y`} />
                </div>

                <div>
                  <label className="block mb-2 text-sm font-medium">Category</label>
                  <select value={category} onChange={(e) => setCategory(e.target.value)} className={inputClass}>
                    <option>Art</option><option>Photography</option><option>Gaming</option><option>Music</option><option>Collectibles</option><option>Sports</option><option>Other</option>
                  </select>
                </div>

                {error && <p role="alert" className="text-sm text-red-400">{error}</p>}

                <div className="flex flex-col-reverse justify-end gap-3 pt-6 border-t border-white/10 sm:flex-row">
                  <button type="button" onClick={() => { resetForm(); setShowForm(false); }} className="px-5 py-3 text-sm rounded-xl border-white/10 border hover:bg-white/5">Cancel</button>
                  <button type="submit" className="px-6 py-3 text-sm font-semibold bg-gradient-to-r from-purple-600 to-blue-500 rounded-xl hover:opacity-90"><Plus size={16} className="inline mr-2" /> Create Collection</button>
                </div>
              </form>
            </section>

            <aside className="p-5 h-fit min-w-0 bg-[#111115] rounded-3xl border-white/10 border md:p-6 lg:sticky top-6">
              <p className="text-sm font-semibold text-gray-400">Collection Preview</p>
              <div className="overflow-hidden mt-4 bg-[#0B0B10] rounded-2xl border-white/10 border">
                {image ? (
                  <img src={image} alt="Live collection cover preview" className="object-cover w-full aspect-[4/3]" />
                ) : (
                  <div className="flex flex-col items-center justify-center text-gray-600 bg-[#15151B] aspect-[4/3]">
                    <ImagePlus size={42} className="text-gray-700" />
                    <p className="mt-3 text-sm">Your cover image will appear here</p>
                  </div>
                )}
                <div className="p-5">
                  <span className="inline-flex px-3 py-1 text-xs font-medium text-purple-300 bg-purple-500/10 rounded-full">{category}</span>
                  <h3 className="mt-4 break-words text-2xl font-bold">{name.trim() || "Collection Name"}</h3>
                  <div className="flex items-center gap-3 mt-4 min-w-0">
                    <div className="overflow-hidden flex items-center justify-center h-10 w-10 text-xs font-bold text-white bg-purple-600 rounded-full border-white/10 shrink-0 border">
                      {creatorImage ? (
                        <img src={creatorImage} alt={creatorName} className="object-cover h-full w-full" />
                      ) : (
                        getInitials(creatorName)
                      )}
                    </div>
                    <div className="min-w-0">
                      <p className="text-xs text-gray-500">Created by</p>
                      <p className="text-sm font-semibold text-white truncate">{creatorName}</p>
                    </div>
                  </div>
                  <p className="mt-3 min-h-12 break-words text-sm leading-6 text-gray-400">{description.trim() || "Your collection description will appear here."}</p>
                  <div className="flex items-center justify-between mt-5 pt-4 text-sm border-t border-white/10">
                    <span className="text-gray-500">Items</span>
                    <span className="font-semibold text-purple-300">0 NFTs</span>
                  </div>
                </div>
              </div>
              <p className="mt-4 text-xs leading-5 text-gray-500">This preview updates as you enter details and upload your collection cover.</p>
            </aside>
          </div>
        </div>
      )}
    </div>
  );
}
