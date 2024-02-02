import * as React from 'react';
import {View, StyleSheet, Text} from 'react-native';
import {useTheme} from '../Templates/PSTheme';
import {TextInput} from 'react-native-gesture-handler';

export function PSInputText(_props: any) {
  const theme = useTheme();

  return (
    <View style={[styles.center, theme]}>
      <TextInput
        ti
      
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  block: {
    margin: 10,
    padding: 10,
    borderRadius: 5,
    shadowColor: 'blue',
    shadowOpacity: 0.7,
    borderWidth: 1,
    borderShadow: true,
  },
  dark: {
    backgroundColor: 'rgb(0, 0, 0)',
  },
  black: {
    backgroundColor: 'rgb(27, 26, 23)',
  },
  yellow: {
    backgroundColor: 'rgb(240, 165, 0)',
  },
  orange: {
    backgroundColor: 'rgb(228, 88, 38)',
  },
  light: {
    backgroundColor: 'rgb(230, 213, 184)',
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
    borderColor: 'red',
    shadowColor: 'blue',
    shadowOpacity: 0.7,
    baseText: {
      fontFamily: 'Cochin',
    },
    titleText: {
      fontSize: 20,
      fontWeight: 'bold',
    },
    color: 'white',
  },
});

export default PSInputText;
