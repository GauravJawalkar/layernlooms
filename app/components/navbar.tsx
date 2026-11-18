'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowUp,
  BookOpen,
  Briefcase,
  DollarSign,
  House,
  Info,
  Mail,
  Menu,
  Server,
  Users,
  X,
} from 'lucide-react';
import Logo from './Logo';
import ThemeToggle from './ThemeToggle';

const Navbar = () => {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [visible, setVisible] = useState(true);
  const prevScroll = useRef(0);

  const navItems = [
    { name: 'Home', icon: House, href: '/' },
    { name: 'About', icon: Info, href: '/about' },
    { name: 'Services', icon: Server, href: '/services' },
    { name: 'Portfolio', icon: Briefcase, href: '/portfolio' },
    { name: 'Blog', icon: BookOpen, href: '/blog' },
    { name: 'Careers', icon: Users, href: '/careers' },
    { name: 'Pricing', icon: DollarSign, href: '/pricing' },
    { name: 'Contact', icon: Mail, href: '/contact' },
  ];

  useEffect(() => {
    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        const y = window.scrollY;
        const nextScrolled = y > 30;
        const nextVisible = y < prevScroll.current || y < 80;
        prevScroll.current = y;
        setScrolled((prev) => (prev === nextScrolled ? prev : nextScrolled));
        setVisible((prev) => (prev === nextVisible ? prev : nextVisible));
        ticking = false;
      });
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth >= 1024) setMenuOpen(false);
    };
    window.addEventListener('resize', onResize, { passive: true });
    return () => window.removeEventListener('resize', onResize);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [menuOpen]);

  useEffect(() => {
    if (!menuOpen) return;

    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setMenuOpen(false);
    };
    window.addEventListener('keydown', closeOnEscape);
    return () => window.removeEventListener('keydown', closeOnEscape);
  }, [menuOpen]);

  const isActive = (href: string) =>
    pathname === href || (href !== '/' && pathname.startsWith(href));

  return (
    <>
      {/* ─── Desktop Floating Capsule Bar (switches at 1024px) ─── */}
      <header
        className={`hidden lg:flex sticky top-3.5 z-50 items-center justify-between w-full px-5 py-2.5 rounded-full transition-all duration-300 border border-neutral-200/80 dark:border-white/10 bg-background/80 dark:bg-neutral-950/75 backdrop-blur-xl shadow-[0_4px_24px_-2px_rgba(0,0,0,0.06),0_1px_2px_rgba(0,0,0,0.04)] dark:shadow-[0_8px_32px_-4px_rgba(0,0,0,0.5),inset_0_1px_0_0_rgba(255,255,255,0.08)] ${
          scrolled ? 'shadow-md dark:shadow-neutral-950/80' : ''
        } ${visible ? 'translate-y-0 opacity-100' : '-translate-y-24 opacity-0'}`}
      >
        {/* Brand Logo */}
        <Link
          href="/"
          className="shrink-0 flex items-center transition-opacity hover:opacity-85"
        >
          <Logo className="w-auto h-12 lg:h-13 xl:h-14" priority={true} />
        </Link>

        {/* Center Navigation Track */}
        <nav
          aria-label="Main navigation"
          className="flex items-center gap-0.5 bg-neutral-200/50 dark:bg-white/[0.05] p-1 rounded-full border border-neutral-300/40 dark:border-white/[0.07] backdrop-blur-md"
        >
          {navItems.map((item) => {
            const active = isActive(item.href);
            return (
              <Link
                key={item.name}
                href={item.href}
                aria-current={active ? 'page' : undefined}
                className={`relative px-2.5 xl:px-3.5 py-1.5 text-xs font-medium rounded-full transition-colors duration-200 ${
                  active
                    ? 'text-neutral-950 dark:text-neutral-950'
                    : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-950 dark:hover:text-white'
                }`}
              >
                {active && (
                  <motion.span
                    layoutId="desktopActiveTab"
                    className="absolute inset-0 bg-white dark:bg-white rounded-full shadow-[0_2px_8px_rgba(0,0,0,0.12)] dark:shadow-[0_2px_12px_rgba(255,255,255,0.25)]"
                    transition={{ type: 'spring', stiffness: 400, damping: 32 }}
                  />
                )}
                <span className="relative z-10 flex items-center gap-1.5">
                  <item.icon className="w-3.5 h-3.5 shrink-0" />
                  <span>{item.name}</span>
                </span>
              </Link>
            );
          })}
        </nav>

        {/* Right Action Group */}
        <div className="flex items-center gap-2.5 shrink-0">
          <ThemeToggle variant="toggle" />
          <Link
            href="/contact"
            className="group relative inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold rounded-full bg-neutral-950 text-white dark:bg-white dark:text-neutral-950 hover:opacity-90 active:scale-98 transition-all duration-200 shadow-sm"
          >
            <span>Get Started</span>
            <span className="inline-block transition-transform duration-200 group-hover:translate-x-0.5">
              →
            </span>
          </Link>
        </div>
      </header>

      {/* ─── Desktop Floating Bottom Nav (appears when scrolling down) ─── */}
      <nav
        aria-label="Quick navigation"
        className={`hidden lg:flex fixed bottom-6 left-1/2 -translate-x-1/2 z-50 items-center gap-1 p-1.5 bg-background/90 dark:bg-neutral-900/90 backdrop-blur-2xl border border-neutral-200 dark:border-white/10 rounded-full shadow-[0_16px_40px_rgba(0,0,0,0.16)] dark:shadow-[0_16px_40px_rgba(0,0,0,0.45)] transition-all duration-500 ${
          !visible && scrolled
            ? 'translate-y-0 opacity-100 scale-100'
            : 'translate-y-8 opacity-0 scale-95 pointer-events-none'
        }`}
      >
        {navItems
          .filter((item) =>
            ['Home', 'Services', 'Portfolio', 'Blog', 'Contact'].includes(item.name)
          )
          .map(({ name, icon: Icon, href }) => {
            const active = isActive(href);
            return (
              <Link
                key={name}
                href={href}
                aria-current={active ? 'page' : undefined}
                className={`relative flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-medium rounded-full transition-colors duration-200 ${
                  active
                    ? 'text-white dark:text-neutral-950'
                    : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-950 dark:hover:text-white hover:bg-neutral-200/70 dark:hover:bg-white/10'
                }`}
              >
                {active && (
                  <motion.span
                    layoutId="bottomActiveTab"
                    className="absolute inset-0 bg-neutral-950 dark:bg-white rounded-full shadow-sm"
                    transition={{ type: 'spring', stiffness: 400, damping: 32 }}
                  />
                )}
                <span className="relative z-10 flex items-center gap-1.5">
                  <Icon className="w-3.5 h-3.5" />
                  <span>{name}</span>
                </span>
              </Link>
            );
          })}

        <div className="w-[1px] h-4 bg-neutral-300 dark:bg-white/20 mx-1" />

        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="w-8 h-8 flex items-center justify-center rounded-full text-neutral-600 dark:text-neutral-400 hover:text-neutral-950 dark:hover:text-white hover:bg-neutral-200/70 dark:hover:bg-white/15 transition-all cursor-pointer"
          aria-label="Scroll to top"
        >
          <ArrowUp className="w-3.5 h-3.5" />
        </button>
      </nav>

      {/* ─── Mobile Floating Top Bar ─── */}
      <header
        className={`lg:hidden sticky top-3 z-50 flex items-center justify-between w-full px-4 py-2 rounded-full border border-neutral-200/80 dark:border-white/10 bg-background/85 dark:bg-neutral-950/80 backdrop-blur-xl shadow-[0_4px_24px_rgba(0,0,0,0.06)] dark:shadow-[0_8px_32px_rgba(0,0,0,0.4)] transition-all duration-300 ${
          visible ? 'translate-y-0 opacity-100' : '-translate-y-24 opacity-0'
        }`}
      >
        <Link href="/" className="hover:opacity-85 transition-opacity">
          <Logo className="w-auto h-10 sm:h-11" priority={true} />
        </Link>

        <div className="flex items-center gap-2">
          <ThemeToggle variant="toggle" />
          <button
            type="button"
            onClick={() => setMenuOpen((open) => !open)}
            className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-neutral-200/80 dark:border-white/10 bg-neutral-100/80 dark:bg-neutral-900/80 text-foreground transition-all hover:scale-105 active:scale-95"
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen}
            aria-controls="mobile-navigation"
          >
            {menuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>
        </div>
      </header>

      {/* ─── Mobile Bottom Floating Dock ─── */}
      <nav
        aria-label="Quick mobile navigation"
        className={`lg:hidden fixed bottom-[max(0.75rem,env(safe-area-inset-bottom))] inset-x-3 sm:inset-x-6 w-[calc(100%-1.5rem)] sm:w-auto max-w-md mx-auto z-40 rounded-full border border-neutral-200/80 dark:border-white/10 bg-card/90 dark:bg-neutral-950/90 backdrop-blur-2xl shadow-[0_12px_36px_-6px_rgba(0,0,0,0.15)] dark:shadow-[0_16px_40px_-6px_rgba(0,0,0,0.7)] px-2 py-1.5 transition-transform duration-300 safe-bottom ${
          menuOpen ? 'translate-y-28 opacity-0 pointer-events-none' : 'translate-y-0 opacity-100'
        }`}
      >
        <div className="flex items-center justify-around">
          {navItems
            .filter((item) =>
              ['Home', 'Services', 'Portfolio', 'Blog', 'Contact'].includes(item.name)
            )
            .map(({ name, icon: Icon, href }) => {
              const active = isActive(href);
              return (
                <Link
                  key={name}
                  href={href}
                  aria-current={active ? 'page' : undefined}
                  className={`relative flex flex-1 min-w-0 flex-col items-center gap-0.5 rounded-full px-1.5 sm:px-3 py-1.5 transition-all duration-200 ${
                    active
                      ? 'text-neutral-950 dark:text-white font-semibold'
                      : 'text-neutral-500 dark:text-neutral-400 hover:text-foreground'
                  }`}
                >
                  {active && (
                    <motion.span
                      layoutId="mobileActiveDock"
                      className="absolute inset-0 rounded-full bg-neutral-200/70 dark:bg-white/10"
                      transition={{ type: 'spring', stiffness: 350, damping: 28 }}
                    />
                  )}
                  <Icon
                    className="w-4 h-4 relative z-10"
                    strokeWidth={active ? 2.25 : 1.75}
                  />
                  <span className="text-[10px] tracking-tight relative z-10">{name}</span>
                </Link>
              );
            })}
        </div>
      </nav>

      {/* ─── Mobile Full-Screen Navigation ─── */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            id="mobile-navigation"
            role="dialog"
            aria-modal="true"
            aria-label="Mobile navigation"
            initial={{ clipPath: 'polygon(0 0, 100% 0, 100% 0, 0 0)' }}
            animate={{ clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)' }}
            exit={{ clipPath: 'polygon(0 0, 100% 0, 100% 0, 0 0)' }}
            transition={{ duration: 0.45, ease: [0.76, 0, 0.24, 1] }}
            className="fixed inset-0 z-[60] overflow-y-auto overscroll-contain bg-background text-foreground lg:hidden"
          >
            <div className="mx-auto flex min-h-[100svh] w-full max-w-5xl flex-col px-5 pb-[max(1.5rem,env(safe-area-inset-bottom))] pt-[max(1.25rem,env(safe-area-inset-top))] sm:px-10">
              <div className="flex items-center justify-between gap-3 border-b border-border pb-4 sm:pb-5">
                <Link
                  href="/"
                  onClick={() => setMenuOpen(false)}
                  aria-label="LayerNLooms home"
                >
                  <Logo className="w-auto h-10 sm:h-11" />
                </Link>
                <div className="flex items-center gap-2">
                  <ThemeToggle variant="toggle" />
                  <Link
                    href="/contact"
                    onClick={() => setMenuOpen(false)}
                    className="hidden h-10 items-center rounded-full bg-primary px-4 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-85 sm:inline-flex"
                  >
                    Get in touch
                  </Link>
                  <button
                    type="button"
                    onClick={() => setMenuOpen(false)}
                    className="inline-flex h-10 items-center gap-2 rounded-full border border-border bg-card px-3.5 text-sm font-medium text-foreground transition-colors hover:bg-secondary"
                    aria-label="Close menu"
                  >
                    <span>Close</span>
                    <X className="h-4 w-4" />
                  </button>
                </div>
              </div>

              <nav
                aria-label="Main mobile navigation"
                className="my-auto py-8 sm:py-12"
              >
                <ol className="space-y-0.5">
                  {navItems.map(({ name, icon: Icon, href }, index) => {
                    const active = isActive(href);
                    return (
                      <motion.li
                        key={name}
                        initial={{ opacity: 0, y: 18 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 + index * 0.04, duration: 0.3 }}
                      >
                        <Link
                          href={href}
                          onClick={() => setMenuOpen(false)}
                          aria-current={active ? 'page' : undefined}
                          className={`group flex min-h-[58px] items-center gap-3 border-b border-border py-2 transition-colors sm:min-h-[68px] ${
                            active
                              ? 'text-foreground'
                              : 'text-muted-foreground hover:text-foreground'
                          }`}
                        >
                          <span className="w-7 font-mono text-xs tabular-nums text-muted-foreground">
                            {String(index).padStart(2, '0')}
                          </span>
                          <span className="flex-1 text-2xl font-semibold uppercase tracking-tight sm:text-4xl">
                            {name}
                          </span>
                          <Icon className="h-5 w-5 shrink-0 transition-transform group-hover:translate-x-1" />
                        </Link>
                      </motion.li>
                    );
                  })}
                </ol>
              </nav>

              <div className="flex items-center justify-between border-t border-border pt-4 text-xs text-muted-foreground">
                <span>Thoughtful digital experiences.</span>
                <Link
                  href="/contact"
                  onClick={() => setMenuOpen(false)}
                  className="font-semibold text-foreground sm:hidden"
                >
                  Get in touch{' '}
                  <ArrowUp className="ml-1 inline h-3 w-3 rotate-45" />
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <style jsx global>{`
        @media (max-width: 1023px) {
          body {
            padding-bottom: 76px;
          }
        }
        .safe-bottom {
          padding-bottom: max(0.375rem, env(safe-area-inset-bottom, 0px));
        }
      `}</style>
    </>
  );
};

export default Navbar;
