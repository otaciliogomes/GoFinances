import 'intl'
import 'intl/locale-data/jsonp/pt-BR'

import React from 'react'
import { ThemeProvider } from 'styled-components'
import * as SplashScreen from 'expo-splash-screen'

import {
  useFonts,
  Poppins_400Regular,
  Poppins_500Medium,
  Poppins_700Bold
} from '@expo-google-fonts/poppins'
import { theme } from './src/global'
import { NavigationContainer } from '@react-navigation/native'

import { AppRoutes } from './src/routes/app.routes'
import { StatusBar } from 'react-native'
import { SignIn } from './src/screens'

export default function App() {
  try {
    SplashScreen.preventAutoHideAsync();
    const [fontsLoaded] = useFonts({
      Poppins_400Regular,
      Poppins_500Medium,
      Poppins_700Bold
    });

    if (!fontsLoaded) {
      return null;
    }

    SplashScreen.hideAsync();
  } catch (error) {
    console.warn(error)
  }

  return (
    <ThemeProvider theme={theme}>
      <NavigationContainer>
        <SignIn />
        <StatusBar barStyle={"light-content"}/>
      </NavigationContainer>
    </ThemeProvider>
  );
}
