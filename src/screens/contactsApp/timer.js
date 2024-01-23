/**************************  Google Analytics Time Tracker Code (BARD + ChatGPT) - V4  **************************/

import React, { useState, useEffect, useRef } from 'react';
import { View, Text, Button, AppState } from 'react-native';

import analytics from '@react-native-firebase/analytics';

const Timer = () => {
  const [elapsedTime, setElapsedTime] = useState(0);
  const timerIntervalRef = useRef(null);
  const [isTrackingTime, setIsTrackingTime] = useState(false);

  const startTimer = () => {
    if (timerIntervalRef.current) {
      clearInterval(timerIntervalRef.current);
    }

    let startTime = Date.now();
    timerIntervalRef.current = setInterval(() => {
      const currentTime = Date.now();
      const elapsedSeconds = Math.floor((currentTime - startTime) / 1000);
      setElapsedTime(elapsedSeconds);
    }, 1000);

    setIsTrackingTime(true);
  };

  const stopTimer = () => {
    if (timerIntervalRef.current) {
      clearInterval(timerIntervalRef.current);
      timerIntervalRef.current = null;
    }

    if (isTrackingTime) {
      analytics().logEvent('time_spent_on_screen', {
        screenName: 'HomeScreen',
        timeSpent: elapsedTime,
      });

      console.log(`Elapsed Time: ${elapsedTime} seconds`);

      setIsTrackingTime(false);
    }
  };

  const handleAppStateChange = (nextAppState) => {
    console.log(`App State: ${nextAppState}`);

    if (nextAppState === 'background') {
      stopTimer();
    }
  };

  useEffect(() => {
    startTimer();

    AppState.addEventListener('change', handleAppStateChange);

    return () => {
      stopTimer();
      AppState.removeEventListener('change', handleAppStateChange);
    };
  }, []);

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text style={{ fontSize: 24, color: 'black' }}>Elapsed Time: {elapsedTime} seconds</Text>
      <Button title="Start Timer" onPress={startTimer} disabled={isTrackingTime} />
      <Button title="Stop Timer" onPress={stopTimer} disabled={!isTrackingTime} />
    </View>
  );
};

export default Timer;









/**************************  Google Analytics Time Tracker Code (BARD) - V3  **************************/


// import React, { useState, useEffect } from 'react';
// import { View, Text, Button, AppState } from 'react-native';

// import analytics from '@react-native-firebase/analytics';

// const Timer = () => {
//   const [elapsedTime, setElapsedTime] = useState(0);
//   const [timerInterval, setTimerInterval] = useState(null);
//   const [isTrackingTime, setIsTrackingTime] = useState(false);

//   const startTimer = () => {
//     if (timerInterval) {
//       clearInterval(timerInterval);
//     }

//     let startTime = Date.now();
//     const interval = setInterval(() => {
//       const currentTime = Date.now();
//       const elapsedSeconds = Math.floor((currentTime - startTime) / 1000);
//       setElapsedTime(elapsedSeconds);
//     }, 1000);

//     setTimerInterval(interval);
//     setIsTrackingTime(true);
//   };

//   const stopTimer = () => {
//     if (timerInterval) {
//       clearInterval(timerInterval);
//       setTimerInterval(null);
//     }

//     if (isTrackingTime) {
//       analytics().logEvent('time_spent_on_screen', {
//         screenName: 'TimerScreen',
//         timeSpent: elapsedTime,
//       });

//       setIsTrackingTime(false);
//       console.log(elapsedTime);//show times recorded when timer is stopped
//     }
//   };

//   const handleAppStateChange = (nextAppState) => {
//     if (nextAppState === 'inactive' || nextAppState === 'background') {
//       stopTimer();
//     }
//   };

//   useEffect(() => {
//     startTimer();

//     AppState.addEventListener('change', handleAppStateChange);

//     return () => {
//       stopTimer();
//       AppState.removeEventListener('change', handleAppStateChange);
//     };
//   }, []);

//   return (
//     <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
//       <Text style={{ fontSize: 24, color: 'black' }}>Elapsed Time: {elapsedTime} seconds</Text>
//       <Button title="Start Timer" onPress={startTimer} disabled={isTrackingTime} />
//       <Button title="Stop Timer" onPress={stopTimer} disabled={!isTrackingTime} />
//     </View>
//   );
// };

// export default Timer;




/**************************  Google Analytics Time Tracker Code (BARD) - V2  **************************/
//Does not fit the required functions


// import React, { useState, useEffect } from 'react';
// import { View, Text, Button } from 'react-native';
// import { BackHandler } from 'react-native';

// import firestore from '@react-native-firebase/firestore';
// import crashlytics from '@react-native-firebase/crashlytics';
// import analytics from '@react-native-firebase/analytics';

// const Timer = () => {
//   const [elapsedTime, setElapsedTime] = useState(0); // State variable for elapsed time
//   const [timerInterval, setTimerInterval] = useState(null); // State variable for timer interval
//   const [isTrackingTime, setIsTrackingTime] = useState(false); // State for tracking time status

//   const startTimer = () => {
//     if (timerInterval) {
//       clearInterval(timerInterval); // Clear previous interval if running
//     }

//     let startTime = Date.now(); // Start time reference
//     const interval = setInterval(() => {
//       const currentTime = Date.now();
//       const elapsedSeconds = Math.floor((currentTime - startTime) / 1000); // Elapsed time in seconds
//       setElapsedTime(elapsedSeconds); // Update elapsed time state
//     }, 1000); // Interval of 1 second

//     setTimerInterval(interval); // Store interval reference
//     setIsTrackingTime(true); // Set tracking status to true
//   };

//   const stopTimer = () => {
//     if (timerInterval) {
//       clearInterval(timerInterval); // Clear the interval
//       setTimerInterval(null); // Reset interval state
//     }

//     // Send Google Analytics event with time spent
//     if (isTrackingTime) {
//       analytics().logEvent('time_spent_on_screen', {
//         screenName: 'HomeScreen', // Replace with the current screen name
//         timeSpent: elapsedTime,
//       });

//       setIsTrackingTime(false); // Reset tracking status
//       console.log(elapsedTime);
//     }
//   };

//   useEffect(() => {
//     // Start timer when the component mounts
//     startTimer();

//     // Handle back button press to stop the timer
//     const backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
//       stopTimer();
//       return true; // Prevent default back button behavior
//     });

//     return () => {
//       // Remove back button event listener on component unmount
//       BackHandler.removeEventListener('hardwareBackPress', backHandler);

//       // Stop timer and send Google Analytics event when the component unmounts
//       stopTimer();
//     };
//   }, []); // Empty dependency array to run effect only once on mount

//   return (
//     <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
//       <Text style={{ fontSize: 24, color: 'black' }}>Elapsed Time: {elapsedTime} seconds</Text>

//       <Button title="Start Timer" onPress={startTimer} disabled={isTrackingTime} />
//       <Button title="Stop Timer" onPress={stopTimer} disabled={!isTrackingTime} />
//     </View>
//   );
// };


// export default Timer;



/**************************  Google Analytics Time Tracker Code (BARD) - V1  **************************/

// //Includes 2 functions: startTimer & stopTimer which can be used multiple times to record elapsedTime
// //startTimer function starts the timer when the app is started. When the timer is stopped, this function can be used to start the timer again.
// //stopTimer is used on an onClick function to stop the timer.

// //It uploads the elapsedTime to Google Analytics with the following parameters:
// //screenName: 'HomeScreen' (name of current screen) & timeSpent: elapsedTime (duration of the timer recorded)


// import React, { useState, useEffect } from 'react';
// import { View, Text, Button } from 'react-native';

// import firestore from '@react-native-firebase/firestore';
// import crashlytics from '@react-native-firebase/crashlytics';
// import analytics from '@react-native-firebase/analytics';

// const Timer = () => {
//   const [elapsedTime, setElapsedTime] = useState(0); // State variable for elapsed time
//   const [timerInterval, setTimerInterval] = useState(null); // State variable for timer interval
//   const [isTrackingTime, setIsTrackingTime] = useState(false); // State for tracking time status

//   const startTimer = () => {
//     if (timerInterval) {
//       clearInterval(timerInterval); // Clear previous interval if running
//     }

//     let startTime = Date.now(); // Start time reference
//     const interval = setInterval(() => {
//       const currentTime = Date.now();
//       const elapsedSeconds = Math.floor((currentTime - startTime) / 1000); // Elapsed time in seconds
//       setElapsedTime(elapsedSeconds); // Update elapsed time state
//     }, 1000); // Interval of 1 second

//     setTimerInterval(interval); // Store interval reference
//     setIsTrackingTime(true); // Set tracking status to true
//   };

//   const stopTimer = () => {
//     if (timerInterval) {
//       clearInterval(timerInterval); // Clear the interval
//       setTimerInterval(null); // Reset interval state
//     }

//     // Send Google Analytics event with time spent
//     if (isTrackingTime) {
//       analytics().logEvent('time_spent_on_screen', {
//         screenName: 'HomeScreen', // Replace with the current screen name
//         timeSpent: elapsedTime,
//       });

//       setIsTrackingTime(false); // Reset tracking status
//     }
//   };

//   useEffect(() => {
//     // Start timer when the component mounts
//     startTimer();

//     // Stop timer and send Google Analytics event when the component unmounts
//     return () => {
//       stopTimer();
//     };
//   }, []); // Empty dependency array to run effect only once on mount

//   return (
//     <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
//       <Text style={{ fontSize: 24, color: 'black' }}>Elapsed Time: {elapsedTime} seconds</Text>

//       <Button title="Start Timer" onPress={startTimer} disabled={isTrackingTime} />
//       <Button title="Stop Timer" onPress={stopTimer} disabled={!isTrackingTime} />
//     </View>
//   );
// };

// export default Timer;