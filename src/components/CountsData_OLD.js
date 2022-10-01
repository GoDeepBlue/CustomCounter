import React, {useState, useEffect} from 'react';

//import * as AsyncStorageFunctions from './AsyncStorageFunctions';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as _ from 'lodash';
const COUNTS_KEY = '@CounterDataKey';

const initialState = [
  {
    name: 'Default',
    countData: [],
    subfolders: [],
  },
];

// export const saveLocal = async dataToSave => {
//   AsyncStorage.setItem(COUNTS_KEY, JSON.stringify(dataToSave));
// };

// export const addCount = async (newCount, saveToFolder) => {
//   //Function Adds the passed count to the Counter Data at the saveToFolder Location
//   // INPUTS:
//   //  newCount = {key: key, count: count, countDate: dateInfo}
//   //  saveToFolder = {"name": "Folder-0", "subfolder": ""}
//   // OUTPUTS:
//   //  A) Returned 'False' if errors occurred - OR - updatedCounterData with newCount
//   //  local counterStored data updated too
//   console.log(' ===== Start - AddCount ===== ');
//   if (
//     saveToFolder === null ||
//     saveToFolder === undefined ||
//     saveToFolder === ''
//   ) {
//     console.warn(' ~~ no saveToFolder specified ~~ ');
//     // saveToFolder must be specified
//     return false;
//   }
//   console.log(' ~~ saveToFolder:', saveToFolder);
//   console.log(' ~~ newCount:', newCount);

//   const data = await getCountsData();
//   let countData;
//   if (data !== null && data !== undefined && data !== '') {
//     countData = _.clone(data);
//   } else {
//     //No data was stored
//     countData = [
//       {
//         name: 'Default',
//         countData: [],
//         subfolders: [],
//       },
//     ];
//   }

//   let topIndex = countData.findIndex(
//     folder => folder.name === saveToFolder.name,
//   );
//   // Determine if Top Folder exists index is -1 if DNE or 0, 1, 2 if Exist
//   console.log(' ~ topIndex:', topIndex);

//   switch (topIndex) {
//     case -1:
//       let newCounterData;
//       // ----- TOP FOLDER NAME DID NOT EXIST AND NO SUBFOLDER SPECIFIED - need to check
//       if (saveToFolder.subfolder === '') {
//         console.log('~~ NEW TOP FOLDER && NO SUBFOLDER ~~');
//         const newTopData = {
//           name: saveToFolder.name,
//           countData: [newCount],
//         };
//         newCounterData = [...countData, newTopData];
//       }

//       // --- TOP FOLDER NAME DOES NOT EXIST AND SUBFOLDER SPECIFIED - need to check
//       if (saveToFolder.subfolder !== '') {
//         console.log('~~ NEW TOP FOLDER && SUBFOLDER SPECIFIED ~~');
//         const newTopData = {
//           name: saveToFolder.name,
//           subfolders: [
//             {
//               name: saveToFolder.subfolder,
//               countData: [newCount],
//             },
//           ],
//         };
//         newCounterData = [...countData, newTopData];
//       }

//       console.log('~~ newCounterData', newCounterData);
//       newCounterData.forEach(folder => {
//         console.log('~~ TopFolder.name:', folder.name);
//         console.log('~~ TopFolder.countData:', folder.countData);
//       });
//       saveCountsData(newCounterData);
//       console.log(' ===== END - AddCount ===== ');
//       return newCounterData;
//     default:
//       //TOP FOLDER NAME EXISTS BUT NO SUBFOLDER SPECIFIED -- need to check
//       if (saveToFolder.subfolder === '') {
//         console.log('~~ TOP FOLDER EXIST AND NO SUBFOLDER ~~');
//         if ('countData' in countData[topIndex]) {
//           countData[topIndex].countData.push(newCount);
//         } else {
//           console.warn('TOP FOLDER BUT NO COUNT DATA ADDED');
//         }
//       }

//       //TOP FOLDER NAME EXISTS AND SUBFOLDER SPECIFIED - need to check
//       if (saveToFolder.subfolder !== '') {
//         console.log('~~ TOP FOLDER && SUBFOLDER ~~');
//         const subIndex = countData[topIndex].subfolders.findIndex(
//           folder => folder.name === saveToFolder.subfolder,
//         );
//         console.log(' ~ subIndex', subIndex);
//         if (subIndex >= 0) {
//           // SUBFOLDER EXISTS - need to check
//           countData[topIndex].subfolders[subIndex].countData.push(newCount);
//           console.log(' ~~ UPDATED countData ~~');
//           console.log(' ~~ UPDATED countData.name:', countData[topIndex].name);
//           console.log(
//             ' ~~ UPDATED countData.name.subfolder:',
//             countData[topIndex].subfolders[subIndex].name,
//           );
//         } else {
//           // SUBFOLDER DOES NOT EXIST - need to check
//           const newSub = {
//             name: saveToFolder.subfolder,
//             countData: [newCount],
//           };
//           console.log('~~ newSub:', newSub);
//           countData[topIndex].subfolders.push(newSub);
//           console.log(' ~~ UPDATED testData ~~');
//           console.log(' ~~ UPDATED testData.name:', countData[topIndex].name);
//           countData[topIndex].subfolders.forEach(element => {
//             console.log(' -- ELEMENT.name:', element.name);
//           });
//         }
//       }
//       saveCountsData(countData);
//       console.log(' ===== END - AddCount ===== ');
//       return countData;
//   }
// };

// export const getCountsFromFolder = async saveToFolder => {
//   // saveToFolder = {name: <TOP_FOLDER>, subfolder: <SUB_FOLDER>}

//   const data = getCountsData();
//   let counterData;
//   if (data !== null && data !== undefined && data !== '') {
//     counterData = _.clone(data);
//   } else {
//     //No data was stored
//     counterData = [
//       {
//         name: 'Default',
//         countData: [],
//         subfolders: [],
//       },
//     ];
//   }
//   console.log(' ~~ GetCountsFromFolder ~ counterData:', counterData);
//   console.log(' ~~ GetCountsFromFolder ~ saveToFolder:', saveToFolder);

//   var topIndex;
//   var subIndex;
//   var folderCountData;

//   //TOP FOLDER SPECIFIED, NO SUBFOLDER - in-process
//   if (saveToFolder.name !== '' && saveToFolder.subfolder === '') {
//     topIndex = counterData.findIndex(
//       folder => folder.name === saveToFolder.name,
//     );
//     // determine if Top Folder exists index is -1 DNE or 0, 1, 2 if Exist
//     console.log(' ~ index', topIndex);
//     if (topIndex >= 0) {
//       folderCountData = _.clone(counterData[topIndex].countData);
//     } else {
//       folderCountData = [];
//     }
//     console.log('folderCounts', folderCountData);
//   }
//   //TOP FOLDER & SUB FOLDER SPECIFIED - in-process ...
//   if (saveToFolder.name !== '' && saveToFolder.subfolder !== '') {
//     topIndex = data.findIndex(folder => folder.name === saveToFolder.name);
//     // determine if Top Folder exists index is -1 DNE or 0, 1, 2 if Exist
//     if (topIndex >= 0) {
//       subIndex = counterData[topIndex].subfolders.findIndex(
//         sub => sub.name === saveToFolder.subfolder,
//       );
//       console.log('~~ ~~ subIndex', subIndex);
//       if (subIndex >= 0) {
//         folderCountData = _.clone(
//           counterData[topIndex].subfolders[subIndex].countData,
//         );
//       } else {
//         folderCountData = [];
//       }
//       console.log('subFolderCounts', folderCountData);
//     }
//   }
//   return folderCountData;
// };

// export const getLocal = async () => {
//   const resp = await AsyncStorage.getItem(COUNTS_KEY);
//   const data = await JSON.parse(resp);
//   if (data !== null) {
//     return data;
//   } else {
//     saveCountsData(initialState);
//     return initialState;
//   }
// };

export const printCountsData = counterData => {
  console.log(' ===== START == printCounterData ====== ');
  counterData.forEach(element => {
    console.log('name:', element.name);
    console.log('countData:');
    element.countData.forEach(subElement => {
      console.log(subElement);
    });
    console.log('subfolders:');
    element.subfolder.forEach(subElement => {
      console.log(subElement);
    });
  });
  console.log(' ===== END == printCounterData ====== ');
};

// const COUNT_DATA = '@CounterDataKey';

// // OLD Counter Key STORAGEKEY = "@StorageKEY";

// export const getCountData = async () => {
//   const resp = await AsyncStorage.getItem(COUNT_DATA);
//   const data = await JSON.parse(resp);
//   console.log(' ~~ AsyncStorageFunctions.getCountData:', data);
//   return data;
// };
