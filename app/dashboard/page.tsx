'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function DashboardPage() {
  const [stats, setStats] = useState({
    ordersCount: 0,
    plansCount: 0,
    role: 'Loading...',
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchDashboardStats() {
      try {
        const [ordersRes, plansRes, userRes] = await Promise.all([
          fetch('/api/orders'),
          fetch('/api/plans'),
          fetch('/api/auth/me'),
        ]);

        const ordersData = await ordersRes.json();
        const plansData = await plansRes.json();
        const userData = await userRes.json();

        setStats({
          ordersCount: ordersData.success ? ordersData.data.length : 0,
          plansCount: plansData.success ? plansData.data.length : 0,
          role: userData.role || 'user',
        });
      } catch (err) {
        console.error('Failed to load dashboard metrics');
      } finally {
        setLoading(false);
      }
    }
    fetchDashboardStats();
  }, []);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-slate-100">Dashboard Overview</h1>
        <p className="text-sm text-slate-400 mt-1">Welcome back! Here is a summary of your system metrics.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="rounded-2xl border border-slate-800 bg-slate-900/40 p-6 backdrop-blur-xl">
          <p className="text-xs uppercase tracking-wider text-slate-400 font-medium">Customer Orders</p>
          <p className="text-3xl font-bold text-slate-100 mt-2">
            {loading ? <span className="animate-pulse text-slate-600">...</span> : stats.ordersCount}
          </p>
        </div>

        <div className="rounded-2xl border border-slate-800 bg-slate-900/40 p-6 backdrop-blur-xl">
          <p className="text-xs uppercase tracking-wider text-slate-400 font-medium">Active Pricing Plans</p>
          <p className="text-3xl font-bold text-slate-100 mt-2">
            {loading ? <span className="animate-pulse text-slate-600">...</span> : stats.plansCount}
          </p>
        </div>

        <div className="rounded-2xl border border-slate-800 bg-slate-900/40 p-6 backdrop-blur-xl">
          <p className="text-xs uppercase tracking-wider text-slate-400 font-medium">Account Role</p>
          <p className="text-3xl font-bold text-slate-100 mt-2 capitalize">
            {loading ? <span className="animate-pulse text-slate-600">...</span> : stats.role}
          </p>
        </div>
      </div>

      {stats.role === 'admin' && (
        <div className="flex gap-4 pt-4">
          <Link
            href="/dashboard/orders"
            className="rounded-xl bg-slate-100 px-5 py-2.5 text-sm font-semibold text-slate-950 hover:bg-slate-200 transition"
          >
            View Customer Orders
          </Link>
          <Link
            href="/dashboard/plans"
            className="rounded-xl border border-slate-800 bg-slate-900 px-5 py-2.5 text-sm font-semibold text-slate-200 hover:bg-slate-800 transition"
          >
            Manage Plans
          </Link>
        </div>
      )}
    </div>
  );
}