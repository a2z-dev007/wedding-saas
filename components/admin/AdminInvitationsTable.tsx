"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Pencil,
  Eye,
  Trash,
  CheckCircle,
  Clock,
  Link as LinkIcon,
  Crown,
  ShareNetwork,
  ArrowsClockwise,
} from "@phosphor-icons/react";
import { DoubleBezelCard } from "@/components/ui/double-bezel-card";
import { formatDate } from "@/lib/utils";

interface InvitationItem {
  id: string;
  slug: string;
  templateId: string;
  brideName: string;
  groomName: string;
  weddingDate: string;
  isPublished: boolean;
  createdAt: string;
  user?: {
    id: string;
    email: string;
    name?: string;
  };
  order?: {
    id: string;
    status: string;
    amountPaise?: number;
    razorpayPaymentId?: string;
  };
  _count?: {
    guestMessages: number;
  };
}

interface AdminInvitationsTableProps {
  invitations: InvitationItem[];
  onRefresh: () => void;
}

const TEMPLATE_OPTIONS = [
  "noor-e-nikah",
  "emerald-qasr",
  "gul-e-noor",
  "azure-nikah",
  "kitab-e-nikah",
  "crimson-royale",
  "royal-lotus",
  "emerald-noir",
  "royal-elegance",
  "modern-minimal",
];

export function AdminInvitationsTable({
  invitations,
  onRefresh,
}: AdminInvitationsTableProps) {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<"all" | "paid" | "draft">("all");
  const [templateFilter, setTemplateFilter] = useState("all");
  const [updatingId, setUpdatingId] = useState<string | null>(null);

  // Filtered items
  const filtered = invitations.filter((inv) => {
    if (statusFilter === "paid" && !inv.isPublished) return false;
    if (statusFilter === "draft" && inv.isPublished) return false;
    if (templateFilter !== "all" && inv.templateId !== templateFilter) return false;

    if (search.trim()) {
      const q = search.toLowerCase();
      const matchName = `${inv.brideName} ${inv.groomName}`.toLowerCase().includes(q);
      const matchSlug = inv.slug.toLowerCase().includes(q);
      const matchEmail = inv.user?.email.toLowerCase().includes(q);
      if (!matchName && !matchSlug && !matchEmail) return false;
    }

    return true;
  });

  const handleTogglePublished = async (inv: InvitationItem) => {
    setUpdatingId(inv.id);
    try {
      const res = await fetch("/api/admin/invitations", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: inv.id,
          isPublished: !inv.isPublished,
        }),
      });
      if (res.ok) {
        onRefresh();
      }
    } catch (err) {
      console.error("Failed to toggle publication:", err);
    } finally {
      setUpdatingId(null);
    }
  };

  const handleChangeTemplate = async (id: string, newTemplateId: string) => {
    setUpdatingId(id);
    try {
      const res = await fetch("/api/admin/invitations", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id,
          templateId: newTemplateId,
        }),
      });
      if (res.ok) {
        onRefresh();
      }
    } catch (err) {
      console.error("Failed to change template:", err);
    } finally {
      setUpdatingId(null);
    }
  };

  const handleDelete = async (id: string, slug: string) => {
    if (!confirm(`Are you sure you want to permanently delete invitation /${slug}? This action cannot be undone.`)) {
      return;
    }

    setUpdatingId(id);
    try {
      const res = await fetch(`/api/admin/invitations?id=${id}`, {
        method: "DELETE",
      });
      if (res.ok) {
        onRefresh();
      }
    } catch (err) {
      console.error("Failed to delete invitation:", err);
    } finally {
      setUpdatingId(null);
    }
  };

  return (
    <div className="space-y-4">
      {/* Controls: Search and Filters */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search by couple name, slug, or user email..."
          className="w-full sm:w-80 px-3.5 py-2 rounded-xl border border-stone-300 text-xs bg-white focus:outline-none focus:border-amber-500 text-stone-900"
        />

        <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto">
          {/* Status filter */}
          <select
            value={statusFilter}
            onChange={(e: any) => setStatusFilter(e.target.value)}
            className="px-3 py-2 rounded-xl border border-stone-300 text-xs bg-white text-stone-700 font-medium"
          >
            <option value="all">All Statuses ({invitations.length})</option>
            <option value="paid">Paid & Live Only</option>
            <option value="draft">Unpaid Drafts Only</option>
          </select>

          {/* Template filter */}
          <select
            value={templateFilter}
            onChange={(e) => setTemplateFilter(e.target.value)}
            className="px-3 py-2 rounded-xl border border-stone-300 text-xs bg-white text-stone-700 font-medium"
          >
            <option value="all">All Themes</option>
            {TEMPLATE_OPTIONS.map((t) => (
              <option key={t} value={t}>
                {t.replace(/-/g, " ")}
              </option>
            ))}
          </select>

          <button
            onClick={onRefresh}
            className="p-2 rounded-xl border border-stone-300 bg-white hover:bg-stone-100 text-stone-600 transition"
            title="Refresh list"
          >
            <ArrowsClockwise size={16} />
          </button>
        </div>
      </div>

      {/* Table Container */}
      <DoubleBezelCard className="p-0 overflow-hidden bg-white border-stone-200">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-stone-800">
            <thead className="bg-stone-50/80 border-b border-stone-200 text-[10px] uppercase font-bold text-stone-400 tracking-wider">
              <tr>
                <th className="py-3.5 px-4">Couple & Slug</th>
                <th className="py-3.5 px-4">User Account</th>
                <th className="py-3.5 px-4">Template Theme</th>
                <th className="py-3.5 px-4">Status & RSVPs</th>
                <th className="py-3.5 px-4">Wedding Date</th>
                <th className="py-3.5 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100">
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-8 text-center text-stone-400 font-mono text-xs">
                    NO INVITATIONS FOUND MATCHING CRITERIA
                  </td>
                </tr>
              ) : (
                filtered.map((inv) => (
                  <tr key={inv.id} className="hover:bg-amber-50/20 transition-colors">
                    {/* Couple & Slug */}
                    <td className="py-3.5 px-4">
                      <div className="font-bold text-stone-900 text-sm">
                        {inv.brideName} & {inv.groomName}
                      </div>
                      <a
                        href={`/${inv.slug}`}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1 text-[11px] font-mono text-amber-700 hover:underline mt-0.5"
                      >
                        <LinkIcon size={12} />
                        <span>/{inv.slug}</span>
                      </a>
                    </td>

                    {/* User */}
                    <td className="py-3.5 px-4">
                      {inv.user?.email ? (
                        <div>
                          <span className="font-medium text-stone-900 block truncate max-w-[160px]">
                            {inv.user.email}
                          </span>
                          <span className="text-[10px] text-stone-400">
                            {inv.user.name || "Customer"}
                          </span>
                        </div>
                      ) : (
                        <span className="text-[10px] text-stone-400 italic">Guest Session</span>
                      )}
                    </td>

                    {/* Template Theme with live switcher */}
                    <td className="py-3.5 px-4">
                      <select
                        value={inv.templateId}
                        disabled={updatingId === inv.id}
                        onChange={(e) => handleChangeTemplate(inv.id, e.target.value)}
                        className="text-[11px] font-semibold bg-stone-50 border border-stone-200 rounded-lg px-2 py-1 text-stone-800 focus:outline-none focus:border-amber-500 cursor-pointer"
                      >
                        {TEMPLATE_OPTIONS.map((t) => (
                          <option key={t} value={t}>
                            {t.replace(/-/g, " ")}
                          </option>
                        ))}
                      </select>
                    </td>

                    {/* Status & RSVPs */}
                    <td className="py-3.5 px-4">
                      <div className="flex flex-col gap-1 items-start">
                        <button
                          onClick={() => handleTogglePublished(inv)}
                          disabled={updatingId === inv.id}
                          className={`inline-flex items-center gap-1 text-[10px] font-bold px-2.5 py-0.5 rounded-full border transition-all cursor-pointer ${
                            inv.isPublished
                              ? "bg-emerald-50 text-emerald-800 border-emerald-200 hover:bg-emerald-100"
                              : "bg-amber-50 text-amber-800 border-amber-200 hover:bg-amber-100"
                          }`}
                          title="Click to toggle Paid/Published status"
                        >
                          {inv.isPublished ? (
                            <>
                              <CheckCircle size={12} weight="fill" className="text-emerald-600" />
                              <span>Paid &amp; Live</span>
                            </>
                          ) : (
                            <>
                              <Clock size={12} weight="fill" className="text-amber-600" />
                              <span>Free Demo Draft</span>
                            </>
                          )}
                        </button>

                        <span className="text-[10px] text-stone-400 font-mono">
                          {inv._count?.guestMessages || 0} RSVPs
                        </span>
                      </div>
                    </td>

                    {/* Wedding Date */}
                    <td className="py-3.5 px-4 text-stone-600 font-mono text-[11px]">
                      {formatDate(inv.weddingDate)}
                    </td>

                    {/* Actions */}
                    <td className="py-3.5 px-4 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        {/* Edit in customizer */}
                        <Link href={`/dashboard/invitation/${inv.id}/edit`}>
                          <button
                            className="p-1.5 rounded-lg border border-stone-200 bg-stone-50 hover:bg-stone-100 text-stone-700 transition"
                            title="Edit details in Customizer"
                          >
                            <Pencil size={14} />
                          </button>
                        </Link>

                        {/* Preview live */}
                        <a
                          href={`/preview/${inv.slug}`}
                          target="_blank"
                          rel="noreferrer"
                          className="p-1.5 rounded-lg border border-stone-200 bg-stone-50 hover:bg-stone-100 text-amber-700 transition inline-block"
                          title="Preview live"
                        >
                          <Eye size={14} />
                        </a>

                        {/* Delete */}
                        <button
                          onClick={() => handleDelete(inv.id, inv.slug)}
                          disabled={updatingId === inv.id}
                          className="p-1.5 rounded-lg border border-stone-200 bg-stone-50 hover:bg-rose-50 text-stone-400 hover:text-rose-600 transition"
                          title="Delete invitation"
                        >
                          <Trash size={14} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </DoubleBezelCard>
    </div>
  );
}
