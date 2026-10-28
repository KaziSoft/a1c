import type { ReactNode } from "react";
import Image from "next/image";
import styles from "./CeoMessage.module.css";

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

const VisionIcon = (
  <svg {...iconProps}>
    <circle cx="24" cy="24" r="10" />
    <path d="M24 10v4M24 34v4M10 24h4M34 24h4" />
    <circle cx="24" cy="24" r="4" fill="currentColor" />
  </svg>
);

const QualityIcon = (
  <svg {...iconProps}>
    <path d="M12 22l8 8 16-16" />
    <path d="M6 35h36" />
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
    width={30}
    height={30}
  >
    <path d="M12 4l9 15M36 4l-9 15M18 4l6 10 6-10" />
    <circle cx="24" cy="30" r="12" />
    <path d="M24 24l1.9 3.9 4.3.6-3.1 3 .7 4.3-3.8-2-3.8 2 .7-4.3-3.1-3 4.3-.6z" />
  </svg>
);

const HIGHLIGHTS: Feature[] = [
  {
    title: "Uncompromising Quality",
    description:
      "We believe that high-speed internet is no longer a luxury, but a fundamental utility. At A1 Communication, we engineer our network for zero lag and total reliability.",
    icon: QualityIcon,
  },
  {
    title: "Customer-First Vision",
    description:
      "Our core philosophy is centered around building long-lasting relationships with our subscribers through dedicated support and transparent services.",
    icon: VisionIcon,
  },
];

function HeroSection({ title, description }: { title: string; description: string }) {
  return (
    <div className={styles.hero}>
      <Image
        src="/img/bg-hero.jpg"
        alt="CEO message background"
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

export default function CeoMessage({
  features = HIGHLIGHTS,
  ceoImage = "/img/ceo.jpg",
  ceoImageAlt = "CEO & Founder of A1 Communication",
  officeImage = "/img/office-inset.jpg",
  officeImageAlt = "A1 Communication operations and network hub",
  years = 7,
}: {
  features?: Feature[];
  ceoImage?: string;
  ceoImageAlt?: string;
  officeImage?: string;
  officeImageAlt?: string;
  years?: number;
}) {
  return (
    <section className={styles.section}>
      <HeroSection 
        title="CEO & Founder Message"
        description="Guiding A1 Communication towards a hyper-connected future with integrity, innovation, and customer-first excellence."
      />

      <div className={styles.container}>
        {/* Left: Special Special Special layered image composition */}
        <div className={styles.media}>
          <div className={styles.glowBackdrop} />
          <div className={styles.geometricFrame} />

          <div className={styles.main}>
            <Image
              src={ceoImage}
              alt={ceoImageAlt}
              fill
              sizes="(min-width: 56rem) 22rem, 80vw"
              className={styles.cover}
              priority
            />
          </div>

          <div className={styles.inset}>
            <Image
              src={officeImage}
              alt={officeImageAlt}
              fill
              sizes="(min-width: 56rem) 13rem, 45vw"
              className={styles.cover}
            />
          </div>

          <div className={styles.experience}>
            <div className={styles.medalGlow}>{MedalIcon}</div>
            <div>
              <p className={styles.years}>{years}+ Years</p>
              <p className={styles.yearsLabel}>Excellence</p>
            </div>
          </div>
        </div>

        {/* Right: CEO Message Copy */}
        <div className={styles.content}>
          <p className={styles.eyebrow}>
            <span aria-hidden="true" className={styles.badge} />
            Leadership Perspective
          </p>

          <h2 className={styles.title}>
            Empowering Dhaka With{" "}
            <span className={styles.accent}>
              Reliable
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
            Connectivity
          </h2>

          <p className={styles.lead}>
            &ldquo;When we established A1 Communication (A1C), our vision was simple yet ambitious: to bridge the digital divide in Dhaka by delivering enterprise-grade fiber-optic broadband straight to every household and corporate desk. Today, seeing thousands of families and businesses thrive on our network inspires us to push boundaries further.&rdquo;
          </p>

          <div className={styles.ceoSignoff}>
            <h3 className={styles.ceoName}>Md. Rahim Uddin</h3>
            <p className={styles.ceoTitle}>Founder & CEO, A1 Communication</p>
          </div>

          <ul className={styles.features}>
            {features.map((f) => (
              <li key={f.title} className={styles.feature}>
                <span className={styles.featureIcon}>{f.icon}</span>
                <div>
                  <h4 className={styles.featureTitle}>{f.title}</h4>
                  <p className={styles.featureText}>{f.description}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}