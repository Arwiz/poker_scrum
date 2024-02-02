import React from 'react';
// import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import Home from '../Components/Pages/Home';
import Login from '../Components/Pages/Login';
import Register from '../Components/Pages/Register';
import PokerRoom from '../Components/Pages/PokerRoom';
import StoryList from '../Components/Pages/StoryList';
import StoryDetail from '../Components/Pages/StoryDetail';

const Stack = createNativeStackNavigator();

function NavigationStack() {
  const isLoggedIn = true;

  if (isLoggedIn) {
    return (
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="Register" component={Register} />
          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen name="PokerRoom" component={PokerRoom} />
          <Stack.Screen name="StoryList" component={StoryList} />
          {/* <Stack.Screen name="StoryDetail" component={StoryDetail} /> */}
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={Home} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default NavigationStack;
