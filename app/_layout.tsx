import { ThemeProvider } from '@react-navigation/native';
import * as ExpoSplashScreen from 'expo-splash-screen';
import { Stack } from 'expo-router';
import { useCallback, useEffect, useState } from 'react';
import { View } from 'react-native';

import { ThemeProviderCustom, useCustomTheme } from '../assets/theme-context';
import SplashScreen from './SplashScreen';

// Keep the native splash screen visible while we fetch resources
ExpoSplashScreen.preventAutoHideAsync();

function ThemeWrapper() {
  const { theme } = useCustomTheme();
  return (
    <ThemeProvider value={theme}>
      <Stack>
        <Stack.Screen
              name="index"
              options={{headerShown: false}}
            />
          <Stack.Screen
            name="SaveCount"
            options={{
              presentation: 'modal',
              title: 'Count Saved'
            }}
          />
          <Stack.Screen
            name="GetCounts"
            options={{
              presentation: 'modal',
              title: 'Saved Counts'
            }}
          />
          <Stack.Screen
            name="CounterSettings"
            options={{
              presentation: 'modal',
              title: 'Counter Settings'
            }}
          />
          <Stack.Screen
            name="SplashScreen"
            options={{
              headerShown: false,
            }}
          />
      </Stack>
    </ThemeProvider>
  );
}

export default function RootLayout() {
  const [appIsReady, setAppIsReady] = useState(false);
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    async function prepare() {
      try {
        // Pre-load any resources or data here
        // For now, just a small delay to ensure smooth transition
        await new Promise(resolve => setTimeout(resolve, 100));
      } catch (e) {
        console.warn(e);
      } finally {
        setAppIsReady(true);
      }
    }

    prepare();
  }, []);

  const onLayoutRootView = useCallback(async () => {
    if (appIsReady) {
      // Hide the native splash screen
      await ExpoSplashScreen.hideAsync();
    }
  }, [appIsReady]);

  const handleSplashComplete = useCallback(() => {
    setShowSplash(false);
  }, []);

  if (!appIsReady) {
    return null;
  }

  return (
    <View style={{ flex: 1 }} onLayout={onLayoutRootView}>
      <ThemeProviderCustom>
        {showSplash ? (
          <SplashScreen onAnimationComplete={handleSplashComplete} />
        ) : (
          <ThemeWrapper />
        )}
      </ThemeProviderCustom>
    </View>
  );
}
