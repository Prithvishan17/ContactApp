/**I have a react native application and I want to use redux toolkit with redux persist to manage the state of the application. I want to store a TextInput field into my redux store. I also want that data to be available after the application is restarted */


/**************************  STORING DATA INTO REDUX  **************************/
// import React, { useState, useEffect, useRef } from 'react';
// import {
//     View,
//     Text,
//     StyleSheet,
//     TouchableOpacity,
//     Dimensions,
//     Image,
//     ImageBackground,
//     BackHandler,
//     Button
// } from 'react-native';
// import { SafeAreaView } from 'react-native-safe-area-context';
// import { FlatList, ScrollView } from 'react-native-gesture-handler';
// import { useNavigation } from '@react-navigation/native';

// //Firestore
// import firestore from '@react-native-firebase/firestore';
// import crashlytics from '@react-native-firebase/crashlytics';
// import analytics from '@react-native-firebase/analytics';

// //Redux
// import { useSelector, useDispatch } from 'react-redux';
// import { increment, decrement } from '../features/counterSlice';

// //Images
// import one from '../screens/icons/1.png'
// import two from '../screens/icons/2.png'
// import three from '../screens/icons/3.png'
// import four from '../screens/icons/4.png'


// const MainScreen = ({ navigation }) => {

//     const [elapsedTime, setElapsedTime] = useState(0); // State variable for elapsed time
//     const [timeIntervals, setTimeIntervals] = useState([]); // State variable for timer interval
//     const [isTrackingTime, setIsTrackingTime] = useState(false); // State for tracking time status
//     const timerIntervalRef = useRef(null); //Use a ref to store the interval ID

//     const startTimer = () => {
//         if (timerIntervalRef.current) {
//             clearInterval(timerIntervalRef.current); //Clear previous interval if running
//         }

//         let startTime = Date.now(); //Start time reference
//         const interval = setInterval(() => {
//             const currentTime = Date.now();
//             const elapsedSeconds = Math.floor((currentTime - startTime) / 1000); //Elapsed time in seconds
//             setElapsedTime(elapsedSeconds); //Update elapsed time state

//         }, 1000); //Interval of 1 second

//         timerIntervalRef.current = interval; // Store interval refrence in the ref
//         setIsTrackingTime(true); // Set tracking status to true

//     };

//     const stopTimer = () => {
//         if (timerIntervalRef.current) {
//             clearInterval(timerIntervalRef.current); //Clear the interval
//             timerIntervalRef.current = null; //Reset interval state in the ref
//         }

//         //Send google analytics event with time spent
//         if (isTrackingTime) {
//             // Only update time intervals if the timer was running
//             setTimeIntervals((prevIntervals) => [...prevIntervals, elapsedTime ]);

//             analytics().logEvent('time_spent_first_screen', {
//                 screenName: 'Saukeh',
//                 timeSpent: elapsedTime ,
//             });

//             setIsTrackingTime(false); //Reset tracking status
//         }
//     }



//     useEffect(() => {
//         //Start timer when component mounts
//         startTimer();
//         console.log("Component has mounted");

//         //Stop timer and send Google Analytics when component unmounts
//         //This function does not work, because when component unmounts the app is either reloading/paused/stopped.
//         //Stop the timer when screen is navigated or by using unSubscribeFocus / unSubscribeBlur
//         return () => {
//             stopTimer();
//             console.log("Component has UNMOUNTED");
//         };
//     }, []);

//     useEffect(() => {
//         // Additional effect to stop the timer when the component is focused
//         const unsubscribeFocus = navigation.addListener('focus', () => {
//             startTimer();
//         });

//         // Cleanup function for the focus event listener
//         return () => {
//             unsubscribeFocus();
//         };
//     }, [navigation]);

//     // useEffect(() => {
//     //     // Additional effect to stop the timer when the component is blurred
//     //     const unsubscribeBlur = navigation.addListener('blur', () => {
//     //         stopTimer();
//     //     });

//     //     // Cleanup function for the blur event listener
//     //     return () => {
//     //         unsubscribeBlur();
//     //     };
//     // }, [navigation]);

//     const changeScreen2 = () => {
//         //Log navigation event before navigating
//         analytics().logEvent('First_Second', { buttonName: 'Second' });

//         //Navigate to second screen
//         navigation.navigate('Second')
//         stopTimer(); //best way to stop time and record it no cap
//     }

//     const changeScreen3 = () => {
//         //Log navigation event before navigating
//         analytics().logEvent('First_Third', { buttonName: 'Third' });

//         //Navigate to third screen
//         navigation.navigate('Third')
//         stopTimer(); //best way to stop time and record it no cap
//     }

//     const changeScreen4 = () => {
//         // Log an analytics event before navigating
//         analytics().logEvent('First_Fourth', { buttonName: 'Fourth' });

//         // Navigate to the Fourth screen
//         navigation.navigate('Fourth');
//         stopTimer(); //best way to stop time and record it no cap
//     }

//     const dispatch = useDispatch();
//     const counter = useSelector(state => state.counter.value);

//     return (

//         <SafeAreaView style={styles.container}>
//             <Text style={styles.text}>{counter}</Text>
//             <Button onPress={() => dispatch(increment())} title="Increment" />
//             <Button onPress={() => dispatch(decrement())} title="Decrement" />
//         </SafeAreaView>

//         // <View style={styles.container}>

//         // <ScrollView>
//         //     {/** Image Container **/}
//         //     <View style={styles.imageContainer}>
//         //         <Image source={one} style={styles.image} />
//         //     </View>

//         //     {/** Title Container **/}
//         //     <View style={styles.titleContainer}>
//         //         <Text style={styles.text}>Welcome to Screen 1</Text>
//         //     </View>

//         //     {/** Timer View + Function **/}
//         //     <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 40, paddingVertical: 20, }}>
//         //         <TouchableOpacity onPress={startTimer} style={{ backgroundColor: 'seagreen', borderRadius: 100, padding: 10 }}>
//         //             <Text style={styles.text}>Start</Text>
//         //         </TouchableOpacity>

//         //         <Text style={styles.text1}>elapsedTime : {elapsedTime}</Text>

//         //         <TouchableOpacity onPress={stopTimer} style={{ backgroundColor: 'crimson', borderRadius: 100, padding: 10 }}>
//         //             <Text style={styles.text}>Stop</Text>
//         //         </TouchableOpacity>
//         //     </View>

//         //     {/** Description Container **/}
//         //     <View style={styles.descriptionContainer}>
//         //         <Text style={styles.text}>Press any one of the buttons below to navigate to the respective screens</Text>

//         //     </View>

//         //     {/** Button Container **/}
//         //     <View style={styles.buttonsContainer}>

//         //         <TouchableOpacity
//         //             activeOpacity={0.4}
//         //             onPress={changeScreen2}>
//         //             <Image source={two} style={styles.btnImage} />
//         //         </TouchableOpacity>

//         //         <TouchableOpacity
//         //             activeOpacity={0.4}
//         //             onPress={changeScreen3}>
//         //             <Image source={three} style={styles.btnImage} />
//         //         </TouchableOpacity>

//         //         <TouchableOpacity
//         //             activeOpacity={0.4}
//         //             onPress={changeScreen4}>
//         //             <Image source={four} style={styles.btnImage} />
//         //         </TouchableOpacity>

//         //     </View>






//         // </ScrollView>

//         //     <View style={styles.timeIntervalsContainer}>
//         //         <Text style={styles.text}>Time Intervals:</Text>
//         //         <FlatList
//         //             data={timeIntervals}
//         //             keyExtractor={(item, index) => index.toString()}
//         //             numColumns={4}
//         //             renderItem={({ item }) => (
//         //                 <Text style={styles.text1}>{item}s</Text>
//         //             )}
//         //         />
//         //     </View>

//         // </View >
//     );

// };

// export default MainScreen;

// const windowWidth = Dimensions.get('window').width;
// const windowHeight = Dimensions.get('window').height;

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         flexDirection: 'column',
//         borderColor: '#DCDCDC',
//         backgroundColor: 'coral'
//     },
//     imageContainer: {
//         padding: 50,
//         justifyContent: 'center',
//         alignItems: 'center',
//     },
//     titleContainer: {
//         padding: 50,
//         justifyContent: 'center',
//         alignItems: 'center',
//     },
//     descriptionContainer: {
//         padding: 50,
//         justifyContent: 'center',
//         alignItems: 'center',
//     },
//     buttonsContainer: {
//         flexDirection: 'row',
//         justifyContent: 'space-evenly'
//     },
//     text: {
//         fontFamily: 'Source Sans 3 Regular',
//         fontSize: 20,
//         color: 'black',
//         alignSelf: 'center',
//         flexDirection: 'row',
//     },
//     text1: {
//         fontFamily: 'Source Sans 3 Regular',
//         fontSize: 20,
//         color: 'black',
//         alignSelf: 'center',
//         flexDirection: 'row',
//         backgroundColor: 'dodgerblue',
//         borderRadius: 20,
//         padding: 10
//     },
//     image: {
//         width: 128,
//         height: 128,
//         alignSelf: 'center',
//     },
//     btnImage: {
//         width: 100,
//         height: 100,
//         borderRadius: 50,
//         borderWidth: 10,
//         borderColor: '#DCDCDC',
//     },
//     cartButtonRight: {
//         alignItems: 'center',
//         justifyContent: 'center',
//         width: '13%',
//         height: '8%',
//         position: 'absolute',
//         top: windowHeight * 0.7,
//         right: windowWidth * 0.1,
//         backgroundColor: '#ADD8E6',
//         borderRadius: 100,
//         borderWidth: 1,
//     },
//     cartButtonLeft: {
//         alignItems: 'center',
//         justifyContent: 'center',
//         width: '13%',
//         height: '8%',
//         position: 'absolute',
//         top: windowHeight * 0.7,
//         left: windowWidth * 0.1,
//         backgroundColor: '#ADD8E6',
//         borderRadius: 100,
//         borderWidth: 1,
//     },
//     cartImage: {
//         width: 30,
//         height: 30,
//         alignSelf: 'center',
//     },
//     timeIntervalsContainer: {
//         padding: 20,
//         alignItems: 'center',
//     },
// });


/**************************  MAIN  **************************/
import React, { useState, useEffect, useRef } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Dimensions,
    Image,
    ImageBackground,
    BackHandler,
    Button
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { FlatList, ScrollView } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';

//Firestore
import firestore from '@react-native-firebase/firestore';
import crashlytics from '@react-native-firebase/crashlytics';
import analytics from '@react-native-firebase/analytics';

//Redux
// import { useSelector, useDispatch } from 'react-redux';
// import { increment, decrement } from '../features/counterSlice';

//Images
import one from '../screens/icons/1.png'
import two from '../screens/icons/2.png'
import three from '../screens/icons/3.png'
import four from '../screens/icons/4.png'


const MainScreen = ({ navigation }) => {

    // Log a non-fatal error
    crashlytics().recordError(new Error('This is a non-fatal error. Made by Sauk'));


    const [elapsedTime, setElapsedTime] = useState(0); // State variable for elapsed time
    const [timeIntervals, setTimeIntervals] = useState([]); // State variable for timer interval
    const [isTrackingTime, setIsTrackingTime] = useState(false); // State for tracking time status
    const timerIntervalRef = useRef(null); //Use a ref to store the interval ID

    const startTimer = () => {
        if (timerIntervalRef.current) {
            clearInterval(timerIntervalRef.current); //Clear previous interval if running
        }

        let startTime = Date.now(); //Start time reference
        const interval = setInterval(() => {
            const currentTime = Date.now();
            const elapsedSeconds = Math.floor((currentTime - startTime) / 1000); //Elapsed time in seconds
            setElapsedTime(elapsedSeconds); //Update elapsed time state

        }, 1000); //Interval of 1 second

        timerIntervalRef.current = interval; // Store interval refrence in the ref
        setIsTrackingTime(true); // Set tracking status to true

    };

    const stopTimer = () => {
        if (timerIntervalRef.current) {
            clearInterval(timerIntervalRef.current); //Clear the interval
            timerIntervalRef.current = null; //Reset interval state in the ref
        }

        //Send google analytics event with time spent
        if (isTrackingTime) {
            // Only update time intervals if the timer was running
            setTimeIntervals((prevIntervals) => [...prevIntervals, elapsedTime + sauk]);

            analytics().logEvent('time_spent_first_screen', {
                screenName: 'Saukeh',
                timeSpent: elapsedTime + sauk,
            });

            setIsTrackingTime(false); //Reset tracking status
        }
    }

    const sauk = 'Sauk';

    useEffect(() => {
        //Start timer when component mounts
        startTimer();
        console.log("Component has mounted");

        //Stop timer and send Google Analytics when component unmounts
        //This function does not work, because when component unmounts the app is either reloading/paused/stopped.
        //Stop the timer when screen is navigated or by using unSubscribeFocus / unSubscribeBlur
        return () => {
            stopTimer();
            console.log("Component has UNMOUNTED");
        };
    }, []);

    useEffect(() => {
        // Additional effect to stop the timer when the component is focused
        const unsubscribeFocus = navigation.addListener('focus', () => {
            startTimer();
        });

        // Cleanup function for the focus event listener
        return () => {
            unsubscribeFocus();
        };
    }, [navigation]);

    // useEffect(() => {
    //     // Additional effect to stop the timer when the component is blurred
    //     const unsubscribeBlur = navigation.addListener('blur', () => {
    //         stopTimer();
    //     });

    //     // Cleanup function for the blur event listener
    //     return () => {
    //         unsubscribeBlur();
    //     };
    // }, [navigation]);

    const changeScreen2 = () => {
        //Log navigation event before navigating
        analytics().logEvent('First_Second', { buttonName: 'Second' });

        //Navigate to second screen
        navigation.navigate('Second')
        stopTimer(); //best way to stop time and record it no cap
    }

    const changeScreen3 = () => {
        //Log navigation event before navigating
        analytics().logEvent('First_Third', { buttonName: 'Third' });

        //Navigate to third screen
        navigation.navigate('Third')
        stopTimer(); //best way to stop time and record it no cap
    }

    const changeScreen4 = () => {
        // Log an analytics event before navigating
        analytics().logEvent('First_Fourth', { buttonName: 'Fourth' });

        // Navigate to the Fourth screen
        navigation.navigate('Fourth');
        stopTimer(); //best way to stop time and record it no cap
    }


    const handleCrashButtonPress = () => {
        // Intentionally causing a JavaScript crash
        throw new Error('Intentional crash for testing purposes');
    };

    // const dispatch = useDispatch();
    // const counter = useSelector(state => state.counter.value);

    return (

        // <SafeAreaView style={styles.container}>
        //     <Text style={styles.text}>{counter}</Text>
        //     <Button onPress={() => dispatch(increment())} title="Increment" />
        //     <Button onPress={() => dispatch(decrement())} title="Decrement" />
        // </SafeAreaView>

        <View style={styles.container}>

            <ScrollView>
                {/** Image Container **/}
                <View style={styles.imageContainer}>
                    <Image source={one} style={styles.image} />
                </View>

                {/** Title Container **/}
                <View style={styles.titleContainer}>
                    <Text style={styles.text}>Welcome to Screen 1</Text>
                </View>

                {/** Timer View + Function **/}
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 40, paddingVertical: 20, borderWidth: 7, borderRadius: 50, borderColor: '#8ACDD7' }}>
                    <TouchableOpacity onPress={startTimer} style={{ backgroundColor: '#B2FBA5', borderRadius: 100, padding: 10 }}>
                        <Text style={styles.text}>Start</Text>
                    </TouchableOpacity>

                    <Text style={styles.text1}>elapsedTime : {elapsedTime}</Text>

                    <TouchableOpacity onPress={stopTimer} style={{ backgroundColor: '#DB5856', borderRadius: 100, padding: 10 }}>
                        <Text style={styles.text}>Stop</Text>
                    </TouchableOpacity>
                </View>

                {/** Description Container **/}
                <View style={styles.descriptionContainer}>
                    <Text style={styles.text}>Press any one of the buttons below to navigate to the respective screens</Text>

                </View>

                {/** Button Container **/}
                <View style={styles.buttonsContainer}>

                    <TouchableOpacity
                        activeOpacity={0.4}
                        onPress={changeScreen2}>
                        <Image source={two} style={styles.btnImage} />
                    </TouchableOpacity>

                    <TouchableOpacity
                        activeOpacity={0.4}
                        onPress={changeScreen3}>
                        <Image source={three} style={styles.btnImage} />
                    </TouchableOpacity>

                    <TouchableOpacity
                        activeOpacity={0.4}
                        onPress={changeScreen4}>
                        <Image source={four} style={styles.btnImage} />
                    </TouchableOpacity>

                </View>






            </ScrollView>

            <View style={styles.timeIntervalsContainer}>
                <Text style={styles.text}>Time Intervals:</Text>
                <FlatList
                    data={timeIntervals}
                    keyExtractor={(item, index) => index.toString()}
                    numColumns={4}
                    renderItem={({ item }) => (
                        <Text style={styles.text1}>{item}</Text>
                    )}
                />
            </View>

        </View >
    );

};

export default MainScreen;

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        borderColor: '#DCDCDC',
        backgroundColor: '#FFC0D9'
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