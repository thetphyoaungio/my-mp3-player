import React from 'react';
import AppNavigator from '../navigation/AppNavigator';
import AudioProvider from '../context/AudioProvider';

export default function App() {
  return (
    <AudioProvider>
      <AppNavigator />
    </AudioProvider>
  );
}