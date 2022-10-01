// Learn React Context API - build a todo app
// https://www.youtube.com/watch?v=piZppPZeeso
import React, {createContext, useContext, useState} from 'react';

import AsyncStorage from '@react-native-async-storage/async-storage';

const COUNTERS_KEY = '@CountersDataKey';

const CountersDataContext = createContext();

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

const CountersDataProvider = ({children}) => {
  const [countersData, setCountersData] = useState(initialCountersState);

  const contextValue = {
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
  const addCount = async (newCount, saveToFolder) => {
    // eslint-disable-next-line prettier/prettier
    console.log('file: CountersDataProvider.js ~ line 37 ~ addCount ~ newCount:', newCount);
    // eslint-disable-next-line prettier/prettier
    console.log('file: CountersDataProvider.js ~ line 37 ~ addCount ~ saveToFolder:', saveToFolder);
    let topIndex = countersData.findIndex(
      folder => folder.name === saveToFolder.name,
    );

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
          this.setCountersData([...countersData, newTopData]);
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
          this.setCountersData([...countersData, newTopData]);
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
          this.setCountersData(
            this.countersData[topIndex].countData.push(newTopData),
          );
        } else {
          //TOP FOLDER NAME EXISTS AND SUBFOLDER SPECIFIED
          console.log('~~ TOP FOLDER && SUBFOLDER ~~');
          const subIndex = countersData[topIndex].subfolders.findIndex(
            folder => folder.name === saveToFolder.subfolder,
          );
          console.log(' ~ subIndex', subIndex);
          if (subIndex >= 0) {
            // SUBFOLDER EXISTS
            this.setCountersData(
              this.countersData[topIndex].subfolders[subIndex].countData.push(
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
            this.setCountersData(
              this.countersData[topIndex].subfolders.push(newSubData),
            );
          }
        }
        console.log(' ===== END - AddCount ===== ');
    }
  };

  /**
   * FUNCTION gets the counts for a specified folder
   * @param {object} saveToFolder = {"name": "Folder-0", "subfolder": ""}
   * @returns countData array or null
   */
  const getCountsFromFolder = async saveToFolder => {
    var topIndex;
    var subIndex;
    //TOP FOLDER SPECIFIED && NO SUBFOLDER
    if (saveToFolder.name !== '' && saveToFolder.subfolder === '') {
      topIndex = this.countersData.findIndex(
        folder => folder.name === saveToFolder.name,
      );
      // determine if Top Folder exists index is -1 DNE or 0, 1, 2 if Exist
      if (topIndex >= 0) {
        return this.countersData[topIndex].countData;
      } else {
        return null;
      }
    }
    //TOP FOLDER && SUB FOLDER SPECIFIED
    if (saveToFolder.name !== '' && saveToFolder.subfolder !== '') {
      topIndex = this.countersData.findIndex(
        folder => folder.name === saveToFolder.name,
      );
      // determine if Top Folder exists index is -1 DNE or 0, 1, 2 if Exist
      if (topIndex >= 0) {
        subIndex = this.countersData[topIndex].subfolders.findIndex(
          sub => sub.name === saveToFolder.subfolder,
        );
        if (subIndex >= 0) {
          return this.countersData[topIndex].subfolders[subIndex].countData;
        } else {
          return null;
        }
      }
    }
  };

  /**
   * Function saves the current APPs Counter Data to local storage
   */
  const saveDataLocal = async () => {
    AsyncStorage.setItem(COUNTERS_KEY, JSON.stringify(this.countersData));
  };

  /**
   * Function retrieves Counter's data from local storage
   * @returns CountersData object || null
   */
  const getDataLocal = async () => {
    const resp = await AsyncStorage.getItem(COUNTERS_KEY);
    const data = await JSON.parse(resp);
    console.log('file: CountersDataProvider.js ~ line 182 ~ getDataLocal ~ data:', data);
    if (data !== null) {
      this.setCountersData(data);
      return data;
    } else {
      this.setCountersData(initialCountersState);
      return initialCountersState;
    }
  };

  return (
    <CountersDataContext value={contextValue}>{children}</CountersDataContext>
  );
};

export const useCountersData = () => useContext(CountersDataContext);

export default CountersDataProvider;

// const initialState = [{
//   name: 'Folder-0',
//   countData: [
//     {"count": 0, "countDate": "Thu, Sep 15, 2022 at 02:23:08 PM", "key": 1663276990053},
//     {"count": 5, "countDate": "Fri, Sep 16, 2022 at 12:07:24 PM", "key": 1663355246281},
//     {"count": 0, "countDate": "Fri, Sep 16, 2022 at 05:33:55 PM", "key": 1663374837974},
//     {"count": 0, "countDate": "Fri, Sep 16, 2022 at 05:34:11 PM", "key": 1663374853235},
//     {"count": 0, "countDate": "Wed, Sep 21, 2022 at 01:28:46 PM", "key": 1663792128171},
//   ],
//   subfolders: [
//     {
//       name: 'subfolder-0a',
//       countData: [
//         {"count": 0, "countDate": "Thu, Sep 15, 2022 at 02:23:08 PM", "key": 1663276990053},
//         {"count": 5, "countDate": "Fri, Sep 16, 2022 at 12:07:24 PM", "key": 1663355246281},
//         {"count": 0, "countDate": "Fri, Sep 16, 2022 at 05:33:55 PM", "key": 1663374837974},
//         {"count": 0, "countDate": "Fri, Sep 16, 2022 at 05:34:11 PM", "key": 1663374853235},
//         {"count": 0, "countDate": "Wed, Sep 21, 2022 at 01:28:46 PM", "key": 1663792128171}
//       ],
//     },
//     {
//       name: 'subfolder-0b',
//       countData: [
//         {"count": 0, "countDate": "Thu, Sep 15, 2022 at 02:23:08 PM", "key": 1663276990053},
//         {"count": 5, "countDate": "Fri, Sep 16, 2022 at 12:07:24 PM", "key": 1663355246281},
//         {"count": 0, "countDate": "Fri, Sep 16, 2022 at 05:33:55 PM", "key": 1663374837974},
//         {"count": 0, "countDate": "Fri, Sep 16, 2022 at 05:34:11 PM", "key": 1663374853235},
//         {"count": 0, "countDate": "Wed, Sep 21, 2022 at 01:28:46 PM", "key": 1663792128171},
//       ],
//     },
//   ],
// },
// {
//   name: 'Folder-1',
// },
// {
//   name: 'Folder-2',
//   subfolders: [
//     {
//       name: 'subfolder-2a',
//     },
//     {
//       name: 'subfolder-2b',
//     },
//     {
//       name: 'subfolder-2c',
//     },
//   ],
// },
// ];
