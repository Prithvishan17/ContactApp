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

const NineScreen = ({ navigation }) => {

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView>


                {/** Image Container **/}
                <View style={styles.imageContainer}>
                    <Image source={home} style={styles.image} />
                </View>

                {/** Description Container **/}
                <View style={styles.descriptionContainer}>
                    <Text style={styles.text}>Congratulations !! You have reached The Home 🏡 Click the button below to play again</Text>
                </View>

                {/** Button Container **/}
                <TouchableOpacity
                    activeOpacity={0.4}
                    onPress={() => {
                        // Log an analytics event before navigating
                        analytics().logEvent('Nine_First', { buttonName: '9_Home' });

                        // Navigate to the Home/First screen
                        navigation.popToTop()
                    }}
                    style={styles.buttonsContainer}>

                    <Image style={styles.btnImage} source={homeIcon} />
                    <Text style={styles.textPlay}>Play again !</Text>

                </TouchableOpacity>


            </ScrollView>
        </SafeAreaView >
    );

};

export default NineScreen;

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        borderColor: '#DCDCDC',
        backgroundColor: '#77DD77'
    },
    imageContainer: {
        padding: 150,
        justifyContent: 'center',
        alignItems: 'center',
    },
    titleContainer: {
        padding: 50,
        justifyContent: 'center',
        alignItems: 'center',
    },
    descriptionContainer: {
        padding: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonsContainer: {
        margin: 40,
        alignItems: 'center'
    },
    text: {
        fontFamily: 'Source Sans 3 Regular',
        fontSize: 20,
        color: 'black',
        alignSelf: 'center',
        flexDirection: 'row',
    },
    textPlay: {
        fontFamily: 'Source Sans 3 Regular',
        fontSize: 18,
        fontWeight: 'bold',
        color: '#DCDCDC',
        //alignSelf: 'center',
        //flexDirection: 'row',
    },
    image: {
        width: 128,
        height: 128,
        alignSelf: 'center',
    },
    btnImage: {
        width: 50,
        height: 50,
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