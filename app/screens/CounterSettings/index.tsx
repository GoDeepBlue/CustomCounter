import React, { useEffect, useState } from 'react';

import AsyncStorage from '@react-native-async-storage/async-storage';
import { useTheme } from '@react-navigation/native';
import { Linking, Pressable, Switch, Text, View } from 'react-native';
import { EventRegister } from 'react-native-event-listeners';

import { SETTINGSKEY } from '../../../assets/constants/AsyncStorageKeys';
import styles from './styles';

const CounterSettingsScreen = () => {
  const [isDarkTheme, setIsDarkTheme] = useState<boolean>(false);
  const appTheme = useTheme();
  let colors = appTheme.colors;

  useEffect(() => {
    whatIsAppTheme();
  }, []);

  const whatIsAppTheme = () => {
    if (appTheme.dark === true) {
      setIsDarkTheme(true);
    } else {
      setIsDarkTheme(false);
    }
  };

  const toggleTheme = () => {
    setIsDarkTheme(!isDarkTheme);
    EventRegister.emit('changeThemeEvent', !isDarkTheme);
    AsyncStorage.setItem(SETTINGSKEY, JSON.stringify(!isDarkTheme));
  };

  return (
    <View style={[styles.viewBody, {backgroundColor: colors.background}]}>
      <View style={styles.viewSettings}>
        <Text style={[styles.textSetting, {color: colors.text}]}>
          Dark Mode:
        </Text>
        <Switch
          onValueChange={() => {
            toggleTheme();
          }}
          value={isDarkTheme}
        />
        <Text style={{fontStyle: 'italic', color: colors.text}}>
          ({isDarkTheme ? 'On' : 'Off'})
        </Text>
      </View>
      <View style={styles.viewText}>
        <Text style={[styles.textBody, {color: colors.text}]}>
          Thank you for using the Custom Counter app! This product was devloped
          by Deep Blue Development LLC.
        </Text>
        <Text style={[styles.textBody, {color: colors.text}]}>
          We welcome your feedback and appriciate you joining the Deep Blue
          Development community!
        </Text>
      </View>
      <View style={styles.viewButtons}>
        <Pressable
          style={({pressed}) => [
            {
              backgroundColor: pressed ? '#5472d3' : '#002171',
            },
            styles.button,
          ]}
          onPress={() => {
            Linking.openURL('https://enterdeepblue.com/contact.html');
          }}>
          <Text style={styles.textButton}>Product Feedback</Text>
        </Pressable>
        <Text> </Text>
        <Pressable
          style={({pressed}) => [
            {
              backgroundColor: pressed ? '#5472d3' : '#002171',
            },
            styles.button,
          ]}
          onPress={() => {
            Linking.openURL('https://www.enterdeepblue.com/');
          }}>
          <Text style={styles.textButton}>Company Web Site</Text>
        </Pressable>
      </View>
    </View>
  );
};

export default CounterSettingsScreen;
