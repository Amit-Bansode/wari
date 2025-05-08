import React, {useState, useEffect, useCallback} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  SafeAreaView,
  AppState,
  ActivityIndicator,
} from 'react-native';
import {Picker} from '@react-native-picker/picker';
import profileImg from '../assets/icons/profile.png';
import hamburgerImg from '../assets/icons/hamburger.png';
import { SafeAreaView as SafeAreaViewRN } from 'react-native-safe-area-context';
import { useLocation } from '../context/LocationContext';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types/navigation';
import { useTaskService } from '../app/services/tasks/task.service';

interface Location {
  id: string;
  name: string;
}

interface Services {
  serviceId: string;
  name: string;
}

interface TaskData {
  location: Location;
  subLocation: Location;
  services: Services[];
}

const TaskScreen = () => {
  const [serviceTime, setServiceTime] = useState('10:00 a.m');
  const { location, loading, error } = useLocation();
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const [taskData, setTaskData] = useState<TaskData>({
    location: {
      id: '',
      name: ''
    },
    subLocation: {
      id: '',
      name: ''
    },
    services: []
  });
  const [isLoading, setIsLoading] = useState(true);
  const { getAvailableServices } = useTaskService();

  useFocusEffect(
    useCallback(() => {
      console.log('TaskScreen: Fetching task data...');
      fetchTaskData();
    }, [])
  );

  useEffect(() => {
    const subscription = AppState.addEventListener('change', nextAppState => {
      if (nextAppState === 'active') {
        console.log('App came to foreground, fetching task data...');
        fetchTaskData();
      }
    });

    return () => {
      subscription.remove();
    };
  }, []);

  const fetchTaskData = async () => {
    try {
      const data = await getAvailableServices();
      console.log('TaskScreen: Task data:', data);
      
      if (!data) {
        throw new Error('No data received from API');
      }

      // Ensure the data is in the correct format
      const location = typeof data.location === 'string' 
        ? JSON.parse(data.location) 
        : data.location || { id: '', name: '' };

      const subLocation = typeof data.subLocation === 'string'
        ? JSON.parse(data.subLocation)
        : data.subLocation || { id: '', name: '' };

      console.log('TaskScreen: Services:', data.services);
      const services = typeof data.services === 'string'
        ? JSON.parse(data.services)
        : data.services || [];

      setTaskData({
        location,
        subLocation,
        services
      });
    } catch (error: any) {
      console.log('TaskScreen: Error fetching task data:', error?.message || 'Unknown error');
      console.error('Error fetching task data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <SafeAreaViewRN style={styles.container} edges={['top']}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.iconContainer} onPress={() => navigation.navigate('EditProfile')}>
          <Image source={profileImg} style={styles.iconImg} />
        </TouchableOpacity>
        <View style={{flex: 1}} />
        <TouchableOpacity style={styles.iconContainer} onPress={() => navigation.navigate('Menu')}>
          <Image source={hamburgerImg} style={styles.iconImg} />
        </TouchableOpacity>
      </View>
      <Text style={styles.title}>Task Available</Text>
      
      {isLoading ? (
        <View style={styles.loaderContainer}>
          <ActivityIndicator size="large" color="#6B7686" />
          <Text style={styles.loadingText}>Loading task data...</Text>
        </View>
      ) : (
        <>
          <Text style={styles.label}>Assigned Location</Text>
          <TextInput style={styles.input} value={taskData.location?.name} editable={false} />
          <Text style={styles.label}>Sub location</Text>
          <TextInput style={styles.input} value={taskData.subLocation?.name} editable={false} />
          <Text style={styles.label}>Service</Text>
          <TextInput style={styles.input} value={taskData.services.map(service => service.name).join(', ')} editable={false} />
          {/* <Text style={styles.label}>Service Timings</Text>
          <View style={styles.input}>
            <Picker
              selectedValue={serviceTime}
              onValueChange={itemValue => setServiceTime(itemValue)}
              style={{height: 40}}>
              <Picker.Item label="10:00 a.m" value="10:00 a.m" />
              <Picker.Item label="11:00 a.m" value="11:00 a.m" />
              <Picker.Item label="12:00 p.m" value="12:00 p.m" />
            </Picker>
          </View> */}
          <View style={styles.buttonRow}>
            <TouchableOpacity style={styles.backButton}>
              <Text style={styles.buttonText}>Back</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.confirmButton} onPress={() => navigation.navigate('SanitationConfirmation')}>
              <Text style={styles.buttonText}>Confirm</Text>
            </TouchableOpacity>
          </View>
        </>
      )}
      
      <View style={styles.latLonContainer}>
        {loading && <Text style={styles.latLonText}>Getting location...</Text>}
        {error && <Text style={[styles.latLonText, { color: 'red' }]}>{error}</Text>}
        {location && (
          <Text style={styles.latLonText}>
            Lat: {location.latitude}  Lon: {location.longitude}
          </Text>
        )}
      </View>
    </SafeAreaViewRN>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: '#fff', paddingLeft: 20, paddingRight: 20},
  title: {fontSize: 24, fontWeight: 'bold', marginBottom: 20, color: '#6B7686'},
  label: {fontWeight: 'bold', color: '#6B7686', marginTop: 20},
  input: {
    backgroundColor: '#F2F2F2',
    borderRadius: 10,
    padding: 10,
    marginTop: 5,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 30,
  },
  backButton: {
    backgroundColor: '#AEB2B6',
    borderRadius: 10,
    padding: 15,
    flex: 1,
    marginRight: 10,
  },
  confirmButton: {
    backgroundColor: '#6B7686',
    borderRadius: 10,
    padding: 15,
    flex: 1,
    marginLeft: 10,
  },
  buttonText: {color: '#fff', textAlign: 'center', fontWeight: 'bold'},
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  iconImg: {
    width: 28,
    height: 28,
    resizeMode: 'contain',
  },
  iconContainer: {
  },
  latLonContainer: {
    position: 'absolute',
    bottom: 20,
    left: 0,
    right: 0,
    alignItems: 'center',
  },
  latLonText: {
    color: '#6B7686',
    fontSize: 14,
  },
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 50,
  },
  loadingText: {
    marginTop: 10,
    color: '#6B7686',
    fontSize: 16,
  },
});

export default TaskScreen;
