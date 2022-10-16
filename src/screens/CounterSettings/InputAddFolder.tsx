import React, {useState} from 'react';

import {View, Text, TextInput} from 'react-native';
import {ListItem, Button, Icon} from '@rneui/themed';

import styles from './styles';
import { Topfolder, Subfolder } from '../../redux/counterSlice';
import {useAppDispatch, useAppSelector} from '../../redux/hooks';
import {addTopfolder, addSubfolder} from '../../redux/counterSlice';
const InputAddFolder = ({folders, setFolders, setShowInput, createFolderIn, setCreateFolderIn, setIsChanged}) => {
  //Functional Component is used for creating a folder
  // INPUTS:
  //  folders = folder object in current counter session
  //  setFolders = setter function of parent state
  //  setShowInput = setting function which enables || hides InputAddFolder component
  //  createFolderIn = TOP || Name of Folder to create New Folder within
  //  setCreateFolderIn = setter method of variable where new folder should be created
  // -------------------------------
  const [newFolderName, setNewFolderName] = useState('');

  const dispatch = useAppDispatch();

  const AddFolder = () => {
    console.log('=================================');
    console.log('Folders BEFORE:', folders);
    if (createFolderIn === '' || createFolderIn === 'TOP') {
      //create new top level folder
      console.log('file: InputAddFolder.tsx ~ line 34 ~ AddFolder ~ newTopFolder', newFolderName);
      dispatch(addTopfolder(newFolderName));
      setIsChanged(true);
    } else {
      //create new sub level folder
      // console.log('NEW SUB FOLDER in', createFolderIn);
      // console.log('NEW FOLDER:', newFolderName);
      const temp = [...folders];
      let index = temp.findIndex(folder => folder.name === createFolderIn);
      console.log('file: InputAddFolder.js ~ line 35 ~ AddFolder ~ index', index);
      const subAdd = {
        index: index,
        name: newFolderName,
      };
      dispatch(addSubfolder(subAdd));
      setIsChanged(true);
    }
    console.log('=================================');
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
