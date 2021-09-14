import React from 'react';
import {NavigationContainer, DefaultTheme} from '@react-navigation/native';
import AppNavigator from './app/navigation/AppNavigator';
import AudioProvider from './app/context/AudioProvider';
import color from './app/misc/color';
import {AdMobInterstitial} from 'expo-ads-admob';

const MyTheme = {
  ...DefaultTheme,
  colors:{
    ...DefaultTheme.colors,
    background: color.APP_BG,
  }
}

export default function App() {
  // Android interstitial: ca-app-pub-5889748970088125/8654853900

  const setAdMobInterstitial = async () => {
    AdMobInterstitial.setAdUnitID('ca-app-pub-5889748970088125/8654853900');
    await AdMobInterstitial.requestAdAsync({servePersonalizedAds:false});
    await AdMobInterstitial.showAdAsync();
  }
  
  setAdMobInterstitial();

  return (
    <AudioProvider>
      <NavigationContainer theme={MyTheme}>
        <AppNavigator />
      </NavigationContainer>
    </AudioProvider>
  );
}
