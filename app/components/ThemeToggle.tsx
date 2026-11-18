'use client';

import { useId, useSyncExternalStore } from 'react';
import { motion } from 'framer-motion';
import { Monitor, Moon, Sun, type LucideIcon } from 'lucide-react';
import { useTheme, type Theme } from '../context/ThemeContext';

const emptySubscribe = () => () => {};

interface ThemeToggleProps {
  className?: string;
  variant?: 'pill' | 'toggle';
}

export default function ThemeToggle({ className = '', variant = 'pill' }: ThemeToggleProps) {
  const { theme, resolvedTheme, setTheme, toggleTheme } = useTheme();
  const mounted = useSyncExternalStore(emptySubscribe, () => true, () => false);
  const id = useId();

  if (!mounted) {
    return variant === 'toggle' ? (
      <div
        aria-hidden="true"
        className={`w-9 h-9 bg-neutral-100/50 dark:bg-neutral-900/50 rounded-full border border-neutral-200/30 dark:border-neutral-800/30 ${className}`}
      />
    ) : (
      <div
        aria-hidden="true"
        className={`w-[110px] h-[38px] bg-neutral-100/50 dark:bg-neutral-900/50 rounded-full border border-neutral-200/30 dark:border-neutral-800/30 ${className}`}
      />
    );
  }

  if (variant === 'toggle') {
    const isDark = resolvedTheme === 'dark';

    return (
      <button
        type="button"
        onClick={(e) => toggleTheme(e)}
        className={`relative p-2 rounded-full border border-neutral-200/60 dark:border-neutral-800/60 bg-neutral-100/80 dark:bg-neutral-900/80 text-neutral-700 dark:text-neutral-200 hover:text-foreground hover:bg-neutral-200/80 dark:hover:bg-neutral-800 transition-colors shadow-xs cursor-pointer ${className}`}
        aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      >
        {isDark ? (
          <Sun className="w-4 h-4 text-white" />
        ) : (
          <Moon className="w-4 h-4 text-neutral-800 dark:text-neutral-200" />
        )}
      </button>
    );
  }

  const themes: { name: Theme; icon: LucideIcon }[] = [
    { name: 'light', icon: Sun },
    { name: 'system', icon: Monitor },
    { name: 'dark', icon: Moon },
  ];

  return (
    <div
      className={`flex items-center gap-0.5 bg-neutral-100/80 dark:bg-neutral-900/80 p-1 rounded-full border border-neutral-200/50 dark:border-neutral-800/50 shadow-sm relative shrink-0 ${className}`}
    >
      {themes.map((t) => {
        const Icon = t.icon;
        const active = theme === t.name;
        return (
          <button
            key={t.name}
            type="button"
            onClick={(e) => {
              if (active) {
                toggleTheme(e);
              } else {
                setTheme(t.name, e);
              }
            }}
            className={`relative p-1.5 rounded-full transition-colors duration-200 cursor-pointer ${
              active
                ? 'text-neutral-900 dark:text-white'
                : 'text-neutral-400 dark:text-neutral-500 hover:text-neutral-900 dark:hover:text-white'
            }`}
            aria-label={`Switch to ${t.name} theme`}
            aria-pressed={active}
          >
            {active && (
              <motion.span
                layoutId={`activeTheme-${id}`}
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
