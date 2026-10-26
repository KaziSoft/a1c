"use client";

import { useState, FormEvent } from "react";

export default function AddPlanForm({ onPlanAdded }: { onPlanAdded?: () => void }) {
  const [formData, setFormData] = useState({
    id: "",
    name: "",
    price: "",
    image: "/img/slide-01.jpg",
    features: "Bandwidth Shared (1:8 Ratio), Optical Fiber Connection, Connection Charge Free, 24/7 Customer Support",
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const res = await fetch("/api/plans", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          price: Number(formData.price),
          features: formData.features.split(",").map((f) => f.trim()),
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to add plan");

      setMessage("Plan added successfully!");
      setFormData({ id: "", name: "", price: "", image: "/img/slide-01.jpg", features: "" });
      if (onPlanAdded) onPlanAdded();
    } catch (err) {
      setMessage((err as Error).message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mx-auto max-w-lg space-y-4 rounded-xl bg-white p-6 shadow-md">
      <h3 className="text-xl font-bold text-[#1c3a1f]">Add New Pricing Plan</h3>
      
      <div>
        <label className="block text-sm font-medium">Plan ID (Unique)</label>
        <input
          type="text"
          value={formData.id}
          onChange={(e) => setFormData({ ...formData, id: e.target.value })}
          required
          className="w-full rounded border px-3 py-2"
        />
      </div>

      <div>
        <label className="block text-sm font-medium">Plan Name</label>
        <input
          type="text"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          required
          className="w-full rounded border px-3 py-2"
        />
      </div>

      <div>
        <label className="block text-sm font-medium">Price (৳)</label>
        <input
          type="number"
          value={formData.price}
          onChange={(e) => setFormData({ ...formData, price: e.target.value })}
          required
          className="w-full rounded border px-3 py-2"
        />
      </div>

      <div>
        <label className="block text-sm font-medium">Image Path</label>
        <input
          type="text"
          value={formData.image}
          onChange={(e) => setFormData({ ...formData, image: e.target.value })}
          required
          className="w-full rounded border px-3 py-2"
        />
      </div>

      <div>
        <label className="block text-sm font-medium">Features (comma separated)</label>
        <textarea
          value={formData.features}
          onChange={(e) => setFormData({ ...formData, features: e.target.value })}
          required
          className="w-full rounded border px-3 py-2"
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full rounded bg-[#ff6600] py-2 font-semibold text-white transition hover:opacity-90"
      >
        {loading ? "Adding..." : "Add Plan"}
      </button>

      {message && <p className="text-sm font-medium text-neutral-700">{message}</p>}
    </form>
  );
}