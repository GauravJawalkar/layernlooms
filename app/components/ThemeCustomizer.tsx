"use client";

import { useState, type ReactNode } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  Check,
  Monitor,
  Moon,
  MousePointer2,
  Palette,
  Settings2,
  SlidersHorizontal,
  Sparkles,
  Sun,
  X,
  type LucideIcon,
} from "lucide-react";
import {
  useTheme,
  type PointerStyle,
  type ScrollbarTheme,
  type Theme,
} from "../context/ThemeContext";

const themeModes: { id: Theme; label: string; icon: LucideIcon }[] = [
  { id: "light", label: "Light", icon: Sun },
  { id: "system", label: "System", icon: Monitor },
  { id: "dark", label: "Dark", icon: Moon },
];

const colorOptions: {
  id: ScrollbarTheme;
  label: string;
  color: string;
}[] = [
  { id: "zinc", label: "Graphite", color: "#71717a" },
  { id: "purple", label: "Violet", color: "#8b5cf6" },
  { id: "green", label: "Emerald", color: "#10b981" },
  { id: "cyan", label: "Cyan", color: "#06b6d4" },
  { id: "amber", label: "Amber", color: "#f59e0b" },
  { id: "pink", label: "Rose", color: "#ec4899" },
];

const cursorStyles: {
  id: PointerStyle;
  label: string;
  description: string;
}[] = [
  { id: "classic", label: "Classic", description: "Dot with trailing ring" },
  { id: "glowing", label: "Glow", description: "Soft luminous aura" },
  { id: "crosshair", label: "Crosshair", description: "Precision guide lines" },
  { id: "bracket", label: "Brackets", description: "Focused targeting frame" },
  { id: "orbital", label: "Orbital", description: "Satellite ring motion" },
  { id: "sonar", label: "Sonar", description: "Expanding radar pulses" },
  { id: "minimal", label: "Minimal", description: "A clean, precise pointer" },
  { id: "trail", label: "Trail", description: "Soft dots follow your movement" },
  { id: "spotlight", label: "Spotlight", description: "A calm, diffused glow" },
  { id: "comet", label: "Comet", description: "A luminous trailing core" },
  { id: "pulse", label: "Pulse", description: "Concentric animated waves" },
  { id: "diamond", label: "Diamond", description: "A geometric shifting frame" },
];

function SectionLabel({
  icon: Icon,
  children,
}: {
  icon: LucideIcon;
  children: ReactNode;
}) {
  return (
    <div className="mb-3 flex items-center gap-2">
      <Icon className="size-3.5 text-accent-current" aria-hidden="true" />
      <h4 className="text-[11px] font-bold uppercase tracking-[0.16em] text-foreground">
        {children}
      </h4>
    </div>
  );
}

function ColorSwatches({
  selected,
  onSelect,
  label,
}: {
  selected: ScrollbarTheme;
  onSelect: (color: ScrollbarTheme) => void;
  label: string;
}) {
  return (
    <div className="flex flex-wrap gap-2.5">
      {colorOptions.map((option) => {
        const active = selected === option.id;
        return (
          <button
            key={`${label}-${option.id}`}
            type="button"
            onClick={() => onSelect(option.id)}
            aria-label={`${label}: ${option.label}`}
            aria-pressed={active}
            title={option.label}
            className={`group relative grid size-8 place-items-center rounded-full transition-transform hover:scale-110 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-current ${
              active ? "ring-2 ring-accent-current ring-offset-2 ring-offset-card" : ""
            }`}
            style={{ backgroundColor: option.color }}
          >
            {active && <Check className="size-4 text-white drop-shadow" />}
          </button>
        );
      })}
    </div>
  );
}

export default function ThemeCustomizer() {
  const {
    theme,
    setTheme,
    scrollbarTheme,
    setScrollbarTheme,
    pointerTheme,
    setPointerTheme,
    pointerEnabled,
    setPointerEnabled,
    pointerStyle,
    setPointerStyle,
    pointerEffects,
    setPointerEffects,
  } = useTheme();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="fixed bottom-20 right-4 z-40 hidden flex-col items-end md:flex md:bottom-24 md:right-6 lg:bottom-8">
      <AnimatePresence>
        {isOpen && (
          <motion.aside
            id="appearance-controls"
            aria-label="Appearance settings"
            initial={{ opacity: 0, y: 12, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.97 }}
            transition={{ duration: 0.2, ease: [0.2, 0.8, 0.2, 1] }}
            className="mb-3 flex max-h-[min(82vh,48rem)] w-[min(24rem,92vw)] origin-bottom-right flex-col overflow-hidden rounded-[1.5rem] border border-border/70 bg-card/95 text-card-foreground shadow-2xl shadow-black/15 backdrop-blur-2xl"
          >
            <header className="flex items-center justify-between border-b border-border/70 px-5 py-4">
              <div className="flex items-center gap-3">
                <div className="grid size-9 place-items-center rounded-xl bg-accent-current/10 text-accent-current">
                  <Palette className="size-4" aria-hidden="true" />
                </div>
                <div>
                  <h3 className="text-sm font-bold tracking-tight">Appearance</h3>
                  <p className="mt-0.5 text-[10px] text-muted-foreground">
                    Make the interface yours
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                aria-label="Close appearance settings"
                className="grid size-8 place-items-center rounded-lg text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-current"
              >
                <X className="size-4" />
              </button>
            </header>

            <div className="overflow-y-auto px-5 py-4">
              <section>
                <SectionLabel icon={Sun}>Color mode</SectionLabel>
                <div className="grid grid-cols-3 gap-2">
                  {themeModes.map(({ id, label, icon: Icon }) => {
                    const active = theme === id;
                    return (
                      <button
                        key={id}
                        type="button"
                        onClick={(event) => setTheme(id, event)}
                        aria-pressed={active}
                        className={`flex min-h-16 flex-col items-center justify-center gap-1.5 rounded-xl border text-[11px] font-semibold transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-current ${
                          active
                            ? "border-accent-current/40 bg-accent-current/10 text-accent-current"
                            : "border-border/70 bg-background/50 text-muted-foreground hover:border-border hover:bg-secondary/70 hover:text-foreground"
                        }`}
                      >
                        <Icon className="size-4" aria-hidden="true" />
                        {label}
                      </button>
                    );
                  })}
                </div>
              </section>

              <section className="mt-5 border-t border-border/70 pt-4">
                <SectionLabel icon={Sparkles}>Interface accent</SectionLabel>
                <p className="mb-3 text-[10px] leading-relaxed text-muted-foreground">
                  Choose the highlight color used across the site and cursor.
                </p>
                <ColorSwatches
                  label="Accent color"
                  selected={pointerTheme}
                  onSelect={setPointerTheme}
                />
              </section>

              <section className="mt-5 border-t border-border/70 pt-4">
                <SectionLabel icon={Settings2}>Scrollbar color</SectionLabel>
                <ColorSwatches
                  label="Scrollbar color"
                  selected={scrollbarTheme}
                  onSelect={setScrollbarTheme}
                />
              </section>

              <section className="mt-5 border-t border-border/70 pt-4">
                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-2.5">
                    <MousePointer2
                      className="size-4 text-accent-current"
                      aria-hidden="true"
                    />
                    <div>
                      <h4 className="text-[11px] font-bold">Custom cursor</h4>
                      <p className="mt-0.5 text-[10px] text-muted-foreground">
                        Personalize pointer effects
                      </p>
                    </div>
                  </div>
                  <button
                    type="button"
                    role="switch"
                    aria-checked={pointerEnabled}
                    aria-label="Custom cursor"
                    onClick={() => setPointerEnabled(!pointerEnabled)}
                    className={`relative h-6 w-11 shrink-0 rounded-full transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-current ${
                      pointerEnabled ? "bg-accent-current" : "bg-secondary"
                    }`}
                  >
                    <span
                      className={`absolute top-1 size-4 rounded-full bg-white shadow-sm transition-transform ${
                        pointerEnabled ? "left-1 translate-x-5" : "left-1"
                      }`}
                    />
                  </button>
                </div>

                <AnimatePresence initial={false}>
                  {pointerEnabled && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.2 }}
                      className="overflow-hidden"
                    >
                      <div className="mt-4">
                        <p className="mb-2.5 text-[10px] font-medium text-muted-foreground">
                          Cursor color
                        </p>
                        <ColorSwatches
                          label="Cursor color"
                          selected={pointerTheme}
                          onSelect={setPointerTheme}
                        />
                      </div>

                      <div className="mt-4">
                        <p className="mb-2.5 text-[10px] font-medium text-muted-foreground">
                          Cursor style
                        </p>
                        <div className="grid grid-cols-3 gap-1.5">
                          {cursorStyles.map((style) => {
                            const active = pointerStyle === style.id;
                            return (
                              <button
                                key={style.id}
                                type="button"
                                onClick={() => setPointerStyle(style.id)}
                                aria-pressed={active}
                                title={style.description}
                                className={`min-h-9 rounded-lg border px-1.5 text-[10px] font-semibold transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-current ${
                                  active
                                    ? "border-accent-current/40 bg-accent-current/10 text-accent-current"
                                    : "border-border/60 text-muted-foreground hover:bg-secondary/70 hover:text-foreground"
                                }`}
                              >
                                {style.label}
                              </button>
                            );
                          })}
                        </div>
                        <p className="mt-2 text-[10px] text-muted-foreground">
                          {cursorStyles.find((style) => style.id === pointerStyle)
                            ?.description}
                        </p>
                      </div>

                      <div className="mt-4 flex items-center justify-between border-t border-border/60 pt-3">
                        <div>
                          <p className="text-[10px] font-semibold">Snap & ripple</p>
                          <p className="mt-0.5 text-[10px] text-muted-foreground">
                            Add click feedback
                          </p>
                        </div>
                        <button
                          type="button"
                          role="switch"
                          aria-checked={pointerEffects}
                          aria-label="Snap and ripple effects"
                          onClick={() => setPointerEffects(!pointerEffects)}
                          className={`relative h-5 w-9 rounded-full transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-current ${
                            pointerEffects ? "bg-accent-current" : "bg-secondary"
                          }`}
                        >
                          <span
                            className={`absolute top-0.5 size-4 rounded-full bg-white shadow-sm transition-transform ${
                              pointerEffects ? "left-0.5 translate-x-4" : "left-0.5"
                            }`}
                          />
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </section>
            </div>

            <footer className="flex items-center justify-between border-t border-border/70 bg-background/50 px-5 py-3">
              <span className="text-[9px] font-medium uppercase tracking-[0.16em] text-muted-foreground">
                Live preview
              </span>
              <span className="flex items-center gap-1.5 text-[10px] font-semibold text-accent-current">
                <span className="size-1.5 rounded-full bg-accent-current" />
                Changes saved automatically
              </span>
            </footer>
          </motion.aside>
        )}
      </AnimatePresence>

      <motion.button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        whileTap={{ scale: 0.94 }}
        aria-label={isOpen ? "Close appearance settings" : "Open appearance settings"}
        aria-expanded={isOpen}
        aria-controls="appearance-controls"
        className={`grid size-12 place-items-center rounded-2xl border shadow-lg backdrop-blur-xl transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-current ${
          isOpen
            ? "border-accent-current/30 bg-accent-current text-accent-current-foreground"
            : "border-border/70 bg-card/90 text-foreground hover:border-accent-current/40 hover:text-accent-current"
        }`}
      >
        <AnimatePresence mode="wait" initial={false}>
          {isOpen ? (
            <motion.span
              key="close"
              initial={{ opacity: 0, rotate: -45 }}
              animate={{ opacity: 1, rotate: 0 }}
              exit={{ opacity: 0, rotate: 45 }}
              transition={{ duration: 0.15 }}
            >
              <X className="size-5" aria-hidden="true" />
            </motion.span>
          ) : (
            <motion.span
              key="settings"
              initial={{ opacity: 0, rotate: 45 }}
              animate={{ opacity: 1, rotate: 0 }}
              exit={{ opacity: 0, rotate: -45 }}
              transition={{ duration: 0.15 }}
            >
              <SlidersHorizontal className="size-5" aria-hidden="true" />
            </motion.span>
          )}
        </AnimatePresence>
        <span className="sr-only">Appearance settings</span>
      </motion.button>
    </div>
  );
}
