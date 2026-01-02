// app/theme-context.tsx
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Theme } from '@react-navigation/native';
import React, { createContext, useContext, useEffect, useState } from 'react';
import { useColorScheme } from 'react-native';
import { MyDarkTheme, MyLightTheme } from './themes';

type ThemeMode = 'light' | 'dark';
interface ThemeContextType {
  mode: ThemeMode;
  theme: Theme;
  padColor: string;
  iconColor: string;
  setMode: (mode: ThemeMode) => void;
  setPadColor: (color: string) => void;
  setIconColor: (color: string) => void;
  setThemeColors: (lightTheme: Theme, darkTheme: Theme) => void;
  toggleTheme: () => void;
}

const THEME_STORAGE_KEY = 'themeMode';
const PAD_COLOR_STORAGE_KEY = 'padColor';
const ICON_COLOR_STORAGE_KEY = 'iconColor';
const DEFAULT_PAD_COLOR = '#2196F3';
const DEFAULT_ICON_COLOR = '#2196F3';
const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProviderCustom({ children }: { children: React.ReactNode }) {
  const systemScheme = useColorScheme(); // 'light' | 'dark' | null
  const [mode, setModeState] = useState<ThemeMode>('light');
  const [lightTheme, setLightTheme] = useState<Theme>(MyLightTheme);
  const [darkTheme, setDarkTheme] = useState<Theme>(MyDarkTheme);
  const [padColor, setPadColorState] = useState<string>(DEFAULT_PAD_COLOR);
  const [iconColor, setIconColorState] = useState<string>(DEFAULT_ICON_COLOR);

  const theme = mode === 'dark' ? darkTheme : lightTheme;

  // Wrapped setter to also save preference
  const setMode = (newMode: ThemeMode) => {
    setModeState(newMode);
    AsyncStorage.setItem(THEME_STORAGE_KEY, newMode).catch(err =>
      console.error('Error saving theme:', err)
    );
  };

  const toggleTheme = () => setMode(mode === 'dark' ? 'light' : 'dark');

  const setThemeColors = (lt: Theme, dt: Theme) => {
    setLightTheme(lt);
    setDarkTheme(dt);
  };

  const setPadColor = (color: string) => {
    setPadColorState(color);
    AsyncStorage.setItem(PAD_COLOR_STORAGE_KEY, color).catch(err =>
      console.error('Error saving pad color:', err)
    );
  };

  const setIconColor = (color: string) => {
    setIconColorState(color);
    AsyncStorage.setItem(ICON_COLOR_STORAGE_KEY, color).catch(err =>
      console.error('Error saving icon color:', err)
    );
  };

    // Run on app startup
    useEffect(() => {
      const loadSettings = async () => {
        try {
          const [storedMode, storedPadColor, storedIconColor] = await Promise.all([
            AsyncStorage.getItem(THEME_STORAGE_KEY),
            AsyncStorage.getItem(PAD_COLOR_STORAGE_KEY),
            AsyncStorage.getItem(ICON_COLOR_STORAGE_KEY),
          ]);
          if (storedMode === 'light' || storedMode === 'dark') {
            setModeState(storedMode);
          } else if (systemScheme) {
            // Default to system preference
            setModeState(systemScheme);
          }
          if (storedPadColor) {
            setPadColorState(storedPadColor);
          }
          if (storedIconColor) {
            setIconColorState(storedIconColor);
          }
        } catch (err) {
          console.error('Error loading settings:', err);
        }
      };
      loadSettings();
    }, [systemScheme]);

  return (
    <ThemeContext.Provider
      value={{
        mode,
        theme,
        padColor,
        iconColor,
        setMode,
        setPadColor,
        setIconColor,
        setThemeColors,
        toggleTheme,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
}

export function useCustomTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error('useCustomTheme must be used within ThemeProviderCustom');
  return ctx;
}
