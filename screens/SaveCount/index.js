import React, {useState, useEffect} from 'react';
import {View, Text} from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';
import {useTheme} from '@react-navigation/native';
import styles from './styles';

const SaveCountScreen = ({route, navigation}) => {
  const [listData, updateListData] = useState([]);
  const [loading, setLoading] = useState(true);
  const {colors} = useTheme();

  const count = route.params;
  const dateInfo = getFormatedDate();
  const key = getKey();

  const STORAGEKEY = '@StorageKEY';

  useEffect(() => {
    getData();
  }, []);
  //https://reactjs.org/docs/hooks-rules.html
  //https://dev.to/spukas/4-ways-to-useeffect-pf6
  //useEffect called when component Mounts

  const getData = async () => {
    const resp = await AsyncStorage.getItem(STORAGEKEY);
    const data = await JSON.parse(resp);
    updateListData(data);
    setLoading(false);
    //console.log('getData completed');
  };

  useEffect(() => {
    storeData();
  }, [loading]);

  function getKey() {
    const d = new Date();

    let time = d.getTime();
    let date = d.getFullYear() + d.getMonth() + d.getDay();
    let formatedKey = date + time;

    return formatedKey;
  }

  function getFormatedDate() {
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
    //let numKeys = listData.length + 1;
    let newListElement = {key: key, count: count, countDate: dateInfo};
    let newListItem = [newListElement];
    let newListData = [...listData, ...newListItem];

    updateListData(newListData);

    // console.log(JSON.stringify(newListItem));
    // console.log(JSON.stringify(newListData));
    try {
      await AsyncStorage.setItem(STORAGEKEY, JSON.stringify(newListData));
    } catch (error) {
      console.warn('Error:' + error);
    }
    //console.log('Async called');
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

export default SaveCountScreen;
