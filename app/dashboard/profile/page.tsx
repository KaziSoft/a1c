'use client';

import { useState, useEffect } from 'react';

export default function ProfilePage() {
  const [user, setUser] = useState({ name: '', email: '', role: '' });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProfile() {
      try {
        const res = await fetch('/api/auth/me');
        if (res.ok) {
          const data = await res.json();
          setUser(data);
        }
      } catch (e) {
        console.error('Failed to load profile');
      } finally {
        setLoading(false);
      }
    }
    fetchProfile();
  }, []);

  if (loading) {
    return <div className="text-slate-400 text-sm">Loading user profile...</div>;
  }

  return (
    <div className="max-w-3xl space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-100">Your Profile</h1>
        <p className="text-sm text-slate-400 mt-1">Manage and view your account information.</p>
      </div>

      <div className="rounded-2xl border border-slate-800 bg-slate-900/40 p-6 backdrop-blur-xl space-y-6">
        <div className="flex items-center gap-4 border-b border-slate-800 pb-6">
          <div className="h-16 w-16 rounded-full bg-gradient-to-tr from-indigo-600 to-violet-600 flex items-center justify-center text-xl font-bold text-white shadow-lg">
            {user.name ? user.name.split(' ').map((n) => n[0]).join('').toUpperCase() : 'U'}
          </div>
          <div>
            <h2 className="text-lg font-semibold text-slate-100">{user.name}</h2>
            <p className="text-sm text-indigo-400 capitalize">{user.role} Account</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-medium uppercase tracking-wider text-slate-400 mb-1">
              Full Name
            </label>
            <div className="rounded-xl border border-slate-800 bg-slate-950 px-4 py-3 text-slate-200 text-sm">
              {user.name}
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium uppercase tracking-wider text-slate-400 mb-1">
              Email Address
            </label>
            <div className="rounded-xl border border-slate-800 bg-slate-950 px-4 py-3 text-slate-200 text-sm">
              {user.email}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}