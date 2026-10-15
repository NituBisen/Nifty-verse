
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  RefreshCw,
  Users,
  Image as ImageIcon,
  FolderKanban,
  ShoppingBag,
  TrendingUp,
  CalendarDays,
  AlertCircle,
} from "lucide-react";

const API_URL = (import.meta.env.VITE_API_URL || "https://nifty-verse-backend-production.up.railway.app").replace(/\/+$/, "");

const REPORTS = [
  { key: "nfts", title: "Total NFTs", endpoint: "recent-nfts", icon: ImageIcon, color: "#A259FF" },
  { key: "collections", title: "Collections", endpoint: "recent-collections", icon: FolderKanban, color: "#55B7FF" },
  { key: "creators", title: "Creators", endpoint: "recent-creators", icon: Users, color: "#34D399" },
  { key: "listings", title: "Listings", endpoint: "recent-listings", icon: ShoppingBag, color: "#FBBF24" },
];

const DATE_FILTERS = [
  { label: "All Time", value: "all" },
  { label: "Last 7 Days", value: "7" },
  { label: "Last 30 Days", value: "30" },
];

const formatDate = (value) =>
  value
    ? new Date(value).toLocaleDateString("en-IN", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      })
    : "—";

const getRecordName = (item, key) => {
  if (key === "creators") {
    return item.username || item.name || item.email || "Unknown Creator";
  }

  return item.name || item.title || "Untitled";
};

const getRecordStatus = (item, key) => {
  if (key === "listings") {
    return item.isListed ? "Listed" : item.status || "Unlisted";
  }

  return item.status || (key === "creators" ? "Creator" : "Unknown");
};

const Reports = () => {
  const navigate = useNavigate();

  const [reports, setReports] = useState({
    nfts: [],
    collections: [],
    creators: [],
    listings: [],
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [dateFilter, setDateFilter] = useState("all");
  const [lastUpdated, setLastUpdated] = useState(null);

  const fetchReports = useCallback(async () => {
    const token = localStorage.getItem("adminToken");

    if (!token) {
      navigate("/admin/login", { replace: true });
      return;
    }

    setLoading(true);
    setError("");

    try {
      const results = await Promise.all(
        REPORTS.map(async (report) => {
          const response = await fetch(
            `${API_URL}/api/admin/dashboard/${report.endpoint}?limit=all`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );

          if (response.status === 401) {
            localStorage.removeItem("adminToken");
            localStorage.removeItem("admin");
            navigate("/admin/login", { replace: true });
            throw new Error("Session expired. Please sign in again.");
          }

          const data = await response.json();

          if (!response.ok) {
            throw new Error(
              data.message || `Unable to load ${report.title.toLowerCase()}.`
            );
          }

          return {
            key: report.key,
            items: Array.isArray(data[report.key]) ? data[report.key] : [],
          };
        })
      );

      const nextReports = {
        nfts: [],
        collections: [],
        creators: [],
        listings: [],
      };

      results.forEach(({ key, items }) => {
        nextReports[key] = items;
      });

      setReports(nextReports);
      setLastUpdated(new Date());
    } catch (err) {
      console.error("Admin reports error:", err);
      setError(err.message || "Unable to load reports. Please try again.");
    } finally {
      setLoading(false);
    }
  }, [navigate]);

  useEffect(() => {
    fetchReports();
  }, [fetchReports]);

  const filteredReports = useMemo(() => {
    const days = Number(dateFilter);

    if (!days) return reports;

    const cutoff = new Date();
    cutoff.setDate(cutoff.getDate() - days);

    return Object.fromEntries(
      Object.entries(reports).map(([key, items]) => [
        key,
        items.filter((item) => {
          if (!item.createdAt) return false;

          const createdAt = new Date(item.createdAt);

          return !Number.isNaN(createdAt.getTime()) && createdAt >= cutoff;
        }),
      ])
    );
  }, [reports, dateFilter]);

  const totalRecords = Object.values(filteredReports).reduce(
    (total, items) => total + items.length,
    0
  );

  const publishedNFTs = filteredReports.nfts.filter(
    (item) => String(item.status || "").toLowerCase() === "published"
  ).length;

  const draftNFTs = filteredReports.nfts.filter(
    (item) => String(item.status || "").toLowerCase() === "draft"
  ).length;

  const listedNFTs = filteredReports.nfts.filter(
    (item) => item.isListed === true
  ).length;

  const publishedCollections = filteredReports.collections.filter(
    (item) => String(item.status || "").toLowerCase() === "published"
  ).length;

  const statCards = [
    {
      title: "Total NFTs",
      value: filteredReports.nfts.length,
      icon: ImageIcon,
      color: "#A259FF",
      description: `${publishedNFTs} published · ${draftNFTs} drafts`,
    },
    {
      title: "Collections",
      value: filteredReports.collections.length,
      icon: FolderKanban,
      color: "#55B7FF",
      description: `${publishedCollections} published collections`,
    },
    {
      title: "Creators",
      value: filteredReports.creators.length,
      icon: Users,
      color: "#34D399",
      description: "Creator records returned by the API",
    },
    {
      title: "Listings",
      value: filteredReports.listings.length,
      icon: ShoppingBag,
      color: "#FBBF24",
      description: `${listedNFTs} listed NFTs in the NFT records`,
    },
  ];

  const exportCSV = () => {
    const rows = [
      ["Report Type", "Name", "Status", "Created Date"],
      ...REPORTS.flatMap((report) =>
        filteredReports[report.key].map((item) => [
          report.title,
          getRecordName(item, report.key),
          getRecordStatus(item, report.key),
          item.createdAt || "",
        ])
      ),
    ];

    const csv = rows
      .map((row) =>
        row
          .map((value) => `"${String(value ?? "").replace(/"/g, '""')}"`)
          .join(",")
      )
      .join("\r\n");

    const blob = new Blob(["\uFEFF" + csv], {
      type: "text/csv;charset=utf-8;",
    });

    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");

    link.href = url;
    link.download = `nifty-verse-report-${new Date().toISOString().slice(0, 10)}.csv`;
    document.body.appendChild(link);
    link.click();
    link.remove();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6">
      <motion.section
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative overflow-hidden rounded-[26px] border border-white/[0.06] bg-[#111114] p-5 sm:p-7"
      >
        <div className="pointer-events-none absolute -right-12 -top-16 h-48 w-48 rounded-full bg-[#A259FF]/10 blur-3xl" />

        <button
          type="button"
          onClick={() => navigate("/admin/dashboard")}
          className="relative mb-5 flex items-center gap-2 text-sm text-[#A0A0AA] transition hover:text-white"
        >
          <ArrowLeft size={16} />
          Back to Dashboard
        </button>

        <div className="relative flex flex-col justify-between gap-5 lg:flex-row lg:items-center">
          <div>
            <div className="mb-3 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-[#A259FF]">
              <TrendingUp size={15} />
              Marketplace Analytics
            </div>

            <h1 className="text-2xl font-bold text-white sm:text-3xl">
              Reports & Analytics
            </h1>

            <p className="mt-2 max-w-xl text-sm leading-6 text-[#777780]">
              Monitor NFT, collection, creator and listing records from your
              marketplace.
            </p>

            {lastUpdated && (
              <p className="mt-2 text-xs text-[#686871]">
                Last updated: {lastUpdated.toLocaleTimeString("en-IN")}
              </p>
            )}
          </div>

          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              onClick={fetchReports}
              disabled={loading}
              className="flex items-center justify-center gap-2 rounded-xl border border-white/[0.08] px-4 py-3 text-sm text-white transition hover:bg-white/[0.05] disabled:opacity-50"
            >
              <RefreshCw size={16} className={loading ? "animate-spin" : ""} />
              Refresh
            </button>

            <button
              type="button"
              onClick={exportCSV}
              disabled={loading || totalRecords === 0}
              className="flex items-center justify-center gap-2 rounded-xl bg-[#A259FF] px-4 py-3 text-sm font-semibold text-white transition hover:bg-[#9147E5] disabled:cursor-not-allowed disabled:opacity-50"
            >
              Export CSV
            </button>
          </div>
        </div>
      </motion.section>

      <section className="flex flex-col justify-between gap-4 rounded-2xl border border-white/[0.06] bg-[#111114] p-4 sm:flex-row sm:items-center sm:p-5">
        <div>
          <h2 className="font-semibold text-white">Report Period</h2>
          <p className="mt-1 text-xs text-[#777780]">
            Filter records by their creation date.
          </p>
        </div>

        <div className="flex flex-wrap gap-2">
          {DATE_FILTERS.map((filter) => (
            <button
              key={filter.value}
              type="button"
              onClick={() => setDateFilter(filter.value)}
              className={`rounded-xl border px-4 py-2.5 text-sm transition ${
                dateFilter === filter.value
                  ? "border-[#A259FF]/40 bg-[#A259FF]/15 text-[#C39AFF]"
                  : "border-white/[0.07] text-[#85858D] hover:bg-white/[0.04] hover:text-white"
              }`}
            >
              {filter.label}
            </button>
          ))}
        </div>
      </section>

      {error && (
        <div className="flex items-start gap-3 rounded-2xl border border-red-400/20 bg-red-400/[0.06] p-4">
          <AlertCircle size={19} className="mt-0.5 shrink-0 text-red-300" />
          <div>
            <p className="text-sm font-semibold text-red-200">
              Could not load reports
            </p>
            <p className="mt-1 text-sm text-red-200/70">{error}</p>
            <button
              type="button"
              onClick={fetchReports}
              className="mt-3 text-sm font-semibold text-white underline underline-offset-4"
            >
              Try again
            </button>
          </div>
        </div>
      )}

      {loading ? (
        <div className="flex min-h-64 items-center justify-center gap-3 rounded-[26px] border border-white/[0.06] bg-[#111114] text-sm text-[#85858D]">
          <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/10 border-t-[#A259FF]" />
          Loading marketplace reports...
        </div>
      ) : !error ? (
        <>
          <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {statCards.map((card, index) => {
              const Icon = card.icon;

              return (
                <motion.div
                  key={card.title}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.07 }}
                  className="rounded-[22px] border border-white/[0.06] bg-[#111114] p-5 transition hover:border-white/[0.12]"
                >
                  <div className="flex items-center justify-between gap-3">
                    <p className="text-sm text-[#85858D]">{card.title}</p>
                    <div
                      className="flex h-10 w-10 items-center justify-center rounded-xl"
                      style={{ backgroundColor: `${card.color}18`, color: card.color }}
                    >
                      <Icon size={19} />
                    </div>
                  </div>

                  <p className="mt-5 text-3xl font-bold text-white">
                    {card.value.toLocaleString("en-IN")}
                  </p>

                  <p className="mt-2 text-xs leading-5 text-[#777780]">
                    {card.description}
                  </p>
                </motion.div>
              );
            })}
          </section>

          <section className="grid grid-cols-1 gap-4 lg:grid-cols-2">
            <div className="rounded-[24px] border border-white/[0.06] bg-[#111114] p-5 sm:p-6">
              <div className="mb-5 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#A259FF]/10 text-[#B36DFF]">
                  <ImageIcon size={19} />
                </div>
                <div>
                  <h2 className="font-semibold text-white">NFT Overview</h2>
                  <p className="mt-1 text-xs text-[#777780]">
                    NFT status breakdown
                  </p>
                </div>
              </div>

              {[
                { label: "Published", value: publishedNFTs, color: "#34D399" },
                { label: "Drafts", value: draftNFTs, color: "#FBBF24" },
                { label: "Listed", value: listedNFTs, color: "#A259FF" },
              ].map((item) => {
                const percentage = filteredReports.nfts.length
                  ? Math.min((item.value / filteredReports.nfts.length) * 100, 100)
                  : 0;

                return (
                  <div key={item.label} className="mb-5 last:mb-0">
                    <div className="mb-2 flex items-center justify-between gap-3">
                      <span className="text-sm text-[#A4A4AE]">
                        {item.label}
                      </span>
                      <span className="text-sm font-semibold text-white">
                        {item.value.toLocaleString("en-IN")}
                      </span>
                    </div>
                    <div className="h-2 overflow-hidden rounded-full bg-white/[0.06]">
                      <div
                        className="h-full rounded-full transition-all duration-500"
                        style={{
                          width: `${percentage}%`,
                          backgroundColor: item.color,
                        }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="rounded-[24px] border border-white/[0.06] bg-[#111114] p-5 sm:p-6">
              <div className="mb-5 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#55B7FF]/10 text-[#55B7FF]">
                  <CalendarDays size={19} />
                </div>
                <div>
                  <h2 className="font-semibold text-white">Report Summary</h2>
                  <p className="mt-1 text-xs text-[#777780]">
                    Current selected period
                  </p>
                </div>
              </div>

              <div className="space-y-4">
                {[
                  ["Total Records", totalRecords],
                  ["Published Collections", publishedCollections],
                  ["Listed NFT Records", listedNFTs],
                ].map(([label, value]) => (
                  <div
                    key={label}
                    className="flex items-center justify-between gap-3 border-b border-white/[0.05] pb-4 last:border-0 last:pb-0"
                  >
                    <span className="text-sm text-[#85858D]">{label}</span>
                    <span className="font-semibold text-white">
                      {value.toLocaleString("en-IN")}
                    </span>
                  </div>
                ))}
              </div>

              <p className="mt-5 text-xs leading-5 text-[#686871]">
                Counts are based on records returned by the existing admin
                dashboard endpoints. Sales and revenue are not included.
              </p>
            </div>
          </section>

          {REPORTS.map((report) => {
            const Icon = report.icon;
            const items = filteredReports[report.key];

            return (
              <section
                key={report.key}
                className="overflow-hidden rounded-[24px] border border-white/[0.06] bg-[#111114]"
              >
                <div className="flex flex-col justify-between gap-3 border-b border-white/[0.06] p-5 sm:flex-row sm:items-center sm:px-6">
                  <div className="flex items-center gap-3">
                    <div
                      className="flex h-10 w-10 items-center justify-center rounded-xl"
                      style={{
                        backgroundColor: `${report.color}18`,
                        color: report.color,
                      }}
                    >
                      <Icon size={19} />
                    </div>
                    <div>
                      <h2 className="font-semibold text-white">
                        {report.title} Report
                      </h2>
                      <p className="mt-1 text-xs text-[#777780]">
                        {items.length} records in selected period
                      </p>
                    </div>
                  </div>
                </div>

                {items.length === 0 ? (
                  <div className="p-8 text-center text-sm text-[#777780]">
                    No records found for this period.
                  </div>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="w-full min-w-[560px] text-left text-sm">
                      <thead className="bg-white/[0.025] text-[11px] uppercase tracking-wider text-[#777780]">
                        <tr>
                          <th className="px-5 py-4 font-semibold">Name</th>
                          <th className="px-5 py-4 font-semibold">Status</th>
                          <th className="px-5 py-4 font-semibold">Created</th>
                        </tr>
                      </thead>
                      <tbody>
                        {items
                          .slice()
                          .sort(
                            (a, b) =>
                              new Date(b.createdAt || 0) -
                              new Date(a.createdAt || 0)
                          )
                          .slice(0, 10)
                          .map((item, index) => (
                            <tr
                              key={item._id || item.id || index}
                              className="border-t border-white/[0.05] transition hover:bg-white/[0.025]"
                            >
                              <td className="max-w-[320px] truncate px-5 py-4 font-medium text-white">
                                {getRecordName(item, report.key)}
                              </td>
                              <td className="px-5 py-4">
                                <span className="inline-flex rounded-full bg-[#A259FF]/10 px-2.5 py-1 text-xs text-[#C39AFF]">
                                  {getRecordStatus(item, report.key)}
                                </span>
                              </td>
                              <td className="whitespace-nowrap px-5 py-4 text-[#85858D]">
                                {formatDate(item.createdAt)}
                              </td>
                            </tr>
                          ))}
                      </tbody>
                    </table>

                    {items.length > 10 && (
                      <p className="border-t border-white/[0.05] px-5 py-3 text-xs text-[#777780]">
                        Showing 10 of {items.length} records in this section.
                        Export CSV to download the filtered records.
                      </p>
                    )}
                  </div>
                )}
              </section>
            );
          })}
        </>
      ) : null}
    </div>
  );
};

export default Reports;
