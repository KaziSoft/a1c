"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Outfit } from "next/font/google";
import styles from "./HomeInternet.module.css";

const outfit = Outfit({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

type TabKey = "popular" | "gaming";

type Plan = {
  id: number;
  speed: number;
  price: number;
};

const TABS: { key: TabKey; label: string }[] = [
  { key: "popular", label: "Popular Packages" },
  { key: "gaming", label: "Best for Gaming" },
];

const PLANS: Record<TabKey, Plan[]> = {
  popular: [
    { id: 1, speed: 25, price: 500 },
    { id: 2, speed: 35, price: 525 },
    { id: 3, speed: 40, price: 600 },
    { id: 4, speed: 25, price: 500 },
    { id: 5, speed: 35, price: 525 },
    { id: 6, speed: 40, price: 600 },
  ],
  gaming: [
    { id: 7, speed: 50, price: 500 },
    { id: 8, speed: 80, price: 525 },
    { id: 9, speed: 100, price: 600 },
  ],
};

const FEATURES = [
  "Bandwidth Shared (1:8 Ratio)",
  "Optical Fiber Connection",
  "Connection Charge Free",
  "24/7 Customer Support",
  "Public IP : Not Available",
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

// Hero Section Component
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
      {/* Background Image Container */}
      <div className="absolute inset-0 z-0 h-full w-full">
        <Image
          src={heroImage}
          alt="Home Internet Hero background"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
        {/* Dark Overlay */}
        <div className="absolute inset-0 z-1 bg-black/50" />
      </div>

      {/* Content */}
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
  requestPath?: string;
};

export default function HomeInternet({
  personImage = "/img/person-laptop.jpg",
  heroImage = "/img/bg-hero.jpg",
  requestPath = "/request-connection",
}: HomeInternetProps) {
  const [activeTab, setActiveTab] = useState<TabKey>("popular");

  return (
    <div className={`${outfit.className} min-h-screen bg-white`}>
      {/* Hero Banner Section */}
      <HeroSection
        title="Home Internet Packages"
        description="Choose high-speed optical fiber plans designed for fast browsing, seamless streaming, and gaming."
        heroImage={heroImage}
      />

      {/* Main Content Area */}
      <section className="mx-auto w-full max-w-7xl overflow-x-clip px-4 py-16 md:py-20">
        {/* Tabs */}
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

        {/* Plans */}
        <div
          role="tabpanel"
          className="mx-auto mt-12 grid max-w-[274px] grid-cols-1 gap-9 md:mt-22 md:max-w-5xl md:grid-cols-3 md:gap-7"
        >
          {PLANS[activeTab].map((plan) => (
            <article
              key={plan.id}
              className={`${styles.plan} relative mx-auto w-full max-w-[274px] md:max-w-none`}
            >
              <span className={styles.stripe} aria-hidden="true" />

              <div
                className={`${styles.shape} relative flex min-h-[290px] flex-col px-7 pb-6 pt-9`}
              >
                {/* Rising purple layer + photo */}
                <div className={styles.wipe} aria-hidden="true">
                  <Image
                    src={personImage}
                    alt=""
                    fill
                    sizes="(min-width: 768px) 33vw, 100vw"
                    className={`${styles.photo} object-cover object-[78%_100%]`}
                  />
                </div>

                {/* Speed circle */}
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

                {/* Price */}
                <h3
                  className={`${styles.t} relative z-10 mt-6 text-center text-[23px] font-semibold leading-7 text-[#203c23]`}
                >
                  ৳{plan.price} / Month
                </h3>
                <div
                  className={`${styles.rule} relative z-10 mt-3.5 h-px w-full bg-[#dbe9cc] transition-colors duration-300`}
                />

                {/* Features */}
                <ul className="relative z-10 mt-4.5 flex flex-col gap-3.5">
                  {FEATURES.map((feature) => (
                    <li
                      key={feature}
                      className={`${styles.t} flex h-5.5 items-center gap-2.5 text-[13.5px] text-[#727272]`}
                    >
                      <CheckIcon />
                      {feature}
                    </li>
                  ))}
                </ul>

                {/* Cart button + tooltip */}
                <div className="absolute bottom-6 right-7 z-20 h-12 w-12">
                  <Link
                    href={`${requestPath}?package=${plan.id}`}
                    aria-label={`Get connection – ${plan.speed} Mbps`}
                    className={`${styles.cart} peer flex h-full w-full items-center justify-center rounded-full focus-visible:outline-none`}
                  >
                    <CartIcon />
                  </Link>
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
      </section>
    </div>
  );
}