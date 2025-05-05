import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types/navigation';

const icons = {
  back: require('../assets/icons/back.png'),
  user: require('../assets/icons/profile.png'), // Replace with actual user icon if available
  clock: require('../assets/icons/clock.png'), // Replace with actual clock icon if available
  plus: require('../assets/icons/plus.png'),   // Replace with actual plus icon if available
};

const SanitationConfirmationScreen: React.FC = () => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const [toiletSpots, setToiletSpots] = useState([
    'Toilet Spot 1',
    'Toilet Spot 2',
  ]);

  const handleAddSpot = () => {
    setToiletSpots(prev => [
      ...prev,
      `Toilet Spot ${prev.length + 1}`
    ]);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.backArrow} onPress={() => navigation.goBack()}>
        <Image source={icons.back} style={styles.backImg} />
      </TouchableOpacity>
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <View style={styles.headerRow}>
          <Text style={styles.title}>Pune-Mulshi-Sanitation</Text>
          <Text style={styles.dateText}>(4/6/25, 10:00a.m)</Text>
        </View>
        <Text style={styles.sectionHeader}>Toilet Facility Details</Text>
        <View style={styles.greyBoxRow}>
          {toiletSpots.map((spot, idx) => (
            <View style={styles.greyBox} key={spot}>
              <Text style={styles.greyBoxText}>{spot}</Text>
              <Image source={icons.clock} style={styles.iconRight} />
            </View>
          ))}
          <TouchableOpacity style={styles.greyBox} onPress={handleAddSpot}>
            <Text style={styles.greyBoxText}>Add another toilet spot</Text>
            <Image source={icons.plus} style={styles.iconRight} />
          </TouchableOpacity>
        </View>
        <Text style={styles.sectionHeader}>Sanitation Inspection</Text>
        <View style={styles.greyBoxRow}>
          <View style={styles.greyBox}>
            <Text style={styles.greyBoxText}>Overall Sanitation</Text>
            <Image source={icons.clock} style={styles.iconRight} />
          </View>
        </View>
        <TouchableOpacity style={styles.submitButton} disabled>
          <Text style={styles.submitButtonText}>Submit</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    position: 'relative',
  },
  backArrow: {
    position: 'absolute',
    top: 40,
    left: 16,
    zIndex: 2,
  },
  backImg: {
    width: 28,
    height: 28,
    resizeMode: 'contain',
  },
  scrollContent: {
    paddingTop: 60,
    paddingHorizontal: 16,
    paddingBottom: 32,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#6B7686',
    marginRight: 8,
  },
  dateText: {
    fontSize: 12,
    color: '#888',
    marginTop: 4,
  },
  sectionHeader: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#6B7686',
    marginTop: 24,
    marginBottom: 12,
  },
  greyBoxRow: {
    marginBottom: 8,
  },
  greyBox: {
    backgroundColor: '#D9D9D9',
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 14,
    marginBottom: 12,
  },
  greyBoxText: {
    fontSize: 16,
    color: '#6B7686',
  },
  iconRight: {
    width: 20,
    height: 20,
    resizeMode: 'contain',
    marginLeft: 8,
  },
  submitButton: {
    backgroundColor: '#CBD0D6',
    borderRadius: 10,
    paddingVertical: 16,
    alignItems: 'center',
    marginTop: 32,
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default SanitationConfirmationScreen; 