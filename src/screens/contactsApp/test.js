/**************************  REDUX  **************************/





/**************************  CRASHLYTICS CODE  **************************/

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

const HomeScreen = ({ navigation }) => {
    const [sections, setSections] = useState([]);
    const [alfabet, setAlfabet] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [refreshing, setRefreshing] = useState(false);
    const [loading, setLoading] = useState(true); // New state to track loading state

    const [elapsedTime, setElapsedTime] = useState(0); // State variable for elapsed time
    const [timerInterval, setTimerInterval] = useState(null); // State variable for timer interval
    const [isTrackingTime, setIsTrackingTime] = useState(false); // State for tracking time status

    const sectionListRef = useRef(null);

    // Log a non-fatal error
    crashlytics().recordError(new Error('This is a non-fatal error. Made by Sauk'));

    const fetchFirestoreData = async () => {
        try {
            const querySnapshot = await firestore()
                .collection('user')
                .orderBy('name')
                .get();

            const data = {};
            const tempID = {};

            querySnapshot.forEach((documentSnapshot) => {
                const userData = documentSnapshot.data();
                const sectionKey = userData.name.charAt(0).toUpperCase();
                const docIdMike = documentSnapshot.id;

                if (!data[sectionKey]) {
                    data[sectionKey] = [];
                }

                if (!tempID[docIdMike]) {
                    tempID[docIdMike] = [];
                }

                data[sectionKey].push({
                    ...userData,
                    key: documentSnapshot.id,
                });

                tempID[docIdMike].push({
                    ...userData,
                    key: documentSnapshot.id,
                });
            });

            const sectionsArray = Object.keys(data).map((key) => ({
                title: key,
                data: data[key],
            }));

            const alfebetArray = Object.keys(data).map((key) => ({
                title: key,
            }));

            setSections(sectionsArray);
            setAlfabet(alfebetArray);
        } catch (error) {
            console.error('Error fetching Firestore data:', error);
        } finally {
            setRefreshing(false);
            setLoading(false); // Set loading to false after data is fetched or if there's an error
        }
    };

    const onRefresh = () => {
        console.log('Fetching Data from Firestore');
        setRefreshing(true);
        fetchFirestoreData();
    };

    useEffect(() => {
        fetchFirestoreData();
    }, []);

    const renderSectionHeader = ({ section }) => (
        <View style={styles.headerContainer}>
            <Text style={styles.titleText}>{section.title}</Text>
        </View>
    );

    const renderItem = ({ item }) => (
        <View style={styles.contactContainer}>
            <TouchableOpacity
                style={{ flexDirection: 'row', margin: 2 }}
                onPress={() =>
                    navigation.navigate('Details', {
                        id: item.key,
                        name: item.name,
                        number: item.number,
                        email: item.email,
                        pic: item.pic,
                    })
                }>
                <Image style={styles.contactImage} source={{ uri: item.pic }} />
                <Text style={styles.contentText}>{item.name}</Text>
            </TouchableOpacity>
        </View>
    );

    const renderAlphabets = ({ item }) => (
        <View>
            <TouchableOpacity
                onPress={() => {
                    setSelectedCategory(item.title);
                    scrollToCategory(item.title); // Scroll to the selected category
                }}>
                <Text style={styles.categoryText}>{item.title}</Text>
            </TouchableOpacity>
        </View>
    );

    const scrollToCategory = (categoryName) => {
        const sectionIndex = sections.findIndex(
            (section) => section.title === categoryName
        );
        if (sectionIndex !== -1 && sectionListRef.current) {
            sectionListRef.current.scrollToLocation({
                sectionIndex,
                itemIndex: 0,
                animated: true,
            });
        }
    };

    const handleCrashButtonPress = () => {
        // Intentionally causing a JavaScript crash
        throw new Error('Intentional crash for testing purposes');
    };

    //Google Analytics
    const recordClick = () => {
        analytics().logEvent('button_click', {
            buttonLabel: '7707',
            buttonId: '0707'
        });

    }

    const image = {
        uri: 'https://medialoot.com/preview/atmosphere-app-backgrounds/img/iphone-2.jpg',
    };

    const startTimer = () => {
        if (timerInterval) {
            clearInterval(timerInterval); // Clear previous interval if running
        }

        let startTime = Date.now(); // Start time reference
        const interval = setInterval(() => {
            const currentTime = Date.now();
            const elapsedSeconds = Math.floor((currentTime - startTime) / 1000); // Elapsed time in seconds
            setElapsedTime(elapsedSeconds); // Update elapsed time state
        }, 1000); // Interval of 1 second

        setTimerInterval(interval); // Store interval reference
        setIsTrackingTime(true); // Set tracking status to true
    };

    const stopTimer = () => {
        if (timerInterval) {
            clearInterval(timerInterval); // Clear the interval
            setTimerInterval(null); // Reset interval state
        }

        // Send Google Analytics event with time spent
        if (isTrackingTime) {
            analytics().logEvent('time_spent_on_screen', {
                screenName: '1', // Replace with the current screen name
                timeSpent: elapsedTime,
            });

            console.log(elapsedTime);

            setIsTrackingTime(false); // Reset tracking status
        }
    };

    useEffect(() => {
        // Start timer when the component mounts
        startTimer();

        // Stop timer and send Google Analytics event when the component unmounts
        return () => {
            stopTimer();
        };
    }, []); // Empty dependency array to run effect only once on mount

    return (
        <SafeAreaView style={styles.container}>
            <ImageBackground
                source={image}
                resizeMode="cover"
                style={styles.backGroundImage}>

                <Text style={{ fontSize: 18, color: 'white', marginLeft: 20 }}>Elapsed Time: {elapsedTime} seconds</Text>

                <View
                    style={{ flexDirection: 'row', marginHorizontal: 10, marginBottom: 20, justifyContent: 'flex-end' }}>
                    <TouchableOpacity onPress={handleCrashButtonPress}>
                        <Image
                            source={{ uri: 'https://cdn-icons-png.flaticon.com/128/992/992651.png' }}
                            style={styles.image}
                        />
                    </TouchableOpacity>

                    {/** test button for google analytics **/}
                    <Button
                        title="Add To Basket"
                        onPress={async () =>
                            await analytics().logEvent('basket', {
                                id: 3745092,
                                item: '21',
                                description: ['round neck', 'long sleeved'],
                                size: '3',
                            })
                        }
                        style={{ margin: 20 }}
                    />
                </View>

                <View style={{ flex: 1, flexDirection: 'row', marginLeft: 12 }}>
                    {loading ? ( // Display activity indicator while loading
                        <View style={styles.loaderContainer}>
                            <ActivityIndicator size="large" color="limegreen" />
                        </View>
                    ) : (
                        <SectionList
                            sections={sections}
                            keyExtractor={(item) => item.key}
                            renderSectionHeader={renderSectionHeader}
                            renderItem={renderItem}
                            ref={sectionListRef}
                            refreshControl={
                                <RefreshControl refreshing={refreshing} onRefresh={onRefresh} colors={['#009688']} />
                            }
                        />
                    )}

                    <TouchableOpacity
                        onPress={() => navigation.navigate('Create Contacts')}
                        style={styles.cartButtonRight}
                        activeOpacity={0.6}>
                        <Image
                            source={{ uri: 'https://cdn-icons-png.flaticon.com/128/4175/4175032.png' }}
                            style={styles.cartImage}
                        />
                    </TouchableOpacity>

                    <TouchableOpacity
                        onPress={recordClick}
                        style={styles.cartButtonLeft}
                        activeOpacity={0.6}>
                        <Image
                            source={{ uri: 'https://cdn-icons-png.flaticon.com/128/1041/1041916.png' }}
                            style={styles.cartImage}
                        />
                    </TouchableOpacity>

                    <TouchableOpacity
                        onPress={startTimer}
                        style={styles.cartButtonLeft1}
                        activeOpacity={0.6}>
                        <Text style={{ color: 'black' }}>Start</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        onPress={stopTimer}
                        style={styles.cartButtonLeft2}
                        activeOpacity={0.6}>
                        <Text style={{ color: 'black' }}>Stop</Text>
                    </TouchableOpacity>

                    <View style={styles.finderContainer}>
                        <FlatList data={sections} renderItem={renderAlphabets} keyExtractor={(item) => item.title} />
                    </View>
                </View>
            </ImageBackground>
        </SafeAreaView>
    );
};

export default HomeScreen;

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        borderColor: '#DCDCDC',
    },
    headerContainer: {
        flex: 1,
        padding: 8,
        borderBottomWidth: 1,
        marginLeft: 10,
        marginRight: 10,
        borderColor: 'white',
    },
    contactContainer: {
        flex: 1,
        padding: 8,
        borderBottomWidth: 0,
        marginLeft: 10,
        marginRight: 10,
    },
    finderContainer: {
        flexDirection: 'column',
        marginVertical: windowHeight * 0.08,
        marginRight: 14,
    },
    titleText: {
        fontFamily: 'NotoSans Regular',
        fontSize: 20,
        color: 'white',
        alignSelf: 'flex-start',
        flexDirection: 'row',
    },
    contentText: {
        fontFamily: 'NotoSans Regular',
        fontSize: 15,
        color: 'white',
        paddingLeft: 15,
    },
    categoryText: {
        fontFamily: 'Source Sans 3 Regular',
        fontSize: windowHeight > 500 ? 15 : 13,
        fontWeight: '700',
        color: 'white',
        alignSelf: 'center',
    },
    image: {
        width: 25,
        height: 25,
        backgroundColor: 'seagreen',
        borderRadius: 20,
    },
    contactImage: {
        width: 25,
        height: 25,
        borderRadius: 10,
        borderWidth: 2,
        borderColor: '#DCDCDC',
    },
    testContainer: {
        backgroundColor: 'crimson',
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
    backGroundImage: {
        flex: 1,
        justifyContent: 'center',
    },
    loaderContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },

    cartButtonLeft1: {
        alignItems: 'center',
        justifyContent: 'center',
        width: '13%',
        height: '8%',
        position: 'absolute',
        top: windowHeight * 0.7,
        left: windowWidth * 0.3,
        backgroundColor: '#ADD8E6',
        borderRadius: 100,
        borderWidth: 1,
    },
    cartButtonLeft2: {
        alignItems: 'center',
        justifyContent: 'center',
        width: '13%',
        height: '8%',
        position: 'absolute',
        top: windowHeight * 0.7,
        left: windowWidth * 0.5,
        backgroundColor: '#ADD8E6',
        borderRadius: 100,
        borderWidth: 1,
    },
});


/**************************  FIRESTORE CODE  **************************/


// import React, { useState, useEffect, useRef } from 'react';
// import { View, Text, StyleSheet, TouchableOpacity, FlatList, SectionList, Dimensions, Image, ImageBackground, RefreshControl } from 'react-native';
// import { SafeAreaView } from 'react-native-safe-area-context';
// import firestore from '@react-native-firebase/firestore';

// const HomeScreen = ({ navigation }) => {
//     const [sections, setSections] = useState([]);
//     const [alfabet, setAlfabet] = useState([]);
//     const [selectedCategory, setSelectedCategory] = useState(null);
//     const [refreshing, setRefreshing] = useState(false);

//     const sectionListRef = useRef(null);

//     const fetchFirestoreData = async () => {
//         try {
//             const querySnapshot = await firestore()
//                 .collection('user')
//                 .orderBy('name')
//                 .get();

//             const data = {};
//             const tempID = {};

//             querySnapshot.forEach((documentSnapshot) => {
//                 const userData = documentSnapshot.data();
//                 const sectionKey = userData.name.charAt(0).toUpperCase();
//                 const docIdMike = documentSnapshot.id;

//                 if (!data[sectionKey]) {
//                     data[sectionKey] = [];
//                 }

//                 if (!tempID[docIdMike]) {
//                     tempID[docIdMike] = [];
//                 }

//                 data[sectionKey].push({
//                     ...userData,
//                     key: documentSnapshot.id,
//                 });

//                 tempID[docIdMike].push({
//                     ...userData,
//                     key: documentSnapshot.id,
//                 });
//             });

//             const sectionsArray = Object.keys(data).map((key) => ({
//                 title: key,
//                 data: data[key],
//             }));

//             const alfebetArray = Object.keys(data).map((key) => ({
//                 title: key,
//             }));

//             setSections(sectionsArray);
//             setAlfabet(alfebetArray);
//         } catch (error) {
//             console.error('Error fetching Firestore data:', error);
//         } finally {
//             setRefreshing(false); // Set refreshing to false after data is fetched or if there's an error
//         }
//     };

//     const onRefresh = () => {
//         console.log("Fetching Data from Firestore")
//         setRefreshing(true);
//         fetchFirestoreData();
//     };

//     useEffect(() => {
//         fetchFirestoreData();
//     }, []);

//     const renderSectionHeader = ({ section }) => (
//         <View
//             style={styles.headerContainer}>
//             <Text style={styles.titleText}>{section.title}</Text>
//         </View>
//     );

//     const renderItem = ({ item }) => (
//         <View style={styles.contactContainer}>
//             <TouchableOpacity
//                 style={{ flexDirection: 'row', margin: 2, }}
//                 onPress={() => navigation.navigate('Details',
//                     {
//                         id: item.key,
//                         name: item.name,
//                         number: item.number,
//                         email: item.email,
//                         pic: item.pic,
//                     }
//                 )}>
//                 <Image style={styles.contactImage} source={{ uri: item.pic }} />
//                 <Text style={styles.contentText}>{item.name}</Text>
//             </TouchableOpacity>
//         </View>

//     );

//     const renderAlphabets = ({ item }) => (
//         <View >
//             <TouchableOpacity
//                 onPress={() => {
//                     setSelectedCategory(item.title);
//                     scrollToCategory(item.title); //Scroll to the selected category
//                 }}
//             >
//                 <Text style={styles.categoryText}>{item.title}</Text>
//             </TouchableOpacity>
//         </View>
//     );

//     //function to scroll to each alphabet
//     const scrollToCategory = (categoryName) => {
//         const sectionIndex = sections.findIndex((section) => section.title === categoryName);
//         if (sectionIndex !== -1 && sectionListRef.current) {
//             sectionListRef.current.scrollToLocation({
//                 sectionIndex,
//                 itemIndex: 0,
//                 animated: true,
//             });
//         }
//     };

//     const image = { uri: 'https://medialoot.com/preview/atmosphere-app-backgrounds/img/iphone-2.jpg' }


//     return (
//         <SafeAreaView style={styles.container}>
//             <ImageBackground
//                 source={image}
//                 resizeMode='cover'
//                 style={styles.backGroundImage}
//             >
//                 <View style={{ flexDirection: 'row', marginHorizontal: 10, marginBottom: 20, justifyContent: 'flex-end', }}>

//                     <TouchableOpacity onPress={
//                         () => navigation.navigate('Create Contacts')}>
//                         <Image
//                             source={{ uri: 'https://cdn-icons-png.flaticon.com/128/992/992651.png' }}
//                             style={styles.image} />
//                     </TouchableOpacity>

//                 </View>

//                 <View style={{ flex: 1, flexDirection: 'row', marginLeft: 12 }}>

//                     <SectionList
//                         sections={sections}
//                         keyExtractor={(item) => item.key}
//                         renderSectionHeader={renderSectionHeader}
//                         renderItem={renderItem}
//                         ref={sectionListRef}
//                         refreshControl={
//                             <RefreshControl
//                                 refreshing={refreshing}
//                                 onRefresh={onRefresh}
//                                 colors={['#009688']}
//                             />
//                         }
//                     />

//                     <TouchableOpacity
//                         onPress={() => navigation.navigate('Create Contacts')}
//                         style={styles.cartButton}
//                         activeOpacity={0.6}>
//                         <Image
//                             source={{ uri: 'https://cdn-icons-png.flaticon.com/128/4175/4175032.png' }}
//                             style={styles.cartImage} />
//                     </TouchableOpacity>

//                     <View style={styles.finderContainer}>
//                         <FlatList
//                             data={alfabet}
//                             renderItem={renderAlphabets}
//                             keyExtractor={item => item.title}
//                         />
//                     </View>

//                 </View>

//             </ImageBackground>
//         </SafeAreaView >
//     );
// };

// export default HomeScreen;


// const windowWidth = Dimensions.get("window").width;
// const windowHeight = Dimensions.get("window").height;

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         flexDirection: 'column',
//         borderColor: '#DCDCDC',
//         // backgroundColor: 'purple',
//     },
//     headerContainer: {
//         flex: 1,
//         padding: 8,
//         borderBottomWidth: 1,
//         marginLeft: 10,
//         marginRight: 10,
//         borderColor: 'white'
//     },
//     contactContainer: {
//         flex: 1,
//         padding: 8,
//         borderBottomWidth: 0,
//         marginLeft: 10,
//         marginRight: 10,
//         //backgroundColor: 'white'
//     },
//     finderContainer: {
//         flexDirection: 'column',
//         marginTop: windowHeight * 0.0005,
//         marginRight: 14,
//         //backgroundColor: 'violet'
//     },
//     titleText: {
//         fontFamily: 'NotoSans Regular',
//         fontSize: 20,
//         color: 'white',
//         alignSelf: 'flex-start',
//         flexDirection: 'row'
//     },
//     contentText: {
//         fontFamily: 'NotoSans Regular',
//         fontSize: 15,
//         color: 'white',
//         paddingLeft: 15,
//     },
//     categoryText: {
//         fontFamily: 'Source Sans 3 Regular',
//         fontSize: windowHeight > 500 ? 15 : 13,
//         fontWeight: '700',
//         color: 'white',
//         alignSelf: 'center'
//     },
//     image: {
//         width: 25,
//         height: 25,
//         backgroundColor: 'seagreen',
//         borderRadius: 20,
//     },
//     contactImage: {
//         width: 25,
//         height: 25,
//         borderRadius: 10,
//         borderWidth: 2,
//         borderColor: '#DCDCDC',
//     },
//     testContainer: {
//         backgroundColor: 'crimson'
//     },
//     cartButton: {
//         alignItems: 'center',
//         justifyContent: 'center',
//         width: '13%',
//         height: '8%',
//         position: 'absolute',
//         top: windowHeight * 0.7,
//         right: windowWidth * 0.1,
//         backgroundColor: '#ADD8E6', //light blue color code: #ADD8E6
//         borderRadius: 100,
//         borderWidth: 1,
//     },
//     cartImage: {
//         width: 30,
//         height: 30,
//         alignSelf: 'center',
//     },
//     backGroundImage: {
//         flex: 1,
//         justifyContent: 'center'
//     },
// })