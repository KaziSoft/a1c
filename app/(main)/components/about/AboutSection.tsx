import type { ReactNode } from "react";
import Image from "next/image";
import styles from "./AboutSection.module.css";

type Feature = { title: string; description: string; icon: ReactNode };

const iconProps = {
  viewBox: "0 0 48 48",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 2.5,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  "aria-hidden": true,
  width: 36,
  height: 36,
};

const GlobeIcon = (
  <svg {...iconProps}>
    <circle cx="24" cy="24" r="13" />
    <ellipse cx="24" cy="24" rx="6" ry="13" />
    <path d="M11 24h26M13 17h22M13 31h22" />
    <path d="M6 24a18 18 0 0 1 4-11M42 24a18 18 0 0 1-4 11" />
  </svg>
);

const RouterIcon = (
  <svg {...iconProps}>
    <rect x="6" y="30" width="36" height="10" rx="2" />
    <path d="M13 35h.01M19 35h.01M33 35h6M24 30v-5" />
    <path d="M17 21a10 10 0 0 1 14 0M12 16a17 17 0 0 1 24 0M22 26h4" />
  </svg>
);

const MedalIcon = (
  <svg
    viewBox="0 0 48 48"
    fill="none"
    stroke="currentColor"
    strokeWidth={2.5}
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
    width={34}
    height={34}
  >
    <path d="M12 4l9 15M36 4l-9 15M18 4l6 10 6-10" />
    <circle cx="24" cy="30" r="12" />
    <path d="M24 24l1.9 3.9 4.3.6-3.1 3 .7 4.3-3.8-2-3.8 2 .7-4.3-3.1-3 4.3-.6z" />
  </svg>
);

const FEATURES: Feature[] = [
  {
    title: "Fast Connected",
    description:
      "Experience blazing-fast internet with A1 Communication. Enjoy seamless browsing, smooth streaming, and reliable connectivity powered by our high-speed network.",
    icon: GlobeIcon,
  },
  {
    title: "Free Installations",
    description:
      "Get connected faster with A1 Communication and enjoy free installation at no additional cost. We make it easy and hassle-free to set up your high-speed internet connection.",
    icon: RouterIcon,
  },
];

const AVATARS = [
  { src: "/img/user-1.png", alt: "Customer portrait" },
  { src: "/img/user-2.png", alt: "Customer portrait" },
  { src: "/img/user-3.png", alt: "Customer portrait" },
];

function HeroSection({ title, description }: { title: string; description: string }) {
  return (
    <div className={styles.hero}>
      <Image
        src="/img/bg-hero.jpg"
        alt="About us background"
        fill
        className={styles.cover}
        priority
      />
      <div className={styles.heroOverlay} />

      <div className={styles.heroContent}>
        <h1 className={styles.heroTitle}>{title}</h1>
        <p className={styles.heroDescription}>{description}</p>
      </div>
    </div>
  );
}

export default function AboutSection({
  features = FEATURES,
  mainImage = "/img/about-main.jpg",
  mainImageAlt = "Woman using a laptop and VR headset in a modern pod chair",
  insetImage = "/img/about-inset.jpg",
  insetImageAlt = "Woman relaxing on a sofa with a phone",
  avatars = AVATARS,
  years = 7,
  extraUsers = 65,
}: {
  features?: Feature[];
  mainImage?: string;
  mainImageAlt?: string;
  insetImage?: string;
  insetImageAlt?: string;
  avatars?: { src: string; alt: string }[];
  years?: number;
  extraUsers?: number;
}) {
  return (
    <section className={styles.section}>
      <HeroSection 
        title="About Us"
        description="Empowering homes and enterprises across Dhaka with highly resilient, secure, and hyper-fast personalized broadband and dedicated internet solutions."
      />

      <div className={styles.container}>
        {/* Left: image composition */}
        <div className={styles.media}>
          <span aria-hidden="true" className={styles.arch} />

          <div className={styles.main}>
            <Image
              src={mainImage}
              alt={mainImageAlt}
              fill
              sizes="(min-width: 56rem) 20rem, 80vw"
              className={styles.cover}
              priority
            />
          </div>

          <div className={styles.inset}>
            <Image
              src={insetImage}
              alt={insetImageAlt}
              fill
              sizes="(min-width: 56rem) 12rem, 45vw"
              className={styles.cover}
            />
          </div>

          <div className={styles.experience}>
            {MedalIcon}
            <p className={styles.years}>{years} Years</p>
            <p className={styles.yearsLabel}>Working Experience</p>
          </div>
        </div>

        {/* Right: copy */}
        <div className={styles.content}>
          <p className={styles.eyebrow}>
            <span aria-hidden="true" className={styles.badge} />
            About Our Internet
          </p>

          <h2 className={styles.title}>
            Experience the Best{" "}
            <span className={styles.accent}>
              Internet
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
            </span>{" "}
            Service in Town
          </h2>

          <p className={styles.lead}>
            A1 Communication (A1C) is committed to providing fast, reliable, and high-quality fiber-optic internet connectivity to homes and businesses across Dhaka. With a BTRC-approved license and an expanding BDIX-connected network, we combine strong local infrastructure with dependable, international-standard service to ensure a fast and stable online experience.
          </p>

          <ul className={styles.features}>
            {features.map((f) => (
              <li key={f.title} className={styles.feature}>
                <span className={styles.featureIcon}>{f.icon}</span>
                <div>
                  <h3 className={styles.featureTitle}>{f.title}</h3>
                  <p className={styles.featureText}>{f.description}</p>
                </div>
              </li>
            ))}
          </ul>

          <div className={styles.social}>
            <span className={styles.pill}>Over 1 K + Happy Users</span>
            <div className={styles.avatars}>
              {avatars.map((a, i) => (
                <span key={a.src} className={styles.avatar} style={{ zIndex: avatars.length - i }}>
                  <Image src={a.src} alt={a.alt} fill sizes="40px" className={styles.cover} />
                </span>
              ))}
              <span className={`${styles.avatar} ${styles.more}`}>+{extraUsers}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}