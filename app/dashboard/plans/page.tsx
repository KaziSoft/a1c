'use client';

import { useState, useEffect } from 'react';

type Plan = {
  _id?: string;
  id: string;
  name: string;
  price: number;
  image: string;
  features: string[];
};

export default function PlansManagePage() {
  const [plans, setPlans] = useState<Plan[]>([]);
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [status, setStatus] = useState<{ type: 'error' | 'success'; message: string } | null>(null);

  // Form states
  const [isEditing, setIsEditing] = useState(false);
  const [id, setId] = useState('');
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [image, setImage] = useState('/img/slide-01.jpg');
  const [features, setFeatures] = useState('Bandwidth Shared (1:8 Ratio), Optical Fiber Connection, Connection Charge Free, 24/7 Customer Support');

  const fetchPlans = async () => {
    try {
      const res = await fetch('/api/plans');
      const data = await res.json();
      if (data.success) {
        setPlans(data.data);
      }
    } catch (err) {
      console.error('Failed to fetch plans');
    } finally {
      setFetching(false);
    }
  };

  useEffect(() => {
    fetchPlans();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus(null);
    setLoading(true);

    try {
      const endpoint = isEditing ? `/api/plans/${id}` : '/api/plans';
      const method = isEditing ? 'PUT' : 'POST';

      const res = await fetch(endpoint, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id,
          name,
          price: Number(price),
          image,
          features: features.split(',').map((f) => f.trim()),
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to save plan');

      setStatus({ 
        type: 'success', 
        message: isEditing ? 'Plan updated successfully!' : 'Pricing plan created successfully!' 
      });
      
      resetForm();
      fetchPlans();
    } catch (err: any) {
      setStatus({ type: 'error', message: err.message });
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (plan: Plan) => {
    setIsEditing(true);
    setId(plan.id);
    setName(plan.name);
    setPrice(plan.price.toString());
    setImage(plan.image);
    setFeatures(plan.features.join(', '));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDelete = async (planId: string) => {
    if (!confirm('Are you sure you want to delete this plan?')) return;

    try {
      const res = await fetch(`/api/plans/${planId}`, { method: 'DELETE' });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to delete plan');

      setStatus({ type: 'success', message: 'Plan deleted successfully!' });
      fetchPlans();
    } catch (err: any) {
      setStatus({ type: 'error', message: err.message });
    }
  };

  const resetForm = () => {
    setIsEditing(false);
    setId('');
    setName('');
    setPrice('');
    setImage('/img/slide-01.jpg');
    setFeatures('Bandwidth Shared (1:8 Ratio), Optical Fiber Connection, Connection Charge Free, 24/7 Customer Support');
  };

  return (
    <div className="max-w-4xl space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-slate-100">Plan Management</h1>
        <p className="text-sm text-slate-400 mt-1">Create, edit, and manage your subscription and internet pricing packages.</p>
      </div>

      {/* Form Section */}
      <div className="rounded-2xl border border-slate-800 bg-slate-900/40 p-6 backdrop-blur-xl space-y-6">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <h2 className="text-lg font-semibold text-slate-100">
            {isEditing ? `Edit Plan: ${name}` : 'Add New Plan'}
          </h2>
          {isEditing && (
            <button
              type="button"
              onClick={resetForm}
              className="text-xs font-medium text-slate-400 hover:text-slate-200 underline"
            >
              Cancel Edit
            </button>
          )}
        </div>

        {status && (
          <div
            className={`p-3 rounded-xl border text-sm text-center ${
              status.type === 'error'
                ? 'bg-red-500/10 border-red-500/20 text-red-400'
                : 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400'
            }`}
          >
            {status.message}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium uppercase tracking-wider text-slate-400 mb-1.5">
                Plan ID (Unique Slug)
              </label>
              <input
                type="text"
                required
                disabled={isEditing}
                value={id}
                onChange={(e) => setId(e.target.value)}
                className="w-full rounded-xl border border-slate-800 bg-slate-950 px-4 py-3 text-slate-100 placeholder-slate-600 focus:border-slate-600 focus:outline-none transition text-sm disabled:opacity-50"
                placeholder="e.g. bijoy-25-mbps"
              />
            </div>

            <div>
              <label className="block text-xs font-medium uppercase tracking-wider text-slate-400 mb-1.5">
                Plan Name
              </label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full rounded-xl border border-slate-800 bg-slate-950 px-4 py-3 text-slate-100 placeholder-slate-600 focus:border-slate-600 focus:outline-none transition text-sm"
                placeholder="Bijoy-25 Mbps (Monthly Pac)"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium uppercase tracking-wider text-slate-400 mb-1.5">
                Price (৳ / Month)
              </label>
              <input
                type="number"
                required
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                className="w-full rounded-xl border border-slate-800 bg-slate-950 px-4 py-3 text-slate-100 placeholder-slate-600 focus:border-slate-600 focus:outline-none transition text-sm"
                placeholder="500"
              />
            </div>

            <div>
              <label className="block text-xs font-medium uppercase tracking-wider text-slate-400 mb-1.5">
                Image Asset Path
              </label>
              <input
                type="text"
                required
                value={image}
                onChange={(e) => setImage(e.target.value)}
                className="w-full rounded-xl border border-slate-800 bg-slate-950 px-4 py-3 text-slate-100 placeholder-slate-600 focus:border-slate-600 focus:outline-none transition text-sm"
                placeholder="/img/slide-02.jpg"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium uppercase tracking-wider text-slate-400 mb-1.5">
              Features (comma separated)
            </label>
            <textarea
              required
              rows={3}
              value={features}
              onChange={(e) => setFeatures(e.target.value)}
              className="w-full rounded-xl border border-slate-800 bg-slate-950 p-4 text-slate-100 placeholder-slate-600 focus:border-slate-600 focus:outline-none transition text-sm"
              placeholder="Bandwidth Shared (1:8 Ratio), Optical Fiber Connection..."
            />
          </div>

          <div className="flex gap-3">
            <button
              type="submit"
              disabled={loading}
              className="rounded-xl bg-slate-100 px-6 py-2.5 text-sm font-semibold text-slate-950 hover:bg-slate-200 transition duration-200 disabled:opacity-50 cursor-pointer"
            >
              {loading ? 'Saving...' : isEditing ? 'Update Plan' : 'Create Plan'}
            </button>
            {isEditing && (
              <button
                type="button"
                onClick={resetForm}
                className="rounded-xl border border-slate-800 px-6 py-2.5 text-sm font-semibold text-slate-300 hover:bg-slate-800 transition duration-200 cursor-pointer"
              >
                Cancel
              </button>
            )}
          </div>
        </form>
      </div>

      {/* Existing Plans List with Edit & Delete */}
      <div className="rounded-2xl border border-slate-800 bg-slate-900/40 p-6 backdrop-blur-xl space-y-4">
        <h2 className="text-lg font-semibold text-slate-100 border-b border-slate-800 pb-3">Existing Active Plans</h2>
        {fetching ? (
          <p className="text-sm text-slate-400 animate-pulse">Loading plans...</p>
        ) : plans.length === 0 ? (
          <p className="text-sm text-slate-400">No plans found in database.</p>
        ) : (
          <div className="space-y-3">
            {plans.map((p) => (
              <div key={p._id || p.id} className="flex items-center justify-between p-4 rounded-xl border border-slate-800 bg-slate-950/60 text-sm gap-4">
                <div>
                  <p className="font-semibold text-slate-200">{p.name}</p>
                  <p className="text-xs text-slate-400">ID: {p.id} • <span className="text-[#ff6600] font-bold">৳{p.price}/mo</span></p>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <button
                    onClick={() => handleEdit(p)}
                    className="px-3 py-1.5 rounded-lg border border-slate-800 bg-slate-900 text-xs font-medium text-slate-300 hover:bg-slate-800 transition cursor-pointer"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(p.id)}
                    className="px-3 py-1.5 rounded-lg border border-red-500/20 bg-red-500/10 text-xs font-medium text-red-400 hover:bg-red-500/20 transition cursor-pointer"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}