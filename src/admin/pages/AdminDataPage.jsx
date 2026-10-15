import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, RefreshCw, Search, Image as ImageIcon, FolderKanban, UserRound, ShoppingBag, Activity as ActivityIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";

const API_URL = (import.meta.env.VITE_API_URL || "https://nifty-verse-backend-production.up.railway.app").replace(/\/+$/, "");

const CONFIG = {
    collections: { title: "Collections", subtitle: "Manage all marketplace collections", endpoint: "recent-collections", key: "collections", icon: FolderKanban },
    creators: { title: "Creators", subtitle: "Explore users who have created NFTs", endpoint: "recent-creators", key: "creators", icon: UserRound },
    listings: { title: "Listings", subtitle: "Manage all published NFT listings", endpoint: "recent-listings", key: "listings", icon: ShoppingBag },
    activity: { title: "Activity", subtitle: "Review marketplace activity records", endpoint: "recent-activities", key: "activities", icon: ActivityIcon },
    nfts: { title: "NFTs", subtitle: "Manage all marketplace NFTs", endpoint: "recent-nfts", key: "nfts", icon: ImageIcon }
};

const getDate = (value) => value ? new Date(value).toLocaleString("en-IN", { dateStyle: "medium", timeStyle: "short" }) : "—";
const getName = (value) => typeof value === "object" && value ? value.username || value.name || value.email || "Unknown" : value || "Unknown";
const getImage = (item, type) => type === "collections" ? item.image : type === "listings" ? item.image : item.avatar || item.profileImage || item.image || "";
const getTitle = (item, type) => type === "collections" ? item.name : type === "creators" ? item.username : type === "listings" ? item.name : item.title || item.type || "Activity";
const getStatus = (item, type) => type === "collections" || type === "listings" ? item.status || (item.isListed ? "Listed" : "Published") : type === "activity" ? item.status || item.type : "Creator";
const getColumns = (type) => {
    if (type === "collections") return ["Collection", "Category", "Creator", "NFTs", "Status", "Created"];
    if (type === "creators") return ["Creator", "Email", "NFTs", "Listings", "Collections", "Joined"];
    if (type === "listings") return ["NFT", "Creator", "Owner", "Price", "Status", "Created"];
    return ["Activity", "User", "NFT", "Details", "Date"];
};

const AdminDataPage = ({ type = "collections" }) => {
    const navigate = useNavigate();
    const config = CONFIG[type] || CONFIG.collections;
    const Icon = config.icon;
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [search, setSearch] = useState("");

    const fetchItems = async () => {
        const token = localStorage.getItem("adminToken");
        if (!token) {
            navigate("/admin/login", { replace: true });
            return;
        }

        try {
            setLoading(true);
            setError("");
            const response = await fetch(`${API_URL}/api/admin/dashboard/${config.endpoint}?limit=all`, {
                headers: { Authorization: `Bearer ${token}` }
            });

            if (response.status === 401) {
                localStorage.removeItem("adminToken");
                localStorage.removeItem("admin");
                navigate("/admin/login", { replace: true });
                return;
            }

            const data = await response.json();
            if (!response.ok) throw new Error(data.message || `Unable to load ${config.title.toLowerCase()}.`);
            setItems(data[config.key] || []);
        } catch (err) {
            console.error(`Admin ${type} error:`, err);
            setError(err.message || "Something went wrong.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchItems();
    }, [type]);

    const filteredItems = items.filter((item) => JSON.stringify(item).toLowerCase().includes(search.toLowerCase()));
    const columns = getColumns(type);

    const renderCell = (item, column) => {
        if (column === "Collection" || column === "Creator" || column === "NFT" || column === "Activity") {
            const title = getTitle(item, type);
            const image = getImage(item, type);
            return <div className="flex min-w-0 items-center gap-3"><div className="flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-white/[0.05] text-[#A259FF]">{image ? <img src={image} alt={title} className="h-full w-full object-cover" onError={(e) => { e.currentTarget.style.display = "none"; }} /> : <Icon size={18} />}</div><div className="min-w-0"><p className="truncate font-semibold text-white">{title || "Untitled"}</p>{type === "activity" && <p className="mt-1 max-w-[230px] truncate text-xs text-[#777780]">{item.message || "—"}</p>}</div></div>;
        }

        if (column === "Category") return item.category || "Art";
        if (column === "Creator") return getName(item.createdBy || item.creatorName || item.creator);
        if (column === "Owner") return getName(item.owner || item.ownerName);
        if (column === "User") return getName(item.user);
        if (column === "Email") return item.email || "—";
        if (column === "NFTs") return Array.isArray(item.nfts) ? item.nfts.length : item.totalNFTs ?? 0;
        if (column === "Listings") return item.totalListings ?? 0;
        if (column === "Collections") return item.totalCollections ?? 0;
        if (column === "Price") return `${Number(item.price || 0).toLocaleString("en-IN")} ETH`;
        if (column === "Status") return getStatus(item, type);
        if (column === "Created" || column === "Joined" || column === "Date") return getDate(item.createdAt);
        if (column === "Details") return <span className="block max-w-[220px] truncate">{item.message || item.description || item.type || "—"}</span>;
        return "—";
    };

    return (
        <div className="space-y-6">
            <motion.section initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="relative overflow-hidden rounded-[26px] border border-white/[0.06] bg-[#111114] p-5 sm:p-7">
                <div className="pointer-events-none absolute -right-12 -top-16 h-48 w-48 rounded-full bg-[#A259FF]/10 blur-3xl" />
                <button type="button" onClick={() => navigate("/admin/dashboard")} className="relative mb-5 flex items-center gap-2 text-sm text-[#A0A0AA] transition hover:text-white"><ArrowLeft size={16} /> Back to Dashboard</button>
                <div className="relative flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
                    <div className="flex items-center gap-4"><div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#A259FF]/10 text-[#B36DFF]"><Icon size={23} /></div><div><h1 className="text-2xl font-bold text-white sm:text-3xl">{config.title}</h1><p className="mt-1 text-sm text-[#777780]">{config.subtitle}</p></div></div>
                    <div className="flex items-center gap-2 rounded-xl border border-white/[0.07] bg-white/[0.025] px-4 py-3"><span className="text-xs text-[#777780]">Total records</span><span className="font-bold text-white">{items.length}</span></div>
                </div>
            </motion.section>

            <section className="overflow-hidden rounded-[26px] border border-white/[0.06] bg-[#111114]">
                <div className="flex flex-col gap-3 border-b border-white/[0.06] p-4 sm:flex-row sm:items-center sm:justify-between sm:px-6">
                    <div><h2 className="font-semibold text-white">All {config.title}</h2><p className="mt-1 text-xs text-[#686871]">Database records · {filteredItems.length} shown</p></div>
                    <div className="flex gap-2">
                        <div className="flex min-w-0 flex-1 items-center gap-2 rounded-xl border border-white/[0.08] bg-black/20 px-3 sm:w-64"><Search size={16} className="shrink-0 text-[#686871]" /><input value={search} onChange={(e) => setSearch(e.target.value)} placeholder={`Search ${config.title.toLowerCase()}...`} className="w-full bg-transparent py-2.5 text-sm text-white outline-none placeholder:text-[#55555D]" /></div>
                        <button type="button" onClick={fetchItems} className="flex items-center gap-2 rounded-xl border border-white/[0.08] px-3 text-sm text-[#B7B7C0] transition hover:bg-white/[0.05] hover:text-white"><RefreshCw size={15} /> <span className="hidden sm:inline">Refresh</span></button>
                    </div>
                </div>

                {loading ? <div className="flex min-h-64 items-center justify-center gap-3 text-sm text-[#85858D]"><span className="h-4 w-4 animate-spin rounded-full border-2 border-white/10 border-t-[#A259FF]" /> Loading {config.title.toLowerCase()}...</div> : error ? <div className="p-8 text-center"><p className="text-sm text-red-300">{error}</p><button onClick={fetchItems} className="mt-4 rounded-xl bg-white/[0.06] px-4 py-2 text-sm text-white">Try Again</button></div> : filteredItems.length === 0 ? <div className="flex min-h-64 flex-col items-center justify-center p-8 text-center"><ImageIcon size={28} className="text-[#55555D]" /><p className="mt-3 font-semibold text-white">No records found</p><p className="mt-1 text-sm text-[#777780]">{search ? "Try a different search." : `No ${config.title.toLowerCase()} are available yet.`}</p></div> : <div className="overflow-x-auto"><table className="w-full min-w-[780px] text-left text-sm"><thead className="bg-white/[0.025] text-[11px] uppercase tracking-wider text-[#777780]"><tr>{columns.map((column) => <th key={column} className="px-5 py-4 font-semibold">{column}</th>)}</tr></thead><tbody>{filteredItems.map((item, index) => <tr key={item._id || item.id || index} className="border-t border-white/[0.05] transition hover:bg-white/[0.025]">{columns.map((column) => <td key={column} className="max-w-[280px] px-5 py-4 text-[#A4A4AE]">{column === "Status" ? <span className="inline-flex rounded-full bg-[#A259FF]/10 px-2.5 py-1 text-xs text-[#C39AFF]">{renderCell(item, column)}</span> : renderCell(item, column)}</td>)}</tr>)}</tbody></table></div>}
            </section>
        </div>
    );
};

export default AdminDataPage;
