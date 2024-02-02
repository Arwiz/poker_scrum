/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import NavigationStack from './Navigation/Navigation';
import {PSThemeProvider} from './Components/Templates/PSTheme';

function App(): JSX.Element {
  return (
    <PSThemeProvider>
      <NavigationStack />
    </PSThemeProvider>
  );
}

export default App;
