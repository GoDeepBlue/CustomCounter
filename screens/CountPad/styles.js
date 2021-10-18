/* eslint-disable prettier/prettier */
import { Dimensions, StyleSheet } from 'react-native';


const styles = StyleSheet.create({
    topToolbar: {

        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 10,
        marginLeft: 10,
        marginRight: 10,

    },
    topToolbarIcons: {
        fontSize: 30,
        color: '#1565c0',
    },
    topToolbarCircle: {
        borderRadius: 25,
        top: 3,
        alignItems: 'center',
        backgroundColor: '#1565c0',
        justifyContent: 'center',
        width: 25,
        height: 25,
    },
    countPadNumber: {
        marginTop: 100,
        fontSize: 30,
        alignSelf: 'center',
        fontWeight: 'bold',
        color: 'grey',
    },
    countPadButton: {
        marginTop: 60,
        alignSelf: 'center',
        //height: (Platform.OS === 'ios') ? Dimensions.get('screen').height - 300 : Dimensions.get('screen').height - 325,
        //width: Dimensions.get('screen').width - 20,     // Sets width slightly smaller then full
        borderRadius: 30,
        backgroundColor: '#1565c0',
    },
});

export default styles;
