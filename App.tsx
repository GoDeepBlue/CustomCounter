import React, {useState, useEffect} from 'react';
import {
  NavigationContainer,
  DefaultTheme,
  DarkTheme,
} from '@react-navigation/native';

import {createStackNavigator} from '@react-navigation/stack';
import {EventRegister} from 'react-native-event-listeners';
import AsyncStorage from '@react-native-async-storage/async-storage';
import SplashScreen from 'react-native-splash-screen';

import CountPadScreen from './src/screens/CountPad';
import SaveCountScreen from './src/screens/SaveCount';
import StorageDisplayScreen from './src/screens/GetCounts';
import CounterSettingsScreen from './src/screens/CounterSettings';
import {SETTINGSKEY} from './src/assets/globals';

const RootStack = createStackNavigator();

const App = () => {
  const [isDarkTheme, setIsDarkTheme] = useState<Boolean>(false);

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
      <RootStack.Navigator>
        <RootStack.Group>
          <RootStack.Screen
            name="Back to Counter"
            component={CountPadScreen}
            options={{headerShown: false}}
          />
        </RootStack.Group>
        <RootStack.Group screenOptions={{presentation: 'modal'}}>
          <RootStack.Screen
            name="Saved"
            component={SaveCountScreen}
            options={{title: 'Count Saved'}}
          />
        </RootStack.Group>
        <RootStack.Group screenOptions={{presentation: 'modal'}}>
          <RootStack.Screen
            name="GetCounts"
            component={StorageDisplayScreen}
            options={{title: 'Saved Counts'}}
          />
        </RootStack.Group>
        <RootStack.Group screenOptions={{presentation: 'modal'}}>
          <RootStack.Screen
            name="SettingsScreen"
            component={CounterSettingsScreen}
            initialParams={appTheme}
            options={{title: 'Counter Settings'}}
          />
        </RootStack.Group>
      </RootStack.Navigator>
    </NavigationContainer>
  );
};

export default App;
