import React from 'react';
import {NavigationContainer} from '@react-navigation/native'
import AppNavigator from './app/navigation/AppNavigator'
import AudioListItem from './app/components/AudioListItem'
import {View} from 'react-native';

//import AudioProvider from './app/context/AudioProvider'

export default function App() {
  return (
    <NavigationContainer>
      <AppNavigator />
    </NavigationContainer>
  );
}
