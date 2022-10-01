/* eslint-disable prettier/prettier */

import React, { useState, useEffect } from 'react';
import { View, Button } from 'react-native';

import 'react-native-gesture-handler';
import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { EventRegister } from 'react-native-event-listeners';

import CountersDataProvider from './src/context/CountersDataProvider';
import {useCountersData} from './src/context/CountersDataProvider';
import * as AsyncStorageFunctions from './src/components/AsyncStorageFunctions';
import CountPadScreen from './src/screens/CountPad';
import SaveCountScreen from './src/screens/SaveCount';
import StorageDisplayScreen from './src/screens/GetCounts';
import CounterSettingsScreen from './src/screens/CounterSettings';

const Stack = createStackNavigator();

const App = () => {
  const [isDarkTheme, setIsDarkTheme] = useState(false);
  const [saveToFolder, setSaveToFolder] = useState('Default');
  const {getDataLocal} = useCountersData();

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    const theme = await AsyncStorageFunctions.getThemeSetting();
    if (theme !== null) {
      setIsDarkTheme(theme);
      console.log('file: App.js ~ line 29 ~ getData ~ theme', theme);
    }
    const saveFolder = await AsyncStorageFunctions.getSaveToFolder();
    if (saveFolder !== null) {
      setSaveToFolder(saveFolder);
      console.log('file: App.js ~ line 37 ~ getData ~ saveFolder', saveFolder);
    } else {
      //save2Folder = {"name": "Folder-0", "subfolder": ""}
      setSaveToFolder({
        name: 'Default',
        subfolder: '',
      });
    }
    getDataLocal();
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

  useEffect(() => {
    let eventListener = EventRegister.addEventListener(
      'changeFolderEvent',
      data => {
        setSaveToFolder(data);
      },
    );
    return () => {
      EventRegister.removeEventListener(eventListener);
    };
  }, []);

  return (
    <NavigationContainer theme={appTheme}>
      <CountersDataProvider>
        <Stack.Navigator>
          <Stack.Group>
            <Stack.Screen
              name="Custom Counter"
              component={CountPadScreen}
              options={{ headerShown: false }}
            />
          </Stack.Group>
          <Stack.Group screenOptions={({navigation}) => ({
            presentation: 'modal',
            headerTitleAlign: 'center',
            headerLeft: () => (
              <View style={{marginLeft: 10}}>
                <Button
                  onPress={() => navigation.navigate('Custom Counter', {saveToFolder})}
                  title="< Back"
                />
              </View>
            ),
            })}>
            <Stack.Screen
              name="Saved"
              initialParams={saveToFolder}
              component={SaveCountScreen}
              options={{ title: 'Count Saved' }}
            />
            <Stack.Screen
              name="GetCounts"
              initialParams={saveToFolder}
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
      </CountersDataProvider>
    </NavigationContainer>
  );
};

export default App;
