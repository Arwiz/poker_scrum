import React from 'react';
// import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import Home from '../Components/Pages/Home';
import Login from '../Components/Pages/Login';
import Register from '../Components/Pages/Register';
import PokerRoom from '../Components/Pages/PokerRoom';
import StoryList from '../Components/Pages/StoryList';
import StoryDetail from '../Components/Pages/StoryDetail';
import ChatRoom from '../Components/Pages/ChatRoom';
import ContactScreen from '../Components/Pages/Contacts';
import OneToOneChatScreen from '../Components/Pages/OneToOneChat';
import ConversationScreen from '../Components/Pages/Conversations';
import ConversationDetailScreen from '../Components/Pages/ConvertionDetail';
import {getToken} from '../Utility/Utility';
import {useAuth} from '../Components/contexts/AuthContext';
import {Button} from 'react-native';

const Stack = createNativeStackNavigator();

export default function TabNavigation() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="Chats" component={ChatNavigationStack} options={{headerShown: false}} />
      <Tab.Screen name="ContactScreen" component={ContactScreen} />
    </Tab.Navigator>
  );
}

function NavigationStack() {
  const {token} = useAuth();

  if (token) {
    return (
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="TabNavigator"
            component={TabNavigation}
            options={{headerShown: false}} // Hide the navigation bar
          />
        </Stack.Navigator>
      </NavigationContainer>
      // <NavigationContainer>
      //   <Stack.Navigator>
      //     <Stack.Screen name="Login" component={Login} />
      //     <Stack.Screen name="Register" component={Register} />
      //     <Stack.Screen name="Dashboard" component={Dashboard} />
      //     <Stack.Screen name="PokerRoom" component={ChatRoom} />
      //     <Stack.Screen name="StoryList" component={StoryList} />
      //     <Stack.Screen name="ContactScreen" component={ContactScreen} />
      //     <Stack.Screen name="OneToOne" component={OneToOneChatScreen} />
      //     <Stack.Screen name="ConversationDetail" component={ConversationDetailScreen} />

      //     {/* <Stack.Screen name="StoryDetail" component={StoryDetail} /> */}
      //   </Stack.Navigator>
      // </NavigationContainer>
    );
  }
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Login"
          component={Login}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Register"
          component={Register}
          options={{headerShown: false}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

function ChatNavigationStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="ConversationScreen"
        component={ConversationScreen}
        options={({navigation}) => ({
          headerRight: () => {
            return (
              <Button
                title="user"
                onPress={() => navigation.navigate('Contacts')}
              />
            );
          },
        })}
      />
      <Stack.Screen
        name="Contacts"
        component={ContactScreen}
        // options={{presentation: 'modal'}}
      />
      <Stack.Screen
        name="ConversationDetail"
        component={ConversationDetailScreen}
      />
    </Stack.Navigator>
  );
}

const Tab = createBottomTabNavigator();

export const Dashboard = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="Chats" component={ChatNavigationStack} />
      <Tab.Screen name="ContactScreen" component={ContactScreen} />
    </Tab.Navigator>
  );
};

export default NavigationStack;
