import React from 'react';
import {StyleSheet, Text, useColorScheme} from 'react-native';
import {PSColors} from '../../Utility/PSColors';

export function PSText16({title}: {title: string}) {
  return <Text style={[styles.text16]}>{title}</Text>;
}
export function PSText18({title}: {title: string}) {
  return <Text style={[styles.text18]}>{title}</Text>;
}

export function PSText20({title}: {title: string}) {
  return <Text style={[styles.text20]}>{title}</Text>;
}

export function PSText22({title}: {title: string}) {
  return <Text style={[styles.text22]}>{title}</Text>;
}

export function PSText24({title}: {title: string}) {
  const isDarkMode = useColorScheme() === 'dark';
  return (
    <Text
      style={[
        styles.text24,
        {color: isDarkMode ? PSColors.dark : PSColors.light},
      ]}>
      {title}
    </Text>
  );
}

const styles = StyleSheet.create({
  text16: {
    fontFamily: 'Helvetica',
    fontSize: 16,
  },
  text18: {
    fontFamily: 'Helvetica',
    fontSize: 18,
    marginVertical: 4,
  },
  text20: {
    fontFamily: 'Helvetica',
    fontSize: 20,
    marginVertical: 6,
  },
  text22: {
    fontFamily: 'Helvetica',
    fontSize: 22,
    marginVertical: 8,
  },
  text24: {
    fontFamily: 'Helvetica',
    fontSize: 24,
    marginVertical: 10,
  },
});
