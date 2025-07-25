import React, { useState } from 'react';
import {
  Alert,
  Dimensions,
  Platform,
  Pressable,
  SafeAreaView,
  Share,
  ShareAction,
  Text,
  View,
} from 'react-native';

import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { Link } from 'expo-router';
//import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import styles from './styles';

export default function HomeScreen() {
  const [count, setCount] = useState<number>(0);

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
  }

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
    <SafeAreaView>
      <View>
        <View style={styles.topToolbar}>
          <Ionicons
            name="close-circle"
            style={styles.topToolbarIcons}
            onPress={() => resetCount()}
          />
          <Ionicons
            name="remove-circle"
            style={styles.topToolbarIcons}
            onPress={() => decrementCount()}
          />
          <MaterialCommunityIcons
            name="numeric-2-circle"
            style={styles.topToolbarIcons}
            onPress={() => incrementCountByTwo()}
          />
          <Ionicons
            name="share"
            style={styles.topToolbarIcons}
            onPress={() => shareCounts()}
          />
          <Link href={{
            pathname: "/SaveCount",
            params: {value: count}
          }} asChild>
            <Ionicons
              name="download"
              style={styles.topToolbarIcons}
            />
          </Link>
          <Link href="/GetCounts" asChild>
            <Ionicons
              name="list-circle"
              style={styles.topToolbarIcons}
            />
          </Link>          
          <Link href="/CounterSettings" asChild>
            <Ionicons
              name="settings"
              style={styles.topToolbarIcons}
            />
          </Link>
        </View>
        <View>
          <Text style={styles.countPadNumber}>Count: {count}</Text>
        </View>
        <View>
          <Pressable
            style={({pressed}) => [
              {
                width: pressed
                  ? Dimensions.get('window').width - 25
                  : Dimensions.get('window').width - 20,
                height: pressed
                  ? Platform.OS === 'ios'
                    ? Dimensions.get('window').height - 305
                    : Dimensions.get('window').height - 365
                  : Platform.OS === 'ios'
                  ? Dimensions.get('window').height - 300
                  : Dimensions.get('window').height - 360,
              },
              styles.countPadButton,
            ]}
            onPress={() => incrementCount()}>
            <Text />
          </Pressable>
        </View>
      </View>
    </SafeAreaView>
  );
}
