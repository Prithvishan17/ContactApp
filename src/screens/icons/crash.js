import React, { useState, useEffect, useRef } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    FlatList,
    SectionList,
    Dimensions,
    Image,
    ImageBackground,
    RefreshControl,
    ActivityIndicator,
    Button
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import firestore from '@react-native-firebase/firestore';
import crashlytics from '@react-native-firebase/crashlytics';
 import analytics from '@react-native-firebase/analytics';

const HomeScreen = () => {

    // Log a non-fatal error
    crashlytics().recordError(new Error('This is a non-fatal error. Made by Sauk'));


    const handleCrashButtonPress = () => {
        // Intentionally causing a JavaScript crash
        throw new Error('Intentional crash for testing purposes');
    };


    // //Google Analytics
    const recordClick = () => {
        analytics().logEvent('sauk_nineteen_dec', {
            buttonLabel: '7707',
            buttonId: '0707'
        });

    }
    return (
        <SafeAreaView style={styles.container}>

            <View style={styles.titleContainer}>


                <TouchableOpacity onPress={handleCrashButtonPress} style={{ backgroundColor: '#B2FBA5', borderRadius: 100, padding: 10 }}>
                    <Text style={styles.text}>Crash</Text>
                </TouchableOpacity>

                <Text style={styles.text1}>elapsedTime : </Text>

                <TouchableOpacity onPress={recordClick} style={{ backgroundColor: '#DB5856', borderRadius: 100, padding: 10 }}>
                    <Text style={styles.text}>Upload</Text>
                </TouchableOpacity>


            </View>

        </SafeAreaView>
    )
}

export default HomeScreen;

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        borderColor: '#DCDCDC',
        backgroundColor: 'grey'
    },
    imageContainer: {
        padding: 50,
        justifyContent: 'center',
        alignItems: 'center',
    },
    titleContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        //paddingHorizontal: windowWidth * 0.1,
        paddingVertical: windowHeight * 0.4,

    },
    descriptionContainer: {
        padding: 50,
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-evenly'
    },
    text: {
        fontFamily: 'Source Sans 3 Regular',
        fontSize: 20,
        color: 'black',
        alignSelf: 'center',
        flexDirection: 'row',
    },
    text1: {
        fontFamily: 'Source Sans 3 Regular',
        fontSize: 20,
        color: 'black',
        alignSelf: 'center',
        flexDirection: 'row',
        backgroundColor: '#8ACDD7',
        borderRadius: 20,
        padding: 10
    },
    image: {
        width: 128,
        height: 128,
        alignSelf: 'center',
    },
    btnImage: {
        width: 100,
        height: 100,
        borderRadius: 50,
        borderWidth: 10,
        borderColor: '#F9F9E0',
    },
    cartButtonRight: {
        alignItems: 'center',
        justifyContent: 'center',
        width: '13%',
        height: '8%',
        position: 'absolute',
        top: windowHeight * 0.7,
        right: windowWidth * 0.1,
        backgroundColor: '#ADD8E6',
        borderRadius: 100,
        borderWidth: 1,
    },
    cartButtonLeft: {
        alignItems: 'center',
        justifyContent: 'center',
        width: '13%',
        height: '8%',
        position: 'absolute',
        top: windowHeight * 0.7,
        left: windowWidth * 0.1,
        backgroundColor: '#ADD8E6',
        borderRadius: 100,
        borderWidth: 1,
    },
    cartImage: {
        width: 30,
        height: 30,
        alignSelf: 'center',
    },
    timeIntervalsContainer: {
        padding: 20,
        alignItems: 'center',
    },
});