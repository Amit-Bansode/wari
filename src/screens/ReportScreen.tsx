import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const ReportScreen = () => (
  <View style={styles.container}>
    <Text style={styles.text}>Report Screen</Text>
  </View>
);

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#fff' },
  text: { fontSize: 20, color: '#6B7686' },
});

export default ReportScreen; 