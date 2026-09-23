"use client";

import { useState } from "react";
import { Trash, Users, Plus, EnvelopeSimple, Sparkle, ArrowsClockwise } from "@phosphor-icons/react";
import { DoubleBezelCard } from "@/components/ui/double-bezel-card";
import { formatDate } from "@/lib/utils";

interface UserItem {
  id: string;
  email: string;
  name: string;
  phone?: string;
  createdAt: string;
  invitationsCount: number;
  paidInvitationsCount: number;
  totalSpendINR: number;
  invitations: any[];
}

interface AdminUsersTableProps {
  users: UserItem[];
  onRefresh: () => void;
  onCreateInviteForUser: (email: string) => void;
}

export function AdminUsersTable({
  users,
  onRefresh,
  onCreateInviteForUser,
}: AdminUsersTableProps) {
  const [search, setSearch] = useState("");
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const filtered = users.filter((u) => {
    if (!search.trim()) return true;
    const q = search.toLowerCase();
    return (
      u.email.toLowerCase().includes(q) ||
      (u.name && u.name.toLowerCase().includes(q)) ||
      (u.phone && u.phone.includes(q))
    );
  });

  const handleDeleteUser = async (id: string, email: string) => {
    if (!confirm(`Are you sure you want to permanently delete user account ${email} and all their invitations?`)) {
      return;
    }

    setDeletingId(id);
    try {
      const res = await fetch(`/api/admin/users?id=${id}`, {
        method: "DELETE",
      });
      if (res.ok) {
        onRefresh();
      }
    } catch (err) {
      console.error("Failed to delete user:", err);
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div className="space-y-4">
      {/* Controls */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search by customer email, name, phone..."
          className="w-full sm:w-80 px-3.5 py-2 rounded-xl border border-stone-300 text-xs bg-white focus:outline-none focus:border-amber-500 text-stone-900"
        />

        <div className="flex items-center gap-2">
          <span className="text-xs text-stone-500 font-mono">
            Total Users: {users.length}
          </span>
          <button
            onClick={onRefresh}
            className="p-2 rounded-xl border border-stone-300 bg-white hover:bg-stone-100 text-stone-600 transition"
            title="Refresh list"
          >
            <ArrowsClockwise size={16} />
          </button>
        </div>
      </div>

      {/* Users Table */}
      <DoubleBezelCard className="p-0 overflow-hidden bg-white border-stone-200">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-stone-800">
            <thead className="bg-stone-50/80 border-b border-stone-200 text-[10px] uppercase font-bold text-stone-400 tracking-wider">
              <tr>
                <th className="py-3.5 px-4">User Details</th>
                <th className="py-3.5 px-4">Invitations</th>
                <th className="py-3.5 px-4">Total Revenue Spend</th>
                <th className="py-3.5 px-4">Joined Date</th>
                <th className="py-3.5 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100">
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={5} className="py-8 text-center text-stone-400 font-mono text-xs">
                    NO REGISTERED USERS FOUND
                  </td>
                </tr>
              ) : (
                filtered.map((user) => (
                  <tr key={user.id} className="hover:bg-amber-50/20 transition-colors">
                    <td className="py-3.5 px-4">
                      <div className="font-bold text-stone-900 text-sm">{user.name || "Customer"}</div>
                      <div className="text-[11px] text-stone-500 font-mono">{user.email}</div>
                      {user.phone && (
                        <div className="text-[10px] text-stone-400 font-mono">Phone: {user.phone}</div>
                      )}
                    </td>

                    <td className="py-3.5 px-4">
                      <div className="flex items-center gap-1.5">
                        <span className="font-bold text-stone-900">{user.invitationsCount} Total</span>
                        {user.paidInvitationsCount > 0 && (
                          <span className="text-[10px] bg-emerald-50 text-emerald-700 font-semibold px-2 py-0.5 rounded-full border border-emerald-200">
                            {user.paidInvitationsCount} Paid
                          </span>
                        )}
                      </div>
                    </td>

                    <td className="py-3.5 px-4 font-mono font-bold text-stone-900 text-xs">
                      ₹{user.totalSpendINR.toLocaleString("en-IN")}
                    </td>

                    <td className="py-3.5 px-4 text-stone-500 font-mono text-[11px]">
                      {formatDate(user.createdAt)}
                    </td>

                    <td className="py-3.5 px-4 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          onClick={() => onCreateInviteForUser(user.email)}
                          className="px-2.5 py-1.5 rounded-lg border border-amber-300 bg-amber-50 hover:bg-amber-100 text-amber-800 text-[11px] font-bold flex items-center gap-1 transition"
                          title="Create invitation for this user"
                        >
                          <Plus size={12} weight="bold" />
                          <span>New Invite</span>
                        </button>

                        <button
                          onClick={() => handleDeleteUser(user.id, user.email)}
                          disabled={deletingId === user.id}
                          className="p-1.5 rounded-lg border border-stone-200 bg-stone-50 hover:bg-rose-50 text-stone-400 hover:text-rose-600 transition"
                          title="Delete user account"
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
