"use client";

import { useState, useEffect, type CSSProperties } from "react";
import Image from "next/image";
import { Outfit } from "next/font/google";
import styles from "./PricingPlan.module.css";

const outfit = Outfit({ subsets: ["latin"], display: "swap" });

type Plan = {
  _id?: string;
  id: string;
  name: string;
  price: number;
  image: string;
  features: string[];
};

const step = (i: number) => ({ "--i": i }) as CSSProperties;

function ArrowIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={3} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className="size-3">
      <path d="m9 5 7 7-7 7" />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={4} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className="size-3.5 shrink-0 text-[#ff6600]">
      <path d="m4 12.5 5.5 5.5L20 6.5" />
    </svg>
  );
}

export default function PricingPlans() {
  const [plans, setPlans] = useState<Plan[]>([]);
  const [showAll, setShowAll] = useState(false);
  const [loading, setLoading] = useState(true);

  // Modal State
  const [selectedPlan, setSelectedPlan] = useState<Plan | null>(null);
  const [formData, setFormData] = useState({ customerName: "", email: "", phone: "", address: "" });
  const [submitting, setSubmitting] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");

  useEffect(() => {
    fetch("/api/plans")
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          // Price low to high sorting
          const sortedPlans = data.data.sort((a: Plan, b: Plan) => a.price - b.price);
          setPlans(sortedPlans);
        }
      })
      .finally(() => setLoading(false));
  }, []);

  const handleOrderSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedPlan) return;
    setSubmitting(true);

    try {
      const res = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          planId: selectedPlan.id,
          planName: selectedPlan.name,
          price: selectedPlan.price,
          ...formData,
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to submit order");

      setSuccessMsg("Plan ordered successfully! We will contact you soon.");
      setTimeout(() => {
        setSelectedPlan(null);
        setSuccessMsg("");
        setFormData({ customerName: "", email: "", phone: "", address: "" });
      }, 2500);
    } catch (err: any) {
      alert(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return <div className="py-16 text-center text-neutral-500">Loading plans...</div>;

  const displayedPlans = showAll ? plans : plans.slice(0, 3);

  return (
    <section className={`${styles.section} ${outfit.className} mx-auto w-full max-w-5xl px-4 py-16`}>
      {/* Header section */}
      <header className="mb-8">
        <p className="mb-2 flex items-center gap-2 text-xs font-bold uppercase tracking-wide text-[#ff6600]">
          <span aria-hidden="true" className={styles.badge} />
          Our Best Plan
        </p>
        <h2 className="text-4xl font-bold text-[#1c3a1f] md:text-5xl">
          Find Your <span className="text-[#ff6600]">Perfect Plan</span>
        </h2>
      </header>

      {/* Plans List */}
      <div className="space-y-5">
        {displayedPlans.map((plan) => (
          <article key={plan._id || plan.id} className={styles.card}>
            <div className="flex flex-col items-center gap-6 px-8 py-8 md:flex-row md:justify-between md:px-12">
              <div className="flex flex-col gap-3">
                <div className="relative h-20 w-48 overflow-hidden rounded-2xl">
                  <Image src={plan.image} alt={plan.name} fill sizes="192px" className="object-cover" />
                </div>
                <h3 className={`${styles.title} text-lg font-semibold text-[#1c3a1f]`} style={step(4)}>
                  {plan.name}
                </h3>
              </div>

              <ul className="space-y-2 text-sm">
                {plan.features.map((f, i) => (
                  <li key={f} className={`${styles.feature} flex items-center gap-2 text-neutral-600`} style={step(i)}>
                    <CheckIcon />
                    {f}
                  </li>
                ))}
              </ul>

              <div className="flex size-32 shrink-0 flex-col items-center justify-center rounded-full bg-white">
                <span className="text-4xl font-semibold text-[#ff6600]">৳{plan.price}</span>
                <span className="text-xs font-medium text-neutral-600">/ Month</span>
              </div>

              <button
                type="button"
                onClick={() => setSelectedPlan(plan)}
                className={`${styles.cta} inline-flex items-center gap-2 rounded-md border border-[#ff6600] px-5 py-2 text-sm font-semibold text-[#ff6600]`}
                style={step(2)}
              >
                Choose Plan
                <ArrowIcon />
              </button>
            </div>
          </article>
        ))}
      </div>

      {/* View All Button - Bottom Center */}
      {plans.length > 3 && (
        <div className="mt-8 flex justify-center">
          <button type="button" onClick={() => setShowAll((prev) => !prev)} className={styles.viewAll}>
            {showAll ? "Show Less Plans" : "View All Plans"}
            <ArrowIcon />
          </button>
        </div>
      )}

      {/* Redesigned Checkout Modal */}
      {selectedPlan && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-md transition-all duration-300">
          <div className="w-full max-w-lg transform overflow-hidden rounded-3xl bg-white shadow-2xl transition-all animate-in fade-in zoom-in-95 duration-200">
            
            {/* Modal Header */}
            <div className="flex items-center justify-between border-b border-neutral-100 bg-[#f9fafb] px-6 py-5">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-[#ff6600]">Secure Checkout</span>
                <h3 className="text-xl font-bold text-[#1c3a1f]">Subscribe to {selectedPlan.name}</h3>
              </div>
              <button 
                onClick={() => setSelectedPlan(null)} 
                className="grid h-9 w-9 place-items-center rounded-full bg-neutral-200/60 text-neutral-600 transition-colors hover:bg-neutral-200 hover:text-black"
                aria-label="Close modal"
              >
                ✕
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6">
              {successMsg ? (
                <div className="my-8 rounded-2xl bg-emerald-50 p-6 text-center">
                  <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-emerald-500 text-white shadow-lg">
                    ✓
                  </div>
                  <h4 className="text-lg font-bold text-emerald-800">Order Successful!</h4>
                  <p className="mt-1 text-sm font-medium text-emerald-600">{successMsg}</p>
                </div>
              ) : (
                <form onSubmit={handleOrderSubmit} className="space-y-4">
                  
                  {/* Selected Plan Summary Banner */}
                  <div className="flex items-center justify-between rounded-2xl bg-orange-50/60 border border-orange-100 p-4">
                    <div className="flex items-center gap-3">
                      <div className="relative h-12 w-16 overflow-hidden rounded-xl">
                        <Image src={selectedPlan.image} alt={selectedPlan.name} fill className="object-cover" />
                      </div>
                      <div>
                        <h4 className="text-sm font-bold text-[#1c3a1f]">{selectedPlan.name}</h4>
                        <span className="text-xs text-neutral-500">Monthly Broadband Package</span>
                      </div>
                    </div>
                    <span className="text-lg font-bold text-[#ff6600]">৳{selectedPlan.price}<span className="text-xs font-normal text-neutral-500">/mo</span></span>
                  </div>

                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div>
                      <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-neutral-600">Full Name</label>
                      <input
                        type="text"
                        required
                        value={formData.customerName}
                        onChange={(e) => setFormData({ ...formData, customerName: e.target.value })}
                        className="w-full rounded-xl border border-neutral-200 bg-neutral-50/50 px-4 py-2.5 text-sm text-black transition-colors focus:border-[#ff6600] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#ff6600]/20"
                        placeholder="John Doe"
                      />
                    </div>
                    <div>
                      <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-neutral-600">Email Address</label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full rounded-xl border border-neutral-200 bg-neutral-50/50 px-4 py-2.5 text-sm text-black transition-colors focus:border-[#ff6600] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#ff6600]/20"
                        placeholder="john@example.com"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-neutral-600">Phone Number</label>
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full rounded-xl border border-neutral-200 bg-neutral-50/50 px-4 py-2.5 text-sm text-black transition-colors focus:border-[#ff6600] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#ff6600]/20"
                      placeholder="017XXXXXXXX"
                    />
                  </div>

                  <div>
                    <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-neutral-600">Installation Address</label>
                    <textarea
                      required
                      rows={2}
                      value={formData.address}
                      onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                      className="w-full rounded-xl border border-neutral-200 bg-neutral-50/50 px-4 py-2.5 text-sm text-black transition-colors focus:border-[#ff6600] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#ff6600]/20"
                      placeholder="House, Road, Area, City"
                    />
                  </div>

                  <div className="flex items-center justify-between border-t border-neutral-100 pt-4 mt-2">
                    <div>
                      <span className="text-xs text-neutral-500 block">Total Payable</span>
                      <span className="text-xl font-bold text-[#1c3a1f]">৳{selectedPlan.price} <span className="text-xs font-normal text-neutral-500">/mo</span></span>
                    </div>
                    <button
                      type="submit"
                      disabled={submitting}
                      className="rounded-xl bg-[#ff6600] px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-orange-500/25 transition-all hover:bg-[#e05500] hover:shadow-orange-500/40 disabled:opacity-50"
                    >
                      {submitting ? "Processing..." : "Confirm & Order"}
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}