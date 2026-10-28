'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { flushSync } from 'react-dom';

export type Theme = 'light' | 'dark' | 'system';
export type ScrollbarTheme = 'zinc' | 'purple' | 'green' | 'cyan' | 'amber' | 'pink';
export type PointerTheme = 'zinc' | 'purple' | 'green' | 'cyan' | 'amber' | 'pink';
export type PointerStyle = 'classic' | 'glowing' | 'crosshair' | 'bracket' | 'orbital' | 'sonar';
export type ThemeTransitionEvent =
  | React.MouseEvent<unknown>
  | { clientX?: number; clientY?: number; currentTarget?: HTMLElement | null };

const scrollbarThemes = {
  zinc: { light: '#52525b', dark: '#a1a1aa', hoverLight: '#27272a', hoverDark: '#f4f4f5' },
  purple: { light: '#8b5cf6', dark: '#a78bfa', hoverLight: '#7c3aed', hoverDark: '#c084fc' },
  green: { light: '#059669', dark: '#34d399', hoverLight: '#047857', hoverDark: '#6ee7b7' },
  cyan: { light: '#0891b2', dark: '#22d3ee', hoverLight: '#0e7490', hoverDark: '#67e8f9' },
  amber: { light: '#ea580c', dark: '#fb923c', hoverLight: '#c2410c', hoverDark: '#fdba74' },
  pink: { light: '#db2777', dark: '#f472b6', hoverLight: '#be185d', hoverDark: '#f9a8d4' },
};

const pointerThemes = {
  zinc: { light: '#171717', dark: '#fafafa', glowLight: 'rgba(23,23,23,0.15)', glowDark: 'rgba(250,250,250,0.15)' },
  purple: { light: '#8b5cf6', dark: '#a78bfa', glowLight: 'rgba(139,92,246,0.2)', glowDark: 'rgba(167,139,250,0.2)' },
  green: { light: '#059669', dark: '#34d399', glowLight: 'rgba(5,150,105,0.2)', glowDark: 'rgba(52,211,153,0.2)' },
  cyan: { light: '#0891b2', dark: '#22d3ee', glowLight: 'rgba(8,145,178,0.2)', glowDark: 'rgba(34,211,238,0.2)' },
  amber: { light: '#ea580c', dark: '#fb923c', glowLight: 'rgba(234,88,12,0.2)', glowDark: 'rgba(251,146,60,0.2)' },
  pink: { light: '#db2777', dark: '#f472b6', glowLight: 'rgba(219,39,119,0.2)', glowDark: 'rgba(244,114,182,0.2)' },
};

export const themeAccentColors: Record<PointerTheme, { light: string; dark: string }> = {
  zinc: { light: '#27272a', dark: '#e4e4e7' },
  purple: { light: '#7c3aed', dark: '#a78bfa' },
  green: { light: '#059669', dark: '#34d399' },
  cyan: { light: '#0891b2', dark: '#22d3ee' },
  amber: { light: '#d97706', dark: '#fb923c' },
  pink: { light: '#db2777', dark: '#f472b6' },
};

interface ThemeContextType {
  theme: Theme;
  resolvedTheme: 'light' | 'dark';
  accentColor: string;
  setTheme: (theme: Theme, event?: ThemeTransitionEvent) => void;
  toggleTheme: (event?: ThemeTransitionEvent) => void;
  scrollbarTheme: ScrollbarTheme;
  setScrollbarTheme: (theme: ScrollbarTheme) => void;
  pointerTheme: PointerTheme;
  setPointerTheme: (theme: PointerTheme) => void;
  pointerEnabled: boolean;
  setPointerEnabled: (enabled: boolean) => void;
  pointerStyle: PointerStyle;
  setPointerStyle: (style: PointerStyle) => void;
  pointerEffects: boolean;
  setPointerEffects: (enabled: boolean) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

function applyAccentVariables(root: HTMLElement, theme: PointerTheme) {
  const prefix = `--accent-${theme}`;
  const foreground = `${prefix}-foreground`;
  const muted = `${prefix}-muted`;
  const mutedForeground = `${prefix}-muted-foreground`;

  root.style.setProperty('--accent-current', `var(${prefix})`);
  root.style.setProperty('--accent-current-foreground', `var(${foreground})`);
  root.style.setProperty('--accent-current-muted', `var(${muted})`);
  root.style.setProperty('--accent-current-muted-foreground', `var(${mutedForeground})`);
}

function disableTransitions(): () => void {
  if (typeof document === 'undefined') return () => {};
  const css = document.createElement('style');
  css.setAttribute('type', 'text/css');
  css.setAttribute('id', 'disable-theme-transitions');
  css.appendChild(
    document.createTextNode(
      `*, *::before, *::after {
        -webkit-transition: none !important;
        -moz-transition: none !important;
        -o-transition: none !important;
        -ms-transition: none !important;
        transition: none !important;
      }`
    )
  );
  document.head.appendChild(css);

  return () => {
    // Force style recalculation so DOM is in new state before re-enabling transitions
    (() => window.getComputedStyle(document.body).opacity)();
    const styleEl = document.getElementById('disable-theme-transitions');
    if (styleEl && styleEl.parentNode) {
      styleEl.parentNode.removeChild(styleEl);
    }
  };
}

function applyThemeToDocument(
  isDark: boolean,
  scrollbarTheme: ScrollbarTheme,
  pointerTheme: PointerTheme
) {
  const root = document.documentElement;
  if (isDark) {
    root.classList.add('dark');
  } else {
    root.classList.remove('dark');
  }

  const mode = isDark ? 'dark' : 'light';
  const scrollbarColors = scrollbarThemes[scrollbarTheme] || scrollbarThemes.zinc;
  root.style.setProperty('--scrollbar-thumb-color', scrollbarColors[mode]);
  root.style.setProperty('--scrollbar-thumb-hover', scrollbarColors[isDark ? 'hoverDark' : 'hoverLight']);
  root.style.setProperty('--scrollbar-track-border', isDark ? '#1f1f22' : '#f3f4f6');

  const pointerColors = pointerThemes[pointerTheme] || pointerThemes.zinc;
  root.style.setProperty('--cursor-color', pointerColors[mode]);
  root.style.setProperty('--cursor-glow-color', pointerColors[isDark ? 'glowDark' : 'glowLight']);

  applyAccentVariables(root, pointerTheme);
}

function getInitialStorage<T>(key: string, fallback: T): T {
  if (typeof window === 'undefined') return fallback;
  try {
    const val = localStorage.getItem(key);
    return (val as T) || fallback;
  } catch {
    return fallback;
  }
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = useState<Theme>(() => getInitialStorage('theme', 'system'));
  const [resolvedTheme, setResolvedTheme] = useState<'light' | 'dark'>(() => {
    if (typeof window === 'undefined') return 'dark';
    const saved = localStorage.getItem('theme') || 'system';
    if (saved === 'dark') return 'dark';
    if (saved === 'light') return 'light';
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  });
  const [scrollbarTheme, setScrollbarThemeState] = useState<ScrollbarTheme>(() => getInitialStorage('scrollbarTheme', 'zinc'));
  const [pointerTheme, setPointerThemeState] = useState<PointerTheme>(() => getInitialStorage('pointerTheme', 'zinc'));
  const [pointerEnabled, setPointerEnabledState] = useState<boolean>(() => {
    if (typeof window === 'undefined') return true;
    try {
      const val = localStorage.getItem('pointerEnabled');
      return val !== null ? val === 'true' : true;
    } catch {
      return true;
    }
  });
  const [pointerStyle, setPointerStyleState] = useState<PointerStyle>(() => getInitialStorage('pointerStyle', 'classic'));
  const [pointerEffects, setPointerEffectsState] = useState<boolean>(() => {
    if (typeof window === 'undefined') return false;
    try {
      const val = localStorage.getItem('pointerEffects');
      return val !== null ? val === 'true' : false;
    } catch {
      return false;
    }
  });

  const setTheme = (newTheme: Theme, event?: ThemeTransitionEvent) => {
    if (typeof window === 'undefined') {
      setThemeState(newTheme);
      return;
    }

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const willBeDark =
      newTheme === 'dark' || (newTheme === 'system' && mediaQuery.matches);
    const currentlyDark = document.documentElement.classList.contains('dark');

    // If visually identical (e.g. system is dark, user clicks 'dark'):
    if (willBeDark === currentlyDark) {
      setThemeState(newTheme);
      setResolvedTheme(willBeDark ? 'dark' : 'light');
      localStorage.setItem('theme', newTheme);
      return;
    }

    const isReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const canViewTransition =
      typeof document !== 'undefined' &&
      'startViewTransition' in document &&
      !isReducedMotion &&
      Boolean(event);

    if (!canViewTransition) {
      // Instant switch with transition suppression to eliminate flickering
      const cleanup = disableTransitions();
      applyThemeToDocument(willBeDark, scrollbarTheme, pointerTheme);
      setThemeState(newTheme);
      setResolvedTheme(willBeDark ? 'dark' : 'light');
      localStorage.setItem('theme', newTheme);
      requestAnimationFrame(() => {
        cleanup();
      });
      return;
    }

    // Circular View Transition
    let x = window.innerWidth / 2;
    let y = window.innerHeight / 2;

    if (event && 'currentTarget' in event && event.currentTarget instanceof HTMLElement) {
      const rect = event.currentTarget.getBoundingClientRect();
      if (
        typeof event.clientX === 'number' &&
        typeof event.clientY === 'number' &&
        (event.clientX !== 0 || event.clientY !== 0)
      ) {
        x = event.clientX;
        y = event.clientY;
      } else {
        x = rect.left + rect.width / 2;
        y = rect.top + rect.height / 2;
      }
    } else if (
      event &&
      typeof event.clientX === 'number' &&
      typeof event.clientY === 'number'
    ) {
      x = event.clientX;
      y = event.clientY;
    }

    const endRadius = Math.hypot(
      Math.max(x, window.innerWidth - x),
      Math.max(y, window.innerHeight - y)
    );

    const cleanup = disableTransitions();

    try {
      const transition = (
        document as unknown as {
          startViewTransition: (cb: () => void) => { ready: Promise<void>; finished: Promise<void> };
        }
      ).startViewTransition(() => {
        applyThemeToDocument(willBeDark, scrollbarTheme, pointerTheme);
        try {
          flushSync(() => {
            setThemeState(newTheme);
            setResolvedTheme(willBeDark ? 'dark' : 'light');
          });
        } catch {
          setThemeState(newTheme);
          setResolvedTheme(willBeDark ? 'dark' : 'light');
        }
        localStorage.setItem('theme', newTheme);
      });

      transition.ready
        .then(() => {
          cleanup();
          document.documentElement.animate(
            {
              clipPath: [
                `circle(0px at ${x}px ${y}px)`,
                `circle(${endRadius}px at ${x}px ${y}px)`,
              ],
            },
            {
              duration: 450,
              easing: 'ease-in-out',
              pseudoElement: '::view-transition-new(root)',
            }
          );
        })
        .catch(() => {
          cleanup();
        });
    } catch {
      cleanup();
      applyThemeToDocument(willBeDark, scrollbarTheme, pointerTheme);
      setThemeState(newTheme);
      setResolvedTheme(willBeDark ? 'dark' : 'light');
      localStorage.setItem('theme', newTheme);
    }
  };

  const toggleTheme = (event?: ThemeTransitionEvent) => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const isDark = theme === 'dark' || (theme === 'system' && mediaQuery.matches);
    setTheme(isDark ? 'light' : 'dark', event);
  };

  const setScrollbarTheme = (newScrollbar: ScrollbarTheme) => {
    setScrollbarThemeState(newScrollbar);
    localStorage.setItem('scrollbarTheme', newScrollbar);
  };

  const setPointerTheme = (newPointer: PointerTheme) => {
    setPointerThemeState(newPointer);
    localStorage.setItem('pointerTheme', newPointer);
  };

  const setPointerEnabled = (enabled: boolean) => {
    setPointerEnabledState(enabled);
    localStorage.setItem('pointerEnabled', String(enabled));
  };

  const setPointerStyle = (style: PointerStyle) => {
    setPointerStyleState(style);
    localStorage.setItem('pointerStyle', style);
  };

  const setPointerEffects = (enabled: boolean) => {
    setPointerEffectsState(enabled);
    localStorage.setItem('pointerEffects', String(enabled));
  };

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');

    const applyColors = () => {
      const isDark = theme === 'dark' || (theme === 'system' && mediaQuery.matches);
      setResolvedTheme(isDark ? 'dark' : 'light');
      applyThemeToDocument(isDark, scrollbarTheme, pointerTheme);

      const root = document.documentElement;
      if (pointerEnabled) {
        root.classList.add('custom-cursor-active');
      } else {
        root.classList.remove('custom-cursor-active');
      }
    };

    applyColors();

    const handleChange = () => {
      if (theme === 'system') {
        applyColors();
      }
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, [theme, scrollbarTheme, pointerTheme, pointerEnabled]);

  const accentColor =
    (themeAccentColors[pointerTheme] || themeAccentColors.zinc)[resolvedTheme];

  return (
    <ThemeContext.Provider
      value={{
        theme,
        resolvedTheme,
        accentColor,
        setTheme,
        toggleTheme,
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
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}
