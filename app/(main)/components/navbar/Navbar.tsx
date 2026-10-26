'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import type { FocusEvent, ReactNode } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Image from 'next/image';

import styles from './Navbar.module.css';

import {
  Menu,
  X,
  ChevronDown,
  Wifi,
  Zap,
  Building2,
  Tv,
  ShieldCheck,
  CreditCard,
  MapPin,
  Headphones,
  Gauge,
  UserCheck,
} from 'lucide-react';

type NavItem = {
  name: string;
  href: string;
  description: string;
  icon: ReactNode;
};

type NavFooter = { label: string; href: string };

type NavLink = {
  name: string;
  href?: string;
  items?: NavItem[];
  footer?: NavFooter;
};

const iconClass = 'h-[18px] w-[18px]';

const NAV_LINKS: NavLink[] = [
  { name: 'Home', href: '/' },
  {
    name: 'Packages & Internet',
    footer: { label: 'Compare all packages', href: '/packages' },
    items: [
      {
        name: 'Home Internet',
        href: '/home-internet',
        description: 'Reliable plans for everyday browsing and streaming',
        icon: <Wifi className={iconClass} />,
      },
      {
        name: 'Fiber Optics (FTTH)',
        href: '/packages/fiber',
        description: 'Fiber straight to your door for the fastest connection',
        icon: <Zap className={iconClass} />,
      },
      {
        name: 'Corporate & SME',
        href: '/packages/corporate',
        description: 'Dedicated connectivity for offices and teams',
        icon: <Building2 className={iconClass} />,
      },
      {
        name: 'IPTV & Entertainment',
        href: '/packages/iptv',
        description: 'Live channels and on-demand shows on your connection',
        icon: <Tv className={iconClass} />,
      },
      {
        name: 'Safe Internet & Security',
        href: '/packages/security',
        description: 'Protection and filtering for the whole household',
        icon: <ShieldCheck className={iconClass} />,
      },
    ],
  },
  {
    name: 'Support & Billing',
    footer: { label: 'Contact the help desk', href: '/support' },
    items: [
      {
        name: 'Pay Bill Online',
        href: '/bill-pay',
        description: 'Settle your invoice in a few taps',
        icon: <CreditCard className={iconClass} />,
      },
      {
        name: 'Coverage Area Map',
        href: '/coverage',
        description: 'Check whether we reach your address',
        icon: <MapPin className={iconClass} />,
      },
      {
        name: '24/7 Help Desk',
        href: '/support',
        description: 'Report a fault or get help at any hour',
        icon: <Headphones className={iconClass} />,
      },
      {
        name: 'Speed Test',
        href: '/speedtest',
        description: 'Measure your connection right now',
        icon: <Gauge className={iconClass} />,
      },
    ],
  },
  { name: 'About Us', href: '/about-us' },
  { name: 'Contact', href: '/contact' },
];

const slug = (value: string) => value.replace(/\W+/g, '-').toLowerCase();

const focusRing =
  'outline-none focus-visible:ring-2 focus-visible:ring-orange-500 focus-visible:ring-offset-2';

const Logo = ({ className }: { className: string }) => (
  <div className={`relative ${className}`}>
    <Image
      src="/img/logo.png"
      alt="ISP Broadband Logo"
      fill
      priority
      className="object-contain object-left"
    />
  </div>
);

const PortalButton = ({
  full = false,
  onClick,
}: {
  full?: boolean;
  onClick?: () => void;
}) => (
  <Link
    href="/self-care"
    onClick={onClick}
    className={`${styles.portalButton} ${full ? styles.portalButtonFull : ''}`}
  >
    <UserCheck className="h-4 w-4 shrink-0" />
    Self Care Portal
  </Link>
);

const Navbar = () => {
  const pathname = usePathname();

  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [mobileMounted, setMobileMounted] = useState(false);
  const [mobileShown, setMobileShown] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [mobileExpanded, setMobileExpanded] = useState<string | null>(null);
  const [hovered, setHovered] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const [ready, setReady] = useState(false);
  const [indicator, setIndicator] = useState({ left: 0, width: 0, visible: false });

  const navRef = useRef<HTMLElement>(null);
  const itemRefs = useRef<Record<string, HTMLDivElement | null>>({});
  const triggerRefs = useRef<Record<string, HTMLButtonElement | null>>({});
  const closeTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  const isActive = useCallback(
    (link: NavLink) =>
      link.href
        ? pathname === link.href
        : !!link.items?.some(
            (item) => pathname === item.href || pathname.startsWith(`${item.href}/`)
          ),
    [pathname]
  );

  const activeKey = NAV_LINKS.find(isActive)?.name ?? null;
  const targetKey = hovered ?? openDropdown ?? activeKey;

  const cancelClose = () => {
    if (closeTimeout.current) {
      clearTimeout(closeTimeout.current);
      closeTimeout.current = null;
    }
  };

  const handleEnter = (link: NavLink) => {
    cancelClose();
    setHovered(link.name);
    setOpenDropdown(link.items ? link.name : null);
  };

  const handleLeave = () => {
    setHovered(null);
    cancelClose();
    closeTimeout.current = setTimeout(() => setOpenDropdown(null), 150);
  };

  const handleBlur = (event: FocusEvent<HTMLDivElement>) => {
    if (!event.currentTarget.contains(event.relatedTarget as Node | null)) {
      setHovered(null);
      setOpenDropdown(null);
    }
  };

  const measure = useCallback(() => {
    const el = targetKey ? itemRefs.current[targetKey] : null;
    setIndicator((prev) =>
      el ? { left: el.offsetLeft, width: el.offsetWidth, visible: true } : { ...prev, visible: false }
    );
  }, [targetKey]);

  useEffect(() => {
    measure();
  }, [measure]);

  useEffect(() => {
    window.addEventListener('resize', measure);
    return () => window.removeEventListener('resize', measure);
  }, [measure]);

  useEffect(() => {
    const id = requestAnimationFrame(() => setReady(true));
    return () => cancelAnimationFrame(id);
  }, []);

  useEffect(() => {
    let ticking = false;
    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setScrolled(window.scrollY > 8);
          ticking = false;
        });
        ticking = true;
      }
    };

    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setIsMobileOpen(false);
    setOpenDropdown(null);
    setMobileExpanded(null);
  }, [pathname]);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== 'Escape') return;
      if (openDropdown) triggerRefs.current[openDropdown]?.focus();
      setOpenDropdown(null);
      setIsMobileOpen(false);
    };
    const onPointerDown = (event: PointerEvent) => {
      if (navRef.current && !navRef.current.contains(event.target as Node)) {
        setOpenDropdown(null);
      }
    };
    document.addEventListener('keydown', onKeyDown);
    document.addEventListener('pointerdown', onPointerDown);
    return () => {
      document.removeEventListener('keydown', onKeyDown);
      document.removeEventListener('pointerdown', onPointerDown);
    };
  }, [openDropdown]);

  useEffect(() => {
    if (isMobileOpen) {
      setMobileMounted(true);
      let inner = 0;
      const outer = requestAnimationFrame(() => {
        inner = requestAnimationFrame(() => setMobileShown(true));
      });
      return () => {
        cancelAnimationFrame(outer);
        cancelAnimationFrame(inner);
      };
    }
    setMobileShown(false);
    const timer = setTimeout(() => setMobileMounted(false), 350);
    return () => clearTimeout(timer);
  }, [isMobileOpen]);

  useEffect(() => {
    document.body.style.overflow = mobileMounted ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMounted]);

  useEffect(() => () => cancelClose(), []);

  return (
    <header className="sticky top-0 z-50 w-full p-0 m-0">
      <nav
        ref={navRef}
        aria-label="Main"
        className={`w-full border-b border-slate-200/70 bg-white/80 backdrop-blur-xl transition-shadow duration-300 ${
          scrolled
            ? 'shadow-[0_10px_30px_-10px_rgb(15_23_42/0.2)]'
            : 'shadow-[0_1px_2px_rgb(15_23_42/0.05)]'
        }`}
      >
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
          {/* Logo */}
          <Link
            href="/"
            className={`shrink-0 rounded-lg ${focusRing}`}
            onClick={() => {
              setIsMobileOpen(false);
              setOpenDropdown(null);
            }}
          >
            <Logo className="h-10 w-32 sm:w-36 lg:h-11 lg:w-40" />
          </Link>

          {/* Desktop links */}
          <div className="relative hidden items-center gap-1 lg:flex">
            <span
              aria-hidden
              className={`pointer-events-none absolute left-0 top-0 h-full rounded-xl bg-orange-50 ring-1 ring-inset ring-orange-100 motion-reduce:transition-none ${
                ready
                  ? 'transition-[transform,width,opacity] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]'
                  : ''
              }`}
              style={{
                width: indicator.width,
                transform: `translateX(${indicator.left}px)`,
                opacity: indicator.visible ? 1 : 0,
              }}
            />

            {NAV_LINKS.map((link) => {
              const active = isActive(link);
              const isTarget = targetKey === link.name;
              const open = openDropdown === link.name;
              const panelId = `dropdown-${slug(link.name)}`;
              const linkClass = `relative z-10 flex items-center gap-1.5 rounded-xl px-4 py-2 text-sm font-medium transition-colors duration-200 ${focusRing} ${
                isTarget ? 'text-orange-700' : active ? 'text-slate-900' : 'text-slate-600'
              }`;

              return (
                <div
                  key={link.name}
                  ref={(el) => {
                    itemRefs.current[link.name] = el;
                  }}
                  className="relative"
                  onMouseEnter={() => handleEnter(link)}
                  onMouseLeave={handleLeave}
                  onFocus={() => setHovered(link.name)}
                  onBlur={handleBlur}
                >
                  {link.items ? (
                    <button
                      type="button"
                      ref={(el) => {
                        triggerRefs.current[link.name] = el;
                      }}
                      className={linkClass}
                      aria-expanded={open}
                      aria-controls={panelId}
                      onClick={() => setOpenDropdown(link.name)}
                    >
                      {link.name}
                      <ChevronDown
                        className={`h-4 w-4 transition-transform duration-200 motion-reduce:transition-none ${
                          open ? 'rotate-180' : ''
                        }`}
                      />
                    </button>
                  ) : (
                    <Link
                      href={link.href ?? '/'}
                      className={linkClass}
                      aria-current={active ? 'page' : undefined}
                    >
                      {link.name}
                    </Link>
                  )}

                  {link.items && open && (
                    <div id={panelId} className="absolute left-0 top-full w-[21rem] pt-3">
                      <div
                        className={`overflow-hidden rounded-2xl border border-slate-200/70 bg-white shadow-[0_24px_50px_-12px_rgb(15_23_42/0.22)] ${styles.animateFadeIn}`}
                      >
                        <ul className="p-2">
                          {link.items.map((item) => (
                            <li key={item.name}>
                              <Link
                                href={item.href}
                                className="group flex items-start gap-3 rounded-xl p-3 outline-none transition-colors hover:bg-orange-50 focus-visible:bg-orange-50"
                                onClick={() => setOpenDropdown(null)}
                              >
                                <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-orange-50 text-orange-600 transition-colors group-hover:bg-orange-500 group-hover:text-white group-focus-visible:bg-orange-500 group-focus-visible:text-white">
                                  {item.icon}
                                </span>
                                <span className="min-w-0">
                                  <span className="block text-sm font-semibold text-slate-900">
                                    {item.name}
                                  </span>
                                  <span className="mt-0.5 block text-[13px] leading-snug text-slate-500">
                                    {item.description}
                                  </span>
                                </span>
                              </Link>
                            </li>
                          ))}
                        </ul>
                        {link.footer && (
                          <div className="border-t border-slate-100 bg-slate-50/80 px-5 py-3">
                            <Link
                              href={link.footer.href}
                              className="text-sm font-medium text-slate-700 underline-offset-4 outline-none hover:text-orange-700 hover:underline focus-visible:underline"
                              onClick={() => setOpenDropdown(null)}
                            >
                              {link.footer.label}
                            </Link>
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Desktop CTA */}
          <div className="hidden shrink-0 lg:block">
            <PortalButton />
          </div>

          {/* Mobile menu button */}
          <button
            type="button"
            onClick={() => setIsMobileOpen(true)}
            className={`grid h-10 w-10 place-items-center rounded-xl text-slate-700 transition-colors hover:bg-orange-50 hover:text-orange-700 lg:hidden ${focusRing}`}
            aria-label="Open menu"
            aria-expanded={isMobileOpen}
            aria-controls="mobile-menu"
          >
            <Menu className="h-6 w-6" />
          </button>
        </div>
      </nav>

      {/* Mobile drawer */}
      {mobileMounted && (
        <div
          id="mobile-menu"
          role="dialog"
          aria-modal="true"
          aria-label="Main menu"
          className="fixed inset-0 z-[100] lg:hidden"
        >
          <div
            className={`absolute inset-0 bg-slate-900/40 backdrop-blur-sm transition-opacity duration-300 ease-out motion-reduce:transition-none ${
              mobileShown ? 'opacity-100' : 'opacity-0'
            }`}
            onClick={() => setIsMobileOpen(false)}
          />

          <div
            className={`absolute inset-y-0 left-0 flex w-full max-w-sm flex-col overflow-hidden bg-white shadow-2xl transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none ${
              mobileShown ? 'translate-x-0' : '-translate-x-full'
            }`}
          >
            <div className="flex shrink-0 items-center justify-between border-b border-slate-100 px-4 py-3">
              <Link href="/" onClick={() => setIsMobileOpen(false)} className={`rounded-lg ${focusRing}`}>
                <Logo className="h-10 w-32" />
              </Link>
              <button
                type="button"
                onClick={() => setIsMobileOpen(false)}
                className={`grid h-10 w-10 place-items-center rounded-xl text-slate-500 transition-colors hover:bg-orange-50 hover:text-orange-700 ${focusRing}`}
                aria-label="Close menu"
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            <ul className="flex-1 space-y-1 overflow-y-auto p-3">
              {NAV_LINKS.map((link) => {
                const active = isActive(link);
                const expanded = mobileExpanded === link.name;

                if (!link.items) {
                  return (
                    <li key={link.name}>
                      <Link
                        href={link.href ?? '/'}
                        aria-current={active ? 'page' : undefined}
                        onClick={() => setIsMobileOpen(false)}
                        className={`block rounded-xl px-4 py-3.5 text-lg font-medium transition-colors ${focusRing} ${
                          active
                            ? 'bg-orange-50 text-orange-700'
                            : 'text-slate-900 hover:bg-slate-50'
                        }`}
                      >
                        {link.name}
                      </Link>
                    </li>
                  );
                }

                return (
                  <li key={link.name}>
                    <button
                      type="button"
                      aria-expanded={expanded}
                      onClick={() => setMobileExpanded(expanded ? null : link.name)}
                      className={`flex w-full items-center justify-between rounded-xl px-4 py-3.5 text-left text-lg font-medium transition-colors ${focusRing} ${
                        active || expanded
                          ? 'text-orange-700'
                          : 'text-slate-900 hover:bg-slate-50'
                      }`}
                    >
                      {link.name}
                      <ChevronDown
                        className={`h-5 w-5 transition-transform duration-200 motion-reduce:transition-none ${
                          expanded ? 'rotate-180' : ''
                        }`}
                      />
                    </button>

                    <div
                      className={`grid transition-[grid-template-rows] duration-300 ease-out motion-reduce:transition-none ${
                        expanded ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'
                      }`}
                    >
                      <ul
                        className={`min-h-0 overflow-hidden transition-[visibility] duration-300 ${
                          expanded ? 'visible' : 'invisible'
                        }`}
                      >
                        {link.items.map((item) => (
                          <li key={item.name}>
                            <Link
                              href={item.href}
                              onClick={() => setIsMobileOpen(false)}
                              className={`flex items-center gap-3 rounded-xl px-4 py-3 transition-colors hover:bg-orange-50 ${focusRing}`}
                            >
                              <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-orange-50 text-orange-600">
                                {item.icon}
                              </span>
                              <span className="min-w-0">
                                <span className="block text-[15px] font-semibold text-slate-900">
                                  {item.name}
                                </span>
                                <span className="block text-[13px] leading-snug text-slate-500">
                                  {item.description}
                                </span>
                              </span>
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </li>
                );
              })}
            </ul>

            <div className="shrink-0 border-t border-slate-100 p-3">
              <PortalButton full onClick={() => setIsMobileOpen(false)} />
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;