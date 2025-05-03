import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';

const TaskScreen = () => {
  const [serviceTime, setServiceTime] = useState('10:00 a.m');
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Task Available</Text>
      <Text style={styles.label}>Assigned Location</Text>
      <TextInput style={styles.input} value="Pune" editable={false} />
      <Text style={styles.label}>Sub location</Text>
      <TextInput style={styles.input} value="Mulshi" editable={false} />
      <Text style={styles.label}>Service</Text>
      <TextInput style={styles.input} value="Sanitation" editable={false} />
      <Text style={styles.label}>Service Timings</Text>
      <View style={styles.input}>
        <Picker
          selectedValue={serviceTime}
          onValueChange={itemValue => setServiceTime(itemValue)}
          style={{height: 40}}>
          <Picker.Item label="10:00 a.m" value="10:00 a.m" />
          <Picker.Item label="11:00 a.m" value="11:00 a.m" />
          <Picker.Item label="12:00 p.m" value="12:00 p.m" />
        </Picker>
      </View>
      <View style={styles.buttonRow}>
        <TouchableOpacity style={styles.backButton}><Text style={styles.buttonText}>Back</Text></TouchableOpacity>
        <TouchableOpacity style={styles.confirmButton}><Text style={styles.buttonText}>Confirm</Text></TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', padding: 20 },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20, color: '#6B7686' },
  label: { fontWeight: 'bold', color: '#6B7686', marginTop: 10 },
  input: { backgroundColor: '#F2F2F2', borderRadius: 10, padding: 10, marginTop: 5 },
  buttonRow: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 30 },
  backButton: { backgroundColor: '#AEB2B6', borderRadius: 10, padding: 15, flex: 1, marginRight: 10 },
  confirmButton: { backgroundColor: '#6B7686', borderRadius: 10, padding: 15, flex: 1, marginLeft: 10 },
  buttonText: { color: '#fff', textAlign: 'center', fontWeight: 'bold' },
});

export default TaskScreen; 