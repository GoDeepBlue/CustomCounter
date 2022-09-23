/* eslint-disable prettier/prettier */
import React, { useState, useEffect } from 'react';

import { View, Pressable, Text, Switch, Linking, TextInput, ScrollView, Alert } from 'react-native';

import { useTheme } from '@react-navigation/native';
import { ListItem, Button, Icon } from '@rneui/themed';
import { EventRegister } from 'react-native-event-listeners';

import * as AsyncStorageFunctions from '../../components/AsyncStorageFunctions';

import styles from './styles';
import SubfolderList from './SubfolderList';
import InputAddFolder from './InputAddFolder';

const CounterSettingsScreen = ({route}) => {
  //Function is the settings screen for the app settings
  //
  // Setting Name & Variable Name which holds the setting
  //  Dark Mode: isDarkTheme
  //  Save Counts Folder: folders
    // const saveToFolder = route.params?.saveToFolder;
    //console.log('file: index.js ~ line 23 ~ CounterSettingsScreen ~ route.params', route.params);
    
    const [saveToFolder, setSaveToFolder] = useState('Default');
    const [isDarkTheme, setIsDarkTheme] = useState(false);
    const appTheme = useTheme();
    let colors = appTheme.colors;

    const initialState = [{
        name: 'Folder-0',
        countData: [
          {"count": 0, "countDate": "Thu, Sep 15, 2022 at 02:23:08 PM", "key": 1663276990053},
          {"count": 5, "countDate": "Fri, Sep 16, 2022 at 12:07:24 PM", "key": 1663355246281},
          {"count": 0, "countDate": "Fri, Sep 16, 2022 at 05:33:55 PM", "key": 1663374837974},
          {"count": 0, "countDate": "Fri, Sep 16, 2022 at 05:34:11 PM", "key": 1663374853235},
          {"count": 0, "countDate": "Wed, Sep 21, 2022 at 01:28:46 PM", "key": 1663792128171},
        ],
        subfolders: [
          {
            name: 'subfolder-0a',
            countData: [
              {"count": 0, "countDate": "Thu, Sep 15, 2022 at 02:23:08 PM", "key": 1663276990053},
              {"count": 5, "countDate": "Fri, Sep 16, 2022 at 12:07:24 PM", "key": 1663355246281},
              {"count": 0, "countDate": "Fri, Sep 16, 2022 at 05:33:55 PM", "key": 1663374837974},
              {"count": 0, "countDate": "Fri, Sep 16, 2022 at 05:34:11 PM", "key": 1663374853235},
              {"count": 0, "countDate": "Wed, Sep 21, 2022 at 01:28:46 PM", "key": 1663792128171}
            ],
          },
          {
            name: 'subfolder-0b',
            countData: [
              {"count": 0, "countDate": "Thu, Sep 15, 2022 at 02:23:08 PM", "key": 1663276990053},
              {"count": 5, "countDate": "Fri, Sep 16, 2022 at 12:07:24 PM", "key": 1663355246281},
              {"count": 0, "countDate": "Fri, Sep 16, 2022 at 05:33:55 PM", "key": 1663374837974},
              {"count": 0, "countDate": "Fri, Sep 16, 2022 at 05:34:11 PM", "key": 1663374853235},
              {"count": 0, "countDate": "Wed, Sep 21, 2022 at 01:28:46 PM", "key": 1663792128171},
            ],
          },
        ],
      },
      {
        name: 'Folder-1',
      },
      {
        name: 'Folder-2',
        subfolders: [
          {
            name: 'subfolder-2a',
          },
          {
            name: 'subfolder-2b',
          },
          {
            name: 'subfolder-2c',
          },
        ],
      },
    ];

    const [folders, setFolders] = useState(initialState);
    //Used for storing the folder structure and folders count data
    const [createFolderIn, setCreateFolderIn] = useState('');
    //Used to store name of folder to create new folder within or TOP for Top level
    const [topExpanded, setTopExpanded] = useState(false);
    //Used as a flag for expanding or contracting TopLevel folder
    const [showInput, setShowInput] = useState(false);
    //Used as flag for InputAddFolder name Functional Component
    const [topFolderSelected, setTopFolderSelected] = useState('Default');
    //Used to set the Top Level folder to display in "Save Counts To:"
    const [subFolderSelected, setSubFolderSelected] = useState('');
    //Used to set the Sub Level folder to display in "Save Counts To:"

    useEffect(() => { 
      whatIsAppTheme();
      getStoredSaveToFolder();
    }, []);

    function whatIsAppTheme() {
        // console.log('whatIsAppTheme: ' + appTheme.dark);
        // console.log(appTheme);
        if (appTheme.dark === true) {
            setIsDarkTheme(true);
        } else {
            setIsDarkTheme(false);
        }
    }

    const toggleTheme = () => {
        setIsDarkTheme(!isDarkTheme);
        EventRegister.emit('changeThemeEvent', !isDarkTheme);
        AsyncStorageFunctions.storeSettings(!isDarkTheme);
    };

    const getStoredSaveToFolder = async () => {
      const saveFolder = await AsyncStorageFunctions.getSaveToFolder();
      if (saveFolder !== null) {
        setSaveToFolder(saveFolder);
        setTopFolderSelected(saveFolder?.name);
        setSubFolderSelected(saveFolder?.subfolder);
        console.log('file: App.js ~ line 37 ~ getData ~ saveFolder', saveFolder);
      }
    };

    const changeSaveToFolder = (newFolder) => {
      setSaveToFolder(newFolder);
      setTopFolderSelected(newFolder?.name);
      setSubFolderSelected(newFolder?.subfolder);
      console.log('file: App.js ~ line 37 ~ getData ~ saveFolder', newFolder);
      EventRegister.emit('changeFolderEvent', newFolder);
      AsyncStorageFunctions.setSaveToFolder(newFolder);
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
              console.log("Yes Pressed");
              changeSaveToFolder(newSaveToFolder);
            },
          },
          { text: "No", onPress: () => console.log("No Pressed") }
        ]
      );
      console.log('CounterSettings ~ onSaveToFolder ~ saveToFolder', newSaveToFolder);
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
                var newSubFolders = aFolderTree.subfolders.filter(folder => folder.name !== folder2Delete);
                //https://stackoverflow.com/questions/3954438/how-to-remove-item-from-array-by-value
                //console.log('newSubFolders:', newSubFolders );
                let newFolders = folders.map( parentFolders => (
                  parentFolders === aFolderTree ? {...parentFolders, subfolders: newSubFolders} : parentFolders
                ));
                //https://www.codegrepper.com/code-examples/javascript/react+native+update+state+object
                //console.log('new folder list:', newFolders);
                setFolders(newFolders);
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
                var newFolders = folders.filter(folder => folder.name !== folder2Delete);
                //https://stackoverflow.com/questions/3954438/how-to-remove-item-from-array-by-value
  
                console.log('new folder list:', newFolders);
                setFolders(newFolders);
              },
            },
            { text: "No", onPress: () => console.log("No Pressed") }
          ]
        );
      }
    };

    return (
        <View style={[styles.topContainer, { backgroundColor: colors.background }]}>
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
                      Counts Folder:
                    </Text>
                    <Text style={[styles.folderTextSetting, { color: colors.text }]}>
                      {topFolderSelected}
                    </Text>
                    {subFolderSelected !== '' && (
                      <Text style={[styles.folderTextSetting, { color: colors.text }]}>
                      |  {subFolderSelected}
                      </Text>
                    )}
                  </View>
                }
                isExpanded={topExpanded}
                onPress={() => {
                  setTopExpanded(!topExpanded);
                }}
              >
              {showInput && (
                <InputAddFolder
                  folders={folders}
                  setFolders={setFolders}
                  setShowInput={setShowInput}
                  createFolderIn={createFolderIn}
                  setCreateFolderIn={setCreateFolderIn}
                />
              )}
                {folders.map((aFolder, i) => (
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
                    <ListItem.Title style={[styles.textSetting, { color: colors.text }]}>
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
        </View>
    );
};

export default CounterSettingsScreen;


