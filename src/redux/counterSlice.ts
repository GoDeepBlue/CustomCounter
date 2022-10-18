//The slice file represents the slice of logic and state for your redux app
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
// Main API function used to define redux logic
import type { PayloadAction } from '@reduxjs/toolkit';
// The function logic of one given action object
import {saveState } from '../components/AsyncStorageFunctions';

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
      name: 'Default',
      isSelected: true,
      countData: [],
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
      //state.folderList[0].countData.push(action.payload);
      //console.log('updated state:',state);
      for (let i = 0; i < state.folderList.length; i++) {
        if (state.folderList[i].isSelected) {
          state.folderList[i].countData.push(action.payload);
        } else {
          for (let j = 0; j < state.folderList[i].subfolders.length; j++) {
            if (state.folderList[i].subfolders[j].isSelected) {
              state.folderList[i].subfolders[j].countData.push(action.payload);
            }
          }
        }
      }
      saveState(state);
    },
    removeCount: (state, action: PayloadAction<Array<CountData>>) => {
      //console.log('removeCount key:', action.payload);
      for (let i = 0; i < state.folderList.length; i++) {
        if (state.folderList[i].isSelected) {
            state.folderList[i].countData = [...action.payload];
        } else {
          for (let j = 0; j < state.folderList[i].subfolders.length; j++) {
            if (state.folderList[i].subfolders[j].isSelected) {
              state.folderList[i].subfolders[j].countData = [...action.payload];
            }
          }
        }
      }
      saveState(state);
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
      saveState(state);
    },
    removeTopfolder: (state, action: PayloadAction<number>) => {
      state.folderList.splice(action.payload, 1);
      saveState(state);
    },    
    addSubfolder: (state, action: PayloadAction<{index: number, name: string}>) => {
      state.folderList[action.payload.index].subfolders.push({
        name: action.payload.name,
        countData: [],
        isSelected: false,
      });
      saveState(state);
    },
    removeSubfolder: (state, action: PayloadAction<{topIndex: number, subIndex: number}>) => {
      state.folderList[action.payload.topIndex].subfolders.splice(action.payload.subIndex, 1);
      saveState(state);
    },
    setSaveTo: (state, action: PayloadAction<{name: string, subfolder: string}>) => {
      //FUNCTION sets the isSelected attribute for the 'save to' location
      // INPUT
      // <{name = top folder name, subfolder = subfolder name}>
      // ----------------------
      console.log('file: counterSlice.ts ~ line 119 ~ setSaveTo name:', action.payload.name);
      // clear all isSelected
      for (let i = 0; i < state.folderList.length; i++) {
        //for all top folders
        state.folderList[i].isSelected = false;
        for (let j = 0; j < state.folderList[i].subfolders.length; j++) {
          // for all subfolders
          state.folderList[i].subfolders[j].isSelected = false;
        }
      }
      // -- loop through again to set isSelected for new folder
      state.folderList.forEach(folder => {
      // for each top folder
        if (folder.name === action.payload.name) {
          if (action.payload.subfolder === '') { 
            // there is no sub folder
            folder.isSelected = true;
            console.log('file: counterSlice.ts ~ line 140 ~ TOP folder.isSelected', folder.name);
          } else {
            //there is a subfolder
            folder.subfolders.forEach(sub => {
              if (sub.name === action.payload.subfolder) {
                sub.isSelected = true;
                console.log('file: counterSlice.ts ~ line 140 ~ SUB folder.isSelected', sub.name);
              }
            })
          }
        }
      })
      saveState(state);
    },
  },
});

export const {addCount, removeCount, addTopfolder, removeTopfolder, addSubfolder, removeSubfolder, setSaveTo} = counterSlice.actions;
// Action creators are generated for each case reducer function

export default counterSlice.reducer;