
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { FolderKanban, Plus, Search, RefreshCw, Pencil, Trash2, X, ArrowLeft } from "lucide-react";

const API_URL = (import.meta.env.VITE_API_URL || "https://nifty-verse-backend-production.up.railway.app").replace(/\/+$/, "");
const emptyForm = { name: "", description: "", status: "active" };

const AdminCategories = () => {
    const navigate = useNavigate();
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [search, setSearch] = useState("");
    const [modalOpen, setModalOpen] = useState(false);
    const [editingId, setEditingId] = useState(null);
    const [form, setForm] = useState(emptyForm);
    const [saving, setSaving] = useState(false);
    const [notice, setNotice] = useState("");

    const request = async (path, options = {}) => {
        const token = localStorage.getItem("adminToken");
        if (!token) {
            navigate("/admin/login", { replace: true });
            throw new Error("Admin login required.");
        }

        const response = await fetch(`${API_URL}${path}`, {
            ...options,
            headers: { Authorization: `Bearer ${token}`, ...(options.body ? { "Content-Type": "application/json" } : {}), ...options.headers }
        });

        const data = await response.json().catch(() => ({}));

        if (response.status === 401) {
            localStorage.removeItem("adminToken");
            localStorage.removeItem("admin");
            navigate("/admin/login", { replace: true });
            throw new Error("Session expired. Please sign in again.");
        }

        if (!response.ok) throw new Error(data.message || "Request failed.");
        return data;
    };

    const fetchCategories = async () => {
        try {
            setLoading(true);
            setError("");
            const data = await request("/api/admin/categories");
            setCategories(data.categories || []);
        } catch (err) {
            setError(err.message || "Unable to load categories.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchCategories();
    }, []);

    const openCreate = () => {
        setEditingId(null);
        setForm(emptyForm);
        setNotice("");
        setModalOpen(true);
    };

    const openEdit = (category) => {
        setEditingId(category._id);
        setForm({ name: category.name || "", description: category.description || "", status: category.status || "active" });
        setNotice("");
        setModalOpen(true);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!form.name.trim()) {
            setNotice("Please enter a category name.");
            return;
        }

        try {
            setSaving(true);
            setNotice("");
            const path = editingId ? `/api/admin/categories/${editingId}` : "/api/admin/categories";
            await request(path, { method: editingId ? "PATCH" : "POST", body: JSON.stringify({ ...form, name: form.name.trim(), description: form.description.trim() }) });
            setModalOpen(false);
            setForm(emptyForm);
            setEditingId(null);
            await fetchCategories();
        } catch (err) {
            setNotice(err.message || "Unable to save category.");
        } finally {
            setSaving(false);
        }
    };

    const handleDelete = async (category) => {
        if (!window.confirm(`Delete category "${category.name}"? This cannot be undone.`)) return;

        try {
            setNotice("");
            await request(`/api/admin/categories/${category._id}`, { method: "DELETE" });
            setCategories((previous) => previous.filter((item) => item._id !== category._id));
        } catch (err) {
            setNotice(err.message || "Unable to delete category.");
        }
    };

    const filteredCategories = categories.filter((item) => `${item.name} ${item.description} ${item.status}`.toLowerCase().includes(search.toLowerCase()));
    const activeCount = categories.filter((item) => item.status === "active").length;

    return (
        <div className="space-y-6">
            <motion.section initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} className="relative overflow-hidden rounded-[26px] border border-white/[0.06] bg-[#111114] p-5 sm:p-7">
                <div className="pointer-events-none absolute -right-10 -top-16 h-48 w-48 rounded-full bg-[#A259FF]/10 blur-3xl" />
                <button type="button" onClick={() => navigate("/admin/dashboard")} className="relative mb-5 flex items-center gap-2 text-sm text-[#9999A3] hover:text-white"><ArrowLeft size={16} /> Back to Dashboard</button>
                <div className="relative flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
                    <div className="flex items-center gap-4">
                        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#A259FF]/10 text-[#B36DFF]"><FolderKanban size={23} /></div>
                        <div><h1 className="text-2xl font-bold text-white sm:text-3xl">Categories</h1><p className="mt-1 text-sm text-[#777780]">Manage NFT marketplace categories.</p></div>
                    </div>
                    <button onClick={openCreate} className="flex items-center justify-center gap-2 rounded-xl bg-[#A259FF] px-4 py-3 text-sm font-semibold text-white transition hover:bg-[#9147E8]"><Plus size={17} /> Add Category</button>
                </div>
            </motion.section>

            <section className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                {[{ label: "Total Categories", value: categories.length }, { label: "Active Categories", value: activeCount }, { label: "Inactive Categories", value: categories.length - activeCount }].map((item) => (
                    <div key={item.label} className="rounded-2xl border border-white/[0.05] bg-[#111114] p-5"><p className="text-sm text-[#777780]">{item.label}</p><p className="mt-2 text-3xl font-bold text-white">{loading ? "..." : item.value}</p></div>
                ))}
            </section>

            <section className="overflow-hidden rounded-[26px] border border-white/[0.06] bg-[#111114]">
                <div className="flex flex-col gap-3 border-b border-white/[0.06] p-4 sm:flex-row sm:items-center sm:justify-between sm:px-6">
                    <div><h2 className="font-semibold text-white">All Categories</h2><p className="mt-1 text-xs text-[#686871]">{filteredCategories.length} categories</p></div>
                    <div className="flex gap-2">
                        <div className="flex min-w-0 flex-1 items-center gap-2 rounded-xl border border-white/[0.08] bg-black/20 px-3 sm:w-64"><Search size={16} className="shrink-0 text-[#686871]" /><input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search categories..." className="w-full bg-transparent py-2.5 text-sm text-white outline-none placeholder:text-[#55555D]" /></div>
                        <button onClick={fetchCategories} className="flex items-center gap-2 rounded-xl border border-white/[0.08] px-3 text-sm text-[#B7B7C0] hover:bg-white/[0.05]"><RefreshCw size={15} /></button>
                    </div>
                </div>

                {notice && !modalOpen && <p className="mx-5 mt-4 rounded-xl border border-amber-500/20 bg-amber-500/[0.06] p-3 text-sm text-amber-200">{notice}</p>}
                {loading ? <div className="flex min-h-64 items-center justify-center gap-3 text-sm text-[#85858D]"><span className="h-4 w-4 animate-spin rounded-full border-2 border-white/10 border-t-[#A259FF]" /> Loading categories...</div> : error ? <div className="p-8 text-center"><p className="text-sm text-red-300">{error}</p><button onClick={fetchCategories} className="mt-4 rounded-xl bg-white/[0.06] px-4 py-2 text-sm text-white">Try Again</button></div> : filteredCategories.length === 0 ? <div className="flex min-h-64 flex-col items-center justify-center p-8 text-center"><FolderKanban size={28} className="text-[#55555D]" /><p className="mt-3 font-semibold text-white">{search ? "No matching categories" : "No categories yet"}</p><p className="mt-1 text-sm text-[#777780]">Add a category to get started.</p></div> : (
                    <div className="overflow-x-auto">
                        <table className="w-full min-w-[720px] text-left text-sm">
                            <thead className="bg-white/[0.025] text-[11px] uppercase tracking-wider text-[#777780]"><tr>{["Category", "Description", "Status", "Created", "Actions"].map((heading) => <th key={heading} className="px-5 py-4 font-semibold">{heading}</th>)}</tr></thead>
                            <tbody>{filteredCategories.map((category) => (
                                <tr key={category._id} className="border-t border-white/[0.05] transition hover:bg-white/[0.025]">
                                    <td className="px-5 py-4"><div className="flex items-center gap-3"><div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#A259FF]/10 text-[#B36DFF]"><FolderKanban size={18} /></div><span className="font-semibold text-white">{category.name}</span></div></td>
                                    <td className="max-w-[300px] px-5 py-4 text-[#A4A4AE]"><span className="block truncate">{category.description || "—"}</span></td>
                                    <td className="px-5 py-4"><span className={`rounded-full px-2.5 py-1 text-xs ${category.status === "active" ? "bg-emerald-500/10 text-emerald-300" : "bg-white/[0.06] text-[#A4A4AE]"}`}>{category.status}</span></td>
                                    <td className="px-5 py-4 text-[#A4A4AE]">{category.createdAt ? new Date(category.createdAt).toLocaleDateString("en-IN") : "—"}</td>
                                    <td className="px-5 py-4"><div className="flex items-center gap-2"><button title="Edit category" onClick={() => openEdit(category)} className="rounded-lg border border-white/[0.08] p-2 text-[#A4A4AE] hover:border-[#A259FF]/30 hover:text-[#C39AFF]"><Pencil size={15} /></button><button title="Delete category" onClick={() => handleDelete(category)} className="rounded-lg border border-white/[0.08] p-2 text-[#A4A4AE] hover:border-red-500/30 hover:text-red-300"><Trash2 size={15} /></button></div></td>
                                </tr>
                            ))}</tbody>
                        </table>
                    </div>
                )}
            </section>

            {modalOpen && <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-black/70 p-4 backdrop-blur-sm">
                <motion.form initial={{ opacity: 0, y: 12, scale: 0.98 }} animate={{ opacity: 1, y: 0, scale: 1 }} onSubmit={handleSubmit} className="w-full max-w-lg rounded-[24px] border border-white/[0.08] bg-[#151519] p-5 shadow-2xl sm:p-7">
                    <div className="mb-6 flex items-center justify-between"><div><h2 className="text-xl font-bold text-white">{editingId ? "Edit Category" : "Add Category"}</h2><p className="mt-1 text-sm text-[#777780]">Enter category details below.</p></div><button type="button" onClick={() => setModalOpen(false)} className="rounded-xl p-2 text-[#9999A3] hover:bg-white/[0.06] hover:text-white"><X size={19} /></button></div>
                    {notice && <p className="mb-4 rounded-xl border border-red-500/20 bg-red-500/[0.06] p-3 text-sm text-red-300">{notice}</p>}
                    <label className="mb-2 block text-sm text-[#B7B7C0]">Category name *</label>
                    <input required maxLength={60} value={form.name} onChange={(event) => setForm({ ...form, name: event.target.value })} placeholder="e.g. Digital Art" className="mb-5 w-full rounded-xl border border-white/[0.08] bg-black/20 px-4 py-3 text-sm text-white outline-none focus:border-[#A259FF]/50" />
                    <label className="mb-2 block text-sm text-[#B7B7C0]">Description</label>
                    <textarea maxLength={500} rows={3} value={form.description} onChange={(event) => setForm({ ...form, description: event.target.value })} placeholder="Describe this category..." className="mb-5 w-full resize-y rounded-xl border border-white/[0.08] bg-black/20 px-4 py-3 text-sm text-white outline-none focus:border-[#A259FF]/50" />
                    <label className="mb-2 block text-sm text-[#B7B7C0]">Status</label>
                    <select value={form.status} onChange={(event) => setForm({ ...form, status: event.target.value })} className="mb-6 w-full rounded-xl border border-white/[0.08] bg-[#111114] px-4 py-3 text-sm text-white outline-none focus:border-[#A259FF]/50"><option value="active">Active</option><option value="inactive">Inactive</option></select>
                    <div className="flex justify-end gap-3"><button type="button" onClick={() => setModalOpen(false)} className="rounded-xl border border-white/[0.08] px-4 py-2.5 text-sm text-[#B7B7C0] hover:bg-white/[0.05]">Cancel</button><button disabled={saving} type="submit" className="rounded-xl bg-[#A259FF] px-5 py-2.5 text-sm font-semibold text-white hover:bg-[#9147E8] disabled:opacity-60">{saving ? "Saving..." : editingId ? "Save Changes" : "Create Category"}</button></div>
                </motion.form>
            </div>}
        </div>
    );
};

export default AdminCategories;
