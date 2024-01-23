/** main **/
import React, { useState, useEffect, useRef } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Dimensions,
    Image,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ScrollView } from 'react-native-gesture-handler';

//Firestore
import firestore from '@react-native-firebase/firestore';
import crashlytics from '@react-native-firebase/crashlytics';
import analytics from '@react-native-firebase/analytics';

//Images
import zero from '../screens/icons/0.png'
import one from '../screens/icons/1.png'
import two from '../screens/icons/2.png'
import three from '../screens/icons/3.png'
import four from '../screens/icons/4.png'
import five from '../screens/icons/5.png'
import six from '../screens/icons/6.png'
import seven from '../screens/icons/7.png'
import eight from '../screens/icons/8.png'
import nine from '../screens/icons/9.png'
import ten from '../screens/icons/10.png'
import eleven from '../screens/icons/11.png'
import twelve from '../screens/icons/12.png'
import thirteen from '../screens/icons/13.png'
import fourteen from '../screens/icons/14.png'
import fifteen from '../screens/icons/15.png'
import sixteen from '../screens/icons/16.png'
import home from '../screens/icons/home.png'
import ghost from '../screens/icons/ghost.png'
import hantu from '../screens/icons/hantu.png'

const SixthScreen = ({ navigation }) => {

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView>


                {/** Image Container **/}
                <View style={styles.imageContainer}>
                    <Image source={six} style={styles.image} />
                </View>

                {/** Title Container **/}
                <View style={styles.titleContainer}>
                    <Text style={styles.text}>Welcome to Screen 6</Text>

                </View>

                {/** Description Container **/}
                <View style={styles.descriptionContainer}>
                    <Text style={styles.text}>Press any one of the buttons below to navigate to the respective screens</Text>

                </View>

                {/** Button Container **/}
                <View style={styles.buttonsContainer}>
                    <TouchableOpacity activeOpacity={0.4}
                        onPress={() => {
                            // Log an analytics event before navigating
                            analytics().logEvent('Sixth_Eleven', { buttonName: 'Eleven' });

                            // Navigate to the Eleven screen
                            navigation.navigate('Eleven')
                        }}
                    >
                        <Image source={eleven} style={styles.btnImage} />
                    </TouchableOpacity>

                    <TouchableOpacity activeOpacity={0.4}
                        onPress={() => {
                            // Log an analytics event before navigating
                            analytics().logEvent('Sixth_Twelve', { buttonName: 'Twelve' });

                            // Navigate to the Twelve screen
                            navigation.navigate('Twelve')
                        }}
                    >
                        <Image source={twelve} style={styles.btnImage} />
                    </TouchableOpacity>

                    <TouchableOpacity activeOpacity={0.4}
                        onPress={() => {
                            // Log an analytics event before navigating
                            analytics().logEvent('Sixth_Thirteen', { buttonName: 'Thirteen' });

                            // Navigate to the Thirteen screen
                            navigation.navigate('Thirteen')
                        }}
                    >
                        <Image source={thirteen} style={styles.btnImage} />
                    </TouchableOpacity>
                </View>


            </ScrollView>
        </SafeAreaView >
    );

};

export default SixthScreen;

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        borderColor: '#DCDCDC',
    },
    imageContainer: {
        padding: 50,
        justifyContent: 'center',
        alignItems: 'center',
    },
    titleContainer: {
        padding: 50,
        justifyContent: 'center',
        alignItems: 'center',
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
        borderColor: '#DCDCDC',
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
});