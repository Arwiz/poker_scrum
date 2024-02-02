/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  StatusBar,
  Text,
  useColorScheme,
  View,
  StyleSheet,
  TextInput,
  Alert,
  Button,
} from 'react-native';
import {PSText24} from '../atom/PSText';
import {PSButtonGeneral} from '../atom/PSButton';
import Box from '../atom/Box';
import {PSColors} from '../../Utility/PSColors';
import SocketIOClient from 'socket.io-client';
import axios from 'axios';
import {getToken} from '../../Utility/Utility';

export interface User {
  _id?: string;
  email: string;
  password: string;
}

export class SocketHandler {
  static get_instance() {
    let socket;
    const token = getToken();
    if (token) {
      if (!socket && token) {
        socket = SocketIOClient('http://localhost:3000', {query: {token}});
      }
      return socket;
    }
    return undefined;
  }
}

function Register({navigation}: any): JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? PSColors.dark : PSColors.light,
    flex: 1,
  };

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');

  const registerUser = async (user: User) => {
    try {
      const headers = {
        Authorization: 'Bearer YourAccessToken',
        'Content-Type': 'application/json',
      };

      axios
        .post('http://localhost:3000/api/users', user, {headers})
        .then((response: any) => {
          // Handle the response data here
          console.log(response.data);
        })
        .catch(error => {
          // Handle any errors here
          console.log(error);
        });
      // setData(result);
      // If user register successfully then redirect login page
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleRegister = () => {
    if (!email || !password) {
      Alert.alert('Error', 'Please fill in all fields.');
      return;
    }
    if (password !== passwordConfirm) {
      Alert.alert('Error', 'Password doesn,t match.');
      return;
    }

    registerUser({email, password});
  };

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />
      <View
        style={{
          backgroundColor: isDarkMode ? PSColors.black : PSColors.light,
        }}>
        <Box>
          <PSText24 title="Register" />
          <TextInput
            style={styles.input}
            placeholder="Email"
            placeholderTextColor={'gray'}
            onChangeText={setEmail}
            value={email}
          />
          <TextInput
            style={styles.input}
            placeholder="Password"
            placeholderTextColor={'gray'}
            secureTextEntry
            onChangeText={setPassword}
            value={password}
          />
          <TextInput
            style={styles.input}
            placeholder="Confirm Password"
            placeholderTextColor={'gray'}
            secureTextEntry
            onChangeText={setPasswordConfirm}
            value={passwordConfirm}
          />
          <PSButtonGeneral onPress={handleRegister} title="Register" />
          <PSButtonGeneral
            onPress={() => navigation.replace('Login')}
            title="Login"
          />
        </Box>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
  },
  header: {
    fontSize: 24,
    marginBottom: 16,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 16,
    paddingLeft: 8,
  },
});

export default Register;
