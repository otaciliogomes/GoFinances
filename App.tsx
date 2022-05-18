import React from 'react'
import {ThemeProvider} from 'styled-components'

import { theme } from './src/global'

import { Dashboard } from './src/screens'

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <Dashboard />
    </ThemeProvider>
  );
}
