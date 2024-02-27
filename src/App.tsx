/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */
if (__DEV__) {
  import('./ReactotronConfig').then(() => console.log('Reactotron Configured'));
}

import React from 'react';
import NavigationStack from './Navigation/Navigation';
import {PSThemeProvider} from './Components/Templates/PSTheme';
import {AuthProvider} from './Components/contexts/AuthContext';
import {SocketProvider} from './Components/contexts/SocketContext';

function App(): JSX.Element {
  return (
    <AuthProvider>
      <PSThemeProvider>
        <SocketProvider>
          <NavigationStack />
        </SocketProvider>
      </PSThemeProvider>
    </AuthProvider>
  );
}

export default App;
