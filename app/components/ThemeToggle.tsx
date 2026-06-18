'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FiSun, FiMonitor, FiMoon } from 'react-icons/fi';
import { useTheme } from '../context/ThemeContext';

type Theme = 'light' | 'dark' | 'system';

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Prevent hydration layout shift / mismatch warnings
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div className="w-[110px] h-[38px] bg-neutral-100/50 dark:bg-neutral-900/50 rounded-full border border-neutral-200/30 dark:border-neutral-800/30" />;
  }

  const themes: { name: Theme; icon: any }[] = [
    { name: 'light', icon: FiSun },
    { name: 'system', icon: FiMonitor },
    { name: 'dark', icon: FiMoon },
  ];

  return (
    <div className="flex items-center gap-0.5 bg-neutral-100/80 dark:bg-neutral-900/80 p-1 rounded-full border border-neutral-200/50 dark:border-neutral-800/50 shadow-sm relative shrink-0">
      {themes.map((t) => {
        const Icon = t.icon;
        const active = theme === t.name;
        return (
          <button
            key={t.name}
            onClick={() => setTheme(t.name)}
            className={`relative p-1.5 rounded-full transition-colors duration-200 cursor-pointer ${
              active
                ? 'text-neutral-900 dark:text-white'
                : 'text-neutral-400 dark:text-neutral-500 hover:text-neutral-900 dark:hover:text-white'
            }`}
            aria-label={`Switch to ${t.name} theme`}
          >
            {active && (
              <motion.span
                layoutId="activeTheme"
                className="absolute inset-0 bg-neutral-200/80 dark:bg-neutral-800 rounded-full -z-0"
                transition={{ type: 'spring', stiffness: 300, damping: 25 }}
              />
            )}
            <Icon className="w-4 h-4 relative z-10" />
          </button>
        );
      })}
    </div>
  );
}
