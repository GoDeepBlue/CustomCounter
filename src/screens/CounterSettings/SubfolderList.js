import React, {useState} from 'react';

import {View, Text, StyleSheet, Alert} from 'react-native';

import {ListItem, Button, Icon} from '@rneui/themed';
import {useTheme} from '@react-navigation/native';
import styles from './styles';

// eslint-disable-next-line prettier/prettier
const SubfolderList = ({aFolderTree, i, onDeleteSubFolder, onDeleteTopFolder, onSaveToFolder, setShowInput, setCreateFolderIn}) => {
  //Function lists all Subfolders within a Folder Tree
  //INPUT:
  //  aFolderTree = Top level folder tree object
  // i = index passed down from calling code
  // onDeleteSubFolder = onDeleteSubFolder event
  // onDeleteTopFolder = onDeleteTopFolder event
  // onSaveToFolder = onSaveToFolder event
  // setShowInput = setter method to display TextInput for creating new Folder
  // setCreateFolderIn = setter method to hold state variable of which folder to create new folder in
  // ---------------------------------------
  
  const [subExpanded, setSubExpanded] = useState(false);
  const appTheme = useTheme();
  let colors = appTheme.colors;

  const renderAccordionIcon = () => (
    <Icon name="arrow-drop-up" color={colors.text} size={30} />
  );

  const renderFolder = (aSubFolder, j) => {
    return (
      <ListItem.Swipeable
        key={j}
        bottomDivider
        containerStyle={{backgroundColor: colors.background}}
        rightContent={reset => (
          <Button
            title="Delete"
            onPress={() => {
              onDeleteSubFolder(aFolderTree, aSubFolder);
              reset();
            }}
            icon={{name: 'delete', color: 'white'}}
            buttonStyle={{minHeight: '100%', backgroundColor: 'red'}}
          />
        )}>
        <Icon name="folder" style={{paddingLeft: 20}} color={'#ffd600'} />
        <ListItem.Content>
          <ListItem.Title
            onPress={() => {
              const newFolder = {
                name: aFolderTree.name,
                subfolder: aSubFolder,
              };
              onSaveToFolder(newFolder);
            }}
            style={[styles.folderTextSettingValue, {color: colors.text}]}>
            {aSubFolder}
          </ListItem.Title>
        </ListItem.Content>
      </ListItem.Swipeable>
    );
  };

  return (
    <ListItem.Accordion
      key={i}
      icon={renderAccordionIcon}
      containerStyle={{backgroundColor: colors.background}}
      content={
        <>
          <Icon name="folder" color={'#ffd600'} />
          <Text style={{color: colors.text}}>
            {/* aFolderTree is the top-level folder name */}
            {' ' + aFolderTree.name}
          </Text>
        </>
      }
      isExpanded={subExpanded}
      onPress={() => {
        setSubExpanded(!subExpanded);
      }}>
      {'subfolders' in aFolderTree &&
        aFolderTree.subfolders.map((folder, index) =>
          renderFolder(folder.name, index),
        )}
      <ListItem
        bottomDivider
        containerStyle={{backgroundColor: colors.background}}
        onPress={() => {
          console.log(' --- Calling ShowInput with:', aFolderTree.name);
          setCreateFolderIn(aFolderTree.name);
          setShowInput(true);
        }}>
        <Icon
          name="create-new-folder"
          color={colors.text}
          style={{paddingLeft: 20}}
          size={25}
        />
        <ListItem.Content>
          <ListItem.Title
          style={[styles.folderTextSettingValue, {color: colors.text}]}>
            Create new subfolder
          </ListItem.Title>
        </ListItem.Content>
      </ListItem>
      <ListItem
        bottomDivider
        onPress={() => {
          const newFolder = {
            name: aFolderTree.name,
            subfolder: '',
          };
          onSaveToFolder(newFolder);
        }}
        containerStyle={{backgroundColor: colors.background}}>
        <Icon
          name="folder-special"
          color={colors.text}
          style={{paddingLeft: 20}}
          size={25}
        />
        <ListItem.Content>
          <ListItem.Title
            style={[styles.folderTextSettingValue, {color: colors.text}]}>
            Save to {aFolderTree.name} folder
          </ListItem.Title>
        </ListItem.Content>
      </ListItem>
      <ListItem
        bottomDivider
        containerStyle={{backgroundColor: colors.background}}
        onPress={() => onDeleteTopFolder(aFolderTree.name)}>
        <Icon
          name="delete"
          color={colors.text}
          style={{paddingLeft: 20}}
          size={25}
        />
        <ListItem.Content>
          <ListItem.Title
            style={[styles.folderTextSettingValue, {color: colors.text}]}>
            Delete {aFolderTree.name}
          </ListItem.Title>
        </ListItem.Content>
      </ListItem>
    </ListItem.Accordion>
  );
};
export default SubfolderList;
