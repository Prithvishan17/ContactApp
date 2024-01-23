/**************************  ORIGINAL CODE  **************************/

import React from 'react';
//Navigation
import { CardStyleInterpolators, createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';

//Screens
import HomeScreen from './src/screens/icons/crash';
import DetailScreen from './src/screens/contactsApp/DetailScreen';
import AddContact from './src/screens/contactsApp/AddContact';
import Timer from './src/screens/contactsApp/timer';
import MainScreen from './src/RNDCodes/main';
import SecondScreen from './src/RNDCodes/second';
import ThirdScreen from './src/RNDCodes/third';
import FourthScreen from './src/RNDCodes/fourth';
import FifthScreen from './src/RNDCodes/fifth';
import SixthScreen from './src/RNDCodes/sixth';
import SeventhScreen from './src/RNDCodes/seventh';
import EightScreen from './src/RNDCodes/eighth';
import NineScreen from './src/RNDCodes/ninth';
import TenScreen from './src/RNDCodes/tenth';
import ElevenScreen from './src/RNDCodes/eleven';
import TwelveScreen from './src/RNDCodes/twelve';
import ThirteenScreen from './src/RNDCodes/thirteen';
import FourteenScreen from './src/RNDCodes/fourteen';
import FifteenScreen from './src/RNDCodes/fifteen';
import SixteenScreen from './src/RNDCodes/sixteen';

//Redux
// import { Provider } from 'react-redux';
// import { PersistGate } from 'redux-persist/integration/react';
// import store, { persistor } from './src/testing/store';
// import TextInputComponent from './src/testing/TextInputComponent';

const Stack = createStackNavigator()

const App = () => {



  return (

    <NavigationContainer>
      <Stack.Navigator
        initialRouteName='Home'
        screenOptions={{ cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS }}
      >
        <Stack.Screen
          name='Home'
          component={HomeScreen}
          options={{ title: 'Contacts' }}
        />
        <Stack.Screen
          name='Details'
          component={DetailScreen}
          options={{ title: 'Contact Details' }}
        />
        <Stack.Screen
          name='Create Contacts'
          component={AddContact}
          options={{ title: 'Add New Contact' }}
        />
        <Stack.Screen
          name='Timer'
          component={Timer}
          options={{ title: 'Check time' }}
        />
        <Stack.Screen
          name='Main'
          component={MainScreen}
          options={{ title: 'Welcome' }}
        />
        <Stack.Screen
          name='Second'
          component={SecondScreen}
          options={{ title: '2nd Screen' }}
        />
        <Stack.Screen
          name='Third'
          component={ThirdScreen}
          options={{ title: '3rd Screen' }}
        />
        <Stack.Screen
          name='Fourth'
          component={FourthScreen}
          options={{ title: '4th Screen' }}
        />
        <Stack.Screen
          name='Fifth'
          component={FifthScreen}
          options={{ title: '5th Screen' }}
        />
        <Stack.Screen
          name='Sixth'
          component={SixthScreen}
          options={{ title: '6th Screen' }}
        />
        <Stack.Screen
          name='Seventh'
          component={SeventhScreen}
          options={{ title: '7th Screen' }}
        />
        <Stack.Screen
          name='Eight'
          component={EightScreen}
          options={{ title: '8th Screen' }}
        />
        <Stack.Screen
          name='Nine'
          component={NineScreen}
          options={{ title: '9th Screen' }}
        />
        <Stack.Screen
          name='Ten'
          component={TenScreen}
          options={{ title: '10th Screen' }}
        />
        <Stack.Screen
          name='Eleven'
          component={ElevenScreen}
          options={{ title: '11th Screen' }}
        />
        <Stack.Screen
          name='Twelve'
          component={TwelveScreen}
          options={{ title: '12th Screen' }}
        />
        <Stack.Screen
          name='Thirteen'
          component={ThirteenScreen}
          options={{ title: '13th Screen' }}
        />
        <Stack.Screen
          name='Fourteen'
          component={FourteenScreen}
          options={{ title: '14th Screen' }}
        />
        <Stack.Screen
          name='Fifteen'
          component={FifteenScreen}
          options={{ title: '15th Screen' }}
        />
        <Stack.Screen
          name='Sixteen'
          component={SixteenScreen}
          options={{ title: '16th Screen' }}
        />
      </Stack.Navigator>
    </NavigationContainer>

  );
};

export default App;


/**************************  TESTING CODE(WORKS)  **************************/

// import React from 'react';
// import { View, Text, SectionList, StyleSheet, TouchableOpacity } from 'react-native';

// const ContactsApplication = ({ contacts }) => {
//   return (
//     <View style={styles.container}>
//       <SectionList
//         sections={contacts}
//         keyExtractor={(item, index) => item.id}
//         renderSectionHeader={({ section: { title } }) => (
//           <Text style={styles.sectionHeader}>{title}</Text>
//         )}
//         renderItem={({ item }) => (
//           <View style={styles.contactItem}>
//             <Text>{item.name}</Text>
//             <Text>{item.phone}</Text>
//           </View>
//         )}
//       />
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//   },
//   sectionHeader: {
//     backgroundColor: 'lightgray',
//     padding: 10,
//     color: 'black',
//   },
//   contactItem: {
//     padding: 10,
//     borderBottomWidth: 1,
//     borderBottomColor: 'gray',
//   },
// });

// // Sample flat contact list
// const flatContactList = [
//   {
//     id: '1',
//     name: 'Alice',
//     phone: '123-456-7890'
//   },

//   {
//     id: '2',
//     name: 'Anna',
//     phone: '987-654-3210'
//   },
//   {
//     id: '3',
//     name: 'Bob',
//     phone: '555-555-5555'
//   },
//   {
//     id: '4',
//     name: 'Brian',
//     phone: '111-111-1111'
//   },
//   {
//     id: '5',
//     name: 'Adamna',
//     phone: '111-111-1111'
//   },
//   {
//     id: '6',
//     name: 'ulunthu',
//     phone: '111-111-1111'
//   },
//   {
//     id: '7',
//     name: 'zendaya',
//     phone: '111-111-1111'
//   },
// ];

// // Format the data for SectionList
// const formattedContacts = {};
// flatContactList.forEach(contact => {
//   const firstLetter = contact.name[0].toUpperCase();
//   if (!formattedContacts[firstLetter]) {
//     formattedContacts[firstLetter] = [];
//   }
//   formattedContacts[firstLetter].push(contact);
// });

// const contactsData = Object.keys(formattedContacts).map(letter => ({
//   title: letter,
//   data: formattedContacts[letter],
// }));

// // const test = console.log(formattedContacts)
// // console.log(contactsData)

// export default function App() {
//   return (
//     <ContactsApplication contacts={contactsData} />
//   );
// }



/**************************  CHATGPT CODE (WORKS)  **************************/

// import React, { useState } from 'react';
// import { View, TextInput, Button, StyleSheet, Text } from 'react-native';
// import firestore from '@react-native-firebase/firestore';

// const App = () => {
//   const [name, setName] = useState('');
//   const [email, setEmail] = useState('');
//   const [phone, setPhone] = useState('');

//   const handleSubmit = () => {

//     // if (!email || !name) {
//     //   alert("Please enter your email and name.");
//     //   return;
//     // }
//     // Add Firestore data upload logic here
//     firestore().collection('user').add({
//       name,
//       email,
//       phone,
//     }).then(() => {
//       console.log('Data added to Firestore');
//     })
//       .catch(error => {
//         console.error('Error adding data to Firestore: ', error);
//       });
//   };

//   return (
//     <View style={styles.container}>

//       <Text style={styles.titleText}>Create A New Contact</Text>

//       <TextInput
//         style={styles.textInput}
//         value={name}
//         onChangeText={(text) => setName(text)}
//         placeholder='Name'
//       />


//       <TextInput
//         style={styles.textInput}
//         value={phone}
//         onChangeText={(text) => setPhone(text)}
//         placeholder='Phone Number'
//       />


//       <TextInput
//         style={styles.textInput}
//         value={email}
//         onChangeText={(text) => setEmail(text)}
//         placeholder='E-Mail Address'
//       />

//       <Button title="Submit" onPress={handleSubmit} />
//     </View>
//   );
// };

// export default App;

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   textInput: {
//     width: '80%',
//     borderColor: 'gray',
//     borderWidth: 1,
//     padding: 10,
//     marginBottom: 10,
//   },
//   titleText: {
//     fontFamily: 'NotoSans Regular',
//     fontSize: 20,
//     color: 'white',
//     alignSelf: 'center',
//   },
// });


/**************************  BARD CODE(GOT ERROR)  **************************/

// import React, { useState } from 'react';
// import { StyleSheet, Text, TextInput, Button, View } from 'react-native';
// import firebase from '@react-native-firebase/app';
// import firestore from '@react-native-firebase/firestore';

// const App = () => {
//   const [email, setEmail] = useState('');
//   const [name, setName] = useState('');
//   const [phoneNumber, setPhoneNumber] = useState('');

// const handleSubmite = async () => {
//   // Check to make sure that the email and name fields are not empty.
//   if (!email || !name) {
//     alert('Please enter your email and name.');
//     return;
//   }

//   // Create a new document in the Cloud Firestore user collection.
//   const usersCollection = firestore.collection('user');
//   const userDoc = await usersCollection.add({
//     email,
//     name,
//     phoneNumber,
//   });

//   // Clear the form fields
//   setEmail('');
//   setName('');
//   setPhoneNumber('');

//   // Display a success message.
//   alert('Your information has been submitted successfully.');
// };

//   return (
//     <View style={styles.container}>
//       <Text>Email:</Text>
//       <TextInput
//         style={styles.textInput}
//         value={email}
//         onChangeText={(text) => setEmail(text)}
//       />

//       <Text>Name:</Text>
//       <TextInput
//         style={styles.textInput}
//         value={name}
//         onChangeText={(text) => setName(text)}
//       />

//       <Text>Phone Number:</Text>
//       <TextInput
//         style={styles.textInput}
//         value={phoneNumber}
//         onChangeText={(text) => setPhoneNumber(text)}
//       />

//       <Button title="Submit" onPress={handleSubmit} />
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   textInput: {
//     width: '80%',
//     borderColor: 'gray',
//     borderWidth: 1,
//     padding: 10,
//     marginBottom: 10,
//   },
// });

// export default App;