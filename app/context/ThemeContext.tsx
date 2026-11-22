'use client';

import React, { createContext, useContext, useEffect, useMemo, useSyncExternalStore } from 'react';

export type Theme = 'light' | 'dark' | 'system';
export type ScrollbarTheme =
  | 'zinc'
  | 'purple'
  | 'green'
  | 'cyan'
  | 'blue'
  | 'amber'
  | 'red'
  | 'pink';
export type PointerTheme =
  | 'zinc'
  | 'purple'
  | 'green'
  | 'cyan'
  | 'blue'
  | 'amber'
  | 'red'
  | 'pink';
export type PointerStyle =
  | 'classic'
  | 'glowing'
  | 'crosshair'
  | 'bracket'
  | 'orbital'
  | 'sonar'
  | 'minimal'
  | 'trail'
  | 'spotlight'
  | 'comet'
  | 'pulse'
  | 'diamond';
export type ThemeTransitionEvent =
  | React.MouseEvent<unknown>
  | { clientX?: number; clientY?: number; currentTarget?: HTMLElement | null };

const VALID_THEMES = new Set<Theme>(['light', 'dark', 'system']);
const VALID_PALETTES = new Set<ScrollbarTheme>([
  'zinc',
  'purple',
  'green',
  'cyan',
  'blue',
  'amber',
  'red',
  'pink',
]);
const VALID_POINTER_STYLES = new Set<PointerStyle>([
  'classic',
  'glowing',
  'crosshair',
  'bracket',
  'orbital',
  'sonar',
  'minimal',
  'trail',
  'spotlight',
  'comet',
  'pulse',
  'diamond',
]);

const scrollbarThemes: Record<
  ScrollbarTheme,
  { light: string; dark: string; hoverLight: string; hoverDark: string }
> = {
  zinc: { light: '#52525b', dark: '#a1a1aa', hoverLight: '#27272a', hoverDark: '#f4f4f5' },
  purple: { light: '#8b5cf6', dark: '#a78bfa', hoverLight: '#7c3aed', hoverDark: '#c084fc' },
  green: { light: '#059669', dark: '#34d399', hoverLight: '#047857', hoverDark: '#6ee7b7' },
  cyan: { light: '#0891b2', dark: '#22d3ee', hoverLight: '#0e7490', hoverDark: '#67e8f9' },
  blue: { light: '#2563eb', dark: '#60a5fa', hoverLight: '#1d4ed8', hoverDark: '#93c5fd' },
  amber: { light: '#ea580c', dark: '#fb923c', hoverLight: '#c2410c', hoverDark: '#fdba74' },
  red: { light: '#dc2626', dark: '#f87171', hoverLight: '#b91c1c', hoverDark: '#fca5a5' },
  pink: { light: '#db2777', dark: '#f472b6', hoverLight: '#be185d', hoverDark: '#f9a8d4' },
};

const pointerThemes: Record<
  PointerTheme,
  { light: string; dark: string; glowLight: string; glowDark: string }
> = {
  zinc: { light: '#171717', dark: '#fafafa', glowLight: 'rgba(23,23,23,0.15)', glowDark: 'rgba(250,250,250,0.15)' },
  purple: { light: '#8b5cf6', dark: '#a78bfa', glowLight: 'rgba(139,92,246,0.2)', glowDark: 'rgba(167,139,250,0.2)' },
  green: { light: '#059669', dark: '#34d399', glowLight: 'rgba(5,150,105,0.2)', glowDark: 'rgba(52,211,153,0.2)' },
  cyan: { light: '#0891b2', dark: '#22d3ee', glowLight: 'rgba(8,145,178,0.2)', glowDark: 'rgba(34,211,238,0.2)' },
  blue: { light: '#0057ff', dark: '#0071ff', glowLight: 'rgba(0,87,255,0.2)', glowDark: 'rgba(0,113,255,0.2)' },
  amber: { light: '#ea580c', dark: '#fb923c', glowLight: 'rgba(234,88,12,0.2)', glowDark: 'rgba(251,146,60,0.2)' },
  red: { light: '#ef4444', dark: '#f87171', glowLight: 'rgba(239,68,68,0.2)', glowDark: 'rgba(248,113,113,0.2)' },
  pink: { light: '#db2777', dark: '#f472b6', glowLight: 'rgba(219,39,119,0.2)', glowDark: 'rgba(244,114,182,0.2)' },
};

export const themeAccentColors: Record<PointerTheme, { light: string; dark: string }> = {
  zinc: { light: '#27272a', dark: '#e4e4e7' },
  purple: { light: '#7c3aed', dark: '#a78bfa' },
  green: { light: '#059669', dark: '#34d399' },
  cyan: { light: '#0891b2', dark: '#22d3ee' },
  blue: { light: '#0057ff', dark: '#52a8ff' },
  amber: { light: '#d97706', dark: '#fb923c' },
  red: { light: '#dc2626', dark: '#f87171' },
  pink: { light: '#db2777', dark: '#f472b6' },
};

interface ThemeSnapshot {
  theme: Theme;
  resolvedTheme: 'light' | 'dark';
  scrollbarTheme: ScrollbarTheme;
  pointerTheme: PointerTheme;
  pointerEnabled: boolean;
  pointerStyle: PointerStyle;
  pointerEffects: boolean;
}

const SERVER_SNAPSHOT: ThemeSnapshot = {
  theme: 'system',
  resolvedTheme: 'light',
  scrollbarTheme: 'zinc',
  pointerTheme: 'zinc',
  pointerEnabled: false,
  pointerStyle: 'classic',
  pointerEffects: false,
};

interface ThemeContextType extends ThemeSnapshot {
  accentColor: string;
  setTheme: (theme: Theme, event?: ThemeTransitionEvent) => void;
  toggleTheme: (event?: ThemeTransitionEvent) => void;
  setScrollbarTheme: (theme: ScrollbarTheme) => void;
  setPointerTheme: (theme: PointerTheme) => void;
  setPointerEnabled: (enabled: boolean) => void;
  setPointerStyle: (style: PointerStyle) => void;
  setPointerEffects: (enabled: boolean) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

function safeStorageGet(key: string): string | null {
  if (typeof window === 'undefined') return null;
  try {
    return window.localStorage.getItem(key);
  } catch {
    return null;
  }
}

function safeStorageSet(key: string, value: string) {
  if (typeof window === 'undefined') return;
  try {
    window.localStorage.setItem(key, value);
  } catch {
    // Ignore storage quota or private-browsing errors
  }
}

function getSystemIsDark(): boolean {
  if (typeof window === 'undefined' || typeof window.matchMedia !== 'function') return false;
  return window.matchMedia('(prefers-color-scheme: dark)').matches;
}

function resolveThemeMode(theme: Theme): 'light' | 'dark' {
  if (theme === 'dark') return 'dark';
  if (theme === 'light') return 'light';
  return getSystemIsDark() ? 'dark' : 'light';
}

function readClientSnapshot(): ThemeSnapshot {
  const rawTheme = safeStorageGet('theme') as Theme | null;
  const theme: Theme = rawTheme && VALID_THEMES.has(rawTheme) ? rawTheme : 'system';

  const rawScrollbar = safeStorageGet('scrollbarTheme') as ScrollbarTheme | null;
  const scrollbarTheme: ScrollbarTheme =
    rawScrollbar && VALID_PALETTES.has(rawScrollbar) ? rawScrollbar : 'zinc';

  const rawPointer = safeStorageGet('pointerTheme') as PointerTheme | null;
  const pointerTheme: PointerTheme =
    rawPointer && VALID_PALETTES.has(rawPointer) ? rawPointer : 'zinc';

  const pointerEnabled = safeStorageGet('pointerEnabled') === 'true';

  const rawStyle = safeStorageGet('pointerStyle') as PointerStyle | null;
  const pointerStyle: PointerStyle =
    rawStyle && VALID_POINTER_STYLES.has(rawStyle) ? rawStyle : 'classic';

  const pointerEffects = safeStorageGet('pointerEffects') === 'true';

  return {
    theme,
    resolvedTheme: resolveThemeMode(theme),
    scrollbarTheme,
    pointerTheme,
    pointerEnabled,
    pointerStyle,
    pointerEffects,
  };
}

let raf1: number | null = null;
let raf2: number | null = null;

function applyThemeToDocument(snapshot: ThemeSnapshot, atomicSwitch: boolean) {
  if (typeof document === 'undefined') return;
  const root = document.documentElement;
  const isDark = snapshot.resolvedTheme === 'dark';

  if (atomicSwitch) {
    if (raf1 !== null) cancelAnimationFrame(raf1);
    if (raf2 !== null) cancelAnimationFrame(raf2);
    root.classList.add('theme-switching');
  }

  root.classList.toggle('dark', isDark);
  root.style.colorScheme = isDark ? 'dark' : 'light';

  const mode = isDark ? 'dark' : 'light';
  const scrollbarColors = scrollbarThemes[snapshot.scrollbarTheme] || scrollbarThemes.zinc;
  root.style.setProperty('--scrollbar-thumb-color', scrollbarColors[mode]);
  root.style.setProperty(
    '--scrollbar-thumb-hover',
    scrollbarColors[isDark ? 'hoverDark' : 'hoverLight']
  );
  root.style.setProperty('--scrollbar-track-border', isDark ? '#1f1f22' : '#f3f4f6');

  const pointerColors = pointerThemes[snapshot.pointerTheme] || pointerThemes.zinc;
  root.style.setProperty('--cursor-color', pointerColors[mode]);
  root.style.setProperty(
    '--cursor-glow-color',
    pointerColors[isDark ? 'glowDark' : 'glowLight']
  );

  const prefix = `--accent-${snapshot.pointerTheme}`;
  root.style.setProperty('--accent-current', `var(${prefix})`);
  root.style.setProperty('--accent-current-foreground', `var(${prefix}-foreground)`);
  root.style.setProperty('--accent-current-muted', `var(${prefix}-muted)`);
  root.style.setProperty('--accent-current-muted-foreground', `var(${prefix}-muted-foreground)`);

  root.classList.toggle('custom-cursor-active', snapshot.pointerEnabled);

  if (atomicSwitch) {
    // Force synchronous style recalculation so the entire DOM paints the new theme in one frame
    void root.offsetHeight;
    raf1 = requestAnimationFrame(() => {
      raf2 = requestAnimationFrame(() => {
        root.classList.remove('theme-switching');
        raf1 = null;
        raf2 = null;
      });
    });
  }
}

// External store so SSR + client hydration always agree and updates are synchronous
let currentSnapshot: ThemeSnapshot | null = null;
const listeners = new Set<() => void>();

function ensureClientSnapshot(): ThemeSnapshot {
  if (typeof window === 'undefined') return SERVER_SNAPSHOT;
  if (!currentSnapshot) {
    currentSnapshot = readClientSnapshot();
  }
  return currentSnapshot;
}

function emitChange(next: ThemeSnapshot, atomicSwitch: boolean) {
  const prev = currentSnapshot;
  const changed =
    !prev ||
    prev.theme !== next.theme ||
    prev.resolvedTheme !== next.resolvedTheme ||
    prev.scrollbarTheme !== next.scrollbarTheme ||
    prev.pointerTheme !== next.pointerTheme ||
    prev.pointerEnabled !== next.pointerEnabled ||
    prev.pointerStyle !== next.pointerStyle ||
    prev.pointerEffects !== next.pointerEffects;

  currentSnapshot = next;
  applyThemeToDocument(next, atomicSwitch);

  if (changed) {
    listeners.forEach((listener) => listener());
  }
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}

function getClientSnapshot(): ThemeSnapshot {
  return ensureClientSnapshot();
}

function getServerSnapshot(): ThemeSnapshot {
  return SERVER_SNAPSHOT;
}

function updateTheme(newTheme: Theme) {
  const safeTheme: Theme = VALID_THEMES.has(newTheme) ? newTheme : 'system';
  const prev = ensureClientSnapshot();
  const nextResolved = resolveThemeMode(safeTheme);
  const modeChanged = prev.resolvedTheme !== nextResolved;

  safeStorageSet('theme', safeTheme);
  emitChange(
    {
      ...prev,
      theme: safeTheme,
      resolvedTheme: nextResolved,
    },
    modeChanged
  );
}

function toggleThemeMode() {
  const prev = ensureClientSnapshot();
  const nextTheme: Theme = prev.resolvedTheme === 'dark' ? 'light' : 'dark';
  updateTheme(nextTheme);
}

function updateScrollbarTheme(newScrollbar: ScrollbarTheme) {
  if (!VALID_PALETTES.has(newScrollbar)) return;
  const prev = ensureClientSnapshot();
  safeStorageSet('scrollbarTheme', newScrollbar);
  emitChange({ ...prev, scrollbarTheme: newScrollbar }, false);
}

function updatePointerTheme(newPointer: PointerTheme) {
  if (!VALID_PALETTES.has(newPointer)) return;
  const prev = ensureClientSnapshot();
  safeStorageSet('pointerTheme', newPointer);
  emitChange({ ...prev, pointerTheme: newPointer }, false);
}

function updatePointerEnabled(enabled: boolean) {
  const prev = ensureClientSnapshot();
  safeStorageSet('pointerEnabled', String(enabled));
  emitChange({ ...prev, pointerEnabled: enabled }, false);
}

function updatePointerStyle(style: PointerStyle) {
  if (!VALID_POINTER_STYLES.has(style)) return;
  const prev = ensureClientSnapshot();
  safeStorageSet('pointerStyle', style);
  emitChange({ ...prev, pointerStyle: style }, false);
}

function updatePointerEffects(enabled: boolean) {
  const prev = ensureClientSnapshot();
  safeStorageSet('pointerEffects', String(enabled));
  emitChange({ ...prev, pointerEffects: enabled }, false);
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const snapshot = useSyncExternalStore(subscribe, getClientSnapshot, getServerSnapshot);

  useEffect(() => {
    // Sync DOM attributes with stored preferences without overwriting or flashing
    applyThemeToDocument(ensureClientSnapshot(), false);

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');

    const handleSystemChange = () => {
      const prev = ensureClientSnapshot();
      if (prev.theme !== 'system') return;
      const nextResolved = resolveThemeMode('system');
      if (nextResolved !== prev.resolvedTheme) {
        emitChange({ ...prev, resolvedTheme: nextResolved }, true);
      }
    };

    const handleStorage = (e: StorageEvent) => {
      if (
        !e.key ||
        [
          'theme',
          'scrollbarTheme',
          'pointerTheme',
          'pointerEnabled',
          'pointerStyle',
          'pointerEffects',
        ].includes(e.key)
      ) {
        const prev = ensureClientSnapshot();
        const next = readClientSnapshot();
        emitChange(next, prev.resolvedTheme !== next.resolvedTheme);
      }
    };

    mediaQuery.addEventListener('change', handleSystemChange);
    window.addEventListener('storage', handleStorage);

    return () => {
      mediaQuery.removeEventListener('change', handleSystemChange);
      window.removeEventListener('storage', handleStorage);
    };
  }, []);

  const value = useMemo<ThemeContextType>(() => {
    const accentColor =
      (themeAccentColors[snapshot.pointerTheme] || themeAccentColors.zinc)[
        snapshot.resolvedTheme
      ];

    return {
      ...snapshot,
      accentColor,
      setTheme: (newTheme: Theme) => updateTheme(newTheme),
      toggleTheme: () => toggleThemeMode(),
      setScrollbarTheme: updateScrollbarTheme,
      setPointerTheme: updatePointerTheme,
      setPointerEnabled: updatePointerEnabled,
      setPointerStyle: updatePointerStyle,
      setPointerEffects: updatePointerEffects,
    };
  }, [snapshot]);

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}
