// app/themes.ts
import { DarkTheme, DefaultTheme, Theme } from '@react-navigation/native';

export const MyLightTheme: Theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: '#1E88E5',       // Blue
    background: '#F1F8E9',    // Light greenish
    card: '#fff',
    text: '#263238',          // Dark gray-blue
    border: '#B0BEC5',
    notification: '#FF7043',  // Orange
  },
};

export const MyDarkTheme: Theme = {
  ...DarkTheme,
  colors: {
    ...DarkTheme.colors,
    primary: '#90CAF9',       // Light blue
    background: '#263238',    // Dark gray-blue
    card: '#37474F',
    text: '#FAFAFA',
    border: '#90A4AE',
    notification: '#FFAB91',
  },
};
