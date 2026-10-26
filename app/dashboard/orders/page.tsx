'use client';

import { useState, useEffect } from 'react';

type Order = {
  _id: string;
  planName: string;
  price: number;
  customerName: string;
  email: string;
  phone: string;
  address: string;
  status: string;
  createdAt: string;
};

export default function OrdersDashboardPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [updatingId, setUpdatingId] = useState<string | null>(null);

  const fetchOrders = async () => {
    try {
      const res = await fetch('/api/orders');
      const data = await res.json();
      if (data.success) setOrders(data.data);
    } catch (err) {
      console.error('Failed to fetch orders');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const handleStatusChange = async (orderId: string, newStatus: string) => {
    setUpdatingId(orderId);
    try {
      const res = await fetch(`/api/orders/${orderId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to update status');

      // Update local state smoothly
      setOrders((prev) =>
        prev.map((ord) => (ord._id === orderId ? { ...ord, status: newStatus } : ord))
      );
    } catch (err: any) {
      alert(err.message);
    } finally {
      setUpdatingId(null);
    }
  };

  return (
    <div className="max-w-6xl space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-100">Customer Plan Orders</h1>
        <p className="text-sm text-slate-400 mt-1">Manage all subscription requests and update order statuses.</p>
      </div>

      <div className="rounded-2xl border border-slate-800 bg-slate-900/40 p-6 backdrop-blur-xl">
        {loading ? (
          <p className="text-sm text-slate-400 animate-pulse">Loading orders...</p>
        ) : orders.length === 0 ? (
          <p className="text-sm text-slate-400">No orders found.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-slate-300">
              <thead className="border-b border-slate-800 text-xs uppercase text-slate-400">
                <tr>
                  <th className="py-3 px-4">Customer</th>
                  <th className="py-3 px-4">Plan & Price</th>
                  <th className="py-3 px-4">Contact</th>
                  <th className="py-3 px-4">Address</th>
                  <th className="py-3 px-4">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800">
                {orders.map((order) => (
                  <tr key={order._id} className="hover:bg-slate-800/40">
                    <td className="py-4 px-4 font-semibold text-slate-100">{order.customerName}</td>
                    <td className="py-4 px-4">
                      {order.planName} <br />
                      <span className="text-xs text-[#ff6600] font-bold">৳{order.price}/mo</span>
                    </td>
                    <td className="py-4 px-4 text-xs">
                      {order.phone} <br />
                      <span className="text-slate-400">{order.email}</span>
                    </td>
                    <td className="py-4 px-4 text-xs max-w-xs truncate">{order.address}</td>
                    <td className="py-4 px-4">
                      <select
                        value={order.status}
                        disabled={updatingId === order._id}
                        onChange={(e) => handleStatusChange(order._id, e.target.value)}
                        className={`rounded-xl border px-3 py-1.5 text-xs font-semibold focus:outline-none transition cursor-pointer ${
                          order.status === 'Approved'
                            ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400'
                            : order.status === 'Cancelled'
                            ? 'bg-red-500/10 border-red-500/30 text-red-400'
                            : 'bg-amber-500/10 border-amber-500/30 text-amber-400'
                        }`}
                      >
                        <option value="Pending" className="bg-slate-900 text-slate-200">Pending</option>
                        <option value="Approved" className="bg-slate-900 text-slate-200">Approved</option>
                        <option value="Cancelled" className="bg-slate-900 text-slate-200">Cancelled</option>
                      </select>
                      {updatingId === order._id && (
                        <span className="text-[10px] text-slate-500 ml-2 animate-pulse">Updating...</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}