'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FiHome,
  FiInfo,
  FiBriefcase,
  FiDollarSign,
  FiMail,
  FiMenu,
  FiX,
  FiArrowUp,
} from 'react-icons/fi';
import { FaServicestack } from 'react-icons/fa';
import Logo from './Logo';
import ThemeToggle from './ThemeToggle';

const Navbar = () => {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [prevScroll, setPrevScroll] = useState(0);
  const [visible, setVisible] = useState(true);

  const navItems = [
    { name: 'Home', icon: FiHome, href: '/' },
    { name: 'About', icon: FiInfo, href: '/about' },
    { name: 'Services', icon: FaServicestack, href: '/services' },
    { name: 'Portfolio', icon: FiBriefcase, href: '/portfolio' },
    { name: 'Pricing', icon: FiDollarSign, href: '/pricing' },
    { name: 'Contact', icon: FiMail, href: '/contact' },
  ];

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 30);
      setVisible(y < prevScroll || y < 80);
      setPrevScroll(y);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [prevScroll]);

  useEffect(() => {
    const onResize = () => { if (window.innerWidth >= 1024) setMenuOpen(false); };
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  const isActive = (href: string) =>
    pathname === href || (href !== '/' && pathname.startsWith(href));

  return (
    <>
      {/* ─── Desktop Floating Capsule Bar (switches at 1024px) ─── */}
      <header
        className={`hidden lg:flex sticky top-4 z-50 items-center justify-between w-full px-6 py-2.5 rounded-2xl transition-all duration-500 border shadow-none dark:shadow-lg ${
          scrolled
            ? 'bg-white dark:bg-neutral-950/80 backdrop-blur-xl border-neutral-200/80 dark:border-neutral-800/80'
            : 'bg-white dark:bg-neutral-950/40 backdrop-blur-md border-neutral-200 dark:border-neutral-800/30'
        } ${visible ? 'translate-y-0 opacity-100' : '-translate-y-24 opacity-0'}`}
      >
        <Link href="/" className="shrink-0 flex items-center hover:scale-105 transition-transform duration-300">
          <Logo className="w-auto h-10 lg:h-11" />
        </Link>

        <nav className="flex items-center gap-1.5 bg-neutral-100/50 dark:bg-neutral-900/50 px-2 py-1.5 rounded-full border border-neutral-200/20 dark:border-neutral-800/20">
          {navItems.map((item) => {
            const active = isActive(item.href);
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`relative px-4.5 py-2 text-xs font-medium rounded-full transition-colors duration-300 ${
                  active
                    ? 'text-white dark:text-neutral-900'
                    : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white'
                }`}
              >
                {active && (
                  <motion.span
                    layoutId="desktopActiveTab"
                    className="absolute inset-0 bg-neutral-900 dark:bg-white rounded-full shadow-none dark:shadow-md"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
                <span className="relative z-10 flex items-center gap-2">
                  <item.icon className="w-4 h-4" />
                  {item.name}
                </span>
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-3 shrink-0">
          <Link
            href="/contact"
            className="relative group overflow-hidden px-5 py-2 text-xs font-semibold rounded-full border border-neutral-300 dark:border-neutral-700 text-neutral-800 dark:text-neutral-200 hover:text-white dark:hover:text-neutral-950 transition-colors duration-300"
          >
            <span className="absolute inset-0 w-full h-full bg-neutral-900 dark:bg-white translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out rounded-full -z-10" />
            <span className="relative z-10">Get Started</span>
          </Link>
        </div>
      </header>

      {/* ─── Desktop Floating Bottom Nav (appears when scrolling down) ─── */}
      <nav
        className={`hidden lg:flex fixed bottom-6 left-1/2 -translate-x-1/2 z-50 items-center gap-2 px-4 py-2.5 bg-white dark:bg-neutral-950/80 backdrop-blur-xl border border-neutral-200 dark:border-neutral-800 rounded-2xl shadow-none dark:shadow-xl transition-all duration-500 ${
          !visible && scrolled
            ? 'translate-y-0 opacity-100'
            : 'translate-y-6 opacity-0 pointer-events-none'
        }`}
      >
        {navItems.map(({ name, icon: Icon, href }) => {
          const active = isActive(href);
          return (
            <Link
              key={name}
              href={href}
              className={`relative flex items-center gap-2 px-3 py-2 text-xs font-medium rounded-xl transition-colors duration-200 ${
                active
                  ? 'text-white dark:text-neutral-900 shadow-sm'
                  : 'text-neutral-500 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white hover:bg-neutral-100/50 dark:hover:bg-neutral-800/50'
              }`}
            >
              {active && (
                <motion.span
                  layoutId="bottomActiveTab"
                  className="absolute inset-0 bg-neutral-900 dark:bg-white rounded-xl"
                  transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                />
              )}
              <span className="relative z-10 flex items-center gap-2">
                <Icon className="w-4 h-4" />
                {name}
              </span>
            </Link>
          );
        })}
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="p-2 rounded-xl text-neutral-400 hover:text-neutral-900 dark:hover:text-white hover:bg-neutral-100/50 dark:hover:bg-neutral-800/50 transition-all cursor-pointer"
        >
          <FiArrowUp className="w-4 h-4" />
        </button>
      </nav>

      {/* ─── Mobile Floating Top Bar ─── */}
      <header
        className={`lg:hidden sticky top-3 z-50 flex items-center justify-between w-full px-4 py-2.5 rounded-2xl border shadow-none dark:shadow-md transition-all duration-500 ${
          scrolled
            ? 'bg-white dark:bg-neutral-950/90 backdrop-blur-xl border-neutral-200/80 dark:border-neutral-800/80'
            : 'bg-white dark:bg-neutral-950/60 backdrop-blur-md border-neutral-200/30 dark:border-neutral-800/30'
        } ${visible ? 'translate-y-0 opacity-100' : '-translate-y-24 opacity-0'}`}
      >
        <Link href="/" className="hover:opacity-95 transition-opacity">
          <Logo className="w-auto h-8 lg:h-9" />
        </Link>

        <button
          onClick={() => setMenuOpen(true)}
          className="p-2 rounded-xl text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
          aria-label="Open menu"
        >
          <FiMenu className="w-5 h-5" />
        </button>
      </header>

      {/* ─── Mobile Bottom Tab Bar ─── */}
      <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/90 dark:bg-neutral-950/90 backdrop-blur-xl border-t border-neutral-200 dark:border-neutral-800 safe-bottom">
        <div className="flex items-center justify-around py-2">
          {navItems.map(({ name, icon: Icon, href }) => {
            const active = isActive(href);
            return (
              <Link
                key={name}
                href={href}
                className={`relative flex flex-col items-center px-3 py-1 min-w-[64px] rounded-xl transition-all duration-200 ${
                  active
                    ? 'text-neutral-900 dark:text-white'
                    : 'text-neutral-400 dark:text-neutral-500'
                }`}
              >
                <Icon className="w-5 h-5" />
                <span className="text-[10px] mt-0.5 font-medium">{name}</span>
                {active && (
                  <motion.span
                    layoutId="mobileActiveDot"
                    className="absolute bottom-0 w-1.5 h-1.5 bg-neutral-900 dark:bg-white rounded-full"
                    transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                  />
                )}
              </Link>
            );
          })}
        </div>
      </nav>

      {/* ─── Mobile Full-Screen Overlay Menu ─── */}
      <AnimatePresence>
        {menuOpen && (
          <div className="fixed inset-0 z-50 lg:hidden">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/60 backdrop-blur-md"
              onClick={() => setMenuOpen(false)}
            />

            {/* Menu Panel */}
            <motion.div
              initial={{ y: '-100%', opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: '-100%', opacity: 0 }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="absolute top-0 left-0 right-0 bg-white dark:bg-neutral-950 rounded-b-3xl shadow-2xl border-b border-neutral-200 dark:border-neutral-800 overflow-hidden"
            >
              <div className="flex items-center justify-between px-5 py-4 border-b border-neutral-100 dark:border-neutral-800">
                <Link href="/" onClick={() => setMenuOpen(false)}>
                  <Logo className="w-auto h-8 lg:h-9" />
                </Link>
                <button
                  onClick={() => setMenuOpen(false)}
                  className="p-2 rounded-xl text-neutral-500 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
                  aria-label="Close menu"
                >
                  <FiX className="w-5 h-5" />
                </button>
              </div>

              <div className="px-5 py-6 space-y-1.5">
                {navItems.map(({ name, icon: Icon, href }) => {
                  const active = isActive(href);
                  return (
                    <Link
                      key={name}
                      href={href}
                      onClick={() => setMenuOpen(false)}
                      className={`flex items-center gap-4 px-4 py-3.5 rounded-xl text-base font-semibold transition-all duration-200 ${
                        active
                          ? 'bg-neutral-100 dark:bg-neutral-800 text-neutral-900 dark:text-white'
                          : 'text-neutral-600 dark:text-neutral-400 hover:bg-neutral-50 dark:hover:bg-neutral-800/50'
                      }`}
                    >
                      <Icon className="w-5 h-5" />
                      {name}
                    </Link>
                  );
                })}
              </div>

              <div className="px-5 pb-8 space-y-4">
                <Link
                  href="/contact"
                  onClick={() => setMenuOpen(false)}
                  className="flex items-center justify-center w-full py-4 bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 text-base font-semibold rounded-xl hover:opacity-90 transition-opacity"
                >
                  Get Started
                </Link>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <style jsx global>{`
        @media (max-width: 1023px) {
          body { padding-bottom: 64px; }
        }
        .safe-bottom {
          padding-bottom: env(safe-area-inset-bottom, 0px);
        }
      `}</style>
    </>
  );
};

export default Navbar;
