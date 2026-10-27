"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import { Outfit } from "next/font/google";
import styles from "./HomeInternet.module.css";
import FaqSection from "../faq-section/FaqSection";

const outfit = Outfit({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

type TabKey = "popular" | "gaming";

type Plan = {
  _id?: string;
  id: string;
  name: string;
  speed: number;
  price: number;
  image: string;
  features: string[];
};

const TABS: { key: TabKey; label: string }[] = [
  { key: "popular", label: "Popular Packages" },
  { key: "gaming", label: "Best for Gaming" },
];

function CheckIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-3.75 w-3.75 shrink-0 text-[#7bb436]"
      fill="none"
      stroke="currentColor"
      strokeWidth={3.4}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M3.5 12.5 9.5 18.5 20.5 6.5" />
    </svg>
  );
}

function CartIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-3.75 w-3.75"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M7 18a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm10 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4ZM1 2v2h2l3.6 7.6-1.35 2.4A2 2 0 0 0 7 17h12v-2H7.4l1.1-2h7.45a2 2 0 0 0 1.75-1.03l3.58-6.5A1 1 0 0 0 20.4 4H5.2l-.94-2H1Z" />
    </svg>
  );
}

function HeroSection({
  title,
  description,
  heroImage = "/img/bg-hero.jpg",
}: {
  title: string;
  description: string;
  heroImage?: string;
}) {
  return (
    <div className="relative h-[40vh] min-h-65 w-full overflow-hidden bg-slate-800">
      <div className="absolute inset-0 z-0 h-full w-full">
        <Image
          src={heroImage}
          alt="Home Internet Hero background"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
        <div className="absolute inset-0 z-1 bg-black/50" />
      </div>

      <div className="relative z-10 flex h-full flex-col items-center justify-center px-4 text-center">
        <h1 className="mb-4 text-2xl font-bold tracking-tight text-gray-50 sm:text-3xl md:text-5xl">
          {title}
        </h1>
        <p className="mx-auto max-w-2xl text-lg text-gray-200 md:text-xl">
          {description}
        </p>
      </div>
    </div>
  );
}

type HomeInternetProps = {
  personImage?: string;
  heroImage?: string;
};

export default function HomeInternet({
  personImage = "/img/person-laptop.jpg",
  heroImage = "/img/bg-hero.jpg",
}: HomeInternetProps) {
  const [activeTab, setActiveTab] = useState<TabKey>("popular");
  const [plans, setPlans] = useState<Plan[]>([]);
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
        if (data.success && Array.isArray(data.data)) {
          const formattedPlans = data.data.map((plan: any) => {
            const speedMatch = plan.name.match(/(\d+)\s*Mbps/i);
            const speed = speedMatch ? parseInt(speedMatch[1], 10) : 25;
            return { ...plan, speed };
          });
          setPlans(formattedPlans);
        }
      })
      .catch((err) => console.error("Failed to fetch plans", err))
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

  const popularPlans = plans.filter((p) => p.speed < 50);
  const gamingPlans = plans.filter((p) => p.speed >= 50);

  const displayedPlans = activeTab === "popular" 
    ? (popularPlans.length > 0 ? popularPlans : plans) 
    : (gamingPlans.length > 0 ? gamingPlans : plans.slice(0, 3));

  return (
    <div className={`${outfit.className} min-h-screen bg-white`}>
      <HeroSection
        title="Home Internet Packages"
        description="Choose high-speed optical fiber plans designed for fast browsing, seamless streaming, and gaming."
        heroImage={heroImage}
      />

      <section className="mx-auto w-full max-w-7xl overflow-x-clip px-4 py-16 md:py-20">
        <div
          role="tablist"
          aria-label="Package categories"
          className="mx-auto flex w-fit max-w-full items-center gap-6.25 rounded-full bg-white p-1.25 shadow-[0_6px_22px_rgba(0,0,0,0.09)]"
        >
          {TABS.map((tab) => (
            <button
              key={tab.key}
              type="button"
              role="tab"
              aria-selected={activeTab === tab.key}
              onClick={() => setActiveTab(tab.key)}
              className="cursor-pointer whitespace-nowrap rounded-full border border-[#dedede] px-4.75 py-0.75 text-[15px] font-semibold uppercase leading-6.5 text-[#7bb436] transition-colors duration-300 hover:border-[#98be69] hover:bg-[#98be69] hover:text-white focus-visible:border-[#98be69] focus-visible:bg-[#98be69] focus-visible:text-white focus-visible:outline-none sm:text-[19px]"
            >
              {tab.label}
            </button>
          ))}
        </div>

        {loading ? (
          <div className="py-20 text-center text-neutral-500">Loading packages from database...</div>
        ) : (
          <div
            role="tabpanel"
            className="mx-auto mt-12 grid max-w-[274px] grid-cols-1 gap-9 md:mt-22 md:max-w-5xl md:grid-cols-3 md:gap-7"
          >
            {displayedPlans.map((plan) => (
              <article
                key={plan._id || plan.id}
                className={`${styles.plan} relative mx-auto w-full max-w-[274px] md:max-w-none`}
              >
                <span className={styles.stripe} aria-hidden="true" />

                <div
                  className={`${styles.shape} relative flex min-h-[290px] flex-col px-7 pb-6 pt-9`}
                >
                  <div className={styles.wipe} aria-hidden="true">
                    <Image
                      src={plan.image || personImage}
                      alt=""
                      fill
                      sizes="(min-width: 768px) 33vw, 100vw"
                      className={`${styles.photo} object-cover object-[78%_100%]`}
                    />
                  </div>

                  <div
                    className={`${styles.circle} relative z-10 mx-auto flex h-32 w-32 shrink-0 flex-col items-center rounded-full bg-white pt-4`}
                  >
                    <span
                      className={`${styles.speed} text-[55px] font-bold leading-none text-[#7bb436]`}
                    >
                      {plan.speed}
                    </span>
                    <span className="mt-1 text-[13.5px] font-medium leading-4 text-[#727272]">
                      Mbps
                    </span>
                    <span className="mt-0.5 text-[8.25px] font-semibold leading-3 text-[#727272]">
                      (24 Hours || Shared)
                    </span>
                  </div>

                  <h3
                    className={`${styles.t} relative z-10 mt-6 text-center text-[23px] font-semibold leading-7 text-[#203c23]`}
                  >
                    ৳{plan.price} / Month
                  </h3>
                  <div
                    className={`${styles.rule} relative z-10 mt-3.5 h-px w-full bg-[#dbe9cc] transition-colors duration-300`}
                  />

                  <ul className="relative z-10 mt-4.5 flex flex-col gap-3.5">
                    {plan.features.map((feature) => (
                      <li
                        key={feature}
                        className={`${styles.t} flex h-5.5 items-center gap-2.5 text-[13.5px] text-[#727272]`}
                      >
                        <CheckIcon />
                        {feature}
                      </li>
                    ))}
                  </ul>

                  <div className="absolute bottom-6 right-7 z-20 h-12 w-12">
                    <button
                      type="button"
                      onClick={() => setSelectedPlan(plan)}
                      aria-label={`Get connection – ${plan.speed} Mbps`}
                      className={`${styles.cart} peer flex h-full w-full items-center justify-center rounded-full focus-visible:outline-none cursor-pointer`}
                    >
                      <CartIcon />
                    </button>
                    <span
                      aria-hidden="true"
                      className="pointer-events-none absolute right-full top-1/2 mr-1.25 -translate-y-1/2 translate-x-3 whitespace-nowrap rounded-md bg-[#7bb436] px-2.75 py-1.75 text-[12.75px] font-medium leading-5 text-white opacity-0 transition-[opacity,transform,clip-path] duration-500 ease-out [clip-path:inset(0_0_0_100%)] peer-hover:translate-x-0 peer-hover:opacity-100 peer-hover:[clip-path:inset(0)] peer-focus-visible:translate-x-0 peer-focus-visible:opacity-100 peer-focus-visible:[clip-path:inset(0)]"
                    >
                      Get Connection
                    </span>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>

      {/* Checkout Modal */}
      {selectedPlan && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm">
          <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl">
            <div className="flex items-center justify-between border-b pb-3">
              <h3 className="text-lg font-bold text-[#1c3a1f]">Subscribe to {selectedPlan.name}</h3>
              <button onClick={() => setSelectedPlan(null)} className="text-neutral-500 hover:text-black">✕</button>
            </div>

            {successMsg ? (
              <div className="my-6 rounded-xl bg-emerald-50 p-4 text-center text-sm font-medium text-emerald-600">
                {successMsg}
              </div>
            ) : (
              <form onSubmit={handleOrderSubmit} className="mt-4 space-y-4">
                <div>
                  <label className="block text-xs font-medium text-neutral-600">Full Name</label>
                  <input
                    type="text"
                    required
                    value={formData.customerName}
                    onChange={(e) => setFormData({ ...formData, customerName: e.target.value })}
                    className="w-full rounded-lg border px-3 py-2 text-sm text-black focus:outline-none focus:ring-2 focus:ring-[#7bb436]"
                    placeholder="John Doe"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-neutral-600">Email Address</label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full rounded-lg border px-3 py-2 text-sm text-black focus:outline-none focus:ring-2 focus:ring-[#7bb436]"
                    placeholder="john@example.com"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-neutral-600">Phone Number</label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full rounded-lg border px-3 py-2 text-sm text-black focus:outline-none focus:ring-2 focus:ring-[#7bb436]"
                    placeholder="017XXXXXXXX"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-neutral-600">Installation Address</label>
                  <textarea
                    required
                    rows={2}
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    className="w-full rounded-lg border px-3 py-2 text-sm text-black focus:outline-none focus:ring-2 focus:ring-[#7bb436]"
                    placeholder="House, Road, Area, City"
                  />
                </div>

                <div className="flex items-center justify-between pt-2">
                  <span className="font-semibold text-neutral-700">Total: ৳{selectedPlan.price}/mo</span>
                  <button
                    type="submit"
                    disabled={submitting}
                    className="rounded-lg bg-[#7bb436] px-5 py-2 text-sm font-semibold text-white hover:opacity-90 disabled:opacity-50 cursor-pointer"
                  >
                    {submitting ? "Submitting..." : "Confirm Order"}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
      <FaqSection/>
    </div> 
  );
}