import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Image } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import profileImg from '../../assets/icons/profile.png';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../types/navigation';
import backImg from '../../assets/icons/back.png';

const EditProfileScreen: React.FC = () => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const [name, setName] = useState('Samar Talpade');
  const [email, setEmail] = useState('samtalpade@gmail.com');
  const [password, setPassword] = useState('');
  const [dob, setDob] = useState(new Date(1995, 4, 23));
  const [showDatePicker, setShowDatePicker] = useState(false);

  const handleDateChange = (event: any, selectedDate?: Date) => {
    setShowDatePicker(false);
    if (selectedDate) setDob(selectedDate);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.backArrow} onPress={() => navigation.goBack()}>
        <Image source={backImg} style={styles.backImg} />
      </TouchableOpacity>
      <Text style={styles.heading}>Edit Profile</Text>
      <View style={styles.profileImgContainer}>
        <Image source={profileImg} style={styles.profileImg} />
        <TouchableOpacity style={styles.cameraIcon}>
          <Text style={{ fontSize: 18, color: '#fff' }}>📷</Text>
        </TouchableOpacity>
      </View>
      <Text style={styles.label}>Name</Text>
      <TextInput style={styles.input} value={name} onChangeText={setName} />
      <Text style={styles.label}>Email</Text>
      <TextInput style={styles.input} value={email} onChangeText={setEmail} keyboardType="email-address" />
      <Text style={styles.label}>Password</Text>
      <TextInput style={styles.input} value={password} onChangeText={setPassword} secureTextEntry placeholder="**********" />
      <Text style={styles.label}>Date of Birth</Text>
      <TouchableOpacity style={styles.input} onPress={() => setShowDatePicker(true)}>
        <Text style={{ color: '#888' }}>{dob.toLocaleDateString('en-GB')}</Text>
      </TouchableOpacity>
      {showDatePicker && (
        <DateTimePicker
          value={dob}
          mode="date"
          display="default"
          onChange={handleDateChange}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    paddingTop: 40,
  },
  backArrow: {
    position: 'absolute',
    top: 40,
    left: 16,
    zIndex: 2,
  },
  backImg: {
    width: 24,
    height: 24,
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    alignSelf: 'center',
    marginTop: 16,
    marginBottom: 16,
  },
  profileImgContainer: {
    alignSelf: 'center',
    marginBottom: 24,
  },
  profileImg: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 2,
    borderColor: '#b3c0d1',
  },
  cameraIcon: {
    position: 'absolute',
    right: 0,
    bottom: 0,
    backgroundColor: '#6B7686',
    borderRadius: 16,
    padding: 4,
  },
  label: {
    fontWeight: 'bold',
    color: '#222',
    marginTop: 16,
    marginBottom: 4,
  },
  input: {
    backgroundColor: '#F6F5F7',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    marginBottom: 4,
  },
});

export default EditProfileScreen; 