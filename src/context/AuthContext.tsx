import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface AuthContextType {
  token: string | null;
  setToken: (token: string) => Promise<void>;
  clearToken: () => Promise<void>;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [token, setTokenState] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Load token from AsyncStorage when the app starts
    loadToken();
  }, []);

  const loadToken = async () => {
    try {
      console.log('Attempting to load token from AsyncStorage...');
      const storedToken = await AsyncStorage.getItem('auth_token');
      console.log('Token loaded from AsyncStorage:', storedToken ? 'Token exists' : 'No token found');
      setTokenState(storedToken);
    } catch (error) {
      console.error('Error loading token from AsyncStorage:', error);
      // If AsyncStorage fails, we'll set token to null
      setTokenState(null);
    } finally {
      setIsLoading(false);
    }
  };

  const setToken = async (newToken: string) => {
    try {
      console.log('Attempting to save token to AsyncStorage...');
      await AsyncStorage.setItem('auth_token', newToken);
      console.log('Token successfully saved to AsyncStorage');
      setTokenState(newToken);
    } catch (error) {
      console.error('Error saving token to AsyncStorage:', error);
      throw new Error('Failed to save token to AsyncStorage');
    }
  };

  const clearToken = async () => {
    try {
      console.log('Attempting to clear token from AsyncStorage...');
      await AsyncStorage.removeItem('auth_token');
      console.log('Token successfully cleared from AsyncStorage');
      setTokenState(null);
    } catch (error) {
      console.error('Error clearing token from AsyncStorage:', error);
      throw new Error('Failed to clear token from AsyncStorage');
    }
  };

  return (
    <AuthContext.Provider value={{ token, setToken, clearToken, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}; 