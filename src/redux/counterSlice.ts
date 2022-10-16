// -- How To Info for Redux Slice
//  https://www.youtube.com/watch?v=9zySeP5vH9c
//  https://redux-toolkit.js.org/usage/usage-guide
//  https://stackoverflow.com/questions/70468618/react-native-redux-how-do-i-update-a-specific-value-in-a-slice
// --

//The slice file represents the slice of logic and state for your redux app
import { createSlice } from '@reduxjs/toolkit';
// Main API function used to define redux logic
import type { PayloadAction } from '@reduxjs/toolkit';
// The function logic of one given action object

export type CountData = {
  //{key: key, count: count, countDate: dateInfo};
  key: string;
  count: number;
  date: string;
};

export type Subfolder = {
  name: string;
  countData: CountData[];
  isSelected: boolean;
};

export type Topfolder = {
  name: string;
  isSelected: boolean,
  countData: CountData[];
  subfolders: Subfolder[];
};

export interface CounterState {
  //Represents the state of our counter which is managed by the reducer
  folderList: Topfolder[];
};

const initialState: CounterState = {
  // Represents the initial state for the CounterState defined in the interface
  folderList: [
    {
      name: 'MyHomey',
      isSelected: true,
      countData: [
        {"count": 0, "date": "Thu, Sep 15, 2022 at 02:23:08 PM", "key": "1663276990053"},
        {"count": 5, "date": "Fri, Sep 16, 2022 at 12:07:24 PM", "key": "1663355246281"},
        {"count": 0, "date": "Fri, Sep 16, 2022 at 05:33:55 PM", "key": "1663374837974"},
        {"count": 0, "date": "Fri, Sep 16, 2022 at 05:34:11 PM", "key": "1663374853235"},
        {"count": 0, "date": "Wed, Sep 21, 2022 at 01:28:46 PM", "key": "1663792128171"},
      ],
      subfolders: [],
    },
    {
        name: 'Folder-1',
        isSelected: false,
        countData: [
          {"count": 0, "date": "Thu, Sep 15, 2022 at 02:23:08 PM", "key": "1663276990053"},
          {"count": 5, "date": "Fri, Sep 16, 2022 at 12:07:24 PM", "key": "1663355246281"},
          {"count": 0, "date": "Fri, Sep 16, 2022 at 05:33:55 PM", "key": "1663374837974"},
          {"count": 0, "date": "Fri, Sep 16, 2022 at 05:34:11 PM", "key": "1663374853235"},
          {"count": 0, "date": "Wed, Sep 21, 2022 at 01:28:46 PM", "key": "1663792128171"},
        ],
        subfolders: [],
    },
]};

export const counterSlice = createSlice({
  name: 'counter',  // name of (type string) the object
  initialState, // initial state of the object
  reducers: { // reducers is where the different types of logic and functions. 
              // Written as an inline object function
    addCount: (state, action: PayloadAction<CountData>) => {
      //console.log('addCount', action.payload);
      state.folderList[0].countData.push(action.payload);
      //console.log('updated state:',state);
    },
    removeCount: (state, action: PayloadAction<Array<CountData>>) => {
      //console.log('removeCount key:', action.payload);
      return {
        ...state,
        countData: action.payload,
      };
    },
    addTopfolder: (state, action: PayloadAction<string>) => {
      state.folderList.push(
        {
          name: action.payload,
          isSelected: false,
          countData: [],
          subfolders: [],
        }
      );
      //console.log('added topfolder state:',state);
    },
    removeTopfolder: (state, action: PayloadAction<number>) => {
      state.folderList.splice(action.payload, 1);
    },    
    addSubfolder: (state, action: PayloadAction<{index: number, name: string}>) => {
      // console.log(' ~~ addSubfolder name: ', action.payload.name);
      // console.log(' ~~ addSubfolder index: ', action.payload.index);
      state.folderList[action.payload.index].subfolders.push({
        name: action.payload.name,
        countData: [],
        isSelected: false,
      });
    },
    removeSubfolder: (state, action: PayloadAction<{topIndex: number, subIndex: number}>) => {
      // console.log('file: counterSlice.ts ~ line 109 ~ topIndex', action.payload.topIndex);
      // console.log('file: counterSlice.ts ~ line 109 ~ subIndex', action.payload.subIndex);
      // console.log('file: counterSlice.ts ~ line 111 ~ BEFORE subfolders', state.folderList[action.payload.topIndex].subfolders);
      state.folderList[action.payload.topIndex].subfolders.splice(action.payload.subIndex, 1);
      // console.log('file: counterSlice.ts ~ line 112 ~ AFTER subfolders', state.folderList[action.payload.topIndex].subfolders);
    },
    setSaveTo: (state, action: PayloadAction<{topIndex: number, subIndex: number}>) => {
      // console.log('file: counterSlice.ts ~ line 109 ~ topIndex', action.payload.topIndex);
      // console.log('file: counterSlice.ts ~ line 109 ~ subIndex', action.payload.subIndex);
    },
  },
});

export const {addCount, removeCount, addTopfolder, removeTopfolder, addSubfolder, removeSubfolder} = counterSlice.actions;
// Action creators are generated for each case reducer function

export default counterSlice.reducer;

// const COUNTERS_KEY = '@CountersDataKey';
// const initialCountData = {
//   count: 0,
//   countData: '',
//   key: 0,
// };
// const initialSubfolders = {
//   name: '',
//   countData: initialCountData,
// };
// const initialCountersState = [
//   {
//     name: 'Default',
//     countData: [initialCountData],
//     subfolders: [initialSubfolders],
//   },
// ];

// const initialState = [{
    //     name: 'Folder-0',
    //     countData: [
    //       {"count": 0, "countDate": "Thu, Sep 15, 2022 at 02:23:08 PM", "key": 1663276990053},
    //       {"count": 5, "countDate": "Fri, Sep 16, 2022 at 12:07:24 PM", "key": 1663355246281},
    //       {"count": 0, "countDate": "Fri, Sep 16, 2022 at 05:33:55 PM", "key": 1663374837974},
    //       {"count": 0, "countDate": "Fri, Sep 16, 2022 at 05:34:11 PM", "key": 1663374853235},
    //       {"count": 0, "countDate": "Wed, Sep 21, 2022 at 01:28:46 PM", "key": 1663792128171},
    //     ],
    //     subfolders: [
    //       {
    //         name: 'subfolder-0a',
    //         countData: [
    //           {"count": 0, "countDate": "Thu, Sep 15, 2022 at 02:23:08 PM", "key": 1663276990053},
    //           {"count": 5, "countDate": "Fri, Sep 16, 2022 at 12:07:24 PM", "key": 1663355246281},
    //           {"count": 0, "countDate": "Fri, Sep 16, 2022 at 05:33:55 PM", "key": 1663374837974},
    //           {"count": 0, "countDate": "Fri, Sep 16, 2022 at 05:34:11 PM", "key": 1663374853235},
    //           {"count": 0, "countDate": "Wed, Sep 21, 2022 at 01:28:46 PM", "key": 1663792128171}
    //         ],
    //       },
    //       {
    //         name: 'subfolder-0b',
    //         countData: [
    //           {"count": 0, "countDate": "Thu, Sep 15, 2022 at 02:23:08 PM", "key": 1663276990053},
    //           {"count": 5, "countDate": "Fri, Sep 16, 2022 at 12:07:24 PM", "key": 1663355246281},
    //           {"count": 0, "countDate": "Fri, Sep 16, 2022 at 05:33:55 PM", "key": 1663374837974},
    //           {"count": 0, "countDate": "Fri, Sep 16, 2022 at 05:34:11 PM", "key": 1663374853235},
    //           {"count": 0, "countDate": "Wed, Sep 21, 2022 at 01:28:46 PM", "key": 1663792128171},
    //         ],
    //       },
    //     ],
    //   },
    //   {
    //     name: 'Folder-1',
    //   },
    //   {
    //     name: 'Folder-2',
    //     subfolders: [
    //       {
    //         name: 'subfolder-2a',
    //       },
    //       {
    //         name: 'subfolder-2b',
    //       },
    //       {
    //         name: 'subfolder-2c',
    //       },
    //     ],
    //   },
    // ];