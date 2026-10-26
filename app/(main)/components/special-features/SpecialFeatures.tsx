// SpecialFeatures.tsx
"use client";

import type { ReactNode } from "react";
import Image from "next/image";
import styles from "./SpecialFeatures.module.css";

type Feature = { title: string; description: string; icon: ReactNode };

const iconProps = {
  viewBox: "0 0 32 32",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 2,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  "aria-hidden": true,
  width: 30,
  height: 30,
};

const SpeedIcon = (
  <svg {...iconProps}>
    <path d="M4 24a12 12 0 1 1 24 0z" />
    <path d="M16 24l5-9" />
    <path d="M8.5 17.5l1.5.9M16 11v1.8M23.5 17.5l-1.5.9" />
  </svg>
);

const TvIcon = (
  <svg {...iconProps}>
    <rect x="4" y="10" width="24" height="16" rx="2.5" />
    <path d="M11 4l5 6 5-6" />
    <path d="M9 14v8M23 15h.01M23 20h.01" />
  </svg>
);

const PlansIcon = (
  <svg {...iconProps}>
    <rect x="5" y="4" width="22" height="24" rx="3" />
    <path d="M9 10l1.5 1.5L13 9M9 16l1.5 1.5L13 15M16 10h7M16 16h7M9 22h5" />
    <circle cx="23" cy="23" r="4.5" fill="var(--plans-clock-bg, transparent)" />
    <path d="M23 21v2.2l1.4.8" />
  </svg>
);

const FEATURES: Feature[] = [
  {
    title: "Ultra-Fast Fiber Optic Internet",
    description:
      "Experience lightning-speed connectivity with our advanced fiber-optic network.",
    icon: SpeedIcon,
  },
  {
    title: "Ultra Fast FTP",
    description:
      "With enterprise-grade FTP infrastructure, we deliver 99.9% uptime, ensuring your internet never slows down—whether for work, education, or entertainment.",
    icon: TvIcon,
  },
  {
    title: "Flexible & Affordable Plans",
    description:
      "Choose from customized, budget-friendly packages designed for homes and businesses. No hidden fees—just high-speed internet at the best price!",
    icon: PlansIcon,
  },
];

const CLOUD_SCALE = "scale(0.0014025 0.0022222)";

export default function SpecialFeatures({
  features = FEATURES,
  mainImage = "/img/internet.jpg",
  mainImageAlt = "Two colleagues and a friend looking at a laptop together",
}: {
  features?: Feature[];
  mainImage?: string;
  mainImageAlt?: string;
}) {
  return (
    <section className={styles.section}>
      {/* Background SVG Network Mesh */}
      <div className={styles.bgOverlay} aria-hidden="true">
        <svg
          viewBox="0 0 1440 800"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="xMidYMid slice"
          className={styles.bgSvg}
        >
          <g stroke="currentColor" strokeWidth="1" strokeOpacity="0.15">
            <path d="M-100 200 L300 -50 L700 250 L1200 -100 L1600 300" />
            <path d="M-50 500 L250 200 L600 650 L1100 350 L1500 700" />
            <path d="M100 850 L450 400 L850 750 L1300 450 L1650 850" />

            <path d="M300 -50 L250 200 L450 400" />
            <path d="M700 250 L600 650 L850 750" />
            <path d="M1200 -100 L1100 350 L1300 450" />

            <path d="M-100 200 L250 200 L300 -50" />
            <path d="M700 250 L1100 350 L1200 -100" />
            <path d="M600 650 L1300 450 L850 750" />
          </g>
          <g fill="currentColor" fillOpacity="0.25">
            <circle cx="300" cy="-50" r="3" />
            <circle cx="700" cy="250" r="4" />
            <circle cx="1200" cy="-100" r="3" />
            <circle cx="250" cy="200" r="3.5" />
            <circle cx="600" cy="650" r="4.5" />
            <circle cx="1100" cy="350" r="3" />
            <circle cx="450" cy="400" r="4" />
            <circle cx="850" cy="750" r="3.5" />
            <circle cx="1300" cy="450" r="4" />
          </g>
        </svg>
      </div>

      {/* ClipPath Defs */}
      <svg
        width="0"
        height="0"
        style={{ position: "absolute", pointerEvents: "none" }}
        aria-hidden="true"
      >
        <defs>
          <clipPath id="sf-cloud-clip" clipPathUnits="objectBoundingBox">
            <circle transform={CLOUD_SCALE} cx="148" cy="302" r="148" />
            <circle transform={CLOUD_SCALE} cx="275" cy="156" r="131" />
            <circle transform={CLOUD_SCALE} cx="464" cy="130" r="130" />
            <circle transform={CLOUD_SCALE} cx="565" cy="303" r="148" />
            <rect transform={CLOUD_SCALE} x="128" y="175" width="435" height="275" />
          </clipPath>
        </defs>
      </svg>

      <div className={styles.container}>
        <header className={styles.header}>
          <p className={styles.eyebrow}>
            <span aria-hidden="true" className={styles.badge} />
            Our Facility
            <span aria-hidden="true" className={styles.badge} />
          </p>

          <h2 className={styles.title}>
            Our Exclusive{" "}
            <span className={styles.accent}>
              Features
              <svg
                viewBox="0 0 200 8"
                preserveAspectRatio="none"
                aria-hidden="true"
                className={styles.underline}
              >
                <path
                  fill="currentColor"
                  d="M0 4.6C0 3 6 2.2 12 1.8 45 .4 90 0 125 0c25 0 55 .6 75 2.2 0 .4-1 .7-2 .8-33 .4-63 1-90 1.7C70 6 40 7.4 12 8 5 8 0 6.8 0 4.6Z"
                />
              </svg>
            </span>
          </h2>
        </header>

        <div className={styles.grid}>
          <ul className={styles.list}>
            {features.map((f) => (
              <li key={f.title} className={styles.item}>
                <span className={styles.icon}>{f.icon}</span>
                <div>
                  <h3 className={styles.itemTitle}>{f.title}</h3>
                  <p className={styles.itemText}>{f.description}</p>
                </div>
              </li>
            ))}
          </ul>

          <div className={styles.media}>
            <div className={styles.cloud}>
              <Image
                src={mainImage}
                alt={mainImageAlt}
                fill
                loading="eager"
                sizes="(min-width: 56rem) 30rem, 90vw"
                className={styles.cover}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}