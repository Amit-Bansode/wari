import React, { useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../types/navigation';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Type for navigation props
// If you haven't created RootStackParamList, I'll add it in types/navigation.ts

type Props = NativeStackScreenProps<RootStackParamList, 'Splash'>;

const SplashScreen: React.FC<Props> = ({ navigation }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      console.log('SplashScreen: Checking for token...');
      console.log('SplashScreen: Token:', AsyncStorage.getItem('token'));
      AsyncStorage.getItem('token').then((token: string | null) => {
        console.log('SplashScreen: Token found:', token ? 'Yes' : 'No');
        if (token) {
          navigation.replace('MainTabs');
        } else {
          navigation.replace('Login');
        }
      });
    }, 2000);
    return () => clearTimeout(timer);
  }, [navigation]);

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Wari</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  text: {
    fontSize: 44,
    fontWeight: 'bold',
  },
});

export default SplashScreen; 