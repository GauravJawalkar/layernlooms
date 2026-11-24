"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowRight,
  Coins,
  Handshake,
  Sparkles,
  X,
  ShieldCheck,
  Building2,
} from "lucide-react";

interface PartnerModalProps {
  /** Time in ms before modal automatically triggers (default: 8500ms) */
  delayMs?: number;
  /** Scroll depth ratio (0 - 1) that triggers modal (default: 0.38 = 38%) */
  scrollThreshold?: number;
  /** Number of days to suppress modal after dismissal (default: 7 days) */
  dismissDurationDays?: number;
}

const STORAGE_KEY = "layernlooms_partner_modal_dismissed_until";

export default function PartnerModal({
  delayMs = 8500,
  scrollThreshold = 0.38,
  dismissDurationDays = 7,
}: PartnerModalProps) {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const modalRef = useRef<HTMLDivElement>(null);
  const previousActiveElement = useRef<HTMLElement | null>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Exclude partner and admin pages from triggering the modal
  const isExcludedPage =
    pathname.startsWith("/partner") ||
    pathname.startsWith("/partner-terms") ||
    pathname.startsWith("/admin");

  // Check if modal has been previously dismissed in localStorage
  const isDismissed = useCallback((): boolean => {
    if (typeof window === "undefined") return true;
    try {
      const stored = window.localStorage.getItem(STORAGE_KEY);
      if (!stored) return false;
      const dismissedUntil = parseInt(stored, 10);
      return !isNaN(dismissedUntil) && Date.now() < dismissedUntil;
    } catch {
      return false;
    }
  }, []);

  // Dismiss modal and persist timestamp
  const dismissModal = useCallback(
    (days = dismissDurationDays) => {
      setIsOpen(false);
      try {
        const expiresAt = Date.now() + days * 24 * 60 * 60 * 1000;
        window.localStorage.setItem(STORAGE_KEY, expiresAt.toString());
      } catch {
        // Fallback for private browsing
      }
    },
    [dismissDurationDays]
  );

  // Trigger modal display
  const openModal = useCallback(() => {
    if (isDismissed() || isExcludedPage) return;
    setIsOpen(true);
  }, [isDismissed, isExcludedPage]);

  // Handle timed and scroll triggers
  useEffect(() => {
    if (isExcludedPage || isDismissed()) return;

    // Trigger 1: Timed delay
    timerRef.current = setTimeout(() => {
      openModal();
    }, delayMs);

    // Trigger 2: Scroll depth
    let scrollTriggered = false;
    const handleScroll = () => {
      if (scrollTriggered) return;
      const totalHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight <= 0) return;

      const currentScroll = window.scrollY / totalHeight;
      if (currentScroll >= scrollThreshold) {
        scrollTriggered = true;
        if (timerRef.current) clearTimeout(timerRef.current);
        openModal();
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    // Trigger 3: Manual dispatch event
    const handleCustomTrigger = () => openModal();
    window.addEventListener("open-partner-modal", handleCustomTrigger);

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("open-partner-modal", handleCustomTrigger);
    };
  }, [delayMs, scrollThreshold, isExcludedPage, isDismissed, openModal]);

  // Accessibility: Focus trapping and Escape key
  useEffect(() => {
    if (!isOpen) return;

    previousActiveElement.current = document.activeElement as HTMLElement | null;

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const focusableSelectors =
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])';

    const focusTimer = setTimeout(() => {
      if (!modalRef.current) return;
      const primaryBtn = modalRef.current.querySelector<HTMLElement>(
        '[data-autofocus="true"]'
      );
      if (primaryBtn) {
        primaryBtn.focus();
      } else {
        const firstFocusable =
          modalRef.current.querySelector<HTMLElement>(focusableSelectors);
        firstFocusable?.focus();
      }
    }, 50);

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        dismissModal();
        return;
      }

      if (e.key !== "Tab" || !modalRef.current) return;

      const focusables = Array.from(
        modalRef.current.querySelectorAll<HTMLElement>(focusableSelectors)
      ).filter((el) => !el.hasAttribute("disabled") && el.offsetParent !== null);

      if (focusables.length === 0) return;

      const firstElement = focusables[0];
      const lastElement = focusables[focusables.length - 1];

      if (e.shiftKey) {
        if (document.activeElement === firstElement) {
          e.preventDefault();
          lastElement.focus();
        }
      } else {
        if (document.activeElement === lastElement) {
          e.preventDefault();
          firstElement.focus();
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      clearTimeout(focusTimer);
      document.body.style.overflow = originalOverflow;
      window.removeEventListener("keydown", handleKeyDown);

      if (previousActiveElement.current) {
        previousActiveElement.current.focus();
      }
    };
  }, [isOpen, dismissModal]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 md:p-6"
          role="region"
          aria-label="Partner Program Notification"
        >
          {/* Backdrop: Deep obsidian with high-blur diffusion */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            onClick={() => dismissModal()}
            className="fixed inset-0 bg-black/5 backdrop-blur-xs"
            aria-hidden="true"
          />

          {/* Dialog Container: Strict Black & White Luxury Editorial */}
          <motion.div
            ref={modalRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby="partner-modal-title"
            aria-describedby="partner-modal-subtitle"
            initial={{ opacity: 0, scale: 0.94, y: 18 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 12 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full max-w-4xl overflow-hidden rounded-2xl sm:rounded-3xl border border-white/15 bg-black text-white shadow-2xl shadow-black/80 md:flex md:items-stretch"
          >
            {/* Close Button: Fixed to top-right with accessible ring */}
            <button
              type="button"
              onClick={() => dismissModal()}
              aria-label="Close partner program modal"
              className="absolute top-4 right-4 z-20 grid size-8 sm:size-9 place-items-center rounded-full border border-white/20 bg-black/60 text-neutral-300 backdrop-blur-md transition-all hover:border-white/40 hover:bg-white hover:text-black focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
            >
              <X className="size-4" />
            </button>

            {/* LEFT COLUMN: Monochrome Architectural AI Artwork (Desktop) / Top Banner (Mobile) */}
            <div className="relative h-48 w-full shrink-0 overflow-hidden bg-neutral-950 sm:h-56 md:h-auto md:w-[42%] lg:w-[44%]">
              {/* The AI Generated Architectural Artwork */}
              <Image
                src="/partner-modal.png"
                alt="LayerNlooms architectural monochrome artwork"
                fill
                priority
                sizes="(max-width: 768px) 100vw, 45vw"
                className="object-cover object-center grayscale contrast-125 brightness-95"
              />

              {/* Sophisticated Monochrome Gradient Scrims */}
              <div
                className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent md:bg-gradient-to-r md:from-transparent md:via-black/20 md:to-black"
                aria-hidden="true"
              />
              <div
                className="pointer-events-none absolute inset-0 border-r border-white/10 hidden md:block"
                aria-hidden="true"
              />

              {/* Architectural Overlay Tag (Desktop) */}
              <div className="absolute bottom-4 left-4 right-4 z-10 hidden md:block">
                <div className="rounded-xl border border-white/15 bg-black/70 p-3 backdrop-blur-md">
                  <div className="flex items-center gap-2 text-[10px] font-bold tracking-[0.2em] uppercase text-neutral-300">
                    <Building2 className="size-3 text-white" aria-hidden="true" />
                    <span>ENGINEERING EXCELLENCE</span>
                  </div>
                  <p className="mt-1 text-[11px] font-medium leading-tight text-neutral-400">
                    Bespoke web, mobile & AI solutions crafted for premier brands.
                  </p>
                </div>
              </div>
            </div>

            {/* RIGHT COLUMN: Minimalist Black & White Editorial Content */}
            <div className="relative flex flex-1 flex-col justify-between p-6 sm:p-8 lg:p-10">
              <div>
                {/* Badge: Minimalist Silver / Monochrome Pill */}
                <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-3 py-1 text-[10px] font-bold tracking-[0.22em] uppercase text-white shadow-xs">
                  <Sparkles className="size-3 text-white" aria-hidden="true" />
                  <span>PARTNER PROGRAM</span>
                </div>

                {/* Headline: Clean, high-contrast, pure white */}
                <h2
                  id="partner-modal-title"
                  className="mt-4 text-2xl font-black tracking-tight text-white sm:text-3xl lg:text-[2rem] leading-[1.12]"
                >
                  Grow Together with LayerNLooms
              
                </h2>

                {/* Subtitle: Crisp silver typography */}
                <p
                  id="partner-modal-subtitle"
                  className="mt-2 text-xs sm:text-sm text-neutral-400 leading-relaxed max-w-lg"
                >
                  Join our exclusive network of designers, architects, and retail partners.
                </p>

                {/* Key Highlights: Monochrome Cards */}
                <div className="mt-6 space-y-3">
                  {/* Highlight 1: Commissions */}
                  <div className="group flex items-start gap-3.5 rounded-xl border border-white/10 bg-neutral-950/70 p-3.5 transition-colors hover:border-white/25">
                    <div className="grid size-9 shrink-0 place-items-center rounded-lg border border-white/15 bg-white/5 text-white transition-colors group-hover:bg-white group-hover:text-black">
                      <Coins className="size-4" aria-hidden="true" />
                    </div>
                    <div>
                      <h3 className="text-xs font-bold text-white tracking-tight">
                        Competitive Partner Commissions
                      </h3>
                      <p className="mt-0.5 text-[11px] leading-relaxed text-neutral-400">
                        Guaranteed minimum 10% commission on eligible service fees, scaling higher
                        with enterprise scope and retainers.
                      </p>
                    </div>
                  </div>

                  {/* Highlight 2: Priority Access */}
                  <div className="group flex items-start gap-3.5 rounded-xl border border-white/10 bg-neutral-950/70 p-3.5 transition-colors hover:border-white/25">
                    <div className="grid size-9 shrink-0 place-items-center rounded-lg border border-white/15 bg-white/5 text-white transition-colors group-hover:bg-white group-hover:text-black">
                      <Sparkles className="size-4" aria-hidden="true" />
                    </div>
                    <div>
                      <h3 className="text-xs font-bold text-white tracking-tight">
                        Priority Access to New Releases
                      </h3>
                      <p className="mt-0.5 text-[11px] leading-relaxed text-neutral-400">
                        First-look access to custom AI & engineering architectures, priority
                        delivery bandwidth, and dedicated support.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Trust Points */}
                <div className="mt-4 flex items-center gap-2 text-[11px] text-neutral-400">
                  <ShieldCheck className="size-3.5 text-neutral-300 shrink-0" aria-hidden="true" />
                  <span>Zero upfront fees • 90-day lead protection & attribution</span>
                </div>
              </div>

              {/* Call to Action Buttons */}
              <div className="mt-8 flex flex-col gap-2.5 sm:flex-row sm:items-center">
                {/* Primary Button: Pure stark white with pure black text */}
                <Link
                  href="/partner"
                  data-autofocus="true"
                  onClick={() => dismissModal(14)}
                  className="group flex flex-1 items-center justify-center gap-2 rounded-xl bg-white px-5 py-3.5 text-xs sm:text-sm font-black text-black shadow-xl transition-all hover:bg-neutral-200 active:scale-[0.98] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                >
                  <Handshake className="size-4 transition-transform group-hover:scale-110" />
                  <span>Explore Partner Program</span>
                  <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
