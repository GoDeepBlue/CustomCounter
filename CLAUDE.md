# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a React Native/Expo application called "Custom Counter" - a simple counter app with persistence and sharing features. The app uses TypeScript and follows the Expo Router file-based routing pattern.

## Commands

### Development
- `npm start` or `npx expo start` - Start the Expo development server
- `npm run android` - Run on Android device/emulator
- `npm run ios` - Run on iOS simulator
- `npm run web` - Start web version
- `npm run lint` - Run ESLint

### Project Management
- `npm install` - Install dependencies
- `npm run reset-project` - Reset to blank starter template

## Architecture

### Tech Stack
- **Framework**: React Native with Expo SDK 53
- **Navigation**: Expo Router (file-based routing)
- **Language**: TypeScript
- **UI Components**: @expo/vector-icons, React Native core components
- **Storage**: @react-native-async-storage/async-storage
- **Styling**: StyleSheet API with theme support

### Project Structure
```
/app/              # Main application screens (file-based routing)
  _layout.tsx      # Root layout with navigation stack
  index.tsx        # Home screen with main counter UI
  CounterSettings.tsx
  GetCounts.tsx    
  SaveCount.tsx
  styles.js        # Shared styles
/assets/           # Static assets and utilities
  /constants/      # App constants
  /fonts/
  /images/
  theme-context.tsx # Theme provider implementation
  themes.ts        # Theme definitions
  types.ts         # TypeScript type definitions
```

### Key Features
1. **Counter Operations**: Increment, decrement, reset, increment by 2
2. **Data Persistence**: Save/load counts using AsyncStorage
3. **Sharing**: Share count via native share API
4. **Theming**: Custom theme context with navigation theme integration
5. **Modal Screens**: Settings and saved counts presented as modals

### Navigation Structure
- Stack Navigator with custom theme wrapper
- Home screen (index) has no header
- Modal presentations for SaveCount, GetCounts, and CounterSettings

### Development Notes
- The app uses Expo's new architecture (`newArchEnabled: true`)
- TypeScript strict mode is enabled
- No tests are currently implemented
- Uses file-based routing with typed routes enabled