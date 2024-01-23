
import React, { useState } from 'react';
import { View, TextInput, StyleSheet, Text, TouchableOpacity, Image, Alert, ImageBackground, SafeAreaView } from 'react-native';

//Use camera or take picture from gallery
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';

//Firebase import
import firestore from '@react-native-firebase/firestore';

const AddContact = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [number, setNumber] = useState('');
  const [pic, setPic] = useState('');

  const handleSubmit = () => {
    // Add Firestore data upload logic here
    firestore().collection('user').add({
      name,
      email,
      number,
      pic,
    }).then(() => {
      console.log("Data added to Firestore");
      Alert.alert("Contact", "Contact has been succesfully added!",
        [
          {
            text: "Okay 👍🏻",
            onPress: () => console.log("Bro said OK 👍🏻"),
          },
        ]);
    })
      .catch(error => {
        console.error("Error adding data to Firestore: ", error);
        Alert.alert("Error", "Please check your internet conenction as it is required to upload contacts 😓",
          [
            {
              text: "Haish that's just too bad 🙄",
              onPress: () => console.log("Bro thinks he can develop a better app 😑"),
            },
          ]);
      });
  };


  const image = { uri: 'https://img.freepik.com/free-vector/blur-pink-blue-abstract-gradient-background-vector_53876-174836.jpg?w=2000' }

  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground source={image}
        resizeMode='cover'
        style={styles.backGroundImage}>


          <View style={styles.imageContainer}>
            <TouchableOpacity >
              <Image source={{ uri: 'https://qph.cf2.quoracdn.net/main-qimg-f32f85d21d59a5540948c3bfbce52e68' }} style={styles.image} />
            </TouchableOpacity>
          </View>


          <TextInput
            style={styles.textInput}
            value={name}
            onChangeText={(text) => setName(text)}
            placeholder='Name'
            placeholderTextColor={'black'}
          />


          <TextInput
            style={styles.textInput}
            value={number}
            onChangeText={(text) => setNumber(text)}
            placeholder='Phone Number'
            placeholderTextColor={'black'}
          />


          <TextInput
            style={styles.textInput}
            value={email}
            onChangeText={(text) => setEmail(text)}
            placeholder='E-Mail Address'
            placeholderTextColor={'black'}
          />

          <TextInput
            style={styles.textInput}
            value={pic}
            onChangeText={(text) => setPic(text)}
            placeholder='Image URL'
            placeholderTextColor={'black'}
          />

          <TouchableOpacity
            style={styles.btnContainer}
            onPress={handleSubmit}>
            <Text style={styles.saveText}>Save</Text>
          </TouchableOpacity>

        
      </ImageBackground>
    </SafeAreaView>
  );
};

export default AddContact;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  imageContainer: {
    //justifyContent: 'center',
    marginBottom: 35,
  },
  btnContainer: {
    padding: 10,
    borderRadius: 20,
    backgroundColor: 'limegreen',
  },
  textInput: {
    width: '80%',
    backgroundColor: 'lightseagreen',
    //borderColor: 'white',
    borderWidth: 1,
    padding: 10,
    marginBottom: 10,
    borderRadius: 20,
  },
  saveText: {
    fontFamily: 'NotoSans Regular',
    fontSize: 20,
    color: 'white',
    alignSelf: 'center',
  },
  image: {
    resizeMode: 'center',
    width: 200,
    height: 200,
    borderRadius: 100,
  },
  backGroundImage: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
});