
import React, { useState, useEffect, useContext } from 'react';
import { View, Button, Alert } from 'react-native';

import 'react-native-gesture-handler';
import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { EventRegister } from 'react-native-event-listeners';

//import CountersDataContext from './src/context/CountersDataContext';
import {DataContextProvider} from './context/CountersDataContext';

// Imports for react-redux tools
import {useAppDispatch, useAppSelector} from './../src/redux/hooks';
// also need to install react-redux tools in browser
// --

import * as AsyncStorageFunctions from './components/AsyncStorageFunctions';
import CountPadScreen from './screens/CountPad';
import SaveCountScreen from './screens/SaveCount';
import StorageDisplayScreen from './screens/GetCounts';
import CounterSettingsScreen from './screens/CounterSettings';

const Stack = createStackNavigator();

const AppHome = () => {

  const reduxValue = useAppSelector((state) => state.counter);

  const [isDarkTheme, setIsDarkTheme] = useState(false);

  useEffect(() => {
    getData();
    console.log(' ~~~~ reduxValue:', reduxValue);
  }, []);

  const getData = async () => {
    const theme = await AsyncStorageFunctions.getThemeSetting();
    if (theme !== null) {
      setIsDarkTheme(theme);
    }
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
          <Stack.Navigator>
            <Stack.Group>
              <Stack.Screen
                name="Custom Counter"
                component={CountPadScreen}
                options={{ headerShown: false }}
              />
            </Stack.Group>
            <Stack.Group
              screenOptions={({navigation}) => ({
              presentation: 'modal',
              headerTitleAlign: 'center',
              headerLeft: () => (
                <View style={{marginLeft: 10}}>
                  <Button
                    onPress={() => navigation.goBack()}
                    title="< Back"
                  />
                </View>
              ),
              })}>
              <Stack.Screen
                name="Saved"
                component={SaveCountScreen}
                options={{ title: 'Count Saved' }}
              />
              <Stack.Screen
                name="GetCounts"
                component={StorageDisplayScreen}
                options={{ title: 'Saved Counts' }}
              />
              <Stack.Screen
                name="SettingsScreen"
                component={CounterSettingsScreen}
                initialParams={appTheme}
                options={{ title: 'Counter Settings' }}
              />
            </Stack.Group>
          </Stack.Navigator>
      </NavigationContainer>
  );
};

export default AppHome;
