/* eslint-disable prettier/prettier */

import 'react-native-gesture-handler';
import React, { useState, useEffect } from 'react';

import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { EventRegister } from 'react-native-event-listeners';
import AsyncStorage from '@react-native-async-storage/async-storage';

import CountPadScreen from './screens/CountPad';
import SaveCountScreen from './screens/SaveCount';
import StorageDisplayScreen from './screens/GetCounts';
import CounterSettingsScreen from './screens/CounterSettings';

const RootStack = createStackNavigator();

const App = () => {
  const [isDarkTheme, setIsDarkTheme] = useState(false);
  useEffect(() => {
    getData();
  }, []);

  const SETTINGSKEY = '@AppSettingsKEY';

  const getData = async () => {
    const resp = await AsyncStorage.getItem(SETTINGSKEY);
    const data = await JSON.parse(resp);
    if (data !== null) {
      setIsDarkTheme(data);
    }
    console.log(data);
    //updateListData(data);
    //setLoading(false);
  };

  const appTheme = isDarkTheme ? DarkTheme : DefaultTheme;
  // If isDarkTheme == false then use DarkTheme
  // Else if isDarkTheme == true then use DefaultTheme


  useEffect(() => {
    let eventListener = EventRegister.addEventListener(
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
      <RootStack.Navigator>
        <RootStack.Group>
          <RootStack.Screen
            name="Custom Counter"
            component={CountPadScreen}
            options={{ headerShown: false }}
          />
        </RootStack.Group>
        <RootStack.Group screenOptions={{ presentation: 'modal' }}>
          <RootStack.Screen
            name="Saved"
            component={SaveCountScreen}
            options={{ title: 'Count Saved' }}
          />
        </RootStack.Group>
        <RootStack.Group screenOptions={{ presentation: 'modal' }}>
          <RootStack.Screen
            name="GetCounts"
            component={StorageDisplayScreen}
            options={{ title: 'Saved Counts' }}
          />
        </RootStack.Group>
        <RootStack.Group screenOptions={{ presentation: 'modal' }}>
          <RootStack.Screen
            name="SettingsScreen"
            component={CounterSettingsScreen}
            initialParams={appTheme}
            options={{ title: 'Counter Settings' }}
          />
        </RootStack.Group>
      </RootStack.Navigator>
    </NavigationContainer>
  );
};

export default App;
