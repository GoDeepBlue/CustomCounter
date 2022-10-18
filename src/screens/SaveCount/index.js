import React, {useState, useEffect, useContext} from 'react';
import {View, Text} from 'react-native';

import {useTheme} from '@react-navigation/native';

// Redux imports
import {useAppDispatch, useAppSelector} from '../../redux/hooks';
import {addCount} from '../../redux/counterSlice';

import styles from './styles';

const SaveCountScreen = ({route, navigation}) => {

  const {count, saveToFolder} = route.params;
  const [listData, setListData] = useState([]);
  const [loading, setLoading] = useState(true);

  const {colors} = useTheme();
  const dispatch = useAppDispatch();
  const dateInfo = getFormattedDate();
  const key = getKey();

  useEffect(() => {
    //getData();
  }, []);

  useEffect(() => {
    storeData();
  }, [count, saveToFolder]);

  const storeData = () => {
    //save2Folder = {"name": "Folder-0", "subfolder": ""}
    //let newListElement = {key: key, count: count, countDate: dateInfo};
    const newCount = {
      key: key,
      count: count,
      date: dateInfo,
    };
    dispatch(addCount(newCount));
  };

  function getKey() {
    const d = new Date();
    let time = d.getTime();
    let date = d.getFullYear() + d.getMonth() + d.getDay();
    let formattedKey = date + time;
    return formattedKey.toString();
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

  const renderFolderDisplay = () => {
    let displayFolder = 'Default';
    if (saveToFolder.name !== '' && saveToFolder.name !== undefined) {
      displayFolder = saveToFolder.name;
      if (saveToFolder.subfolder !== '') {
        displayFolder = displayFolder + ' | ' + saveToFolder.subfolder;
      }
    }
    return displayFolder;
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
          {renderFolderDisplay()}
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
