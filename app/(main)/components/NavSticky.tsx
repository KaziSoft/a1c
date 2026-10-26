'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

// Icons using lucide-react (install with: npm install lucide-react)
import { 
  Mail, 
  HouseWifi, 
  PackageOpen,
  Home,
  Users
} from 'lucide-react';

const NavSticky = () => {
  const pathname = usePathname();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Total height of the page content
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      // Current scroll position
      const currentScroll = window.scrollY;

      if (totalHeight > 0) {
        // Calculate current scroll percentage
        const scrollPercentage = (currentScroll / totalHeight) * 100;
        
        // 50% er beshi scroll hole dekhabe, na hole hidden thakbe
        if (scrollPercentage >= 50) {
          setIsVisible(true);
        } else {
          setIsVisible(false);
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    // Initial check on mount
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div 
      className={`fixed right-0 top-1/2 -translate-y-1/2 z-50 flex flex-col gap-2 bg-slate-900/90 backdrop-blur-md p-2 rounded-l-xl border-l border-y border-slate-700/50 shadow-2xl transition-all duration-500 ease-in-out ${
        isVisible 
          ? 'translate-x-0 opacity-100 visibility-visible' 
          : 'translate-x-full opacity-0 pointer-events-none'
      }`}
    >
      
      {/* Home Link */}
      <Link
        href="/"
        className={`group flex items-center justify-center p-3 rounded-lg transition-all duration-200 hover:scale-110 ${
          pathname === '/'
            ? 'bg-orange-500 text-white shadow-lg shadow-orange-500/30'
            : 'text-gray-400 hover:text-white hover:bg-white/10'
        }`}
        title="Home"
      >
        <Home className="w-5 h-5" />
      </Link>

      {/* About Us Link */}
      <Link
        href="/management-team"
        className={`group flex items-center justify-center p-3 rounded-lg transition-all duration-200 hover:scale-110 ${
          pathname === '/management-team' || pathname === '/mission-vision' || pathname === '/bod'
            ? 'bg-orange-500 text-white shadow-lg shadow-orange-500/30'
            : 'text-gray-400 hover:text-white hover:bg-white/10'
        }`}
        title="About Us"
      >
        <Users className="w-5 h-5" />
      </Link>

      {/* Home Internet Link */}
      <Link
        href="/home-internet"
        className={`group flex items-center justify-center p-3 rounded-lg transition-all duration-200 hover:scale-110 ${
          pathname === '/training-programs'
            ? 'bg-orange-500 text-white shadow-lg shadow-orange-500/30'
            : 'text-gray-400 hover:text-orange-400 hover:bg-white/10'
        }`}
        title="Home Internet"
      >
        <HouseWifi className="w-5 h-5" />
      </Link>

      {/* Packages Link */}
      <Link
        href="/career"
        className={`group flex items-center justify-center p-3 rounded-lg transition-all duration-200 hover:scale-110 ${
          pathname === '/career'
            ? 'bg-orange-500 text-white shadow-lg shadow-orange-500/30'
            : 'text-gray-400 hover:text-orange-400 hover:bg-white/10'
        }`}
        title="Packages"
      >
        <PackageOpen className="w-5 h-5" />
      </Link>

      {/* Contact Link */}
      <Link
        href="/contact"
        className={`group flex items-center justify-center p-3 rounded-lg transition-all duration-200 hover:scale-110 ${
          pathname === '/contact'
            ? 'bg-orange-500 text-white shadow-lg shadow-orange-500/30'
            : 'text-gray-400 hover:text-white hover:bg-white/10'
        }`}
        title="Contact Us"
      >
        <Mail className="w-5 h-5 group-hover:animate-pulse" />
      </Link>

    </div>
  );
};

export default NavSticky;