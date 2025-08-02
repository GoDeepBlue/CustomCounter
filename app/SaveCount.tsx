import React, { useEffect, useState } from 'react';
import { Alert, StyleSheet, Text, View } from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';
import { useTheme } from '@react-navigation/native';
import { useLocalSearchParams } from 'expo-router';
import { STORAGEKEY } from '../assets/constants/AsyncStorageKeys';

const SaveCountScreen = () => {
  const [listData, updateListData] = useState([]);
  const [loading, setLoading] = useState(true);
  const {colors} = useTheme();

  const { value } = useLocalSearchParams(); // 'value' is received as a string
  const count = Number(value);

  const dateInfo = getFormattedDate();
  const key = getKey();

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    storeData();
  }, [loading]);

  const getData = async () => {
    const resp: string | null = await AsyncStorage.getItem(STORAGEKEY);
    if (resp !== null) {
      const data = await JSON.parse(resp);
      updateListData(data);
    }
    setLoading(false);
  };

  function getKey() {
    const d = new Date();
    let time = d.getTime();
    let date = d.getFullYear() + d.getMonth() + d.getDay();
    let formattedKey = date + time;
    return formattedKey;
  }

  function getFormattedDate() {
    const d = new Date();
    let options = {
      weekday: 'short',
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    };
    let fullDateTime = new Intl.DateTimeFormat('en-US', options).format(d);
    return fullDateTime;
  }

  const storeData = async () => {
    //console.log("storeData");
    let newListElement = {key: key, count: count, countDate: dateInfo};
    let newListItem = [newListElement];
    let newListData = [...listData, ...newListItem];

    updateListData(newListData);
    //console.log("updateListData");
    try {
      await AsyncStorage.setItem(STORAGEKEY, JSON.stringify(newListData));
      //console.log("syncStorage.setItem");
    } catch (error: any) {
      Alert.alert('Error saving', error);
    }
    //console.log("After .. syncStorage.setItem");
  };

  return (
    <View>
      <Text style={[styles.title, {color: colors.text}]}>Details Saved</Text>

      <View style={styles.row}>
        <Text style={[styles.titleCell, {color: colors.text}]}>Count:</Text>
        <Text style={{marginLeft: 60, color: colors.text}}> {count} </Text>
      </View>
      <View style={styles.row}>
        <Text style={[styles.titleCell, {color: colors.text}]}>
          Date, Time:
        </Text>
        <Text style={{marginLeft: 30, color: colors.text}}>{dateInfo}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 50,
    padding: 20,
  },
  row: {
    flexDirection: 'row',
  },
  titleCell: {
    marginLeft: 20,
    height: 30,
    fontWeight: 'bold',
  },
});

export default SaveCountScreen;
