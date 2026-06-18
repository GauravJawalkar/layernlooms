'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Paintbrush, Check, X, MousePointer, Settings, Eye, EyeOff } from 'lucide-react';
import { useTheme, ScrollbarTheme, PointerTheme, PointerStyle, Theme } from '../context/ThemeContext';
import { FiSun, FiMoon, FiMonitor } from 'react-icons/fi';

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

  const themeModes: { name: Theme; label: string; icon: any }[] = [
    { name: 'light', label: 'Light', icon: FiSun },
    { name: 'system', label: 'System', icon: FiMonitor },
    { name: 'dark', label: 'Dark', icon: FiMoon },
  ];

  const colorOptions: { id: ScrollbarTheme; name: string; class: string }[] = [
    { id: 'zinc', name: 'Default Zinc', class: 'bg-zinc-500' },
    { id: 'purple', name: 'Royal Purple', class: 'bg-violet-500' },
    { id: 'green', name: 'Emerald Mint', class: 'bg-emerald-500' },
    { id: 'cyan', name: 'Electric Cyan', class: 'bg-cyan-500' },
    { id: 'amber', name: 'Sunset Amber', class: 'bg-orange-500' },
    { id: 'pink', name: 'Cyber Pink', class: 'bg-pink-500' },
  ];

  const cursorStyles: { id: PointerStyle; label: string; desc: string }[] = [
    { id: 'classic', label: 'Classic', desc: 'Dot + trailing ring' },
    { id: 'glowing', label: 'Glowing', desc: 'Dot + soft blur aura' },
    { id: 'crosshair', label: 'Crosshair', desc: 'Tech crosshair lines' },
  ];

  return (
    <div className="fixed bottom-20 md:bottom-24 lg:bottom-8 right-4 md:right-6 z-40 flex flex-col items-end">
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-center w-12 h-12 rounded-full shadow-lg border text-neutral-800 dark:text-neutral-200 bg-white/90 dark:bg-neutral-900/90 backdrop-blur-md border-neutral-200/80 dark:border-neutral-800/80 cursor-pointer hover:scale-105 transition-transform"
        whileTap={{ scale: 0.95 }}
        aria-label="Open design customizer"
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.div
              key="close"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <X className="w-5 h-5" />
            </motion.div>
          ) : (
            <motion.div
              key="open"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="relative"
            >
              <Paintbrush className="w-5 h-5" />
              <span className="absolute -top-1 -right-1 flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-violet-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-violet-500"></span>
              </span>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="mt-3 w-80 md:w-96 rounded-2xl shadow-2xl border bg-white/95 dark:bg-neutral-950/95 backdrop-blur-xl border-neutral-200/80 dark:border-neutral-800/60 p-5 overflow-hidden"
          >
            <div className="flex items-center justify-between pb-4 border-b border-neutral-100 dark:border-neutral-900">
              <div className="flex items-center gap-2">
                <Settings className="w-4 h-4 text-violet-500" />
                <h3 className="font-bold text-sm text-neutral-800 dark:text-neutral-100">
                  Aesthetic Customizer
                </h3>
              </div>
              <span className="text-[10px] uppercase font-semibold tracking-wider text-neutral-400 dark:text-neutral-500">
                Design System
              </span>
            </div>

            <div className="py-4 space-y-5 text-sm">
              <div className="space-y-2">
                <label className="text-xs font-semibold text-neutral-500 dark:text-neutral-400 block">
                  Interface Theme
                </label>
                <div className="grid grid-cols-3 gap-1 bg-neutral-100/50 dark:bg-neutral-900/50 p-1 rounded-xl border border-neutral-200/20 dark:border-neutral-800/20">
                  {themeModes.map((m) => {
                    const Icon = m.icon;
                    const active = theme === m.name;
                    return (
                      <button
                        key={m.name}
                        onClick={() => setTheme(m.name)}
                        className={`flex items-center justify-center gap-1.5 py-1.5 px-2.5 rounded-lg text-xs font-semibold cursor-pointer transition-all ${
                          active
                            ? 'bg-white dark:bg-neutral-800 text-neutral-900 dark:text-white shadow-xs'
                            : 'text-neutral-500 hover:text-neutral-900 dark:hover:text-white'
                        }`}
                      >
                        <Icon className="w-3.5 h-3.5" />
                        {m.label}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-semibold text-neutral-500 dark:text-neutral-400 block">
                  Scrollbar Color Theme
                </label>
                <div className="flex flex-wrap gap-2">
                  {colorOptions.map((opt) => {
                    const active = scrollbarTheme === opt.id;
                    return (
                      <button
                        key={`scroll-${opt.id}`}
                        onClick={() => setScrollbarTheme(opt.id)}
                        className={`relative w-8 h-8 rounded-full border cursor-pointer hover:scale-105 transition-all ${opt.class} ${
                          active
                            ? 'border-neutral-950 dark:border-white ring-2 ring-violet-500/20'
                            : 'border-transparent'
                        }`}
                        title={opt.name}
                      >
                        {active && (
                          <Check className="w-3.5 h-3.5 text-white absolute inset-0 m-auto" />
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="space-y-3 pt-1 border-t border-neutral-100 dark:border-neutral-900">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <MousePointer className="w-4 h-4 text-neutral-400" />
                    <span className="text-xs font-semibold text-neutral-500 dark:text-neutral-400">
                      Custom Mouse Cursor
                    </span>
                  </div>
                  <button
                    onClick={() => setPointerEnabled(!pointerEnabled)}
                    className={`flex items-center justify-center gap-1 py-1 px-2.5 rounded-lg text-[10px] font-bold uppercase tracking-wider cursor-pointer border transition-colors ${
                      pointerEnabled
                        ? 'bg-emerald-50/10 dark:bg-emerald-500/10 border-emerald-200/50 dark:border-emerald-800/50 text-emerald-600 dark:text-emerald-400'
                        : 'bg-neutral-100 dark:bg-neutral-900 border-neutral-200 dark:border-neutral-800 text-neutral-500'
                    }`}
                  >
                    {pointerEnabled ? (
                      <>
                        <Eye className="w-3 h-3" />
                        Enabled
                      </>
                    ) : (
                      <>
                        <EyeOff className="w-3 h-3" />
                        Disabled
                      </>
                    )}
                  </button>
                </div>

                {pointerEnabled && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="space-y-3 overflow-hidden"
                  >
                    <div className="space-y-1.5">
                      <span className="text-[11px] text-neutral-400 dark:text-neutral-500 block">
                        Cursor Color
                      </span>
                      <div className="flex flex-wrap gap-2">
                        {colorOptions.map((opt) => {
                          const active = pointerTheme === opt.id;
                          return (
                            <button
                              key={`pointer-${opt.id}`}
                              onClick={() => setPointerTheme(opt.id)}
                              className={`relative w-7 h-7 rounded-full border cursor-pointer hover:scale-105 transition-all ${opt.class} ${
                                active
                                  ? 'border-neutral-950 dark:border-white ring-2 ring-violet-500/20'
                                  : 'border-transparent'
                              }`}
                              title={opt.name}
                            >
                              {active && (
                                <Check className="w-3 text-white absolute inset-0 m-auto" />
                              )}
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    <div className="space-y-1.5">
                      <span className="text-[11px] text-neutral-400 dark:text-neutral-500 block">
                        Cursor Visual Style
                      </span>
                      <div className="grid grid-cols-3 gap-1 bg-neutral-50 dark:bg-neutral-900/30 p-0.5 rounded-lg border border-neutral-200/10 dark:border-neutral-800/10">
                        {cursorStyles.map((style) => {
                          const active = pointerStyle === style.id;
                          return (
                            <button
                              key={style.id}
                              onClick={() => setPointerStyle(style.id)}
                              className={`py-1 rounded-md text-[10px] font-semibold transition-all cursor-pointer ${
                                active
                                  ? 'bg-neutral-200 dark:bg-neutral-800 text-neutral-950 dark:text-white shadow-2xs'
                                  : 'text-neutral-500 hover:text-neutral-900 dark:hover:text-white'
                              }`}
                              title={style.desc}
                            >
                              {style.label}
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-2.5 border-t border-neutral-100 dark:border-neutral-900/60 mt-1">
                      <span className="text-[11px] text-neutral-400 dark:text-neutral-500 block">
                        Snap & Ripple Effects
                      </span>
                      <button
                        onClick={() => setPointerEffects(!pointerEffects)}
                        className={`flex items-center justify-center gap-1 py-0.5 px-2 rounded-md text-[9px] font-bold uppercase tracking-wider cursor-pointer border transition-colors ${
                          pointerEffects
                            ? 'bg-violet-50/10 dark:bg-violet-500/10 border-violet-200/50 dark:border-violet-800/50 text-violet-600 dark:text-violet-400'
                            : 'bg-neutral-100 dark:bg-neutral-900 border-neutral-200 dark:border-neutral-800 text-neutral-500'
                        }`}
                      >
                        {pointerEffects ? 'Active' : 'Off'}
                      </button>
                    </div>
                  </motion.div>
                )}
              </div>
            </div>

            <div className="pt-3 border-t border-neutral-100 dark:border-neutral-900 text-center">
              <span className="text-[10px] text-neutral-400 dark:text-neutral-500">
                Hover over interactive elements to see cursors adapt.
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
