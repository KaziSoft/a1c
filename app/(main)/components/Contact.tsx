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

// Hero Section Component matching shared application layout design
function HeroSection({ title, description }: { title: string; description: string }) {
  return (
    <div className="relative h-[40vh] min-h-65 w-full overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/img/contact.jpg"
          alt="Hero background"
          fill
          className="object-cover"
          priority
        />
        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-black/50" />
      </div>

      {/* Content */}
      <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-4">
        <h1 className="text-2xl tracking-tight font-aclonica text-gray-50 sm:text-3xl md:text-5xl mb-4">
          {title}
        </h1>
        <p className="text-lg md:text-xl text-gray-200 max-w-2xl mx-auto">
          {description}
        </p>
      </div>
    </div>
  );
}

const Contact = () => {
  const contactInfo = [
    {
      icon: FaEnvelope,
      title: 'Email Us',
      details: 'info@blbl.com.bd',
      description: 'Send us an email anytime',
      color: 'from-slate-500 to-slate-700'
    },
    {
      icon: FaPhone,
      title: 'Call Us',
      details: '+8801730068810, +8801730068811',
      description: 'Sun-Thurs from 10am to 6pm',
      color: 'from-slate-500 to-slate-700'
    },
    {
      icon: FaMapMarkerAlt,
      title: 'Visit Us',
      details: 'Police Plaza Concord (7th Floor), Tower-2 Plot-2, Road-144, Gulshan-1, Dhaka-1212',
      description: 'Bangladesh',
      color: 'from-slate-500 to-slate-700'
    },
    {
      icon: FaClock,
      title: 'Office Hours',
      details: 'Sunday - Thursday',
      description: '10:00 AM - 6:00 PM BST',
      color: 'from-slate-500 to-slate-700'
    }
  ];

  const socialLinks = [
    { icon: FaLinkedin, href: '#', color: 'hover:text-slate-400' },
    { icon: FaTwitter, href: '#', color: 'hover:text-slate-300' },
    { icon: FaFacebook, href: '#', color: 'hover:text-slate-300' },
    { icon: FaInstagram, href: '#', color: 'hover:text-slate-400' }
  ];

  // Animation variants with proper typing
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };

  return (
    <motion.div 
      className="min-h-screen bg-slate-900"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* Standardized Global Hero Section Placement */}
      <HeroSection 
        title="Get In Touch"
        description="Ready to start your next project? We'd love to hear from you. Visit our office or reach out through any of the channels below."
      />

      {/* Main Content */}
      <motion.div 
        className="py-16 px-4 sm:px-6 lg:px-8"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
      >
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Contact Information */}
            <motion.div 
              variants={itemVariants}
            >
              <motion.div 
                className="bg-slate-800 rounded-2xl shadow-2xl p-8 h-full transition-colors duration-300"
                whileHover={{ y: -5, transition: { duration: 0.3 } }}
              >
                <motion.h2 
                  className="text-2xl font-bold text-white mb-8"
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.2 }}
                >
                  Let's Talk
                </motion.h2>
                <motion.p 
                  className="text-slate-300 mb-8"
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.3 }}
                >
                  Have a project in mind? We're here to help. Reach out through any of the channels below or visit our office.
                </motion.p>

                {/* Contact Info Cards */}
                <div className="space-y-6 mb-8">
                  {contactInfo.map((item, index) => (
                    <motion.div 
                      key={index} 
                      className="flex items-start group"
                      initial={{ opacity: 0, x: -30 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.4 + index * 0.1, duration: 0.5 }}
                      whileHover={{ x: 5 }}
                    >
                      <motion.div 
                        className={`flex-shrink-0 w-12 h-12 rounded-xl bg-gradient-to-r ${item.color} flex items-center justify-center`}
                        whileHover={{ scale: 1.1, rotate: 5 }}
                        transition={{ type: "spring", stiffness: 300 }}
                      >
                        <item.icon className="h-6 w-6 text-white" />
                      </motion.div>
                      <div className="ml-4">
                        <h3 className="font-semibold text-white">{item.title}</h3>
                        <p className="text-white font-medium">{item.details}</p>
                        <p className="text-slate-400 text-sm">{item.description}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>

                {/* Social Links */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.8 }}
                >
                  <h3 className="font-semibold text-white mb-4">Follow Us</h3>
                  <div className="flex space-x-4">
                    {socialLinks.map((social, index) => (
                      <motion.a
                        key={index}
                        href={social.href}
                        className={`w-10 h-10 rounded-lg bg-slate-700 flex items-center justify-center text-slate-300 ${social.color} transition-all duration-300`}
                        whileHover={{ scale: 1.2, y: -3 }}
                        whileTap={{ scale: 0.9 }}
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.9 + index * 0.1, type: "spring", stiffness: 200 }}
                      >
                        <social.icon className="h-5 w-5" />
                      </motion.a>
                    ))}
                  </div>
                </motion.div>
              </motion.div>
            </motion.div>

            {/* Google Map */}
            <motion.div 
              variants={itemVariants}
            >
              <motion.div 
                className="bg-slate-800 rounded-2xl shadow-2xl p-8 transition-colors duration-300 h-full"
                whileHover={{ y: -5, transition: { duration: 0.3 } }}
              >
                <motion.div 
                  className="mb-6"
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  <h2 className="text-2xl font-bold text-white mb-2">Find Us Here</h2>
                  <p className="text-slate-300">Visit our office at the following location</p>
                </motion.div>

                <motion.div 
                  className="relative rounded-xl overflow-hidden shadow-lg"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.3, duration: 0.5 }}
                >
                  {/* Google Maps Embed */}
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3652.456789012345!2d90.41234567890123!3d23.7890123456789!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755c76e12345678%3A0x9abcde1234567890!2sPolice%20Plaza%20Concord!5e0!3m2!1sen!2sbd!4v1234567890123!5m2!1sen!2sbd"
                    width="100%"
                    height="450"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    className="w-full"
                    title="Office Location Map"
                  />
                  
                  {/* Overlay Gradient for better visual */}
                  <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-black/20 via-transparent to-transparent" />
                </motion.div>

                {/* Additional Location Info */}
                <motion.div 
                  className="mt-6 p-4 bg-slate-900/50 rounded-lg"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                >
                  <div className="flex items-start space-x-3">
                    <FaMapMarkerAlt className="h-5 w-5 text-slate-400 mt-0.5 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold text-white mb-1">Directions</h4>
                      <p className="text-sm text-slate-300">
                        Police Plaza Concord (7th Floor), Tower-2 Plot-2, Road-144, Gulshan-1, Dhaka-1212, Bangladesh
                      </p>
                      <a 
                        href="https://maps.google.com/?q=Police+Plaza+Concord+Gulshan+Dhaka"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center mt-3 text-slate-400 hover:text-slate-300 text-sm font-medium transition-colors"
                      >
                        Get Directions
                        <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                        </svg>
                      </a>
                    </div>
                  </div>
                </motion.div>

                {/* Parking & Transport Info */}
                <motion.div 
                  className="mt-4 grid grid-cols-2 gap-3"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.6 }}
                >
                  <div className="text-center p-3 bg-slate-700/50 rounded-lg">
                    <div className="text-slate-300 font-semibold text-sm mb-1">Parking</div>
                    <div className="text-xs text-slate-400">Ample parking available</div>
                  </div>
                  <div className="text-center p-3 bg-slate-700/50 rounded-lg">
                    <div className="text-slate-300 font-semibold text-sm mb-1">Public Transport</div>
                    <div className="text-xs text-slate-400">Metro & bus nearby</div>
                  </div>
                </motion.div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default Contact;