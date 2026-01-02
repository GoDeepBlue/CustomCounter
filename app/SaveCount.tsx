import React, { useEffect, useState } from 'react';
import { Alert, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';
import { useTheme } from '@react-navigation/native';
import { useLocalSearchParams, router } from 'expo-router';
import { STORAGEKEY } from '../assets/constants/AsyncStorageKeys';

const SaveCountScreen = () => {
  const [listData, updateListData] = useState([]);
  const [, setLoading] = useState(true);
  const [countName, setCountName] = useState('');
  const [isSaved, setIsSaved] = useState(false);
  const [editableCount, setEditableCount] = useState('');
  const {colors} = useTheme();

  const params = useLocalSearchParams();
  const count = Number(params.value);
  const isEditMode = params.editMode === 'true';
  const existingKey = params.existingKey ? Number(params.existingKey) : null;
  const existingName = params.existingName || '';
  const existingDate = params.existingDate;

  const dateInfo = isEditMode ? existingDate : getFormattedDate();
  const key = isEditMode ? existingKey : getKey();

  useEffect(() => {
    getData();
    if (isEditMode) {
      setCountName(existingName);
      setEditableCount(count.toString());
    } else {
      setEditableCount(count.toString());
    }
  }, [count, existingName, isEditMode]);

  // Removed auto-save - now only saves on button press

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
    const finalCount = Number(editableCount) || count;
    let newListData;
    
    if (isEditMode) {
      // Update existing item
      newListData = listData.map(item => 
        item.key === existingKey 
          ? {key: key, count: finalCount, countDate: dateInfo, name: countName}
          : item
      );
    } else {
      // Add new item
      let newListElement = {key: key, count: finalCount, countDate: dateInfo, name: countName};
      let newListItem = [newListElement];
      newListData = [...listData, ...newListItem];
    }

    updateListData(newListData);
    try {
      await AsyncStorage.setItem(STORAGEKEY, JSON.stringify(newListData));
      setIsSaved(true);
      
      // Navigate back to GetCounts after successful update in edit mode
      if (isEditMode) {
        setTimeout(() => {
          router.back();
        }, 500);
      }
    } catch (error: any) {
      Alert.alert('Error saving', error);
    }
  };

  const handleSave = () => {
    storeData();
  };

  return (
    <View>
      <Text style={[styles.title, {color: colors.text}]}>
        {isSaved ? (isEditMode ? 'Count Updated' : 'Count Saved') : (isEditMode ? 'Edit Count' : 'Save Count')}
      </Text>
      
      {!isSaved && (
        <View style={styles.inputContainer}>
          {isEditMode && (
            <>
              <Text style={[styles.label, {color: colors.text}]}>Count Value:</Text>
              <TextInput
                style={[styles.input, {color: colors.text, borderColor: colors.border}]}
                placeholder="Enter count value"
                placeholderTextColor={colors.text + '80'}
                value={editableCount}
                onChangeText={setEditableCount}
                keyboardType="numeric"
              />
            </>
          )}
          <Text style={[styles.label, {color: colors.text}]}>Name this count (optional):</Text>
          <TextInput
            style={[styles.input, {color: colors.text, borderColor: colors.border}]}
            placeholder="Enter a name for this count"
            placeholderTextColor={colors.text + '80'}
            value={countName}
            onChangeText={setCountName}
            autoFocus={!isEditMode}
          />
          <TouchableOpacity
            style={[styles.saveButton, {backgroundColor: isEditMode || countName.trim() ? '#4CAF50' : '#2196F3'}]}
            onPress={handleSave}>
            <Text style={styles.saveButtonText}>
              {isEditMode ? 'Update Count' : (countName.trim() ? 'Save with Name' : 'Save Count')}
            </Text>
          </TouchableOpacity>
        </View>
      )}

      <View style={styles.row}>
        <Text style={[styles.titleCell, {color: colors.text}]}>Count:</Text>
        <Text style={{marginLeft: 60, color: colors.text}}> {isSaved ? (Number(editableCount) || count) : count} </Text>
      </View>
      <View style={styles.row}>
        <Text style={[styles.titleCell, {color: colors.text}]}>
          Date, Time:
        </Text>
        <Text style={{marginLeft: 30, color: colors.text}}>{dateInfo}</Text>
      </View>
      
      {countName && isSaved && (
        <View style={styles.row}>
          <Text style={[styles.titleCell, {color: colors.text}]}>Name:</Text>
          <Text style={{marginLeft: 60, color: colors.text}}>{countName}</Text>
        </View>
      )}
      
      {isSaved && (
        <Text style={[styles.savedMessage, {color: colors.text}]}>
          {isEditMode ? 'Count updated successfully!' : 'Count saved successfully!'}
        </Text>
      )}
      
      {!isSaved && (
        <Text style={[styles.savedMessage, {color: colors.text, fontStyle: 'italic'}]}>
          {isEditMode ? 'Edit the count details and press Update' : 'Enter a name for this count (optional) and press Save'}
        </Text>
      )}
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
  inputContainer: {
    marginHorizontal: 20,
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  input: {
    height: 40,
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    fontSize: 16,
  },
  savedMessage: {
    fontSize: 14,
    fontStyle: 'italic',
    textAlign: 'center',
    marginTop: 20,
  },
  saveButton: {
    backgroundColor: '#4CAF50',
    padding: 12,
    borderRadius: 8,
    marginTop: 10,
    alignItems: 'center',
  },
  saveButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default SaveCountScreen;
