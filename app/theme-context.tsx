// app/theme-context.tsx
import { Theme } from '@react-navigation/native';
import React, { createContext, useContext, useState } from 'react';
import { MyDarkTheme, MyLightTheme } from './themes';

type ThemeMode = 'light' | 'dark';
interface ThemeContextType {
  mode: ThemeMode;
  theme: Theme;
  setThemeColors: (lightTheme: Theme, darkTheme: Theme) => void;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProviderCustom({ children }: { children: React.ReactNode }) {
  const [mode, setMode] = useState<ThemeMode>('light');
  const [lightTheme, setLightTheme] = useState<Theme>(MyLightTheme);
  const [darkTheme, setDarkTheme] = useState<Theme>(MyDarkTheme);

  const theme = mode === 'dark' ? darkTheme : lightTheme;

  const toggleTheme = () => setMode(prev => (prev === 'dark' ? 'light' : 'dark'));
  const setThemeColors = (lt: Theme, dt: Theme) => {
    setLightTheme(lt);
    setDarkTheme(dt);
  };

  return (
    <ThemeContext.Provider value={{ mode, theme, setThemeColors, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useCustomTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error('useCustomTheme must be used within ThemeProviderCustom');
  return ctx;
}
