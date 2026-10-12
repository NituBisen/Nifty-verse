
import React from "react";
import {
  Image,
  Layers,
  Heart,
  Wallet,
  Plus,
  ArrowUpRight,
  ArrowDownLeft,
  ShoppingBag,
  Compass,
  Clock,
  ArrowRight,
  Sparkles,
  ExternalLink,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const StatCard = ({
  title,
  value,
  subtitle,
  icon: Icon,
  iconColor = "text-[#A259FF]",
}) => (
  <div className="p-5 bg-[#111114] rounded-2xl border-white/[0.07] duration-300 group border transition hover:border-[#A259FF]/40 hover:bg-[#15131A] sm:p-6">
    <div className="flex items-center justify-between gap-3">
      <p className="text-sm font-medium text-gray-400">{title}</p>

      <div className={`rounded-xl bg-white/[0.04] p-3 ${iconColor}`}>
        <Icon size={21} />
      </div>
    </div>

    <h3 className="mt-5 text-3xl font-bold tracking-tight text-white">
      {value}
    </h3>

    <p className="mt-2 text-xs text-gray-500">{subtitle}</p>
  </div>
);

const EmptyState = ({ icon: Icon, title, description, action }) => (
  <div className="flex flex-col items-center justify-center px-5 py-8 min-h-[210px] text-center">
    <div className="mb-4 p-4 text-[#B57AFF] bg-[#A259FF]/10 rounded-2xl border-[#A259FF]/20 border">
      <Icon size={27} />
    </div>

    <h3 className="text-base font-semibold text-white">{title}</h3>

    <p className="mt-2 max-w-sm text-sm leading-6 text-gray-500">
      {description}
    </p>

    {action}
  </div>
);

export default function Dashboard({
  ownedNFTs = [],
  createdNFTs = [],
  collections = [],
  favorites = [],
  activities = [],
  walletBalance = null,
  currency = "ETH",
}) {
  const navigate = useNavigate();

  // Use actual values from the application.
  const owned = Array.isArray(ownedNFTs) ? ownedNFTs : [];
  const created = Array.isArray(createdNFTs) ? createdNFTs : [];
  const collectionList = Array.isArray(collections) ? collections : [];
  const favoriteList = Array.isArray(favorites) ? favorites : [];
  const recentActivities = Array.isArray(activities) ? activities : [];

  const stats = [
    {
      title: "Owned NFTs",
      value: owned.length.toLocaleString(),
      subtitle: "NFTs in your portfolio",
      icon: Image,
      iconColor: "text-[#A259FF]",
    },
    {
      title: "Created NFTs",
      value: created.length.toLocaleString(),
      subtitle: "NFTs created by you",
      icon: Sparkles,
      iconColor: "text-blue-400",
    },
    {
      title: "Collections",
      value: collectionList.length.toLocaleString(),
      subtitle: "Your NFT collections",
      icon: Layers,
      iconColor: "text-pink-400",
    },
    {
      title: "Favorites",
      value: favoriteList.length.toLocaleString(),
      subtitle: "NFTs saved by you",
      icon: Heart,
      iconColor: "text-rose-400",
    },
  ];

  const formatPrice = (price) => {
    if (price === undefined || price === null || price === "") {
      return "Price not set";
    }

    const number = Number(price);

    return Number.isFinite(number)
      ? `${number.toLocaleString(undefined, {
          maximumFractionDigits: 4,
        })} ${currency}`
      : String(price);
  };

  const getActivityIcon = (type = "") => {
    const action = String(type).toLowerCase();

    if (action.includes("purchas") || action.includes("buy")) {
      return ShoppingBag;
    }

    if (action.includes("creat")) {
      return Sparkles;
    }

    if (action.includes("list")) {
      return ArrowUpRight;
    }

    if (action.includes("sell")) {
      return ArrowDownLeft;
    }

    return Clock;
  };

  const getNFTImage = (nft) =>
    nft?.image || nft?.imageUrl || nft?.imageURL || "";

  const getNFTName = (nft) => nft?.name || "Untitled NFT";

  return (
    <main className="px-4 py-6 py-8 min-h-full text-white bg-[#08080A] sm:px-6 xl:px-8">
      <div className="mx-auto max-w-[1600px] space-y-8">

        {/* Welcome banner */}
        <section className="overflow-hidden relative p-6 bg-gradient-to-br from-[#17121F] via-[#111114] to-[#0D0D10] rounded-[26px] border-white/[0.06] border sm:p-9 lg:p-10">
          <div className="absolute h-72 w-72 bg-[#A259FF]/10 rounded-full blur-[90px] pointer-events-none -right-16 -top-28" />

          <div className="z-10 relative max-w-3xl">
            <div className="inline-flex items-center gap-2 mb-4 text-xs font-bold tracking-[0.25em] text-[#B57AFF] uppercase">
              <Sparkles size={15} />
              Nifty Verse
            </div>

            <h1 className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-[42px]">
              Dashboard
            </h1>

            <p className="mt-4 max-w-2xl text-sm leading-7 text-gray-400 sm:text-base">
              Your NFT activity, account statistics and marketplace overview.
              Manage your digital assets from one place.
            </p>

            <div className="flex flex-wrap gap-3 mt-7">
              <button
                onClick={() => navigate("/create-nft")}
                className="inline-flex items-center gap-2 px-5 py-3 text-sm font-semibold text-white bg-[#A259FF] rounded-xl transition hover:bg-[#9147E8]"
              >
                <Plus size={18} />
                Create NFT
              </button>

              <button
                onClick={() => navigate("/collections")}
                className="inline-flex items-center gap-2 px-5 py-3 text-sm font-semibold text-gray-200 bg-white/[0.04] rounded-xl border-white/10 border transition hover:border-[#A259FF]/50 hover:bg-white/[0.07]"
              >
                <Layers size={17} />
                My Collections
              </button>

              <button
                onClick={() => navigate("/marketplace")}
                className="inline-flex items-center gap-2 px-5 py-3 text-sm font-semibold text-gray-300 rounded-xl border-white/10 border transition hover:border-[#A259FF]/50 hover:text-white"
              >
                Explore Marketplace
                <ArrowUpRight size={17} />
              </button>
            </div>
          </div>
        </section>

        {/* Statistics */}
        <section>
          <div className="mb-5">
            <h2 className="text-xl font-bold text-white">
              Portfolio Overview
            </h2>
            <p className="mt-1 text-sm text-gray-500">
              A quick look at your NFT portfolio.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {stats.map((stat) => (
              <StatCard key={stat.title} {...stat} />
            ))}
          </div>
        </section>

        {/* Wallet and quick actions */}
        <section className="grid grid-cols-1 gap-5 xl:grid-cols-3">
          <div className="p-6 bg-[#111114] rounded-2xl border-white/[0.07] border sm:p-7 xl:col-span-2">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-sm text-gray-400">Wallet Balance</p>

                <h2 className="mt-3 text-3xl font-bold">
                  {walletBalance === null || walletBalance === undefined
                    ? "Not connected"
                    : `${formatPrice(walletBalance)}`}
                </h2>

                <p className="mt-2 text-xs text-gray-500">
                  {walletBalance === null || walletBalance === undefined
                    ? "Connect your wallet to view your balance."
                    : "Balance provided by your connected wallet."}
                </p>
              </div>

              <div className="p-3 text-[#B57AFF] bg-[#A259FF]/10 rounded-xl">
                <Wallet size={24} />
              </div>
            </div>

            <button
              onClick={() => navigate("/connect-wallet")}
              className="inline-flex items-center gap-2 mt-6 px-4 py-3 text-sm font-semibold text-[#C49AFF] rounded-xl border-[#A259FF]/30 border transition hover:bg-[#A259FF]/10"
            >
              {walletBalance === null || walletBalance === undefined
                ? "Connect Wallet"
                : "Manage Wallet"}
              <ArrowUpRight size={16} />
            </button>
          </div>

          <div className="p-6 bg-[#111114] rounded-2xl border-white/[0.07] border">
            <h3 className="text-lg font-bold">Quick Actions</h3>

            <p className="mt-1 text-sm text-gray-500">
              What would you like to do?
            </p>

            <div className="mt-5 space-y-3">
              {[
                {
                  label: "Create a new NFT",
                  icon: Plus,
                  action: () => navigate("/create-nft"),
                },
                {
                  label: "Create a collection",
                  icon: Layers,
                  action: () => navigate("/collections"),
                },
                {
                  label: "Explore marketplace",
                  icon: Compass,
                  action: () => navigate("/marketplace"),
                },
              ].map((item) => (
                <button
                  key={item.label}
                  onClick={item.action}
                  className="flex items-center gap-3 p-3 w-full text-left bg-white/[0.02] rounded-xl border-white/[0.06] border transition hover:border-[#A259FF]/30 hover:bg-[#A259FF]/[0.06]"
                >
                  <span className="p-2 text-[#B57AFF] bg-[#A259FF]/10 rounded-lg">
                    <item.icon size={18} />
                  </span>

                  <span className="flex-1 text-sm font-medium text-gray-300">
                    {item.label}
                  </span>

                  <ArrowRight size={16} className="text-gray-500" />
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Owned NFTs */}
        <section className="overflow-hidden bg-[#111114] rounded-2xl border-white/[0.07] border">
          <div className="flex flex-wrap items-center justify-between gap-3 p-5 border-b border-white/[0.06] sm:p-6">
            <div>
              <h2 className="text-lg font-bold">Your NFT Portfolio</h2>
              <p className="mt-1 text-sm text-gray-500">
                NFTs you currently own.
              </p>
            </div>

            <button
              onClick={() => navigate("/profile")}
              className="inline-flex items-center gap-2 text-sm font-semibold text-[#B57AFF] hover:text-white"
            >
              View Portfolio
              <ArrowRight size={16} />
            </button>
          </div>

          {owned.length === 0 ? (
            <EmptyState
              icon={Image}
              title="Your portfolio is empty"
              description="NFTs you own will appear here when they are added to your account."
              action={
                <button
                  onClick={() => navigate("/marketplace")}
                  className="inline-flex items-center gap-2 mt-4 px-4 py-3 text-sm font-semibold bg-[#A259FF] rounded-xl hover:bg-[#9147E8]"
                >
                  Explore NFTs
                  <ArrowUpRight size={16} />
                </button>
              }
            />
          ) : (
            <div className="grid grid-cols-1 gap-4 p-5 p-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {owned.slice(0, 4).map((nft, index) => {
                const image = getNFTImage(nft);

                return (
                  <article
                    key={nft.id || nft._id || index}
                    className="overflow-hidden bg-[#17171B] rounded-2xl border-white/[0.07] border transition hover:-translate-y-1 hover:border-[#A259FF]/30"
                  >
                    <div className="overflow-hidden bg-[#202024] aspect-square">
                      {image ? (
                        <img
                          src={image}
                          alt={getNFTName(nft)}
                          className="object-cover h-full w-full duration-500 transition hover:scale-105"
                        />
                      ) : (
                        <div className="flex items-center justify-center h-full text-gray-600">
                          <Image size={42} />
                        </div>
                      )}
                    </div>

                    <div className="p-4">
                      <h3 className="font-semibold truncate">
                        {getNFTName(nft)}
                      </h3>

                      <p className="mt-2 text-xs text-gray-500">
                        {nft.creator || "Creator not specified"}
                      </p>

                      <div className="flex items-center justify-between gap-2 mt-4">
                        <span className="text-xs text-gray-500">Price</span>
                        <span className="text-sm font-semibold text-[#C49AFF]">
                          {formatPrice(nft.price)}
                        </span>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          )}
        </section>

        {/* Collections and activity */}
        <section className="grid grid-cols-1 gap-5 xl:grid-cols-2">
          <div className="overflow-hidden bg-[#111114] rounded-2xl border-white/[0.07] border">
            <div className="flex items-center justify-between p-5 border-b border-white/[0.06]">
              <div>
                <h2 className="font-bold">My Collections</h2>
                <p className="mt-1 text-xs text-gray-500">
                  Your created NFT collections.
                </p>
              </div>

              <button
                onClick={() => navigate("/collections")}
                aria-label="View collections"
                className="p-2 text-gray-400 rounded-lg transition hover:bg-white/[0.05] hover:text-white"
              >
                <ExternalLink size={17} />
              </button>
            </div>

            {collectionList.length === 0 ? (
              <EmptyState
                icon={Layers}
                title="No collections yet"
                description="Create your first collection to organize your NFTs."
                action={
                  <button
                    onClick={() => navigate("/collections")}
                    className="mt-3 text-sm font-semibold text-[#B57AFF] hover:text-white"
                  >
                    Create Collection →
                  </button>
                }
              />
            ) : (
              <div className="p-5 space-y-3">
                {collectionList.slice(0, 4).map((collection, index) => (
                  <div
                    key={collection.id || collection._id || index}
                    className="flex items-center gap-3 p-3 rounded-xl border-white/[0.06] border"
                  >
                    <div className="overflow-hidden flex items-center justify-center h-12 w-12 text-[#B57AFF] bg-[#A259FF]/10 rounded-xl shrink-0">
                      {collection.image || collection.banner ? (
                        <img
                          src={collection.image || collection.banner}
                          alt={collection.name || "Collection"}
                          className="object-cover h-full w-full"
                        />
                      ) : (
                        <Layers size={21} />
                      )}
                    </div>

                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold truncate">
                        {collection.name || "Untitled Collection"}
                      </p>
                      <p className="mt-1 text-xs text-gray-500">
                        {Array.isArray(collection.nfts)
                          ? collection.nfts.length
                          : collection.nftCount ?? 0}{" "}
                        NFTs
                      </p>
                    </div>

                    <ArrowRight size={16} className="text-gray-500" />
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="overflow-hidden bg-[#111114] rounded-2xl border-white/[0.07] border">
            <div className="p-5 border-b border-white/[0.06]">
              <h2 className="font-bold">Recent Activity</h2>
              <p className="mt-1 text-xs text-gray-500">
                Your latest marketplace actions.
              </p>
            </div>

            {recentActivities.length === 0 ? (
              <EmptyState
                icon={Clock}
                title="No recent activity"
                description="Your NFT creation, purchases and listings will appear here."
              />
            ) : (
              <div className="px-5 divide-y divide-white/[0.05]">
                {recentActivities.slice(0, 5).map((activity, index) => {
                  const ActivityIcon = getActivityIcon(
                    activity.type || activity.action
                  );

                  return (
                    <div
                      key={activity.id || activity._id || index}
                      className="flex items-center gap-3 py-4"
                    >
                      <div className="p-3 text-[#B57AFF] bg-[#A259FF]/10 rounded-xl">
                        <ActivityIcon size={18} />
                      </div>

                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-semibold text-gray-200 truncate">
                          {activity.title ||
                            activity.name ||
                            activity.type ||
                            "Activity"}
                        </p>

                        <p className="mt-1 text-xs text-gray-500">
                          {activity.createdAt
                            ? new Date(
                                activity.createdAt
                              ).toLocaleString()
                            : activity.date
                              ? String(activity.date)
                              : "Date unavailable"}
                        </p>
                      </div>

                      {activity.price !== undefined &&
                        activity.price !== null &&
                        activity.price !== "" && (
                          <span className="text-xs font-semibold text-[#C49AFF] shrink-0">
                            {formatPrice(activity.price)}
                          </span>
                        )}
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </section>

        {/* Footer note */}
        <div className="flex flex-wrap items-center justify-center gap-2 py-5 text-xs text-gray-600 border-t border-white/[0.06]">
          <Sparkles size={14} className="text-[#A259FF]" />
          <span>NiftyVerse · Your digital assets, in one place.</span>
        </div>
      </div>
    </main>
  );
}
