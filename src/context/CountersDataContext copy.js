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
    // eslint-disable-next-line prettier/prettier
    console.log('file: CountersDataProvider.js ~ line 37 ~ addCount ~ newCount:', newCount);
    // eslint-disable-next-line prettier/prettier
    console.log('file: CountersDataProvider.js ~ line 37 ~ addCount ~ saveToFolder:', saveToFolder);
    console.log('file: CountersDataProvider.js ~ line 37 ~ addCount ~ countersData:', countersData);
    let topIndex = countersData.findIndex(folder) => folder.name === saveToFolder.name);

    switch (topIndex) {
      case -1:
        // ----- NEW TOP FOLDER AND NO SUBFOLDER SPECIFIED
        if (saveToFolder.subfolder === '') {
          console.log('~~ NEW TOP FOLDER && NO SUBFOLDER ~~');
          const newTopData = {
            name: saveToFolder.name,
            countData: [newCount],
            subfolders: [],
          };
          setCountersData([...countersData, newTopData]);
        } else {
          // --- NEW TOP FOLDER AND SUBFOLDER SPECIFIED
          console.log('~~ NEW TOP FOLDER && SUBFOLDER SPECIFIED ~~');
          const newSubData = [
            {
              name: saveToFolder.subfolder,
              countData: [newCount],
            },
          ];
          const newTopData = {
            name: saveToFolder.name,
            subfolders: newSubData,
          };
          setCountersData([...countersData, newTopData]);
        }
        break;
      default:
        //TOP FOLDER NAME EXISTS BUT NO SUBFOLDER SPECIFIED
        if (saveToFolder.subfolder === '') {
          console.log('~~ TOP FOLDER EXIST AND NO SUBFOLDER ~~');
          const newTopData = {
            name: saveToFolder.name,
            countData: [newCount],
            subfolders: [],
          };
          setCountersData(countersData[topIndex].countData.push(newTopData));
        } else {
          //TOP FOLDER NAME EXISTS AND SUBFOLDER SPECIFIED
          console.log('~~ TOP FOLDER && SUBFOLDER ~~');
          const subIndex = countersData[topIndex].subfolders.findIndex(
            folder => folder.name === saveToFolder.subfolder,
          );
          console.log(' ~ subIndex', subIndex);
          if (subIndex >= 0) {
            // SUBFOLDER EXISTS
            setCountersData(
              countersData[topIndex].subfolders[subIndex].countData.push(
                newCount,
              ),
            );
          } else {
            // SUBFOLDER DOES NOT EXIST
            const newSubData = [
              {
                name: saveToFolder.subfolder,
                countData: [newCount],
              },
            ];
            setCountersData(countersData[topIndex].subfolders.push(newSubData));
          }
        }
        console.log(' ===== END - AddCount ===== ');
    }
  }

  /**
   * FUNCTION gets the counts for a specified folder
   * @param {object} saveToFolder = {"name": "Folder-0", "subfolder": ""}
   * @returns countData array or null
   */
  async function getCountsFromFolder(saveToFolder) {
    var topIndex;
    var subIndex;
    //TOP FOLDER SPECIFIED && NO SUBFOLDER
    if (saveToFolder.name !== '' && saveToFolder.subfolder === '') {
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
