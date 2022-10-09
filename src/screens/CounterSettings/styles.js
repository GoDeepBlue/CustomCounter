/* eslint-disable prettier/prettier */
import { StyleSheet } from 'react-native';


const styles = StyleSheet.create({
    viewBody: {
        alignItems: 'stretch',
        width: '100%',
        height: '100%',
    },
    viewSettings: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 10,
    },
    viewText: {
        flex: 2,
        marginTop: 10,
    },
    viewButtons: {
        flex: 3,
        flexDirection: 'column',
        alignItems: 'center',
        marginTop: 10,
    },
    textBody: {
        padding: 20,
        fontSize: 15,
    },
    textSetting: {
        padding: 20,
        fontSize: 15,
        fontWeight: 'bold',
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

});

export default styles;
