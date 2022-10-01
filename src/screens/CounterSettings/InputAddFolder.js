import React, {useState} from 'react';

import {View, Text, TextInput} from 'react-native';
import {ListItem, Button, Icon} from '@rneui/themed';

import styles from './styles';

const InputAddFolder = ({folders, setFolders, setShowInput, createFolderIn, setCreateFolderIn}) => {
  //Functional Component is used for creating a folder
  // INPUTS:
  //  folders = folder object in current counter session
  //  setFolders = setter function of parent state
  //  setShowInput = setting function which enables || hides InputAddFolder component
  //  createFolderIn = TOP || Name of Folder to create New Folder within
  //  setCreateFolderIn = setter method of variable where new folder should be created
  // -------------------------------
  const [newFolderName, setNewFolderName] = useState(null);

  //console.log(' ~~ InputAddFolder ~~ folders:', folders);

  const AddFolder = () => {
    console.log('=================================');
    console.log('Folders BEFORE:', folders);
    const temp = [...folders];
    if (createFolderIn === '' || createFolderIn === 'TOP') {
      //create new top level folder
      const newTopFolder = {
        name: newFolderName,
        countData: [],
        subfolders: [],
      };
      temp.push(newTopFolder);
      //setFolders(current => [...current, {name: newFolderName}]);
    } else {
      //create new sub level folder
      // console.log('NEW SUB FOLDER in', createFolderIn);
      // console.log('NEW FOLDER:', newFolderName);
      let index = temp.findIndex(folder => folder.name === createFolderIn);
      console.log('file: InputAddFolder.js ~ line 35 ~ AddFolder ~ index', index);

      const newSubFolder = {
        name: newFolderName,
        countData: [],
      };
      temp[index].subfolders.push(newSubFolder);
    }
    console.log('folders AFTER:', temp);
    console.log('=================================');
    setFolders(temp);
    setShowInput(false);
  };

  return (
    <View style={styles.newFolderInputContainer}>
      <TextInput
        style={styles.input}
        onChangeText={text => setNewFolderName(text)}
        value={newFolderName}
      />
      <Button onPress={AddFolder}>Add</Button>
      <Text> </Text>
      <Button
        onPress={() => {
          setShowInput(false);
        }}>
        Cancel
      </Button>
    </View>
  );
};

export default InputAddFolder;
