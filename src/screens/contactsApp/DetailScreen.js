import { StyleSheet, View, Text, TouchableOpacity, Image, Dimensions, ScrollView, TextInput, Alert, ImageBackground } from 'react-native';
import React, { useEffect, useState } from 'react';

//Firebase import
import firestore from '@react-native-firebase/firestore';

const DetailScreen = ({ navigation, route }) => {

    const { id, name: initialName, number: initialNumber, email: initialEmail, pic } = route.params;

    const [name, setName] = useState(initialName);
    const [number, setNumber] = useState(initialNumber);
    const [email, setEmail] = useState(initialEmail);
    const [isEditing, setIsEditing] = useState(false);

    useEffect(() => {
        setName(initialName);
        setNumber(initialNumber);
        setEmail(initialEmail);
    }, [initialName, initialNumber, initialEmail]);

    const handleEditPress = () => {
        setIsEditing(true);
    };

    const handleSavePress = () => {
        // Check if the document exists
        firestore()
            .collection('user')
            .doc(id)
            .get()
            .then((documentSnapshot) => {
                if (documentSnapshot.exists) {
                    // Document exists, update it
                    firestore()
                        .collection('user')
                        .doc(id)
                        .update({
                            name,
                            number,
                            email,
                        })
                        .then(() => {
                            // Data saved successfully
                            console.log("Data updated!");
                            Alert.alert("Contact", "Contact has been succesfully updated!",
                                [
                                    {
                                        text: "Okay 👍🏻",
                                        onPress: () => console.log("Bro said OK 👍🏻"),
                                    },
                                ]);
                            setIsEditing(false); // Exit editing mode
                        })
                        .catch((error) => {
                            console.error('Error updating document: ', error);
                            Alert.alert("Error", "Please check your internet conenction as it is required to update contacts 😓",
                                [
                                    {
                                        text: "Haish that's just too bad 🙄",
                                        onPress: () => console.log("Bro thinks he can develop a better app 😑"),
                                    },
                                ]);
                        });
                } else {
                    console.error('Document not found.');
                    Alert.alert("Error", "Document doesn't exist in database",
                        [
                            {
                                text: "Okay 👍🏻.",
                                onPress: () => console.log("Bro said OK 👍🏻"),
                            },
                            {
                                text: "Okay 👍🏻. Let me add the contact :)",
                                onPress: () => navigation.navigate('Create Contacts'),
                            },
                        ]);
                }
            })
            .catch((error) => {
                console.error('Error checking document existence: ', error);
                Alert.alert("Error", "The app has encountered an error checkin on the document",
                    [
                        {
                            text: "Okay 👍🏻",
                            onPress: () => console.log("Bro said OK 👍🏻"),
                        },
                    ]);
            });

        console.log({ id });
    };


    const handleDeletePress = () => {
        firestore()
            .collection('user')
            .doc(id)
            .delete()
            .then(() => {
                console.log('User deleted!');
                Alert.alert("Delete", "User has been deleted succesfully",
                    [
                        {
                            text: "Okay 👍🏻",
                        },
                    ]);
            });
    };

    const deleteAlert = () => {
        Alert.alert("Delete", "Are you sure you want to delete this contact? (This action cannot be undone)",
            [
                {
                    text: "Yes",
                    onPress: () => handleDeletePress(),
                },
                {
                    text: "No",
                },
            ]);
    };

    const renderEditButton = () => {
        if (isEditing) {
            return (
                <TouchableOpacity style={styles.editContainer} onPress={handleSavePress}>
                    <Text style={styles.editText}>Save</Text>
                </TouchableOpacity>
            );
        } else {
            return (
                <TouchableOpacity style={styles.editContainer} onPress={handleEditPress}>
                    <Text style={styles.editText}>Edit</Text>
                </TouchableOpacity>
            );
        }
    };

    const renderDeleteButton = () => {
        return (
            <View style={{ flexDirection: 'row' }}>

                <View style={{ flex: 2 }}>
                </View>


                <TouchableOpacity style={styles.deleteContainer} onPress={deleteAlert}>
                    <Image source={{ uri: 'https://cdn-icons-png.flaticon.com/128/9790/9790368.png' }} style={styles.deleteImg} />
                </TouchableOpacity>


                <View style={{ flex: 2 }}>
                </View>

            </View>
        )

    };


    const image = { uri: 'data:image/jpeg;base64,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' }

    return (
        <ScrollView style={styles.container}>
            <ImageBackground source={image}
                resizeMode='cover'
                style={styles.backGroundImage}>
                <View style={{ flexDirection: 'row' }}>
                    <View style={{ flex: 6 }}></View>

                    {renderEditButton()}
                    <View style={{ flex: 0.1 }}></View>
                </View>

                <View style={styles.imageContainer}>
                    <Image style={styles.image} source={{ uri: pic }} />
                </View>

                {/*Call functions*/}
                <View style={{ flexDirection: 'row', paddingBottom: 20, }}>
                    <TouchableOpacity style={styles.actionsContainer}>
                        <Image source={{ uri: 'https://cdn-icons-png.flaticon.com/128/2462/2462844.png' }} style={styles.iconImg} />
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.actionsContainer}>
                        <Image source={{ uri: 'https://cdn-icons-png.flaticon.com/128/2354/2354127.png' }} style={styles.iconImg} />
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.actionsContainer}>
                        <Image source={{ uri: 'https://cdn-icons-png.flaticon.com/128/8408/8408020.png' }} style={styles.iconImg} />
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.actionsContainer}>
                        <Image source={{ uri: 'https://cdn-icons-png.flaticon.com/128/725/725643.png' }} style={styles.iconImg} />
                    </TouchableOpacity>
                </View>


                {/*Render the name, mobile and email fields with TextInput if in edit mode*/}

                {/*name*/}
                <View style={styles.detailsContainer}>
                    <Text style={styles.text}>name</Text>
                    {isEditing ? (
                        <TextInput
                            style={styles.detailText}
                            value={name}
                            onChangeText={(nama) => setName(nama)}
                        />
                    ) : (
                        <Text style={styles.detailText}>{name}</Text>
                    )}
                </View>

                {/*mobile*/}
                <View style={styles.detailsContainer}>
                    <Text style={styles.text}>mobile</Text>
                    {isEditing ? (
                        <TextInput
                            style={styles.detailText}
                            value={number}
                            onChangeText={(mobile) => setNumber(mobile)}
                        />
                    ) : (
                        <Text style={styles.detailText}>{number}</Text>
                    )}
                </View>

                {/*email*/}
                <View style={styles.detailsContainer}>
                    <Text style={styles.text}>email</Text>
                    {isEditing ? (
                        <TextInput
                            style={styles.detailText}
                            value={email}
                            onChangeText={(emel) => setEmail(emel)}
                        />
                    ) : (
                        <Text style={styles.detailText}>{email}</Text>
                    )}
                </View>

                {/*Delete function*/}
                {renderDeleteButton()}

            </ImageBackground>
        </ScrollView>
    );
};

export default DetailScreen;

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        //backgroundColor: 'white',
        //paddingHorizontal: 15,
    },
    imageContainer: {
        padding: 20,
        alignItems: 'center',
    },
    actionsContainer: {
        flex: 1,
        padding: 15,
        borderRadius: 30,
        margin: 15,
        backgroundColor: '#DCDCDC',
    },
    detailsContainer: {
        backgroundColor: '#DCDCDC',
        padding: 10,
        borderRadius: 10,
        marginRight: 10,
        marginLeft: 10,
        marginBottom: 10,
    },
    editContainer: {
        flex: 1,
        backgroundColor: 'seagreen',
        borderRadius: 20,
        height: windowHeight * 0.04,
        marginTop: 20,
    },
    deleteContainer: {
        flex: 1,
        justifyContent: 'center',
        //backgroundColor: 'crimson',
        borderRadius: 20,
        marginBottom: 20,
        paddingVertical: 20,
    },
    detailText: {
        paddingHorizontal: 10,
        paddingBottom: 10,
        alignSelf: 'flex-start',
        color: 'black',
        fontFamily: 'Source Sans 3 Regular',
        fontSize: 20,
    },
    text: {
        fontFamily: 'NotoSans Regular',
        fontSize: 12,
        color: 'black',
        paddingHorizontal: 10,
        paddingTop: 5,
        paddingBottom: 5,
    },
    editText: {
        padding: 2,
        alignSelf: 'center',
        color: 'white',
        fontFamily: 'Source Sans 3 Regular',
        fontSize: 20,
    },

    image: {
        width: 250,
        height: 250,
        borderRadius: 200,
        borderWidth: 3,
        borderColor: '#DCDCDC',
    },
    iconImg: {
        width: 30,
        height: 30,
        alignSelf: 'center'
    },
    deleteImg: {
        width: 50,
        height: 50,
        alignSelf: 'center'
    },
    backGroundImage: {
        flex: 1,
        padding: 10
        //alignItems: 'center',
        //justifyContent: 'center'
    },
})