/* eslint-disable prettier/prettier */
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  topContainer: {
    flex: 1,
    flexDirection: 'column',
  },
  darkModeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
    height: 60,
  },
  saveToContainer: {
    borderBottomWidth: 0.25,
  },
  textBody: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    fontSize: 15,
  },
  textSetting: {
    padding: 20,
    fontSize: 15,
    fontWeight: 'bold',
  },
  folderTextSetting: {
    padding: 5,
    fontSize: 15,
    fontWeight: 'bold',
  },
  folderTextSettingValue: {
    fontSize: 15,
    paddingTop: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    borderRadius: 8,
    padding: 10,
    width: '80%',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
  },
  textButton: {
    color: 'white',
    fontSize: 15,
  },
  input: {
    height: 40,
    width: 200,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    backgroundColor: '#fff',
  },
  newFolderInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  folderListContainer: {
    borderWidth: 1,
  },
  productInfoContainer: {
    //borderWidth: 1,
    alignItems: 'center',
  },
  bottomButtonsContainer: {
    height: 150,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    //borderWidth: 1,
  },
});

export default styles;
