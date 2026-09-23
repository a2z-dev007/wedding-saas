"use client";

import { useState } from "react";
import { CheckCircle, Clock, ArrowsClockwise, CreditCard, ShieldCheck } from "@phosphor-icons/react";
import { DoubleBezelCard } from "@/components/ui/double-bezel-card";
import { formatDate } from "@/lib/utils";

interface OrderItem {
  id: string;
  templateId: string;
  amountPaise: number;
  currency: string;
  status: string; // "paid" | "pending" | "failed"
  razorpayOrderId?: string;
  razorpayPaymentId?: string;
  createdAt: string;
  user?: {
    id: string;
    email: string;
    name?: string;
    phone?: string;
  };
  invitations?: Array<{
    id: string;
    slug: string;
    brideName: string;
    groomName: string;
    isPublished: boolean;
  }>;
}

interface AdminOrdersTableProps {
  orders: OrderItem[];
  onRefresh: () => void;
}

export function AdminOrdersTable({ orders, onRefresh }: AdminOrdersTableProps) {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [updatingId, setUpdatingId] = useState<string | null>(null);

  const filtered = orders.filter((o) => {
    if (statusFilter !== "all" && o.status !== statusFilter) return false;
    if (search.trim()) {
      const q = search.toLowerCase();
      const matchPayer = o.user?.email.toLowerCase().includes(q) || (o.user?.name && o.user.name.toLowerCase().includes(q));
      const matchPayId = (o.razorpayPaymentId || "").toLowerCase().includes(q);
      const matchOrderId = (o.razorpayOrderId || "").toLowerCase().includes(q);
      if (!matchPayer && !matchPayId && !matchOrderId) return false;
    }
    return true;
  });

  const totalPaidRevenue = orders
    .filter((o) => o.status === "paid")
    .reduce((sum, o) => sum + (o.amountPaise || 149900) / 100, 0);

  const handleManualUnlock = async (orderId: string) => {
    if (!confirm("Are you sure you want to manually mark this order as PAID and unlock linked wedding invitations?")) {
      return;
    }

    setUpdatingId(orderId);
    try {
      const res = await fetch("/api/admin/orders", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          orderId,
          status: "paid",
          unlockLinkedInvitations: true,
        }),
      });
      if (res.ok) {
        onRefresh();
      }
    } catch (err) {
      console.error("Failed to update order:", err);
    } finally {
      setUpdatingId(null);
    }
  };

  return (
    <div className="space-y-4">
      {/* Revenue Snapshot Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <DoubleBezelCard className="bg-white border-stone-200 p-4">
          <span className="text-[10px] uppercase font-bold text-stone-400 tracking-wider">
            Total Verified Revenue
          </span>
          <h3 className="text-2xl font-bold text-emerald-700 mt-1 font-mono">
            ₹{totalPaidRevenue.toLocaleString("en-IN")}
          </h3>
          <span className="text-[10px] text-stone-400">Razorpay standard fee: 2%</span>
        </DoubleBezelCard>

        <DoubleBezelCard className="bg-white border-stone-200 p-4">
          <span className="text-[10px] uppercase font-bold text-stone-400 tracking-wider">
            Paid Transactions
          </span>
          <h3 className="text-2xl font-bold text-stone-900 mt-1 font-mono">
            {orders.filter((o) => o.status === "paid").length} / {orders.length}
          </h3>
          <span className="text-[10px] text-stone-400">Total processed checkouts</span>
        </DoubleBezelCard>

        <DoubleBezelCard className="bg-white border-stone-200 p-4">
          <span className="text-[10px] uppercase font-bold text-stone-400 tracking-wider">
            Average Order Value (AOV)
          </span>
          <h3 className="text-2xl font-bold text-stone-900 mt-1 font-mono">
            ₹1,499
          </h3>
          <span className="text-[10px] text-stone-400">Fixed template license</span>
        </DoubleBezelCard>
      </div>

      {/* Controls */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search by Payment ID, Order ID, customer email..."
          className="w-full sm:w-80 px-3.5 py-2 rounded-xl border border-stone-300 text-xs bg-white focus:outline-none focus:border-amber-500 text-stone-900"
        />

        <div className="flex items-center gap-2">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-3 py-2 rounded-xl border border-stone-300 text-xs bg-white text-stone-700 font-medium"
          >
            <option value="all">All Transactions ({orders.length})</option>
            <option value="paid">Paid &amp; Success</option>
            <option value="pending">Pending Checkout</option>
          </select>

          <button
            onClick={onRefresh}
            className="p-2 rounded-xl border border-stone-300 bg-white hover:bg-stone-100 text-stone-600 transition"
            title="Refresh transactions"
          >
            <ArrowsClockwise size={16} />
          </button>
        </div>
      </div>

      {/* Orders Table */}
      <DoubleBezelCard className="p-0 overflow-hidden bg-white border-stone-200">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-stone-800">
            <thead className="bg-stone-50/80 border-b border-stone-200 text-[10px] uppercase font-bold text-stone-400 tracking-wider">
              <tr>
                <th className="py-3.5 px-4">Transaction Details</th>
                <th className="py-3.5 px-4">Customer Account</th>
                <th className="py-3.5 px-4">Amount</th>
                <th className="py-3.5 px-4">Payment Status</th>
                <th className="py-3.5 px-4">Timestamp</th>
                <th className="py-3.5 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100">
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-8 text-center text-stone-400 font-mono text-xs">
                    NO PAYMENT TRANSACTIONS RECORDED
                  </td>
                </tr>
              ) : (
                filtered.map((order) => {
                  const amtINR = (order.amountPaise || 149900) / 100;

                  return (
                    <tr key={order.id} className="hover:bg-amber-50/20 transition-colors">
                      <td className="py-3.5 px-4">
                        <div className="font-bold text-stone-900 font-mono text-xs">
                          {order.razorpayPaymentId || order.razorpayOrderId || `ORD-${order.id.slice(0, 8)}`}
                        </div>
                        <div className="text-[10px] text-stone-400 mt-0.5">
                          Theme: {order.templateId.replace(/-/g, " ")}
                        </div>
                        {order.invitations && order.invitations.length > 0 && (
                          <div className="text-[10px] text-amber-700 font-medium">
                            Linked: /{order.invitations[0].slug}
                          </div>
                        )}
                      </td>

                      <td className="py-3.5 px-4">
                        {order.user ? (
                          <div>
                            <span className="font-medium text-stone-900 block">{order.user.email}</span>
                            <span className="text-[10px] text-stone-400">{order.user.name || "Customer"}</span>
                          </div>
                        ) : (
                          <span className="text-[10px] text-stone-400 italic">Guest Checkout</span>
                        )}
                      </td>

                      <td className="py-3.5 px-4 font-mono font-bold text-stone-900">
                        ₹{amtINR.toLocaleString("en-IN")}
                      </td>

                      <td className="py-3.5 px-4">
                        {order.status === "paid" ? (
                          <span className="inline-flex items-center gap-1 text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200">
                            <CheckCircle size={12} weight="fill" className="text-emerald-600" />
                            <span>Paid &amp; Verified</span>
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-amber-50 text-amber-800 border border-amber-200">
                            <Clock size={12} weight="fill" className="text-amber-600" />
                            <span>Pending Checkout</span>
                          </span>
                        )}
                      </td>

                      <td className="py-3.5 px-4 text-stone-500 font-mono text-[11px]">
                        {formatDate(order.createdAt)}
                      </td>

                      <td className="py-3.5 px-4 text-right">
                        {order.status !== "paid" && (
                          <button
                            onClick={() => handleManualUnlock(order.id)}
                            disabled={updatingId === order.id}
                            className="px-2.5 py-1.5 rounded-lg border border-emerald-300 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 text-[10px] font-bold inline-flex items-center gap-1 transition"
                            title="Manually verify and mark as paid"
                          >
                            <ShieldCheck size={12} weight="bold" />
                            <span>Mark Paid</span>
                          </button>
                        )}
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </DoubleBezelCard>
    </div>
  );
}
