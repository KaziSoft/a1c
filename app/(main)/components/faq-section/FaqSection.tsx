"use client";

import { useId, useState, type ReactNode } from "react";
import styles from "./FaqSection.module.css";

type Faq = { question: string; answer: string };
type Feature = { title: string; description: string; icon: ReactNode };

const iconProps = {
  viewBox: "0 0 48 48",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 2.5,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  "aria-hidden": true,
  width: 40,
  height: 40,
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

const FAQS: Faq[] = [
  {
    question: "What types of internet connections do you offer?",
    answer:
      "We offer high-speed fiber-optic internet plans for both residential and corporate users, featuring symmetrical download and upload speeds, dedicated bandwidth, and ultra-low latency connections.",
  },
  {
    question: "How long does standard installation take?",
    answer:
      "Standard fiber-optic installation usually takes between 24 to 48 hours after your order is confirmed and payment is verified, depending on cable availability in your area.",
  },
  {
    question: "How do I pay my monthly internet bill?",
    answer:
      "You can conveniently pay your bill through our online customer selfcare portal using credit/debit cards, mobile banking apps, internet banking, or directly at our office payment counters.",
  },
  {
    question: "What is the difference between Shared Broadband and Dedicated Internet?",
    answer:
      "Shared broadband distributes speed among multiple users in an area, which is ideal for everyday home use. Dedicated Internet Access (DIA) provides a private, unshared connection guaranteed strictly for your business with guaranteed bandwidth and minimal latency.",
  },
  {
    question: "Do I need to buy my own router or is hardware provided?",
    answer:
      "We supply an Optical Network Unit (ONU) as part of your connection installation. You can either use your own compatible Wi-Fi router or purchase an optimized high-speed router directly from us during installation.",
  },
  {
    question: "Can I upgrade or downgrade my package at any time?",
    answer:
      "Yes, you can request a package change at any point before your next billing cycle through our customer portal or by reaching out to support. Requested upgrades are usually processed within 24 hours.",
  },
];

function AccordionItem({
  faq,
  open,
  onToggle,
}: {
  faq: Faq;
  open: boolean;
  onToggle: () => void;
}) {
  const uid = useId();
  const buttonId = `${uid}-button`;
  const panelId = `${uid}-panel`;

  return (
    <div className={styles.item} data-open={open}>
      <h3 className={styles.itemHeading}>
        <button
          id={buttonId}
          type="button"
          aria-expanded={open}
          aria-controls={panelId}
          onClick={onToggle}
          className={styles.trigger}
        >
          <span aria-hidden className={styles.toggle}>
            <span className={styles.barH} />
            <span className={styles.barV} />
          </span>
          <span className={styles.question}>{faq.question}</span>
        </button>
      </h3>

      <div
        id={panelId}
        role="region"
        aria-labelledby={buttonId}
        inert={!open}
        className={styles.panel}
      >
        <div className={styles.panelInner}>
          <p className={styles.answer}>{faq.answer}</p>
        </div>
      </div>
    </div>
  );
}

export default function FaqSection({
  features = FEATURES,
  faqs = FAQS,
}: {
  features?: Feature[];
  faqs?: Faq[];
}) {
  // Only one item open at a time; all closed on first render.
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        {/* Left: heading + features */}
        <div>
          <p className={styles.eyebrow}>
            <span aria-hidden="true" className={styles.badge} />
            Frequently Asked Questions
          </p>

          <h2 className={styles.title}>
            Why Customers{" "}
            <span className={styles.accent}>
              Choose
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
            Us
          </h2>

          <ul className={styles.features}>
            {features.map((f) => (
              <li key={f.title} className={styles.feature}>
                <span className={styles.featureIcon}>{f.icon}</span>
                <div className={styles.featureText}>
                  <h3 className={styles.featureTitle}>{f.title}</h3>
                  <p className={styles.featureDesc}>{f.description}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>

        {/* Right: accordion */}
        <div className={styles.accordion}>
          {faqs.map((faq, i) => (
            <AccordionItem
              key={faq.question}
              faq={faq}
              open={openIndex === i}
              onToggle={() => setOpenIndex(openIndex === i ? null : i)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}