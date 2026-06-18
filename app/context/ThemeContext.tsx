'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';

export type Theme = 'light' | 'dark' | 'system';
export type ScrollbarTheme = 'zinc' | 'purple' | 'green' | 'cyan' | 'amber' | 'pink';
export type PointerTheme = 'zinc' | 'purple' | 'green' | 'cyan' | 'amber' | 'pink';
export type PointerStyle = 'classic' | 'glowing' | 'crosshair';

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

interface ThemeContextType {
  theme: Theme;
  setTheme: (theme: Theme) => void;
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

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = useState<Theme>('system');
  const [scrollbarTheme, setScrollbarThemeState] = useState<ScrollbarTheme>('zinc');
  const [pointerTheme, setPointerThemeState] = useState<PointerTheme>('zinc');
  const [pointerEnabled, setPointerEnabledState] = useState<boolean>(true);
  const [pointerStyle, setPointerStyleState] = useState<PointerStyle>('classic');
  const [pointerEffects, setPointerEffectsState] = useState<boolean>(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') as Theme | null;
    if (savedTheme) {
      setThemeState(savedTheme);
    }

    const savedScrollbar = localStorage.getItem('scrollbarTheme') as ScrollbarTheme | null;
    if (savedScrollbar) {
      setScrollbarThemeState(savedScrollbar);
    }

    const savedPointerTheme = localStorage.getItem('pointerTheme') as PointerTheme | null;
    if (savedPointerTheme) {
      setPointerThemeState(savedPointerTheme);
    }

    const savedPointerEnabled = localStorage.getItem('pointerEnabled');
    if (savedPointerEnabled !== null) {
      setPointerEnabledState(savedPointerEnabled === 'true');
    }

    const savedPointerStyle = localStorage.getItem('pointerStyle') as PointerStyle | null;
    if (savedPointerStyle) {
      setPointerStyleState(savedPointerStyle);
    }

    const savedPointerEffects = localStorage.getItem('pointerEffects');
    if (savedPointerEffects !== null) {
      setPointerEffectsState(savedPointerEffects === 'true');
    }
  }, []);

  const setTheme = (newTheme: Theme) => {
    setThemeState(newTheme);
    localStorage.setItem('theme', newTheme);
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
      const root = document.documentElement;
      const isDark = theme === 'dark' || (theme === 'system' && mediaQuery.matches);

      // Theme class
      if (theme === 'dark') {
        root.classList.add('dark');
      } else if (theme === 'light') {
        root.classList.remove('dark');
      } else {
        if (mediaQuery.matches) {
          root.classList.add('dark');
        } else {
          root.classList.remove('dark');
        }
      }

      // Scrollbar variables
      const mode = isDark ? 'dark' : 'light';
      const scrollbarColors = scrollbarThemes[scrollbarTheme] || scrollbarThemes.zinc;
      root.style.setProperty('--scrollbar-thumb-color', scrollbarColors[mode]);
      root.style.setProperty('--scrollbar-thumb-hover', scrollbarColors[isDark ? 'hoverDark' : 'hoverLight']);
      root.style.setProperty('--scrollbar-track-border', isDark ? '#1f1f22' : '#f3f4f6');

      // Cursor variables
      const pointerColors = pointerThemes[pointerTheme] || pointerThemes.zinc;
      root.style.setProperty('--cursor-color', pointerColors[mode]);
      root.style.setProperty('--cursor-glow-color', pointerColors[isDark ? 'glowDark' : 'glowLight']);

      // Custom cursor active class
      if (pointerEnabled) {
        root.classList.add('custom-cursor-active');
      } else {
        root.classList.remove('custom-cursor-active');
      }
    };

    applyColors();

    const handleChange = () => {
      applyColors();
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, [theme, scrollbarTheme, pointerTheme, pointerEnabled]);

  return (
    <ThemeContext.Provider
      value={{
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
