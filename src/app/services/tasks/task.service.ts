import { API_BASE_URL } from '../../config/constants';
import AsyncStorage from '@react-native-async-storage/async-storage';

export interface AvailableService {
  location: string;
  subLocation: string;
  service: string;
}

export const useTaskService = () => {
  const getToken = async (): Promise<string> => {
    try {
      const token = await AsyncStorage.getItem('token');
      if (!token) {
        throw new Error('No token found');
      }
      return token;
    } catch (error) {
      console.error('Error getting token:', error);
      throw error;
    }
  };

  const getAvailableServices = async (): Promise<AvailableService> => {
    try {
      const token = await getToken();
      console.log('Making API request to:', `${API_BASE_URL}/api/available-services`);
      console.log('Request headers:', {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      });

      const response = await fetch(`${API_BASE_URL}/api/available-services`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      console.log('API Response status:', response.status);
      console.log('API Response headers:', response.headers);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log('API Response data:', data);
      return data;
    } catch (error) {
      console.error('Error fetching available services:', error);
      throw error;
    }
  };

  return {
    getAvailableServices,
  };
};

export default useTaskService;
