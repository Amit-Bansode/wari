import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Pressable,
  Alert,
} from 'react-native';
import { useTranslation } from 'react-i18next';
import { useLocation } from '../../context/LocationContext';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../types/navigation';
import { useAuth } from '../../app/services/auth/auth.service';
import AsyncStorage from '@react-native-async-storage/async-storage';
const LoginScreen: React.FC = () => {
  const { t } = useTranslation();
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const [email, setEmail] = useState('prasad_lengare');
  const [password, setPassword] = useState('prasad@0212');
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const { location, loading: locationLoading, error: locationError } = useLocation();
  const { login } = useAuth();

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Error', 'Please enter both email and password');
      return;
    }

    setLoading(true);
    try {
      const response = await login({
        username: email,
        password: password
      });
      console.log('Response Token:', response.token);
      if (response.token) {
        AsyncStorage.setItem('token', response.token || '');
        console.log('Token from AsyncStorage:', AsyncStorage.getItem('token'));
        // Navigate to main screen on successful login
        navigation.reset({ index: 0, routes: [{ name: 'MainTabs' }] });
      }
    } catch (error) {
      Alert.alert('Login Failed', 'Invalid username or password');
      console.error('Login error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>{t('login_heading')}</Text>
      {/* Email Field */}
      <View style={styles.inputContainer}>
        <Text style={styles.icon}>✅</Text>
        <TextInput
          style={styles.input}
          placeholder={t('email')}
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
          placeholderTextColor="#A0A0A0"
          editable={!loading}
        />
      </View>
      {/* Password Field */}
      <View style={styles.inputContainer}>
        <Text style={styles.icon}>🔒</Text>
        <TextInput
          style={styles.input}
          placeholder={t('password')}
          value={password}
          onChangeText={setPassword}
          secureTextEntry={!showPassword}
          placeholderTextColor="#A0A0A0"
          editable={!loading}
        />
        <Pressable onPress={() => setShowPassword((prev) => !prev)}>
          <Text style={styles.icon}>{showPassword ? '🙈' : '👁️'}</Text>
        </Pressable>
      </View>
      {/* Remember me and Forgot password */}
      <View style={styles.row}>
        <Pressable
          style={styles.checkboxContainer}
          onPress={() => setRememberMe((prev) => !prev)}
          disabled={loading}
        >
          <View style={[styles.checkbox, rememberMe && styles.checkboxChecked]}>
            {rememberMe && <Text style={styles.checkboxTick}>✓</Text>}
          </View>
          <Text style={styles.rememberMe}>{t('remember_me')}</Text>
        </Pressable>
        <TouchableOpacity disabled={loading}>
          <Text style={styles.forgot}>{t('forgot_password')}</Text>
        </TouchableOpacity>
      </View>
      {/* Login Button */}
      <TouchableOpacity 
        style={[styles.loginButton, loading && styles.loginButtonDisabled]} 
        onPress={handleLogin}
        disabled={loading}
      >
        <Text style={styles.loginButtonText}>
          {loading ? 'Logging in...' : t('login')}
        </Text>
      </TouchableOpacity>
      {/* Show current location */}
      <View style={{ marginTop: 24 }}>
        {locationLoading && <Text>Loading location...</Text>}
        {locationError && <Text style={{ color: 'red' }}>{locationError}</Text>}
        {location && (
          <Text style={{ color: '#888', fontSize: 14 }}>
            Lat: {location.latitude}, Lon: {location.longitude}
          </Text>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    justifyContent: 'center',
  },
  heading: {
    fontSize: 36,
    fontWeight: 'bold',
    marginBottom: 32,
    color: '#222',
    lineHeight: 40,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F6F5F7',
    borderRadius: 8,
    marginBottom: 16,
    paddingHorizontal: 12,
    height: 48,
  },
  icon: {
    fontSize: 18,
    marginRight: 8,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: '#222',
    height: 48,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkbox: {
    width: 20,
    height: 20,
    borderWidth: 1,
    borderColor: '#A0A0A0',
    borderRadius: 4,
    marginRight: 8,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  checkboxChecked: {
    backgroundColor: '#E0E0E0',
    borderColor: '#888',
  },
  checkboxTick: {
    fontSize: 14,
    color: '#444',
  },
  rememberMe: {
    fontSize: 14,
    color: '#222',
  },
  forgot: {
    fontSize: 14,
    color: '#3B4B66',
    fontWeight: '500',
  },
  loginButton: {
    backgroundColor: '#5B6B7A',
    borderRadius: 8,
    height: 48,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 24,
  },
  loginButtonDisabled: {
    backgroundColor: '#A0A0A0',
  },
  loginButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default LoginScreen; 