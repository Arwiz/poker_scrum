// import React from 'react';
// import {Button} from 'react-native';

// function PSButtonGeneral(_props: any) {
//   return <Button {..._props} style={{}} />;
// }

import React from 'react';
import {TouchableOpacity, Text, Button, StyleSheet, View} from 'react-native';
import {PSColors} from '../../Utility/PSColors';

interface CustomButtonProps {
  title: string;
  onPress: () => void;
  buttonStyle?: object;
  textStyle?: object;
}

export const PSButtonGeneral: React.FC<CustomButtonProps> = ({
  title,
  onPress,
  buttonStyle,
  textStyle,
}) => {
  return (
    <TouchableOpacity onPress={onPress} style={[styles.button, buttonStyle]}>
      <Text style={[styles.buttonText, textStyle]}>{title}</Text>
    </TouchableOpacity>
  );
};

export function PSButton(_props: any) {
  return <Button {..._props} />;
}

interface CircularButtonProps {
  title: string;
  onPress: () => void;
}

export const PSCircularButton: React.FC<CircularButtonProps> = ({
  title,
  onPress,
}) => {
  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <Text style={styles.buttonText}>{title}</Text>
    </TouchableOpacity>
  );
};

interface CircularButtonProps {
  title: string;
  onPress: () => void;
  buttonStyle: object;
}

export const PSPokerButton: React.FC<CircularButtonProps> = ({
  title,
  onPress,
  buttonStyle,
}) => {
  return (
    <TouchableOpacity style={[styles.button, buttonStyle]} onPress={onPress}>
      <View style={styles.button}>
        <Text style={styles.buttonText}>{title}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: PSColors.greeen_4, // Background color of the button
    borderRadius: 25, // Adjust the value to control the roundness of corners
    paddingVertical: 10,
    paddingHorizontal: 20,
    alignItems: 'center',
    margin: 5,
  },
  buttonText: {
    color: 'white', // Text color of the button title
    fontSize: 16, // Adjust font size as needed
    fontWeight: 'bold', // Adjust font weight as needed
  },

  buttonContainer: {
    backgroundColor: 'blue', // Background color of the button container
    borderRadius: 10, // Adjust the value to control the roundness of corners
    overflow: 'hidden', // Clip child elements to the rounded corners
    margin: 5,
  },
});
