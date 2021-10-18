/* eslint-disable prettier/prettier */

import 'react-native-gesture-handler';
import React, { useState, useEffect } from 'react';

import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { EventRegister } from 'react-native-event-listeners';
import AsyncStorage from '@react-native-async-storage/async-storage';
import SplashScreen from 'react-native-splash-screen';

import CountPadScreen from './screens/CountPad';
import SaveCountScreen from './screens/SaveCount';
import StorageDisplayScreen from './screens/GetCounts';
import CounterSettingsScreen from './screens/CounterSettings';

/** 
// symbol polyfills
global.Symbol = require('core-js/es6/symbol');
require('core-js/fn/symbol/iterator');

// collection fn polyfills
require('core-js/fn/map');
require('core-js/fn/set');
require('core-js/fn/array/find');
*/

const RootStack = createStackNavigator();

const App = () => {
  const [isDarkTheme, setIsDarkTheme] = useState(false);
  useEffect(() => {
    getData();
    SplashScreen.hide();
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
            name="Back to Counter"
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
