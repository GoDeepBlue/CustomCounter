import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useTheme } from '@react-navigation/native';
import { Link } from 'expo-router';
import React, { useRef, useState } from 'react';
import {
  Alert,
  Animated,
  Dimensions,
  Platform,
  Pressable,
  SafeAreaView,
  Share,
  ShareAction,
  Text,
  View,
} from 'react-native';

import { useCustomTheme } from '../assets/theme-context';
import styles from './styles';

function adjustBrightness(hex: string, amount: number): string {
  const num = parseInt(hex.replace('#', ''), 16);
  const r = Math.max(0, Math.min(255, (num >> 16) + amount));
  const g = Math.max(0, Math.min(255, ((num >> 8) & 0x00FF) + amount));
  const b = Math.max(0, Math.min(255, (num & 0x0000FF) + amount));
  return `#${((r << 16) | (g << 8) | b).toString(16).padStart(6, '0')}`;
}

export default function HomeScreen() {

  const [count, setCount] = useState<number>(0);
  const scaleAnim = useRef(new Animated.Value(1)).current;
  const pulseAnim = useRef(new Animated.Value(1)).current;
  const { colors } = useTheme();
  const { padColor, iconColor } = useCustomTheme();


  function resetCount() {
    setCount(0);
  }

  function decrementCount() {
    setCount(count - 1);
  }

  function incrementCountByTwo() {
    setCount(count + 2);
  }

  function incrementCount() {
    setCount(count + 1);
    // Trigger pulse animation
    Animated.sequence([
      Animated.timing(pulseAnim, {
        toValue: 1.1,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(pulseAnim, {
        toValue: 1,
        duration: 100,
        useNativeDriver: true,
      }),
    ]).start();
  }

  const onPressIn = () => {
    Animated.timing(scaleAnim, {
      toValue: 0.95,
      duration: 100,
      useNativeDriver: true,
    }).start();
  };

  const onPressOut = () => {
    Animated.timing(scaleAnim, {
      toValue: 1,
      duration: 100,
      useNativeDriver: true,
    }).start();
  };

  const shareCounts = async () => {
    try {
      const result: ShareAction = await Share.share({
        message: 'Here is the count: ' + count,
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        Alert.alert('Error', error.message);
      }
    }
  };
  return (
    <SafeAreaView style={{backgroundColor: colors.background, flex: 1}}>
      <View style={{flex: 1}}>
        <View style={styles.topToolbar}>
          <Pressable
            style={({pressed}) => [
              styles.iconContainer,
              { backgroundColor: pressed ? adjustBrightness(iconColor, -20) : iconColor },
            ]}
            onPress={() => resetCount()}>
            <Text style={[styles.topToolbarIcons, {fontSize: 20, fontWeight: 'bold'}]}>
              C
            </Text>
          </Pressable>
          <Pressable
            style={({pressed}) => [
              styles.iconContainer,
              { backgroundColor: pressed ? adjustBrightness(iconColor, -20) : iconColor },
            ]}
            onPress={() => decrementCount()}>
            <Ionicons
              name="remove-circle-outline"
              style={styles.topToolbarIcons}
            />
          </Pressable>
          <Pressable
            style={({pressed}) => [
              styles.iconContainer,
              { backgroundColor: pressed ? adjustBrightness(iconColor, -20) : iconColor },
            ]}
            onPress={() => incrementCountByTwo()}>
            <MaterialCommunityIcons
              name="numeric-2-circle-outline"
              style={styles.topToolbarIcons}
            />
          </Pressable>
          <Pressable
            style={({pressed}) => [
              styles.iconContainer,
              { backgroundColor: pressed ? adjustBrightness(iconColor, -20) : iconColor },
            ]}
            onPress={() => shareCounts()}>
            <Ionicons
              name="share-outline"
              style={styles.topToolbarIcons}
            />
          </Pressable>
          <Pressable
              style={({pressed}) => [
                styles.iconContainer,
                { backgroundColor: pressed ? adjustBrightness(iconColor, -20) : iconColor },
              ]}>
          <Link href={{
            pathname: "/SaveCount",
            params: {value: count}
          }} asChild>
              <Ionicons
                name="download-outline"
                style={styles.topToolbarIcons}
              />
          </Link>
           </Pressable>
                       <Pressable
              style={({pressed}) => [
                styles.iconContainer,
                { backgroundColor: pressed ? adjustBrightness(iconColor, -20) : iconColor },
              ]}>
          <Link href="/GetCounts" asChild>

              <Ionicons
                name="list-circle-outline"
                style={styles.topToolbarIcons}
              />

          </Link>
          </Pressable>
                     <Pressable
              style={({pressed}) => [
                styles.iconContainer,
                { backgroundColor: pressed ? adjustBrightness(iconColor, -20) : iconColor },
              ]}>
          <Link href="/CounterSettings" asChild>

              <Ionicons
                name="settings-outline"
                style={styles.topToolbarIcons}
              />

          </Link>
          </Pressable>
        </View>
        <Animated.View style={{transform: [{scale: pulseAnim}]}}>
          <Text style={[styles.countPadNumber, {color: colors.text}]}>Count: {count}</Text>
        </Animated.View>
        <Animated.View style={{
          transform: [{scale: scaleAnim}],
          paddingHorizontal: 20,
          paddingBottom: 20,
          marginTop: 50,
        }}>
          <Pressable
            style={({pressed}) => [
              {
                width: '100%',
                height: pressed
                  ? Platform.OS === 'ios'
                    ? Dimensions.get('window').height - 325
                    : Dimensions.get('window').height - 385
                  : Platform.OS === 'ios'
                  ? Dimensions.get('window').height - 320
                  : Dimensions.get('window').height - 380,
                backgroundColor: pressed ? adjustBrightness(padColor, -20) : padColor,
              },
              styles.countPadButton,
            ]}
            onPressIn={onPressIn}
            onPressOut={onPressOut}
            onPress={() => incrementCount()}>
            <View style={styles.countPadButtonInner} />
          </Pressable>
        </Animated.View>
      </View>
    </SafeAreaView>
  );
}
