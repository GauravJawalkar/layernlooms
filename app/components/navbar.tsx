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
  FiBookOpen,
  FiUsers,
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
    { name: 'Blog', icon: FiBookOpen, href: '/blog' },
    { name: 'Careers', icon: FiUsers, href: '/careers' },
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
        className={`hidden lg:flex sticky top-4 z-50 items-center justify-between w-full px-6 py-2.5 rounded-2xl transition-all duration-500 border shadow-lg ${
          scrolled
            ? 'bg-background/80 backdrop-blur-xl border-border/80'
            : 'bg-background/40 backdrop-blur-md border-border/30'
        } ${visible ? 'translate-y-0 opacity-100' : '-translate-y-24 opacity-0'}`}
      >
        <Link href="/" className="shrink-0 flex items-center hover:scale-105 transition-transform duration-300">
          <Logo className="w-auto h-10 lg:h-11" />
        </Link>

        <nav className="flex items-center gap-1.5 bg-secondary/50 px-2 py-1.5 rounded-full border border-border/20">
          {navItems.map((item) => {
            const active = isActive(item.href);
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`relative px-4.5 py-2 text-xs font-medium rounded-full transition-colors duration-300 ${
                  active
                    ? 'text-primary-foreground'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                {active && (
                  <motion.span
                    layoutId="desktopActiveTab"
                    className="absolute inset-0 bg-primary rounded-full shadow-none"
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
            className="relative group overflow-hidden px-5 py-2 text-xs font-semibold rounded-full border border-border text-foreground hover:text-primary-foreground transition-colors duration-300"
          >
            <span className="absolute inset-0 w-full h-full bg-primary translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out rounded-full -z-10" />
            <span className="relative z-10">Get Started</span>
          </Link>
        </div>
      </header>

      {/* ─── Desktop Floating Bottom Nav (appears when scrolling down) ─── */}
      <nav
        className={`hidden lg:flex fixed bottom-6 left-1/2 -translate-x-1/2 z-50 items-center gap-2 px-4 py-2.5 bg-background/80 backdrop-blur-xl border border-border rounded-2xl shadow-lg transition-all duration-500 ${
          !visible && scrolled
            ? 'translate-y-0 opacity-100'
            : 'translate-y-6 opacity-0 pointer-events-none'
        }`}
      >
        {navItems.filter(item => item.name !== 'Pricing' && item.name !== 'Blog' && item.name !== 'Careers').map(({ name, icon: Icon, href }) => {
          const active = isActive(href);
          return (
            <Link
              key={name}
              href={href}
              className={`relative flex items-center gap-2 px-3 py-2 text-xs font-medium rounded-xl transition-colors duration-200 ${
                active
                  ? 'text-primary-foreground shadow-sm'
                  : 'text-muted-foreground hover:text-foreground hover:bg-secondary/50'
              }`}
            >
              {active && (
                <motion.span
                  layoutId="bottomActiveTab"
                  className="absolute inset-0 bg-primary rounded-xl"
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
          className="p-2 rounded-xl text-muted-foreground hover:text-foreground hover:bg-secondary/50 transition-all cursor-pointer"
        >
          <FiArrowUp className="w-4 h-4" />
        </button>
      </nav>

      {/* ─── Mobile Floating Top Bar ─── */}
      <header
        className={`lg:hidden sticky top-3 z-50 flex items-center justify-between w-full px-4 py-2.5 rounded-2xl border shadow-md transition-all duration-500 ${
          scrolled
            ? 'bg-background/90 backdrop-blur-xl border-border/80'
            : 'bg-background/60 backdrop-blur-md border-border/30'
        } ${visible ? 'translate-y-0 opacity-100' : '-translate-y-24 opacity-0'}`}
      >
        <Link href="/" className="hover:opacity-95 transition-opacity">
          <Logo className="w-auto h-8 lg:h-9" />
        </Link>

        <button
          onClick={() => setMenuOpen(true)}
          className="p-2 rounded-xl text-foreground hover:bg-secondary transition-colors"
          aria-label="Open menu"
        >
          <FiMenu className="w-5 h-5" />
        </button>
      </header>

      {/* ─── Mobile Bottom Tab Bar ─── */}
      <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-background/90 backdrop-blur-xl border-t border-border safe-bottom">
        <div className="flex items-center justify-around py-2">
          {navItems.filter(item => item.name !== 'Pricing' && item.name !== 'Blog' && item.name !== 'Careers').map(({ name, icon: Icon, href }) => {
            const active = isActive(href);
return (
                <Link
                  key={name}
                  href={href}
                  className={`relative flex flex-col items-center px-3 py-1 min-w-[64px] rounded-xl transition-all duration-200 ${
                    active
                      ? 'text-foreground'
                      : 'text-muted-foreground'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span className="text-[10px] mt-0.5 font-medium">{name}</span>
                  {active && (
                    <motion.span
                      layoutId="mobileActiveDot"
                      className="absolute bottom-0 w-1.5 h-1.5 bg-primary rounded-full"
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
              className="absolute top-0 left-0 right-0 bg-background rounded-b-3xl shadow-2xl border-b border-border overflow-hidden"
            >
              <div className="flex items-center justify-between px-5 py-4 border-b border-border">
                <Link href="/" onClick={() => setMenuOpen(false)}>
                  <Logo className="w-auto h-8 lg:h-9" />
                </Link>
                <button
                  onClick={() => setMenuOpen(false)}
                  className="p-2 rounded-xl text-muted-foreground hover:bg-secondary transition-colors"
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
                          ? 'bg-secondary text-foreground'
                          : 'text-muted-foreground hover:bg-secondary/50 hover:text-foreground'
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
                  className="flex items-center justify-center w-full py-4 bg-primary text-primary-foreground text-base font-semibold rounded-xl hover:opacity-90 transition-opacity"
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

