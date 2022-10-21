/* eslint-disable prettier/prettier */
import React, { useState, useEffect } from 'react';

import { View, Pressable, Text, Switch, Linking, ScrollView, Alert } from 'react-native';

import { useTheme } from '@react-navigation/native';
import { ListItem, Icon } from '@rneui/themed';
import { EventRegister } from 'react-native-event-listeners';

import * as AsyncStorageFunctions from '../../components/AsyncStorageFunctions';
// Imports for react-redux tools
import {useAppDispatch, useAppSelector} from '../../redux/hooks';
import {removeTopfolder, removeSubfolder, setSaveTo} from '../../redux/counterSlice';
// --
import styles from './styles';
import SubfolderList from './SubfolderList';
import InputAddFolder from './InputAddFolder';

const CounterSettingsScreen = ({route}) => {
  //Function is the settings screen for the app settings
  //
  const appTheme = useTheme();
  let colors = appTheme.colors;
  const reduxFolders = useAppSelector((state) => state.counter.folderList);
  const dispatch = useAppDispatch();

  const [isDarkTheme, setIsDarkTheme] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [saveToFolder, setSaveToFolder] = useState({});
  const [isChanged, setIsChanged] = useState(false);
  const [folders, setFolders] = useState([]);
  //Used for storing the folder structure and folders count data
  const [createFolderIn, setCreateFolderIn] = useState('');
  //Used as a flag for expanding or contracting TopLevel folder
  const [showInput, setShowInput] = useState(false);
  //Used as flag for InputAddFolder name Functional Component

    useEffect(() => { 
      getAppTheme();
      getSaveToFolder();
      setFolders(reduxFolders);
    }, []);

    useEffect(() => { 
      getSaveToFolder();
      setFolders(reduxFolders);
    }, [isChanged]);

    function getAppTheme() {
        // console.log('whatIsAppTheme: ' + appTheme.dark);
        // console.log(appTheme);
        if (appTheme.dark === true) {
            setIsDarkTheme(true);
        } else {
            setIsDarkTheme(false);
        }
    }

    const toggleTheme = async () => {
        setIsDarkTheme(!isDarkTheme);
        EventRegister.emit('changeThemeEvent', !isDarkTheme);
        await AsyncStorageFunctions.storeSettings(!isDarkTheme);
    };

    const getSaveToFolder = () => {
      reduxFolders.forEach(top => {
          if (top.isSelected) {
            //console.log('~~ line 71 ~ getSaveToFolder ~ found saveTo:', {name: top.name, subfolder: ''});
            setSaveToFolder({name: top.name, subfolder: ''});
          } else {
            //console.log(' ~~ no top saveTo folder');
            top.subfolders.forEach( sub => {
              if (sub.isSelected) {
                //console.log('~~ line 76 ~ getSaveToFolder ~ found saveTo:', {name: top.name, subfolder: sub.name});
                setSaveToFolder({name: top.name, subfolder: sub.name});
              } else {
                //console.log(' ~~ no top or sub folder ~~~ PROBLEM');
              }
            });
          }
      });
      setIsLoading(false);
    };

    const changeSaveToFolder = (newFolder) => {
      //console.log(' ~ line 85 ~ changeSaveToFolder ~ newFolder', newFolder);
      setSaveToFolder(newFolder);
      dispatch(setSaveTo(newFolder));
    };

    const renderAccordionIcon = () => (
      <Icon name='arrow-drop-up' color={colors.text} size={30} />
    );

    const onSaveToFolder = (newSaveToFolder) => {
      // Function to change the users "Save To" folder location.
      //{
      //  name: <RootFolderName>,
      //  subfolder: <SubFolderName>,
      //}
      Alert.alert(
        "Confirm Folder",
        "Are you sure you want to change your Counts Folder?",
        [
          {
            text: "Yes",
            onPress: () => {
              //console.log("Yes Pressed");
              changeSaveToFolder(newSaveToFolder);
            },
          },
          { text: "No", onPress: () => console.log("No Pressed") }
        ]
      );
      //console.log('CounterSettings ~ onSaveToFolder ~ saveToFolder', newSaveToFolder);
    };

    const onDeleteSubFolder = (aFolderTree, folder2Delete) => {
      // Function deletes the folder from the folder object
      // INPUT:
      //  aFolderTree = Top Level Folder
      //  folder2Delete = The folder to remove
      // ----------------------------------------
      // console.log('All Folders in Tree:', aFolderTree );
      // console.log('Folder to delete:', folder2Delete );

      if (saveToFolder.subfolder === folder2Delete) {
        Alert.alert('Error', 'You must change your current Counts Folder before it can be deleted.');
      } else {
        Alert.alert(
          "Confirm Delete?",
          "This cannot be undone. Are you sure you want to delete " + folder2Delete + "?",
          [
            {
              text: "Yes",
              onPress: () => {
                const topIndex = folders.findIndex(folder => folder.name === aFolderTree.name);
                const subIndex = aFolderTree.subfolders.findIndex(subfolder => subfolder.name === folder2Delete);
                const parmObject = {topIndex: topIndex, subIndex: subIndex};
                dispatch(removeSubfolder(parmObject));
                setIsChanged(!isChanged);
              },
            },
            { text: "No", onPress: () => console.log("No Pressed") }
          ]
        );
      }
    };

    const onDeleteTopFolder = (folder2Delete) => {
      // Function deletes the folder from the folder object
      // INPUT:
      //  folder2Delete = The folder to remove
      // ----------------------------------------
      // console.log('All Folders in Tree:', aFolderTree );
      // console.log('Folder to delete:', folder2Delete );
      const index = folders.findIndex(folder => folder.name === folder2Delete);
      const subDirs = folders[index].subfolders?.length;
      if (folders.length === 1) {
        Alert.alert('Error', 'At least one folder must remain. You can delete all folders.');
        return false;
      }

      if (subDirs > 0 ) {
        Alert.alert('Error', 'The folders within ' + folder2Delete + ' must be removed before it can be deleted.');
      } else {
        Alert.alert(
          "Confirm Delete?",
          "This cannot be undone. Are you sure you want to delete " + folder2Delete + "?",
          [
            {
              text: "Yes",
              onPress: () => {
                //var newFolders = folders.filter(folder => folder.name !== folder2Delete);
                const i = folders.findIndex(folder => folder.name === folder2Delete);
                dispatch(removeTopfolder(i));
                setIsChanged(!isChanged);
                //https://stackoverflow.com/questions/3954438/how-to-remove-item-from-array-by-value
                // console.log('new folder list:', newFolders);
                // setFolders(newFolders);
              },
            },
            { text: "No", onPress: () => console.log("No Pressed") }
          ]
        );
      }
    };

    return (
        <View style={[styles.topContainer, { backgroundColor: colors.background }]}>
          {isLoading ? (
            <View> 
              <Text> Loading .... </Text>
            </View>
          ): (
            <>
              <View style={styles.darkModeContainer}>
                  <Text style={[styles.textSetting, { color: colors.text }]}>Dark Mode:</Text>
                  <Switch
                      onValueChange={() => { toggleTheme(); }}
                      value={isDarkTheme}
                  />
                  <Text style={{ fontStyle: 'italic', color: colors.text }}>
                      ({isDarkTheme ? 'On' : 'Off'})
                  </Text>
              </View>
              {/* TOP Folder List -- Start */}
              <ScrollView style={styles.saveToContainer}>
                <ListItem.Accordion
                  containerStyle={{backgroundColor: colors.background}}
                  icon={renderAccordionIcon}
                  content={
                    <View style={{flexDirection: 'row'}}>
                      <Text style={[styles.folderTextSetting, { color: colors.text }]}>
                        Save Counts To:
                      </Text>
                      <Text style={[styles.folderTextSettingValue, { color: colors.text }]}>
                        {saveToFolder?.name}
                      </Text>
                      {saveToFolder.subfolder !== '' && saveToFolder.subfolder !== undefined && (
                        <Text style={[styles.folderTextSettingValue, { color: colors.text }]}>
                        { ' | ' + saveToFolder?.subfolder}
                        </Text>
                      )}
                    </View>
                  }
                  isExpanded={true}
                  noIcon={true}
                  // onPress={() => {
                  //   setTopExpanded(!topExpanded);
                  // }}
                >
                {showInput && (
                  <InputAddFolder
                    folders={folders}
                    setFolders={setFolders}
                    setShowInput={setShowInput}
                    createFolderIn={createFolderIn}
                    setCreateFolderIn={setCreateFolderIn}
                    setIsChanged={() => setIsChanged(!isChanged)}
                  />
                )}
                  {folders !== null && folders.map((aFolder, i) => (
                    <SubfolderList
                      aFolderTree={aFolder}
                      onDeleteSubFolder={onDeleteSubFolder}
                      onDeleteTopFolder={onDeleteTopFolder}
                      onSaveToFolder={onSaveToFolder}
                      setShowInput={setShowInput}
                      setCreateFolderIn={setCreateFolderIn}
                      key={i}
                      i={i}
                    />
                  ))}
                  <ListItem
                    containerStyle={{backgroundColor: colors.background}}
                    onPress={() => {
                      setCreateFolderIn('TOP');
                      setShowInput(true);
                    }}
                    bottomDivider>
                    <Icon name='create-new-folder' color={colors.text} size={25}/>
                    <ListItem.Content>
                      <ListItem.Title style={[styles.folderTextSettingValue, { color: colors.text }]}>
                        Create top level folder
                      </ListItem.Title>
                    </ListItem.Content>
                  </ListItem>
                </ListItem.Accordion>
              </ScrollView>
              {/* Top Folder List -- End */}
              <View style={styles.productInfoContainer}>
                  <Text style={[styles.textBody, { color: colors.text }]}>
                      Thank you for using the Custom Counter app! This product was developed by Deep Blue Development LLC.
                  </Text>
                  <Text style={[styles.textBody, { color: colors.text }]}>
                      We welcome your feedback and appreciate you joining the Deep Blue Development community!
                  </Text>
              </View>
              <View style={styles.bottomButtonsContainer}>
                  <Pressable
                      style={({ pressed }) => [
                          {
                              backgroundColor: pressed ? '#5472d3' : '#002171',
                          },
                          styles.button,
                      ]}
                      onPress={() => { Linking.openURL('https://www.enterdeepblue.com/contact.html'); }}
                  >
                      <Text style={styles.textButton}>
                          Product Feedback
                      </Text>
                  </Pressable>
                  <Text> </Text>
                  <Pressable
                      style={({ pressed }) => [
                          {
                              backgroundColor: pressed ? '#5472d3' : '#002171',
                          },
                          styles.button,
                      ]}
                      onPress={() => { Linking.openURL('https://www.enterdeepblue.com/') }}>
                      <Text style={styles.textButton}>
                          Company Web Site
                      </Text>
                  </Pressable>
              </View>
            </>
          )}
        </View>
    );
};

export default CounterSettingsScreen;

