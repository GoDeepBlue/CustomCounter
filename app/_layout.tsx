import React from 'react';


import { createStackNavigator } from '@react-navigation/stack';

import { Theme } from '@react-navigation/native';
import CounterSettingsScreen from './screens/CounterSettings';
import CountPadScreen from './screens/CountPad';
import StorageDisplayScreen from './screens/GetCounts';
import SaveCountScreen from './screens/SaveCount';

const RootStack = createStackNavigator();

export default function RootLayout({ appTheme }: { appTheme: Theme }) {
  
  return (
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
  );}
