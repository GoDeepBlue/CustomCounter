import AsyncStorage from '@react-native-async-storage/async-storage';

const FOLDER_KEY = '@FolderStorageKEY';
const SETTINGS_KEY = '@AppSettingsKEY';

export const setSaveToFolder = async folder => {
  //Function used to set which folder the user would like to save their counts too
  //INPUT:
  // folder = {name: <FolderName>, subfolder: <SubFolderName> }
  // ---------------------------------
  //console.log('AsyncStorageFunctions.setSaveToFolder:', folder);
  try {
    await AsyncStorage.setItem(FOLDER_KEY, JSON.stringify(folder));
  } catch (error) {
    console.warn('Error:' + error);
  }
  //console.log('Async called');
};

export const getSaveToFolder = async () => {
  //Function is used to get the folder where the user choose to save their counts
  //INPUT: None
  //OUTPUT:
  // {name: <FolderName>, subfolder: <SubFolderName> }
  // ---------------------------------
  const resp = await AsyncStorage.getItem(FOLDER_KEY);
  const data = await JSON.parse(resp);

  //console.log('file: AsyncFunctions.js ~ line 25 ~ getFolder ~ data', data);
  return data;
};

export function storeSettings(themeVal) {
  // console.log('storeData called');
  // console.log(JSON.stringify(isDarkTheme));
  // ---------------------------------
  AsyncStorage.setItem(SETTINGS_KEY, JSON.stringify(themeVal));
}

export const getThemeSetting = async () => {
  // ---------------------------------
  const resp = await AsyncStorage.getItem(SETTINGS_KEY);
  const data = await JSON.parse(resp);
  //console.log('file: AsyncStorageFunctions.js ~ line 41 ~ getThemeSetting ~ data:', data);
  return data;
};
