import React, { useCallback, useEffect, useState } from 'react'
import {ThemeProvider} from 'styled-components'
import * as SplashScreen from 'expo-splash-screen'
import { 
  Poppins_400Regular,
  Poppins_500Medium,
  Poppins_700Bold
} from '@expo-google-fonts/poppins'
import * as Font from 'expo-font'
import { theme } from './src/global'

import { Dashboard } from './src/screens'

export default function App() {
  const [appIsReady, setAppIsReady] = useState(false)

  useEffect(() => {
    async function appLoading ( ) {
      try { 
        await SplashScreen.preventAutoHideAsync()

        await Font.loadAsync({
          Poppins_400Regular,
          Poppins_500Medium,
          Poppins_700Bold
        })
      } catch (error) {
        console.warn(error)
      } finally {
        setAppIsReady(true)
      }
    }
    appLoading()
  }, [])


  useCallback(async () => {
    if (appIsReady) {
      // This tells the splash screen to hide immediately! If we call this after
      // `setAppIsReady`, then we may see a blank screen while the app is
      // loading its initial state and rendering its first pixels. So instead,
      // we hide the splash screen once we know the root view has already
      // performed layout.
      await SplashScreen.hideAsync();
    }
  }, [appIsReady]);
 
  if (!appIsReady) {
    return null;
  }
  return (
    <ThemeProvider theme={theme}>
      <Dashboard />
    </ThemeProvider>
  );
}
