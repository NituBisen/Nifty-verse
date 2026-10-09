import React, {
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

import {
  Bell,
  Check,
  Copy,
  Edit3,
  Heart,
  ImagePlus,
  LogOut,
  Plus,
  RefreshCw,
  Share2,
  ShoppingCart,
  Trash2,
  Upload,
  WalletCards,
  X,
} from "lucide-react";

import {
  useNavigate,
} from "react-router-dom";

import Navbar from "../common/Navbar";
import Footer from "../common/Footer";

import profileBg from "../assets/images/profile-bg.png";

// =====================================================
// LOCAL STORAGE HELPERS
// =====================================================

const getCurrentUser = () => {
  try {
    const savedUser =
      localStorage.getItem("user");

    if (!savedUser) {
      return null;
    }

    return JSON.parse(savedUser);
  } catch (error) {
    console.error(
      "Unable to read user:",
      error
    );

    return null;
  }
};

const getUserStorageId = (user) => {
  return (
    user?.email ||
    user?.username ||
    user?._id ||
    user?.id ||
    "guest"
  )
    .toString()
    .toLowerCase()
    .replace(
      /[^a-z0-9]/g,
      "_"
    );
};

const getStorageKey = (
  type,
  user
) => {
  return `niftyVerse_${type}_${getUserStorageId(
    user
  )}`;
};

const loadLocalData = (
  type,
  user,
  defaultValue = []
) => {
  try {
    const savedData =
      localStorage.getItem(
        getStorageKey(
          type,
          user
        )
      );

    if (!savedData) {
      return defaultValue;
    }

    return JSON.parse(
      savedData
    );
  } catch (error) {
    console.error(
      `Unable to load ${type}:`,
      error
    );

    return defaultValue;
  }
};

const saveLocalData = (
  type,
  user,
  data
) => {
  try {
    localStorage.setItem(
      getStorageKey(
        type,
        user
      ),
      JSON.stringify(data)
    );
  } catch (error) {
    console.error(
      `Unable to save ${type}:`,
      error
    );
  }
};

// =====================================================
// GENERAL HELPERS
// =====================================================

const getInitials = (
  name = "User"
) => {
  const words = name
    .trim()
    .split(" ")
    .filter(Boolean);

  if (!words.length) {
    return "U";
  }

  return words
    .slice(0, 2)
    .map(
      (word) =>
        word
          .charAt(0)
          .toUpperCase()
    )
    .join("");
};

const shortenWallet = (
  wallet = ""
) => {
  if (!wallet) {
    return "Wallet not connected";
  }

  if (wallet.length <= 18) {
    return wallet;
  }

  return `${wallet.slice(
    0,
    8
  )}...${wallet.slice(-6)}`;
};

const formatDate = (
  date
) => {
  if (!date) {
    return "";
  }

  try {
    return new Date(
      date
    ).toLocaleString();
  } catch {
    return "";
  }
};

// =====================================================
// EMPTY STATE
// =====================================================

const EmptyState = ({
  icon: Icon = ImagePlus,
  title,
  description,
  buttonText,
  onClick,
}) => {
  return (
    <div className="flex flex-col items-center justify-center px-6 py-12 min-h-[280px] text-center bg-[#151515] rounded-2xl border-white/10 border">
      <div className="flex items-center justify-center h-14 w-14 bg-[#A259FF]/10 rounded-full">
        <Icon
          size={25}
          className="text-[#A259FF]"
        />
      </div>

      <h3 className="mt-4 text-lg font-bold text-white">
        {title}
      </h3>

      <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-gray-500">
        {description}
      </p>

      {buttonText &&
        onClick && (
          <button
            type="button"
            onClick={onClick}
            className="inline-flex items-center gap-2 mt-5 px-6 py-3 text-sm font-semibold text-white bg-[#A259FF] rounded-xl transition hover:bg-[#8f45e8]"
          >
            <Plus size={17} />
            {buttonText}
          </button>
        )}
    </div>
  );
};

// =====================================================
// NFT CARD
// =====================================================

const NFTCard = ({
  nft,
  isFavorite = false,
  onFavorite,
  onDelete,
}) => {
  const [liked, setLiked] =
    useState(isFavorite);

  useEffect(() => {
    setLiked(isFavorite);
  }, [isFavorite]);

  const handleFavorite = () => {
    setLiked(
      (previous) =>
        !previous
    );

    if (onFavorite) {
      onFavorite(nft);
    }
  };

  return (
    <div className="overflow-hidden bg-[#181818] rounded-2xl border-[#2C2C2C] duration-300 group border transition hover:-translate-y-1 hover:border-[#A259FF]">

      {/* IMAGE */}

      <div className="overflow-hidden relative bg-[#101010] aspect-square">
        {nft.image ? (
          <img
            src={nft.image}
            alt={
              nft.name ||
              "NFT"
            }
            className="object-cover h-full w-full duration-500 transition group-hover:scale-105"
          />
        ) : (
          <div className="flex items-center justify-center h-full text-sm text-gray-600">
            No Image
          </div>
        )}

        {/* FAVORITE BUTTON */}

        {onFavorite && (
          <button
            type="button"
            onClick={
              handleFavorite
            }
            className="absolute right-3 top-3 flex items-center justify-center h-10 w-10 bg-black/60 rounded-full backdrop-blur-sm transition hover:bg-black/80"
          >
            <Heart
              size={19}
              className={
                liked
                  ? "fill-red-500 text-red-500"
                  : "text-white"
              }
            />
          </button>
        )}

        {/* DELETE BUTTON */}

        {onDelete && (
          <button
            type="button"
            onClick={() =>
              onDelete(nft)
            }
            className="absolute left-3 top-3 flex items-center justify-center h-10 w-10 text-white bg-red-500/80 rounded-full transition hover:bg-red-500"
          >
            <Trash2 size={17} />
          </button>
        )}
      </div>

      {/* DETAILS */}

      <div className="p-4">

        <div className="flex items-start justify-between gap-3">

          <div className="min-w-0">

            <h3 className="text-base font-semibold text-white truncate">
              {nft.name ||
                "Untitled NFT"}
            </h3>

            <div className="flex items-center gap-2 mt-2">

              <div className="flex items-center justify-center h-7 w-7 text-[10px] font-bold text-white bg-[#A259FF] rounded-full shrink-0">
                {getInitials(
                  nft.creator ||
                    "User"
                )}
              </div>

              <p className="text-sm text-gray-400 truncate">
                {nft.creator ||
                  "You"}
              </p>

            </div>

          </div>

          <div className="text-right shrink-0">

            <p className="text-xs text-gray-500">
              Price
            </p>

            <p className="mt-1 whitespace-nowrap text-sm font-semibold text-white">
              {Number(
                nft.price || 0
              ).toFixed(
                2
              )}{" "}
              ETH
            </p>

          </div>

        </div>

        {/* HIGHEST BID */}

        {nft.highestBid !==
          undefined &&
          nft.highestBid !==
            "" && (
            <div className="flex items-center justify-between mt-4 pt-3 border-t border-white/10">

              <p className="text-xs text-gray-500">
                Highest Bid
              </p>

              <p className="text-sm font-semibold text-white">
                {Number(
                  nft.highestBid
                ).toFixed(
                  2
                )}{" "}
                wETH
              </p>

            </div>
          )}

        {/* CATEGORY */}

        {nft.category && (
          <div className="mt-3">
            <span className="px-2.5 py-1 text-xs font-medium text-[#A259FF] bg-[#A259FF]/10 rounded-lg">
              {nft.category}
            </span>
          </div>
        )}

        {/* COLLECTION */}

        {nft.collection && (
          <div className="mt-3">

            <p className="text-xs text-gray-500">
              Collection
            </p>

            <p className="mt-1 text-sm text-gray-300 truncate">
              {nft.collection}
            </p>

          </div>
        )}

      </div>
    </div>
  );
};

// =====================================================
// CREATE NFT
// =====================================================

const CreateNFT = ({
  user,
  collections,
  onBack,
  onCreate,
}) => {
  const fileInputRef =
    useRef(null);

  // NO DEFAULT IMAGE
  const [image, setImage] =
    useState(null);

  // NO DUMMY DATA
  const [form, setForm] =
    useState({
      name: "",
      creator: "",
      description: "",
      price: "",
      highestBid: "",
      category: "Art",
      collection: "",
    });

  const [error, setError] =
    useState("");

  // ===================================================
  // INPUT CHANGE
  // ===================================================

  const handleChange = (
    event
  ) => {
    const {
      name,
      value,
    } = event.target;

    setForm(
      (previous) => ({
        ...previous,
        [name]: value,
      })
    );

    setError("");
  };

  // ===================================================
  // IMAGE UPLOAD
  // ===================================================

  const handleImageChange =
    (event) => {
      const file =
        event.target.files?.[0];

      if (!file) {
        return;
      }

      if (
        !file.type.startsWith(
          "image/"
        )
      ) {
        setError(
          "Please select a valid image."
        );

        return;
      }

      const reader =
        new FileReader();

      reader.onload = () => {
        setImage(
          reader.result
        );
      };

      reader.readAsDataURL(
        file
      );

      setError("");
    };

  // ===================================================
  // REMOVE IMAGE
  // ===================================================

  const removeImage = () => {
    setImage(null);

    if (fileInputRef.current) {
      fileInputRef.current.value =
        "";
    }
  };

  // ===================================================
  // CREATE NFT
  // ===================================================

  const handleSubmit = (
    event
  ) => {
    event.preventDefault();

    // IMAGE
    if (!image) {
      setError(
        "Please upload an NFT image."
      );

      return;
    }

    // NAME
    if (!form.name.trim()) {
      setError(
        "Please enter NFT name."
      );

      return;
    }

    // CREATOR
    if (
      !form.creator.trim()
    ) {
      setError(
        "Please enter creator name."
      );

      return;
    }

    // DESCRIPTION
    if (
      !form.description.trim()
    ) {
      setError(
        "Please enter NFT description."
      );

      return;
    }

    // PRICE
    if (
      !form.price ||
      Number(form.price) <= 0
    ) {
      setError(
        "Please enter a valid price."
      );

      return;
    }

    // HIGHEST BID
    if (
      !form.highestBid ||
      Number(form.highestBid) < 0
    ) {
      setError(
        "Please enter a valid highest bid."
      );

      return;
    }

    // =================================================
    // CREATE ONLY HERE
    // =================================================

    const newNFT = {
      id: Date.now(),

      name:
        form.name.trim(),

      creator:
        form.creator.trim(),

      description:
        form.description.trim(),

      image:

        image,

      price:
        Number(
          form.price
        ).toFixed(2),

      highestBid:
        Number(
          form.highestBid
        ).toFixed(2),

      category:
        form.category,

      collection:
        form.collection,

      owner:
        user?.name ||
        user?.fullName ||
        user?.username ||
        "You",

      createdAt:
        new Date().toISOString(),
    };

    onCreate(newNFT);
  };

  const inputClass =
    "mt-2 w-full rounded-xl border border-white/10 bg-[#101010] px-4 py-3 text-sm text-white outline-none placeholder:text-gray-600 focus:border-[#A259FF]";

  return (
    <div className="overflow-x-hidden min-h-screen text-white bg-black">

      <Navbar />

      <main className="mx-auto px-4 pb-20 pt-10 w-full max-w-[1200px] sm:px-8 lg:px-10">

        {/* BACK */}

        <button
          type="button"
          onClick={onBack}
          className="mb-8 text-sm font-semibold text-gray-400 transition hover:text-white"
        >
          ← Back to Profile
        </button>

        {/* HEADING */}

        <div className="mb-10">

          <h1 className="text-3xl font-bold sm:text-4xl">
            Create{" "}
            <span className="text-[#A259FF]">
              NFT
            </span>
          </h1>

          <p className="mt-2 text-sm text-gray-500">
            Create your own NFT
            by entering the
            details below.
          </p>

        </div>

        <div className="grid gap-8 lg:grid-cols-[1fr_380px]">

          {/* =================================================
              CREATE FORM
          ================================================= */}

          <form
            onSubmit={
              handleSubmit
            }
            className="p-5 bg-[#151515] rounded-2xl border-white/10 border sm:p-8"
          >

            {/* ERROR */}

            {error && (
              <div className="mb-6 px-4 py-3 text-sm text-red-300 bg-red-500/10 rounded-xl border-red-500/20 border">
                {error}
              </div>
            )}

            {/* IMAGE */}

            <label className="text-sm font-semibold text-white">
              NFT Image
            </label>

            <input
              ref={fileInputRef}
              type="file"
              accept="image/png,image/jpeg,image/jpg,image/webp"
              onChange={
                handleImageChange
              }
              className="hidden"
            />

            {!image ? (
              <button
                type="button"
                onClick={() =>
                  fileInputRef.current?.click()
                }
                className="flex flex-col items-center justify-center mt-3 min-h-[280px] w-full bg-[#101010] rounded-2xl border-dashed border-white/20 border transition hover:border-[#A259FF]"
              >

                <div className="flex items-center justify-center h-16 w-16 bg-[#A259FF]/10 rounded-full">

                  <Upload
                    size={28}
                    className="text-[#A259FF]"
                  />

                </div>

                <p className="mt-5 text-sm font-semibold text-white">
                  Upload NFT Image
                </p>

                <p className="mt-2 text-xs text-gray-600">
                  PNG, JPG, JPEG or
                  WEBP
                </p>

              </button>
            ) : (
              <div className="overflow-hidden relative mt-3 rounded-2xl border-white/10 border">

                <img
                  src={image}
                  alt="NFT preview"
                  className="object-cover w-full aspect-square"
                />

                {/* REMOVE */}

                <button
                  type="button"
                  onClick={
                    removeImage
                  }
                  className="absolute right-3 top-3 flex items-center justify-center h-10 w-10 text-white bg-black/70 rounded-full transition hover:bg-red-500"
                >
                  <X size={18} />
                </button>

                {/* CHANGE */}

                <button
                  type="button"
                  onClick={() =>
                    fileInputRef.current?.click()
                  }
                  className="absolute bottom-3 left-3 flex items-center gap-2 px-3 py-2 text-xs font-semibold text-white bg-black/70 rounded-lg backdrop-blur-sm"
                >
                  <Upload size={14} />
                  Change Image
                </button>

              </div>
            )}

            {/* NAME */}

            <div className="mt-6">

              <label className="text-sm font-semibold">
                NFT Name
              </label>

              <input
                type="text"
                name="name"
                value={
                  form.name
                }
                onChange={
                  handleChange
                }
                placeholder="Enter NFT name"
                className={
                  inputClass
                }
              />

            </div>

            {/* CREATOR */}

            <div className="mt-6">

              <label className="text-sm font-semibold">
                Creator
              </label>

              <input
                type="text"
                name="creator"
                value={
                  form.creator
                }
                onChange={
                  handleChange
                }
                placeholder="Enter creator name"
                className={
                  inputClass
                }
              />

            </div>

            {/* DESCRIPTION */}

            <div className="mt-6">

              <label className="text-sm font-semibold">
                Description
              </label>

              <textarea
                name="description"
                value={
                  form.description
                }
                onChange={
                  handleChange
                }
                rows={5}
                placeholder="Describe your NFT"
                className={`${inputClass} resize-none`}
              />

            </div>

            {/* PRICE + HIGHEST BID */}

            <div className="grid gap-5 mt-6 sm:grid-cols-2">

              {/* PRICE */}

              <div>

                <label className="text-sm font-semibold">
                  Price
                </label>

                <div className="relative">

                  <input
                    type="number"
                    name="price"
                    min="0"
                    step="0.01"
                    value={
                      form.price
                    }
                    onChange={
                      handleChange
                    }
                    placeholder="0.00"
                    className={`${inputClass} pr-16`}
                  />

                  <span className="absolute right-4 top-1/2 text-xs font-semibold text-gray-500 -translate-y-1/2">
                    ETH
                  </span>

                </div>

              </div>

              {/* HIGHEST BID */}

              <div>

                <label className="text-sm font-semibold">
                  Highest Bid
                </label>

                <div className="relative">

                  <input
                    type="number"
                    name="highestBid"
                    min="0"
                    step="0.01"
                    value={
                      form.highestBid
                    }
                    onChange={
                      handleChange
                    }
                    placeholder="0.00"
                    className={`${inputClass} pr-20`}
                  />

                  <span className="absolute right-4 top-1/2 text-xs font-semibold text-gray-500 -translate-y-1/2">
                    wETH
                  </span>

                </div>

              </div>

            </div>

            {/* CATEGORY */}

            <div className="mt-6">

              <label className="text-sm font-semibold">
                Category
              </label>

              <select
                name="category"
                value={
                  form.category
                }
                onChange={
                  handleChange
                }
                className={
                  inputClass
                }
              >

                <option value="Art">
                  Art
                </option>

                <option value="Collectibles">
                  Collectibles
                </option>

                <option value="Photography">
                  Photography
                </option>

                <option value="Music">
                  Music
                </option>

                <option value="Sports">
                  Sports
                </option>

                <option value="Virtual Worlds">
                  Virtual Worlds
                </option>

              </select>

            </div>

            {/* COLLECTION */}

            <div className="mt-6">

              <label className="text-sm font-semibold">
                Collection
              </label>

              <select
                name="collection"
                value={
                  form.collection
                }
                onChange={
                  handleChange
                }
                className={
                  inputClass
                }
              >

                <option value="">
                  No Collection
                </option>

                {collections.map(
                  (
                    collection
                  ) => (
                    <option
                      key={
                        collection.id
                      }
                      value={
                        collection.name
                      }
                    >
                      {
                        collection.name
                      }
                    </option>
                  )
                )}

              </select>

            </div>

            {/* CREATE */}

            <button
              type="submit"
              className="flex items-center justify-center gap-2 mt-8 px-5 py-4 w-full text-sm font-bold text-white bg-[#A259FF] rounded-xl transition hover:bg-[#8f45e8]"
            >

              <Plus size={18} />

              Create NFT

            </button>

          </form>

          {/* =================================================
              PREVIEW
          ================================================= */}

          <div className="p-5 h-fit bg-[#151515] rounded-2xl border-white/10 border lg:sticky top-24">

            <p className="text-sm font-semibold text-gray-400">
              NFT Preview
            </p>

            <div className="overflow-hidden mt-4 bg-[#101010] rounded-2xl border-white/10 border">

              {/* IMAGE */}

              {image ? (
                <img
                  src={image}
                  alt="NFT Preview"
                  className="object-cover w-full aspect-square"
                />
              ) : (
                <div className="flex flex-col items-center justify-center aspect-square">

                  <ImagePlus
                    size={45}
                    className="text-gray-700"
                  />

                  <p className="mt-4 text-sm text-gray-600">
                    NFT preview
                    will appear
                    here
                  </p>

                </div>
              )}

              {/* DETAILS */}

              <div className="p-5">

                <h2 className="text-xl font-bold text-white truncate">
                  {form.name ||
                    "NFT Name"}
                </h2>

                {/* CREATOR */}

                <div className="flex items-center gap-3 mt-3">

                  <div className="flex items-center justify-center h-9 w-9 text-xs font-bold text-white bg-[#A259FF] rounded-full shrink-0">
                    {form.creator
                      ? getInitials(
                          form.creator
                        )
                      : "?"}
                  </div>

                  <div>

                    <p className="text-xs text-gray-500">
                      Creator
                    </p>

                    <p className="text-sm font-semibold text-white">
                      {form.creator ||
                        "Creator Name"}
                    </p>

                  </div>

                </div>

                {/* DESCRIPTION */}

                <p className="mt-5 text-sm leading-6 text-gray-500 line-clamp-3">
                  {form.description ||
                    "NFT description will appear here."}
                </p>

                {/* PRICE */}

                <div className="grid grid-cols-2 gap-4 mt-5 pt-5 border-t border-white/10">

                  <div>

                    <p className="text-xs text-gray-500">
                      Price
                    </p>

                    <p className="mt-2 text-lg font-semibold text-white">
                      {form.price ||
                        "0.00"}{" "}
                      ETH
                    </p>

                  </div>

                  <div>

                    <p className="text-xs text-gray-500">
                      Highest Bid
                    </p>

                    <p className="mt-2 text-lg font-semibold text-white">
                      {form.highestBid ||
                        "0.00"}{" "}
                      wETH
                    </p>

                  </div>

                </div>

                {/* CATEGORY */}

                <div className="mt-4">

                  <span className="inline-flex px-3 py-2 text-xs font-semibold text-[#A259FF] bg-[#A259FF]/10 rounded-lg">
                    {
                      form.category
                    }
                  </span>

                </div>

              </div>

            </div>

          </div>

        </div>

      </main>

      <Footer />

    </div>
  );
};

// =====================================================
// USER PROFILE
// =====================================================

const UserProfile = () => {
  const navigate =
    useNavigate();

  const [user, setUser] =
    useState(null);

  const [activeTab, setActiveTab] =
    useState("Owned");

  const [createdNFTs, setCreatedNFTs] =
    useState([]);

  const [ownedNFTs, setOwnedNFTs] =
    useState([]);

  const [collections, setCollections] =
    useState([]);

  const [favorites, setFavorites] =
    useState([]);

  const [activities, setActivities] =
    useState([]);

  const [notifications, setNotifications] =
    useState([]);

  const [showCreateNFT, setShowCreateNFT] =
    useState(false);

  const [loading, setLoading] =
    useState(true);

  // ===================================================
  // LOAD DATA
  // ===================================================

  const loadData = () => {
    const currentUser =
      getCurrentUser();

    if (!currentUser) {
      navigate(
        "/signin",
        {
          replace: true,
        }
      );

      return;
    }

    setUser(currentUser);

    setCreatedNFTs(
      loadLocalData(
        "createdNFTs",
        currentUser,
        []
      )
    );

    setOwnedNFTs(
      loadLocalData(
        "ownedNFTs",
        currentUser,
        []
      )
    );

    setCollections(
      loadLocalData(
        "collections",
        currentUser,
        []
      )
    );

    setFavorites(
      loadLocalData(
        "favorites",
        currentUser,
        []
      )
    );

    setActivities(
      loadLocalData(
        "activities",
        currentUser,
        []
      )
    );

    setNotifications(
      loadLocalData(
        "notifications",
        currentUser,
        []
      )
    );

    setLoading(false);
  };

  // ===================================================
  // INITIAL LOAD
  // ===================================================

  useEffect(() => {
    const token =
      localStorage.getItem(
        "token"
      );

    const savedUser =
      localStorage.getItem(
        "user"
      );

    if (
      !token ||
      !savedUser
    ) {
      navigate(
        "/signin",
        {
          replace: true,
        }
      );

      return;
    }

    loadData();
  }, []);

  // ===================================================
  // SAVE CREATED NFTS
  // ===================================================

  useEffect(() => {
    if (!user) return;

    saveLocalData(
      "createdNFTs",
      user,
      createdNFTs
    );
  }, [
    createdNFTs,
    user,
  ]);

  // ===================================================
  // SAVE OWNED NFTS
  // ===================================================

  useEffect(() => {
    if (!user) return;

    saveLocalData(
      "ownedNFTs",
      user,
      ownedNFTs
    );
  }, [
    ownedNFTs,
    user,
  ]);

  // ===================================================
  // SAVE COLLECTIONS
  // ===================================================

  useEffect(() => {
    if (!user) return;

    saveLocalData(
      "collections",
      user,
      collections
    );
  }, [
    collections,
    user,
  ]);

  // ===================================================
  // SAVE FAVORITES
  // ===================================================

  useEffect(() => {
    if (!user) return;

    saveLocalData(
      "favorites",
      user,
      favorites
    );
  }, [
    favorites,
    user,
  ]);

  // ===================================================
  // SAVE ACTIVITIES
  // ===================================================

  useEffect(() => {
    if (!user) return;

    saveLocalData(
      "activities",
      user,
      activities
    );
  }, [
    activities,
    user,
  ]);

  // ===================================================
  // SAVE NOTIFICATIONS
  // ===================================================

  useEffect(() => {
    if (!user) return;

    saveLocalData(
      "notifications",
      user,
      notifications
    );
  }, [
    notifications,
    user,
  ]);

  // ===================================================
  // USER INFORMATION
  // ===================================================

  const userName =
    user?.name ||
    user?.fullName ||
    user?.username ||
    "User";

  const username =
    user?.username
      ? `@${String(
          user.username
        ).replace(
          /^@/,
          ""
        )}`
      : "";

  const email =
    user?.email || "";

  const walletAddress =
    user?.walletAddress ||
    user?.wallet ||
    "";

  const profileImage =
    user?.profileImage ||
    user?.avatar ||
    user?.image ||
    "";

  const bio =
    user?.bio || "";

  const userInitials =
    getInitials(
      userName
    );

  // ===================================================
  // TABS
  // ===================================================

  const tabs = useMemo(
    () => [
      {
        key: "Owned",
        label:
          "Owned / Purchased",
        count:
          ownedNFTs.length,
      },

      {
        key: "Created",
        label:
          "Created NFTs",
        count:
          createdNFTs.length,
      },

      {
        key: "Collections",
        label:
          "Collections",
        count:
          collections.length,
      },

      {
        key: "Favorites",
        label:
          "Favorites",
        count:
          favorites.length,
      },

      {
        key: "Activity",
        label:
          "Activity",
        count:
          activities.length,
      },

      {
        key: "Notifications",
        label:
          "Notifications",
        count:
          notifications.filter(
            (item) =>
              !item.read
          ).length,
      },
    ],
    [
      ownedNFTs,
      createdNFTs,
      collections,
      favorites,
      activities,
      notifications,
    ]
  );

  // ===================================================
  // CREATE NFT
  // ===================================================

  const handleCreateNFT = (
    newNFT
  ) => {
    // CREATED
    setCreatedNFTs(
      (previous) => [
        newNFT,
        ...previous,
      ]
    );

    // OWNED
    setOwnedNFTs(
      (previous) => [
        newNFT,
        ...previous,
      ]
    );

    // ACTIVITY
    setActivities(
      (previous) => [
        {
          id: Date.now(),

          type:
            "NFT Created",

          title:
            newNFT.name,

          price:
            newNFT.price,

          createdAt:
            new Date().toISOString(),
        },

        ...previous,
      ]
    );

    // NOTIFICATION
    setNotifications(
      (previous) => [
        {
          id:
            Date.now() + 1,

          type:
            "created",

          title:
            "NFT Created",

          message: `Your NFT "${newNFT.name}" was created successfully.`,

          read: false,

          createdAt:
            new Date().toISOString(),
        },

        ...previous,
      ]
    );

    // CLOSE CREATE PAGE
    setShowCreateNFT(
      false
    );

    // OPEN CREATED TAB
    setActiveTab(
      "Created"
    );
  };

  // ===================================================
  // FAVORITE
  // ===================================================

  const handleFavorite = (
    nft
  ) => {
    const alreadyFavorite =
      favorites.some(
        (item) =>
          item.id === nft.id
      );

    if (
      alreadyFavorite
    ) {
      setFavorites(
        (previous) =>
          previous.filter(
            (item) =>
              item.id !==
              nft.id
          )
      );

      return;
    }

    setFavorites(
      (previous) => [
        nft,
        ...previous,
      ]
    );

    setActivities(
      (previous) => [
        {
          id: Date.now(),

          type:
            "Favorite",

          title:
            nft.name,

          price:
            nft.price,

          createdAt:
            new Date().toISOString(),
        },

        ...previous,
      ]
    );
  };

  // ===================================================
  // DELETE NFT
  // ===================================================

  const handleDeleteNFT = (
    nft
  ) => {
    const confirmed =
      window.confirm(
        `Are you sure you want to delete "${nft.name}"?`
      );

    if (!confirmed) {
      return;
    }

    setCreatedNFTs(
      (previous) =>
        previous.filter(
          (item) =>
            item.id !==
            nft.id
        )
    );

    setOwnedNFTs(
      (previous) =>
        previous.filter(
          (item) =>
            item.id !==
            nft.id
        )
    );

    setFavorites(
      (previous) =>
        previous.filter(
          (item) =>
            item.id !==
            nft.id
        )
    );
  };

  // ===================================================
  // COPY WALLET
  // ===================================================

  const copyWallet =
    async () => {
      if (!walletAddress) {
        alert(
          "Wallet is not connected."
        );

        return;
      }

      try {
        await navigator.clipboard.writeText(
          walletAddress
        );

        alert(
          "Wallet address copied!"
        );
      } catch {
        alert(
          "Unable to copy wallet address."
        );
      }
    };

  // ===================================================
  // SHARE
  // ===================================================

  const shareProfile =
    async () => {
      try {
        if (
          navigator.share
        ) {
          await navigator.share(
            {
              title: `${userName} - NFT Marketplace`,
              text: "Check out my NFT profile.",
              url: window.location
                .href,
            }
          );
        } else {
          await navigator.clipboard.writeText(
            window.location
              .href
          );

          alert(
            "Profile link copied!"
          );
        }
      } catch {
        // User cancelled share
      }
    };

  // ===================================================
  // LOGOUT
  // ===================================================

  const handleLogout =
    () => {
      localStorage.removeItem(
        "token"
      );

      localStorage.removeItem(
        "user"
      );

      navigate(
        "/signin",
        {
          replace: true,
        }
      );
    };

  // ===================================================
  // NOTIFICATIONS
  // ===================================================

  const markNotificationRead =
    (id) => {
      setNotifications(
        (previous) =>
          previous.map(
            (
              notification
            ) =>
              notification.id ===
              id
                ? {
                    ...notification,
                    read: true,
                  }
                : notification
          )
      );
    };

  const markAllNotificationsRead =
    () => {
      setNotifications(
        (previous) =>
          previous.map(
            (
              notification
            ) => ({
              ...notification,
              read: true,
            })
          )
      );
    };

  const clearNotifications =
    () => {
      if (
        !window.confirm(
          "Clear all notifications?"
        )
      ) {
        return;
      }

      setNotifications([]);
    };

  // ===================================================
  // CLEAR ACTIVITY
  // ===================================================

  const clearActivity =
    () => {
      if (
        !window.confirm(
          "Clear all activity?"
        )
      ) {
        return;
      }

      setActivities([]);
    };

  // ===================================================
  // REFRESH
  // ===================================================

  const refreshData =
    () => {
      setLoading(true);

      setTimeout(() => {
        loadData();
      }, 300);
    };

  // ===================================================
  // CREATE NFT PAGE
  // ===================================================

  if (showCreateNFT) {
    return (
      <CreateNFT
        user={user}
        collections={
          collections
        }
        onBack={() =>
          setShowCreateNFT(
            false
          )
        }
        onCreate={
          handleCreateNFT
        }
      />
    );
  }

  // ===================================================
  // LOADING
  // ===================================================

  if (loading) {
    return (
      <div className="min-h-screen text-white bg-black">

        <Navbar />

        <div className="flex items-center justify-center min-h-[70vh]">

          <div className="flex items-center gap-3 text-gray-400">

            <RefreshCw
              size={20}
              className="animate-spin"
            />

            Loading profile...

          </div>

        </div>

        <Footer />

      </div>
    );
  }

  // ===================================================
  // PROFILE
  // ===================================================

  return (
    <div className="overflow-x-hidden min-h-screen text-white bg-black">

      <Navbar />

      {/* =================================================
          PROFILE COVER
      ================================================= */}

      <section className="overflow-hidden relative h-[220px] w-full sm:h-[280px] lg:h-[350px]">

        <img
          src={profileBg}
          alt="Profile background"
          className="object-cover object-center absolute inset-0 h-full w-full"
        />

        <div className="absolute inset-0 bg-black/40" />

        <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-transparent to-[#A259FF]/20" />

      </section>

      <main className="mx-auto px-4 w-full max-w-[1200px] sm:px-8 lg:px-10">

        {/* =================================================
            PROFILE INFORMATION
        ================================================= */}

        <section className="relative pb-8 -mt-16 sm:-mt-20">

          <div className="flex flex-col gap-7 lg:flex-row items-end justify-between">

            {/* USER */}

            <div className="flex flex-col items-center gap-5 sm:flex-row items-end">

              {/* AVATAR */}

              <div className="overflow-hidden flex items-center justify-center h-28 w-28 text-3xl font-bold text-white bg-[#A259FF] rounded-full border-4 border-black shrink-0 sm:h-36 w-36">

                {profileImage ? (
                  <img
                    src={
                      profileImage
                    }
                    alt={
                      userName
                    }
                    className="object-cover h-full w-full"
                  />
                ) : (
                  userInitials
                )}

              </div>

              {/* NAME */}

              <div className="text-center sm:pb-2 text-left">

                <h1 className="text-3xl font-bold sm:text-4xl">
                  {userName}
                </h1>

                {username && (
                  <p className="mt-1 text-sm text-gray-500">
                    {
                      username
                    }
                  </p>
                )}

                {email && (
                  <p className="mt-1 text-sm text-gray-500">
                    {email}
                  </p>
                )}

              </div>

            </div>

            {/* ACTION BUTTONS */}

            <div className="flex flex-wrap justify-center gap-3 lg:justify-end">

              {/* CREATE NFT */}

              <button
                type="button"
                onClick={() =>
                  setShowCreateNFT(
                    true
                  )
                }
                className="inline-flex items-center gap-2 px-5 py-3 text-sm font-bold text-white bg-[#A259FF] rounded-xl transition hover:bg-[#8f45e8]"
              >
                <Plus size={18} />
                Create NFT
              </button>

              {/* EDIT PROFILE */}

              <button
                type="button"
                onClick={() =>
                  navigate(
                    "/edit-profile"
                  )
                }
                className="inline-flex items-center gap-2 px-4 py-3 text-sm font-semibold bg-[#151515] rounded-xl border-white/10 border transition hover:border-[#A259FF]"
              >
                <Edit3 size={17} />
                Edit Profile
              </button>

              {/* SHARE */}

              <button
                type="button"
                onClick={
                  shareProfile
                }
                className="inline-flex items-center gap-2 px-4 py-3 text-sm font-semibold bg-[#151515] rounded-xl border-white/10 border transition hover:border-[#A259FF]"
              >
                <Share2 size={17} />
                Share
              </button>

              {/* LOGOUT */}

              <button
                type="button"
                onClick={
                  handleLogout
                }
                className="inline-flex items-center gap-2 px-4 py-3 text-sm font-semibold text-red-300 bg-red-500/10 rounded-xl border-red-500/20 border transition hover:bg-red-500/20"
              >
                <LogOut size={17} />
                Logout
              </button>

            </div>

          </div>

          {/* BIO */}

          {bio && (
            <p className="mx-auto mt-6 max-w-2xl text-center text-sm leading-7 text-gray-400 sm:mx-0 text-left">
              {bio}
            </p>
          )}

          {/* WALLET */}

          <div className="flex flex-wrap justify-center gap-3 mt-6 sm:justify-start">

            <button
              type="button"
              onClick={
                copyWallet
              }
              className="inline-flex items-center gap-2 px-4 py-3 max-w-full text-sm text-gray-300 bg-[#151515] rounded-xl border-white/10 border transition hover:border-[#A259FF]"
            >

              <WalletCards
                size={17}
                className="text-[#A259FF] shrink-0"
              />

              <span className="truncate">
                {shortenWallet(
                  walletAddress
                )}
              </span>

              {walletAddress && (
                <Copy
                  size={15}
                />
              )}

            </button>

          </div>

        </section>

        {/* =================================================
            STATS
        ================================================= */}

        <section className="grid grid-cols-2 gap-3 py-5 border-y border-white/10 sm:grid-cols-4">

          <div className="p-4 text-center bg-[#151515] rounded-xl">

            <p className="text-2xl font-bold">
              {
                createdNFTs.length
              }
            </p>

            <p className="mt-1 text-xs text-gray-500">
              Created
            </p>

          </div>

          <div className="p-4 text-center bg-[#151515] rounded-xl">

            <p className="text-2xl font-bold">
              {
                ownedNFTs.length
              }
            </p>

            <p className="mt-1 text-xs text-gray-500">
              Owned
            </p>

          </div>

          <div className="p-4 text-center bg-[#151515] rounded-xl">

            <p className="text-2xl font-bold">
              {
                collections.length
              }
            </p>

            <p className="mt-1 text-xs text-gray-500">
              Collections
            </p>

          </div>

          <div className="p-4 text-center bg-[#151515] rounded-xl">

            <p className="text-2xl font-bold">
              {
                favorites.length
              }
            </p>

            <p className="mt-1 text-xs text-gray-500">
              Favorites
            </p>

          </div>

        </section>

        {/* =================================================
            TABS
        ================================================= */}

        <section className="py-5 border-b border-white/10">

          <div className="overflow-x-auto flex gap-2 pb-1">

            {tabs.map(
              (tab) => (
                <button
                  key={
                    tab.key
                  }
                  type="button"
                  onClick={() =>
                    setActiveTab(
                      tab.key
                    )
                  }
                  className={`shrink-0 rounded-xl px-4 py-3 text-sm font-semibold transition ${
                    activeTab ===
                    tab.key
                      ? "bg-[#A259FF] text-white"
                      : "bg-[#151515] text-gray-400 hover:text-white"
                  }`}
                >

                  {
                    tab.label
                  }

                  <span className="ml-2 opacity-70">
                    {
                      tab.count
                    }
                  </span>

                </button>
              )
            )}

          </div>

        </section>

        {/* =================================================
            CONTENT
        ================================================= */}

        <section className="py-10">

          {/* HEADER */}

          <div className="flex flex-col gap-4 mb-6 sm:flex-row items-center justify-between">

            <div>

              <h2 className="text-2xl font-bold">
                {
                  tabs.find(
                    (
                      tab
                    ) =>
                      tab.key ===
                      activeTab
                  )
                    ?.label
                }
              </h2>

              <p className="mt-1 text-sm text-gray-500">
                Your NFT profile
                information
              </p>

            </div>

            <div className="flex gap-3">

              {/* CREATE NFT */}

              <button
                type="button"
                onClick={() =>
                  setShowCreateNFT(
                    true
                  )
                }
                className="inline-flex items-center gap-2 px-5 py-3 text-sm font-bold text-white bg-[#A259FF] rounded-xl transition hover:bg-[#8f45e8]"
              >

                <Plus size={18} />

                Create NFT

              </button>

              {/* REFRESH */}

              <button
                type="button"
                onClick={
                  refreshData
                }
                className="hidden items-center gap-2 px-4 py-3 text-sm text-gray-400 rounded-xl border-white/10 border transition hover:border-[#A259FF] hover:text-white sm:inline-flex"
              >

                <RefreshCw
                  size={16}
                />

                Refresh

              </button>

            </div>

          </div>

          {/* =================================================
              OWNED
          ================================================= */}

          {activeTab ===
            "Owned" && (
            <>
              {ownedNFTs.length ===
              0 ? (
                <EmptyState
                  icon={
                    ShoppingCart
                  }
                  title="No Owned NFTs"
                  description="NFTs purchased or owned by this account will appear here."
                />
              ) : (
                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">

                  {ownedNFTs.map(
                    (nft) => (
                      <NFTCard
                        key={
                          nft.id
                        }
                        nft={nft}
                        isFavorite={favorites.some(
                          (
                            item
                          ) =>
                            item.id ===
                            nft.id
                        )}
                        onFavorite={
                          handleFavorite
                        }
                      />
                    )
                  )}

                </div>
              )}
            </>
          )}

          {/* =================================================
              CREATED
          ================================================= */}

          {activeTab ===
            "Created" && (
            <>
              {createdNFTs.length ===
              0 ? (
                <EmptyState
                  icon={
                    ImagePlus
                  }
                  title="No Created NFTs"
                  description="You haven't created any NFTs yet. Create your first NFT using the button below."
                  buttonText="Create NFT"
                  onClick={() =>
                    setShowCreateNFT(
                      true
                    )
                  }
                />
              ) : (
                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">

                  {createdNFTs.map(
                    (nft) => (
                      <NFTCard
                        key={
                          nft.id
                        }
                        nft={nft}
                        isFavorite={favorites.some(
                          (
                            item
                          ) =>
                            item.id ===
                            nft.id
                        )}
                        onFavorite={
                          handleFavorite
                        }
                        onDelete={
                          handleDeleteNFT
                        }
                      />
                    )
                  )}

                </div>
              )}
            </>
          )}

          {/* =================================================
              COLLECTIONS
          ================================================= */}

          {activeTab ===
            "Collections" && (
            <>
              {collections.length ===
              0 ? (
                <EmptyState
                  icon={
                    ImagePlus
                  }
                  title="No Collections"
                  description="You haven't created any collections yet."
                />
              ) : (
                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">

                  {collections.map(
                    (
                      collection
                    ) => (
                      <div
                        key={
                          collection.id
                        }
                        className="overflow-hidden bg-[#151515] rounded-2xl border-white/10 border"
                      >

                        <div className="overflow-hidden bg-[#101010] aspect-video">

                          {collection.image ? (
                            <img
                              src={
                                collection.image
                              }
                              alt={
                                collection.name
                              }
                              className="object-cover h-full w-full"
                            />
                          ) : (
                            <div className="flex items-center justify-center h-full text-gray-600">
                              No Image
                            </div>
                          )}

                        </div>

                        <div className="p-5">

                          <h3 className="font-semibold text-white">
                            {
                              collection.name
                            }
                          </h3>

                          <p className="mt-2 text-sm text-gray-500">
                            {
                              collection.description
                            }
                          </p>

                        </div>

                      </div>
                    )
                  )}

                </div>
              )}
            </>
          )}

          {/* =================================================
              FAVORITES
          ================================================= */}

          {activeTab ===
            "Favorites" && (
            <>
              {favorites.length ===
              0 ? (
                <EmptyState
                  icon={
                    Heart
                  }
                  title="No Favorite NFTs"
                  description="NFTs that you favorite will appear here."
                />
              ) : (
                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">

                  {favorites.map(
                    (nft) => (
                      <NFTCard
                        key={
                          nft.id
                        }
                        nft={nft}
                        isFavorite
                        onFavorite={
                          handleFavorite
                        }
                      />
                    )
                  )}

                </div>
              )}
            </>
          )}

          {/* =================================================
              ACTIVITY
          ================================================= */}

          {activeTab ===
            "Activity" && (
            <>
              {activities.length ===
              0 ? (
                <EmptyState
                  icon={
                    RefreshCw
                  }
                  title="No Activity"
                  description="Your NFT activity will appear here."
                />
              ) : (
                <div>

                  <div className="flex justify-end mb-5">

                    <button
                      type="button"
                      onClick={
                        clearActivity
                      }
                      className="text-sm font-semibold text-red-400 hover:text-red-300"
                    >
                      Clear Activity
                    </button>

                  </div>

                  <div className="overflow-hidden bg-[#151515] rounded-2xl border-white/10 border">

                    {activities.map(
                      (
                        activity,
                        index
                      ) => (
                        <div
                          key={
                            activity.id ||
                            index
                          }
                          className={`flex flex-col gap-3 p-5 sm:flex-row sm:items-center sm:justify-between ${
                            index !==
                            activities.length -
                              1
                              ? "border-b border-white/10"
                              : ""
                          }`}
                        >

                          <div className="flex items-center gap-4 min-w-0">

                            <div className="flex items-center justify-center h-11 w-11 bg-[#A259FF]/10 rounded-full shrink-0">

                              {activity.type
                                ?.toLowerCase()
                                .includes(
                                  "favorite"
                                ) ? (
                                <Heart
                                  size={
                                    18
                                  }
                                  className="text-[#A259FF]"
                                />
                              ) : (
                                <ImagePlus
                                  size={
                                    18
                                  }
                                  className="text-[#A259FF]"
                                />
                              )}

                            </div>

                            <div className="min-w-0">

                              <p className="font-semibold text-white">
                                {
                                  activity.type
                                }
                              </p>

                              <p className="mt-1 text-sm text-gray-500 truncate">
                                {
                                  activity.title
                                }
                              </p>

                            </div>

                          </div>

                          <div className="text-left sm:text-right">

                            {activity.price && (
                              <p className="text-sm font-semibold text-white">
                                {
                                  activity.price
                                }{" "}
                                ETH
                              </p>
                            )}

                            <p className="mt-1 text-xs text-gray-600">
                              {formatDate(
                                activity.createdAt
                              )}
                            </p>

                          </div>

                        </div>
                      )
                    )}

                  </div>

                </div>
              )}
            </>
          )}

          {/* =================================================
              NOTIFICATIONS
          ================================================= */}

          {activeTab ===
            "Notifications" && (
            <>
              {notifications.length ===
              0 ? (
                <EmptyState
                  icon={
                    Bell
                  }
                  title="No Notifications"
                  description="Your notifications will appear here."
                />
              ) : (
                <div>

                  <div className="flex flex-wrap justify-end gap-4 mb-5">

                    <button
                      type="button"
                      onClick={
                        markAllNotificationsRead
                      }
                      className="inline-flex items-center gap-2 text-sm font-semibold text-[#A259FF]"
                    >

                      <Check
                        size={16}
                      />

                      Mark all as read

                    </button>

                    <button
                      type="button"
                      onClick={
                        clearNotifications
                      }
                      className="inline-flex items-center gap-2 text-sm font-semibold text-red-400"
                    >

                      <Trash2
                        size={16}
                      />

                      Clear

                    </button>

                  </div>

                  <div className="space-y-3">

                    {notifications.map(
                      (
                        notification
                      ) => (
                        <div
                          key={
                            notification.id
                          }
                          className={`rounded-2xl border p-5 ${
                            notification.read
                              ? "border-white/10 bg-[#151515]"
                              : "border-[#A259FF]/30 bg-[#A259FF]/5"
                          }`}
                        >

                          <div className="flex items-start gap-4">

                            <div className="flex items-center justify-center h-11 w-11 bg-[#A259FF]/10 rounded-full shrink-0">

                              <Bell
                                size={
                                  19
                                }
                                className="text-[#A259FF]"
                              />

                            </div>

                            <div className="flex-1">

                              <div className="flex flex-col gap-3 sm:flex-row items-start justify-between">

                                <div>

                                  <h3 className="font-semibold text-white">
                                    {
                                      notification.title
                                    }
                                  </h3>

                                  <p className="mt-2 text-sm leading-6 text-gray-400">
                                    {
                                      notification.message
                                    }
                                  </p>

                                  <p className="mt-2 text-xs text-gray-600">
                                    {formatDate(
                                      notification.createdAt
                                    )}
                                  </p>

                                </div>

                                {!notification.read && (
                                  <button
                                    type="button"
                                    onClick={() =>
                                      markNotificationRead(
                                        notification.id
                                      )
                                    }
                                    className="px-3 py-2 w-fit text-xs font-semibold text-white bg-[#A259FF] rounded-lg"
                                  >
                                    Mark read
                                  </button>
                                )}

                              </div>

                            </div>

                          </div>

                        </div>
                      )
                    )}

                  </div>

                </div>
              )}
            </>
          )}

        </section>

      </main>

      <Footer />

    </div>
  );
};

export default UserProfile;