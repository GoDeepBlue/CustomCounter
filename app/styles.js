import { Platform, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    topToolbar: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: Platform.OS === 'android' ? 50 : 5, // or whatever value you want
        marginLeft: 10,
        marginRight: 10,
    },
    topToolbarIcons: {
        fontSize: 24,
        color: 'rgba(255, 255, 255, 0.95)',
        textShadowColor: 'rgba(0, 0, 0, 0.2)',
        textShadowOffset: {width: 1, height: 1},
        textShadowRadius: 2,
    },
    iconContainer: {
        width: 44,
        height: 44,
        borderRadius: 22,
        backgroundColor: '#2196F3',
        justifyContent: 'center',
        alignItems: 'center',
        // 3D elevation and shadows
        ...Platform.select({
            ios: {
                shadowColor: '#000',
                shadowOffset: {
                    width: 0,
                    height: 4,
                },
                shadowOpacity: 0.3,
                shadowRadius: 5,
            },
            android: {
                elevation: 8,
            },
        }),
        // Inner glow effect
        borderWidth: 1,
        borderColor: 'rgba(255, 255, 255, 0.3)',
        borderTopColor: 'rgba(255, 255, 255, 0.5)',
        borderLeftColor: 'rgba(255, 255, 255, 0.4)',
    },
    iconContainerPressed: {
        backgroundColor: '#1976D2',
        ...Platform.select({
            ios: {
                shadowOffset: {
                    width: 0,
                    height: 2,
                },
                shadowOpacity: 0.2,
                shadowRadius: 3,
            },
            android: {
                elevation: 4,
            },
        }),
        borderTopColor: 'rgba(255, 255, 255, 0.2)',
        borderLeftColor: 'rgba(255, 255, 255, 0.2)',
    },
    countPadNumber: {
        marginTop: 80,
        fontSize: 48,
        alignSelf: 'center',
        fontWeight: '900',
        color: '#333',
        textShadowColor: 'rgba(0, 0, 0, 0.1)',
        textShadowOffset: {width: 1, height: 1},
        textShadowRadius: 2,
    },
    countPadButton: {
        alignSelf: 'center',
        borderRadius: 40,
        // 3D elevation and shadows
        ...Platform.select({
            ios: {
                shadowColor: '#000',
                shadowOffset: {
                    width: 0,
                    height: 12,
                },
                shadowOpacity: 0.4,
                shadowRadius: 16,
            },
            android: {
                elevation: 20,
            },
        }),
        // Inner glow effect
        borderWidth: 2,
        borderColor: 'rgba(255, 255, 255, 0.3)',
        borderTopColor: 'rgba(255, 255, 255, 0.5)',
        borderLeftColor: 'rgba(255, 255, 255, 0.4)',
        // Gradient-like effect with overlapping shadows
        overflow: 'visible',
    },
    countPadButtonInner: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        borderRadius: 40,
        backgroundColor: 'transparent',
        // Glossy overlay effect
        borderWidth: 1,
        borderColor: 'rgba(255, 255, 255, 0.1)',
        borderTopWidth: 2,
        borderTopColor: 'rgba(255, 255, 255, 0.3)',
    },
    countPadButtonPressed: {
        ...Platform.select({
            ios: {
                shadowOffset: {
                    width: 0,
                    height: 6,
                },
                shadowOpacity: 0.3,
                shadowRadius: 8,
            },
            android: {
                elevation: 10,
            },
        }),
        borderTopColor: 'rgba(255, 255, 255, 0.2)',
        borderLeftColor: 'rgba(255, 255, 255, 0.2)',
    },
});

export default styles;
