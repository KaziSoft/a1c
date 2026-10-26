'use client';

import { motion, Variants } from 'framer-motion';
import Image from 'next/image';
import { 
  FaEnvelope, 
  FaPhone, 
  FaMapMarkerAlt, 
  FaLinkedin, 
  FaTwitter, 
  FaFacebook,
  FaInstagram,
  FaClock
} from 'react-icons/fa';
import styles from './Contact.module.css';

function HeroSection({ title, description }: { title: string; description: string }) {
  return (
    <div className={styles.hero}>
      <Image
        src="/img/bg-hero.jpg"
        alt="Hero background"
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

const Contact = () => {
  const contactInfo = [
    {
      icon: FaEnvelope,
      title: 'Email Us',
      details: 'a1communicationbdisp@gmail.com',
      description: 'Send us an email anytime',
    },
    {
      icon: FaPhone,
      title: 'Call Us',
      details: '+8809644219999 (NOC), +8801824382951 (WhatsApp)',
      description: 'Saturday - Friday 10:00 AM - 6:00 PM BST',
    },
    {
      icon: FaMapMarkerAlt,
      title: 'Visit Us',
      details: 'Uttara, Dhaka-1230',
      description: 'Bangladesh',
    },
    {
      icon: FaClock,
      title: 'Office Hours',
      details: 'Saturday - Friday',
      description: '10:00 AM - 6:00 PM BST',
    }
  ];

  const socialLinks = [
    { icon: FaLinkedin, href: '#' },
    { icon: FaTwitter, href: '#' },
    { icon: FaFacebook, href: 'https://www.facebook.com/A1Communication.ISP.bd/' },
    { icon: FaInstagram, href: '#' }
  ];

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" }
    }
  };

  return (
    <div className={styles.section}>
      <HeroSection 
        title="Get In Touch"
        description="Ready to start your next project? We'd love to hear from you. Visit our office or reach out through any of the channels below."
      />

      <motion.div 
        className={styles.container}
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
      >
        {/* Contact Info Card */}
        <motion.div variants={itemVariants} className={styles.card}>
          <div>
            <p className={styles.eyebrow}>
              <span aria-hidden="true" className={styles.badge} />
              Reach Out
            </p>
            <h2 className={styles.cardTitle}>Let's Talk</h2>
            <p className={styles.cardSubtitle}>
              Have a project in mind? We're here to help. Reach out through any of the channels below or visit our office.
            </p>

            <div className={styles.infoList}>
              {contactInfo.map((item, index) => (
                <div key={index} className={styles.infoItem}>
                  <div className={styles.iconWrapper}>
                    <item.icon className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className={styles.infoTitle}>{item.title}</h3>
                    <p className={styles.infoDetails}>{item.details}</p>
                    <p className={styles.infoDesc}>{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h3 className={styles.socialTitle}>Follow Us</h3>
            <div className={styles.socialGrid}>
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  className={styles.socialBtn}
                  aria-label="Social Link"
                >
                  <social.icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Map Card */}
        <motion.div variants={itemVariants} className={styles.card}>
          <div>
            <p className={styles.eyebrow}>
              <span aria-hidden="true" className={styles.badge} />
              Location
            </p>
            <h2 className={styles.cardTitle}>Find Us Here</h2>
            <p className={styles.cardSubtitle}>Visit our main office at the following location</p>

            <div className={styles.mapWrapper}>
              <iframe
              title="Google Map Location"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3648.4023249018446!2d90.3800!3d23.8748!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3757c42738b5d3a5%3A0xb249f3e498c4d28d!2sUttara%2C%20Dhaka%2C%20Bangladesh!5e0!3m2!1sen!2sbd!4v1700000000000!5m2!1sen!2sbd"
              width="100%"
              height="100%"
              style={{ border: 0, filter: 'invert(90%) hue-rotate(180deg) contrast(90%)' }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="w-full h-full"
            />
            </div>

            <div className={styles.mapDirections}>
              <div className={styles.dirFlex}>
                <FaMapMarkerAlt className="w-5 h-5 text-[var(--leaf)] mt-0.5 flex-shrink-0" />
                <div>
                  <h4 className={styles.infoTitle}>Directions</h4>
                  <p className={styles.infoDesc}>
                    Police Plaza Concord (7th Floor), Tower-2 Plot-2, Road-144, Gulshan-1, Dhaka-1212, Bangladesh
                  </p>
                  <a 
                    href="https://maps.google.com/?q=Police+Plaza+Concord+Gulshan+Dhaka"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.dirLink}
                  >
                    Get Directions →
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div className={styles.badgeGrid}>
            <div className={styles.infoBadge}>
              <div className={styles.badgeTitle}>Parking</div>
              <div className={styles.badgeSub}>Ample parking available</div>
            </div>
            <div className={styles.infoBadge}>
              <div className={styles.badgeTitle}>Public Transport</div>
              <div className={styles.badgeSub}>Metro & bus nearby</div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Contact;