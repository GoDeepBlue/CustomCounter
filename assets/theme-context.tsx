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
  setMode: (mode: ThemeMode) => void;
  setThemeColors: (lightTheme: Theme, darkTheme: Theme) => void;
  toggleTheme: () => void;
}

const THEME_STORAGE_KEY = 'themeMode';
const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProviderCustom({ children }: { children: React.ReactNode }) {
  const systemScheme = useColorScheme(); // 'light' | 'dark' | null
  const [mode, setModeState] = useState<ThemeMode>('light');
  const [lightTheme, setLightTheme] = useState<Theme>(MyLightTheme);
  const [darkTheme, setDarkTheme] = useState<Theme>(MyDarkTheme);

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

    // Run on app startup
    useEffect(() => {
      const loadTheme = async () => {
        try {
          const storedMode = await AsyncStorage.getItem(THEME_STORAGE_KEY);
          if (storedMode === 'light' || storedMode === 'dark') {
            setModeState(storedMode);
          } else if (systemScheme) {
            // Default to system preference
            setModeState(systemScheme);
          }
        } catch (err) {
          console.error('Error loading theme:', err);
        }
      };
      loadTheme();
    }, [systemScheme]);

  return (
    <ThemeContext.Provider
      value={{
        mode,
        theme,
        setMode,
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
