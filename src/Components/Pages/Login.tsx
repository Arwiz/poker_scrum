/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

'use client';
import React, {useState} from 'react';
import {
  Button,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  useColorScheme,
  View,
} from 'react-native';

import {Colors} from 'react-native/Libraries/NewAppScreen';
import {PSColors} from '../../Utility/PSColors';
import {User} from './Register';
import axios from 'axios';
import {setToken} from '../../Utility/Utility';

function Login(props: any): JSX.Element {
  const navigation = props.navigation;

  const isDarkMode = useColorScheme() === 'dark';

  const [email, setEmail] = useState<string | undefined>('Arvind2@gmail.com');
  const [password, setPassword] = useState<string | undefined>('123');
  // const [showPassword, setShowPassword] = useState(false);

  const loginUser = async (user: User) => {
    try {
      const headers = {
        Authorization: 'Bearer YourAccessToken',
        'Content-Type': 'application/json',
      };

      axios
        .post('http://localhost:3000/login', user, {headers})
        .then((response: any) => {
          // Handle the response data here
          console.log(response.data);

          const data = response.data;
          if (data.token) {
            setToken(data.token);
            // Save token into local storage

            // navigation.replace('Home');
            navigation.replace('Home');
          }
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

  const handleLogin = () => {
    if (email && password) {
      loginUser({email, password});
    }
  };

  const backgroundStyle = {
    color: isDarkMode ? PSColors.light : PSColors.dark,
  };

  return (
    <SafeAreaView style={[styles.container, styles.black]}>
      <View style={[styles.container, styles.block, styles.dark]}>
        <Text style={[styles.label, backgroundStyle]}>Email:</Text>
        <TextInput
          style={styles.input}
          onChangeText={setEmail}
          value={email}
          placeholder="Email"
        />
        <Text style={[styles.label, backgroundStyle]}>Password:</Text>
        <TextInput
          style={styles.input}
          onChangeText={setPassword}
          value={password}
          placeholder="Enter your password"
          secureTextEntry={true}
        />
      </View>
      <Button title="Login" onPress={handleLogin} />
      <Button
        onPress={() => navigation.replace('Register')}
        title="Register User"
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  sectionContainer: {
    // marginTop: 32,
    // paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
  container: {
    flex: 1,
  },
  block: {
    margin: 10,
    padding: 10,
    borderRadius: 5,
    // shadowColor: 'blue',
    shadowOpacity: 0.7,
    borderWidth: 1,
    borderShadow: true,
  },
  dark: {
    backgroundColor: PSColors.dark,
  },
  black: {
    backgroundColor: PSColors.black,
  },
  yellow: {
    backgroundColor: PSColors.yellow,
  },
  orange: {
    backgroundColor: PSColors.orange,
  },
  light: {
    backgroundColor: PSColors.light,
  },

  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
  },
  input: {
    width: '100%',
    height: 40,
    borderWidth: 1,
    marginBottom: 16,
    paddingHorizontal: 8,
    borderRadius: 5,
    // borderColor: 'red',
    // shadowColor: 'blue',
    shadowOpacity: 0.7,
    // baseText: {
    //   fontFamily: 'Cochin',
    // },
    // titleText: {
    //   fontSize: 20,
    //   fontWeight: 'bold',
    // },
    color: 'white',
  },
});

export default Login;
