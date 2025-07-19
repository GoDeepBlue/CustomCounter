import React, { useEffect, useState } from 'react';

import {
  DarkTheme,
  DefaultTheme,
  NavigationContainer
} from '@react-navigation/native';

import { EventRegister } from 'react-native-event-listeners';
import SplashScreen from 'react-native-splash-screen';

import AsyncStorage from '@react-native-async-storage/async-storage';
import { SETTINGSKEY } from '../assets/constants/AsyncStorageKeys';
import RootLayout from './_layout';

export default function Index() {
  const [isDarkTheme, setIsDarkTheme] = useState<boolean>(false);

  useEffect(() => {
    getData();
    SplashScreen.hide();
  }, []);

  const getData = async () => {
    const resp: string | null = await AsyncStorage.getItem(SETTINGSKEY);
    if (resp !== null) {
      const data = await JSON.parse(resp);
      setIsDarkTheme(data);
    }
  };

  const appTheme = isDarkTheme ? DarkTheme : DefaultTheme;
  // If isDarkTheme == false then use DarkTheme
  // Else if isDarkTheme == true then use DefaultTheme

  useEffect(() => {
    let eventListener: string | boolean = EventRegister.addEventListener(
      'changeThemeEvent',
      data => {
        setIsDarkTheme(data);
      },
    );
    return () => {
      EventRegister.removeEventListener(eventListener);
    };
  }, []);
  return (
    <NavigationContainer theme={appTheme}>
      <RootLayout appTheme={appTheme} />
    </NavigationContainer>
  );
}
