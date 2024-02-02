import React from 'react';
import {View, useColorScheme} from 'react-native';
import {PSColors} from '../../Utility/PSColors';

function Box(props: any) {
  const isDarkMode = useColorScheme() === 'dark';
  if (isDarkMode) {
    return (
      <View
        style={{
          backgroundColor: PSColors.greeen_1,
          borderRadius: 10,
          margin: 5,
          padding: 10,
          shadowColor: '#000000',
          shadowOffset: {width: -2, height: 4},
          shadowOpacity: 0.2,
          shadowRadius: 3,
        }}>
        {props.children}
      </View>
    );
  }
  return (
    <View
      style={{
        backgroundColor: PSColors.yellow_1,
        borderRadius: 10,
        margin: 5,
        padding: 10,
        shadowColor: '#000000',
        shadowOffset: {width: -2, height: 4},
        shadowOpacity: 0.2,
        shadowRadius: 3,
      }}>
      {props.children}
    </View>
  );
}

export default Box;
