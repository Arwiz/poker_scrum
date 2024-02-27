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
import {
  GoogleSignin,
  GoogleSigninButton,
  statusCodes,
} from '@react-native-google-signin/google-signin';

import {Colors} from 'react-native/Libraries/NewAppScreen';
import {PSColors} from '../../Utility/PSColors';
import {User} from './Register';
import axios from 'axios';
import {setCurrentUser, setToken} from '../../Utility/Utility';
import { useAuth } from '../contexts/AuthContext';

// GoogleSignin.configure({
//   scopes: ['https://www.googleapis.com/auth/drive.readonly'], // what API you want to access on behalf of the user, default is email and profile
//   webClientId: '<FROM DEVELOPER CONSOLE>', // client ID of type WEB for your server. Required to get the idToken on the user object, and for offline access.
//   offlineAccess: true, // if you want to access Google API on behalf of the user FROM YOUR SERVER
//   hostedDomain: '', // specifies a hosted domain restriction
//   forceCodeForRefreshToken: true, // [Android] related to `serverAuthCode`, read the docs link below *.
//   accountName: '', // [Android] specifies an account name on the device that should be used
//   iosClientId: '<FROM DEVELOPER CONSOLE>', // [iOS] if you want to specify the client ID of type iOS (otherwise, it is taken from GoogleService-Info.plist)
//   googleServicePlistPath: '', // [iOS] if you renamed your GoogleService-Info file, new name here, e.g. GoogleService-Info-Staging
//   openIdRealm: '', // [iOS] The OpenID2 realm of the home web server. This allows Google to include the user's OpenID Identifier in the OpenID Connect ID token.
//   profileImageSize: 120, // [iOS] The desired height (and width) of the profile image. Defaults to 120px
// });

function Login(props: any): JSX.Element {
  const navigation = props.navigation;
  const {setToken} = useAuth();

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
          console.log('Login ==>>', response.data);

          const data = response.data;
          if (data.token) {
            setToken(data.token);
            setCurrentUser(data.user);
            // navigation.replace('Home');
            // navigation.replace('Dashboard');
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

  const signInGoogle = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      // setState({userInfo});
      console.log('userInfo', userInfo);
    } catch (error: Error) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        // user cancelled the login flow
      } else if (error.code === statusCodes.IN_PROGRESS) {
        // operation (e.g. sign in) is in progress already
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        // play services not available or outdated
      } else {
        // some other error happened
      }
    }
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
      {/* <GoogleSigninButton
        size={GoogleSigninButton.Size.Wide}
        color={GoogleSigninButton.Color.Dark}
        onPress={signInGoogle}
        disabled={isSigninInProgress}
      /> */}
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
