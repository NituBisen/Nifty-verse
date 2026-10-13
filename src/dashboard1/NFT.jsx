
import React, { useEffect, useRef, useState } from "react";
import {
  ImagePlus,
  Plus,
  Upload,
  X,
  ArrowLeft,
  Eye,
  Trash2,
  Layers,
} from "lucide-react";

const NFT_STORAGE_KEY = "niftyverse_user_nfts";
const COLLECTION_STORAGE_KEY = "niftyverse_user_collections";

const INITIAL_FORM = {
  name: "",
  creator: "",
  description: "",
  price: "",
  highestBid: "",
  category: "Art",
  collection: "",
};

const getInitials = (name = "User") => {
  const words = String(name).trim().split(/\s+/).filter(Boolean);
  if (!words.length) return "U";

  return words
    .slice(0, 2)
    .map((word) => word.charAt(0).toUpperCase())
    .join("");
};

const readStorage = (key, fallback = []) => {
  try {
    const value = JSON.parse(localStorage.getItem(key) || "null");
    return Array.isArray(value) ? value : fallback;
  } catch {
    return fallback;
  }
};

export default function NFT() {
  const fileInputRef = useRef(null);

  const [user, setUser] = useState(null);
  const [nfts, setNfts] = useState([]);
  const [collections, setCollections] = useState([]);
  const [activeTab, setActiveTab] = useState("Created");
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [selectedNFT, setSelectedNFT] = useState(null);

  const [image, setImage] = useState(null);
  const [form, setForm] = useState(INITIAL_FORM);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    try {
      const savedUser = JSON.parse(
        localStorage.getItem("user") || "null"
      );
      setUser(savedUser);
    } catch {
      setUser(null);
    }

    setNfts(readStorage(NFT_STORAGE_KEY));
    setCollections(readStorage(COLLECTION_STORAGE_KEY));
  }, []);

  const inputClass =
    "mt-2 w-full rounded-xl border border-white/10 bg-[#101010] px-4 py-3 text-sm text-white outline-none placeholder:text-gray-600 transition focus:border-[#A259FF] disabled:opacity-70";

  const handleChange = (event) => {
    const { name, value } = event.target;

    setForm((previous) => ({
      ...previous,
      [name]: value,
    }));

    setError("");
    setSuccess("");
  };

  // Upload NFT artwork and show its preview.
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
    };

    reader.onerror = () => {
      setError("Unable to read the image. Please try again.");
    };

    reader.readAsDataURL(file);
  };

  const removeImage = () => {
    setImage(null);

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const openCreateForm = () => {
    setForm({
      ...INITIAL_FORM,
      creator:
        user?.name || user?.fullName || user?.username || "",
    });

    setImage(null);
    setError("");
    setSuccess("");
    setShowCreateForm(true);
  };

  const closeCreateForm = () => {
    setShowCreateForm(false);
    setImage(null);
    setForm(INITIAL_FORM);
    setError("");
  };

  // Create and persist NFT.
  const handleSubmit = (event) => {
    event.preventDefault();
    setError("");
    setSuccess("");

    if (!image) {
      setError("Please upload an NFT image.");
      return;
    }

    if (!form.name.trim()) {
      setError("Please enter NFT name.");
      return;
    }

    if (!form.creator.trim()) {
      setError("Please enter creator name.");
      return;
    }

    if (!form.description.trim()) {
      setError("Please enter NFT description.");
      return;
    }

    if (form.price === "" || Number(form.price) <= 0) {
      setError("Please enter a valid price.");
      return;
    }

    if (
      form.highestBid === "" ||
      Number(form.highestBid) < 0
    ) {
      setError("Please enter a valid highest bid.");
      return;
    }

    const newNFT = {
      id: `nft-${Date.now()}`,
      name: form.name.trim(),
      creator: form.creator.trim(),
      description: form.description.trim(),
      image,
      price: Number(form.price).toFixed(2),
      highestBid: Number(form.highestBid).toFixed(2),
      category: form.category,
      collection: form.collection,
      owner:
        user?.name ||
        user?.fullName ||
        user?.username ||
        "You",
      status: "Created",
      createdAt: new Date().toISOString(),
    };

    const updatedNFTs = [newNFT, ...nfts];

    try {
      localStorage.setItem(
        NFT_STORAGE_KEY,
        JSON.stringify(updatedNFTs)
      );

      setNfts(updatedNFTs);
      setActiveTab("Created");
      setShowCreateForm(false);
      setImage(null);
      setForm(INITIAL_FORM);
      setSuccess("NFT created successfully.");
    } catch (storageError) {
      console.error("Unable to save NFT:", storageError);
      setError(
        "Unable to save NFT. Try a smaller image or remove some saved items."
      );
    }
  };

  const handleDelete = (id) => {
    const updatedNFTs = nfts.filter((nft) => nft.id !== id);

    try {
      localStorage.setItem(
        NFT_STORAGE_KEY,
        JSON.stringify(updatedNFTs)
      );

      setNfts(updatedNFTs);
      setSelectedNFT(null);
      setSuccess("NFT removed successfully.");
    } catch (storageError) {
      console.error("Unable to remove NFT:", storageError);
      setError("Unable to remove this NFT.");
    }
  };

  const displayedNFTs = nfts.filter((nft) => {
    if (activeTab === "All") return true;
    return nft.status === activeTab;
  });

  const creatorName =
    form.creator ||
    user?.name ||
    user?.fullName ||
    user?.username ||
    "Creator Name";

  // Create NFT form with live preview.
  if (showCreateForm) {
    return (
      <div className="overflow-x-hidden min-h-full w-full min-w-0 text-white bg-black">
        <main className="mx-auto px-4 pb-12 pt-5 w-full max-w-[1400px] sm:px-6 lg:px-8">
          <button
            type="button"
            onClick={closeCreateForm}
            className="inline-flex items-center gap-2 mb-6 text-sm font-semibold text-gray-400 transition hover:text-white"
          >
            <ArrowLeft size={17} />
            Back to My NFTs
          </button>

          <div className="mb-8">
            <p className="text-xs font-bold tracking-[0.2em] text-[#A259FF] uppercase">
              Nifty Verse
            </p>

            <h1 className="mt-3 text-3xl font-bold sm:text-4xl">
              Create <span className="text-[#A259FF]">NFT</span>
            </h1>

            <p className="mt-2 text-sm leading-6 text-gray-500">
              Upload your artwork and enter its details to create
              your NFT.
            </p>
          </div>

          <div className="grid gap-6 min-w-0 lg:grid-cols-[minmax(0,1fr)_360px] xl:gap-8">
            {/* Create form */}
            <form
              onSubmit={handleSubmit}
              className="p-5 min-w-0 bg-[#151515] rounded-2xl border-white/10 border sm:p-7"
            >
              {error && (
                <div className="mb-5 px-4 py-3 text-sm text-red-300 bg-red-500/10 rounded-xl border-red-500/20 border">
                  {error}
                </div>
              )}

              {/* NFT Image frame */}
              <label className="block text-sm font-semibold text-white">
                NFT Image *
              </label>

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
                  className="overflow-hidden relative flex flex-col items-center justify-center mt-3 p-6 min-h-[280px] w-full bg-gradient-to-br from-[#17121F] via-[#101014] to-[#151523] rounded-2xl border-2 border-dashed border-[#A259FF]/50 group transition hover:border-[#A259FF] hover:shadow-[0_0_30px_rgba(162,89,255,0.15)] sm:min-h-[340px]"
                >
                  <div className="absolute inset-3 rounded-xl border-white/10 pointer-events-none border" />

                  <div className="absolute left-5 top-5 h-5 w-5 rounded-tl-lg border-l-2 border-t-2 border-[#A259FF] pointer-events-none" />
                  <div className="absolute right-5 top-5 h-5 w-5 rounded-tr-lg border-r-2 border-t-2 border-[#5794FF] pointer-events-none" />
                  <div className="absolute bottom-5 left-5 h-5 w-5 rounded-bl-lg border-b-2 border-l-2 border-[#5794FF] pointer-events-none" />
                  <div className="absolute bottom-5 right-5 h-5 w-5 rounded-br-lg border-b-2 border-r-2 border-[#A259FF] pointer-events-none" />

                  <div className="z-10 relative flex items-center justify-center h-16 w-16 text-[#A259FF] bg-[#A259FF]/10 rounded-full transition group-hover:scale-105">
                    <Upload size={28} />
                  </div>

                  <p className="z-10 relative mt-5 text-sm font-semibold">
                    Upload NFT Image
                  </p>

                  <p className="z-10 relative mt-2 text-xs text-gray-500">
                    PNG, JPG, JPEG, WEBP or GIF · Maximum 2 MB
                  </p>
                </button>
              ) : (
                <div className="overflow-hidden relative mt-3 p-3 bg-[#101010] rounded-2xl border-[#A259FF]/40 border">
                  <div className="overflow-hidden relative rounded-xl border-white/10 border">
                    <img
                      src={image}
                      alt="NFT preview"
                      className="object-contain w-full aspect-square"
                    />

                    <button
                      type="button"
                      onClick={removeImage}
                      className="absolute right-3 top-3 flex items-center justify-center h-10 w-10 text-white bg-black/80 rounded-full transition hover:bg-red-500"
                      aria-label="Remove image"
                    >
                      <X size={18} />
                    </button>

                    <button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      className="absolute bottom-3 left-3 inline-flex items-center gap-2 px-3 py-2 text-xs font-semibold text-white bg-black/80 rounded-lg backdrop-blur-sm transition hover:bg-[#A259FF]"
                    >
                      <Upload size={14} />
                      Change Image
                    </button>
                  </div>
                </div>
              )}

              {/* NFT name */}
              <div className="mt-6">
                <label className="text-sm font-semibold">
                  NFT Name *
                </label>
                <input
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  required
                  maxLength={80}
                  placeholder="Enter NFT name"
                  className={inputClass}
                />
              </div>

              {/* Creator */}
              <div className="mt-6">
                <label className="text-sm font-semibold">
                  Creator *
                </label>
                <input
                  name="creator"
                  value={form.creator}
                  onChange={handleChange}
                  required
                  placeholder="Enter creator name"
                  className={inputClass}
                />
              </div>

              {/* Description */}
              <div className="mt-6">
                <label className="text-sm font-semibold">
                  Description *
                </label>
                <textarea
                  name="description"
                  value={form.description}
                  onChange={handleChange}
                  required
                  rows={5}
                  maxLength={1000}
                  placeholder="Describe your NFT"
                  className={`${inputClass} resize-y`}
                />
              </div>

              {/* Price and highest bid */}
              <div className="grid gap-5 mt-6 sm:grid-cols-2">
                <div>
                  <label className="text-sm font-semibold">
                    Price *
                  </label>
                  <div className="relative">
                    <input
                      type="number"
                      name="price"
                      min="0.01"
                      step="0.01"
                      value={form.price}
                      onChange={handleChange}
                      required
                      placeholder="0.00"
                      className={`${inputClass} pr-16`}
                    />
                    <span className="absolute right-4 top-1/2 text-xs font-semibold text-gray-500 -translate-y-1/2">
                      ETH
                    </span>
                  </div>
                </div>

                <div>
                  <label className="text-sm font-semibold">
                    Highest Bid *
                  </label>
                  <div className="relative">
                    <input
                      type="number"
                      name="highestBid"
                      min="0"
                      step="0.01"
                      value={form.highestBid}
                      onChange={handleChange}
                      required
                      placeholder="0.00"
                      className={`${inputClass} pr-20`}
                    />
                    <span className="absolute right-4 top-1/2 text-xs font-semibold text-gray-500 -translate-y-1/2">
                      wETH
                    </span>
                  </div>
                </div>
              </div>

              {/* Category */}
              <div className="mt-6">
                <label className="text-sm font-semibold">
                  Category
                </label>
                <select
                  name="category"
                  value={form.category}
                  onChange={handleChange}
                  className={inputClass}
                >
                  <option value="Art">Art</option>
                  <option value="Collectibles">Collectibles</option>
                  <option value="Photography">Photography</option>
                  <option value="Music">Music</option>
                  <option value="Sports">Sports</option>
                  <option value="Virtual Worlds">Virtual Worlds</option>
                </select>
              </div>

              {/* Collection */}
              <div className="mt-6">
                <label className="text-sm font-semibold">
                  Collection
                </label>
                <select
                  name="collection"
                  value={form.collection}
                  onChange={handleChange}
                  className={inputClass}
                >
                  <option value="">No Collection</option>

                  {collections.map((collection) => (
                    <option
                      key={collection.id ?? collection.name}
                      value={collection.name}
                    >
                      {collection.name}
                    </option>
                  ))}
                </select>
              </div>

              <button
                type="submit"
                className="flex items-center justify-center gap-2 mt-8 px-5 py-4 w-full text-sm font-bold text-white bg-[#A259FF] rounded-xl transition hover:bg-[#8f45e8]"
              >
                <Plus size={18} />
                Create NFT
              </button>
            </form>

            {/* Live preview */}
            <aside className="p-5 h-fit min-w-0 bg-[#151515] rounded-2xl border-white/10 border lg:sticky top-6">
              <p className="text-sm font-semibold text-gray-400">
                NFT Preview
              </p>

              <div className="overflow-hidden mt-4 bg-[#101010] rounded-2xl border-white/10 border">
                {image ? (
                  <img
                    src={image}
                    alt="NFT preview"
                    className="object-cover w-full aspect-square"
                  />
                ) : (
                  <div className="flex flex-col items-center justify-center aspect-square">
                    <ImagePlus size={45} className="text-gray-700" />
                    <p className="mt-4 text-sm text-gray-600">
                      NFT preview will appear here
                    </p>
                  </div>
                )}

                <div className="p-5">
                  <h2 className="text-xl font-bold text-white truncate">
                    {form.name || "NFT Name"}
                  </h2>

                  <div className="flex items-center gap-3 mt-3">
                    <div className="flex items-center justify-center h-9 w-9 text-xs font-bold text-white bg-[#A259FF] rounded-full shrink-0">
                      {getInitials(creatorName)}
                    </div>

                    <div className="min-w-0">
                      <p className="text-xs text-gray-500">Creator</p>
                      <p className="text-sm font-semibold text-white truncate">
                        {creatorName}
                      </p>
                    </div>
                  </div>

                  <p className="mt-5 break-words text-sm leading-6 text-gray-500 line-clamp-3">
                    {form.description ||
                      "NFT description will appear here."}
                  </p>

                  <div className="grid grid-cols-2 gap-4 mt-5 pt-5 border-t border-white/10">
                    <div>
                      <p className="text-xs text-gray-500">Price</p>
                      <p className="mt-2 break-words text-lg font-semibold">
                        {form.price || "0.00"} ETH
                      </p>
                    </div>

                    <div>
                      <p className="text-xs text-gray-500">
                        Highest Bid
                      </p>
                      <p className="mt-2 break-words text-lg font-semibold">
                        {form.highestBid || "0.00"} wETH
                      </p>
                    </div>
                  </div>

                  <div className="mt-4">
                    <span className="inline-flex px-3 py-2 text-xs font-semibold text-[#A259FF] bg-[#A259FF]/10 rounded-lg">
                      {form.category}
                    </span>
                  </div>

                  {form.collection && (
                    <p className="mt-3 text-xs text-gray-500">
                      Collection: {form.collection}
                    </p>
                  )}
                </div>
              </div>
            </aside>
          </div>
        </main>
      </div>
    );
  }

  // My NFTs listing.
  return (
    <div className="overflow-x-hidden min-h-full w-full min-w-0 text-white bg-black space-y-6">
      <section className="overflow-hidden relative p-5 bg-gradient-to-br from-[#1A1325] via-[#111114] to-[#101521] rounded-[26px] border-white/10 border sm:p-8 lg:p-10">
        <div className="absolute h-64 w-64 bg-[#A259FF]/15 rounded-full blur-[90px] pointer-events-none -right-16 -top-20" />

        <div className="relative flex flex-col justify-between gap-6 sm:flex-row items-center">
          <div>
            <p className="text-xs font-bold tracking-[0.22em] text-[#A259FF] uppercase">
              Nifty Verse
            </p>
            <h1 className="mt-3 text-3xl font-bold sm:text-4xl">
              My NFTs
            </h1>
            <p className="mt-3 max-w-xl text-sm leading-6 text-gray-400">
              Manage your created, owned, and purchased NFTs.
            </p>
          </div>

          <button
            type="button"
            onClick={openCreateForm}
            className="inline-flex items-center justify-center gap-2 px-5 py-3.5 text-sm font-bold text-white bg-gradient-to-r from-[#A259FF] to-[#5794FF] rounded-xl shrink-0 transition hover:opacity-90"
          >
            <Plus size={19} />
            Create NFT
          </button>
        </div>
      </section>

      {success && (
        <div className="px-4 py-3 text-sm text-green-300 bg-green-500/10 rounded-xl border-green-500/20 border">
          {success}
        </div>
      )}

      {error && (
        <div className="px-4 py-3 text-sm text-red-300 bg-red-500/10 rounded-xl border-red-500/20 border">
          {error}
        </div>
      )}

      <section className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        {[
          {
            label: "Created NFTs",
            value: nfts.filter((nft) => nft.status === "Created").length,
            icon: ImagePlus,
          },
          {
            label: "Owned NFTs",
            value: nfts.filter((nft) => nft.status === "Owned").length,
            icon: Layers,
          },
          {
            label: "Total NFTs",
            value: nfts.length,
            icon: ImagePlus,
          },
        ].map((item) => {
          const Icon = item.icon;

          return (
            <div
              key={item.label}
              className="p-5 bg-[#111114] rounded-2xl border-white/10 border"
            >
              <div className="flex items-center justify-between gap-3">
                <p className="text-sm text-gray-400">{item.label}</p>
                <div className="p-3 text-[#B783FF] bg-[#A259FF]/10 rounded-xl border-[#A259FF]/20 border">
                  <Icon size={20} />
                </div>
              </div>
              <p className="mt-4 text-3xl font-bold">{item.value}</p>
            </div>
          );
        })}
      </section>

      <section className="p-4 bg-[#111114] rounded-2xl border-white/10 border sm:p-6">
        <div className="flex flex-col justify-between gap-4 sm:flex-row items-center">
          <div>
            <h2 className="text-xl font-bold">Your Collection</h2>
            <p className="mt-1 text-sm text-gray-500">
              Browse your NFT items.
            </p>
          </div>

          <div className="flex flex-wrap gap-2">
            {["Created", "Owned", "Purchased", "All"].map((tab) => (
              <button
                key={tab}
                type="button"
                onClick={() => setActiveTab(tab)}
                className={`rounded-lg px-3 py-2 text-sm font-medium transition ${
                  activeTab === tab
                    ? "bg-[#A259FF] text-white"
                    : "border border-white/10 bg-[#17171B] text-gray-400 hover:text-white"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {displayedNFTs.length ? (
          <div className="grid grid-cols-1 gap-5 mt-6 sm:grid-cols-2 xl:grid-cols-3">
            {displayedNFTs.map((nft) => (
              <article
                key={nft.id}
                className="overflow-hidden bg-[#09090C] rounded-2xl border-white/10 border transition hover:border-[#A259FF]/50"
              >
                <div className="overflow-hidden relative bg-[#17171B] aspect-square">
                  <img
                    src={nft.image}
                    alt={nft.name}
                    className="object-cover h-full w-full"
                  />
                  <span className="absolute left-3 top-3 px-3 py-1.5 text-xs text-[#D5B5FF] bg-black/75 rounded-lg border-white/10 border">
                    {nft.category}
                  </span>
                  <button
                    type="button"
                    onClick={() => setSelectedNFT(nft)}
                    aria-label={`View ${nft.name}`}
                    className="absolute right-3 top-3 p-2 text-white bg-black/75 rounded-lg hover:bg-[#A259FF]"
                  >
                    <Eye size={17} />
                  </button>
                </div>

                <div className="p-4">
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <h3 className="break-words text-lg font-bold">
                        {nft.name}
                      </h3>
                      <p className="mt-1 text-xs text-gray-500">
                        By {nft.creator}
                      </p>
                    </div>
                    <p className="text-sm font-bold text-[#B783FF] shrink-0">
                      {nft.price} ETH
                    </p>
                  </div>

                  {nft.description && (
                    <p className="mt-3 text-sm leading-6 text-gray-400 line-clamp-2">
                      {nft.description}
                    </p>
                  )}

                  {nft.collection && (
                    <p className="mt-3 text-xs text-gray-500">
                      Collection: {nft.collection}
                    </p>
                  )}

                  <button
                    type="button"
                    onClick={() => handleDelete(nft.id)}
                    className="inline-flex items-center gap-2 mt-4 text-sm text-red-300 transition hover:text-red-200"
                  >
                    <Trash2 size={15} />
                    Remove NFT
                  </button>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-12 min-h-[300px] text-center">
            <div className="flex items-center justify-center h-20 w-20 text-[#B783FF] bg-[#A259FF]/10 rounded-2xl border-[#A259FF]/20 border">
              <ImagePlus size={34} />
            </div>

            <h3 className="mt-6 text-xl font-bold">
              {activeTab === "All"
                ? "No NFTs yet"
                : `No ${activeTab.toLowerCase()} NFTs yet`}
            </h3>

            <p className="mt-2 max-w-sm text-sm leading-6 text-gray-500">
              Create your first NFT to see it appear in this collection.
            </p>

            <button
              type="button"
              onClick={openCreateForm}
              className="inline-flex items-center gap-2 mt-6 px-5 py-3 text-sm font-bold bg-[#A259FF] rounded-xl transition hover:bg-[#8f45e8]"
            >
              <Plus size={18} />
              Create Your First NFT
            </button>
          </div>
        )}
      </section>

      {/* NFT details preview */}
      {selectedNFT && (
        <div className="z-[100] overflow-y-auto fixed inset-0 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="overflow-hidden my-auto w-full max-w-lg bg-[#111114] rounded-2xl border-white/10 border">
            <div className="flex items-center justify-between p-4 border-b border-white/10">
              <h2 className="text-lg font-bold">NFT Details</h2>
              <button
                type="button"
                onClick={() => setSelectedNFT(null)}
                aria-label="Close NFT details"
                className="p-2 text-gray-400 rounded-lg hover:text-white"
              >
                <X size={20} />
              </button>
            </div>

            <div className="p-5">
              <img
                src={selectedNFT.image}
                alt={selectedNFT.name}
                className="object-contain max-h-[360px] w-full bg-black rounded-xl border-white/10 border"
              />

              <h3 className="mt-5 break-words text-xl font-bold">
                {selectedNFT.name}
              </h3>
              <p className="mt-2 text-sm text-[#B783FF]">
                {selectedNFT.category}
              </p>
              <p className="mt-3 break-words text-sm leading-6 text-gray-400">
                {selectedNFT.description}
              </p>

              <div className="grid grid-cols-2 gap-4 mt-5 pt-4 border-t border-white/10">
                <div>
                  <p className="text-xs text-gray-500">Price</p>
                  <p className="mt-1 font-bold">{selectedNFT.price} ETH</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500">Highest Bid</p>
                  <p className="mt-1 font-bold">
                    {selectedNFT.highestBid} wETH
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setSelectedNFT(null)}
                className="mt-6 px-5 py-3 w-full text-sm font-bold bg-[#A259FF] rounded-xl hover:bg-[#8f45e8]"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
