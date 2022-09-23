import React, {useState} from 'react';

import {View, Text, TextInput} from 'react-native';
import {ListItem, Button, Icon} from '@rneui/themed';

import styles from './styles';
import SubfolderList from './SubfolderList';

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

  const AddFolder = () => {
    // console.log('=================================');
    // console.log('Folders BEFORE:', folders);
    const temp = [...folders];
    if (createFolderIn === '' || createFolderIn === 'TOP') {
      //create new top level folder
      temp.push({name: newFolderName});
      //setFolders(current => [...current, {name: newFolderName}]);
    } else {
      //create new sub level folder
      // console.log('NEW SUB FOLDER in', createFolderIn);
      // console.log('NEW FOLDER:', newFolderName);
      let index = 0;
      folders.forEach(element => {
        //console.log('element.name', element.name);
        if (element.name === createFolderIn) {
          //console.log('They are the same');
          //console.log('HERE', folders[index].name);
          temp[index].subfolders.push({name: newFolderName});
          //console.log('NEW TEMP', temp[index]);
        }
        index++;
      });
    }
    // console.log('folders AFTER:', folders);
    // console.log('=================================');
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
