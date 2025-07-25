import { ThemeProvider } from '@react-navigation/native';
import { Stack } from 'expo-router';


import { ThemeProviderCustom, useCustomTheme } from './theme-context';

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
      </Stack>
    </ThemeProvider>
  );
}

export default function RootLayout() {
  
  return (
    <ThemeProviderCustom>
      <ThemeWrapper />
    </ThemeProviderCustom>
  );
}
