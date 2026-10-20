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
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 30);
      setVisible(y < prevScroll.current || y < 80);
      prevScroll.current = y;
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const onResize = () => { if (window.innerWidth >= 1024) setMenuOpen(false); };
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
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
        className={`hidden lg:flex sticky top-3 z-50 items-center justify-between w-full px-4 xl:px-6 py-2 rounded-2xl transition-all duration-300 border border-border bg-card shadow-[0_8px_30px_rgba(0,0,0,0.08)] dark:shadow-[0_8px_30px_rgba(0,0,0,0.3)] ${
          scrolled ? 'bg-card' : 'bg-card/95 backdrop-blur-2xl'
        } ${visible ? 'translate-y-0 opacity-100' : '-translate-y-24 opacity-0'}`}
      >
        <Link href="/" className="shrink-0 flex items-center hover:scale-105 transition-transform duration-300">
          <Logo className="w-auto h-10 lg:h-11" priority={true} />
        </Link>

        <nav aria-label="Main navigation" className="flex items-center gap-1 bg-secondary p-1 rounded-full border border-border">
          {navItems.map((item) => {
            const active = isActive(item.href);
            return (
              <Link
                key={item.name}
                href={item.href}
                aria-current={active ? 'page' : undefined}
                className={`relative px-3.5 xl:px-4 py-2 text-xs font-medium rounded-full transition-colors duration-300 ${
                  active
                    ? 'text-primary-foreground'
                    : 'text-muted-foreground hover:bg-card hover:text-foreground'
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
          <ThemeToggle variant="toggle" />
          <Link
            href="/contact"
            className="relative isolate group overflow-hidden px-5 py-2.5 text-xs font-semibold rounded-full border border-border bg-background text-foreground hover:border-primary hover:text-primary-foreground transition-colors duration-300"
          >
            <span className="absolute inset-0 z-0 h-full w-full translate-y-full rounded-full bg-primary transition-transform duration-300 ease-out group-hover:translate-y-0" />
            <span className="relative z-10">Get Started</span>
          </Link>
        </div>
      </header>

      {/* ─── Desktop Floating Bottom Nav (appears when scrolling down) ─── */}
      <nav
        aria-label="Quick navigation"
        className={`hidden lg:flex fixed bottom-6 left-1/2 -translate-x-1/2 z-50 items-center gap-2 px-4 py-2.5 bg-card border border-border rounded-2xl shadow-lg transition-all duration-500 ${
          !visible && scrolled
            ? 'translate-y-0 opacity-100'
            : 'translate-y-6 opacity-0 pointer-events-none'
        }`}
      >
        {navItems.filter(item => ['Home', 'Services', 'Portfolio', 'Blog', 'Contact'].includes(item.name)).map(({ name, icon: Icon, href }) => {
          const active = isActive(href);
          return (
            <Link
              key={name}
              href={href}
              aria-current={active ? 'page' : undefined}
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
          <ArrowUp className="w-4 h-4" />
        </button>
      </nav>

      {/* ─── Mobile Floating Top Bar ─── */}
      <header
        className={`lg:hidden sticky top-3 z-50 flex items-center justify-between w-full px-3.5 py-2 rounded-2xl border border-border bg-card shadow-[0_8px_30px_rgba(0,0,0,0.08)] dark:shadow-[0_8px_30px_rgba(0,0,0,0.3)] transition-all duration-300 ${
          visible ? 'translate-y-0 opacity-100' : '-translate-y-24 opacity-0'
        }`}
      >
        <Link href="/" className="hover:opacity-95 transition-opacity">
          <Logo className="w-auto h-8 lg:h-9" priority={true} />
        </Link>

        <div className="flex items-center gap-2">
          <ThemeToggle variant="toggle" />
          <button
            type="button"
            onClick={() => setMenuOpen((open) => !open)}
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-border bg-secondary text-foreground transition-colors hover:bg-primary hover:text-primary-foreground"
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen}
            aria-controls="mobile-navigation"
          >
            {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </header>

      {/* ─── Mobile Bottom Tab Bar ─── */}
      <nav aria-label="Quick navigation" className={`lg:hidden fixed bottom-0 left-0 right-0 z-40 border-t border-border bg-card shadow-[0_-8px_24px_rgba(0,0,0,0.06)] safe-bottom transition-transform duration-300 ${menuOpen ? 'translate-y-full' : 'translate-y-0'}`}>
        <div className="mx-auto flex max-w-lg items-center justify-around px-2 py-2">
          {navItems.filter(item => ['Home', 'Services', 'Portfolio', 'Blog', 'Contact'].includes(item.name)).map(({ name, icon: Icon, href }) => {
            const active = isActive(href);
              return (
                <Link
                  key={name}
                  href={href}
                  aria-current={active ? 'page' : undefined}
                  className={`relative flex min-w-[60px] flex-col items-center gap-0.5 rounded-xl px-3 py-1.5 transition-all duration-200 ${
                    active
                      ? 'text-foreground'
                      : 'text-muted-foreground hover:text-foreground'
                  }`}
                >
                  <Icon className="w-[18px] h-[18px]" strokeWidth={active ? 2.25 : 1.75} />
                  <span className="text-[10px] font-medium">{name}</span>
                  {active && (
                    <motion.span
                      layoutId="mobileActiveDot"
                      className="absolute -bottom-0.5 h-1 w-1 rounded-full bg-primary"
                      transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                    />
                  )}
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
                  <Link href="/" onClick={() => setMenuOpen(false)} aria-label="LayerNLooms home">
                    <Logo className="h-8 w-auto sm:h-9" />
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

                <nav aria-label="Main mobile navigation" className="my-auto py-8 sm:py-12">
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
                              active ? 'text-foreground' : 'text-muted-foreground hover:text-foreground'
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
                  <Link href="/contact" onClick={() => setMenuOpen(false)} className="font-semibold text-foreground sm:hidden">
                    Get in touch <ArrowUp className="ml-1 inline h-3 w-3 rotate-45" />
                  </Link>
                </div>
              </div>
          </motion.div>
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
