import React from 'react';

import { useTheme } from '@react-navigation/native';
import { Linking, Pressable, StyleSheet, Switch, Text, View } from 'react-native';

import { useCustomTheme } from '../assets/theme-context';

const CounterSettingsScreen = () => {
  const { colors } = useTheme();
  const { mode, toggleTheme } = useCustomTheme();

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
          value={mode === 'dark'}
        />
        <Text style={{fontStyle: 'italic', color: colors.text}}>
          ({mode === 'dark' ? 'On' : 'Off'})
        </Text>
      </View>
      <View style={styles.viewText}>
        <Text style={[styles.textBody, {color: colors.text}]}>
          Thank you for using the Custom Counter app! This product was developed
          by Deep Blue Development LLC.
        </Text>
        <Text style={[styles.textBody, {color: colors.text}]}>
          We welcome your feedback and appreciate you joining the Deep Blue
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

const styles = StyleSheet.create({
  viewBody: {
      alignItems: 'stretch',
      width: '100%',
      height: '100%',
  },
  viewSettings: {
      flex: 1,
      flexDirection: 'row',
      alignItems: 'center',
      marginTop: 10,
  },
  viewText: {
      flex: 2,
      marginTop: 10,
  },
  viewButtons: {
      flex: 3,
      flexDirection: 'column',
      alignItems: 'center',
      marginTop: 10,
  },
  textBody: {
      padding: 20,
      fontSize: 15,
  },
  textSetting: {
      padding: 20,
      fontSize: 15,
      fontWeight: 'bold',
  },
  button: {
      borderRadius: 8,
      padding: 10,
      width: '80%',
      justifyContent: 'center',
      alignItems: 'center',
      elevation: 5,
  },
  textButton: {
      color: 'white',
      fontSize: 15,
  },

});

export default CounterSettingsScreen;
