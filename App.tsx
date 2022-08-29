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

import { Routes } from './src/routes'
import { StatusBar } from 'react-native'
import { SignIn } from './src/screens'
import { AuthProvider, useAuth } from './src/hooks/auth'

export default function App() {
  try {
    SplashScreen.preventAutoHideAsync();
    const [fontsLoaded] = useFonts({
      Poppins_400Regular,
      Poppins_500Medium,
      Poppins_700Bold
    });

    const { userStorageLoading } = useAuth()

    if (!fontsLoaded || userStorageLoading) {
      return null;
    }

    SplashScreen.hideAsync();
  } catch (error) {
    console.warn(error)
  }

  return (
    <ThemeProvider theme={theme}>
        <StatusBar barStyle={"light-content"}/>
        <AuthProvider>
          <Routes />
        </AuthProvider>
    </ThemeProvider>
  );
}
