//OurInternet.tsx

import Image from "next/image";
import styles from "./OurInternet.module.css";

/* <clipPath> only accepts shapes (no <g>), so each shape carries the scale
   that maps the 713 x 450 drawing box to 0-1 bounding-box units. */
const CLOUD_SCALE = "scale(0.0014025 0.0022222)";

export default function OurInternet({
  cloudImage = "/img/our-internet.png",
  cloudImageAlt = "Woman in a red top using her phone next to a laptop in a cafe",
  routerImage = "/img/router.webp",
  routerImageAlt = "5G Wi-Fi router",
}: {
  cloudImage?: string;
  cloudImageAlt?: string;
  routerImage?: string;
  routerImageAlt?: string;
}) {
  return (
    <section className={styles.section}>
      {/* Cloud clip: four circles and a block, measured from the reference
          recording in a 713 x 450 box and scaled to 0-1 so it stretches with
          the element. The cloud element keeps the same 713:450 ratio, so the
          circles stay circular at every size. */}
      <svg width="0" height="0" aria-hidden="true" className={styles.defs}>
        <defs>
          <clipPath id="provider-cloud-clip" clipPathUnits="objectBoundingBox">
            <circle transform={CLOUD_SCALE} cx="148" cy="302" r="148" />
            <circle transform={CLOUD_SCALE} cx="275" cy="156" r="131" />
            <circle transform={CLOUD_SCALE} cx="464" cy="130" r="130" />
            <circle transform={CLOUD_SCALE} cx="565" cy="303" r="148" />
            <rect transform={CLOUD_SCALE} x="128" y="175" width="435" height="275" />
          </clipPath>
        </defs>
      </svg>

      <div className={styles.container}>
        {/* Left: cloud photo + floating router */}
        <div className={styles.media}>
          <div className={styles.cloud}>
            <Image
              src={cloudImage}
              alt={cloudImageAlt}
              fill
              loading="eager"
              sizes="(min-width: 64rem) 44.5rem, 90vw"
              className={styles.cover}
              priority
            />
          </div>

          <div className={styles.router}>
            <Image
              src={routerImage}
              alt={routerImageAlt}
              fill
              sizes="(min-width: 64rem) 17.5rem, 40vw"
              className={styles.contain}
            />
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
            Service in Your Area
          </h2>

          <p className={styles.lead}>
            At A1 Communication, we are committed to providing fast, reliable, and affordable internet connectivity that keeps you connected without interruption. Whether you’re streaming your favorite content, enjoying online gaming, working remotely, or staying connected with loved ones, our advanced fiber-optic network delivers high-speed performance, seamless connectivity, and a smooth online experience you can depend on.
          </p>
        </div>
      </div>
    </section>
  );
}