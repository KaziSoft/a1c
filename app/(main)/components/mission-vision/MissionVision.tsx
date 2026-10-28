import type { ReactNode } from "react";
import Image from "next/image";
import styles from "./MissionVision.module.css";

type MissionFeature = { title: string; description: string; icon: ReactNode };

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

const TargetIcon = (
  <svg {...iconProps}>
    <circle cx="24" cy="24" r="16" />
    <circle cx="24" cy="24" r="9" />
    <circle cx="24" cy="24" r="2" fill="currentColor" />
  </svg>
);

const EyeIcon = (
  <svg {...iconProps}>
    <path d="M3 24s7-13 21-13 21 13 21 13-7 13-21 13S3 24 3 24z" />
    <circle cx="24" cy="24" r="6" />
  </svg>
);

const VALUES: MissionFeature[] = [
  {
    title: "Our Mission",
    description:
      "To bridge the digital divide in Dhaka by delivering hyper-fast, reliable, and secure fiber-optic internet connectivity that empowers every home and accelerates business growth.",
    icon: TargetIcon,
  },
  {
    title: "Our Vision",
    description:
      "To become the most trusted and forward-thinking internet service provider in Bangladesh, recognized for uncompromising network stability and exceptional customer-first innovation.",
    icon: EyeIcon,
  },
];

function HeroSection({ title, description }: { title: string; description: string }) {
  return (
    <div className={styles.hero}>
      <Image
        src="/img/bg-hero.jpg"
        alt="Mission and Vision background"
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

export default function MissionVision({
  features = VALUES,
  mainImage = "/img/target.jpg",
  mainImageAlt = "Network operations and fiber infrastructure",
  insetImage = "/img/vision.jpg",
  insetImageAlt = "Connected family enjoying internet",
}: {
  features?: MissionFeature[];
  mainImage?: string;
  mainImageAlt?: string;
  insetImage?: string;
  insetImageAlt?: string;
}) {
  return (
    <section className={styles.section}>
      <HeroSection 
        title="Mission & Vision"
        description="Driving the future of digital connectivity across Dhaka with a clear purpose and unwavering commitment to excellence."
      />

      <div className={styles.container}>
        {/* Left: Completely Different Slanted / Diamond Image Composition */}
        <div className={styles.media}>
          <div className={styles.patternBackdrop} />

          {/* Primary Slanted Image */}
          <div className={styles.main}>
            <Image
              src={mainImage}
              alt={mainImageAlt}
              fill
              sizes="(min-width: 56rem) 22rem, 80vw"
              className={styles.cover}
              priority
            />
          </div>

          {/* Secondary Floating Image Badge */}
          <div className={styles.inset}>
            <Image
              src={insetImage}
              alt={insetImageAlt}
              fill
              sizes="(min-width: 56rem) 14rem, 45vw"
              className={styles.cover}
            />
          </div>

          {/* Bottom Banner Tag */}
          <div className={styles.experienceCard}>
            <span className={styles.expNumber}>100%</span>
            <span className={styles.expText}>Dedicated Fiber Network Quality</span>
          </div>
        </div>

        {/* Right: Mission & Vision Content */}
        <div className={styles.content}>
          <p className={styles.eyebrow}>
            <span aria-hidden="true" className={styles.badge} />
            Our Core Purpose
          </p>

          <h2 className={styles.title}>
            Shaping a Smarter &{" "}
            <span className={styles.accent}>
              Connected
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
            Tomorrow
          </h2>

          <p className={styles.lead}>
            At A1 Communication (A1C), our strategies are driven by what matters most to our subscribers. We continuously expand our BDIX-connected infrastructure to ensure seamless digital experiences for everyone.
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
        </div>
      </div>
    </section>
  );
}