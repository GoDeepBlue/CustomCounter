/* eslint-disable prettier/prettier */
import React, { useState, useEffect } from 'react';
import { View, Pressable, Text, Switch, Linking, StyleSheet } from 'react-native';
import { useTheme } from '@react-navigation/native';
import { EventRegister } from 'react-native-event-listeners';
import AsyncStorage from '@react-native-async-storage/async-storage';

import styles from './styles';

const CounterSettingsScreen = (props) => {
    const [isDarkTheme, setIsDarkTheme] = useState(false);
    const appTheme = useTheme();
    let colors = appTheme.colors;

    useEffect(() => { whatIsAppTheme(); }, []);

    function whatIsAppTheme() {
        // console.log('whatIsAppTheme: ' + appTheme.dark);
        // console.log(appTheme);
        if (appTheme.dark === true) {
            setIsDarkTheme(true);
        } else {
            setIsDarkTheme(false);
        }
    }



    const SETTINGSKEY = '@AppSettingsKEY';

    const toggleTheme = () => {
        setIsDarkTheme(!isDarkTheme);
        EventRegister.emit('changeThemeEvent', !isDarkTheme);
        storeData(!isDarkTheme);
    };

    function storeData(themeVal) {
        // console.log('storeData called');
        // console.log(JSON.stringify(isDarkTheme));
        AsyncStorage.setItem(SETTINGSKEY, JSON.stringify(themeVal));
    }

    return (

        <View style={[styles.viewBody, { backgroundColor: colors.background }]}>
            <View style={styles.viewSettings}>
                <Text style={[styles.textSetting, { color: colors.text }]}>Dark Mode:</Text>
                <Switch
                    onValueChange={() => { toggleTheme(); }}
                    value={isDarkTheme}
                />
                <Text style={{ fontStyle: 'italic', color: colors.text }}>
                    ({isDarkTheme ? 'On' : 'Off'})
                </Text>
            </View>
            <View style={styles.viewText}>

                <Text style={[styles.textBody, { color: colors.text }]}>
                    Thank you for using the Custom Counter app! This product was devloped by Deep Blue Development LLC.
                </Text>
                <Text style={[styles.textBody, { color: colors.text }]}>
                    We welcome your feedback and appriciate you joining the Deep Blue Development community!
                </Text>

            </View>
            <View style={styles.viewButtons}>
                <Pressable
                    style={({ pressed }) => [
                        {
                            backgroundColor: pressed ? '#5472d3' : '#002171',
                        },
                        styles.button,
                    ]}
                    onPress={() => { Linking.openURL('https://www.enterdeepblue.com/contact.html'); }}
                >
                    <Text style={styles.textButton}>
                        Product Feedback
                    </Text>
                </Pressable>
                <Text> </Text>
                <Pressable
                    style={({ pressed }) => [
                        {
                            backgroundColor: pressed ? '#5472d3' : '#002171',
                        },
                        styles.button,
                    ]}
                    onPress={() => { Linking.openURL('https://www.enterdeepblue.com/') }}>
                    <Text style={styles.textButton}>
                        Company Web Site
                    </Text>
                </Pressable>
            </View>
        </View>
    );
};

export default CounterSettingsScreen;


