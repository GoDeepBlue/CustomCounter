import React, {useState, useEffect} from 'react';
import {
  SafeAreaView,
  View,
  Text,
  Share,
  Platform,
  Dimensions,
  Pressable,
} from 'react-native';

import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import {getSaveToFolder} from '../../components/AsyncStorageFunctions.js';
import styles from './styles.js';

const CountPadScreen = ({navigation, route}) => {
  const initialSaveToFolder = {
    name: 'Default',
    subfolder: '',
  };
  const [count, setCount] = useState(0);
  const [saveToFolder, setSaveToFolder] = useState(initialSaveToFolder);

  // useEffect(() => {
  //   if (route.params?.saveToFolder) {
  //     console.log('~~~ saveToFolder CHANGED ~~~', route.params?.saveToFolder);
  //     setSaveToFolder(route.params?.saveToFolder);
  //   }
  // }, [route.params?.saveToFolder]);

  // useEffect(() => {
  //   getData();
  // }, []);

  // const getData = async () => {
  //   const folder = await getSaveToFolder();
  //   if (folder !== null) {
  //     setSaveToFolder(folder);
  //     console.log('file: CountPadScreen ~ line 30 ~ getData ~ folder', folder);
  //   }
  // };

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
      const result = await Share.share({
        message: 'Here is the count: ' + count,
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error) {
      alert(error.message);
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
          <Ionicons
            name="download"
            style={styles.topToolbarIcons}
            onPress={() =>
              navigation.navigate('Saved', {
                count: count,
                saveToFolder: saveToFolder,
              })
            }
          />
          <Ionicons
            name="list-circle"
            style={styles.topToolbarIcons}
            onPress={() =>
              navigation.navigate('GetCounts', {
                saveToFolder: saveToFolder,
              })
            }
          />
          <Ionicons
            name="settings"
            style={styles.topToolbarIcons}
            onPress={() =>
              navigation.navigate('SettingsScreen', {
                saveToFolder: saveToFolder,
              })
            }
          />
        </View>
        <View>
          <Text style={styles.countPadNumber}>Count: {count}</Text>
        </View>
        <View>
          <Pressable
            name="Countpad"
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
};

export default CountPadScreen;
