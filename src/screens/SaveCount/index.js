import React, {useState, useEffect} from 'react';
import {View, Text} from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';
import {useTheme} from '@react-navigation/native';
import styles from './styles';

const SaveCountScreen = ({route, navigation}) => {

  const [listData, updateListData] = useState([]);
  const [loading, setLoading] = useState(true);
  const {colors} = useTheme();

  const {count, saveToFolder} = route.params;
  const dateInfo = getFormatedDate();
  const key = getKey();

  const STORAGEKEY = '@StorageKEY';

  useEffect(() => {
    console.log(' -- SaveCountScreen -- Save2Folder =>', saveToFolder);
    getData();
  }, []);

  useEffect(() => {
    storeData();
  }, [loading]);

  //https://reactjs.org/docs/hooks-rules.html
  //https://dev.to/spukas/4-ways-to-useeffect-pf6
  //useEffect called when component Mounts

  const getData = async () => {
    const resp = await AsyncStorage.getItem(STORAGEKEY);
    const data = await JSON.parse(resp);
    updateListData(data);
    setLoading(false);
    console.log(' -- SaveCount - getData -- Data=>', data);
  };

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
    //save2Folder = {"name": "Folder-0", "subfolder": ""}
    //listData = data stored already

    let newListElement = {key: key, count: count, countDate: dateInfo};
    let newListItem = [newListElement];

    var newData;

    console.log('file: index.js ~ line 77 ~ storeData ~ listData', listData);
    // const index = listData.findIndex(
    //   folder => folder.name === saveToFolder.name,
    // );
    // let index = -1;
    // let result = listData.hasOwnProperty('name');
    // if (result) {
    //   //result true if name property exists
    //   index = listData.findIndex(folder => folder.name === saveToFolder.name);
    // }
    // if (index < 0) {
    //   //If 'name' property does not exist && if folder name not found
    //   if (saveToFolder.subfolder === '') {
    //     //If no subfolder
    //     newData = {
    //       name: saveToFolder.name,
    //       countData: newListItem,
    //     };
    //   } else {
    //     //There is a subfolder
    //     newData = {
    //       name: saveToFolder.name,
    //       subfolders: {
    //         name: saveToFolder.subfolder,
    //         countData: newListItem,
    //       },
    //     };
    //   }
    // }

    //folders.name
    // if subfolders === '' 
    //    add newListItem to countData
    // else
    //    folders.name.subfolders.name add newListItem to countData


    let newListData = [...listData, ...newData];

    //updateListData(newListData);

    console.log(' -- SaveCount - storeData -- newListData=>', newListData);
    // try {
    //   await AsyncStorage.setItem(STORAGEKEY, JSON.stringify(newListData));
    // } catch (error) {
    //   console.warn('Error:' + error);
    // }
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
        <Text style={[styles.titleCell, {color: colors.text}]}>Folder:</Text>
        <Text style={{marginLeft: 60, color: colors.text}}>
          {saveToFolder.name}
          {saveToFolder.subfolder !== '' && ' | ' + saveToFolder.subfolder}
        </Text>
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
