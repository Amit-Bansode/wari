import axios from 'axios';
import { useState, useCallback } from 'react';

interface LoginCredentials {
  username: string;
  password: string;
}

interface LoginResponse {
  token: string;
  // Add other response fields as needed
}

export const useAuth = () => {
  const [token, setToken] = useState<string | null>(null);
  const baseUrl = 'http://68.183.92.149:8010/api';

  const login = useCallback(async (credentials: LoginCredentials): Promise<LoginResponse> => {
    try {
      const formData = new URLSearchParams();
      formData.append('username', credentials.username);
      formData.append('password', credentials.password);

      console.log('Request URL:', `${baseUrl}/authenticate`);
      console.log('Request Headers:', {
        'Content-Type': 'application/x-www-form-urlencoded'
      });
      console.log('Request Body:', formData);

      const response = await axios.post<LoginResponse>(
        `${baseUrl}/authenticate`,
        formData.toString(),
        {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          }
        }
      );

      console.log('Response Status:', response.status);
      console.log('Response Headers:', response.headers);
      console.log('Response Data:', response.data);

      if (response.data.token) {
        setToken(response.data.token);
      }

      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error('Axios Error Details:', {
          status: error.response?.status,
          statusText: error.response?.statusText,
          data: error.response?.data,
          headers: error.response?.headers,
          config: {
            url: error.config?.url,
            method: error.config?.method,
            headers: error.config?.headers,
            data: error.config?.data
          }
        });
      }
      console.error('Login error:', error);
      throw error;
    }
  }, []);

  const logout = useCallback(() => {
    setToken(null);
  }, []);

  const isAuthenticated = useCallback(() => {
    return !!token;
  }, [token]);

  const getToken = useCallback(() => {
    return token;
  }, [token]);

  return {
    login,
    logout,
    isAuthenticated,
    getToken
  };
}; 