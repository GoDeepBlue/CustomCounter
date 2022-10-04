import React, {createContext, useState} from 'react';

import AsyncStorage from '@react-native-async-storage/async-storage';
export const DataContext = createContext();

export const DataContextProvider = ({children}) => {
  const COUNTERS_KEY = '@CountersDataKey';
  const initialCountData = {
    count: 0,
    countData: '',
    key: 0,
  };
  const initialSubfolders = {
    name: '',
    countData: initialCountData,
  };
  const initialCountersState = [
    {
      name: 'Default',
      countData: [initialCountData],
      subfolders: [initialSubfolders],
    },
  ];

  const [countersData, setCountersData] = useState(initialCountersState);

  const value = {
    countersData,
    setCountersData,
    addCount,
    getCountsFromFolder,
    saveDataLocal,
    getDataLocal,
  };

  /**
   * FUNCTION adds the newCount to the saveToFolder location
   * @param {object} newCount = {key: key, count: count, countDate: dateInfo}
   * @param {object} saveToFolder = {"name": "Folder-0", "subfolder": ""}
   *
   * OUTPUT:
   *  setCountersData used to update CountersData
   */
  function addCount(newCount, saveToFolder) {
    console.log(' ===== START - AddCount ===== ');
    console.log('~~~ START ~~~ countersData.name:', countersData[0].name);
    console.log('~~~ START ~~~ countersData.countData:', countersData[0].countData);

    console.log(' ~ addCount ~ newCount:', newCount);

    console.log('~ addCount ~ saveToFolder:', saveToFolder);

    // countersData.forEach(element => {
    //   console.log('forEach element:', element);
    // });

    // countersData.map(folder => {
    //   console.log('map folder:', folder);
    //   console.log('map folder.name:', folder.name);
    // });

    const newItem = countersData.map(folder => {
      if (folder.name === saveToFolder.name) {
        return {
          ...countersData,
          countData: {
            ...newCount,
          },
        };
      }
    });
    console.log(' ~~~~~~ newItem ~~~~~~~ newItem:', newItem);
    setCountersData(newItem);
    console.log('~~~ END ~~~ countersData.countData:', countersData[0].countData);
    console.log(' ===== END - AddCount ===== ');
  }

  /**
   * FUNCTION gets the counts for a specified folder
   * @param {object} saveToFolder = {"name": "Folder-0", "subfolder": ""}
   * @returns countData array or null
   */
  async function getCountsFromFolder(saveToFolder) {
    console.log('file: CountersDataContext.js ~ line 153 ~ getCountsFromFolder ~ saveToFolder', saveToFolder);
    var topIndex;
    var subIndex;
    //TOP FOLDER SPECIFIED && NO SUBFOLDER
    if (saveToFolder.name !== '' && saveToFolder.subfolder === '') {
      countersData.map(folders => {
        if (folders.name === saveToFolder.name) {
          console.log('file: CountersDataContext.js ~ line 160 ~ getCountsFromFolder ~ folders.name', folders.name);
          console.log('file: CountersDataContext.js ~ line 162 ~ getCountsFromFolder ~ folders.countData', folders.countData);
          return folders.countData;
        } else {
          return null;
        }
      });
      topIndex = countersData.findIndex(
        folder => folder.name === saveToFolder.name,
      );
      // determine if Top Folder exists index is -1 DNE or 0, 1, 2 if Exist
      if (topIndex >= 0) {
        return countersData[topIndex].countData;
      } else {
        return null;
      }
    }
    //TOP FOLDER && SUB FOLDER SPECIFIED
    if (saveToFolder.name !== '' && saveToFolder.subfolder !== '') {
      topIndex = countersData.findIndex(
        folder => folder.name === saveToFolder.name,
      );
      // determine if Top Folder exists index is -1 DNE or 0, 1, 2 if Exist
      if (topIndex >= 0) {
        subIndex = countersData[topIndex].subfolders.findIndex(
          sub => sub.name === saveToFolder.subfolder,
        );
        if (subIndex >= 0) {
          return countersData[topIndex].subfolders[subIndex].countData;
        } else {
          return null;
        }
      }
    }
  }

  /**
   * Function saves the current APPs Counter Data to local storage
   */
  async function saveDataLocal() {
    AsyncStorage.setItem(COUNTERS_KEY, JSON.stringify(countersData));
  }

  /**
   * Function retrieves Counter's data from local storage
   * @returns CountersData object || null
   */
  async function getDataLocal() {
    const resp = await AsyncStorage.getItem(COUNTERS_KEY);
    const data = await JSON.parse(resp);
    console.log('file: CountersDataProvider.js ~ line 182 ~ getDataLocal ~ data:', data);
    if (data !== null && data !== undefined) {
      setCountersData(data);
      return data;
    } else {
      setCountersData(initialCountersState);
      return initialCountersState;
    }
  }

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
};
