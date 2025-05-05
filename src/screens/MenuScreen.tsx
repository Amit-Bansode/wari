import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types/navigation';

const icons = {
  profile: require('../assets/icons/profile.png'),
  help: require('../assets/icons/help.png'), // Provide this icon
  language: require('../assets/icons/language.png'), // Provide this icon
  back: require('../assets/icons/back.png'),
};

const MenuScreen: React.FC = () => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.backArrow} onPress={() => navigation.goBack()}>
        <Image source={icons.back} style={styles.backImg} />
      </TouchableOpacity>
      <Text style={styles.heading}>Menu</Text>
      <View style={styles.menuBox}>
        <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate('EditProfile')}>
          <Image source={icons.profile} style={styles.icon} />
          <Text style={styles.menuText}>Edit profile</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.menuItem} onPress={() => {}}>
          <Image source={icons.help} style={styles.icon} />
          <Text style={styles.menuText}>Help & Support</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate('LanguageSelection')}>
          <Image source={icons.language} style={styles.icon} />
          <Text style={styles.menuText}>Language</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 40,
    paddingHorizontal: 16,
  },
  backArrow: {
    position: 'absolute',
    top: 40,
    left: 16,
    zIndex: 2,
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    alignSelf: 'center',
    marginTop: 16,
    marginBottom: 32,
  },
  menuBox: {
    backgroundColor: '#f6f6f9',
    borderRadius: 10,
    padding: 20,
    marginTop: 40,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
  },
  icon: {
    width: 28,
    height: 28,
    marginRight: 16,
    resizeMode: 'contain',
    tintColor: '#444',
  },
  menuText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#222',
  },
  backImg: {
    width: 28,
    height: 28,
    resizeMode: 'contain',
  },
});

export default MenuScreen; 