import React, { useState, useEffect } from 'react';
import { View, Text, Button } from 'react-native';
import { GoogleAnalyticsTracker } from 'react-native-google-analytics-bridge';

const HomeScreen = () => {
  const [sessionStartTime, setSessionStartTime] = useState(null);
  const tracker = new GoogleAnalyticsTracker('416885507'); // Replace with your actual tracking ID

  const startSession = () => {
    setSessionStartTime(new Date());
    tracker.trackScreenView('Home Screen'); // Optional: Track screen view
  };

  const stopSession = () => {
    if (sessionStartTime) {
      const sessionDuration = Math.round((new Date() - sessionStartTime) / 1000); // Convert to seconds
      tracker.trackTiming('Session', sessionDuration, { name: 'duration' });
    }
  };

  useEffect(() => {
    // Cleanup function to stop the session when the component unmounts
    return () => stopSession();
  }, []);

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text style={{color:'black'}}>React Native Google Analytics</Text>
      <Button title="Start Session" onPress={startSession} />
      {/* Your application content */}
    </View>
  );
};

export default HomeScreen;
